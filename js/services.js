define(["require", "exports", "./Corelib", "./context", "./System", "./UI", "./models"], function (require, exports, Corelib_1, context_1, System_1, UI_1, models_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var requester;
    require('../Apps/Shop/Common', function (c) {
        c.GetVars(function (c) { requester = c.requester; return false; });
    }, function (r) { }, context_1.context);
    var tables = {};
    var eServices;
    (function (eServices) {
        function registerUpdater(updator) {
            tables[updator.Name] = updator;
        }
        eServices.registerUpdater = registerUpdater;
    })(eServices = exports.eServices || (exports.eServices = {}));
    var services;
    (function (services) {
        var AlertMessage = /** @class */ (function () {
            function AlertMessage() {
                this.Name = 'alert';
            }
            AlertMessage.prototype.OnResponse = function (proxy, webr, json) {
                UI_1.UI.Modal.ShowDialog(json.sdata.Title, json.sdata.Content, null, 'OK', null);
            };
            return AlertMessage;
        }());
        services.AlertMessage = AlertMessage;
        var ConfirmMessage = /** @class */ (function () {
            function ConfirmMessage() {
                this.Name = 'confirm';
            }
            ConfirmMessage.prototype.OnResponse = function (proxy, webr, json) {
                var _this = this;
                var c = new Corelib_1.encoding.SerializationContext(true);
                var e = c.FromJson(json.sdata, models_1.models.Message, null);
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
                        var elm = document.createElement('div');
                        elm.innerHTML = e.Content;
                        var t = new UI_1.UI.TControl(elm, e.Data);
                        UI_1.UI.Modal.ShowDialog(e.Title, t, function (xx) { return _this.OnMessageClosed(xx, e); }, e.OKText, e.CancelText);
                        return;
                }
            };
            ConfirmMessage.prototype.OnMessageClosed = function (xx, e) {
                //var ts = new XMLHttpRequest();
                //e.Result = modal.View.outerHTML;
                e.Action = UI_1.UI.MessageResult[xx.Result].toLowerCase();
                requester.Post(models_1.models.Message, e, null, function (s, r, iss) {
                    if (iss) {
                        var t = e.Callback;
                        t.Downloader.Insert(t.Callback);
                        e.Dispose();
                    }
                    else
                        e.Dispose();
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
            };
            return ConfirmMessage;
        }());
        services.ConfirmMessage = ConfirmMessage;
        var InfoNotification = /** @class */ (function () {
            function InfoNotification() {
                this.Name = 'notification';
            }
            InfoNotification.prototype.OnResponse = function (proxy, webr, json) {
                UI_1.UI.InfoArea.push(json.sdata.Content, json.sdata.IsInfo, json.sdata.Expire);
            };
            return InfoNotification;
        }());
        services.InfoNotification = InfoNotification;
        var qdata = Corelib_1.bind.NamedScop.Get('qdata');
        var c = new Corelib_1.encoding.SerializationContext(true);
        var p = models_1.models.Product.getById;
        var ProductsUpdater = /** @class */ (function () {
            function ProductsUpdater() {
                this.Name = 'products_qte_updater';
            }
            ProductsUpdater.prototype.OnResponse = function (proxy, webr, json) {
                var l = json.sdata;
                c.reset();
                //qd = qdata.Value as models.QData;
                for (var i in l) {
                    this.UpdatePrice(parseInt(i), l[i]);
                }
                UI_1.UI.InfoArea.push("<p style='background:yellow'>Products <h1>Success</h1>-<h2>fully</h2> Updated</p>", true);
                json.dropRequest = true;
            };
            ProductsUpdater.prototype.UpdatePrice = function (i, val) {
                { }
                var prd = p(i);
                if (prd) {
                    prd.Stat = 4;
                    prd.FromJson(val, c, true);
                    prd.Stat = 16;
                }
                else
                    c.FromJson(val, models_1.models.Product, null);
            };
            return ProductsUpdater;
        }());
        services.ProductsUpdater = ProductsUpdater;
        var Updater = /** @class */ (function () {
            function Updater() {
                this.Name = 'updater';
            }
            Updater.prototype.OnResponse = function (proxy, webr, json) {
                var l = json.sdata;
                c.reset();
                var table = tables[json["table"]];
                if (table)
                    for (var i in l) {
                        var val = l[i];
                        try {
                            if (typeof val === 'number') {
                                table.del(val);
                            }
                            else {
                                table.edit(val.Id, val, c);
                            }
                        }
                        catch (e) {
                        }
                    }
                UI_1.UI.InfoArea.push("<p style='background:yellow'>" + table.Name.toUpperCase() + " <h1>Success</h1>-<h2>fully</h2> Updated</p>", true);
                json.dropRequest = true;
            };
            return Updater;
        }());
        services.Updater = Updater;
        var SecurityAccountRequest = /** @class */ (function () {
            function SecurityAccountRequest() {
                this.Name = "SecurityAccountRequest";
            }
            SecurityAccountRequest.prototype.OnResponse = function (proxy, webr, json) {
                var a = json;
                UI_1.UI.Spinner.Default.Start("Your Account is open By " + a.OriginalIP + "\r\n Your IP Is : " + a.YourIP);
                setTimeout(function () { UI_1.UI.Spinner.Default.Pause(); }, a.Wait | 300000);
                json.dropRequest = true;
            };
            return SecurityAccountRequest;
        }());
        services.SecurityAccountRequest = SecurityAccountRequest;
        var FactureUpdater = /** @class */ (function () {
            function FactureUpdater() {
                this.Name = 'facture_count_updater';
            }
            FactureUpdater.prototype.OnResponse = function (proxy, webr, json) {
                var l = json.sdata;
                var f = models_1.models.Facture.getById(l.id, models_1.models.Facture);
                if (l.for) {
                    var _for = models_1.models.Client.getById(l.for);
                    if (!_for)
                        requester.Get(models_1.models.Client, f.Client = new models_1.models.Client(l.for), null, function (s, r, iss) {
                            if (iss)
                                f.Client = s.data;
                            else
                                UI_1.UI.InfoArea.push("Failed To Update The Costumer Info of this facture", false);
                        });
                    f.Client = _for;
                }
                else
                    f.Client = null;
                var arts = f.Articles;
                var narts = l.articles;
                var todarts = "";
                for (var sid in narts) {
                    var id = parseFloat(sid);
                    var oart = arts.GetById(id);
                    if (oart != null)
                        oart.Count = narts[id];
                    else
                        todarts += todarts === '' ? id : ',' + id;
                }
                var list = arts.AsList();
                for (var i = 0; i < list.length; i++) {
                    var art = list[i];
                    if (narts[art.Id] == null) {
                        arts.Remove(art);
                        art.getStore().Remove(art.Id);
                        i--;
                    }
                }
                if (todarts !== '') {
                    requester.Get(models_1.models.Articles, new models_1.models.Articles(f), null, function (s, r, iss) {
                        if (iss) {
                            var d = s.data;
                            arts.AddRange(d.AsList());
                            UI_1.UI.InfoArea.push("Facture <h1>Success</h1>-<h2>fully</h2> Updated", true);
                            d.Clear();
                            d.Dispose();
                        }
                        else
                            UI_1.UI.InfoArea.push("Facture <h1>UnSuccess</h1>-<h2>fully</h2> Updated", true);
                    }, function (r, t) {
                        r.Url = '/_/Articles?list=' + todarts;
                    });
                }
                else
                    UI_1.UI.InfoArea.push("Facture <h1>Success</h1>-<h2>fully</h2> Updated", true);
                json.dropRequest = true;
            };
            return FactureUpdater;
        }());
        services.FactureUpdater = FactureUpdater;
        var PriceUpdater = /** @class */ (function () {
            function PriceUpdater() {
                this.Name = 'update_price';
            }
            PriceUpdater.prototype.OnResponse = function (proxy, webr, json) {
                var l = json.sdata;
                var f = models_1.models.FakePrice.pStore.Get(l.id);
                if (!f) {
                    f = new models_1.models.FakePrice(l.id);
                    models_1.models.FakePrice.pStore.Set(l.id, f);
                }
                f.Value = l.value;
            };
            return PriceUpdater;
        }());
        services.PriceUpdater = PriceUpdater;
    })(services || (services = {}));
    function Load() {
        System_1.Controller.Register(new services.AlertMessage());
        System_1.Controller.Register(new services.ConfirmMessage());
        System_1.Controller.Register(new services.InfoNotification());
        System_1.Controller.Register(new services.ProductsUpdater());
        System_1.Controller.Register(new services.FactureUpdater());
        System_1.Controller.Register(new services.PriceUpdater());
        System_1.Controller.Register(new services.SecurityAccountRequest());
        System_1.Controller.Register(new services.Updater());
        System_1.Controller.Register({
            Name: 'guid', OnResponse: function (proxy, webr, json) {
                var d = json.sdata;
                if (typeof d === 'number') {
                    Corelib_1.basic.setGuidRange(d, d + 100 - 1);
                }
                else if (d instanceof Array) {
                    Corelib_1.basic.setGuidRange(d[0], d[1]);
                }
                else
                    throw "Invalide Exception";
            }
        });
    }
    exports.Load = Load;
});
//# sourceMappingURL=services.js.map