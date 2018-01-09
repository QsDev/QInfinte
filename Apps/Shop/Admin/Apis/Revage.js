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
define(["require", "exports", "./../AdminApis", "../../Basics", "../../../../js/UI", "../../../../js/Models", "../../../../js/Corelib"], function (require, exports, AdminApis_1, Basics_1, UI_1, Models_1, Corelib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Revage = /** @class */ (function (_super) {
        __extends(Revage, _super);
        function Revage(_vars) {
            return _super.call(this, _vars, 'Price.edit') || this;
        }
        Revage.prototype.UpdateData = function (data, callback, costumize) {
            this._vars.requester.Request(Models_1.models.FakePrice, "UPDATE", data, data, callback, costumize);
        };
        Revage.prototype.UpdateList = function (list, ofOwner, callback, costumize) {
            this._vars.requester.Get(Models_1.models.FakePrices, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
        };
        Revage.prototype.UpdateAll = function (callback, costumize) {
            this._vars.requester.Get(Models_1.models.FakePrices, this._vars.__data.Prices, { FromDate: 0 }, callback, costumize);
        };
        Revage.prototype.Check = function (data) {
            return true;
        };
        Revage.prototype.Avaible = function (callback) {
            return callback ? callback(this._vars.__data.Prices, undefined, Basics_1.basics.DataStat.Fail) || true : true;
        };
        Revage.prototype.New = function (callback, saveToApp, saveToServer) {
            var c = new Models_1.models.FakePrice(Corelib_1.basic.New());
            if (saveToApp)
                this._vars.__data.Prices.Add(c);
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
        Revage.prototype.Save = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data))
                this._vars.requester.Request(Models_1.models.FakePrice, "SAVE", data, null, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The FakePrice Successfully Saved", true);
                        if (isNew)
                            _this._vars.__data.Prices.Add(data);
                        data.ApplyPrice = null;
                        data.Save();
                        if (callback)
                            callback(data, isNew, Basics_1.basics.DataStat.Success);
                        return;
                    }
                    else
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The FakePrice", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        Revage.prototype.Delete = function (saveToServer, data, callback) {
            var _this = this;
            if (!data)
                return this.ShowInfo('Select one Revage PLEASE;');
            UI_1.UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Revage', function (xx) {
                if (xx.Result !== UI_1.UI.MessageResult.ok)
                    return callback && callback(data, undefined, Basics_1.basics.DataStat.OperationCanceled);
                if (saveToServer)
                    _this._vars.requester.Request(Models_1.models.FakePrice, "DELETE", data, data, function (s, r, iss) {
                        if (iss)
                            _this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail))
                            _this.ShowInfo(iss ?
                                'The FakePrice :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The FakePrice :' + data.toString(), false);
                    });
                else {
                    _this.deleteData(data);
                    if (!callback || !callback(data, false, Basics_1.basics.DataStat.Success))
                        _this.ShowInfo('The FakePrice :' + data.toString() + '  Deleted!! from App ', true);
                }
            }, 'DELETE', "Let's");
        };
        Revage.prototype.deleteData = function (data) {
            this._vars.__data.Prices.Remove(data);
            if (data.Facture && data.Facture.Articles)
                data.Facture.Articles.Remove(data);
        };
        Revage.prototype.Edit = function (saveToServer, data, isNew, callback) {
            if (!data) {
                if (!callback || !callback(data, isNew, Basics_1.basics.DataStat.DataCheckError))
                    UI_1.UI.InfoArea.push('Select one Revage PLEASE;');
            }
            else {
                this.EditData.edit(data, false, this.getAction(callback));
            }
        };
        Revage.prototype.OnModalSuccess = function (data, isNew, callback) {
            var _this = this;
            if (data.ApplyPrice != null) {
                var msgCallback = function (xx) {
                    if (xx.Result !== UI_1.UI.MessageResult.ok)
                        data.ApplyPrice = null;
                    _this.Save(data, isNew, function (r, s, d) {
                        if (callback && !callback(r, s, d)) {
                            if (d == Basics_1.basics.DataStat.Success) {
                                data.ApplyPrice = null;
                                data.Save();
                            }
                            else
                                data.Undo();
                        }
                    });
                };
                UI_1.UI.Modal.ShowDialog("Confirmation", "Do you want realy to change the Product Price", msgCallback, 'Save', 'Ignore');
                return true;
            }
            else
                return this.Save(data, isNew, callback);
        };
        Revage.prototype.OnModalError = function (cat, isNew, callback) {
            cat.ApplyPrice = null;
            UI_1.UI.InfoArea.push("The Modification Aborded", true, 2500);
            if (callback)
                return callback(cat, isNew, Basics_1.basics.DataStat.OperationCanceled);
            return false;
        };
        Revage.prototype.getDefaultList = function () { return this._vars.__data.Prices; };
        return Revage;
    }(AdminApis_1.MyApi));
    exports.Revage = Revage;
});
//# sourceMappingURL=Revage.js.map