import { MyApi, DBCallback,FactureBase } from './../AdminApis';import { basics } from '../../Basics';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata,sdata as xdata, Controller } from '../../../../js/System';
import { basic, net } from '../../../../js/Corelib';


export class SFacture extends FactureBase<models.SFacture, models.SFactures> {
    UpdateArticlesOf(data: models.SFacture, callback?: DBCallback<models.SFacture>): any {
        if (!data) return callback && callback(null, false, basics.DataStat.DataCheckError);
        if (data.Articles == null) data.Articles = new models.FakePrices(data, []);
        else data.Articles.Clear();
        this._vars.requester.Get(models.FakePrices, data.Articles, data, (d, r, iss) => {
            if (iss) data.Articles.Stat = sdata.DataStat.Updated;
            callback && callback(d.param, false, iss ? basics.DataStat.Success : basics.DataStat.Fail);
        }, null, null, { Id: String(data.Id) });
    }
    LoadArticlesOf(data: models.SFacture, callback?: DBCallback<models.SFacture>): any {
        if (!data) return callback(null, undefined, basics.DataStat.DataCheckError);
        if (!data.IsOpen)
            if (data.Articles == null || !data.Articles.Stat)
                return this.UpdateArticlesOf(data, callback);
        
        return callback(data, undefined, basics.DataStat.Success);
    }

    protected UpdateData(data: models.SFacture, callback?: Controller.RequestCallback<models.SFacture>, costumize?: Controller.RequestCostumize<models.SFacture>) {
        this._vars.requester.Request(models.SFacture, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.SFactures, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.SFactures>, costumize?: Controller.RequestCostumize<models.SFactures>) {
        this._vars.requester.Get(models.SFactures, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.SFactures>, costumize?: Controller.RequestCostumize<models.SFactures>) {
        this._vars.requester.Get(models.SFactures, this._vars.__data.SFactures, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.SFacture): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.SFactures>): boolean {
        return callback ? callback(this._vars.__data.SFactures, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.SFacture>, saveToApp: boolean, saveToServer?: boolean): models.SFacture {
        {}
        var c = new models.SFacture();
        this._vars.requester.Request(models.SFacture, "CREATE", c, null, (req, isNew, iss) => {
            if (!iss) { c.Dispose(); return callback && callback(null, false, basics.DataStat.Fail);  }
            c.Date = new Date(Date.now());
            
            c.IsOpen = true;
            if (saveToApp)
                this._vars.__data.SFactures.Add(c);
            if (callback) callback(c, true, basics.DataStat.Success);
            if (saveToServer)
                if (!callback) throw "callback must be setted when saveToServer is Setted to true";
                else this.Save(c, true, callback);
        });
        return c;
    }
    Save(data: models.SFacture, isNew?: boolean, callback?: DBCallback<models.SFacture>) {
        if (this.Check(data))
            this._vars.requester.Request(models.SFacture, 'SAVE', data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The SFacture Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.SFactures.Add(data);
                    try {
                        data.CalcTotal();
                        data.NArticles = data.Articles.Count;
                    } catch (e) {

                    }
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SFacture", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.SFacture, callback: DBCallback<models.SFacture>) {
        if (!data) return this.ShowInfo('Select one SFacture PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this SFacture', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer) {
                this._vars.requester.Request(models.SFacture, "DELETE", data, data as any,
                    (s, r, iss) => {
                        if (iss) this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                            this.ShowInfo(
                                iss ?
                                    'The SFacture :' + data.toString() + '  Deleted!! ' :
                                    'Could Not Delete The SFacture :' + data.toString(), false);
                    }
                );
            }
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The SFacture :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.SFacture) {
        this._vars.__data.SFactures.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.SFacture, isNew: boolean, callback?: DBCallback<models.SFacture>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one SFacture PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.SFacture, isNew: boolean, callback?: DBCallback<models.SFacture>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.SFacture, isNew: boolean, callback?: DBCallback<models.SFacture>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }

    constructor(_vars:basics.vars) {
        super(_vars, 'SSFacture.edit');
    }
    Print(data: models.SFacture, callback?: DBCallback<models.SFacture>) {
    }
    Validate(data: models.SFacture, isNew?: boolean, callback?: DBCallback<models.SFacture>) {
        if (this.Check(data)) {
            this._vars.requester.Request(models.SFacture, "VALIDATE", data, { Validate: data.Id }, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The SFacture Successfully Saved", true);
                    data.IsValidated = true;
                    
                    if (isNew) 
                        this._vars.__data.SFactures.Add(data);
                    try {
                        data.CalcTotal();
                        data.NArticles = data.Articles.Count;
                    } catch (e) {

                    }
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SFacture", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        }
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    OpenFacture(data: models.SFacture, callback: DBCallback<models.SFacture>) {
        this._vars.requester.Request(models.SFacture, "OPEN", data, data as any, (c, r, iss) => {
            callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail);
        }, null, null);
    }
    CloseFacture(data: models.SFacture, callback: DBCallback<models.SFacture>) {
        this._vars.requester.Request(models.SFacture, "CLOSE", data, data as any, (c, r, iss) => {            
            if (iss)
                callback(data, false, basics.DataStat.Success);
            else callback(data, false, basics.DataStat.Fail);
        });
    }
    IsFactureOpen(data: models.SFacture, callback: DBCallback<models.SFacture>) {
        this._vars.requester.Request(models.SFacture, "ISOPEN", data, data as any, (c, r, iss) => {
            
            if (iss)
                callback(data, false, basics.DataStat.Success);
            else callback(data, false, basics.DataStat.Fail);
        });
    }
    getDefaultList() { return this._vars.__data.SFactures; }
}