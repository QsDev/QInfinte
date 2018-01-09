import { MyApi, DBCallback } from './../AdminApis';import { basics } from '../../Basics';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
//i//mport { funcs, Common } from './../../Common';
import { basic } from '../../../../js/Corelib';

export class Fournisseur extends MyApi<models.Fournisseur, models.Fournisseurs> {
    protected UpdateData(data: models.Fournisseur, callback?: Controller.RequestCallback<models.Fournisseur>, costumize?: Controller.RequestCostumize<models.Fournisseur>) {
        this._vars.requester.Request(models.Fournisseur, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Fournisseurs, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Fournisseurs>, costumize?: Controller.RequestCostumize<models.Fournisseurs>) {
        this._vars.requester.Get(models.Fournisseurs, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Fournisseurs>, costumize?: Controller.RequestCostumize<models.Fournisseurs>) {
        this._vars.requester.Get(models.Fournisseurs, this._vars.__data.Fournisseurs, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.Fournisseur): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Fournisseurs>): boolean {
        return callback ? callback(this._vars.__data.Fournisseurs, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Fournisseur>, saveToApp: boolean, saveToServer?: boolean): models.Fournisseur {
        var c = new models.Fournisseur(basic.New());
        if (saveToApp)
            this._vars.__data.Fournisseurs.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.Fournisseur, isNew?: boolean, callback?: DBCallback<models.Fournisseur>) {
        if (this.Check(data))
        {
            this._vars.requester.Request(models.Fournisseur, "SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Fournisseur Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Fournisseurs.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Fournisseur", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        }
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }

    Delete(saveToServer: boolean, data: models.Fournisseur, callback: DBCallback<models.Fournisseur>) {
        if (!data) return this.ShowInfo('Select one Fournisseur PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Fournisseur', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.Fournisseur,"DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The Fournisseur :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Fournisseur :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Fournisseur :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Fournisseur) {
        this._vars.__data.Fournisseurs.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Fournisseur, isNew: boolean, callback?: DBCallback<models.Fournisseur>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Fournisseur PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.Fournisseur, isNew: boolean, callback?: DBCallback<models.Fournisseur>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Fournisseur, isNew: boolean, callback?: DBCallback<models.Fournisseur>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }


    _tableData: UI.Modals.ModalList<models.Client>;
    TableData(): UI.Modals.ModalList<models.Client> {
        if (!this._tableData)
            this._tableData = new UI.Modals.ModalList(this._vars.__data.Costumers, 'Client.table1', undefined);

        return this._tableData;
    }  
    getDefaultList() { return this._vars.__data.Fournisseurs; }
    constructor(_vars: basics.vars) {
        //
        super(_vars, 'Fournisseur.edit', {
            templateName: "Fournisseur.table",
            itemTemplateName: null
        });
    }
}