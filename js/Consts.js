define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Consts;
    (function (Consts) {
        Consts.IDENT = '(?:' + '[a-zA-Z_$][\\w.:$\\-*]*' + ')';
        Consts.NUMBER = '(?:' + '[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?' + ')';
        Consts.SQUOTE_STRING = '(?:' + '\'(?:[^\'\\\\]|\\\\.)*\'' + ')';
        Consts.DQUOTE_STRING = '(?:' + '"(?:[^"\\\\]|\\\\.)*"' + ')';
        Consts.STRING = '(?:' + Consts.SQUOTE_STRING + '|' + Consts.DQUOTE_STRING + ')';
        Consts.ARGUMENT = '(?:' + Consts.IDENT + '|' + Consts.NUMBER + '|' + Consts.STRING + '\\s*' + ')';
        Consts.ARGUMENTS = '(?:' + Consts.ARGUMENT + '(?:,\\s*' + Consts.ARGUMENT + ')*' + ')';
        Consts.ARGUMENT_LIST = '(?:' + '\\(\\s*' + '(?:' + Consts.ARGUMENTS + '?' + ')' + '\\)\\s*' + ')';
        Consts.BINDING = '(' + Consts.IDENT + '\\s*' + Consts.ARGUMENT_LIST + '?' + ')';
        Consts.OPEN_BRACKET = '(\\[\\[|{{)' + '\\s*';
        Consts.CLOSE_BRACKET = '(?:]]|}})';
        Consts.NEGATE = '(?:(!)\\s*)?';
        Consts.EXPRESSION = Consts.OPEN_BRACKET + Consts.NEGATE + Consts.BINDING + Consts.CLOSE_BRACKET;
        Consts.IS_TOUCH_ONLY = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);
        Consts.css = {
            comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
            port: /@import[^;]*;/gim,
            customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
            mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
            mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
            varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
            keyframesRule: /^@[^\s]*keyframes/,
            multipleSpaces: /\s+/g
        };
    })(Consts = exports.Consts || (exports.Consts = {}));
    var ModuleStat;
    (function (ModuleStat) {
        ModuleStat[ModuleStat["New"] = 0] = "New";
        ModuleStat[ModuleStat["Downloading"] = 1] = "Downloading";
        ModuleStat[ModuleStat["Downloaded"] = 2] = "Downloaded";
        ModuleStat[ModuleStat["Defining"] = 3] = "Defining";
        ModuleStat[ModuleStat["Defined"] = 4] = "Defined";
        ModuleStat[ModuleStat["Executing"] = 5] = "Executing";
        ModuleStat[ModuleStat["Executed"] = 6] = "Executed";
        ModuleStat[ModuleStat["Failed"] = 7] = "Failed";
    })(ModuleStat = exports.ModuleStat || (exports.ModuleStat = {}));
    Object.freeze(Consts);
});
//# sourceMappingURL=Consts.js.map