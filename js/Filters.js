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
define(["require", "exports", "../js/Corelib"], function (require, exports, Corelib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var filters;
    (function (filters) {
        var scopic;
        (function (scopic) {
            var ListFilter = /** @class */ (function (_super) {
                __extends(ListFilter, _super);
                function ListFilter(s, m, p, fl) {
                    var _this = _super.call(this, s, 1) || this;
                    _this.p = p;
                    _this.fl = fl;
                    return _this;
                }
                ListFilter.prototype.getFilter = function (s) {
                    return null;
                };
                ListFilter.prototype.getSource = function (s) {
                    if (s instanceof Array) {
                        this.fl.Source = new Corelib_1.collection.List(Object, s);
                        this.isConst = true;
                    }
                    return null;
                };
                ListFilter.prototype.getPatent = function (s) {
                    return s;
                };
                ListFilter.prototype.Convert = function (data) {
                    if (this.isConst)
                        return;
                    if (this.fl == null)
                        this.fl = new Corelib_1.collection.ExList(Object);
                    this.fl.Source = data;
                    return this.fl;
                };
                ListFilter.prototype.ConvertBack = function (data) {
                    return data.Source;
                };
                ListFilter.prototype.Initialize = function () {
                    var fl = this.fl;
                    var p = this.p;
                    if (!fl)
                        this.fl = fl = new Corelib_1.collection.ExList(Object);
                    if (p) {
                        var x = JSON.parse(decodeURI(p));
                        for (var i in x) {
                            if (i === 'filter')
                                fl.Filter = this.getFilter(x[i]);
                            if (i === 'source')
                                fl.Source = this.getSource(x[i]);
                            if (i === 'patent') {
                                if (fl.Filter == null)
                                    fl.Filter = new list.LStringFilter();
                                fl.Filter.Patent = this.getPatent(x[i]);
                            }
                            if (i === 'max')
                                fl.MaxResult = parseInt(i);
                            if (i === 'shift')
                                fl.Shift = parseInt(i);
                        }
                    }
                    if (fl.Filter == null)
                        fl.Filter = new list.LStringFilter();
                    if (fl.Source == null && this.source)
                        fl.Source = this.source.Value;
                    _super.prototype.Initialize.call(this);
                };
                return ListFilter;
            }(Corelib_1.bind.Filter));
            scopic.ListFilter = ListFilter;
            Corelib_1.bind.RegisterFilter({
                BindingMode: 1, Name: 'listfilter', CreateNew: function (s, m, p) {
                    return new ListFilter(s, m, p);
                }
            });
        })(scopic = filters.scopic || (filters.scopic = {}));
        var list;
        (function (list) {
            var SubListPatent = /** @class */ (function () {
                function SubListPatent(start, end) {
                    if (start > end) {
                        this.Start = end;
                        this.End = start;
                    }
                    else {
                        this.Start = start;
                        this.End = end;
                    }
                }
                SubListPatent.prototype.Check = function (i) {
                    return i <= this.End && i >= this.Start;
                };
                SubListPatent.prototype.equals = function (p) {
                    return this.Start == p.Start && this.End == p.End;
                };
                return SubListPatent;
            }());
            list.SubListPatent = SubListPatent;
            var StringPatent = /** @class */ (function () {
                function StringPatent(s) {
                    this.o = s = s.trim().toLowerCase();
                    this.p = s === '' ? [] : s.split(' ');
                }
                StringPatent.prototype.Check = function (s) {
                    if (!s)
                        return true;
                    var p = this.p;
                    s = s.toLowerCase();
                    for (var i = 0, l = p.length; i < l; i++)
                        if (s.indexOf(p[i]) === -1)
                            return false;
                    return true;
                };
                StringPatent.prototype.equals = function (p) {
                    return p.o === this.o;
                };
                return StringPatent;
            }());
            list.StringPatent = StringPatent;
            var StringFilter = /** @class */ (function (_super) {
                __extends(StringFilter, _super);
                function StringFilter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                StringFilter.prototype.Begin = function (deb, count) {
                };
                StringFilter.prototype.IsMatch = function (i, item) {
                    return (this._patent == null) || this._patent.Check(item.toString());
                };
                StringFilter.prototype.convertFromString = function (x) {
                    var p = new StringPatent(x);
                    return (this._patent && this._patent.equals(p)) ? this._patent : p;
                };
                return StringFilter;
            }(Corelib_1.utils.Filter));
            list.StringFilter = StringFilter;
            var BoundStringFilter = /** @class */ (function (_super) {
                __extends(BoundStringFilter, _super);
                function BoundStringFilter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                BoundStringFilter.prototype.Begin = function (deb, count) {
                    this.deb = deb;
                    this.fin = deb + count;
                };
                BoundStringFilter.prototype.IsMatch = function (i, item) {
                    return i >= this.deb && i < this.fin ? (this._patent == null) || this._patent.Check(item.toString()) : null;
                };
                BoundStringFilter.prototype.convertFromString = function (x) {
                    var p = new StringPatent(x);
                    return (this._patent && this._patent.equals(p)) ? this._patent : p;
                };
                return BoundStringFilter;
            }(Corelib_1.utils.Filter));
            list.BoundStringFilter = BoundStringFilter;
            var DObjectPatent = /** @class */ (function () {
                function DObjectPatent(s) {
                    this.o = s = s.trim().toLowerCase();
                    this.p = s === '' ? [] : s.split(' ');
                }
                DObjectPatent.prototype.Check = function (s) {
                    if (!s)
                        return true;
                };
                DObjectPatent.prototype.equals = function (p) {
                    return p.o === this.o;
                };
                return DObjectPatent;
            }());
            list.DObjectPatent = DObjectPatent;
            var DObjectFilter = /** @class */ (function (_super) {
                __extends(DObjectFilter, _super);
                function DObjectFilter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                DObjectFilter.prototype.Begin = function (deb, count) {
                };
                DObjectFilter.prototype.IsMatch = function (i, item) {
                    return (this._patent == null) || this._patent.Check(item.toString());
                };
                DObjectFilter.prototype.convertFromString = function (x) {
                    var p = new StringPatent(x);
                    return (this._patent && this._patent.equals(p)) ? this._patent : p;
                };
                return DObjectFilter;
            }(Corelib_1.utils.Filter));
            list.DObjectFilter = DObjectFilter;
            var PatentGroup = /** @class */ (function () {
                function PatentGroup(left, right) {
                    this.left = left;
                    this.right = right;
                }
                PatentGroup.prototype.equals = function (p) {
                    var v = p;
                    var l, r;
                    if (v)
                        l = v.left, r = v.right;
                    if (!p || p instanceof this.constructor)
                        return this.areEquals(this.left, l) && this.areEquals(this.right, r);
                    return false;
                };
                PatentGroup.prototype.areEquals = function (a, b) {
                    if (a == null && b == null)
                        return true;
                    if (a == null)
                        return b.equals(a);
                    return a.equals(b);
                };
                return PatentGroup;
            }());
            list.PatentGroup = PatentGroup;
            var ANDPatentGroup = /** @class */ (function (_super) {
                __extends(ANDPatentGroup, _super);
                function ANDPatentGroup() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ANDPatentGroup.prototype.Check = function (item) {
                    var l = !this.left || this.left.Check(item);
                    if (l == null)
                        return null;
                    var r = !this.right || this.right.Check(item);
                    if (r == null)
                        return null;
                    return l && r;
                };
                ANDPatentGroup.prototype.Clone = function () {
                    return new ANDPatentGroup(this.left, this.right);
                };
                return ANDPatentGroup;
            }(PatentGroup));
            list.ANDPatentGroup = ANDPatentGroup;
            var ORPatentGroup = /** @class */ (function (_super) {
                __extends(ORPatentGroup, _super);
                function ORPatentGroup() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ORPatentGroup.prototype.Clone = function () {
                    return new ORPatentGroup(this.left, this.right);
                };
                ORPatentGroup.prototype.Check = function (item) {
                    var l = !!this.left && this.left.Check(item);
                    if (l == null)
                        return null;
                    var r = !!this.right && this.right.Check(item);
                    if (r == null)
                        return null;
                    return r || l;
                };
                return ORPatentGroup;
            }(PatentGroup));
            list.ORPatentGroup = ORPatentGroup;
            var FilterGroup = /** @class */ (function (_super) {
                __extends(FilterGroup, _super);
                function FilterGroup(patent) {
                    var _this = _super.call(this) || this;
                    if (!patent)
                        throw "";
                    _this.Patent = patent;
                    return _this;
                }
                FilterGroup.prototype.Begin = function (deb, count) {
                };
                FilterGroup.prototype.IsMatch = function (i, item) {
                    return (this._patent == null) || this._patent.Check(item);
                };
                FilterGroup.prototype.convertFromString = function (x) {
                    throw "null";
                };
                Object.defineProperty(FilterGroup.prototype, "LeftPatent", {
                    set: function (v) {
                        this.Patent.left = v;
                        this.Patent = this.Patent.Clone();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FilterGroup.prototype, "RightPatent", {
                    set: function (v) {
                        this.Patent.right = v;
                        this.Patent = this.Patent.Clone();
                    },
                    enumerable: true,
                    configurable: true
                });
                return FilterGroup;
            }(Corelib_1.utils.Filter));
            list.FilterGroup = FilterGroup;
            var LStringFilter = /** @class */ (function (_super) {
                __extends(LStringFilter, _super);
                function LStringFilter() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                LStringFilter.prototype.Begin = function (deb, count) {
                    this.deb = deb || 0;
                    this.count = count;
                };
                LStringFilter.prototype.IsMatch = function (i, item) {
                    if (this.deb === 0) {
                        if (this.count > 0) {
                            if (!(this._patent == null || this._patent.Check(item.toString())))
                                return false;
                            this.count--;
                            return true;
                        }
                    }
                    else
                        this.deb--;
                    return false;
                };
                LStringFilter.prototype.convertFromString = function (x) {
                    var p = new StringPatent(x);
                    return (this._patent && this._patent.equals(p)) ? this._patent : p;
                };
                return LStringFilter;
            }(Corelib_1.utils.Filter));
            list.LStringFilter = LStringFilter;
            var SubListFilter = /** @class */ (function (_super) {
                __extends(SubListFilter, _super);
                function SubListFilter() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.deb = 0;
                    _this.count = 50;
                    return _this;
                }
                SubListFilter.prototype.Begin = function (deb, count) {
                    this.deb = deb;
                    this.count = count;
                };
                SubListFilter.prototype.IsMatch = function (i, item) {
                    var t = (this._patent == null) || this._patent.Check(i);
                    if (t) {
                        if (this.deb > 0) {
                            this.deb--;
                            return false;
                        }
                        if (this.count > 0) {
                            this.count--;
                            return true;
                        }
                        return null;
                    }
                    return false;
                };
                SubListFilter.prototype.convertFromString = function (x) {
                    var e = x.split(/[\s|\\|\.|\/]+/);
                    var s = 0;
                    var n = 0;
                    if (e.length > 0)
                        s = parseFloat(e[0]);
                    if (e.length > 1)
                        n = parseFloat(e[1]);
                    else
                        n = s + (this._patent == null ? 10 : this._patent.End - this._patent.Start);
                    var p = new SubListPatent(s, n);
                    return (this._patent && this._patent.equals(p)) ? this._patent : p;
                };
                return SubListFilter;
            }(Corelib_1.utils.Filter));
            list.SubListFilter = SubListFilter;
        })(list = filters.list || (filters.list = {}));
    })(filters = exports.filters || (exports.filters = {}));
});
//# sourceMappingURL=Filters.js.map