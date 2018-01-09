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
define(["require", "exports", "./../../js/corelib", "./../../js/UI", "./../../js/context"], function (require, exports, corelib_1, UI_1, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///https://codyhouse.co/demo/3d-rotating-navigation/index.html#0
    ///https://codyhouse.co/gem/side-shopping-cart/
    var Material;
    (function (Material) {
        var App = (function (_super) {
            __extends(App, _super);
            function App() {
                var _this = _super.call(this, 'templates.qui-app', UI_1.UI.TControl.Me) || this;
                _this.searchWrapper = (function () { var t = document.createElement('li'); t.classList.add('cd-serch-wrapper'); return t; })();
                _this.resizing = false;
                return _this;
            }
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
                        this.OnCompiled = function (t) {
                            if (v.Parent)
                                throw new Error('The Control has connection with other Control');
                            _this._pageContent.appendChild(v.View);
                            v.Parent = _this;
                            _this._content = v;
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
                        this.OnCompiled = function (t) {
                            _this._sideMenu.appendChild(v.View);
                            v.Parent = _this;
                            _this._menu = v;
                        };
                    else
                        this._menu = v;
                },
                enumerable: true,
                configurable: true
            });
            App._getView = function () {
                return null;
            };
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
            App.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.Pages = new corelib_1.collection.List(Object, ["Search", "Facture", "Clients", "Admin Panel", "Settings"]);
                this.Suggestions = new corelib_1.collection.List(Object, [{ Data: "Iam", Title: "Test Title then if you see this then you are ok" }]);
                UI_1.UI.JControl.LoadCss(context_1.context.GetPath('Reset.css'));
                UI_1.UI.JControl.LoadCss(context_1.context.GetPath('QUI.css'));
                this.moveNavigation = this.moveNavigation.bind(this);
                window.addEventListener('resize', function (e) { return _this.checkResize(); });
            };
            App.prototype.OnCompileEnd = function (cnt) {
                this._navigationTrigger.addEventListener('click', this);
                this._closeSuggetions.addEventListener('click', this);
                this._closeSuggetions.addEventListener('click', this);
                this.checkResize();
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
                this.DPPages = App.CreateField("Pages", corelib_1.collection.List);
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
            App.__fields__ = function () { return [this.DPPages, this.DPCategories, this.DPFastLinks, this.DPSuggestions, this.DPLogo]; };
            return App;
        }(UI_1.UI.TControl));
        Material.App = App;
    })(Material = exports.Material || (exports.Material = {}));
});
//# sourceMappingURL=QUI.js.map