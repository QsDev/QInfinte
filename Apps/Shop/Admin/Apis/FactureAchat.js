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
define(["require", "exports", "./../AdminApis", "../../Basics", "../../../../js/UI", "../../../../js/Models", "../../../../js/System"], function (require, exports, AdminApis_1, Basics_1, UI_1, Models_1, System_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SFacture = /** @class */ (function (_super) {
        __extends(SFacture, _super);
        function SFacture(_vars) {
            return _super.call(this, _vars, 'SSFacture.edit') || this;
        }
        SFacture.prototype.UpdateArticlesOf = function (data, callback) {
            if (!data)
                return callback && callback(null, false, Basics_1.basics.DataStat.DataCheckError);
            if (data.Articles == null)
                data.Articles = new Models_1.models.FakePrices(data, []);
            else
                data.Articles.Clear();
            this._vars.requester.Get(Models_1.models.FakePrices, data.Articles, data, function (d, r, iss) {
                if (iss)
                    data.Articles.Stat = System_1.sdata.DataStat.Updated;
                callback && callback(d.param, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail);
            }, null, null, { Id: String(data.Id) });
        };
        SFacture.prototype.LoadArticlesOf = function (data, callback) {
            if (!data)
                return callback(null, undefined, Basics_1.basics.DataStat.DataCheckError);
            if (!data.IsOpen)
                if (data.Articles == null || !data.Articles.Stat)
                    return this.UpdateArticlesOf(data, callback);
            return callback(data, undefined, Basics_1.basics.DataStat.Success);
        };
        SFacture.prototype.UpdateData = function (data, callback, costumize) {
            this._vars.requester.Request(Models_1.models.SFacture, "UPDATE", data, data, callback, costumize);
        };
        SFacture.prototype.UpdateList = function (list, ofOwner, callback, costumize) {
            this._vars.requester.Get(Models_1.models.SFactures, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
        };
        SFacture.prototype.UpdateAll = function (callback, costumize) {
            this._vars.requester.Get(Models_1.models.SFactures, this._vars.__data.SFactures, { FromDate: 0 }, callback, costumize);
        };
        SFacture.prototype.Check = function (data) {
            return true;
        };
        SFacture.prototype.Avaible = function (callback) {
            return callback ? callback(this._vars.__data.SFactures, undefined, Basics_1.basics.DataStat.Fail) || true : true;
        };
        SFacture.prototype.New = function (callback, saveToApp, saveToServer) {
            var _this = this;
            { }
            var c = new Models_1.models.SFacture();
            this._vars.requester.Request(Models_1.models.SFacture, "CREATE", c, null, function (req, isNew, iss) {
                if (!iss) {
                    c.Dispose();
                    return callback && callback(null, false, Basics_1.basics.DataStat.Fail);
                }
                c.Date = new Date(Date.now());
                c.IsOpen = true;
                if (saveToApp)
                    _this._vars.__data.SFactures.Add(c);
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
        SFacture.prototype.Save = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data))
                this._vars.requester.Request(Models_1.models.SFacture, 'SAVE', data, null, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The SFacture Successfully Saved", true);
                        if (isNew)
                            _this._vars.__data.SFactures.Add(data);
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
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SFacture", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        SFacture.prototype.Delete = function (saveToServer, data, callback) {
            var _this = this;
            if (!data)
                return this.ShowInfo('Select one SFacture PLEASE;');
            UI_1.UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this SFacture', function (xx) {
                if (xx.Result !== UI_1.UI.MessageResult.ok)
                    return callback && callback(data, undefined, Basics_1.basics.DataStat.OperationCanceled);
                if (saveToServer) {
                    _this._vars.requester.Request(Models_1.models.SFacture, "DELETE", data, data, function (s, r, iss) {
                        if (iss)
                            _this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail))
                            _this.ShowInfo(iss ?
                                'The SFacture :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The SFacture :' + data.toString(), false);
                    });
                }
                else {
                    _this.deleteData(data);
                    if (!callback || !callback(data, false, Basics_1.basics.DataStat.Success))
                        _this.ShowInfo('The SFacture :' + data.toString() + '  Deleted!! from App ', true);
                }
            }, 'DELETE', "Let's");
        };
        SFacture.prototype.deleteData = function (data) {
            this._vars.__data.SFactures.Remove(data);
        };
        SFacture.prototype.Edit = function (saveToServer, data, isNew, callback) {
            if (!data) {
                if (!callback || !callback(data, isNew, Basics_1.basics.DataStat.DataCheckError))
                    UI_1.UI.InfoArea.push('Select one SFacture PLEASE;');
            }
            else {
                this.EditData.edit(data, false, this.getAction(callback));
            }
        };
        SFacture.prototype.OnModalSuccess = function (data, isNew, callback) {
            return this.Save(data, isNew, callback);
        };
        SFacture.prototype.OnModalError = function (cat, isNew, callback) {
            UI_1.UI.InfoArea.push("The Modification Aborded", true, 2500);
            if (callback)
                return callback(cat, isNew, Basics_1.basics.DataStat.OperationCanceled);
            return false;
        };
        SFacture.prototype.Print = function (data, callback) {
        };
        SFacture.prototype.Validate = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data)) {
                this._vars.requester.Request(Models_1.models.SFacture, "VALIDATE", data, { Validate: data.Id }, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The SFacture Successfully Saved", true);
                        data.IsValidated = true;
                        if (isNew)
                            _this._vars.__data.SFactures.Add(data);
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
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SFacture", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            }
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        SFacture.prototype.OpenFacture = function (data, callback) {
            this._vars.requester.Request(Models_1.models.SFacture, "OPEN", data, data, function (c, r, iss) {
                callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail);
            }, null, null);
        };
        SFacture.prototype.CloseFacture = function (data, callback) {
            this._vars.requester.Request(Models_1.models.SFacture, "CLOSE", data, data, function (c, r, iss) {
                if (iss)
                    callback(data, false, Basics_1.basics.DataStat.Success);
                else
                    callback(data, false, Basics_1.basics.DataStat.Fail);
            });
        };
        SFacture.prototype.IsFactureOpen = function (data, callback) {
            this._vars.requester.Request(Models_1.models.SFacture, "ISOPEN", data, data, function (c, r, iss) {
                if (iss)
                    callback(data, false, Basics_1.basics.DataStat.Success);
                else
                    callback(data, false, Basics_1.basics.DataStat.Fail);
            });
        };
        SFacture.prototype.getDefaultList = function () { return this._vars.__data.SFactures; };
        return SFacture;
    }(AdminApis_1.FactureBase));
    exports.SFacture = SFacture;
});
//# sourceMappingURL=FactureAchat.js.map