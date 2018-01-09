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
define(["require", "exports", "../../../js/UI", "../../../js/Models", "../Common"], function (require, exports, UI_1, Models_1, Common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (vars) {
        GData = vars;
        return false;
    });
    var Services;
    (function (Services) {
        function OnItemSelected(m) {
            if (this.s)
                this.s.Callback(m.Source);
        }
        var SearchServices = /** @class */ (function (_super) {
            __extends(SearchServices, _super);
            function SearchServices() {
                var _this = _super.call(this) || this;
                _this.OnItemSelectedDlgt = { Invoke: OnItemSelected, Owner: _this };
                return _this;
            }
            SearchServices.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.Items.Add(new UI_1.UI.CItem('add', 'Add', '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('modify', 'Modify', '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('remove', 'Remove', '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('suggest', 'Suggests', '#', this.OnItemSelectedDlgt));
            };
            SearchServices.prototype.ApplyTo = function (s) {
                this.s = s;
            };
            return SearchServices;
        }(UI_1.UI.Navbar));
        Services.SearchServices = SearchServices;
        function CreateIcon(icon, title) {
            var t = document.createElement('sapn');
            t.classList.add('glyphicon', 'bgr', 'glyphicon-' + icon);
            t.title = title;
            return t;
        }
        var RFactureServices = /** @class */ (function (_super) {
            __extends(RFactureServices, _super);
            function RFactureServices() {
                var _this = _super.call(this) || this;
                _this.OnItemSelectedDlgt = { Invoke: OnItemSelected, Owner: _this };
                return _this;
            }
            RFactureServices.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.OnItemSelected = this.OnItemSelected;
                this.Items.Add(new UI_1.UI.CItem('save', CreateIcon('save', 'Save'), '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('refresh', CreateIcon('refresh', 'Refresh'), '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('check', CreateIcon('check', 'Validate'), '#', this.OnItemSelectedDlgt));
            };
            RFactureServices.prototype.OnItemSelected = function (m) {
                if (this.s)
                    this.s.Callback(m.Source);
            };
            RFactureServices.prototype.ApplyTo = function (s) {
                this.s = s;
            };
            return RFactureServices;
        }(UI_1.UI.Navbar));
        Services.RFactureServices = RFactureServices;
        var FactureService = /** @class */ (function (_super) {
            __extends(FactureService, _super);
            function FactureService() {
                var _this = _super.call(this) || this;
                _this.OnItemSelectedDlgt = { Invoke: OnItemSelected, Owner: _this };
                return _this;
            }
            FactureService.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.Items.Add(new UI_1.UI.CItem('add', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.edit, 'Add Products'), '#', this.OnItemSelectedDlgt));
                var t;
                GData.user.OnMessage(function (s, e) {
                    onLogged(e._new);
                });
                var onLogged = function (v) {
                    if (v) {
                        GData.requester.Push(Models_1.models.IsAdmin, new Models_1.models.IsAdmin(), null, function (s, r, iss) {
                            if (r.iss) {
                                t = t || new UI_1.UI.CItem('select', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.user, 'Select Client'), '#', _this.OnItemSelectedDlgt);
                                if (_this.Items.IndexOf(t) == -1)
                                    _this.Items.Insert(1, t);
                            }
                            else {
                                if (!t)
                                    return;
                                var o;
                                if ((o = _this.Items.IndexOf(t)) !== -1)
                                    _this.Items.RemoveAt(o);
                            }
                        });
                    }
                    else {
                    }
                };
                onLogged(GData.user.IsLogged);
                this.Items.Add(new UI_1.UI.CItem('delete', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.fire, 'Delete This Facture'), '#', this.OnItemSelectedDlgt));
            };
            FactureService.prototype.ApplyTo = function (s) {
                this.s = s;
            };
            return FactureService;
        }(UI_1.UI.Navbar));
        Services.FactureService = FactureService;
        var CostumersService = /** @class */ (function (_super) {
            __extends(CostumersService, _super);
            function CostumersService() {
                var _this = _super.call(this) || this;
                _this.OnItemSelectedDlgt = { Invoke: OnItemSelected, Owner: _this };
                return _this;
            }
            CostumersService.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.Items.Add(new UI_1.UI.CItem('get', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.user, 'Get Friends List'), '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('send', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.envelope, 'Send Invitation to my friends'), '#', this.OnItemSelectedDlgt));
            };
            CostumersService.prototype.ApplyTo = function (s) {
                this.s = s;
                return this;
            };
            return CostumersService;
        }(UI_1.UI.Navbar));
        Services.CostumersService = CostumersService;
        var FacturesService = /** @class */ (function (_super) {
            __extends(FacturesService, _super);
            function FacturesService() {
                var _this = _super.call(this) || this;
                _this.OnItemSelectedDlgt = { Invoke: OnItemSelected, Owner: _this };
                return _this;
            }
            FacturesService.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.Items.Add(new UI_1.UI.CItem('select', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.shareAlt, 'Open this Facture', 'bgr'), '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('new', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.plusSign, 'Ceate New Facture '), '#', this.OnItemSelectedDlgt));
            };
            FacturesService.prototype.ApplyTo = function (s) {
                this.s = s;
            };
            return FacturesService;
        }(UI_1.UI.Navbar));
        Services.FacturesService = FacturesService;
        var MyClientsService = /** @class */ (function (_super) {
            __extends(MyClientsService, _super);
            function MyClientsService() {
                var _this = _super.call(this) || this;
                _this.OnItemSelectedDlgt = { Invoke: OnItemSelected, Owner: _this };
                return _this;
            }
            MyClientsService.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.Items.Add(new UI_1.UI.CItem('new', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.plusSign, 'Create New Client'), '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('edit', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.edit, 'Edit'), '#', this.OnItemSelectedDlgt));
                this.Items.Add(new UI_1.UI.CItem('delete', UI_1.UI.Glyph.Create(UI_1.UI.Glyphs.fire, 'Delete'), '#', this.OnItemSelectedDlgt));
            };
            MyClientsService.prototype.ApplyTo = function (s) {
                this.s = s;
            };
            return MyClientsService;
        }(UI_1.UI.Navbar));
        Services.MyClientsService = MyClientsService;
    })(Services = exports.Services || (exports.Services = {}));
});
//# sourceMappingURL=QServices.js.map