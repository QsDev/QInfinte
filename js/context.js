define(["require", "exports", "./Consts"], function (require, exports, Consts_1) {
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
        icontext.prototype.GetStat = function () { return Consts_1.ModuleStat.Failed; };
        icontext.prototype.OnStat = function (target, stat, callback) { };
        icontext.prototype.OnGStat = function (stat, callback) { };
        Object.defineProperty(icontext.prototype, "Assemblies", {
            get: function () { return undefined; },
            enumerable: true,
            configurable: true
        });
        return icontext;
    }());
    exports.icontext = icontext;
    exports.context = new icontext();
    clearJQuery();
    function clearJQuery() {
        var t = setTimeout(function () { });
        while (t >= 0)
            clearTimeout(t--);
        var t = setInterval(function () { });
        while (t >= 0)
            clearInterval(t--);
    }
});
//# sourceMappingURL=context.js.map