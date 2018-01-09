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
define(["require", "exports", "../../../js/UI", "../../../js/Corelib", "./../Common", "../models", "../../../js/Filters", "../Basics", "../Search"], function (require, exports, UI_1, Corelib_1, Common_1, models_1, Filters_1, Basics_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    var b = true;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    function crb(dom, icon, title, type, attri) {
        var t = document.createElement(dom);
        t.classList.add('btn', 'btn-' + type, 'glyphicon', 'glyphicon-' + icon);
        t.textContent = '  ' + title;
        for (var i in attri)
            t.setAttribute(i, attri[i]);
        return t;
    }
    var AdminNavs;
    (function (AdminNavs) {
        var FacturesReciption = /** @class */ (function (_super) {
            __extends(FacturesReciption, _super);
            function FacturesReciption() {
                var _this = _super.call(this, "facture_fournisseurs", "Factures <b><u>R</u></b>eciption") || this;
                _this.btn_filter = crb('label', 'filter', '', 'default', {});
                _this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
                _this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
                _this._caption = document.createTextNode("Les Factures de ");
                _this.abonment = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(document.createElement('input')), GData.__data.Costumers);
                _this.searchFilter = new Filters_1.filters.list.StringFilter();
                _this.searchRequest = new models_1.ikmodels.SFactureSearch();
                _this.service = new FactureBaseServices(_this);
                return _this;
            }
            FacturesReciption.prototype.OnContextMenuFired = function (r, selected) {
                if (selected === 'Ouvrir' || selected === 'Supprimer')
                    this.OpenVersments(selected === 'Supprimer');
                else if (selected === 'Regler' || selected === 'Verser')
                    this.verser(selected === 'Regler');
            };
            FacturesReciption.prototype.OpenVersments = function (forDelete) {
                if (this.adapter.SelectedItem)
                    GData.apis.SVersment.OpenSVersmentsOfFacture(this.adapter.SelectedItem, function (results, selected, fournisseur, success) {
                        if (success && forDelete) {
                            if (selected) {
                                UI_1.UI.Modal.ShowDialog("Confirmation", "Voulez- vous vraiment supprimer ce veremnet", function (xx) {
                                    if (xx.Result === UI_1.UI.MessageResult.ok)
                                        GData.apis.SVersment.Delete(true, selected, function (a, b, c) {
                                            if (c === Basics_1.basics.DataStat.Success) {
                                                UI_1.UI.InfoArea.push("Ce Virement Est bien Supprimé", true, 5000);
                                            }
                                            else {
                                                UI_1.UI.InfoArea.push("Une erreur s'est produite lorsque nous avons supprimé cette version", true, 5000);
                                            }
                                        });
                                }, "Supprimer", "Annuler");
                            }
                            else
                                UI_1.UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                        }
                    });
                else {
                    UI_1.UI.InfoArea.push("You Must Set first the client");
                }
            };
            FacturesReciption.prototype.verser = function (regler) {
                var data = this.adapter.SelectedItem;
                if (!data)
                    return UI_1.UI.Modal.ShowDialog("ERROR", "Selecter une Facture pour ajouter une versment");
                if (regler)
                    return GData.apis.SVersment.Regler(data, data.Client);
                GData.apis.SVersment.VerserTo(data, data.Client);
            };
            FacturesReciption.prototype.OnSearche = function (oldPatent, newPatent) {
                this.searchFilter.Patent = new Filters_1.filters.list.StringPatent(newPatent);
            };
            Object.defineProperty(FacturesReciption.prototype, "HasSearch", {
                get: function () { return UI_1.UI.SearchActionMode.Instantany; },
                set: function (v) { },
                enumerable: true,
                configurable: true
            });
            FacturesReciption.prototype.OnKeyDown = function (e) {
                if (!this.adapter.OnKeyDown(e)) {
                    if (e.keyCode === UI_1.UI.Keys.F1)
                        this.getHelp({
                            "F2": "Add New",
                            "F3": "Deep Searche",
                            "F5": "Update",
                            "F9": "Settle Debts",
                            "F10": "Versments",
                            "Suppr": "Delete",
                            "Enter": "Edit"
                        });
                    else if (e.keyCode === UI_1.UI.Keys.F2)
                        this.New();
                    else if (this.adapter.SelectedIndex != -1)
                        if (e.keyCode === 13)
                            this.Open();
                        else if (e.keyCode === UI_1.UI.Keys.Delete)
                            this.Delete();
                        else if (e.keyCode === UI_1.UI.Keys.F9)
                            this.verser(true);
                        else if (e.keyCode === UI_1.UI.Keys.F10)
                            this.OpenVersments(false);
                        else
                            return _super.prototype.OnKeyDown.call(this, e);
                    else
                        return _super.prototype.OnKeyDown.call(this, e);
                }
                e.stopPropagation();
                e.preventDefault();
                return true;
            };
            FacturesReciption.prototype.initializeSBox = function () {
                var _this = this;
                var div = this.group_cnt.View;
                div.appendChild(this.btn_filter);
                this.abonment.Box.Placeholder = 'Select a Client';
                div.appendChild(this.abonment.Box.View);
                this.abonment.Box.Parent = this.group_cnt;
                this.abonment.Box.OnInitialized = function (n) {
                    var s = n.View.style;
                    s.marginTop = '1px';
                    s.cssFloat = 'left';
                    s.width = 'auto';
                    n.applyStyle('form-control');
                };
                this.abonment.Box.View.style.minWidth = '300px';
                this.abonment.initialize();
                this.group_tcnt.View.appendChild(this._caption);
                this.group_tcnt.Add(this.group_cnt);
                this.Add(this.group_tcnt);
                this.btn_filter.addEventListener('click', function () { return _this.OnDeepSearch(); });
            };
            FacturesReciption.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeSBox();
                this.initPaginator();
                var isc = false;
            };
            FacturesReciption.prototype.initPaginator = function () {
                var _this = this;
                this.adapter = new UI_1.UI.ListAdapter('SFactures.table');
                this.adapter.AcceptNullValue = false;
                this.paginator = new UI_1.UI.Paginator(10);
                this.paginator.OnInitialized = function (p) {
                    _this.adapter.OnInitialized = function (l) {
                        l.Source = _this.searchList = GData.__data.SFactures.Filtred(_this.searchFilter).Filtred(_this.paginator.Filter);
                        _this.paginator.BindMaxToSourceCount(GData.__data.SFactures);
                    };
                    _this.paginator.Content = _this.adapter;
                };
                this.Add(this.paginator);
            };
            FacturesReciption.prototype.Search = function (f) {
                var t = GData.__data.Costumers.AsList();
                for (var i = 0, l = t.length; i < l; i++) {
                    var e = t[i];
                }
            };
            FacturesReciption.prototype.GetLeftBar = function () {
                return this.service.GetLeftBar(this);
            };
            FacturesReciption.prototype.GetRightBar = function () {
                return this.service.GetRightBar(this);
            };
            FacturesReciption.prototype.Print = function () {
                Corelib_1.Api.RiseApi('PrintSFacture', { data: this.adapter.SelectedItem });
            };
            FacturesReciption.prototype.Open = function () {
                Corelib_1.Api.RiseApi('OpenSFacture', { data: this.adapter.SelectedItem });
            };
            FacturesReciption.prototype.New = function () {
                Corelib_1.Api.RiseApi('NewSFacture', { data: null, callback: function (p, f) { } });
            };
            FacturesReciption.prototype.FsSave = function () {
                Corelib_1.Api.RiseApi('SaveSFacture', { data: this.adapter.SelectedItem });
            };
            FacturesReciption.prototype.Update = function () {
                GData.apis.SFacture.SmartUpdate();
            };
            FacturesReciption.prototype.FsUpdate = function () {
                Corelib_1.Api.RiseApi('UpdateSFacture', { data: this.adapter.SelectedItem });
            };
            FacturesReciption.prototype.Validate = function () {
                Corelib_1.Api.RiseApi('ValidateSFacture', { data: this.adapter.SelectedItem });
            };
            FacturesReciption.prototype.Delete = function () {
                Corelib_1.Api.RiseApi('DeleteSFacture', { data: this.adapter.SelectedItem });
            };
            FacturesReciption.prototype.OnDeepSearch = function () {
                var _this = this;
                if (!this._deepSearch)
                    this._deepSearch = new Search_1.SearchData.SFacture;
                this._deepSearch.Open(function (x) {
                    var t = _this.searchList.Filter == _this._deepSearch;
                    _this.searchList.Filter = _this._deepSearch;
                    if (t)
                        _this.searchList.Reset();
                });
            };
            return FacturesReciption;
        }(UI_1.UI.NavPanel));
        AdminNavs.FacturesReciption = FacturesReciption;
        var FacturesLivraison = /** @class */ (function (_super) {
            __extends(FacturesLivraison, _super);
            function FacturesLivraison() {
                var _this = _super.call(this, "facture_clientels", "Factures <b><u>L</u></b>ivraison ") || this;
                _this.btn_filter = crb('label', 'filter', '', 'default', {});
                _this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
                _this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
                _this._caption = document.createTextNode("Les Factures de ");
                _this.abonment = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(document.createElement('input')), GData.__data.Costumers);
                _this.searchRequest = new models_1.ikmodels.FactureSearch();
                _this.service = new FactureBaseServices(_this);
                return _this;
            }
            FacturesLivraison.prototype.OnDeepSearch = function () {
                var _this = this;
                if (!this._deepSearch)
                    this._deepSearch = new Search_1.SearchData.Facture;
                this._deepSearch.Open(function (x) {
                    var t = _this.searchList.Filter == _this._deepSearch;
                    _this.searchList.Filter = _this._deepSearch;
                    if (t)
                        _this.searchList.Reset();
                });
            };
            FacturesLivraison.prototype.Update = function () {
                GData.apis.Facture.SmartUpdate();
            };
            FacturesLivraison.prototype.OnKeyDown = function (e) {
                if (!this.adapter.OnKeyDown(e)) {
                    if (e.keyCode === UI_1.UI.Keys.F1)
                        this.getHelp({
                            "F2": "Add New",
                            "F3": "Deep Searche",
                            "F5": "Update",
                            "F9": "Settle Debts",
                            "F10": "Versments",
                            "Suppr": "Delete",
                            "Enter": "Edit"
                        });
                    else if (e.keyCode === UI_1.UI.Keys.F2)
                        this.New();
                    else if (this.adapter.SelectedIndex != -1)
                        if (e.keyCode === 13)
                            this.Open();
                        else if (e.keyCode === UI_1.UI.Keys.Delete)
                            this.Delete();
                        else if (e.keyCode === UI_1.UI.Keys.F9)
                            this.verser(true);
                        else if (e.keyCode === UI_1.UI.Keys.F10)
                            this.OpenVersments(false);
                        else
                            return _super.prototype.OnKeyDown.call(this, e);
                    else
                        return _super.prototype.OnKeyDown.call(this, e);
                }
                e.stopPropagation();
                e.preventDefault();
                return true;
            };
            FacturesLivraison.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                var div = this.group_cnt.View;
                div.appendChild(this.btn_filter);
                this.abonment.Box.Placeholder = 'Select a Client';
                div.appendChild(this.abonment.Box.View);
                this.abonment.Box.Parent = this.group_cnt;
                this.abonment.Box.OnInitialized = function (n) {
                    var s = n.View.style;
                    s.marginTop = '1px';
                    s.cssFloat = 'left';
                    s.width = 'auto';
                    n.applyStyle('form-control');
                };
                this.abonment.Box.View.style.minWidth = '300px';
                this.abonment.initialize();
                this.group_tcnt.View.appendChild(this._caption);
                this.group_tcnt.Add(this.group_cnt);
                this.Add(this.group_tcnt);
                this.initPaginator();
                var isc = false;
                this.btn_filter.addEventListener('click', function () { return _this.OnDeepSearch(); });
                this.adapter.AcceptNullValue = false;
            };
            FacturesLivraison.prototype.Search = function (f) {
                var t = GData.__data.Costumers.AsList();
                for (var i = 0, l = t.length; i < l; i++) {
                    var e = t[i];
                }
            };
            FacturesLivraison.prototype.initPaginator = function () {
                var _this = this;
                this.paginator = new UI_1.UI.Paginator(15);
                this.paginator.OnInitialized = function (p) {
                    _this.adapter = new UI_1.UI.ListAdapter('Factures.InValidation', 'Factures.row');
                    _this.adapter.OnInitialized = function (l) {
                        var x = _this.searchList = Corelib_1.collection.ExList.New(GData.__data.Factures, _this.searchFilter = new models_1.ikmodels.FSFilter(_this.searchRequest));
                        l.Source = Corelib_1.collection.ExList.New(x, _this.paginator.Filter);
                        _this.paginator.BindMaxToSourceCount(x);
                    };
                    _this.paginator.Content = _this.adapter;
                };
                this.Add(this.paginator);
            };
            FacturesLivraison.prototype.GetLeftBar = function () {
                return this.service.GetLeftBar(this);
            };
            FacturesLivraison.prototype.GetRightBar = function () {
                return this.service.GetRightBar(this);
            };
            FacturesLivraison.prototype.Print = function () {
                Corelib_1.Api.RiseApi('PrintFacture', { data: this.adapter.SelectedItem });
            };
            FacturesLivraison.prototype.Open = function () {
                Corelib_1.Api.RiseApi('OpenFacture', { data: this.adapter.SelectedItem });
            };
            FacturesLivraison.prototype.New = function () {
                Corelib_1.Api.RiseApi("NewFacture", {
                    data: null,
                    callback: function (p, k) { }
                });
            };
            FacturesLivraison.prototype.FsSave = function () {
                Corelib_1.Api.RiseApi('SaveFacture', { data: this.adapter.SelectedItem });
            };
            FacturesLivraison.prototype.FsUpdate = function () {
                Corelib_1.Api.RiseApi('UpdateFacture', { data: this.adapter.SelectedItem });
            };
            FacturesLivraison.prototype.Validate = function () {
                Corelib_1.Api.RiseApi('ValidateFacture', { data: this.adapter.SelectedItem });
            };
            FacturesLivraison.prototype.Delete = function () {
                Corelib_1.Api.RiseApi('DeleteFacture', { data: this.adapter.SelectedItem });
            };
            FacturesLivraison.prototype.OnContextMenuFired = function (r, selected) {
                if (selected === 'Ouvrir' || selected === 'Supprimer')
                    this.OpenVersments(selected === 'Supprimer');
                else if (selected === 'Regler' || selected === 'Verser')
                    this.verser(selected === 'Regler');
            };
            FacturesLivraison.prototype.OpenVersments = function (forDelete) {
                if (this.adapter.SelectedItem)
                    GData.apis.Versment.OpenVersmentsOfFacture(this.adapter.SelectedItem, function (results, selected, fournisseur, success) {
                        if (success && forDelete) {
                            if (selected) {
                                UI_1.UI.Modal.ShowDialog("Confirmation", "Voulez- vous vraiment supprimer ce veremnet", function (xx) {
                                    if (xx.Result === UI_1.UI.MessageResult.ok)
                                        GData.apis.Versment.Delete(true, selected, function (a, b, c) {
                                            if (c === Basics_1.basics.DataStat.Success) {
                                                UI_1.UI.InfoArea.push("Ce Virement Est bien Supprimé", true, 5000);
                                            }
                                            else {
                                                UI_1.UI.InfoArea.push("Une erreur s'est produite lorsque nous avons supprimé cette version", true, 5000);
                                            }
                                        });
                                }, "Supprimer", "Annuler");
                            }
                            else
                                UI_1.UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                        }
                    });
                else {
                    UI_1.UI.InfoArea.push("You Must Set first the client");
                }
            };
            FacturesLivraison.prototype.verser = function (regler) {
                var data = this.adapter.SelectedItem;
                if (!data)
                    return UI_1.UI.Modal.ShowDialog("ERROR", "Selecter une Facture pour ajouter une versment");
                if (regler)
                    return GData.apis.Versment.Regler(data, data.Client);
                GData.apis.Versment.VerserTo(data, data.Client);
            };
            return FacturesLivraison;
        }(UI_1.UI.NavPanel));
        AdminNavs.FacturesLivraison = FacturesLivraison;
    })(AdminNavs = exports.AdminNavs || (exports.AdminNavs = {}));
    var FactureBaseServices = /** @class */ (function () {
        function FactureBaseServices(target) {
            this.target = target;
        }
        FactureBaseServices.prototype.GetLeftBar = function (target) {
            var _this = this;
            if (this.lb)
                return this.lb;
            this.lb = new UI_1.UI.Navbar();
            var oldget = this.lb.getTemplate;
            this.rm;
            this.lb.getTemplate = function (c) {
                var x = new UI_1.UI.Anchore(c);
                var e = oldget(x);
                e.addEventListener('click', _this.callback, { t: _this, p: c });
                return e;
            };
            this.lb.OnInitialized = function (n) {
                var _creditCart;
                n.AddRange([
                    new UI_1.UI.Glyph(UI_1.UI.Glyphs.edit, false, 'Edit'),
                    new UI_1.UI.Glyph(UI_1.UI.Glyphs.plusSign, false, 'New'),
                    new UI_1.UI.Glyph(UI_1.UI.Glyphs.fire, false, 'Delete'),
                    Common_1.funcs.createSparator(),
                    new UI_1.UI.Glyph(UI_1.UI.Glyphs.print, false, 'Print'),
                    Common_1.funcs.createSparator(),
                    _creditCart = new UI_1.UI.Glyph(UI_1.UI.Glyphs.creditCard, false, 'Versment Manager'),
                ]);
                _this.rm = new UI_1.UI.RichMenu(undefined, ["Regler", "Verser", "Supprimer", "", "Ouvrir"], _creditCart);
            };
        };
        FactureBaseServices.prototype.GetRightBar = function (target) {
            var _this = this;
            if (this.rb)
                return this.rb;
            this.rb = new UI_1.UI.Navbar();
            var oldget = this.rb.getTemplate;
            this.rb.getTemplate = function (c) {
                var x = new UI_1.UI.Anchore(c);
                var e = oldget(x);
                e.addEventListener('click', _this.callback, { t: _this, p: c });
                return e;
            };
            this.rb.OnInitialized = function (n) { return n.AddRange([
                new UI_1.UI.Glyph(UI_1.UI.Glyphs.refresh, false, 'Update'),
                new UI_1.UI.Glyph(UI_1.UI.Glyphs.check, false, 'Validate'),
                new UI_1.UI.Glyph(UI_1.UI.Glyphs.floppyDisk, false, 'Save')
            ]); };
        };
        FactureBaseServices.prototype.callback = function (x, e, c) {
            var target = c.t.target;
            switch (c.p.Type) {
                case UI_1.UI.Glyphs.refresh:
                    return target.FsUpdate();
                case UI_1.UI.Glyphs.check:
                    return target.Validate();
                case UI_1.UI.Glyphs.floppyDisk:
                    return target.FsSave();
                case UI_1.UI.Glyphs.edit:
                    return target.Open();
                case UI_1.UI.Glyphs.plusSign:
                    return target.New();
                case UI_1.UI.Glyphs.fire:
                    return target.Delete();
                case UI_1.UI.Glyphs.print:
                    return target.Print();
                case UI_1.UI.Glyphs.creditCard:
                    c.t.rm.Open(e, { Owner: c.t, Invoke: c.t.OnContextMenuFired }, null, true);
                    break;
                default:
                    UI_1.UI.InfoArea.push("Unrechable Code");
                    return;
            }
        };
        FactureBaseServices.prototype.OnContextMenuFired = function (r, selected) {
            if (selected === 'Ouvrir' || selected === 'Supprimer')
                this.target.OpenVersments(selected === 'Supprimer');
            else if (selected === 'Regler' || selected === 'Verser')
                this.target.verser(selected === 'Regler');
        };
        FactureBaseServices.prototype.Print = function (g, m, t) { t.target.Print(); };
        FactureBaseServices.prototype.Open = function (g, m, t) { t.target.Open(); };
        FactureBaseServices.prototype.New = function (g, m, t) { t.target.New(); };
        FactureBaseServices.prototype.Versement = function (g, m, t) {
            t.rm.Open(m, { Owner: t.target, Invoke: t.target.OnContextMenuFired }, null, true);
        };
        FactureBaseServices.prototype.FsSave = function (g, m, t) { t.target.FsSave(); };
        FactureBaseServices.prototype.Update = function (g, m, t) { t.target.FsUpdate(); };
        FactureBaseServices.prototype.Validate = function (g, m, t) { t.target.Validate(); };
        FactureBaseServices.prototype.Delete = function (g, m, t) { t.target.Delete(); };
        return FactureBaseServices;
    }());
});
//# sourceMappingURL=ListOfFactures.js.map