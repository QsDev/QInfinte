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
define(["require", "exports", "../../../js/UI", "../../../js/Corelib", "../../../js/Models", "../Common", "../Search", "../../../js/Filters"], function (require, exports, UI_1, Corelib_1, Models_1, Common_1, Search_1, Filters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var b = true;
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var RegularUsersService = /** @class */ (function () {
        function RegularUsersService() {
        }
        RegularUsersService.prototype.GetLeftBar = function (target) {
            var _this = this;
            if (!this.lb) {
                this.lb = new UI_1.UI.Navbar();
                this.permission = new UI_1.UI.Glyph(UI_1.UI.Glyphs.flag, false, 'Permissions');
                this.validate = new UI_1.UI.Glyph(UI_1.UI.Glyphs.check, false, 'Validate');
                this.lock = new UI_1.UI.Glyph(UI_1.UI.Glyphs.lock, false, 'Lock');
                var oldget = this.lb.getTemplate;
                this.lb.getTemplate = function (c) {
                    var x = new UI_1.UI.Anchore(c);
                    var e = oldget(x);
                    e.addEventListener('click', _this.callback, { t: _this, p: c });
                    return e;
                };
                this.lb.OnInitialized = function (n) { return n.AddRange([_this.permission, _this.validate, _this.lock]); };
            }
            this._targer = target;
            return this.lb;
        };
        RegularUsersService.prototype.callback = function (s, e, p) {
            var t = p.t._targer;
            if (t)
                switch (p.p.Type) {
                    case UI_1.UI.Glyphs.flag:
                        t.ChangePermission();
                        return;
                    case UI_1.UI.Glyphs.check:
                        t.Validate();
                        return;
                    case UI_1.UI.Glyphs.lock:
                        t.Lock();
                        return;
                    default:
                        throw "Unreachable Code";
                }
        };
        RegularUsersService.prototype.callback_right = function (s, e, p) {
            var t = p.t._targer;
            if (t)
                switch (p.p.Type) {
                    case UI_1.UI.Glyphs.plusSign:
                        t.AddUser();
                        return;
                    case UI_1.UI.Glyphs.listAlt:
                        t.Edit();
                        return;
                    case UI_1.UI.Glyphs.trash:
                        t.Delete();
                        return;
                    case UI_1.UI.Glyphs.search:
                        t.Search();
                        return;
                    case UI_1.UI.Glyphs.filter:
                        t.Filter();
                    default:
                        throw "Unreachable Code";
                }
        };
        RegularUsersService.prototype.GetRightBar = function (target) {
            var _this = this;
            if (!this.rb) {
                this.rb = new UI_1.UI.Navbar();
                this.add = new UI_1.UI.Glyph(UI_1.UI.Glyphs.plusSign, false, 'Add');
                this.edit = new UI_1.UI.Glyph(UI_1.UI.Glyphs.listAlt, false, 'Edit');
                this.delete = new UI_1.UI.Glyph(UI_1.UI.Glyphs.trash, false, 'Delete');
                this.srch = new UI_1.UI.Glyph(UI_1.UI.Glyphs.search, false, 'Search');
                this.filter = new UI_1.UI.Glyph(UI_1.UI.Glyphs.filter, false, 'Filter');
                var oldget = this.rb.getTemplate;
                this.rb.getTemplate = function (c) {
                    var x = new UI_1.UI.Anchore(c);
                    var e = oldget(x);
                    e.addEventListener('click', _this.callback_right, { t: _this, p: c });
                    return e;
                };
                this.rb.OnInitialized = function (n) { return n.AddRange([_this.filter, _this.srch, Common_1.funcs.createSparator(), _this.add, _this.edit, _this.delete]); };
            }
            this._targer = target;
            return this.rb;
        };
        Object.defineProperty(RegularUsersService.prototype, "Target", {
            set: function (c) { this._targer = c; },
            enumerable: true,
            configurable: true
        });
        return RegularUsersService;
    }());
    var RegularUsers = /** @class */ (function (_super) {
        __extends(RegularUsers, _super);
        function RegularUsers() {
            var _this = _super.call(this, 'regular_users', "Regular Comptes") || this;
            _this.adapter = new UI_1.UI.ListAdapter('Client.Validation', 'UnRegUser.row');
            _this.searchFilter = new Filters_1.filters.list.StringFilter();
            _this.Title = "Regular Comptes";
            return _this;
        }
        RegularUsers.prototype.OnDeepSearch = function () {
            var _this = this;
            if (!this._deepSearch)
                this._deepSearch = new Search_1.SearchData.Login;
            this._deepSearch.Open(function (x) {
                var t = _this.searchList.Filter == _this._deepSearch;
                _this.searchList.Filter = _this._deepSearch;
                if (t)
                    _this.searchList.Reset();
            });
        };
        RegularUsers.prototype.OnSearche = function (oldPatent, newPatent) {
            var t = this.searchList.Filter == this.searchFilter;
            this.searchFilter.Patent = new Filters_1.filters.list.StringPatent(newPatent);
            if (!t)
                this.searchList.Filter = this.searchFilter;
            else
                this.searchList.Reset();
        };
        RegularUsers.prototype.OnKeyDown = function (e) {
            if (!this.adapter.OnKeyDown(e))
                _super.prototype.OnKeyDown.call(this, e);
        };
        RegularUsers.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this.Add(this.adapter);
            this.adapter.OnInitialized = function (p) { return _this.Update(); };
            this.searchList = GData.validateLogins.Filtred(this.searchFilter);
        };
        RegularUsers.prototype.Update = function () {
            var _this = this;
            GData.validateLogins.Clear();
            GData.requester.Get(Models_1.models.Logins, GData.validateLogins, null, function (s, r, iss) {
                if (iss)
                    _this.adapter.Source = _this.searchList;
            }, function (r, t) { return r.Url = "/_/Users?Valide=True"; });
        };
        RegularUsers.prototype.GetLeftBar = function () { return userService.GetLeftBar(this); };
        RegularUsers.prototype.GetRightBar = function () { return userService.GetRightBar(this); };
        Object.defineProperty(RegularUsers.prototype, "SelectedUser", {
            get: function () { return this.adapter.SelectedItem; },
            enumerable: true,
            configurable: true
        });
        RegularUsers.prototype.ChangePermission = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        RegularUsers.prototype.Lock = function () {
            var t = this.SelectedUser;
            if (t)
                Corelib_1.Api.RiseApi('lockuser', { data: t });
        };
        RegularUsers.prototype.Validate = function () {
            var t = this.SelectedUser;
            if (t)
                Corelib_1.Api.RiseApi('validateuser', { data: t });
        };
        RegularUsers.prototype.Delete = function () {
            var t = this.SelectedUser;
            if (t)
                Corelib_1.Api.RiseApi('removeuser', { data: t });
        };
        RegularUsers.prototype.Edit = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        RegularUsers.prototype.AddUser = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        RegularUsers.prototype.Filter = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        RegularUsers.prototype.Search = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        return RegularUsers;
    }(UI_1.UI.NavPanel));
    exports.RegularUsers = RegularUsers;
    var UnRegularUsers = /** @class */ (function (_super) {
        __extends(UnRegularUsers, _super);
        function UnRegularUsers() {
            var _this = _super.call(this, 'blocked_users', "Blocked Comptes") || this;
            _this.adapter = new UI_1.UI.ListAdapter('Client.Validation', 'RegUser.row');
            _this.searchFilter = new Filters_1.filters.list.StringFilter();
            _this.Title = "Blocked Comptes";
            return _this;
        }
        UnRegularUsers.prototype.OnDeepSearch = function () {
            var _this = this;
            if (!this._deepSearch)
                this._deepSearch = new Search_1.SearchData.Login;
            this._deepSearch.Open(function (x) {
                var t = _this.searchList.Filter == _this._deepSearch;
                _this.searchList.Filter = _this._deepSearch;
                if (t)
                    _this.searchList.Reset();
            });
        };
        UnRegularUsers.prototype.OnSearche = function (oldPatent, newPatent) {
            this.searchFilter.Patent = new Filters_1.filters.list.StringPatent(newPatent);
        };
        UnRegularUsers.prototype.OnKeyDown = function (e) {
            if (!this.adapter.OnKeyDown(e))
                _super.prototype.OnKeyDown.call(this, e);
        };
        UnRegularUsers.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this.Add(this.adapter);
            this.adapter.OnInitialized = function (p) { return _this.Update(); };
            this.searchList = GData.invalidateLogins.Filtred(this.searchFilter);
        };
        UnRegularUsers.prototype.Update = function () {
            var _this = this;
            GData.invalidateLogins.Clear();
            GData.requester.Get(Models_1.models.Logins, GData.invalidateLogins, null, function (s, r, iss) {
                if (iss)
                    _this.adapter.Source = _this.searchList;
            }, function (r, t) {
                r.Url = "/_/Users?Valide=False";
            });
        };
        UnRegularUsers.prototype.GetLeftBar = function () { return userService.GetLeftBar(this); };
        UnRegularUsers.prototype.GetRightBar = function () { return userService.GetRightBar(this); };
        UnRegularUsers.prototype.ChangePermission = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        UnRegularUsers.prototype.Lock = function () { var t = this.SelectedUser; if (t)
            Corelib_1.Api.RiseApi('lockuser', { data: t }); };
        UnRegularUsers.prototype.Validate = function () { var t = this.SelectedUser; if (t)
            Corelib_1.Api.RiseApi('validateuser', { data: t }); };
        UnRegularUsers.prototype.Delete = function () { var t = this.SelectedUser; if (t)
            Corelib_1.Api.RiseApi('removeuser', { data: t }); };
        UnRegularUsers.prototype.Edit = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        UnRegularUsers.prototype.AddUser = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        UnRegularUsers.prototype.Filter = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        UnRegularUsers.prototype.Search = function () { UI_1.UI.InfoArea.push("The Functionality Is Not Implimented Yet"); };
        Object.defineProperty(UnRegularUsers.prototype, "SelectedUser", {
            get: function () { return this.adapter.SelectedItem; },
            enumerable: true,
            configurable: true
        });
        return UnRegularUsers;
    }(UI_1.UI.NavPanel));
    exports.UnRegularUsers = UnRegularUsers;
    var userService = new RegularUsersService();
});
//# sourceMappingURL=Logins.js.map