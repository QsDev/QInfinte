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
define(["require", "exports", "./../../js/corelib", "./../../js/UI", "./../../js/context", "./../QSidebar/script"], function (require, exports, corelib_1, UI_1, context_1, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var t = [1, 2, 4];
    var t1 = t.concat([1, 2, 4]);
    var Replit = /** @class */ (function () {
        function Replit() {
            this.auth = { "command": "auth", "data": "ZXlKamNtVmhkR1ZrSWpveE5URTBNak0yT1RJNU5Ea3hmUT09OlFLU2hySi9IczRONVQ5MDVrSmErZDJmK0hhTHNvN2FRdVJmUFZaVCtwUHc9" };
            this.select = { "command": "select_language", "data": "csharp" };
            this.stat = 0;
            this.ws = new WebSocket(Replit.url);
            this.ws.onopen = this._onopen.bind(this);
            this.ws.onclose = this._onclose.bind(this);
            this.ws.onmessage = this._onmessage.bind(this);
        }
        Replit.prototype.send = function (data) {
            var _this = this;
            data = JSON.stringify(data);
            setTimeout(function () {
                console.log('sending data', data);
                _this.ws.send(data);
            }, 1000);
        };
        Replit.prototype._onopen = function (t, e) {
            switch (this.stat) {
                case 0:
                    this.stat++;
                    this.send(this.auth);
                default:
            }
        };
        Replit.prototype._onclose = function (t, e) {
            console.log("Disconnected");
            this.stat = -1;
        };
        Replit.prototype._onmessage = function (t, e) {
            debugger;
            switch (this.stat) {
                case 0:
                    break;
                case 1:
                    this.stat++;
                    this.send(this.select);
                    debugger;
                    break;
                case 2:
                    console.log("Connected");
                    break;
                case 0:
                    break;
                default:
            }
        };
        Replit.prototype.OnMessage = function () {
        };
        Replit.url = "wss://eval.repl.it/ws";
        return Replit;
    }());
    exports.Replit = Replit;
    var Material;
    (function (Material) {
        var StrechyButton = /** @class */ (function (_super) {
            __extends(StrechyButton, _super);
            function StrechyButton() {
                var _this = _super.call(this, 'templates.strechy-button', UI_1.UI.TControl.Me) || this;
                var f = function () { };
                f.apply(_this);
                return _this;
            }
            StrechyButton.prototype.setName = function (name, dom, cnt, e) {
                this['_'.concat(name)] = dom;
            };
            StrechyButton.prototype.initialize = function () {
                UI_1.UI.JControl.LoadCss(context_1.context.GetPath('style.css'));
            };
            StrechyButton.prototype.OnCompileEnd = function () {
                this._Trigger.addEventListener('click', this);
            };
            StrechyButton.prototype.handleEvent = function (event) {
                corelib_1.$$(this.View).toggleClass('nav-is-visible');
            };
            return StrechyButton;
        }(UI_1.UI.TControl));
        Material.StrechyButton = StrechyButton;
    })(Material = exports.Material || (exports.Material = {}));
    var Css = /** @class */ (function () {
        function Css(style) {
            if (style === void 0)
                style = Css.create();
            if (style && style.sheet instanceof CSSStyleSheet)
                this.sheet = style.sheet;
            else
                throw null;
            this.style = style;
        }
        Css.create = function () {
            // Create the <style> tag
            var style = document.createElement("style");
            // Add a media (and/or media query) here if you'd like!
            // style.setAttribute("media", "screen")
            // style.setAttribute("media", "only screen and (max-width : 1024px)")
            // WebKit hack :(
            style.appendChild(document.createTextNode(""));
            // Add the <style> element to the page
            document.head.appendChild(style);
            return style;
        };
        Css.prototype.add = function (selector) {
        };
        return Css;
    }());
    exports.Css = Css;
    function test() {
        var r = script_1.test();
        r.app.OnInitialized = function (app) {
            var s = new Material.StrechyButton();
            app.Add(s);
        };
    }
    exports.test = test;
    window['testSButton'] = test;
});
//# sourceMappingURL=script.js.map