import { MyApi,  DBCallback } from './../AdminApis';
import { UI } from '../../../../js/UI';
import { models } from '../../../../js/Models';
import { sdata, Controller } from '../../../../js/System';
//
import { basic } from '../../../../js/Corelib';
import { basics } from '../../Basics';

export class Article extends MyApi<models.Article, models.Articles> {
    protected UpdateData(data: models.Article, callback?: Controller.RequestCallback<models.Article>, costumize?: Controller.RequestCostumize<models.Article>) {
        this._vars.requester.Request(models.Article, "UPDATE", data, data as any, callback, costumize);
    }
    protected UpdateList(list: models.Articles, ofOwner: sdata.DataRow, callback?: Controller.RequestCallback<models.Articles>, costumize?: Controller.RequestCostumize<models.Articles>) {
        this._vars.requester.Get(models.Articles, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
    }
    protected UpdateAll(callback?: Controller.RequestCallback<models.Articles>, costumize?: Controller.RequestCostumize<models.Articles>) {
        this._vars.requester.Get(models.Articles, this._vars.__data.Articles, { FromDate: 0 }, callback, costumize);
    }

    Check(data: models.Article): boolean {
        return true;
    }
    Avaible(callback: DBCallback<models.Articles>): boolean {
        return callback ? callback(this._vars.__data.Articles, undefined, basics.DataStat.Fail) || true : true;
    }
    New(callback: DBCallback<models.Article>, saveToApp: boolean, saveToServer?: boolean): models.Article {
        var c = new models.Article(basic.New());
        if (saveToApp)
            this._vars.__data.Articles.Add(c);
        if (callback) callback(c, true, basics.DataStat.Success);
        if (saveToServer)
            if (!callback) throw "callback must be setted when saveToServer is Setted to true";
            else this.Save(c, true, callback);
        else
            return c;
    }
    Save(data: models.Article, isNew?: boolean, callback?: DBCallback<models.Article>) {
        if (this.Check(data))
            this._vars.requester.Request(models.Article, "SAVE", data, null, (s, r, iss) => {
                if (iss) {
                    UI.InfoArea.push("The Article Successfully Saved", true);
                    if (isNew)
                        this._vars.__data.Articles.Add(data);
                    data.Save();
                    if (callback) callback(data, isNew, basics.DataStat.Success);
                    return;
                } else UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Article", false, 8000);
                if (callback) callback(data, isNew, basics.DataStat.Fail);
                data.Undo();
            });
        else if (callback) callback(data, isNew, basics.DataStat.DataCheckError);
        return true;
    }
    Delete(saveToServer: boolean, data: models.Article, callback: DBCallback<models.Article>) {
        if (!data) return this.ShowInfo('Select one Article PLEASE;');
        UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Article', (xx) => {
            if (xx.Result !== UI.MessageResult.ok) return callback && callback(data, undefined, basics.DataStat.OperationCanceled);
            if (saveToServer)
                this._vars.requester.Request(models.Article, "DELETE", data, data as any, (s, r, iss) => {
                    if (iss) this.deleteData(data);
                    if (!callback || !callback(data, false, iss ? basics.DataStat.Success : basics.DataStat.Fail))
                        this.ShowInfo(
                            iss ?
                                'The Article :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Article :' + data.toString(), false);
                });
            else {
                this.deleteData(data);
                if (!callback || !callback(data, false, basics.DataStat.Success))
                    this.ShowInfo(
                        'The Article :' + data.toString() + '  Deleted!! from App ', true);
            }
        }, 'DELETE', "Let's");
    }
    private deleteData(data: models.Article) {
        this._vars.__data.Articles.Remove(data);
    }
    Edit(saveToServer: boolean, data: models.Article, isNew: boolean, callback?: DBCallback<models.Article>) {
        if (!data) {
            if (!callback || !callback(data, isNew, basics.DataStat.DataCheckError))
                UI.InfoArea.push('Select one Article PLEASE;');
        }
        else {
            this.EditData.edit(data, false, this.getAction(callback));
        }
    }


    OnModalSuccess(data: models.Article, isNew: boolean, callback?: DBCallback<models.Article>) {
        return this.Save(data, isNew, callback);
    }
    OnModalError(cat: models.Article, isNew: boolean, callback?: DBCallback<models.Article>) {
        UI.InfoArea.push("The Modification Aborded", true, 2500);
        if (callback) return callback(cat, isNew, basics.DataStat.OperationCanceled);
        return false;
    }

    constructor(_vars:basics.vars) {
        super(_vars, 'Article.cart');
    }
    getDefaultList() { return this._vars.__data.Articles; }
    
}