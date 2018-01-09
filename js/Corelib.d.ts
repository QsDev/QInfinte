import { models } from './Models';
import { UI } from './UI';
export declare type GFunction = Function | reflection.GenericType | reflection.DelayedType;
export declare type Guid = number;
export declare namespace Common {
    var Message: models.Message;
    var Math: any;
}
export declare namespace css {
    function toValidCssName(c: any): any;
    function toValidEnumName(c: any): any;
}
export declare namespace string {
    function IsPrintable(keyCode: number, charCode: number): boolean;
}
export declare namespace basic {
    var host: string;
    interface ICrypto {
        Encrypt(data: number[]): number[];
        Decrypt(data: number[]): number[];
        SEncrypt(data: string): string;
        SDecrypt(data: string): string;
    }
    const Crypto: ICrypto;
    function setGuidRange(start: number, end: number): void;
    function New(): number;
    interface IEventHandler extends IDisposable {
        Started: boolean;
        Start(): any;
        Pause(): any;
        Dispose(): any;
        Reset(): any;
    }
    interface Module {
    }
    interface IContext {
        CanAccessToMe(type: string, folder: string, name: string): any;
        GetPath(path: string): string;
        NameOf(type: Function): string;
        GetType(path: string): Function;
    }
    interface IDisposable {
        Dispose(force?: boolean): any;
    }
    interface IBindable {
        Owner?: any;
        Invoke(...args: any[]): any;
    }
    interface ITBindable<T extends (...args: any[]) => void> extends IBindable {
        Invoke: T;
    }
    interface IOnDisposing extends IDisposable {
        OnDisposing: (s: this) => void;
        Dispose(): any;
    }
    interface IDelegate extends IDisposable, EventListenerObject, IBindable {
        handleEvent(...args: any[]): void;
    }
    class Delegate<T> implements IDelegate {
        Owner: T;
        Invoke: (...args: any[]) => void;
        private _dispose;
        objectStat: any;
        constructor(Owner: T, Invoke: (...args: any[]) => void, _dispose: (ihe: Delegate<T>) => void, objectStat?: any);
        handleEvent(...args: any[]): void;
        Dispose(): void;
    }
    interface IValueCheck {
        [s: string]: (v: any) => boolean;
    }
    interface IJob {
        Name: string;
        Todo?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        Check?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnError?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnInitialize?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnDispose?(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
    }
    class Rectangle {
        private _x;
        Left: number;
        private _y;
        Top: number;
        private _w;
        Width: number;
        private _h;
        Height: number;
        private OnChanged();
        private _onchanged;
        constructor();
        Set(left: number, top: number, width: number, height: number): void;
    }
    interface EqualInterface {
        Equals(o: Object): boolean;
    }
    interface scopCollection {
        [s: string]: bind.Scop;
    }
    class iGuid implements EqualInterface {
        static Empty: iGuid;
        private _id;
        readonly Id: string;
        constructor(g: string);
        Equals(o: any): boolean;
        toString(): string;
        private static FromNumber(v);
        static readonly New: iGuid;
    }
    interface IId {
        Id: number;
    }
    class EnumValue {
        Name: string;
        Value: number;
        constructor(Name: string, Value: number);
        toString(): string;
        static GetValue(lst: collection.List<EnumValue>, n: number | string): EnumValue;
    }
    function getEnum(enumPath: string, enumValue?: Object): collection.List<EnumValue>;
    interface SIndex {
        Name: string;
        Index: number;
    }
    class StringCompile {
        protected indexer: (string | SIndex)[];
        constructor(indexer: (string | SIndex)[]);
        private static generateIndexer(s, array);
        static Compile(s: string): StringCompile;
        apply(data: any): any;
        bind(data: bind.DObject): void;
        private data;
        private pb;
        private onDataChanged(ev);
        Value: string;
    }
    interface Stat {
        Data: any;
        Back(): any;
        Go(): any;
        Forward(): any;
    }
    class History {
        private index;
        private stats;
        Push(stat: Stat): void;
        goBack(): void;
        goForward(): void;
        readonly Current: Stat;
        private Index;
    }
}
export declare namespace reflection {
    function GetBaseType(type: any): any;
    function GetBaseTypes(type: any, totype?: any): typeof Object[];
    function IsInstanceOf(type: any, superType: any): boolean;
    class Type {
        private passed;
        type: Function;
        constructor(type: any);
        _getPath(root: any): any;
        GetType(root: any): any;
    }
    class GenericType {
        Constructor: Function;
        Params: Function[];
        prototype: any;
        constructor(Constructor: Function, Params: Function[], base: Function);
        readonly base: Function;
        GetBaseType(): Function;
        static GetType(type: Function, params?: Function[], checkOnly?: boolean, base?: Function): GenericType | Function;
        private static i(f);
        private static IsInstanceOf(type, superType);
        private static _isInstanceOf;
    }
    class DelayedType {
        readonly Type: Function;
        private _type;
        constructor(type: () => Function);
    }
}
export declare namespace bind {
    class Job implements basic.IJob {
        Name: string;
        Todo: (job: JobInstance, e: bind.EventArgs<any, any>) => void;
        Check: (job: JobInstance, e: bind.EventArgs<any, any>) => void;
        OnError: (job: JobInstance, e: bind.EventArgs<any, any>) => void;
        OnInitialize: (job: JobInstance, e: bind.EventArgs<any, any>) => void;
        OnDispose: (job: JobInstance, e: bind.EventArgs<any, any>) => void;
        constructor(Name: string, Todo: (job: JobInstance, e: bind.EventArgs<any, any>) => void, Check?: (job: JobInstance, e: bind.EventArgs<any, any>) => void, OnError?: (job: JobInstance, e: bind.EventArgs<any, any>) => void, OnInitialize?: (job: JobInstance, e: bind.EventArgs<any, any>) => void, OnDispose?: (job: JobInstance, e: bind.EventArgs<any, any>) => void);
    }
    class Jobs implements basic.IJob {
        Name: string;
        private _jobs;
        Todo(job: JobInstance, e: bind.EventArgs<any, any>): void;
        Check(job: JobInstance, e: bind.EventArgs<any, any>): void;
        OnError(job: JobInstance, e: bind.EventArgs<any, any>): void;
        OnInitialize(job: JobInstance, e: bind.EventArgs<any, any>): void;
        OnDispose(job: JobInstance, e: bind.EventArgs<any, any>): void;
        constructor(Name: string);
        push(jobName: any): void;
    }
    class JobInstance implements EventListenerObject {
        Scop: bind.Scop;
        job: basic.IJob;
        dom: HTMLElement;
        Control: UI.JControl;
        private _events;
        Handle: (ji: JobInstance, e: Event) => void;
        addEventListener(name: string, event: string, delegate: EventListenerOrEventListenerObject | any): void;
        removeEventListener(name: string): void;
        private getEvent(name);
        constructor(Scop: bind.Scop, job: basic.IJob, dom: HTMLElement);
        private propb;
        private ValueChanged(s, e);
        Dispose(): void;
        IsDisposed: any;
        _store: any;
        addValue(name: string, value: any): void;
        getValue(name: string): any;
        Checker: (value: any) => boolean;
        Ischanging: boolean;
        handleEvent(e: Event): void;
    }
    function GetJob(name: string): basic.IJob;
    function Register(job: basic.IJob, override?: boolean): basic.IJob;
}
export declare namespace thread {
    interface IDispatcherCallback {
        callback: (delegate: (...param: any[]) => void, param: any, _this: any) => void;
        params: JobParam;
        _this: any;
        optimizable: boolean;
        isWaiting: boolean;
        id: number;
        children: IDispatcherCallback[];
        ce: number;
    }
    class JobParam {
        id: number;
        params: any[];
        constructor(id: number, params?: any[]);
        Set(...params: any[]): this;
        Set1(params: any[]): this;
        Clone(): JobParam;
    }
    class Dispatcher {
        static OnIdle(owner: any, callback: () => void): void;
        static InIdle(): boolean;
        static GC(): void;
        static clone(ojob: IDispatcherCallback, params: any[]): IDispatcherCallback;
        static cretaeJob(delegate: (...param: any[]) => void, param: any[], _this: any, optimizable: boolean): JobParam;
        static Clear(o: JobParam): void;
        static readonly CurrentJob: IDispatcherCallback;
        private static start();
        static Push(ojob: JobParam, params?: any[]): IDispatcherCallback;
        static call(_this: any, fn: Function, ...args: any[]): void;
    }
}
export declare module bind {
    class DProperty<T, P> {
        Attribute: PropertyAttribute;
        Name: string;
        Type: GFunction;
        DefaultValue: T;
        Changed: (e: EventArgs<T, P>) => void;
        Check: (e: EventArgs<T, P>) => void;
        Index: number;
        GType: reflection.GenericType;
        constructor(Attribute: PropertyAttribute, Name: string, Type: GFunction, DefaultValue?: T, Changed?: (e: EventArgs<T, P>) => void, Check?: (e: EventArgs<T, P>) => void);
        private RedifineChecker();
        checkType(val: T): boolean;
        _checkType<T>(val: T): boolean;
        private isGenerictype<T>(val);
        private static isObject<T>(val);
        private static isString<T>(val);
        private static isNumber<T>(val);
        private static isBoolean<T>(val);
    }
    class EventArgs<T, P> implements basic.IDisposable {
        prop: DProperty<T, P>;
        __this: P;
        _old: T;
        _new: T;
        IsValid: boolean;
        constructor(prop: DProperty<T, P>, ithis: P, _old: T, _new: T);
        Dispose(): void;
    }
    class Ref<T> {
        private _key;
        key: T;
    }
    class EventListener<T extends Function> implements basic.IDisposable {
        private _deleagtes;
        private key;
        private isSingliton;
        constructor(key: any, isSingliton?: boolean);
        On: T;
        private locks;
        Off: T;
        private lock;
        Invoke(key: Object, params: any[]): void;
        Invok(key: Object, callBack: (delegate: T) => any): any;
        Add(delegate: T, key?: any): void;
        Remove(key: any): void;
        private _store;
        Dispose(): void;
    }
    class PropBinding implements basic.IDisposable, basic.IDelegate {
        Invoke: (sender: PropBinding, e: EventArgs<any, any>) => void;
        Owner: any;
        IsWaiting: boolean;
        constructor(Invoke: (sender: PropBinding, e: EventArgs<any, any>) => void, Owner?: any);
        private _isIvnoked;
        handleEvent(e: EventArgs<any, any>): void;
        Dispose(): void;
    }
    enum PropertyAttribute {
        NonSerializable = 2,
        Private = 4,
        SerializeAsId = 8,
    }
    enum ObjectAttribute {
        NonSerializable = 2,
    }
    abstract class DObject implements basic.IDisposable {
        private static _dpStore;
        private static _isOpen;
        GetType(): any;
        static __fields__(): bind.DProperty<any, any>[];
        static __attributes__(): void;
        static readonly isOpen: boolean;
        static GetProperty(type: Function, name: string): DProperty<any, DObject>;
        static GetDPropertyAt(type: Function, index: number): DProperty<any, any>;
        GetProperty(name: string): DProperty<any, DObject>;
        ToJson(_context: encoding.SerializationContext, indexer?: encoding.IIndexer): Object;
        FromJson(json: any, context: encoding.SerializationContext, update?: boolean): this;
        static IsClass(x: any): boolean;
        static CreateField<PropertyType, ClassType>(name: string, type: Function | reflection.GenericType | reflection.DelayedType, defaultValue?: PropertyType, changed?: (e: EventArgs<PropertyType, ClassType>) => void, check?: (e: EventArgs<PropertyType, ClassType>) => void, attribute?: PropertyAttribute): DProperty<PropertyType, ClassType>;
        private static typeCount;
        private static getId(type);
        private static register(obj);
        private store;
        private getType();
        private static stop;
        constructor();
        protected _isFrozen: boolean;
        protected set<T>(prop: DProperty<T, this>, value: T): EventArgs<T, this>;
        protected raise<T>(e: DProperty<T, this>): void;
        protected get<T>(prop: DProperty<T, this>): T;
        protected GetValues(): any[];
        GetValue<T>(prop: DProperty<T, this>): T;
        SetValue<T>(prop: DProperty<T, this>, p: T): void;
        private _propertyChanged;
        removeListener(v: (ev: EventArgs<any, this>) => void): boolean;
        addListener(v: (ev: EventArgs<any, this>) => void): boolean;
        protected onPropertyChanged(ev: EventArgs<any, any>): void;
        OnPropertyChanged<T>(prop: DProperty<T, this>, ev: (sender: PropBinding, ev: EventArgs<T, this>) => void, owner?: any): PropBinding;
        addEvent<T>(prop: DProperty<T, this>, b: PropBinding): void;
        removeEvent<T>(prop: DProperty<T, this>, y: PropBinding): PropBinding[];
        readonly Disposed: boolean;
        protected DisposingStat: DisposingStat;
        protected OnDispose(): boolean;
        Dispose(): void;
        private _onDisposing;
        OnDisposing: (s: this) => void;
        OffDisposing: (s: this) => void;
        CloneTo(o: DObject): void;
        Freeze(): void;
        IsFrozen(): boolean;
        CreateBackup(OnUndo?: (self: this, bl: BuckupList<this>) => void): BuckupList<this>;
        Save(r?: BuckupList<any>): boolean;
        Undo(b?: BuckupList<this>, walkTrougth?: boolean): boolean;
        private UndoTo(b, walkTrougth);
    }
    enum DisposingStat {
        None = 0,
        Disposing = 1,
        Disposed = 2,
    }
    class XPath {
        Name: string;
        Property: bind.DProperty<any, DObject>;
        Value: any;
        Binding: any;
        d: DObject;
        constructor(name: string);
        ListenTo(d: bind.DObject, callback: (sender: bind.PropBinding, e: bind.EventArgs<any, any>) => void): void;
        Dispose(): void;
    }
    class Observer extends bind.DObject {
        static DPMe: DProperty<any, Observer>;
        Me: any;
        static DPPath: DProperty<string[], Observer>;
        Path: string[];
        static DPValue: DProperty<any, Observer>;
        Value: any;
        static __fields__(): DProperty<any, Observer>[];
        GenType(): typeof Observer;
        xpath: XPath[];
        constructor(me: any, path: string[]);
        private rebuidPath(path);
        private disposePath();
        getValue(l: number): any;
        private callme;
        private Start(i?);
        private callMe(binding, e);
        Dispose(): void;
    }
    interface IJobScop {
        IsNew: boolean;
        Scop: Scop;
        Jobs: JobInstance[];
        Control: UI.JControl;
    }
    class Controller extends DObject implements basic.IDisposable {
        private ret;
        private p;
        processHowEver: any;
        GenType(): typeof Controller;
        static __feilds__(): DProperty<HTMLElement, Controller>[];
        static DPView: DProperty<HTMLElement, Controller>;
        View: HTMLElement;
        JCParent: UI.JControl[];
        private ViewChanged(e);
        private implemented(d);
        handleEvent(e: Event): void;
        private static _process(__this, e, v);
        private ProcessBinding(e?);
        private static pb(t);
        Scop: Scop;
        static explorerJob: thread.JobParam;
        static collectJobs: thread.JobParam;
        private ExploreTree(dom, parent, control);
        private readonly CurrentControl;
        private instances;
        private ParseBinding(dom, parent, control);
        private UnresolvedDom;
        constructor(parent: UI.JControl);
        PDispose(): void;
        Dispose(): void;
    }
}
export declare module utils {
    interface Node<T> {
        Depth: number;
        Value: T;
        param?: any;
        children: Node<T>[];
        Parent: Node<T>;
    }
    class Tree<T> {
        private source;
        private getParent;
        private dic;
        constructor(source: collection.List<T>, getParent: (item: T) => T, listen: (base: Node<T>, target: Node<T>, add_remove_clear: boolean) => void);
        Remove(c: T): void;
        Add(c: T): void;
        Clear(): void;
        Reset(): void;
        private OnAdd(target);
        getNodes(): Node<T>[];
        getBases(): Node<T>[];
        private OnRemove(item);
        private OnClear();
        OnChange: bind.EventListener<(base: Node<T>, target: Node<T>, add_remove_clear: boolean) => void>;
    }
    class RemoveRef<T> {
        Ref: T;
        constructor(ref: T);
    }
    class ListEventArgs<P, T> implements basic.IDisposable {
        oldItem: T;
        newItem: T;
        startIndex: P;
        event: collection.CollectionEvent;
        collection: T[];
        constructor(oldItem: T, newItem: T, startIndex: P, event: collection.CollectionEvent, collection?: T[]);
        Dispose(): void;
        static readonly ResetEvent: any;
        private static _r;
    }
    interface IPatent<T> {
        Check(s: T): boolean;
        equals(p: IPatent<T>): boolean;
    }
    abstract class Filter<T, P extends IPatent<T>> extends bind.DObject {
        protected _patent: P;
        Patent: P | string;
        protected abstract convertFromString(x: string): P;
        abstract Begin(deb: number, count: number): any;
        private _store;
        constructor();
        OnChanged(callback: (filter: Filter<T, P>, data: any) => void, data: any, name?: string): number;
        OffChanged(name_id: string | number): void;
        protected _ismath(str: string[]): boolean;
        abstract IsMatch(index: number, item: T): any;
    }
    class CostumeFilter<T, P extends IPatent<T>> extends Filter<T, P> {
        _isMatch: (patent: P, item: T) => boolean;
        constructor(_isMatch: (patent: P, item: T) => boolean);
        IsMatch(index: number, item: T): boolean;
        convertFromString(x: string): P;
        Begin(deb: number, count: number): void;
    }
    class filterCallback<T, P extends IPatent<T>> {
        callback: (filter: utils.Filter<T, P>, data: any) => void;
        data: any;
        name: string;
        id: number;
        constructor(callback: (filter: utils.Filter<T, P>, data: any) => void, data: any, name?: string, id?: number);
    }
}
export declare module collection {
    enum CollectionEvent {
        Added = 0,
        Removed = 1,
        Replace = 2,
        Cleared = 3,
        Reset = 4,
    }
    type ListEventInvoker<T> = (e: utils.ListEventArgs<number, T>) => void;
    type ListEventHandler<T> = ListEventInvoker<T> | (basic.ITBindable<ListEventInvoker<T>>);
    type ListEventBindable<T> = basic.ITBindable<ListEventInvoker<T>>;
    class List<T> extends bind.DObject {
        protected argType: Function;
        static __fields__(): any[];
        static DPCount: bind.DProperty<number, List<any>>;
        private UCount();
        private _list;
        readonly ArgType: Function;
        private type;
        GetType(): Function | reflection.GenericType;
        constructor(argType: Function, array?: T[]);
        AsList(): T[];
        Order(comp: (a: T, b: T) => boolean): void;
        Set(i: number, value: T): void;
        Get(i: number): T;
        Insert(i: number, item: T): boolean;
        Freeze(): void;
        Add(item: T): this;
        AddRange(items: T[]): void;
        CheckIndex(i: number): boolean;
        Remove(item: T | number): boolean;
        RemoveAt(item: number): boolean;
        Clear(): void;
        readonly Count: number;
        IndexOf(item: T): number;
        Listen: ListEventHandler<T>;
        Unlisten: ListEventHandler<T>;
        private OnChanged(item, startIndex, event, oldItem, collection?);
        private _changed;
        protected getArgType(json: any): Function;
        ToJson(x: encoding.SerializationContext, indexer: encoding.IIndexer): any;
        FromJson(json: any, x: encoding.SerializationContext, update?: boolean, callback?: (prop: string, val: any) => Object): this;
        OnDeserialize(list: T[]): void;
        private static getType(json);
        UpdateDelegate: () => T[];
        static GenType(T: Function): Function | reflection.GenericType;
    }
    interface IKeyValuePair<T, P> {
        Key: T;
        Value: P;
    }
    class Dictionary<T, P> extends bind.DObject {
        Name: string;
        ReadOnly: boolean;
        private keys;
        private values;
        constructor(Name: string, ReadOnly?: boolean);
        GetKeyAt(i: number): T;
        GetValueAt(i: number): P;
        readonly Count: number;
        Clear(): void;
        IndexOf(key: T, fromIndex?: number): number;
        IndexOfValue(val: P, fromIndex?: number): number;
        Set(key: T, value: P): void;
        Remove(key: T): P;
        RemoveAllValues(val: P): T[];
        RemoveAt(i: number): IKeyValuePair<T, P>;
        getValues(): P[];
        Get(key: T): P;
        GetOrAdd(key: T, value?: P): P;
        GetOrCreate(key: T, New: (key: T, param: any) => P, param: any): P;
        GetKeyOf(val: P): T;
        Listen: (e: utils.ListEventArgs<T, P>) => void;
        Unlisten: (e: utils.ListEventArgs<T, P>) => void;
        private OnChanged(item, startIndex, event, oldItem);
        private _changed;
        UpdateDelegate: () => T[];
    }
    class ExList<T, P extends utils.IPatent<T>> extends List<T> {
        static DPSource: bind.DProperty<List<any>, ExList<any, any>>;
        Source: List<T>;
        static DPFilter: bind.DProperty<utils.Filter<any, any>, ExList<any, any>>;
        Filter: utils.Filter<T, P>;
        static DPMaxResult: bind.DProperty<number, ExList<any, any>>;
        MaxResult: number;
        static DPShift: bind.DProperty<number, ExList<any, any>>;
        Shift: number;
        static __fields__(): (bind.DProperty<utils.Filter<any, any>, ExList<any, any>> | bind.DProperty<number, ExList<any, any>> | bind.DProperty<List<any>, ExList<any, any>>)[];
        private _fid;
        private filterChanged(e);
        private sourceChanged(e);
        private sicd;
        private MaxResultChanged(e);
        static New<T, P extends utils.IPatent<T>>(source: List<T>, filter: utils.Filter<T, P>, argType?: Function): ExList<T, P>;
        constructor(argType: Function);
        private static patentChanged<T, P>(e, t);
        private sourceItemChanged(e);
        private isMatch(i, item);
        start: number;
        Reset(): void;
    }
    abstract class Binding<T> {
        GetType(): typeof Binding;
        private _dataContext;
        DataContext: collection.List<T>;
        constructor(dataContext: collection.List<T>);
        abstract OnItemAdded(item: T, index: number): any;
        abstract OnItemRemoved(item: T, index: number): any;
        abstract OnSourceCleared(): any;
        abstract OnSourceInitialized(_old: collection.List<T>, _nex: collection.List<T>): any;
        abstract OnSourceReset(): any;
        abstract OnSourceReplace(oldItem: T, newItem: T, index: number): any;
        private initChanged(e);
    }
    abstract class Render<T, P> extends Binding<T> {
        GetType(): typeof Render;
        private _rendredList;
        readonly RendredList: collection.List<P>;
        constructor(dataContext: collection.List<T>);
        abstract Render(item: T): P;
        OnItemAdded(item: T, index: number): void;
        OnItemRemoved(item: T, index: number): void;
        OnSourceCleared(): void;
        OnSourceInitialized(_old: collection.List<T>, _nex: collection.List<T>): void;
    }
}
export declare module mvc {
    abstract class ITemplate {
        Category: string;
        abstract Create(): HTMLElement;
        constructor(Category: string);
    }
    class iTemplate extends ITemplate {
        private _Url;
        readonly Url: string;
        private _Shadow;
        Shadow: HTMLTemplateElement;
        Create(): HTMLElement;
        constructor(relativeUrl: string, category: string, shadow?: HTMLTemplateElement);
        private _isLoaded;
        Load(): void;
    }
    interface ITemplateGroup {
        Url: string;
        OnError(init: Initializer): any;
        OnSuccess(init: Initializer): any;
    }
    class MvcDescriptor {
        private static _store;
        DataType: Function;
        Name: string;
        private Templates;
        constructor(name: string, dataType: Function);
        readonly Count: number;
        Get(index: number | string): ITemplate;
        static GetByType(datatype: Function): MvcDescriptor;
        static GetByName(templateName: string): MvcDescriptor;
        Add(templ: ITemplate): this;
        static Get(templatePath: string): ITemplate;
    }
    abstract class Initializer {
        private require;
        static readonly Instances: Initializer[];
        constructor(require: (modules: string, onsuccss?: (result: any) => void, onerror?: (result: any) => void, context?: any) => void);
        protected abstract Init(): any;
        abstract Dispose(): any;
        readonly System: collection.List<MvcDescriptor>;
        private _id;
        private tempsGroup;
        protected Add(templGroup: ITemplateGroup): void;
        private Load();
        private static typeResolvers;
        static SetTypeResolver(name: any, typeResolver: (typeName: string) => Function): void;
        private pending;
        private static gonsuccess(r);
        private static gonerror(r);
        private static onsuccess(r);
        private static onerror(r);
        html2Template(html: string): HTMLTemplateElement;
        htmlToElements(html: any): HTMLDivElement;
        then(call: (Initializer: Initializer) => void): void;
        static then(call: (Initializer: Initializer) => void): void;
        private static callbacks;
        private onfinish();
        private static onfinish(t);
        static Get(type: Function): MvcDescriptor;
        ExcecuteTemplate(url: string, templ: HTMLElement, typeResolver?: (typeName: string) => Function): void;
    }
    class Template {
        private static _store;
        static TempplatesPath: string;
        private _type;
        private _view;
        private _name;
        private _for;
        readonly forType: any;
        readonly View: HTMLElement;
        readonly Name: string;
        readonly For: string;
        constructor(templateDOM: HTMLElement);
        static getTemplates(type: any): Template[];
        private static fromInside;
        static LoadTemplate(templateName: string, context: basic.IContext): void;
        static getWebRequest(): any;
        private static _webRequest;
        private static OnRecieveTemplates(result);
        private static createTemplate(tmplate);
        static GetAll(name: string): any[];
        static Get(name: string, vtype: string): any;
        static Foreach(callback: (tmplate: Template) => boolean): void;
    }
}
export declare module bind {
    interface IJobCollection {
        [s: string]: basic.IJob;
    }
    abstract class Scop extends bind.DObject {
        GenType(): any;
        private _scops;
        getScop(path: string, createIfNotEist?: boolean): Scop;
        findScop(path: string[]): void;
        abstract getParent(): any;
        protected abstract setParent(v: Scop): any;
        private static getScop(scp, name, createIfNotEist?);
        setToScop(name: string, value: any): void;
        static __fields__(): DProperty<any, Scop>[];
        static DPValue: DProperty<any, Scop>;
        Value: any;
        BindingMode: BindingMode;
        protected _bindingMode: BindingMode;
        constructor(_bindingMode: BindingMode);
        private valueChanged(sender, e);
        protected abstract _OnValueChanged(e: bind.EventArgs<any, any>): any;
        static Create(s: string, parent?: Scop, bindingMode?: BindingMode): Scop;
        static GetScop(path: string[], parent: Scop, bindngMode: BindingMode): Scop;
        AddJob(job: basic.IJob, dom: HTMLElement): JobInstance;
        private jobs;
        Dispose(): void;
        RegisterJob(job: basic.IJob): void;
        GetJob(name: string): basic.IJob;
        protected mjobs: IJobCollection;
    }
    class StringScop extends bind.Scop {
        private parent;
        private sc;
        private pb;
        constructor(s: string, parent: bind.Scop);
        protected _OnValueChanged(e: bind.EventArgs<any, any>): void;
        getParent(): Scop;
        protected setParent(v: Scop): void;
        ParentValueChanged(sender: bind.PropBinding, e: bind.EventArgs<any, any>): void;
    }
    class NamedScop extends Scop {
        GenType(): any;
        private _name;
        readonly Name: string;
        constructor(name: string, bindingMode: BindingMode);
        static Get(name: string): bind.NamedScop;
        protected _OnValueChanged(e: bind.EventArgs<any, any>): void;
        static Create(name: string, value?: any, twoWay?: BindingMode): NamedScop;
        Dispose(): void;
        getParent(): any;
        setParent(v: Scop): void;
    }
    class Bind extends Scop {
        GenType(): any;
        static __fields__(): (DProperty<Scop, Bind> | DProperty<string, Bind>)[];
        private static PathChanged(e);
        private pb;
        private static ParentChanged(e);
        Dispose(): void;
        ParentValueChanged(sender: bind.PropBinding, e: bind.EventArgs<any, any>): void;
        private static DPPath;
        Path: string;
        private static DPParent;
        Parent: Scop;
        private observer;
        private observerBinding;
        constructor(path: string | string[], parent: Scop, bindMode?: BindingMode);
        private isChanging;
        private __OnValueChanged(sender, e);
        protected AttributeChanged(e: Event): void;
        private int;
        protected _OnValueChanged(e: bind.EventArgs<any, any>): void;
        getParent(): Scop;
        setParent(v: Scop): void;
        getChildren(): Scop[];
    }
    namespace AnonymouseScop {
        function Register(scop: Scop): number;
        function UnRegister(i: number): Scop;
        function Get(i: number): Scop;
    }
    class ValueScop extends Scop {
        constructor(value: any, bindMode?: BindingMode);
        _OnValueChanged(e: EventArgs<any, any>): void;
        getParent(): Scop;
        setParent(v: Scop): void;
        private _parent;
    }
    class Compiler {
        private static UnresolvedDom;
        static GetParentScop(dom: HTMLElement): Scop;
        static Compile(dom: HTMLElement, parent?: Scop, control?: UI.JControl): bind.IJobScop;
    }
    abstract class Filter<T, CT> extends Scop {
        protected source: Scop;
        private dbb;
        constructor(source: Scop, bindingMode?: BindingMode);
        Initialize(): void;
        protected isChanging: boolean;
        protected SourceChanged(p: PropBinding, e: EventArgs<any, Scop>): void;
        protected _OnValueChanged(e: bind.EventArgs<any, any>): void;
        Update(): void;
        UpdateBack(): void;
        protected abstract Convert(data: T): CT;
        protected abstract ConvertBack(data: CT): T;
        getParent(): Scop;
        setParent(v: Scop): void;
        Dispose(): void;
    }
    class DoubleFilter extends Filter<number, number> {
        Fraction: number;
        private fraction;
        protected Convert(data: number): number;
        protected ConvertBack(data: number): number;
    }
    interface IFilter {
        Name: string;
        BindingMode: BindingMode;
        CreateNew(source: Scop, bindingMode: BindingMode, param: string): Filter<any, any>;
    }
    function RegisterFilter(filter: IFilter): boolean;
    function CreateFilter(filterName: string, parent: Scop, bindingMode: BindingMode): Scop;
    enum BindingMode {
        Direct = 1,
        BiDirection = 3,
        ToSource = 2,
    }
    class TwoBind<T> {
        private bindingMode;
        private a;
        private b;
        private pa;
        private pb;
        private dba;
        private dbb;
        private IsChanging;
        constructor(bindingMode: BindingMode, a: DObject, b: DObject, pa: DProperty<T, any>, pb: DProperty<T, any>);
        protected init(): void;
        protected initB(): void;
        protected pac(p: PropBinding, e: EventArgs<any, any>): void;
        protected pab(p: PropBinding, e: EventArgs<any, any>): void;
        private disposed;
        Dispose(): void;
    }
    class TwoDBind<T, P> {
        private bindingMode;
        private a;
        private b;
        private pa;
        private pb;
        private con;
        private conBack;
        private dba;
        private dbb;
        private IsChanging;
        constructor(bindingMode: BindingMode, a: DObject, b: DObject, pa: DProperty<T, any>, pb: DProperty<P, any>, con: (v: T) => P, conBack: (v: P) => T);
        protected pac(p: PropBinding, e: EventArgs<any, any>): void;
        protected pab(p: PropBinding, e: EventArgs<any, any>): void;
        protected init(): void;
        protected initB(): void;
        private disposed;
        Dispose(): void;
    }
}
export declare module ScopicCommand {
    function Register<T>(callback: basic.ITBindable<(n: string, dom: HTMLElement, scop: bind.Scop, param: T) => void>, param?: T, name?: string): string;
    function Call(n: string, dom: HTMLElement, scop: bind.Scop): any;
    function Delete(n: string): void;
}
export declare module Api {
    interface IApiTrigger {
        Name: string;
        Filter: (cmdCallback: IApiCallback, params: any) => boolean;
        CheckAccess: (t: IApiTrigger) => boolean;
        Params?: any;
    }
    interface IApiCallback {
        hash?: string;
        Name: string;
        Callback: (trigger: IApiTrigger, callback: IApiCallback, params) => void;
        Owner?: any;
        Params?: any;
    }
    function RegisterCallback<T extends Function>(api: IApiCallback): boolean;
    function RegisterTrigger(api: IApiTrigger): boolean;
    function RiseApi(apiName: string, params: any): void;
}
export declare module encoding {
    interface IPath<OB, DP> {
        Owner: OB;
        Property: DP;
        Set<T>(value: T): T;
        executed: boolean;
    }
    class BPath implements IPath<bind.DObject, bind.DProperty<any, any>> {
        Owner: bind.DObject;
        Property: bind.DProperty<any, any>;
        executed: boolean;
        Set(value: any): any;
        constructor(Owner: bind.DObject, Property: bind.DProperty<any, any>);
    }
    class Path implements IPath<any | bind.DObject, string | bind.DProperty<any, any>> {
        Owner: any | bind.DObject;
        Property: string | bind.DProperty<any, any>;
        executed: boolean;
        Set(value: any): any;
        constructor(Owner: any | bind.DObject, Property: string | bind.DProperty<any, any>);
    }
    class LPath implements IPath<collection.List<any>, number> {
        Owner: collection.List<any>;
        Property: number;
        executed: boolean;
        Set(value: any): any;
        constructor(Owner: collection.List<any>, Property: number);
    }
    interface Serialization<T> {
        FromJson(json: any, context: SerializationContext, ref: IRef): T;
        ToJson(data: T, context: SerializationContext, indexer: encoding.IIndexer): any;
    }
    interface IRef {
        __ref__: number;
    }
    interface IIndexer {
        ref: IRef;
        json: any;
        valid: boolean;
    }
    class SerializationContext {
        static GlobalContext: SerializationContext;
        private _store;
        private _ext;
        RequireNew: (json: any, type: Function | reflection.GenericType) => boolean;
        Dispose(): void;
        constructor(isDefault: boolean);
        Register<T>(type: Function, ser: Serialization<T>): void;
        Append(con: SerializationContext): void;
        Get(type: Function): Serialization<any>;
        private indexer;
        private refs;
        get(ref: number, path: IPath<any, any>): any;
        set(ref: number, obj: any): void;
        private cnt;
        getJson(obj: any): IIndexer;
        reset(): this;
        private static getType(type);
        FromJson(json: any, type: Function | reflection.GenericType, path: IPath<any, any>): any;
        ToJson(obj: any): any;
        private _toJson(obj, ret);
        toString(): void;
    }
}
export declare module net {
    class Header {
        private _key;
        readonly key: string;
        private _value;
        readonly value: string;
        constructor(key: any, value: any);
    }
    enum ResponseType {
        json = 0,
        Document = 1,
        Text = 2,
        ArrayBuffer = 3,
        Blob = 4,
    }
    enum WebRequestMethod {
        Get = 0,
        Post = 1,
        Head = 2,
        Put = 3,
        Delete = 4,
        Options = 5,
        Connect = 6,
    }
    class WebRequest implements basic.IDisposable {
        crypt: basic.ICrypto;
        private http;
        private _responseType;
        getResponseType(): ResponseType;
        setResponseType(v: ResponseType): ResponseType;
        Crypto: basic.ICrypto;
        private key;
        private downloadDelegate;
        constructor(crypt: basic.ICrypto);
        Dispose(): void;
        private _onprogress(e);
        readonly IsSuccess: boolean;
        Download(req: IRequestUrl, data: any): void;
        Download2(c: Request): void;
        GetFileSize(url: any, callback: any): void;
        GetHeader(url: any, callback: any): void;
        OnComplete: bind.EventListener<(e: WebRequest) => void>;
        readonly Response: any;
    }
    abstract class RequestParams<T, S> {
        protected callback: (sender: S, result: any) => void;
        data: T;
        isPrivate: boolean;
        IsSuccess: boolean;
        constructor(callback: (sender: S, result: any) => void, data: T, isPrivate?: boolean);
        Callback(sender: S, result: any): void;
        abstract OutputData(): string;
        InputData: string;
    }
    class Request {
        url: IRequestUrl;
        data: RequestParams<any, QueeDownloader>;
        fail: boolean;
        constructor(url: IRequestUrl, data: RequestParams<any, QueeDownloader>);
    }
    class QueeDownloader {
        crypt: basic.ICrypto;
        private webr;
        readonly Request: net.WebRequest;
        private quee;
        private isRunning;
        private isDownloading;
        Crypto: basic.ICrypto;
        constructor(crypt: basic.ICrypto);
        current: Request;
        private DownloadComplete(xmlRequest);
        private success;
        private fails;
        Push(url: IRequestUrl, data: RequestParams<any, QueeDownloader>): void;
        Insert(dcall: Request): void;
        Start(): void;
        Next(): void;
        Restart(): void;
        OnSuccess: bind.EventListener<any>;
        OnFail: bind.EventListener<any>;
        OnFinish: bind.EventListener<any>;
    }
}
export declare module net {
    interface IRequestHeader {
        [key: string]: string;
    }
    interface IRequestUrl {
        beforRequest?: (req: net.IRequestUrl) => void;
        Url: string;
        Method?: net.WebRequestMethod;
        Header?: IRequestHeader;
    }
    class RequestUrl implements IRequestUrl {
        private _url;
        private context;
        Header: IRequestHeader;
        Method: net.WebRequestMethod;
        beforRequest: (req: net.IRequestUrl) => void;
        Url: string;
        constructor(_url: string, context: basic.IContext, Header?: IRequestHeader, Method?: net.WebRequestMethod);
    }
}
export declare namespace basic {
    class DomEventHandler<T extends Event, P> implements IEventHandler, EventListenerObject {
        dom: Element;
        event: string;
        private handle;
        private param;
        Started: boolean;
        constructor(dom: Element, event: string, handle: (eh: DomEventHandler<T, P>, ev: T, param: P) => void, param?: P);
        Start(): void;
        Pause(): void;
        Dispose(): void;
        Reset(): void;
        handleEvent(evt: Event): void;
        static Dispose(dom: EventTarget, event?: string): void;
    }
}
export declare module crypto {
    function string2bytes_16(a: string): Uint16Array;
    function bytes2string_16(a: Uint16Array): string;
    function string2bytes(a: string | number[]): any[];
    function bytes2string(a: any): string;
    class Aes implements basic.ICrypto {
        protected Key: number[];
        constructor(key: string | number[]);
        InitKey(key: number[]): number[];
        static ExpandKey(b: number[]): void;
        Encrypt(data: number[]): number[];
        Decrypt(data: number[]): number[];
        SEncrypt(data: string): string;
        SDecrypt(data: string): string;
        static SubBytes(a: any, c: any): void;
        static AddRoundKey(a: any, c: any): void;
        static ShiftRows(a: any, c: any): void;
        static MixColumns(b: any): void;
        static MixColumns_Inv(b: any): void;
    }
    class AesCBC extends Aes {
        constructor(key: string | number[]);
        InitKey(key: number[]): number[];
        static blockXOR(a: any, c: any): any[];
        static blockIV(): number[];
        static pad16(a: number[]): number[];
        static depad(a: number[]): number[];
        Encrypt(data: number[]): number[];
        Decrypt(data: number[]): number[];
    }
}
export declare module crypto {
    class SecureRandom {
        nextBytes(a: any): void;
        rng_get_byte(): any;
    }
}
export interface BuckupList<T> {
    values: any[];
    OnUndo?: (self: T, bl: BuckupList<T>) => void;
}
export declare namespace Ids {
    class t1 {
    }
    class t2 {
    }
    class t3 {
    }
}
