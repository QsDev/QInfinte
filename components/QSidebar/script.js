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
define(["require", "exports", "./../../js/corelib", "../../js/UI", "../../js/context", "../QUI/script"], function (require, exports, corelib_1, UI_1, context_1, script_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    FB.getLoginStatus(function (response) {
        switch (response.status) {
            case 'connected':
                break;
            case 'not_authorized':
                break;
            case 'unknown':
                break;
        }
    });
    var callback = function (resp) {
        debugger;
    };
    FB.login(callback, {});
    var Material;
    (function (Material) {
        var SideNavItem = /** @class */ (function (_super) {
            __extends(SideNavItem, _super);
            function SideNavItem(item) {
                var _this = _super.call(this, document.createElement('li')) || this;
                _this.item = item;
                return _this;
            }
            SideNavItem.prototype.initialize = function () {
                this.anchore = document.createElement('a');
                if (this.item.Icon)
                    this._view.classList.add(this.item.Icon);
                this.anchore.innerText = this.item.Title;
                this.buildBadge();
                this.View.appendChild(this.anchore);
                this.buildChildren();
            };
            SideNavItem.prototype.buildBadge = function () {
                var badge = this.item.Badge;
                if (badge == null || badge == '') {
                    this.badge && this.badge.remove();
                    return;
                }
                if (!this.badge) {
                    this.badge = document.createElement('span');
                    this.badge.classList.add('count');
                }
                if (this.badge.parentNode == null)
                    this.anchore.appendChild(this.badge);
                this.badge.innerText = String(badge);
            };
            SideNavItem.prototype.buildChildren = function () {
                var children = this.item.Children;
                if (children) {
                    this.applyStyle('has-children');
                    this.children = new UI_1.UI.Dom('ul');
                    this.Add(this.children);
                    for (var i = 0; i < children.length; i++)
                        this.children.Add(new SubsSideNavItem(children[i], this));
                }
                if (this.item.mode === 'pop') {
                    this.anchore.addEventListener('mouseenter', this);
                    this._view.addEventListener('mouseleave', this);
                    return;
                }
                this.anchore.addEventListener('click', this);
            };
            SideNavItem.prototype.handleEvent = function (e) {
                if (this.item.mode === 'pop')
                    switch (e.type) {
                        case 'mouseenter':
                            if (this.item.mode === 'pop' && e.currentTarget === this.anchore)
                                return this.IsActive = true;
                        case 'mouseleave':
                            if (this.item.mode === 'pop' && e.currentTarget === this._view)
                                return this.IsActive = false;
                        default: return _super.prototype.handleEvent.call(this, e);
                    }
                else if (e.type === 'click' && e.currentTarget === this.anchore)
                    if (!this.IsActive) {
                        corelib_1.$$(this._view).toggleClass('active');
                        if (this.IsActive) {
                            var args = [this];
                            this.OnChildSelected(args);
                            this.OnSelected && this.OnSelected.Invoke.call(this.OnSelected.Owner, args);
                        }
                    }
                    else
                        _super.prototype.handleEvent.call(this, e);
            };
            Object.defineProperty(SideNavItem.prototype, "IsActive", {
                get: function () {
                    return this._view.classList.contains('active') || this._view.classList.contains('hover');
                },
                set: function (v) {
                    this._view.classList[v ? 'add' : 'remove'](this.item.mode === 'pop' ? 'hover' : 'active');
                },
                enumerable: true,
                configurable: true
            });
            return SideNavItem;
        }(UI_1.UI.JControl));
        Material.SideNavItem = SideNavItem;
        var SubsSideNavItem = /** @class */ (function (_super) {
            __extends(SubsSideNavItem, _super);
            function SubsSideNavItem(item, ParentNavItem) {
                var _this = _super.call(this, item) || this;
                _this.ParentNavItem = ParentNavItem;
                return _this;
            }
            SubsSideNavItem.prototype.OnChildSelected = function (nitems) {
                var p = this.ParentNavItem;
                if (!p)
                    return;
                nitems.push(p);
                p.OnChildSelected(nitems);
            };
            return SubsSideNavItem;
        }(SideNavItem));
        var MainSideNavItem = /** @class */ (function (_super) {
            __extends(MainSideNavItem, _super);
            function MainSideNavItem(item, ParentNav) {
                var _this = _super.call(this, item) || this;
                _this.ParentNav = ParentNav;
                return _this;
            }
            MainSideNavItem.prototype.OnChildSelected = function (nitems) {
                this.ParentNav.OnChildSelected(nitems);
            };
            return MainSideNavItem;
        }(SideNavItem));
        var SideNav = /** @class */ (function (_super) {
            __extends(SideNav, _super);
            function SideNav(data) {
                var _this = _super.call(this, document.createElement('nav')) || this;
                _this.data = data;
                return _this;
            }
            SideNav.prototype.initialize = function () {
                UI_1.UI.JControl.LoadCss(context_1.context.GetPath('style.css'));
                this.applyStyle('cd-side-nav');
                for (var i = 0; i < this.data.length; i++)
                    this.buildChild(this.data[i]);
            };
            SideNav.prototype.OnChildSelected = function (nitems) {
                this.OnItemSelected(nitems);
            };
            SideNav.prototype.buildChild = function (data) {
                var v = new UI_1.UI.Dom(document.createElement('ul'));
                var title = document.createElement('li');
                title.classList.add('cd-label');
                title.innerText = data.Title;
                v.View.appendChild(title);
                for (var i = 0; i < data.Items.length; i++) {
                    var l = data.Items[i];
                    var c = new MainSideNavItem(l, this);
                    v.Add(c);
                }
                this.Add(v);
            };
            SideNav.prototype.OnItemSelected = function (items) {
                if (this.currentItems) {
                    for (var i = 0; i < this.currentItems.length; i++) {
                        var c = this.currentItems[i];
                        c.IsActive = false;
                    }
                }
                for (var i = 0; i < items.length; i++) {
                    var c = items[i];
                    var t = c.item;
                    if (t.mode !== 'pop')
                        c.IsActive = true;
                }
                this.currentItems = items;
            };
            return SideNav;
        }(UI_1.UI.JControl));
        Material.SideNav = SideNav;
    })(Material = exports.Material || (exports.Material = {}));
    var data = {
        Title: "Main Menu",
        Items: [
            { Title: "Overview", Badge: '1', Icon: 'overview' },
            {
                Title: 'Menu', Badge: '2', Icon: 'comments',
                Children: [
                    {
                        Title: 'Item 1',
                    },
                    {
                        Title: 'Item 3',
                    },
                    {
                        Title: 'Item 2',
                    }
                ], mode: 'pop'
            },
            {
                Title: 'Menu', Badge: '2', Icon: 'notifications',
                Children: [
                    {
                        Title: 'Item 1',
                    },
                    {
                        Title: 'Item 3',
                    },
                    {
                        Title: 'Item 2',
                    }
                ], mode: 'sub'
            }
        ]
    };
    exports.counter = 0;
    function test() {
        var app = new script_1.Material.App();
        document.body.innerHTML = '';
        document.body.appendChild(app.View);
        var c = new UI_1.UI.Dom('div');
        app.OnInitialized = function (app) {
            ret.menu = new Material.SideNav([data]);
            app.Menu = ret.menu;
        };
        var ret = { app: app, container: c, menu: undefined, canvas: undefined };
        app.Parent = UI_1.UI.Desktop.Current;
        return ret;
    }
    exports.test = test;
});
//# sourceMappingURL=script.js.map