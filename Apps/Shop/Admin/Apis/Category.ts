import { MyApi, DBCallback } from './../AdminApis';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
////////i//mport { funcs, Common } from './../../Common';
import { basic } from '../../../../js/Corelib';
import { basics } from '../../Basics';

export class Category extends MyApi<models.Category, models.Categories> {
    protected UpdateData(data: models.Category, callback?: Controller.RequestCallback<models.Category>, costumize?: Controller.RequestCostumize<models.Category>) {
        this._vars.requester.Request(models.Category, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Categories, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Categories>, costumize?: Controller.RequestCostumize<models.Categories>) {
        this._vars.requester.Get(models.Categories, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Categories>, costumize?: Controller.RequestCostumize<models.Categories>) {
        this._vars.requester.Get(models.Categories, this._vars.__data.Categories, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.Category): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Categories>): boolean {
        return callback ? callback(this._vars.__data.Categories, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Category>, saveToApp: boolean, saveToServer?: boolean): models.Category {
        var c = new models.Category(basic.New());
        if (saveToApp)
            this._vars.__data.Categories.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.Category, isNew?: boolean, callback?: DBCallback<models.Category>) {
        if (this.Check(data))
            this._vars.requester.Request(models.Category,"SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Category Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Categories.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Category", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.Category, callback: DBCallback<models.Category>) {
        if (!data) return this.ShowInfo('Select one Category PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Category', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.Category,"DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The Category :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Category :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Category :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Category) {
        this._vars.__data.Categories.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Category, isNew: boolean, callback?: DBCallback<models.Category>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Category PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.Category, isNew: boolean, callback?: DBCallback<models.Category>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Category, isNew: boolean, callback?: DBCallback<models.Category>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }

    constructor(vars:basics.vars) {
        super(vars, 'Category.edit');
    }
    getDefaultList() { return this._vars.__data.Categories; }
}