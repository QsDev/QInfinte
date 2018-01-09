define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var icontext = /** @class */ (function () {
        function icontext() {
        }
        icontext.prototype.CanAccessToMe = function (type, folder, name) { };
        icontext.prototype.GetPath = function (path) { return path; };
        icontext.prototype.NameOf = function (type) { return ""; };
        icontext.prototype.GetType = function (path) { return null; };
        icontext.prototype.GetEnum = function (path) { return undefined; };
        ;
        return icontext;
    }());
    exports.icontext = icontext;
    exports.context = new icontext();
});
//# sourceMappingURL=context.js.map