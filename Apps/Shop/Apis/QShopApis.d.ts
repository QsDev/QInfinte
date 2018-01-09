import { net, basic, encoding } from '../../../js/Corelib';
import { data, Controller } from '../../../js/System';
import { models } from '../../../js/Models';
export declare namespace Apis {
    abstract class DataRow<T extends data.DataRow> extends Controller.Api<T> {
        constructor();
        abstract GetType(): any;
        private static getId(idata);
        GetRequest(idata: T): net.RequestUrl;
        OnResponse(response: JSON, data: T, context: encoding.SerializationContext): T;
    }
    abstract class DataTable<T extends data.DataTable<P>, P extends data.DataRow> extends Controller.Api<T> {
        private name;
        constructor(name: string);
        abstract GetType(): any;
        GetRequest(data: T): net.RequestUrl;
        OnResponse(response: JSON, data: T, _context: encoding.SerializationContext): void;
    }
    class User extends DataRow<models.Client> {
        constructor();
        GetType(): typeof models.Client;
    }
    class Login extends DataRow<models.Login> {
        GetType(): typeof models.Login;
        GetRequest(): net.RequestUrl;
    }
    class IsAdmin extends DataRow<models.IsAdmin> {
        GetType(): typeof models.IsAdmin;
        GetRequest(): net.RequestUrl;
    }
    class Signup extends DataRow<models.Signup> {
        GetType(): typeof models.Signup;
        GetRequest(): net.RequestUrl;
    }
    class Guid extends Controller.Api<basic.iGuid> {
        GetType(): typeof basic.iGuid;
        GetRequest(): net.RequestUrl;
        OnResponse(response: JSON, data: any, context: encoding.SerializationContext): any;
    }
    class Signout extends DataRow<models.Signout> {
        GetType(): typeof models.Signout;
        GetRequest(): net.RequestUrl;
    }
    class Users extends DataTable<models.Clients, models.Client> {
        constructor();
        GetType(): typeof models.Clients;
        GetRequest(): net.RequestUrl;
    }
    class Fournisseur extends DataRow<models.Fournisseur> {
        constructor();
        GetType(): typeof models.Fournisseur;
    }
    class Fournisseurs extends DataTable<models.Fournisseurs, models.Fournisseur> {
        constructor();
        GetType(): typeof models.Fournisseurs;
        GetRequest(): net.RequestUrl;
    }
    class Message extends DataRow<models.Message> {
        constructor();
        GetType(): typeof models.Message;
        GetRequest(x: models.Message): net.RequestUrl;
    }
    class Product extends DataRow<models.Product> {
        constructor();
        GetType(): typeof models.Product;
    }
    class Products extends DataTable<models.Products, models.Product> {
        constructor();
        GetType(): typeof models.Products;
        GetRequest(data: any): net.RequestUrl;
    }
    class FakePrices extends DataTable<models.FakePrices, models.FakePrice> {
        constructor();
        GetType(): typeof models.FakePrices;
        GetRequest(data: any): net.RequestUrl;
    }
    class ProductsUpdater extends DataTable<models.Products, models.Product> {
        constructor();
        GetType(): typeof models.Products;
        GetRequest(data: any): net.RequestUrl;
    }
    class Clients extends DataTable<models.Clients, models.Client> {
        constructor();
        GetType(): typeof Clients;
        GetRequest(data: any): net.RequestUrl;
    }
    class FakePrice extends DataRow<models.FakePrice> {
        constructor();
        GetType(): typeof models.FakePrice;
    }
    class Price extends DataRow<models.Price> {
        constructor();
        GetType(): typeof models.Price;
        GetRequest(data: any): net.RequestUrl;
    }
    class Facture extends DataRow<models.Facture> {
        constructor();
        GetType(): typeof models.Facture;
    }
    class Factures extends DataTable<models.Factures, models.Facture> {
        constructor();
        GetType(): typeof models.Factures;
        GetRequest(data: models.Factures): net.RequestUrl;
    }
    class Logins extends DataTable<models.Logins, models.Login> {
        constructor();
        GetType(): typeof models.Logins;
        GetRequest(data: models.Logins): net.RequestUrl;
    }
    class Article extends DataRow<models.Article> {
        constructor();
        GetType(): typeof models.Article;
    }
    class Articles extends DataTable<models.Articles, models.Article> {
        constructor();
        GetType(): typeof models.Articles;
        GetRequest(data: any): net.RequestUrl;
    }
    class Agent extends DataRow<models.Agent> {
        constructor();
        GetType(): typeof models.Agent;
    }
    class Agents extends DataTable<models.Agents, models.Agent> {
        constructor();
        GetType(): typeof models.Agents;
        GetRequest(data: any): net.RequestUrl;
    }
    class Versment extends DataRow<models.Versment> {
        constructor();
        GetType(): typeof models.Versment;
    }
    class Versments extends DataTable<models.Versments, models.Versment> {
        constructor();
        GetType(): typeof models.Versments;
    }
    class SVersment extends DataRow<models.SVersment> {
        constructor();
        GetType(): typeof models.SVersment;
    }
    class SVersments extends DataTable<models.SVersments, models.SVersment> {
        constructor();
        GetType(): typeof models.SVersments;
    }
    class Costumers extends DataTable<models.Costumers, models.Client> {
        constructor();
        GetType(): typeof models.Costumers;
        GetRequest(data: any): net.RequestUrl;
    }
    class Category extends DataRow<models.Category> {
        constructor();
        GetType(): typeof models.Category;
    }
    class Categories extends DataTable<models.Categories, models.Category> {
        constructor();
        GetType(): typeof models.Categories;
        GetRequest(data: any): net.RequestUrl;
    }
    class Picture extends DataRow<models.Picture> {
        constructor();
        GetType(): typeof models.Picture;
    }
    class Pictures extends DataTable<models.Pictures, models.Picture> {
        constructor();
        GetType(): typeof models.Pictures;
    }
    class SFactures extends DataTable<models.SFactures, models.SFacture> {
        constructor();
        GetType(): typeof models.SFactures;
        GetRequest(data: any): net.RequestUrl;
    }
    class iSFacture extends Apis.DataRow<models.SFacture> {
        constructor();
        GetType(): typeof models.SFacture;
        GetRequest(d: any): net.RequestUrl;
    }
    function Load(): void;
}
