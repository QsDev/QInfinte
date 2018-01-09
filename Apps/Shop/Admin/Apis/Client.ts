import { MyApi, DBCallback } from './../AdminApis';import { basics } from '../../Basics';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
//i//mport { funcs, Common } from './../../Common';
import { basic } from '../../../../js/Corelib';
import Client1 = require("../../../../js/Client");

export class Client extends MyApi<models.Client, models.Costumers> {
    protected UpdateData(data: models.Client, callback?: Controller.RequestCallback<models.Client>, costumize?: Controller.RequestCostumize<models.Client>) {
        this._vars.requester.Request(models.Client, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Costumers, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Costumers>, costumize?: Controller.RequestCostumize<models.Costumers>) {
        this._vars.requester.Get(models.Costumers, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Costumers>, costumize?: Controller.RequestCostumize<models.Costumers>) {
        this._vars.requester.Get(models.Costumers, this._vars.__data.Costumers, { FromDate: 0 }, callback, costumize);
    }
    public UpdateClient(data: models.Client, callback?: (data: models.Client, iss: boolean) => void) {
        this._vars.requester.Request(models.Client, "UPDATE", data, data as any, (req, json, iss) => { callback && callback(data, iss); });
    }
    Check(data: models.Client): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Costumers>): boolean {
        return callback ? callback(this._vars.__data.Costumers, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Client>, saveToApp: boolean, saveToServer?: boolean): models.Client {
        var c = new models.Client(basic.New());
        if (saveToApp)
            this._vars.__data.Costumers.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.Client, isNew?: boolean, callback?: DBCallback<models.Client>) {
        if (this.Check(data))
            this._vars.requester.Request(models.Client,"SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Client Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Costumers.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Client", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.Client, callback: DBCallback<models.Client>) {
        if (!data) return this.ShowInfo('Select one Client PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Client', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.Client,"DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The Client :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Client :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Client :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Client) {
        this._vars.__data.Costumers.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Client, isNew: boolean, callback?: DBCallback<models.Client>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Client PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.Client, isNew: boolean, callback?: DBCallback<models.Client>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Client, isNew: boolean, callback?: DBCallback<models.Client>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }

    constructor(_vars: basics.vars) {
        super(_vars, 'Client.edit', {
            templateName: "Client.table1",
            itemTemplateName: null
        });
    }
    getDefaultList() { return this._vars.__data.Costumers; }
    
}