import { MyApi, DBCallback, ListTemplateName } from './../AdminApis';import { basics } from '../../Basics';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
//i//mport { funcs, Common } from './../../Common';
import { basic, encoding } from '../../../../js/Corelib';

export class SVersment extends MyApi<models.SVersment, models.SVersments> {
    protected UpdateData(data: models.SVersment, callback?: Controller.RequestCallback<models.SVersment>, costumize?: Controller.RequestCostumize<models.SVersment>) {
        this._vars.requester.Request(models.SVersment, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.SVersments, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.SVersments>, costumize?: Controller.RequestCostumize<models.SVersments>) {
        this._vars.requester.Get(models.SVersments, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.SVersments>, costumize?: Controller.RequestCostumize<models.SVersments>) {
        this._vars.requester.Get(models.SVersments, this._vars.__data.SVersments, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.SVersment): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.SVersments>): boolean {
        return callback ? callback(this._vars.__data.SVersments, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.SVersment>, saveToApp: boolean, saveToServer?: boolean): models.SVersment {
        var c = new models.SVersment(basic.New());
        if (saveToApp)
            this._vars.__data.SVersments.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.SVersment, isNew?: boolean, callback?: DBCallback<models.SVersment>) {
        if (this.Check(data))
            this._vars.requester.Request(models.SVersment,"SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The SVersment Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.SVersments.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SVersment", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.SVersment, callback: DBCallback<models.SVersment>) {
        if (!data) return this.ShowInfo('Select one SVersment PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this SVersment', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.SVersment,"DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The SVersment :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The SVersment :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The SVersment :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.SVersment) {
        this._vars.__data.SVersments.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.SVersment, isNew: boolean, callback?: DBCallback<models.SVersment>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one SVersment PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.SVersment, isNew: boolean, callback?: DBCallback<models.SVersment>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.SVersment, isNew: boolean, callback?: DBCallback<models.SVersment>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }
    VerserTo(facture: models.SFacture, fournisseur: models.Fournisseur, callback?: DBCallback<models.SVersment>, montant?: number) {
        fournisseur = fournisseur || (facture && facture.Fournisseur);
        if (!fournisseur) {
            this._vars.apis.Fournisseur.Select((s, r, t) => {
                if (t === UI.MessageResult.ok) {
                    if (r) this.VerserTo(facture, r, callback);
                    UI.InfoArea.push("You are'nt select any fournisseur");
                    return this.VerserTo(facture, fournisseur, callback);
                }
                UI.InfoArea.push("Versment est abondonnee");
                callback && callback(null, false, basics.DataStat.OperationCanceled);
            }, fournisseur);
        }
        this.New((data, isNew, error) => {
            if (error == basics.DataStat.Success) {
                data.Fournisseur = fournisseur;
                data.Facture = facture;
                data.Montant = montant || 0;
                this.Edit(true, data, isNew, (data, isNew, error) => {
                    if (error === basics.DataStat.Success) {
                        this._vars.__data.SVersments.Add(data);
                        data.Fournisseur.VersmentTotal += data.Montant;
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
    Regler(facture?: models.SFacture, fournisseur?: models.Fournisseur, callback?: DBCallback<models.SVersment>) {
        this.OpenSVersmentsOfFacture
        if (!facture && !fournisseur) return UI.InfoArea.push("Vous devez au moin selectioner soit un fournisseur au une facture.");
        if (facture) {
            var results = new models.SVersments(facture);
            this._vars.requester.Request(models.SVersments, "VFacture", results, facture as any, (c, d, f) => {
                facture.Recalc(results);
                if (facture.Sold != 0)
                    this.VerserTo(facture, fournisseur, callback, facture.Sold);
            });
        }
        else {
            this.VerserTo(facture, fournisseur, callback, fournisseur.SoldTotal);
        }
    }
    Get(id: number/*, callback?: DBCallback<models.Versment>*/) {
        var c = models.SVersment.getById(id, models.SVersment);
        if (!c) {
            c = new models.SVersment(id);
            encoding.SerializationContext.GlobalContext.reset();
            c.FromJson(id, encoding.SerializationContext.GlobalContext, true);
        }
        return c;
    }
    getDefaultList() { return this._vars.__data.SVersments; }




    /*================================================================================================================*/


    OpenSVersmentsOfFournisseur(fournisseur: models.Fournisseur, callback: (result: models.SVersments, selected: models.SVersment, fournisseur: models.Fournisseur, success: boolean) => void) {
        var results = new models.SVersments(fournisseur);
        this._vars.requester.Request(models.SVersments, "VFournisseur", results, fournisseur as any, (c, d, f) => {
            if (f)
                this.OpenList(results, (a, b, c) => {
                    callback && callback(results, b, fournisseur, c === UI.MessageResult.ok);
                });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });
    }

    OpenSVersmentsOfFacture(facture: models.SFacture, callback: (result: models.SVersments, selected: models.SVersment, facture: models.SFacture, success: boolean) => void) {
        var results = new models.SVersments(facture);
        this._vars.requester.Request(models.SVersments, "VFacture", results, facture as any, (c, d, f) => {
            if (f)
                this.OpenList(results, (modal, selectedItem, result) => {
                    callback && callback(results, selectedItem, facture, result === UI.MessageResult.ok);
                });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });
    }
    
    OpenSVersmentsWithObservation(Observation: string, callback: (result: models.SVersments, selected: models.SVersment, Observation: string, success: boolean) => void) {
        var results = new models.SVersments(null);
        this._vars.requester.Request(models.SVersments, "VObservation", results, { Observation: Observation }, (c, d, f) => {
            if (f) this.OpenList(results, (a, b, c) => {
                callback && callback(results, b, Observation, c === UI.MessageResult.ok);
            });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });
    }

    OpenSVersmentsWithPeriod(Period: { From: Date, To: Date }, callback: (result: models.SVersments, selected: models.SVersment, Observation: { From: Date, To: Date }, success: boolean) => void) {
        var results = new models.SVersments(null);
        this._vars.requester.Request(models.SVersments, "VObservation", results, Period as any, (c, d, f) => {
            if (f) this.OpenList(results, (a, b, c) => {
                callback && callback(results, b, Period, c === UI.MessageResult.ok);
            });
            else UI.InfoArea.push("The Server Respond With UnExpected Error");
        });
    }

    /*================================================================================================================*/
    
    constructor(_vars:basics.vars) {
        super(_vars, 'SVersment.cart', <ListTemplateName>{ templateName: 'SVersment.list', itemTemplateName: undefined });
    }

 
}