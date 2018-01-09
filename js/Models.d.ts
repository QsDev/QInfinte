import { net, basic, encoding, bind, utils, collection } from "./Corelib";
import { data } from './System';
export declare namespace models {
    enum Job {
        Detaillant = 0,
        Proffessional = 1,
        WGrossit = 2,
        Grossist = 2,
        Entrepreneur = 3,
    }
    enum Abonment {
        Detaillant = 0,
        Proffessionnal = 1,
        DemiGrossist = 2,
        Grossist = 3,
        Importateur = 4,
        Exportateur = 5,
    }
    function get(): bind.DProperty<boolean, Login>;
    enum VersmentType {
        Cheque = 0,
        Espece = 1,
        ePay = 2,
        QPay = 3,
    }
    enum BonType {
        Bon = 0,
        Devise = 1,
        Facture = 2,
        BonCommand = 3,
    }
    enum MessageType {
        Info = 0,
        Error = 1,
        Command = 2,
        Confirm = 3,
    }
    enum AgentPermissions {
        None = 0,
        Agent = 1,
        Vendeur = 3,
        Achteur = 5,
        Cassier = 9,
        Validateur = 17,
        Admin = -1,
    }
    enum Quality {
        None = 0,
        Low = 1,
        Medium = 2,
        High = 3,
    }
    class CallBackMessage {
        ProxyCallback: any;
        Callback: net.Request;
        Downloader: net.QueeDownloader;
    }
    interface ISFacture {
        Articles: models.Articles | models.FakePrices;
        Fournisseur: models.Client;
        Achteur: models.Client;
        Validator: models.Client;
        IsValidated: models.Client;
        Date: models.Client;
        Total: number;
        Versments: Versments;
    }
    interface IloginCallback {
        Id: number;
        IsLogged: boolean;
        hash: number;
    }
}
export declare namespace models {
    class Message extends data.QShopRow {
        static DPData: bind.DProperty<string, Message>;
        Data: string;
        static DPContent: bind.DProperty<string, Message>;
        Content: string;
        static DPTitle: bind.DProperty<string, Message>;
        Title: string;
        static DPOkText: bind.DProperty<string, Message>;
        OKText: string;
        Callback: CallBackMessage;
        static DPType: bind.DProperty<MessageType, Message>;
        Type: MessageType;
        static DPAction: bind.DProperty<string, Message>;
        Action: string;
        static DPCancelText: bind.DProperty<string, Message>;
        CancelText: string;
        static __fields__(): (bind.DProperty<string, Message> | bind.DProperty<MessageType, Message>)[];
        constructor(id: number, message?: string);
        static getById(id: number, type: Function): Message;
        getStore(): collection.Dictionary<number, any>;
        private static pstore;
    }
    class Picture extends data.QShopRow {
        static DPImageUrl: bind.DProperty<string, Picture>;
        ImageUrl: string;
        static __fields__(): bind.DProperty<string, Picture>[];
        private _region;
        readonly Region: basic.Rectangle;
        constructor(id: number, url?: string);
        static getById(id: number, type: Function): Picture;
        getStore(): collection.Dictionary<number, any>;
        private static pstore;
    }
    class Pictures extends data.DataTable<Picture> {
        constructor(_parent: data.DataRow, items?: Picture[]);
        readonly ArgType: typeof Picture;
        protected getArgType(json: any): typeof Picture;
        GetType(): typeof Pictures;
    }
    class SFacture extends data.QShopRow {
        ArticlesListener: basic.ITBindable<any>;
        static __fields__(): (bind.DProperty<Fournisseur, SFacture> | bind.DProperty<Agent, SFacture> | bind.DProperty<boolean, SFacture> | bind.DProperty<Date, SFacture> | bind.DProperty<number, SFacture> | bind.DProperty<SVersments, SFacture> | bind.DProperty<FakePrices, SFacture>)[];
        constructor(id?: number);
        OnArticlesChanged(e: utils.ListEventArgs<number, FakePrice>): void;
        CalcTotal(): number;
        ToJson(_context: encoding.SerializationContext, indexer?: encoding.IIndexer): Object;
        getStore(): any;
        private static _flds;
        static getById(i: number): SFacture;
        static DPFournisseur: bind.DProperty<Fournisseur, SFacture>;
        static DPAchteur: bind.DProperty<Agent, SFacture>;
        static DPValidator: bind.DProperty<Agent, SFacture>;
        static DPArticles: bind.DProperty<FakePrices, SFacture>;
        static DPIsValidated: bind.DProperty<boolean, SFacture>;
        static DPDate: bind.DProperty<Date, SFacture>;
        static DPTotal: bind.DProperty<number, SFacture>;
        static DPSold: bind.DProperty<number, SFacture>;
        static DPVersments: bind.DProperty<SVersments, SFacture>;
        Fournisseur: Fournisseur;
        Achteur: Agent;
        Validateur: Agent;
        Articles: FakePrices;
        IsValidated: boolean;
        Date: Date;
        Total: number;
        Sold: number;
        Versments: SVersments;
        static ctor(): void;
    }
    class Price extends data.QShopRow {
        static DPPSel: bind.DProperty<number, Price>;
        static DPValue: bind.DProperty<number, Price>;
        static DPPValue: bind.DProperty<number, Price>;
        static DPHWValue: bind.DProperty<number, Price>;
        static DPWValue: bind.DProperty<number, Price>;
        static DPQte: bind.DProperty<number, Price>;
        static __fields__(): any;
        PSel: number;
        Value: number;
        PValue: number;
        HWValue: number;
        WValue: number;
        Qte: number;
        GetPrice(abonment: Abonment): number;
        GetDProperty(abonment: Abonment): bind.DProperty<any, any>;
        static GetDProperty(abonment: Abonment): bind.DProperty<number, Price>;
        static GetAbonment(prop: bind.DProperty<number, any>): number;
        ISetValue(abonment: Abonment, price: number): void;
        IGetValue(abonment: Abonment): number;
        ClonePrices(to: Price, alsoPSet?: boolean): void;
        getStore(): collection.Dictionary<number, this>;
        static pStore: collection.Dictionary<number, Price>;
    }
    class FakePrice extends Price {
        static DPProduct: bind.DProperty<Product, FakePrice>;
        static DPSFacture: bind.DProperty<ISFacture, FakePrice>;
        static DPNextRevage: bind.DProperty<FakePrice, FakePrice>;
        static DPApplyPrice: bind.DProperty<FakePrice, FakePrice>;
        static __fields__(): (bind.DProperty<Product, FakePrice> | bind.DProperty<FakePrice, FakePrice> | bind.DProperty<ISFacture, FakePrice>)[];
        Facture: ISFacture | SFacture;
        Product: Product;
        NextRevage: FakePrice;
        ApplyPrice: FakePrice;
        getStore(): any;
        static pStore: collection.Dictionary<number, FakePrice>;
        static getById(id: number): FakePrice;
        ToList(): collection.List<FakePrice>;
        toString(): string;
    }
    class FakePrices extends data.DataTable<FakePrice> {
        constructor(owner: data.DataRow, array?: FakePrice[]);
        readonly ArgType: typeof FakePrice;
        protected getArgType(json: any): typeof FakePrice;
        GetType(): typeof FakePrices;
    }
    abstract class BVersment extends data.QShopRow {
        static ctor(): void;
        static DPType: bind.DProperty<VersmentType, BVersment>;
        static DPMontant: bind.DProperty<number, BVersment>;
        static DPDate: bind.DProperty<Date, BVersment>;
        Type: VersmentType;
        Montant: number;
        static __fields__(): any;
        abstract getStore(): collection.Dictionary<number, any>;
    }
    class Versment extends BVersment {
        static ctor(): void;
        static DPOwner: bind.DProperty<Facture, Versment>;
        Owner: Facture;
        static __fields__(): bind.DProperty<Facture, Versment>[];
        constructor(id: number);
        static getById(id: number, type: Function): Versment;
        getStore(): collection.Dictionary<number, any>;
        static pstore: collection.Dictionary<number, Versment>;
    }
    class SVersment extends BVersment {
        static ctor(): void;
        static DPOwner: bind.DProperty<SFacture, SVersment>;
        Owner: SFacture;
        static __fields__(): bind.DProperty<SFacture, SVersment>[];
        constructor(id: number);
        static getById(id: number, type: Function): SVersment;
        getStore(): collection.Dictionary<number, any>;
        static pstore: collection.Dictionary<number, SVersment>;
    }
    abstract class BVersments<T extends data.DataRow> extends data.DataTable<T> {
    }
    class Versments extends BVersments<Versment> {
        constructor(_parent: data.DataRow);
        readonly ArgType: typeof Versment;
        protected getArgType(json: any): typeof Versment;
        GetType(): typeof Versments;
    }
    class SVersments extends BVersments<SVersment> {
        constructor(_parent: data.DataRow);
        readonly ArgType: typeof SVersment;
        protected getArgType(json: any): typeof SVersment;
        GetType(): typeof SVersments;
    }
    class Costumers extends data.DataTable<Client> {
        constructor(_parent: data.DataRow, items?: Client[]);
        readonly ArgType: typeof Client;
        protected getArgType(json: any): typeof Client;
        GetType(): typeof Costumers;
    }
    class Shop extends data.QShopRow {
        getStore(): any;
        private static pStore;
    }
    class Fournisseur extends data.QShopRow {
        static __fields__(): (bind.DProperty<string, Fournisseur> | bind.DProperty<Picture, Fournisseur> | bind.DProperty<SFactures, Fournisseur>)[];
        static DPEmail: bind.DProperty<string, Fournisseur>;
        static DPTel: bind.DProperty<string, Fournisseur>;
        static DPName: bind.DProperty<string, Fournisseur>;
        static DPAddress: bind.DProperty<string, Fournisseur>;
        static DPAvatar: bind.DProperty<Picture, Fournisseur>;
        static DPFactures: bind.DProperty<SFactures, Fournisseur>;
        Email: string;
        Tel: string;
        Name: string;
        Address: string;
        Avatar: Picture;
        Factures: SFactures;
        constructor(id?: number);
        static ctor(): void;
        getStore(): any;
        private static store;
        toString(): string;
    }
    class Fournisseurs extends data.DataTable<Fournisseur> {
        constructor(_parent: data.DataRow, items?: Fournisseur[]);
        readonly ArgType: typeof Fournisseur;
        protected getArgType(json: any): typeof Fournisseur;
        GetType(): typeof Fournisseurs;
    }
    class Client extends data.QShopRow {
        static DPAbonment: bind.DProperty<Abonment, Client>;
        Abonment: Abonment;
        static DPFirstName: bind.DProperty<string, Client>;
        FirstName: string;
        static DPLastName: bind.DProperty<string, Client>;
        LastName: string;
        static DPFullName: bind.DProperty<string, Client>;
        readonly FullName: string;
        static DPTel: bind.DProperty<string, Client>;
        Tel: string;
        static DPEmail: bind.DProperty<string, Client>;
        Email: string;
        static DPJob: bind.DProperty<Job, Client>;
        Job: Job;
        static DPPicture: bind.DProperty<Picture, Client>;
        Picture: Picture;
        static DPWorkAt: bind.DProperty<string, Client>;
        WorkAt: string;
        static DPFactures: bind.DProperty<Factures, Client>;
        Factures: Factures;
        constructor(id: any);
        toString(): string;
        static __fields__(): bind.DProperty<any, any>[];
        static getById(id: number, type?: Function): Client;
        getStore(): collection.Dictionary<number, any>;
        private static pstore;
        static ctor(): void;
    }
    class Clients extends data.DataTable<Client> {
        constructor(_parent: data.DataRow, items?: Client[]);
        readonly ArgType: typeof Client;
        protected getArgType(json: any): typeof Client;
        GetType(): typeof Clients;
    }
    class Mail extends data.QShopRow {
        static __fields__(): (bind.DProperty<Client, Mail> | bind.DProperty<string, Mail> | bind.DProperty<Number, Mail> | bind.DProperty<Boolean, Mail>)[];
        static DPFrom: bind.DProperty<Client, Mail>;
        static DPTo: bind.DProperty<Client, Mail>;
        static DPSubject: bind.DProperty<string, Mail>;
        static DPBody: bind.DProperty<string, Mail>;
        static DPTargetId: bind.DProperty<Number, Mail>;
        static DPVisited: bind.DProperty<Boolean, Mail>;
        From: Client;
        To: Client;
        Subject: string;
        Body: string;
        Visited: boolean;
        TargetId: number;
        getStore(): collection.Dictionary<any, any>;
        private static store;
    }
    class Mails extends data.DataTable<Mail> {
        constructor(parent: data.DataRow, array: Mail[]);
    }
    class Categories extends data.DataTable<Category> {
        constructor(_parent: data.DataRow);
        readonly ArgType: typeof Category;
        protected getArgType(json: any): typeof Category;
        GetType(): typeof Categories;
    }
    class Category extends data.QShopRow {
        static DPName: bind.DProperty<string, Category>;
        static DPBase: bind.DProperty<Category, Category>;
        Base: Category;
        Name: string;
        static __fields__(): (bind.DProperty<string, Category> | bind.DProperty<Category, Category>)[];
        static GetCategory(id: number): Category;
        private static _categoriesStore;
        static readonly Categories: Categories;
        constructor(id: number);
        toString(): string;
        private _s;
        getStore(): collection.Dictionary<number, any>;
        static getById(id: number, type: Function): Category;
        static pstore: collection.Dictionary<number, Category>;
        static ctor(): void;
    }
    class Agent extends data.QShopRow {
        static DPLogin: bind.DProperty<Login, Agent>;
        Login: Login;
        static DPIsDisponible: bind.DProperty<boolean, Agent>;
        IsDisponible: boolean;
        static DPPermission: bind.DProperty<AgentPermissions, Agent>;
        Permission: AgentPermissions;
        static __fields__(): (bind.DProperty<Login, Agent> | bind.DProperty<boolean, Agent> | bind.DProperty<AgentPermissions, Agent>)[];
        constructor(id: number);
        static getById(id: number, type: Function): Agent;
        private static pstore;
        getStore(): collection.Dictionary<number, any>;
        static ctor(): void;
        toString(): string;
    }
    class Agents extends data.DataTable<Agent> {
        constructor(_parent: data.DataRow);
        readonly ArgType: typeof Agent;
        protected getArgType(json: any): typeof Agent;
        GetType(): typeof Agents;
    }
    class Product extends Price {
        static DPCategory: bind.DProperty<Category, Product>;
        static DPName: bind.DProperty<string, Product>;
        static DPDescription: bind.DProperty<string, Product>;
        static DPPicture: bind.DProperty<Picture, Product>;
        static DPDimention: bind.DProperty<string, Product>;
        static DPPrice: bind.DProperty<FakePrice, Product>;
        static DPQuality: bind.DProperty<number, Product>;
        static DPSerieName: bind.DProperty<string, Product>;
        static DPRevage: bind.DProperty<FakePrice, Product>;
        static DPCurrentArticle: bind.DProperty<Article, Product>;
        CurrentArticle: Article;
        Category: Category;
        Name: string;
        Description: string;
        Picture: Picture;
        Dimention: string;
        Revage: FakePrice;
        Quality: number;
        SerieName: string;
        private _toString;
        toString(): string;
        static __fields__(): Array<any>;
        protected onPropertyChanged(ev: bind.EventArgs<any, any>): void;
        constructor(id: number);
        static getById(id: number, type?: Function): Product;
        getStore(): collection.Dictionary<number, any>;
        private static pstore;
        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this;
        static ctor(): void;
    }
    class Products extends data.DataTable<Product> {
        constructor(_parent: data.DataRow, items?: Product[]);
        readonly ArgType: typeof Product;
        protected getArgType(json: any): typeof Product;
        GetType(): typeof Products;
    }
    class Article extends data.QShopRow {
        toString(): string;
        static DPProduct: bind.DProperty<Product, Article>;
        Product: Product;
        static DPOwner: bind.DProperty<Facture, Article>;
        Owner: Facture;
        static DPPrice: bind.DProperty<number, Article>;
        Price: number;
        static DPCount: bind.DProperty<number, Article>;
        Count: number;
        OCount: number;
        static __fields__(): (bind.DProperty<Facture, Article> | bind.DProperty<Product, Article> | bind.DProperty<number, Article>)[];
        constructor(id: number);
        static getById(id: number, type: Function): any;
        getStore(): collection.Dictionary<number, any>;
        private static pstore;
        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this;
        static ctor(): void;
    }
    class Articles extends data.DataTable<Article> {
        constructor(_parent: data.DataRow, items?: Article[]);
        readonly ArgType: typeof Article;
        protected getArgType(json: any): typeof Article;
        GetType(): typeof Articles;
    }
    class Facture extends data.QShopRow {
        static DPClient: bind.DProperty<Client, Facture>;
        static DPIsValidated: bind.DProperty<boolean, Facture>;
        static DPArticles: bind.DProperty<Articles, Facture>;
        static DPType: bind.DProperty<BonType, Facture>;
        static DPDateLivraison: bind.DProperty<Date, Facture>;
        static DPVersments: bind.DProperty<Versments, Facture>;
        static DPSold: bind.DProperty<number, Facture>;
        static DPTotal: bind.DProperty<number, Facture>;
        static DPDate: bind.DProperty<Date, Facture>;
        static DPAgent: bind.DProperty<Agent, Facture>;
        private static pstore;
        Client: Client;
        Vendeur: Agent;
        Date: Date;
        Total: number;
        Sold: number;
        Versments: Versments;
        DateLivraison: Date;
        Type: number;
        Articles: Articles;
        readonly IsValidated: boolean;
        private static getString(obj);
        toString(): string;
        static __fields__(): (bind.DProperty<Client, Facture> | bind.DProperty<Agent, Facture> | bind.DProperty<Date, Facture> | bind.DProperty<number, Facture> | bind.DProperty<Versments, Facture> | bind.DProperty<Articles, Facture> | bind.DProperty<boolean, Facture>)[];
        constructor(id: number);
        CalcTotal(): number;
        Freeze(): void;
        static getById(id: number, type: Function): Facture;
        getStore(): collection.Dictionary<number, any>;
        static freezeArray(e: any): void;
        static _ctor(): void;
        Update(): void;
    }
    class SFactures extends data.DataTable<SFacture> {
        constructor(owner: data.DataRow, array?: SFacture[]);
        readonly ArgType: typeof SFacture;
        protected getArgType(json: any): typeof SFacture;
        GetType(): typeof SFactures;
    }
    class Factures extends data.DataTable<Facture> {
        constructor(_parent: data.DataRow, items?: Facture[]);
        readonly ArgType: typeof Facture;
        protected getArgType(json: any): typeof Facture;
        GetType(): typeof Factures;
        OnDeserialize(list: Facture[]): void;
    }
    class QData extends data.QShopRow {
        private static pStore;
        getStore(): collection.Dictionary<number, any>;
        static __fields__(): (bind.DProperty<Products, QData> | bind.DProperty<Facture, QData> | bind.DProperty<Factures, QData> | bind.DProperty<Agents, QData> | bind.DProperty<Articles, QData> | bind.DProperty<Categories, QData> | bind.DProperty<FakePrices, QData> | bind.DProperty<SFactures, QData> | bind.DProperty<Fournisseurs, QData> | bind.DProperty<Versments, QData> | bind.DProperty<SVersments, QData>)[];
        static DPProducts: bind.DProperty<Products, QData>;
        readonly Products: Products;
        static DPPrices: bind.DProperty<FakePrices, QData>;
        readonly Prices: FakePrices;
        static DPCategories: bind.DProperty<Categories, QData>;
        readonly Categories: Categories;
        static DPArticles: bind.DProperty<Articles, QData>;
        readonly Articles: Articles;
        static DPSelectedFacture: bind.DProperty<Facture, QData>;
        SelectedFacture: Facture;
        static DPFactures: bind.DProperty<Factures, QData>;
        readonly Factures: Factures;
        static DPSFactures: bind.DProperty<SFactures, QData>;
        readonly SFactures: SFactures;
        static DPCostmers: bind.DProperty<Costumers, QData>;
        readonly Costumers: Costumers;
        static DPFournisseurs: bind.DProperty<Fournisseurs, QData>;
        readonly Fournisseurs: Fournisseurs;
        private static DPAgents;
        readonly Agents: Agents;
        static DPVersments: bind.DProperty<Versments, QData>;
        readonly Versments: Versments;
        static DPSVersments: bind.DProperty<SVersments, QData>;
        readonly SVersments: SVersments;
        private onCurrentFactureChanged(e);
        private oacd;
        private articles;
        private OnArticlesChanged(e);
        Clear(): void;
        constructor();
        private i;
        private static i;
        private createNew();
    }
    class ii {
    }
    class Logout extends data.QShopRow {
        getStore(): any;
    }
    class Login extends data.QShopRow {
        readonly IsLogged: boolean;
        static DPUsername: bind.DProperty<string, Login>;
        Username: string;
        static DPPwd: bind.DProperty<string, Login>;
        Pwd: string;
        static DPIdentification: bind.DProperty<string, Login>;
        Identification: string;
        static DPClient: bind.DProperty<Client, Login>;
        Client: Client;
        static __fields__(): (bind.DProperty<boolean, Login> | bind.DProperty<string, Login> | bind.DProperty<Client, Login>)[];
        constructor(id?: any);
        getStore(): collection.Dictionary<number, any>;
        GetType(): typeof Login;
        OnMessage(invoke: (s: bind.PropBinding, e: bind.EventArgs<boolean, Login>) => void): void;
        static update: boolean;
        private static pStore;
        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this;
    }
    class Signup extends Login {
    }
    class Signout extends data.QShopRow {
        static __fields__(): any[];
        getStore(): collection.Dictionary<number, any>;
        GetType(): typeof Signout;
        private static pStore;
        constructor();
    }
    class Logins extends data.DataTable<Login> {
        constructor(_parent: data.DataRow, items?: Login[]);
        readonly ArgType: typeof Facture;
        protected getArgType(json: any): typeof Facture;
        GetType(): typeof Factures;
        OnDeserialize(list: Login[]): void;
    }
    class IsAdmin extends data.QShopRow {
        getStore(): any;
    }
}
