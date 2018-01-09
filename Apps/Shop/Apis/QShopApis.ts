import {net, basic, encoding} from '../../../js/Corelib';
import { sdata, Controller} from '../../../js/System';
import {models} from '../../../js/Models';
import Client = require("../../../js/Client");

var array_user = models.Clients;
var array_product = models.Products;
var array_Facture = models.Factures;
var array_Article = models.Articles;
var array_Client = models.Clients;
var array_Agent = models.Agents;
var array_Versment = models.Versments
var array_Category = models.Categories;

var array_Picture = models.Pictures;
declare var context: basic.IContext;
function serialize (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}
export namespace Apis {
    export abstract class DataRow<T extends sdata.DataRow> extends Controller.Api<T>{
        constructor(public Root: string, costume?: boolean) {
            super(true);
            if (!costume)
                if (Root.indexOf('/_/') !== 0) this.Root = '/_/' + Root;

            this.ERegister(net.WebRequestMethod.Get, 'GET', "Id=@Id", false);
            this.ERegister(net.WebRequestMethod.Get, 'CREATE', "Id=@Id", false);
            this.ERegister(net.WebRequestMethod.Delete, 'DELETE', "Id=@Id", false);
            this.ERegister(net.WebRequestMethod.Post, 'SAVE', undefined, true);
            this.ERegister(net.WebRequestMethod.Get, 'UPDATE', "Id=@Id", false);
            this.ERegister(net.WebRequestMethod.Post, 'VALIDATE', "Id=@Id", true);

            this.ERegister(net.WebRequestMethod.Create, 'CREATE', undefined, true);
        }

        public abstract GetType();
        private static getId(idata) {
            return (idata instanceof sdata.DataRow)
                ? idata.Id.toString()
                : (typeof idata === 'number' ? <number>idata : idata.hasOwnProperty('Id') ? idata.Id : 0);
        }
        public GetRequest(idata: T, xshema: string | net.RequestMethodShema | net.WebRequestMethod, params?: net.IRequestParams): net.RequestUrl {
            var shema = this.GetMethodShema(xshema);
            if (shema && shema.ParamsFormat) {
                var qs = shema.ParamsFormat.apply(params || {});
            }
            else if (params)
                qs = serialize(params)
            
            return new net.RequestUrl(qs ? this.Root + "?" + qs : this.Root, null, null, shema ? shema.Method : 0, shema.SendData);
        }
        public OnResponse(response: JSON, data: T, context: encoding.SerializationContext) {
            return data && data.FromJson(response, context, true);
        }
    }
    export abstract class DataTable<T extends sdata.DataTable<P>, P extends sdata.DataRow> extends Controller.Api<T>{
        constructor(public Root: string, costume?: boolean) {
            super(true);
            if (!costume)
                if (Root.indexOf('/_/') !== 0) this.Root = '/_/' + Root;
            this.ERegister(net.WebRequestMethod.Get, "UPDATE", "Id=@Id", false);
            this.ERegister(net.WebRequestMethod.SUPDATE, "SUPDATE", "Date=@Date", false);
        }

        public GetRequest(idata: T, xshema: string | net.RequestMethodShema | net.WebRequestMethod, params?: net.IRequestParams): net.RequestUrl {
            var shema = this.GetMethodShema(xshema);
            if (shema && shema.ParamsFormat) {
                var qs = shema.ParamsFormat.apply(params || {});
            }
            else if (params)
                qs = serialize(params)

            return new net.RequestUrl(qs ? this.Root + "?" + qs : this.Root, null, null, shema ? shema.Method : 0);
        }
        public abstract GetType();
        public OnResponse(response: JSON, data: T, _context: encoding.SerializationContext) {
            var ed = Date.now();
            if (response == null) return;
            data.Stat = sdata.DataStat.Updating;
            data.FromJson(response, _context);
            data.Stat = sdata.DataStat.Updated;
            return;
        }
    }
    export abstract class FactureBase<T extends models.FactureBase> extends DataRow<T> {
        constructor(root: string, costume?: boolean) {
            super(root, costume)
            this.ERegister(net.WebRequestMethod.Get, 'OPEN', "Id=@Id&Operation=Open", false);
            this.ERegister(net.WebRequestMethod.Get, 'CLOSE', "Id=@Id&Operation=Close&Force=@Force", false);
            this.ERegister(net.WebRequestMethod.Get, 'ISOPEN', "Id=@Id&Operation=IsOpen", false);
            this.ERegister(net.WebRequestMethod.Get, 'OPEN', "Id=@Id", false);
            this.ERegister(net.WebRequestMethod.Print, 'PRINT', "Id=@Id", false);


            this.ERegister(net.WebRequestMethod.Post, 'VALIDATE', undefined, true);
            this.ERegister(net.WebRequestMethod.Post, 'FASTVALIDATE', "Validate=@Id", false);

        }
    }

    export class Client extends DataRow<models.Client>{
        constructor() { super('Client'); }
        GetType() { return models.Client; }
        
    }
    export class Login extends DataRow<models.Login>{
        GetType() { return models.Login; }
        GetRequest() { return new net.RequestUrl('/~Login', null, null, net.WebRequestMethod.Post); }
        constructor() { super('/~Login', true); }
	}
	export class IsAdmin extends DataRow<models.IsAdmin> {

		GetType() { return models.IsAdmin; }
        GetRequest() { return new net.RequestUrl('/~IsAdmin', null, null, net.WebRequestMethod.Get); }
        constructor() {
            super('/~IsAdmin', true);
        }
	}
    export class Signup extends DataRow<models.Signup>{
        GetType() { return models.Signup; }
        GetRequest() { return new net.RequestUrl('/~Signup', null, null, net.WebRequestMethod.Post); }
        constructor() {
            super('/~Signup', true);
        }
    }
    export class Guid extends Controller.Api<basic.iGuid>{
        GetType() { return basic.iGuid; }
        GetRequest() { return new net.RequestUrl('/~Guid', null, null, net.WebRequestMethod.Post); }
        public OnResponse(response: JSON, data: any, context: encoding.SerializationContext) {            
            return data;
        }
    }
    export class Signout extends DataRow<models.Signout>{
        GetType() { return models.Signout; }
        GetRequest() { return new net.RequestUrl('/Signout', null, null, net.WebRequestMethod.Post); }

        constructor() {
            super('/Signout',true);
        }
    }
    export class Users extends DataTable<models.Clients, models.Client>{
        constructor() { super('Users'); super("Users"); }
        GetType() { return array_user; }
    }
    export class Fournisseur extends DataRow<models.Fournisseur>{
        constructor() { super("Fournisseur"); }
        GetType() { return models.Fournisseur; }
    }
    export class Fournisseurs extends DataTable<models.Fournisseurs, models.Fournisseur>{
        constructor() {
            super('Fournisseurs');
        }
        GetType() { return models.Fournisseurs; }
    }

    export class Message extends DataRow<models.Message>{
        constructor() {
            super("CallBack");
        }
        GetType() { return models.Message; }
        GetRequest(x: models.Message) { return new net.RequestUrl("/_/CallBack?Id=" + x.Id, null, null, net.WebRequestMethod.Post); }
    }


    export class Product extends DataRow<models.Product>{
        constructor() { super("Product"); }
        GetType() { return models.Product; }
    }

    export class Products extends DataTable<models.Products, models.Product>{
        constructor() { super('Products'); }
        GetType() { return array_product; }
    }

    export class FakePrices extends DataTable<models.FakePrices, models.FakePrice>{
        constructor() { super('Prices'); }
        GetType() { return models.FakePrices; }
    }
    export class ProductsUpdater extends DataTable<models.Products, models.Product>{
        constructor() { super('Products'); }
        GetType() { return array_product; }
    }


    export class Clients extends DataTable<models.Clients, models.Client>{
        constructor() { super('Clients'); }
        GetType() { return Clients; }
    }
    export class FakePrice extends DataRow<models.FakePrice>{
        constructor() { super("FakePrice"); }
        GetType() { return models.FakePrice; }
    }
    export class Price extends DataRow<models.Price>{
        constructor() { super("Price"); }
        GetType() { return models.Price; }
    }

    export class Facture extends FactureBase<models.Facture>{
        constructor() { super("Facture"); }
        GetType() { return models.Facture; }
    }
    export class Factures extends DataTable<models.Factures, models.Facture>{
        constructor() { super('Factures'); }
        GetType() { return array_Facture; }
    }
    export class Logins extends DataTable<models.Logins, models.Login>{
        constructor() { super('Users'); }
        GetType() { return models.Logins; }
    }

    export class Article extends DataRow<models.Article>{
        constructor() {
            super("Article"); }
        GetType() { return models.Article; }
    }
    export class Articles extends DataTable<models.Articles, models.Article>{
        constructor() { super('Articles'); }
        GetType() { return array_Article; }
    }


    export class Agent extends DataRow<models.Agent>{
        constructor() {
            super('Agent'); }
        GetType() { return models.Agent; }
    }
    export class Agents extends DataTable<models.Agents, models.Agent>{
        constructor() { super('Agents'); }
        GetType() { return array_Agent; }
    }

    export class Versment extends DataRow<models.Versment>{
        constructor() {
            super("Versment");
        }
        GetType() { return models.Versment; }
    }
    export class Versments extends DataTable<models.Versments, models.Versment>{
        constructor() {
            super('Versments');
            this.ERegister(net.WebRequestMethod.Get, "VFacture", "q=Facture&Facture=@Id", false);
            this.ERegister(net.WebRequestMethod.Get, "VClient", "q=Client&Client=@Id", false);
            this.ERegister(net.WebRequestMethod.Get, "VPeriod", "q=Period&From=@From&to=@To", false);
            this.ERegister(net.WebRequestMethod.Get, "VCassier", "q=Cassier&Cassier=@Id", false);
            this.ERegister(net.WebRequestMethod.Get, "VObservation", "q=Observation&Observation=@Observation", false);
        }
        GetType() { return models.Versments; }
    }
    export class SVersment extends DataRow<models.SVersment>{
        constructor() {
            super("SVersment"); }
        GetType() { return models.SVersment; }
    }
    export class SVersments extends DataTable<models.SVersments, models.SVersment>{
        constructor() {
            super('SVersments');

            this.ERegister(net.WebRequestMethod.Get, "VFacture", "q=Facture&Facture=@Id", false);
            this.ERegister(net.WebRequestMethod.Get, "VFournisseur", "q=Fournisseur&Fournisseur=@Id", false);
            this.ERegister(net.WebRequestMethod.Get, "VPeriod", "q=Period&From=@from&to=@to", false);
            this.ERegister(net.WebRequestMethod.Get, "VCassier", "q=Cassier&Cassier=@Id", false);
            this.ERegister(net.WebRequestMethod.Get, "VObservation", "q=Observation&Observation=@Observation", false);
        }
        GetType() { return models.SVersments; }
    }
    
    export class Costumers extends DataTable<models.Costumers, models.Client>{
        constructor() { super('Costumers'); }
        GetType() { return models.Costumers; }
    }

    export class Category extends DataRow<models.Category>{
        constructor() {
            super("Category"); }
        GetType() { return models.Category; }
    }
    export class Categories extends DataTable<models.Categories, models.Category>{
        constructor() { super('Categories'); }
        GetType() { return array_Category; }
    }

    export class Picture extends DataRow<models.Picture>{
        constructor() {
            super('Picture'); }
        GetType() { return models.Picture; }
    }
    export class Pictures extends DataTable<models.Pictures, models.Picture>{
        constructor() { super('Pictures'); }
        GetType() { return array_Picture; }
    }
    export class SFactures extends DataTable<models.SFactures, models.SFacture>{
        constructor() { super('SFactures'); }
        GetType() { return models.SFactures; }
    }
    export class EtatTransfers extends DataTable<models.EtatTransfers, models.EtatTransfer>{
        constructor() { super('EtatTransfers'); }
        GetType() { return models.EtatTransfers; }
    }

    export class iSFacture extends FactureBase<models.SFacture>{
        constructor() {
            super("SFacture");
        }
        GetType() { return models.SFacture; }
    }
    export class Settings extends DataRow<any>{
        constructor() {
            super("Settings");
            this.ERegister(net.WebRequestMethod.Get, "START", null, false);
            this.ERegister(net.WebRequestMethod.Post, "BACKUP", null, false);
            this.ERegister(net.WebRequestMethod.Put, "RESTORE", null, false);
        }
        GetType() { return Window; }
    }

    export function Load() {
        new Client, new Users, new Product, new Products, new Facture, new Factures, new Article, new Articles, new Agent, new Agents, new Versment, new Versments, new Category, new Categories, new Picture, new Pictures,
            new Login, new Signout, new FakePrice, new Clients, new Costumers, new Signup, new Logins(), new Categories, new FakePrices, new SFactures
            , new iSFacture(), new SVersment, new SVersments, new Fournisseur, new Fournisseurs, new Guid, new Message, new IsAdmin(), new Price(), new EtatTransfers(),new Settings
    };
}