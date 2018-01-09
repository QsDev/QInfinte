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
define(["require", "exports", "../../../js/UI", "../Common"], function (require, exports, UI_1, Common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var Agents = /** @class */ (function (_super) {
        __extends(Agents, _super);
        function Agents() {
            var _this = _super.call(this, 'agents_info', "Agents") || this;
            _this.Title = "Agents";
            return _this;
        }
        Object.defineProperty(Agents.prototype, "HasSearch", {
            get: function () { return UI_1.UI.SearchActionMode.NoSearch; },
            set: function (v) { },
            enumerable: true,
            configurable: true
        });
        Agents.prototype.Update = function () {
            GData.apis.Agent.SmartUpdate();
        };
        Agents.prototype.OnKeyDown = function (e) {
            if (!this.adapter.OnKeyDown(e)) {
                if (e.keyCode === UI_1.UI.Keys.F1)
                    this.getHelp({
                        "Enter": "Edit",
                        "Suppr": "Delete",
                        "F2": "Add New",
                    });
                else if (e.keyCode === UI_1.UI.Keys.F2)
                    GData.apis.Agent.CreateNew();
                else if (this.adapter.SelectedIndex != -1)
                    if (e.keyCode === 13)
                        GData.apis.Agent.Edit(true, this.adapter.SelectedItem, false);
                    else if (e.keyCode === UI_1.UI.Keys.Delete)
                        GData.apis.Agent.Delete(true, this.adapter.SelectedItem);
                    else
                        return _super.prototype.OnKeyDown.call(this, e);
                else
                    return _super.prototype.OnKeyDown.call(this, e);
            }
            e.stopPropagation();
            e.preventDefault();
            return true;
        };
        Agents.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.adapter = new UI_1.UI.ListAdapter('Agents.table');
            this.adapter.AcceptNullValue = false;
            this.Add(this.adapter);
            this.adapter.OnInitialized = function (p) { return p.Source = GData.__data.Agents; }; // this.searchList = GVars.__data.Agents.Filtred(this.searchFilter as any);
        };
        Agents.prototype.GetLeftBar = function () {
            var _this = this;
            if (!this.lb) {
                var l = new UI_1.UI.Navbar();
                var add_1 = new UI_1.UI.Glyph(UI_1.UI.Glyphs.plusSign, false, 'Add');
                var edit_1 = new UI_1.UI.Glyph(UI_1.UI.Glyphs.edit, false, 'Edit');
                var remove_1 = new UI_1.UI.Glyph(UI_1.UI.Glyphs.fire, false, 'Remove');
                var oldget_1 = l.getTemplate;
                l.getTemplate = function (c) {
                    var e = oldget_1(new UI_1.UI.Anchore(c));
                    if (c.Enable === false)
                        e.Enable = false;
                    else
                        e.addEventListener('click', _this.handleSerices, { t: _this, c: c.Type });
                    return e;
                };
                l.OnInitialized = function (l) { return l.AddRange([add_1, edit_1, remove_1]); };
                this.lb = l;
            }
            return this.lb;
        };
        Agents.prototype.handleSerices = function (s, e, p) {
            var c = UI_1.UI.Glyphs;
            switch (p.c) {
                case c.plusSign:
                    return GData.apis.Agent.CreateNew();
                case c.edit:
                    return GData.apis.Agent.Edit(true, p.t.adapter.SelectedItem, false);
                case c.fire:
                    return GData.apis.Agent.Delete(true, p.t.adapter.SelectedItem);
            }
        };
        return Agents;
    }(UI_1.UI.NavPanel));
    exports.Agents = Agents;
});
//# sourceMappingURL=Agents.js.map