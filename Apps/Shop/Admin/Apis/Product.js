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
    var Product = /** @class */ (function (_super) {
        __extends(Product, _super);
        function Product(vars) {
            return _super.call(this, vars, 'iProduct.edit') || this;
        }
        Product.prototype.UpdateData = function (data, callback, costumize) {
            this._vars.requester.Request(Models_1.models.Product, "UPDATE", data, data, callback, costumize);
        };
        Product.prototype.UpdateList = function (list, ofOwner, callback, costumize) {
            this._vars.requester.Get(Models_1.models.Products, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
        };
        Product.prototype.UpdateAll = function (callback, costumize) {
            this._vars.requester.Get(Models_1.models.Products, this._vars.__data.Products, { FromDate: 0 }, callback, costumize);
        };
        Product.prototype.SmartUpdate = function () {
            this._vars.requester.Request(Models_1.models.Products, "SUPDATE", null, { Date: "12/12/2016" });
        };
        Product.prototype.Check = function (data) {
            return true;
        };
        Product.prototype.Avaible = function (callback) {
            return callback ? callback(this._vars.__data.Products, undefined, Basics_1.basics.DataStat.Fail) || true : true;
        };
        Product.prototype.New = function (callback, saveToApp, saveToServer) {
            var c = new Models_1.models.Product(Corelib_1.basic.New());
            if (saveToApp)
                this._vars.__data.Products.Add(c);
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
        Product.prototype.Save = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data))
                this._vars.requester.Request(Models_1.models.Product, "SAVE", data, null, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The Product Successfully Saved", true);
                        if (isNew)
                            _this._vars.__data.Products.Add(data);
                        data.Save();
                        if (callback)
                            callback(data, isNew, Basics_1.basics.DataStat.Success);
                        return;
                    }
                    else
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Product", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        Product.prototype.Delete = function (saveToServer, data, callback) {
            var _this = this;
            if (!data)
                return this.ShowInfo('Select one Product PLEASE;');
            UI_1.UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Product', function (xx) {
                if (xx.Result !== UI_1.UI.MessageResult.ok)
                    return callback && callback(data, undefined, Basics_1.basics.DataStat.OperationCanceled);
                if (saveToServer)
                    _this._vars.requester.Request(Models_1.models.Product, "DELETE", data, data, function (s, r, iss) {
                        if (iss)
                            _this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail))
                            _this.ShowInfo(iss ?
                                'The Product :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The Product :' + data.toString(), false);
                    });
                else {
                    _this.deleteData(data);
                    if (!callback || !callback(data, false, Basics_1.basics.DataStat.Success))
                        _this.ShowInfo('The Product :' + data.toString() + '  Deleted!! from App ', true);
                }
            }, 'DELETE', "Let's");
        };
        Product.prototype.deleteData = function (data) {
            this._vars.__data.Products.Remove(data);
        };
        Product.prototype.Edit = function (saveToServer, data, isNew, callback) {
            if (!data) {
                if (!callback || !callback(data, isNew, Basics_1.basics.DataStat.DataCheckError))
                    UI_1.UI.InfoArea.push('Select one Product PLEASE;');
            }
            else {
                this.EditData.edit(data, false, this.getAction(callback));
            }
        };
        Product.prototype.OnModalSuccess = function (data, isNew, callback) {
            return this.Save(data, isNew, callback);
        };
        Product.prototype.OnModalError = function (cat, isNew, callback) {
            UI_1.UI.InfoArea.push("The Modification Aborded", true, 2500);
            if (callback)
                return callback(cat, isNew, Basics_1.basics.DataStat.OperationCanceled);
            return false;
        };
        Product.prototype.getDefaultList = function () { return this._vars.__data.Products; };
        return Product;
    }(AdminApis_1.MyApi));
    exports.Product = Product;
});
//# sourceMappingURL=Product.js.map