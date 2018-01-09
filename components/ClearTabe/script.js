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
define(["require", "exports", "../../js/UI", "../../js/Corelib", "../QSidebar/script", "../../js/context"], function (require, exports, UI_1, Corelib_1, script_1, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// best galery ever https://colorlib.com/polygon/gentelella/media_gallery.html#
    var ClearTable = /** @class */ (function (_super) {
        __extends(ClearTable, _super);
        function ClearTable(cols) {
            var _this = _super.call(this, "material.clearTable", UI_1.UI.help.createTemplate(cols)) || this;
            _this.cols = cols;
            UI_1.UI.JControl.LoadCss(context_1.context.GetPath('style.css'));
            _this.Controller = Corelib_1.bind.Controller.Attach(_this, _this);
            _this.Controller.OnCompiled = {
                Invoke: _this.OnCompileEnd, Owner: _this
            };
            return _this;
        }
        ClearTable.prototype.OnCompileEnd = function (cnt) {
        };
        ClearTable.prototype.setName = function (name, dom, cnt, e) {
            var t = this[name];
            this[name] = dom;
            if (name == '_tbl_head')
                UI_1.UI.help.createHeader(dom, this.cols);
        };
        return ClearTable;
    }(UI_1.UI.ListAdapter));
    exports.ClearTable = ClearTable;
    exports.counter = 0;
    var textRight = { values: ['text-right'], spliter: " " };
    var cols = [
        {
            Header: {
                Attributes: { style: 'visibility: collapse;display:none;width:0px' }
            },
            Cell: {
                Attributes: { style: 'visibility: collapse;display:none;width:0px', 'db-job': "clientStat", 'db-bind': "SoldTotal" }
            }
        },
        {
            Header: "Full Name", Cell: {
                Attributes: { 'db-bind': 'FullName', 'db-job': 'label' }
            }
        },
        {
            Header: "Tel", Cell: {
                Attributes: { 'db-bind': 'Tel', 'db-job': 'label' }
            }
        },
        {
            Header: "Total Vendus", Cell: {
                Attributes: { 'db-bind': 'MontantTotal', 'db-job': 'number', 'db-twoway': false, 'class': textRight }
            }
        },
        {
            Header: "Total Versments", Cell: {
                Attributes: { 'db-bind': 'VersmentTotal', 'db-job': 'number', 'db-twoway': false, 'class': textRight }
            }
        },
        {
            Header: "Sold Total", Cell: {
                Attributes: { 'db-bind': 'SoldTotal', 'db-job': 'soldStatus', 'db-twoway': false, 'class': textRight }
            }
        }
    ];
    function test() {
        var t = script_1.test();
        var app = t.app;
        var x = new ClearTable(cols);
        app.Content = x;
        return x;
    }
    exports.test = test;
});
//# sourceMappingURL=script.js.map