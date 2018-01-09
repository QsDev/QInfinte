define(["require", "exports", "./../Admin/Apis/Agent", "./../Admin/Apis/Article", "./../Admin/Apis/Category", "./../Admin/Apis/Client", "./../Admin/Apis/FactureAchat", "./../Admin/Apis/FactureVent", "./../Admin/Apis/Fournisseur", "./../Admin/Apis/Product", "./../Admin/Apis/Revage", "./../Admin/Apis/Versment", "./../Admin/Apis/SVersment"], function (require, exports, Agent_1, Article_1, Category_1, Client_1, FactureAchat_1, FactureVent_1, Fournisseur_1, Product_1, Revage_1, Versment_1, SVersment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ShopApis = /** @class */ (function () {
        function ShopApis() {
        }
        ShopApis.prototype.Init = function (vars) {
            this.vars = vars;
            this.Agent = new Agent_1.Agent(vars);
            this.Article = new Article_1.Article(vars);
            this.Client = new Client_1.Client(vars);
            this.Category = new Category_1.Category(vars);
            this.SFacture = new FactureAchat_1.SFacture(vars);
            this.Facture = new FactureVent_1.Facture(vars);
            this.Fournisseur = new Fournisseur_1.Fournisseur(vars);
            this.Product = new Product_1.Product(vars);
            this.Revage = new Revage_1.Revage(vars);
            this.Versment = new Versment_1.Versment(vars);
            this.SVersment = new SVersment_1.SVersment(vars);
            return this;
        };
        return ShopApis;
    }());
    exports.ShopApis = ShopApis;
});
//# sourceMappingURL=ShopApis.js.map