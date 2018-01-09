import { net, basic, encoding, bind, reflection, thread, utils, collection} from "./Corelib";
import {sdata,Controller} from './System';
import Client = require("./Client");
var DPIsLogged = bind.DObject.CreateField<boolean, models.Login>("CheckLogging", Boolean, null, null, null, bind.PropertyAttribute.NonSerializable);

declare var context : basic.IContext;
export namespace models {

    export enum Job {
        Detaillant = 0,
        Proffessional = 1,
        WGrossit,
        Grossist = 2,
        Entrepreneur
    }
    export enum Abonment {
        Detaillant = 0,
        Proffessionnal = 1,
        DemiGrossist = 2,
        Grossist = 3,
        Importateur = 4,
        Exportateur = 5,
    }
    export function get() {
        delete models.get; return DPIsLogged;
    }

    export enum VersmentType {
        Espece,
        CCP,
        CIB,
        Cheque,
        EPay,
        QPay,
    }
    export enum BonType {
        Bon,
        Devise,
        Facture,
        BonCommand,
    }

    export enum MessageType {
        Info = 0,
        Error = 1,
        Command = 2, Confirm = 3
    }

    export enum AgentPermissions {

        None = 0,
        Agent = 1,
        Vendeur = Agent | 2,
        Achteur = Agent | 4,
        Cassier = Agent | 8,
        Validateur = Agent | 16,
        Admin = -1
    }
    export enum Quality {
        None,
        Low,
        Medium,
        High,
    }
    export class CallBackMessage {
        ProxyCallback;
        Callback: net.Request;
        Downloader: net.QueeDownloader;
    }

    export interface ISFacture {
        Articles: models.Articles | models.FakePrices;
        Fournisseur: models.Client;
        Achteur: models.Client;
        Validator: models.Client;
        IsValidated: models.Client;
        Date: models.Client;
        Total: number;
        Versments: Versments;
    }

    export interface IloginCallback {
        Id: number;
        IsLogged: boolean;
        hash: number;
    }
    
}

export namespace models {


    var sfpStore = new collection.Dictionary<number, SFacture>("sfactures", false);

    export abstract class Person extends sdata.QShopRow {
        static __fields__() { return [this.DPName, this.DPTel, this.DPEmail, this.DPAddress, this.DPAvatar, this.DPObservation, this.DPLastModified, this.DPVersmentTotal, this.DPMontantTotal, this.DPNFactures, this.DPSoldTotal]; }
        public static DPEmail: bind.DProperty<string, Person>;
        public static DPTel: bind.DProperty<string, Person>;
        public static DPName: bind.DProperty<string, Person>;
        public static DPAddress: bind.DProperty<string, Person>;
        public static DPAvatar: bind.DProperty<Picture, Person>;

        public static DPMontantTotal: bind.DProperty<number, Person>;
        public MontantTotal: number;


        public static DPVersmentTotal: bind.DProperty<number, Person>;
        public VersmentTotal: number;


        public static DPLastModified: bind.DProperty<Date, Person>;
        public LastModified: Date;

        
        public static DPObservation: bind.DProperty<string, Person>;
        public Observation: string;


        public static DPNFactures: bind.DProperty<number, Person>;
        public NFactures: number;


        public static DPSoldTotal: bind.DProperty<number, Person>;

        public get SoldTotal(): number { return this.get(Person.DPSoldTotal); }

        public Email: string;
        public Tel: string;
        public Name: string;
        public Address: string;
        public Avatar: Picture;

        static ctor() {
            Person.DPLastModified = bind.DObject.CreateField<Date, Person>('LastModified', Date, null);

            this.DPEmail = bind.DObject.CreateField<string, Person>("Email", String);
            this.DPTel = bind.DObject.CreateField<string, Person>("Tel", String);
            this.DPName = bind.DObject.CreateField<string, Person>("Name", String);
            this.DPAddress = bind.DObject.CreateField<string, Person>("Address", String);
            this.DPAvatar = bind.DObject.CreateField<Picture, Person>("Avatar", Picture, null, null, null, bind.PropertyAttribute.SerializeAsId);

            Person.DPObservation = bind.DObject.CreateField<string, Person>('Observation', String);
            Person.DPVersmentTotal = bind.DObject.CreateField<number, Person>('VersmentTotal', Number, null, calcSold);
            Person.DPMontantTotal = bind.DObject.CreateField<number, Person>('MontantTotal', Number, null, calcSold);
            Person.DPNFactures = bind.DObject.CreateField<number, Person>('NFactures', Number, null);


            Person.DPSoldTotal = bind.DObject.CreateField<number, Person>('SoldTotal', Number, 0, null, null, bind.PropertyAttribute.Private);


        }
    }
    function calcSold(e: bind.EventArgs<number, Person>) {
        e.__this.SetValue(Person.DPSoldTotal, (e.__this.MontantTotal || 0) - (e.__this.VersmentTotal || 0));
    }

    export class Message extends sdata.QShopRow {

        public static DPData = bind.DObject.CreateField<string, Message>("Data", Object);

        public Data: string;

        public static DPContent = bind.DObject.CreateField<string, Message>("Content", String, "", null, null, bind.PropertyAttribute.NonSerializable);

        public Content: string;

        public static DPTitle = bind.DObject.CreateField<string, Message>("Title", String, "", null, null, bind.PropertyAttribute.NonSerializable);

        public Title: string;

        public static DPOkText = bind.DObject.CreateField<string, Message>("OKText", String, undefined, null, null, bind.PropertyAttribute.NonSerializable);

        public OKText: string;

        public Callback: CallBackMessage;

        public static DPType = bind.DObject.CreateField<MessageType, Message>("Type", Number, MessageType.Info, null, null, bind.PropertyAttribute.NonSerializable);

        public Type: MessageType;

        public static DPAction = bind.DObject.CreateField<string, Message>("Action", String, undefined);

        public Action: string;
        public static DPCancelText = bind.DObject.CreateField<string, Message>("CancelText", String, undefined, null, null, bind.PropertyAttribute.NonSerializable);

        public CancelText: string;

        static __fields__() { return [Message.DPContent, Message.DPTitle, Message.DPOkText, Message.DPCancelText, Message.DPAction, Message.DPType, Message.DPData]; }

        constructor(id: number, message?: string) {
            super(id || basic.New());
            this.Content = message;
        }

        public static getById(id: number, type: Function): Message {
            return Message.pstore.Get(id);
        }

        public getStore(): collection.Dictionary<number, any> { return Message.pstore; }

        private static pstore = new collection.Dictionary<number, Message>("Messages", true);
    }

    export class Picture extends sdata.QShopRow {

        public static DPImageUrl = bind.DObject.CreateField<string, Picture>("ImageUrl", String, "");
        public ImageUrl: string;
        static __fields__() { return [Picture.DPImageUrl]; }

        private _region: basic.Rectangle = new basic.Rectangle();
        public get Region(): basic.Rectangle {
            return this._region;
        }
        constructor(id: number, url?: string) {
            super(id);
            this.ImageUrl = url;
        }

        public static getById(id: number, type: Function): Picture {
            return Picture.pstore.Get(id);
        }
        public getStore(): collection.Dictionary<number, any> { return Picture.pstore; }

        private static pstore = new collection.Dictionary<number, Picture>("Pictures", true);
    }

    export class Pictures extends sdata.DataTable<Picture>{
        constructor(_parent: sdata.DataRow, items?: Picture[]) {
            super(_parent, Picture, (id) => new Picture(id), items);
        }
        public get ArgType() { return Picture; }
        protected getArgType(json) { return Picture; }
        GetType() { return Pictures; }
    }

    export abstract class FactureBase extends sdata.QShopRow implements net.IRequestParams {
        [name: string]: any;
        static __fields__() {
            return [
                this.DPTotal,
                this.DPDateLivraison,
                this.DPDate,
                this.DPLastModified,
                this.DPEditeur,
                this.DPValidator,
                this.DPObservation,
                this.DPLockedBy,
                this.DPLockedAt,
                this.DPType,
                this.DPIsValidated, this.DPIsOpen, this.DPNArticles, this.DPRef, this.DPSold, this.DPVersment
            ];
        }
        public static DPTotal = bind.DObject.CreateField<number, FactureBase>('Total', Number, 0, (e) => {
            var x = e.__this;
            x.Sold = x.Total - x.Versment;
        }, null, bind.PropertyAttribute.NonSerializable);
        public Total: number;

        public static DPDateLivraison = bind.DObject.CreateField<Date, FactureBase>('DateLivraison', Date, null);
        public DateLivraison: Date;

        public static DPDate = bind.DObject.CreateField<Date, FactureBase>('Date', Date, null);
        public Date: Date;

        public static DPLastModified = bind.DObject.CreateField<Date, FactureBase>('LastModified', Date, null, null, null, bind.PropertyAttribute.NonSerializable);
        public LastModified: Date;
        public static DPEditeur: bind.DProperty<models.Client, FactureBase>;
        public Editeur: models.Client;
        public static DPValidator: bind.DProperty<Agent, FactureBase>;
        public Validator: Agent;
        public static DPObservation = bind.DObject.CreateField<string, FactureBase>('Observation', String, null);
        public Observation: string;
        public static DPLockedBy: bind.DProperty<Agent, FactureBase>;
        public LockedBy: Agent;
        public static DPLockedAt: bind.DProperty<Date, FactureBase>;
        public LockedAt: Date;
        public static DPType = bind.DObject.CreateField<BonType, FactureBase>('Type', Number, null);
        public Type: BonType;
        public static DPIsValidated = bind.DObject.CreateField<boolean, FactureBase>('IsValidated', Boolean, null);
        public IsValidated: boolean;


        public static DPIsOpen = bind.DObject.CreateField<boolean, FactureBase>('IsOpen', Boolean, null, (e) => { e.__this._isFrozen = !e._new; }, null, bind.PropertyAttribute.NonSerializable | bind.PropertyAttribute.Private);
        public get IsOpen(): boolean { return this.get(FactureBase.DPIsOpen); }
        public set IsOpen(c: boolean) { if (c) this._isFrozen = false; this.set(FactureBase.DPIsOpen, c); }



        public static DPNArticles = bind.DObject.CreateField<number, FactureBase>('NArticles', Number, 0, null, null, bind.PropertyAttribute.NonSerializable);
        public NArticles: number;


        public static DPRef = bind.DObject.CreateField<string, FactureBase>('Ref', String, null);
        public Ref: string;


        public static DPSold = bind.DObject.CreateField<number, FactureBase>('Sold', Number, null, null, null, bind.PropertyAttribute.NonSerializable);
        public Sold: number;


        public static DPVersment = bind.DObject.CreateField<number, FactureBase>('Versment', Number, 0, (e) => {
            var x = e.__this;
            x.Sold = x.Total - x.Versment;
        }, null, bind.PropertyAttribute.NonSerializable);
        public Versment: number;


        static ctor() {
            FactureBase.DPLockedAt = bind.DObject.CreateField<Date, FactureBase>('LockedAt', Date, null);
            FactureBase.DPLockedBy = bind.DObject.CreateField<Agent, FactureBase>('LockedBy', Agent, null, null, null, bind.PropertyAttribute.SerializeAsId);
            FactureBase.DPEditeur = bind.DObject.CreateField<models.Client, FactureBase>('Editeur', models.Client, null, null, null, bind.PropertyAttribute.SerializeAsId);
            FactureBase.DPValidator = bind.DObject.CreateField<Agent, FactureBase>('Validator', Agent, null, null, null, bind.PropertyAttribute.SerializeAsId);
        }

        public Recalc(results: sdata.DataTable<VersmentBase>) {
            var tt = this._isFrozen;
            try {
                this._isFrozen = false;
                this.CalcTotal();
                var t = results.AsList();
                var x = 0;
                for (var i = t.length - 1; i >= 0; i--)
                    x += t[i].Montant;
                this.Versment = x;
            } catch (e) {

            }
            this._isFrozen = tt;
        }
    }

    export class Client extends Person {

        public static DPAbonment = bind.DObject.CreateField<models.Abonment, Client>("Abonment", Number, 0, (e) => { if (e._new == null) e._new = Abonment.Detaillant; });
        public Abonment: models.Abonment;

        public static DPFirstName = bind.DObject.CreateField<string, Client>("FirstName", String, null, (e) => {
            e.__this.set(Client.DPFullName, (e._new || '') + ' ' + (e.__this.LastName || ''));
        });
        public FirstName: string;

        public static DPLastName = bind.DObject.CreateField<string, Client>("LastName", String, null, (e) => { e.__this.set(Client.DPFullName, (e.__this.FirstName || '') + ' ' + (e._new || '')); });
        public LastName: string;

        public static DPFullName = bind.DObject.CreateField<string, Client>("FullName", String, null, null, null, bind.PropertyAttribute.Private);
        public get FullName(): string { return this.get<string>(Client.DPFullName); }

        public static DPJob = bind.DObject.CreateField<models.Job, Client>("Job", Number, models.Job.Detaillant);
        public Job: models.Job;

        
        public static DPWorkAt: bind.DProperty<string, Client>;
        public WorkAt: string;        

        constructor(id) {
            super(id);
        }
        
        toString() {
            return this.get(Client.DPFullName) || '' + ' \temail:' +
                this.get(Person.DPEmail)||'' + ' \ttel:' +
                this.get(Person.DPTel) || '' + ' \twork:' +
                this.get(Client.DPWorkAt) || '';
        }

        public static __fields__(): bind.DProperty<any, any>[] {
            return [
                Client.DPFirstName,
                Client.DPLastName,
                Client.DPJob,
                Client.DPWorkAt, Client.DPFullName, Client.DPAbonment
            ];
        }


        public static getById(id: number, type?: Function): Client {
            return Client.pstore.Get(id as number);
        }
        public getStore(): collection.Dictionary<number, any> { return Client.pstore; }

        private static pstore = new collection.Dictionary<number, Client>("Clients", true);
        static ctor() {            
            this.DPWorkAt = bind.DObject.CreateField<string, Client>("WorkAt", String, null, null, null, bind.PropertyAttribute.SerializeAsId);

        }
    }

    export class SFacture extends FactureBase {
        public ArticlesListener = <basic.ITBindable<any>>{ Invoke: this.OnArticlesChanged, Owner: this };
        static __fields__() { return [this.DPFournisseur, this.DPAchteur, this.DPArticles] as any; }


        constructor(id?: number) {
            super(id);
            this.set(SFacture.DPArticles, new FakePrices(this));
        }
        public OnArticlesChanged(e: utils.ListEventArgs<number, FakePrice>) {
            var a = this.get(SFacture.DPArticles);
            var c = 0;
            if (a)
                for (var i = 0, l = a.Count; i < l; i++) {
                    var t = a.Get(i);
                    c += t.Qte * t.PSel;
                }
            this.set(SFacture.DPTotal, c);
        }
        public CalcTotal() {
            var a = this.get(SFacture.DPArticles);
            var c = 0;
            if (a)
                for (var i = 0, l = a.Count; i < l; i++) {
                    var t = a.Get(i);
                    c += t.Qte * t.PSel;
                }
            this.set(SFacture.DPTotal, c);
            return c;
        }
        ToJson(_context: encoding.SerializationContext, indexer?: encoding.IIndexer): Object {

            return super.ToJson(_context, indexer);
        }
        public getStore() { return sfpStore as any; }
        private static _flds;

        static getById(i: number) {
            return sfpStore.Get(i);
        }

        _str: string;
        toString() {
            return this._str || (this._str = BonType[this.Type] + " " + this.Ref + ": " + ' [' + Facture.getString(this.get(SFacture.DPFournisseur)) + '\rdate:' + Facture.getString(this.get(Facture.DPDate)) + '\rdatelivraison:' + Facture.getString(this.get(Facture.DPDateLivraison)) + ']');
        }

        public static DPFournisseur: bind.DProperty<Fournisseur, SFacture>;
        public static DPAchteur: bind.DProperty<Agent, SFacture>;
        public static DPArticles: bind.DProperty<FakePrices, SFacture>;

        public Fournisseur: Fournisseur;
        public Achteur: Agent;
        public Articles: FakePrices;
        

        static ctor() {
            this.DPFournisseur = bind.DObject.CreateField<Fournisseur, SFacture>('Fournisseur', Fournisseur, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPAchteur = bind.DObject.CreateField<Agent, SFacture>('Achteur', Agent, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPArticles = bind.DObject.CreateField<FakePrices, SFacture>('Articles', FakePrices, null, (e) => {
                //if (e._old)
                //    e._old.Unlisten = e.__this.ArticlesListener;
                //if (e._new)
                //    e._new.Listen = e.__this.ArticlesListener;
                //e.__this.OnArticlesChanged(null);
            });
        }
    }

    export class Price extends sdata.QShopRow {
        static CalclMoyen(_old: Price, _new: Price): any {
            var o = _old.Qte||0; var n = _new.Qte||0;
            var sum = o + n;
            if (sum == 0) return null;            
            var props = Price.__fields__() as bind.DProperty<number, Price>[];
            var no = new FakePrice();
            for (var i = 0; i < props.length - 1; i++) {
                var prop = props[i];
                no.set(prop, ((_old.get(prop) || 0) * o + (_new.get(prop) || 0) * n) / sum);
            }
            return no;
        }
        public static DPPSel = bind.DObject.CreateField<number, Price>("PSel", Number, 0);
        public static DPValue = bind.DObject.CreateField<number, Price>("Value", Number, 0);
        public static DPPValue = bind.DObject.CreateField<number, Price>("PValue", Number, 0);
        public static DPHWValue = bind.DObject.CreateField<number, Price>("HWValue", Number, 0);
        public static DPWValue = bind.DObject.CreateField<number, Price>("WValue", Number, 0);
        public static DPQte = bind.DObject.CreateField<number, Price>("Qte", Number, null);
        static __fields__() { return [Price.DPPSel, Price.DPValue, Price.DPPValue, Price.DPHWValue, Price.DPWValue, Price.DPQte] as any[]; }

        public PSel: number;
        public Value: number;
        public PValue: number;
        public HWValue: number;
        public WValue: number;
        public Qte: number;

        public GetPrice(abonment: Abonment) {
            if (abonment < 4 && abonment >= 0)
                return this.get<number>(this.GetDProperty(abonment));
            return this.Value;
        }

        public GetDProperty(abonment: Abonment) {
            if (abonment < 4 && abonment >= 0)
                return bind.DObject.GetDPropertyAt(this.constructor, Price.DPValue.Index + abonment);
            return Price.DPValue;

        }
        public static GetDProperty(abonment: Abonment): bind.DProperty<number, Price> {
            if (abonment < 4 && abonment >= 0)
                return bind.DObject.GetDPropertyAt(this, Price.DPValue.Index + abonment);
            return Price.DPValue;
        }
        public static GetAbonment(prop: bind.DProperty<number, any>) {
            var t = prop.Index - Price.DPValue.Index;
            return (t < 0 || t > 3) ? Abonment.Detaillant : t;
        }

        public ISetValue(abonment: Abonment, price: number) {
            var prop = this.GetDProperty(abonment) as bind.DProperty<any, any>;
            if (prop)
                this.set(prop, price);
            else this.set(Price.DPValue, price);
        }
        public IGetValue(abonment: Abonment): number {
            var prop = this.GetDProperty(abonment) as bind.DProperty<any, any>;
            if (prop)
                return this.get(prop);
            return undefined;
        }

        public ClonePrices(to: Price, alsoPSet?: boolean) {
            to.Value = this.Value;
            to.PValue = this.PValue;
            to.HWValue = this.HWValue;
            to.WValue = this.WValue;
            if (alsoPSet) to.PSel = this.PSel;
        }

        getStore() { return Price.pStore as any as collection.Dictionary<number, this>; }
        public static pStore = new collection.Dictionary<number, Price>("prices");
    }

    export class FakePrice extends Price {

        public static DPProduct: bind.DProperty<Product, FakePrice>;
        public static DPSFacture:bind.DProperty<SFacture,FakePrice>;
        public static DPNextRevage: bind.DProperty<FakePrice, FakePrice>;

        public static DPApplyPrice: bind.DProperty<FakePrice, FakePrice>;

        static __fields__() { return [FakePrice.DPProduct, FakePrice.DPNextRevage, FakePrice.DPSFacture, FakePrice.DPApplyPrice]; }
        static ctor() {
            this.DPApplyPrice = bind.DObject.CreateField<FakePrice, FakePrice>('ApplyPrice', FakePrice);
            this.DPProduct = bind.DObject.CreateField<models.Product, FakePrice>("Product", Product, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPNextRevage = bind.DObject.CreateField<FakePrice, FakePrice>("NextRevage", FakePrice, null, null, null, bind.PropertyAttribute.NonSerializable);
            this.DPSFacture = bind.DObject.CreateField<SFacture, FakePrice>("Facture", SFacture, null, null, null, bind.PropertyAttribute.SerializeAsId);
        }
        public Facture: ISFacture | SFacture;
        public Product: Product;
        public NextRevage: FakePrice;
        public ApplyPrice: FakePrice;
        getStore() { return FakePrice.pStore as any; }
        public static pStore = new collection.Dictionary<number, FakePrice>("fakes");
        static getById(id: number) {
            return FakePrice.pStore.Get(id);
        }



        public ToList() {
            var x = []
            var t: FakePrice = this;
            do {
                if (x.indexOf(t) !== -1) break;
                x.push(t);
                t = t.NextRevage;
            } while (t != null);
            return new collection.List<FakePrice>(FakePrice, x);
        }

        toString() { return (this.get(FakePrice.DPProduct) || '').toString(); }
    }

    export class FakePrices extends sdata.DataTable<FakePrice>{
        constructor(owner: sdata.DataRow, array?: FakePrice[]) {
            super(owner, FakePrice, (id) => new FakePrice(id), array);
        }
        public get ArgType() { return FakePrice; }
        protected getArgType(json) { return FakePrice; }
        GetType() { return FakePrices; }
    }

    export abstract class VersmentBase extends sdata.QShopRow {

    

        public static DPCassier: bind.DProperty<Agent, VersmentBase>;;
        public Cassier: Agent


        public static DPObservation:bind.DProperty<string,VersmentBase>
        public Observation: string;
        public static DPType: bind.DProperty<VersmentType, VersmentBase>;
        public static DPMontant: bind.DProperty<number, VersmentBase>;
        public static DPDate: bind.DProperty<Date, VersmentBase>;
        public Type: VersmentType;

        public static DPRef = bind.DObject.CreateField<string, VersmentBase>('Ref', String, null);
        public Ref: string;

        static ctor() {
            this.DPMontant = bind.DObject.CreateField<number, VersmentBase>("Montant", Number, 0);
            this.DPType = bind.DObject.CreateField<VersmentType, VersmentBase>("Type", Number, VersmentType.Espece);
            this.DPDate = bind.DObject.CreateField<Date, VersmentBase>("Date", Date, new Date());
            
            this.DPCassier = bind.DObject.CreateField<Agent, VersmentBase>('Cassier', Agent, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPObservation = bind.DObject.CreateField<string, VersmentBase>('Observation', String, null);
        }
        
        public Montant: number;
        public static __fields__() { return [VersmentBase.DPType, VersmentBase.DPMontant, VersmentBase.DPDate, this.DPCassier, this.DPObservation, this.DPRef] as any; }
        public abstract getStore(): collection.Dictionary<number, any>;

        protected abstract get Partner(): Person;
    }

    export class Versment extends VersmentBase {

        public static DPFacture: bind.DProperty<Facture, Versment>;
        public Facture: Facture;

        

        public static __fields__() { return [this.DPClient, this.DPFacture] as any; }
        public static DPClient: bind.DProperty<Client, Versment>;
        public Client: Client;
        public get Partner() { return this.get(Versment.DPClient); }
        static ctor() {
            this.DPClient = bind.DObject.CreateField<Client, Versment>('Client', Client, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPFacture = bind.DObject.CreateField<Facture, Versment>('Facture', Facture, null);
        }
        constructor(id: number) { super(id); }

        public static getById(id: number, type: Function): Versment {
            return Versment.pstore.Get(id);
        }
        public getStore(): collection.Dictionary<number, any> { return Versment.pstore; }

        public static pstore = new collection.Dictionary<number, Versment>("Versments", true);
    }

    export class SVersment extends VersmentBase {
        public static DPFournisseur: bind.DProperty<Fournisseur, SVersment>;

        public static DPFacture: bind.DProperty<SFacture, SVersment>;
        public Facture: SFacture;        


        public Fournisseur: Fournisseur;
        public get Partner() { return this.get(SVersment.DPFournisseur); }
        static ctor() {
            this.DPFournisseur = bind.DObject.CreateField<Fournisseur, SVersment>('Fournisseur', Fournisseur, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPFacture = bind.DObject.CreateField<SFacture, SVersment>('Facture', SFacture, null, null, null, bind.PropertyAttribute.SerializeAsId);
        }
        public static __fields__() { return [ this.DPFournisseur,this.DPFacture]; }
        constructor(id: number) { super(id); }

        public static getById(id: number, type: Function): SVersment {
            return SVersment.pstore.Get(id);
        }
        public getStore(): collection.Dictionary<number, any> { return SVersment.pstore; }

        public static pstore = new collection.Dictionary<number, SVersment>("SVersments", true);
    }

    export abstract class BVersments<T extends sdata.DataRow> extends sdata.DataTable<T>{
    }

    export class Versments extends BVersments<Versment>{
        constructor(_parent: sdata.DataRow) {
            super(_parent, Versment, (id) => new Versment(id));
        }
        public get ArgType() { return Versment; }
        protected getArgType(json) { return Versment; }
        GetType() { return Versments; }
    }
    export class SVersments extends BVersments<SVersment>{
        constructor(_parent: sdata.DataRow) {
            super(_parent, Versment, (id) => new SVersment(id));
        }
        public get ArgType() { return SVersment; }
        protected getArgType(json) { return SVersment; }
        GetType() { return SVersments; }
    }
    export class Costumers extends sdata.DataTable<models.Client>{
        constructor(_parent: sdata.DataRow, items?: models.Client[]) {
            super(_parent, models.Client, (id) => new models.Client(id), items);
        }
        public get ArgType() { return models.Client; }
        protected getArgType(json) { return models.Client; }
        GetType() { return Costumers; }
    }

    
    export class Fournisseur extends Person {

        static __fields__() { return [this.DPRef]; }
        public static DPRef = bind.DObject.CreateField<string, Fournisseur>('Ref', String, null);
        public Ref: string;

        constructor(id?: number) {
            super(id);
        }
        
        public getStore() { return Fournisseur._mystore as any; }
        private static _mystore = new collection.Dictionary<number, Fournisseur>("Fournisseurs", false);
        toString() {
            return (this.Name || '') + ' / ' + (this.Tel || '');
        }

        public static getById(id: number, type: Function) {
            return Fournisseur._mystore.Get(id) || super.getById(id, type);
        }
    }

    export class Fournisseurs extends sdata.DataTable<Fournisseur>{
        constructor(_parent: sdata.DataRow, items?: Fournisseur[]) {
            super(_parent, models.Client, (id) => new Fournisseur(id), items);
        }
        public get ArgType() { return Fournisseur; }
        protected getArgType(json) { return Fournisseur; }
        GetType() { return Fournisseurs; }
    }

    export class Clients extends sdata.DataTable<models.Client>{
        constructor(_parent: sdata.DataRow, items?: models.Client[]) {
            super(_parent, models.Client, (id) => new models.Client(id), items);
        }
        public get ArgType() { return models.Client; }
        protected getArgType(json) { return models.Client; }
        GetType() { return Clients; }
    }



    export class Mail extends sdata.QShopRow {
        static __fields__() { return [Mail.DPFrom, Mail.DPTo, Mail.DPSubject, Mail.DPBody, Mail.DPTargetId, Mail.DPVisited]; }
        public static DPFrom = Mail.CreateField<models.Client, Mail>('From', models.Client, null);
        public static DPTo = Mail.CreateField<models.Client, Mail>('To', models.Client, null);

        public static DPSubject = Mail.CreateField<string, Mail>('Subject', String, null);
        public static DPBody = Mail.CreateField<string, Mail>('Body', String, null);

        public static DPTargetId = Mail.CreateField<Number, Mail>('TargetId', Number, null);
        public static DPVisited = Mail.CreateField<Boolean, Mail>('Visited', Boolean, null);

        public From: models.Client;
        public To: models.Client;
        public Subject: string;
        public Body: string;
        public Visited: boolean;
        public TargetId: number;
        getStore() { return Mail.store; }
        private static store = new collection.Dictionary<any, any>("mails");
    }

    export class Mails extends sdata.DataTable<Mail>{
        constructor(parent: sdata.DataRow, array: Mail[]) {
            super(parent, Mail, (id) => { return new Mail(id); }, array);
        }
    }

    export class Categories extends sdata.DataTable<Category>{
        
        constructor(_parent: sdata.DataRow) {
            super(_parent, Category, (id) => new Category(id));
        }
        public get ArgType() { return Category; }
        protected getArgType(json) { return Category; }
        GetType() { return Categories; }
    }

    export class Category extends sdata.QShopRow {

        public static DPName: bind.DProperty<string, Category>;
        public static DPBase: bind.DProperty<Category, Category>;
        public Base: Category;
        public Name: string;

        public static __fields__() {
            return [
                Category.DPName,
                Category.DPBase
            ];
        }

        public static GetCategory(id: number) {
            var c = Category._categoriesStore.Get(id);

            if (c == null) {
                c = new Category(id);
                c.Update();
            }
            return c;
        }

        private static _categoriesStore: Categories = new Categories(null);
        public static get Categories(): Categories {
            return Category._categoriesStore;
        }
        constructor(id: number) {
            super(id);
        }
        toString() {
            return this.Name;
        }
        private _s = null;
        public getStore(): collection.Dictionary<number, any> { return Category.pstore; }
        public static getById(id: number, type: Function) { return Category.pstore.Get(id); }
        public static pstore = new collection.Dictionary<number, Category>('categories', true);
        static ctor() {
            this.DPName = bind.DObject.CreateField<string, Category>("Name", String, null);
            this.DPBase = bind.DObject.CreateField<Category, Category>("Base", Category, null, null, null, bind.PropertyAttribute.SerializeAsId);
        }
    }

    export class Agent extends sdata.QShopRow {

        public static DPLogin: bind.DProperty<Login, Agent>;
        public Login: Login;

        public static DPIsDisponible: bind.DProperty<boolean, Agent>;
        public IsDisponible: boolean;

        public static DPPermission: bind.DProperty<AgentPermissions, Agent>;
        public Permission: AgentPermissions;

        public static __fields__() {
            return [
                Agent.DPLogin,
                Agent.DPIsDisponible,
                Agent.DPPermission,
            ];
        }

        constructor(id: number) {
            super(id);
            this.Login = new models.Login(basic.New());
        }


        public static getById(id: number, type: Function): Agent {
            return Agent.pstore.Get(id);
        }
        private static pstore = new collection.Dictionary<number, Agent>("Agents", true);

        public getStore(): collection.Dictionary<number, any> { return Agent.pstore; }
        static ctor() {
            this.DPLogin = bind.DObject.CreateField<Login, Agent>("Login", Login);
            this.DPIsDisponible = bind.DObject.CreateField<boolean, Agent>("IsDisponible", Boolean, null);
            this.DPPermission = bind.DObject.CreateField<AgentPermissions, Agent>('Permission', Number, 0);
        }
        toString() {
            var l = this.Login;
            var c = l && l.Client;
            var fn = c && c.FullName || '';
            var tel = c && c.Tel || '';
            return AgentPermissions[this.Permission || 1] + ' : ' + fn + ' / ' + tel;
        }
    }

    export class Agents extends sdata.DataTable<Agent>{
        constructor(_parent: sdata.DataRow) {
            super(_parent, Agent, (id) => new Agent(id));
        }
        public get ArgType() { return Agent; }
        protected getArgType(json) { return Agent; }
        GetType() { return Agents; }
    }

    export class Product extends Price {

        public static DPCategory: bind.DProperty<Category, Product>;
        public static DPName: bind.DProperty<string, Product>;
        public static DPDescription: bind.DProperty<string, Product>;
        public static DPPicture: bind.DProperty<Picture, Product>;
        public static DPDimention: bind.DProperty<string, Product>;
        public static DPQuality: bind.DProperty<number, Product>;
        public static DPSerieName: bind.DProperty<string, Product>;

        public static DPLastModified: bind.DProperty<Date, Product>;
        public LastModified: Date;
        public static DPRevage: bind.DProperty<FakePrice, Product>;
        public static DPCurrentArticle: bind.DProperty<Article, Product>;
        public CurrentArticle: Article;
        public Category: Category;
        public Name: string;
        public Description: string;
        public Picture: Picture;
        public Dimention: string;
        public Revage: FakePrice;
        public Quality: number;
        public SerieName: string;
        private _toString: string;
        toString() {
            return this._toString;
        }
        public static __fields__(): Array<any> {
            return [
                Product.DPCategory,
                Product.DPName,
                Product.DPDimention,
                Product.DPSerieName,
                Product.DPQuality,
                Product.DPPicture,
                Product.DPDescription,
                Product.DPRevage,
                Product.DPCurrentArticle
            ];

        }
        protected onPropertyChanged(ev: bind.EventArgs<any, any>): void {
            if (ev.prop.Index >= Product.DPName.Index && ev.prop.Index <= Product.DPSerieName.Index) {
                this._toString = (this.Name || '') + '  ' + (this.Dimention || '') + ' ' + (this.SerieName || '') + ' ' + (this.Category && this.Category.toString() || "");
            }
            super.onPropertyChanged(ev);
        }
        constructor(id: number) {
            super(id);

        }



        public static getById(id: number, type?: Function): Product {
            return Product.pstore.Get(id);
        }

        public getStore(): collection.Dictionary<number, any> { return Product.pstore; }
        private static pstore = new collection.Dictionary<number, Product>("Products", true);

        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this {

            return super.FromJson(json, context, update) as this;
        }
        static ctor() {

            /// Info
            this.DPCategory = bind.DObject.CreateField<Category, Product>("Category", Category, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPName = bind.DObject.CreateField<string, Product>("Name", String, null);
            this.DPDescription = bind.DObject.CreateField<string, Product>("Description", String);
            this.DPPicture = bind.DObject.CreateField<Picture, Product>("Picture", Picture,null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPDimention = bind.DObject.CreateField<string, Product>("Dimention", String);
            this.DPQuality = bind.DObject.CreateField<number, Product>("Quality", Number);
            this.DPSerieName = bind.DObject.CreateField<string, Product>("SerieName", String);
            Product.DPLastModified = bind.DObject.CreateField<Date, Product>('LastModified', Date, null, null, null, bind.PropertyAttribute.NonSerializable);
            ///Product

            this.DPRevage = bind.DObject.CreateField<FakePrice, Product>('Revage', FakePrice, null, null, null, bind.PropertyAttribute.NonSerializable);

            this.DPCurrentArticle = bind.DObject.CreateField<Article, Product>('CurrentArticle', Article, null, null, null, bind.PropertyAttribute.Private);
        }
    }

    export class Products extends sdata.DataTable<Product>{
        constructor(_parent: sdata.DataRow, items?: Product[]) {
            super(_parent, Product, (id) => new Product(id), items);
        }
        public get ArgType() { return Product; }
        protected getArgType(json) { return Product; }
        GetType() { return Products; }
    }

    export class Article extends sdata.QShopRow {
        public toString() {
            return this.Product.toString() + ' Count:' + this.Count;
        }

        public static DPProduct: bind.DProperty<Product, Article>;
        public Product: Product;

        public static DPOwner: bind.DProperty<Facture, Article>;
        public Owner: Facture;


        public static DPPrice: bind.DProperty<number, Article>;
        public Price: number;


        public static DPCount: bind.DProperty<number, Article>;
        public Count: number;


        public OCount: number = 0;



        public static __fields__() {
            return [
                Article.DPOwner,
                Article.DPProduct,
                Article.DPPrice,
                Article.DPCount,
            ];
        }
        constructor(id: number) {
            super(id);
        }

        public static getById(id: number, type: Function): any {
            return Article.pstore.Get(id);
        }
        public getStore(): collection.Dictionary<number, any> { return Article.pstore; }
        private static pstore = new collection.Dictionary<number, Article>("Articles", true);

        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this {

            super.FromJson(json, context, update) as this;
            this.OCount = this.Count;
            return this;
        }
        static ctor() {
            this.DPProduct = bind.DObject.CreateField<Product, Article>('Product', Product, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPOwner = bind.DObject.CreateField<Facture, Article>('Owner', Facture, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPPrice = bind.DObject.CreateField<number, Article>('Price', Number, null);
            this.DPCount = bind.DObject.CreateField<number, Article>("Count", Number, 0);
        }
    }

    export class Articles extends sdata.DataTable<Article>{
        constructor(_parent: sdata.DataRow, items?: Article[]) {
            super(_parent, Article, (id) => new Article(id), items);
        }
        public get ArgType() { return Article; }
        protected getArgType(json) { return Article; }
        GetType() { return Articles; }
    }

    export class Facture extends FactureBase {
        private static pstore: collection.Dictionary<number, Facture> = new collection.Dictionary<number, Facture>("Factures", true);

        public static DPClient: bind.DProperty<models.Client, Facture>;
        public static DPArticles: bind.DProperty<Articles, Facture>;
        public static DPAgent: bind.DProperty<Agent, Facture>;
        public static DPAbonment: bind.DProperty<Abonment, Facture>;
        public static DPPour: bind.DProperty<Client, Facture>;
        


        public Abonment: Abonment;
        public Client: models.Client;
        public Vendeur: Agent;
        public Articles: Articles;
        public Pour: Client;
        public static getString(obj) {
            if (obj == null) return "null";
            return obj.toString();
        }
        _str: string;
        toString() {
            return this._str || (this._str = BonType[this.Type] + " " + this.Ref + ": " + ' [' + Facture.getString(this.get(Facture.DPClient)) + '\rdate:' + Facture.getString(this.get(Facture.DPDate)) + '\rdatelivraison:' + this.get(Facture.DPDateLivraison) + ']');
        }
        public static __fields__() {
            return [
                Facture.DPAbonment,
                Facture.DPClient,
                Facture.DPAgent,
                Facture.DPArticles    ,this.DPPour
            ] as any;
        }

        constructor(id: number) {
            super(id);
            this.Articles = new Articles(this);
        }
        public CalcTotal() {
            var arts = this.Articles;
            var c = 0;
            for (var i = 0, l = arts.Count; i < l; i++) {
                var art = arts.Get(i);
                if (art)
                    c += art.Count * (art.Price || 0.0);
            }
            var tt = this._isFrozen;
            this._isFrozen=false;
            this.Total = c;
            this._isFrozen = tt;
            var v = 0;
            return c;

        }
        public Freeze() {
            //this.FromJson
            //super.Freeze();
            //this.Articles.Freeze();
            this._isFrozen = true;
        }

        public static getById(id: number, type: Function): Facture {
            return Facture.pstore.Get(id);
        }
        public getStore(): collection.Dictionary<number, any> { return Facture.pstore; }
        static freezeArray(e) {
            if (e._new == null)
                if (e._old == null) return;
                else {
                    e._old.Clear();
                    e._new = e._old;
                }
        }
        static _ctor() {
            this.DPAgent = bind.DObject.CreateField<Agent, Facture>("Vendeur", Agent, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPClient = bind.DObject.CreateField<models.Client, Facture>("Client", models.Client, null, null, null, bind.PropertyAttribute.SerializeAsId);
            this.DPArticles = bind.DObject.CreateField<Articles, Facture>("Articles", Articles, null, null, this.freezeArray);
            this.DPAbonment = bind.DObject.CreateField<Abonment, Facture>('Abonment', Number, Abonment.Detaillant, null);
            Facture.DPPour = bind.DObject.CreateField<Client, Facture>('Pour', Client, null);
        }
        Update() {

        }
    }

    export class SFactures extends sdata.DataTable<SFacture>{
        constructor(owner: sdata.DataRow, array?: SFacture[]) {
            super(owner, SFacture, (id) => new SFacture(id), array);
        }
        public get ArgType() { return SFacture; }
        protected getArgType(json) { return SFacture; }
        GetType() { return SFactures; }

    }

    export class Factures extends sdata.DataTable<Facture>{

        constructor(_parent: sdata.DataRow, items?: Facture[]) {
            super(_parent, Facture, (id) => new Facture(id), items);
        }
        public get ArgType() { return Facture; }
        protected getArgType(json) { return Facture; }
        GetType() { return Factures; }

        OnDeserialize(list: Facture[]) {
            this.Order((a, b) => a.Date > b.Date);
        }
    }

    export class QData extends sdata.QShopRow {
        QteLimited: boolean;
        private static pStore = new collection.Dictionary<number, any>("QData", true);
        public getStore(): collection.Dictionary<number, any> { return QData.pStore; }
        static __fields__() { return [QData.DPProducts, QData.DPSelectedFacture, QData.DPFactures, QData.DPAgents, QData.DPArticles, QData.DPCategories, QData.DPPrices, QData.DPSFactures, QData.DPFournisseurs, QData.DPVersments, QData.DPSVersments]; }

        public static DPProducts = bind.DObject.CreateField<Products, QData>("Products", Products, null);
        public get Products(): Products { return this.get<Products>(QData.DPProducts); }

        public static DPPrices = bind.DObject.CreateField<FakePrices, QData>("Prices", FakePrices, null);
        public get Prices(): FakePrices { return this.get<FakePrices>(QData.DPPrices); }

        public static DPCategories = bind.DObject.CreateField<Categories, QData>("Categories", Categories);
        public get Categories(): Categories { return this.get<Categories>(QData.DPCategories); }


        public static DPArticles = bind.DObject.CreateField<Articles, QData>("Articles", Articles, null);
        public get Articles(): Articles { return this.get<Articles>(QData.DPArticles); }


        public static DPSelectedFacture = bind.DObject.CreateField<Facture, QData>("SelectedFacture", Facture, null, (e) => e.__this.onCurrentFactureChanged(e));
        public SelectedFacture: Facture;


        public static DPFactures = bind.DObject.CreateField<Factures, QData>("Factures", Factures, null);
        public get Factures(): Factures { return this.get<Factures>(QData.DPFactures); }

        public static DPSFactures = bind.DObject.CreateField<SFactures, QData>("SFactures", SFactures, null);
        public get SFactures(): SFactures { return this.get<SFactures>(QData.DPSFactures); }


        public static DPCostmers = bind.DObject.CreateField<Costumers, QData>("Costumers", Costumers, null);
        public get Costumers(): Costumers { return this.get<Costumers>(QData.DPCostmers); }

        public static DPFournisseurs = bind.DObject.CreateField<Fournisseurs, QData>("Fournisseurs", Fournisseurs, null);
        public get Fournisseurs(): Fournisseurs { return this.get<Fournisseurs>(QData.DPFournisseurs); }


        private static DPAgents = bind.DObject.CreateField<Agents, QData>("Agents", Agents, null);
        public get Agents(): Agents { return this.get<Agents>(QData.DPAgents); }


        public static DPVersments = bind.DObject.CreateField<Versments, QData>('Versments', Versments, null);
        public get Versments(): Versments { return this.get(QData.DPVersments); }


        public static DPSVersments = bind.DObject.CreateField<SVersments, QData>('SVersments', SVersments, null);
        public get SVersments(): SVersments { return this.get(QData.DPSVersments); }


        private onCurrentFactureChanged(e: bind.EventArgs<Facture, QData>) {
            if (e._old) {
                var o = e._old.Articles;
                for (var i = 0, l = o.Count; i < l; i++) {
                    var j = o.Get(i);
                    j.Product.CurrentArticle = null;
                }
                this.articles.Clear();
                o.Unlisten = this.oacd;
            }
            if (e._new) {
                var o = e._new.Articles;
                for (var i = 0, l = o.Count; i < l; i++) {
                    var j = o.Get(i);
                    var p = j.Product;
                    if (p)
                        p.CurrentArticle = j;
                    this.articles.Add(j);
                }
                o.Listen = this.oacd;
            }
        }
        private oacd: basic.IBindable = { Owner: this, Invoke: this.OnArticlesChanged };
        private articles = new Articles(this);
        private OnArticlesChanged(e: utils.ListEventArgs<number, Article>) {
            switch (e.event) {
                case collection.CollectionEvent.Added:
                    e.newItem.Product.CurrentArticle = e.newItem;
                    this.articles.Insert(e.startIndex, e.newItem);
                    break;
                case collection.CollectionEvent.Cleared:
                    var o = this.articles;
                    for (var i = 0, l = o.Count; i < l; i++) {
                        var j = o.Get(i);
                        j.Product.CurrentArticle = null;
                    }
                    this.articles.Clear();
                    break;
                case collection.CollectionEvent.Removed:
                    e.oldItem.Product.CurrentArticle = null;
                    this.articles.RemoveAt(e.startIndex);
                    break;
                case collection.CollectionEvent.Replace:
                    e.oldItem.Product.CurrentArticle = null;
                    e.newItem.Product.CurrentArticle = e.newItem;
                    this.articles.Set(e.startIndex, e.newItem);
                    break;
                case collection.CollectionEvent.Reset:
                    var o = this.articles;
                    for (var i = 0, l = o.Count; i < l; i++) {
                        var j = o.Get(i);
                        j.Product.CurrentArticle = null;
                    }
                    this.articles.Clear();
                    var o = this.SelectedFacture.Articles;
                    for (var i = 0, l = o.Count; i < l; i++) {
                        var j = o.Get(i);
                        j.Product.CurrentArticle = j;
                        this.articles.Add(j);
                    }
                    break;
            }
        }

        Clear() {
            var c = this.GetValues();
            for (var i = 0; i < c.length; i++) {
                var j = c[i];
                if (j instanceof collection.List) {
                    j.Clear();
                }
            }
        }
        constructor() {
            super(basic.New());
            this.set(QData.DPAgents, new models.Agents(this));
            this.set(QData.DPProducts, new Products(this));
            this.set(QData.DPFactures, new Factures(this));
            this.set(QData.DPArticles, new Articles(this));
            this.set(QData.DPCostmers, new Costumers(this));
            this.set(QData.DPCategories, new Categories(this));
            this.set(QData.DPFournisseurs, new Fournisseurs(this));
            this.set(QData.DPProducts, new Products(this));

            this.set(QData.DPVersments, new Versments(this));
            this.set(QData.DPSVersments, new SVersments(this));

            var cc = new FakePrices(this);
            this.set(QData.DPPrices, cc);
            cc.Listen = (v) => { }
            this.set(QData.DPSFactures, new SFactures(this));
            (window as any).ctgs = this.Categories;
            (window as any).qdata = this;
            bind.NamedScop.Create("qdata", this);
        }

        private i = 0;
        private static i = 0;
        private createNew() {
            var pr = new models.Product(basic.New());
            var t = this.i++ % 2000;
            var i = QData.i++ % 2;
            if (i == 0) {
                pr.Name = "W3 School 00" + t + '-';
                pr.Revage = new models.FakePrice();
                pr.Revage.Value = 200;
                pr.Picture = new models.Picture(basic.New(), "./img/2.jpg");
                pr.Description = "Ce coude est plus haut quality exist in algeria \r where ever you found it buy it dont wory";
            }
            else {

                pr.Name = "Coude 110 00" + t + '-';
                pr.Revage = new models.FakePrice();
                pr.Revage.Value = 120;
                pr.Picture = new models.Picture(basic.New(), "./img/2.jpg");
                pr.Description = "We have used Bootstrap's grid system \rto create some responsive HTML templates."

            }
            return pr;
        }
    }

    export class ii { }
    export class Logout extends sdata.QShopRow {
        getStore(): any { }
    }
    export class Login extends sdata.QShopRow {

        public get IsLogged(): boolean { return this.get<boolean>(DPIsLogged); }

        public static DPUsername = bind.DObject.CreateField<string, Login>("Username", String, null);
        public Username: string;


        public static DPPwd = bind.DObject.CreateField<string, Login>("Pwd", String, null);
        public Pwd: string;

        public static DPIdentification = bind.DObject.CreateField<string, Login>("Identification", String, undefined);
        public Identification: string;


        public static DPClient = bind.DObject.CreateField<models.Client, Login>("Client", models.Client, null);
        public Client: models.Client;


        public static __fields__() { return [DPIsLogged, Login.DPUsername, Login.DPPwd, Login.DPIdentification, Login.DPClient]; }
        constructor(id?) {
            super(id || basic.New());
        }
        public getStore() { return Login.pStore; }
        public GetType() { return Login; }
        public OnMessage(invoke: (s: bind.PropBinding, e: bind.EventArgs<boolean, Login>) => void) {
            this.OnPropertyChanged(DPIsLogged, invoke);
            super.FromJson
        }
        public static update: boolean;
        //public get Stat() {
        //	
        //	return Login.update ? 0 : this.get(models.QData.DPStat);
        //}															
        private static pStore = new collection.Dictionary<number, any>("Signup", false);
        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this {
            if (typeof json === 'number') {
                if (this.Stat >= sdata.DataStat.Updating)
                    return this;

                this.Id = json;
                this.set(sdata.DataRow.DPStat, sdata.DataStat.Updating);
                Controller.ProxyData.Default.Request(this.constructor, "UPDATE", this, this as any);
                //Controller.ProxyData.Default.Push(this.constructor, this, null);

            } else {
                bind.DObject.prototype.FromJson.call(this, json, context, update);
                if (json != null && json.IsFrozen == true) {
                    this.Freeze();
                }            }
            return this;
        }



    }
    export class Signup extends Login {
    }
    export class Signout extends sdata.QShopRow {
        public static __fields__() {
            return [
            ];
        }
        public getStore() { return Signout.pStore; }
        public GetType() { return Signout; }
        private static pStore = new collection.Dictionary<number, any>("Signout", false);
        constructor() { super(basic.New()); }
    }

    export class Logins extends sdata.DataTable<Login>{
        constructor(_parent: sdata.DataRow, items?: Login[]) {
            super(_parent, Login, (id) => new Login(), items);
        }
        public get ArgType() { return Facture; }
        protected getArgType(json) { return Facture; }
        GetType() { return Factures; }

        OnDeserialize(list: Login[]) {
            this.Order((a, b) => a.Client.Id > b.Client.Id);
        }
    }

    export class IsAdmin extends sdata.QShopRow {
        public getStore() { return null; }
    }

    export enum TransferType {
        Versment,
        Facture
    }

    export class EtatTransfer extends sdata.DataRow {
        private static _store = new collection.Dictionary<any, any>("EtatTransfer");
        protected getStore(): collection.Dictionary<number, this> {
            return EtatTransfer._store;
        }
        Update() {
        }
        Upload() {
        }
        public static DPType = bind.DObject.CreateField<TransferType, EtatTransfer>('Type', Number,TransferType.Facture);
        public Type: TransferType;

        public static DPDate = bind.DObject.CreateField<Date, EtatTransfer>('Date', Date);
        public Date: Date;

        public static DPMontantEntree = bind.DObject.CreateField<number, EtatTransfer>('MontantEntree', Number, 0);
        public MontantEntree: number;

        public static DPMontantSortie = bind.DObject.CreateField<number, EtatTransfer>('MontantSortie', Number, 0);
        public MontantSortie: number;

        public static DPTransactionId = bind.DObject.CreateField<number, EtatTransfer>('TransactionId', Number, 0);
        public TransactionId: number;


        public static DPActualSold = bind.DObject.CreateField<number, EtatTransfer>('ActualSold', Number, 0);
        public ActualSold: number;


        static __fields__() {
            return [this.DPType, this.DPDate, this.DPMontantEntree, this.DPMontantSortie, this.DPTransactionId,this.DPActualSold] as any;
        }
    }
    export class EtatTransfers extends sdata.DataTable<models.EtatTransfer> {

        public static DPTotalEntree = bind.DObject.CreateField<Number, EtatTransfers>('TotalEntree', Number, 0, (e) => {
            e.__this.Recalc();
        });
        public TotalEntree: number;


        public static DPTotalSortie = bind.DObject.CreateField<number, EtatTransfers>('TotalSortie', Number, 0, (e) => {
            e.__this.Recalc();
        });
        public TotalSortie: number;


        public static DPSold = bind.DObject.CreateField<number, EtatTransfers>('Sold', Number, 0);
        public Sold: number;



        public static DPIsVente = bind.DObject.CreateField<boolean, EtatTransfers>('IsVente', Boolean, true);
        public IsVente: boolean;

        FromJson(json: any, x: encoding.SerializationContext, update?: boolean, callback?: (prop: string, val: any) => Object) {
            super.FromJson(json, x, update, callback);
            this.Recalc();
            return this;
        }
        
        public Recalc() {
            this.Sold = (this.TotalSortie || 0) - (this.TotalEntree || 0);
        }

        static __fields__() {
            return [this.DPTotalEntree, this.DPTotalSortie, this.DPIsVente, this.DPSold] as any;
        }
        constructor(parent: sdata.DataRow) {
            
            super(parent, EtatTransfer, (id) => new EtatTransfer(id));
        }

        public ReOrder() {
            this.OrderBy((a, b) => (b.Date.getTime() - a.Date.getTime()) as any);
            var l = this.AsList();
            var c = 0;
            for (var i = l.length - 1; i >= 0; i--) {
                var v = l[i];
                var d = (v.MontantSortie || 0) - (v.MontantEntree || 0);
                c += d;
                v.ActualSold = this.IsVente ? c : -c;
            }
        }
    }


}



function total(a: models.Versments) {
    
    if (a == null) return 0;
    var r = 0;
    for (var i = 0, l = a.Count; i < l; i++)
        r += a.Get(i).Montant;
    return r;
}
bind.Register(new bind.Job('totalarray', (ji, e) => {
    var c = ji.Scop.Value;
    var dm = ji.dom as HTMLElement;
    dm.innerHTML = (c == null ? '<span style="color:red">0.00 DZD</span>' : (total(c)) + ' DZD');
}, null, null, (ji, e) => {
    var c = ji.Scop.Value;
    var dm = ji.dom as HTMLElement;
    dm.innerHTML = (c == null ? '<span style="color:red">0.00 DZD</span>' : (total(c)) + ' DZD');
}, null));
bind.Register(new bind.Job('jobi', (ji, e) => {
    var dm = ji.dom;
    dm.textContent = (ji.Scop.Value || 0) + ' Articles';
}, null, null, (ji, e) => {
    var dm = ji.dom;
    dm.textContent = (ji.Scop.Value || 0) + ' Articles';
}, null));



