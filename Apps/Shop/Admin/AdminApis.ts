import {basic, collection, bind, Api } from '../../../js/Corelib';
import { UI } from '../../../js/UI';
import { models } from '../../../js/Models';
import { sdata, Controller } from '../../../js/System';
import {  basics  } from './../Basics';
export declare type DBCallback<T> = UI.Modals.DBCallback<T>;
export interface ListTemplateName {
    templateName: string;
    itemTemplateName: string
}
export interface IMyApi<T extends sdata.QShopRow, P extends sdata.DataTable<T>> {
    Init(_vars:basics. vars, modal: string | UI.Modals.ModalEditer<T>, list: ListTemplateName | UI.Modals.ModalList<T>): void;
    Check(data: T): boolean;
    Avaible(callback: DBCallback<P>): boolean;
    New(callback: DBCallback<T>, saveToApp: boolean, saveToServer?: boolean): T;
    Save(data: T, isNew?: boolean, callback?: DBCallback<T>);
    Edit(saveToServer: boolean, data: T, isNew: boolean, callback:DBCallback<T>);
    Delete(saveToServer: boolean, data: T, callback: DBCallback<T>);
    Open(data: T);
    OpenList(data: P, action?:UI.Modals.ModalListAction<T>);
    Get(data: T | number, full?: boolean);
    Update();
}                                                                                                                                               



export abstract class MyApi<T extends sdata.QShopRow, P extends sdata.DataTable<T>> implements IMyApi<T, P> {
    ShowInfo(msg: any, isInfo?: any, time?: any): any {
        UI.InfoArea.push(msg, isInfo, time);
    }
    protected _action: UI.Modals.EditorAction<T>;
    protected _actionList: UI.Modals.ModalListAction<T>;
    private _templateName: string;
    private _templateTableName: string;
    private _listTemplateName: ListTemplateName;
    private _catModal: UI.Modals.ModalEditer<T>;
    private _listModal: UI.Modals.ModalList<T>;

    constructor(_vars: basics.vars, templateName: string, listTemplate?: ListTemplateName | UI.Modals.ModalList<T>) {

        this.Init(_vars, templateName, listTemplate);
    }

    protected getAction(callback?: DBCallback<T>) {
        return callback == undefined ? this._action : this._action.Clone(callback);
    }
    public get EditData(): UI.Modals.ModalEditer<T> {
        if (!this._catModal && this._templateName) this._catModal = new UI.Modals.ModalEditer<any>(this._templateName);
        return this._catModal;
    }
    public getEditList(): UI.Modals.ModalList<T> {

        if (!this._listModal && this._listTemplateName) {
            this._listModal = new UI.Modals.ModalList<T>(undefined, this._listTemplateName.templateName, this._listTemplateName.itemTemplateName);
            this._listModal.OnInitialized = (n) => n.setWidth("90%");
        }
        return this._listModal;
    }
    protected _vars: basics.vars;
    Init(vars: basics.vars, modal: string | UI.Modals.ModalEditer<T>, listTemplate?: ListTemplateName | UI.Modals.ModalList<T>): void {
        this._action = UI.Modals.EditorAction.Create(this, this.OnModalSuccess, this.OnModalError, this.defaultCallback);
        this._vars = vars;
        if (listTemplate instanceof UI.Modals.ModalList) this._listModal = listTemplate;
        else this._listTemplateName = listTemplate;
        if (typeof modal === 'string') this._templateName = modal;
        else this._catModal = modal;
    }
    abstract Check(data: T): boolean;
    abstract Avaible(callback: DBCallback<P>): boolean;
    abstract New(callback: DBCallback<T>, saveToApp: boolean, saveToServer?: boolean): T;
    /**
      Save a record to database
      @param {T} data the record to Save to database and to App
      @param {boolean} isNew report a data as new value -- doesn't in database yet
      @param {DBCallback<T>} callback callback function whether the record Saved to database or not or any error happened to data    
    */
    abstract Save(data: T, isNew?: boolean, callback?: DBCallback<T>);

    /**
      Delete a record from database
      @param {T} data the record to delete from database and from App
      @param {boolean} saveToServer delete from Database Also
      @param {DBCallback<T>} callback callback function whether the record deleted from database or not or any error happened to data
    */
    abstract Delete(saveToServer: boolean, data: T, callback: DBCallback<T>);

    abstract Edit(saveToServer: boolean, data: T, isNew: boolean, callback: DBCallback<T>);

    Open(data_table: T, isNew?: boolean, action?: UI.Modals.IEditorAction<T>) {
        var c = this.EditData;
        if (c)
            c.edit(data_table, isNew, action);
        else UI.InfoArea.push("This data has no template editor yet");
    }
    OpenList(data: P, action?: UI.Modals.ModalListAction<T>) {
        var c = this.getEditList();
        if (c)
            c.show(action, data);
        else UI.InfoArea.push("This data has no template editor yet");
    }
    /**
     * Update Data From The Server
     * @param _data if(T) Update data
                   if(P) Update list of P.Owner
                   if(undefinned) Update A whole Data Of Type T
     */
    Update(_data?: T | P) {
        if (!_data) return this.UpdateAll();

        _data.Stat = sdata.DataStat.Updating;
        if (_data instanceof sdata.DataRow)
            this.UpdateData(_data);
        if (_data instanceof sdata.DataTable)
            this.UpdateList(_data, _data.Owner);

        throw new Error("UnExpected Type Of Data");
    }

    public SmartUpdate() {
        var type = this.getDefaultList().GetType() as Function;
        this._vars.requester.Request(type, "SUPDATE", null, {});
    }

    protected abstract UpdateData(data: T, callback?: Controller.RequestCallback<T>, costumize?: Controller.RequestCostumize<T>);
    protected abstract UpdateList(list: P, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<P>, costumize?: Controller.RequestCostumize<P>);
    protected abstract UpdateAll(callback?: Controller.RequestCallback<P>, costumize?: Controller.RequestCostumize<P>);
    Get(data: number | T, full?: boolean) {
        throw new Error("Method not implemented.");
    }
    abstract OnModalSuccess(data: T, isNew: boolean, callback?: DBCallback<T>);
    abstract OnModalError(data: T, isNew: boolean, callback?: DBCallback<T>);

    defaultCallback: DBCallback<T>;
    Select(n: UI.Modals.ModalListAction<T>, defaultList: T, list?: collection.List<T>) {
        this.getEditList().show(n, list || this.getDefaultList());
        this.getEditList().OnInitialized = n => n.SelectedItem = defaultList;
        return this.getEditList();
    }
    protected abstract getDefaultList(): collection.List<T>;

    CreateNew(callback?: (agent: T) => void) {
        this.New((data, isNew, error) => {
            if (error == basics.DataStat.Success) {
                var cll: UI.Modals.DBCallback<T>;
                this.Edit(true, data, isNew, cll = (data, isNew, error) => {
                    var iss = error === basics.DataStat.Success;
                    switch (error) {
                        case basics.DataStat.Success:
                            this.getDefaultList().Add(data);
                            break;
                        case basics.DataStat.Fail:
                        case basics.DataStat.UnknownStat:
                            UI.InfoArea.push("Fatal Error Occured");
                            return this.Edit(true, data, isNew, cll);
                        case basics.DataStat.OperationCanceled:
                            UI.InfoArea.push("Operation Cancled");
                            break;
                        case basics.DataStat.DataCheckError:
                            UI.InfoArea.push("Please Validate Your Data");
                            return this.Edit(true, data, isNew, cll);
                    }
                    callback && callback(iss ? data : null);
                });
            }
        }, false, false);
    }
}


export abstract class FactureBase<T extends models.FactureBase, P extends sdata.DataTable<T>> extends MyApi<T, P> {
    abstract UpdateArticlesOf(data: T, callback?: DBCallback<T>): any;
    abstract LoadArticlesOf(data: T, callback?: DBCallback<T>): any;
    abstract Validate(data: T, isNew?: boolean, callback?: DBCallback<T>);
    private close(data:models. FactureBase,callback: (data:models. FactureBase, iss: boolean) => void)  {
        this._vars.requester.Request(data.GetType(), "CLOSE", data, data, (c, is, succ) => {
            if (succ) {
                data.IsOpen = false;
            } else UI.Modal.ShowDialog("Critical Error", "The Data was Saved But Closed Yet");
            callback && callback(data, succ);
        });
    };
    EOpenFacture(data: models.FactureBase,validate?:boolean) {
        if (data.IsOpen) {
            this._vars.requester.Post(data.GetType(), data, null, (c, is, succ) => {
                if (succ) {
                    this.close(data, (data, iss) => {
                        if (data instanceof models.SFacture)
                            return this._vars.apis.SVersment.Regler(data, data.Client);
                        else if (data instanceof models.Facture)
                            return this._vars.apis.Versment.Regler(data, data.Client);
                    });
                } else UI.Modal.ShowDialog("Critical Error", "The Facture Is Saved But doesn't Closed <br> Fatal Error When Closing The Facture");
            }, undefined, undefined,validate? { "Validate": data.Id }:undefined);
        } else {
            this._vars.requester.Request(data.GetType(), "OPEN", data, data, (c, is, succ) => {
                if (succ) {
                    data.IsOpen = true;
                } else UI.Modal.ShowDialog("Critical Error", "It'seem that the facture cannot be opened . Sory");
            });
        }
    }
    CreateNew(callback?: (fact: T) => void) {
        {}
        super.CreateNew((fact) => {
            Api.RiseApi('OpenFactureInfo', {
                callback: (p, da) => {
                    callback(p.data);
                },
                data: fact,
            });
        });
    }

}
