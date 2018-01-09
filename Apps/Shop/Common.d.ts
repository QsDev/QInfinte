import { UI, conv2template } from '../../js/UI';
import { utils, basic, bind, collection } from '../../js/Corelib';
import { models } from "../../js/Models";
import { Controller } from '../../js/System';
export interface vars {
    __data: models.QData;
    modify: bind.Scop;
    user: models.Login;
    requester: Controller.ProxyData;
    invalidateFactures: collection.List<models.Facture>;
    invalidateLogins: collection.List<models.Login>;
    validateLogins: collection.List<models.Login>;
    mails: collection.List<models.Mail>;
    spin: UI.Spinner;
}
export declare function GetVars(call: (vars: vars) => boolean): void;
export declare namespace Common {
    function CreateGlyph(dom: any, icon: any, title: any, type: any, attri: any): any;
    /**
        if(return)
            then do not save or undo;
        else then save or undo
    **/
    type ModalAction<T> = (product: T, isNew: boolean) => boolean;
    type ModalEditorResult<T> = basic.ITBindable<ModalAction<T>>;
    class ModalEditer<T extends bind.DObject> extends UI.Modal {
        private templateName;
        Data: T;
        private Content;
        constructor(templateName: string);
        initialize(): void;
        OnKeyDown(e: KeyboardEvent): void;
        private scop;
        private IsNew;
        edit(product: T, isNew: boolean, action: IEditorAction<T>): void;
        Open(): void;
        private Action;
    }
    interface IEditorAction<T> {
        OnSuccess?: ModalEditorResult<T>;
        OnError?: ModalEditorResult<T>;
    }
    class EditorAction<T> implements IEditorAction<T> {
        private proxyAction;
        private callback;
        private invoke(x, p, isNew);
        OnSuccess: ModalEditorResult<T>;
        OnError: ModalEditorResult<T>;
        constructor(proxyAction: IEditorAction<T>, callback: DBCallback<T>);
        onSuccess(p: T, isNew: boolean): boolean;
        onError(p: T, isNew: boolean): boolean;
        Clone(callback: DBCallback<T>): EditorAction<T>;
        static Create<T>(_this: any, onSuccess: ModalAction<T>, onError: ModalAction<T>, defaltCallback?: DBCallback<T>): EditorAction<T>;
    }
    type DBCallback<T> = (data: T, isNew: boolean, error_data_notsuccess_iss?: DataStat) => void | boolean;
    enum DataStat {
        UnknownStat,
        DataCheckError,
        Fail = 0,
        Success = 1,
        OperationCanceled = 2,
    }
}
export declare namespace funcs {
    interface ITParam<T> {
        t: T;
        c: UI.Glyphs;
    }
    function setTepmlate<T>(lb: UI.Navbar<any>, owner: T, handleService: (s, e, p: ITParam<T>) => void): void;
    function createSparator(): UI.Glyph;
    function prodModal(): Common.ModalEditer<models.Product>;
    function catModal(): Common.ModalEditer<models.Category>;
    function priceModal(): Common.ModalEditer<any>;
    function fournisseurModal(): Common.ModalEditer<models.Fournisseur>;
    function clientModal(): Common.ModalEditer<models.Client>;
    function clientsModal(): Common.ModalList<models.Client>;
    function fournisseursModal(isMatch: (p: utils.IPatent<models.Fournisseur>, item: models.Fournisseur) => boolean): Common.ModalList<models.Fournisseur>;
    function versmentsModal(): Common.ModalList<models.Versment>;
    function sversmentsModal(): Common.ModalList<models.SVersment>;
    function versmentModal(): Common.ModalEditer<models.Versment>;
    function sversmentModal(): Common.ModalEditer<models.BVersment>;
    function clientEditModal(): Common.ModalEditer<models.Client>;
    function pricesModal(): Common.ModalList<models.FakePrice>;
    function AgentModal(): Common.ModalEditer<models.Agent>;
    function CreateIcon(icon: any, title?: any): HTMLSpanElement;
}
export declare namespace extern {
    function crb(icon: any, title: any, type: any): HTMLButtonElement;
    function OnSuccessCategory(cat: models.Category, isNew: boolean): boolean;
    function OnErrorCategory(cat: models.Category, isNew: boolean): boolean;
    function OnSuccessProduct(prod: models.Product, isNew: boolean): boolean;
    function OnErrorProduct(cat: models.Product, isNew: boolean): boolean;
    function OnSuccessVersment(versment: models.BVersment, isNew: boolean): boolean;
    function OnErrorVersment(versment: models.Versment, isNew: boolean): boolean;
}
export declare namespace Common {
    type ModalListAction<T> = (s: ModalList<T>, selected: T, result: string) => void;
    class ClientPatent implements utils.IPatent<models.Client> {
        Name: any;
        Tel: any;
        Check(p: models.Client): boolean;
        equals(p: utils.IPatent<models.Client>): boolean;
    }
    class ModalList<T> extends UI.Modal {
        private source;
        private tableTmplate;
        private itemTemplate;
        private datas;
        private asScopic;
        isMatch: (p: utils.IPatent<T>, item: T) => boolean;
        Datacontext: UI.ListAdapter<T, any>;
        constructor(source: collection.List<T>, tableTmplate: string, itemTemplate: string, datas?: any, asScopic?: boolean, isMatch?: (p: utils.IPatent<T>, item: T) => boolean);
        IsMatch: (p: utils.IPatent<T>, item: T) => boolean;
        private selectedItem;
        initialize(): void;
        SelectedItem: T;
        show(onc: ModalListAction<T>, list?: collection.List<T>): void;
        Open(): void;
        Close(msg: any): void;
        private onc;
        _exList: collection.ExList<T, any>;
        private createFilter();
    }
    function edit(client: models.Client, isNew: boolean): void;
}
export declare abstract class Facture<I, D> extends UI.NavPanel {
    private template;
    private _data;
    private btn_add;
    private btn_save;
    private btn_remove;
    private group_cnt;
    private group_tcnt;
    private _caption;
    protected abonment: UI.ProxyAutoCompleteBox<basic.EnumValue>;
    protected adapter: UI.ListAdapter<I, D>;
    Data: D;
    protected OnKeyDown(e: KeyboardEvent): void;
    constructor(name: string, caption: string, template: conv2template, _data: D);
    initialize(): void;
    protected abstract OnAbonmentChanged(b: UI.IAutoCompleteBox, o: basic.EnumValue, n: basic.EnumValue): any;
    protected abstract AddNewArticle(): any;
    protected abstract DeleteArticle(): any;
    protected abstract SaveFacture(): any;
}
export declare module Agent {
    function AddNew(f: models.Agent, onSuccess?: (f: models.Agent) => void, onError?: (f: models.Agent) => void): void;
    function Remove(f: models.Agent): void;
    function Save(f: models.Agent): void;
    function Open(f: models.Agent, isNew: boolean): void;
    function OnSuccessAgent(frns: models.Agent, isNew: boolean): boolean;
    function OnErrorAgent(cat: models.Agent, isNew: boolean): boolean;
    function Update(): void;
    function agentsModal(): Common.ModalList<models.Agent>;
    function Select(OnSelect: (i: models.Agent) => void, si: models.Agent): void;
}
export declare module Client {
    function Edit(c: models.Client, isNew: boolean): void;
    function OnSuccess(frns: models.Client, isNew: boolean): boolean;
    function Remove(f: models.Client): void;
    function Save(f: models.Client): void;
    function OnError(cat: models.Client, isNew: boolean): boolean;
}
export declare module Fournisseur {
    function AddNew(f: models.Fournisseur, onSuccess?: (f: models.Fournisseur) => void, onError?: (f: models.Fournisseur) => void): void;
    function Remove(f: models.Fournisseur): void;
    function Save(f: models.Fournisseur): void;
    function Open(f: models.Fournisseur): void;
    function Select(callback: (selected: boolean, item: models.Fournisseur) => void, select: models.Fournisseur): void;
    function OnSuccessFournisseur(frns: models.Fournisseur, isNew: boolean): boolean;
    function OnErrorFournisseur(cat: models.Fournisseur, isNew: boolean): boolean;
    function Update(): void;
}
export declare module Category {
    function AddNew(): void;
    function edit(item: models.Category): void;
    function remove(item: models.Category): void;
}
export declare module Product {
    function AddNew(): void;
    function edit(item: models.Product): void;
    function remove(item: models.Product): void;
}
export declare module FakePrice {
    function AddNew(price: models.FakePrice, callback: (fp: models.FakePrice, isn: boolean, iss: boolean) => void): void;
    function edit(item: models.FakePrice): void;
    function remove(item: models.FakePrice): void;
    function savePrdPrice(price: models.Price, callback: (price: models.Price, iss: boolean) => void): void;
    function priceModal(): Common.ModalEditer<any>;
}
