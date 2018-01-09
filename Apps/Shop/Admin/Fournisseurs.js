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
define(["require", "exports", "../../../js/UI", "../Common", "../Basics", "../../../js/Filters", "../Search"], function (require, exports, UI_1, Common_1, Basics_1, Filters_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var Fournisseurs = /** @class */ (function (_super) {
        __extends(Fournisseurs, _super);
        function Fournisseurs() {
            var _this = _super.call(this, "Fournissurs", "<b><u>F</u></b>ournisseurs") || this;
            _this.btn_filter = UI_1.UI.Modals.CreateGlyph('label', 'filter', '', 'default', {});
            _this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
            _this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
            _this._caption = document.createTextNode("Fournisseurs");
            _this.abonment = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(document.createElement('input')), GData.__data.Costumers);
            _this.searchFilter = new Filters_1.filters.list.StringFilter();
            _this._creditCart = new UI_1.UI.Glyph(UI_1.UI.Glyphs.creditCard, false, 'Add');
            _this.rm = new UI_1.UI.RichMenu(undefined, ["Regler", "Verser", "Supprimer", "", "Ouvrir"], _this._creditCart);
            return _this;
        }
        Fournisseurs.prototype.OnSearche = function (oldPatent, newPatent) {
            var t = this.searchList.Filter == this.searchFilter;
            this.searchFilter.Patent = new Filters_1.filters.list.StringPatent(newPatent);
            if (!t)
                this.searchList.Filter = this.searchFilter;
            else
                this.searchList.Reset();
        };
        Fournisseurs.prototype.OnDeepSearch = function () {
            var _this = this;
            if (!this._deepSearch)
                this._deepSearch = new Search_1.SearchData.Fournisseur;
            this._deepSearch.Open(function (x) {
                var t = _this.searchList.Filter == _this._deepSearch;
                _this.searchList.Filter = _this._deepSearch;
                if (t)
                    _this.searchList.Reset();
            });
        };
        Object.defineProperty(Fournisseurs.prototype, "HasSearch", {
            get: function () { return UI_1.UI.SearchActionMode.Instantany; },
            set: function (v) { },
            enumerable: true,
            configurable: true
        });
        Fournisseurs.prototype.OnKeyDown = function (e) {
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
                    this.AddFournisseur();
                else if (this.adapter.SelectedIndex != -1)
                    if (e.keyCode === 13)
                        this.EditFournisseur();
                    else if (e.keyCode === UI_1.UI.Keys.Delete)
                        this.RemoveFournisseur();
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
        Fournisseurs.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this.initializeSBox();
            this.adapter = new UI_1.UI.ListAdapter('Fournisseur.table').applyStyle('row');
            this.adapter.OnInitialized = function (n) { return n.Source = _this.searchList = GData.__data.Fournisseurs.Filtred(_this.searchFilter); };
            this.Add(this.adapter);
            this.adapter.AcceptNullValue = false;
        };
        Fournisseurs.prototype.initializeSBox = function () {
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
            this.btn_filter.addEventListener('click', function () {
            });
        };
        Fournisseurs.prototype.Update = function () {
            GData.apis.Fournisseur.SmartUpdate();
        };
        Fournisseurs.prototype.AddFournisseur = function () {
            GData.apis.Fournisseur.CreateNew(function (f) { });
            //GData.apis.Fournisseur.New((n, i, x) => {
            //    if (x === basics.DataStat.Success) {
            //        GData.apis.Fournisseur.Edit(true, n, i);
            //    }
            //}, false, false)
        };
        Fournisseurs.prototype.RemoveFournisseur = function () {
            GData.apis.Fournisseur.Delete(true, this.adapter.SelectedItem, null);
        };
        Fournisseurs.prototype.EditFournisseur = function () {
            GData.apis.Fournisseur.Edit(true, this.adapter.SelectedItem, false);
        };
        Fournisseurs.prototype.Search = function () {
        };
        Fournisseurs.prototype.GetLeftBar = function () {
            var _this = this;
            if (!this.lb) {
                this.lb = new UI_1.UI.Navbar();
                var oldget = this.lb.getTemplate;
                this.lb.getTemplate = function (c) {
                    var x = new UI_1.UI.Anchore(c);
                    var e = oldget(x);
                    e.addEventListener('click', _this.callback, { t: _this, p: c });
                    return e;
                };
                var _creditCart;
                this.lb.OnInitialized = function (n) { return n.AddRange([
                    new UI_1.UI.Glyph(UI_1.UI.Glyphs.plusSign, false, 'Add'),
                    new UI_1.UI.Glyph(UI_1.UI.Glyphs.edit, false, 'Edit'),
                    new UI_1.UI.Glyph(UI_1.UI.Glyphs.fire, false, "Delete")
                ]); };
            }
            return this.lb;
        };
        Fournisseurs.prototype.GetRightBar = function () {
            var _this = this;
            if (!this.rb) {
                this.rb = new UI_1.UI.Navbar();
                var oldget = this.rb.getTemplate;
                this.rb.getTemplate = function (c) {
                    var x = new UI_1.UI.Anchore(c);
                    var e = oldget(x);
                    e.addEventListener('click', _this.callback, { t: _this, p: c });
                    return e;
                };
                this.rb.OnInitialized = function (n) { return n.AddRange([
                    _this._creditCart
                ]); };
            }
            return this.rb;
        };
        Fournisseurs.prototype.callback = function (s, e, p) {
            var __this = p.t;
            switch (p.p.Type) {
                case UI_1.UI.Glyphs.plusSign:
                    __this.AddFournisseur();
                    break;
                case UI_1.UI.Glyphs.edit:
                    __this.EditFournisseur();
                    break;
                case UI_1.UI.Glyphs.fire:
                    __this.RemoveFournisseur();
                    break;
                case UI_1.UI.Glyphs.search:
                    __this.Search();
                    break;
                case UI_1.UI.Glyphs.creditCard:
                    p.t.rm.Open(e, { Owner: __this, Invoke: p.t.OnContextMenuFired }, null, true);
                    break;
                default:
                    UI_1.UI.InfoArea.push("Unrechable Code");
                    return;
            }
        };
        Fournisseurs.prototype.OnContextMenuFired = function (r, selected) {
            if (selected === 'Ouvrir' || selected === 'Supprimer')
                this.OpenVersments(selected === 'Supprimer');
            else if (selected === 'Regler' || selected === 'Verser')
                this.verser(selected === 'Regler');
        };
        Fournisseurs.prototype.OpenVersments = function (forDelete) {
            if (this.adapter.SelectedItem)
                GData.apis.SVersment.OpenSVersmentsOfFournisseur(this.adapter.SelectedItem, function (results, selected, fournisseur, success) {
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
                    }
                });
            else {
                UI_1.UI.InfoArea.push("You Must Select At Least one Provider");
            }
        };
        Fournisseurs.prototype.verser = function (regler) {
            var data = this.adapter.SelectedItem;
            if (!data)
                return UI_1.UI.Modal.ShowDialog("ERROR", "Selecter une Fournisseur pour ajouter une versment");
            if (regler)
                return GData.apis.SVersment.Regler(null, data);
            GData.apis.SVersment.VerserTo(null, data);
        };
        return Fournisseurs;
    }(UI_1.UI.NavPanel));
    exports.Fournisseurs = Fournisseurs;
});
//# sourceMappingURL=Fournisseurs.js.map