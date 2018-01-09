import { MyApi, DBCallback, ListTemplateName } from './../AdminApis';import { basics } from '../../Basics';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
import { basic, encoding } from '../../../../js/Corelib';

export class Versment extends MyApi<models.Versment, models.Versments> {
    protected UpdateData(data: models.Versment, callback?: Controller.RequestCallback<models.Versment>, costumize?: Controller.RequestCostumize<models.Versment>) {
        this._vars.requester.Request(models.Versment, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Versments, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Versments>, costumize?: Controller.RequestCostumize<models.Versments>) {
        this._vars.requester.Get(models.Versments, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Versments>, costumize?: Controller.RequestCostumize<models.Versments>) {
        this._vars.requester.Get(models.Versments, this._vars.__data.Versments, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.Versment): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Versments>): boolean {
        return callback ? callback(this._vars.__data.Versments, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Versment>, saveToApp: boolean, saveToServer?: boolean): models.Versment {
        var c = new models.Versment(basic.New());
        if (saveToApp)
            this._vars.__data.Versments.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.Versment, isNew?: boolean, callback?: DBCallback<models.Versment>) {
        if (this.Check(data))
            this._vars.requester.Request(models.Versment,"SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Versment Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Versments.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Versment", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.Versment, callback: DBCallback<models.Versment>) {
        if (!data) return this.ShowInfo('Select one Versment PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Versment', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.Versment, "DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(iss ? 'The Versment :' + data.toString() + '  Deleted!! ' : 'Could Not Delete The Versment :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Versment :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Versment) {
        this._vars.__data.Versments.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Versment, isNew: boolean, callback?: DBCallback<models.Versment>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Versment PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.Versment, isNew: boolean, callback?: DBCallback<models.Versment>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Versment, isNew: boolean, callback?: DBCallback<models.Versment>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }
    getDefaultList() { return this._vars.__data.Versments; }

    VerserTo(facture: models.Facture, client: models.Client, callback?: DBCallback<models.Versment>, montant?: number) {        
        client = client || (facture && facture.Client);
        if (facture && facture.IsOpen)
            return UI.Modal.ShowDialog("Error", 'Close the facture for you can make a versment');
        if (!client) {
            this._vars.apis.Client.Select((s, r, t) => {
                if (t === UI.MessageResult.ok) {
                    if (r) this.VerserTo(facture, r, callback);
                    UI.InfoArea.push("You are'nt select any fournisseur");
                    return this.VerserTo(facture, client, callback);
                }
                UI.InfoArea.push("Versment est abondonnee");
                callback && callback(null, false, basics.DataStat.OperationCanceled);
            }, client);
        }
        this.New((data, isNew, error) => {
            if (error == basics.DataStat.Success) {
                data.Client = client;
                data.Facture = facture;
                data.Montant = montant || 0;
                this.Edit(true, data, isNew, (data, isNew, error) => {
                    if (error === basics.DataStat.Success) {
                        this._vars.__data.Versments.Add(data);
                        data.Client.VersmentTotal += data.Montant;
                    } else {
                        UI.InfoArea.push("Versment est annulé");
                    }
                    callback && callback(data, isNew, error);
                });
            } else {
                UI.InfoArea.push("An Expected error while creating a Versment ");
                callback && callback(data, isNew, error);
            }
        }, false, false);
    }
    Regler(facture?: models.Facture, client?: models.Client, callback?: DBCallback<models.Versment>) {
        if (!facture && !client) return UI.InfoArea.push("Vous devez au moin selectioner soit un fournisseur au une facture.");
        if (facture) {
            if (facture.IsOpen) return UI.Modal.ShowDialog("Error", 'Close the facture for you can make a versment');
            var results = new models.Versments(facture);
            this._vars.requester.Request(models.Versments, "VFacture", results, facture as any, (c, d, f) => {
                facture.Recalc(results);
                if (facture.Sold != 0)
                    this.VerserTo(facture, client, callback, facture.Sold);
            });
        }
        else {
            this._vars.apis.Client.UpdateClient(client, (d, iss) => { 
                if (!iss) UI.InfoArea.push("Une Error Produit Quant le versment est calcer");
                this.VerserTo(facture, client, callback, client.SoldTotal);
            })
            
        }
    }
    Get(id: number) {
        var c = models.Versment.getById(id, models.Versment);
        if (!c || c.Stat <= sdata.DataStat.Modified) {
            c = c || new models.Versment(id);
            encoding.SerializationContext.GlobalContext.reset();
            c.FromJson(id, encoding.SerializationContext.GlobalContext, true);
        }
        return c;
    }

    OpenVersmentsOfClient(client: models.Client, callback: (result: models.Versments, selected: models.Versment, client: models.Client, success: boolean) => void) {        
        var results = new models.Versments(client);
        this._vars.requester.Request(models.Versments, "VClient", results, client as any, (c, d, f) => {
            if (f)
                this.OpenList(results, (a, b, c) => {
                    callback && callback(results, b, client, c === UI.MessageResult.ok);
                });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });

    }


    OpenVersmentsOfFacture(facture: models.Facture, callback: (result: models.Versments, selected: models.Versment, facture: models.Facture, success: boolean) => void) {
        var results = new models.Versments(facture);
        this._vars.requester.Request(models.Versments, "VFacture", results, facture as any, (c, d, f) => {
            if (f)
                this.OpenList(results, (modal, selectedItem, result) => {
                    callback && callback(results, selectedItem, facture, result === UI.MessageResult.ok);
                });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });
    }
    OpenVersmentsOfPour(client: models.Client, callback: (result: models.Versments, selected: models.Versment, client: models.Client, success: boolean) => void) {
        var results = new models.Versments(client);
        this._vars.requester.Request(models.Versments, "VPour", results, client as any, (c, d, f) => {
            if (f)
                this.OpenList(results, (a, b, c) => {
                    callback && callback(results, b, client, c === UI.MessageResult.ok);
                });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
            
        });
    }
    OpenVersmentsWithObservation(Observation: string, callback: (result: models.Versments, selected: models.Versment, Observation: string, success: boolean) => void) {

        var results = new models.Versments(null);
        this._vars.requester.Request(models.Versments, "VObservation", results, { Observation: Observation }, (c, d, f) => {
            if (f)
                this.OpenList(results, (a, b, c) => {
                    callback && callback(results, b, Observation, c === UI.MessageResult.ok);
                });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });
    }

    OpenVersmentsWithPeriod(Period: { From: Date, To: Date }, callback: (result: models.Versments, selected: models.Versment, Observation: { From: Date, To: Date }, success: boolean) => void) {

        var results = new models.Versments(null);
        this._vars.requester.Request(models.Versments, "VObservation", results, Period as any, (c, d, f) => {
            if (f)
                this.OpenList(results, (a, b, c) => {
                    callback && callback(results, b, Period, c === UI.MessageResult.ok);
                });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });
    }
    constructor(_vars: basics.vars) {
        super(_vars, 'Versment.cart', <ListTemplateName>{ templateName: 'Versment.table', itemTemplateName: undefined });
    }
}