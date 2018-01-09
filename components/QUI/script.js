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
define(["require", "exports", "./../../js/corelib", "./../../js/UI", "./../../js/context", "../../Apps/Shop/Pages", "../Canvas3D/script"], function (require, exports, corelib_1, UI_1, context_1, Pages_1, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///https://codyhouse.co/demo/3d-rotating-navigation/index.html#0
    ///https://codyhouse.co/gem/side-shopping-cart/
    var Material;
    (function (Material) {
        var App = /** @class */ (function (_super) {
            __extends(App, _super);
            function App() {
                var _this = _super.call(this, App._getView()) || this;
                _this.searchWrapper = (function () { var t = document.createElement('li'); t.classList.add('cd-serch-wrapper'); return t; })();
                _this.resizing = false;
                _this.Controller = corelib_1.bind.Controller.Attach(_this, _this);
                _this.Controller.OnCompiled = {
                    Invoke: _this.OnCompileEnd, Owner: _this
                };
                return _this;
            }
            App.prototype.showPage = function (page) {
                this.Content = page;
            };
            App.prototype.OnKeyDown = function (e) {
                var s = this.SelectedPage;
                if (s)
                    s.OnKeyDown(e);
            };
            App.prototype.OnPageChanged = function (oldPage, page) {
            };
            App.prototype.Check = function (child) {
                return true;
            };
            App.prototype._getView = function (data) {
                var tmp = UI_1.UI.TControl.ToTemplate('templates.qui-app', false);
                var Shadow = tmp.CreateShadow();
                Shadow.Parent = this;
                return Shadow;
            };
            App._getView = function () {
                return UI_1.UI.ListAdapter._getTemplateShadow('templates.qui-app');
            };
            App.prototype.IsCompiled = function () { return this.Controller.getStat() >= 2; };
            Object.defineProperty(App.prototype, "Content", {
                get: function () { return this._content; },
                set: function (v) {
                    var _this = this;
                    if (v === this._content)
                        return;
                    if (this.IsCompiled && this._content) {
                        this._content.Parent = null;
                        this._content.View.remove();
                    }
                    if (v)
                        this.Controller.OnCompiled = {
                            Invoke: function (t) {
                                if (v.Parent)
                                    throw new Error('The Control has connection with other Control');
                                _this._pageContent.appendChild(v.View);
                                v.Parent = _this;
                                _this._content = v;
                            }, Owner: this
                        };
                    else
                        this._content = v;
                },
                enumerable: true,
                configurable: true
            });
            App.prototype.setContent = function (t) {
            };
            Object.defineProperty(App.prototype, "Menu", {
                get: function () { return this._menu; },
                set: function (v) {
                    var _this = this;
                    if (v === this._menu)
                        return;
                    if (this._menu) {
                        this._menu.Parent = null;
                    }
                    if (v)
                        this.Controller.OnCompiled = {
                            Invoke: function (t) {
                                _this._sideMenu.appendChild(v.View);
                                v.Parent = _this;
                                _this._menu = v;
                            }, Owner: this
                        };
                    else
                        this._menu = v;
                },
                enumerable: true,
                configurable: true
            });
            App.prototype.handleEvent = function (event) {
                var src = event.srcElement;
                var name = src.getAttribute('db-name');
                switch (name) {
                    case 'coverLayer':
                    case 'closeSuggetions':
                        this.toggleSearchForm(true);
                        break;
                    case 'searchTrigger':
                        event.preventDefault();
                        if (!this.toggleSearchForm())
                            this.onSearch();
                        break;
                    case 'navigationTrigger':
                        event.preventDefault();
                        corelib_1.$$([this._mainHeader, this._navigation, this._pageContent]).toggleClass('nav-is-visible');
                        break;
                    default:
                }
            };
            App.prototype.setName = function (name, dom, cnt, e) {
                this['_'.concat(name)] = dom;
                if (name === 'searchTrigger')
                    this._searchTrigger.addEventListener('click', this);
                if (name === 'navigationWrapper')
                    this._pages = e.IsNew ? e.Control : null;
            };
            App.prototype.onSearch = function () {
                var c = this._txt_search.value;
                if (c && c.length > 5)
                    this.Suggestions.Add({ Data: "Iam", Title: c });
            };
            App.prototype.toggleSearchForm = function (close) {
                close = close === undefined ? this._searchTrigger.classList.contains('search-form-visible') : close;
                if (close) {
                    this._searchTrigger.classList.remove('search-form-visible');
                    this._searchForm.classList.remove('is-visible');
                    this._coverLayer.classList.remove('search-form-visible');
                    return false;
                }
                else {
                    this._searchTrigger.classList.add('search-form-visible');
                    this._coverLayer.classList.add('search-form-visible');
                    this._searchForm.classList.add('is-visible');
                    return true;
                }
            };
            Object.defineProperty(App.prototype, "NFBHeight", {
                set: function (v) {
                    debugger;
                    if (!App.BlackAppRule) {
                        var t = App.links[1].sheet;
                        var rls = t.cssRules || t.rules;
                        for (var i = 0; i < rls.length; i++) {
                            var y = rls[i];
                            if (y.selectorText === '.BlackApp') {
                                App.BlackAppRule = y;
                                break;
                            }
                        }
                    }
                    if (App.BlackAppRule)
                        App.BlackAppRule.style.setProperty(App.navbarFixedBottomHeightName, v + 'px');
                    else
                        document.documentElement.style.setProperty(App.navbarFixedBottomHeightName, v + 'px');
                },
                enumerable: true,
                configurable: true
            });
            App.prototype.css = function (el) {
                var sheets = document.styleSheets, ret = [];
                el.matches = el.matches || el.webkitMatchesSelector || el.msMatchesSelector;
                return ret;
            };
            App.prototype.initialize = function () {
                var _this = this;
                window['k'] = this;
                _super.prototype.initialize.call(this);
                this.applyStyle('BlackApp');
                var app = UI_1.UI.Desktop.Current.CurrentApp;
                this.Foot = new UI_1.UI.ServiceNavBar(this, false);
                var pcon = new script_1.Material.Canvas3D();
                var page = new UI_1.UI.Page(this, "Canvas 3D", "Canvas 3D");
                page.Add(pcon);
                this.Pages = new corelib_1.collection.List(Object, [new Pages_1.Pages.CostumersPage(this), new Pages_1.Pages.SearchPage(this), new Pages_1.Pages.FacturesPage(this), page]);
                this.Suggestions = new corelib_1.collection.List(Object, [{ Data: "Iam", Title: "Test Title then if you see this then you are ok" }]);
                if (!App.links) {
                    App.links = [UI_1.UI.JControl.LoadCss(context_1.context.GetPath('Reset.css')), UI_1.UI.JControl.LoadCss(context_1.context.GetPath('style.css'))];
                }
                else {
                    for (var i = 0; i < App.links.length; i++) {
                        var l = App.links[i];
                        if (l.parentNode == null)
                            document.head.appendChild(l);
                    }
                }
                this.moveNavigation = this.moveNavigation.bind(this);
                window.addEventListener('resize', function (e) { return _this.checkResize(); });
                this.Add(this.Foot);
            };
            App.prototype.OnCompileEnd = function (cnt) {
                var _this = this;
                this._navigationTrigger.addEventListener('click', this);
                this._closeSuggetions.addEventListener('click', this);
                this._closeSuggetions.addEventListener('click', this);
                this.checkResize();
                this._pages.OnItemSelected.On = function (a, b, c, d, f) { return _this.SelectedPage = _this.Pages.Get(b); };
            };
            App.prototype.checkResize = function () {
                if (!this.resizing) {
                    this.resizing = true;
                    (!window.requestAnimationFrame) ? setTimeout(this.moveNavigation, 300) : window.requestAnimationFrame(this.moveNavigation);
                }
            };
            App.prototype.checkWindowWidth = function () {
                var mq = window.getComputedStyle(this._mainHeader, '::before').getPropertyValue('content').replace(/"/g, '').replace(/'/g, "");
                return mq;
            };
            App.prototype.moveNavigation = function () {
                var screenSize = this.checkWindowWidth();
                if (screenSize == 'desktop' && (corelib_1.$$(this._navigationTrigger).siblings(corelib_1.query.hasClass, 'cd-main-search').length == 0)) {
                    corelib_1.$$(this._searchForm).detach().insertBefore(this._navigationTrigger);
                    corelib_1.$$(this._navigationWrapper).detach().insertBefore(this._searchForm);
                    this.searchWrapper.remove();
                }
                else if (screenSize == 'mobile' && !(corelib_1.$$(this._mainHeader).children(corelib_1.query.hasClass, 'cd-main-nav-wrapper').length == 0)) {
                    corelib_1.$$(this._navigationWrapper).detach().insertAfter(this._pageContent);
                    var newListItem = this.searchWrapper;
                    corelib_1.$$(this._searchForm).detach().appendTo(newListItem);
                    this._navigation.appendChild(this.searchWrapper);
                }
                this.resizing = false;
            };
            App.ctor = function () {
                this.DPCategories = App.CreateField("Categories", corelib_1.collection.List);
                this.DPFastLinks = App.CreateField("FastLinks", corelib_1.collection.List);
                this.DPSuggestions = App.CreateField("Suggestions", corelib_1.collection.List);
                this.DPLogo = App.CreateField("Logo", String);
            };
            App.prototype.CloseMenu = function () { this._body.classList.add('hide-menu'); };
            App.prototype.OpenMenu = function () { this._body.classList.remove('hide-menu'); };
            Object.defineProperty(App.prototype, "IsMenuOpen", {
                get: function () { return this._body.classList.contains('hide-menu'); },
                enumerable: true,
                configurable: true
            });
            App.__fields__ = function () { return [/*this.DPPages,*/ this.DPCategories, this.DPFastLinks, this.DPSuggestions, this.DPLogo]; };
            App.navbarFixedBottomHeightName = '--navbar-fixed-bottom-height';
            return App;
        }(UI_1.UI.IApp));
        Material.App = App;
    })(Material = exports.Material || (exports.Material = {}));
});
//# sourceMappingURL=script.js.map