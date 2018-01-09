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
define(["require", "exports", "../../js/UI", "../../js/Facebook", "../../js/Critere", "../../js/Corelib", "../../js/Models", "./Common", "../../js/Filters", "./Services/QServices", "./Basics", "./Search"], function (require, exports, UI_1, Facebook_1, Critere_1, Corelib_1, Models_1, Common_1, Filters_1, QServices_1, Basics_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { basics } from './Basics';
    window["Test"] = function test() {
        var c = new Critere_1.Critere.Period("Test Period");
        c.Title = "Tested Title";
        var v = c.View;
        c.View.Parent = UI_1.UI.Desktop.Current;
        document.body.appendChild(c.View.View);
        return c;
    };
    window["SearchData"] = Search_1.SearchData;
    window["UI"] = UI_1.UI;
    window["Test1"] = function test(x) {
        var m = new UI_1.UI.Modal();
        var c = new Search_1.SearchData.Product();
        var l = new Corelib_1.collection.ExList(Object);
        l.Source = GData.__data.Products;
        m.OnInitialized = function (m) {
            var v = c.View;
            m.Add(c.View);
        };
        m.OnClosed.On = function (n) {
            { }
            if (!l.Filter)
                l.Filter = c;
            l.Reset();
        };
        document.addEventListener('keyup', function (e) { if (e.keyCode == UI_1.UI.Keys.F3)
            m.Open(); });
        return { model: m, data: c, l: l };
    };
    window["Test2"] = function test() {
        var c = new Search_1.SearchData.SFacture();
        var v = c.View;
        document.body.appendChild(c.View.View);
        return c;
    };
    var key;
    var event = new Corelib_1.bind.EventListener(key = Math.random() * 2099837662);
    var facturePage;
    var chooseClient;
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var Pages;
    (function (Pages) {
        var SearchPage = /** @class */ (function (_super) {
            __extends(SearchPage, _super);
            function SearchPage(app) {
                var _this = _super.call(this, app, 'Search', 'Search') || this;
                _this.fs = new QServices_1.Services.SearchServices();
                return _this;
            }
            SearchPage.prototype.getSuggessions = function () { return GData.__data.Products; };
            SearchPage.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.paginator = new UI_1.UI.Paginator(21);
                this.paginator.OnInitialized = function (p) {
                    (_this.pstore = new UI_1.UI.ListAdapter('Products.card')).OnInitialized = function (l) {
                        l.Source =
                            _this.paginationList = Corelib_1.collection.ExList.New(_this.searchList = Corelib_1.collection.ExList.New(GData.__data.Products, new Filters_1.filters.list.StringFilter()), _this.paginator.Filter);
                        _this.paginator.BindMaxToSourceCount(_this.searchList);
                    };
                    _this.paginator.Content = _this.pstore;
                };
                this.Add(this.paginator);
            };
            SearchPage.prototype.OnSearche = function (o, n) {
                this.HasSearch;
                this.searchList.Filter.Patent = new Filters_1.filters.list.StringPatent(n);
            };
            Object.defineProperty(SearchPage.prototype, "HasSearch", {
                get: function () { return UI_1.UI.SearchActionMode.Instantany; },
                enumerable: true,
                configurable: true
            });
            SearchPage.prototype.GetLeftBar = function () {
                return null;
            };
            SearchPage.prototype.Update = function () {
                GData.apis.Product.SmartUpdate();
            };
            SearchPage.prototype.Callback = function (args) {
            };
            SearchPage.prototype.Handled = function () {
                return true;
            };
            SearchPage.prototype.OnDeepSearche = function () {
                var _this = this;
                if (!this._deepSearch)
                    this._deepSearch = new Search_1.SearchData.Product();
                this._deepSearch.Open(function (x) {
                    var c = _this.searchList.Filter;
                    var t = c == _this._deepSearch;
                    _this.searchList.Filter = _this._deepSearch;
                    if (t)
                        _this.searchList.Reset();
                });
            };
            return SearchPage;
        }(UI_1.UI.Page));
        Pages.SearchPage = SearchPage;
        var FacturesPage = /** @class */ (function (_super) {
            __extends(FacturesPage, _super);
            function FacturesPage(app) {
                var _this = _super.call(this, app, 'Factures', 'Factures') || this;
                _this.service = new QServices_1.Services.FacturesService();
                return _this;
            }
            FacturesPage.prototype.getSuggessions = function () { return GData.__data.Factures; };
            FacturesPage.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.paginator = new UI_1.UI.Paginator(6);
                this.HasSearch = UI_1.UI.SearchActionMode.Instantany;
                this.paginator.OnInitialized = function (p) {
                    (_this.pstore = new UI_1.UI.ListAdapter(undefined, 'Facture')).OnInitialized = function (l) {
                        l.Content.applyStyle('reg');
                        l.OnItemInserted.On = function (s, i, d, t) { return t.applyStyle('list-group-item', "col-lg-4", "col-md-6"); };
                        l.Source =
                            _this.paginationList = Corelib_1.collection.ExList.New(_this.searchList = Corelib_1.collection.ExList.New(GData.__data.Factures, new Filters_1.filters.list.StringFilter()), _this.paginator.Filter);
                        _this.paginator.BindMaxToSourceCount(_this.searchList);
                    };
                    _this.paginator.Content = _this.pstore;
                };
                this.Add(this.paginator);
            };
            FacturesPage.prototype.OnSearche = function (o, n) {
                this.searchList.Filter.Patent = new Filters_1.filters.list.StringPatent(n);
            };
            FacturesPage.prototype.GetLeftBar = function () {
                this.service.ApplyTo(this);
                return this.service;
            };
            FacturesPage.prototype.Callback = function (args) {
                var m = args;
                switch (m.Tag) {
                    case 'select':
                        var si = this.pstore.SelectedItem;
                        if (si == null) {
                            this.pstore.SelectedIndex = 0;
                            si = this.pstore.SelectedItem;
                        }
                        if (si == null)
                            return UI_1.UI.InfoArea.push("There no Facture to Open", false);
                        GData.spin.Start("The Facture Is Loading");
                        GData.apis.Facture.LoadArticlesOf(si, function (d, v, k) {
                            if (k == Basics_1.basics.DataStat.Success) {
                                GData.__data.SelectedFacture = si;
                                UI_1.UI.App.CurrentApp.OpenPage('Facture');
                            }
                            else
                                UI_1.UI.InfoArea.push("An Expected Error Happened When Trying Open Facture");
                            GData.spin.Pause();
                        });
                        break;
                    case 'new':
                        var t = new Models_1.models.Facture(Corelib_1.basic.New());
                        GData.__data.Factures.Add(t);
                        GData.__data.SelectedFacture = t;
                        UI_1.UI.App.CurrentApp.OpenPage('Search');
                        break;
                }
            };
            FacturesPage.prototype.Handled = function () {
                return true;
            };
            FacturesPage.prototype.OnDeepSearche = function () {
                var _this = this;
                if (!this._deepSearch)
                    this._deepSearch = new Search_1.SearchData.Facture();
                this._deepSearch.Open(function (x) {
                    var c = _this.searchList.Filter;
                    var t = c == _this._deepSearch;
                    _this.searchList.Filter = _this._deepSearch;
                    if (t)
                        _this.searchList.Reset();
                });
            };
            return FacturesPage;
        }(UI_1.UI.Page));
        Pages.FacturesPage = FacturesPage;
        var FacturePage = /** @class */ (function (_super) {
            __extends(FacturePage, _super);
            function FacturePage(app) {
                var _this = _super.call(this, app, 'Facture', 'Facture') || this;
                facturePage = _this;
                Corelib_1.bind.Register({
                    OnInitialize: function (ji, e) {
                        var dm = ji.dom;
                        dm.onclick = function () {
                            var f = GData.__data.SelectedFacture;
                            if (f && !f.IsFrozen())
                                facturePage.Modal.Open();
                        };
                    }, Check: null, Name: "selectcostumer", OnScopDisposing: null, OnError: null, Todo: null
                }, true);
                return _this;
            }
            Object.defineProperty(FacturePage.prototype, "Modal", {
                get: function () {
                    var _this = this;
                    if (this.modal == null) {
                        this.modal = new UI_1.UI.Modal();
                        this.modal.OnInitialized = function (m) {
                            var c = _this.c = new CostumersPage(_this.app);
                            _this.modal.View.style.maxHeight = document.body.clientHeight + 'px';
                            m.Add(c);
                            m.OnClosed.On = function (e) {
                                if (e.msg == 'ok') {
                                    if (c.costumers.SelectedItem)
                                        GData.__data.SelectedFacture.Client = c.costumers.SelectedItem;
                                }
                            };
                        };
                    }
                    else {
                        if (this.c.costumers == null) { }
                        this.c.costumers.SelectItem(GData.__data.SelectedFacture.Client);
                    }
                    return this.modal;
                },
                enumerable: true,
                configurable: true
            });
            FacturePage.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.service = new QServices_1.Services.FactureService();
                this.rservice = new QServices_1.Services.RFactureServices();
                this.OnSelected.On = function (p) { if (GData.__data.SelectedFacture == null) {
                    UI_1.UI.Modal.ShowDialog('<span class="glyphicon glyphicon-eye-open"></span> Information', '<p class="text-center">Please Select One Facture First</p>', null, 'OK', 'Cancel');
                    _this.app.OpenPage('Factures');
                } };
                var t = this.filter = new Filters_1.filters.list.StringFilter();
                GData.__data.OnPropertyChanged(Models_1.models.QData.DPSelectedFacture, function (s, e) { return _this.adapter.Source = e._new == null ? null : e._new.Articles; });
                this.Add(this.adapter = new UI_1.UI.ListAdapter('Facture.list', null, GData.__data, true));
            };
            FacturePage.prototype.Update = function () {
                var si = GData.__data.SelectedFacture;
                GData.apis.Facture.UpdateArticlesOf(si);
            };
            FacturePage.prototype.GetLeftBar = function () {
                this.service.ApplyTo(this);
                return this.service;
            };
            FacturePage.prototype.GetRightBar = function () {
                this.rservice.ApplyTo(this);
                return this.rservice;
            };
            FacturePage.prototype.Callback = function (args) {
                var m = args;
                switch (m.Tag) {
                    case 'add':
                        this.app.OpenPage('Search');
                        break;
                    case 'select':
                        this.Modal.Open();
                        break;
                    case 'delete':
                        var si = GData.__data.SelectedFacture;
                        GData.spin.Start("Deleting Facture");
                        GData.apis.Facture.Delete(true, si, function (xx, dd, f) {
                            GData.spin.Pause();
                        });
                        break;
                    case 'new':
                        GData.apis.Facture.New(function (t) {
                            GData.__data.Factures.Add(t);
                            GData.__data.SelectedFacture = t;
                        }, false);
                        break;
                    case 'save':
                        var sf = GData.__data.SelectedFacture;
                        if (sf) {
                            if (sf.IsValidated || sf.IsFrozen()) {
                                UI_1.UI.InfoArea.push("<p><h3>This Facture </h3><h2 style='position:relative' > It's</h2> <h1>Frozen</h1></p>");
                                return;
                            }
                            GData.spin.Start("Saving");
                            GData.apis.Facture.Save(sf, false, function (xx, d, i) {
                                sf.CalcTotal();
                                GData.spin.Pause();
                            });
                        }
                        else
                            UI_1.UI.InfoArea.push('<p class="text-center">Please Select One Facture First</p>');
                        break;
                    case 'discart':
                        var c = GData.__data.SelectedFacture;
                        if (c)
                            UI_1.UI.Modal.ShowDialog('Confirm', 'Are you sure to <b style="background:red">Discart</b> this Facture', function (xx) {
                                if (xx.Result === UI_1.UI.MessageResult.ok)
                                    GData.apis.Facture.Update(sf);
                            }, 'Yes', 'No');
                        else
                            UI_1.UI.InfoArea.push('<p class="text-center">Please Select One Facture First</p>');
                        break;
                }
            };
            FacturePage.prototype.Handled = function () {
                return true;
            };
            return FacturePage;
        }(UI_1.UI.Page));
        Pages.FacturePage = FacturePage;
        var CostumersPage = /** @class */ (function (_super) {
            __extends(CostumersPage, _super);
            function CostumersPage(app) {
                return _super.call(this, app, 'Costumers', 'Costumers') || this;
            }
            CostumersPage.prototype.GetRightBar = function () {
                if (!this.lb)
                    this.lb = new QServices_1.Services.CostumersService();
                return this.lb.ApplyTo(this);
            };
            CostumersPage.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.paginator = new UI_1.UI.Paginator(6);
                this.HasSearch = UI_1.UI.SearchActionMode.Instantany;
                this.paginator.OnInitialized = function (p) {
                    (_this.costumers = new UI_1.UI.ListAdapter('Client.clients', 'Client.info', GData.user.Client)).OnInitialized = function (l) {
                        l.OnItemInserted.On = function (s, i, d, t) { return t.applyStyle('list-group-item'); };
                        l.Source =
                            _this.paginationList = Corelib_1.collection.ExList.New(_this.searchList = Corelib_1.collection.ExList.New(GData.__data.Costumers, new Filters_1.filters.list.StringFilter()), _this.paginator.Filter);
                        _this.paginator.BindMaxToSourceCount(_this.searchList);
                        l.OnItemSelected.On = function (l, i, t) {
                            return _this.selectedItem = t && t.getDataContext();
                        };
                    };
                    _this.paginator.Content = _this.costumers;
                };
                this.Add(this.paginator);
                this.service = new QServices_1.Services.MyClientsService();
            };
            CostumersPage.prototype.OnSearche = function (o, n) {
                this.searchList.Filter.Patent = new Filters_1.filters.list.StringPatent(n);
            };
            CostumersPage.prototype.GetLeftBar = function () {
                this.service.ApplyTo(this);
                return this.service;
            };
            CostumersPage.prototype.getSuggessions = function () { return GData.__data.Costumers; };
            CostumersPage.ctor = function () {
                this.fb = Facebook_1.Facebook.Default();
            };
            CostumersPage.prototype.sendInvitations = function () {
                var _this = this;
                UI_1.UI.Spinner.Default.Start('Facebook Is Connecting ....');
                var fb = CostumersPage.fb;
                var isconnected = fb.IsConnected;
                if (isconnected) {
                    UI_1.UI.Spinner.Default.Start('Please wait for moment until we send invitations to your friends');
                    fb.getFriendsList(function (fb, list) {
                        UI_1.UI.Modal.ShowDialog("My Friends", "<h1><ul> You have " + list.data.length + " Friends</ul></h1>");
                        UI_1.UI.Spinner.Default.Pause();
                    });
                }
                else if (isconnected === null) {
                    fb.Login(function (r) {
                        if (r.status === 'connected')
                            _this.sendInvitations();
                        else {
                            UI_1.UI.Spinner.Default.Pause();
                            UI_1.UI.InfoArea.push('We cannot connect to facebook');
                        }
                    });
                }
                else {
                    UI_1.UI.Spinner.Default.Pause();
                    UI_1.UI.InfoArea.push('We cannot connect to facebook');
                }
            };
            CostumersPage.prototype.Callback = function (args) {
                var _this = this;
                var m = args;
                switch (m.Tag) {
                    case 'select':
                        var si = this.costumers.SelectedItem;
                        GData.__data.SelectedFacture.Client = si;
                        break;
                    case 'delete':
                        var si = this.costumers.SelectedItem;
                        GData.apis.Client.Delete(true, si, function (item, isNew, error) {
                            var o = _this.costumers.SelectedIndex;
                            _this.costumers.SelectedIndex = 0;
                            _this.costumers.SelectedIndex = o;
                        });
                        break;
                    case 'new':
                        GData.apis.Client.CreateNew();
                        return;
                    case 'edit':
                        GData.apis.Client.Edit(true, this.selectedItem, false);
                        break;
                    case 'send':
                        UI_1.UI.Modal.ShowDialog("<strong> Send Invitations to my friends", "Do you want realy to send invitation to your friends", function (e) {
                            var fb = CostumersPage.fb;
                            if (e.Result === UI_1.UI.MessageResult.ok) {
                                if (!fb.IsConnected) {
                                    fb.RegisterScop([
                                        "email", "public_profile",
                                        "read_custom_friendlists",
                                        "user_about_me", "user_birthday",
                                        "user_friends",
                                        "user_hometown", "user_location",
                                        "invitable_friends"
                                    ]);
                                    fb.Connect(function (fb) {
                                        _this.sendInvitations();
                                    });
                                }
                                else
                                    _this.sendInvitations();
                            }
                        }, "Send", "Cancel");
                        break;
                    case 'get':
                        break;
                }
            };
            CostumersPage.prototype.Handled = function () {
                return true;
            };
            CostumersPage.prototype.OnDeepSearche = function () {
                var _this = this;
                if (!this._deepSearch)
                    this._deepSearch = new Search_1.SearchData.Client;
                this._deepSearch.Open(function (x) {
                    var c = _this.searchList.Filter;
                    var t = c == _this._deepSearch;
                    _this.searchList.Filter = _this._deepSearch;
                    if (t)
                        _this.searchList.Reset();
                });
            };
            return CostumersPage;
        }(UI_1.UI.Page));
        Pages.CostumersPage = CostumersPage;
    })(Pages = exports.Pages || (exports.Pages = {}));
});
//# sourceMappingURL=Pages.js.map