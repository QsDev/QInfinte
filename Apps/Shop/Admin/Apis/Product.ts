import { MyApi, DBCallback } from './../AdminApis';import { basics } from '../../Basics';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
import { basic } from '../../../../js/Corelib';

export class Product extends MyApi<models.Product, models.Products> {
    protected UpdateData(data: models.Product, callback?: Controller.RequestCallback<models.Product>, costumize?: Controller.RequestCostumize<models.Product>) {
        this._vars.requester.Request(models.Product, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Products, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Products>, costumize?: Controller.RequestCostumize<models.Products>) {
        this._vars.requester.Get(models.Products, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Products>, costumize?: Controller.RequestCostumize<models.Products>) {
        this._vars.requester.Get(models.Products, this._vars.__data.Products, { FromDate: 0 }, callback, costumize);
    }
    public SmartUpdate() {
        this._vars.requester.Request(models.Products, "SUPDATE", null, { Date: "12/12/2016" });
    }
    Check(data: models.Product): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Products>): boolean {
        return callback ? callback(this._vars.__data.Products, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Product>, saveToApp: boolean, saveToServer?: boolean): models.Product {
        var c = new models.Product(basic.New());
        if (saveToApp)
            this._vars.__data.Products.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.Product, isNew?: boolean, callback?: DBCallback<models.Product>) {
        if (this.Check(data))
            this._vars.requester.Request(models.Product,"SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Product Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Products.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Product", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.Product, callback: DBCallback<models.Product>) {
        if (!data) return this.ShowInfo('Select one Product PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Product', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.Product,"DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The Product :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Product :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Product :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Product) {
        this._vars.__data.Products.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Product, isNew: boolean, callback?: DBCallback<models.Product>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Product PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.Product, isNew: boolean, callback?: DBCallback<models.Product>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Product, isNew: boolean, callback?: DBCallback<models.Product>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }
    getDefaultList() { return this._vars.__data.Products; }
    constructor(vars:basics.vars) {
        super(vars, 'iProduct.edit');
    }
   
}