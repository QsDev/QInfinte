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
define(["require", "exports", "../../../js/UI", "../Common", "../../../js/Filters", "../../../js/Corelib", "../Basics", "../Search"], function (require, exports, UI_1, Common_1, Filters_1, Corelib_1, Basics_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var ProductsNav = /** @class */ (function (_super) {
        __extends(ProductsNav, _super);
        function ProductsNav() {
            var _this = _super.call(this, 'products', "Produits") || this;
            _this.btn_add = Common_1.extern.crb('plus', 'Add', 'primary');
            _this.btn_edit = Common_1.extern.crb('pencile', 'Edit', 'success');
            _this.btn_remove = Common_1.extern.crb('trash', 'Remove', 'danger');
            //private txt_action: UI.ActionText = new UI.ActionText().applyStyle('pull-right');
            _this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
            _this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
            _this.adapter = new UI_1.UI.ListAdapter('Products.table', null && 'Product.row');
            _this._caption = document.createTextNode("Products");
            _this.searchFilter = new Filters_1.filters.list.StringFilter();
            _this.serv = new ProductService();
            return _this;
        }
        ProductsNav.prototype.OnSearche = function (oldPatent, newPatent) {
            var t = this.searchList.Filter == this.searchFilter;
            this.searchFilter.Patent = new Filters_1.filters.list.StringPatent(newPatent);
            if (!t)
                this.searchList.Filter = this.searchFilter;
            else
                this.searchList.Reset();
        };
        ProductsNav.prototype.OnDeepSearch = function () {
            var _this = this;
            if (!this._deepSearch)
                this._deepSearch = new Search_1.SearchData.Product;
            this._deepSearch.Open(function (x) {
                var t = _this.searchList.Filter == _this._deepSearch;
                _this.searchList.Filter = _this._deepSearch;
                if (t)
                    _this.searchList.Reset();
            });
        };
        Object.defineProperty(ProductsNav.prototype, "HasSearch", {
            get: function () { return UI_1.UI.SearchActionMode.Instantany; },
            set: function (v) { },
            enumerable: true,
            configurable: true
        });
        ProductsNav.prototype.OnKeyDown = function (e) {
            if (!this.adapter.OnKeyDown(e)) {
                if (e.keyCode === UI_1.UI.Keys.Right)
                    this.paginator.Next();
                else if (e.keyCode === UI_1.UI.Keys.Left)
                    this.paginator.Previous();
                else if (e.keyCode === UI_1.UI.Keys.F1)
                    this.getHelp({
                        "F2": "Add New",
                        "F3": "Deep Searche",
                        "F5": "Update",
                        "F9": "Add Revage",
                        "F10": "Edit Revage",
                        "Suppr": "Delete",
                        "Enter": "Edit"
                    });
                else if (e.keyCode === UI_1.UI.Keys.F2)
                    this.btnAddClick();
                else if (this.adapter.SelectedIndex != -1)
                    if (e.keyCode === 13)
                        this.btnEditClick();
                    else if (e.keyCode === UI_1.UI.Keys.Delete)
                        this.btnRemoveClick();
                    else if (e.keyCode === UI_1.UI.Keys.F9)
                        this.addRevage();
                    else if (e.keyCode === UI_1.UI.Keys.F10)
                        this.corrigerRvage();
                    else
                        return _super.prototype.OnKeyDown.call(this, e);
                else
                    return _super.prototype.OnKeyDown.call(this, e);
            }
            e.stopPropagation();
            e.preventDefault();
            return true;
        };
        ProductsNav.prototype.Update = function () {
            GData.apis.Product.SmartUpdate();
        };
        ProductsNav.prototype.initsec = function () {
            var div = this.group_cnt.View;
            div.appendChild(this.btn_add);
            div.appendChild(this.btn_edit);
            div.appendChild(this.btn_remove);
            this.group_tcnt.View.appendChild(this._caption);
            this.group_tcnt.Add(this.group_cnt);
            //this.group_tcnt.Add(this.txt_action);
            this.Add(this.group_tcnt);
            this.initPaginator();
            this.btn_add.addEventListener('click', { handleEvent: function (e) { this.self.btnAddClick(); }, self: this });
            this.btn_edit.addEventListener('click', { handleEvent: function (e) { this.self.btnEditClick(); }, self: this });
            this.btn_remove.addEventListener('click', { handleEvent: function (e) { this.self.btnRemoveClick(); }, self: this });
            //this.txt_action.OnAction.On = (s, o, n) => {
            //    o = (o || "").trim().toLowerCase();
            //    n = (n || "").trim().toLowerCase();
            //    if (o == n) return;
            //    this.searchFilter.Patent = new filters.list.StringPatent(n);
            //};
            this.adapter.AcceptNullValue = false;
        };
        ProductsNav.prototype.initPaginator = function () {
            var _this = this;
            this.paginator = new UI_1.UI.Paginator(8);
            this.paginator.OnInitialized = function (p) {
                _this.adapter.OnInitialized = function (l) {
                    var x = _this.searchList = Corelib_1.collection.ExList.New(GData.__data.Products, _this.searchFilter);
                    l.Source = Corelib_1.collection.ExList.New(x, _this.paginator.Filter);
                    _this.paginator.BindMaxToSourceCount(x);
                };
                _this.paginator.Content = _this.adapter;
            };
            this.Add(this.paginator);
        };
        ProductsNav.prototype.btnAddClick = function () {
            GData.apis.Product.CreateNew();
        };
        ProductsNav.prototype.btnEditClick = function () {
            GData.apis.Product.Edit(true, this.adapter.SelectedItem, false);
        };
        ProductsNav.prototype.btnRemoveClick = function () {
            GData.apis.Product.Delete(true, this.adapter.SelectedItem, null);
        };
        ProductsNav.prototype.initEvents = function () {
            this.btn_add.addEventListener('click', { handleEvent: function (e) { this.self.btnAddClick(e); }, self: this });
            this.btn_edit.addEventListener('click', { handleEvent: function (e) { this.self.btnEditClick(e); }, self: this });
            this.btn_remove.addEventListener('click', { handleEvent: function (e) { this.self.btnRemoveClick(e); }, self: this });
        };
        ProductsNav.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.initsec();
        };
        ProductsNav.prototype.corrigerRvage = function () {
        };
        ProductsNav.prototype.addRevage = function () {
            var p = this.adapter.SelectedItem;
            if (p)
                GData.apis.Revage.New(function (f) {
                    f.Product = p;
                    GData.apis.Revage.Edit(true, f, true, function (n, item, error) {
                        GData.apis.Product.Update(p);
                    });
                }, false, false);
            else
                UI_1.UI.InfoArea.push("Select One Product to Add An Revage");
        };
        ProductsNav.prototype.edit = function (pr) {
            var _this = this;
            GData.apis.Revage.New(function (f, isn, err) {
                GData.apis.Revage.Edit(true, f, isn, function (f, isn, err) {
                    var iss = err === Basics_1.basics.DataStat.Success;
                    var p = f.Product;
                    if (iss) {
                        if (p.Revage == null)
                            p.Revage = f;
                        else {
                            var t = p.Revage;
                            var r = t.NextRevage;
                            while ((r = t.NextRevage) != null)
                                t = r;
                            t.NextRevage = f;
                        }
                    }
                    else {
                        Corelib_1.thread.Dispatcher.call(_this, _this.edit, f);
                    }
                });
            }, false, false);
            //var xp = FakePrice.AddNew(pr, (f, isn, iss) => {
            //    var p = f.Product;
            //    if (iss) {
            //        if (p.Revage == null)
            //            p.Revage = f;
            //        else {
            //            var t = p.Revage;
            //            var r = t.NextRevage;
            //            while ((r = t.NextRevage) != null)
            //                t = r;
            //            t.NextRevage = f;
            //        }
            //        GData.__data.Prices.Add(f);
            //    } else {
            //        thread.Dispatcher.call(this, this.edit, f);
            //    }
            //});
        };
        ProductsNav.prototype.selectavatar = function () {
        };
        ProductsNav.prototype.GetLeftBar = function () { return this.serv.GetLeftBar(this); };
        ProductsNav.prototype.GetRightBar = function () { return this.serv.GetRightBar(this); };
        return ProductsNav;
    }(UI_1.UI.NavPanel));
    exports.ProductsNav = ProductsNav;
    var ProductService = /** @class */ (function () {
        function ProductService() {
        }
        ProductService.prototype.handleSerices = function (s, e, p) {
            var t = p.t.target;
            if (!t)
                return;
            var c = UI_1.UI.Glyphs;
            switch (p.c) {
                case c.edit:
                    t.btnEditClick();
                    break;
                case c.plusSign:
                    t.btnAddClick();
                    break;
                case c.fire:
                    t.btnRemoveClick();
                    break;
                case c.flash:
                    t.addRevage();
                    break;
                //case c.erase:
                //    t.corrigerRvage();
                //    break;
                case c.picture:
                    t.selectavatar();
                    break;
            }
        };
        ProductService.prototype.GetLeftBar = function (target) {
            var _this = this;
            this.target = target;
            if (!this.lb) {
                var r = this.lb = new UI_1.UI.Navbar();
                Common_1.funcs.setTepmlate(r, this, this.handleSerices);
                r.OnInitialized = function (r) {
                    _this._edit = new UI_1.UI.Glyph(UI_1.UI.Glyphs.edit, false, 'Edit');
                    _this._new = new UI_1.UI.Glyph(UI_1.UI.Glyphs.plusSign, false, 'New');
                    _this._delete = new UI_1.UI.Glyph(UI_1.UI.Glyphs.fire, false, 'Delete');
                    r.AddRange([_this._new, _this._edit, _this._delete, Common_1.funcs.createSparator(),
                    ]);
                };
            }
            return this.lb;
        };
        ProductService.prototype.GetRightBar = function (target) {
            var _this = this;
            this.target = target;
            if (!this.rb) {
                var r = this.rb = new UI_1.UI.Navbar();
                Common_1.funcs.setTepmlate(r, this, this.handleSerices);
                r.OnInitialized = function (r) {
                    r.AddRange([
                        //this.swapStock = new UI.Glyph(UI.Glyphs.erase, false, 'Corriger le Stock'),
                        _this.add2stock = new UI_1.UI.Glyph(UI_1.UI.Glyphs.flash, false, 'Add 2 Stock'),
                        Common_1.funcs.createSparator(),
                        _this.picture = new UI_1.UI.Glyph(UI_1.UI.Glyphs.picture, false, 'Select Avatar')
                    ]);
                };
            }
            return this.rb;
        };
        return ProductService;
    }());
});
//# sourceMappingURL=Products.js.map