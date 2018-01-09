var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./../AdminApis", "../../Basics", "../../../../js/UI", "../../../../js/Models", "../../../../js/System", "../../../../js/Corelib"], function (require, exports, AdminApis_1, Basics_1, UI_1, Models_1, System_1, Corelib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Facture = /** @class */ (function (_super) {
        __extends(Facture, _super);
        function Facture(_vars) {
            return _super.call(this, _vars, 'Facture.edit') || this;
        }
        Facture.prototype.LoadArticlesOf = function (data, callback) {
            if (!data)
                return callback && callback(null, undefined, Basics_1.basics.DataStat.DataCheckError);
            if (!data.IsOpen)
                if (data.Articles == null || !data.Articles.Stat)
                    return this.UpdateArticlesOf(data, callback);
            return callback(data, undefined, Basics_1.basics.DataStat.Success);
        };
        Facture.prototype.UpdateArticlesOf = function (data, callback) {
            if (!data)
                return callback && callback(null, false, Basics_1.basics.DataStat.DataCheckError);
            if (data.Articles == null)
                data.Articles = new Models_1.models.Articles(data, []);
            else
                data.Articles.Clear();
            this._vars.requester.Get(Models_1.models.Articles, data.Articles, data, function (d, r, iss) {
                if (iss)
                    data.Articles.Stat = System_1.sdata.DataStat.Updated;
                callback && callback(d.param, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail);
            }, null, null, { Id: String(data.Id) });
        };
        Facture.prototype.UpdateData = function (data, callback, costumize) {
            this._vars.requester.Request(Models_1.models.Facture, "UPDATE", data, data, callback, costumize);
        };
        Facture.prototype.UpdateList = function (list, ofOwner, callback, costumize) {
            this._vars.requester.Get(Models_1.models.Factures, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
        };
        Facture.prototype.UpdateAll = function (callback, costumize) {
            this._vars.requester.Get(Models_1.models.Factures, this._vars.__data.Factures, { FromDate: 0 }, callback, costumize);
        };
        Facture.prototype.Check = function (data) {
            return true;
        };
        Facture.prototype.Avaible = function (callback) {
            return callback ? callback(this._vars.__data.Factures, undefined, Basics_1.basics.DataStat.Fail) || true : true;
        };
        Facture.prototype.New = function (callback, saveToApp, saveToServer) {
            var _this = this;
            { }
            var c = new Models_1.models.Facture(Corelib_1.basic.New());
            this._vars.requester.Request(Models_1.models.SFacture, "CREATE", c, null, function (req, isNew, iss) {
                if (!iss) {
                    c.Dispose();
                    return callback && callback(null, false, Basics_1.basics.DataStat.Fail);
                }
                c.Date = new Date(Date.now());
                c.IsOpen = true;
                if (saveToApp)
                    _this._vars.__data.Factures.Add(c);
                if (callback)
                    callback(c, true, Basics_1.basics.DataStat.Success);
                if (saveToServer)
                    if (!callback)
                        throw "callback must be setted when saveToServer is Setted to true";
                    else
                        _this.Save(c, true, callback);
            });
            return c;
        };
        Facture.prototype.Save = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data))
                this._vars.requester.Request(Models_1.models.Facture, "SAVE", data, null, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The Facture Successfully Saved", true);
                        if (isNew)
                            _this._vars.__data.Factures.Add(data);
                        try {
                            data.CalcTotal();
                            data.NArticles = data.Articles.Count;
                        }
                        catch (e) {
                        }
                        data.Save();
                        if (callback)
                            callback(data, isNew, Basics_1.basics.DataStat.Success);
                        return;
                    }
                    else
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Facture", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        Facture.prototype.Validate = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data)) {
                if (data)
                    this._vars.requester.Request(Models_1.models.Facture, "VALIDATE", data, { Validate: data.Id }, function (s, r, iss) {
                        if (iss) {
                            UI_1.UI.InfoArea.push("The SFacture Successfully Saved", true);
                            data.IsValidated = true;
                            try {
                                data.CalcTotal();
                                data.NArticles = data.Articles.Count;
                            }
                            catch (e) {
                            }
                            if (isNew)
                                _this._vars.__data.Factures.Add(data);
                            data.Save();
                            if (callback)
                                callback(data, isNew, Basics_1.basics.DataStat.Success);
                            return;
                        }
                        else
                            UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SFacture", false, 8000);
                        if (callback)
                            callback(data, isNew, Basics_1.basics.DataStat.Fail);
                        data.Undo();
                    }, null, null);
            }
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        Facture.prototype.Delete = function (saveToServer, data, callback) {
            var _this = this;
            if (!data)
                return this.ShowInfo('Select one Facture PLEASE;');
            UI_1.UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Facture', function (xx) {
                if (xx.Result !== UI_1.UI.MessageResult.ok)
                    return callback && callback(data, undefined, Basics_1.basics.DataStat.OperationCanceled);
                if (saveToServer)
                    _this._vars.requester.Request(Models_1.models.Facture, "DELETE", data, data, function (s, r, iss) {
                        if (iss)
                            _this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail))
                            _this.ShowInfo(iss ?
                                'The Facture :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Facture :' + data.toString(), false);
                    }, null, null, { Id: String(data.Id) });
                else {
                    _this.deleteData(data);
                    if (!callback || !callback(data, false, Basics_1.basics.DataStat.Success))
                        _this.ShowInfo('The Facture :' + data.toString() + '  Deleted!! from App ', true);
                }
            }, 'DELETE', "Let's");
        };
        Facture.prototype.deleteData = function (data) {
            this._vars.__data.Factures.Remove(data);
        };
        Facture.prototype.Edit = function (saveToServer, data, isNew, callback) {
            if (!data) {
                if (!callback || !callback(data, isNew, Basics_1.basics.DataStat.DataCheckError))
                    UI_1.UI.InfoArea.push('Select one Facture PLEASE;');
            }
            else {
                this.EditData.edit(data, false, this.getAction(callback));
            }
        };
        Facture.prototype.Print = function (data, callback) {
            var _this = this;
            UI_1.UI.Modal.ShowDialog("Confirmation", "Do you want realy to Print this Facture", function (e) {
                if (e.Result === UI_1.UI.MessageResult.ok)
                    _this._vars.requester.Request(Models_1.models.Facture, "PRINT", data, data, function (req, json, iss) {
                        if (iss) {
                            UI_1.UI.InfoArea.push("You Facture Printed Successfully");
                        }
                        else
                            UI_1.UI.InfoArea.push("UnResolved Stat When We Print the facture " + data.Ref);
                    });
            }, "PRINT");
        };
        Facture.prototype.OnModalSuccess = function (data, isNew, callback) {
            return this.Save(data, isNew, callback);
        };
        Facture.prototype.OnModalError = function (cat, isNew, callback) {
            UI_1.UI.InfoArea.push("The Modification Aborded", true, 2500);
            if (callback)
                return callback(cat, isNew, Basics_1.basics.DataStat.OperationCanceled);
            return false;
        };
        Facture.prototype.getDefaultList = function () { return this._vars.__data.Factures; };
        return Facture;
    }(AdminApis_1.FactureBase));
    exports.Facture = Facture;
});
//# sourceMappingURL=FactureVent.js.map