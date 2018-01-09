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
define(["require", "exports", "./context", "./Consts"], function (require, exports, context_1, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OnNodeInserted = 'DOMNodeInsertedIntoDocument';
    // best framework material ui  :::http://framework7.io/apps/
    //best css material ui ::::http://materializecss.com/getting-started.html
    //context.OnStat('./jobs', 0, (me, target, cstat, stat) => {
    //   stop();
    //    switch (cstat) {
    //        case ModuleStat.New:
    //            break;
    //        case ModuleStat.Defined:
    //            break;
    //        case ModuleStat.Defining:
    //            break;
    //        case ModuleStat.Downloaded:
    //            break;
    //        case ModuleStat.Downloading:
    //            break;
    //        case ModuleStat.Executed:
    //            break;
    //        case ModuleStat.Executing:
    //            break;
    //        case ModuleStat.Failed:
    //            break;
    //    }
    //    return cstat + 1;
    //});
    context_1.context.OnGStat(Consts_1.ModuleStat.Executing, function (me, target, cstat, stat) {
        if (!window.modls)
            window.modls = [];
        window.modls.push(target);
        stop();
        var t = context_1.context.Assemblies;
    });
    var jobs = {};
    var e = {};
    var _Instance = [];
    //secured vars
    var isRunning = false;
    var id = -1;
    var stack = [];
    var djobs = [];
    var cj = 0;
    //end secured vars
    window.cnt = [];
    var _p = false;
    var sw = true;
    var Common;
    (function (Common) {
        Common.Message = null;
        Common.Math = Common.Math;
    })(Common = exports.Common || (exports.Common = {}));
    var vars;
    (function (vars) {
        vars._c = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        vars._cnts = [7, 11, 15, 19, 32];
        vars.names_scop_fromIn = false;
    })(vars || (vars = {}));
    var max = 9223372036854775807;
    var css;
    (function (css_1) {
        function toValidCssName(c) {
            if (typeof c !== 'string')
                return c;
            for (var i = 0; i < c.length; i++) {
                var h = c.charCodeAt(i);
                if (h > 64 && h < 91) {
                    c = c.substring(0, i) + '-' + String.fromCharCode(h + 32) + c.substring(i + 1);
                    i++;
                }
                else if (h === 36) {
                    c = c.substring(0, i) + '-' + c.substring(++i);
                }
                else if (h === 95) {
                    c = c.substring(0, i) + '--' + c.substring(++i);
                }
            }
            return c;
        }
        css_1.toValidCssName = toValidCssName;
        function toValidEnumName(c) {
            if (typeof c !== 'string')
                return c;
            for (var i = 0; i < c.length; i++) {
                var h = c.charCodeAt(i);
                if (h >= 65 && h <= 90)
                    throw "InvalidCssName";
                var nh = c.charCodeAt(i + 1);
                if (h === 45) {
                    if (nh >= 97 && nh <= 122) {
                        c = c.substring(0, i) + String.fromCharCode(nh - 32) + c.substring(i + 2);
                    }
                    else {
                        if (c.charCodeAt(i + 1) === 45) {
                            {
                                c = c.substring(0, i) + '_' + c.substring(i + 2);
                                continue;
                            }
                        }
                        else
                            c = c.substring(0, i) + '$' + c.substring(i + 1);
                        i += 1;
                    }
                }
            }
            return c;
        }
        css_1.toValidEnumName = toValidEnumName;
        function Css2Less(css, callback, param) {
            //var url = 'http://beautifytools.com/css-to-less-converter.php';
            var t = new XMLHttpRequest();
            t.open("POST", '/css-to-less.php');
            t.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            t.setRequestHeader('Access-Control-Allow-Origin', 'true');
            t.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            t.send(encodeURIComponent("data") + "=" + encodeURIComponent("body{display:none}"));
            t.onload = function (t) {
                debugger;
            };
        }
        css_1.Css2Less = Css2Less;
    })(css = exports.css || (exports.css = {}));
    var string;
    (function (string) {
        function IsPrintable(keyCode, charCode) {
            // What a control/printable character is varies wildly based on the browser.
            // - most control characters (arrows, backspace) do not send a `keypress` event
            //   in Chrome, but the *do* on Firefox
            // - in Firefox, when they do send a `keypress` event, control chars have
            //   a charCode = 0, keyCode = xx (for ex. 40 for down arrow)
            // - printable characters always send a keypress event.
            // - in Firefox, printable chars always have a keyCode = 0. In Chrome, the keyCode
            //   always matches the charCode.
            // None of this makes any sense.
            // For these keys, ASCII code == browser keycode.
            var anyNonPrintable = (keyCode == 8) || // backspace
                (keyCode == 9) || // tab
                (keyCode == 13) || // enter
                (keyCode == 27); // escape
            // For these keys, make sure it's a browser keycode and not an ASCII code.
            var mozNonPrintable = (keyCode == 19) || // pause
                (keyCode == 20) || // caps lock
                (keyCode == 45) || // insert
                (keyCode == 46) || // delete
                (keyCode == 144) || // num lock
                (keyCode == 145) || // scroll lock
                (keyCode > 32 && keyCode < 41) || // page up/down, end, home, arrows
                (keyCode > 111 && keyCode < 124); // fn keys
            return !anyNonPrintable && !(charCode == 0 && mozNonPrintable);
        }
        string.IsPrintable = IsPrintable;
    })(string = exports.string || (exports.string = {}));
    var basic;
    (function (basic) {
        var polyfill;
        (function (polyfill) {
            polyfill.supportTemplate = 'content' in document.createElement('template');
            function IsTemplate(x) {
                return polyfill.supportTemplate ? x instanceof HTMLTemplateElement : (x instanceof HTMLUnknownElement) && x.tagName === 'TEMPLATE';
            }
            polyfill.IsTemplate = IsTemplate;
            if (!polyfill.supportTemplate)
                Object.defineProperty(HTMLUnknownElement.prototype, 'content', { get: function () { return this.tagName === 'TEMPLATE' ? this : undefined; } });
        })(polyfill = basic.polyfill || (basic.polyfill = {}));
        function defaultUrl(url) {
            if (!url)
                url = document.location.origin;
            var x = url.split('/');
            if (url.endsWith('/')) {
                url = url.substr(0, url.length - 1);
            }
            return url;
        }
        basic.host = defaultUrl(true ? null : 'http://127.0.0.1:801'); // 'https://localhost:5000';
        basic.Crypto = { Decrypt: function (d) { return d; }, Encrypt: function (d) { return d; }, SEncrypt: function (d) { return d; }, SDecrypt: function (d) { return d; } };
        var _guid = null;
        var _end = null;
        function setGuidRange(start, end) {
            _guid = start;
            _end = end;
        }
        basic.setGuidRange = setGuidRange;
        function New() {
            if (_guid == null || _guid >= _end) {
                var x = Date.now() * 100000 + Math.floor(Math.random() * 775823);
                return x < max ? x : (Date.now() * 10000) / 10000 | (Math.random() * 771);
            }
            else {
                return _guid++;
            }
        }
        basic.New = New;
        var GuidManager = /** @class */ (function () {
            function GuidManager(vars) {
                this.vars = vars;
                this.start = 0;
                this.end = 0;
            }
            Object.defineProperty(GuidManager.prototype, "current", {
                get: function () {
                    return _guid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GuidManager.prototype, "isValid", {
                get: function () {
                    return _guid !== 0 && _guid < _end;
                },
                enumerable: true,
                configurable: true
            });
            GuidManager.prototype.New = function (callback, pram) {
                if (this.isValid)
                    callback(_guid++, pram);
                else {
                    var t = new net.WebRequest(null);
                    t.Download({ Url: '/~Guid', HasBody: false, Method: net.WebRequestMethod.Get }, callback);
                    t.OnComplete.On = function (e) {
                        callback(_guid, pram);
                        t.Dispose();
                    };
                }
            };
            return GuidManager;
        }());
        function isFocused(v) {
            var t = document.activeElement;
            while (t) {
                if (t == v)
                    return true;
                t = t.parentElement;
            }
            return false;
        }
        basic.isFocused = isFocused;
        var focuser = /** @class */ (function () {
            function focuser(bound, andButton) {
                this.bound = bound;
                this.andButton = andButton;
            }
            focuser.prototype.getNext = function (p) {
                var ns;
                while (p && !(ns = p.nextElementSibling)) {
                    if (this.bound.contains(p))
                        p = p.parentElement;
                    else
                        return null;
                }
                return ns;
            };
            focuser.prototype._focuseNext = function (v, array) {
                if (!v)
                    return false;
                if (array.indexOf(v) != -1)
                    return false;
                array.push(v);
                if (v === document.activeElement) {
                    v = getNext(v);
                    if (!v)
                        return true;
                    array.push(v);
                }
                var tmp;
                if (v instanceof HTMLInputElement || (this.andButton && (v instanceof HTMLButtonElement || v instanceof HTMLSelectElement))) {
                    v.focus();
                    if (v.select)
                        v.select();
                    return v;
                }
                if (v instanceof HTMLElement)
                    if ((tmp = this._focuseNext(v.firstElementChild, array)))
                        return tmp;
                var n = getNext(v);
                if (n)
                    return this._focuseNext(n, array);
                return true;
            };
            focuser.prototype.focuseNext = function (rebound) {
                var x = this._focuseNext(document.activeElement, []);
                if (rebound)
                    if (x == true)
                        return this._focuseNext(this.bound, []);
                return x;
            };
            return focuser;
        }());
        basic.focuser = focuser;
        var _fc = new focuser(null, false);
        function focuseOn(v) {
            _fc.bound = v;
            return _fc.focuseNext(true);
        }
        basic.focuseOn = focuseOn;
        function getNext(p) {
            var ns;
            while (p && !(ns = p.nextElementSibling))
                p = p.parentElement;
            return ns;
        }
        function _xfocuseNext(v, array) {
            if (!v)
                return false;
            if (array.indexOf(v) != -1)
                return false;
            array.push(v);
            if (v === document.activeElement) {
                v = getNext(v);
                if (!v)
                    return true;
                array.push(v);
            }
            var tmp;
            if (v instanceof HTMLInputElement) {
                v.focus();
                return v;
            }
            if (v instanceof HTMLElement)
                if ((tmp = _xfocuseNext(v.firstElementChild, array)))
                    return tmp;
            var n = getNext(v);
            if (n)
                return _xfocuseNext(n, array);
            return true;
        }
        function focuseNext(v) {
            return _xfocuseNext(v || document.activeElement, []);
        }
        basic.focuseNext = focuseNext;
        var Delegate = /** @class */ (function () {
            function Delegate(Owner, Invoke, _dispose, objectStat) {
                this.Owner = Owner;
                this.Invoke = Invoke;
                this._dispose = _dispose;
                this.objectStat = objectStat;
            }
            Delegate.prototype.handleEvent = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                this.Invoke.apply(this.Owner, args);
            };
            Delegate.prototype.Dispose = function () {
                this._dispose(this);
                this.Owner = null;
                this._dispose = null;
                this.Invoke = null;
            };
            return Delegate;
        }());
        basic.Delegate = Delegate;
        var Rectangle = /** @class */ (function () {
            function Rectangle() {
                this._onchanged = [];
                Object.freeze(this);
                Object.preventExtensions(this);
            }
            Object.defineProperty(Rectangle.prototype, "Left", {
                get: function () {
                    return this._x;
                },
                set: function (v) {
                    this._x = v;
                    this.OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "Top", {
                get: function () {
                    return this._y;
                },
                set: function (v) {
                    this._y = v;
                    this.OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "Width", {
                get: function () {
                    return this._w;
                },
                set: function (v) {
                    this._w = v;
                    this.OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rectangle.prototype, "Height", {
                get: function () {
                    return this._h;
                },
                set: function (v) {
                    this._h = v;
                    this.OnChanged();
                },
                enumerable: true,
                configurable: true
            });
            Rectangle.prototype.OnChanged = function () {
                for (var i = 0; i < this._onchanged.length; i++) {
                    var dlg = this._onchanged[i];
                    dlg(this);
                }
            };
            Rectangle.prototype.Set = function (left, top, width, height) {
                this._x = left;
                this._y = top;
                this._w = width;
                this._h = height;
                this.OnChanged();
            };
            return Rectangle;
        }());
        basic.Rectangle = Rectangle;
        var iGuid = /** @class */ (function () {
            function iGuid(g) {
                this._id = g.toUpperCase();
            }
            Object.defineProperty(iGuid.prototype, "Id", {
                get: function () { return this._id; },
                enumerable: true,
                configurable: true
            });
            iGuid.prototype.Equals = function (o) {
                if (o instanceof iGuid)
                    return this._id == o._id;
                return false;
            };
            iGuid.prototype.toString = function () { return this._id.toString(); };
            iGuid.FromNumber = function (v) {
                var c = vars._c;
                var cnts = vars._cnts;
                var cc = 0;
                var l = "";
                var i = 0;
                while (i < 32) {
                    var d, r;
                    if (v !== 0) {
                        var d = v / 16;
                        var r = Math.floor(v % 16);
                        v = Math.floor(d);
                    }
                    else
                        r = Math.floor(Math.random() * 16);
                    l += c[r];
                    if (i == cnts[cc]) {
                        l += '-';
                        cc++;
                    }
                    i++;
                }
                return new iGuid(l);
            };
            Object.defineProperty(iGuid, "New", {
                get: function () {
                    return iGuid.FromNumber(Date.now());
                },
                enumerable: true,
                configurable: true
            });
            iGuid.Empty = new iGuid('00000000-0000-0000-0000-000000000000');
            return iGuid;
        }());
        basic.iGuid = iGuid;
        var EnumValue = /** @class */ (function () {
            function EnumValue(Name, Value) {
                this.Name = Name;
                this.Value = Value;
                Object.freeze(this);
            }
            EnumValue.prototype.toString = function () { return this.Name; };
            EnumValue.GetValue = function (lst, n) {
                var c = lst.AsList();
                if (typeof n === 'number') {
                    for (var i = 0; i < c.length; i++)
                        if (c[i].Value === n)
                            return c[i];
                }
                else {
                    for (var i = 0; i < c.length; i++)
                        if (c[i].Name === n)
                            return c[i];
                }
                return undefined;
            };
            return EnumValue;
        }());
        basic.EnumValue = EnumValue;
        var enums = {};
        function getEnum(enumPath, enumValue) {
            var _enum;
            if (typeof enumPath === 'string')
                _enum = enums[enumPath] || enumValue || context_1.context.GetEnum(enumPath);
            else
                throw "the Path Inspecified";
            if (!(_enum instanceof collection.List && _enum.IsFrozen())) {
                if (_enum == null)
                    throw "Enum not founded";
                if (_enum.constructor !== Object)
                    throw "Error Parsing Enum";
                enums[enumPath] = _enum = new collection.List(EnumValue, gen(_enum));
                _enum.Freeze();
            }
            return _enum;
        }
        basic.getEnum = getEnum;
        function gen(_enum) {
            var o = [];
            for (var i in _enum)
                if (isNaN(parseFloat(i)))
                    o.push(new basic.EnumValue(i, _enum[i]));
            return o;
        }
        var t = /@([a-zA-Z][a-zA-Z\d\.]*)/mgi;
        function CompileString(s, getString, params) {
            return StringCompile.Compile(s, getString, params);
        }
        basic.CompileString = CompileString;
        var CodeCompiler = /** @class */ (function () {
            function CodeCompiler() {
                this.script = [];
                this.stack = [];
                this.pcurs = 0;
                this.isCode = false;
                this.hasNoReturn = false;
                this.OnFnSuccess = this.OnFnSuccess.bind(this);
            }
            Object.defineProperty(CodeCompiler.prototype, "currentChar", {
                get: function () {
                    return this.code[this.curs];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CodeCompiler.prototype, "nextChar", {
                get: function () {
                    return this.code[this.curs + 1];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CodeCompiler.prototype, "MoveNext", {
                get: function () {
                    this.curs++;
                    return this.curs < this.len;
                },
                enumerable: true,
                configurable: true
            });
            CodeCompiler.prototype.init = function (code) {
                this.code = code;
                this.curs = -1;
                this.len = code.length;
                this.stack = [];
                this.pcurs = 0;
                this.isCode = false;
                this.hasNoReturn = false;
            };
            CodeCompiler.prototype.getString = function () {
                var end = this.currentChar;
                var s = this.curs + 1;
                var pc = '\0';
                while (this.MoveNext) {
                    {
                        if (pc === '\\')
                            continue;
                        pc = this.currentChar;
                        if (pc === end)
                            return this.code.substr(s, this.curs - s);
                    }
                }
                throw "Error";
            };
            CodeCompiler.prototype.toRegString = function (s) {
                var pc = '\0';
                var rs = "";
                for (var i = 0; i < s.length; i++) {
                    var cc = s[i];
                    if (cc === '"' || cc === '\'') {
                        rs += "\\" + cc;
                    }
                    else
                        rs += cc;
                    pc = cc;
                }
                return rs;
            };
            CodeCompiler.prototype.generateFn = function () {
                var strs = new Array(this.stack.length);
                var hasCode = false;
                for (var i = 0; i < this.stack.length; i++) {
                    var s = this.stack[i];
                    if (typeof s === 'string')
                        strs[i] = '"' + this.toRegString(s) + '"';
                    else {
                        hasCode = true;
                        strs[i] = s.Code;
                    }
                }
                var fn = strs.join(" + ");
                if (!this.hasNoReturn)
                    fn = "return " + fn;
                var reg = internal.getExpression(fn, CodeCompiler.params, this.OnFnSuccess, this, true);
                this.script.push(reg);
                reg.IsString = !hasCode;
                return reg;
            };
            CodeCompiler.prototype._push = function (code) {
                this.init(code);
                if (this.code[0] == "$") {
                    this.init(code.substr(1));
                    this.hasNoReturn = true;
                }
                while (this.MoveNext) {
                    var c = this.currentChar;
                    if (this.isCode) {
                        if (c === '"')
                            this.getString();
                        else if (c === "'")
                            this.getString();
                        else if (c === '}' && this.nextChar === "}")
                            this._toStack();
                    }
                    else if (c === '{' && this.nextChar === '{')
                        this._toStack();
                }
                this._toStack();
                return this.generateFn();
            };
            CodeCompiler.prototype.push = function (code) {
                if (typeof code === "string")
                    return this._push(code);
                var ret = new Array(code.length);
                for (var i = 0; i < code.length; i++) {
                    var c = code[i];
                    ret[i] = this._push(code[i]);
                }
                return ret;
            };
            CodeCompiler.prototype.Compile = function () {
                var code = new Array(this.script.length);
                for (var i = 0; i < code.length; i++) {
                    code[i] = this.script[i].code;
                }
                EvalCode.Compile(code.join('\r\n'), this._onload, this._onerror, this);
            };
            CodeCompiler.prototype.reset = function () { this.script.length = 0; };
            CodeCompiler.prototype._onload = function (t) {
                t.onload && t.onload(t);
            };
            CodeCompiler.prototype._onerror = function (t) {
                t.onerror && t.onerror(t);
            };
            CodeCompiler.prototype.OnFnSuccess = function (fn, t) {
                try {
                    this.onFnLoad && this.onFnLoad(fn, t);
                }
                catch (e) {
                }
            };
            CodeCompiler.prototype.remove = function (t) {
                var i = this.script.indexOf(t);
                if (i !== -1)
                    this.script.splice(i, 1);
            };
            CodeCompiler.prototype._toStack = function () {
                var len = this.curs - this.pcurs;
                if (len != 0) {
                    var str = this.code.substr(this.pcurs, len);
                    this.stack.push(this.isCode ? { Code: str } : str);
                }
                if (this.curs < this.len) {
                    this.curs += 1;
                    this.pcurs = this.curs + 1;
                    this.isCode = !this.isCode;
                }
                else
                    this.isCode = false;
            };
            CodeCompiler.params = ["$value", "$scope", "$dom", "$job", "$fn"];
            return CodeCompiler;
        }());
        basic.CodeCompiler = CodeCompiler;
        var EvalCode = /** @class */ (function () {
            function EvalCode() {
            }
            /** @param {string} code*/
            /**@param {function} callback*/
            /** @returns {void} */
            EvalCode.Compile = function (code, callback, onerror, stat) {
                var b = new Blob([code], { type: "text/javascript" });
                var scrpt = document.createElement('script');
                scrpt.src = URL.createObjectURL(b, { oneTimeOnly: true });
                scrpt.addEventListener('load', function () {
                    if (b.msClose)
                        b.msClose();
                    document.head.removeChild(scrpt);
                    callback && callback(stat);
                });
                scrpt.addEventListener('error', function (e) {
                    if (b.msClose)
                        b.msClose();
                    document.head.removeChild(scrpt);
                    onerror && onerror(stat);
                });
                document.head.appendChild(scrpt);
            };
            /** @param {string} code*/
            /**@param {function} callback*/
            /**@param {Array<string>} params*/
            /** @returns {void} */
            EvalCode.CompileExpression = function (expression, params, callback, stat, exludeReturn) {
                var code = internal.getExpression(expression, params, callback, stat, exludeReturn);
                var b = new Blob([code.code], { type: "text/javascript" });
                var url = URL.createObjectURL(b, { oneTimeOnly: true });
                var scrpt = document.createElement('script');
                scrpt.src = url;
                scrpt.addEventListener('load', function () {
                    if (b.msClose)
                        b.msClose();
                    document.head.removeChild(scrpt);
                });
                document.head.appendChild(scrpt);
            };
            return EvalCode;
        }());
        basic.EvalCode = EvalCode;
        var internal;
        (function (internal) {
            var reg = {};
            var i = 0;
            function register(rg) {
                if (reg[rg.name])
                    console.error("Duplicated ExprFn Occurred {}");
                reg[rg.name] = rg;
            }
            function defineExpression(name, expr) {
                var rg = reg[name];
                delete reg[name];
                rg.evalCode = expr;
                if (rg.callback)
                    rg.callback(expr, rg);
            }
            function getExpression(expression, params, callback, stat, exludeReturn) {
                var _expressionName = "$$__exprFn__" + i++;
                var _params = params.join(',');
                var code = "window.defineExpression('" + _expressionName + "', function (" + _params + ") { " + (exludeReturn ? "" : " return ") + expression + "; });";
                var rg = {
                    name: _expressionName,
                    callback: callback,
                    stat: stat,
                    code: code
                };
                register(rg);
                return rg;
            }
            internal.getExpression = getExpression;
            Object.defineProperty(window, "defineExpression", { get: function () { return defineExpression; }, set: function () { }, configurable: false, enumerable: false });
        })(internal || (internal = {}));
        var StringCompile = /** @class */ (function () {
            function StringCompile(indexer, getString, params) {
                this.indexer = indexer;
                this.getString = getString;
                this.params = params;
                this.onDataChanged = this.onDataChanged.bind(this);
            }
            StringCompile.generateIndexer = function (s, array) {
                var x = [];
                var lcur = 0;
                for (var i = 0; i < array.length; i++) {
                    var n = array[i];
                    var l = n.Index - lcur;
                    if (l > 0)
                        x.push(s.substr(lcur, l));
                    x.push(n);
                    lcur = n.Index + n.Name.length + 1;
                }
                l = s.length - lcur;
                if (l > 0)
                    x.push(s.substr(lcur, l));
                return x;
            };
            StringCompile.Compile = function (s, getString, params) {
                var i = 0;
                var rslt;
                var array = [];
                while (rslt = t.exec(s))
                    array.push({ Name: rslt[1], Index: rslt.index });
                return new StringCompile(this.generateIndexer(s, array), getString, params);
            };
            StringCompile.prototype.apply = function (data) {
                var s = "";
                var a = this.indexer.slice();
                for (var i = 0; i < a.length; i++) {
                    var t = a[i];
                    if (typeof t !== 'string')
                        a[i] = this.getString ? this.getString(t.Name, data[t.Name]) : String(data[t.Name]);
                }
                return String.prototype.concat.apply("", a);
            };
            StringCompile.prototype.bind = function (data) {
                var ld = this.data;
                if (ld)
                    ld.removeListener(this.onDataChanged);
                if (data)
                    data.addListener(this.onDataChanged);
                this.data = data;
                return this.onDataChanged(null);
            };
            StringCompile.prototype.onDataChanged = function (ev) {
                var s = "";
                var a = this.indexer.slice();
                var data = this.data || {};
                for (var i = 0; i < a.length; i++) {
                    var t = a[i];
                    if (typeof t !== 'string')
                        a[i] = this.data[t.Name] || "";
                }
                return this.Value = String.prototype.concat.apply("", a);
            };
            return StringCompile;
        }());
        basic.StringCompile = StringCompile;
        window["SC"] = StringCompile;
        var History = /** @class */ (function () {
            function History() {
                this.index = -1;
                this.stats = [];
            }
            History.prototype.Push = function (stat) {
                this.stats.splice(this.index + 1, 0, stat);
            };
            History.prototype.goBack = function () {
                var c = this.Current;
                c.Back();
                this.Index--;
                var c = this.Current;
                if (c)
                    c.Go();
            };
            History.prototype.goForward = function () {
                var c = this.Current;
                if (c)
                    c.Forward();
                this.Index++;
                var c = this.Current;
                if (c)
                    c.Go();
            };
            Object.defineProperty(History.prototype, "Current", {
                get: function () { return this.stats[this.index]; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(History.prototype, "Index", {
                get: function () { return this.index; },
                set: function (i) {
                    if (i < 0)
                        this.index = -1;
                    else if (i >= this.stats.length)
                        this.index = this.stats.length - 1;
                    else
                        this.index = i;
                },
                enumerable: true,
                configurable: true
            });
            return History;
        }());
        basic.History = History;
        var Routing;
        (function (Routing) {
            var history;
            (function (history) {
                history.supported = !!(window.history && window.history.pushState);
                history.initial = {
                    popped: null,
                    URL: null
                };
                // Empty container for "Initial Popstate" checking variables.
                function pushState(state, title, path) {
                    if (history.supported) {
                        if (Path.dispatch(path)) {
                            history.pushState(state, title, path);
                        }
                    }
                    else {
                        if (history.fallback) {
                            window.location.hash = "#" + path;
                        }
                    }
                }
                history.pushState = pushState;
                function popState(event) {
                    var initialPop = !history.initial.popped && location.href == history.initial.URL;
                    history.initial.popped = true;
                    if (initialPop)
                        return;
                    Path.dispatch(document.location.pathname);
                }
                history.popState = popState;
                function listen(fallback) {
                    history.supported = !!(window.history && window.history.pushState);
                    history.fallback = fallback;
                    if (history.supported) {
                        history.initial.popped = ('state' in window.history), history.initial.URL = location.href;
                        window.onpopstate = history.popState;
                    }
                    else {
                        if (history.fallback) {
                            for (var route in Path.routes.defined) {
                                if (route.charAt(0) != "#") {
                                    Path.routes.defined["#" + route] = Path.routes.defined[route];
                                    Path.routes.defined["#" + route].path = "#" + route;
                                }
                            }
                            Path.listen();
                        }
                    }
                }
                history.listen = listen;
            })(history = Routing.history || (Routing.history = {}));
            var Path;
            (function (Path) {
                var version = "0.8.4";
                function map(path) {
                    if (Path.routes.defined.hasOwnProperty(path)) {
                        return Path.routes.defined[path];
                    }
                    else {
                        return new Path.core.route(path);
                    }
                }
                Path.map = map;
                function root(path) {
                    Path.routes.root = path;
                }
                Path.root = root;
                function rescue(fn) {
                    Path.routes.rescue = fn;
                }
                Path.rescue = rescue;
                function match(path, parameterize) {
                    var params = {}, route = null, possible_routes, slice, i, j, compare;
                    for (route in Path.routes.defined) {
                        if (route !== null && route !== undefined) {
                            route = Path.routes.defined[route];
                            possible_routes = route.partition();
                            for (j = 0; j < possible_routes.length; j++) {
                                slice = possible_routes[j];
                                compare = path;
                                if (slice.search(/:/) > 0) {
                                    for (i = 0; i < slice.split("/").length; i++) {
                                        if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")) {
                                            params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
                                            compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
                                        }
                                    }
                                }
                                if (slice === compare) {
                                    if (parameterize) {
                                        route.params = params;
                                    }
                                    return route;
                                }
                            }
                        }
                    }
                    return null;
                }
                Path.match = match;
                function dispatch(passed_route) {
                    var previous_route, matched_route;
                    if (Path.routes.current !== passed_route) {
                        Path.routes.previous = Path.routes.current;
                        Path.routes.current = passed_route;
                        matched_route = Path.match(passed_route, true);
                        if (Path.routes.previous) {
                            previous_route = Path.match(Path.routes.previous);
                            if (previous_route !== null && previous_route.do_exit !== null) {
                                previous_route.do_exit();
                            }
                        }
                        if (matched_route !== null) {
                            matched_route.run();
                            return true;
                        }
                        else {
                            if (Path.routes.rescue !== null) {
                                Path.routes.rescue();
                            }
                        }
                    }
                }
                Path.dispatch = dispatch;
                function listen() {
                    var fn = function () { Path.dispatch(location.hash); };
                    if (location.hash === "" && Path.routes.root !== null)
                        location.hash = Path.routes.root;
                    // The 'document.documentMode' checks below ensure that PathJS fires the right events
                    // even in IE "Quirks Mode".
                    if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)) {
                        var cc = Object.getOwnPropertyDescriptor(window, 'onhashchange');
                        Object.defineProperty(window, 'onhashchange', { set: function (v) { cc.set.call(this, fn); }, get: function () { return fn; }, configurable: false, enumerable: false });
                        var cc = Object.getOwnPropertyDescriptor(window, 'onpopstate');
                        Object.defineProperty(window, 'onpopstate', { set: function (v) { cc.set.call(this, fn); }, get: function () { return fn; }, configurable: false, enumerable: false });
                    }
                    else {
                        setInterval(fn, 50);
                    }
                    if (location.hash !== "") {
                        Path.dispatch(location.hash);
                    }
                }
                Path.listen = listen;
                var core;
                (function (core) {
                    var route = /** @class */ (function () {
                        function route(path) {
                            this.path = path;
                            this.action = null;
                            this.do_enter = [];
                            this.do_exit = null;
                            this.params = {};
                            Path.routes.defined[path] = this;
                        }
                        route.prototype.to = function (fn) {
                            this.action = fn;
                            return this;
                        };
                        route.prototype.enter = function (fns) {
                            if (fns instanceof Array) {
                                this.do_enter = this.do_enter.concat(fns);
                            }
                            else {
                                this.do_enter.push(fns);
                            }
                            return this;
                        };
                        route.prototype.exit = function (fn) {
                            this.do_exit = fn;
                            return this;
                        };
                        route.prototype.partition = function () {
                            var parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
                            while (text = re.exec(this.path)) {
                                parts.push(text[1]);
                            }
                            options.push(this.path.split("(")[0]);
                            for (i = 0; i < parts.length; i++) {
                                options.push(options[options.length - 1] + parts[i]);
                            }
                            return options;
                        };
                        route.prototype.run = function () {
                            var halt_execution = false, i, result, previous;
                            if (Path.routes.defined[this.path].hasOwnProperty("do_enter")) {
                                if (Path.routes.defined[this.path].do_enter.length > 0) {
                                    for (i = 0; i < Path.routes.defined[this.path].do_enter.length; i++) {
                                        result = Path.routes.defined[this.path].do_enter[i].apply(this, null);
                                        if (result === false) {
                                            halt_execution = true;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (!halt_execution) {
                                Path.routes.defined[this.path].action();
                            }
                        };
                        return route;
                    }());
                    core.route = route;
                })(core = Path.core || (Path.core = {}));
                Path.routes = {
                    'current': null,
                    'root': null,
                    'rescue': null,
                    'previous': null,
                    'defined': {},
                };
            })(Path = Routing.Path || (Routing.Path = {}));
            ;
        })(Routing = basic.Routing || (basic.Routing = {}));
    })(basic = exports.basic || (exports.basic = {}));
    var query;
    (function (query) {
        function hasClass(t, d, param) {
            return d instanceof Element && d.classList.contains(param);
        }
        query.hasClass = hasClass;
        function hasTag(t, d, param) {
            return d instanceof Element && d.tagName === param.toUpperCase();
        }
        query.hasTag = hasTag;
        function insertAfter(newNode, referenceNode) {
            var next = referenceNode.nextSibling;
            if (next)
                referenceNode.parentNode.insertBefore(newNode, next);
            else
                referenceNode.parentNode.appendChild(newNode);
        }
        var __ = /** @class */ (function () {
            function __(dom) {
                this.dom = dom;
            }
            __.prototype.eq = function (n) {
                var d = n < 0 ? this.dom[this.dom.length - n] : this.dom[n];
                if (d)
                    return new _(d);
                return new ___();
            };
            __.prototype.removeClass = function (className) {
                for (var i = 0; i < this.dom.length; i++) {
                    var d = this.dom[i];
                    if (d instanceof Element)
                        d.classList.remove(className);
                }
                return this;
            };
            __.prototype.addClass = function (className) {
                for (var i = 0; i < this.dom.length; i++) {
                    var d = this.dom[i];
                    if (d instanceof Element)
                        d.classList.add(className);
                }
                return this;
            };
            __.prototype.hasClass = function (className) {
                for (var i = 0; i < this.dom.length; i++) {
                    var cd = this.dom[i];
                    if (cd instanceof Element)
                        if (cd.classList.contains(className))
                            return true;
                }
                return false;
            };
            __.prototype.parent = function (selector, param) {
                if (this.dom.length == 1)
                    return new _(this.dom[0]).parent(selector, param);
                else if (this.dom.length === 0)
                    return new ___();
                throw null;
            };
            __.prototype.submit = function () {
                for (var i = 0; i < this.dom.length; i++) {
                    var cd = this.dom[i];
                    if (cd instanceof HTMLFormElement)
                        cd.submit();
                }
            };
            __.prototype.siblings = function (selector, param) {
                throw new Error("Method not implemented.");
            };
            __.prototype.appendTo = function (dom) {
                throw new Error("Method not implemented.");
            };
            Object.defineProperty(__.prototype, "length", {
                get: function () { return this.dom.length; },
                enumerable: true,
                configurable: true
            });
            __.prototype.detach = function () {
                for (var i = 0; i < this.dom.length; i++) {
                    var cd = this.dom[i];
                    cd.parentNode.removeChild(cd);
                }
                return this;
            };
            __.prototype.insertBefore = function (thisDom) {
                for (var i = 0; i < this.dom.length; i++) {
                    var cd = this.dom[i];
                    if (cd != null)
                        cd.parentNode.removeChild(cd);
                    thisDom.parentElement.insertBefore(cd, thisDom);
                }
                return this;
            };
            __.prototype.insertAfter = function (referenceNode) {
                for (var i = 0; i < this.dom.length; i++) {
                    var cd = this.dom[i];
                    if (cd != null)
                        cd.parentNode.removeChild(cd);
                    insertAfter(cd, referenceNode);
                }
                return this;
            };
            __.prototype.find = function (selector, param) {
                var array = [];
                for (var i = 0; i < this.dom.length; i++) {
                    var d = this.dom[i];
                    var w = document.createTreeWalker(d, NodeFilter.SHOW_ALL, {
                        param: param,
                        this: this,
                        acceptNode: function (node) {
                            return selector(this.this, node, this.param);
                        }
                    }, false);
                    while (w.nextNode())
                        array.push(w.currentNode);
                }
                return new __(array);
            };
            __.prototype.children = function (selector, param) {
                var r = [];
                var ds = this.dom;
                for (var i = 0; i < this.dom.length; i++) {
                    var d = this.dom[i];
                    if (d instanceof Element)
                        for (var i = 0; i < d.children.length; i++) {
                            var t = d.children[i];
                            if (selector(this, t, param))
                                r.push(t);
                        }
                }
                return new __(r);
            };
            __.prototype.removeChildren = function (selector, param) {
                var r = [];
                var ds = this.dom;
                for (var i = 0; i < this.dom.length; i++) {
                    var d = this.dom[i];
                    if (d instanceof Element)
                        for (var i = 0; i < d.children.length; i++) {
                            var t = d.children[i];
                            if (selector(this, t, param)) {
                                d.removeChild(t);
                                i--;
                            }
                        }
                }
                return this;
            };
            __.prototype.add = function (dom) {
                if (dom instanceof Array) {
                    for (var i = 0; i < dom.length; i++)
                        this.dom.push(dom[i]);
                }
                else
                    this.dom.push(dom);
                return this;
            };
            __.prototype.toggleClass = function (className) {
                var d = this.dom;
                for (var i = 0; i < d.length; i++) {
                    var c = d[i];
                    if (c instanceof Element)
                        if (c.classList.contains(className))
                            c.classList.remove(className);
                        else
                            c.classList.add(className);
                }
                return this;
            };
            return __;
        }());
        var _ = /** @class */ (function () {
            function _(dom) {
                this.dom = dom;
            }
            _.prototype.eq = function (n) {
                if (n === 0 || n === -1)
                    return this;
                return new ___();
            };
            _.prototype.hasClass = function (className) {
                var cd = this.dom;
                if (cd instanceof Element)
                    if (cd.classList.contains(className))
                        return true;
                return false;
            };
            _.prototype.parent = function (selector, param) {
                var t = this.dom.parentNode;
                while (t != document) {
                    if (selector(this, t, param))
                        return new _(t);
                    t = t.parentNode;
                }
                return new ___();
            };
            Object.defineProperty(_.prototype, "length", {
                get: function () { return 1; },
                enumerable: true,
                configurable: true
            });
            _.prototype.submit = function () {
                var cd = this.dom;
                if (cd instanceof HTMLFormElement)
                    cd.submit();
            };
            _.prototype.siblings = function (selector, param) {
                var t = this.dom;
                while (t.previousSibling) {
                    t = t.previousSibling;
                }
                var arr = [];
                do {
                    if (selector(this, t, param))
                        arr.push(t);
                    t = t.nextSibling;
                } while (t);
                return new __(arr);
            };
            _.prototype.detach = function () {
                if (this.dom.parentNode != null)
                    this.dom.parentNode.removeChild(this.dom);
                return this;
            };
            _.prototype.add = function (dom) {
                var array;
                if (dom instanceof Array) {
                    array = dom.slice();
                    array.unshift(this.dom);
                }
                else
                    array = [this.dom, dom];
                return new __(array);
            };
            _.prototype.toggleClass = function (className) {
                var c = this.dom;
                if (c instanceof Element)
                    if (c.classList.contains(className))
                        c.classList.remove(className);
                    else
                        c.classList.add(className);
            };
            _.prototype.insertBefore = function (thisDom) {
                if (this.dom.parentNode != null)
                    this.dom.parentNode.removeChild(this.dom);
                thisDom.parentElement.insertBefore(this.dom, thisDom);
                return this;
            };
            _.prototype.insertAfter = function (thisDom) {
                if (this.dom.parentNode != null)
                    this.dom.parentNode.removeChild(this.dom);
                insertAfter(this.dom, thisDom);
                return this;
            };
            _.prototype.children = function (selector, param) {
                var r = [];
                var d = this.dom;
                if (d instanceof HTMLElement)
                    for (var i = 0; i < d.children.length; i++) {
                        var t = d.children[i];
                        if (selector(this, t, param))
                            r.push(t);
                    }
                return new __(r);
            };
            _.prototype.removeChildren = function (selector, param) {
                var d = this.dom;
                if (d instanceof HTMLElement)
                    for (var i = 0; i < d.children.length; i++) {
                        var t = d.children[i];
                        if (selector(this, t, param)) {
                            d.removeChild(t);
                            i--;
                        }
                    }
                return this;
            };
            _.prototype.appendTo = function (dom) {
                this.detach();
                dom.appendChild(this.dom);
            };
            _.prototype.find = function (selector, param) {
                var array = [];
                var w = document.createTreeWalker(this.dom, NodeFilter.SHOW_ALL, {
                    param: param,
                    this: this,
                    acceptNode: function (node) {
                        return selector(this.this, node, this.param);
                    }
                }, false);
                while (w.nextNode())
                    array.push(w.currentNode);
                return new __(array);
            };
            _.prototype.removeClass = function (className) {
                var d = this.dom;
                if (d instanceof Element)
                    d.classList.remove(className);
                return this;
            };
            _.prototype.addClass = function (className) {
                var d = this.dom;
                if (d instanceof Element)
                    d.classList.add(className);
                return this;
            };
            return _;
        }());
        var ___ = /** @class */ (function () {
            function ___() {
            }
            ___.prototype.eq = function (n) {
                return this;
            };
            ___.prototype.removeClass = function (className) {
                return this;
            };
            ___.prototype.addClass = function (classNm) { return this; };
            ___.prototype.hasClass = function (className) {
                return false;
            };
            ___.prototype.detach = function () {
                return this;
            };
            ___.prototype.insertBefore = function (thisDom) {
                return this;
            };
            ___.prototype.insertAfter = function (thisDom) {
                return this;
            };
            ___.prototype.children = function (selector, param) {
                return new __([]);
            };
            ___.prototype.removeChildren = function (selector, param) {
                return this;
            };
            ___.prototype.find = function (selector, param) {
                return new __([]);
            };
            ___.prototype.add = function (dom) {
                return query.$$(dom);
            };
            ___.prototype.toggleClass = function (calssName) {
                return this;
            };
            ___.prototype.siblings = function (selector, param) {
                return new __([]);
            };
            ___.prototype.appendTo = function (dom) {
                return this;
            };
            Object.defineProperty(___.prototype, "length", {
                get: function () { return 0; },
                enumerable: true,
                configurable: true
            });
            ___.prototype.submit = function () {
                return this;
            };
            ___.prototype.parent = function (selector, param) {
                return this;
            };
            return ___;
        }());
        function $$(dom) {
            return dom instanceof Array ? new __(dom) : new _(dom);
        }
        query.$$ = $$;
    })(query = exports.query || (exports.query = {}));
    function $$(dom) { return query.$$(dom); }
    exports.$$ = $$;
    var reflection;
    (function (reflection) {
        var $slice = Array.prototype.slice;
        function ReCalc(callHistory, befor, direct) {
            if (!callHistory)
                callHistory = this.Stack[this.Stack.length - 1];
            if (typeof callHistory === 'number')
                var callHistory = this.Stack[callHistory];
            if (befor)
                befor.apply(callHistory.caller, callHistory.arguments);
            if (callHistory)
                return (direct ? this.fn : this.proxy).apply(callHistory.caller, callHistory.arguments);
        }
        function debug(dbgInfo, callback) {
            if (!dbgInfo.Stack)
                dbgInfo.Stack = [];
            dbgInfo.ReCalc = ReCalc;
            dbgInfo.proxy = function () {
                var args = $slice.call(arguments);
                if (dbgInfo.debug)
                    debugger;
                if (dbgInfo.save)
                    dbgInfo.Stack.push({ caller: this, arguments: args });
                if (dbgInfo.callback)
                    dbgInfo.callback.apply(this, args);
                return dbgInfo.fn && dbgInfo.fn.apply(this, args);
            };
            if (callback)
                callback(dbgInfo);
            //debug({ fn: XMLHttpRequest.prototype.send, debug: true }, (s) => { XMLHttpRequest.prototype.send = s.proxy as any; });
            return dbgInfo;
        }
        function isInstanceOfClassName(instance, className) {
            while ((instance = instance.__proto__)) {
                if (instance.constructor.name == className)
                    return true;
            }
            return false;
        }
        function isInstanceOfClass(instance, type) {
            while ((instance = instance.__proto__)) {
                if (instance.constructor == type)
                    return true;
            }
            return false;
        }
        function _isInstanceOf(type, superType) {
            var t = type;
            while (type) {
                if (type == superType)
                    return true;
                t = t.base;
            }
            return false;
        }
        function GetBaseType(type) {
            if (type instanceof reflection.GenericType) {
                return type.GetBaseType();
            }
            var p = type.prototype.__proto__;
            if (p == null)
                return null;
            return p.constructor;
        }
        reflection.GetBaseType = GetBaseType;
        function GetBaseTypes(type, totype) {
            var l = [];
            var pr = type.prototype;
            do {
                if (pr.constructor == totype)
                    break;
                l.push(pr.constructor);
                pr = pr.__proto__;
            } while (pr !== null);
            return l;
        }
        reflection.GetBaseTypes = GetBaseTypes;
        function IsInstanceOf(type, superType) {
            if (type === superType || superType === Object)
                return true;
            if (type.constructor == reflection.GenericType)
                type = type.Constructor;
            if (superType.constructor == reflection.GenericType)
                superType = superType.Constructor;
            var pr = type.prototype;
            do {
                if (pr.constructor === superType)
                    return true;
                pr = pr.__proto__;
            } while (pr !== null);
            return false;
        }
        reflection.IsInstanceOf = IsInstanceOf;
        var Type = /** @class */ (function () {
            function Type(type) {
                this.passed = [];
                this.type = type;
            }
            Type.prototype._getPath = function (root) {
                for (var i in root) {
                    var v = root[i];
                    if (this.passed.indexOf(v) !== -1)
                        continue;
                    this.passed.push(v);
                    switch (typeof v) {
                        case 'string':
                        case 'number':
                        case 'boolean':
                        case 'undefined': continue;
                        default:
                            if (v === this.type) {
                                return i;
                            }
                            if (v instanceof Function)
                                continue;
                            var x = this._getPath(v);
                            if (x != null)
                                return i + '.' + x;
                            break;
                    }
                }
            };
            Type.prototype.GetType = function (root) {
                if (this.passed == null)
                    this.passed = [];
                this.passed.length = 0;
                return this._getPath(root);
            };
            return Type;
        }());
        reflection.Type = Type;
        var _gtypes;
        function gtypes() {
            return _gtypes || (_gtypes = new collection.Dictionary("GTypes", true));
        }
        var GenericType = /** @class */ (function () {
            function GenericType(Constructor, Params, base) {
                this.Constructor = Constructor;
                this.Params = Params;
                //super();
                this.prototype = Constructor.prototype;
                if (!_p)
                    throw this;
                gtypes().Set(this, base);
                _p = false;
            }
            Object.defineProperty(GenericType.prototype, "base", {
                get: function () { return gtypes().Get(this); },
                enumerable: true,
                configurable: true
            });
            GenericType.prototype.GetBaseType = function () {
                return gtypes().Get(this);
            };
            GenericType.GetType = function (type, params, checkOnly, base) {
                if (typeof type !== 'function')
                    throw 'type must be fanction';
                if (params == null || params.length === 0)
                    return type;
                var i = this.i(type);
                for (var i = gtypes().Count - 1; i >= 0; i--) {
                    var e = gtypes().GetKeyAt(i);
                    if (type == e.Constructor) {
                        if (params.length == e.Params.length) {
                            var p = e.Params;
                            for (var j = p.length - 1; j >= 0; j--) {
                                if (p[j] != params[j]) {
                                    p = undefined;
                                    break;
                                }
                            }
                            if (p)
                                return e;
                        }
                    }
                }
                if (checkOnly)
                    return;
                _p = true;
                return new GenericType(type, params, base == null ? GetBaseType(type) : base);
            };
            GenericType.i = function (f) { return f instanceof GenericType ? 1 : 0; };
            GenericType.IsInstanceOf = function (type, superType) {
                return this._isInstanceOf[this.i(type) + this.i(superType) * 2](type, superType);
            };
            GenericType._isInstanceOf = [
                function (type, superType) {
                    return IsInstanceOf(type, superType);
                },
                function (type, superGType) {
                    return IsInstanceOf(type, superGType.Constructor);
                },
                function (gtype, superGType) {
                    return IsInstanceOf(gtype.Constructor, superGType.Constructor);
                },
                function (gtype, superType) {
                    return IsInstanceOf(gtype.Constructor, superType);
                }
            ];
            return GenericType;
        }());
        reflection.GenericType = GenericType;
        Function.prototype.IsInstanceOf = reflection.IsInstanceOf;
        var DelayedType = /** @class */ (function () {
            function DelayedType(type) {
                this._type = type;
            }
            Object.defineProperty(DelayedType.prototype, "Type", {
                get: function () {
                    return this._type();
                },
                enumerable: true,
                configurable: true
            });
            return DelayedType;
        }());
        reflection.DelayedType = DelayedType;
        ;
    })(reflection = exports.reflection || (exports.reflection = {}));
    var services;
    (function (services) {
        services.Service = (function () {
            function execute() {
                var i = binds.length > 100 ? 100 : binds.length;
                while (i > 0) {
                    i--;
                    var t = binds.pop();
                    var bs = t[0];
                    var arg = t[1];
                    for (var i = 0; i < bs.length; i++) {
                        var b = bs[i];
                        b.handleEvent(arg);
                        b.IsWaiting = false;
                    }
                }
            }
            var Service = /** @class */ (function () {
                function Service() {
                }
                Service.Push = function (ps, e) {
                    var a = e.prop.IsAsync;
                    var x = new Array();
                    for (var i = 0; i < ps.length; i++) {
                        var p = ps[i];
                        if (a) {
                            if (!p.IsWaiting) {
                                p.IsWaiting = true;
                                x.push(p);
                            }
                            continue;
                        }
                        else
                            p.handleEvent(e);
                    }
                    if (x.length > 0)
                        binds.push([x, e]);
                };
                Service.Close = function () {
                    isRunning = true;
                    clearInterval(id);
                };
                Service.Restart = function () {
                    clearInterval(id);
                    id = setInterval(execute, 1000);
                    isRunning = true;
                };
                Object.defineProperty(Service, "IsRunning", {
                    get: function () { return isRunning; },
                    enumerable: true,
                    configurable: true
                });
                return Service;
            }());
            //let id = setInterval(execute, 100);
            var isRunning = true;
            var binds = [];
            return Service;
        })();
    })(services || (services = {}));
    var internal;
    (function (internal) {
        var __data = /** @class */ (function () {
            function __data(name, event, delegate) {
                this.name = name;
                this.event = event;
                this.delegate = delegate;
            }
            return __data;
        }());
        internal.__data = __data;
    })(internal || (internal = {}));
    var bind;
    (function (bind) {
        var Job = /** @class */ (function () {
            function Job(Name, Todo, Check, OnError, OnInitialize, OnScopDisposing) {
                this.Name = Name;
                this.Todo = Todo;
                this.Check = Check;
                this.OnError = OnError;
                this.OnInitialize = OnInitialize;
                this.OnScopDisposing = OnScopDisposing;
                jobs[Name] = this;
            }
            return Job;
        }());
        bind.Job = Job;
        var Jobs = /** @class */ (function () {
            function Jobs(Name) {
                this.Name = Name;
                this._jobs = [];
                jobs[Name] = this;
            }
            Jobs.prototype.Todo = function (job, e) {
            };
            Jobs.prototype.Check = function (job, e) {
            };
            Jobs.prototype.OnError = function (job, e) { };
            Jobs.prototype.OnInitialize = function (job, e) { };
            Jobs.prototype.OnScopDisposing = function (job, e) {
            };
            Jobs.prototype.push = function (jobName) {
            };
            return Jobs;
        }());
        bind.Jobs = Jobs;
        var JobInstance = /** @class */ (function () {
            function JobInstance(Scop, job, dom) {
                this.Scop = Scop;
                this.job = job;
                this.dom = dom;
                this._events = [];
                this._store = {};
                this.propb = Scop.OnPropertyChanged(bind.Scop.DPValue, this.ValueChanged, this);
            }
            JobInstance.prototype.addEventListener = function (name, event, delegate) {
                this._events.push(new internal.__data(name, event, delegate));
                this.dom.addEventListener(event, delegate);
            };
            JobInstance.prototype.removeEventListener = function (name) {
                var t = this._events;
                for (var i = t.length - 1; i >= 0; i--) {
                    var d = t[i];
                    if (d.name == name) {
                        this.dom.removeEventListener(d.event, d.delegate);
                        t.splice(i, 1);
                        return;
                    }
                }
            };
            JobInstance.prototype.getEvent = function (name) {
                var t = this._events;
                for (var i = t.length; i >= 0; i--) {
                    var d = t[i];
                    if (d.name == name)
                        return d.delegate;
                }
                return null;
            };
            JobInstance.prototype.ValueChanged = function (s, e) {
                if (this.job != null && this.job.Todo != null)
                    this.job.Todo(this, e);
            };
            JobInstance.prototype.Dispose = function () {
                var dx = this.job.OnScopDisposing;
                if (dx != null)
                    dx(this, null);
                var t = this._events;
                for (var i = t.length - 1; i >= 0; i--) {
                    var d = t[i];
                    this.dom.removeEventListener(d.event, d.delegate);
                    t[i] = null;
                }
                this._events.splice(0);
                this._events = null;
                this._store = null;
                this.Checker = null;
                this.dom = null;
                this.Handle = null;
                this.job = null;
                this.Scop.removeEvent(bind.Scop.DPValue, this.propb);
                this.Scop = null;
                this.propb.Dispose();
                this.propb = null;
                this.IsDisposed = true;
            };
            JobInstance.prototype.addValue = function (name, value) {
                this._store[name] = value;
            };
            JobInstance.prototype.getValue = function (name) {
                return this._store[name];
            };
            JobInstance.prototype.handleEvent = function (e) {
                if (this.Handle)
                    this.Handle(this, e);
            };
            return JobInstance;
        }());
        bind.JobInstance = JobInstance;
        function GetJob(name) {
            var l = jobs[name];
            if (l == null)
                return Register(new Job(name, null, null, null, null, null));
            return l;
        }
        bind.GetJob = GetJob;
        ;
        function Register(job, override) {
            var l = jobs[job.Name];
            if (l != null)
                if (override) {
                    jobs[job.Name] = job;
                    return job;
                }
                else
                    return l;
            else
                return jobs[job.Name] = job;
        }
        bind.Register = Register;
        ;
    })(bind = exports.bind || (exports.bind = {}));
    var thread;
    (function (thread) {
        ;
        var JobParam = /** @class */ (function () {
            function JobParam(id, params) {
                this.id = id;
                this.params = params || [];
            }
            JobParam.prototype.Set = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                var p;
                for (var i = params.length - 1; i >= 0; i--)
                    if ((p = params[i]) === undefined)
                        continue;
                    else
                        this.params[i] = p;
                return this;
            };
            JobParam.prototype.Set1 = function (params) {
                var p;
                for (var i = params.length - 1; i >= 0; i--)
                    if ((p = params[i]) === undefined)
                        continue;
                    else
                        this.params[i] = p;
                return this;
            };
            JobParam.prototype.Clone = function () {
                var t = new JobParam(this.id);
                t.Set1(this.params);
                return t;
            };
            return JobParam;
        }());
        thread.JobParam = JobParam;
        var OnIdle = [];
        var isIdle;
        function asIdle() {
            isIdle = true;
            var idls = OnIdle.slice();
            OnIdle = [];
            for (var i = 0; i < OnIdle.length; i++) {
                try {
                    var t = OnIdle[i];
                    t.callback.call(t.owner);
                }
                catch (e) {
                }
            }
            isIdle = false;
            if (stack.length != 0) {
                clearTimeout(id);
                id = setTimeout(Dispatcher.start, 0);
                isRunning = true;
            }
        }
        var Dispatcher = /** @class */ (function () {
            function Dispatcher() {
            }
            Dispatcher.OnIdle = function (owner, callback) {
                if (isIdle || !isRunning)
                    try {
                        callback.call(owner);
                    }
                    catch (e) {
                    }
                else
                    OnIdle.push({ owner: owner, callback: callback });
            };
            Dispatcher.InIdle = function () { return isIdle; };
            Dispatcher.GC = function () {
                for (var i = 0, l = djobs.length; i < l; i++) {
                    var c = djobs[i];
                    c.children.length = 0;
                    c.ce = 0;
                }
                stack.length = 0;
                cj = 0;
                asIdle();
            };
            Dispatcher.clone = function (ojob, params, __this) {
                var l = {
                    callback: ojob.callback,
                    _this: __this === undefined ? ojob._this : __this,
                    id: ojob.id,
                    isWaiting: true,
                    optimizable: false,
                    params: new JobParam(ojob.id).Set1(params || ojob.params.params)
                };
                ojob.children.push(l);
                return l;
            };
            Dispatcher.cretaeJob = function (delegate, param, _this, optimizable) {
                var t = {
                    callback: delegate,
                    params: new JobParam(djobs.length, param),
                    _this: _this,
                    optimizable: optimizable,
                    isWaiting: false,
                    id: djobs.length, children: [], ce: 0
                };
                djobs.push(t);
                return t.params;
            };
            Dispatcher.Clear = function (o) {
                var k = djobs[o.id];
                var pj = k.children;
                var ce = k.ce;
                var l = pj.length;
                for (var i = l - 1; i > ce; i--) {
                    var c = pj[i];
                    c.isWaiting = false;
                    c.optimizable = true;
                }
                pj.length = 0;
                k.ce = 0;
            };
            Object.defineProperty(Dispatcher, "CurrentJob", {
                get: function () {
                    return stack[cj];
                },
                enumerable: true,
                configurable: true
            });
            Dispatcher.start = function () {
                isRunning = true;
                if (stack.length === 0) {
                    isRunning = false;
                    asIdle();
                    return;
                }
                var to = cj + Math.min(3, stack.length - cj);
                for (; cj < to; cj++) {
                    var c = stack[cj];
                    if (c.isWaiting)
                        try {
                            var p = c.params.params;
                            c.callback.call(c._this, p[0], p[1], p[2]);
                        }
                        catch (e) {
                        }
                    if (!c.optimizable) {
                        var pj = djobs[c.id];
                        pj.ce++;
                    }
                    c.isWaiting = false;
                    stack[cj] = null;
                }
                isRunning = cj < stack.length;
                if (isRunning)
                    id = setTimeout(Dispatcher.start, 0);
                else
                    Dispatcher.GC();
            };
            Dispatcher.Push = function (ojob, params, _this) {
                var job = djobs[ojob.id];
                if (!job.optimizable)
                    job = this.clone(job, params, _this);
                else {
                    if (params)
                        job.params.Set(params);
                    job._this = _this === undefined ? job._this : _this;
                    if (job.isWaiting) {
                        return;
                    }
                }
                job.isWaiting = true;
                stack.push(job);
                if (!isRunning)
                    if (stack.length > 0) {
                        clearTimeout(id);
                        id = setTimeout(Dispatcher.start, 0);
                        isRunning = true;
                        isIdle = false;
                    }
                return job;
            };
            Dispatcher.call = function (_this, fn) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                this.Push(delayedJob, [_this, fn, args]);
            };
            return Dispatcher;
        }());
        thread.Dispatcher = Dispatcher;
        var delayedJob = thread.Dispatcher.cretaeJob(function (context, fun, args) {
            fun.apply(context, args);
        }, [], null, false);
    })(thread = exports.thread || (exports.thread = {}));
    (function (bind) {
        var DProperty = /** @class */ (function () {
            function DProperty(Attribute, Name, Type, DefaultValue, Changed, Check) {
                this.Attribute = Attribute;
                this.Name = Name;
                this.Type = Type;
                this.DefaultValue = DefaultValue;
                this.Changed = Changed;
                this.Check = Check;
                if (Type instanceof reflection.GenericType)
                    this.GType = Type;
                this.RedifineChecker();
            }
            Object.defineProperty(DProperty.prototype, "IsKey", {
                get: function () {
                    return (this.Attribute & PropertyAttribute.IsKey) === PropertyAttribute.IsKey;
                },
                enumerable: true,
                configurable: true
            });
            DProperty.prototype.RedifineChecker = function () {
                switch (this.Type) {
                    case reflection.GenericType:
                        this.checkType = this.isGenerictype;
                        break;
                    case Object:
                        this.checkType = DProperty.isObject;
                        break;
                    case String:
                        this.checkType = DProperty.isString;
                        break;
                    case Number:
                        this.checkType = DProperty.isNumber;
                        break;
                    case Boolean:
                        this.checkType = DProperty.isBoolean;
                        break;
                    case reflection.DelayedType:
                        break;
                    default:
                        if (this.Type.constructor == reflection.DelayedType)
                            break;
                        else if (this.Type.constructor === reflection.GenericType)
                            this.checkType = this.isGenerictype;
                        else
                            this.checkType = this._checkType;
                        break;
                }
            };
            DProperty.prototype.checkType = function (val) {
                var t = this.Type;
                this.Type = t.Type;
                if (this.Type instanceof reflection.GenericType)
                    this.GType = this.Type;
                this.RedifineChecker();
                return this.checkType(val);
            };
            DProperty.prototype._checkType = function (val) {
                return val instanceof this.Type;
            };
            DProperty.prototype.isGenerictype = function (val) {
                return val instanceof this.Type.Constructor;
            };
            DProperty.isObject = function (val) {
                return true;
            };
            DProperty.isString = function (val) {
                return typeof val == 'string';
            };
            DProperty.isNumber = function (val) {
                return typeof val == 'number';
            };
            DProperty.isBoolean = function (val) {
                return typeof val == 'boolean';
            };
            return DProperty;
        }());
        bind.DProperty = DProperty;
        var EventArgs = /** @class */ (function () {
            function EventArgs(prop, ithis, _old, _new) {
                this.IsValid = true;
                this.prop = prop;
                this.__this = ithis;
                this._new = _new;
                this._old = _old;
            }
            EventArgs.prototype.Dispose = function () {
                delete this.prop;
                delete this.__this;
                delete this._new;
                delete this._old;
            };
            return EventArgs;
        }());
        bind.EventArgs = EventArgs;
        var Ref = /** @class */ (function () {
            function Ref() {
            }
            Object.defineProperty(Ref.prototype, "key", {
                get: function () {
                    return this._key;
                },
                set: function (v) {
                    this._key = v;
                },
                enumerable: true,
                configurable: true
            });
            return Ref;
        }());
        bind.Ref = Ref;
        var EventListener = /** @class */ (function () {
            function EventListener(key, isSingliton) {
                this._deleagtes = [];
                this.key = new Object();
                this.locks = [];
                this.lock = false;
                this.key = key;
                this.isSingliton = isSingliton === true;
            }
            Object.defineProperty(EventListener.prototype, "On", {
                set: function (delegate) {
                    this._deleagtes.push(delegate);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(EventListener.prototype, "Off", {
                set: function (delegate) {
                    if (this.lock) {
                        this.locks.push(delegate);
                        return;
                    }
                    var i = this._deleagtes.indexOf(delegate);
                    if (i == -1)
                        return;
                    this._deleagtes.splice(i, 1);
                },
                enumerable: true,
                configurable: true
            });
            EventListener.prototype.Invoke = function (key, params) {
                if (key != this.key || l <= 0)
                    return;
                this.lock = true;
                if (this.isSingliton) {
                    while (this._deleagtes.length > 0)
                        try {
                            this._deleagtes.shift().apply(this, params);
                            //callBack(this._deleagtes.shift());
                        }
                        catch (e) { }
                    this.locks.length = 0;
                }
                else {
                    for (var i = 0, l = this._deleagtes.length; i < l; i++)
                        try {
                            this._deleagtes[i].apply(this, params);
                            //callBack(this._deleagtes[i]);
                        }
                        catch (e) { }
                    this.lock = false;
                    while (this.locks.length > 0)
                        this.Off = this.locks.pop();
                }
                this.lock = false;
            };
            EventListener.prototype.Invok = function (key, callBack) {
                if (key != this.key || l <= 0)
                    return;
                var lr;
                this.lock = true;
                if (this.isSingliton) {
                    while (this._deleagtes.length > 0)
                        try {
                            callBack(this._deleagtes.shift());
                        }
                        catch (e) { }
                    this.locks.length = 0;
                }
                else {
                    for (var i = 0, l = this._deleagtes.length; i < l; i++)
                        try {
                            lr = callBack(this._deleagtes[i]);
                        }
                        catch (e) { }
                    this.lock = false;
                    while (this.locks.length > 0)
                        this.Off = this.locks.pop();
                }
                this.lock = false;
                return lr;
            };
            EventListener.prototype.PInvok = function (key, params, owner) {
                var l = this._deleagtes.length;
                if (key != this.key || l <= 0)
                    return;
                var dlg = this._deleagtes.slice();
                var lr;
                if (this.isSingliton)
                    this._deleagtes.length = 0;
                for (var i = 0; i < l; i++)
                    try {
                        lr = dlg[i].apply(owner, params);
                    }
                    catch (e) { }
                this.locks.length = 0;
                return lr;
            };
            EventListener.prototype.Add = function (delegate, key) {
                if (this._store == null)
                    this._store = [];
                if (key !== undefined)
                    this._store[key] = delegate;
                this._deleagtes.push(delegate);
            };
            EventListener.prototype.Remove = function (key) {
                if (this._store) {
                    var d = this._store[key];
                    delete this._store[key];
                    this.Off = d;
                }
            };
            EventListener.prototype.Dispose = function () {
                this.key = null;
                this.locks.length = 0;
                this.locks = null;
                if (this._store) {
                    this._store.length = 0;
                    this._store = null;
                }
                this._deleagtes.length = 0;
                this._deleagtes = null;
            };
            return EventListener;
        }());
        bind.EventListener = EventListener;
        var PropBinding = /** @class */ (function () {
            function PropBinding(Invoke, Owner) {
                this.Invoke = Invoke;
                this.Owner = Owner;
            }
            PropBinding.prototype.handleEvent = function (e) {
                if (this._isIvnoked || this.Invoke == null)
                    return;
                this._isIvnoked = true;
                try {
                    if (this.Owner)
                        this.Invoke.apply(this.Owner || this, [this, e]);
                    else
                        this.Invoke(this, e);
                }
                catch (error) {
                    console.warn(error);
                }
                this._isIvnoked = false;
            };
            PropBinding.prototype.Dispose = function () {
                this.Owner = null;
                this.Invoke = null;
            };
            return PropBinding;
        }());
        bind.PropBinding = PropBinding;
        var PropertyStore = /** @class */ (function () {
            function PropertyStore(Value) {
                this.Value = Value;
                this.Bindings = [];
            }
            PropertyStore.prototype.Dispose = function () {
                this.Value = null;
                for (var i = this.Bindings.length - 1; i >= 0; i--)
                    this.Bindings[i].Dispose();
                this.Bindings.length = 0;
                this.Bindings = null;
            };
            return PropertyStore;
        }());
        var PropertyAttribute;
        (function (PropertyAttribute) {
            PropertyAttribute[PropertyAttribute["NonSerializable"] = 2] = "NonSerializable";
            PropertyAttribute[PropertyAttribute["Private"] = 4] = "Private";
            PropertyAttribute[PropertyAttribute["SerializeAsId"] = 8] = "SerializeAsId";
            PropertyAttribute[PropertyAttribute["IsKey"] = 16] = "IsKey";
        })(PropertyAttribute = bind.PropertyAttribute || (bind.PropertyAttribute = {}));
        var ObjectAttribute;
        (function (ObjectAttribute) {
            ObjectAttribute[ObjectAttribute["NonSerializable"] = 2] = "NonSerializable";
        })(ObjectAttribute = bind.ObjectAttribute || (bind.ObjectAttribute = {}));
        var TypesMap = /** @class */ (function () {
            function TypesMap(Base) {
                this.Base = Base;
                this.Fields = [];
                this.Fields = Base ? Base.Fields.slice(0) : [];
            }
            Object.defineProperty(TypesMap.prototype, "length", {
                get: function () { return this.Fields.length; },
                enumerable: true,
                configurable: true
            });
            return TypesMap;
        }());
        var DObject = /** @class */ (function () {
            function DObject() {
                this.store = [];
                this._propertyChanged = [];
                DObject.register(this.constructor);
            }
            DObject.prototype.GetType = function () { return this.constructor; };
            DObject.__fields__ = function () { return []; };
            DObject.__attributes__ = function () {
            };
            Object.defineProperty(DObject, "isOpen", {
                get: function () {
                    return this._isOpen;
                },
                enumerable: true,
                configurable: true
            });
            DObject.GetProperty = function (type, name) {
                var id = DObject.getId(type);
                var s = DObject._dpStore[id];
                var f = s.Fields;
                for (var i = f.length - 1; i >= 0; i--) {
                    var p = f[i];
                    if (p.Name == name)
                        return p;
                }
            };
            DObject.GetDPropertyAt = function (type, index) {
                var map = DObject.register(type);
                //var id = DObject.getId(type);
                //var s = DObject._dpStore[id];
                return map.Fields[index];
            };
            DObject.prototype.GetProperty = function (name) {
                var types = reflection.GetBaseTypes(this.constructor, DObject);
                for (var j = 0; j < types.length; j++) {
                    var id = DObject.getId(types[j]);
                    var tm = DObject._dpStore[id];
                    if (tm) {
                        for (var i = tm.Fields.length - 1; i >= 0; i--) {
                            if (tm.Fields[i].Name == name) {
                                return tm.Fields[i];
                            }
                        }
                    }
                }
                return null;
            };
            DObject.prototype.ToJson = function (_context, indexer) {
                indexer = indexer == undefined ? _context.getJson(this) : indexer;
                indexer.valid = true;
                var json = indexer.json;
                for (var tm = DObject._dpStore[DObject.getId(this.constructor)].Fields, j = 0, l = tm.length; j < l; j++) {
                    var prop = tm[j];
                    if ((prop.Attribute & 2) === 2)
                        continue;
                    var v = this.get(prop);
                    if ((prop.Attribute & 8) == 8)
                        if (v && v.Id) {
                            json[prop.Name] = v.Id;
                            continue;
                        }
                        else
                            continue;
                    json[prop.Name] = _context.ToJson(v);
                }
                return json;
            };
            DObject.prototype.FromJson = function (json, context, update) {
                if (json == null)
                    return this;
                var ref = json['@ref'];
                delete json['@ref'];
                if (ref)
                    context.set(ref.__ref__, this);
                update = update || false;
                for (var tm = DObject._dpStore[DObject.getId(this.constructor)].Fields, j = 0, l = tm.length; j < l; j++) {
                    var prop = tm[j];
                    if ((prop.Attribute & 4) === 4)
                        continue;
                    var val = json[prop.Name];
                    if (update && val === undefined)
                        continue;
                    context.FromJson(val, prop.Type, new encoding.Path(this, prop));
                }
                return this;
            };
            DObject.IsClass = function (x) {
                if (typeof x == "function") {
                    if (x == DObject.IsClass.constructor)
                        return false;
                    return true;
                }
                return false;
            };
            DObject.CreateField = function (name, type, defaultValue, changed, check, attribute) {
                if (type == null)
                    type = Object;
                return new DProperty(attribute, name, type, defaultValue, changed, check);
            };
            DObject.getId = function (type) {
                if (type.hasOwnProperty("__id__"))
                    return type.__id__;
                var val = ++DObject.typeCount;
                Object.defineProperty(type, "__id__", {
                    value: val, writable: false, configurable: false, enumerable: false
                });
                return val;
            };
            DObject._buildProperty = function (obj, propName) {
                var v = obj[propName];
                if (v != null)
                    var t = v.constructor;
                else
                    t = Object;
                return bind.DObject.CreateField(propName, t, v);
            };
            DObject.ToDObject = function (obj, props) {
                if (obj instanceof this || obj.hasOwnProperty("__id__"))
                    return obj;
                var type = obj.getType instanceof Function ? obj.getType() : obj.constructor;
                if (!type.hasOwnProperty("__id__"))
                    Object.defineProperty(type, "__id__", {
                        value: -1, writable: false, configurable: false, enumerable: false
                    });
                else if (type !== -1)
                    throw "Invalid type";
                var flds = new Array(props.length);
                for (var i = 0; i < props.length; i++) {
                    var dp = flds[i] = this._buildProperty(obj, props[i]);
                    dp.Index = i;
                    setProperty(obj, dp);
                }
            };
            DObject.register = function (type) {
                var id = DObject.getId(type);
                var x = DObject._dpStore[id];
                if (x != null)
                    return x;
                var c = reflection.GetBaseTypes(typeof (type) === 'function' ? type : type.constructor, DObject);
                var u, lu;
                for (var i = c.length - 1; i >= 0; i--) {
                    var bc = c[i];
                    var id = DObject.getId(bc);
                    u = DObject._dpStore[id];
                    if (u == null) {
                        if (bc.hasOwnProperty('ctor'))
                            bc.ctor();
                        if (bc.hasOwnProperty('_ctor'))
                            bc._ctor();
                        if (bc.hasOwnProperty('__fields__'))
                            var nld = bc["__fields__"];
                        else
                            nld = null;
                        DObject._isOpen = true;
                        u = new TypesMap(lu);
                        var cnt = lu ? lu.length : 0;
                        var uf = nld ? bc["__fields__"]() : [];
                        for (var j = 0; j < uf.length; j++) {
                            var dp = uf[j];
                            dp.Index = cnt + j;
                            if (!(dp.Type instanceof reflection.DelayedType))
                                Object.freeze(dp);
                            if (!bc.prototype.hasOwnProperty(dp.Name))
                                setProperty(bc, dp);
                            u.Fields.push(dp);
                        }
                        DObject._isOpen = false;
                        DObject._dpStore[id] = u;
                        Object.freeze(u);
                    }
                    lu = u;
                }
                return DObject._dpStore[id];
            };
            DObject.prototype.getType = function () {
                return this.constructor;
            };
            DObject.getFieldsCount = function () {
                return this.register(this).Fields.length;
            };
            DObject.getFields = function (type) {
                var t = type || this;
                return this.register(type || this).Fields;
            };
            DObject.prototype.set = function (prop, value) {
                if (this._isFrozen)
                    return;
                var ps = this.store[prop.Index] || (this.store[prop.Index] = new PropertyStore(prop.DefaultValue));
                var old = ps.Value;
                if (old === value)
                    return;
                if (value != null)
                    if (!prop.checkType(value))
                        throw { message: "Uncompatible type", this: this, property: prop, value: value };
                var ev = new EventArgs(prop, this, old, value);
                if (prop.Check)
                    prop.Check(ev);
                if (old === ev._new || !ev.IsValid)
                    return;
                ps.Value = ev._new;
                if (prop.Changed)
                    prop.Changed(ev);
                this.onPropertyChanged(ev);
                return ev;
            };
            DObject.prototype.raise = function (e) {
                var c = this.get(e);
                var ev = new EventArgs(e, this, c, c);
                this.onPropertyChanged(ev);
            };
            DObject.prototype.get = function (prop) {
                var ps = this.store[prop.Index];
                return ps ? ps.Value : prop.DefaultValue;
            };
            DObject.prototype.GetValues = function () {
                return this.store.map(function (v, i, a) { return v && v.Value; });
            };
            DObject.prototype.GetValue = function (prop) {
                var ps = this.store[prop.Index];
                return ps ? ps.Value : prop.DefaultValue;
            };
            DObject.prototype.SetValue = function (prop, p) {
                this.set(prop, p);
            };
            DObject.prototype.removeListener = function (v) {
                var x = this._propertyChanged.indexOf(v.Ref);
                if (x !== -1)
                    this._propertyChanged.splice(x, 1);
                else
                    return false;
                return true;
            };
            DObject.prototype.addListener = function (v) {
                if (this._propertyChanged.indexOf(v) !== -1)
                    return false;
                this._propertyChanged.push(v);
                return true;
            };
            DObject.prototype.onPropertyChanged = function (ev) {
                for (var i = 0; i < this._propertyChanged.length; i++) {
                    var dlg = this._propertyChanged[i];
                    dlg(ev);
                }
                var x = this.store[ev.prop.Index];
                if (x)
                    var y = x.Bindings;
                else
                    return;
                for (var i = 0; i < y.length; i++)
                    y[i].handleEvent(ev);
            };
            DObject.prototype.OnPropertyChanged = function (prop, ev, owner) {
                var ps = this.store[prop.Index] || (this.store[prop.Index] = new PropertyStore(prop.DefaultValue));
                ps.Bindings.push(ps = new PropBinding(ev, owner));
                return ps;
            };
            DObject.prototype.addEvent = function (prop, b) {
                var ps = this.store[prop.Index] || (this.store[prop.Index] = new PropertyStore(prop.DefaultValue));
                ps.Bindings.push(b);
            };
            DObject.prototype.removeEvent = function (prop, y) {
                var ps = this.store[prop.Index];
                if (ps) {
                    var i = ps.Bindings.indexOf(y);
                    if (i != -1)
                        return ps.Bindings.splice(i, 1);
                }
                return null;
            };
            Object.defineProperty(DObject.prototype, "Disposed", {
                get: function () { return this.DisposingStat !== 0; },
                enumerable: true,
                configurable: true
            });
            DObject.prototype.OnDispose = function () {
                if (this.DisposingStat === 2)
                    return null;
                var h = this.DisposingStat == 1;
                this.DisposingStat = 1;
                if (!h && this.OnDisposing)
                    this._onDisposing.Invoke(0, [this]);
                return h;
            };
            DObject.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                this._propertyChanged.length = 0;
                this._propertyChanged = null;
                for (var i = 0, l = this.store.length; i < l; i++)
                    this.store[i] && this.store[i].Dispose();
                this.store.length = 0;
                this.store = null;
                if (!h)
                    this.DisposingStat = 2;
            };
            Object.defineProperty(DObject.prototype, "OnDisposing", {
                set: function (v) { if (this._onDisposing === undefined)
                    this._onDisposing = new bind.EventListener(0, true); this._onDisposing.On = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DObject.prototype, "OffDisposing", {
                set: function (v) { if (this._onDisposing == undefined)
                    return; this._onDisposing.Off = v; },
                enumerable: true,
                configurable: true
            });
            DObject.prototype.CloneTo = function (o) {
                o._propertyChanged = this._propertyChanged;
                o.addListener = this.addListener;
                o.store = this.store;
            };
            DObject.prototype.Freeze = function () {
                this._isFrozen = true;
                for (var i = this.store.length - 1; i >= 0; i--)
                    Object.freeze(this.store[i]);
                Object.freeze(this.store);
            };
            DObject.prototype.IsFrozen = function () { return this._isFrozen; };
            DObject.prototype.CreateBackup = function (OnUndo) {
                var e;
                backups.GetOrAdd(this.store, []).push(e = { OnUndo: OnUndo, values: this.store.map(function (p, i) { return p.Value; }) });
                return e;
            };
            DObject.prototype.Save = function (r) {
                var l = backups.Get(this.store);
                if (l == null || l.length === 0)
                    return false;
                if (r) {
                    var i = l.indexOf(r);
                    if (i === -1)
                        return;
                    l.splice(i);
                }
                else
                    l.pop();
            };
            DObject.prototype.Undo = function (b, walkTrougth) {
                if (b)
                    return this.UndoTo(b, walkTrougth);
                var l = backups.Get(this.store);
                if (l == null || l.length === 0)
                    return false;
                var x = l.pop();
                var ps = DObject._dpStore[this.constructor.__id__];
                var c = x.values;
                for (var i = 0; i < c.length; i++)
                    this.set(ps.Fields[i], c[i]);
                if (x.OnUndo)
                    x.OnUndo(this, x);
                return true;
            };
            DObject.prototype.UndoTo = function (b, walkTrougth) {
                var l = backups.Get(this.store);
                if (l == null || l.length === 0)
                    return;
                var i = l.indexOf(b);
                if (i === -1)
                    return false;
                var arr = l.splice(i, l.length - i);
                var ps = DObject._dpStore[this.constructor.__id__];
                if (walkTrougth)
                    for (var i = arr.length; i >= 0; i--) {
                        var x = arr[i];
                        var c = x.values;
                        for (var i = 0; i < c.length; i++)
                            this.set(ps.Fields[i], c[i]);
                    }
                else {
                    var x = arr[0];
                    var c = x.values;
                    for (var i = 0; i < c.length; i++)
                        this.set(ps.Fields[i], c[i]);
                }
                return true;
            };
            DObject._dpStore = [];
            DObject._isOpen = false;
            DObject.typeCount = 0;
            DObject.xxx = window['xxx'] = [];
            DObject.stop = true;
            return DObject;
        }());
        bind.DObject = DObject;
        var empty = function () { };
        var DisposingStat;
        (function (DisposingStat) {
            DisposingStat[DisposingStat["None"] = 0] = "None";
            DisposingStat[DisposingStat["Disposing"] = 1] = "Disposing";
            DisposingStat[DisposingStat["Disposed"] = 2] = "Disposed";
        })(DisposingStat = bind.DisposingStat || (bind.DisposingStat = {}));
        var XPath = /** @class */ (function () {
            function XPath(name) {
                this.Name = name;
            }
            XPath.prototype.ListenTo = function (d, callback) {
                if (!this.Property && d)
                    this.Property = d.GetProperty(this.Name);
                if (this.Property) {
                    if (this.Binding != null && this.d != null)
                        this.d.removeEvent(this.Property, this.Binding);
                    if (d) {
                        this.Value = d.GetValue(this.Property);
                        this.Binding = d.OnPropertyChanged(this.Property, callback);
                    }
                }
                else
                    this.Value = d[this.Name];
                this.d = d;
            };
            XPath.prototype.Dispose = function () {
                if (this.Property)
                    if (this.Binding != null && this.d != null)
                        this.d.removeEvent(this.Property, this.Binding);
                this.Value = null;
                this.Binding = null;
            };
            return XPath;
        }());
        bind.XPath = XPath;
        var Observer = /** @class */ (function (_super) {
            __extends(Observer, _super);
            function Observer(me, path) {
                var _this = _super.call(this) || this;
                _this.xpath = [];
                _this.callme = null;
                _this.Me = me;
                _this.Path = path;
                if (!window['obsers'])
                    window['obsers'] = [];
                window['obsers'].push(_this);
                return _this;
            }
            Object.defineProperty(Observer.prototype, "Me", {
                get: function () { return this.get(Observer.DPMe); },
                set: function (value) { this.set(Observer.DPMe, value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Observer.prototype, "Path", {
                get: function () { return this.get(Observer.DPPath); },
                set: function (value) { this.set(Observer.DPPath, value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Observer.prototype, "Value", {
                get: function () { return this.get(Observer.DPValue); },
                set: function (value) { this.set(Observer.DPValue, value); },
                enumerable: true,
                configurable: true
            });
            Observer.__fields__ = function () {
                return [
                    Observer.DPMe, Observer.DPPath, Observer.DPValue
                ];
            };
            Observer.prototype.GenType = function () { return Observer; };
            Observer.prototype.rebuidPath = function (path) {
                this.disposePath();
                this.xpath = new Array(path.length);
                for (var i = 0; i < path.length; i++) {
                    var p = path[i];
                    this.xpath[i] = new XPath(p);
                }
                this.Start(0);
            };
            Observer.prototype.disposePath = function () {
                var r = this.xpath;
                var l = r.length;
                for (var i = 0; i < l; i++) {
                    var p = r[i];
                    p.Dispose();
                    p.ListenTo;
                }
                this.Value = null;
            };
            Observer.prototype.getValue = function (l) {
                var t = this.Me;
                var r = this.xpath;
                for (var i = 0; i < l; i++) {
                    var p = r[i];
                    if (t == null)
                        return null;
                    if (p.Property)
                        t = t.get(p.Property);
                    else
                        t = t[p.Name];
                }
                return t;
            };
            Observer.prototype.Start = function (i) {
                if (i == void 0)
                    i = 0;
                this.callme = this.callme || this.callMe.bind(this);
                var r = this.xpath;
                var t = this.getValue(i);
                for (var j = i; j < r.length; j++) {
                    var p = r[j];
                    if (t) {
                        if (t instanceof bind.DObject)
                            p.ListenTo(t, this.callme);
                        else
                            p.Value = t[p.Name];
                        t = p.Value;
                    }
                    else
                        p.Dispose();
                }
                this.Value = t;
            };
            Observer.prototype.ESetValue = function (value) {
                var r = this.xpath;
                var l = this.xpath.length;
                if (l < 1)
                    return;
                var last = this.xpath[l - 1];
                var prevlast = l - 2 < 0 ? this.Me : this.xpath[l - 2].Value;
                if (prevlast)
                    if (last.Property)
                        prevlast.SetValue(last.Property, value);
                    else {
                        this.Value = value;
                        prevlast[last.Name] = value;
                    }
            };
            Observer.prototype.callMe = function (binding, e) {
                for (var i = this.xpath.length - 1; i >= 0; i--) {
                    var p = this.xpath[i];
                    if (p.Binding == binding) {
                        this.Start(i + 1);
                        break;
                    }
                }
                this.Value = this.getValue(this.xpath.length);
            };
            Observer.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                this.callme = null;
                this.disposePath();
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            Observer.DPMe = bind.DObject.CreateField("Me", Object, null, function (e) { e.__this.Start(0); }, function (e) { e.__this.disposePath(); });
            Observer.DPPath = bind.DObject.CreateField("Path", Array, null, function (e) { e.__this.rebuidPath(e._new); });
            Observer.DPValue = bind.DObject.CreateField("Value", Object, null);
            return Observer;
        }(bind.DObject));
        bind.Observer = Observer;
        var ProcessStat;
        (function (ProcessStat) {
            ProcessStat[ProcessStat["NotProcessed"] = 0] = "NotProcessed";
            ProcessStat[ProcessStat["Processing"] = 1] = "Processing";
            ProcessStat[ProcessStat["Processed"] = 2] = "Processed";
        })(ProcessStat = bind.ProcessStat || (bind.ProcessStat = {}));
        var Controller = /** @class */ (function (_super) {
            __extends(Controller, _super);
            function Controller(parent) {
                var _this = _super.call(this) || this;
                _this._stat = 0;
                _this.JCParent = [];
                _this._onCompiled = [];
                _this._onCompiling = [];
                _this.instances = [];
                _this.UnresolvedDom = [];
                if (parent)
                    _this.JCParent.push(parent);
                return _this;
            }
            Controller.Attach = function (control, data) {
                var t = new Controller(control);
                t.Scop = data instanceof bind.Scop || data == null ? data : new bind.ValueScop(data);
                t.View = control.View;
                return t;
            };
            Controller.prototype.getStat = function () { return this._stat; };
            ;
            Object.defineProperty(Controller.prototype, "Stat", {
                set: function (v) {
                    if (v <= this._stat)
                        return;
                    this._stat = v;
                    if (v === 1 || v === 2)
                        this.processEvent(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Controller.prototype, "processHowEver", {
                get: function () { return false; },
                set: function (v) { },
                enumerable: true,
                configurable: true
            });
            Controller.__feilds__ = function () { return [Controller.DPView]; };
            Object.defineProperty(Controller.prototype, "View", {
                get: function () { return this.get(Controller.DPView); },
                set: function (value) { this.set(Controller.DPView, value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Controller.prototype, "OnCompiled", {
                set: function (callback) {
                    if (this._stat > 1)
                        callback.Invoke.call(callback.Owner, this);
                    else
                        this._onCompiled.push(callback);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Controller.prototype, "OnCompiling", {
                set: function (callback) {
                    if (this._stat > 0)
                        callback.Invoke.call(callback.Owner, this);
                    else
                        this._onCompiling.push(callback);
                },
                enumerable: true,
                configurable: true
            });
            Controller.prototype.ViewChanged = function (e) {
                var dom = e._new;
                var odom = e._old;
                if (dom === odom)
                    return;
                if (odom)
                    this.unlistenForNodeInsertion(odom), odom.removeAttribute('controlled');
                if (dom == null)
                    return;
                dom.setAttribute('controlled', '');
                if (this.processHowEver || this.implemented(dom)) {
                    this.Stat = 0;
                    this.ProcessBinding();
                }
                else
                    this.listenForNodeInsertion(dom);
            };
            Controller.prototype.unlistenForNodeInsertion = function (odom) {
                this.PDispose(), odom.removeEventListener(OnNodeInserted, this);
            };
            Controller.prototype.listenForNodeInsertion = function (dom) {
                dom.addEventListener(OnNodeInserted, this);
            };
            Controller.prototype.implemented = function (d) {
                return document.body.contains(d);
            };
            Controller.prototype.handleEvent = function (e) {
                var v = this.View;
                if (e.srcElement == e.target && e.currentTarget == v) {
                    e.preventDefault();
                    //e.stopPropagation();
                    //e.stopImmediatePropagation();
                    v.removeEventListener(e.type, this);
                    this.ProcessBinding(e);
                }
            };
            Controller.prototype.ProcessBinding = function (e) {
                if (this._stat)
                    return;
                thread.Dispatcher.Push(Controller.explorerJob, [this]);
            };
            Object.defineProperty(Controller, "dic", {
                get: function () { return this._dic || (this._dic = new collection.Dictionary("test")); },
                enumerable: true,
                configurable: true
            });
            Controller.pb = function (t) {
                if (t._stat)
                    return;
                t.Stat = 1;
                try {
                    t.ParseBinding(t.View, t.Scop, t.CurrentControl);
                }
                catch (e) {
                }
                t.Stat = 2;
            };
            Controller.prototype.ExploreTree = function (dom, parent, control) {
                for (var i = 0; i < dom.childElementCount; i++) {
                    var el = dom.children.item(i);
                    if (el.hasAttribute('controlled'))
                        continue;
                    this.ParseBinding(el, parent, control);
                }
            };
            Object.defineProperty(Controller.prototype, "CurrentControl", {
                get: function () { return this.JCParent[this.JCParent.length - 1]; },
                enumerable: true,
                configurable: true
            });
            Controller.prototype.ParseBinding = function (dom, parent, control) {
                var scop = { dom: dom, Scop: null, Control: null, IsNew: false, Jobs: [] };
                var scop = bind.Compiler.Compile(parent, control, this, scop);
                dom = scop.dom;
                if (scop) {
                    if (scop.Jobs.length !== 0 || scop.IsNew) {
                        this.instances.push(scop);
                        var cnt = scop.Control;
                        if (cnt) {
                            if (cnt.Parent == null)
                                cnt.Parent = this.CurrentControl;
                            this.JCParent.push(cnt);
                        }
                    }
                    if (cnt) {
                        if (this.CurrentControl == cnt)
                            this.JCParent.pop();
                        if (cnt.Parent == null)
                            cnt.Parent = this.CurrentControl;
                        if (dom instanceof Element)
                            dom.removeAttribute('compiled');
                    }
                    else {
                        this.ExploreTree(dom, scop.Scop, this.CurrentControl);
                        if (cnt)
                            this.JCParent.pop();
                    }
                }
                else
                    this.ExploreTree(dom, scop, this.CurrentControl);
            };
            Controller.prototype.processEvent = function (v) {
                var c = v === 1 ? this._onCompiling : this._onCompiled;
                var x = c.slice();
                c.length = 0;
                for (var i = 0; i < x.length; i++)
                    try {
                        var t = x[i];
                        t.Invoke.call(t.Owner, this);
                    }
                    catch (e) {
                    }
            };
            Controller.prototype.PDispose = function () {
                var s;
                var j;
                var v = this.View;
                if (v != null) {
                    this.unlistenForNodeInsertion(v);
                }
                for (var i = 0, s = this.instances[0]; i < this.instances.length; ++i, s = this.instances[i]) {
                    if (s.IsNew)
                        s.Scop.Dispose();
                    for (var ii = 0, j = s.Jobs[0]; ii < s.Jobs.length; ii++, j = s.Jobs[ii])
                        j.Dispose();
                    s.Jobs = null;
                    s.Scop = null;
                }
                this.Stat = 0;
                this.instances.length = 0;
            };
            Controller.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                this.PDispose();
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            Controller.DPView = bind.DObject.CreateField("View", HTMLElement, null, function (e) { return e.__this.ViewChanged(e); }, function (e) { return e.__this.PDispose(); });
            Controller.processed = new Array();
            Controller.explorerJob = thread.Dispatcher.cretaeJob(Controller.pb, [null], null, false);
            return Controller;
        }(DObject));
        bind.Controller = Controller;
    })(bind = exports.bind || (exports.bind = {}));
    var utils;
    (function (utils) {
        var dbn = {};
        var Tree = /** @class */ (function () {
            function Tree(source, getParent, listen) {
                this.source = source;
                this.getParent = getParent;
                this.dic = new collection.Dictionary("nodes");
                this.OnChange = new bind.EventListener(this.source);
                this.OnChange.On = listen;
                this.Reset();
            }
            Tree.prototype.Remove = function (c) {
                if (this.OnRemove(c))
                    this.source.Remove(c);
            };
            Tree.prototype.Add = function (c) {
                this.OnAdd(c);
                this.source.Add(c);
            };
            Tree.prototype.Clear = function () {
                this.OnClear();
                this.source.Clear();
            };
            Tree.prototype.Reset = function () {
                this.OnClear();
                var e = this.source.AsList();
                for (var i = 0; i < e.length; i++)
                    this.OnAdd(e[i]);
            };
            Tree.prototype.OnAdd = function (target) {
                var parent = this.getParent(target);
                var node_parent;
                var node_target = this.dic.GetOrAdd(target, {
                    children: [], Value: target, Parent: null, get Depth() {
                        return this._depth ? this._depth : (this._depth = this.Parent ? this.Prent.Depth + 1 : 0);
                    }
                });
                if (parent) {
                    (node_parent = this.dic.GetOrAdd(parent, {
                        children: [], Value: parent, Parent: null, get Depth() {
                            return this._depth ? this._depth : (this._depth = this.Parent ? this.Prent.Depth + 1 : 0);
                        }
                    })).children.push(node_target);
                    node_target.Parent = node_parent;
                }
                this.OnChange.Invoke(this.source, [node_parent, node_target, true]);
            };
            Tree.prototype.getNodes = function () { return this.dic.getValues(); };
            Tree.prototype.getBases = function () {
                var t = [];
                var e = this.dic.getValues();
                for (var i = 0; i < e.length; i++)
                    if (e[i].Parent == null)
                        t.push(e[i]);
                return t;
            };
            Tree.prototype.OnRemove = function (item) {
                var node_target = this.dic.Get(item), parent = this.getParent(item);
                if (node_target)
                    if (node_target.children.length > 0)
                        return false;
                    else if (parent) {
                        var node_parent = this.dic.Get(parent);
                        var t = node_parent.children.indexOf(node_target);
                        if (t >= 0)
                            node_parent.children.splice(t, 1);
                    }
                this.OnChange.Invoke(this.source, [node_parent, node_target, false]);
                return true;
            };
            Tree.prototype.OnClear = function () {
                this.OnChange.Invoke(this.source, []);
                this.dic.Clear();
            };
            return Tree;
        }());
        utils.Tree = Tree;
        var RemoveRef = /** @class */ (function () {
            function RemoveRef(ref) {
                this.Ref = ref;
            }
            return RemoveRef;
        }());
        utils.RemoveRef = RemoveRef;
        var ListEventArgs = /** @class */ (function () {
            function ListEventArgs(oldItem, newItem, startIndex, event, collection) {
                this.oldItem = oldItem;
                this.newItem = newItem;
                this.startIndex = startIndex;
                this.event = event;
                this.collection = collection;
            }
            ListEventArgs.prototype.Dispose = function () {
                this.oldItem = null;
                this.newItem = null;
                this.startIndex = null;
                this.event = null;
            };
            Object.defineProperty(ListEventArgs, "ResetEvent", {
                get: function () {
                    return this._r || (this._r = new ListEventArgs(null, null, 0, collection.CollectionEvent.Reset, []));
                },
                enumerable: true,
                configurable: true
            });
            return ListEventArgs;
        }());
        utils.ListEventArgs = ListEventArgs;
        var Filter = /** @class */ (function (_super) {
            __extends(Filter, _super);
            function Filter() {
                var _this = _super.call(this) || this;
                _this._store = [];
                return _this;
            }
            Object.defineProperty(Filter.prototype, "Patent", {
                get: function () { return this._patent; },
                set: function (p) {
                    if (typeof p == 'string')
                        v = this.convertFromString(p);
                    var v = p;
                    if (!v) {
                        if (!this._patent)
                            return;
                        else if (this._patent.equals(null))
                            return;
                    }
                    else if (this._patent) {
                        if (v.equals(this._patent))
                            return;
                    }
                    //else return;
                    this._patent = v;
                    var s = this._store;
                    for (var i = 0; i < s.length; i++) {
                        var e = s[i];
                        e.callback(this, e.data);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Filter.prototype.OnChanged = function (callback, data, name) {
                var t = new filterCallback(callback, data, name, Date.now());
                this._store.push(t);
                return t.id;
            };
            Filter.prototype.OffChanged = function (name_id) {
                if (typeof (name_id) == 'string') {
                    var name = name_id;
                    var s = this._store;
                    for (var i = s.length - 1; i >= 0; i--) {
                        var e = s[i];
                        if (e.name == name) {
                            s.splice(i, 1);
                        }
                    }
                }
                else if (typeof (name_id) == 'number') {
                    var id_1 = name_id;
                    var s = this._store;
                    for (var i = s.length - 1; i >= 0; i--) {
                        var e = s[i];
                        if (e.id == id_1) {
                            s.splice(i, 1);
                            return;
                        }
                    }
                }
            };
            Filter.prototype._ismath = function (str) {
                for (var i = 0; i < str.length; i++)
                    if (str[i].indexOf(this._patent) !== -1)
                        return true;
                return false;
            };
            return Filter;
        }(bind.DObject));
        utils.Filter = Filter;
        var CostumeFilter = /** @class */ (function (_super) {
            __extends(CostumeFilter, _super);
            function CostumeFilter(_isMatch) {
                var _this = _super.call(this) || this;
                _this._isMatch = _isMatch;
                return _this;
            }
            CostumeFilter.prototype.IsMatch = function (index, item) {
                return this._isMatch == null ? true : this._isMatch(this._patent, item);
            };
            CostumeFilter.prototype.convertFromString = function (x) { return x; };
            CostumeFilter.prototype.Begin = function (deb, count) { };
            return CostumeFilter;
        }(Filter));
        utils.CostumeFilter = CostumeFilter;
        var filterCallback = /** @class */ (function () {
            function filterCallback(callback, data, name, id) {
                this.callback = callback;
                this.data = data;
                this.name = name;
                this.id = id;
                if (id == void 0)
                    id = Date.now();
            }
            return filterCallback;
        }());
        utils.filterCallback = filterCallback;
    })(utils = exports.utils || (exports.utils = {}));
    var collection;
    (function (collection_1) {
        var CollectionEvent;
        (function (CollectionEvent) {
            CollectionEvent[CollectionEvent["Added"] = 0] = "Added";
            CollectionEvent[CollectionEvent["Removed"] = 1] = "Removed";
            CollectionEvent[CollectionEvent["Replace"] = 2] = "Replace";
            CollectionEvent[CollectionEvent["Cleared"] = 3] = "Cleared";
            CollectionEvent[CollectionEvent["Reset"] = 4] = "Reset";
        })(CollectionEvent = collection_1.CollectionEvent || (collection_1.CollectionEvent = {}));
        var List = /** @class */ (function (_super) {
            __extends(List, _super);
            function List(argType, array) {
                var _this = _super.call(this) || this;
                _this.argType = argType;
                _this._list = [];
                _this._changed = [];
                if (array)
                    if (array.length)
                        for (var i = 0, len = array.length; i < len; i++)
                            _this._list.push(array[i]);
                _this.UCount();
                return _this;
            }
            List.__fields__ = function () { return [List.DPCount]; };
            List.prototype.UCount = function () { this.set(List.DPCount, this._list.length); };
            Object.defineProperty(List.prototype, "ArgType", {
                get: function () { return this.argType; },
                enumerable: true,
                configurable: true
            });
            List.prototype.GetType = function () { return reflection.GenericType.GetType(this.constructor, [this.argType]); };
            List.prototype.AsList = function () {
                return this._list;
            };
            List.prototype.Order = function (comp) {
                var p = this._list;
                var l = p.length;
                for (var i = 0; i < l; i++)
                    for (var j = i + 1; j < l; j++) {
                        if (!comp(p[i], p[j])) {
                            var c = p[j];
                            p[j] = p[i];
                            p[i] = c;
                        }
                    }
            };
            List.prototype.OrderBy = function (comp) {
                var x = this._list.sort(comp);
                this.OnChanged(null, 0, CollectionEvent.Reset, null, x);
            };
            List.prototype.Filtred = function (filter) {
                var c = new ExList(this.argType);
                c.Filter = filter;
                c.Source = this;
                return c;
            };
            List.prototype.Set = function (i, value) {
                throw 'not implimented';
            };
            List.prototype.Get = function (i) {
                if (i < 0)
                    return null;
                if (this._list.length <= i)
                    return null;
                return this._list[i];
            };
            List.prototype.Insert = function (i, item) {
                if (this._isFrozen)
                    return;
                if (i >= 0 && i <= this._list.length) {
                    this._list.splice(i, 0, item);
                    this.OnChanged(item, i, CollectionEvent.Added, null);
                    return true;
                }
                return false;
            };
            List.prototype.Freeze = function () {
                this._isFrozen = true;
            };
            List.prototype.Add = function (item) {
                if (this._isFrozen)
                    return;
                if (item == null)
                    throw 'NullArgument detected';
                this._list.push(item);
                this.OnChanged(item, this._list.length - 1, CollectionEvent.Added, null);
                return this;
            };
            List.prototype.AddRange = function (items) {
                if (this._isFrozen)
                    return;
                for (var i = 0; i < items.length; i++) {
                    this.Add(items[i]);
                }
            };
            List.prototype.CheckIndex = function (i) {
                return i >= 0 && i < this._list.length;
            };
            List.prototype.Remove = function (item) {
                if (this._isFrozen)
                    return;
                if (typeof item != "number")
                    item = this.IndexOf(item);
                return this.RemoveAt(item);
            };
            List.prototype.RemoveAt = function (item) {
                if (this._isFrozen)
                    return;
                if (typeof item != "number")
                    return;
                if (this.CheckIndex(item)) {
                    var t = this._list[item];
                    this._list.splice(item, 1);
                    this.OnChanged(t, item, CollectionEvent.Removed, t);
                    return true;
                }
                return false;
            };
            List.prototype.Clear = function () {
                if (this._isFrozen)
                    return;
                var l = this._list.length;
                if (l > 0) {
                    this.OnChanged(null, 0, CollectionEvent.Cleared, null, this._list.splice(0, this._list.length));
                }
            };
            Object.defineProperty(List.prototype, "Count", {
                get: function () { return this._list.length; },
                enumerable: true,
                configurable: true
            });
            List.prototype.IndexOf = function (item) {
                return this._list.indexOf(item);
            };
            Object.defineProperty(List.prototype, "Listen", {
                set: function (delegate) {
                    var er;
                    this._changed.push(delegate);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(List.prototype, "Unlisten", {
                set: function (delegate) {
                    var x = this._changed.indexOf(delegate);
                    if (x < 0)
                        return;
                    this._changed.slice(x, 1);
                },
                enumerable: true,
                configurable: true
            });
            List.prototype.OnChanged = function (item, startIndex, event, oldItem, collection) {
                var e = new utils.ListEventArgs(oldItem, item, startIndex, event, collection);
                var l = this._changed.length;
                this.UCount();
                for (var i = 0; i < l; i++) {
                    var con = this._changed[i];
                    if (typeof con === 'function')
                        con(e);
                    else {
                        con.Invoke.call(con.Owner, e);
                    }
                }
            };
            List.prototype.getArgType = function (json) {
                var type = this.ArgType;
                if (type != null)
                    return type;
                var typeName = json['__argtype__'];
                type = (typeName == undefined ? Object : context_1.context.GetType(typeName));
                return (type == undefined) ? this.argType == undefined ? Object : this.argType : type;
            };
            List.prototype.ToJson = function (x, indexer) {
                indexer = indexer == undefined ? x.getJson(this) : indexer;
                var ret = x.getJson(this);
                if (indexer.valid)
                    return indexer.ref;
                else
                    ret = _super.prototype.ToJson.call(this, x, indexer);
                indexer.valid = true;
                var list = [];
                var t = this._list;
                for (var i = 0; i < t.length; i++) {
                    var d = t[i];
                    d = x.ToJson(d);
                    list.push(d);
                }
                ret['__list__'] = list;
                ret['__argtype__'] = context_1.context.NameOf(this.argType);
                return ret;
            };
            List.prototype.FromJson = function (json, x, update, callback) {
                _super.prototype.FromJson.call(this, json, x, update);
                var list = json['__list__'] || [];
                var ol = this._list;
                this._list = new Array(0);
                var type = this.argType = this.getArgType(json);
                for (var i = 0; i < list.length; i++) {
                    var c = list[i];
                    if (c === undefined)
                        continue;
                    var st = List.getType(c);
                    if (st === undefined)
                        st = this.argType;
                    x.FromJson(c, st === undefined ? type : st, new encoding.LPath(this, i));
                }
                this.OnDeserialize(this._list);
                if (json != null && json.IsFrozen)
                    this.Freeze();
                return this;
            };
            List.prototype.OnDeserialize = function (list) {
            };
            List.getType = function (json) {
                var tn = json['__type__'];
                if (tn == undefined)
                    return undefined;
                return context_1.context.GetType(tn);
            };
            List.GenType = function (T) { return reflection.GenericType.GetType(this, [T]); };
            List.DPCount = List.CreateField('Count', Number, 0, null, null, 2);
            return List;
        }(bind.DObject));
        collection_1.List = List;
        var Dictionary = /** @class */ (function (_super) {
            __extends(Dictionary, _super);
            function Dictionary(Name, ReadOnly) {
                var _this = _super.call(this) || this;
                _this.Name = Name;
                _this.ReadOnly = ReadOnly;
                _this.keys = [];
                _this.values = [];
                _this._changed = [];
                ReadOnly = ReadOnly == null ? true : false;
                return _this;
            }
            Dictionary.prototype.GetKeyAt = function (i) { return this.keys[i]; };
            Dictionary.prototype.GetValueAt = function (i) { return this.values[i]; };
            Object.defineProperty(Dictionary.prototype, "Count", {
                get: function () { return this.keys.length; },
                enumerable: true,
                configurable: true
            });
            Dictionary.prototype.Clear = function () {
                this.keys.length = 0;
                this.values.length = 0;
                this.OnChanged(null, null, CollectionEvent.Cleared, null);
            };
            Dictionary.prototype.IndexOf = function (key, fromIndex) {
                return this.keys.indexOf(key, fromIndex);
            };
            Dictionary.prototype.IndexOfValue = function (val, fromIndex) {
                return this.values.indexOf(val, fromIndex);
            };
            Dictionary.prototype.Set = function (key, value) {
                var i = this.keys.indexOf(key);
                if (i === -1) {
                    i = this.keys.length;
                    this.keys.push(key);
                }
                else if (this.ReadOnly)
                    if (this.values[i] === value)
                        return;
                    else
                        throw "key is exist";
                this.values[i] = value;
            };
            Dictionary.prototype.Remove = function (key) {
                var i = this.keys.indexOf(key);
                if (i === -1)
                    return undefined;
                var val = this.values[i];
                this.values.splice(i, 1);
                this.keys.splice(i, 1);
                return val;
            };
            Dictionary.prototype.RemoveAllValues = function (val) {
                var keys = [];
                do {
                    var i = this.values.indexOf(val, i);
                    if (i === -1)
                        return keys;
                    keys.push(this.keys[i]);
                    this.values.splice(i, 1);
                    this.keys.splice(i, 1);
                } while (true);
            };
            Dictionary.prototype.RemoveAt = function (i) {
                if (i < this.keys.length && i >= 0) {
                    var r = { Key: this.keys[i], Value: this.values[i] };
                    this.values.splice(i, 1);
                    this.keys.splice(i, 1);
                    return r;
                }
                return undefined;
            };
            Dictionary.prototype.getValues = function () { return this.values; };
            Dictionary.prototype.Get = function (key) {
                var i = this.keys.indexOf(key);
                return i === -1 ? null : this.values[i];
            };
            Dictionary.prototype.GetOrAdd = function (key, value) {
                var i = this.keys.indexOf(key);
                if (i !== -1)
                    return this.values[i];
                this.keys.push(key);
                this.values.push(value);
                return value;
            };
            Dictionary.prototype.GetOrCreate = function (key, New, param) {
                var i = this.keys.indexOf(key);
                if (i !== -1)
                    return this.values[i];
                var value = New(key, param);
                this.keys.push(key);
                this.values.push(value);
                return value;
            };
            Dictionary.prototype.GetKeyOf = function (val) {
                var i = this.values.indexOf(val);
                return i === -1 ? undefined : this.keys[i];
            };
            Object.defineProperty(Dictionary.prototype, "Listen", {
                set: function (delegate) {
                    this._changed.push(delegate);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Dictionary.prototype, "Unlisten", {
                set: function (delegate) {
                    var x = this._changed.indexOf(delegate);
                    if (x < 0)
                        return;
                    this._changed.slice(x, 1);
                },
                enumerable: true,
                configurable: true
            });
            Dictionary.prototype.OnChanged = function (item, startIndex, event, oldItem) {
                var e = new utils.ListEventArgs(oldItem, item, startIndex, event);
                var l = this._changed.length;
                for (var i = 0; i < l; i++) {
                    var con = this._changed[i];
                    con(e);
                }
            };
            return Dictionary;
        }(bind.DObject));
        collection_1.Dictionary = Dictionary;
        var ExList = /** @class */ (function (_super) {
            __extends(ExList, _super);
            function ExList(argType) {
                var _this = _super.call(this, argType) || this;
                _this._fid = null;
                _this.sicd = { Owner: _this, Invoke: _this.sourceItemChanged };
                return _this;
            }
            Object.defineProperty(ExList.prototype, "Source", {
                get: function () { return this.get(ExList.DPSource); },
                set: function (value) { this.set(ExList.DPSource, value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ExList.prototype, "Filter", {
                get: function () { return this.get(ExList.DPFilter); },
                set: function (value) { this.set(ExList.DPFilter, value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ExList.prototype, "MaxResult", {
                get: function () { return this.get(ExList.DPMaxResult); },
                set: function (value) { this.set(ExList.DPMaxResult, value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ExList.prototype, "Shift", {
                get: function () { return this.get(ExList.DPShift); },
                set: function (value) { this.set(ExList.DPShift, value); },
                enumerable: true,
                configurable: true
            });
            ExList.__fields__ = function () { return [ExList.DPFilter, ExList.DPMaxResult, ExList.DPShift, ExList.DPSource]; };
            ExList.prototype.filterChanged = function (e) {
                if (e._old)
                    e._old.OffChanged(this._fid);
                if (e._new)
                    this._fid = e._new.OnChanged(ExList.patentChanged, this);
                this.Reset();
            };
            ExList.prototype.sourceChanged = function (e) {
                if (e._old)
                    e._old.Unlisten = this.sicd;
                if (e._new)
                    e._new.Listen = this.sicd;
                this.Reset();
            };
            ExList.prototype.MaxResultChanged = function (e) {
                this.Reset();
            };
            ExList.New = function (source, filter, argType) {
                var t = new ExList(source == null ? argType : source.ArgType);
                t.Filter = filter;
                t.Source = source;
                return t;
            };
            ExList.patentChanged = function (e, t) {
                t.Reset();
            };
            ExList.prototype.sourceItemChanged = function (e) {
                switch (e.event) {
                    case CollectionEvent.Added:
                        if (this.MaxResult <= this.Count)
                            return;
                        if (this.isMatch(e.startIndex, e.newItem))
                            this.Add(e.newItem);
                        return;
                    case CollectionEvent.Cleared:
                        return this.Clear();
                    case CollectionEvent.Removed:
                        this.Remove(e.oldItem);
                        return;
                    case CollectionEvent.Replace:
                        var i = this.IndexOf(e.oldItem);
                        var m = this.isMatch(e.startIndex, e.newItem);
                        if (m) {
                            if (i == -1)
                                this.Add(e.newItem);
                            else
                                this.Set(i, e.newItem);
                        }
                        else if (i != -1)
                            this.RemoveAt(i);
                        return;
                    case CollectionEvent.Reset:
                        return this.Reset();
                }
            };
            ExList.prototype.isMatch = function (i, item) {
                var f = this.Filter;
                if (f == null)
                    return true;
                return f.IsMatch(i, item);
            };
            ExList.prototype.Reset = function () {
                this.Clear();
                var s = this.Source;
                if (s == null)
                    return;
                var f = this.Filter;
                var fin = f == null;
                var max = this.MaxResult;
                if (!fin)
                    if (f.Begin(this.Shift, this.MaxResult))
                        this.AddRange(s.AsList());
                    else
                        for (var i = 0, l = s.Count; i < l && max > 0; i++) {
                            var e = s.Get(i);
                            if (fin)
                                this.Add(e);
                            else {
                                var r = f.IsMatch(i, e);
                                if (r === null)
                                    break;
                                if (r)
                                    this.Add(e);
                            }
                        }
            };
            ExList.DPSource = bind.DObject.CreateField("Source", List, null, function (e) { e.__this.sourceChanged(e); });
            ExList.DPFilter = bind.DObject.CreateField("Filter", utils.Filter, null, function (e) { e.__this.filterChanged(e); });
            ExList.DPMaxResult = bind.DObject.CreateField("MaxResult", Number, Infinity, function (e) { e.__this.MaxResultChanged(e); });
            ExList.DPShift = bind.DObject.CreateField("Shift", Number, 0, function (e) { e.__this.MaxResultChanged(e); });
            return ExList;
        }(List));
        collection_1.ExList = ExList;
        var Binding = /** @class */ (function () {
            function Binding(dataContext) {
                this.DataContext = dataContext;
            }
            Binding.prototype.GetType = function () { return Binding; };
            Object.defineProperty(Binding.prototype, "DataContext", {
                get: function () { return this._dataContext; },
                set: function (value) {
                    if (value == this._dataContext)
                        return;
                    var t = this._dataContext;
                    if (t != null)
                        t.Unlisten = this.initChanged;
                    if (value != null)
                        value.Listen = this.initChanged;
                    this._dataContext = value;
                    this.OnSourceInitialized(t, value);
                },
                enumerable: true,
                configurable: true
            });
            Binding.prototype.initChanged = function (e) {
                switch (e.event) {
                    case collection.CollectionEvent.Added:
                        this.OnItemAdded(e.newItem, e.startIndex);
                        break;
                    case collection.CollectionEvent.Removed:
                        this.OnItemRemoved(e.oldItem, e.startIndex);
                        break;
                    case collection.CollectionEvent.Cleared:
                        this.OnSourceCleared();
                        break;
                    case collection.CollectionEvent.Reset:
                        this.OnSourceReset();
                        break;
                    case collection.CollectionEvent.Replace:
                        this.OnSourceReplace(e.oldItem, e.newItem, e.startIndex);
                }
            };
            return Binding;
        }());
        collection_1.Binding = Binding;
        var Render = /** @class */ (function (_super) {
            __extends(Render, _super);
            function Render(dataContext) {
                return _super.call(this, dataContext) || this;
            }
            Render.prototype.GetType = function () { return Render; };
            Object.defineProperty(Render.prototype, "RendredList", {
                get: function () {
                    if (this._rendredList == null)
                        this._rendredList = new collection.List(Object, []);
                    return this._rendredList;
                },
                enumerable: true,
                configurable: true
            });
            Render.prototype.OnItemAdded = function (item, index) {
                this.RendredList.Insert(index, this.Render(item));
            };
            Render.prototype.OnItemRemoved = function (item, index) {
                this.RendredList.RemoveAt(index);
            };
            Render.prototype.OnSourceCleared = function () {
                this.RendredList.Clear();
            };
            Render.prototype.OnSourceInitialized = function (_old, _nex) {
                if (_nex != null) {
                    var c = _nex.Count;
                    this.RendredList.Clear();
                    for (var i = 0; i < c; i++) {
                        var e = _nex.Count;
                        this._rendredList.Add(this.Render(_nex.Get(e)));
                    }
                }
            };
            return Render;
        }(Binding));
        collection_1.Render = Render;
        /*
        export class Enum extends collection.List<basic. EnumValue> {
            private x = {};
            Add(v: basic.EnumValue) { return this; }
            Get(n: number) {
                var l = this.AsList();
                if (typeof n === 'number')
                    for (var i = 0; i < l.length; i++)
                        if (l[i].Value === n) return l[i]; else;
                else for (var i = 0; i < l.length; i++)
                    if (l[i].Name === (n as any)) return l[i];
                return null;
            }
            static gen(_enum) {
                var o = [];
                for (var i in _enum)
                    if (isNaN(parseFloat(i)))
                        o.push(new basic.EnumValue(i, _enum[i]));
                return o;
            }
            constructor(_enum: any) {
                super(basic.EnumValue, Enum.gen(_enum));
                this.Freeze();
            }
        }*/
    })(collection = exports.collection || (exports.collection = {}));
    var mvc;
    (function (mvc_1) {
        var ITemplate = /** @class */ (function () {
            function ITemplate(Category) {
                this.Category = Category;
            }
            return ITemplate;
        }());
        mvc_1.ITemplate = ITemplate;
        var iTemplate = /** @class */ (function (_super) {
            __extends(iTemplate, _super);
            function iTemplate(relativeUrl, category, shadow) {
                var _this = _super.call(this, category) || this;
                _this._isLoaded = false;
                if (relativeUrl == null)
                    throw "url is null";
                if (category == null)
                    throw "category is null";
                _this._Url = relativeUrl;
                if (shadow == undefined)
                    return _this;
                _this.Shadow = shadow;
                return _this;
            }
            Object.defineProperty(iTemplate.prototype, "Url", {
                get: function () {
                    return this._Url;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(iTemplate.prototype, "Shadow", {
                get: function () {
                    return this._Shadow;
                },
                set: function (v) {
                    if (v != null) {
                        if (!(v instanceof HTMLElement))
                            throw 'shadow is not HTMLElement';
                        this._isLoaded = true;
                    }
                    this._Shadow = v;
                },
                enumerable: true,
                configurable: true
            });
            iTemplate.prototype.Create = function () {
                var s = this._Shadow;
                return s == null ? null : s.content.firstElementChild.cloneNode(true);
            };
            iTemplate.prototype.Load = function () {
            };
            return iTemplate;
        }(ITemplate));
        mvc_1.iTemplate = iTemplate;
        var MvcDescriptor = /** @class */ (function () {
            function MvcDescriptor(name, dataType) {
                this.Templates = new collection.List(ITemplate);
                if (name == null)
                    throw "name is null";
                if (typeof name != 'string')
                    throw "name is not string";
                name = name.trim();
                if (name == "")
                    throw "name is empty";
                if (!(dataType instanceof Function))
                    dataType = this.Get; // throw "dataType is not a Type";
                this.Name = name;
                this.DataType = dataType;
                MvcDescriptor._store[name] = this;
            }
            Object.defineProperty(MvcDescriptor.prototype, "Count", {
                get: function () {
                    return this.Templates.Count;
                },
                enumerable: true,
                configurable: true
            });
            MvcDescriptor.prototype.Get = function (index) {
                if (typeof index == 'number')
                    return this.Templates.Get(index);
                if (typeof index == 'string')
                    for (var i = 0; i < this.Templates.Count; i++) {
                        var t = this.Templates.Get(i);
                        if (t.Category == index)
                            return t;
                    }
                return null;
            };
            MvcDescriptor.GetByType = function (datatype) {
                for (var mcv in MvcDescriptor._store) {
                    if (MvcDescriptor._store.hasOwnProperty(mcv)) {
                        var p = MvcDescriptor._store[mcv];
                        if (p.DataType == datatype)
                            return p;
                    }
                }
                return null;
            };
            MvcDescriptor.GetByName = function (templateName) {
                return MvcDescriptor._store[templateName];
            };
            MvcDescriptor.Add = function (template, path) {
                if (path == null)
                    path = template.getAttribute('name');
                var ps = path.split('.');
                if (ps.length == 0)
                    throw "invalid template name";
                if (ps.length == 1)
                    var mvc = this.GetByName('templates') || (this._store['templates'] = new MvcDescriptor('templates', bind.DObject));
                else if (ps.length == 2)
                    var mvc = this.GetByName(ps[0]) || (this._store[ps[0]] = new MvcDescriptor(ps[0], Object)), path = ps[1];
                else
                    throw "invalid template path argument";
                mvc.registerTemplate(template, './#templates/' + mvc.Name + '/' + path, path);
            };
            MvcDescriptor.prototype.Add = function (templ) {
                if (templ instanceof mvc.ITemplate)
                    this.Templates.Add(templ);
                return this;
            };
            MvcDescriptor.Get = function (templatePath) {
                var path = templatePath.split(/[\s\\\/\.]+/);
                if (path.length == 0)
                    return null;
                var p1 = path[0];
                var mvc = this.GetByName(p1);
                if (mvc != null) {
                    var p2 = path[1];
                    if (p2)
                        return mvc.Get(p2) || mvc.Get(0);
                    return mvc.Get(0);
                }
                return null;
            };
            MvcDescriptor.prototype.registerTemplate = function (cat, url, name) {
                if (cat.tagName !== 'TEMPLATE')
                    throw 'unresolved tag ' + cat.tagName;
                var templateName = name || cat.getAttribute('name');
                if (templateName == null)
                    throw 'template must have a name \r\nfrom :' + url;
                if (cat.children.length > 1) {
                    console.warn('the template must be encapsuled in single tag');
                    var v = document.createElement('div');
                    v.innerHTML = cat.innerHTML;
                    cat.innerHTML = '';
                    cat.appendChild(v);
                }
                this.Add(new mvc.iTemplate(url + '#' + name + '+' + templateName, templateName, cat));
            };
            MvcDescriptor._store = {};
            return MvcDescriptor;
        }());
        mvc_1.MvcDescriptor = MvcDescriptor;
        var Initializer = /** @class */ (function () {
            function Initializer(require) {
                this.require = require;
                this._id = false;
                this.tempsGroup = [];
                this.pending = 0;
                this.templatesDescrpt = this.getDescriptor("templates", bind.DObject);
                if (require == null)
                    throw 'require argument is null';
                _Instance.push(this);
                this.Init();
                this.Load();
            }
            Object.defineProperty(Initializer, "Instances", {
                get: function () {
                    return _Instance;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Initializer.prototype, "System", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Initializer.prototype.Add = function (templGroup) {
                if (this.tempsGroup.indexOf(templGroup) !== -1)
                    return;
                this.tempsGroup.push(templGroup);
            };
            Initializer.prototype.Load = function () {
                var s = this.System;
                for (; this.tempsGroup.length > 0;) {
                    this.pending++;
                    var tmpltg = this.tempsGroup.pop();
                    this.require('template:' + tmpltg.Url, Initializer.gonsuccess, Initializer.gonerror, { _this: this, tmpl: tmpltg });
                }
                for (var i = 0; i < s.Count; i++) {
                    var mvc = s.Get(i);
                    for (var j = 0; j < mvc.Count; j++) {
                        var tmplt = mvc.Get(j);
                        if (tmplt instanceof iTemplate) {
                            this.pending++;
                            this.require('template:' + tmplt.Url, Initializer.onsuccess, Initializer.onerror, { _this: this, tmpl: tmplt });
                        }
                    }
                }
            };
            Initializer.SetTypeResolver = function (name, typeResolver) {
                Initializer.typeResolvers[name] = typeResolver;
            };
            Initializer.gonsuccess = function (r) {
                var t = this;
                var _this = t._this;
                _this.pending--;
                _this.ExcecuteTemplate(t.tmpl.Url, _this.htmlToElements(r).children.item(0));
                if (t.tmpl.OnSuccess)
                    thread.Dispatcher.call(t.tmpl, t.tmpl.OnSuccess, t._this);
                if (_this.pending === 0)
                    Initializer.onfinish(t._this);
            };
            Initializer.gonerror = function (r) {
                var t = this;
                t._this.pending--;
                console.error(" Group of templates [" + t.tmpl.Url + "]: error downloading");
                if (t.tmpl.OnError)
                    thread.Dispatcher.call(t.tmpl, t.tmpl.OnError, t._this);
                if (t._this.pending === 0)
                    Initializer.onfinish(t._this);
            };
            Initializer.onsuccess = function (r) {
                var t = this;
                var tmpl = t.tmpl;
                var _this = t._this;
                _this.pending--;
                tmpl.Shadow = _this.htmlToElements(r);
                if (_this.pending === 0)
                    Initializer.onfinish(t._this);
            };
            Initializer.onerror = function (r) {
                var t = this;
                t._this.pending--;
                console.error("template [" + t.tmpl.Url + "] error downloading");
                t.tmpl.Shadow = t._this.html2Template("<error>Error Downloading Template</error>");
                if (t._this.pending === 0)
                    Initializer.onfinish(t._this);
            };
            Initializer.prototype.html2Template = function (html) {
                var t = document.createElement('template');
                t.innerHTML = html;
                return t;
            };
            Initializer.prototype.htmlToElements = function (html) {
                var t = document.createElement('div');
                t.innerHTML = html;
                return t;
            };
            Initializer.prototype.then = function (call) {
                if (this.pending <= 0)
                    return call(this);
                Initializer.callbacks.push(call);
            };
            Initializer.then = function (call) {
                Initializer.callbacks.push(call);
            };
            Initializer.prototype.onfinish = function () {
                for (var i = 0; i < Initializer.callbacks.length; i++)
                    Initializer.callbacks[i](this);
            };
            Initializer.onfinish = function (t) {
                for (var i = 0; i < Initializer.callbacks.length; i++)
                    Initializer.callbacks[i](t);
            };
            Initializer.Get = function (type) {
                var s = _Instance;
                for (var i = 0, l = s.length; i < l; i++) {
                    var n = s[i].System;
                    var l = n.Count;
                    for (var i = 0; i < l; i++) {
                        var e = n.Get(i);
                        if (e.DataType == type)
                            return e;
                    }
                }
                return null;
            };
            Initializer.prototype.getDescriptor = function (name, type) {
                if (!name && !type)
                    return this.templatesDescrpt;
                if (name)
                    var descipter = MvcDescriptor.GetByName(name);
                if (!descipter && type)
                    descipter = MvcDescriptor.GetByType(type);
                if (!descipter)
                    this.System.Add(descipter = new MvcDescriptor(name, type));
                else if (descipter.Name !== name || descipter.DataType !== type)
                    throw "Conflit with others template";
                return descipter;
            };
            Initializer.prototype.ExcecuteTemplate = function (url, templ, typeResolver) {
                var types = {};
                var nameTypess = {};
                var templatesDescrpt = this.getDescriptor("templates", bind.DObject);
                function getType(name) {
                    var t = types[name];
                    if (t != null)
                        return t;
                    if (typeResolver)
                        t = typeResolver(name);
                    if (t == null || !(t instanceof Function)) {
                        t = context_1.context.GetType(name);
                        if (t == undefined || !(t instanceof Function))
                            throw "type " + name + " unresolved";
                    }
                    types[name] = t;
                    return t;
                }
                this.registerTemplates(templ, url, getType, templatesDescrpt);
            };
            Initializer.prototype.registerTemplates = function (dom, url, getType, descriptor) {
                var des;
                var name = dom.getAttribute('name');
                var type = dom.hasAttribute('type') ? getType(dom.getAttribute('type')) : undefined;
                var templatesDescrpt1 = dom.hasAttribute('name') ? this.getDescriptor(name, type) || descriptor : descriptor;
                for (var i = 0; i < dom.children.length; i++) {
                    des = dom.children.item(i);
                    if (des.tagName === 'DESCRIPTOR')
                        this.registerDescriptor(des, url, getType);
                    else if (des.tagName === "TEMPLATE")
                        this.registerTemplate(des, templatesDescrpt1, url);
                    else if (des.tagName === "TEMPLATES")
                        this.registerTemplates(des, url, getType, descriptor);
                    else
                        console.warn('unresolved tag ' + des.tagName);
                }
            };
            Initializer.prototype.registerDescriptor = function (des, url, getType) {
                var name = des.getAttribute('name');
                var type = getType(des.getAttribute('type'));
                var descipter = this.getDescriptor(name, type);
                for (var j = 0; j < des.children.length; j++) {
                    var tmpl = des.children.item(j);
                    this.registerTemplate(tmpl, descipter, url);
                }
            };
            Initializer.prototype.registerTemplate = function (cat, descipter, url) {
                if (cat.tagName !== 'TEMPLATE')
                    throw 'unresolved tag ' + cat.tagName;
                var templateName = cat.getAttribute('name');
                if (templateName == null)
                    throw 'template must have a name \r\nfrom :' + url;
                if (cat.children.length > 1) {
                    console.warn('the template must be encapsuled in single tag');
                    var v = document.createElement('div');
                    v.innerHTML = cat.innerHTML;
                    cat.innerHTML = '';
                    cat.appendChild(v);
                }
                descipter.Add(new mvc.iTemplate(url + '#' + name + '+' + templateName, templateName, cat));
            };
            Initializer.typeResolvers = {};
            Initializer.callbacks = [];
            return Initializer;
        }());
        mvc_1.Initializer = Initializer;
        var Template = /** @class */ (function () {
            function Template(templateDOM) {
                this._name = "";
                this._for = "";
                if (Template._store === undefined)
                    Template._store = new collection.List(Template);
                if (Template.fromInside == true) {
                    this._view = templateDOM;
                    this._name = templateDOM.getAttribute("name");
                    this._for = templateDOM.getAttribute("for");
                    if (this._name == null)
                        throw "name is null";
                    Template._store.Add(this);
                }
                else
                    throw "Access violatile";
            }
            Object.defineProperty(Template.prototype, "forType", {
                get: function () { return this._type; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Template.prototype, "View", {
                get: function () { return this._view; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Template.prototype, "Name", {
                get: function () { return this._name; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Template.prototype, "For", {
                get: function () { return this._for; },
                enumerable: true,
                configurable: true
            });
            Template.getTemplates = function (type) {
                var c = Template._store;
                var rt = [];
                for (var i = c.Count - 1; i >= 0; i--) {
                    var t = c.Get(i);
                    if (t.forType == type)
                        rt.push(t);
                }
                return rt;
            };
            Template.LoadTemplate = function (templateName, context) {
                var templatePath = Template.TempplatesPath + templateName;
                Template.getWebRequest().Download(new net.RequestUrl(templatePath, context), null);
            };
            Template.getWebRequest = function () {
                if (Template._webRequest)
                    return Template._webRequest;
                var c = basic.Crypto;
                var w = new net.WebRequest(c);
                w.OnComplete.On = Template.OnRecieveTemplates;
                return Template._webRequest = w;
            };
            Template.OnRecieveTemplates = function (result) {
                if (Template.getWebRequest().IsSuccess == false)
                    return;
                var x = Template.getWebRequest();
                var r = x.Response;
                var templates = document.createElement("templates");
                templates.innerHTML = r;
                templates = templates.firstChild;
                for (var i = 0; i < templates.childElementCount; i++) {
                    Template.createTemplate(templates.children.item(i));
                }
            };
            Template.createTemplate = function (tmplate) {
                Template.fromInside = true;
                var t = null;
                try {
                    t = new Template(tmplate);
                }
                catch (error) {
                }
                Template.fromInside = false;
                return t;
            };
            Template.GetAll = function (name) {
                if (arguments.length == 2)
                    var a = Template._store;
                var x = [];
                for (var i = 0; i < a.Count; i++) {
                    var t = a.Get(i);
                    if (t._name == name)
                        x.push(t);
                }
                return x;
            };
            Template.Get = function (name, vtype) {
                var a = Template._store;
                for (var i = 0; i < a.Count; i++) {
                    var t = a.Get(i);
                    if (t._name == name && vtype == t._for)
                        return t;
                }
                return null;
            };
            Template.Foreach = function (callback) {
                var s = Template._store;
                for (var i = s.Count - 1; i >= 0; i--) {
                    var t = s.Get(i);
                    if (callback(t))
                        return;
                }
            };
            Template.TempplatesPath = "./templates/";
            Template.fromInside = false;
            return Template;
        }());
        mvc_1.Template = Template;
    })(mvc = exports.mvc || (exports.mvc = {}));
    (function (bind) {
        var key = new Object();
        var Scop = /** @class */ (function (_super) {
            __extends(Scop, _super);
            function Scop(_bindingMode) {
                var _this = _super.call(this) || this;
                _this._scops = {};
                _this.jobs = [];
                _this.mjobs = {};
                if (_this.constructor == Scop)
                    throw "abstract class";
                _this._bindingMode = _bindingMode == null ? 1 : _bindingMode;
                return _this;
            }
            Scop.prototype.GenType = function () { return Scop; };
            Scop.prototype.getScop = function (path, createIfNotEist) {
                return Scop.getScop(this, path.split(/[\s\\\/\.]+/), createIfNotEist);
            };
            Scop.prototype.findScop = function (path) {
                var cs = this;
                do {
                    var t = path.pop();
                    switch (t) {
                        case '.':
                            continue;
                        case '..':
                            stop();
                            cs = cs.getParent();
                            break;
                        default:
                            var c = t.charCodeAt(0);
                            if (c === 36 || c === 126)
                                throw "optimize your code by delete the first part befor ($|~)";
                            if (c === 64) {
                            }
                            cs = cs._scops[t];
                            break;
                    }
                } while (path.length > 0);
            };
            Scop.getScop = function (scp, name, createIfNotEist) {
                while (true) {
                    if (name.length === 0)
                        return scp;
                    var fname = name.shift();
                    var s = void 0;
                    if (scp._scops.hasOwnProperty(fname))
                        s = scp._scops[fname];
                    else if (createIfNotEist) {
                        scp._scops[fname] = s = new ValueScop(null);
                        s.setParent(scp);
                    }
                    else
                        return null;
                    scp = s;
                }
            };
            Scop.prototype.setToScop = function (name, value) {
                var s = this.getScop(name, true);
                s.Value = value;
            };
            Scop.__fields__ = function () {
                return [Scop.DPValue];
            };
            Object.defineProperty(Scop.prototype, "Value", {
                get: function () { return this.get(Scop.DPValue); },
                set: function (value) {
                    var e = this.set(Scop.DPValue, value);
                    if (this._bindingMode && e != null)
                        this._OnValueChanged(e);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scop.prototype, "BindingMode", {
                get: function () { return this._bindingMode; },
                set: function (value) { this._bindingMode = value == null ? 1 : value; },
                enumerable: true,
                configurable: true
            });
            Scop.prototype.valueChanged = function (sender, e) {
                e.__this._OnValueChanged(e);
            };
            Scop.Create = function (s, parent, bindingMode) {
                bindingMode = bindingMode == null ? 1 : bindingMode;
                var e = s.split('|');
                var p;
                if (e.length === 1)
                    return this.GetScop(s.split(/[\s\\\/\.]+/), parent, bindingMode);
                for (var i = 0; i < e.length; i += 2) {
                    var f1 = e[i], f2 = e[i + 1];
                    parent = f1.length === 0 ? parent : this.GetScop(f1.split(/[\.]+/), parent, bindingMode);
                    parent = f2.length == 0 ? parent : CreateFilter(f2, parent, bindingMode || 3) || parent;
                }
                return parent;
            };
            Scop.GetScop = function (path, parent, bindngMode) {
                while (path.length > 0) {
                    var t = path[0];
                    switch (t.charAt(0)) {
                        case '$':
                            t = t.substring(1);
                            parent = NamedScop.Create(t, bindngMode);
                            path.shift();
                            continue;
                        case '*':
                            t = t.substring(1);
                            parent = Scop.getScop(parent, t.split('*'), true);
                            path.shift();
                            continue;
                        case '~':
                            parent = AnonymouseScop.UnRegister(parseInt(t.substring(1)));
                            path.shift();
                            continue;
                        case '^':
                            parent = parent.getParent();
                            path.shift();
                            continue;
                        case '@':
                            t = t.substring(1).trim();
                            if (t.length > 0)
                                parent = new bind.Bind(path.join('.'), parent, bindngMode);
                            parent = new bind.StringScop("", parent);
                            break;
                        case '':
                            return parent;
                        default:
                            return new bind.Bind(path.join('.'), parent, bindngMode);
                    }
                }
                return parent;
            };
            Scop.prototype.AddJob = function (job, dom) {
                var ji;
                this.jobs.push(ji = new bind.JobInstance(this, job, dom));
                if (job.OnInitialize != null)
                    job.OnInitialize(ji, null);
                return ji;
            };
            Scop.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                for (var i = 0; i < this.jobs.length; i++) {
                    var ji = this.jobs[i];
                    if (ji.IsDisposed)
                        continue;
                    ji.Dispose();
                }
                this.jobs.length = 0;
                this.jobs = null;
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            Scop.prototype.RegisterJob = function (job) {
                this.mjobs[job.Name] = job;
            };
            Scop.prototype.GetJob = function (name) {
                return this.mjobs[name];
            };
            Scop.DPValue = bind.DObject.CreateField("Value", Object, null, null);
            return Scop;
        }(bind.DObject));
        bind.Scop = Scop;
        var StringScop = /** @class */ (function (_super) {
            __extends(StringScop, _super);
            function StringScop(s, parent) {
                var _this = _super.call(this, bind.BindingMode.SourceToTarget) || this;
                _this.parent = parent;
                _this.sc = basic.StringCompile.Compile(s);
                return _this;
            }
            StringScop.prototype._OnValueChanged = function (e) { };
            StringScop.prototype.getParent = function () { return this.parent; };
            StringScop.prototype.setParent = function (v) {
                var lp = this.parent;
                if (lp && this.pb)
                    lp.removeEvent(bind.Scop.DPValue, this.pb);
                if (v)
                    v.addEvent(bind.Scop.DPValue, this.pb = new bind.PropBinding(this.ParentValueChanged, this));
                else
                    this.pb = null;
                this.parent = v;
                this.sc.bind(v ? v.Value : null);
            };
            StringScop.prototype.ParentValueChanged = function (sender, e) {
                this.sc.bind(e._new);
            };
            return StringScop;
        }(bind.Scop));
        bind.StringScop = StringScop;
        var scops = {};
        var NamedScop = /** @class */ (function (_super) {
            __extends(NamedScop, _super);
            function NamedScop(name, bindingMode) {
                var _this = _super.call(this, bindingMode) || this;
                if (vars.names_scop_fromIn != true)
                    throw "Access violatil";
                _this._name = name;
                if (name)
                    scops[name] = _this;
                vars.names_scop_fromIn = false;
                return _this;
            }
            NamedScop.prototype.GenType = function () { return NamedScop; };
            Object.defineProperty(NamedScop.prototype, "Name", {
                get: function () { return this._name; },
                enumerable: true,
                configurable: true
            });
            NamedScop.Get = function (name) {
                return scops[name];
            };
            NamedScop.prototype._OnValueChanged = function (e) {
            };
            NamedScop.Create = function (name, value, twoWay) {
                var t = scops[name];
                if (t != null)
                    return t;
                vars.names_scop_fromIn = true;
                t = new NamedScop(name, twoWay);
                t.Value = value;
                return t;
            };
            NamedScop.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                _super.prototype.Dispose.call(this);
                scops[this.Name] = undefined;
                delete scops[this.Name];
                if (!h)
                    this.DisposingStat = 2;
            };
            NamedScop.prototype.getParent = function () { return null; };
            NamedScop.prototype.setParent = function (v) { };
            return NamedScop;
        }(Scop));
        bind.NamedScop = NamedScop;
        var Bind = /** @class */ (function (_super) {
            __extends(Bind, _super);
            function Bind(path, parent, bindMode) {
                var _this = _super.call(this, bindMode) || this;
                _this.pb = null;
                _this.observer = new bind.Observer(null, []);
                _this.int = false;
                if (path instanceof Array)
                    path = path.join('/');
                _this.Path = path;
                if (typeof (parent) == "string")
                    parent = NamedScop.Create(parent, undefined);
                _this.int = true;
                _this.Parent = parent;
                _this.Value = _this.observer.Value;
                if ((bindMode & 1) == 1)
                    _this.observerBinding = _this.observer.OnPropertyChanged(bind.Observer.DPValue, _this.__OnValueChanged, _this);
                _this.int = false;
                return _this;
            }
            Bind.prototype.GenType = function () { return Bind; };
            Bind.__fields__ = function () {
                return [Bind.DPParent, Bind.DPPath];
            };
            Bind.PathChanged = function (e) {
                e.__this.int = true;
                e.__this.observer.Path = e._new == null || e._new == '' ? [] : e._new.split('.');
                e.__this.int = false;
            };
            Bind.ParentChanged = function (e) {
                var t = e.__this;
                var n = e._new;
                var o = e._old;
                if (o != null && t.pb != null) {
                    o.removeEvent(Scop.DPValue, t.pb);
                }
                if (n != null) {
                    t.pb = n.OnPropertyChanged(Scop.DPValue, t.ParentValueChanged, t);
                    t.observer.Me = n.Value;
                }
                else
                    t.observer.Me = null;
            };
            Bind.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                this.removeEvent(Scop.DPValue, this.pb);
                this.observer.removeEvent(bind.Observer.DPValue, this.observerBinding);
                this.observer.Dispose();
                this.pb = null;
                this.observerBinding = null;
                this.observer = null;
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            Bind.prototype.ParentValueChanged = function (sender, e) {
                this.int = true;
                this.observer.Me = e._new;
                this.int = false;
            };
            Object.defineProperty(Bind.prototype, "Path", {
                get: function () { return this.get(Bind.DPPath); },
                set: function (value) { this.set(Bind.DPPath, value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Bind.prototype, "Parent", {
                get: function () { return this.get(Bind.DPParent); },
                set: function (value) { this.set(Bind.DPParent, value); },
                enumerable: true,
                configurable: true
            });
            Bind.prototype.__OnValueChanged = function (sender, e) {
                this.isChanging = true;
                this.Value = e._new;
                this.isChanging = false;
            };
            Bind.prototype.AttributeChanged = function (e) {
            };
            Bind.prototype._OnValueChanged = function (e) {
                if (this.isChanging)
                    return;
                if (((this.BindingMode & 2) === 2) && !this.int) {
                    var o = this.observer;
                    var p = o.xpath;
                    var l = p.length;
                    if (l === 0)
                        return;
                    var parent;
                    var lp = p[l - 1];
                    if (l === 1)
                        parent = o.Me;
                    else
                        parent = p[l - 2].Value;
                    if (parent)
                        if (lp.Property != null)
                            parent.set(lp.Property, e._new);
                        else
                            parent[lp.Name] = e._new;
                }
            };
            Bind.prototype.getParent = function () { return this.get(Bind.DPParent); };
            Bind.prototype.setParent = function (v) { this.set(Bind.DPParent, v); };
            Bind.prototype.getChildren = function () { return []; };
            Bind.DPPath = bind.DObject.CreateField("Path", String, null, Bind.PathChanged);
            Bind.DPParent = bind.DObject.CreateField("Parent", Scop, null, Bind.ParentChanged);
            return Bind;
        }(Scop));
        bind.Bind = Bind;
        var i = -1;
        var ascops = [];
        var AnonymouseScop;
        (function (AnonymouseScop) {
            function Register(scop) {
                ascops[++i] = scop;
                return i;
            }
            AnonymouseScop.Register = Register;
            function UnRegister(i) {
                var t = ascops[i];
                ascops[i] = undefined;
                return t;
            }
            AnonymouseScop.UnRegister = UnRegister;
            function Get(i) {
                return ascops[i];
            }
            AnonymouseScop.Get = Get;
        })(AnonymouseScop = bind.AnonymouseScop || (bind.AnonymouseScop = {}));
        var ValueScop = /** @class */ (function (_super) {
            __extends(ValueScop, _super);
            function ValueScop(value, bindMode) {
                var _this = _super.call(this, bindMode) || this;
                _this.Value = value;
                return _this;
            }
            ValueScop.prototype._OnValueChanged = function (e) {
            };
            ValueScop.prototype.getParent = function () { return this._parent; };
            ValueScop.prototype.setParent = function (v) { this._parent = v; };
            return ValueScop;
        }(Scop));
        bind.ValueScop = ValueScop;
        var tx = {
            '3': 3,
            '2': 2,
            '1': 1,
            '': 0,
            'false': 1,
            'true': 3
        };
        function getDbTwoWay(t) {
            if (t == null)
                return 1;
            return tx[t] || BindingMode[t];
        }
        var db = /** @class */ (function () {
            function db(dom) {
                var a = dom.attributes;
                for (var i = 0; i < a.length; i++) {
                    var n = a[i].name;
                    if (n.indexOf('db-') === 0)
                        this[n.substr(3)] = a[i].value;
                }
                if (this.twoway)
                    this.twoway = getDbTwoWay(this.twoway);
                try {
                    if (this.init)
                        this.init = JSON.parse(this.init);
                }
                catch (e) {
                }
                if (this.stop) {
                    if (stop)
                        stop();
                    debugger;
                }
            }
            return db;
        }());
        var Compiler = /** @class */ (function () {
            function Compiler() {
            }
            Compiler.GetParentScop = function (dom) {
                var s, d = dom.parentElement || dom.parentNode, c;
                while (d != document) {
                    if (d == null)
                        return;
                    c = NamedScop.Get(d['']);
                    if (c instanceof Scop)
                        return c;
                    s = d.getAttribute("db-bind");
                    if (s != null) {
                        return Scop.Create(s);
                    }
                    d = d.parentElement || d.parentNode;
                }
                return null;
            };
            Compiler.processComplicatedAttribute = function (dom, parent, _scop, tsm, attribute) {
                var isCmd;
                var x = attribute.split("->");
                var _bind = x[0] || '';
                var job = x[1] || '';
                if (job.length === 0)
                    return;
                if (job[0] === '#')
                    isCmd = true, job = job.substr(1);
                if (job.length === 0)
                    return;
                if (_bind[0] == '.') {
                    parent = _scop || parent;
                    _bind = _bind.substr(1);
                }
                else if (parent == null)
                    parent = _scop;
                if (_bind.length > 0)
                    _scop = Scop.Create(_bind, parent, attribute.indexOf('<->') !== -1 ? BindingMode.TwoWay :
                        attribute.indexOf('->') ? BindingMode.SourceToTarget : BindingMode.TargetToSource);
                if (isCmd)
                    return ScopicCommand.Call(job, dom, _scop);
                var ijob = job == '.' ? _scop.GetJob(job.substring(1)) : bind.GetJob(job);
                var ji = _scop.AddJob(ijob, dom);
                tsm.push(ji);
            };
            Object.defineProperty(Compiler, "UI", {
                get: function () {
                    if (this._UI != null)
                        return this._UI;
                    this._UI = require('./UI');
                    this._UI = this._UI && this._UI.UI;
                    return this._UI;
                },
                enumerable: true,
                configurable: true
            });
            Compiler.createTemplate = function (templatePath, dom) {
                if (templatePath) {
                    var template = mvc.MvcDescriptor.Get(templatePath);
                    if (!templatePath)
                        console.log("the template " + templatePath + "Cannot be found");
                    else
                        dom = template.Create();
                }
                else
                    throw "template args not setted";
                return dom;
            };
            Compiler.Compile = function (parentScop, parentControl, controller, e) {
                var dom = e.dom;
                if (dom.hasAttribute('compiled'))
                    return e;
                dom.setAttribute('compiled', '');
                var t = new db(dom);
                this.extraxtScop(t, parentScop, e);
                if (t.template) {
                    var ndom = this.createTemplate(t.template, dom);
                    var st = new db(ndom);
                    if (dom != ndom) {
                        for (var i = 0; i < dom.attributes.length; i++) {
                            var c = dom.attributes.item(i);
                            if (c.name === 'compiled' || c.name.indexOf('db-') === 0) {
                                continue;
                            }
                            ndom.setAttribute(c.name, c.value);
                        }
                        dom.parentNode.replaceChild(ndom, dom);
                        dom = ndom;
                    }
                    var e = { Control: null, dom: dom, IsNew: false, Scop: null, Jobs: [] };
                    var e1 = this.Compile(e.Scop || parentScop, parentControl, controller, e);
                    if (!e1)
                        debugger;
                    return e1 || e;
                }
                if (t.job != null)
                    this.execJobs(t, e, parentControl, parentScop);
                if (t.cmd)
                    for (var _i = 0, _a = t.cmd.split('|'); _i < _a.length; _i++) {
                        var xi = _a[_i];
                        ScopicCommand.Call(xi, dom, e.Scop);
                    }
                if (t.exec)
                    this.processComplicatedAttribute(dom, parentScop, e.Scop, e.Jobs, t.exec);
                if (t.control)
                    this.createControl(t, parentScop, parentControl, controller, e);
                else if (t.name)
                    this.setName(t.name, controller.CurrentControl, e);
                if (!e)
                    debugger;
                return e;
            };
            Compiler.extraxtScop = function (t, parentScop, e) {
                e.Scop = t.bind ? Scop.Create(t.bind, parentScop, t.twoway) || parentScop : parentScop;
                if (t.init)
                    for (var ic in t.init)
                        e.Scop.setToScop(ic, t.init[ic]);
                if (t.filter)
                    e.Scop = bind.CreateFilter(t.filter, e.Scop, t.twoway || 3);
                e.IsNew = e.Scop != parentScop;
            };
            Compiler.execJobs = function (t, e, control, parentScop) {
                var tsm = [];
                var ts = t.job.split('|');
                for (var i = 0, l = ts.length; i < l; i++) {
                    var jn = ts[i];
                    var job = jn[0] == '.' ? e.Scop.GetJob(jn.substring(1)) : bind.GetJob(ts[i]);
                    var ji = e.Scop.AddJob(job, e.dom);
                    tsm.push(ji);
                    if (!e.Control)
                        ji.Control && (ji.Control.Parent = control);
                }
                return tsm;
            };
            Compiler.getFirstChild = function (dom) {
                var f = dom.firstChild;
                var node;
                while (f) {
                    if (f instanceof Element)
                        return f;
                    if (!node && f instanceof Node)
                        node = f;
                    f = f.nextSibling;
                }
                return node;
            };
            Compiler.createControl = function (t, parentScop, parentControl, controller, e) {
                var child = this.getFirstChild(e.dom);
                e.dom.removeAttribute('db-control');
                var cnt = ScopicControl.create(t.control, child, e.Scop || parentScop, parentScop, parentControl, controller);
                e.Control = cnt;
                cnt.Parent = parentControl;
                var parent = e.dom.parentNode || e.dom.parentElement;
                if (parent) {
                    parent.replaceChild(child, e.dom);
                    e.dom = child;
                }
                if (t.name)
                    this.setName(t.name, controller.CurrentControl, e);
            };
            Compiler._setName = function (name, cnt, e) {
                var x = cnt;
                while (x) {
                    try {
                        if (x.setName) {
                            x.setName(name, e.dom, cnt, e);
                            return true;
                        }
                        else
                            x = x.Parent;
                    }
                    catch (w) { }
                }
            };
            Compiler.setName = function (name, parentControl, e) {
                return this._setName(name, e.Control, e) || this._setName(name, parentControl, e);
            };
            Compiler.UnresolvedDom = [];
            return Compiler;
        }());
        bind.Compiler = Compiler;
        var Filter = /** @class */ (function (_super) {
            __extends(Filter, _super);
            function Filter(source, bindingMode) {
                var _this = _super.call(this, bindingMode) || this;
                _this.source = source;
                return _this;
            }
            Filter.prototype.Initialize = function () {
                if (this.source)
                    this.dbb = this.source.OnPropertyChanged(Scop.DPValue, this.SourceChanged, this);
                this.Value = this.Convert(this.source ? this.source.Value : null);
            };
            Filter.prototype.SourceChanged = function (p, e) {
                if ((this._bindingMode & 1) === 0)
                    return;
                if (this.isChanging)
                    return;
                this.isChanging = true;
                this.Value = this.Convert(e._new);
                this.isChanging = false;
            };
            Filter.prototype._OnValueChanged = function (e) {
                if ((this._bindingMode & 2) === 0)
                    return;
                if (this.isChanging)
                    return;
                this.isChanging = true;
                this.source.Value = this.ConvertBack(e._new);
                this.isChanging = false;
            };
            Filter.prototype.Update = function () {
                this.Value = this.Convert(this.source.Value);
            };
            Filter.prototype.UpdateBack = function () {
                this.source.Value = this.ConvertBack(this.Value);
            };
            Filter.prototype.getParent = function () { return this.source; };
            Filter.prototype.setParent = function (v) {
                if (this.source)
                    this.source.removeEvent(Scop.DPValue, this.dbb);
                if (v)
                    this.dbb = v.OnPropertyChanged(Scop.DPValue, this.SourceChanged, this);
                this.source = v;
                this.Initialize();
            };
            Filter.prototype.Dispose = function () {
                if (this.source)
                    this.source.removeEvent(Scop.DPValue, this.dbb);
                this.source = null;
                _super.prototype.Dispose.call(this);
            };
            return Filter;
        }(Scop));
        bind.Filter = Filter;
        var DoubleFilter = /** @class */ (function (_super) {
            __extends(DoubleFilter, _super);
            function DoubleFilter() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.fraction = 0.3333;
                return _this;
            }
            Object.defineProperty(DoubleFilter.prototype, "Fraction", {
                set: function (v) {
                    if (this.fraction === v)
                        return;
                    this.fraction = v;
                    switch (this._bindingMode) {
                        case 0:
                            return;
                        case 2:
                            this.UpdateBack();
                            return;
                        case 1:
                        case 3:
                            this.Update();
                            return;
                    }
                },
                enumerable: true,
                configurable: true
            });
            DoubleFilter.prototype.Convert = function (data) { return data / this.fraction; };
            DoubleFilter.prototype.ConvertBack = function (data) { return data * this.fraction; };
            return DoubleFilter;
        }(Filter));
        bind.DoubleFilter = DoubleFilter;
        var filters = {};
        function RegisterFilter(filter) {
            if (filters[filter.Name])
                return false;
            Object.defineProperty(filters, filter.Name, { value: filter, writable: false, configurable: false, enumerable: false });
            return true;
        }
        bind.RegisterFilter = RegisterFilter;
        function CreateFilter(filterName, parent, bindingMode) {
            var i = filterName.indexOf(':');
            if (i == -1)
                var p = null, name = filterName;
            else {
                name = filterName.substring(0, i);
                p = filterName.substring(i + 1);
            }
            var f = filters[name];
            if (!f)
                return parent;
            var e = f.CreateNew(parent, bindingMode & f.BindingMode, p);
            e.Initialize();
            return e;
        }
        bind.CreateFilter = CreateFilter;
        var BindingMode;
        (function (BindingMode) {
            BindingMode[BindingMode["SourceToTarget"] = 1] = "SourceToTarget";
            BindingMode[BindingMode["TwoWay"] = 3] = "TwoWay";
            BindingMode[BindingMode["TargetToSource"] = 2] = "TargetToSource";
        })(BindingMode = bind.BindingMode || (bind.BindingMode = {}));
        var ScopBinder = /** @class */ (function () {
            function ScopBinder(a, mode, path, b) {
                this.a = a;
                this.mode = mode;
                this.path = path;
                this.b = b;
                this.events = { eventA: null, eventB: null, eventO: null };
                if (0 === (mode & 3))
                    return;
                var o = new bind.Observer(a.Value, path);
                if (1 === (mode & 1))
                    this.events.eventA = a.OnPropertyChanged(Scop.DPValue, this.aChanged);
                if (2 === (mode & 2))
                    this.events.eventB = b.OnPropertyChanged(Scop.DPValue, this.bChanged);
                this.events.eventB = o.OnPropertyChanged(bind.Observer.DPValue, this.oChanged);
            }
            Object.defineProperty(ScopBinder.prototype, "IsSourceToTarget", {
                get: function () { return (this.mode & BindingMode.SourceToTarget) === BindingMode.SourceToTarget; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ScopBinder.prototype, "IsTargetToSource", {
                get: function () { return (this.mode & BindingMode.TargetToSource) === BindingMode.TargetToSource; },
                enumerable: true,
                configurable: true
            });
            ScopBinder.prototype.initialize = function () {
            };
            ScopBinder.prototype.aChanged = function (s, ev) {
                if ((this.mode & BindingMode.SourceToTarget) === BindingMode.SourceToTarget)
                    this.obs.Me = ev._new;
            };
            ScopBinder.prototype.bChanged = function (s, ev) {
            };
            ScopBinder.prototype.oChanged = function (s, ev) {
            };
            return ScopBinder;
        }());
        bind.ScopBinder = ScopBinder;
        var TwoBind = /** @class */ (function () {
            function TwoBind(bindingMode, a, b, pa, pb) {
                this.bindingMode = bindingMode;
                this.a = a;
                this.b = b;
                this.pa = pa;
                this.pb = pb;
                this.dba = a.OnPropertyChanged(pa, this.pac, this);
                this.dbb = b.OnPropertyChanged(pb, this.pab, this);
                this.Dispose = this.Dispose.bind(this);
                a.OnDisposing = this.Dispose;
                b.OnDisposing = this.Dispose;
                if (bindingMode == 2)
                    this.initB();
                else
                    this.init();
            }
            TwoBind.prototype.init = function () {
                var va = this.a.GetValue(this.pa);
                this.b.set(this.pb, va);
            };
            TwoBind.prototype.initB = function () {
                var vb = this.b.GetValue(this.pb);
                this.a.set(this.pa, vb);
            };
            TwoBind.prototype.pac = function (p, e) {
                if ((this.bindingMode & 1) == 0)
                    return;
                if (this.IsChanging)
                    return;
                this.IsChanging = true;
                this.b.set(this.pb, e._new);
                this.IsChanging = false;
            };
            TwoBind.prototype.pab = function (p, e) {
                if ((this.bindingMode & 2) == 0)
                    return;
                if (this.IsChanging)
                    return;
                this.IsChanging = true;
                this.a.set(this.pa, e._new);
                this.IsChanging = false;
            };
            TwoBind.prototype.Dispose = function () {
                if (this.disposed)
                    return;
                this.disposed = true;
                this.a.OffDisposing = this.Dispose;
                this.b.OffDisposing = this.Dispose;
                this.disposed = null;
                this.a.removeEvent(this.pa, this.dba);
                this.b.removeEvent(this.pb, this.dbb);
                this.a = null;
                this.b = null;
                this.dba = null;
                this.dbb = null;
                this.pa = null;
                this.pb = null;
            };
            return TwoBind;
        }());
        bind.TwoBind = TwoBind;
        var TwoDBind = /** @class */ (function () {
            function TwoDBind(bindingMode, a, b, pa, pb, con, conBack) {
                this.bindingMode = bindingMode;
                this.a = a;
                this.b = b;
                this.pa = pa;
                this.pb = pb;
                this.con = con;
                this.conBack = conBack;
                this.dba = a.OnPropertyChanged(pa, this.pac, this);
                this.dbb = b.OnPropertyChanged(pb, this.pab, this);
                this.Dispose = this.Dispose.bind(this);
                a.OnDisposing = this.Dispose;
                b.OnDisposing = this.Dispose;
                if (bindingMode == 2)
                    this.initB();
                else
                    this.init();
            }
            TwoDBind.prototype.pac = function (p, e) {
                if ((this.bindingMode & 1) == 0)
                    return;
                if (this.IsChanging)
                    return;
                this.IsChanging = true;
                this.b.set(this.pb, this.con ? this.con(e._new) : e._new);
                this.IsChanging = false;
            };
            TwoDBind.prototype.pab = function (p, e) {
                if ((this.bindingMode & 2) == 0)
                    return;
                if (this.IsChanging)
                    return;
                this.IsChanging = true;
                this.a.set(this.pa, this.conBack ? this.conBack(e._new) : e._new);
                this.IsChanging = false;
            };
            TwoDBind.prototype.init = function () {
                var va = this.a.GetValue(this.pa);
                this.b.set(this.pb, this.con ? this.con(va) : va);
            };
            TwoDBind.prototype.initB = function () {
                var vb = this.b.GetValue(this.pb);
                this.a.set(this.pa, this.con ? this.conBack(vb) : vb);
            };
            TwoDBind.prototype.Dispose = function () {
                if (this.disposed)
                    return;
                this.disposed = true;
                this.a.OffDisposing = this.Dispose;
                this.b.OffDisposing = this.Dispose;
                this.disposed = null;
                this.a.removeEvent(this.pa, this.dba);
                this.b.removeEvent(this.pb, this.dbb);
                this.a = null;
                this.b = null;
                this.dba = null;
                this.dbb = null;
                this.pa = null;
                this.pb = null;
            };
            return TwoDBind;
        }());
        bind.TwoDBind = TwoDBind;
    })(bind = exports.bind || (exports.bind = {}));
    bind.RegisterFilter({
        Name: '2bl', BindingMode: 3, CreateNew: function (s, b, p) {
            var e = new bind.DoubleFilter(s, b);
            if (p)
                e.Fraction = parseFloat(p);
            return e;
        }
    });
    var ScopicControl;
    (function (ScopicControl) {
        var _stor = {};
        function register(name, creator) {
            _stor[name] = creator;
        }
        ScopicControl.register = register;
        function create(name, dom, currentScop, parentScop, parentControl, controller) {
            var c = _stor[name];
            if (c)
                return c(name, dom, currentScop, parentScop, parentControl, controller);
        }
        ScopicControl.create = create;
    })(ScopicControl = exports.ScopicControl || (exports.ScopicControl = {}));
    var ScopicCommand;
    (function (ScopicCommand) {
        var store = {};
        var i = 0;
        function Register(callback, param, name) {
            var n = name ? name : '@' + ++i;
            store[n] = {
                callback: callback, Param: param
            };
            return n;
        }
        ScopicCommand.Register = Register;
        function Call(n, dom, scop) {
            var cb = store[n];
            return cb ? cb.callback.Invoke.call(cb.callback.Owner, n, dom, scop, cb.Param) : void 0;
        }
        ScopicCommand.Call = Call;
        function Delete(n) {
            delete store[n];
        }
        ScopicCommand.Delete = Delete;
        function contains(n) {
            return store[n] != null;
        }
        ScopicCommand.contains = contains;
    })(ScopicCommand = exports.ScopicCommand || (exports.ScopicCommand = {}));
    var Api;
    (function (Api) {
        var $freeze = Object.freeze;
        var _apis = {};
        function RegisterApiCallback(api) {
            if (typeof api.Name !== 'string')
                return false;
            if (api.DoApiCallback instanceof Function === false)
                return false;
            var c = _apis[api.Name];
            if (c == null) {
                c = { Callback: [api], Trigger: undefined };
                Object.defineProperty(_apis, api.Name, { value: c, configurable: false, enumerable: false, writable: false });
            }
            else {
                if (c.Callback.indexOf(api) !== -1)
                    return;
                c.Callback.push(api);
            }
            $freeze(api);
        }
        Api.RegisterApiCallback = RegisterApiCallback;
        function RegisterTrigger(api) {
            if (typeof api.Name !== 'string')
                return false;
            if (api.Filter && !(api.Filter instanceof Function))
                return false;
            var c = _apis[api.Name];
            if (c == null) {
                c = { Callback: [], Trigger: api };
                _apis[api.Name] = c;
                $freeze(c);
            }
            else if (c.Trigger == null) {
                c.Trigger = api;
                $freeze(c);
            }
            else
                throw "This Command Exist";
            $freeze(api);
        }
        Api.RegisterTrigger = RegisterTrigger;
        function RiseApi(apiName, params) {
            var api = _apis[apiName];
            if (!api)
                throw "Cmd Is Not Exist";
            var t = api.Trigger;
            if (t) {
                if (t.CheckAccess)
                    if (!t.CheckAccess(t))
                        throw "Access denied";
                var f = t.Filter;
            }
            var cs = api.Callback;
            for (var i = 0, l = cs.length; i < l; i++) {
                var c = cs[i];
                if (f && !t.Filter(c, params))
                    continue;
                try {
                    c.DoApiCallback(t, c, params);
                }
                catch (e) { }
            }
        }
        Api.RiseApi = RiseApi;
    })(Api = exports.Api || (exports.Api = {}));
    var encoding;
    (function (encoding) {
        var BPath = /** @class */ (function () {
            function BPath(Owner, Property) {
                this.Owner = Owner;
                this.Property = Property;
            }
            BPath.prototype.Set = function (value) {
                this.Owner.set(this.Property, value);
                this.executed = true;
                return value;
            };
            return BPath;
        }());
        encoding.BPath = BPath;
        var Path = /** @class */ (function () {
            function Path(Owner, Property) {
                this.Owner = Owner;
                this.Property = Property;
            }
            Path.prototype.Set = function (value) {
                if (this.Property instanceof bind.DProperty)
                    this.Owner.set(this.Property, value);
                else
                    this.Owner[this.Property] = value;
                this.executed = true;
                return value;
            };
            return Path;
        }());
        encoding.Path = Path;
        var LPath = /** @class */ (function () {
            function LPath(Owner, Property) {
                this.Owner = Owner;
                this.Property = Property;
            }
            LPath.prototype.Set = function (value) {
                if (!this.Owner.Insert(this.Property, value))
                    this.Owner.Add(value);
                this.executed = true;
                return value;
            };
            return LPath;
        }());
        encoding.LPath = LPath;
        var _sstore = new collection.Dictionary("SerializationContext", false);
        var SerializationContext = /** @class */ (function () {
            function SerializationContext(isDefault) {
                this._ext = [];
                this.indexer = new collection.Dictionary("Indexer", true);
                this.refs = [];
                this.cnt = 0;
                if (isDefault)
                    this._store = _sstore;
                else
                    this._store = new collection.Dictionary("SerializationContext", false);
            }
            SerializationContext.prototype.Dispose = function () {
                this.reset();
                this._ext = null;
                this._store = null;
                this.cnt = null;
                this.indexer = null;
                this.refs = null;
            };
            SerializationContext.prototype.Register = function (type, ser) {
                this._store.Set(type, ser);
            };
            SerializationContext.prototype.Append = function (con) {
                this._ext.push(con);
            };
            SerializationContext.prototype.Get = function (type) {
                var v = this._store.Get(type);
                if (v)
                    return v;
                var c = this._ext;
                for (var i = c.length - 1; i >= 0; i--)
                    if ((v = c[i].Get(type)) != null)
                        return v;
                return null;
            };
            SerializationContext.prototype.get = function (ref, path) {
                var dref = this.refs[ref];
                if (dref) {
                    if (dref.setted)
                        return path ? path.Set(this.refs[ref].val) : this.refs[ref].val;
                    else if (path) {
                        if (!dref.paths)
                            dref.paths = [path];
                        else
                            dref.paths.push(path);
                    }
                    else
                        throw "entry Point not Found";
                }
                else {
                    var i = { val: undefined, paths: [path] };
                    this.refs[ref] = i;
                }
                return undefined;
            };
            SerializationContext.prototype.set = function (ref, obj) {
                var x = this.refs[ref];
                if (x) {
                    x.val = obj;
                    x.setted = true;
                    if (x.paths)
                        for (var i = 0; i < x.paths.length; i++)
                            x.paths[i].Set(obj);
                }
                else
                    this.refs[ref] = { val: obj, setted: true };
            };
            SerializationContext.prototype.getJson = function (obj) {
                var l = this.indexer.Get(obj);
                if (l == null) {
                    var ref = { __ref__: ++this.cnt };
                    var json = { '@ref': ref };
                    this.indexer.Set(obj, l = { ref: ref, json: json, valid: false });
                    if (obj instanceof bind.DObject) {
                        var type = context_1.context.NameOf(obj.constructor);
                        if (type != null)
                            json['__type__'] = type;
                    }
                }
                return l;
            };
            SerializationContext.prototype.reset = function () {
                this.indexer.Clear();
                this.cnt = 0;
                this.refs.length = 0;
                return this;
            };
            SerializationContext.getType = function (type) {
                while (true) {
                    if (type instanceof reflection.DelayedType)
                        type = type.Type;
                    else if (type instanceof reflection.GenericType)
                        type = type.Constructor;
                    else
                        return type;
                }
            };
            SerializationContext.prototype.FromJson = function (json, type, path) {
                if (json == null)
                    return path ? path.Set(json) : json;
                if (type instanceof reflection.DelayedType)
                    type = type.Type;
                if (type instanceof reflection.GenericType)
                    type = type.Constructor;
                if (type === String || type === Number || type === Boolean)
                    return path ? path.Set(json) : json;
                else if (type === Date)
                    return path.Set(new Date(json));
                if (typeof json.__ref__ == 'number')
                    return this.get(json.__ref__, path);
                var obj;
                var ref = json['@ref'];
                delete json['@ref'];
                if (reflection.IsInstanceOf(type, bind.DObject)) {
                    if (type.CreateFromJson)
                        obj = type.CreateFromJson(json, type, this.RequireNew ? this.RequireNew(json, type) : false);
                    if (obj == null)
                        obj = new type();
                    if (ref)
                        this.set(ref.__ref__, obj);
                    obj = obj.FromJson(json, this);
                }
                else {
                    if (type.prototype != null && type.prototype.hasOwnProperty('fromJson'))
                        obj = type.prototype.fromJson(json, context_1.context, ref);
                    else {
                        var c = this.Get(type);
                        obj = c != null ? c.FromJson(json, this, ref) : json;
                    }
                    if (ref)
                        this.set(ref.__ref__, obj);
                }
                return path ? path.Set(obj) : obj;
            };
            SerializationContext.prototype.ToJson = function (obj) {
                if (obj === null)
                    return null;
                switch (typeof obj) {
                    case 'string':
                    case 'number':
                    case 'boolean':
                    case 'undefined':
                        return obj;
                    case 'function':
                        return obj.toString();
                    default:
                        var ref_json = this.getJson(obj);
                        if (ref_json.valid)
                            return ref_json.ref;
                        if (obj === Object)
                            return this._toJson(obj, ref_json);
                        else if (obj instanceof bind.DObject)
                            return obj.ToJson(this, ref_json);
                        else {
                            var c = this.Get(obj.constructor);
                            if (c) {
                                return c.ToJson(obj, this, ref_json);
                            }
                            else
                                return this._toJson(obj, ref_json);
                        }
                }
            };
            SerializationContext.prototype._toJson = function (obj, ret) {
                ret.valid = true;
                for (var i in obj)
                    ret[i] = this.ToJson(obj[i]);
                return ret;
            };
            SerializationContext.prototype.toString = function () {
                JSON.stringify(this);
            };
            SerializationContext.GlobalContext = new SerializationContext(true);
            return SerializationContext;
        }());
        encoding.SerializationContext = SerializationContext;
    })(encoding = exports.encoding || (exports.encoding = {}));
    var net;
    (function (net) {
        var Header = /** @class */ (function () {
            function Header(key, value) {
                this._key = key;
                this._value = value;
            }
            Object.defineProperty(Header.prototype, "key", {
                get: function () {
                    return this._key;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Header.prototype, "value", {
                get: function () {
                    return this._value;
                },
                enumerable: true,
                configurable: true
            });
            return Header;
        }());
        net.Header = Header;
        var ResponseType;
        (function (ResponseType) {
            ResponseType[ResponseType["json"] = 0] = "json";
            ResponseType[ResponseType["Document"] = 1] = "Document";
            ResponseType[ResponseType["Text"] = 2] = "Text";
            ResponseType[ResponseType["ArrayBuffer"] = 3] = "ArrayBuffer";
            ResponseType[ResponseType["Blob"] = 4] = "Blob";
        })(ResponseType = net.ResponseType || (net.ResponseType = {}));
        var WebRequestMethod;
        (function (WebRequestMethod) {
            WebRequestMethod[WebRequestMethod["Get"] = 0] = "Get";
            WebRequestMethod[WebRequestMethod["Post"] = 1] = "Post";
            WebRequestMethod[WebRequestMethod["Head"] = 2] = "Head";
            WebRequestMethod[WebRequestMethod["Put"] = 3] = "Put";
            WebRequestMethod[WebRequestMethod["Delete"] = 4] = "Delete";
            WebRequestMethod[WebRequestMethod["Options"] = 5] = "Options";
            WebRequestMethod[WebRequestMethod["Connect"] = 6] = "Connect";
            WebRequestMethod[WebRequestMethod["Create"] = 7] = "Create";
            WebRequestMethod[WebRequestMethod["Open"] = 8] = "Open";
            WebRequestMethod[WebRequestMethod["Close"] = 9] = "Close";
            WebRequestMethod[WebRequestMethod["Validate"] = 10] = "Validate";
            WebRequestMethod[WebRequestMethod["FastValidate"] = 11] = "FastValidate";
            WebRequestMethod[WebRequestMethod["Print"] = 12] = "Print";
            WebRequestMethod[WebRequestMethod["UPDATE"] = 13] = "UPDATE";
            WebRequestMethod[WebRequestMethod["SUPDATE"] = 14] = "SUPDATE";
        })(WebRequestMethod = net.WebRequestMethod || (net.WebRequestMethod = {}));
        var WebRequest = /** @class */ (function () {
            function WebRequest(crypt) {
                this.crypt = crypt;
                this.http = new XMLHttpRequest();
                this._responseType = null;
                this.key = new Object();
                //this.OnInitialized = new bind.EventListener<(e: WebRequest) => void>(this.key);
                //this.OnSetup = new bind.EventListener<(e: WebRequest) => void>(this.key);
                //this.OnSended = new bind.EventListener<(e: WebRequest) => void>(this.key);
                //this.OnProgress = new bind.EventListener<(e: WebRequest) => void>(this.key);
                this.OnComplete = new bind.EventListener(this.key);
                this.http.addEventListener('loadend', this.downloadDelegate = new basic.Delegate(this, this._onprogress, function (p) {
                    p.Owner.http.removeEventListener('loadend', p);
                    p.Owner.http.removeEventListener('error', p);
                }));
                this.crypt = new crypto.AesCBC(key.slice(0));
                this.http.addEventListener('error', this.downloadDelegate);
            }
            WebRequest.prototype.getResponseType = function () {
                return this._responseType || ResponseType.Text;
            };
            WebRequest.prototype.setResponseType = function (v) {
                this._responseType = v;
                return v;
            };
            Object.defineProperty(WebRequest.prototype, "Crypto", {
                set: function (v) {
                    this.crypt = v;
                },
                enumerable: true,
                configurable: true
            });
            WebRequest.prototype.Dispose = function () {
                /*
                this.OnInitialized.Dispose();
                this.OnSetup.Dispose();
                this.OnSended.Dispose();
                this.OnProgress.Dispose();*/
                this.OnComplete.Dispose();
                this.downloadDelegate.Dispose();
                this.key = null;
                this.http = null;
                /*
                this.OnInitialized = null;
                this.OnSetup = null;
                this.OnSended = null;
                this.OnProgress = null;*/
                this.OnComplete = null;
                this.downloadDelegate = null;
            };
            WebRequest.prototype._onprogress = function (e) {
                var cur = null;
                switch (this.http.readyState) {
                    //case 0:
                    //    cur = this.OnInitialized;
                    //    break;
                    //case 1:
                    //    cur = this.OnSetup;
                    //    break;
                    //case 2:
                    //    cur = this.OnSended;
                    //    break;
                    //case 3:
                    //    cur = this.OnProgress;
                    //    break;
                    case 4:
                        cur = this.OnComplete;
                        break;
                }
                if (cur) {
                    var t = this;
                    cur.Invoke(this.key, [t]); // function (dlg) { dlg(t); });
                }
            };
            Object.defineProperty(WebRequest.prototype, "IsSuccess", {
                get: function () { return this.http.status == 200 && this.http.readyState == 4; },
                enumerable: true,
                configurable: true
            });
            WebRequest.prototype.Download = function (req, data) {
                this.http.open(WebRequestMethod[req.Method], req.Url, true);
                this.http.responseType = ResponseType[this.getResponseType()].toLowerCase();
                if (req.Method === WebRequestMethod.Get)
                    this.http.send();
                else
                    this.http.send(JSON.stringify(data));
            };
            WebRequest.prototype.Download2 = function (c) {
                if (c.url.beforRequest)
                    if (!c.url.beforRequest(c.url)) {
                        var cur = this.OnComplete;
                        if (cur) {
                            var t = this;
                            cur.Invoke(this.key, [t]); // function (dlg) { dlg(t); });
                        }
                    }
                var req = c.url;
                var url = req.Url;
                if (c.params) {
                    var s = url.lastIndexOf('?') != -1;
                    for (var i in c.params)
                        url += (!s ? ((s = true) && '?') : '&') + (encodeURI(i) + '=' + encodeURI(String(c.params[i])));
                }
                this.http.open(WebRequestMethod[req.Method], url, true);
                this.http.setRequestHeader('Access-Control-Allow-Origin', 'true');
                this.http.responseType = ResponseType[this.getResponseType()].toLowerCase();
                if (req.HasBody === false || req.Method === WebRequestMethod.Get)
                    this.http.send();
                else {
                    if (c.data)
                        try {
                            var x = btoa(c.data.OutputData());
                            var bytes = crypto.string2bytes(x);
                            if (this.crypt)
                                bytes = this.crypt.Encrypt(bytes);
                            this.http.send(new Uint8Array(bytes));
                        }
                        catch (err) {
                        }
                    else
                        this.http.send();
                }
            };
            WebRequest.prototype.GetFileSize = function (url, callback) {
                this.http.open("HEAD", url, true);
                this.http.onreadystatechange = function () {
                    if (this.readyState == this.DONE) {
                        if (callback)
                            callback(parseInt(this.getResponseHeader("Content-Length")));
                    }
                };
                this.http.send();
            };
            WebRequest.prototype.GetHeader = function (url, callback) {
                this.http.open("HEAD", url, true);
                this.http.onreadystatechange = function () {
                    if (this.readyState == this.DONE) {
                        if (callback) {
                            var h = this.getAllResponseHeaders().split('\r\n');
                            var t = [];
                            for (var i = h.length - 1; i >= 0; i--) {
                                var p = h[i];
                                if (p) {
                                    var vk = p.split(': ');
                                    t.push(new Header(vk[0], vk[1]));
                                }
                            }
                            //Object.freeze(t);
                            callback(t);
                        }
                    }
                };
                this.http.send();
            };
            Object.defineProperty(WebRequest.prototype, "Response", {
                get: function () {
                    return this.http.response;
                },
                enumerable: true,
                configurable: true
            });
            return WebRequest;
        }());
        net.WebRequest = WebRequest;
        var RequestParams = /** @class */ (function () {
            function RequestParams(callback, data, isPrivate) {
                this.callback = callback;
                this.data = data;
                this.isPrivate = isPrivate;
                this.IsSuccess = null;
                if (isPrivate == void 0)
                    this.isPrivate = false;
            }
            RequestParams.prototype.Callback = function (sender, result) {
                if (this.callback)
                    this.callback(sender, result);
            };
            return RequestParams;
        }());
        net.RequestParams = RequestParams;
        var Request = /** @class */ (function () {
            function Request(url, data, params) {
                this.url = url;
                this.data = data;
                this.params = params;
                this.fail = undefined;
            }
            return Request;
        }());
        net.Request = Request;
        var QueeDownloader = /** @class */ (function () {
            function QueeDownloader(crypt) {
                this.crypt = crypt;
                this.quee = [];
                this.isRunning = false;
                this.isDownloading = false;
                this.success = [];
                this.fails = [];
                this.OnSuccess = new bind.EventListener(1);
                this.OnFail = new bind.EventListener(1);
                this.OnFinish = new bind.EventListener(1);
                this.webr = new net.WebRequest(crypt);
                this.webr.setResponseType(net.ResponseType.Text);
                this.webr.OnComplete.Add(this.DownloadComplete.bind(this), "DCT");
            }
            Object.defineProperty(QueeDownloader.prototype, "Request", {
                get: function () { return this.webr; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QueeDownloader.prototype, "Crypto", {
                set: function (v) {
                    this.webr.Crypto = v;
                },
                enumerable: true,
                configurable: true
            });
            QueeDownloader.prototype.DownloadComplete = function (xmlRequest) {
                this.isDownloading = false;
                var x = this.webr.IsSuccess ? this.OnSuccess : this.OnFail;
                try {
                    var ip = true;
                    var th = this;
                    if (th.current.data instanceof RequestParams) {
                        try {
                            var c = th.current.data;
                            c.IsSuccess = th.webr.IsSuccess;
                            c.Callback(this, this.webr);
                        }
                        catch (e) {
                        }
                        ip = !(c.isPrivate);
                    }
                    if (ip)
                        x.Invok(1, function (arg) { arg(th, th.current.data); });
                }
                catch (error) {
                }
                this.Next();
            };
            QueeDownloader.prototype.Push = function (url, data, params) {
                url.Url = url.Url.startsWith('http://') ? url.Url : basic.host + url.Url;
                this.quee.push(new Request(url, data, params));
                if (!this.isRunning)
                    this.Start();
            };
            QueeDownloader.prototype.Insert = function (dcall) {
                this.quee.push(dcall);
                if (!this.isRunning)
                    this.Start();
            };
            QueeDownloader.prototype.Start = function () {
                if (this.isDownloading)
                    return;
                this.isRunning = true;
                this.Next();
            };
            QueeDownloader.prototype.Next = function () {
                if (0 == this.quee.length) {
                    this.isRunning = false;
                    this.isDownloading = false;
                    var ___this = this;
                    this.OnFinish.Invoke(1, [___this, ___this.current.data]);
                    return;
                }
                this.webr.Download2(this.current = this.quee.shift());
                this.isDownloading = true;
            };
            QueeDownloader.prototype.Restart = function () {
                this.isDownloading = false;
                this.Start();
            };
            return QueeDownloader;
        }());
        net.QueeDownloader = QueeDownloader;
    })(net = exports.net || (exports.net = {}));
    (function (net) {
        var RequestUrl = /** @class */ (function () {
            function RequestUrl(_url, context, Header, Method, HasBody) {
                this._url = _url;
                this.context = context;
                this.Header = Header;
                this.Method = Method;
                this.HasBody = HasBody;
                if (Header == null)
                    Header = {};
                if (Method == undefined)
                    this.Method = net.WebRequestMethod.Get;
                if (HasBody == undefined)
                    HasBody = true;
            }
            Object.defineProperty(RequestUrl.prototype, "Url", {
                get: function () {
                    if (this.context)
                        return this.context.GetPath(this._url);
                    return this._url;
                },
                set: function (v) { this._url = v; },
                enumerable: true,
                configurable: true
            });
            return RequestUrl;
        }());
        net.RequestUrl = RequestUrl;
    })(net = exports.net || (exports.net = {}));
    (function (basic) {
        var _events = new collection.Dictionary("ethandler");
        var DomEventHandler = /** @class */ (function () {
            function DomEventHandler(dom, event, handle, param) {
                this.dom = dom;
                this.event = event;
                this.handle = handle;
                this.param = param;
                this.Started = false;
                _events.Set(this, dom);
            }
            DomEventHandler.prototype.Start = function () {
                if (this.Started === false) {
                    this.Started = true;
                    this.dom.addEventListener(this.event, this);
                }
            };
            DomEventHandler.prototype.Pause = function () {
                if (this.Started === true) {
                    this.Started = false;
                    this.dom.removeEventListener(this.event, this);
                }
            };
            DomEventHandler.prototype.Dispose = function () {
                if (this.Started === undefined)
                    return;
                this.Pause();
                _events.Remove(this);
                this.dom = undefined;
                this.event = undefined;
                this.handle = undefined;
                this.Started = undefined;
                this.param = undefined;
            };
            DomEventHandler.prototype.Reset = function () {
                this.Pause();
                this.Start();
            };
            DomEventHandler.prototype.handleEvent = function (evt) {
                this.handle(this, evt, this.param);
            };
            DomEventHandler.Dispose = function (dom, event) {
                var i;
                if (event == null)
                    for (var i_1 = 0, ks = _events.RemoveAllValues(dom); i_1 < ks.length; i_1++)
                        ks[i_1].Dispose();
                else
                    do
                        if ((i = _events.IndexOfValue(dom, i)) === -1)
                            break;
                        else
                            _events.RemoveAt(i).Key.Dispose();
                    while (true);
            };
            return DomEventHandler;
        }());
        basic.DomEventHandler = DomEventHandler;
    })(basic = exports.basic || (exports.basic = {}));
    var crypto;
    (function (crypto) {
        var aes_store = {};
        var Sbox = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22];
        var ShiftRowTab = [0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11];
        var ShiftRowTab_Inv;
        var Sbox_Inv, xtime;
        function string2bytes_16(a) {
            var c = new Uint16Array(a.length);
            for (var d = 0; d < a.length; d++)
                c[d] = a.charCodeAt(d);
            return c;
        }
        crypto.string2bytes_16 = string2bytes_16;
        function bytes2string_16(a) {
            for (var c = "", d = 0; d < a.length; d++)
                c += String.fromCharCode(a[d]);
            return c;
        }
        crypto.bytes2string_16 = bytes2string_16;
        function string2bytes(a) {
            if (a instanceof Array)
                return a.slice(0);
            var c = new Array(a.length);
            for (var d = 0; d < a.length; d++) {
                var x = a.charCodeAt(d);
                if (x > 255)
                    throw "Invalid ASCII Charactere";
                c[d] = x;
            }
            return c;
        }
        crypto.string2bytes = string2bytes;
        function bytes2string(a) {
            for (var c = "", d = 0; d < a.length; d++)
                c += String.fromCharCode(a[d]);
            return c;
        }
        crypto.bytes2string = bytes2string;
        ;
        Sbox_Inv = Array(256);
        for (var b = 0; b < 256; b++)
            Sbox_Inv[Sbox[b]] = b;
        ShiftRowTab_Inv = Array(16);
        for (b = 0; b < 16; b++)
            ShiftRowTab_Inv[ShiftRowTab[b]] = b;
        xtime = Array(256);
        for (b = 0; b < 128; b++)
            xtime[b] = b << 1,
                xtime[128 + b] = b << 1 ^ 27;
        var Aes = /** @class */ (function () {
            function Aes(key) {
                if ('string' === typeof (key))
                    this.Key = this.InitKey(string2bytes(key));
                else if (key instanceof Array)
                    this.Key = this.InitKey(key);
                else
                    throw "Invalid Key";
            }
            Aes.prototype.InitKey = function (key) {
                return key;
            };
            Aes.ExpandKey = function (b) {
                ;
                var c = b.length, d, e = 1;
                switch (c) {
                    case 16:
                        d = 176;
                        break;
                    case 24:
                        d = 208;
                        break;
                    case 32:
                        d = 240;
                        break;
                    default:
                        alert("my.ExpandKey: Only key lengths of 16, 24 or 32 bytes allowed!");
                }
                for (var g = c; g < d; g += 4) {
                    var h = b.slice(g - 4, g);
                    if (g % c == 0) {
                        if (h = [Sbox[h[1]] ^ e, Sbox[h[2]], Sbox[h[3]], Sbox[h[0]]],
                            (e <<= 1) >= 256)
                            e ^= 283;
                    }
                    else
                        c > 24 && g % c == 16 && (h = [Sbox[h[0]], Sbox[h[1]], Sbox[h[2]], Sbox[h[3]]]);
                    for (var f = 0; f < 4; f++)
                        b[g + f] = b[g + f - c] ^ h[f];
                }
            };
            Aes.prototype.Encrypt = function (data) {
                ;
                var Key = this.Key;
                var d = Key.length;
                Aes.AddRoundKey(data, Key.slice(0, 16));
                for (var e = 16; e < d - 16; e += 16)
                    Aes.SubBytes(data, Sbox),
                        Aes.ShiftRows(data, ShiftRowTab),
                        Aes.MixColumns(data),
                        Aes.AddRoundKey(data, Key.slice(e, e + 16));
                Aes.SubBytes(data, Sbox);
                Aes.ShiftRows(data, ShiftRowTab);
                Aes.AddRoundKey(data, Key.slice(e, d));
                return data;
            };
            Aes.prototype.Decrypt = function (data) {
                ;
                var Key = this.Key;
                var d = Key.length;
                Aes.AddRoundKey(data, Key.slice(d - 16, d));
                Aes.ShiftRows(data, ShiftRowTab_Inv);
                Aes.SubBytes(data, Sbox_Inv);
                for (d -= 32; d >= 16; d -= 16)
                    Aes.AddRoundKey(data, Key.slice(d, d + 16)),
                        Aes.MixColumns_Inv(data),
                        Aes.ShiftRows(data, ShiftRowTab_Inv),
                        Aes.SubBytes(data, Sbox_Inv);
                Aes.AddRoundKey(data, Key.slice(0, 16));
                return data;
            };
            Aes.prototype.SEncrypt = function (data) {
                return bytes2string(this.Encrypt(string2bytes(data)));
            };
            Aes.prototype.SDecrypt = function (data) {
                return bytes2string(this.Decrypt(string2bytes(data)));
            };
            Aes.SubBytes = function (a, c) {
                ;
                for (var d = 0; d < 16; d++)
                    a[d] = c[a[d]];
            };
            Aes.AddRoundKey = function (a, c) {
                ;
                for (var d = 0; d < 16; d++)
                    a[d] ^= c[d];
            };
            Aes.ShiftRows = function (a, c) {
                ;
                for (var d = [].concat(a), e = 0; e < 16; e++)
                    a[e] = d[c[e]];
            };
            Aes.MixColumns = function (b) {
                ;
                var _xtime = xtime;
                for (var c = 0; c < 16; c += 4) {
                    var d = b[c + 0], e = b[c + 1], g = b[c + 2], h = b[c + 3], f = d ^ e ^ g ^ h;
                    b[c + 0] ^= f ^ _xtime[d ^ e];
                    b[c + 1] ^= f ^ _xtime[e ^ g];
                    b[c + 2] ^= f ^ _xtime[g ^ h];
                    b[c + 3] ^= f ^ _xtime[h ^ d];
                }
            };
            Aes.MixColumns_Inv = function (b) {
                ;
                var _xtime = xtime;
                for (var c = 0; c < 16; c += 4) {
                    var d = b[c + 0], e = b[c + 1], g = b[c + 2], h = b[c + 3], f = d ^ e ^ g ^ h, o = _xtime[f], p = _xtime[_xtime[o ^ d ^ g]] ^ f;
                    f ^= _xtime[_xtime[o ^ e ^ h]];
                    b[c + 0] ^= p ^ _xtime[d ^ e];
                    b[c + 1] ^= f ^ _xtime[e ^ g];
                    b[c + 2] ^= p ^ _xtime[g ^ h];
                    b[c + 3] ^= f ^ _xtime[h ^ d];
                }
            };
            return Aes;
        }());
        crypto.Aes = Aes;
        var AesCBC = /** @class */ (function (_super) {
            __extends(AesCBC, _super);
            function AesCBC(key) {
                return _super.call(this, key) || this;
            }
            AesCBC.prototype.InitKey = function (key) {
                Aes.ExpandKey(key);
                return key;
            };
            AesCBC.blockXOR = function (a, c) {
                ;
                for (var d = Array(16), e = 0; e < 16; e++)
                    d[e] = a[e] ^ c[e];
                return d;
            };
            AesCBC.blockIV = function () {
                ;
                var a = new crypto.SecureRandom(), c = Array(16);
                a.nextBytes(c);
                return c;
            };
            AesCBC.pad16 = function (a) {
                ;
                var c = a.slice(0), d = (16 - a.length % 16) % 16;
                for (var i = a.length; i < a.length + d; i++)
                    c.push(0);
                return c;
            };
            ;
            AesCBC.depad = function (a) {
                ;
                for (a = a.slice(0); a[a.length - 1] == 0;)
                    a = a.slice(0, a.length - 1);
                return a;
            };
            AesCBC.prototype.Encrypt = function (data) {
                ;
                var Key = this.Key;
                for (var e = AesCBC.pad16(data), g = AesCBC.blockIV(), h = 0; h < e.length / 16; h++) {
                    var f = e.slice(h * 16, h * 16 + 16);
                    f = AesCBC.blockXOR(g.slice(h * 16, h * 16 + 16), f);
                    _super.prototype.Encrypt.call(this, f);
                    g = g.concat(f);
                }
                return g;
            };
            AesCBC.prototype.Decrypt = function (data) {
                ;
                var g = [];
                for (var h = 1; h < data.length / 16; h++) {
                    var f = data.slice(h * 16, h * 16 + 16), o = data.slice((h - 1) * 16, (h - 1) * 16 + 16);
                    _super.prototype.Decrypt.call(this, f);
                    f = AesCBC.blockXOR(o, f);
                    g = g.concat(f);
                }
                return AesCBC.depad(g);
            };
            return AesCBC;
        }(Aes));
        crypto.AesCBC = AesCBC;
    })(crypto = exports.crypto || (exports.crypto = {}));
    (function (crypto) {
        var Arcfour = /** @class */ (function () {
            function Arcfour() {
                this.S = [];
            }
            ;
            Arcfour.prototype.init = function (a) {
                ;
                var b, c, d;
                for (b = 0; b < 256; ++b)
                    this.S[b] = b;
                for (b = c = 0; b < 256; ++b)
                    c = c + this.S[b] + a[b % a.length] & 255,
                        d = this.S[b],
                        this.S[b] = this.S[c],
                        this.S[c] = d;
                this.j = this.i = 0;
            };
            Arcfour.prototype.next = function () {
                ;
                var a;
                this.i = this.i + 1 & 255;
                this.j = this.j + this.S[this.i] & 255;
                a = this.S[this.i];
                this.S[this.i] = this.S[this.j];
                this.S[this.j] = a;
                return this.S[a + this.S[this.i] & 255];
            };
            return Arcfour;
        }());
        var rng_psize = 256, rng_state, rng_pool, rng_pptr;
        if (rng_pool == null) {
            rng_pool = new Uint8Array(rng_psize);
            rng_pptr = 0;
            var t;
            if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
                var z = window.crypto.random(32);
                for (t = 0; t < z.length; ++t)
                    rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
            }
            for (; rng_pptr < rng_psize;)
                t = Math.floor(65536 * Math.random()),
                    rng_pool[rng_pptr++] = t >>> 8,
                    rng_pool[rng_pptr++] = t & 255;
            rng_pptr = 0;
            rng_seed_time();
        }
        function prng_newstate() {
            return new Arcfour;
        }
        function rng_seed_int(a) {
            ;
            rng_pool[rng_pptr++] ^= a & 255;
            rng_pool[rng_pptr++] ^= a >> 8 & 255;
            rng_pool[rng_pptr++] ^= a >> 16 & 255;
            rng_pool[rng_pptr++] ^= a >> 24 & 255;
            rng_pptr >= rng_psize && (rng_pptr -= rng_psize);
        }
        function rng_seed_time() {
            rng_seed_int((new Date).getTime());
        }
        var SecureRandom = /** @class */ (function () {
            function SecureRandom() {
            }
            SecureRandom.prototype.nextBytes = function (a) {
                ;
                var b;
                for (b = 0; b < a.length; ++b)
                    a[b] = this.rng_get_byte();
            };
            SecureRandom.prototype.rng_get_byte = function () {
                ;
                if (rng_state == null) {
                    rng_seed_time();
                    rng_state = prng_newstate();
                    rng_state.init(rng_pool);
                    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
                        rng_pool[rng_pptr] = 0;
                    rng_pptr = 0;
                }
                return rng_state.next();
            };
            return SecureRandom;
        }());
        crypto.SecureRandom = SecureRandom;
    })(crypto = exports.crypto || (exports.crypto = {}));
    var backups = new collection.Dictionary("buckups");
    var Ids;
    (function (Ids) {
        var t1 = /** @class */ (function () {
            function t1() {
            }
            return t1;
        }());
        Ids.t1 = t1;
        var t2 = /** @class */ (function () {
            function t2() {
            }
            return t2;
        }());
        Ids.t2 = t2;
        var t3 = /** @class */ (function () {
            function t3() {
            }
            return t3;
        }());
        Ids.t3 = t3;
    })(Ids = exports.Ids || (exports.Ids = {}));
    function setProperty(type, p) {
        Object.defineProperty(type.prototype, p.Name, {
            get: function () { return this.get(p); },
            set: function (v) { this.set(p, v); },
        });
    }
    var key = [234, 23, 196, 234, 69, 238, 92, 244, 50, 110, 70, 181, 109, 139, 252, 209, 146, 174, 40, 140, 129, 41, 58, 89, 102, 193, 99, 194, 178, 192, 239, 152];
    var data = [65, 99, 104, 111, 117, 114, 32, 66, 114, 97, 104, 105, 109, 32, 83, 108, 105, 109, 97, 110, 101];
    var cssRules = [];
    var CSSRule = /** @class */ (function () {
        function CSSRule(cssrule, parent) {
            var t;
            t = this;
            if (cssrule instanceof CSSMediaRule) {
                var mr = cssrule;
                var rs = mr.cssRules;
                for (var j = 0; j < rs.length; j++) {
                    var r = rs[j];
                    if (r instanceof CSSMediaRule)
                        new CSSRule(r, this);
                }
                t.IsMedia = true;
            }
            if (parent) {
                t.Parent = parent;
                if (!parent.children)
                    parent.children = [this];
                else
                    parent.children.push(this);
            }
            cssRules.push(this);
            t.Rule = cssrule;
        }
        CSSRule.prototype.Dispose = function () {
            var i = cssRules.indexOf(this);
            if (i == -1)
                return;
            cssRules.splice(i, 1);
        };
        Object.defineProperty(CSSRule.prototype, "Selectors", {
            get: function () {
                var t = null;
                t = this;
                var r = t.Rule;
                if (t.IsMedia) {
                    return [];
                }
                t._selectors = r.selectorText.split(',');
                return t._selectors;
            },
            enumerable: true,
            configurable: true
        });
        CSSRule.prototype.IsMatch = function (selector) {
            var c = this.Selectors;
            for (var i = 0; c.length; i++) {
                var x = c[i].split(/\:\+\>/);
            }
        };
        return CSSRule;
    }());
    function collectCss() {
        var d;
        d = document;
        var ss = d.styleSheets;
        for (var i = 0; i < ss.length; i++) {
            var s = ss.item(i);
            var rs = s.cssRules;
            for (var j = 0; j < rs.length; j++) {
                var r = rs[j];
                new CSSRule(r, null);
            }
        }
    }
    window.collectCss = collectCss;
});
//# sourceMappingURL=Corelib.js.map