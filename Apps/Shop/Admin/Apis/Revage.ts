import { MyApi, DBCallback } from './../AdminApis';import { basics } from '../../Basics';
import {UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
//i//mport { funcs, Common } from './../../Common';
import { basic } from '../../../../js/Corelib';

export class Revage extends MyApi<models.FakePrice, models.FakePrices>
{
    protected UpdateData(data: models.FakePrice, callback?: Controller.RequestCallback<models.FakePrice>, costumize?: Controller.RequestCostumize<models.FakePrice>) {
        this._vars.requester.Request(models.FakePrice, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.FakePrices, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.FakePrices>, costumize?: Controller.RequestCostumize<models.FakePrices>) {
        this._vars.requester.Get(models.FakePrices, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.FakePrices>, costumize?: Controller.RequestCostumize<models.FakePrices>) {
        this._vars.requester.Get(models.FakePrices, this._vars.__data.Prices, { FromDate: 0 }, callback, costumize);
    }
    
    Check(data: models.FakePrice): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.FakePrices>): boolean {
        return callback ? callback(this._vars.__data.Prices, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.FakePrice>, saveToApp: boolean, saveToServer?: boolean): models.FakePrice {
        var c = new models.FakePrice(basic.New());
        if (saveToApp)
            this._vars.__data.Prices.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.FakePrice, isNew?: boolean, callback?: DBCallback<models.FakePrice>) {
        if (this.Check(data))
            this._vars.requester.Request(models.FakePrice, "SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The FakePrice Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Prices.Add(data);
                    data.ApplyPrice = null;
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The FakePrice", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.FakePrice, callback: DBCallback<models.FakePrice>) {
        if (!data) return this.ShowInfo('Select one Revage PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Revage', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.FakePrice,"DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The FakePrice :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The FakePrice :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The FakePrice :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.FakePrice) {
        this._vars.__data.Prices.Remove(data);
        if (data.Facture && data.Facture.Articles) (<models.FakePrices>data.Facture.Articles).Remove(data);
    }
    Edit(saveToServer: boolean, data: models.FakePrice, isNew: boolean, callback?: DBCallback<models.FakePrice>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Revage PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }
    
    
    OnModalSuccess(data: models.FakePrice, isNew: boolean, callback?: DBCallback<models.FakePrice>) {
        if (data.ApplyPrice != null) {
            var msgCallback = (xx) => {
                if (xx.Result !== UI.MessageResult.ok)
                    data.ApplyPrice = null;
                this.Save(data, isNew, (r, s, d) => {                    
                    if (callback && !callback(r, s, d)) {
                        if (d == basics.DataStat.Success) {
                            data.ApplyPrice = null;
                            data.Save();
                        } else data.Undo();
                    }
                });
            }
            UI.Modal.ShowDialog("Confirmation", "Do you want realy to change the Product Price",msgCallback, 'Save', 'Ignore');
            return true;
        }
        else
            return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.FakePrice, isNew: boolean, callback?: DBCallback<models.FakePrice>) {
        cat.ApplyPrice = null;
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }
    getDefaultList() { return this._vars.__data.Prices; }
    constructor(_vars:basics.vars) {
        super(_vars, 'Price.edit');
    }

}