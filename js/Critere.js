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
define(["require", "exports", "./Corelib", "./UI"], function (require, exports, Corelib_1, UI_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Bool = Boolean;
    var __typesDesc = new Corelib_1.collection.Dictionary("test");
    var Critere;
    (function (Critere_1) {
        var Critere = /** @class */ (function (_super) {
            __extends(Critere, _super);
            function Critere() {
                var _this = _super.call(this) || this;
                _this.Scop = new Corelib_1.bind.ValueScop(_this, Corelib_1.bind.BindingMode.TwoWay);
                return _this;
            }
            Critere.prototype.Check = function (s) {
                { }
                return this.isMatch(s);
            };
            Critere.prototype.convertFromString = function (x) {
                throw new Error("Method not implemented.");
            };
            Critere.prototype.Begin = function (deb, count) {
                this.deb = deb;
                this.fin = deb + count;
                return !this.IsQuerable();
            };
            Critere.prototype.IsMatch = function (i, item) {
                return i >= this.deb && i < this.fin && this.isMatch(item);
            };
            Critere.prototype.equals = function (p) {
                return p == this;
            };
            Critere.prototype.Activate = function () {
                this.Scop.setToScop('activate', true);
                var s = this.Scop.getScop('activate');
            };
            Critere.prototype.Disactivate = function () {
                this.Scop.setToScop('activate', false);
            };
            Critere.prototype.GetMatchs = function (p) {
                if (!this.IsQuerable())
                    return p;
                var v = [];
                for (var i = 0; i < p.length; i++) {
                    var x = p[i];
                    if (this.isMatch(x))
                        v.push(x);
                }
                return v;
            };
            Object.defineProperty(Critere.prototype, "View", {
                get: function () {
                    return this._view || (this._view = this.getView());
                },
                enumerable: true,
                configurable: true
            });
            Critere.prototype.isMatch = function (v) {
                return this._isMatch(v);
            };
            Critere.prototype.IsActivated = function () {
                var s = this.Scop.getScop('activate');
                return !!(s && s.Value);
            };
            Critere.prototype.init = function () {
                var vls = this.GetType().getFields();
                for (var i = 0; i < vls.length; i++) {
                    var p = vls[i];
                    if (Corelib_1.reflection.IsInstanceOf(p.Type, Text)) {
                        this.set(p, new Text(p.Name));
                    }
                    else if (Corelib_1.reflection.IsInstanceOf(p.Type, Vector)) {
                        this.set(p, new Vector(p.Name));
                    }
                    else if (Corelib_1.reflection.IsInstanceOf(p.Type, Period)) {
                        this.set(p, new Period(p.Name));
                    }
                    else if (Corelib_1.reflection.IsInstanceOf(p.Type, Boolean)) {
                        this.set(p, new Boolean(p.Name));
                    }
                    else
                        throw null;
                }
            };
            Critere.getTypeOf = function (type) {
                return this.Get(type).CritereType;
            };
            Critere.prototype.smartClear = function () {
                var vls = this.GetValues();
                for (var n in vls) {
                    var v = vls[n];
                    if (v instanceof Critere)
                        v.clear();
                }
            };
            Critere.ctor = function () {
                this.Register(String, Text, {}, function (o, dp, mvc, prm) { return new Text((prm && prm.label) || dp.Name); });
                this.Register(Bool, Boolean, {}, function (o, dp, mvc, prm) { return new Boolean((prm && prm.label) || dp.Name); });
                this.Register(Number, Vector, {}, function (o, dp, mvc, prm) { return new Vector((prm && prm.label) || dp.Name); });
                this.Register(Date, Period, {}, function (o, dp, mvc, prm) { return new Period((prm && prm.label) || dp.Name); });
            };
            Critere.Register = function (PropertyType, CritereType, Properties, CreateView) {
                __typesDesc.Set(PropertyType, { CritereType: CritereType, PropertyType: PropertyType, CreateView: CreateView, Properties: Properties });
            };
            Critere.Get = function (type, strict) {
                if (type instanceof Corelib_1.reflection.GenericType)
                    type = type.Constructor;
                else if (type instanceof Corelib_1.reflection.DelayedType)
                    type = type.Type;
                return __typesDesc.Get(type) || (strict ? null : __typesDesc.Get(String));
            };
            Critere.prototype.Open = function (callback) {
                var _this = this;
                if (!this.modal)
                    this.modal = new UI_1.UI.Modal();
                var m = this.modal;
                if (!m.IsInit)
                    m.OnInitialized = function (m) { m.Add(_this.View); m.OkTitle('Search'); m.Canceltitle('Cancel'); m.Title('QSearch'); };
                m.OnClosed.Add(function (m) {
                    if (m.Result == UI_1.UI.MessageResult.ok)
                        callback(_this);
                    m.Modal.OnClosed.Remove('');
                }, '');
                m.Open();
            };
            return Critere;
        }(Corelib_1.utils.Filter));
        Critere_1.Critere = Critere;
        var Unaire = /** @class */ (function (_super) {
            __extends(Unaire, _super);
            function Unaire() {
                return _super.call(this) || this;
            }
            Unaire.prototype.clear = function () {
                this.Value = null;
            };
            Unaire.__fields__ = function () { return [this.DPValue]; };
            Unaire.CheckType = function (e) {
                e.__this.CheckType(e);
            };
            Unaire.DPValue = Corelib_1.bind.DObject.CreateField('Value', Object, null, null, Unaire.CheckType);
            return Unaire;
        }(Critere));
        Critere_1.Unaire = Unaire;
        var Couple = /** @class */ (function (_super) {
            __extends(Couple, _super);
            function Couple() {
                return _super.call(this) || this;
            }
            Couple.__fields__ = function () { return [this.DPX, this.DPY]; };
            Couple.CheckType = function (e) {
                e.__this.CheckType(e);
            };
            Couple.DPX = Corelib_1.bind.DObject.CreateField('X', Object, null, null, Couple.CheckType);
            Couple.DPY = Corelib_1.bind.DObject.CreateField('Y', Object, null, null, Couple.CheckType);
            return Couple;
        }(Critere));
        Critere_1.Couple = Couple;
        var Text = /** @class */ (function (_super) {
            __extends(Text, _super);
            function Text(label) {
                var _this = _super.call(this) || this;
                _this.Label = label || "Label";
                return _this;
            }
            Text.prototype.clear = function () {
                this.Value = null;
            };
            Text.prototype.getView = function () {
                return new UI_1.UI.TControl('templates.crtText', this.Scop);
            };
            Object.defineProperty(Text.prototype, "Label", {
                set: function (v) {
                    this.Scop.setToScop('label', v);
                },
                enumerable: true,
                configurable: true
            });
            Text.prototype.CheckType = function (e) {
                e._new = e._new == null ? null : String(e._new).toLowerCase();
            };
            Text.prototype._isMatch = function (v) {
                var sv = this.Value;
                if (sv == null || sv == "")
                    return true;
                if (v == null)
                    return false;
                if (v == sv)
                    return true;
                return String(v).toLowerCase().indexOf(sv) != -1;
            };
            Text.prototype.IsQuerable = function () {
                return (this.Value != null && String(this.Value).trim() !== "");
            };
            return Text;
        }(Unaire));
        Critere_1.Text = Text;
        var Boolean = /** @class */ (function (_super) {
            __extends(Boolean, _super);
            function Boolean(label) {
                var _this = _super.call(this) || this;
                _this.Label = label || "Label";
                return _this;
            }
            Boolean.prototype.clear = function () {
                this.Value = undefined;
            };
            Boolean.prototype.getView = function () {
                return new UI_1.UI.TControl('templates.crtBool', this.Scop);
            };
            Object.defineProperty(Boolean.prototype, "Label", {
                set: function (v) {
                    this.Scop.setToScop('label', v);
                },
                enumerable: true,
                configurable: true
            });
            Boolean.prototype.CheckType = function (e) {
                e._new = e._new == null ? null : e._new === undefined ? undefined : !!e._new;
            };
            Boolean.prototype._isMatch = function (v) {
                var sv = this.Value;
                if (sv === undefined)
                    return true;
                return sv === v;
            };
            Boolean.prototype.IsQuerable = function () {
                return this.Value != null;
            };
            return Boolean;
        }(Unaire));
        Critere_1.Boolean = Boolean;
        var Vector = /** @class */ (function (_super) {
            __extends(Vector, _super);
            function Vector(title) {
                var _this = _super.call(this) || this;
                _this.Title = title || "Vector Title";
                _this.clear();
                return _this;
            }
            Vector.prototype.getView = function () {
                return new UI_1.UI.TControl('templates.crtVector', this.Scop);
            };
            Vector.prototype.CheckType = function (e) {
                if (typeof e._new === 'number')
                    return;
                if (typeof e._new === 'string')
                    e._new = parseFloat(e._new);
                else if (e._new == null)
                    return;
                else
                    e._new = e._old;
            };
            Vector.prototype._isMatch = function (v) {
                if (isNaN(v))
                    return true;
                var a = isNaN(this.X) ? -Number.MAX_VALUE : this.X || 0;
                var b = isNaN(this.Y) ? Number.MAX_VALUE : this.Y || 0;
                return v >= a && v <= b;
            };
            Object.defineProperty(Vector.prototype, "Title", {
                get: function () {
                    var x = this.Scop.getScop('title', false);
                    if (x)
                        return x.Value;
                    return null;
                },
                set: function (v) {
                    this.Scop.setToScop('title', v);
                },
                enumerable: true,
                configurable: true
            });
            Vector.prototype.clear = function () { this.X = 0; this.Y = 0; };
            Vector.prototype.IsQuerable = function () {
                return this.X != null || this.Y != null;
            };
            return Vector;
        }(Couple));
        Critere_1.Vector = Vector;
        var minDate = new Date("1/1/1000");
        var maxDate = new Date("12/12/9999");
        var Period = /** @class */ (function (_super) {
            __extends(Period, _super);
            function Period(title) {
                var _this = _super.call(this) || this;
                _this.Title = title || "Period Title";
                return _this;
            }
            Period.prototype.getView = function () {
                return new UI_1.UI.TControl('templates.crtPeriod', this.Scop);
            };
            Period.prototype.CheckType = function (e) {
                if (typeof e._new === 'number' || typeof e._new === 'string')
                    e._new = new Date(e._new);
                else if (e._new instanceof Date)
                    return;
                else if (e._new == null)
                    return e._new = new Date();
                else
                    e._new = e._old;
            };
            Period.prototype.IsQuerable = function () {
                return (this.X != null || this.Y != null);
            };
            Period.prototype._isMatch = function (v) {
                if (v == null)
                    return true;
                var iv = v && v.getTime();
                return iv >= this.X.getTime() && iv <= this.Y.getTime();
            };
            Object.defineProperty(Period.prototype, "Title", {
                get: function () {
                    var x = this.Scop.getScop('title', false);
                    if (x)
                        return x.Value;
                    return null;
                },
                set: function (v) {
                    this.Scop.setToScop('title', v);
                },
                enumerable: true,
                configurable: true
            });
            Period.prototype.clear = function () { this.Y = new Date(Date.now()); this.Y = new Date(0); };
            return Period;
        }(Couple));
        Critere_1.Period = Period;
        var ComplexCritere = /** @class */ (function (_super) {
            __extends(ComplexCritere, _super);
            function ComplexCritere() {
                var _this = _super.call(this) || this;
                _this.init();
                return _this;
            }
            Object.defineProperty(ComplexCritere.prototype, "Shema", {
                get: function () { return this.constructor.__shema; },
                enumerable: true,
                configurable: true
            });
            ComplexCritere.generateFieldsFrom = function (type, fields) {
                fields = fields || Corelib_1.bind.DObject.getFields(type);
                var _flds = [];
                var _propertiesSheam = [];
                for (var i = 0; i < fields.length; i++) {
                    var fld = fields[i];
                    if (!Corelib_1.reflection.IsInstanceOf(fld.Type, Corelib_1.collection.List)) {
                        var crDP = Corelib_1.bind.DObject.CreateField(fld.Name, this.getTypeOf(fld.Type));
                        _flds.push(crDP);
                        _propertiesSheam.push({ critereDP: crDP, propertyDP: fld });
                    }
                }
                this.__shema = {
                    critereType: this,
                    proxyType: type,
                    critereProperties: _flds,
                    propertiesSheam: _propertiesSheam
                };
                return this.__shema.critereProperties;
            };
            ComplexCritere.prototype.InitProperties = function (prams) {
                prams = prams || {};
                var flds = this.Shema.propertiesSheam;
                for (var i = 0; i < flds.length; i++) {
                    var p = flds[i];
                    var mvc = Critere.Get(p.propertyDP.Type);
                    this.set(p.critereDP, mvc.CreateView(this, p.propertyDP, mvc, prams[p.propertyDP.Name]));
                }
            };
            ComplexCritere.prototype.init = function () {
                this.InitProperties();
            };
            ComplexCritere.prototype.getView = function (container) {
                var c = container || new UI_1.UI.DivControl('section');
                var flds = this.Shema.propertiesSheam;
                flds = flds.sort(function (a, b) { return __typesDesc.IndexOf(a.propertyDP.Type); });
                for (var i = 0; i < flds.length; i++) {
                    var p = flds[i].critereDP;
                    var v = this.get(p);
                    if (v instanceof Critere)
                        c.Add(v.View);
                }
                return c;
            };
            ComplexCritere.prototype.clear = function () {
                var flds = Corelib_1.bind.DObject.getFields(this.GetType());
                for (var i = 0; i < flds.length; i++) {
                    var p = flds[i];
                    var v = this.get(p);
                    if (v instanceof Critere)
                        v.clear();
                }
            };
            ComplexCritere.prototype.IsQuerable = function () {
                this.indexes = [];
                var crPrps = this.Shema.propertiesSheam;
                for (var i = 0; i < crPrps.length; i++) {
                    var prSch = crPrps[i];
                    var v = this.get(prSch.critereDP);
                    if (v.IsActivated() && v.IsQuerable())
                        this.indexes.push({ critereValue: v, propertyDP: prSch.propertyDP });
                }
                return this.indexes.length != 0;
            };
            ComplexCritere.prototype.isMatch = function (p) {
                for (var i = 0; i < this.indexes.length; i++) {
                    var v = this.indexes[i];
                    if (!v.critereValue.isMatch(p.GetValue(v.propertyDP)))
                        return false;
                }
                return true;
            };
            ComplexCritere.prototype._isMatch = function (v) {
                throw new Error("Method not implemented.");
            };
            return ComplexCritere;
        }(Critere));
        Critere_1.ComplexCritere = ComplexCritere;
    })(Critere = exports.Critere || (exports.Critere = {}));
    window['Critere'] = Critere;
});
//# sourceMappingURL=Critere.js.map