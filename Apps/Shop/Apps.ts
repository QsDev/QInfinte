import {UI} from '../../js/UI';
import { basic, thread, reflection, Common, ScopicCommand, bind, Api, net, encoding} from '../../js/Corelib';
import { Controller, sdata} from '../../js/System';
import { models } from "../../js/Models";
import {GetVars} from './Common';
import {Admin} from './AdminPage';
import { Services } from './Services/QServices';
import { Pages } from './Pages';
import { Apis } from './apis/qshopapis';
import { ShopApis } from './Apis/ShopApis';
import {  InitModule } from './Common';
import { context } from './context';
import Client = require("../../js/Client");
import { basics } from './Basics';
import { eServices } from '../../js/services';
import { Material } from '../../components/QUI/script';
import { defs } from '../../js/defs';
Apis.Load();

InitModule();
var x = new XMLHttpRequest();
window['sapi'] = sapi;
var key;
var event = new bind.EventListener<(v: boolean) => void>(key = Math.random() * 2099837662);

ScopicCommand.Register({
    Invoke: (n, d, s) => {
        return false;
    }
}, null, 'stop');
var GData:basics.vars;
GetVars((v) => {
    GData = v;
    return true;
});
window['GVars'] = GData;
var sapi = new ShopApis();
sapi.Init(GData);
GData.requester.Get(basic.iGuid, [], null, (s, r, iss) => {});
Api.RegisterTrigger({
    Name: 'AddPrice',
    Filter(x, params) {
        if (params instanceof models.FakePrice)
            GData.__data.Prices.Add(params);
        else if (params instanceof Array)
            GData.__data.Prices.AddRange(params);
        return false;
    },
    CheckAccess: (o) => true,
    Params: null
});
Api.RegisterApiCallback({ DoApiCallback (x, p) { return true }, Name: 'AddPrice' });
Api.RegisterApiCallback({ DoApiCallback(x, p) { return true }, Name: 'RemovePrice' });
Api.RegisterTrigger({
    Name: 'RemovePrice',
    Filter(x, params) {
        if (params instanceof models.FakePrice)
            GData.__data.Prices.Remove(params);
        return false;
    },
    CheckAccess: (o) => true,
    Params: null
});
 namespace Apps {
     export class QShop extends UI.App {
         Search: Pages.SearchPage;
         Facture: Pages.FacturePage;
         Factures: Pages.FacturesPage;
		 Logout() {
			 GData.requester.Get(models.Login, GData.user, null, (s, r: any, iss) => {
				 if (!GData.user.IsLogged) {
                     localStorage.setItem("Identification", "");
                     GData.user.Identification = undefined;
                     GData.user.Username = undefined;
                     GData.user.Pwd = undefined;
					 document.cookie = "id=;";
					 GData.__data.Clear();
				 } else {
					 UI.Modal.ShowDialog("Signout failled !!!!", "Some thing happened when logout this session please contact the administrator if site", undefined, "Retry", "Cancel");
				 }
			 }, (r, t) => {
				 r.Url = "/~Signout";
                 });
             
		 }
         constructor() {
             super('QShop');                      
             Api.RegisterApiCallback({
                 Name: "Settings", DoApiCallback: (a, b, c) => {
                     UI.Modal.ShowDialog("Settings", 'Do you want realy to make backup to this Shop', (e) => {
                         {}
                         if (e.Result == UI.MessageResult.ok) {
                             GData.requester.Request(Window, "START");
                             setTimeout(() => {
                                 GData.requester.Request(Window, "BACKUP");
                                 setTimeout(() => { c.callback && c.callback(c, this); }, 6000);
                             }, 5000);
                         }
                         else c.callback && c.callback(c, this);
                     }, "Backup", "Cancel");
                 }
             });
         }
         isReq;
         OnKeyDown(e: KeyboardEvent) {             
             super.OnKeyDown(e);
         }
         
         Update() {
            
             this.SelectedPage.Update();
         }

         initialize() {
             super.initialize();
             this.Add(this.Search = new Pages.SearchPage(this));
             this.Add(this.Facture = new Pages.FacturePage(this));
             this.Add(this.Factures = new Pages.FacturesPage(this));
             this.Head.Header.Brand.addEventListener('click', (s, e, p) => {
                 Api.RiseApi("ReAuth", {
                     callback: (p, arg) => {
                         { }
                     }, data: this
                 });
             }, this);
             var costumers: Pages.CostumersPage;
             
             var adminLoaded = false;
             var adminPage: Admin.AdminPage;
             GData.user.OnMessage((s, e) => {
                 isLogged(e._new);
             });
             if (GData.user.IsLogged)
                 isLogged(true);
             else isLogged(false);
             var t = this;
             var thread;
             var c = new XMLHttpRequest();
             var self = this;
             c.onreadystatechange = function () {
                 if (this.readyState == 4) {
                     if (this.status == 200)
                         self.Head.View.style.background = this.responseText == "True" ? "" : "var(--paper-amber-900);";
                     else {
                         self.Head.View.style.background = "var(--paper-amber-900)";
                     }
                 }
             };
             c.onerror = function () {
                 self.Head.Header.View.style.color = "Red";
             };
             
             function isLogged(value: boolean) {
                 if (value) {
                     if (Admin && Admin.AdminPage) {
                         if (adminLoaded) return;
                         GData.requester.Push(models.IsAdmin, new models.IsAdmin(), null, (s, r, iss) => {
                             if ((r as any).iss) {
                                 t.Add(costumers = new Pages.CostumersPage(t));
                                 t.Add(adminPage = new Admin.AdminPage(t));
                                 adminLoaded = true;
                             } else {
                                 if (adminLoaded && adminPage != null) {
                                     t.Remove(adminPage);
                                     t.Remove(costumers);
                                 }
                                 adminLoaded = false;
                             }
                         });
                         thread = setInterval(() => {
                             c.open('get', basic.host + '/~CheckLogging');
                             c.setRequestHeader('Access-Control-Allow-Origin', 'true');
                             try { c.send(); c.timeout = 2000;} catch (e) { }
                         }, 2500);
                     } else {
                         clearInterval(thread);
                         adminLoaded = false;
                     }
                 }
                 else {

                     if (adminLoaded && adminPage != null)
                         t.Remove(adminPage);
                     adminLoaded = false;
                 }
             }

             this.SelectedPage = this.Factures;
             GData.__data.OnPropertyChanged(models.QData.DPSelectedFacture,
                 (s, e) => {
                     if (this.SelectedPage == this.Facture)
                         if (e._new == null)
                             this.SelectedPage = this.Factures;
                 },
                 this);
         }
     }



    export class AuthentificationApp extends UI.AuthApp {
        public get RedirectApp() { return this.redirectApp; }
        public set RedirectApp(v) { }
        private _signupPage: UI.Page;
        private _loginPage: UI.Page;
        private user: models.Login;

        constructor(private redirectApp:defs.UI.IApp) {
            super(event);
            window['auth'] = this;
            GData.user.OnMessage((s: bind.PropBinding, ev: bind.EventArgs<boolean, models.Login>) => event
                .Invoke(key, [ev._new]));
        }

        public IsLogged<T>(callback: (v: boolean, param: T) => void, param: T) {
            callback(GData.user.IsLogged, param);
        }

        private createSignupPage() {
            var p = new UI.Page(this, 'Signup', 'Signup');
            p.OnInitialized = p => p.Add(new UI.TControl('Client.signup', GData.user));
            this.AddPage(this._signupPage = p);
        }
        private createLoginPage() {
            var p = new UI.Page(this, 'Login', 'Login');
            p.OnInitialized = p => p.Add(new UI.TControl('Client.login', GData.user));
            this.AddPage(this._loginPage = p);
        }
		private auth = thread.Dispatcher.cretaeJob(() => {
			this.Login();
        }, [], this, true);
        private autologing = thread.Dispatcher.cretaeJob(() => {
            this.Login();
        }, [], this, true);
        private AutoLogin() {
            var ident = localStorage.getItem("Identification");
			GData.user.Identification = ident;			
            thread.Dispatcher.Push(this.auth);
            Api.RegisterApiCallback({
                Name: "ReAuth", DoApiCallback: (a, b, c) => {
                    GData.spin.Start("Authenticating");
                    GData.user.Stat = 0;
                    GData.requester.Push(models.Login, GData.user, null, (callback, s, iss) => {
                        GData.spin.Pause();
                        if (iss) {
                            var login = callback.data as models.Login;
                            if (login.IsLogged) {

                                localStorage.setItem("Identification", login.Identification);
                                if (login != GData.user) UI.Modal.ShowDialog("Authentication", "Fatal Error");
                                c.callback && c.callback(c, login.IsLogged);
                             
                                return;
                            }
                            UI.InfoArea.push('<p class="text-center">Please Check Your <B>Password</B> AND <B>UserName</B></p>', false, 4000);
                        } else
                            UI.InfoArea.push('Fatal Error My Friend!!!!', false);
                        if (!this.finit)
                            this.OnInitialized = (t) => t.fullInitialize();
                    });
                }, Owner: this
            })
        }
        private Login() {
            GData.user.Stat = 0;
            GData.requester.Push(models.Login, GData.user, null, (callback, s, iss) => {
                if (iss) {
                    var login = callback.data as models.Login;
                    if (login.IsLogged) {

                        localStorage.setItem("Identification", login.Identification);
						if (login != GData.user) alert("Fatal Error");
						else
							AuthentificationApp.Download();
						return;
                    }
                    UI.InfoArea.push('<p class="text-center">Please Check Your <B>Password</B> AND <B>UserName</B></p>', false, 4000);
                } else
                    UI.InfoArea.push('Fatal Error My Friend!!!!', false);
                GData.spin.Pause();
                if (!this.finit)
                    this.OnInitialized = t => t.fullInitialize();
            });
        }
        private static Download() {
            GData.__data.Products
			GData.__data.Clear();
            GData.requester.Push(models.Categories, GData.__data.Categories, null, (d, r) => { GData.spin.Message = "Categories"; });
            GData.requester.Push(models.Products, GData.__data.Products, null, (d, r) => { GData.spin.Message = "Products"; });
            GData.requester.Push(models.Costumers, GData.__data.Costumers, null, (d, r) => { GData.spin.Message = "Costumers"; });
            GData.requester.Push(models.Fournisseurs, GData.__data.Fournisseurs, null, (d, r) => { ; GData.spin.Message = "Fournisseurs"; });
            GData.requester.Push(models.Agents, GData.__data.Agents, null, (d, r) => { GData.spin.Message = "Agents"; });            
            GData.requester.Push(models.Factures, GData.__data.Factures, null, (d, r) => { GData.spin.Message = "Factures"; });
            GData.requester.Push(models.SFactures, GData.__data.SFactures, null, (d, r) => { GData.spin.Message = "Factures"; GData.spin.Pause(); GData.spin.Message = "Wait"; });
            //GVars.requester.Push(models.FakePrices, GVars.__data.Prices, null, (s, r, iss) => { }, null, null);
            //GVars.requester.Push(models.Articles, GVars.__data.Articles, null, (d, r) => { GVars.spin.Message = "Articles"; });

        }
        private static ts ;
        private static CheckLogging() {
            if (AuthentificationApp.ts == null) {
                AuthentificationApp.ts = new XMLHttpRequest();
                var x = (e) => {
                    if (AuthentificationApp.ts.response != "True") {
                        UI.Desktop.Current.Wait = true;
                        UI.Modal.ShowDialog("Account", "Your Connection To Account Was Closed");
                    } else
                        UI.Desktop.Current.Wait = false;
                    //setTimeout(AuthentificationApp.CheckLogging, 60000);
                };
                AuthentificationApp.ts.onerror = x;
                AuthentificationApp.ts.onloadend = x;
            }
            AuthentificationApp.ts.open("GET", "/CheckLogging");
            AuthentificationApp.ts.send();
        }

        initialize() {            
            //GData.spin.Start('Logging');
            super.initialize();
            this.fullInitialize();
            this.AutoLogin();
        }
        private fullInitialize() {
            this.finit = true;
            this.createLoginPage();
            this.createSignupPage();
            INITJobs.call(this);
            
            this.SelectedPage = this._loginPage;
        }
        private finit: boolean;
    }    
}
function INITJobs() {
    bind.Register(new bind.Job('openlogin', null, null, null, (ji, e) => {
        var dm = ji.dom;
        dm.addEventListener('click', () => this.Open(this._loginPage))
    }, null));

	bind.Register(new bind.Job('login', null, null, null, (ji, e) => {
        if (!GData.user.Client) GData.user.Client = new models.Client(0);
        ji.dom.addEventListener('click', (() => { GData.spin.Start('login'); this.Login(); }).bind(ji))
    }, null));


    bind.Register(new bind.Job('opensignup', undefined, undefined, undefined, (ji, e) => {
		var dm = ji.dom;
		if (!GData.user.Client) GData.user.Client = new models.Client(0);
        dm.addEventListener('click', () => {
            this.Open(this._signupPage);
        })
    }, null));

    bind.Register(new bind.Job('signup', () => {

    }, null, null, (ji, e) => {
        ji.addEventListener('click', 'click', (() => {
            var t = ji.Scop;
            GData.requester.Post(models.Signup, t.Value, null, (callback, p, iss) => {
                if (iss)
                    var m = UI.Modal.ShowDialog('Signup', 'The Signup was successfully created .Please Send a message with your code to activate the account');
                else {
                }
            })
        }).bind(ji));
    }, null));

    bind.Register(new bind.Job('loggedjob', (ji) => {
        var b = ji.Scop.Value as boolean;
        var dm = ji.dom as HTMLElement;
        if (b)
            dm.innerText = 'YOU ARE LOGGED';
        else {
            dm.innerText = 'YOU ARE NOT LOGGED';
        }
    }, null, null, (j, e) => { }, null));
}
export namespace Init {
    export function Main(desk: UI.Desktop) {
        Apis.Load();

        var t = new Material.App();
        var qshop = new Apps.QShop();
        var auth = new Apps.AuthentificationApp(t);
        desk.Add(auth);
        desk.Add(t);
        desk.Add(qshop);
        thread.Dispatcher.call(auth, t.Show);
    }
}
declare type bindCallback = (e: bind.EventArgs<any, any>) => void;


interface Property {
    jname?: string;
    sname?: string;
    type: Function | reflection.DelayedType | reflection.GenericType;
    default?: any;
    onchange?: bindCallback;
    check?: bindCallback;
    get: () => any;
    set: (v: any) => any;
}
interface Properties {
    [name: string]: Property | Function;
}
var c: bind.DObject;
interface Model {
    namespace: string;
    class: string;
    super: string | Model;
    properties: Properties;
    prototype: any;
    init();
    ctor();
    cctor();
    onPropertyChanged(e: bindCallback);
}
function process(model: Model) {

}
eServices.registerUpdater({
    Name: 'products', del: (id) => {
        var p = models.Product.getById(id) || GData.__data.Products.GetById(id);
        models.Product.pStore.Remove(id);        
        if (p) GData.__data.Products.Remove(p);
    }, edit: (id, json) => {
        var p = models.Product.pStore.Get(id) || GData.__data.Products.GetById(id);
        if (p) {
            p.Stat = sdata.DataStat.Updating;
            p.FromJson(json, encoding.SerializationContext.GlobalContext, true);
            p.Stat = sdata.DataStat.Updated;
        }
    }
});

export class updater<T extends sdata.QShopRow> implements eServices.TableUpdator {
    constructor(private table: sdata.DataTable<T>, public Name: string) {
    }
    del(id: number) {
        var d = sdata.DataRow.getById(id, this.table.ArgType) || this.table.GetById(id);
        if (d) {
            this.table.Remove(d);
            d.Dispose();
        }
    }
    edit(id: number, json: any, context: encoding.SerializationContext) {
        var d = sdata.DataRow.getById(id, this.table.ArgType) || this.table.GetById(id);
        if (d) {
            d.Stat = sdata.DataStat.Updating;
            d.FromJson(json, context, true);
            d.Stat = sdata.DataStat.Updated;
        } else {
            d = this.table.CreateNewItem(id);
            d.FromJson(json, context, false);
            this.table.Add(d);

        }
    }
}

eServices.registerUpdater(new updater(GData.__data.Articles, 'articles'));
eServices.registerUpdater(new updater(GData.__data.Costumers, 'clients'));
eServices.registerUpdater(new updater(GData.__data.Agents, 'agents'));
eServices.registerUpdater(new updater(GData.__data.Factures, 'factures'));
eServices.registerUpdater(new updater(GData.__data.SFactures, 'sfactures'));
eServices.registerUpdater(new updater(GData.__data.Categories, 'categories'));
eServices.registerUpdater(new updater(GData.__data.Fournisseurs, 'fournisseurs'));
