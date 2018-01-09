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
define(["require", "exports", "../../js/Models", "../../js/Critere"], function (require, exports, Models_1, Critere_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SearchData;
    (function (SearchData) {
        var Client = /** @class */ (function (_super) {
            __extends(Client, _super);
            function Client() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Client.__fields__ = function () { return this.generateFieldsFrom(Models_1.models.Client); };
            return Client;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Client = Client;
        var Login = /** @class */ (function (_super) {
            __extends(Login, _super);
            function Login() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Login.__fields__ = function () { return this.generateFieldsFrom(Models_1.models.Login); };
            return Login;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Login = Login;
        var Category = /** @class */ (function (_super) {
            __extends(Category, _super);
            function Category() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Category.__fields__ = function () { return this.generateFieldsFrom(Models_1.models.Category); };
            return Category;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Category = Category;
        var Fournisseur = /** @class */ (function (_super) {
            __extends(Fournisseur, _super);
            function Fournisseur() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Fournisseur.__fields__ = function () { return this.generateFieldsFrom(Models_1.models.Client); };
            return Fournisseur;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Fournisseur = Fournisseur;
        var Versment = /** @class */ (function (_super) {
            __extends(Versment, _super);
            function Versment() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Versment.__fields__ = function () { return this.generateFieldsFrom(Models_1.models.Versment); };
            return Versment;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Versment = Versment;
        var Facture = /** @class */ (function (_super) {
            __extends(Facture, _super);
            function Facture() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Facture.__fields__ = function () { return this.generateFieldsFrom(Models_1.models.Facture); };
            return Facture;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Facture = Facture;
        var SFacture = /** @class */ (function (_super) {
            __extends(SFacture, _super);
            function SFacture() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SFacture.__fields__ = function () { return this.generateFieldsFrom(Models_1.models.SFacture); };
            return SFacture;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.SFacture = SFacture;
        var Product = /** @class */ (function (_super) {
            __extends(Product, _super);
            function Product() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Product.__fields__ = function () { return Product.generateFieldsFrom(Models_1.models.Product); };
            return Product;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Product = Product;
        var SVersment = /** @class */ (function (_super) {
            __extends(SVersment, _super);
            function SVersment() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SVersment.__fields__ = function () { return Product.generateFieldsFrom(Models_1.models.SVersment); };
            return SVersment;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.SVersment = SVersment;
        var Etats = /** @class */ (function (_super) {
            __extends(Etats, _super);
            function Etats() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Etats.__fields__ = function () { return Etats.generateFieldsFrom(Models_1.models.EtatTransfer); };
            return Etats;
        }(Critere_1.Critere.ComplexCritere));
        SearchData.Etats = Etats;
    })(SearchData = exports.SearchData || (exports.SearchData = {}));
});
//# sourceMappingURL=Search.js.map