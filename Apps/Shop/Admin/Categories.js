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
define(["require", "exports", "../../../js/UI", "../Common", "../../../js/Corelib", "../../../js/Filters", "../Search"], function (require, exports, UI_1, Common_1, Corelib_1, Filters_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '"', '#', '%', '\'', '(', ')', ',', '/', ';'];
    function toRadix(n, r) {
        var t = [];
        if (r > 72)
            throw 'radix to big';
        if (r < 2)
            throw 'radix to small';
        do {
            var x = n % r;
            n = Math.floor(n / r);
            t.unshift(x);
        } while (n !== 0);
        return t;
    }
    function fromRadix(s, r) {
        var e = s[0];
        if (e == '+') {
            e = 1;
            s = s.substring(1);
        }
        if (e === '-') {
            e = -1;
            s = s.substring(1);
        }
        else
            1;
        if (r <= 36)
            s = s.toLowerCase();
        var t = 0;
        var x = 1;
        for (var i = s.length - 1; i >= 0; i--) {
            t += ns.indexOf(s[i]) * x;
            x *= r;
        }
        return t * e;
    }
    var CategoryNav = /** @class */ (function (_super) {
        __extends(CategoryNav, _super);
        function CategoryNav() {
            var _this = _super.call(this, 'categories', "Categories") || this;
            _this.btn_add = Common_1.extern.crb('plus', 'Add', 'primary');
            _this.btn_edit = Common_1.extern.crb('pencile', 'Edit', 'success');
            _this.btn_remove = Common_1.extern.crb('trash', 'Remove', 'danger');
            _this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
            _this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
            _this.adapter = new UI_1.UI.ListAdapter('Categories.table', 'Category.row');
            _this._caption = document.createTextNode("Categories");
            _this.searchFilter = new Filters_1.filters.list.StringFilter();
            return _this;
        }
        CategoryNav.prototype.Update = function () {
            GData.apis.Category.SmartUpdate();
        };
        CategoryNav.prototype.initsec = function () {
            var div = this.group_cnt.View;
            div.appendChild(this.btn_add);
            div.appendChild(this.btn_edit);
            div.appendChild(this.btn_remove);
            this.group_tcnt.View.appendChild(this._caption);
            this.group_tcnt.Add(this.group_cnt);
            this.Add(this.group_tcnt);
            //this.Add(this.adapter);
            this.paginator = new UI_1.UI.Paginator(10);
            this.Add(this.paginator);
        };
        CategoryNav.prototype.OnSearche = function (oldPatent, newPatent) {
            var t = this.searchList.Filter == this.searchFilter;
            this.searchFilter.Patent = new Filters_1.filters.list.StringPatent(newPatent);
            if (!t)
                this.searchList.Filter = this.searchFilter;
            else
                this.searchList.Reset();
        };
        Object.defineProperty(CategoryNav.prototype, "HasSearch", {
            get: function () { return UI_1.UI.SearchActionMode.Instantany; },
            set: function (v) { },
            enumerable: true,
            configurable: true
        });
        CategoryNav.prototype.OnKeyDown = function (e) {
            if (!this.adapter.OnKeyDown(e)) {
                if (e.keyCode === UI_1.UI.Keys.F1)
                    this.getHelp({
                        "F2": "Add New",
                        "Enter": "Edit",
                        "Suppr": "Delete",
                    });
                else if (e.keyCode === UI_1.UI.Keys.Right)
                    this.paginator.Next();
                else if (e.keyCode === UI_1.UI.Keys.Left)
                    this.paginator.Previous();
                else if (e.keyCode === UI_1.UI.Keys.F2)
                    this.btnAddClick();
                else if (this.adapter.SelectedIndex != -1)
                    if (e.keyCode === 13)
                        this.btnEditClick();
                    else if (e.keyCode === UI_1.UI.Keys.Delete)
                        this.btnRemoveClick();
                    else
                        return _super.prototype.OnKeyDown.call(this, e);
                else
                    return _super.prototype.OnKeyDown.call(this, e);
            }
            e.stopPropagation();
            e.preventDefault();
            return true;
        };
        CategoryNav.prototype.btnAddClick = function () {
            GData.apis.Category.CreateNew();
        };
        CategoryNav.prototype.btnEditClick = function () {
            GData.apis.Category.Edit(true, this.adapter.SelectedItem, false);
        };
        CategoryNav.prototype.btnRemoveClick = function () {
            GData.apis.Category.Delete(true, this.adapter.SelectedItem, null);
        };
        CategoryNav.prototype.initEvents = function () {
            this.btn_add.addEventListener('click', { handleEvent: function (e) { this.self.btnAddClick(e); }, self: this });
            this.btn_edit.addEventListener('click', { handleEvent: function (e) { this.self.btnEditClick(e); }, self: this });
            this.btn_remove.addEventListener('click', { handleEvent: function (e) { this.self.btnRemoveClick(e); }, self: this });
        };
        CategoryNav.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this.initsec();
            this.initEvents();
            //this.adapter.OnInitialized = (n) => n.Source = this.searchList = GData.__data.Categories.Filtred(this.searchFilter as any);
            this.paginator.OnInitialized = function (p) {
                _this.adapter.OnInitialized = function (l) {
                    var x = _this.searchList = Corelib_1.collection.ExList.New(GData.__data.Categories, _this.searchFilter);
                    l.Source = Corelib_1.collection.ExList.New(x, _this.paginator.Filter);
                    _this.paginator.BindMaxToSourceCount(x);
                };
                _this.paginator.Content = _this.adapter;
            };
            this.adapter.AcceptNullValue = false;
        };
        CategoryNav.prototype.GetLeftBar = function () {
            var _this = this;
            if (!this.lb) {
                var r = this.lb = new UI_1.UI.Navbar();
                Common_1.funcs.setTepmlate(r, this, this.handleSerices);
                r.OnInitialized = function (r) {
                    _this._edit = new UI_1.UI.Glyph(UI_1.UI.Glyphs.edit, false, 'Edit');
                    _this._new = new UI_1.UI.Glyph(UI_1.UI.Glyphs.plusSign, false, 'New');
                    _this._delete = new UI_1.UI.Glyph(UI_1.UI.Glyphs.fire, false, 'Delete');
                    r.AddRange([_this._new, _this._edit, _this._delete]);
                };
            }
            return this.lb;
        };
        CategoryNav.prototype.handleSerices = function (s, e, p) {
            var c = UI_1.UI.Glyphs;
            switch (p.c) {
                case c.edit:
                    return p.t.btnEditClick();
                case c.plusSign:
                    return p.t.btnAddClick();
                case c.fire:
                    return p.t.btnRemoveClick();
                default: throw "NotImplimented";
            }
        };
        CategoryNav.prototype.OnDeepSearch = function () {
            var _this = this;
            if (!this._deepSearch)
                this._deepSearch = new Search_1.SearchData.Category;
            this._deepSearch.Open(function (x) {
                var t = _this.searchList.Filter == _this._deepSearch;
                _this.searchList.Filter = _this._deepSearch;
                if (t)
                    _this.searchList.Reset();
            });
        };
        return CategoryNav;
    }(UI_1.UI.NavPanel));
    exports.CategoryNav = CategoryNav;
});
//# sourceMappingURL=Categories.js.map