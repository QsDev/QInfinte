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
define(["require", "exports", "../../../js/UI", "../../../js/Corelib", "../Common", "../Basics", "../../../js/Filters", "../Search"], function (require, exports, UI_1, Corelib_1, Common_1, Basics_1, Filters_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var FactureNav = /** @class */ (function (_super) {
        __extends(FactureNav, _super);
        function FactureNav(app) {
            var _this = _super.call(this, 'factures_nonvalider', "Factures Non Valider") || this;
            _this.app = app;
            _this.adapter = new UI_1.UI.ListAdapter('Factures.InValidation', 'Factures.row');
            _this.searchFilter = new Filters_1.filters.list.StringFilter();
            _this.Title = "Les Facture Non Validé";
            return _this;
        }
        FactureNav.prototype.OnSearche = function (oldPatent, newPatent) {
            var t = this.searchList.Filter == this.searchFilter;
            this.searchFilter.Patent = new Filters_1.filters.list.StringPatent(newPatent);
            if (!t)
                this.searchList.Filter = this.searchFilter;
            else
                this.searchList.Reset();
        };
        FactureNav.prototype.OnDeepSearch = function () {
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
        Object.defineProperty(FactureNav.prototype, "HasSearch", {
            get: function () { return UI_1.UI.SearchActionMode.Instantany; },
            set: function (v) { },
            enumerable: true,
            configurable: true
        });
        FactureNav.prototype.OnKeyDown = function (e) {
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
        FactureNav.prototype.Open = function () {
            Corelib_1.Api.RiseApi('OpenFacture', { data: this.adapter.SelectedItem });
        };
        FactureNav.prototype.Delete = function () {
            Corelib_1.Api.RiseApi('DeleteFacture', { data: this.adapter.SelectedItem });
        };
        FactureNav.prototype.New = function () {
            Corelib_1.Api.RiseApi("NewFacture", {
                data: null,
                callback: function (p, k) { }
            });
        };
        FactureNav.prototype.OpenVersments = function (forDelete) {
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
        FactureNav.prototype.verser = function (regler) {
            var data = this.adapter.SelectedItem;
            if (!data)
                return UI_1.UI.Modal.ShowDialog("ERROR", "Selecter une Facture pour ajouter une versment");
            if (data.IsOpen)
                return UI_1.UI.Modal.ShowDialog("Error", 'Close the facture for you can make a versment');
            if (regler)
                return GData.apis.Versment.Regler(data, data.Client);
            GData.apis.Versment.VerserTo(data, data.Client);
        };
        FactureNav.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this.Add(this.adapter);
            this.initJobs();
            this.adapter.OnInitialized = function (p) { return p.Source = _this.searchList = GData.__data.Factures.Filtred(_this.searchFilter); };
            this.adapter.AcceptNullValue = false;
        };
        FactureNav.prototype.initJobs = function () {
            var _this = this;
            var ser = new Corelib_1.encoding.SerializationContext(true);
            Corelib_1.bind.GetJob('SelectPage');
            Corelib_1.bind.Register({
                Name: 'openfacture', OnInitialize: function (j, e) {
                    j.addEventListener('dblclick', 'dblclick', function (e) {
                        var f = j.Scop.Value;
                        _this.app.OpenPage('Facture');
                    });
                }
            });
            Corelib_1.bind.Register({
                Name: 'facturevalidate', OnInitialize: function (j, e) {
                    j.addEventListener('onclick', 'dblclick', function (e) {
                        var f = j.Scop.Value;
                        GData.apis.Facture.Validate(f, false, function (n, x, i) {
                            if (i === Basics_1.basics.DataStat.Success) {
                                f.Freeze();
                                GData.invalidateFactures.Remove(f);
                                UI_1.UI.InfoArea.push('The Facture Is Valiated', true);
                            }
                            else
                                UI_1.UI.InfoArea.push('Error Occured When Validating The Facture', false);
                        });
                    });
                }
            });
        };
        FactureNav.prototype.Update = function () {
            GData.apis.Facture.SmartUpdate();
        };
        return FactureNav;
    }(UI_1.UI.NavPanel));
    exports.FactureNav = FactureNav;
});
//# sourceMappingURL=FacturesNonValider.js.map