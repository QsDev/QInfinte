var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../js/UI", "../../js/Corelib", "../../js/System", "../../js/Models", "./Common", "./AdminPage", "./Pages", "./apis/qshopapis", "./Apis/ShopApis", "./Common", "../../js/services", "../../components/QUI/script"], function (require, exports, UI_1, Corelib_1, System_1, Models_1, Common_1, AdminPage_1, Pages_1, qshopapis_1, ShopApis_1, Common_2, services_1, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    qshopapis_1.Apis.Load();
    Common_2.InitModule();
    var x = new XMLHttpRequest();
    window['sapi'] = sapi;
    var key;
    var event = new Corelib_1.bind.EventListener(key = Math.random() * 2099837662);
    Corelib_1.ScopicCommand.Register({
        Invoke: function (n, d, s) {
            return false;
        }
    }, null, 'stop');
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return true;
    });
    window['GVars'] = GData;
    var sapi = new ShopApis_1.ShopApis();
    sapi.Init(GData);
    GData.requester.Get(Corelib_1.basic.iGuid, [], null, function (s, r, iss) { });
    Corelib_1.Api.RegisterTrigger({
        Name: 'AddPrice',
        Filter: function (x, params) {
            if (params instanceof Models_1.models.FakePrice)
                GData.__data.Prices.Add(params);
            else if (params instanceof Array)
                GData.__data.Prices.AddRange(params);
            return false;
        },
        CheckAccess: function (o) { return true; },
        Params: null
    });
    Corelib_1.Api.RegisterApiCallback({ DoApiCallback: function (x, p) { return true; }, Name: 'AddPrice' });
    Corelib_1.Api.RegisterApiCallback({ DoApiCallback: function (x, p) { return true; }, Name: 'RemovePrice' });
    Corelib_1.Api.RegisterTrigger({
        Name: 'RemovePrice',
        Filter: function (x, params) {
            if (params instanceof Models_1.models.FakePrice)
                GData.__data.Prices.Remove(params);
            return false;
        },
        CheckAccess: function (o) { return true; },
        Params: null
    });
    var Apps;
    (function (Apps) {
        var QShop = /** @class */ (function (_super) {
            __extends(QShop, _super);
            function QShop() {
                var _this = _super.call(this, 'QShop') || this;
                Corelib_1.Api.RegisterApiCallback({
                    Name: "Settings", DoApiCallback: function (a, b, c) {
                        UI_1.UI.Modal.ShowDialog("Settings", 'Do you want realy to make backup to this Shop', function (e) {
                            { }
                            if (e.Result == UI_1.UI.MessageResult.ok) {
                                GData.requester.Request(Window, "START");
                                setTimeout(function () {
                                    GData.requester.Request(Window, "BACKUP");
                                    setTimeout(function () { c.callback && c.callback(c, _this); }, 6000);
                                }, 5000);
                            }
                            else
                                c.callback && c.callback(c, _this);
                        }, "Backup", "Cancel");
                    }
                });
                return _this;
            }
            QShop.prototype.Logout = function () {
                GData.requester.Get(Models_1.models.Login, GData.user, null, function (s, r, iss) {
                    if (!GData.user.IsLogged) {
                        localStorage.setItem("Identification", "");
                        GData.user.Identification = undefined;
                        GData.user.Username = undefined;
                        GData.user.Pwd = undefined;
                        document.cookie = "id=;";
                        GData.__data.Clear();
                    }
                    else {
                        UI_1.UI.Modal.ShowDialog("Signout failled !!!!", "Some thing happened when logout this session please contact the administrator if site", undefined, "Retry", "Cancel");
                    }
                }, function (r, t) {
                    r.Url = "/~Signout";
                });
            };
            QShop.prototype.OnKeyDown = function (e) {
                _super.prototype.OnKeyDown.call(this, e);
            };
            QShop.prototype.Update = function () {
                this.SelectedPage.Update();
            };
            QShop.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.Add(this.Search = new Pages_1.Pages.SearchPage(this));
                this.Add(this.Facture = new Pages_1.Pages.FacturePage(this));
                this.Add(this.Factures = new Pages_1.Pages.FacturesPage(this));
                this.Head.Header.Brand.addEventListener('click', function (s, e, p) {
                    Corelib_1.Api.RiseApi("ReAuth", {
                        callback: function (p, arg) {
                            { }
                        }, data: _this
                    });
                }, this);
                var costumers;
                var adminLoaded = false;
                var adminPage;
                GData.user.OnMessage(function (s, e) {
                    isLogged(e._new);
                });
                if (GData.user.IsLogged)
                    isLogged(true);
                else
                    isLogged(false);
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
                function isLogged(value) {
                    if (value) {
                        if (AdminPage_1.Admin && AdminPage_1.Admin.AdminPage) {
                            if (adminLoaded)
                                return;
                            GData.requester.Push(Models_1.models.IsAdmin, new Models_1.models.IsAdmin(), null, function (s, r, iss) {
                                if (r.iss) {
                                    t.Add(costumers = new Pages_1.Pages.CostumersPage(t));
                                    t.Add(adminPage = new AdminPage_1.Admin.AdminPage(t));
                                    adminLoaded = true;
                                }
                                else {
                                    if (adminLoaded && adminPage != null) {
                                        t.Remove(adminPage);
                                        t.Remove(costumers);
                                    }
                                    adminLoaded = false;
                                }
                            });
                            thread = setInterval(function () {
                                c.open('get', Corelib_1.basic.host + '/~CheckLogging');
                                c.setRequestHeader('Access-Control-Allow-Origin', 'true');
                                try {
                                    c.send();
                                    c.timeout = 2000;
                                }
                                catch (e) { }
                            }, 2500);
                        }
                        else {
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
                GData.__data.OnPropertyChanged(Models_1.models.QData.DPSelectedFacture, function (s, e) {
                    if (_this.SelectedPage == _this.Facture)
                        if (e._new == null)
                            _this.SelectedPage = _this.Factures;
                }, this);
            };
            return QShop;
        }(UI_1.UI.App));
        Apps.QShop = QShop;
        var AuthentificationApp = /** @class */ (function (_super) {
            __extends(AuthentificationApp, _super);
            function AuthentificationApp(redirectApp) {
                var _this = _super.call(this, event) || this;
                _this.redirectApp = redirectApp;
                _this.auth = Corelib_1.thread.Dispatcher.cretaeJob(function () {
                    _this.Login();
                }, [], _this, true);
                _this.autologing = Corelib_1.thread.Dispatcher.cretaeJob(function () {
                    _this.Login();
                }, [], _this, true);
                window['auth'] = _this;
                GData.user.OnMessage(function (s, ev) { return event
                    .Invoke(key, [ev._new]); });
                return _this;
            }
            Object.defineProperty(AuthentificationApp.prototype, "RedirectApp", {
                get: function () { return this.redirectApp; },
                set: function (v) { },
                enumerable: true,
                configurable: true
            });
            AuthentificationApp.prototype.IsLogged = function (callback, param) {
                callback(GData.user.IsLogged, param);
            };
            AuthentificationApp.prototype.createSignupPage = function () {
                var p = new UI_1.UI.Page(this, 'Signup', 'Signup');
                p.OnInitialized = function (p) { return p.Add(new UI_1.UI.TControl('Client.signup', GData.user)); };
                this.AddPage(this._signupPage = p);
            };
            AuthentificationApp.prototype.createLoginPage = function () {
                var p = new UI_1.UI.Page(this, 'Login', 'Login');
                p.OnInitialized = function (p) { return p.Add(new UI_1.UI.TControl('Client.login', GData.user)); };
                this.AddPage(this._loginPage = p);
            };
            AuthentificationApp.prototype.AutoLogin = function () {
                var _this = this;
                var ident = localStorage.getItem("Identification");
                GData.user.Identification = ident;
                Corelib_1.thread.Dispatcher.Push(this.auth);
                Corelib_1.Api.RegisterApiCallback({
                    Name: "ReAuth", DoApiCallback: function (a, b, c) {
                        GData.spin.Start("Authenticating");
                        GData.user.Stat = 0;
                        GData.requester.Push(Models_1.models.Login, GData.user, null, function (callback, s, iss) {
                            GData.spin.Pause();
                            if (iss) {
                                var login = callback.data;
                                if (login.IsLogged) {
                                    localStorage.setItem("Identification", login.Identification);
                                    if (login != GData.user)
                                        UI_1.UI.Modal.ShowDialog("Authentication", "Fatal Error");
                                    c.callback && c.callback(c, login.IsLogged);
                                    return;
                                }
                                UI_1.UI.InfoArea.push('<p class="text-center">Please Check Your <B>Password</B> AND <B>UserName</B></p>', false, 4000);
                            }
                            else
                                UI_1.UI.InfoArea.push('Fatal Error My Friend!!!!', false);
                            if (!_this.finit)
                                _this.OnInitialized = function (t) { return t.fullInitialize(); };
                        });
                    }, Owner: this
                });
            };
            AuthentificationApp.prototype.Login = function () {
                var _this = this;
                GData.user.Stat = 0;
                GData.requester.Push(Models_1.models.Login, GData.user, null, function (callback, s, iss) {
                    if (iss) {
                        var login = callback.data;
                        if (login.IsLogged) {
                            localStorage.setItem("Identification", login.Identification);
                            if (login != GData.user)
                                alert("Fatal Error");
                            else
                                AuthentificationApp.Download();
                            return;
                        }
                        UI_1.UI.InfoArea.push('<p class="text-center">Please Check Your <B>Password</B> AND <B>UserName</B></p>', false, 4000);
                    }
                    else
                        UI_1.UI.InfoArea.push('Fatal Error My Friend!!!!', false);
                    GData.spin.Pause();
                    if (!_this.finit)
                        _this.OnInitialized = function (t) { return t.fullInitialize(); };
                });
            };
            AuthentificationApp.Download = function () {
                GData.__data.Products;
                GData.__data.Clear();
                GData.requester.Push(Models_1.models.Categories, GData.__data.Categories, null, function (d, r) { GData.spin.Message = "Categories"; });
                GData.requester.Push(Models_1.models.Products, GData.__data.Products, null, function (d, r) { GData.spin.Message = "Products"; });
                GData.requester.Push(Models_1.models.Costumers, GData.__data.Costumers, null, function (d, r) { GData.spin.Message = "Costumers"; });
                GData.requester.Push(Models_1.models.Fournisseurs, GData.__data.Fournisseurs, null, function (d, r) { ; GData.spin.Message = "Fournisseurs"; });
                GData.requester.Push(Models_1.models.Agents, GData.__data.Agents, null, function (d, r) { GData.spin.Message = "Agents"; });
                GData.requester.Push(Models_1.models.Factures, GData.__data.Factures, null, function (d, r) { GData.spin.Message = "Factures"; });
                GData.requester.Push(Models_1.models.SFactures, GData.__data.SFactures, null, function (d, r) { GData.spin.Message = "Factures"; GData.spin.Pause(); GData.spin.Message = "Wait"; });
                //GVars.requester.Push(models.FakePrices, GVars.__data.Prices, null, (s, r, iss) => { }, null, null);
                //GVars.requester.Push(models.Articles, GVars.__data.Articles, null, (d, r) => { GVars.spin.Message = "Articles"; });
            };
            AuthentificationApp.CheckLogging = function () {
                if (AuthentificationApp.ts == null) {
                    AuthentificationApp.ts = new XMLHttpRequest();
                    var x = function (e) {
                        if (AuthentificationApp.ts.response != "True") {
                            UI_1.UI.Desktop.Current.Wait = true;
                            UI_1.UI.Modal.ShowDialog("Account", "Your Connection To Account Was Closed");
                        }
                        else
                            UI_1.UI.Desktop.Current.Wait = false;
                        //setTimeout(AuthentificationApp.CheckLogging, 60000);
                    };
                    AuthentificationApp.ts.onerror = x;
                    AuthentificationApp.ts.onloadend = x;
                }
                AuthentificationApp.ts.open("GET", "/CheckLogging");
                AuthentificationApp.ts.send();
            };
            AuthentificationApp.prototype.initialize = function () {
                //GData.spin.Start('Logging');
                _super.prototype.initialize.call(this);
                this.fullInitialize();
                this.AutoLogin();
            };
            AuthentificationApp.prototype.fullInitialize = function () {
                this.finit = true;
                this.createLoginPage();
                this.createSignupPage();
                INITJobs.call(this);
                this.SelectedPage = this._loginPage;
            };
            return AuthentificationApp;
        }(UI_1.UI.AuthApp));
        Apps.AuthentificationApp = AuthentificationApp;
    })(Apps || (Apps = {}));
    function INITJobs() {
        var _this = this;
        Corelib_1.bind.Register(new Corelib_1.bind.Job('openlogin', null, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.addEventListener('click', function () { return _this.Open(_this._loginPage); });
        }, null));
        Corelib_1.bind.Register(new Corelib_1.bind.Job('login', null, null, null, function (ji, e) {
            if (!GData.user.Client)
                GData.user.Client = new Models_1.models.Client(0);
            ji.dom.addEventListener('click', (function () { GData.spin.Start('login'); _this.Login(); }).bind(ji));
        }, null));
        Corelib_1.bind.Register(new Corelib_1.bind.Job('opensignup', undefined, undefined, undefined, function (ji, e) {
            var dm = ji.dom;
            if (!GData.user.Client)
                GData.user.Client = new Models_1.models.Client(0);
            dm.addEventListener('click', function () {
                _this.Open(_this._signupPage);
            });
        }, null));
        Corelib_1.bind.Register(new Corelib_1.bind.Job('signup', function () {
        }, null, null, function (ji, e) {
            ji.addEventListener('click', 'click', (function () {
                var t = ji.Scop;
                GData.requester.Post(Models_1.models.Signup, t.Value, null, function (callback, p, iss) {
                    if (iss)
                        var m = UI_1.UI.Modal.ShowDialog('Signup', 'The Signup was successfully created .Please Send a message with your code to activate the account');
                    else {
                    }
                });
            }).bind(ji));
        }, null));
        Corelib_1.bind.Register(new Corelib_1.bind.Job('loggedjob', function (ji) {
            var b = ji.Scop.Value;
            var dm = ji.dom;
            if (b)
                dm.innerText = 'YOU ARE LOGGED';
            else {
                dm.innerText = 'YOU ARE NOT LOGGED';
            }
        }, null, null, function (j, e) { }, null));
    }
    var Init;
    (function (Init) {
        function Main(desk) {
            qshopapis_1.Apis.Load();
            var t = new script_1.Material.App();
            var qshop = new Apps.QShop();
            var auth = new Apps.AuthentificationApp(t);
            desk.Add(auth);
            desk.Add(t);
            desk.Add(qshop);
            Corelib_1.thread.Dispatcher.call(auth, t.Show);
        }
        Init.Main = Main;
    })(Init = exports.Init || (exports.Init = {}));
    var c;
    function process(model) {
    }
    services_1.eServices.registerUpdater({
        Name: 'products', del: function (id) {
            var p = Models_1.models.Product.getById(id) || GData.__data.Products.GetById(id);
            Models_1.models.Product.pStore.Remove(id);
            if (p)
                GData.__data.Products.Remove(p);
        }, edit: function (id, json) {
            var p = Models_1.models.Product.pStore.Get(id) || GData.__data.Products.GetById(id);
            if (p) {
                p.Stat = System_1.sdata.DataStat.Updating;
                p.FromJson(json, Corelib_1.encoding.SerializationContext.GlobalContext, true);
                p.Stat = System_1.sdata.DataStat.Updated;
            }
        }
    });
    var updater = /** @class */ (function () {
        function updater(table, Name) {
            this.table = table;
            this.Name = Name;
        }
        updater.prototype.del = function (id) {
            var d = System_1.sdata.DataRow.getById(id, this.table.ArgType) || this.table.GetById(id);
            if (d) {
                this.table.Remove(d);
                d.Dispose();
            }
        };
        updater.prototype.edit = function (id, json, context) {
            var d = System_1.sdata.DataRow.getById(id, this.table.ArgType) || this.table.GetById(id);
            if (d) {
                d.Stat = System_1.sdata.DataStat.Updating;
                d.FromJson(json, context, true);
                d.Stat = System_1.sdata.DataStat.Updated;
            }
            else {
                d = this.table.CreateNewItem(id);
                d.FromJson(json, context, false);
                this.table.Add(d);
            }
        };
        return updater;
    }());
    exports.updater = updater;
    services_1.eServices.registerUpdater(new updater(GData.__data.Articles, 'articles'));
    services_1.eServices.registerUpdater(new updater(GData.__data.Costumers, 'clients'));
    services_1.eServices.registerUpdater(new updater(GData.__data.Agents, 'agents'));
    services_1.eServices.registerUpdater(new updater(GData.__data.Factures, 'factures'));
    services_1.eServices.registerUpdater(new updater(GData.__data.SFactures, 'sfactures'));
    services_1.eServices.registerUpdater(new updater(GData.__data.Categories, 'categories'));
    services_1.eServices.registerUpdater(new updater(GData.__data.Fournisseurs, 'fournisseurs'));
});
//# sourceMappingURL=Apps.js.map