import {net, Common, bind, basic, collection, utils, encoding,Api} from './Corelib';
import {context} from './context';
import {Controller} from './System';
import {UI} from './UI';
import {models} from './models';
import Client = require("./Client");
//import { GetVars} from '../Apps/Shop/Common';
//var requester: Controller.ProxyData;
//GetVars(function (v) { requester = v.requester; return false; });
declare var require: (modules: string, onsuccss?: (result: any) => void, onerror?: (result: any) => void, context?: any) => void;
interface idq {
    [s: number]: number | models.Product;
}
var requester;
require('../Apps/Shop/Common', function (c) {
    c.GetVars(c => { requester = c.requester; return false; });
}, (r) => { }, context);
var tables: { [n: string]: eServices.TableUpdator } = {};
export namespace eServices {
    export interface TableUpdator {
        Name: string;
        del: (id: number) => void;
        edit: (id: number, json, context: encoding.SerializationContext) => void;
    }

    export function registerUpdater(updator: TableUpdator) {
        tables[updator.Name] = updator;
    }
}
namespace services {
    export class AlertMessage implements Controller.IService {
        Name= 'alert';
        OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            UI.Modal.ShowDialog(json.sdata.Title, json.sdata.Content, null, 'OK',null);
        }
    }

    export class ConfirmMessage implements Controller.IService {
        Name= 'confirm';

        OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            const c = new encoding.SerializationContext(true);
            const e = c.FromJson(json.sdata, models.Message,null) as models.Message;
            c.Dispose();
            switch (e.Type) {
                case 0:
                case 1:
                    if (proxy.callBack)
                        proxy.callBack(proxy, json, undefined);
                    return;
                case 2:
                case 3:
                    e.Callback = {
                        ProxyCallback: proxy,
                        Callback: webr.current,
                        Downloader: webr
                    }; 

                    var elm = document.createElement('div'); elm.innerHTML = e.Content;
                    var t = new UI.TControl(elm, e.Data);
                    UI.Modal.ShowDialog(e.Title, t, (xx) => this.OnMessageClosed(xx ,e), e.OKText, e.CancelText);
                    return;
            }
        }

        public OnMessageClosed(xx:UI.MessageEventArgs,e:models.Message) {
            //var ts = new XMLHttpRequest();
            //e.Result = modal.View.outerHTML;
            e.Action = UI.MessageResult[xx.Result].toLowerCase();
            requester.Post(models.Message, e, null, (s, r, iss) => {
                if (iss) {
                    var t = e.Callback;
                    t.Downloader.Insert(t.Callback);
                    e.Dispose();
                } else e.Dispose();
            });
            /*
            ts.open('Post', basic.host + '/_/CallBack?Id=' + this.Id);
            ts.onloadend = (x) => {
                var t = e.Callback;
                t.Downloader.Insert(t.Callback);
            }
            ts.onerror = (c) => {
                e.Dispose();
            };
            var t = new encoding.SerializationContext(true);
            e.Result = modal.View.outerHTML;
            e.Action = r;
            ts.send(JSON.stringify(e.ToJson(t)));
            t.Dispose();
            ts = null;*/
        }
    }

    export class InfoNotification implements Controller.IService {
        Name= 'notification';

        OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            UI.InfoArea.push(json.sdata.Content, json.sdata.IsInfo, json.sdata.Expire);
        }
    }
    var qdata = bind.NamedScop.Get('qdata');
    var c = new encoding.SerializationContext(true);
    var p = models.Product.getById;
    export class ProductsUpdater implements Controller.IService {
        Name= 'products_qte_updater';
        OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            var l = json.sdata as idq;
            c.reset();
            //qd = qdata.Value as models.QData;
            for (var i in l) {
                this.UpdatePrice(parseInt(i), l[i]);
            }
            UI.InfoArea.push("<p style='background:yellow'>Products <h1>Success</h1>-<h2>fully</h2> Updated</p>", true);
            json.dropRequest = true;
        }
        UpdatePrice(i: number, val: number | models.Product) {           
            {}
            var prd = p(i);
            if (prd) {
                prd.Stat = 4;
                prd.FromJson(val, c, true);
                prd.Stat = 16;
            }
            else c.FromJson(val, models.Product, null);
        }
    }
    export class Updater implements Controller.IService {
        Name = 'updater';
        OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            var l = json.sdata as idq;
            c.reset();
            var table = tables[json["table"]];
            if (table)
                for (var i in l) {
                    var val = l[i];
                    try {

                        if (typeof val === 'number') {
                            table.del(val);
                        } else {
                            table.edit(val.Id, val, c);
                        }
                    } catch (e) {

                    }
                }
            UI.InfoArea.push("<p style='background:yellow'>" + table.Name.toUpperCase() + " <h1>Success</h1>-<h2>fully</h2> Updated</p>", true);
            json.dropRequest = true;
        }
    }

	export class SecurityAccountRequest implements Controller.IService {
		Name = "SecurityAccountRequest";
		OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
			var a: any = json;
			UI.Spinner.Default.Start("Your Account is open By " + a.OriginalIP + "\r\n Your IP Is : " + a.YourIP);
			setTimeout(() => { UI.Spinner.Default.Pause(); }, a.Wait | 300000);
			json.dropRequest = true;
		}
	}

    interface IFactureUpdate {
        id: number;
        for: number;
        articles: idq;
    }
    interface IPriceUpdate {
        id: number;
        value: number;
    }
    export class FactureUpdater implements Controller.IService {
        Name = 'facture_count_updater';
        OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            var l = json.sdata as IFactureUpdate;
            var f = models.Facture.getById(l.id, models.Facture);
            if (l.for) {
                var _for = models.Client.getById(l.for);
                if (!_for)
                    requester.Get(models.Client, f.Client = new models.Client(l.for), null, (s, r, iss) => {
                        if (iss)
                            f.Client = s.data;
                        else UI.InfoArea.push("Failed To Update The Costumer Info of this facture", false);
                    });
                f.Client = _for;
            } else f.Client = null;
            var arts = f.Articles;
            var narts = l.articles;
            var todarts = "";
            for (var sid in narts) {
                var id = parseFloat(sid);
                var oart = arts.GetById(id);
                if (oart != null) oart.Count = narts[id] as number;
                else todarts += todarts === '' ? id : ',' + id;                
            }
            var list = arts.AsList();
            for (var i = 0 ; i < list.length; i++) {
                var art = list[i];
                if (narts[art.Id] == null) {
                    arts.Remove(art);
                    art.getStore().Remove(art.Id);
                    i--;
                }
            }
            if (todarts !== '') {
                requester.Get(models.Articles, new models.Articles(f), null, (s, r, iss) => {
                    if (iss) {
                        var d = s.data as models.Articles;
                        arts.AddRange(d.AsList());
                        UI.InfoArea.push("Facture <h1>Success</h1>-<h2>fully</h2> Updated", true);
                        d.Clear();
                        d.Dispose();
                    }
                    else UI.InfoArea.push("Facture <h1>UnSuccess</h1>-<h2>fully</h2> Updated", true);
                }, (r, t) => {
                    r.Url = '/_/Articles?list=' + todarts;
                });
            }
            else
                UI.InfoArea.push("Facture <h1>Success</h1>-<h2>fully</h2> Updated", true);
            json.dropRequest = true;
        }
    }

    export class PriceUpdater implements Controller.IService {
        Name = 'update_price';
        OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            var l = json.sdata as IPriceUpdate;
            var f = models.FakePrice.pStore.Get(l.id);
            if (!f) {
                f = new models.FakePrice(l.id);
                models.FakePrice.pStore.Set(l.id, f);
            }
            f.Value = l.value;
        }
    }

}

export function Load() {
    Controller.Register(new services.AlertMessage());
    Controller.Register(new services.ConfirmMessage());
    Controller.Register(new services.InfoNotification());
    Controller.Register(new services.ProductsUpdater());
    Controller.Register(new services.FactureUpdater());
	Controller.Register(new services.PriceUpdater());
    Controller.Register(new services.SecurityAccountRequest());
    Controller.Register(new services.Updater());

    Controller.Register({
        Name: 'guid', OnResponse(proxy: Controller.ProxyCallback<any>, webr: net.QueeDownloader, json: Controller.IServiceResponse) {
            
            var d = json.sdata;
            if (typeof d === 'number') {
                basic.setGuidRange(d, d + 100 - 1);
            } else if (d instanceof Array) {
                basic.setGuidRange(d[0], d[1]);
            } else
                throw "Invalide Exception";
        }
    });
}
