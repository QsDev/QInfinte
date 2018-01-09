define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import {  } from "./Common";
    var basics;
    (function (basics) {
        var DataStat;
        (function (DataStat) {
            DataStat[DataStat["UnknownStat"] = undefined] = "UnknownStat";
            DataStat[DataStat["DataCheckError"] = null] = "DataCheckError";
            DataStat[DataStat["Fail"] = 0] = "Fail";
            DataStat[DataStat["Success"] = 1] = "Success";
            DataStat[DataStat["OperationCanceled"] = 2] = "OperationCanceled";
        })(DataStat = basics.DataStat || (basics.DataStat = {}));
    })(basics = exports.basics || (exports.basics = {}));
});
//# sourceMappingURL=Basics.js.map