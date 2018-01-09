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
define(["require", "exports", "../../../js/Corelib", "../../../js/System", "../../../js/Models"], function (require, exports, Corelib_1, System_1, Models_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var array_user = Models_1.models.Clients;
    var array_product = Models_1.models.Products;
    var array_Facture = Models_1.models.Factures;
    var array_Article = Models_1.models.Articles;
    var array_Client = Models_1.models.Clients;
    var array_Agent = Models_1.models.Agents;
    var array_Versment = Models_1.models.Versments;
    var array_Category = Models_1.models.Categories;
    var array_Picture = Models_1.models.Pictures;
    function serialize(obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    var Apis;
    (function (Apis) {
        var DataRow = /** @class */ (function (_super) {
            __extends(DataRow, _super);
            function DataRow(Root, costume) {
                var _this = _super.call(this, true) || this;
                _this.Root = Root;
                if (!costume)
                    if (Root.indexOf('/_/') !== 0)
                        _this.Root = '/_/' + Root;
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, 'GET', "Id=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, 'CREATE', "Id=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Delete, 'DELETE', "Id=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Post, 'SAVE', undefined, true);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, 'UPDATE', "Id=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Post, 'VALIDATE', "Id=@Id", true);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Create, 'CREATE', undefined, true);
                return _this;
            }
            DataRow.getId = function (idata) {
                return (idata instanceof System_1.sdata.DataRow)
                    ? idata.Id.toString()
                    : (typeof idata === 'number' ? idata : idata.hasOwnProperty('Id') ? idata.Id : 0);
            };
            DataRow.prototype.GetRequest = function (idata, xshema, params) {
                var shema = this.GetMethodShema(xshema);
                if (shema && shema.ParamsFormat) {
                    var qs = shema.ParamsFormat.apply(params || {});
                }
                else if (params)
                    qs = serialize(params);
                return new Corelib_1.net.RequestUrl(qs ? this.Root + "?" + qs : this.Root, null, null, shema ? shema.Method : 0, shema.SendData);
            };
            DataRow.prototype.OnResponse = function (response, data, context) {
                return data && data.FromJson(response, context, true);
            };
            return DataRow;
        }(System_1.Controller.Api));
        Apis.DataRow = DataRow;
        var DataTable = /** @class */ (function (_super) {
            __extends(DataTable, _super);
            function DataTable(Root, costume) {
                var _this = _super.call(this, true) || this;
                _this.Root = Root;
                if (!costume)
                    if (Root.indexOf('/_/') !== 0)
                        _this.Root = '/_/' + Root;
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "UPDATE", "Id=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.SUPDATE, "SUPDATE", "Date=@Date", false);
                return _this;
            }
            DataTable.prototype.GetRequest = function (idata, xshema, params) {
                var shema = this.GetMethodShema(xshema);
                if (shema && shema.ParamsFormat) {
                    var qs = shema.ParamsFormat.apply(params || {});
                }
                else if (params)
                    qs = serialize(params);
                return new Corelib_1.net.RequestUrl(qs ? this.Root + "?" + qs : this.Root, null, null, shema ? shema.Method : 0);
            };
            DataTable.prototype.OnResponse = function (response, data, _context) {
                var ed = Date.now();
                if (response == null)
                    return;
                data.Stat = System_1.sdata.DataStat.Updating;
                data.FromJson(response, _context);
                data.Stat = System_1.sdata.DataStat.Updated;
                return;
            };
            return DataTable;
        }(System_1.Controller.Api));
        Apis.DataTable = DataTable;
        var FactureBase = /** @class */ (function (_super) {
            __extends(FactureBase, _super);
            function FactureBase(root, costume) {
                var _this = _super.call(this, root, costume) || this;
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, 'OPEN', "Id=@Id&Operation=Open", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, 'CLOSE', "Id=@Id&Operation=Close&Force=@Force", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, 'ISOPEN', "Id=@Id&Operation=IsOpen", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, 'OPEN', "Id=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Print, 'PRINT', "Id=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Post, 'VALIDATE', undefined, true);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Post, 'FASTVALIDATE', "Validate=@Id", false);
                return _this;
            }
            return FactureBase;
        }(DataRow));
        Apis.FactureBase = FactureBase;
        var Client = /** @class */ (function (_super) {
            __extends(Client, _super);
            function Client() {
                return _super.call(this, 'Client') || this;
            }
            Client.prototype.GetType = function () { return Models_1.models.Client; };
            return Client;
        }(DataRow));
        Apis.Client = Client;
        var Login = /** @class */ (function (_super) {
            __extends(Login, _super);
            function Login() {
                return _super.call(this, '/~Login', true) || this;
            }
            Login.prototype.GetType = function () { return Models_1.models.Login; };
            Login.prototype.GetRequest = function () { return new Corelib_1.net.RequestUrl('/~Login', null, null, Corelib_1.net.WebRequestMethod.Post); };
            return Login;
        }(DataRow));
        Apis.Login = Login;
        var IsAdmin = /** @class */ (function (_super) {
            __extends(IsAdmin, _super);
            function IsAdmin() {
                return _super.call(this, '/~IsAdmin', true) || this;
            }
            IsAdmin.prototype.GetType = function () { return Models_1.models.IsAdmin; };
            IsAdmin.prototype.GetRequest = function () { return new Corelib_1.net.RequestUrl('/~IsAdmin', null, null, Corelib_1.net.WebRequestMethod.Get); };
            return IsAdmin;
        }(DataRow));
        Apis.IsAdmin = IsAdmin;
        var Signup = /** @class */ (function (_super) {
            __extends(Signup, _super);
            function Signup() {
                return _super.call(this, '/~Signup', true) || this;
            }
            Signup.prototype.GetType = function () { return Models_1.models.Signup; };
            Signup.prototype.GetRequest = function () { return new Corelib_1.net.RequestUrl('/~Signup', null, null, Corelib_1.net.WebRequestMethod.Post); };
            return Signup;
        }(DataRow));
        Apis.Signup = Signup;
        var Guid = /** @class */ (function (_super) {
            __extends(Guid, _super);
            function Guid() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Guid.prototype.GetType = function () { return Corelib_1.basic.iGuid; };
            Guid.prototype.GetRequest = function () { return new Corelib_1.net.RequestUrl('/~Guid', null, null, Corelib_1.net.WebRequestMethod.Post); };
            Guid.prototype.OnResponse = function (response, data, context) {
                return data;
            };
            return Guid;
        }(System_1.Controller.Api));
        Apis.Guid = Guid;
        var Signout = /** @class */ (function (_super) {
            __extends(Signout, _super);
            function Signout() {
                return _super.call(this, '/Signout', true) || this;
            }
            Signout.prototype.GetType = function () { return Models_1.models.Signout; };
            Signout.prototype.GetRequest = function () { return new Corelib_1.net.RequestUrl('/Signout', null, null, Corelib_1.net.WebRequestMethod.Post); };
            return Signout;
        }(DataRow));
        Apis.Signout = Signout;
        var Users = /** @class */ (function (_super) {
            __extends(Users, _super);
            function Users() {
                var _this = _super.call(this, 'Users') || this;
                _this = _super.call(this, "Users") || this;
                return _this;
            }
            Users.prototype.GetType = function () { return array_user; };
            return Users;
        }(DataTable));
        Apis.Users = Users;
        var Fournisseur = /** @class */ (function (_super) {
            __extends(Fournisseur, _super);
            function Fournisseur() {
                return _super.call(this, "Fournisseur") || this;
            }
            Fournisseur.prototype.GetType = function () { return Models_1.models.Fournisseur; };
            return Fournisseur;
        }(DataRow));
        Apis.Fournisseur = Fournisseur;
        var Fournisseurs = /** @class */ (function (_super) {
            __extends(Fournisseurs, _super);
            function Fournisseurs() {
                return _super.call(this, 'Fournisseurs') || this;
            }
            Fournisseurs.prototype.GetType = function () { return Models_1.models.Fournisseurs; };
            return Fournisseurs;
        }(DataTable));
        Apis.Fournisseurs = Fournisseurs;
        var Message = /** @class */ (function (_super) {
            __extends(Message, _super);
            function Message() {
                return _super.call(this, "CallBack") || this;
            }
            Message.prototype.GetType = function () { return Models_1.models.Message; };
            Message.prototype.GetRequest = function (x) { return new Corelib_1.net.RequestUrl("/_/CallBack?Id=" + x.Id, null, null, Corelib_1.net.WebRequestMethod.Post); };
            return Message;
        }(DataRow));
        Apis.Message = Message;
        var Product = /** @class */ (function (_super) {
            __extends(Product, _super);
            function Product() {
                return _super.call(this, "Product") || this;
            }
            Product.prototype.GetType = function () { return Models_1.models.Product; };
            return Product;
        }(DataRow));
        Apis.Product = Product;
        var Products = /** @class */ (function (_super) {
            __extends(Products, _super);
            function Products() {
                return _super.call(this, 'Products') || this;
            }
            Products.prototype.GetType = function () { return array_product; };
            return Products;
        }(DataTable));
        Apis.Products = Products;
        var FakePrices = /** @class */ (function (_super) {
            __extends(FakePrices, _super);
            function FakePrices() {
                return _super.call(this, 'Prices') || this;
            }
            FakePrices.prototype.GetType = function () { return Models_1.models.FakePrices; };
            return FakePrices;
        }(DataTable));
        Apis.FakePrices = FakePrices;
        var ProductsUpdater = /** @class */ (function (_super) {
            __extends(ProductsUpdater, _super);
            function ProductsUpdater() {
                return _super.call(this, 'Products') || this;
            }
            ProductsUpdater.prototype.GetType = function () { return array_product; };
            return ProductsUpdater;
        }(DataTable));
        Apis.ProductsUpdater = ProductsUpdater;
        var Clients = /** @class */ (function (_super) {
            __extends(Clients, _super);
            function Clients() {
                return _super.call(this, 'Clients') || this;
            }
            Clients.prototype.GetType = function () { return Clients; };
            return Clients;
        }(DataTable));
        Apis.Clients = Clients;
        var FakePrice = /** @class */ (function (_super) {
            __extends(FakePrice, _super);
            function FakePrice() {
                return _super.call(this, "FakePrice") || this;
            }
            FakePrice.prototype.GetType = function () { return Models_1.models.FakePrice; };
            return FakePrice;
        }(DataRow));
        Apis.FakePrice = FakePrice;
        var Price = /** @class */ (function (_super) {
            __extends(Price, _super);
            function Price() {
                return _super.call(this, "Price") || this;
            }
            Price.prototype.GetType = function () { return Models_1.models.Price; };
            return Price;
        }(DataRow));
        Apis.Price = Price;
        var Facture = /** @class */ (function (_super) {
            __extends(Facture, _super);
            function Facture() {
                return _super.call(this, "Facture") || this;
            }
            Facture.prototype.GetType = function () { return Models_1.models.Facture; };
            return Facture;
        }(FactureBase));
        Apis.Facture = Facture;
        var Factures = /** @class */ (function (_super) {
            __extends(Factures, _super);
            function Factures() {
                return _super.call(this, 'Factures') || this;
            }
            Factures.prototype.GetType = function () { return array_Facture; };
            return Factures;
        }(DataTable));
        Apis.Factures = Factures;
        var Logins = /** @class */ (function (_super) {
            __extends(Logins, _super);
            function Logins() {
                return _super.call(this, 'Users') || this;
            }
            Logins.prototype.GetType = function () { return Models_1.models.Logins; };
            return Logins;
        }(DataTable));
        Apis.Logins = Logins;
        var Article = /** @class */ (function (_super) {
            __extends(Article, _super);
            function Article() {
                return _super.call(this, "Article") || this;
            }
            Article.prototype.GetType = function () { return Models_1.models.Article; };
            return Article;
        }(DataRow));
        Apis.Article = Article;
        var Articles = /** @class */ (function (_super) {
            __extends(Articles, _super);
            function Articles() {
                return _super.call(this, 'Articles') || this;
            }
            Articles.prototype.GetType = function () { return array_Article; };
            return Articles;
        }(DataTable));
        Apis.Articles = Articles;
        var Agent = /** @class */ (function (_super) {
            __extends(Agent, _super);
            function Agent() {
                return _super.call(this, 'Agent') || this;
            }
            Agent.prototype.GetType = function () { return Models_1.models.Agent; };
            return Agent;
        }(DataRow));
        Apis.Agent = Agent;
        var Agents = /** @class */ (function (_super) {
            __extends(Agents, _super);
            function Agents() {
                return _super.call(this, 'Agents') || this;
            }
            Agents.prototype.GetType = function () { return array_Agent; };
            return Agents;
        }(DataTable));
        Apis.Agents = Agents;
        var Versment = /** @class */ (function (_super) {
            __extends(Versment, _super);
            function Versment() {
                return _super.call(this, "Versment") || this;
            }
            Versment.prototype.GetType = function () { return Models_1.models.Versment; };
            return Versment;
        }(DataRow));
        Apis.Versment = Versment;
        var Versments = /** @class */ (function (_super) {
            __extends(Versments, _super);
            function Versments() {
                var _this = _super.call(this, 'Versments') || this;
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VFacture", "q=Facture&Facture=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VClient", "q=Client&Client=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VPeriod", "q=Period&From=@From&to=@To", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VCassier", "q=Cassier&Cassier=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VObservation", "q=Observation&Observation=@Observation", false);
                return _this;
            }
            Versments.prototype.GetType = function () { return Models_1.models.Versments; };
            return Versments;
        }(DataTable));
        Apis.Versments = Versments;
        var SVersment = /** @class */ (function (_super) {
            __extends(SVersment, _super);
            function SVersment() {
                return _super.call(this, "SVersment") || this;
            }
            SVersment.prototype.GetType = function () { return Models_1.models.SVersment; };
            return SVersment;
        }(DataRow));
        Apis.SVersment = SVersment;
        var SVersments = /** @class */ (function (_super) {
            __extends(SVersments, _super);
            function SVersments() {
                var _this = _super.call(this, 'SVersments') || this;
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VFacture", "q=Facture&Facture=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VFournisseur", "q=Fournisseur&Fournisseur=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VPeriod", "q=Period&From=@from&to=@to", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VCassier", "q=Cassier&Cassier=@Id", false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "VObservation", "q=Observation&Observation=@Observation", false);
                return _this;
            }
            SVersments.prototype.GetType = function () { return Models_1.models.SVersments; };
            return SVersments;
        }(DataTable));
        Apis.SVersments = SVersments;
        var Costumers = /** @class */ (function (_super) {
            __extends(Costumers, _super);
            function Costumers() {
                return _super.call(this, 'Costumers') || this;
            }
            Costumers.prototype.GetType = function () { return Models_1.models.Costumers; };
            return Costumers;
        }(DataTable));
        Apis.Costumers = Costumers;
        var Category = /** @class */ (function (_super) {
            __extends(Category, _super);
            function Category() {
                return _super.call(this, "Category") || this;
            }
            Category.prototype.GetType = function () { return Models_1.models.Category; };
            return Category;
        }(DataRow));
        Apis.Category = Category;
        var Categories = /** @class */ (function (_super) {
            __extends(Categories, _super);
            function Categories() {
                return _super.call(this, 'Categories') || this;
            }
            Categories.prototype.GetType = function () { return array_Category; };
            return Categories;
        }(DataTable));
        Apis.Categories = Categories;
        var Picture = /** @class */ (function (_super) {
            __extends(Picture, _super);
            function Picture() {
                return _super.call(this, 'Picture') || this;
            }
            Picture.prototype.GetType = function () { return Models_1.models.Picture; };
            return Picture;
        }(DataRow));
        Apis.Picture = Picture;
        var Pictures = /** @class */ (function (_super) {
            __extends(Pictures, _super);
            function Pictures() {
                return _super.call(this, 'Pictures') || this;
            }
            Pictures.prototype.GetType = function () { return array_Picture; };
            return Pictures;
        }(DataTable));
        Apis.Pictures = Pictures;
        var SFactures = /** @class */ (function (_super) {
            __extends(SFactures, _super);
            function SFactures() {
                return _super.call(this, 'SFactures') || this;
            }
            SFactures.prototype.GetType = function () { return Models_1.models.SFactures; };
            return SFactures;
        }(DataTable));
        Apis.SFactures = SFactures;
        var EtatTransfers = /** @class */ (function (_super) {
            __extends(EtatTransfers, _super);
            function EtatTransfers() {
                return _super.call(this, 'EtatTransfers') || this;
            }
            EtatTransfers.prototype.GetType = function () { return Models_1.models.EtatTransfers; };
            return EtatTransfers;
        }(DataTable));
        Apis.EtatTransfers = EtatTransfers;
        var iSFacture = /** @class */ (function (_super) {
            __extends(iSFacture, _super);
            function iSFacture() {
                return _super.call(this, "SFacture") || this;
            }
            iSFacture.prototype.GetType = function () { return Models_1.models.SFacture; };
            return iSFacture;
        }(FactureBase));
        Apis.iSFacture = iSFacture;
        var Settings = /** @class */ (function (_super) {
            __extends(Settings, _super);
            function Settings() {
                var _this = _super.call(this, "Settings") || this;
                _this.ERegister(Corelib_1.net.WebRequestMethod.Get, "START", null, false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Post, "BACKUP", null, false);
                _this.ERegister(Corelib_1.net.WebRequestMethod.Put, "RESTORE", null, false);
                return _this;
            }
            Settings.prototype.GetType = function () { return Window; };
            return Settings;
        }(DataRow));
        Apis.Settings = Settings;
        function Load() {
            new Client, new Users, new Product, new Products, new Facture, new Factures, new Article, new Articles, new Agent, new Agents, new Versment, new Versments, new Category, new Categories, new Picture, new Pictures,
                new Login, new Signout, new FakePrice, new Clients, new Costumers, new Signup, new Logins(), new Categories, new FakePrices, new SFactures
                , new iSFacture(), new SVersment, new SVersments, new Fournisseur, new Fournisseurs, new Guid, new Message, new IsAdmin(), new Price(), new EtatTransfers(), new Settings;
        }
        Apis.Load = Load;
        ;
    })(Apis = exports.Apis || (exports.Apis = {}));
});
//# sourceMappingURL=QShopApis.js.map