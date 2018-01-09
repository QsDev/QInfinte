import { net, bind, basic, collection, encoding } from './Corelib';
export declare module Controller {
    function Register(service: IService): void;
    abstract class Api<T> {
        abstract GetType(): any;
        abstract GetRequest(data: T): net.RequestUrl;
        abstract OnResponse(response: JSON, data: T, context: encoding.SerializationContext): any;
        constructor(reg?: boolean);
    }
    class CostumeApi<T> extends Api<T> {
        private _type;
        private _getRequest;
        private _onResponse;
        GetType(): Function;
        GetRequest(data: T): net.RequestUrl;
        OnResponse(response: JSON, data: T): void;
        constructor(_type: Function, _getRequest: (data: T) => net.RequestUrl, _onResponse: (response: JSON, data: T) => void);
    }
    interface IService {
        Name: string;
        OnResponse(proxy: ProxyCallback<any>, webr: net.QueeDownloader, json: IServiceResponse): any;
    }
    interface IServiceResponse {
        __service__: string;
        dropRequest: boolean;
        iss: boolean;
        rdata: any;
        sdata: any;
    }
    class ProxyCallback<T> extends net.RequestParams<T, net.QueeDownloader> {
        param: any;
        api: Api<T>;
        context: encoding.SerializationContext;
        callBack: (s: ProxyCallback<T>, result: T, success: boolean) => void;
        method: net.WebRequestMethod;
        constructor(data: T, param: any, api: Api<T>, context?: encoding.SerializationContext, callBack?: (s: ProxyCallback<T>, result: T, success: boolean) => void, method?: net.WebRequestMethod);
        private static parse(json);
        Callback(sender: net.QueeDownloader, result: net.WebRequest): void;
        OutputData(): string;
    }
    class ProxyData {
        private http;
        private quee;
        private apis;
        Crypto: basic.ICrypto;
        constructor(crpt: basic.ICrypto, isCostume: boolean);
        Register<T>(api: Api<any>): void;
        Call<T>(t: ProxyCallback<T>): void;
        Costume<T>(req: net.IRequestUrl, t: net.RequestParams<T, any>): void;
        Push<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, method?: net.WebRequestMethod, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext, beforRequest?: (req: net.IRequestUrl) => void): void;
        Post<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext): void;
        Put<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext): void;
        Get<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext): void;
        Delete<T>(type: Function, data: T, param: any, callBack?: RequestCallback<T>, costumize?: RequestCostumize<T>, serializer?: encoding.SerializationContext): net.RequestUrl;
        static readonly Default: ProxyData;
    }
    type RequestCallback<T> = (_s: ProxyCallback<T>, r: JSON, issuccess: boolean) => void;
    type RequestCostumize<T> = (_req: net.IRequestUrl, t: ProxyCallback<any>) => void;
}
export declare module data {
    enum DataStat {
        IsNew = 0,
        Modified = 1,
        Saved = 2,
        Updating = 4,
        Uploading = 8,
        Updated = 16,
        Frozed = 32,
    }
    abstract class DataRow extends bind.DObject implements basic.IId {
        static DPId: bind.DProperty<number, DataRow>;
        protected static DPStat: bind.DProperty<DataStat, DataRow>;
        Stat: data.DataStat;
        static CreateFromJson(json: any, type: typeof DataRow, requireNew: boolean): any;
        protected OnIdChanged(old: number, nw: number): void;
        protected abstract getStore(): collection.Dictionary<number, this>;
        Id: number;
        constructor(id: number);
        static __fields__(): Array<any>;
        static getById(id: number, type: Function): any;
        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this;
        readonly TableName: string;
        abstract Update(): any;
        abstract Upload(): any;
    }
    abstract class QShopRow extends data.DataRow {
        static __fields__(): any[];
        GenType(): Function;
        private static _QueryApi;
        static readonly QueryApi: string;
        constructor(id?: number);
        Update(): void;
        Upload(): void;
        static ctor(): void;
    }
    abstract class DataTable<T extends DataRow> extends collection.List<T> {
        private _parent;
        private ctor;
        private static DPOwner;
        static __fields__(): bind.DProperty<any, {}>[];
        Owner: DataRow;
        constructor(_parent: DataRow, argType: Function, ctor: (id: number) => T, array?: T[]);
        CreateNewItem(id: number): T;
        FromJson(json: any, x: encoding.SerializationContext, update?: boolean, callback?: (prop: string, val: any) => Object): this;
        GetById(id: number): T;
        Update(): void;
        Upload(): void;
    }
}
export declare module base {
    interface Vecteur<T> extends bind.DObject {
        From: T;
        To: T;
        Check(val: T): any;
    }
    class DateVecteur extends bind.DObject implements Vecteur<Date> {
        static DPFrom: bind.DProperty<Date, DateVecteur>;
        static DPTo: bind.DProperty<Date, DateVecteur>;
        From: Date;
        To: Date;
        static __fields__(): bind.DProperty<Date, DateVecteur>[];
        Check(date: Date): boolean;
    }
    class NumberVecteur extends bind.DObject implements Vecteur<number> {
        static DPFrom: bind.DProperty<number, NumberVecteur>;
        static DPTo: bind.DProperty<number, NumberVecteur>;
        From: number;
        To: number;
        static __fields__(): bind.DProperty<number, NumberVecteur>[];
        Check(val: number): boolean;
    }
}
export declare module crypto {
    function string2bytes(a: string): Uint8Array;
    function bytes2string(a: Uint8Array): string;
    class Aes {
        protected Key: Uint8Array;
        constructor(key: string | Uint8Array);
        InitKey(key: Uint8Array): Uint8Array;
        static ExpandKey(b: Uint8Array): void;
        Encrypt(data: Uint8Array): Uint8Array;
        Decrypt(data: Uint8Array): Uint8Array;
        static SubBytes(a: Uint8Array, c: Uint8Array): void;
        static AddRoundKey(a: any, c: any): void;
        static ShiftRows(a: any, c: any): void;
        static MixColumns(b: any): void;
        static MixColumns_Inv(b: any): void;
    }
    class AesCBC extends Aes {
        constructor(key: string | Uint8Array);
        InitKey(key: Uint8Array): Uint8Array;
        static blockXOR(a: Uint8Array, c: Uint8Array): Uint8Array;
        static blockIV(): Uint8Array;
        static pad16(a: Uint8Array): Uint8Array;
        static depad(a: Uint8Array): Uint8Array;
        concate(a: Uint8Array, b: Uint8Array): Uint8Array;
        Encrypt(data: Uint8Array): Uint8Array;
        Decrypt(data: Uint8Array): Uint8Array;
    }
}
export declare module crypto {
    class SecureRandom {
        nextBytes(a: any): void;
        rng_get_byte(): any;
    }
}
export declare namespace System {
}
