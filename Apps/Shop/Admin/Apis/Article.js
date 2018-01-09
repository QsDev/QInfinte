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
define(["require", "exports", "./../AdminApis", "../../../../js/UI", "../../../../js/Models", "../../../../js/Corelib", "../../Basics"], function (require, exports, AdminApis_1, UI_1, Models_1, Corelib_1, Basics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Article = /** @class */ (function (_super) {
        __extends(Article, _super);
        function Article(_vars) {
            return _super.call(this, _vars, 'Article.cart') || this;
        }
        Article.prototype.UpdateData = function (data, callback, costumize) {
            this._vars.requester.Request(Models_1.models.Article, "UPDATE", data, data, callback, costumize);
        };
        Article.prototype.UpdateList = function (list, ofOwner, callback, costumize) {
            this._vars.requester.Get(Models_1.models.Articles, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
        };
        Article.prototype.UpdateAll = function (callback, costumize) {
            this._vars.requester.Get(Models_1.models.Articles, this._vars.__data.Articles, { FromDate: 0 }, callback, costumize);
        };
        Article.prototype.Check = function (data) {
            return true;
        };
        Article.prototype.Avaible = function (callback) {
            return callback ? callback(this._vars.__data.Articles, undefined, Basics_1.basics.DataStat.Fail) || true : true;
        };
        Article.prototype.New = function (callback, saveToApp, saveToServer) {
            var c = new Models_1.models.Article(Corelib_1.basic.New());
            if (saveToApp)
                this._vars.__data.Articles.Add(c);
            if (callback)
                callback(c, true, Basics_1.basics.DataStat.Success);
            if (saveToServer)
                if (!callback)
                    throw "callback must be setted when saveToServer is Setted to true";
                else
                    this.Save(c, true, callback);
            else
                return c;
        };
        Article.prototype.Save = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data))
                this._vars.requester.Request(Models_1.models.Article, "SAVE", data, null, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The Article Successfully Saved", true);
                        if (isNew)
                            _this._vars.__data.Articles.Add(data);
                        data.Save();
                        if (callback)
                            callback(data, isNew, Basics_1.basics.DataStat.Success);
                        return;
                    }
                    else
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Article", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        Article.prototype.Delete = function (saveToServer, data, callback) {
            var _this = this;
            if (!data)
                return this.ShowInfo('Select one Article PLEASE;');
            UI_1.UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Article', function (xx) {
                if (xx.Result !== UI_1.UI.MessageResult.ok)
                    return callback && callback(data, undefined, Basics_1.basics.DataStat.OperationCanceled);
                if (saveToServer)
                    _this._vars.requester.Request(Models_1.models.Article, "DELETE", data, data, function (s, r, iss) {
                        if (iss)
                            _this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail))
                            _this.ShowInfo(iss ?
                                'The Article :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Article :' + data.toString(), false);
                    });
                else {
                    _this.deleteData(data);
                    if (!callback || !callback(data, false, Basics_1.basics.DataStat.Success))
                        _this.ShowInfo('The Article :' + data.toString() + '  Deleted!! from App ', true);
                }
            }, 'DELETE', "Let's");
        };
        Article.prototype.deleteData = function (data) {
            this._vars.__data.Articles.Remove(data);
        };
        Article.prototype.Edit = function (saveToServer, data, isNew, callback) {
            if (!data) {
                if (!callback || !callback(data, isNew, Basics_1.basics.DataStat.DataCheckError))
                    UI_1.UI.InfoArea.push('Select one Article PLEASE;');
            }
            else {
                this.EditData.edit(data, false, this.getAction(callback));
            }
        };
        Article.prototype.OnModalSuccess = function (data, isNew, callback) {
            return this.Save(data, isNew, callback);
        };
        Article.prototype.OnModalError = function (cat, isNew, callback) {
            UI_1.UI.InfoArea.push("The Modification Aborded", true, 2500);
            if (callback)
                return callback(cat, isNew, Basics_1.basics.DataStat.OperationCanceled);
            return false;
        };
        Article.prototype.getDefaultList = function () { return this._vars.__data.Articles; };
        return Article;
    }(AdminApis_1.MyApi));
    exports.Article = Article;
});
//# sourceMappingURL=Article.js.map