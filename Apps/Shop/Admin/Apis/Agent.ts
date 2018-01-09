import { MyApi,  DBCallback } from './../AdminApis';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
import { basic, net } from '../../../../js/Corelib';
import { basics } from '../../Basics';

export class Agent extends MyApi<models.Agent, models.Agents> {
    protected UpdateData(data: models.Agent, callback?: Controller.RequestCallback<models.Agent>, costumize?: Controller.RequestCostumize<models.Agent>) {
        this._vars.requester.Request(models.Agent, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Agents, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Agents>, costumize?: Controller.RequestCostumize<models.Agents>) {
        this._vars.requester.Get(models.Agents, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Agents>, costumize?: Controller.RequestCostumize<models.Agents>) {
        this._vars.requester.Get(models.Agents, this._vars.__data.Agents, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.Agent): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Agents>): boolean {
        return callback ? callback(this._vars.__data.Agents, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Agent>, saveToApp: boolean, saveToServer?: boolean): models.Agent {
        var c = new models.Agent(basic.New());
        if (saveToApp)
            this._vars.__data.Agents.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.Agent, isNew?: boolean, callback?: DBCallback<models.Agent>) {
        if (this.Check(data))
            this._vars.requester.Request(models.Agent, "SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Agent Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Agents.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Agent", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.Agent, callback?: DBCallback<models.Agent>) {
        if (!data) return this.ShowInfo('Select one Agent PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Agent', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer) {
                this._vars.requester.Request(models.Agent, "DELETE",data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The Agent :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Agent :' + data.toString(), false);
                });
            }
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Agent :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Agent) {
        this._vars.__data.Agents.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Agent,isNew:boolean ,callback?: DBCallback<models.Agent>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Agent PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.Agent, isNew: boolean, callback?: DBCallback<models.Agent>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Agent, isNew: boolean, callback?: DBCallback<models.Agent>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }
    getDefaultList() { return this._vars.__data.Agents; }
    constructor(_vars:basics.vars) {
        super(_vars, 'Agent.edit', {
            templateName: "Agents.table",
            itemTemplateName: null
        });
    }


}