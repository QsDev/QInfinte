import { MyApi, DBCallback,FactureBase } from './../AdminApis';import { basics } from '../../Basics';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
//i//mport { funcs, Common } from './../../Common';
import { basic } from '../../../../js/Corelib';

export class Facture extends FactureBase<models.Facture, models.Factures> {
    

    LoadArticlesOf(data: models.Facture, callback?: DBCallback<models.Facture>): any {
        if (!data) return callback && callback(null, undefined, basics.DataStat.DataCheckError);
        if (!data.IsOpen)
            if (data.Articles == null || !data.Articles.Stat)
                return this.UpdateArticlesOf(data, callback);
         return callback(data, undefined, basics.DataStat.Success);
    }
    UpdateArticlesOf(data: models.Facture, callback?: DBCallback<models.Facture>): any {
        if (!data) return callback && callback(null, false, basics.DataStat.DataCheckError);
        if (data.Articles == null) data.Articles = new models.Articles(data, []);
        else data.Articles.Clear();
        this._vars.requester.Get(models.Articles, data.Articles, data, (d, r, iss) => {
            if (iss) data.Articles.Stat = sdata.DataStat.Updated;
            callback && callback(d.param, false, iss ? basics.DataStat.Success : basics.DataStat.Fail);
        }, null, null, { Id: String(data.Id) });
    }

    protected UpdateData(data: models.Facture, callback?: Controller.RequestCallback<models.Facture>, costumize?: Controller.RequestCostumize<models.Facture>) {
        this._vars.requester.Request(models.Facture, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Factures, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Factures>, costumize?: Controller.RequestCostumize<models.Factures>) {
        this._vars.requester.Get(models.Factures, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Factures>, costumize?: Controller.RequestCostumize<models.Factures>) {
        this._vars.requester.Get(models.Factures, this._vars.__data.Factures, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.Facture): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Factures>): boolean {
        return callback ? callback(this._vars.__data.Factures, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Facture>, saveToApp: boolean, saveToServer?: boolean): models.Facture {
        {}
        var c = new models.Facture(basic.New());
        this._vars.requester.Request(models.SFacture, "CREATE", c, null, (req, isNew, iss) => {
            if (!iss) {
                c.Dispose(); return callback && callback(null, false, basics.DataStat.Fail);
            }
            c.Date = new Date(Date.now());  
            c.IsOpen = true;
            if (saveToApp)
                this._vars.__data.Factures.Add(c);    
            if (callback) callback(c, true, basics.DataStat.Success);
            if (saveToServer)
                if (!callback) throw "callback must be setted when saveToServer is Setted to true";
                else this.Save(c, true, callback);
        });
        return c;
    }
    Save(data: models.Facture, isNew?: boolean, callback?: DBCallback<models.Facture>) {
        if (this.Check(data))
            this._vars.requester.Request(models.Facture,"SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Facture Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Factures.Add(data);

                    try {
                        data.CalcTotal();
                        data.NArticles = data.Articles.Count;
                    } catch (e) {

                    }
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Facture", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }

    Validate(data: models.Facture, isNew?: boolean, callback?: DBCallback<models.Facture>) {

        if (this.Check(data)) {
            if (data)
                this._vars.requester.Request(models.Facture, "VALIDATE", data, { Validate: data.Id }, (s, r, iss) => {
                    if (iss) {
                        UI.InfoArea.push("The SFacture Successfully Saved", true);
                        data.IsValidated = true;
                        try {
                            data.CalcTotal();
                            data.NArticles = data.Articles.Count;
                        } catch (e) {

                        }
                        if (isNew)
                            this._vars.__data.Factures.Add(data);
                        data.Save();
                        if (callback) callback(data, isNew, basics.DataStat.Success);
                        return;
                    } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SFacture", false, 8000);
                    if (callback) callback(data, isNew, basics.DataStat.Fail);
                    data.Undo();
                }, null, null);
        }
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }

    Delete(saveToServer: boolean, data: models.Facture, callback: DBCallback<models.Facture>) {
        if (!data) return this.ShowInfo('Select one Facture PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Facture', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.Facture,"DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The Facture :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Facture :' + data.toString(), false);
                }, null, null, { Id: String(data.Id) });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Facture :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Facture) {
        this._vars.__data.Factures.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Facture, isNew: boolean, callback?: DBCallback<models.Facture>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Facture PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }

    Print(data: models.Facture, callback?: DBCallback<models.Facture>): any {
        UI.Modal.ShowDialog("Confirmation", "Do you want realy to Print this Facture", (e) => {
            if (e.Result === UI.MessageResult.ok)
                this._vars.requester.Request(models.Facture, "PRINT", data, data, (req, json, iss) => {
                    if (iss) {
                        UI.InfoArea.push("You Facture Printed Successfully");
                    } else
                        UI.InfoArea.push("UnResolved Stat When We Print the facture " + data.Ref);
                });
        }, "PRINT");
        
    }

    OnModalSuccess(data: models.Facture, isNew: boolean, callback?: DBCallback<models.Facture>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Facture, isNew: boolean, callback?: DBCallback<models.Facture>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }
    getDefaultList() { return this._vars.__data.Factures; }
    constructor(_vars: basics.vars) {
        super(_vars, 'Facture.edit');
    }
}