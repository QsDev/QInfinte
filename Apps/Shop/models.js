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
define(["require", "exports", "../../js/Corelib", "../../js/Models", "../../js/System"], function (require, exports, Corelib_1, Models_1, System_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ikmodels;
    (function (ikmodels) {
        var FactureSearch = /** @class */ (function (_super) {
            __extends(FactureSearch, _super);
            function FactureSearch() {
                var _this = _super.call(this) || this;
                _this.Date = new System_1.base.DateVecteur();
                _this.DateLivraison = new System_1.base.DateVecteur();
                _this.Total = new System_1.base.NumberVecteur();
                _this.Sold = new System_1.base.NumberVecteur();
                Object.freeze(_this);
                return _this;
            }
            FactureSearch.__fields__ = function () {
                return [FactureSearch.DPClient, FactureSearch.DPVendeur,
                    FactureSearch.DPDate, FactureSearch.DPDateLivraison,
                    FactureSearch.DPTotal, FactureSearch.DPSold,
                    FactureSearch.DPIsValidated];
            };
            Object.defineProperty(FactureSearch.prototype, "Client", {
                get: function () { return this.get(FactureSearch.DPClient); },
                set: function (v) { this.set(FactureSearch.DPClient, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FactureSearch.prototype, "Vendeur", {
                get: function () { return this.get(FactureSearch.DPVendeur); },
                set: function (v) { this.set(FactureSearch.DPVendeur, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FactureSearch.prototype, "Date", {
                get: function () { return this.get(FactureSearch.DPDate); },
                set: function (v) { this.set(FactureSearch.DPDate, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FactureSearch.prototype, "DateLivraison", {
                get: function () { return this.get(FactureSearch.DPDateLivraison); },
                set: function (v) { this.set(FactureSearch.DPDateLivraison, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FactureSearch.prototype, "Total", {
                get: function () { return this.get(FactureSearch.DPTotal); },
                set: function (v) { this.set(FactureSearch.DPTotal, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FactureSearch.prototype, "Sold", {
                get: function () { return this.get(FactureSearch.DPSold); },
                set: function (v) { this.set(FactureSearch.DPSold, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FactureSearch.prototype, "IsValidated", {
                get: function () { return this.get(FactureSearch.DPIsValidated); },
                set: function (v) { this.set(FactureSearch.DPIsValidated, v); },
                enumerable: true,
                configurable: true
            });
            FactureSearch.prototype.Check = function (s) {
                if (this.Client && this.Client != s.Client)
                    return false;
                if (this.Vendeur && this.Vendeur != s.Vendeur)
                    return false;
                if (this.IsValidated != null && this.IsValidated != s.IsValidated)
                    return false;
                if (!this.Date.Check(s.Date))
                    return false;
                if (!this.DateLivraison.Check(s.DateLivraison))
                    return false;
                if (!this.Total.Check(s.Total))
                    return false;
                return true;
            };
            FactureSearch.prototype.equals = function (p) {
                return p.Client === this.Client && p.Date === this.Date && p.DateLivraison === this.DateLivraison && this.IsValidated === p.IsValidated && p.Sold === this.Sold && p.Total === this.Total && p.Vendeur === this.Vendeur;
            };
            FactureSearch.prototype.ToInterface = function () {
                return {
                    Client: this.Client,
                    Date: this.Date,
                    DateLivraison: this.DateLivraison,
                    IsValidated: this.IsValidated,
                    Sold: this.Sold,
                    Total: this.Total,
                    Vendeur: this.Vendeur,
                    Check: this.Check,
                    equals: this.equals
                };
            };
            FactureSearch.DPClient = Corelib_1.bind.DObject.CreateField('Client', Models_1.models.Client);
            FactureSearch.DPVendeur = Corelib_1.bind.DObject.CreateField('Vendeur', Models_1.models.Agent);
            FactureSearch.DPDate = Corelib_1.bind.DObject.CreateField('Date', System_1.base.DateVecteur);
            FactureSearch.DPDateLivraison = Corelib_1.bind.DObject.CreateField('DateLivraison', System_1.base.DateVecteur);
            FactureSearch.DPTotal = Corelib_1.bind.DObject.CreateField('Total', System_1.base.NumberVecteur);
            FactureSearch.DPSold = Corelib_1.bind.DObject.CreateField('Sold', System_1.base.NumberVecteur);
            FactureSearch.DPIsValidated = Corelib_1.bind.DObject.CreateField('IsValidated', Boolean);
            return FactureSearch;
        }(Corelib_1.bind.DObject));
        ikmodels.FactureSearch = FactureSearch;
        var FSFilter = /** @class */ (function (_super) {
            __extends(FSFilter, _super);
            function FSFilter(fs) {
                var _this = _super.call(this) || this;
                _this.fs = fs;
                return _this;
            }
            FSFilter.prototype.convertFromString = function (x) {
                throw "invalide";
            };
            FSFilter.prototype.Begin = function (deb, count) {
                this.ifs = this.Patent;
            };
            FSFilter.prototype.IsMatch = function (index, item) {
                return !this.ifs || this.ifs.Check(item);
            };
            return FSFilter;
        }(Corelib_1.utils.Filter));
        ikmodels.FSFilter = FSFilter;
    })(ikmodels = exports.ikmodels || (exports.ikmodels = {}));
    (function (ikmodels) {
        var SFactureSearch = /** @class */ (function (_super) {
            __extends(SFactureSearch, _super);
            function SFactureSearch() {
                var _this = _super.call(this) || this;
                _this.Date = new System_1.base.DateVecteur();
                _this.Total = new System_1.base.NumberVecteur();
                _this.Sold = new System_1.base.NumberVecteur();
                Object.freeze(_this);
                return _this;
            }
            SFactureSearch.__fields__ = function () {
                return [SFactureSearch.DPFournisseur, SFactureSearch.DPAchteur, SFactureSearch.DPValidateur,
                    SFactureSearch.DPDate,
                    SFactureSearch.DPTotal, SFactureSearch.DPSold,
                    SFactureSearch.DPIsValidated];
            };
            Object.defineProperty(SFactureSearch.prototype, "Fournisseur", {
                get: function () { return this.get(SFactureSearch.DPFournisseur); },
                set: function (v) { this.set(SFactureSearch.DPFournisseur, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SFactureSearch.prototype, "Achteur", {
                get: function () { return this.get(SFactureSearch.DPAchteur); },
                set: function (v) { this.set(SFactureSearch.DPAchteur, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SFactureSearch.prototype, "Validateur", {
                get: function () { return this.get(SFactureSearch.DPValidateur); },
                set: function (v) { this.set(SFactureSearch.DPValidateur, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SFactureSearch.prototype, "Date", {
                get: function () { return this.get(SFactureSearch.DPDate); },
                set: function (v) { this.set(SFactureSearch.DPDate, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SFactureSearch.prototype, "Total", {
                get: function () { return this.get(SFactureSearch.DPTotal); },
                set: function (v) { this.set(SFactureSearch.DPTotal, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SFactureSearch.prototype, "Sold", {
                get: function () { return this.get(SFactureSearch.DPSold); },
                set: function (v) { this.set(SFactureSearch.DPSold, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SFactureSearch.prototype, "IsValidated", {
                get: function () { return this.get(SFactureSearch.DPIsValidated); },
                set: function (v) { this.set(SFactureSearch.DPIsValidated, v); },
                enumerable: true,
                configurable: true
            });
            SFactureSearch.prototype.Check = function (s) {
                if (this.Fournisseur && this.Fournisseur != s.Fournisseur)
                    return false;
                if (this.Achteur && this.Achteur != s.Achteur)
                    return false;
                if (this.Validateur && this.Validateur != s.Validator)
                    return false;
                if (this.IsValidated != null && this.IsValidated != s.IsValidated)
                    return false;
                if (!this.Date.Check(s.Date))
                    return false;
                if (!this.Total.Check(s.Total))
                    return false;
                return true;
            };
            SFactureSearch.prototype.equals = function (p) {
                return p.Fournisseur === this.Fournisseur && p.Date === this.Date && p.Achteur === this.Achteur && this.IsValidated === p.IsValidated && p.Sold === this.Sold && p.Total === this.Total && p.Validateur === this.Validateur;
            };
            SFactureSearch.prototype.ToInterface = function () {
                return {
                    Fournisseur: this.Fournisseur,
                    Date: this.Date,
                    Achteur: this.Achteur,
                    IsValidated: this.IsValidated,
                    Sold: this.Sold,
                    Total: this.Total,
                    Validateur: this.Validateur,
                    Check: this.Check,
                    equals: this.equals
                };
            };
            SFactureSearch.DPFournisseur = Corelib_1.bind.DObject.CreateField('Fournisseur', Models_1.models.Fournisseur);
            SFactureSearch.DPAchteur = Corelib_1.bind.DObject.CreateField('Achteur', Models_1.models.Agent);
            SFactureSearch.DPValidateur = Corelib_1.bind.DObject.CreateField('Vendeur', Models_1.models.Agent);
            SFactureSearch.DPDate = Corelib_1.bind.DObject.CreateField('Date', System_1.base.DateVecteur);
            SFactureSearch.DPTotal = Corelib_1.bind.DObject.CreateField('Total', System_1.base.NumberVecteur);
            SFactureSearch.DPSold = Corelib_1.bind.DObject.CreateField('Sold', System_1.base.NumberVecteur);
            SFactureSearch.DPIsValidated = Corelib_1.bind.DObject.CreateField('IsValidated', Boolean);
            return SFactureSearch;
        }(Corelib_1.bind.DObject));
        ikmodels.SFactureSearch = SFactureSearch;
        var SFSFilter = /** @class */ (function (_super) {
            __extends(SFSFilter, _super);
            function SFSFilter(fs) {
                var _this = _super.call(this) || this;
                _this.fs = fs;
                return _this;
            }
            SFSFilter.prototype.convertFromString = function (x) {
                throw "invalide";
            };
            SFSFilter.prototype.Begin = function (deb, count) {
                this.ifs = this.Patent;
            };
            SFSFilter.prototype.IsMatch = function (index, item) {
                return !this.ifs || this.ifs.Check(item);
            };
            return SFSFilter;
        }(Corelib_1.utils.Filter));
        ikmodels.SFSFilter = SFSFilter;
    })(ikmodels = exports.ikmodels || (exports.ikmodels = {}));
});
//# sourceMappingURL=models.js.map