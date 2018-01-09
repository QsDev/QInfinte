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
define(["require", "exports", "./Corelib", "../js/Filters"], function (require, exports, Corelib_1, Filters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var $Error = Error;
    var _primes = [2, 3];
    var px = 'px';
    window.onbeforeunload = function (event) {
        var e = e || window.event;
        if (e) {
            e.returnValue = message;
        }
        return message;
    };
    var message = "You have not filled out the form.";
    function closedWin() {
        confirm("close ?");
        return false; /* which will not allow to close the window */
    }
    if (window.addEventListener) {
        window.addEventListener("close", closedWin, false);
    }
    window['onclose'] = closedWin;
    function getEvents() {
        return ["MSContentZoom",
            "MSGestureChange",
            "MSGestureDoubleTap",
            "MSGestureEnd", "MSGestureEnd",
            "MSGestureHold",
            "MSGestureStart",
            "MSGestureTap",
            "MSGotPointerCapture",
            "MSInertiaStart",
            "MSLostPointerCapture",
            "MSManipulationStateChanged",
            "MSPointerCancel",
            "MSPointerDown",
            "MSPointerEnter",
            "MSPointerLeave",
            "MSPointerMove",
            "MSPointerOut",
            "MSPointerOver",
            "MSPointerUp",
            "abort",
            "activate",
            "ariarequest",
            "beforeactivate",
            "beforecopy",
            "beforecut",
            "beforedeactivate",
            "beforepaste",
            "blur",
            "canplay",
            "canplaythrough",
            "change",
            "click",
            "command",
            "contextmenu",
            "copy",
            "cuechange",
            "cut",
            "dblclick",
            "deactivate",
            "drag",
            "dragend",
            "dragenter",
            "dragleave",
            "dragover",
            "dragstart",
            "drop",
            "durationchange",
            "emptied",
            "ended",
            "error",
            "focus",
            "gotpointercapture",
            "input",
            "keydown",
            "keypress",
            "keyup",
            "load",
            "loadeddata",
            "loadedmetadata",
            "loadstart",
            "lostpointercapture",
            "mousedown",
            "mouseenter",
            "mouseleave",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "mousewheel",
            "paste",
            "pause",
            "play",
            "playing",
            "pointercancel",
            "pointerdown",
            "pointerenter",
            "pointerleave",
            "pointermove",
            "pointerout",
            "pointerover",
            "pointerup",
            "progress",
            "ratechange",
            "reset",
            "scroll",
            "seeked",
            "seeking",
            "select",
            "selectstart",
            "stalled",
            "submit",
            "suspend",
            "timeupdate",
            "touchcancel",
            "touchend",
            "touchmove",
            "touchstart",
            "volumechange",
            "waiting",
            "webkitfullscreenchange",
            "webkitfullscreenerror",
            "wheel"];
    }
    function registerEvents(e, event) {
        var t = getEvents();
        e.handleEvent = event;
        for (var i = 0; i < t.length; i++)
            e.addEventListener(t[i], e);
    }
    function test(e) {
        registerEvents(e, function (e) {
        });
    }
    var st;
    function prime(i) {
        var p = _primes;
        var l = p[_primes.length - 1];
        for (; p.length < i + 1;) {
            l += 2;
            var t = l;
            var s = Math.sqrt(l);
            s = s % 1 == 0 ? s + 1 : Math.ceil(s);
            for (var j = 0; j < s; j++) {
                var d = p[j];
                var a = void 0;
                if (((a = t / d) % 1) == 0) {
                    t = 1;
                    break;
                }
            }
            if (t !== 1)
                p.push(l);
        }
        return p[i];
    }
    function fractions(l) {
        var f = [1];
        var p = _primes;
        var t = l;
        var s = Math.sqrt(l);
        s = s % 1 == 0 ? s + 1 : Math.ceil(s);
        for (var j = 0; j < s; j++) {
            var d = p[j];
            var a = void 0;
            while (((a = t / d) % 1) == 0) {
                t = a;
                f.push(d);
            }
        }
        if (t !== 1)
            f.push(t);
        return f;
        ;
    }
    function getPrime(x) {
        var p = _primes[x];
        if (p)
            return p;
        return prime(p);
    }
    var onPatentchanged = [];
    var UI;
    (function (UI) {
        var Events;
        (function (Events) {
            Events[Events["keydown"] = 2] = "keydown";
            Events[Events["keyup"] = 3] = "keyup";
            Events[Events["keypress"] = 5] = "keypress";
        })(Events = UI.Events || (UI.Events = {}));
        var JControl = /** @class */ (function (_super) {
            __extends(JControl, _super);
            function JControl(_view) {
                var _this = _super.call(this) || this;
                _this._view = _view;
                _this._onInitialize = new Corelib_1.bind.EventListener(_this, true);
                _this._display = undefined;
                _this._id = ++JControl.counter;
                _this.init = false;
                _this._events = 0;
                if (_this instanceof Desktop)
                    _this._();
                if (_view && _view.id === '')
                    _view.id = _this._id + "";
                return _this;
            }
            JControl.LoadCss = function (url) {
                var head = document.head;
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.media = 'all';
                head.appendChild(link);
                return link;
            };
            JControl.__fields__ = function () { return []; };
            Object.defineProperty(JControl.prototype, "InnerHtml", {
                get: function () { return this._view.innerHTML; },
                enumerable: true,
                configurable: true
            });
            JControl.prototype.Float = function (v) {
                this._view.style.cssFloat = v === 0 ? 'left' : (v === 1 ? 'initiale' : 'right');
            };
            JControl.prototype.Clear = function () {
                this._view.innerHTML = '';
            };
            Object.defineProperty(JControl.prototype, "OnInitialized", {
                set: function (m) {
                    if (this.init)
                        m(this);
                    else
                        this._onInitialize.On = m;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(JControl.prototype, "Presenter", {
                get: function () { return this._presenter || this; },
                set: function (v) { this._presenter = v || this; },
                enumerable: true,
                configurable: true
            });
            JControl.prototype.setAttribute = function (name, value) {
                this.View.setAttribute(name, value);
                return this;
            };
            JControl.prototype.applyStyle = function () {
                var classNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    classNames[_i] = arguments[_i];
                }
                var v = this.View;
                for (var i = 0; i < classNames.length; i++)
                    v.classList.add(classNames[i]);
                return this;
            };
            JControl.prototype.disapplyStyle = function () {
                var classNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    classNames[_i] = arguments[_i];
                }
                var v = this.View;
                for (var i = 0; i < classNames.length; i++)
                    v.classList.remove(classNames[i]);
                return this;
            };
            Object.defineProperty(JControl.prototype, "Visible", {
                get: function () {
                    return this.View.style.display != 'none' && this.View.style.visibility == 'visible';
                },
                set: function (v) {
                    v = v === true;
                    if (v === this._display)
                        return;
                    this._display = this.View.style.display !== 'none' ? this.View.style.display : "";
                    if (v)
                        this.View.style.display = this._display;
                    else
                        this.View.style.display = 'none';
                    //this.View.classList[v ? 'remove' : 'add']('collapse');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(JControl.prototype, "Wait", {
                set: function (v) {
                    if (v)
                        this.applyStyle('Wait');
                    else
                        this.disapplyStyle('Wait');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(JControl.prototype, "Enable", {
                get: function () {
                    return this.View.style.pointerEvents != 'none';
                },
                set: function (v) {
                    this.View.style.pointerEvents = v ? 'all' : 'none';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(JControl.prototype, "Parent", {
                get: function () {
                    return this.parent;
                },
                set: function (v) {
                    this.parent = v;
                    this.__(v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(JControl.prototype, "IsInit", {
                /** @override */
                get: function () { return this.init; },
                enumerable: true,
                configurable: true
            });
            JControl.prototype.OnFullInitialized = function () {
                this._onInitialize.PInvok(this, [this], this);
            };
            JControl.prototype._ = function () {
                this.init = true;
                this.initialize();
                this.OnFullInitialized();
            };
            JControl.prototype.__ = function (v) {
                var _this = this;
                if (v != null && !this.init) {
                    if (v.init) {
                        this._();
                    }
                    else {
                        var pv = this.parent;
                        if (pv && !pv.init)
                            pv._onInitialize.Remove(this._id);
                        v._onInitialize.Add(function (_v) {
                            if (_this.parent == _v)
                                _this._();
                            else
                                throw "";
                        }, this._id);
                    }
                }
            };
            Object.defineProperty(JControl.prototype, "ToolTip", {
                set: function (t) { this.View.title = t; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(JControl.prototype, "View", {
                get: function () {
                    return this._view;
                },
                enumerable: true,
                configurable: true
            });
            JControl.createDiv = function () { return document.createElement('div'); };
            JControl.prototype.addEventListener = function (event, handle, param) {
                var x = new Corelib_1.basic.DomEventHandler(this._view, event, JControl._handle, { jc: this, handle: handle, p: param });
                x.Start();
                return x;
            };
            JControl._handle = function (eth, ev, p) {
                p.handle(p.jc, ev, p.p);
            };
            JControl.prototype.AddRange = function (chidren) {
                for (var i = 0, l = chidren.length; i < l; i++)
                    this.Add(chidren[i]);
                return this;
            };
            JControl.prototype.Add = function (child) {
                if (child.parent != null) {
                    if (child.parent === this)
                        return;
                    child.parent.Remove(child, false);
                }
                child = this.getTemplate(child);
                child.Parent = this;
                this.View.appendChild(child.View);
                return this;
            };
            JControl.prototype.IndexOf = function (child) {
            };
            JControl.prototype.Insert = function (child, to) {
                if (child.parent != null) {
                    child.parent.Remove(child, false);
                }
                child = this.getTemplate(child);
                child.Parent = this;
                this.View.insertChildAtIndex(child.View, to);
                return this;
            };
            JControl.prototype.Remove = function (child, dispose) {
                if (child.parent != this)
                    return false;
                child.Parent = null;
                this.View.removeChild(child.View);
                if (dispose)
                    child.Dispose();
                return true;
            };
            JControl.prototype.getTemplate = function (child) {
                return child;
            };
            Object.defineProperty(JControl.prototype, "Id", {
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            JControl.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                if (this.parent)
                    this.parent.Remove(this, false);
                if ((this._presenter != null) && (this._presenter != this))
                    this._presenter.Dispose();
                this._presenter = null;
                this.Parent = null;
                this._view = null;
                this._display = null;
                this._onInitialize.Dispose();
                this._presenter = null;
                this.parent = null;
                this.Presenter;
                Corelib_1.basic.DomEventHandler.Dispose(this._view);
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            JControl.prototype.OnHotKey = function () {
            };
            Object.defineProperty(JControl.prototype, "HotKey", {
                get: function () { return this._hotKey; },
                set: function (v) {
                    if (!this.isEventRegistred(Events.keyup))
                        this.registerEvent(Events.keypress);
                    this._hotKey = v;
                },
                enumerable: true,
                configurable: true
            });
            JControl.prototype.handleEvent = function (e) {
                switch (Events[e.type]) {
                    case Events.keydown:
                        break;
                    case Events.keyup:
                        if (this._hotKey && this._hotKey.IsPressed(e))
                            this.OnHotKey();
                        break;
                    case Events.keypress:
                        break;
                }
            };
            JControl.prototype.isEventRegistred = function (event) {
                var t = typeof (event) == 'number' ? event : Events[event];
                if (t === undefined)
                    throw "event is not registred";
                return (this._events / t) % 1 === 0;
            };
            JControl.prototype.registerEvent = function (event) {
                this._view.addEventListener(Events[event], this);
            };
            JControl.toggleClass = function (dom, className) {
                if (dom.classList.contains(className))
                    dom.classList.remove(className);
                else
                    dom.classList.add(className);
            };
            JControl.counter = 0;
            return JControl;
        }(Corelib_1.bind.DObject));
        UI.JControl = JControl;
        var Control = /** @class */ (function (_super) {
            __extends(Control, _super);
            function Control(view) {
                return _super.call(this, view) || this;
            }
            Object.defineProperty(Control.prototype, "Children", {
                get: function () { return this._c || (this._c = []); },
                enumerable: true,
                configurable: true
            });
            //private templates: JControl[] = [];
            Control.prototype.Add = function (child) {
                if (!this.Check(child))
                    throw 'Uncompatible';
                var t;
                if (child instanceof JControl) {
                    t = child.Presenter;
                    if (t === undefined)
                        t = child;
                    if (t.Parent != null) {
                        t.Parent.Remove(t, false);
                    }
                }
                t = this.getTemplate(child);
                t.Parent = this;
                if (t !== child)
                    child._presenter = t;
                this.Children.push(child);
                this.View.appendChild(t.View);
                this.OnChildAdded(child);
                return this;
            };
            Control.prototype.Insert = function (child, to) {
                if (!this.Check(child))
                    throw 'Uncompatible';
                var t;
                if (child instanceof JControl) {
                    t = child.Presenter;
                    if (t === undefined)
                        t = child;
                    if (t.Parent != null) {
                        t.Parent.Remove(t, false);
                    }
                }
                t = this.getTemplate(child);
                t.Parent = this;
                this.Children.splice(to, 0, child);
                this.View.insertChildAtIndex(child.View, to);
                this.OnChildAdded(child);
                return this;
            };
            Control.prototype.Remove = function (child, dispose) {
                var i = this.Children.indexOf(child);
                if (i == -1)
                    return true;
                var t = child.Presenter;
                if (t.Parent != this)
                    return false;
                t.Parent = null;
                if (this.Children.splice(i, 1).length != 0)
                    this.View.removeChild(t.View);
                return true;
            };
            Control.prototype.RemoveAt = function (i, dispose) {
                var child = this.Children[i];
                if (!child)
                    return;
                var t = child.Presenter;
                t.Parent = null;
                this.Children.splice(i, 1);
                this.View.removeChild(this.Presenter ? t.Presenter.View : t.View);
                if (dispose)
                    child.Dispose();
                return true;
            };
            Object.defineProperty(Control.prototype, "HasTemplate", {
                get: function () { return false; },
                enumerable: true,
                configurable: true
            });
            Control.prototype.getTemplate = function (child) {
                return child;
            };
            Control.prototype.OnChildAdded = function (child) {
            };
            Control.prototype.getChild = function (i) {
                return this.Children[i];
            };
            Control.prototype.IndexOf = function (item) {
                return this.Children.indexOf(item);
            };
            Object.defineProperty(Control.prototype, "Count", {
                get: function () {
                    return this.Children.length;
                },
                enumerable: true,
                configurable: true
            });
            Control.prototype.CloneChildren = function () {
                var c = this.Children;
                var arr = new Array(c.length);
                for (var i = 0, l = arr.length; i < l; i++)
                    arr[i] = c[i];
            };
            Control.prototype.Clear = function (dispose) {
                for (var i = 0, l = this.Count; i < l; i++)
                    this.RemoveAt(0, dispose);
            };
            Control.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                this.Clear(true);
                this._c.length = 0;
                this._c = null;
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            return Control;
        }(JControl));
        UI.Control = Control;
        var authApp;
        var isLogged = function (v) { _.AuthStatChanged(v); };
        var authApp;
        var Desktop = /** @class */ (function (_super) {
            __extends(Desktop, _super);
            function Desktop() {
                var _this = _super.call(this, document.body) || this;
                _this.apps = new Corelib_1.collection.List(Object);
                _this.IsSingleton = true;
                _this.loadApp = Corelib_1.thread.Dispatcher.cretaeJob(function (app) {
                    _this.CurrentApp = app;
                }, [null], _this, !true);
                if (_ != null)
                    throw '';
                _ = _this;
                return _this;
            }
            Desktop.ctor = function () {
                Desktop.DPCurrentApp = Corelib_1.bind.DObject.CreateField('CurrentApp', IApp, null, function (e) {
                    e.__this.selectApp(e._old, e._new);
                });
            };
            Desktop.prototype.selectApp = function (oldApp, app) {
                if (oldApp)
                    this.Remove(oldApp, false);
                if (app)
                    _super.prototype.Add.call(this, app);
                window.sessionStorage.setItem('app', app && app.Name);
            };
            Desktop.__fields__ = function () {
                return [Desktop.DPCurrentApp];
            };
            Desktop.prototype.AuthStatChanged = function (v) {
                if (v)
                    this.Show(this.AuthenticationApp.RedirectApp);
                else
                    this.Show(this.AuthenticationApp);
            };
            Desktop.prototype.initialize = function () {
                //document.addEventListener('mousedown', this);
                document.addEventListener('keydown', this);
            };
            Desktop.prototype.mouseController = function (e) {
            };
            Desktop.prototype.GetKeyControl = function (owner, invoke, params) {
                this._keyboardController = { owner: owner, invoke: invoke, params: params };
            };
            Desktop.prototype.ReleaseKeyControl = function () {
                this._keyboardController = null;
            };
            Desktop.prototype.handleEvent = function (e) {
                var x = this._keyboardController;
                if (x) {
                    var p = x.params.slice();
                    p.unshift(e);
                    if (!x.invoke.apply(this._keyboardController.owner, p))
                        return;
                    this.ReleaseKeyControl();
                }
                var currentApp = this.CurrentApp;
                var cd = openedModal[openedModal.length - 1];
                if (e.keyCode > 111 && e.keyCode < 124) {
                    e.stopPropagation();
                    e.preventDefault();
                }
                if (cd) {
                    cd.OnKeyDown(e);
                    return;
                }
                if (e.keyCode === 114) {
                    if (e.ctrlKey)
                        this.CurrentApp.ToggleTitle();
                    else
                        this.CurrentApp.OnDeepSearche();
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                if (e.keyCode === Keys.F5) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    this.CurrentApp.Update();
                }
                else if (e.keyCode == Keys.F12) {
                    var cp = this.CurrentApp;
                    if (e.ctrlKey) {
                        this.CurrentApp.Logout();
                    }
                    else if (cp) {
                        if (cp.SelectedPage instanceof UI.NavPage)
                            cp.SelectedPage.ToggleNav();
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                }
                else if (e.ctrlKey && e.keyCode == 66) {
                    if ((Date.now() - this.isReq) < 500) {
                        Corelib_1.Api.RiseApi('Settings', { data: e, callback: function () { } });
                    }
                    else
                        this.isReq = Date.now();
                }
                else {
                    if (this.CurrentApp) {
                        if (e.ctrlKey)
                            if (e.keyCode === 80)
                                this.CurrentApp.OnPrint();
                            else if (e.keyCode == 9)
                                if (e.shiftKey)
                                    return currentApp.SelectPrevPage();
                                else
                                    return currentApp.SelectNaxtPage();
                            else if (e.keyCode === 37)
                                return currentApp.SelectPrevPage();
                            else if (e.keyCode === 39)
                                return currentApp.SelectNaxtPage();
                        currentApp.OnKeyDown(e);
                    }
                }
            };
            Desktop.prototype.ShowStart = function () {
                var t = this.apps;
                var s = "Select app :";
                var ap = this.CurrentApp == null ? null : this.CurrentApp.Name;
                for (var i = 0, l = t.Count; i < l; i++) {
                    if (ap == null)
                        ap = t.Get(i).Name;
                    s += "\r        " + t.Get(i).Name;
                }
                var e = prompt(s, ap == null ? "" : ap);
                for (var i = 0, l = t.Count; i < l; i++)
                    if (t.Get(i).Name.toLowerCase() == e) {
                        {
                            this.Show(t.Get(i));
                        }
                        return;
                    }
            };
            Object.defineProperty(Desktop, "Current", {
                get: function () { return _; },
                enumerable: true,
                configurable: true
            });
            Desktop.prototype.Check = function (v) {
                return v instanceof IApp;
            };
            Desktop.prototype.Show = function (app) {
                var _this = this;
                authApp.IsLogged(function (v, app) {
                    var currentApp = _this.CurrentApp;
                    if (!v) {
                        if (currentApp instanceof AuthApp)
                            return;
                        if (app !== _this.AuthenticationApp)
                            _this.AuthenticationApp.RedirectApp = app;
                        app = _this.AuthenticationApp;
                    }
                    else {
                        app = app instanceof AuthApp ? app.RedirectApp : app;
                        //currentApp instanceof AuthApp ? currentApp.RedirectApp : app;
                    }
                    if (!app)
                        for (var i = 0; i < _this.apps.Count; i++) {
                            var appx = _this.apps.Get(i);
                            if (!(appx instanceof AuthApp)) {
                                app = appx;
                                break;
                            }
                        }
                    Corelib_1.thread.Dispatcher.Push(_this.loadApp.Set(app));
                }, app);
            };
            Desktop.prototype.Add = function (i) {
                if (i instanceof AuthApp)
                    this.AuthenticationApp = i;
                else
                    this.Register(i);
                return this;
            };
            Desktop.prototype.Register = function (app) {
                if (this.apps.IndexOf(app) !== -1)
                    return;
                this.apps.Add(app);
                app.Parent = this;
            };
            Object.defineProperty(Desktop.prototype, "AuthenticationApp", {
                //private currentApp: App;
                //private redirectApp: defs.UI.IApp;
                get: function () { return authApp; },
                set: function (v) {
                    if (authApp || v == null)
                        throw '';
                    authApp = v;
                    authApp.OnLogged = { Owner: this, Invoke: this.Redirect };
                },
                enumerable: true,
                configurable: true
            });
            Desktop.prototype.Redirect = function (app) {
                this.Show(app.RedirectApp);
            };
            return Desktop;
        }(Control));
        UI.Desktop = Desktop;
        var Container = /** @class */ (function (_super) {
            __extends(Container, _super);
            function Container() {
                return _super.call(this, document.createElement('div')) || this;
            }
            Container.prototype.initialize = function () { this.applyStyle('container'); };
            Container.prototype.Check = function (child) { return child instanceof JControl; };
            return Container;
        }(Control));
        UI.Container = Container;
        var Icons;
        (function (Icons) {
            Icons[Icons["Bar"] = 0] = "Bar";
            Icons[Icons["Next"] = 1] = "Next";
            Icons[Icons["Prev"] = 2] = "Prev";
        })(Icons = UI.Icons || (UI.Icons = {}));
        var Glyphs;
        (function (Glyphs) {
            Glyphs[Glyphs["none"] = 0] = "none";
            Glyphs[Glyphs["asterisk"] = 1] = "asterisk";
            Glyphs[Glyphs["plus"] = 2] = "plus";
            Glyphs[Glyphs["eur"] = 3] = "eur";
            Glyphs[Glyphs["euro"] = 4] = "euro";
            Glyphs[Glyphs["minus"] = 5] = "minus";
            Glyphs[Glyphs["cloud"] = 6] = "cloud";
            Glyphs[Glyphs["envelope"] = 7] = "envelope";
            Glyphs[Glyphs["pencil"] = 8] = "pencil";
            Glyphs[Glyphs["glass"] = 9] = "glass";
            Glyphs[Glyphs["music"] = 10] = "music";
            Glyphs[Glyphs["search"] = 11] = "search";
            Glyphs[Glyphs["heart"] = 12] = "heart";
            Glyphs[Glyphs["star"] = 13] = "star";
            Glyphs[Glyphs["starEmpty"] = 14] = "starEmpty";
            Glyphs[Glyphs["user"] = 15] = "user";
            Glyphs[Glyphs["film"] = 16] = "film";
            Glyphs[Glyphs["thLarge"] = 17] = "thLarge";
            Glyphs[Glyphs["th"] = 18] = "th";
            Glyphs[Glyphs["thList"] = 19] = "thList";
            Glyphs[Glyphs["ok"] = 20] = "ok";
            Glyphs[Glyphs["remove"] = 21] = "remove";
            Glyphs[Glyphs["zoomIn"] = 22] = "zoomIn";
            Glyphs[Glyphs["zoomOut"] = 23] = "zoomOut";
            Glyphs[Glyphs["off"] = 24] = "off";
            Glyphs[Glyphs["signal"] = 25] = "signal";
            Glyphs[Glyphs["cog"] = 26] = "cog";
            Glyphs[Glyphs["trash"] = 27] = "trash";
            Glyphs[Glyphs["home"] = 28] = "home";
            Glyphs[Glyphs["file"] = 29] = "file";
            Glyphs[Glyphs["time"] = 30] = "time";
            Glyphs[Glyphs["road"] = 31] = "road";
            Glyphs[Glyphs["downloadAlt"] = 32] = "downloadAlt";
            Glyphs[Glyphs["download"] = 33] = "download";
            Glyphs[Glyphs["upload"] = 34] = "upload";
            Glyphs[Glyphs["inbox"] = 35] = "inbox";
            Glyphs[Glyphs["playCircle"] = 36] = "playCircle";
            Glyphs[Glyphs["repeat"] = 37] = "repeat";
            Glyphs[Glyphs["refresh"] = 38] = "refresh";
            Glyphs[Glyphs["listAlt"] = 39] = "listAlt";
            Glyphs[Glyphs["lock"] = 40] = "lock";
            Glyphs[Glyphs["flag"] = 41] = "flag";
            Glyphs[Glyphs["headphones"] = 42] = "headphones";
            Glyphs[Glyphs["volumeOff"] = 43] = "volumeOff";
            Glyphs[Glyphs["volumeDown"] = 44] = "volumeDown";
            Glyphs[Glyphs["volumeUp"] = 45] = "volumeUp";
            Glyphs[Glyphs["qrcode"] = 46] = "qrcode";
            Glyphs[Glyphs["barcode"] = 47] = "barcode";
            Glyphs[Glyphs["tag"] = 48] = "tag";
            Glyphs[Glyphs["tags"] = 49] = "tags";
            Glyphs[Glyphs["book"] = 50] = "book";
            Glyphs[Glyphs["bookmark"] = 51] = "bookmark";
            Glyphs[Glyphs["print"] = 52] = "print";
            Glyphs[Glyphs["camera"] = 53] = "camera";
            Glyphs[Glyphs["font"] = 54] = "font";
            Glyphs[Glyphs["bold"] = 55] = "bold";
            Glyphs[Glyphs["italic"] = 56] = "italic";
            Glyphs[Glyphs["textHeight"] = 57] = "textHeight";
            Glyphs[Glyphs["textWidth"] = 58] = "textWidth";
            Glyphs[Glyphs["alignLeft"] = 59] = "alignLeft";
            Glyphs[Glyphs["alignCenter"] = 60] = "alignCenter";
            Glyphs[Glyphs["alignRight"] = 61] = "alignRight";
            Glyphs[Glyphs["alignJustify"] = 62] = "alignJustify";
            Glyphs[Glyphs["list"] = 63] = "list";
            Glyphs[Glyphs["indentLeft"] = 64] = "indentLeft";
            Glyphs[Glyphs["indentRight"] = 65] = "indentRight";
            Glyphs[Glyphs["facetimeVideo"] = 66] = "facetimeVideo";
            Glyphs[Glyphs["picture"] = 67] = "picture";
            Glyphs[Glyphs["mapMarker"] = 68] = "mapMarker";
            Glyphs[Glyphs["adjust"] = 69] = "adjust";
            Glyphs[Glyphs["tint"] = 70] = "tint";
            Glyphs[Glyphs["edit"] = 71] = "edit";
            Glyphs[Glyphs["share"] = 72] = "share";
            Glyphs[Glyphs["check"] = 73] = "check";
            Glyphs[Glyphs["move"] = 74] = "move";
            Glyphs[Glyphs["stepBackward"] = 75] = "stepBackward";
            Glyphs[Glyphs["fastBackward"] = 76] = "fastBackward";
            Glyphs[Glyphs["backward"] = 77] = "backward";
            Glyphs[Glyphs["play"] = 78] = "play";
            Glyphs[Glyphs["pause"] = 79] = "pause";
            Glyphs[Glyphs["stop"] = 80] = "stop";
            Glyphs[Glyphs["forward"] = 81] = "forward";
            Glyphs[Glyphs["fastForward"] = 82] = "fastForward";
            Glyphs[Glyphs["stepForward"] = 83] = "stepForward";
            Glyphs[Glyphs["eject"] = 84] = "eject";
            Glyphs[Glyphs["chevronLeft"] = 85] = "chevronLeft";
            Glyphs[Glyphs["chevronRight"] = 86] = "chevronRight";
            Glyphs[Glyphs["plusSign"] = 87] = "plusSign";
            Glyphs[Glyphs["minusSign"] = 88] = "minusSign";
            Glyphs[Glyphs["removeSign"] = 89] = "removeSign";
            Glyphs[Glyphs["okSign"] = 90] = "okSign";
            Glyphs[Glyphs["questionSign"] = 91] = "questionSign";
            Glyphs[Glyphs["infoSign"] = 92] = "infoSign";
            Glyphs[Glyphs["screenshot"] = 93] = "screenshot";
            Glyphs[Glyphs["removeCircle"] = 94] = "removeCircle";
            Glyphs[Glyphs["okCircle"] = 95] = "okCircle";
            Glyphs[Glyphs["banCircle"] = 96] = "banCircle";
            Glyphs[Glyphs["arrowLeft"] = 97] = "arrowLeft";
            Glyphs[Glyphs["arrowRight"] = 98] = "arrowRight";
            Glyphs[Glyphs["arrowUp"] = 99] = "arrowUp";
            Glyphs[Glyphs["arrowDown"] = 100] = "arrowDown";
            Glyphs[Glyphs["shareAlt"] = 101] = "shareAlt";
            Glyphs[Glyphs["resizeFull"] = 102] = "resizeFull";
            Glyphs[Glyphs["resizeSmall"] = 103] = "resizeSmall";
            Glyphs[Glyphs["exclamationSign"] = 104] = "exclamationSign";
            Glyphs[Glyphs["gift"] = 105] = "gift";
            Glyphs[Glyphs["leaf"] = 106] = "leaf";
            Glyphs[Glyphs["fire"] = 107] = "fire";
            Glyphs[Glyphs["eyeOpen"] = 108] = "eyeOpen";
            Glyphs[Glyphs["eyeClose"] = 109] = "eyeClose";
            Glyphs[Glyphs["warningSign"] = 110] = "warningSign";
            Glyphs[Glyphs["plane"] = 111] = "plane";
            Glyphs[Glyphs["calendar"] = 112] = "calendar";
            Glyphs[Glyphs["random"] = 113] = "random";
            Glyphs[Glyphs["comment"] = 114] = "comment";
            Glyphs[Glyphs["magnet"] = 115] = "magnet";
            Glyphs[Glyphs["chevronUp"] = 116] = "chevronUp";
            Glyphs[Glyphs["chevronDown"] = 117] = "chevronDown";
            Glyphs[Glyphs["retweet"] = 118] = "retweet";
            Glyphs[Glyphs["shoppingCart"] = 119] = "shoppingCart";
            Glyphs[Glyphs["folderClose"] = 120] = "folderClose";
            Glyphs[Glyphs["folderOpen"] = 121] = "folderOpen";
            Glyphs[Glyphs["resizeVertical"] = 122] = "resizeVertical";
            Glyphs[Glyphs["resizeHorizontal"] = 123] = "resizeHorizontal";
            Glyphs[Glyphs["hdd"] = 124] = "hdd";
            Glyphs[Glyphs["bullhorn"] = 125] = "bullhorn";
            Glyphs[Glyphs["bell"] = 126] = "bell";
            Glyphs[Glyphs["certificate"] = 127] = "certificate";
            Glyphs[Glyphs["thumbsUp"] = 128] = "thumbsUp";
            Glyphs[Glyphs["thumbsDown"] = 129] = "thumbsDown";
            Glyphs[Glyphs["handRight"] = 130] = "handRight";
            Glyphs[Glyphs["handLeft"] = 131] = "handLeft";
            Glyphs[Glyphs["handUp"] = 132] = "handUp";
            Glyphs[Glyphs["handDown"] = 133] = "handDown";
            Glyphs[Glyphs["circleArrowRight"] = 134] = "circleArrowRight";
            Glyphs[Glyphs["circleArrowLeft"] = 135] = "circleArrowLeft";
            Glyphs[Glyphs["circleArrowUp"] = 136] = "circleArrowUp";
            Glyphs[Glyphs["circleArrowDown"] = 137] = "circleArrowDown";
            Glyphs[Glyphs["globe"] = 138] = "globe";
            Glyphs[Glyphs["wrench"] = 139] = "wrench";
            Glyphs[Glyphs["tasks"] = 140] = "tasks";
            Glyphs[Glyphs["filter"] = 141] = "filter";
            Glyphs[Glyphs["briefcase"] = 142] = "briefcase";
            Glyphs[Glyphs["fullscreen"] = 143] = "fullscreen";
            Glyphs[Glyphs["dashboard"] = 144] = "dashboard";
            Glyphs[Glyphs["paperclip"] = 145] = "paperclip";
            Glyphs[Glyphs["heartEmpty"] = 146] = "heartEmpty";
            Glyphs[Glyphs["link"] = 147] = "link";
            Glyphs[Glyphs["phone"] = 148] = "phone";
            Glyphs[Glyphs["pushpin"] = 149] = "pushpin";
            Glyphs[Glyphs["usd"] = 150] = "usd";
            Glyphs[Glyphs["gbp"] = 151] = "gbp";
            Glyphs[Glyphs["sort"] = 152] = "sort";
            Glyphs[Glyphs["sortByAlphabet"] = 153] = "sortByAlphabet";
            Glyphs[Glyphs["sortByAlphabetAlt"] = 154] = "sortByAlphabetAlt";
            Glyphs[Glyphs["sortByOrder"] = 155] = "sortByOrder";
            Glyphs[Glyphs["sortByOrderAlt"] = 156] = "sortByOrderAlt";
            Glyphs[Glyphs["sortByAttributes"] = 157] = "sortByAttributes";
            Glyphs[Glyphs["sortByAttributesAlt"] = 158] = "sortByAttributesAlt";
            Glyphs[Glyphs["unchecked"] = 159] = "unchecked";
            Glyphs[Glyphs["expand"] = 160] = "expand";
            Glyphs[Glyphs["collapseDown"] = 161] = "collapseDown";
            Glyphs[Glyphs["collapseUp"] = 162] = "collapseUp";
            Glyphs[Glyphs["logIn"] = 163] = "logIn";
            Glyphs[Glyphs["flash"] = 164] = "flash";
            Glyphs[Glyphs["logOut"] = 165] = "logOut";
            Glyphs[Glyphs["newWindow"] = 166] = "newWindow";
            Glyphs[Glyphs["record"] = 167] = "record";
            Glyphs[Glyphs["save"] = 168] = "save";
            Glyphs[Glyphs["open"] = 169] = "open";
            Glyphs[Glyphs["saved"] = 170] = "saved";
            Glyphs[Glyphs["import"] = 171] = "import";
            Glyphs[Glyphs["export"] = 172] = "export";
            Glyphs[Glyphs["send"] = 173] = "send";
            Glyphs[Glyphs["floppyDisk"] = 174] = "floppyDisk";
            Glyphs[Glyphs["floppySaved"] = 175] = "floppySaved";
            Glyphs[Glyphs["floppyRemove"] = 176] = "floppyRemove";
            Glyphs[Glyphs["floppySave"] = 177] = "floppySave";
            Glyphs[Glyphs["floppyOpen"] = 178] = "floppyOpen";
            Glyphs[Glyphs["creditCard"] = 179] = "creditCard";
            Glyphs[Glyphs["transfer"] = 180] = "transfer";
            Glyphs[Glyphs["cutlery"] = 181] = "cutlery";
            Glyphs[Glyphs["header"] = 182] = "header";
            Glyphs[Glyphs["compressed"] = 183] = "compressed";
            Glyphs[Glyphs["earphone"] = 184] = "earphone";
            Glyphs[Glyphs["phoneAlt"] = 185] = "phoneAlt";
            Glyphs[Glyphs["tower"] = 186] = "tower";
            Glyphs[Glyphs["stats"] = 187] = "stats";
            Glyphs[Glyphs["sdVideo"] = 188] = "sdVideo";
            Glyphs[Glyphs["hdVideo"] = 189] = "hdVideo";
            Glyphs[Glyphs["subtitles"] = 190] = "subtitles";
            Glyphs[Glyphs["soundStereo"] = 191] = "soundStereo";
            Glyphs[Glyphs["soundDolby"] = 192] = "soundDolby";
            Glyphs[Glyphs["sound$5$1"] = 193] = "sound$5$1";
            Glyphs[Glyphs["sound$6$1"] = 194] = "sound$6$1";
            Glyphs[Glyphs["sound$7$1"] = 195] = "sound$7$1";
            Glyphs[Glyphs["copyrightMark"] = 196] = "copyrightMark";
            Glyphs[Glyphs["registrationMark"] = 197] = "registrationMark";
            Glyphs[Glyphs["cloudDownload"] = 198] = "cloudDownload";
            Glyphs[Glyphs["cloudUpload"] = 199] = "cloudUpload";
            Glyphs[Glyphs["treeConifer"] = 200] = "treeConifer";
            Glyphs[Glyphs["treeDeciduous"] = 201] = "treeDeciduous";
            Glyphs[Glyphs["cd"] = 202] = "cd";
            Glyphs[Glyphs["saveFile"] = 203] = "saveFile";
            Glyphs[Glyphs["openFile"] = 204] = "openFile";
            Glyphs[Glyphs["levelUp"] = 205] = "levelUp";
            Glyphs[Glyphs["copy"] = 206] = "copy";
            Glyphs[Glyphs["paste"] = 207] = "paste";
            Glyphs[Glyphs["alert"] = 208] = "alert";
            Glyphs[Glyphs["equalizer"] = 209] = "equalizer";
            Glyphs[Glyphs["king"] = 210] = "king";
            Glyphs[Glyphs["queen"] = 211] = "queen";
            Glyphs[Glyphs["pawn"] = 212] = "pawn";
            Glyphs[Glyphs["bishop"] = 213] = "bishop";
            Glyphs[Glyphs["knight"] = 214] = "knight";
            Glyphs[Glyphs["babyFormula"] = 215] = "babyFormula";
            Glyphs[Glyphs["tent"] = 216] = "tent";
            Glyphs[Glyphs["blackboard"] = 217] = "blackboard";
            Glyphs[Glyphs["bed"] = 218] = "bed";
            Glyphs[Glyphs["apple"] = 219] = "apple";
            Glyphs[Glyphs["erase"] = 220] = "erase";
            Glyphs[Glyphs["hourglass"] = 221] = "hourglass";
            Glyphs[Glyphs["lamp"] = 222] = "lamp";
            Glyphs[Glyphs["duplicate"] = 223] = "duplicate";
            Glyphs[Glyphs["piggyBank"] = 224] = "piggyBank";
            Glyphs[Glyphs["scissors"] = 225] = "scissors";
            Glyphs[Glyphs["bitcoin"] = 226] = "bitcoin";
            Glyphs[Glyphs["btc"] = 227] = "btc";
            Glyphs[Glyphs["xbt"] = 228] = "xbt";
            Glyphs[Glyphs["yen"] = 229] = "yen";
            Glyphs[Glyphs["jpy"] = 230] = "jpy";
            Glyphs[Glyphs["ruble"] = 231] = "ruble";
            Glyphs[Glyphs["rub"] = 232] = "rub";
            Glyphs[Glyphs["scale"] = 233] = "scale";
            Glyphs[Glyphs["iceLolly"] = 234] = "iceLolly";
            Glyphs[Glyphs["iceLollyTasted"] = 235] = "iceLollyTasted";
            Glyphs[Glyphs["education"] = 236] = "education";
            Glyphs[Glyphs["optionHorizontal"] = 237] = "optionHorizontal";
            Glyphs[Glyphs["optionVertical"] = 238] = "optionVertical";
            Glyphs[Glyphs["menuHamburger"] = 239] = "menuHamburger";
            Glyphs[Glyphs["modalWindow"] = 240] = "modalWindow";
            Glyphs[Glyphs["oil"] = 241] = "oil";
            Glyphs[Glyphs["grain"] = 242] = "grain";
            Glyphs[Glyphs["sunglasses"] = 243] = "sunglasses";
            Glyphs[Glyphs["textSize"] = 244] = "textSize";
            Glyphs[Glyphs["textColor"] = 245] = "textColor";
            Glyphs[Glyphs["textBackground"] = 246] = "textBackground";
            Glyphs[Glyphs["objectAlignTop"] = 247] = "objectAlignTop";
            Glyphs[Glyphs["objectAlignBottom"] = 248] = "objectAlignBottom";
            Glyphs[Glyphs["objectAlignHorizontal"] = 249] = "objectAlignHorizontal";
            Glyphs[Glyphs["objectAlignLeft"] = 250] = "objectAlignLeft";
            Glyphs[Glyphs["objectAlignVertical"] = 251] = "objectAlignVertical";
            Glyphs[Glyphs["objectAlignRight"] = 252] = "objectAlignRight";
            Glyphs[Glyphs["triangleRight"] = 253] = "triangleRight";
            Glyphs[Glyphs["triangleLeft"] = 254] = "triangleLeft";
            Glyphs[Glyphs["triangleBottom"] = 255] = "triangleBottom";
            Glyphs[Glyphs["triangleTop"] = 256] = "triangleTop";
            Glyphs[Glyphs["console"] = 257] = "console";
            Glyphs[Glyphs["superscript"] = 258] = "superscript";
            Glyphs[Glyphs["subscript"] = 259] = "subscript";
            Glyphs[Glyphs["menuLeft"] = 260] = "menuLeft";
            Glyphs[Glyphs["menuRight"] = 261] = "menuRight";
            Glyphs[Glyphs["menuDown"] = 262] = "menuDown";
            Glyphs[Glyphs["menuUp"] = 263] = "menuUp";
        })(Glyphs = UI.Glyphs || (UI.Glyphs = {}));
        var Glyph = /** @class */ (function (_super) {
            __extends(Glyph, _super);
            function Glyph(glyph, isIcon, toolTip) {
                var _this = _super.call(this, document.createElement('span')) || this;
                _this.isIcon = isIcon;
                isIcon = isIcon == true;
                _this.Type = glyph;
                _this._view.classList.add('bgr');
                _this._view.title = toolTip;
                return _this;
            }
            Glyph.AllGlyphs = function (panel) {
                for (var i in Glyphs) {
                    if (isNaN(i)) {
                        panel.Add(new Glyph(Glyphs[i], false));
                    }
                }
            };
            Glyph.Test = function () {
                var c = new UI.Div().applyStyle('row');
                for (var i in Glyphs) {
                    if (isNaN(i)) {
                        var v = new Glyph(Glyphs[i], false).applyStyle('col');
                        c.Add(v);
                        v.ToolTip = i;
                    }
                }
                c.Parent = UI.Desktop.Current;
                var reg = document.getElementById('51');
                reg.appendChild(c.View);
                c.View.style.fontSize = '-webkit-xxx-large';
                c.View.style.padding = '15px';
                return c;
            };
            Glyph.Create = function (glyph, toolTip, cssClass) {
                var v = document.createElement('span');
                v.classList.add('glyphicon', Glyph.GetGlyphCSS(glyph), 'bgr');
                if (cssClass)
                    v.classList.add(cssClass);
                v.title = toolTip;
                return v;
            };
            Glyph.GetGlyphCSS = function (name) {
                var c = Corelib_1.css.toValidCssName(Glyphs[name]);
                return 'glyphicon' + (c == null ? '' : '-' + c);
            };
            Glyph.GetIconCSS = function (name) {
                var c = Icons[name];
                return 'icon-' + (c == null ? '' : c.toLowerCase());
            };
            Glyph.prototype.getStyle = function () {
                if (this.isIcon)
                    return Glyph.GetIconCSS(this.v);
                else
                    return Glyph.GetGlyphCSS(this.v);
            };
            Glyph.prototype.initialize = function () {
            };
            Object.defineProperty(Glyph.prototype, "Type", {
                get: function () { return this.v; },
                set: function (v) {
                    if (this.v != null)
                        this.View.classList.remove(this.getStyle());
                    this.v = v;
                    if (v != null)
                        this.applyStyle('glyphicon', this.getStyle());
                },
                enumerable: true,
                configurable: true
            });
            return Glyph;
        }(JControl));
        UI.Glyph = Glyph;
        window.Test = Glyph.Test;
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button() {
                var _this = _super.call(this, document.createElement('button')) || this;
                _this.v = 0;
                return _this;
            }
            Button.prototype.Focus = function () {
                this._view.focus();
            };
            Object.defineProperty(Button.prototype, "Style", {
                set: function (v) {
                    this.View.classList.remove('btn-' + ButtonStyle[this.v].toLowerCase());
                    this.applyStyle('btn-' + ButtonStyle[v].toLowerCase());
                    this.v = v;
                },
                enumerable: true,
                configurable: true
            });
            Button.prototype.initialize = function () {
                this.applyStyle('btn', 'btn-default');
                this.Type = 'button';
            };
            Object.defineProperty(Button.prototype, "Text", {
                set: function (s) { this.View.innerHTML = s; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "Type", {
                set: function (s) { this.View.type = s; },
                enumerable: true,
                configurable: true
            });
            return Button;
        }(JControl));
        UI.Button = Button;
        var GlyphButton = /** @class */ (function (_super) {
            __extends(GlyphButton, _super);
            function GlyphButton() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GlyphButton.prototype.initialize = function () {
                var v = this.View;
                this.AddGlyphs(function () { return true; }, Icons.Bar, Icons.Bar, Icons.Bar);
                _super.prototype.initialize.call(this);
            };
            GlyphButton.prototype.AddGlyphs = function (isIcon) {
                var glyphs = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    glyphs[_i - 1] = arguments[_i];
                }
                for (var i = 0; i < glyphs.length; i++)
                    this.AddGlyph(glyphs[i], isIcon(i));
            };
            GlyphButton.prototype.AddGlyph = function (glyph, isIcon) {
                if (typeof glyph == 'number') {
                    var g = new Glyph(glyph, isIcon);
                    _super.prototype.Add.call(this, g);
                    return g;
                }
                return null;
            };
            GlyphButton.prototype.Check = function (child) {
                return child instanceof Glyph;
            };
            Object.defineProperty(GlyphButton.prototype, "CollapsedZone", {
                set: function (target) {
                    var v = this.View;
                    this.applyStyle('navbar-toggle');
                    v.setAttribute('data-toggle', 'collapse');
                    v.setAttribute('data-target', '#' + target.Id);
                    target.applyStyle('collapse');
                },
                enumerable: true,
                configurable: true
            });
            return GlyphButton;
        }(Button));
        UI.GlyphButton = GlyphButton;
        var Dom = /** @class */ (function (_super) {
            __extends(Dom, _super);
            function Dom(tagName, classList) {
                var _this = _super.call(this, typeof tagName == 'string' ? document.createElement(tagName) : tagName) || this;
                if (classList)
                    for (var i = 0; i < classList.length; i++)
                        _this.View.classList.add(classList[i]);
                return _this;
            }
            Dom.prototype.initialize = function () {
            };
            return Dom;
        }(JControl));
        UI.Dom = Dom;
        var Anchore = /** @class */ (function (_super) {
            __extends(Anchore, _super);
            function Anchore(content, href) {
                var _this = _super.call(this, f = document.createElement('a')) || this;
                var f;
                if (href != null && href != '#')
                    f.href = href;
                if (content != null)
                    if (content instanceof JControl)
                        _this.Add(content);
                    else if (content instanceof HTMLElement)
                        f.appendChild(content);
                    else if (typeof content === 'string')
                        f.text = content;
                return _this;
            }
            Anchore.prototype.initialize = function () {
            };
            Anchore.prototype.Add = function (child) {
                this.View.innerHTML = '';
                _super.prototype.Add.call(this, child);
                return this;
            };
            Anchore.prototype.Remove = function (child) { return false; };
            Object.defineProperty(Anchore.prototype, "Text", {
                get: function () {
                    return this.View.text;
                },
                set: function (v) {
                    this.View.text = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Anchore.prototype, "Href", {
                get: function () {
                    return this.View.href;
                },
                set: function (v) {
                    this.View.href = v;
                },
                enumerable: true,
                configurable: true
            });
            return Anchore;
        }(JControl));
        UI.Anchore = Anchore;
        var Label = /** @class */ (function (_super) {
            __extends(Label, _super);
            function Label(text) {
                var _this = _super.call(this, f = document.createElement('label')) || this;
                var f;
                f.textContent = text;
                return _this;
            }
            Label.prototype.initialize = function () { this.applyStyle('mySearch'); };
            Object.defineProperty(Label.prototype, "Text", {
                get: function () {
                    return this.View.textContent;
                },
                set: function (v) {
                    this.View.textContent = v;
                },
                enumerable: true,
                configurable: true
            });
            return Label;
        }(JControl));
        UI.Label = Label;
        var Text = /** @class */ (function (_super) {
            __extends(Text, _super);
            function Text(text) {
                var _this = _super.call(this, f = document.createElement('div')) || this;
                var f;
                f.textContent = text;
                return _this;
            }
            Text.prototype.initialize = function () { };
            Object.defineProperty(Text.prototype, "Text", {
                get: function () {
                    return this.View.textContent;
                },
                set: function (v) {
                    this.View.textContent = v;
                },
                enumerable: true,
                configurable: true
            });
            return Text;
        }(JControl));
        UI.Text = Text;
        var Textbox = /** @class */ (function (_super) {
            __extends(Textbox, _super);
            function Textbox(text) {
                var _this = _super.call(this, f = document.createElement('input')) || this;
                var f;
                f.type = 'search';
                if (text != void 0)
                    f.value = text;
                return _this;
            }
            Textbox.prototype.Focus = function () {
                this.View.focus();
            };
            Textbox.prototype.initialize = function () {
            };
            Textbox.prototype.Add = function (child) { return this; };
            Textbox.prototype.Remove = function (child) { return false; };
            Object.defineProperty(Textbox.prototype, "Text", {
                get: function () {
                    return this.View.value;
                },
                set: function (v) {
                    this.View.value = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Textbox.prototype, "PlaceHolder", {
                get: function () {
                    return this.View.getAttribute('placeholder');
                },
                set: function (v) {
                    this.View.setAttribute('placeholder', v);
                },
                enumerable: true,
                configurable: true
            });
            return Textbox;
        }(JControl));
        UI.Textbox = Textbox;
        var ListType;
        (function (ListType) {
            ListType[ListType["Ordred"] = 0] = "Ordred";
            ListType[ListType["UnOrdred"] = 1] = "UnOrdred";
        })(ListType = UI.ListType || (UI.ListType = {}));
        var List = /** @class */ (function (_super) {
            __extends(List, _super);
            function List(type) {
                var _this = _super.call(this, document.createElement(type === undefined ? 'div' : (type === 0 ? 'ol' : (type === 1 ? 'ul' : 'ul')))) || this;
                _this._si = -1;
                return _this;
            }
            List.prototype.initialize = function () {
                var _this = this;
                this._view.addEventListener('keydown', function (e) {
                    if (e.keyCode === Keys.Down)
                        _this.SelectedIndex++;
                    else if (e.keyCode === Keys.Up)
                        _this.SelectedIndex--;
                });
            };
            List.prototype.Check = function (child) {
                return child instanceof JControl; // || typeof (child) == 'string';
            };
            Object.defineProperty(List.prototype, "HasTemplate", {
                get: function () { return true; },
                enumerable: true,
                configurable: true
            });
            List.prototype.getTemplate = function (child) {
                var l = new Dom('li');
                if (child instanceof JControl) {
                    l.Add(child);
                }
                else if (child instanceof HTMLElement)
                    l.View.appendChild(child);
                else {
                    var a = new Anchore(child, '#');
                    l.Add(a);
                }
                return l;
            };
            List.prototype.AddText = function (item) {
                var t = new Div();
                t.View.textContent = item;
                this.Add(t);
                return t;
            };
            List.prototype.OnChildAdded = function (child) {
                if (this._si == -1)
                    this.SelectedIndex = 0;
            };
            Object.defineProperty(List.prototype, "SelectedIndex", {
                get: function () {
                    return this._si;
                },
                set: function (i) {
                    var ox = this.getChild(this._si);
                    if (ox) {
                        if (ox.Presenter)
                            ox.Presenter.View.classList.remove('active');
                        else if (ox.Parent)
                            ox.Parent.disapplyStyle('active');
                    }
                    var x = this.getChild(i);
                    if (x)
                        if (x.Presenter)
                            x.Presenter.applyStyle('active');
                        else if (x.Parent)
                            x.Parent.applyStyle('active');
                },
                enumerable: true,
                configurable: true
            });
            return List;
        }(Control));
        UI.List = List;
        var DivControl = /** @class */ (function (_super) {
            __extends(DivControl, _super);
            function DivControl(tag) {
                return _super.call(this, typeof tag === 'string' ? document.createElement(tag || 'div') : tag) || this;
            }
            DivControl.prototype.initialize = function () {
                //this.applyStyle('list-group');
            };
            DivControl.prototype.Check = function (child) {
                return child instanceof JControl;
            };
            return DivControl;
        }(Control));
        UI.DivControl = DivControl;
        var Div = /** @class */ (function (_super) {
            __extends(Div, _super);
            function Div() {
                return _super.call(this, document.createElement('div')) || this;
            }
            Div.prototype.initialize = function () {
            };
            Div.prototype.Check = function (item) { return true; };
            return Div;
        }(Control));
        UI.Div = Div;
        var ServiceNavBar = /** @class */ (function (_super) {
            __extends(ServiceNavBar, _super);
            function ServiceNavBar(App, autoInitializePanels) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.App = App;
                _this.autoInitializePanels = autoInitializePanels;
                _this.services = [];
                _this._services = [];
                _this.OnClick = _this.OnClick.bind(_this);
                _this.serviceNotified = _this.serviceNotified.bind(_this);
                return _this;
            }
            ServiceNavBar.prototype.initialize = function () {
                if (this.autoInitializePanels) {
                    this.LeftTabs = this._lefttabs || new Navbar();
                    this.RightTabs = this._righttabs || new Navbar();
                    delete this.autoInitializePanels;
                }
                this.applyStyle('navbar', 'navbar-fixed-bottom', 'appFoot', 'uncolapsed');
            };
            Object.defineProperty(ServiceNavBar.prototype, "LeftTabs", {
                set: function (v) {
                    var _this = this;
                    if (this._lefttabs === v)
                        return;
                    if (this._lefttabs) {
                        _super.prototype.Remove.call(this, this._lefttabs);
                        this._lefttabs.OnSelectedItem.Remove(this);
                    }
                    if (v) {
                        _super.prototype.Add.call(this, v);
                        v.OnSelectedItem.Add(function (s) { if (_this.OnPageSelected)
                            _this.OnPageSelected(s); }, this);
                        v.Float(HorizontalAlignement.Left);
                    }
                    this._lefttabs = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ServiceNavBar.prototype, "RightTabs", {
                set: function (v) {
                    var _this = this;
                    if (this._righttabs === v)
                        return;
                    if (this._righttabs) {
                        _super.prototype.Remove.call(this, this._righttabs);
                        this._righttabs.OnSelectedItem.Remove(this);
                    }
                    if (v) {
                        _super.prototype.Add.call(this, v);
                        v.OnSelectedItem.Add(function (s) { if (_this.OnPageSelected)
                            _this.OnPageSelected(s); }, this);
                        v.Float(HorizontalAlignement.Right);
                    }
                    this._righttabs = v;
                },
                enumerable: true,
                configurable: true
            });
            ServiceNavBar.prototype.createItem = function (page) {
                var x = new MenuItem(page);
                x.OnClick = this.OnClick;
                return x;
            };
            ServiceNavBar.prototype.OnClick = function (page) {
                if (this.OnPageSelected)
                    this.OnPageSelected(page);
            };
            ServiceNavBar.prototype.Add = function (child) {
                throw "Not Allowed";
            };
            ServiceNavBar.prototype.AddRange = function (child) {
                throw "Not Allowed";
            };
            ServiceNavBar.prototype.Remove = function (child) {
                if (child === this._lefttabs)
                    this.LeftTabs = null;
                else if (child === this._righttabs)
                    this.RightTabs = null;
                else
                    throw "Not Allowed";
                return true;
            };
            /////////
            ServiceNavBar.prototype.serviceNotified = function (s, n) {
                if (this.App === App.CurrentApp)
                    if (n === NotifyType.Focuse)
                        this.Push(s);
                    else if (n === NotifyType.UnFocus)
                        this.Pop(s);
            };
            Object.defineProperty(ServiceNavBar.prototype, "currentStack", {
                get: function () { return this.services[this.services.length - 1]; },
                enumerable: true,
                configurable: true
            });
            ServiceNavBar.prototype.CurrentService = function () { var t = this.services[this.services.length - 1]; if (t)
                return t.Current; return null; };
            ServiceNavBar.prototype.PushGBar = function (ser) {
                this.HideCurrentService();
                this.services.push(new BarStack(ser));
                this.ShowCurrentService();
            };
            ServiceNavBar.prototype.PopGBar = function (ser) {
                this.HideCurrentService();
                this.services.pop();
                this.Add(ser.GetLeftBar());
            };
            ServiceNavBar.prototype.ExitBar = function () {
                this.HideCurrentService();
                this.currentStack.Exit();
                this.ShowCurrentService();
            };
            ServiceNavBar.prototype.PushBar = function (ser) {
                this.HideCurrentService();
                this.currentStack.Push(ser);
                this.ShowCurrentService();
            };
            ServiceNavBar.prototype.PopBar = function () {
                this.HideCurrentService();
                this.currentStack.Pop();
                this.ShowCurrentService();
            };
            ServiceNavBar.prototype.HideCurrentService = function () {
                var cs = this.currentStack;
                if (cs) {
                    var l = cs.Current.GetLeftBar();
                    var r = cs.Current.GetRightBar();
                    if (l) {
                        if (l instanceof Navbar)
                            this.LeftTabs = null;
                        else
                            this.Remove(l);
                    }
                    if (r) {
                        if (r instanceof Navbar)
                            this.RightTabs = null;
                        else
                            this.Remove(r);
                    }
                }
            };
            ServiceNavBar.prototype.ShowCurrentService = function () {
                var cs = this.currentStack;
                if (cs) {
                    var l = cs.Current.GetLeftBar();
                    var r = cs.Current.GetRightBar();
                    UI.MenuItem;
                    if (l) {
                        if (l instanceof Navbar)
                            this.LeftTabs = l;
                        else
                            this.Add(l);
                    }
                    if (r) {
                        if (r instanceof Navbar)
                            this.RightTabs = r;
                        else {
                            this.Add(r);
                        }
                    }
                    this.Visible = l != null || r != null;
                }
            };
            ServiceNavBar.prototype.Push = function (s) {
                if (s === this.CurrentService())
                    return;
                this.HideCurrentService();
                var c = this.CurrentService();
                if (c)
                    if (c.ServiceType == ServiceType.Instantany)
                        this.currentStack.Pop();
                if (s.ServiceType == ServiceType.Main)
                    this.services.push(new BarStack(s));
                else {
                    var t = this.currentStack;
                    if (t == null)
                        this.services.push(new BarStack(s));
                    else
                        this.currentStack.Push(s);
                }
                this.ShowCurrentService();
            };
            ServiceNavBar.prototype.Has = function (s) {
                var c = this.services;
                var r;
                var l = c.length;
                for (var i = l - 1; i >= 0; i--) {
                    var x = c[i];
                    if ((r = x.Has(s)) !== 0)
                        return { stack: l - i + (r === -1 ? 0 : -1), serv: r };
                }
                return null;
            };
            ServiceNavBar.prototype.Pop = function (s) {
                this.HideCurrentService();
                if (s) {
                    var t = this.Has(s);
                    if (t) {
                        while (t.stack > 0) {
                            this.services.pop();
                            t.stack--;
                        }
                        var l = this.currentStack;
                        while (t.serv > 0) {
                            l.Pop();
                            t.serv--;
                        }
                    }
                }
                else {
                    var c = this.CurrentService();
                    if (c)
                        if (c.ServiceType === ServiceType.Main)
                            this.services.pop();
                        else
                            this.currentStack.Pop();
                }
                this.ShowCurrentService();
            };
            ServiceNavBar.prototype.Register = function (service) {
                if (service.Handler && !service.Handled()) {
                    service.Handler.addEventListener('pointerenter', function (e) {
                        App.CurrentApp.Foot.Push(service);
                    });
                    service.Handler.addEventListener('pointerout', function (e) {
                        App.CurrentApp.Foot.Pop(service);
                    });
                }
                if (service.Notify)
                    service.Notify.On = this.serviceNotified;
            };
            return ServiceNavBar;
        }(JControl));
        UI.ServiceNavBar = ServiceNavBar;
        var Navbar = /** @class */ (function (_super) {
            __extends(Navbar, _super);
            function Navbar() {
                var _this = _super.call(this) || this;
                _this._items = new Corelib_1.collection.ExList(Object);
                _this.oicd = { Owner: _this, Invoke: _this.ItemsChanged };
                _this.selectable = true;
                _this.OnSelectedItem = new Corelib_1.bind.EventListener(_this);
                return _this;
            }
            Navbar.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.onClick = this.onClick.bind(this);
                this.applyStyle('nav', 'navbar-nav');
                this._items.Listen = this.oicd; //this.ItemsChanged.bind(this);
                this.ItemsChanged(Corelib_1.utils.ListEventArgs.ResetEvent);
            };
            Navbar.prototype.ItemsChanged = function (e) {
                if (this.IsInit === false)
                    return;
                var m = this;
                var _items = this._items;
                switch (e.event) {
                    case Corelib_1.collection.CollectionEvent.Added:
                        m.Add(this.createItem(e.newItem));
                        break;
                    case Corelib_1.collection.CollectionEvent.Cleared:
                        this.CClear(m);
                        break;
                    case Corelib_1.collection.CollectionEvent.Removed:
                        for (var i = 0, l = m.Count; i < l; i++) {
                            var c = m.getChild(i);
                            if (c.Source == e.oldItem) {
                                m.RemoveAt(i + 1, true);
                                break;
                            }
                        }
                        break;
                    case Corelib_1.collection.CollectionEvent.Replace:
                        for (var i = 0, l = m.Count; i < l; i++) {
                            var c = m.getChild(i);
                            if (c.Source == e.oldItem) {
                                m.RemoveAt(i + 1, true);
                                break;
                            }
                        }
                        m.Add(new MenuItem(e.newItem));
                        break;
                    case Corelib_1.collection.CollectionEvent.Reset:
                        this.CClear(m);
                        for (var i = 0, l = _items.Count; i < l; i++) {
                            var c = _items.Get(0);
                            m.Add(new MenuItem(c));
                        }
                        break;
                }
            };
            Navbar.prototype.createItem = function (page) {
                var x = new MenuItem(page);
                x.OnClick = this.onClick;
                return x;
            };
            Object.defineProperty(Navbar.prototype, "SelectedItem", {
                get: function () { return this._selectedItem; },
                enumerable: true,
                configurable: true
            });
            Navbar.prototype.onClick = function (page, sender) {
                if (this._selectedItem != null) {
                    var p = this._selectedItem.Presenter;
                    p.disapplyStyle('active');
                }
                if (sender != null) {
                    var p = sender.Presenter;
                    this._selectedItem = sender;
                    p.applyStyle('active');
                }
                if (!this.selectable)
                    setTimeout(function (nb, si) { return si.Presenter.disapplyStyle('active'); }, 500, this, sender);
                this.OnSelectedItem.Invok(this, function (c) { return c(page); });
            };
            Navbar.prototype.Float = function (v) {
                if (v == HorizontalAlignement.Right) {
                    this.disapplyStyle('pull-left');
                    this.applyStyle('pull-right');
                }
                else if (v == HorizontalAlignement.Left) {
                    this.applyStyle('pull-left');
                    this.disapplyStyle('pull-right');
                }
                else {
                    this.disapplyStyle('pull-left');
                    this.disapplyStyle('pull-right');
                }
            };
            Navbar.prototype.CClear = function (m) {
                for (var i = 2, l = m.Count; i < l; i++)
                    m.RemoveAt(i, true);
            };
            Object.defineProperty(Navbar.prototype, "Items", {
                get: function () {
                    return this._items;
                },
                enumerable: true,
                configurable: true
            });
            return Navbar;
        }(List));
        UI.Navbar = Navbar;
        var NavbarHeader = /** @class */ (function (_super) {
            __extends(NavbarHeader, _super);
            function NavbarHeader() {
                return _super.call(this, document.createElement('div')) || this;
            }
            Object.defineProperty(NavbarHeader.prototype, "Title", {
                get: function () {
                    return this._brand.Text;
                },
                set: function (v) {
                    this._brand.Text = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NavbarHeader.prototype, "Brand", {
                get: function () { return this._brandContainer; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NavbarHeader.prototype, "ToggleButton", {
                get: function () { return this._toggleButton; },
                enumerable: true,
                configurable: true
            });
            NavbarHeader.prototype.initialize = function () {
                var v = this.View;
                //v.style.height = '50px';
                this.applyStyle('navbar-header');
                this._brand = new Anchore('QShop', '#');
                this._brandContainer = new Div();
                this._brandContainer.Add(this._brand);
                this._brandContainer.applyStyle('navbar-brand');
                Corelib_1.bind.NamedScop.Create('GlobalPatent', {});
                var b = this._toggleButton = new GlyphButton();
                this.Add(this._brandContainer);
                this.Add(this._toggleButton);
            };
            Object.defineProperty(NavbarHeader.prototype, "IsFixedTop", {
                set: function (v) {
                    if (v)
                        this.applyStyle('navbar-fixed-top');
                    else
                        this.View.classList.remove('navbar-fixed-top');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NavbarHeader.prototype, "IsHeader", {
                set: function (v) {
                    if (v)
                        this.applyStyle('navbar-header');
                    else
                        this.View.classList.remove('navbar-header');
                },
                enumerable: true,
                configurable: true
            });
            return NavbarHeader;
        }(JControl));
        UI.NavbarHeader = NavbarHeader;
        var MenuItem = /** @class */ (function (_super) {
            __extends(MenuItem, _super);
            function MenuItem(Source) {
                var _this = _super.call(this, Source.Content, Source.Url) || this;
                _this.Source = Source;
                _this.View.addEventListener('click', _this);
                return _this;
            }
            MenuItem.prototype.propChanged = function (p, e) {
                if (e.prop == Page.DPTitle)
                    this.Text = e._new;
                else if (e.prop == Page.DPUrl)
                    this.Href = e._new;
            };
            MenuItem.prototype.handleEvent = function (e) {
                if (this.OnClick)
                    this.OnClick(this.Source, this);
                this.Source.OnItemSelected(this);
            };
            MenuItem.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                this.View.removeEventListener('click', this);
                this.Source = null;
                this.OnClick = null;
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            return MenuItem;
        }(Anchore));
        UI.MenuItem = MenuItem;
        var ContentControl = /** @class */ (function (_super) {
            __extends(ContentControl, _super);
            function ContentControl() {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.View.classList.add('container');
                return _this;
            }
            ContentControl.prototype.initialize = function () { };
            Object.defineProperty(ContentControl.prototype, "Content", {
                get: function () { return this._content; },
                set: function (v) {
                    if (this._content)
                        this.Remove(this._content);
                    this._content = v;
                    this.Add(v);
                },
                enumerable: true,
                configurable: true
            });
            return ContentControl;
        }(JControl));
        UI.ContentControl = ContentControl;
        var ButtonStyle;
        (function (ButtonStyle) {
            ButtonStyle[ButtonStyle["Default"] = 0] = "Default";
            ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
            ButtonStyle[ButtonStyle["success"] = 2] = "success";
            ButtonStyle[ButtonStyle["Info"] = 3] = "Info";
            ButtonStyle[ButtonStyle["Warning"] = 4] = "Warning";
            ButtonStyle[ButtonStyle["Danger"] = 5] = "Danger";
            ButtonStyle[ButtonStyle["Link"] = 6] = "Link";
            ButtonStyle[ButtonStyle["Block"] = 7] = "Block";
        })(ButtonStyle = UI.ButtonStyle || (UI.ButtonStyle = {}));
        var Input = /** @class */ (function (_super) {
            __extends(Input, _super);
            function Input(dom) {
                return _super.call(this, dom || document.createElement('input')) || this;
            }
            Input.prototype.Disable = function (disable) {
                var c = $('input', this._view);
                for (var i = 0; i < c.length; i++) {
                    c[i].disabled = disable;
                }
            };
            Input.prototype.initialize = function () {
                this.applyStyle('input', 'form-control');
            };
            Object.defineProperty(Input.prototype, "Placeholder", {
                set: function (v) { this.View.placeholder = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Input.prototype, "Text", {
                get: function () { return this.View.value; },
                set: function (v) { this.View.value = v; },
                enumerable: true,
                configurable: true
            });
            return Input;
        }(JControl));
        UI.Input = Input;
        var SearchActionMode;
        (function (SearchActionMode) {
            SearchActionMode[SearchActionMode["None"] = 0] = "None";
            SearchActionMode[SearchActionMode["Validated"] = 1] = "Validated";
            SearchActionMode[SearchActionMode["Instantany"] = 2] = "Instantany";
            SearchActionMode[SearchActionMode["NoSearch"] = 3] = "NoSearch";
        })(SearchActionMode = UI.SearchActionMode || (UI.SearchActionMode = {}));
        var ActionText = /** @class */ (function (_super) {
            __extends(ActionText, _super);
            function ActionText(input) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.OnAction = new Corelib_1.bind.EventListener(_this.Id);
                _this.ia = 0;
                _this.tout = -1;
                _this.job = Corelib_1.thread.Dispatcher.cretaeJob(_this.txtChanged, [null], _this, true);
                _this.ls = "";
                _this.txtInput = new Input(input);
                return _this;
            }
            Object.defineProperty(ActionText.prototype, "Box", {
                get: function () { return this.txtInput; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActionText.prototype, "Icon", {
                get: function () { return this.btn_ok; },
                enumerable: true,
                configurable: true
            });
            ActionText.prototype.initialize = function () {
                this.applyStyle('csTB', 'input-group');
                var btn = new Button().applyStyle('form-control', 'glyphicon', 'glyphicon-search');
                btn.Style = ButtonStyle.Primary;
                btn.Text = '';
                var sp = new Dom('span');
                sp.applyStyle('input-group-btn');
                var inp = this.txtInput;
                inp.ToolTip = 'Entrer you email';
                inp.Placeholder = 'Entrer you email';
                this.Add(inp);
                this.Add(sp);
                sp.Add(btn);
                this.btn_ok = btn;
                this.txtInput = inp;
                this.btnClicked = this.btnClicked.bind(this);
                //this.txtChanged = this.txtChanged.bind(this);
                btn.View.addEventListener('click', this.btnClicked);
            };
            Object.defineProperty(ActionText.prototype, "AutoAction", {
                get: function () {
                    return this.ia;
                },
                set: function (v) {
                    if (v == this.ia)
                        return;
                    switch (v) {
                        case 3:
                        case 0:
                            this.txtInput.View.removeEventListener('change', this);
                            this.txtInput.View.removeEventListener('keyup', this);
                            break;
                        case 1:
                            this.txtInput.View.addEventListener('change', this);
                            this.txtInput.View.removeEventListener('keyup', this);
                            break;
                        case 2:
                            this.txtInput.View.removeEventListener('change', this);
                            this.txtInput.View.addEventListener('keyup', this);
                            break;
                    }
                    var x = this.txtInput.View[v ? 'addEventListener' : 'removeEventListener']('change', this);
                    this.ia = v;
                },
                enumerable: true,
                configurable: true
            });
            ActionText.prototype.btnClicked = function (ev) {
                var n = this.txtInput.Text;
                var o = this.ls;
                this.ls = n;
                var t = this;
                this.OnAction.Invok(this.Id, function (e) { e(t, o, n); });
            };
            ActionText.prototype.txtChanged = function (ev) {
                var n = this.txtInput.Text;
                var o = this.ls;
                if (n == o)
                    return;
                this.ls = n;
                var t = this;
                this.OnAction.Invok(this.Id, function (e) { e(t, o, n); });
            };
            ActionText.prototype.handleEvent = function (e) {
                var _this = this;
                switch (e.type) {
                    case 'click':
                        this.txtChanged(e);
                        break;
                    case 'change':
                        if (e.srcElement === this.txtInput.View)
                            return this.txtChanged(e);
                        break;
                    case 'keyup':
                        if (e.srcElement === this.txtInput.View) {
                            if (this.isExecuting)
                                return;
                            this.isExecuting = true;
                            //clearTimeout(this.tout);
                            this.tout = setTimeout(function (t, x) { _this.isExecuting = false; t.txtChanged(e); }, 500, this, e);
                            return;
                            //return this.txtChanged(e);
                        }
                    default:
                        _super.prototype.handleEvent.call(this, e);
                }
            };
            Object.defineProperty(ActionText.prototype, "Text", {
                get: function () { return this.txtInput.View.value; },
                set: function (v) { this.txtInput.View.value = v; },
                enumerable: true,
                configurable: true
            });
            ActionText.prototype.Focus = function () {
                this.Box.View.focus();
            };
            return ActionText;
        }(JControl));
        UI.ActionText = ActionText;
        var CItem = /** @class */ (function () {
            function CItem(Tag, Content, Url, onselect) {
                this.Tag = Tag;
                this.Content = Content;
                this.Url = Url;
                this.onselect = onselect;
                this.Content = new Anchore(Content);
            }
            CItem.prototype.OnPropertyChanged = function (e, m) {
            };
            CItem.prototype.OnItemSelected = function (menuItem) {
                if (this.onselect)
                    this.onselect.Invoke.call(this.onselect.Owner, menuItem);
            };
            return CItem;
        }());
        UI.CItem = CItem;
        var QBar = /** @class */ (function (_super) {
            __extends(QBar, _super);
            function QBar(top) {
                var _this = _super.call(this, document.createElement('ul')) || this;
                _this.top = top;
                _this.OnClick = _this.OnClick.bind(_this);
                return _this;
            }
            Object.defineProperty(QBar.prototype, "LeftTabs", {
                set: function (v) {
                    var _this = this;
                    if (this._lefttabs) {
                        this._colapsedZone.Remove(this._lefttabs, false);
                        this._lefttabs.OnSelectedItem.Remove(this);
                    }
                    if (v) {
                        this._colapsedZone.Add(v);
                        v.OnSelectedItem.Add(function (s) { if (_this.OnPageSelected)
                            _this.OnPageSelected(s); }, this);
                    }
                    this._lefttabs = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QBar.prototype, "RightTabs", {
                set: function (v) {
                    var _this = this;
                    if (this._righttabs) {
                        this._colapsedZone.Remove(this._righttabs, false);
                        this._righttabs.OnSelectedItem.Remove(this);
                    }
                    if (v) {
                        this._colapsedZone.Add(v);
                        v.OnSelectedItem.Add(function (s) { if (_this.OnPageSelected)
                            _this.OnPageSelected(s); }, this);
                        v.Float(HorizontalAlignement.Right);
                    }
                    this._righttabs = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QBar.prototype, "Header", {
                get: function () { return this._header; },
                enumerable: true,
                configurable: true
            });
            QBar.prototype.createItem = function (page) {
                var x = new MenuItem(page);
                x.OnClick = this.OnClick;
                return x;
            };
            QBar.prototype.initialize = function () {
                var _this = this;
                this.bi = true;
                this.applyStyle('navbar', /*'navbar-inverse',*/ this.top ? 'navbar-fixed-top' : 'navbar-fixed-bottom');
                this._header = new NavbarHeader();
                this._container = new Div();
                this._colapsedZone = new Dom('div').applyStyle('collapse', 'navbar-collapse');
                this.Add(this._container.AddRange([this._header, this._colapsedZone]));
                this.bi = false;
                this._header.OnInitialized = function (x) { return x.ToggleButton.CollapsedZone = _this._colapsedZone; };
                this._header.ToggleButton.addEventListener('click', function (h, e, p) { return p.Open(); }, this);
            };
            QBar.prototype.Open = function (on) {
                var v = this._colapsedZone.View.classList;
                v[(on == undefined ? v.contains('in') : !on) ? 'remove' : 'add']('in');
            };
            QBar.prototype.OnClick = function (page) {
                if (this.OnPageSelected)
                    this.OnPageSelected(page);
            };
            QBar.prototype.Add = function (child) {
                if (this.bi)
                    _super.prototype.Add.call(this, child);
                else
                    this._colapsedZone.Add(child);
                return this;
            };
            QBar.prototype.Remove = function (child) {
                return this._colapsedZone.Remove(child);
            };
            return QBar;
        }(JControl));
        UI.QBar = QBar;
        var Head = /** @class */ (function (_super) {
            __extends(Head, _super);
            function Head(top) {
                var _this = _super.call(this, document.createElement('ul')) || this;
                _this.top = top;
                _this.OnClick = _this.OnClick.bind(_this);
                return _this;
            }
            Object.defineProperty(Head.prototype, "Menu", {
                get: function () { return this._tabs; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Head.prototype, "SubsMenu", {
                get: function () { return this._tabs; },
                enumerable: true,
                configurable: true
            });
            //private _searchBox:  AutoCompleteBox;
            Head.__fields__ = function () {
                return [Head.DPPatent];
            };
            Object.defineProperty(Head.prototype, "Patent", {
                get: function () { return this.get(Head.DPPatent); },
                set: function (v) { this.set(Head.DPPatent, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Head.prototype, "Header", {
                get: function () {
                    return this._header;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Head.prototype, "Container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            Head.prototype.createItem = function (page) {
                var x = new MenuItem(page);
                x.OnClick = this.OnClick;
                return x;
            };
            Head.prototype.Clear = function () {
                this._tabs.Clear();
                this._stabs.Clear();
            };
            Head.prototype.CClear = function (m) {
                for (var i = 2, l = m.Count; i < l; i++)
                    m.RemoveAt(i, true);
            };
            Head.prototype.initialize = function () {
                var _this = this;
                this.applyStyle('navbar', /*'navbar-inverse',*/ this.top ? 'navbar-fixed-top' : 'navbar-fixed-bottom');
                this._header = new NavbarHeader();
                this._container = new Div();
                this._colapsedZone = new Dom('div').applyStyle('collapse', 'navbar-collapse');
                this._tabs = new Navbar();
                this._stabs = new Navbar();
                this._stabs.Float(HorizontalAlignement.Right);
                this._stabs.OnSelectedItem.Add(function (s) { return _this.OnPageSelected(s); }, this);
                this._tabs.OnSelectedItem.Add(function (s) { return _this.OnPageSelected(s); }, this);
                //this._searchBox = new  AutoCompleteBox();
                this.Add(this._container.AddRange([this._header, this._colapsedZone.AddRange([this._tabs /*, this._stabs.Add(new Anchore().Add(this._searchBox))*/])]));
                this._header.OnInitialized = function (x) { return x.ToggleButton.CollapsedZone = _this._colapsedZone; };
                //this._searchBox.OnInitialized = (l) => {
                //    l.OnAction.Add(this.searchActioned.bind(this), 'ts');
                //    l.AutoAction = UI.SearchActionMode.Validated;
                //}
                this._header.ToggleButton.addEventListener('click', function (h, e, p) {
                    var v = p._colapsedZone.View.classList;
                    v[v.contains('in') ? 'remove' : 'add']('in');
                }, this);
            };
            Head.prototype.searchActioned = function (s, o, n) {
                this.Patent = n;
            };
            Head.prototype.OnClick = function (page) {
                if (this.OnPageSelected)
                    this.OnPageSelected(page);
            };
            Head.DPPatent = Corelib_1.bind.DObject.CreateField('Patent', String, undefined /*, (e) => { e.__this._searchBox.Text = e._new; }*/);
            return Head;
        }(JControl));
        UI.Head = Head;
        var Foot = /** @class */ (function (_super) {
            __extends(Foot, _super);
            function Foot() {
                return _super.call(this, document.createElement('div')) || this;
            }
            Foot.prototype.initialize = function () {
                this.applyStyle('navbar', 'navbar-fixed-bottom');
                this.View.style.width = '100%';
            };
            Foot.prototype.Check = function (c) { return c instanceof JControl; };
            return Foot;
        }(JControl));
        UI.Foot = Foot;
        var Keys;
        (function (Keys) {
            Keys[Keys["Enter"] = 13] = "Enter";
            Keys[Keys["Tab"] = 9] = "Tab";
            Keys[Keys["Esc"] = 27] = "Esc";
            Keys[Keys["Escape"] = 27] = "Escape";
            Keys[Keys["Up"] = 38] = "Up";
            Keys[Keys["Down"] = 40] = "Down";
            Keys[Keys["Left"] = 37] = "Left";
            Keys[Keys["Right"] = 39] = "Right";
            Keys[Keys["PgDown"] = 34] = "PgDown";
            Keys[Keys["PageDown"] = 34] = "PageDown";
            Keys[Keys["PgUp"] = 33] = "PgUp";
            Keys[Keys["PageUp"] = 33] = "PageUp";
            Keys[Keys["End"] = 35] = "End";
            Keys[Keys["Home"] = 36] = "Home";
            Keys[Keys["Insert"] = 45] = "Insert";
            Keys[Keys["Delete"] = 46] = "Delete";
            Keys[Keys["Backspace"] = 8] = "Backspace";
            Keys[Keys["Space"] = 32] = "Space";
            Keys[Keys["Meta"] = 91] = "Meta";
            Keys[Keys["Win"] = 91] = "Win";
            Keys[Keys["Mac"] = 91] = "Mac";
            Keys[Keys["Multiply"] = 106] = "Multiply";
            Keys[Keys["Add"] = 107] = "Add";
            Keys[Keys["Subtract"] = 109] = "Subtract";
            Keys[Keys["Decimal"] = 110] = "Decimal";
            Keys[Keys["Divide"] = 111] = "Divide";
            Keys[Keys["Scrollock"] = 145] = "Scrollock";
            Keys[Keys["Pausebreak"] = 19] = "Pausebreak";
            Keys[Keys["Numlock"] = 144] = "Numlock";
            Keys[Keys["5numlocked"] = 12] = "5numlocked";
            Keys[Keys["Shift"] = 16] = "Shift";
            Keys[Keys["Capslock"] = 20] = "Capslock";
            Keys[Keys["F1"] = 112] = "F1";
            Keys[Keys["F2"] = 113] = "F2";
            Keys[Keys["F3"] = 114] = "F3";
            Keys[Keys["F4"] = 115] = "F4";
            Keys[Keys["F5"] = 116] = "F5";
            Keys[Keys["F6"] = 117] = "F6";
            Keys[Keys["F7"] = 118] = "F7";
            Keys[Keys["F8"] = 119] = "F8";
            Keys[Keys["F9"] = 120] = "F9";
            Keys[Keys["F10"] = 121] = "F10";
            Keys[Keys["F11"] = 122] = "F11";
            Keys[Keys["F12"] = 123] = "F12";
            Keys[Keys["AltLeft"] = 18] = "AltLeft";
            Keys[Keys["AltRight"] = 18] = "AltRight";
            Keys[Keys["ShiftLeft"] = 18] = "ShiftLeft";
            Keys[Keys["ShiftRight"] = 18] = "ShiftRight";
            Keys[Keys["ControlLeft"] = 17] = "ControlLeft";
            Keys[Keys["ControlRight"] = 17] = "ControlRight";
            Keys[Keys["MetaLeft"] = 91] = "MetaLeft";
            Keys[Keys["MetaRight"] = 91] = "MetaRight";
        })(Keys = UI.Keys || (UI.Keys = {}));
        var Controlkeys;
        (function (Controlkeys) {
            Controlkeys[Controlkeys["Alt"] = 18] = "Alt";
            Controlkeys[Controlkeys["Shift"] = 16] = "Shift";
            Controlkeys[Controlkeys["Control"] = 17] = "Control";
            Controlkeys[Controlkeys["Meta"] = 91] = "Meta";
        })(Controlkeys = UI.Controlkeys || (UI.Controlkeys = {}));
        var HotKey = /** @class */ (function () {
            function HotKey() {
            }
            Object.defineProperty(HotKey.prototype, "Key", {
                get: function () { return this._key; },
                set: function (v) { if (Keys[v] === undefined)
                    throw "controls key is uncorrect"; this._key = v; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HotKey.prototype, "Control", {
                get: function () { return this.__ctrl; },
                set: function (v) { if (Controlkeys[v] === undefined)
                    throw "controls key is uncorrect"; this.__ctrl = v; },
                enumerable: true,
                configurable: true
            });
            ;
            ;
            HotKey.prototype.IsPressed = function (e) {
                return this.checkKey(e) && this.checkControl(e);
            };
            HotKey.prototype.checkKey = function (e) {
                var l = this.Key;
                if (l == null)
                    return true;
                return e.keyCode == l;
            };
            HotKey.prototype.checkControl = function (e) {
                switch (this.Control) {
                    case 18:
                        return e.altKey;
                    case 16:
                        return e.shiftKey;
                    case 17:
                        return e.ctrlKey;
                    case 91:
                        return e.metaKey;
                }
                return true;
            };
            return HotKey;
        }());
        UI.HotKey = HotKey;
        var Page = /** @class */ (function (_super) {
            __extends(Page, _super);
            function Page(app, title, Name) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.app = app;
                _this.Name = Name;
                _this._fl = true;
                _this.ServiceType = ServiceType.Main;
                _this.Notify = new Corelib_1.bind.EventListener(_this);
                _this._onSelected = new Corelib_1.bind.EventListener(_this, false);
                _this.Content = title;
                return _this;
            }
            Page.prototype.Callback = function (args) {
            };
            Object.defineProperty(Page.prototype, "FloatLeft", {
                get: function () { return this._fl; },
                set: function (v) { this._fl = v; },
                enumerable: true,
                configurable: true
            });
            Page.prototype.getDPTitle = function () { return Page.DPTitle; };
            Page.prototype.getDPUrl = function () { return Page.DPUrl; };
            Object.defineProperty(Page.prototype, "Content", {
                get: function () { return this.get(Page.DPTitle); },
                set: function (v) { this.set(Page.DPTitle, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Page.prototype, "Url", {
                get: function () { return this.get(Page.DPUrl); },
                set: function (v) { this.set(Page.DPUrl, v); },
                enumerable: true,
                configurable: true
            });
            Page.__fields__ = function () { return [Page.DPTitle, Page.DPUrl]; };
            Page.prototype.getSuggessions = function () { return Empty; };
            Page.prototype.OnSearche = function (oldPatent, newPatent) {
            };
            Page.prototype.initialize = function () {
            };
            Page.prototype.Update = function () {
            };
            Object.defineProperty(Page.prototype, "intern", {
                get: function () { return !false; },
                enumerable: true,
                configurable: true
            });
            ;
            Page.prototype.Check = function (c) {
                return this.intern && c instanceof JControl;
            };
            Page.prototype.Dispose = function () {
                this.Parent.Remove(this);
                Corelib_1.bind.DObject.prototype.Dispose.call(this);
            };
            Page.prototype.GetLeftBar = function () {
                return null;
            };
            Page.prototype.GetRightBar = function () { return null; };
            Page.prototype.OnItemSelected = function (menuItem) {
                var _this = this;
                this.OnSelected.Invok(this, function (p) { return p(_this); });
            };
            Object.defineProperty(Page.prototype, "OnSelected", {
                get: function () { return this._onSelected; },
                enumerable: true,
                configurable: true
            });
            Page.prototype.Handled = function () {
                return true;
            };
            Page.prototype.OnKeyDown = function (e) {
            };
            Page.prototype.OnPrint = function () {
            };
            Page.prototype.OnDeepSearche = function () {
            };
            Page.DPTitle = Page.CreateField('Title', Object, 'Page', function (e) {
                var t = e.__this;
            });
            Page.DPUrl = Page.CreateField('Url', String, '#');
            return Page;
        }(Control));
        UI.Page = Page;
        var BarStack = /** @class */ (function () {
            function BarStack(current) {
                this.others = [];
                this._current = current;
            }
            Object.defineProperty(BarStack.prototype, "Current", {
                get: function () {
                    if (this.others.length == 0)
                        return this._current;
                    return this.others[this.others.length - 1];
                },
                enumerable: true,
                configurable: true
            });
            BarStack.prototype.Push = function (s) {
                this.others.push(s);
            };
            BarStack.prototype.Pop = function () {
                return this.others.pop();
            };
            BarStack.prototype.Has = function (s) {
                var c = this.others, l = c.length;
                if (this._current == s)
                    return -1;
                for (var i = l - 1; i >= 0; i--) {
                    var x = c[i];
                    if (x == s)
                        return l - i;
                }
                return 0;
            };
            BarStack.prototype.Exit = function () { this.others.length = 0; };
            return BarStack;
        }());
        UI.BarStack = BarStack;
        var HorizontalAlignement;
        (function (HorizontalAlignement) {
            HorizontalAlignement[HorizontalAlignement["Left"] = 0] = "Left";
            HorizontalAlignement[HorizontalAlignement["Center"] = 1] = "Center";
            HorizontalAlignement[HorizontalAlignement["Right"] = 2] = "Right";
        })(HorizontalAlignement = UI.HorizontalAlignement || (UI.HorizontalAlignement = {}));
        var VerticalAlignement;
        (function (VerticalAlignement) {
            VerticalAlignement[VerticalAlignement["Top"] = 0] = "Top";
            VerticalAlignement[VerticalAlignement["Center"] = 1] = "Center";
            VerticalAlignement[VerticalAlignement["Bottom"] = 2] = "Bottom";
        })(VerticalAlignement = UI.VerticalAlignement || (UI.VerticalAlignement = {}));
        var Point = /** @class */ (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        }());
        UI.Point = Point;
        var ms = ['px', '%', 'in', 'em'];
        var MetricType;
        (function (MetricType) {
            MetricType[MetricType["Pixel"] = 0] = "Pixel";
            MetricType[MetricType["Percentage"] = 1] = "Percentage";
            MetricType[MetricType["Inch"] = 2] = "Inch";
            MetricType[MetricType["Em"] = 3] = "Em";
        })(MetricType = UI.MetricType || (UI.MetricType = {}));
        var Metric = /** @class */ (function () {
            function Metric(value, type) {
                if (typeof value === 'string') {
                    this.fromString(value);
                }
                else {
                    this.Value = value;
                    this.Type = type;
                }
            }
            Metric.prototype.minus = function (v) {
                if (this.Type == MetricType.Pixel)
                    return new Metric(this.Value - v, MetricType.Pixel);
                if (this.Type == MetricType.Percentage)
                    return new Metric(this.Value - v, MetricType.Percentage);
                if (this.Type == MetricType.Em)
                    return new Metric(this.Value - v, MetricType.Em);
                if (this.Type == MetricType.Inch)
                    return new Metric(this.Value - v, MetricType.Inch);
            };
            Metric.prototype.toString = function () { return this.Value + ms[this.Type || 0]; };
            Metric.prototype.fromString = function (s) {
                for (var i = 0; i < ms.length; i++)
                    if (s.endsWith(ms[i])) {
                        this.Value = parseFloat(s);
                        this.Type = i;
                        return;
                    }
            };
            return Metric;
        }());
        UI.Metric = Metric;
        var Error = /** @class */ (function (_super) {
            __extends(Error, _super);
            function Error() {
                return _super.call(this, document.createElement('div')) || this;
            }
            Object.defineProperty(Error.prototype, "Message", {
                get: function () { return this._text; },
                set: function (v) {
                    this._text = v;
                    if (this.container)
                        this.container.textContent = v;
                },
                enumerable: true,
                configurable: true
            });
            Error.prototype.initialize = function () {
                this.applyStyle(this.IsInfo ? 'webix_info' : 'webix_error');
                this.container = document.createElement('div');
                this.container.innerHTML = this._text;
                this._view.appendChild(this.container);
                this._view.addEventListener('mousedown', this);
            };
            Error.prototype.handleEvent = function (e) {
                if (e.type == 'mousedown') {
                    this._view.removeEventListener('mousedown', this);
                    this.Pop();
                }
                else
                    _super.prototype.handleEvent.call(this, e);
            };
            Error.prototype.Push = function () {
                InfoArea.Default.Add(this);
                this.timeout = setTimeout(function (t) { t.Pop(); }, this.Expire || 3000, this);
            };
            Error.prototype.Pop = function () {
                this.applyStyle('ihidden');
                var x = {};
                clearTimeout(this.timeout);
                x.id = setTimeout(function (t, x) { clearTimeout(x.id); InfoArea.Default.Remove(t); t.Dispose(); }, 2000, this, x);
            };
            Error.prototype.Dispose = function () {
                this.container = null;
                this._text = null;
                _super.prototype.Dispose.call(this);
            };
            return Error;
        }(JControl));
        UI.Error = Error;
        var ia;
        var InfoArea = /** @class */ (function (_super) {
            __extends(InfoArea, _super);
            function InfoArea() {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.initialize();
                return _this;
            }
            Object.defineProperty(InfoArea, "Default", {
                get: function () {
                    if (!ia) {
                        ia = new InfoArea();
                        ia.Parent = Desktop.Current;
                    }
                    return ia;
                },
                enumerable: true,
                configurable: true
            });
            InfoArea.prototype.initialize = function () {
                this.applyStyle('webix_message_area');
                document.body.appendChild(this._view);
            };
            InfoArea.prototype.Check = function (j) {
                return j instanceof Error;
            };
            InfoArea.push = function (msg, isInfo, expire) {
                var t = new Error();
                t.Message = msg;
                t.IsInfo = isInfo;
                t.Expire = expire;
                t.Push();
            };
            return InfoArea;
        }(Control));
        UI.InfoArea = InfoArea;
        var Size = /** @class */ (function () {
            function Size(w, h) {
                if (typeof w === 'number' || typeof w === 'string')
                    this.w = new Metric(w, 0);
                else
                    this.w = w;
                if (typeof h === 'number' || typeof h === 'string')
                    this.h = new Metric(h, 0);
                else
                    this.h = h;
            }
            return Size;
        }());
        UI.Size = Size;
        var Badge = /** @class */ (function (_super) {
            __extends(Badge, _super);
            function Badge() {
                return _super.call(this, document.createElement('span')) || this;
            }
            Badge.prototype.initialize = function () {
                this.applyStyle('badge');
            };
            Object.defineProperty(Badge.prototype, "Content", {
                set: function (v) {
                    this.Clear();
                    if (v instanceof HTMLElement)
                        this.Add(new DivControl(v));
                    else
                        this.View.innerText = v.toString();
                },
                enumerable: true,
                configurable: true
            });
            return Badge;
        }(JControl));
        UI.Badge = Badge;
        var DragManager = /** @class */ (function () {
            function DragManager(handler, target) {
                this.handler = handler;
                this.target = target;
                this.loc = new Point(0, 0);
                this.mouseloc = { x: undefined, y: undefined };
                this.cntloc = { x: this.loc.x, y: this.loc.y };
                this.RelocationJob = Corelib_1.thread.Dispatcher.cretaeJob(this.reLocation, [], this, true);
                handler.View.addEventListener('dragstart', this);
                this.handler.View.draggable = true;
                this.View = target.View;
            }
            DragManager.prototype.handleEvent = function (e) {
                if (e.type == 'dragstart') {
                    this.mouseloc = { x: e.x, y: e.y };
                    this.cntloc = { x: this.target.View.offsetLeft, y: this.target.View.offsetTop };
                    this.handler.View.addEventListener('dragend', this);
                }
                else if (e.type == 'dragend') {
                    var c = this.cntloc;
                    var m = this.mouseloc;
                    this.Location = { x: c.x + (e.x - m.x), y: Math.max(0, c.y + (e.y - m.y)) };
                    this.handler.View.removeEventListener('dragend', this);
                }
                if (e.type === 'resize')
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
            };
            Object.defineProperty(DragManager.prototype, "Location", {
                set: function (l) {
                    this.loc = l;
                    this.RelocationJob[0] = true;
                    this.RelocationJob[1] = true;
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
                },
                enumerable: true,
                configurable: true
            });
            DragManager.prototype.reLocation = function (hr, vr) {
                var v = this.View;
                var s = v.style;
                var l = this.loc;
                var w = window;
                if (hr) {
                    s.left = l.x + px;
                }
                if (vr) {
                    s.top = l.y + px;
                }
            };
            return DragManager;
        }());
        UI.DragManager = DragManager;
        var FixedPanel = /** @class */ (function (_super) {
            __extends(FixedPanel, _super);
            function FixedPanel(view) {
                var _this = _super.call(this, view || document.createElement('div')) || this;
                _this.loc = new Point(0, 0);
                _this.size = new Size(window.screen.availWidth / 2, window.screen.availHeight / 2);
                _this.mouseloc = { x: undefined, y: undefined };
                _this.cntloc = { x: _this.loc.x, y: _this.loc.y };
                _this.RelocationJob = Corelib_1.thread.Dispatcher.cretaeJob(_this.reLocation, [], _this, true);
                return _this;
            }
            FixedPanel.prototype.initialize = function () {
                var _this = this;
                window.addEventListener('resize', this);
                this.body = new Dom('div');
                var v = this.View.style;
                //v.zIndex = "2000";
                v.display = 'block';
                v.background = 'radial-gradient( #222,black)';
                v.position = 'fixed';
                v.border = '2px gray solid';
                this.HorizontalAlignement = HorizontalAlignement.Center;
                this.VerticalAlignement = VerticalAlignement.Center;
                this.Location = { x: 200, y: 200 };
                this.Size = new Size(new Metric(90, MetricType.Percentage), new Metric(90, MetricType.Percentage));
                this.body.OnInitialized = function (b) {
                    var tt = _this.Height;
                    _this.Height = new Metric(89, MetricType.Percentage);
                };
                this.body.View.style.marginTop = '50px';
                this.body.View.style.overflow = 'auto';
                _super.prototype.Add.call(this, this.body);
            };
            FixedPanel.prototype.Check = function (i) {
                return i instanceof JControl;
            };
            FixedPanel.prototype.handleEvent = function (e) {
                if (e.type == 'dragstart') {
                    this.mouseloc = { x: e.x, y: e.y };
                    this.cntloc = { x: this.View.offsetLeft, y: this.View.offsetTop };
                    window.document.styleSheets.item(0);
                }
                else if (e.type == 'dragend') {
                    var c = this.cntloc;
                    var m = this.mouseloc;
                    this.Location = { x: c.x + (e.x - m.x), y: c.y + (e.y - m.y) };
                }
                if (e.type === 'resize')
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
            };
            Object.defineProperty(FixedPanel.prototype, "Height", {
                set: function (v) {
                    var h = v.toString();
                    this.View.style.maxHeight = h;
                    this.View.style.minHeight = h;
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(undefined, true));
                    Corelib_1.thread.Dispatcher.Push(FixedPanel.resizeBody, [this]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FixedPanel.prototype, "Width", {
                set: function (v) {
                    var w = v.toString();
                    this.View.style.maxWidth = w;
                    this.View.style.minWidth = w;
                    this.body.View.style.width = v.minus(5).toString();
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(true, undefined));
                    Corelib_1.thread.Dispatcher.Push(FixedPanel.resizeBody, [this]);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FixedPanel.prototype, "HorizontalAlignement", {
                set: function (ha) {
                    this.ha = ha || 0;
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(true, undefined));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FixedPanel.prototype, "VerticalAlignement", {
                set: function (va) {
                    this.va = va || 0;
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(undefined, true));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FixedPanel.prototype, "Location", {
                set: function (l) {
                    this.loc = l;
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FixedPanel.prototype, "Size", {
                set: function (s) {
                    this.size = s;
                    this.Width = s.w;
                    this.Height = s.h;
                    Corelib_1.thread.Dispatcher.Push(this.RelocationJob.Set(true, true));
                    Corelib_1.thread.Dispatcher.Push(FixedPanel.resizeBody, [this]);
                },
                enumerable: true,
                configurable: true
            });
            FixedPanel.prototype.reLocation = function (hr, vr) {
                var v = this.View;
                var s = v.style;
                var l = this.loc;
                var w = window;
                var px = 'px';
                if (hr) {
                    switch (this.ha) {
                        case HorizontalAlignement.Left:
                            s.left = l.x + px;
                            break;
                        case HorizontalAlignement.Center:
                            s.left = (w.innerWidth - this.View.clientWidth) / 2 + px;
                            break;
                        case HorizontalAlignement.Right:
                            s.left = (w.innerWidth - this.View.clientWidth - l.x) + px;
                            break;
                    }
                }
                if (vr) {
                    switch (this.va) {
                        case VerticalAlignement.Top:
                            s.top = l.y + px;
                            break;
                        case VerticalAlignement.Center:
                            s.top = (w.innerHeight - this.View.clientHeight) / 2 + px;
                            break;
                        case VerticalAlignement.Bottom:
                            s.top = (w.innerHeight - this.View.clientHeight - l.y) + px;
                            break;
                    }
                }
            };
            FixedPanel.prototype.Add = function (child) {
                this.body.Add(child);
                return this;
            };
            FixedPanel.prototype.AddRange = function (childs) {
                for (var i = 0, l = childs.length; i < l; i++)
                    this.body.Add(childs[i]);
                return this;
            };
            FixedPanel.resizeBody = Corelib_1.thread.Dispatcher.cretaeJob(function (t) {
                t.body.View.style.height = t.View.clientHeight + 'px';
                t.body.View.style.width = t.View.clientWidth + 'px';
            }, [], null, false);
            return FixedPanel;
        }(JControl));
        UI.FixedPanel = FixedPanel;
        var intern = false;
        var _app = null;
        var Empty = new Corelib_1.collection.List(String);
        Empty.Freeze();
        var IApp = /** @class */ (function (_super) {
            __extends(IApp, _super);
            function IApp(view) {
                var _this = _super.call(this, view) || this;
                _this.Pages = new Corelib_1.collection.List(Page);
                _this.OnPageSelected = new Corelib_1.bind.EventListener('');
                _this.opcd = { Owner: _this, Invoke: _this.PagesChanged };
                _this.PagesChanged = _this.PagesChanged.bind(_this);
                return _this;
            }
            IApp.prototype.Logout = function () {
            };
            /*Called From Head*/
            IApp.prototype.silentSelectPage = function (page) {
                var oldpage = this.cpage;
                this.Foot.Pop(this.cpage);
                this.cpage = page;
                this.showPage(page);
                this.Foot.Push(page);
                this.OnPageChanged(oldpage, page);
            };
            IApp.prototype.PageSelected = function (page) {
                this.silentSelectPage(page);
                page.OnSelected.Invoke(page, [page]);
            };
            IApp.prototype.Open = function (page) {
                this.PageSelected(page);
            };
            IApp.prototype.PagesChanged = function (e) {
                if (e.event == Corelib_1.collection.CollectionEvent.Added) {
                    this.Foot.Register(e.newItem);
                }
            };
            IApp.prototype.OpenPage = function (pageNme) {
                for (var i = 0, l = this.Pages.Count; i < l; i++) {
                    var p = this.Pages.Get(i);
                    if (p.Name !== pageNme)
                        continue;
                    this.SelectedPage = p;
                    return true;
                }
                return false;
            };
            IApp.prototype.AddPage = function (child) {
                this.Pages.Add(child);
            };
            Object.defineProperty(IApp.prototype, "SelectedPage", {
                get: function () {
                    return this.cpage;
                },
                set: function (p) {
                    if (p)
                        this.PageSelected(p);
                },
                enumerable: true,
                configurable: true
            });
            IApp.prototype.SelectNaxtPage = function () {
                var t = this.Pages;
                var i = t.IndexOf(this.cpage);
                var p = t.Get(i + 1);
                if (p)
                    this.PageSelected(p);
            };
            IApp.prototype.SelectPrevPage = function () {
                var t = this.Pages;
                var i = t.IndexOf(this.cpage);
                var p = t.Get(i - 1);
                if (p)
                    this.PageSelected(p);
            };
            IApp.prototype.Update = function () { };
            IApp.prototype.OnKeyDown = function (e) {
                var s = this.SelectedPage;
                if (s)
                    s.OnKeyDown(e);
            };
            IApp.prototype.OnPrint = function () {
                var s = this.SelectedPage;
                if (s)
                    s.OnPrint();
            };
            IApp.prototype.OnDeepSearche = function () {
                var s = this.SelectedPage;
                if (s)
                    s.OnDeepSearche();
            };
            IApp.prototype.OnContextMenu = function (e) {
                if (this.cpage && this.cpage.ContextMenu) {
                    this.cpage.ContextMenu.Show(e.pageX, e.pageY);
                }
            };
            IApp.prototype.handleEvent = function (e) {
            };
            IApp.prototype.Show = function () {
                if (_app != null)
                    document.body.removeChild(_app.View);
                _app = this;
                Desktop.Current.Show(this);
                //(<Desktop>this.Parent).Show(this);
            };
            IApp.prototype.initialize = function () {
                this.Pages.Listen = this.opcd;
            };
            IApp.getView = function () {
                var app = document.createElement('app');
                app.id = 'app-' + Date.now();
                return app;
            };
            IApp.prototype.searchActioned = function (s, o, n) {
                this.cpage.OnSearche(o, n);
            };
            return IApp;
        }(Control));
        UI.IApp = IApp;
        var App = /** @class */ (function (_super) {
            __extends(App, _super);
            function App(name) {
                var _this = _super.call(this, App.getView()) || this;
                _this.name = name;
                _this.intern = true;
                return _this;
            }
            Object.defineProperty(App.prototype, "Title", {
                get: function () { return this.get(App.DPTitle); },
                set: function (v) { this.set(App.DPTitle, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(App.prototype, "Badge", {
                get: function () { return this.get(App.DPBadge); },
                set: function (v) {
                    this.set(App.DPBadge, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(App, "CurrentApp", {
                get: function () { return _app; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(App.prototype, "Name", {
                get: function () { return this.name; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(App.prototype, "SearchBox", {
                get: function () {
                    var _this = this;
                    if (!this._search) {
                        this.Show;
                        this._search = new ActionText();
                        this._search.OnInitialized = function (n) {
                            n.Box.applyStyle("inputPage");
                            n.applyStyle("actionPage");
                            n.Box.View.style.borderWidth = '0';
                            n.Box.View.style.boxShadow = '0 0 transparent';
                            n.OnAction.Add(_this.searchActioned.bind(_this), 'ts');
                            n.AutoAction = UI.SearchActionMode.Instantany;
                            n.addEventListener('focusout', function (s, e, p) {
                                var hs = p._this.cpage && p._this.cpage.HasSearch;
                                if (hs == UI.SearchActionMode.Instantany)
                                    p.wrapper.Content = p._this.slogant;
                            }, { _this: _this, wrapper: _this.titlePanel });
                        };
                    }
                    return this._search;
                },
                enumerable: true,
                configurable: true
            });
            App.prototype.createTitle = function (t) {
                var _this = this;
                var div = new ContentControl();
                div.applyStyle('page_title', 'marginT15px');
                var c = new Dom('div');
                div.Content = c;
                div.addEventListener('click', function (s, e, p) {
                    var hs = _this.cpage && _this.cpage.HasSearch;
                    if (hs !== SearchActionMode.None && hs != null) {
                        var isLabel = p.wrapper.Content == p._this.slogant;
                        if (isLabel) {
                            p.wrapper.Content = p._this.SearchBox;
                            p._this.SearchBox.Focus();
                        }
                        else
                            p.wrapper.Content = p._this.slogant;
                    }
                    else {
                        if (!isLabel)
                            p.wrapper.Content = p._this.slogant;
                    }
                }, { _this: this, wrapper: div });
                c.View.textContent = t;
                this.slogant = c;
                return div;
            };
            App.prototype.showPage = function (page) {
                this.Body.Content = page;
            };
            App.prototype.OnPageChanged = function (oldPage, page) {
                document.title = this.Title;
                this.slogant.View.textContent = page.GetValue(page.getDPTitle());
            };
            App.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.Head = new Head(true);
                this.Foot = new ServiceNavBar(this, false);
                this.Body = new ContentControl();
                intern = true;
                this.Add(this.Head);
                this.Add(this.titlePanel = this.createTitle(this.Title));
                this.Add(this.Body);
                this.Add(this.Foot);
                intern = false;
                this.Foot.applyStyle('appFoot');
                this.Body.applyStyle('appBody');
                this.Body.disapplyStyle('container');
                this.Head.OnPropertyChanged(Head.DPPatent, function (s, e) { return _this.cpage.HasSearch && _this.cpage.OnSearche(e._old, e._new); });
                this.Head.OnInitialized = function (h) { return h.Header.OnInitialized = function (h) { return h.Title = _this.Name; }; };
                this.Head.Menu.Items.Source = this.Pages;
                this.Head.OnPageSelected = this.silentSelectPage.bind(this);
            };
            App.prototype.ToggleTitle = function () {
                if (this.titlePanel.View.classList.contains('hideTitle'))
                    this.titlePanel.disapplyStyle('hideTitle');
                else
                    this.titlePanel.applyStyle('hideTitle');
            };
            App.prototype.IsTitleBringged = function () { return this.titlePanel.View.classList.contains('hideTitle'); };
            App.prototype.Check = function (page) {
                return ((page instanceof JControl) || (page instanceof QBar) || (page instanceof Head) || (page instanceof Foot) || (page instanceof ContentControl));
            };
            App.prototype.Add = function (child) {
                if (child instanceof Page)
                    this.AddPage(child);
                else
                    JControl.prototype.Add.call(this, child);
                return this;
            };
            App.DPTitle = App.CreateField('Title', String, 'App');
            App.DPBadge = App.CreateField('Badge', String, null);
            App.Apps = new Corelib_1.collection.List(App);
            return App;
        }(IApp));
        UI.App = App;
        var AuthApp = /** @class */ (function (_super) {
            __extends(AuthApp, _super);
            function AuthApp(b) {
                var _this = _super.call(this, 'Authentication') || this;
                if (authApp || !(b instanceof Corelib_1.bind.EventListener))
                    throw '';
                b.On = isLogged.bind(_this);
                return _this;
            }
            return AuthApp;
        }(App));
        UI.AuthApp = AuthApp;
        var NotifyType;
        (function (NotifyType) {
            NotifyType[NotifyType["Focuse"] = 0] = "Focuse";
            NotifyType[NotifyType["UnFocus"] = 1] = "UnFocus";
        })(NotifyType = UI.NotifyType || (UI.NotifyType = {}));
        var ServiceType;
        (function (ServiceType) {
            ServiceType[ServiceType["Main"] = 0] = "Main";
            ServiceType[ServiceType["Stackable"] = 1] = "Stackable";
            ServiceType[ServiceType["Instantany"] = 3] = "Instantany";
        })(ServiceType = UI.ServiceType || (UI.ServiceType = {}));
        var _ = new UI.Desktop();
        var FunctionGroup = /** @class */ (function (_super) {
            __extends(FunctionGroup, _super);
            function FunctionGroup() {
                var _this = _super.call(this) || this;
                _this._ = [];
                _this.map = {};
                return _this;
            }
            FunctionGroup.prototype.Push = function (f, name) {
                this._.push(f);
                if (name !== undefined) {
                    this.map[name] = f;
                }
            };
            FunctionGroup.prototype.Remove = function (name) {
                var t = this.map[name];
                if (t !== undefined) {
                    var c = this._.indexOf(t);
                    if (c !== -1)
                        this._.splice(c, 1);
                    delete this.map[name];
                }
                return t;
            };
            FunctionGroup.prototype.Create = function () {
                var FunctionGroup = /** @class */ (function (_super) {
                    __extends(FunctionGroup, _super);
                    function FunctionGroup(context, args) {
                        var _this = _super.call(this) || this;
                        for (var i = 0; i < FunctionGroup._.length; i++) {
                            var t = FunctionGroup._[i];
                            t.apply(context, args);
                        }
                        return _this;
                    }
                    FunctionGroup.Push = function (f, name) {
                        this._.push(f);
                        if (name !== undefined) {
                            this.map[name] = f;
                        }
                    };
                    FunctionGroup.Remove = function (name) {
                        var t = this.map[name];
                        if (t !== undefined) {
                            var c = this._.indexOf(t);
                            if (c !== -1)
                                this._.splice(c, 1);
                            delete this.map[name];
                        }
                        return t;
                    };
                    FunctionGroup._ = [];
                    FunctionGroup.map = {};
                    return FunctionGroup;
                }(Function));
                return FunctionGroup;
            };
            return FunctionGroup;
        }(Function));
        UI.FunctionGroup = FunctionGroup;
        var openedModal = [];
        var Modal = /** @class */ (function (_super) {
            __extends(Modal, _super);
            function Modal() {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this._fm = false;
                _this._onClick = new Corelib_1.bind.EventListener('test');
                return _this;
            }
            Modal.prototype.getSearchBox = function (d) {
                if (!this._searchBox) {
                    var group_cnt = new UI.Div().applyStyle('pull-left', 'flat');
                    var btn_filter = new Glyph(Glyphs.filter, false, 'Search');
                    var div = group_cnt;
                    div.Add(btn_filter);
                    div.Add(btn_filter);
                    this.abonment = new UI.ProxyAutoCompleteBox(new UI.Input(document.createElement('input')), d);
                    this.abonment.Box.Placeholder = 'Select a Client';
                    div.Add(this.abonment.Box);
                    div.Enable = true;
                    this._searchBox = div;
                    this.abonment.OnValueChanged(this, this.callBack);
                    return div;
                }
                this.abonment.DataSource = d;
                return this._searchBox;
            };
            Modal.prototype.callBack = function (b, old, _new) {
                if (this.onSearch)
                    this.onSearch(this, b, old, _new);
            };
            Object.defineProperty(Modal.prototype, "CurrentModal", {
                get: function () { return openedModal[openedModal.length - 1]; },
                enumerable: true,
                configurable: true
            });
            Modal.prototype.OnSearch = function (i) {
                this.onSearch = i;
            };
            Modal.prototype.OkTitle = function (v) {
                this._okt = v;
                if (this.bok)
                    this.bok.Visible = v != null;
                else
                    this.OnInitialized = function (b) { return b.bok.Visible = v != null; };
                if (this.bok)
                    this.bok.Text = v;
                return this;
            };
            Modal.prototype.Canceltitle = function (v) {
                this._cancelt = v;
                if (this.bcancel) {
                    this.bcancel.Text = v;
                    this.bcancel.Visible = v != null;
                }
                else
                    this.OnInitialized = function (b) { return b.bcancel.Visible = v != null; };
                return this;
            };
            Modal.prototype.Title = function (v) {
                this._ts = v;
                if (this._dtitle)
                    this._dtitle.View.innerHTML = v;
                this.asSearch = false;
                return this;
            };
            Modal.prototype.Search = function (d) {
                if (this._dtitle) {
                    this._dtitle.Clear();
                    this._dtitle.View.innerHTML = '';
                    this._dtitle.Add(this.getSearchBox(d));
                }
                else
                    this.getSearchBox(d);
                this.asSearch = true;
            };
            Modal.prototype.ShowDialog = function (title, content) {
                if (!this._body)
                    this.initialize();
                this._body.Clear();
                this.Title(title);
                this._body.Add(content);
            };
            Modal.NextZIndex = function () { return ++this.zIndex; };
            Modal.prototype.Open = function () {
                if (this.IsOpen)
                    if (this.IsOpen++ > 5)
                        this.silentClose();
                    else
                        return;
                this._view.style.zIndex = Modal.zIndex++ + "";
                this.IsOpen = 1;
                if (this.Parent == null) {
                    this.Parent = UI.Desktop.Current;
                    document.body.appendChild(this.View);
                }
                this.View.classList.add('in');
                this.Visible = true;
                this.Parent.applyStyle('modal-open');
                this._view.style.display = 'block';
                this._view.focus();
                if (!document.body.contains(this._view))
                    document.body.appendChild(this.View);
                openedModal.push(this);
                this.OnInitialized = function (n) {
                    var c = document.activeElement;
                    c && c.blur && c.blur();
                    n.focuser.focuseNext(true);
                };
            };
            Modal.prototype.silentClose = function () {
                if (!this.IsOpen)
                    return;
                var im = openedModal.indexOf(this);
                if (im != -1)
                    openedModal.splice(im, 1);
                this.IsOpen = 0;
                if (this.Parent == null) {
                    this.Parent = UI.Desktop.Current;
                    document.body.appendChild(this.View);
                }
                this.View.classList.remove('in');
                this.Visible = false;
                this.Parent.disapplyStyle('modal-open');
                this._view.remove();
            };
            Modal.prototype.Close = function (msg) {
                var e = new MessageEventArgs(this, msg, MessageResult[msg]);
                var r = this._onClick.Invok('test', function (t) { return t(e); });
                if (!e.stayOpen)
                    this.silentClose();
            };
            Modal.prototype.initialize = function () {
                this.applyStyle('modal', 'fade');
                this.View.setAttribute('role', 'dialog');
                this._container = new Dom('div').applyStyle('modal-dialog');
                this._container1 = new Dom('div').applyStyle('modal-content');
                this._head = new Dom('div').applyStyle('modal-header');
                this._body = new Dom('div').applyStyle('modal-body');
                this._foot = new Dom('div').applyStyle('modal-footer');
                this.createHeader(this._head);
                this.createFoot(this._foot);
                this._container.Add(this._container1.AddRange([this._head, this._body, this._foot]));
                _super.prototype.Add.call(this, this._container);
                this.drgmngr = new DragManager(this._head, this._container1);
                this._container1.View.style.top = 30 + px;
                this.focuser = new Corelib_1.basic.focuser(this._view, false);
            };
            Modal.prototype.createHeader = function (head) {
                var _this = this;
                var b = new Dom('button')
                    .applyStyle('close').setAttribute('data-dismiss', 'modal').setAttribute('aria-label', 'close');
                var sp = new Dom('span').setAttribute('aria-hidden', 'true');
                sp.View.innerHTML = '&times;';
                var h4 = new Dom('h4').applyStyle('modal-title');
                if (this.asSearch)
                    h4.Add(this._searchBox);
                else
                    h4.View.innerHTML = this._ts == null ? 'Dialog' : this._ts;
                head.AddRange([b.Add(sp), h4]);
                b.View.onclick = function (e) { return _this.Close(MessageResult.Exit); };
                this._dtitle = h4;
            };
            Modal.prototype.createFoot = function (foot) {
                var _this = this;
                var b1 = new Button().applyStyle('btn-danger').setAttribute('data-dismiss', 'modal');
                b1.Text = this._cancelt == null ? 'Close' : this._cancelt;
                var b2 = new Button().applyStyle('btn-primary');
                b2.Text = this._okt == null ? 'Save Changes ' : this._okt;
                foot.AddRange([b1, b2]);
                b1.View.onclick = function (e) { return _this.Close(MessageResult.cancel); };
                b2.View.onclick = function (e) { return _this.Close(MessageResult.ok); };
                this.bok = b2;
                this.bcancel = b1;
            };
            Modal.prototype.Add = function (child) {
                if (!this._body)
                    this.initialize();
                this._body.Add(child);
                return this;
            };
            Modal.prototype.Clear = function () {
                this._body.Clear();
            };
            Modal.prototype.Remove = function (child) {
                return this._body.Remove(child);
            };
            Modal.prototype.Insert = function (child, i) {
                this._body.Insert(child, i);
                return this;
            };
            Modal.prototype.Dispose = function () {
                this.silentClose();
                _super.prototype.Dispose.call(this);
            };
            Object.defineProperty(Modal.prototype, "OnClosed", {
                get: function () { return this._onClick; },
                enumerable: true,
                configurable: true
            });
            Modal.prototype.OnKeyDown = function (e) {
                if (e.keyCode == 27)
                    this.Close(MessageResult.cancel);
                else if (e.keyCode == 13) {
                    var t = this.focuser.focuseNext(false);
                    if (t == true)
                        this.bok.Focus();
                }
            };
            Modal._ShowDialog = function (title, msg, callback, ok, cancel) {
                if (this.closedMessages.length == 0) {
                    var message = new Modal();
                }
                else {
                    message = this.closedMessages.pop();
                }
                //if (message == null) message = new Modal();
                //else if (message.IsOpen) {
                //}
                message.OnInitialized = function (m) {
                    message.Title(title == null ? 'Confirm' : title);
                    if (typeof msg === 'string')
                        message._body.View.innerHTML = '<h5>' + msg + '</h5>';
                    else if (msg instanceof HTMLElement) {
                        message._body.View.innerHTML = '';
                        message._body.View.appendChild(msg);
                    }
                    else {
                        message._body.View.innerHTML = '';
                        message._body.Add(msg);
                    }
                    message.OkTitle(ok == null ? 'Ok' : ok);
                    message.Canceltitle(cancel === undefined ? 'Cancel' : cancel);
                    message.OnClosed.Add(function (s /*, l*/) {
                        message.OnClosed.Remove(0);
                        if (callback)
                            callback(s.msg, s.Modal);
                        var c = Modal.closedMessages.indexOf(message);
                        if (c == -1)
                            Modal.closedMessages.push(message);
                    }, 0);
                };
                message.Open();
                return message.Close.bind(message);
            };
            Modal.ShowDialog = function (title, msg, callback, ok, cancel) {
                if (this.closedMessages.length == 0) {
                    var message = new Modal();
                }
                else {
                    message = this.closedMessages.pop();
                }
                message.OnInitialized = function (m) {
                    message.Title(title == null ? 'Confirm' : title);
                    if (typeof msg === 'string')
                        message._body.View.innerHTML = '<h5>' + msg + '</h5>';
                    else if (msg instanceof HTMLElement) {
                        message._body.View.innerHTML = '';
                        message._body.View.appendChild(msg);
                    }
                    else {
                        message._body.View.innerHTML = '';
                        message._body.Add(msg);
                    }
                    message.OkTitle(ok == null ? 'Ok' : ok);
                    message.Canceltitle(cancel === undefined ? 'Cancel' : cancel);
                    message.OnClosed.Add(function (s /*, l*/) {
                        message.OnClosed.Remove(0);
                        if (callback)
                            callback(s);
                        var c = Modal.closedMessages.indexOf(message);
                        if (c == -1)
                            Modal.closedMessages.push(message);
                    }, 0);
                };
                message.Open();
                return message.Close.bind(message);
            };
            Modal.prototype.setStyle = function (name, value) {
                this._container.View.style[name] = value;
                return this;
            };
            Modal.prototype.setWidth = function (value) {
                this._container.View.style.width = value;
                return this;
            };
            Modal.prototype.setHeight = function (value) {
                this._container.View.style.height = value;
                return this;
            };
            Modal.zIndex = 10000;
            Modal.closedMessages = [];
            return Modal;
        }(JControl));
        UI.Modal = Modal;
        var MessageResult;
        (function (MessageResult) {
            MessageResult[MessageResult["Exit"] = 0] = "Exit";
            MessageResult[MessageResult["ok"] = 1] = "ok";
            MessageResult[MessageResult["cancel"] = 2] = "cancel";
        })(MessageResult = UI.MessageResult || (UI.MessageResult = {}));
        var MessageEventArgs = /** @class */ (function () {
            function MessageEventArgs(Modal, Result, msg) {
                this.Modal = Modal;
                this.Result = Result;
                this.msg = msg;
            }
            Object.defineProperty(MessageEventArgs.prototype, "stayOpen", {
                get: function () {
                    return this._stayOpen;
                },
                enumerable: true,
                configurable: true
            });
            MessageEventArgs.prototype.StayOpen = function () {
                this._stayOpen = true;
            };
            MessageEventArgs.prototype.Close = function () {
                this._stayOpen = true;
            };
            return MessageEventArgs;
        }());
        UI.MessageEventArgs = MessageEventArgs;
        var Image = /** @class */ (function (_super) {
            __extends(Image, _super);
            function Image() {
                return _super.call(this, document.createElement('img')) || this;
            }
            Object.defineProperty(Image.prototype, "Source", {
                get: function () { return this._view.src; },
                set: function (v) { this._view.src = v; },
                enumerable: true,
                configurable: true
            });
            Image.prototype.initialize = function () {
            };
            return Image;
        }(JControl));
        UI.Image = Image;
        var CarouselItem = /** @class */ (function (_super) {
            __extends(CarouselItem, _super);
            function CarouselItem(url, caption) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.OnInitialized = function (x) {
                    x._image.Source = url;
                    if (caption instanceof HTMLElement)
                        x._caption.View.appendChild(caption);
                    else if (typeof caption === 'string')
                        x._caption.View.innerText = caption;
                    else
                        throw '';
                };
                return _this;
            }
            CarouselItem.prototype.initialize = function () {
                this.applyStyle('item');
                this._image = new Image();
                this._caption = new Div().applyStyle('carousel-caption');
                this.AddRange([this._image, this._caption]);
            };
            Object.defineProperty(CarouselItem.prototype, "Active", {
                set: function (v) {
                    if (v)
                        this.applyStyle('active');
                    else
                        this.disapplyStyle('active');
                },
                enumerable: true,
                configurable: true
            });
            return CarouselItem;
        }(JControl));
        UI.CarouselItem = CarouselItem;
        var Carousel = /** @class */ (function (_super) {
            __extends(Carousel, _super);
            function Carousel() {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.opcd = { Owner: _this, Invoke: _this.ItemsChanged };
                _this.fromInit = false;
                _this.OnInitialized = function (x) { return x.ItemsChanged(Corelib_1.utils.ListEventArgs.ResetEvent); };
                return _this;
            }
            Carousel.prototype.initialize = function () {
                this.applyStyle('carousel', 'slide');
                this.View.setAttribute('data-ride', 'carousel');
                this._indecators = new Dom('ol').applyStyle('carousel-indicators');
                this._inner = new Div().applyStyle('carousel-inner');
                this._items = new Corelib_1.collection.List(CarouselItem);
                this._items.Listen = this.opcd; // this.ItemsChanged.bind(this);
                this.leftButton = this.createButton(true);
                this.rightButton = this.createButton(false);
                this.fromInit = true;
                _super.prototype.Add.call(this, this._indecators);
                _super.prototype.Add.call(this, this._inner);
                _super.prototype.Add.call(this, this.leftButton);
                _super.prototype.Add.call(this, this.rightButton);
                this.fromInit = false;
            };
            Carousel.prototype.createButton = function (isLeft) {
                var fl = isLeft === true ? 'left' : 'right';
                var i = new Dom('a').applyStyle(fl, 'carousel-control');
                var v = i.View;
                v.setAttribute('href', '#' + this.Id);
                v.setAttribute('role', 'button');
                v.setAttribute('data-slide', isLeft === true ? 'prev' : 'next');
                var x = document.createElement('span');
                x.classList.add('glyphicon', 'glyphicon-chevron-' + fl);
                v.appendChild(x);
                return i;
            };
            Carousel.prototype.createIndecator = function (i) {
                var d = new Dom('li');
                d.View.setAttribute('data-target', '#' + this.Id);
                d.View.setAttribute('data-slide-to', i + '');
                return d;
            };
            Carousel.prototype.ItemsChanged = function (e) {
                if (this.IsInit) {
                    var m = this._inner;
                    var n = this._indecators;
                    var t = e.newItem;
                    var ind = void 0, rit = void 0;
                    switch (e.event) {
                        case Corelib_1.collection.CollectionEvent.Added:
                            ind = this.createIndecator(e.startIndex);
                            m.Add(t);
                            n.Add(ind);
                            t.Indicator = ind;
                        case Corelib_1.collection.CollectionEvent.Cleared:
                            this.Clear();
                            return;
                        case Corelib_1.collection.CollectionEvent.Removed:
                            rit = e.oldItem;
                            n.Remove(rit.Indicator);
                            m.Remove(rit);
                            break;
                        case Corelib_1.collection.CollectionEvent.Replace:
                            rit = e.oldItem;
                            n.Remove(rit.Indicator);
                            m.Remove(rit);
                            ind = this.createIndecator(e.startIndex);
                            m.Add(t);
                            n.Add(ind);
                            t.Indicator = ind;
                            break;
                        case Corelib_1.collection.CollectionEvent.Reset:
                            this.Clear();
                            for (var i = 0, l = this._items.Count; i < l; i++) {
                                var c = this._items.Get(0);
                                var ind_1 = c.Indicator || this.createIndecator(e.startIndex);
                                m.Add(c);
                                n.Add(ind_1);
                                c.Indicator = ind_1;
                            }
                            break;
                    }
                    this.selectNext();
                }
            };
            Carousel.prototype.selectNext = function () {
                var t = this._items;
                for (var i = 0, l = t.Count; i < l; i++) {
                    if (t.Get(i).View.classList.contains('active'))
                        return;
                }
                if (l > 0)
                    t.Get(0).Active = true;
            };
            Carousel.prototype.Clear = function () {
                this._indecators.Clear();
                this._inner.Clear();
            };
            Carousel.prototype.Check = function (child) { return this.fromInit || child instanceof CarouselItem; };
            Carousel.prototype.Add = function (child) {
                if (this.fromInit)
                    _super.prototype.Add.call(this, child);
                else
                    this._items.Add(child);
                return this;
            };
            Carousel.prototype.Remove = function (child) {
                this._items.Remove(child);
                return true;
            };
            Carousel.prototype.RemoveAt = function (i) {
                this._items.RemoveAt(i);
                return true;
            };
            return Carousel;
        }(Control));
        UI.Carousel = Carousel;
        var PaginationSurf = /** @class */ (function (_super) {
            __extends(PaginationSurf, _super);
            function PaginationSurf(isNext) {
                var _this = _super.call(this, document.createElement('li')) || this;
                _this.isNext = isNext;
                return _this;
            }
            PaginationSurf.prototype.initialize = function () {
                var a = new Anchore();
                var s = new Dom('span');
                var t = new Dom('a');
                this.anchore = a;
                this.span = s;
                this.text = t;
                if (this.isNext != null) {
                    a.View.setAttribute('aria-label', this.isNext ? 'Next' : 'Previous');
                    s.View.setAttribute('aria-hidden', this.isNext ? 'true' : 'false');
                    if (this.isNext)
                        s.View.innerHTML = '»';
                    else
                        s.View.innerHTML = '«';
                }
                this.View.addEventListener('click', this);
                this.Add(a.AddRange([s, t]));
            };
            Object.defineProperty(PaginationSurf.prototype, "Icon", {
                set: function (v) {
                    this.span.View.innerHTML = v;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PaginationSurf.prototype, "Title", {
                set: function (v) {
                    this.text.View.innerHTML = v;
                },
                enumerable: true,
                configurable: true
            });
            PaginationSurf.prototype.handleEvent = function (e) {
                if (this.OnClick)
                    this.OnClick(this);
            };
            return PaginationSurf;
        }(JControl));
        UI.PaginationSurf = PaginationSurf;
        var BiPagination = /** @class */ (function (_super) {
            __extends(BiPagination, _super);
            function BiPagination() {
                var _this = _super.call(this, document.createElement('nav')) || this;
                _this.isc = false;
                return _this;
            }
            BiPagination.__fields__ = function () {
                return [BiPagination.DPMax, BiPagination.DPIndex];
            };
            BiPagination.prototype.initialize = function () {
                var _this = this;
                this.list = new Dom('ul').applyStyle('pager');
                this.prev = new PaginationSurf(false).applyStyle('previous');
                this.next = new PaginationSurf(true).applyStyle('next');
                var li = new Dom('li');
                this.actionText = new Textbox().applyStyle('text-center', 'borderless');
                this.actionText.View.addEventListener('change', this);
                this.actionText.View.style.width = '80px';
                this.actionText.View.style.border = '0px';
                this.actionText.Text = '0';
                li.Add(new Anchore(this.actionText));
                this.Add(this.list.AddRange([this.prev, li, this.next]));
                this.prev.Icon = '<';
                this.prev.Title = '<<<<';
                this.next.Icon = '>';
                this.next.Title = '>>>>';
                this.next.OnClick = function () { _this.Index++; };
                this.prev.OnClick = function () { _this.Index--; };
            };
            BiPagination.prototype.handleEvent = function (e) {
                if (this.isc)
                    return;
                var t;
                this.Index = parseFloat(this.actionText.Text);
            };
            BiPagination.ctor = function () {
                this.DPMax = BiPagination.CreateField('Max', Number, Infinity, function (e) {
                    var n = e._new;
                    if (e.__this.Index > n)
                        e.__this.Index = n;
                }, function (e) {
                    if (e._new < 0)
                        e._new = 0;
                });
                this.DPIndex = BiPagination.CreateField('Index', Number, 0, function (e) {
                    e.__this.isc = true;
                    e.__this.actionText.Text = e._new + '';
                    e.__this.isc = false;
                }, function (e) {
                    if (e._new < 0)
                        e._new = 0;
                    else if (isNaN(e._new))
                        e._new = isNaN(e._old) ? 0 : e._old;
                    else if (e._new > e.__this.Max)
                        e._new = e.__this.Max;
                });
            };
            return BiPagination;
        }(JControl));
        UI.BiPagination = BiPagination;
        var Pagination = /** @class */ (function (_super) {
            __extends(Pagination, _super);
            function Pagination() {
                var _this = _super.call(this, document.createElement('ul')) || this;
                _this.items = new Corelib_1.collection.List(PaginationSurf);
                _this.opcd = { Owner: _this, Invoke: _this.OnItemsChanged };
                return _this;
            }
            Object.defineProperty(Pagination.prototype, "SelectedRange", {
                get: function () {
                    return this.get(Pagination.DPRange);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Pagination.prototype, "Count", {
                get: function () {
                    return this.get(Pagination.DPCount);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Pagination.prototype, "StartIndex", {
                get: function () {
                    return this.get(Pagination.DPStartIndex);
                },
                set: function (v) {
                    this.set(Pagination.DPStartIndex, v);
                },
                enumerable: true,
                configurable: true
            });
            Pagination.prototype.OnCountChanged = function (o, n) {
                var t;
                for (var i = o; i < n; i++) {
                    this.items.Add(t = new PaginationSurf());
                    t.OnClick = this.OnClick;
                }
                for (var i = n; i < o; i++) {
                    t = this.items.Get(i - 1);
                    var j = this.items.RemoveAt(i - 1);
                    t.OnClick = null;
                }
                this.StartIndex = n * this.SelectedRange;
            };
            Pagination.prototype.OnRangeChanged = function (o, n) {
                this.StartIndex = n * this.Count;
            };
            Pagination.prototype.OnStartIndexChanged = function (n) {
                var c = this.Count;
                for (var i = 0; i < c; i++) {
                    var t = this.items.Get(i);
                    t.Icon = i + '';
                }
            };
            Pagination.prototype.AddItem = function (page) {
            };
            Pagination.prototype.initialize = function () {
                this.applyStyle('pagination');
                this.prev = new PaginationSurf(false);
                this.next = new PaginationSurf(true);
                //this.items.AddRange([this.prev, this.next]);
                this.Add(this.prev);
                this.Add(this.next);
                this.items.Listen = this.opcd; // this.OnItemsChanged.bind(this);
                for (var i = 0; i < 10; i++) {
                    var t = new PaginationSurf();
                    (function (i) { return t.OnInitialized = function (t) { return t.Icon = i.toString(); }; })(i);
                    this.items.Add(t);
                }
                for (var i = 0; i < this.items.Count; i++)
                    this.Add(this.items.Get(i));
            };
            Pagination.prototype.OnClick = function (e) {
                if (this.sp)
                    this.sp.disapplyStyle('active');
                this.sp = e;
                this.sp.applyStyle('active');
            };
            Pagination.prototype.isInRange = function (i) {
                var s = i - this.SelectedRange * this.Count;
                return s < this.Count && s >= 0;
            };
            Pagination.prototype.convert = function (i) {
                return i - this.SelectedRange * this.Count;
            };
            Pagination.prototype.OnItemsChanged = function (e) {
                switch (e.event) {
                    case Corelib_1.collection.CollectionEvent.Added:
                        e.newItem.OnClick = this.OnClick;
                        var t = e.startIndex;
                        if (t < 0 || t >= this.Count)
                            this.Insert(e.newItem, t + 1);
                        break;
                    case Corelib_1.collection.CollectionEvent.Removed:
                        this.Remove(e.oldItem);
                        e.oldItem.OnClick = null;
                        break;
                    case Corelib_1.collection.CollectionEvent.Cleared:
                        var c = e.collection;
                        for (var i = 0, l = this.Count; i < l; i++) {
                            var m = c[0];
                            this.Remove(m);
                            m.OnClick = null;
                        }
                        break;
                    case Corelib_1.collection.CollectionEvent.Reset:
                        var ci = this.items;
                        for (var i = 0, l = this.Count; i < l; i++) {
                            var m = ci.Get(0);
                            this.Remove(m);
                            m.OnClick = null;
                        }
                        break;
                }
            };
            Pagination.DPRange = Pagination.CreateField('Range', Number, 0, function (e) { return e.__this.OnRangeChanged(e._old, e._new); });
            Pagination.DPStartIndex = Pagination.CreateField('StartIndex', Number, 0, function (e) { return e.__this.OnStartIndexChanged(e._new); });
            Pagination.DPCount = Pagination.CreateField('Count', Number, 10, function (e) { return e.__this.OnCountChanged(e._old, e._new); });
            return Pagination;
        }(JControl));
        UI.Pagination = Pagination;
        var NumericUpDown = /** @class */ (function (_super) {
            __extends(NumericUpDown, _super);
            function NumericUpDown() {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.f = false;
                _this.minValue = -Number.MAX_VALUE;
                _this.defaultValue = 0;
                _this.maxvalue = Number.MAX_VALUE;
                return _this;
            }
            Object.defineProperty(NumericUpDown.prototype, "Value", {
                get: function () { return this.get(NumericUpDown.DPValue); },
                set: function (v) { this.set(NumericUpDown.DPValue, v); },
                enumerable: true,
                configurable: true
            });
            NumericUpDown.__fields__ = function () { return [NumericUpDown.DPValue]; };
            NumericUpDown.prototype.initialize = function () {
                var _this = this;
                this.applyStyle('input-group', 'input-group-lg');
                var l = new Dom('a').applyStyle('btn', 'btn-primary', 'input-group-addon', 'glyphicon', 'glyphicon-minus-sign');
                var r = new Dom('a').applyStyle('btn', 'btn-primary', 'input-group-addon', 'glyphicon', 'glyphicon-plus-sign');
                var t = new Input();
                this.AddRange([this.sleft = l, this.text = t, this.sright = r]);
                this.text.Text = '0';
                this.text.View.onchange = this.textChanged.bind(this);
                l.View.onclick = function () {
                    _this.Value--;
                };
                r.View.onclick = function () {
                    _this.Value++;
                };
            };
            NumericUpDown.prototype.textChanged = function (e) {
                this.Value = parseFloat(this.text.Text);
            };
            NumericUpDown.prototype.Focus = function () {
                this.text.View.focus();
            };
            NumericUpDown.prototype.SelectAll = function () {
                var inp = this.text.View;
                inp.select();
            };
            NumericUpDown.DPValue = Corelib_1.bind.DObject.CreateField('Value', Number, 0, function (e) {
                e.__this.text.Text = (e._new == null ? 0 : e._new) + '';
            }, function (e) {
                var t = e.__this;
                var n = e._new;
                if (n == null || !isFinite(n)) {
                    e._new = t.defaultValue;
                }
                else if (n < t.minValue)
                    e._new = t.minValue;
                else if (n > t.maxvalue)
                    e._new = t.maxvalue;
            });
            return NumericUpDown;
        }(JControl));
        UI.NumericUpDown = NumericUpDown;
        var NavList = /** @class */ (function (_super) {
            __extends(NavList, _super);
            function NavList() {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.caption = document.createElement('div');
                _this._view.appendChild(_this.caption);
                return _this;
            }
            Object.defineProperty(NavList.prototype, "Caption", {
                set: function (v) {
                    this.caption.textContent = v;
                },
                enumerable: true,
                configurable: true
            });
            NavList.prototype.initialize = function () {
                this.applyStyle('inavigation');
                this.caption.classList.add('icaption');
            };
            NavList.prototype.getTemplate = function (child) {
                return new Div().applyStyle('itab-header').Add(child);
            };
            NavList.prototype.Add = function (panel) {
                _super.prototype.Add.call(this, panel.CaptionControl);
                return this;
            };
            NavList.prototype.AddRange = function (c) {
                throw "Not Implimented";
            };
            NavList.prototype.Remove = function (c) {
                return _super.prototype.Remove.call(this, c.CaptionControl);
            };
            NavList.prototype.Insert = function (c, i) {
                _super.prototype.Insert.call(this, c.CaptionControl, i);
                return this;
            };
            NavList.prototype.SetSeparator = function () {
                var i = new Div();
                i.applyStyle('separator');
                _super.prototype.Add.call(this, i);
            };
            return NavList;
        }(JControl));
        var NavPanel = /** @class */ (function (_super) {
            __extends(NavPanel, _super);
            function NavPanel(Name, caption) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.Name = Name;
                _this.title = new Div().applyStyle('icontent-header', 'hidden');
                _this.container = new Div();
                _this.caption = new Button();
                _this.Caption = caption;
                return _this;
            }
            NavPanel.prototype.OnPrint = function () {
            };
            Object.defineProperty(NavPanel.prototype, "CaptionControl", {
                get: function () { return this.caption; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NavPanel.prototype, "Title", {
                set: function (v) {
                    if (v != null && v != "") {
                        if (typeof v === 'string')
                            this.title.View.textContent = v;
                        else
                            this.title.View.appendChild(v);
                        this.title.disapplyStyle('hidden');
                    }
                    else {
                        this.title.View.innerHTML = '';
                        this.title.applyStyle('hidden');
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NavPanel.prototype, "Caption", {
                set: function (v) {
                    this.caption.Text = v;
                },
                enumerable: true,
                configurable: true
            });
            NavPanel.prototype.initialize = function () {
                _super.prototype.Add.call(this, this.title);
                _super.prototype.Add.call(this, this.container);
            };
            NavPanel.prototype.Add = function (item) {
                this.container.Add(item);
                return this;
            };
            NavPanel.prototype.AddRange = function (items) {
                this.container.AddRange(items);
                return this;
            };
            NavPanel.prototype.Remove = function (item) {
                return this.container.Remove(item);
            };
            NavPanel.prototype.RemoveAt = function (i, dispose) {
                return this.container.RemoveAt(i, dispose);
            };
            NavPanel.prototype.Clear = function () {
                this.container.Clear();
            };
            NavPanel.prototype.Update = function () {
            };
            NavPanel.prototype.GetLeftBar = function () {
                return null;
            };
            NavPanel.prototype.GetRightBar = function () {
                return null;
            };
            NavPanel.prototype.Handled = function () {
                return true;
            };
            Object.defineProperty(NavPanel.prototype, "ServiceType", {
                get: function () {
                    return ServiceType.Instantany;
                },
                enumerable: true,
                configurable: true
            });
            NavPanel.prototype.Callback = function () { };
            NavPanel.prototype.OnBringIntoFront = function () {
            };
            NavPanel.prototype.OnKeyDown = function (e) {
            };
            NavPanel.prototype.OnSearche = function (oldPatent, newPatent) {
            };
            NavPanel.prototype.OnDeepSearch = function () {
            };
            NavPanel.prototype.getHelp = function (t) {
                var l = ["primary", "success", "danger", "info", "warning"];
                var k = 0;
                var s = "";
                for (var i in t) {
                    s += '<div class="input-group" style="background:gray"> <span class="input-group-btn"> <label class="btn btn-' + l[(k++) % l.length] + '">' + i + '</label> </span> <label class="form-control" >' + t[i] + '</label> </div>';
                }
                UI.InfoArea.push(s, true, 10000);
            };
            return NavPanel;
        }(JControl));
        UI.NavPanel = NavPanel;
        var IContent = /** @class */ (function (_super) {
            __extends(IContent, _super);
            function IContent(navPage) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.navPage = navPage;
                return _this;
            }
            IContent.prototype.initialize = function () {
                this.applyStyle('icontent');
            };
            IContent.prototype.Check = function (item) { return true; };
            IContent.prototype.Add = function (p) {
                this._view.appendChild(p.View);
                p.Parent = this.navPage;
                return this;
            };
            IContent.prototype.Remove = function (p) {
                this._view.removeChild(p.View);
                p.Parent = null;
                return true;
            };
            return IContent;
        }(JControl));
        UI.IContent = IContent;
        var NavPage = /** @class */ (function (_super) {
            __extends(NavPage, _super);
            function NavPage(app, title, name) {
                var _this = _super.call(this, app, title, name) || this;
                _this.con = new IContent(_this);
                _this.nav = new NavList();
                _this.caption = new Button();
                _this.children = [];
                _this.events = [];
                _this.panels = {};
                return _this;
            }
            NavPage.__fields__ = function () { return [NavPage.DPSelectedItem]; };
            Object.defineProperty(NavPage.prototype, "Caption", {
                set: function (v) { this.nav.Caption = v; },
                enumerable: true,
                configurable: true
            });
            NavPage.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._view.classList.add('inavPanel');
                this.caption.applyStyle('icaption');
                this.islocal = true;
                _super.prototype.Add.call(this, this.nav);
                _super.prototype.Add.call(this, this.con);
                delete this.islocal;
            };
            NavPage.prototype.ToggleNav = function () {
                var v = this.nav.View;
                var x = v.classList.contains('hideNav');
                if (x)
                    v.classList.remove('hideNav');
                else
                    v.classList.add('hideNav');
            };
            NavPage.prototype.Add = function (c) {
                throw "Not Implimented";
            };
            NavPage.prototype.AddRange = function (c) {
                throw "Not Implimented";
            };
            NavPage.prototype.Check = function (j) { return !!this.islocal; };
            Object.defineProperty(NavPage.prototype, "SelectedItem", {
                get: function () {
                    return this.get(NavPage.DPSelectedItem);
                },
                set: function (v) {
                    this.set(NavPage.DPSelectedItem, v);
                },
                enumerable: true,
                configurable: true
            });
            NavPage.prototype.SetPanel = function (panel) {
                var p = this.panels[panel.Name];
                if (p)
                    throw "this panel exist";
                this.panels[panel.Name] = panel;
                this.children.push(panel);
                var itemList = this.nav.Add(panel);
                this.events.push(panel.CaptionControl.addEventListener('click', NavPage._onItemSelected, { Item: panel, List: this }));
                if (!this.get(NavPage.DPSelectedItem))
                    this.SelectedItem = panel;
            };
            NavPage.prototype.SetSeparator = function () {
                this.nav.SetSeparator();
            };
            NavPage.prototype.OnKeyDown = function (e) {
                var s = this.SelectedItem;
                if (e.altKey)
                    if (e.keyCode === UI.Keys.Down) {
                        this.SelectedItem = this.children[(1 + this.children.indexOf(s)) % this.children.length];
                        e.stopPropagation();
                        return e.preventDefault();
                    }
                    else if (e.keyCode === UI.Keys.Up) {
                        var i = this.children.indexOf(s);
                        if (i == 0)
                            i = this.children.length;
                        this.SelectedItem = this.children[(-1 + i) % this.children.length];
                        e.stopPropagation();
                        e.preventDefault();
                        return;
                    }
                ;
                if (!s)
                    return;
                s.OnKeyDown(e);
            };
            NavPage.prototype.OnPrint = function () {
                var s = this.SelectedItem;
                if (s)
                    s.OnPrint();
            };
            NavPage._onItemSelected = function (s, e, p) {
                var o = p.List.SelectedItem;
                if (o)
                    o.IsActive = false;
                var n = p.Item;
                if (n)
                    n.IsActive = true;
                p.List.SelectedItem = p.Item;
            };
            NavPage.prototype.Select = function (name) {
                var p = this.panels[name];
                if (p)
                    this.SelectedItem = p;
                else
                    return false;
                return true;
            };
            NavPage.prototype.GetLeftBar = function () {
                var p = this.SelectedItem;
                return p && p.GetLeftBar();
            };
            Object.defineProperty(NavPage.prototype, "HasSearch", {
                get: function () {
                    return this.SelectedItem && this.SelectedItem.HasSearch;
                },
                set: function (v) { },
                enumerable: true,
                configurable: true
            });
            NavPage.prototype.GetRightBar = function () {
                var p = this.SelectedItem;
                return p && p.GetRightBar();
            };
            NavPage.prototype.Update = function () {
                var n = this.SelectedItem;
                if (n)
                    n.Update();
            };
            NavPage.prototype.OnSearche = function (oldPatent, newPatent) {
                var p = this.SelectedItem;
                if (p)
                    p.OnSearche(oldPatent, newPatent);
            };
            NavPage.prototype.OnDeepSearche = function () {
                var p = this.SelectedItem;
                if (p)
                    p.OnDeepSearch();
            };
            NavPage.DPSelectedItem = Corelib_1.bind.DObject.CreateField("SelectedItem", NavPanel, null, function (e) {
                var o = e._old;
                var n = e._new;
                var t = e.__this;
                if (o) {
                    t.con.Remove(o);
                    o.IsActive = false;
                    o.CaptionControl.Parent.disapplyStyle('selected');
                    o.disapplyStyle('selected');
                    e.__this.app.Foot.Pop(o);
                }
                if (n) {
                    t.con.Add(n);
                    n.IsActive = true;
                    n.CaptionControl.Parent.applyStyle('selected');
                    n.applyStyle('selected');
                    n.OnBringIntoFront();
                    e.__this.app.Foot.Push(n);
                }
            });
            return NavPage;
        }(UI.Page));
        UI.NavPage = NavPage;
    })(UI = exports.UI || (exports.UI = {}));
    (function (UI) {
        var TemplateShadow = /** @class */ (function (_super) {
            __extends(TemplateShadow, _super);
            function TemplateShadow() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TemplateShadow.Create = function (item) {
                var isscop = item instanceof Corelib_1.bind.Scop;
                var c = document.createElement('label');
                c.textContent = ((isscop ? item.Value : item) || '').toString();
                return new ScopicTemplateShadow(c, isscop ? item : new Corelib_1.bind.ValueScop(item));
            };
            return TemplateShadow;
        }(UI.JControl));
        UI.TemplateShadow = TemplateShadow;
        var ScopicTemplateShadow = /** @class */ (function (_super) {
            __extends(ScopicTemplateShadow, _super);
            function ScopicTemplateShadow(dom, scop) {
                var _this = _super.call(this, dom) || this;
                _this.scop = scop;
                _this.cnt = new Corelib_1.bind.Controller(_this);
                return _this;
            }
            Object.defineProperty(ScopicTemplateShadow.prototype, "Controller", {
                get: function () { return this.cnt; },
                enumerable: true,
                configurable: true
            });
            ScopicTemplateShadow.prototype.setDataContext = function (data) { if (this.scop)
                this.scop.Value = data; };
            ScopicTemplateShadow.prototype.getDataContext = function () { return this.scop ? this.scop.Value : null; };
            ScopicTemplateShadow.prototype.initialize = function () {
                if (this.scop == undefined) {
                    var c = this._view.getAttribute('db-bind');
                    if (c)
                        if (c.indexOf('$') === 0)
                            this.scop = Corelib_1.bind.Scop.Create(c); // bind.NamedScop.Create(c.substring(1));
                }
                var oldAttribute = this._view.getAttribute('db-bind');
                this._view.setAttribute('db-bind', '~' + Corelib_1.bind.AnonymouseScop.Register(this.scop) + (oldAttribute && oldAttribute != '' ? '.' + oldAttribute : ''));
                this.cnt.processHowEver = true;
                this.cnt.View = this._view;
            };
            ScopicTemplateShadow.prototype.Check = function (c) {
                return false;
            };
            Object.defineProperty(ScopicTemplateShadow.prototype, "Scop", {
                get: function () { return this.scop; },
                enumerable: true,
                configurable: true
            });
            ScopicTemplateShadow.prototype.getScop = function () { return this.scop; };
            return ScopicTemplateShadow;
        }(TemplateShadow));
        UI.ScopicTemplateShadow = ScopicTemplateShadow;
        var EScopicTemplateShadow = /** @class */ (function () {
            function EScopicTemplateShadow(control, scop) {
                this.control = control;
                this.scop = scop;
                this.cnt = new Corelib_1.bind.Controller(control);
                this.initialize();
            }
            Object.defineProperty(EScopicTemplateShadow.prototype, "Controller", {
                get: function () { return this.cnt; },
                enumerable: true,
                configurable: true
            });
            EScopicTemplateShadow.prototype.setDataContext = function (data) { if (this.scop)
                this.scop.Value = data; };
            EScopicTemplateShadow.prototype.getDataContext = function () { return this.scop ? this.scop.Value : null; };
            EScopicTemplateShadow.prototype.initialize = function () {
                if (this.scop == undefined) {
                    var c = this.control.View.getAttribute('db-bind');
                    if (c)
                        if (c.indexOf('$') === 0)
                            this.scop = Corelib_1.bind.Scop.Create(c);
                }
                var oldAttribute = this.control.View.getAttribute('db-bind');
                this.cnt.Scop = this.scop;
                this.control.View.setAttribute('db-bind', '~' + Corelib_1.bind.AnonymouseScop.Register(this.scop) + (oldAttribute && oldAttribute != '' ? '.' + oldAttribute : ''));
                this.cnt.processHowEver = true;
                this.cnt.View = this.control.View;
            };
            EScopicTemplateShadow.prototype.Check = function (c) {
                return false;
            };
            Object.defineProperty(EScopicTemplateShadow.prototype, "Scop", {
                get: function () { return this.scop; },
                enumerable: true,
                configurable: true
            });
            EScopicTemplateShadow.prototype.getScop = function () { return this.scop; };
            return EScopicTemplateShadow;
        }());
        UI.EScopicTemplateShadow = EScopicTemplateShadow;
        var Template = /** @class */ (function () {
            function Template() {
            }
            return Template;
        }());
        UI.Template = Template;
        var HtmlTemplate = /** @class */ (function () {
            function HtmlTemplate(dom, asTemplate) {
                this.dom = dom;
                this.asTemplate = !!asTemplate;
                Object.freeze(this);
            }
            //private template: mvc.ITemplate;
            /**
            *   if(data is scop) scop=data;
            *   if(data is undefined) scop=null;
            *   else scop=new ScopValue(data);
            **/
            HtmlTemplate.prototype.CreateShadow = function (data) {
                return new ScopicTemplateShadow(this.asTemplate ? this.dom.cloneNode(true) : this.dom, data instanceof Corelib_1.bind.Scop ? data : (data === undefined ? undefined : new Corelib_1.bind.ValueScop(data)));
            };
            return HtmlTemplate;
        }());
        UI.HtmlTemplate = HtmlTemplate;
        var ScopicTemplate = /** @class */ (function () {
            function ScopicTemplate(templatePath) {
                this.template = typeof templatePath === 'string' ? Corelib_1.mvc.MvcDescriptor.Get(templatePath) : templatePath;
                if (this.template == null) {
                    throw new $Error("the template { " + templatePath + " } was not found");
                }
            }
            /**
            *   if(data is scop) scop=data;
            *   if(data is undefined) scop=null;
            *   else scop=new ScopValue(data);
            **/
            ScopicTemplate.prototype.CreateShadow = function (data) {
                return new ScopicTemplateShadow(this.template.Create(), data instanceof Corelib_1.bind.Scop ? data : (data === undefined ? undefined : new Corelib_1.bind.ValueScop(data)));
            };
            return ScopicTemplate;
        }());
        UI.ScopicTemplate = ScopicTemplate;
        var actions;
        function OnItemClicked(s, e, t) {
            e.stopPropagation();
            e.preventDefault();
            t.Select(s);
        }
        var TControl = /** @class */ (function (_super) {
            __extends(TControl, _super);
            function TControl(itemTemplate, data) {
                var _this = _super.call(this, null) || this;
                _this.data = data;
                _this._onCompiled = new Corelib_1.bind.EventListener(_this, true);
                _this.compiled = false;
                _this._template = TControl.ToTemplate(itemTemplate, false);
                if (_this._template == null) { }
                _this.Shadow = _this._template.CreateShadow(data === TControl.Me ? _this : data);
                _this.Shadow.Parent = _this;
                _this._view = _this.Shadow.View;
                return _this;
            }
            TControl.ToTemplate = function (itemTemplate, asTemplate) {
                if (itemTemplate instanceof Template)
                    return itemTemplate;
                else if (itemTemplate instanceof HTMLElement)
                    return new HtmlTemplate(itemTemplate, asTemplate);
                else
                    return new ScopicTemplate(ListAdapter._getTemplate(itemTemplate));
            };
            TControl.prototype.OnFullInitialized = function () {
                var c = this.Shadow.Controller;
                c && (c.OnCompiled = { Owner: this, Invoke: this._onTemplateCompiled });
                _super.prototype.OnFullInitialized.call(this);
            };
            TControl.prototype._onTemplateCompiled = function (cnt) {
                this.compiled = true;
                this.OnCompileEnd(cnt);
                this._onCompiled.PInvok(this, [this, cnt]);
            };
            TControl.prototype.OnCompileEnd = function (cnt) {
            };
            Object.defineProperty(TControl.prototype, "Data", {
                get: function () { return this.Shadow.getDataContext(); },
                set: function (v) { this.Shadow.setDataContext(v); },
                enumerable: true,
                configurable: true
            });
            TControl.prototype.getScop = function () { return this.Shadow instanceof ScopicTemplateShadow ? this.Shadow.Scop : null; };
            TControl.prototype.initialize = function () {
            };
            Object.defineProperty(TControl.prototype, "OnCompiled", {
                set: function (m) {
                    if (this.compiled)
                        m(this);
                    else
                        this._onCompiled.On = m;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TControl.prototype, "IsCompiled", {
                get: function () {
                    return this.compiled;
                },
                enumerable: true,
                configurable: true
            });
            TControl.Me = new Object();
            return TControl;
        }(UI.JControl));
        UI.TControl = TControl;
        window.TConstrol = TControl;
        var ListAdapter = /** @class */ (function (_super) {
            __extends(ListAdapter, _super);
            function ListAdapter(template, itemTemplate, data, getSourceFromScop) {
                var _this = _super.call(this, template || document.createElement('div'), data) || this;
                _this.garbage = [];
                _this.AcceptNullValue = true;
                _this.OnItemSelected = new Corelib_1.bind.EventListener('');
                _this.OnItemInserted = new Corelib_1.bind.EventListener('');
                _this.OnItemRemoved = new Corelib_1.bind.EventListener('');
                _this.sli = { Owner: _this, Invoke: _this.OnSourceChanged };
                _this.count = 0;
                var dom = _this._view;
                var x = $('[db-content]', dom)[0] || dom;
                var attSI = $('[attach-SelectedItem]', dom)[0];
                if (attSI)
                    _this.AttachSelectedItem(attSI);
                if (getSourceFromScop)
                    _this.getSourceFromScop(x);
                _this._content = new UI.DivControl(x);
                var itemStyle = dom.getAttribute('item-style') || x.getAttribute('item-style');
                if (itemStyle)
                    _this.ItemStyle = itemStyle.split(' ');
                _this.Template = TControl.ToTemplate(itemTemplate || ListAdapter.getTemplate(x) || _this._content.View.getAttribute('item-template') || dom.getAttribute('item-template'), true);
                _this._content.Parent = _this;
                return _this;
            }
            ListAdapter.__fields__ = function () { return [ListAdapter.DPSelectedIndex, ListAdapter.DPTemplate, ListAdapter.DPSource]; };
            Object.defineProperty(ListAdapter.prototype, "Source", {
                get: function () { return this.get(ListAdapter.DPSource); },
                set: function (v) { this.set(ListAdapter.DPSource, v); },
                enumerable: true,
                configurable: true
            });
            ListAdapter.prototype.swap = function (i) {
                var s = this.Source;
                var l = s == null ? 0 : s.Count;
                var n = i;
                if (n < 0)
                    return -1;
                else if (n > l)
                    return l;
                return i;
            };
            Object.defineProperty(ListAdapter.prototype, "SelectedIndex", {
                get: function () { return this.get(ListAdapter.DPSelectedIndex); },
                set: function (v) { this.set(ListAdapter.DPSelectedIndex, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ListAdapter.prototype, "ItemStyle", {
                get: function () {
                    return this.get(ListAdapter.DPItemStyle);
                },
                set: function (v) {
                    this.set(ListAdapter.DPItemStyle, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ListAdapter.prototype, "Template", {
                get: function () {
                    return this.get(ListAdapter.DPTemplate);
                },
                set: function (v) {
                    this.set(ListAdapter.DPTemplate, v);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ListAdapter.prototype, "Content", {
                get: function () { return this._content; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ListAdapter.prototype, "SelectedChild", {
                get: function () { return this._selectedItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ListAdapter.prototype, "SelectedItem", {
                get: function () { return this._selectedItem == null ? undefined : this._selectedItem.getDataContext(); },
                enumerable: true,
                configurable: true
            });
            ListAdapter.prototype.OnSelectedIndexChanged = function (_old, _new) {
                var x = this._content.getChild(_new); // this._selectedItem;
                var lx = this._content.getChild(_old); // this._selectedItem;
                var li = _old;
                if (lx)
                    lx.disapplyStyle('active');
                if (x)
                    x.applyStyle('active');
                this._selectedItem = x;
                if (x !== lx) {
                    this.OnItemSelected.Invoke('', [this, this.SelectedIndex, x, li, lx]);
                }
            };
            ListAdapter.prototype.Select = function (t) {
                this.SelectedIndex = this._content.IndexOf(t);
            };
            ListAdapter.prototype.SelectItem = function (t) {
                var s = this.Source;
                if (s)
                    this.SelectedIndex = s.IndexOf(t);
            };
            ListAdapter._getTemplate = function (template) {
                switch (typeof template) {
                    case 'string':
                        return Corelib_1.mvc.MvcDescriptor.Get(template);
                    case 'function':
                        return Corelib_1.mvc.MvcDescriptor.GetByType(template).Get(0);
                    default:
                        if (template instanceof Corelib_1.mvc.ITemplate)
                            return template;
                        var c = Corelib_1.mvc.MvcDescriptor.GetByType(template);
                        return c ? c.Get(0) : undefined;
                }
            };
            ListAdapter._getTemplateShadow = function (template) {
                if (template instanceof HTMLElement)
                    return template;
                var t = ListAdapter._getTemplate(template);
                return t == undefined ? document.createElement('div') : t.Create();
                ;
            };
            ListAdapter.ctor = function () {
                actions = [this.prototype.OnAdd, this.prototype.OnRemove, this.prototype.OnReplace, this.prototype.OnClear, this.prototype.Reset];
            };
            ListAdapter.getFirstChild = function (dom) {
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
            ListAdapter.getTemplate = function (d) {
                var t = d.children;
                for (var i = 0, l = t.length; i < l; i++) {
                    var x = t[i];
                    if (Corelib_1.basic.polyfill.IsTemplate(x)) {
                        var w = ListAdapter.getFirstChild(x.content);
                        x.remove();
                        return w;
                    }
                }
            };
            ListAdapter.prototype.getSourceFromScop = function (x) {
                x.setAttribute('db-cmd', Corelib_1.ScopicCommand.Register({ Invoke: this.CmdExecuter, Owner: this }));
            };
            ListAdapter.prototype.CmdExecuter = function (n, d, s) {
                Corelib_1.ScopicCommand.Delete(n);
                this._scop = s;
                //s.OnPropertyChanged(bind.Scop.DPValue, function (s, e) { this.Source = e._new; }, this);
                this.Source = s.Value;
                this.RlSourceScop = new Corelib_1.bind.TwoBind(Corelib_1.bind.BindingMode.TwoWay, s, this, Corelib_1.bind.Scop.DPValue, ListAdapter.DPSource);
                this.Source = s.Value;
            };
            ListAdapter.prototype.AttachSelectedItem = function (x) {
                x.setAttribute('db-cmd', Corelib_1.ScopicCommand.Register({ Invoke: this.CmdAttacheSelectedItemExecuter, Owner: this }));
            };
            ListAdapter.prototype.CmdAttacheSelectedItemExecuter = function (n, d, s) {
                Corelib_1.ScopicCommand.Delete(n);
                this.OnPropertyChanged(ListAdapter.DPSelectedIndex, function (s, e) {
                    this.s.Value = this.t.SelectedItem;
                }, { t: this, s: s });
                //this.RlSourceScop = new bind.TwoBind(bind.BindingMode.BiDirection, this, s, ListAdapter.DPSelectedIndex, bind.Scop.DPValue);
            };
            ListAdapter.prototype.initialize = function () {
                var _this = this;
                var s = this.Source;
                this.Content.OnInitialized = function (n) {
                    return _this.Reset(s ? new Corelib_1.utils.ListEventArgs(null, null, null, Corelib_1.collection.CollectionEvent.Reset, s.AsList()) : undefined);
                };
            };
            ListAdapter.prototype.OnSourceChanged = function (e) {
                actions[e.event].call(this, e);
            };
            ListAdapter.prototype.ReSelect = function () {
                var i = this.get(ListAdapter.DPSelectedIndex);
                this.OnSelectedIndexChanged(i, this.swap(i));
            };
            Object.defineProperty(ListAdapter.prototype, "Scop", {
                get: function () {
                    if (!this._scop) {
                        var pscop = _super.prototype.getScop.call(this);
                        if (pscop)
                            return pscop;
                        this._scop = Corelib_1.bind.NamedScop.Create(null, this.Source);
                        return this._scop;
                    }
                },
                enumerable: true,
                configurable: true
            });
            ListAdapter.prototype._insert = function (item, i) {
                var _this = this;
                this.count++;
                var ch = this.garbage.pop();
                var t = this.Template;
                if (ch === undefined) {
                    ch = t == null ? TemplateShadow.Create(item) : this.Template.CreateShadow(item);
                    var sc = ch.getScop();
                    if (sc && typeof sc["setParent"] === 'function')
                        sc.setParent(this.Scop);
                }
                else
                    ch.setDataContext(item);
                if (i)
                    this.Insert(ch, i);
                else
                    this.Add(ch);
                if (i == undefined)
                    i = this.Source.Count - 1;
                var h = ch.__events;
                if (h != undefined)
                    h.Dispose();
                ch.__events = ch.addEventListener('click', OnItemClicked, this);
                var c = ch.View.classList;
                if (this.ItemStyle)
                    c.add.apply(c, this.ItemStyle);
                this.ReSelect();
                this.OnItemInserted.Invok('', function (f) { return f(_this, i, item, ch); });
            };
            ListAdapter.prototype._remove = function (item, i) {
                var _this = this;
                var ch = this._content.getChild(i);
                if (!ch)
                    return;
                this.garbage.push(ch);
                this.count--;
                ch.disapplyStyle('active');
                this._content.RemoveAt(i, false);
                var h = ch.__events;
                if (h != undefined) {
                    h.Dispose();
                    ch.__events = undefined;
                }
                var c = ch.View.classList;
                if (this.ItemStyle)
                    c.remove.apply(c, this.ItemStyle);
                this.ReSelect();
                this.OnItemRemoved.Invok('', function (f) { return f(_this, i, item, ch); });
            };
            ListAdapter.prototype.OnAdd = function (e) {
                this._insert(e.newItem, e.startIndex);
            };
            ListAdapter.prototype.OnClear = function (e) {
                this.SelectedIndex = -1;
                this.garbage.push.apply(this.garbage, this.CloneChildren());
                if (e && e.collection && this.count > 0)
                    for (var i = e.collection.length - 1; i >= 0; i--)
                        this._remove(e.collection[i], i);
                this.count = 0;
            };
            ListAdapter.prototype.OnRemove = function (e) {
                this._remove(e.oldItem, e.startIndex);
            };
            ListAdapter.prototype.OnReplace = function (e) {
                this._content.getChild(e.startIndex).setDataContext(e.newItem);
            };
            ListAdapter.prototype.Reset = function (e) {
                var c = this.Source;
                this.OnClear(e);
                if (c)
                    for (var i = 0, l = c.Count; i < l; i++)
                        this._insert(c.Get(i), i);
            };
            ListAdapter.prototype.clearGarbage = function () {
                for (var i = 0, l = this.garbage.length; i < l; i++)
                    this.garbage[i].Dispose();
                this.garbage.length = 0;
            };
            ListAdapter.prototype.Recycle = function () {
                this.clearGarbage();
                this.Clear();
                this.Reset();
            };
            ListAdapter.prototype.Dispose = function () {
                var h = this.OnDispose();
                if (h === null)
                    return;
                this.Source.Unlisten = this.sli;
                this.sli = null;
                this.clearGarbage();
                this._content.Dispose();
                this._content = null;
                _super.prototype.Dispose.call(this);
                if (!h)
                    this.DisposingStat = 2;
            };
            ListAdapter.prototype.Add = function (child) {
                this._content.Add(child);
                return this;
            };
            ListAdapter.prototype.AddRange = function (children) {
                this._content.AddRange(children);
                return this;
            };
            ListAdapter.prototype.Remove = function (child, dispose) {
                return this._content.Remove(child);
            };
            ListAdapter.prototype.RemoveAt = function (i, dispose) {
                return this._content.RemoveAt(i, dispose);
            };
            ListAdapter.prototype.Clear = function (dispose) {
                var c = this.Source;
                if (c) {
                    for (var i = this.Content.Count - 1; i >= 0; i--)
                        this._remove(c.Get(i), i);
                }
            };
            ListAdapter.prototype.Insert = function (c, i) {
                this._content.Insert(c, i);
                return this;
            };
            ListAdapter.prototype.CloneChildren = function () { return this._content.CloneChildren(); };
            ListAdapter.prototype.Check = function (c) {
                return c instanceof TemplateShadow;
            };
            ListAdapter.prototype.OnKeyDown = function (e) {
                if (e.keyCode == UI.Keys.Down)
                    this.SelectedIndex++;
                else if (e.keyCode == UI.Keys.Up)
                    this.SelectedIndex--;
                else if (e.keyCode == UI.Keys.End)
                    this.SelectedIndex = Number.MAX_VALUE;
                else if (e.keyCode == UI.Keys.Home)
                    this.SelectedIndex = -1;
                else
                    return false;
                e.preventDefault();
                e.stopPropagation();
                return true;
            };
            ListAdapter.DPSource = Corelib_1.bind.DObject.CreateField('Source', Corelib_1.collection.List, null, function (e) {
                if (e._new)
                    e._new.Listen = e.__this.sli;
                if (e._old)
                    e._old.Unlisten = e.__this.sli;
                if (e.__this.IsInit)
                    e.__this.Reset(e);
            }, function (e) {
                if (e.__this.IsInit)
                    e.__this.Clear();
            });
            ListAdapter.DPSelectedIndex = Corelib_1.bind.DObject.CreateField('SelectedIndex', Number, -1, function (e) { return e.__this.OnSelectedIndexChanged(e._old, e._new); }, function (e) {
                var s = e.__this.Source;
                var l = s == null ? 0 : s.Count;
                var n = e._new;
                if (n < 0)
                    e._new = e.__this.AcceptNullValue ? -1 : l > 0 ? 0 : -1;
                else if (n >= l)
                    e._new = e.__this.AcceptNullValue ? l : l - 1;
            });
            ListAdapter.DPItemStyle = Corelib_1.bind.DObject.CreateField('ItemStyle', Array, undefined, function (e) {
                var t = e.__this._content;
                var n = e._new;
                var o = e._old;
                for (var i = 0, l = t.Count; i < l; i++) {
                    var c = t.getChild(i).View.classList;
                    if (o)
                        c.remove.apply(c, o);
                    if (n)
                        c.add.apply(c, n);
                }
            });
            ListAdapter.DPTemplate = Corelib_1.bind.DObject.CreateField('Template', Object, null, function (e) { return e.__this.Recycle(); }, function (e) {
                if (e._new)
                    if (typeof e._new.CreateShadow !== 'function')
                        e.IsValid = false;
            });
            return ListAdapter;
        }(TControl));
        UI.ListAdapter = ListAdapter;
        var Spinner = /** @class */ (function (_super) {
            __extends(Spinner, _super);
            function Spinner(test) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.isStarted = false;
                return _this;
            }
            Spinner.prototype.initialize = function () {
                this.container = document.createElement('div');
                this.circle = document.createElement('div');
                this.message = document.createElement('p');
                this.message.textContent = 'Wait';
                this.applyStyle('full-fixedlayout');
                this.container.classList.add('spinner');
                this.circle.classList.add('spinner-circle');
                this.message.classList.add('spinner-message');
                this.container.appendChild(this.circle);
                this.container.appendChild(this.message);
                this._view.appendChild(this.container);
            };
            Spinner.prototype.Start = function (logo) {
                this.OnInitialized = function (l) { return l.circle.classList.add('spinner-start'); };
                this.Parent = UI.Desktop.Current;
                this.Message = logo || 'Wait';
                document.body.appendChild(this.View);
                this.isStarted = true;
            };
            Spinner.prototype.Pause = function () {
                if (this.isStarted) {
                    this.Parent = null;
                    this.circle.classList.remove('spinner-start');
                    document.body.removeChild(this.View);
                }
                this.isStarted = false;
            };
            Object.defineProperty(Spinner.prototype, "Message", {
                set: function (v) { this.message.textContent = v; },
                enumerable: true,
                configurable: true
            });
            Spinner.Default = new Spinner(undefined);
            return Spinner;
        }(UI.JControl));
        UI.Spinner = Spinner;
        (function () {
            var e = document.getElementById('spinner');
            if (e) {
                e.parentElement.removeChild(e);
            }
            Spinner.Default.Start("Loadding");
        })();
        var t = Date.now();
        var RichMenu = /** @class */ (function (_super) {
            __extends(RichMenu, _super);
            function RichMenu(itemTemplate, data, parent) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.isOpen = false;
                _this._view.classList.add('full-fixedlayout1');
                _this._view.style.backgroundColor = 'transparent';
                if (itemTemplate)
                    _this.itemTemplate = TControl.ToTemplate(itemTemplate, false);
                if (parent === void 0)
                    _this.Parent = UI.Desktop.Current;
                else
                    _this.Parent = parent;
                if (data)
                    _this.OnInitialized = function (rm) { return rm.Data = data; };
                return _this;
            }
            RichMenu.prototype.initialize = function () {
                var _this = this;
                this.menu = new UI.Div().applyStyle('contextmenu', 'panel');
                this.adapter = new ListAdapter(document.createElement('div'), 'menu.simple').applyStyle('panel-body', 'verticalList');
                this.adapter.ItemStyle = ['focusable'];
                this.adapter.AcceptNullValue = true;
                this.Add(this.menu.Add(this.adapter));
                this.menu.View.style.backgroundColor = '#333';
                this.menu.View.style.color = 'white';
                this.adapter.OnItemSelected.On = function (x, k, j) {
                    if (k == -1)
                        return;
                    if (!_this.isOpen)
                        return;
                    _this.Close(true);
                    if (_this.i && j)
                        _this.i.Invoke.call(_this.i.Owner, _this, j.getDataContext());
                };
                this.menu.addEventListener('mouseleave', function (s, e, p) {
                    p.Close(false);
                }, this);
                this.menu.addEventListener('mouseenter', function (s, e, p) {
                    clearTimeout(p.timeout);
                }, this);
                this._view.style.zIndex = '2000000';
            };
            RichMenu.prototype.toInt = function (b) { return b === false ? 0 : b == null ? -0.5 : -1; };
            RichMenu.prototype.Open = function (e, callback, left, bottom) {
                var _this = this;
                if (this.isOpen == true)
                    return;
                this.adapter.SelectedIndex = -1;
                this.menu.disapplyStyle('chide');
                var mn = this.menu.View;
                var v = this.menu.View.style;
                e = { x: e.x, y: e.y };
                Corelib_1.thread.Dispatcher.call(this, function () {
                    var l = (_this.toInt(left) * mn.clientWidth + e.x);
                    var p = (_this.toInt(bottom) * mn.clientHeight + e.y);
                    v.left = (l < 0 ? 0 : l) + px;
                    v.top = (p < 0 ? 0 : p) + px;
                });
                this.adapter.SelectedIndex = -1;
                document.body.appendChild(this._view);
                this.i = callback;
                this.isOpen = true;
            };
            RichMenu.prototype.Close = function (imediate) {
                var _this = this;
                if (this.isOpen == false)
                    return;
                if (imediate) {
                    this.isOpen = null;
                    this.menu.applyStyle('chide');
                    setTimeout(function () {
                        _this.isOpen = false;
                        _this._view.remove();
                    }, 500);
                    this.adapter.SelectedIndex = -1;
                }
                else
                    this.timeout = setTimeout(function (p) { return p.Close(true); }, 1500, this);
            };
            Object.defineProperty(RichMenu.prototype, "Data", {
                set: function (items) {
                    var a = this.adapter;
                    if (a.Source) {
                        a.Source.Clear();
                        a.Source.AddRange(items);
                    }
                    else
                        a.Source = new Corelib_1.collection.List(Object, items);
                },
                enumerable: true,
                configurable: true
            });
            return RichMenu;
        }(UI.JControl));
        UI.RichMenu = RichMenu;
        window.rm = RichMenu;
        window.rmt = function () {
            var rm = new RichMenu();
            rm.Parent = UI.Desktop.Current;
            rm.OnInitialized = function (rm) {
                rm.Data = ["File", "Save", "Close", "Discart"];
                document.addEventListener('click', function (e) {
                    ii = (ii + 1) % lst.length;
                    rm.Open(e, { Owner: null, Invoke: function (r, s) { } }, lst[ii], lst1[ii]);
                    e.stopPropagation();
                    e.preventDefault();
                });
            };
            var lst = [null, null, null, true, true, true, false, false, false];
            var lst1 = [null, true, false, null, true, false, null, true, false];
            var ii = 0;
        };
        var Location;
        (function (Location) {
            Location[Location["Left"] = 1] = "Left";
            Location[Location["Top"] = 2] = "Top";
            Location[Location["Right"] = 4] = "Right";
            Location[Location["Bottom"] = 8] = "Bottom";
            Location[Location["HCenter"] = 5] = "HCenter";
            Location[Location["VCenter"] = 10] = "VCenter";
            Location[Location["Center"] = 15] = "Center";
            Location[Location["TopLeft"] = 3] = "TopLeft";
        })(Location = UI.Location || (UI.Location = {}));
        var ExContextMenu = /** @class */ (function (_super) {
            __extends(ExContextMenu, _super);
            function ExContextMenu(items) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.dic = new Corelib_1.collection.Dictionary('');
                _this.list = new UI.ListAdapter("templates.contextmenu", undefined, _this, true);
                _this.OnAction = new Corelib_1.bind.EventListener('', false);
                _this.location = Location.TopLeft;
                _this.Items = new Corelib_1.collection.List(Object, items);
                return _this;
            }
            ExContextMenu.__fields__ = function () { return [this.DPTitle, this.DPItems]; };
            Object.defineProperty(ExContextMenu, "NextZIndex", {
                get: function () { return ++this.zIndex; },
                enumerable: true,
                configurable: true
            });
            ExContextMenu.prototype.initialize = function () {
                this.applyStyle("fit");
                this.list.OnItemSelected.Add(this.OnItemSelected.bind(this));
                this.list.OnItemInserted.Add(this.OnItemInserted.bind(this));
                this.list.OnItemRemoved.Add(this.OnItemRemoved.bind(this));
                this.list.applyStyle('shadow');
                this._view.addEventListener('mousedown', this);
                this.Add(this.list);
            };
            ExContextMenu.prototype.OnItemSelected = function (lst, i, tmp, oldi, oldtmp) {
            };
            ExContextMenu.prototype.OnItemInserted = function (lst, i, data, cnt) {
                var t = { p: this, cnt: cnt, data: data, handleEvent: function (e) { this.p.Action(this.cnt, this.data, e); } };
                this.dic.Set(cnt, t);
                cnt.applyStyle('focusable');
                cnt.View.addEventListener('click', t);
            };
            ExContextMenu.prototype.OnItemRemoved = function (lst, i, data, cnt) {
                var t = this.dic.Get(cnt);
                var v = cnt.View;
                v.removeEventListener('click', t);
                this.dic.Remove(cnt);
            };
            ExContextMenu.prototype.Action = function (cnt, data, e) {
                e.stopPropagation();
                e.preventDefault();
                this.OnAction.PInvok('', [this, data]);
                this.Close();
            };
            ExContextMenu.prototype.ShowForTarget = function () {
                var v = this.target;
                v = v instanceof HTMLElement ? v : v instanceof UI.JControl ? v.View : null;
                if (v == null)
                    return;
                var x = v.offsetLeft + v.offsetWidth;
                var y = v.offsetTop + v.offsetHeight;
                this.Show(x, y + 7);
            };
            ExContextMenu.prototype.Show = function (x, y) {
                var _this = this;
                this.list.SelectedIndex = -1;
                var ths = this.list;
                this.disapplyStyle('hidden');
                this._view.style.zIndex = ExContextMenu.NextZIndex.toString();
                if (!this.parent)
                    this.Parent = UI.Desktop.Current;
                document.body.appendChild(this._view);
                Corelib_1.thread.Dispatcher.call(this, function () {
                    var mn = _this.list.View;
                    var l = (_this.HorizontalFraction * mn.clientWidth + x);
                    var p = (_this.VerticalFraction * mn.clientHeight + y);
                    var v = _this.list.View.style;
                    var tv = _this.list.View;
                    var wv = { w: _this.View.clientWidth, h: _this.View.clientHeight };
                    l = l < 0 ? 0 : l;
                    p = p < 0 ? 0 : p;
                    l = l + tv.clientWidth > wv.w ? wv.w - tv.clientWidth : l;
                    p = p + tv.clientHeight > wv.h ? wv.h - tv.clientHeight : p;
                    v.left = l + px;
                    v.top = p + px;
                });
            };
            ExContextMenu.prototype.toInt = function (b) { return b === false ? 0 : b == null ? -0.5 : -1; };
            Object.defineProperty(ExContextMenu.prototype, "HorizontalFraction", {
                get: function () {
                    var v = this.location;
                    if ((v & Location.HCenter) == Location.HCenter)
                        return -0.5;
                    if ((v & Location.Left) == Location.Left)
                        return 0;
                    return -1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ExContextMenu.prototype, "VerticalFraction", {
                get: function () {
                    var v = this.location;
                    if ((v & Location.VCenter) == Location.VCenter)
                        return -0.5;
                    if ((v & Location.Top) == Location.Top)
                        return 0;
                    return -1;
                },
                enumerable: true,
                configurable: true
            });
            ExContextMenu.prototype.handleEvent = function (e) {
                switch (e.type) {
                    case 'mousedown':
                        if (e.srcElement == this._view)
                            this.Close();
                        return;
                    case 'contextmenu':
                        this.OnContextMenu(this.target instanceof UI.JControl ? this.target : null, this.target instanceof HTMLElement ? this.target : this.target.View, e);
                        return;
                }
            };
            ExContextMenu.prototype.OnContextMenu = function (target, dom, e) {
                this.Show(e.x, e.y);
                e.preventDefault();
                e.stopPropagation();
            };
            ExContextMenu.prototype.Close = function () {
                this.applyStyle('hidden');
                this._view.remove();
            };
            Object.defineProperty(ExContextMenu.prototype, "Target", {
                set: function (v) {
                    if (this.target) {
                        var ov = this.target instanceof HTMLElement ? this.target : this.target.View;
                        ov.removeEventListener('contextmenu', this);
                        this.target = null;
                    }
                    if (!v)
                        return;
                    var nv = v instanceof HTMLElement ? v : v.View;
                    nv.addEventListener('contextmenu', this);
                    this.target = v;
                },
                enumerable: true,
                configurable: true
            });
            ExContextMenu.DPTitle = Corelib_1.bind.DObject.CreateField('Title', String, 'Menu');
            ExContextMenu.DPItems = Corelib_1.bind.DObject.CreateField('Items', Corelib_1.collection.List);
            ExContextMenu.zIndex = 20000;
            return ExContextMenu;
        }(UI.JControl));
        UI.ExContextMenu = ExContextMenu;
        var ContextMenu = /** @class */ (function (_super) {
            __extends(ContextMenu, _super);
            function ContextMenu(items) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.dic = new Corelib_1.collection.Dictionary('');
                _this.itemChangedDlg = { Invoke: _this.SourceChanged, Owner: _this };
                _this.OnItemSelected = function (m) {
                    this.OnMenuItemSelected.Invoke(this.OnItemSelected, [this, m]);
                }.bind(_this);
                _this.OnMenuItemSelected = new Corelib_1.bind.EventListener(_this.OnItemSelected);
                if (items)
                    for (var i = 0; i < items.length; i++) {
                        var e = items[i];
                        if (e instanceof UI.MenuItem)
                            continue;
                        var c = items[i] = new UI.CItem(e, e, '#', null);
                        c.Content.applyStyle('col-xs-12');
                    }
                _this.Items = new Corelib_1.collection.List(UI.CItem, items);
                return _this;
            }
            ContextMenu.prototype.initialize = function () {
                this.applyStyle('contextmenu');
                this.reset();
                this.Items.Listen = this.itemChangedDlg;
            };
            ContextMenu.prototype.SourceChanged = function (e) {
                switch (e.event) {
                    case Corelib_1.collection.CollectionEvent.Added:
                        this.add(e.newItem);
                        break;
                    case Corelib_1.collection.CollectionEvent.Replace:
                        this.replace(e.oldItem, e.newItem);
                        break;
                    case Corelib_1.collection.CollectionEvent.Removed:
                        this.remove(e.oldItem);
                        break;
                    case Corelib_1.collection.CollectionEvent.Cleared:
                        this.clear();
                        break;
                    case Corelib_1.collection.CollectionEvent.Reset:
                        this.clear();
                        this.reset();
                        break;
                }
            };
            ContextMenu.prototype.add = function (t) {
                var jc = new UI.MenuItem(t).applyStyle('row');
                _super.prototype.Add.call(this, jc);
                this.dic.Set(t, jc);
                t.OnItemSelected = this.OnItemSelected;
            };
            ContextMenu.prototype.remove = function (t) {
                _super.prototype.Remove.call(this, this.dic.Remove(t), true);
            };
            ContextMenu.prototype.replace = function (o, n) {
                throw 'not implimented';
            };
            ContextMenu.prototype.clear = function () {
                var d = this.dic;
                for (var i = d.Count - 1; i >= 0; i--)
                    _super.prototype.Remove.call(this, this.dic.RemoveAt(i).Value, true);
            };
            ContextMenu.prototype.reset = function () {
                for (var i = 0, l = this.Items.Count; i < l; i++) {
                    var t = this.Items.Get(i);
                    this.add(t);
                }
            };
            ContextMenu.prototype.Add = function (j) {
                throw '';
            };
            ContextMenu.prototype.AddRange = function (citem) {
                throw '';
            };
            ContextMenu.prototype.Remove = function (j, dispose) {
                return false;
            };
            ContextMenu.prototype.Show = function (x, y) {
                this.disapplyStyle('hidden');
                var s = this._view.style;
                s.left = x + "px";
                s.top = y + "px";
                this._view.addEventListener('mouseout', this);
                this._view.addEventListener('mousein', this);
                if (!this.parent)
                    this.Parent = UI.Desktop.Current;
                document.body.appendChild(this._view);
            };
            ContextMenu.prototype.handleEvent = function (e) {
                switch (e.type) {
                    case 'mouseout':
                        break;
                    case 'mousein':
                        clearTimeout(this.thrid);
                        break;
                    case 'contextmenu':
                        this.OnContextMenu(this.target, this.target instanceof HTMLElement ? this.target : this.target.View, e);
                        break;
                }
            };
            ContextMenu.prototype.OnContextMenu = function (target, dom, e) {
                this.Show(e.x, e.y);
                e.preventDefault();
                e.stopPropagation();
            };
            ContextMenu.prototype.timeout = function (t) {
                t.applyStyle('hidden');
                t._view.remove();
            };
            Object.defineProperty(ContextMenu.prototype, "Target", {
                set: function (v) {
                    if (this.target) {
                        var ov = this.target instanceof HTMLElement ? this.target : this.target.View;
                        ov.removeEventListener('contextmenu', this);
                        this.target = null;
                    }
                    if (!v)
                        return;
                    var nv = v instanceof HTMLElement ? v : v.View;
                    nv.addEventListener('contextmenu', this);
                    this.target = v;
                },
                enumerable: true,
                configurable: true
            });
            return ContextMenu;
        }(UI.JControl));
        UI.ContextMenu = ContextMenu;
        window.cm = ContextMenu;
        var Gage = /** @class */ (function () {
            function Gage() {
            }
            Gage.prototype.initialize = function () {
            };
            Gage.deg2str = function (diam, n) {
                return n * (2 * Math.PI * diam) / 360;
            };
            Gage.createDashArray = function (diam, degs) {
                var t = '';
                var c = (2 * Math.PI * diam) / 360;
                for (var i = 0; i < degs.length; i++)
                    t += (i !== 0 ? ',' : '') + (c * degs[i]) + 'px';
            };
            return Gage;
        }());
        UI.Gage = Gage;
        var CostumizedShadow = /** @class */ (function (_super) {
            __extends(CostumizedShadow, _super);
            function CostumizedShadow(dom, data) {
                var _this = _super.call(this, dom) || this;
                _this.data = data;
                _this.setDataContext(_this.data);
                return _this;
            }
            CostumizedShadow.prototype.setDataContext = function (data) { this.data = data; this._view.textContent = this._view.label = data ? data.toString() : ""; };
            CostumizedShadow.prototype.getDataContext = function () { return this.data; };
            CostumizedShadow.prototype.initialize = function () {
                this.setDataContext(this.data);
            };
            CostumizedShadow.prototype.getScop = function () { return this.data instanceof Corelib_1.bind.Scop ? this.data : null; };
            return CostumizedShadow;
        }(TemplateShadow));
        UI.CostumizedShadow = CostumizedShadow;
        var CostumizedTemplate = /** @class */ (function (_super) {
            __extends(CostumizedTemplate, _super);
            function CostumizedTemplate() {
                return _super.call(this) || this;
            }
            CostumizedTemplate.prototype.CreateShadow = function (data) {
                return new CostumizedShadow(document.createElement('option'), data);
            };
            return CostumizedTemplate;
        }(Template));
        UI.CostumizedTemplate = CostumizedTemplate;
        var ComboBox = /** @class */ (function (_super) {
            __extends(ComboBox, _super);
            function ComboBox(dom, DataSource) {
                var _this = _super.call(this, dom || document.createElement('select'), new CostumizedTemplate()) || this;
                _this.Source = DataSource;
                return _this;
            }
            return ComboBox;
        }(ListAdapter));
        UI.ComboBox = ComboBox;
        var TreeComboBox = /** @class */ (function (_super) {
            __extends(TreeComboBox, _super);
            function TreeComboBox(tree, getString) {
                var _this = _super.call(this, document.createElement('select')) || this;
                _this.tree = tree;
                _this.getString = getString;
                return _this;
            }
            TreeComboBox.prototype.initialize = function () {
                this.Reset();
            };
            TreeComboBox.prototype.Reset = function () {
                var t = this.tree;
                t.Reset();
                var b = t.getBases();
                for (var i = 0; i < b.length; i++) {
                    this.add(this._view, b[i]);
                }
                this._view.innerHTML = this._view.innerHTML;
            };
            TreeComboBox.prototype.add = function (cont, node) {
                if (node.children.length === 0) {
                    var t = document.createElement('option');
                    t.label = this.getString(node.Value);
                    t.textContent = t.label;
                    node.param = t;
                    cont.appendChild(t);
                    return;
                }
                var pt = document.createElement('optgroup');
                pt.label = this.getString(node.Value);
                var t = document.createElement('option');
                t.label = this.getString(node.Value);
                t.textContent = t.label;
                //pt.appendChild(t);            
                node.param = [pt, t];
                for (var i = 0; i < node.children.length; i++)
                    this.add(pt, node.children[i]);
                cont.appendChild(pt);
            };
            return TreeComboBox;
        }(UI.JControl));
        UI.TreeComboBox = TreeComboBox;
        var help;
        (function (help) {
            function createHeader(hd, cols) {
                for (var i = 0; i < cols.length; i++) {
                    var col = cols[i];
                    if (typeof col.Header === 'string')
                        col.Header = { Content: col.Header };
                    hd.appendChild(generateCell(col.Header, 'th'));
                }
                return hd;
            }
            help.createHeader = createHeader;
            function createTemplate(cols, tmp) {
                tmp = tmp || document.createElement('tr');
                for (var i = 0; i < cols.length; i++) {
                    var col = cols[i];
                    if (typeof col.Header === 'string')
                        col.Header = { Content: col.Header };
                    tmp.appendChild(generateCell(col.Cell, 'td'));
                }
                return tmp;
            }
            help.createTemplate = createTemplate;
            function generateCell(h, stype) {
                var type = HTMLTableCellElement;
                var hdr;
                if (h.Content == null)
                    h.Content = "";
                if (h.Content instanceof type) {
                    hdr = h.Content;
                }
                else if (h.Content instanceof Node) {
                    hdr = document.createElement(stype);
                    hdr.appendChild(h.Content);
                }
                else {
                    hdr = document.createElement(stype);
                    h.ContentAsHtml ? (hdr.innerHTML = String(h.Content)) : (hdr.innerText = String(h.Content));
                }
                if (h.Attributes)
                    for (var n in h.Attributes) {
                        var isb = false;
                        var o = h.Attributes[n];
                        if (typeof o === 'object') {
                            if (hdr.hasAttribute(n)) {
                                var t = o.values.slice();
                                t.unshift(hdr.getAttribute(n));
                                hdr.setAttribute(n, t.join(o.spliter));
                            }
                            else
                                hdr.setAttribute(n, o.values.join(o.spliter));
                        }
                        else
                            hdr.setAttribute(n, o);
                    }
                return hdr;
            }
            help.generateCell = generateCell;
        })(help = UI.help || (UI.help = {}));
    })(UI = exports.UI || (exports.UI = {}));
    var SegmentRunner = /** @class */ (function () {
        function SegmentRunner(start, end) {
            this.Disposed = [];
            this.Last = this.Writer = new Segment(null, start, end);
        }
        SegmentRunner.prototype.Next = function () {
            var s = this.Reader;
            while (s)
                if (this.Cursor <= s.End) {
                    return this.Cursor++;
                }
                else {
                    this.Disposed.push(s);
                    this.Reader = s = this.Reader.NextSegment;
                }
            return undefined;
        };
        return SegmentRunner;
    }());
    var Iterator = /** @class */ (function () {
        function Iterator() {
            this.runner = new SegmentRunner(0, 1999);
            this.array = new Array(2000);
        }
        Iterator.prototype.Read = function () {
            return this.runner.Next();
        };
        Iterator.prototype.Write = function () {
        };
        return Iterator;
    }());
    var Segment = /** @class */ (function () {
        function Segment(parent, Start, End) {
            if (Start === void 0) { Start = 0; }
            if (End === void 0) { End = 0; }
            this.Start = Start;
            this.End = End;
            if (parent)
                parent.NextSegment = this;
        }
        return Segment;
    }());
    //class OArray {
    //    private wcurs = 0; private rcurs = 0;
    //    private Indexer: Segment;
    //    public Next() {
    //        if (this.Indexer) {
    //            this
    //        }
    //    }
    //}
    (function (UI) {
        var Popup = /** @class */ (function (_super) {
            __extends(Popup, _super);
            function Popup(target) {
                var _this = _super.call(this, document.createElement('div')) || this;
                _this.target = target;
                return _this;
            }
            Popup.prototype.initialize = function () {
            };
            Popup.prototype.Close = function (valid) {
                this.applyStyle('ihide');
            };
            Popup.prototype.Open = function (acb) {
                if (this._isOpen)
                    return;
                this._isOpen = false;
                var l = this._view;
                l.classList.remove('ihide');
                var v = acb.View.getBoundingClientRect();
                l.style.left = v.left + "px";
                l.style.top = v.top + v.height + "px";
                l.style.width = v.width + "px";
                acb.Box.Text = (acb.Value || '').toString();
                acb.IsChanged = false;
            };
            return Popup;
        }(UI.JControl));
    })(UI = exports.UI || (exports.UI = {}));
    (function (UI) {
        var list;
        var filtred;
        var sf = new Filters_1.filters.list.LStringFilter();
        var fisc;
        var tm;
        var lto = false;
        function keyup() {
            list.SelectedIndex--;
            var sc = list.SelectedChild;
            if (sc)
                sc.View.scrollIntoView(false);
        }
        function keydown() {
            list.SelectedIndex++;
            var sc = list.SelectedChild;
            if (sc)
                sc.View.scrollIntoView(false);
        }
        function keyleft() {
            list.SelectedIndex -= 4;
            var sc = list.SelectedChild;
            if (sc)
                sc.View.scrollIntoView(false);
        }
        function keyright() {
            list.SelectedIndex += 4;
            var sc = list.SelectedChild;
            if (sc)
                sc.View.scrollIntoView(false);
        }
        function pageDown() {
            list.SelectedIndex += 8;
            var sc = list.SelectedChild;
            if (sc)
                sc.View.scrollIntoView(false);
        }
        function pageUp() {
            list.SelectedIndex -= 8;
            var sc = list.SelectedChild;
            if (sc)
                sc.View.scrollIntoView(false);
        }
        function del(e) {
            if (!isclosed)
                return others(e);
            if (e.shiftKey) {
                _ithis.Value = null;
                Close(true);
            }
        }
        function enter() {
            if (isclosed)
                return;
            fisc = false;
            Close(true);
        }
        function esc() { fisc = false; Close(false); _ithis.Box.View.accessKey; }
        function islisted(k) {
            if (k == 8)
                return false;
            return k < 33 || (k > 126 && k < 160);
        }
        function others(e) {
            if (islisted(e.keyCode))
                return;
            var lt = tm;
            var nt = Date.now();
            if (lto)
                return;
            setTimeout(function () {
                filtred.Filter.Patent = new Filters_1.filters.list.StringPatent(_ithis.Box.Text || '');
                lto = false;
            }, 200);
            lto = true;
        }
        function initPopup() {
            var ex = document.createElement('ul');
            ex.classList.add('popup', 'ihide');
            list = new UI.ListAdapter(ex, 'test.row');
            list.OnInitialized = function (list) { return list.Source = filtred; };
            list.Parent = UI.Desktop.Current;
            document.body.appendChild(list.View);
        }
        Corelib_1.mvc.Initializer.then(function (o) {
            var lt = Date.now();
            filtred = new Corelib_1.collection.ExList(null);
            filtred.Filter = sf;
            filtred.MaxResult = 10;
            initPopup();
            list.OnItemSelected.On = function (s, i, t) {
                if (i == -1)
                    return;
                fisc = true;
                //_ithis.Box.Text = (list.SelectedItem || '').toString();
                Corelib_1.thread.Dispatcher.call(_ithis.Box.View, _ithis.Box.View.focus);
            };
            list.Content.addEventListener('click', function (s, e, p) {
                fisc = true;
                if (lt - (lt = Date.now()) < -500)
                    return;
                else
                    lt = 0;
                _ithis.Value = list.SelectedItem || _ithis.Value;
                fisc = false;
                Close(false);
            }, list);
            list.Content.View.addEventListener('pointerenter', function () { return clearTimeout(to); });
            list.Content.View.onmouseleave = function (e) { if (!fisc)
                to = setTimeout(Close, 500, e); fisc = false; };
        });
        var fns = {
            //9: tab,
            40: keydown,
            38: keyup,
            37: keyleft,
            39: keyright,
            //46: del,
            13: enter,
            27: esc,
            33: pageUp,
            34: pageDown,
        };
        function Init(acb) {
            clearTimeout(to);
            UI.Desktop.Current.GetKeyControl(null, _onkeydown, [acb]);
            if (_ithis !== acb) {
                if (_ithis !== acb)
                    resetEvents(acb);
            }
        }
        function resetEvents(acb) {
            acb.IsChanged = false;
            _ithis = acb;
            filtred.Source = acb.DataSource;
            filtred.Filter.Patent = new Filters_1.filters.list.StringPatent(acb.Box.Text);
            if (okd)
                okd.Dispose();
            if (ofo)
                ofo.Dispose();
            tm = Date.now();
            lto = false;
            UI.Desktop.Current.GetKeyControl(null, _onkeydown, [acb]);
            //okd = acb.Box.addEventListener('keyup', onkeydown, acb);
            ofo = _ithis.Box.addEventListener('focusout', onfocus, null);
        }
        function relocate(acb) {
            var l = list.View;
            var v = acb.View.getBoundingClientRect();
            l.style.left = v.left + "px";
            l.style.top = v.top + v.height + "px";
            l.style.width = v.width + "px";
        }
        function onfocus(s, e, acb) {
            clearTimeout(to);
            to = setTimeout(focusOutImediate, 500, false);
            fisc = false;
        }
        function focusOutImediate(valid) {
            UI.Desktop.Current.ReleaseKeyControl();
            Close(valid);
        }
        function _onkeydown(e, acb) {
            if (isclosed)
                if (e.keyCode === 9 || e.keyCode === 13)
                    return true;
                else if (e.keyCode < 33 || (e.keyCode > 126 && e.keyCode < 160))
                    return false;
                else
                    Open(acb, true);
            else if (e.keyCode == 9) {
                fisc = false;
                Close(false);
                return true;
            }
            var t = (fns[e.keyCode] || others)(e, acb);
            return false;
        }
        function __onkeydown(s, e, acb) {
            UI.Desktop.Current.GetKeyControl(_ithis, _onkeydown, [_ithis]);
        }
        function onkeydown(s, e, acb) {
            e.preventDefault();
            e.cancelBubble = true;
            e.stopPropagation();
            if (isclosed)
                if (e.keyCode < 33 || (e.keyCode > 126 && e.keyCode < 160))
                    return;
                else
                    Open(acb, true);
            var t = (fns[e.keyCode] || others)(e, acb);
        }
        function Open(acb, forceOpen) {
            Init(acb);
            if (acb.AutoPopup || forceOpen) {
                isclosed = false;
                try {
                    list.SelectedIndex = 0;
                }
                catch (e) {
                }
                var l = list.View;
                l.classList.remove('ihide');
                relocate(acb);
            }
        }
        var isclosed = true;
        var to;
        var okd;
        var ofo;
        var _ithis;
        var zindex = 100000;
        function Close(valid) {
            if (fisc) {
                fisc = false;
                return;
            }
            isclosed = true;
            list.applyStyle('ihide');
            if (valid == true)
                _ithis.Value = list.SelectedItem;
            if (valid) {
                _ithis.Box.Text = (_ithis.Value || '').toString();
            }
            else {
                if (_ithis.Value != null)
                    _ithis.Box.Text = _ithis.Value.toString();
                else {
                    _ithis.Box.Text = "";
                }
            }
        }
        var AutoCompleteBox = /** @class */ (function (_super) {
            __extends(AutoCompleteBox, _super);
            function AutoCompleteBox(input) {
                var _this = _super.call(this, input) || this;
                _this.dataSource = new Corelib_1.collection.List(Object);
                return _this;
            }
            Object.defineProperty(AutoCompleteBox.prototype, "DataSource", {
                get: function () { return this.dataSource; },
                set: function (d) {
                    if (d === this.dataSource)
                        return;
                    this.dataSource.Clear();
                    if (d)
                        this.dataSource.AddRange(d.AsList());
                },
                enumerable: true,
                configurable: true
            });
            AutoCompleteBox.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.Box.View.addEventListener('focusin', function (e) { return Init(_this); });
            };
            return AutoCompleteBox;
        }(UI.ActionText));
        UI.AutoCompleteBox = AutoCompleteBox;
        var ProxyAutoCompleteBox = /** @class */ (function () {
            function ProxyAutoCompleteBox(Box, source) {
                this.Box = Box;
                this.callback = [];
                this.DataSource = source;
            }
            ProxyAutoCompleteBox.prototype.OnValueChanged = function (owner, invoke) {
                this.callback.push({ Invoke: invoke, Owner: owner });
            };
            Object.defineProperty(ProxyAutoCompleteBox.prototype, "View", {
                get: function () { return this.Box.View; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ProxyAutoCompleteBox.prototype, "Value", {
                get: function () { return this._value; },
                set: function (v) {
                    var ov = this._value;
                    if (v == ov)
                        return;
                    this._value = v;
                    this.Box.Text = v ? v.toString() : '';
                    for (var _i = 0, _a = this.callback; _i < _a.length; _i++) {
                        var t = _a[_i];
                        t.Invoke.call(t.Owner, this, ov, v);
                    }
                },
                enumerable: true,
                configurable: true
            });
            ProxyAutoCompleteBox.prototype.initialize = function () {
                var _this = this;
                this.Box.View.addEventListener('focusin', function (e) { return Init(_this); });
            };
            return ProxyAutoCompleteBox;
        }());
        UI.ProxyAutoCompleteBox = ProxyAutoCompleteBox;
    })(UI = exports.UI || (exports.UI = {}));
    (function (UI) {
        var Paginator = /** @class */ (function (_super) {
            __extends(Paginator, _super);
            function Paginator(countPerPage, dom) {
                var _this = _super.call(this, dom || document.createElement('div')) || this;
                _this.countPerPage = countPerPage;
                return _this;
            }
            Object.defineProperty(Paginator.prototype, "Filter", {
                get: function () { return this.paginationFilter; },
                enumerable: true,
                configurable: true
            });
            Paginator.prototype.initialize = function () {
                this.paginationFilter = new Filters_1.filters.list.SubListFilter();
                _super.prototype.Add.call(this, this.content = new UI.Div().applyStyle('row'));
                _super.prototype.Add.call(this, this.paginator = new UI.BiPagination().applyStyle('row'));
                this.paginator.OnPropertyChanged(UI.BiPagination.DPIndex, this.whenIndexChanged, this);
                this.paginationFilter.Patent = new Filters_1.filters.list.SubListPatent(0, this.countPerPage - 1);
            };
            Object.defineProperty(Paginator.prototype, "Content", {
                set: function (v) {
                    if (this._cnt)
                        this.content.Remove(this._cnt, true);
                    this._cnt = v;
                    if (v)
                        this.content.Add(v);
                },
                enumerable: true,
                configurable: true
            });
            Paginator.prototype.whenIndexChanged = function (b, e) {
                this.paginationFilter.Patent = new Filters_1.filters.list.SubListPatent(e._new * this.countPerPage, (e._new + 1) * this.countPerPage - 1);
            };
            Paginator.prototype.OnIndexChanged = function (ev) {
                return this.paginator.OnPropertyChanged(UI.BiPagination.DPIndex, ev, this);
            };
            Paginator.prototype.OffIndexChanged = function (b) {
                return this.paginator.removeEvent(UI.BiPagination.DPIndex, b);
            };
            Object.defineProperty(Paginator.prototype, "Max", {
                get: function () { return this.paginator.Max; },
                set: function (v) { this.paginator.Max = v; },
                enumerable: true,
                configurable: true
            });
            Paginator.prototype.BindMaxToSourceCount = function (x) {
                this.bm2sc = x.OnPropertyChanged(Corelib_1.collection.ExList.DPCount, function (s, e) { this.paginator.Max = Math.floor(e._new / this.countPerPage); }, this);
                this.paginator.Max = Math.floor(x.Count / this.countPerPage);
            };
            Paginator.prototype.UnbindMaxFromSourceCount = function (x) {
                if (this.bm2sc)
                    x.removeEvent(Corelib_1.collection.List.DPCount, this.bm2sc);
            };
            Paginator.prototype.Next = function () {
                this.paginator.Index++;
            };
            Paginator.prototype.Previous = function () {
                this.paginator.Index--;
            };
            return Paginator;
        }(UI.JControl));
        UI.Paginator = Paginator;
    })(UI = exports.UI || (exports.UI = {}));
    (function (UI) {
        var Grid = /** @class */ (function (_super) {
            __extends(Grid, _super);
            function Grid() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Grid.prototype.initialize = function () {
                this._view.classList.add('grid');
            };
            return Grid;
        }(UI.JControl));
        UI.Grid = Grid;
    })(UI = exports.UI || (exports.UI = {}));
    var funcs = {
        BiPagination: {
            DPInex: null,
            DPMax: null,
        }
    };
    (function (UI) {
        var StrechyButtonItemData = /** @class */ (function (_super) {
            __extends(StrechyButtonItemData, _super);
            function StrechyButtonItemData(Title) {
                var _this = _super.call(this) || this;
                _this.Title = Title;
                return _this;
            }
            StrechyButtonItemData.__fields__ = function () { return [this.DPTitle, this.DPIcon]; };
            StrechyButtonItemData.DPTitle = Corelib_1.bind.DObject.CreateField('Title', String, null);
            StrechyButtonItemData.DPIcon = Corelib_1.bind.DObject.CreateField('Icon', String, null);
            return StrechyButtonItemData;
        }(Corelib_1.bind.DObject));
        UI.StrechyButtonItemData = StrechyButtonItemData;
        var StrechyButton = /** @class */ (function (_super) {
            __extends(StrechyButton, _super);
            function StrechyButton(__data) {
                var _this = _super.call(this, 'controls.StretchyButton', 'controls.StretchyButtonItem') || this;
                _this.__data = __data;
                return _this;
            }
            StrechyButton.prototype.initialize = function () {
                this.triggerButton = $('.cd-nav-trigger', this._view)[0];
                ;
                this.triggerButton.addEventListener('click', this);
                this.Source = this.__data;
            };
            StrechyButton.RegisterEvents = function (enable) {
                if (this.EventCloseIsRegistered == enable)
                    return;
                if (!enable)
                    document.removeEventListener('click', this.handleEvent);
                else
                    document.addEventListener('click', this.handleEvent);
                this.EventCloseIsRegistered = enable;
            };
            StrechyButton.CloseAll = function (enableEvent) {
                for (var i = 0; i < StrechyButton.OpenedStrechyButtons.length; i++) {
                    var x = StrechyButton.OpenedStrechyButtons[i];
                    x.simpleClose();
                }
                StrechyButton.OpenedStrechyButtons = [];
                this.RegisterEvents(enableEvent);
            };
            StrechyButton.prototype.Open = function () {
                StrechyButton.CloseAll(true);
                StrechyButton.OpenedStrechyButtons = [this];
                this.simpleOpen();
            };
            StrechyButton.prototype.Close = function () {
                StrechyButton.CloseAll(false);
            };
            StrechyButton.prototype.simpleClose = function () {
                this.IsOpen = false;
                this._view.classList.remove('nav-is-visible');
                this._view.classList.add('cd-stretchy-nav-collapsed');
            };
            StrechyButton.prototype.simpleOpen = function () {
                this.IsOpen = true;
                this._view.classList.add('nav-is-visible');
                this._view.classList.remove('cd-stretchy-nav-collapsed');
            };
            StrechyButton.handleEvent = function (event) {
                var target = event.target;
                var classList = target.classList;
                if (classList.contains('cd-nav-trigger'))
                    return;
                if (classList.contains('cd-nav-trigger') || target.tagName === 'SPAN')
                    return;
                StrechyButton.CloseAll(false);
            };
            StrechyButton.prototype.handleEvent = function (event) {
                event.preventDefault();
                if (this.IsOpen)
                    this.Close();
                else
                    this.Open();
            };
            StrechyButton.OpenedStrechyButtons = [];
            return StrechyButton;
        }(UI.ListAdapter));
        UI.StrechyButton = StrechyButton;
    })(UI = exports.UI || (exports.UI = {}));
    (function (UI) {
        var Modals;
        (function (Modals) {
            function CreateGlyph(dom, icon, title, type, attri) {
                var t = document.createElement(dom);
                t.classList.add('btn', 'btn-' + type, 'glyphicon', 'glyphicon-' + icon);
                t.textContent = '  ' + title;
                for (var i in attri)
                    t.setAttribute(i, attri[i]);
                return t;
            }
            Modals.CreateGlyph = CreateGlyph;
            var ModalEditer = /** @class */ (function (_super) {
                __extends(ModalEditer, _super);
                function ModalEditer(templateName) {
                    var _this = _super.call(this) || this;
                    _this.templateName = templateName;
                    _this.scop = new Corelib_1.bind.ValueScop(null, 3);
                    return _this;
                }
                Object.defineProperty(ModalEditer.prototype, "Data", {
                    set: function (v) {
                        this.scop.Value = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                ModalEditer.prototype.initialize = function () {
                    var _this = this;
                    _super.prototype.initialize.call(this);
                    this.Content = new UI.TControl(this.templateName, this.scop);
                    this.Add(this.Content);
                    this.OnClosed.On = function (e) {
                        var t = _this.scop.Value;
                        var action = false;
                        if (e.msg === 'ok') {
                            if (_this.Action.OnSuccess)
                                action = _this.Action.OnSuccess.Invoke.call(_this.Action.OnSuccess.Owner, t, _this.IsNew);
                            if (!action)
                                t.Save();
                            _this.IsNew = false;
                        }
                        else {
                            if (_this.Action.OnError)
                                action = _this.Action.OnError.Invoke.call(_this.Action.OnError.Owner, t, _this.IsNew);
                            if (!action)
                                t.Undo();
                        }
                    };
                };
                ModalEditer.prototype.OnKeyDown = function (e) {
                    //if (e.keyCode == 13)
                    //    return e.ctrlKey && this.Close(MessageResult.ok);
                    //else if (e.keyCode == 27) return e.ctrlKey && this.Close(MessageResult.cancel);
                    _super.prototype.OnKeyDown.call(this, e);
                };
                ModalEditer.prototype.edit = function (product, isNew, action) {
                    if (!product)
                        return;
                    this.IsNew = isNew;
                    if (product !== undefined)
                        this.scop.Value = product;
                    product.CreateBackup();
                    this.Action = action || emptyAction;
                    _super.prototype.Open.call(this);
                };
                ModalEditer.prototype.Open = function () {
                    this.edit(this.scop.Value, this.IsNew, this.Action);
                };
                return ModalEditer;
            }(UI.Modal));
            Modals.ModalEditer = ModalEditer;
            var emptyAction = {};
            var EditorAction = /** @class */ (function () {
                function EditorAction(proxyAction, callback) {
                    this.proxyAction = proxyAction;
                    this.callback = callback;
                    this.OnSuccess = { Owner: this, Invoke: this.onSuccess };
                    this.OnError = { Owner: this, Invoke: this.onError };
                }
                EditorAction.prototype.invoke = function (x, p, isNew) {
                    if (x && x.Invoke)
                        return x.Invoke.call(x.Owner, p, isNew, this.callback);
                    return undefined;
                };
                EditorAction.prototype.onSuccess = function (p, isNew) {
                    return this.invoke(this.proxyAction.OnSuccess, p, isNew);
                };
                EditorAction.prototype.onError = function (p, isNew) {
                    return this.invoke(this.proxyAction.OnError, p, isNew);
                };
                EditorAction.prototype.Clone = function (callback) {
                    return new EditorAction(this.proxyAction, callback);
                };
                EditorAction.Create = function (_this, onSuccess, onError, defaltCallback) {
                    if (!onSuccess && !onError)
                        return undefined;
                    var t = {};
                    if (onSuccess)
                        t.OnSuccess = { Owner: _this, Invoke: onSuccess };
                    if (onError)
                        t.OnError = { Owner: _this, Invoke: onError };
                    return new EditorAction(t, defaltCallback);
                };
                return EditorAction;
            }());
            Modals.EditorAction = EditorAction;
        })(Modals = UI.Modals || (UI.Modals = {}));
    })(UI = exports.UI || (exports.UI = {}));
    (function (UI) {
        var Modals;
        (function (Modals) {
            var ModalList = /** @class */ (function (_super) {
                __extends(ModalList, _super);
                function ModalList(source, tableTmplate, itemTemplate, datas, asScopic, isMatch) {
                    var _this = _super.call(this) || this;
                    _this.source = source;
                    _this.tableTmplate = tableTmplate;
                    _this.itemTemplate = itemTemplate;
                    _this.datas = datas;
                    _this.asScopic = asScopic;
                    _this.isMatch = isMatch;
                    return _this;
                }
                ModalList.IsMatch = function (p, item) {
                    return p.Check(item);
                };
                Object.defineProperty(ModalList.prototype, "IsMatch", {
                    get: function () { return this.isMatch; },
                    set: function (v) {
                        if (this._exList) {
                            var flt = this._exList.Filter;
                            if (flt._isMatch === v)
                                return;
                            flt._isMatch = v;
                            this._exList.Reset();
                            //thread.Dispatcher.call(this._exList, this._exList.Reset);
                        }
                        this.isMatch = v;
                    },
                    enumerable: true,
                    configurable: true
                });
                ModalList.prototype.initialize = function () {
                    var _this = this;
                    _super.prototype.initialize.call(this);
                    var l = this.Datacontext = new UI.ListAdapter(this.tableTmplate, this.itemTemplate, this.datas, this.asScopic);
                    l.AcceptNullValue = true;
                    if (this.isMatch)
                        this.createFilter();
                    var r1 = new UI.Div().applyStyle('row');
                    var r2 = new UI.Div().applyStyle('row');
                    var t = new UI.ActionText();
                    t.AutoAction = UI.SearchActionMode.Instantany;
                    var c1 = new UI.Div().applyStyle('col-md-12', 'col-xs-12', 'col-sm-12');
                    t.View.style.maxWidth = 'none';
                    t.View.style.width = '100%';
                    c1.View.style.padding = '0';
                    c1.Add(t);
                    r1.Add(c1);
                    r2.Add(l);
                    this.Add(r1);
                    this.Add(r2);
                    t.OnAction.On = function (l, o, n) {
                        _this._exList.Filter.Patent = new Filters_1.filters.list.StringPatent(n);
                        Filters_1.filters.list.StringFilter;
                    };
                    if (!this.asScopic) {
                        this._exList = new Corelib_1.collection.ExList(Object);
                        this._exList.MaxResult = 30;
                        var sf = new Filters_1.filters.list.BoundStringFilter();
                        sf.Patent = new Filters_1.filters.list.StringPatent("");
                        this._exList.Filter = sf;
                        this._exList.Source = this.source;
                        l.Source = this._exList;
                    }
                    l.OnItemSelected.On = function (l, i, t) { return _this.selectedItem = t && t.getDataContext(); };
                };
                Object.defineProperty(ModalList.prototype, "SelectedItem", {
                    get: function () { return this.selectedItem; },
                    set: function (v) { this.Datacontext.SelectItem(v); },
                    enumerable: true,
                    configurable: true
                });
                ModalList.prototype.show = function (onc, list) {
                    var _this = this;
                    if (list)
                        this.OnInitialized = function (n) {
                            _this._exList.Source = list;
                            _this.OnInitialized = function (n) { return n.Datacontext.Source = _this._exList; };
                        };
                    this.onc = onc;
                    _super.prototype.Open.call(this);
                };
                Object.defineProperty(ModalList.prototype, "Source", {
                    set: function (l) {
                        this.OnInitialized = function (n) {
                            n._exList.Source = l;
                            n.Datacontext.OnInitialized = function (c) {
                                c.Source = n._exList;
                            };
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                ModalList.prototype.Open = function () { };
                ModalList.prototype.OnKeyDown = function (e) {
                    if (!this.Datacontext.OnKeyDown(e))
                        _super.prototype.OnKeyDown.call(this, e);
                };
                ModalList.prototype.Close = function (msg) {
                    var c = this.onc;
                    var s = this.selectedItem;
                    this.onc = null;
                    _super.prototype.Close.call(this, msg);
                    try {
                        this.Datacontext.SelectedIndex = -1;
                    }
                    catch (e) {
                    }
                    if (c)
                        c.call(this, this, s, msg);
                };
                ModalList.prototype.createFilter = function () {
                    var _this = this;
                    var v = this.Datacontext.Content.View;
                    this._exList = new Corelib_1.collection.ExList(Object);
                    this._exList.Filter = new Corelib_1.utils.CostumeFilter(this.IsMatch);
                    var spec = Corelib_1.basic.New() + '';
                    v.setAttribute('db-filter', spec);
                    Corelib_1.bind.RegisterFilter({
                        Name: spec, BindingMode: 1, CreateNew: function (p, f, s) {
                            return new Filters_1.filters.scopic.ListFilter(p, 1, null, _this._exList);
                        }
                    });
                };
                return ModalList;
            }(UI.Modal));
            Modals.ModalList = ModalList;
        })(Modals = UI.Modals || (UI.Modals = {}));
    })(UI = exports.UI || (exports.UI = {}));
    window['UI'] = UI;
    window['testSB'] = function () {
        var desk = UI.Desktop.Current;
        var data = new Corelib_1.collection.List(Object, [
            { Title: "Slimane Is Perfecte" },
            new UI.StrechyButtonItemData('Home'),
            new UI.StrechyButtonItemData('Go'),
            new UI.StrechyButtonItemData('Apps'),
            new UI.StrechyButtonItemData('Test'),
        ]);
        var cnt_SB = new UI.StrechyButton(data);
        cnt_SB.OnItemSelected.On = function (s, x, g) {
            debugger;
        };
        document.body.appendChild(cnt_SB.View);
        cnt_SB.Parent = desk;
    };
});
//# sourceMappingURL=UI.js.map