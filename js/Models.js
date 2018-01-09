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
define(["require", "exports", "./Corelib", "./System"], function (require, exports, Corelib_1, System_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DPIsLogged = Corelib_1.bind.DObject.CreateField("CheckLogging", Boolean, null, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
    var models;
    (function (models) {
        var Job;
        (function (Job) {
            Job[Job["Detaillant"] = 0] = "Detaillant";
            Job[Job["Proffessional"] = 1] = "Proffessional";
            Job[Job["WGrossit"] = 2] = "WGrossit";
            Job[Job["Grossist"] = 2] = "Grossist";
            Job[Job["Entrepreneur"] = 3] = "Entrepreneur";
        })(Job = models.Job || (models.Job = {}));
        var Abonment;
        (function (Abonment) {
            Abonment[Abonment["Detaillant"] = 0] = "Detaillant";
            Abonment[Abonment["Proffessionnal"] = 1] = "Proffessionnal";
            Abonment[Abonment["DemiGrossist"] = 2] = "DemiGrossist";
            Abonment[Abonment["Grossist"] = 3] = "Grossist";
            Abonment[Abonment["Importateur"] = 4] = "Importateur";
            Abonment[Abonment["Exportateur"] = 5] = "Exportateur";
        })(Abonment = models.Abonment || (models.Abonment = {}));
        function get() {
            delete models.get;
            return DPIsLogged;
        }
        models.get = get;
        var VersmentType;
        (function (VersmentType) {
            VersmentType[VersmentType["Espece"] = 0] = "Espece";
            VersmentType[VersmentType["CCP"] = 1] = "CCP";
            VersmentType[VersmentType["CIB"] = 2] = "CIB";
            VersmentType[VersmentType["Cheque"] = 3] = "Cheque";
            VersmentType[VersmentType["EPay"] = 4] = "EPay";
            VersmentType[VersmentType["QPay"] = 5] = "QPay";
        })(VersmentType = models.VersmentType || (models.VersmentType = {}));
        var BonType;
        (function (BonType) {
            BonType[BonType["Bon"] = 0] = "Bon";
            BonType[BonType["Devise"] = 1] = "Devise";
            BonType[BonType["Facture"] = 2] = "Facture";
            BonType[BonType["BonCommand"] = 3] = "BonCommand";
        })(BonType = models.BonType || (models.BonType = {}));
        var MessageType;
        (function (MessageType) {
            MessageType[MessageType["Info"] = 0] = "Info";
            MessageType[MessageType["Error"] = 1] = "Error";
            MessageType[MessageType["Command"] = 2] = "Command";
            MessageType[MessageType["Confirm"] = 3] = "Confirm";
        })(MessageType = models.MessageType || (models.MessageType = {}));
        var AgentPermissions;
        (function (AgentPermissions) {
            AgentPermissions[AgentPermissions["None"] = 0] = "None";
            AgentPermissions[AgentPermissions["Agent"] = 1] = "Agent";
            AgentPermissions[AgentPermissions["Vendeur"] = 3] = "Vendeur";
            AgentPermissions[AgentPermissions["Achteur"] = 5] = "Achteur";
            AgentPermissions[AgentPermissions["Cassier"] = 9] = "Cassier";
            AgentPermissions[AgentPermissions["Validateur"] = 17] = "Validateur";
            AgentPermissions[AgentPermissions["Admin"] = -1] = "Admin";
        })(AgentPermissions = models.AgentPermissions || (models.AgentPermissions = {}));
        var Quality;
        (function (Quality) {
            Quality[Quality["None"] = 0] = "None";
            Quality[Quality["Low"] = 1] = "Low";
            Quality[Quality["Medium"] = 2] = "Medium";
            Quality[Quality["High"] = 3] = "High";
        })(Quality = models.Quality || (models.Quality = {}));
        var CallBackMessage = /** @class */ (function () {
            function CallBackMessage() {
            }
            return CallBackMessage;
        }());
        models.CallBackMessage = CallBackMessage;
    })(models = exports.models || (exports.models = {}));
    (function (models) {
        var sfpStore = new Corelib_1.collection.Dictionary("sfactures", false);
        var Person = /** @class */ (function (_super) {
            __extends(Person, _super);
            function Person() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Person.__fields__ = function () { return [this.DPName, this.DPTel, this.DPEmail, this.DPAddress, this.DPAvatar, this.DPObservation, this.DPLastModified, this.DPVersmentTotal, this.DPMontantTotal, this.DPNFactures, this.DPSoldTotal]; };
            Object.defineProperty(Person.prototype, "SoldTotal", {
                get: function () { return this.get(Person.DPSoldTotal); },
                enumerable: true,
                configurable: true
            });
            Person.ctor = function () {
                Person.DPLastModified = Corelib_1.bind.DObject.CreateField('LastModified', Date, null);
                this.DPEmail = Corelib_1.bind.DObject.CreateField("Email", String);
                this.DPTel = Corelib_1.bind.DObject.CreateField("Tel", String);
                this.DPName = Corelib_1.bind.DObject.CreateField("Name", String);
                this.DPAddress = Corelib_1.bind.DObject.CreateField("Address", String);
                this.DPAvatar = Corelib_1.bind.DObject.CreateField("Avatar", Picture, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                Person.DPObservation = Corelib_1.bind.DObject.CreateField('Observation', String);
                Person.DPVersmentTotal = Corelib_1.bind.DObject.CreateField('VersmentTotal', Number, null, calcSold);
                Person.DPMontantTotal = Corelib_1.bind.DObject.CreateField('MontantTotal', Number, null, calcSold);
                Person.DPNFactures = Corelib_1.bind.DObject.CreateField('NFactures', Number, null);
                Person.DPSoldTotal = Corelib_1.bind.DObject.CreateField('SoldTotal', Number, 0, null, null, Corelib_1.bind.PropertyAttribute.Private);
            };
            return Person;
        }(System_1.sdata.QShopRow));
        models.Person = Person;
        function calcSold(e) {
            e.__this.SetValue(Person.DPSoldTotal, (e.__this.MontantTotal || 0) - (e.__this.VersmentTotal || 0));
        }
        var Message = /** @class */ (function (_super) {
            __extends(Message, _super);
            function Message(id, message) {
                var _this = _super.call(this, id || Corelib_1.basic.New()) || this;
                _this.Content = message;
                return _this;
            }
            Message.__fields__ = function () { return [Message.DPContent, Message.DPTitle, Message.DPOkText, Message.DPCancelText, Message.DPAction, Message.DPType, Message.DPData]; };
            Message.getById = function (id, type) {
                return Message.pstore.Get(id);
            };
            Message.prototype.getStore = function () { return Message.pstore; };
            Message.DPData = Corelib_1.bind.DObject.CreateField("Data", Object);
            Message.DPContent = Corelib_1.bind.DObject.CreateField("Content", String, "", null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            Message.DPTitle = Corelib_1.bind.DObject.CreateField("Title", String, "", null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            Message.DPOkText = Corelib_1.bind.DObject.CreateField("OKText", String, undefined, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            Message.DPType = Corelib_1.bind.DObject.CreateField("Type", Number, models.MessageType.Info, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            Message.DPAction = Corelib_1.bind.DObject.CreateField("Action", String, undefined);
            Message.DPCancelText = Corelib_1.bind.DObject.CreateField("CancelText", String, undefined, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            Message.pstore = new Corelib_1.collection.Dictionary("Messages", true);
            return Message;
        }(System_1.sdata.QShopRow));
        models.Message = Message;
        var Picture = /** @class */ (function (_super) {
            __extends(Picture, _super);
            function Picture(id, url) {
                var _this = _super.call(this, id) || this;
                _this._region = new Corelib_1.basic.Rectangle();
                _this.ImageUrl = url;
                return _this;
            }
            Picture.__fields__ = function () { return [Picture.DPImageUrl]; };
            Object.defineProperty(Picture.prototype, "Region", {
                get: function () {
                    return this._region;
                },
                enumerable: true,
                configurable: true
            });
            Picture.getById = function (id, type) {
                return Picture.pstore.Get(id);
            };
            Picture.prototype.getStore = function () { return Picture.pstore; };
            Picture.DPImageUrl = Corelib_1.bind.DObject.CreateField("ImageUrl", String, "");
            Picture.pstore = new Corelib_1.collection.Dictionary("Pictures", true);
            return Picture;
        }(System_1.sdata.QShopRow));
        models.Picture = Picture;
        var Pictures = /** @class */ (function (_super) {
            __extends(Pictures, _super);
            function Pictures(_parent, items) {
                return _super.call(this, _parent, Picture, function (id) { return new Picture(id); }, items) || this;
            }
            Object.defineProperty(Pictures.prototype, "ArgType", {
                get: function () { return Picture; },
                enumerable: true,
                configurable: true
            });
            Pictures.prototype.getArgType = function (json) { return Picture; };
            Pictures.prototype.GetType = function () { return Pictures; };
            return Pictures;
        }(System_1.sdata.DataTable));
        models.Pictures = Pictures;
        var FactureBase = /** @class */ (function (_super) {
            __extends(FactureBase, _super);
            function FactureBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            FactureBase.__fields__ = function () {
                return [
                    this.DPTotal,
                    this.DPDateLivraison,
                    this.DPDate,
                    this.DPLastModified,
                    this.DPEditeur,
                    this.DPValidator,
                    this.DPObservation,
                    this.DPLockedBy,
                    this.DPLockedAt,
                    this.DPType,
                    this.DPIsValidated, this.DPIsOpen, this.DPNArticles, this.DPRef, this.DPSold, this.DPVersment
                ];
            };
            Object.defineProperty(FactureBase.prototype, "IsOpen", {
                get: function () { return this.get(FactureBase.DPIsOpen); },
                set: function (c) { if (c)
                    this._isFrozen = false; this.set(FactureBase.DPIsOpen, c); },
                enumerable: true,
                configurable: true
            });
            FactureBase.ctor = function () {
                FactureBase.DPLockedAt = Corelib_1.bind.DObject.CreateField('LockedAt', Date, null);
                FactureBase.DPLockedBy = Corelib_1.bind.DObject.CreateField('LockedBy', Agent, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                FactureBase.DPEditeur = Corelib_1.bind.DObject.CreateField('Editeur', models.Client, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                FactureBase.DPValidator = Corelib_1.bind.DObject.CreateField('Validator', Agent, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
            };
            FactureBase.prototype.Recalc = function (results) {
                var tt = this._isFrozen;
                try {
                    this._isFrozen = false;
                    this.CalcTotal();
                    var t = results.AsList();
                    var x = 0;
                    for (var i = t.length - 1; i >= 0; i--)
                        x += t[i].Montant;
                    this.Versment = x;
                }
                catch (e) {
                }
                this._isFrozen = tt;
            };
            FactureBase.DPTotal = Corelib_1.bind.DObject.CreateField('Total', Number, 0, function (e) {
                var x = e.__this;
                x.Sold = x.Total - x.Versment;
            }, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            FactureBase.DPDateLivraison = Corelib_1.bind.DObject.CreateField('DateLivraison', Date, null);
            FactureBase.DPDate = Corelib_1.bind.DObject.CreateField('Date', Date, null);
            FactureBase.DPLastModified = Corelib_1.bind.DObject.CreateField('LastModified', Date, null, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            FactureBase.DPObservation = Corelib_1.bind.DObject.CreateField('Observation', String, null);
            FactureBase.DPType = Corelib_1.bind.DObject.CreateField('Type', Number, null);
            FactureBase.DPIsValidated = Corelib_1.bind.DObject.CreateField('IsValidated', Boolean, null);
            FactureBase.DPIsOpen = Corelib_1.bind.DObject.CreateField('IsOpen', Boolean, null, function (e) { e.__this._isFrozen = !e._new; }, null, Corelib_1.bind.PropertyAttribute.NonSerializable | Corelib_1.bind.PropertyAttribute.Private);
            FactureBase.DPNArticles = Corelib_1.bind.DObject.CreateField('NArticles', Number, 0, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            FactureBase.DPRef = Corelib_1.bind.DObject.CreateField('Ref', String, null);
            FactureBase.DPSold = Corelib_1.bind.DObject.CreateField('Sold', Number, null, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            FactureBase.DPVersment = Corelib_1.bind.DObject.CreateField('Versment', Number, 0, function (e) {
                var x = e.__this;
                x.Sold = x.Total - x.Versment;
            }, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
            return FactureBase;
        }(System_1.sdata.QShopRow));
        models.FactureBase = FactureBase;
        var Client = /** @class */ (function (_super) {
            __extends(Client, _super);
            function Client(id) {
                return _super.call(this, id) || this;
            }
            Object.defineProperty(Client.prototype, "FullName", {
                get: function () { return this.get(Client.DPFullName); },
                enumerable: true,
                configurable: true
            });
            Client.prototype.toString = function () {
                return this.get(Client.DPFullName) || '' + ' \temail:' +
                    this.get(Person.DPEmail) || '' + ' \ttel:' +
                    this.get(Person.DPTel) || '' + ' \twork:' +
                    this.get(Client.DPWorkAt) || '';
            };
            Client.__fields__ = function () {
                return [
                    Client.DPFirstName,
                    Client.DPLastName,
                    Client.DPJob,
                    Client.DPWorkAt, Client.DPFullName, Client.DPAbonment
                ];
            };
            Client.getById = function (id, type) {
                return Client.pstore.Get(id);
            };
            Client.prototype.getStore = function () { return Client.pstore; };
            Client.ctor = function () {
                this.DPWorkAt = Corelib_1.bind.DObject.CreateField("WorkAt", String, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
            };
            Client.DPAbonment = Corelib_1.bind.DObject.CreateField("Abonment", Number, 0, function (e) { if (e._new == null)
                e._new = models.Abonment.Detaillant; });
            Client.DPFirstName = Corelib_1.bind.DObject.CreateField("FirstName", String, null, function (e) {
                e.__this.set(Client.DPFullName, (e._new || '') + ' ' + (e.__this.LastName || ''));
            });
            Client.DPLastName = Corelib_1.bind.DObject.CreateField("LastName", String, null, function (e) { e.__this.set(Client.DPFullName, (e.__this.FirstName || '') + ' ' + (e._new || '')); });
            Client.DPFullName = Corelib_1.bind.DObject.CreateField("FullName", String, null, null, null, Corelib_1.bind.PropertyAttribute.Private);
            Client.DPJob = Corelib_1.bind.DObject.CreateField("Job", Number, models.Job.Detaillant);
            Client.pstore = new Corelib_1.collection.Dictionary("Clients", true);
            return Client;
        }(Person));
        models.Client = Client;
        var SFacture = /** @class */ (function (_super) {
            __extends(SFacture, _super);
            function SFacture(id) {
                var _this = _super.call(this, id) || this;
                _this.ArticlesListener = { Invoke: _this.OnArticlesChanged, Owner: _this };
                _this.set(SFacture.DPArticles, new FakePrices(_this));
                return _this;
            }
            SFacture.__fields__ = function () { return [this.DPFournisseur, this.DPAchteur, this.DPArticles]; };
            SFacture.prototype.OnArticlesChanged = function (e) {
                var a = this.get(SFacture.DPArticles);
                var c = 0;
                if (a)
                    for (var i = 0, l = a.Count; i < l; i++) {
                        var t = a.Get(i);
                        c += t.Qte * t.PSel;
                    }
                this.set(SFacture.DPTotal, c);
            };
            SFacture.prototype.CalcTotal = function () {
                var a = this.get(SFacture.DPArticles);
                var c = 0;
                if (a)
                    for (var i = 0, l = a.Count; i < l; i++) {
                        var t = a.Get(i);
                        c += t.Qte * t.PSel;
                    }
                this.set(SFacture.DPTotal, c);
                return c;
            };
            SFacture.prototype.ToJson = function (_context, indexer) {
                return _super.prototype.ToJson.call(this, _context, indexer);
            };
            SFacture.prototype.getStore = function () { return sfpStore; };
            SFacture.getById = function (i) {
                return sfpStore.Get(i);
            };
            SFacture.prototype.toString = function () {
                return this._str || (this._str = models.BonType[this.Type] + " " + this.Ref + ": " + ' [' + Facture.getString(this.get(SFacture.DPFournisseur)) + '\rdate:' + Facture.getString(this.get(Facture.DPDate)) + '\rdatelivraison:' + Facture.getString(this.get(Facture.DPDateLivraison)) + ']');
            };
            SFacture.ctor = function () {
                this.DPFournisseur = Corelib_1.bind.DObject.CreateField('Fournisseur', Fournisseur, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPAchteur = Corelib_1.bind.DObject.CreateField('Achteur', Agent, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPArticles = Corelib_1.bind.DObject.CreateField('Articles', FakePrices, null, function (e) {
                    //if (e._old)
                    //    e._old.Unlisten = e.__this.ArticlesListener;
                    //if (e._new)
                    //    e._new.Listen = e.__this.ArticlesListener;
                    //e.__this.OnArticlesChanged(null);
                });
            };
            return SFacture;
        }(FactureBase));
        models.SFacture = SFacture;
        var Price = /** @class */ (function (_super) {
            __extends(Price, _super);
            function Price() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Price.CalclMoyen = function (_old, _new) {
                var o = _old.Qte || 0;
                var n = _new.Qte || 0;
                var sum = o + n;
                if (sum == 0)
                    return null;
                var props = Price.__fields__();
                var no = new FakePrice();
                for (var i = 0; i < props.length - 1; i++) {
                    var prop = props[i];
                    no.set(prop, ((_old.get(prop) || 0) * o + (_new.get(prop) || 0) * n) / sum);
                }
                return no;
            };
            Price.__fields__ = function () { return [Price.DPPSel, Price.DPValue, Price.DPPValue, Price.DPHWValue, Price.DPWValue, Price.DPQte]; };
            Price.prototype.GetPrice = function (abonment) {
                if (abonment < 4 && abonment >= 0)
                    return this.get(this.GetDProperty(abonment));
                return this.Value;
            };
            Price.prototype.GetDProperty = function (abonment) {
                if (abonment < 4 && abonment >= 0)
                    return Corelib_1.bind.DObject.GetDPropertyAt(this.constructor, Price.DPValue.Index + abonment);
                return Price.DPValue;
            };
            Price.GetDProperty = function (abonment) {
                if (abonment < 4 && abonment >= 0)
                    return Corelib_1.bind.DObject.GetDPropertyAt(this, Price.DPValue.Index + abonment);
                return Price.DPValue;
            };
            Price.GetAbonment = function (prop) {
                var t = prop.Index - Price.DPValue.Index;
                return (t < 0 || t > 3) ? models.Abonment.Detaillant : t;
            };
            Price.prototype.ISetValue = function (abonment, price) {
                var prop = this.GetDProperty(abonment);
                if (prop)
                    this.set(prop, price);
                else
                    this.set(Price.DPValue, price);
            };
            Price.prototype.IGetValue = function (abonment) {
                var prop = this.GetDProperty(abonment);
                if (prop)
                    return this.get(prop);
                return undefined;
            };
            Price.prototype.ClonePrices = function (to, alsoPSet) {
                to.Value = this.Value;
                to.PValue = this.PValue;
                to.HWValue = this.HWValue;
                to.WValue = this.WValue;
                if (alsoPSet)
                    to.PSel = this.PSel;
            };
            Price.prototype.getStore = function () { return Price.pStore; };
            Price.DPPSel = Corelib_1.bind.DObject.CreateField("PSel", Number, 0);
            Price.DPValue = Corelib_1.bind.DObject.CreateField("Value", Number, 0);
            Price.DPPValue = Corelib_1.bind.DObject.CreateField("PValue", Number, 0);
            Price.DPHWValue = Corelib_1.bind.DObject.CreateField("HWValue", Number, 0);
            Price.DPWValue = Corelib_1.bind.DObject.CreateField("WValue", Number, 0);
            Price.DPQte = Corelib_1.bind.DObject.CreateField("Qte", Number, null);
            Price.pStore = new Corelib_1.collection.Dictionary("prices");
            return Price;
        }(System_1.sdata.QShopRow));
        models.Price = Price;
        var FakePrice = /** @class */ (function (_super) {
            __extends(FakePrice, _super);
            function FakePrice() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            FakePrice.__fields__ = function () { return [FakePrice.DPProduct, FakePrice.DPNextRevage, FakePrice.DPSFacture, FakePrice.DPApplyPrice]; };
            FakePrice.ctor = function () {
                this.DPApplyPrice = Corelib_1.bind.DObject.CreateField('ApplyPrice', FakePrice);
                this.DPProduct = Corelib_1.bind.DObject.CreateField("Product", Product, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPNextRevage = Corelib_1.bind.DObject.CreateField("NextRevage", FakePrice, null, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
                this.DPSFacture = Corelib_1.bind.DObject.CreateField("Facture", SFacture, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
            };
            FakePrice.prototype.getStore = function () { return FakePrice.pStore; };
            FakePrice.getById = function (id) {
                return FakePrice.pStore.Get(id);
            };
            FakePrice.prototype.ToList = function () {
                var x = [];
                var t = this;
                do {
                    if (x.indexOf(t) !== -1)
                        break;
                    x.push(t);
                    t = t.NextRevage;
                } while (t != null);
                return new Corelib_1.collection.List(FakePrice, x);
            };
            FakePrice.prototype.toString = function () { return (this.get(FakePrice.DPProduct) || '').toString(); };
            FakePrice.pStore = new Corelib_1.collection.Dictionary("fakes");
            return FakePrice;
        }(Price));
        models.FakePrice = FakePrice;
        var FakePrices = /** @class */ (function (_super) {
            __extends(FakePrices, _super);
            function FakePrices(owner, array) {
                return _super.call(this, owner, FakePrice, function (id) { return new FakePrice(id); }, array) || this;
            }
            Object.defineProperty(FakePrices.prototype, "ArgType", {
                get: function () { return FakePrice; },
                enumerable: true,
                configurable: true
            });
            FakePrices.prototype.getArgType = function (json) { return FakePrice; };
            FakePrices.prototype.GetType = function () { return FakePrices; };
            return FakePrices;
        }(System_1.sdata.DataTable));
        models.FakePrices = FakePrices;
        var VersmentBase = /** @class */ (function (_super) {
            __extends(VersmentBase, _super);
            function VersmentBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ;
            VersmentBase.ctor = function () {
                this.DPMontant = Corelib_1.bind.DObject.CreateField("Montant", Number, 0);
                this.DPType = Corelib_1.bind.DObject.CreateField("Type", Number, models.VersmentType.Espece);
                this.DPDate = Corelib_1.bind.DObject.CreateField("Date", Date, new Date());
                this.DPCassier = Corelib_1.bind.DObject.CreateField('Cassier', Agent, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPObservation = Corelib_1.bind.DObject.CreateField('Observation', String, null);
            };
            VersmentBase.__fields__ = function () { return [VersmentBase.DPType, VersmentBase.DPMontant, VersmentBase.DPDate, this.DPCassier, this.DPObservation, this.DPRef]; };
            VersmentBase.DPRef = Corelib_1.bind.DObject.CreateField('Ref', String, null);
            return VersmentBase;
        }(System_1.sdata.QShopRow));
        models.VersmentBase = VersmentBase;
        var Versment = /** @class */ (function (_super) {
            __extends(Versment, _super);
            function Versment(id) {
                return _super.call(this, id) || this;
            }
            Versment.__fields__ = function () { return [this.DPClient, this.DPFacture]; };
            Object.defineProperty(Versment.prototype, "Partner", {
                get: function () { return this.get(Versment.DPClient); },
                enumerable: true,
                configurable: true
            });
            Versment.ctor = function () {
                this.DPClient = Corelib_1.bind.DObject.CreateField('Client', Client, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPFacture = Corelib_1.bind.DObject.CreateField('Facture', Facture, null);
            };
            Versment.getById = function (id, type) {
                return Versment.pstore.Get(id);
            };
            Versment.prototype.getStore = function () { return Versment.pstore; };
            Versment.pstore = new Corelib_1.collection.Dictionary("Versments", true);
            return Versment;
        }(VersmentBase));
        models.Versment = Versment;
        var SVersment = /** @class */ (function (_super) {
            __extends(SVersment, _super);
            function SVersment(id) {
                return _super.call(this, id) || this;
            }
            Object.defineProperty(SVersment.prototype, "Partner", {
                get: function () { return this.get(SVersment.DPFournisseur); },
                enumerable: true,
                configurable: true
            });
            SVersment.ctor = function () {
                this.DPFournisseur = Corelib_1.bind.DObject.CreateField('Fournisseur', Fournisseur, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPFacture = Corelib_1.bind.DObject.CreateField('Facture', SFacture, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
            };
            SVersment.__fields__ = function () { return [this.DPFournisseur, this.DPFacture]; };
            SVersment.getById = function (id, type) {
                return SVersment.pstore.Get(id);
            };
            SVersment.prototype.getStore = function () { return SVersment.pstore; };
            SVersment.pstore = new Corelib_1.collection.Dictionary("SVersments", true);
            return SVersment;
        }(VersmentBase));
        models.SVersment = SVersment;
        var BVersments = /** @class */ (function (_super) {
            __extends(BVersments, _super);
            function BVersments() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BVersments;
        }(System_1.sdata.DataTable));
        models.BVersments = BVersments;
        var Versments = /** @class */ (function (_super) {
            __extends(Versments, _super);
            function Versments(_parent) {
                return _super.call(this, _parent, Versment, function (id) { return new Versment(id); }) || this;
            }
            Object.defineProperty(Versments.prototype, "ArgType", {
                get: function () { return Versment; },
                enumerable: true,
                configurable: true
            });
            Versments.prototype.getArgType = function (json) { return Versment; };
            Versments.prototype.GetType = function () { return Versments; };
            return Versments;
        }(BVersments));
        models.Versments = Versments;
        var SVersments = /** @class */ (function (_super) {
            __extends(SVersments, _super);
            function SVersments(_parent) {
                return _super.call(this, _parent, Versment, function (id) { return new SVersment(id); }) || this;
            }
            Object.defineProperty(SVersments.prototype, "ArgType", {
                get: function () { return SVersment; },
                enumerable: true,
                configurable: true
            });
            SVersments.prototype.getArgType = function (json) { return SVersment; };
            SVersments.prototype.GetType = function () { return SVersments; };
            return SVersments;
        }(BVersments));
        models.SVersments = SVersments;
        var Costumers = /** @class */ (function (_super) {
            __extends(Costumers, _super);
            function Costumers(_parent, items) {
                return _super.call(this, _parent, models.Client, function (id) { return new models.Client(id); }, items) || this;
            }
            Object.defineProperty(Costumers.prototype, "ArgType", {
                get: function () { return models.Client; },
                enumerable: true,
                configurable: true
            });
            Costumers.prototype.getArgType = function (json) { return models.Client; };
            Costumers.prototype.GetType = function () { return Costumers; };
            return Costumers;
        }(System_1.sdata.DataTable));
        models.Costumers = Costumers;
        var Fournisseur = /** @class */ (function (_super) {
            __extends(Fournisseur, _super);
            function Fournisseur(id) {
                return _super.call(this, id) || this;
            }
            Fournisseur.__fields__ = function () { return [this.DPRef]; };
            Fournisseur.prototype.getStore = function () { return Fournisseur._mystore; };
            Fournisseur.prototype.toString = function () {
                return (this.Name || '') + ' / ' + (this.Tel || '');
            };
            Fournisseur.getById = function (id, type) {
                return Fournisseur._mystore.Get(id) || _super.getById.call(this, id, type);
            };
            Fournisseur.DPRef = Corelib_1.bind.DObject.CreateField('Ref', String, null);
            Fournisseur._mystore = new Corelib_1.collection.Dictionary("Fournisseurs", false);
            return Fournisseur;
        }(Person));
        models.Fournisseur = Fournisseur;
        var Fournisseurs = /** @class */ (function (_super) {
            __extends(Fournisseurs, _super);
            function Fournisseurs(_parent, items) {
                return _super.call(this, _parent, models.Client, function (id) { return new Fournisseur(id); }, items) || this;
            }
            Object.defineProperty(Fournisseurs.prototype, "ArgType", {
                get: function () { return Fournisseur; },
                enumerable: true,
                configurable: true
            });
            Fournisseurs.prototype.getArgType = function (json) { return Fournisseur; };
            Fournisseurs.prototype.GetType = function () { return Fournisseurs; };
            return Fournisseurs;
        }(System_1.sdata.DataTable));
        models.Fournisseurs = Fournisseurs;
        var Clients = /** @class */ (function (_super) {
            __extends(Clients, _super);
            function Clients(_parent, items) {
                return _super.call(this, _parent, models.Client, function (id) { return new models.Client(id); }, items) || this;
            }
            Object.defineProperty(Clients.prototype, "ArgType", {
                get: function () { return models.Client; },
                enumerable: true,
                configurable: true
            });
            Clients.prototype.getArgType = function (json) { return models.Client; };
            Clients.prototype.GetType = function () { return Clients; };
            return Clients;
        }(System_1.sdata.DataTable));
        models.Clients = Clients;
        var Mail = /** @class */ (function (_super) {
            __extends(Mail, _super);
            function Mail() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Mail.__fields__ = function () { return [Mail.DPFrom, Mail.DPTo, Mail.DPSubject, Mail.DPBody, Mail.DPTargetId, Mail.DPVisited]; };
            Mail.prototype.getStore = function () { return Mail.store; };
            Mail.DPFrom = Mail.CreateField('From', models.Client, null);
            Mail.DPTo = Mail.CreateField('To', models.Client, null);
            Mail.DPSubject = Mail.CreateField('Subject', String, null);
            Mail.DPBody = Mail.CreateField('Body', String, null);
            Mail.DPTargetId = Mail.CreateField('TargetId', Number, null);
            Mail.DPVisited = Mail.CreateField('Visited', Boolean, null);
            Mail.store = new Corelib_1.collection.Dictionary("mails");
            return Mail;
        }(System_1.sdata.QShopRow));
        models.Mail = Mail;
        var Mails = /** @class */ (function (_super) {
            __extends(Mails, _super);
            function Mails(parent, array) {
                return _super.call(this, parent, Mail, function (id) { return new Mail(id); }, array) || this;
            }
            return Mails;
        }(System_1.sdata.DataTable));
        models.Mails = Mails;
        var Categories = /** @class */ (function (_super) {
            __extends(Categories, _super);
            function Categories(_parent) {
                return _super.call(this, _parent, Category, function (id) { return new Category(id); }) || this;
            }
            Object.defineProperty(Categories.prototype, "ArgType", {
                get: function () { return Category; },
                enumerable: true,
                configurable: true
            });
            Categories.prototype.getArgType = function (json) { return Category; };
            Categories.prototype.GetType = function () { return Categories; };
            return Categories;
        }(System_1.sdata.DataTable));
        models.Categories = Categories;
        var Category = /** @class */ (function (_super) {
            __extends(Category, _super);
            function Category(id) {
                var _this = _super.call(this, id) || this;
                _this._s = null;
                return _this;
            }
            Category.__fields__ = function () {
                return [
                    Category.DPName,
                    Category.DPBase
                ];
            };
            Category.GetCategory = function (id) {
                var c = Category._categoriesStore.Get(id);
                if (c == null) {
                    c = new Category(id);
                    c.Update();
                }
                return c;
            };
            Object.defineProperty(Category, "Categories", {
                get: function () {
                    return Category._categoriesStore;
                },
                enumerable: true,
                configurable: true
            });
            Category.prototype.toString = function () {
                return this.Name;
            };
            Category.prototype.getStore = function () { return Category.pstore; };
            Category.getById = function (id, type) { return Category.pstore.Get(id); };
            Category.ctor = function () {
                this.DPName = Corelib_1.bind.DObject.CreateField("Name", String, null);
                this.DPBase = Corelib_1.bind.DObject.CreateField("Base", Category, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
            };
            Category._categoriesStore = new Categories(null);
            Category.pstore = new Corelib_1.collection.Dictionary('categories', true);
            return Category;
        }(System_1.sdata.QShopRow));
        models.Category = Category;
        var Agent = /** @class */ (function (_super) {
            __extends(Agent, _super);
            function Agent(id) {
                var _this = _super.call(this, id) || this;
                _this.Login = new models.Login(Corelib_1.basic.New());
                return _this;
            }
            Agent.__fields__ = function () {
                return [
                    Agent.DPLogin,
                    Agent.DPIsDisponible,
                    Agent.DPPermission,
                ];
            };
            Agent.getById = function (id, type) {
                return Agent.pstore.Get(id);
            };
            Agent.prototype.getStore = function () { return Agent.pstore; };
            Agent.ctor = function () {
                this.DPLogin = Corelib_1.bind.DObject.CreateField("Login", Login);
                this.DPIsDisponible = Corelib_1.bind.DObject.CreateField("IsDisponible", Boolean, null);
                this.DPPermission = Corelib_1.bind.DObject.CreateField('Permission', Number, 0);
            };
            Agent.prototype.toString = function () {
                var l = this.Login;
                var c = l && l.Client;
                var fn = c && c.FullName || '';
                var tel = c && c.Tel || '';
                return models.AgentPermissions[this.Permission || 1] + ' : ' + fn + ' / ' + tel;
            };
            Agent.pstore = new Corelib_1.collection.Dictionary("Agents", true);
            return Agent;
        }(System_1.sdata.QShopRow));
        models.Agent = Agent;
        var Agents = /** @class */ (function (_super) {
            __extends(Agents, _super);
            function Agents(_parent) {
                return _super.call(this, _parent, Agent, function (id) { return new Agent(id); }) || this;
            }
            Object.defineProperty(Agents.prototype, "ArgType", {
                get: function () { return Agent; },
                enumerable: true,
                configurable: true
            });
            Agents.prototype.getArgType = function (json) { return Agent; };
            Agents.prototype.GetType = function () { return Agents; };
            return Agents;
        }(System_1.sdata.DataTable));
        models.Agents = Agents;
        var Product = /** @class */ (function (_super) {
            __extends(Product, _super);
            function Product(id) {
                return _super.call(this, id) || this;
            }
            Product.prototype.toString = function () {
                return this._toString;
            };
            Product.__fields__ = function () {
                return [
                    Product.DPCategory,
                    Product.DPName,
                    Product.DPDimention,
                    Product.DPSerieName,
                    Product.DPQuality,
                    Product.DPPicture,
                    Product.DPDescription,
                    Product.DPRevage,
                    Product.DPCurrentArticle
                ];
            };
            Product.prototype.onPropertyChanged = function (ev) {
                if (ev.prop.Index >= Product.DPName.Index && ev.prop.Index <= Product.DPSerieName.Index) {
                    this._toString = (this.Name || '') + '  ' + (this.Dimention || '') + ' ' + (this.SerieName || '') + ' ' + (this.Category && this.Category.toString() || "");
                }
                _super.prototype.onPropertyChanged.call(this, ev);
            };
            Product.getById = function (id, type) {
                return Product.pstore.Get(id);
            };
            Product.prototype.getStore = function () { return Product.pstore; };
            Product.prototype.FromJson = function (json, context, update) {
                return _super.prototype.FromJson.call(this, json, context, update);
            };
            Product.ctor = function () {
                /// Info
                this.DPCategory = Corelib_1.bind.DObject.CreateField("Category", Category, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPName = Corelib_1.bind.DObject.CreateField("Name", String, null);
                this.DPDescription = Corelib_1.bind.DObject.CreateField("Description", String);
                this.DPPicture = Corelib_1.bind.DObject.CreateField("Picture", Picture, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPDimention = Corelib_1.bind.DObject.CreateField("Dimention", String);
                this.DPQuality = Corelib_1.bind.DObject.CreateField("Quality", Number);
                this.DPSerieName = Corelib_1.bind.DObject.CreateField("SerieName", String);
                Product.DPLastModified = Corelib_1.bind.DObject.CreateField('LastModified', Date, null, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
                ///Product
                this.DPRevage = Corelib_1.bind.DObject.CreateField('Revage', FakePrice, null, null, null, Corelib_1.bind.PropertyAttribute.NonSerializable);
                this.DPCurrentArticle = Corelib_1.bind.DObject.CreateField('CurrentArticle', Article, null, null, null, Corelib_1.bind.PropertyAttribute.Private);
            };
            Product.pstore = new Corelib_1.collection.Dictionary("Products", true);
            return Product;
        }(Price));
        models.Product = Product;
        var Products = /** @class */ (function (_super) {
            __extends(Products, _super);
            function Products(_parent, items) {
                return _super.call(this, _parent, Product, function (id) { return new Product(id); }, items) || this;
            }
            Object.defineProperty(Products.prototype, "ArgType", {
                get: function () { return Product; },
                enumerable: true,
                configurable: true
            });
            Products.prototype.getArgType = function (json) { return Product; };
            Products.prototype.GetType = function () { return Products; };
            return Products;
        }(System_1.sdata.DataTable));
        models.Products = Products;
        var Article = /** @class */ (function (_super) {
            __extends(Article, _super);
            function Article(id) {
                var _this = _super.call(this, id) || this;
                _this.OCount = 0;
                return _this;
            }
            Article.prototype.toString = function () {
                return this.Product.toString() + ' Count:' + this.Count;
            };
            Article.__fields__ = function () {
                return [
                    Article.DPOwner,
                    Article.DPProduct,
                    Article.DPPrice,
                    Article.DPCount,
                ];
            };
            Article.getById = function (id, type) {
                return Article.pstore.Get(id);
            };
            Article.prototype.getStore = function () { return Article.pstore; };
            Article.prototype.FromJson = function (json, context, update) {
                _super.prototype.FromJson.call(this, json, context, update);
                this.OCount = this.Count;
                return this;
            };
            Article.ctor = function () {
                this.DPProduct = Corelib_1.bind.DObject.CreateField('Product', Product, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPOwner = Corelib_1.bind.DObject.CreateField('Owner', Facture, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPPrice = Corelib_1.bind.DObject.CreateField('Price', Number, null);
                this.DPCount = Corelib_1.bind.DObject.CreateField("Count", Number, 0);
            };
            Article.pstore = new Corelib_1.collection.Dictionary("Articles", true);
            return Article;
        }(System_1.sdata.QShopRow));
        models.Article = Article;
        var Articles = /** @class */ (function (_super) {
            __extends(Articles, _super);
            function Articles(_parent, items) {
                return _super.call(this, _parent, Article, function (id) { return new Article(id); }, items) || this;
            }
            Object.defineProperty(Articles.prototype, "ArgType", {
                get: function () { return Article; },
                enumerable: true,
                configurable: true
            });
            Articles.prototype.getArgType = function (json) { return Article; };
            Articles.prototype.GetType = function () { return Articles; };
            return Articles;
        }(System_1.sdata.DataTable));
        models.Articles = Articles;
        var Facture = /** @class */ (function (_super) {
            __extends(Facture, _super);
            function Facture(id) {
                var _this = _super.call(this, id) || this;
                _this.Articles = new Articles(_this);
                return _this;
            }
            Facture.getString = function (obj) {
                if (obj == null)
                    return "null";
                return obj.toString();
            };
            Facture.prototype.toString = function () {
                return this._str || (this._str = models.BonType[this.Type] + " " + this.Ref + ": " + ' [' + Facture.getString(this.get(Facture.DPClient)) + '\rdate:' + Facture.getString(this.get(Facture.DPDate)) + '\rdatelivraison:' + this.get(Facture.DPDateLivraison) + ']');
            };
            Facture.__fields__ = function () {
                return [
                    Facture.DPAbonment,
                    Facture.DPClient,
                    Facture.DPAgent,
                    Facture.DPArticles, this.DPPour
                ];
            };
            Facture.prototype.CalcTotal = function () {
                var arts = this.Articles;
                var c = 0;
                for (var i = 0, l = arts.Count; i < l; i++) {
                    var art = arts.Get(i);
                    if (art)
                        c += art.Count * (art.Price || 0.0);
                }
                var tt = this._isFrozen;
                this._isFrozen = false;
                this.Total = c;
                this._isFrozen = tt;
                var v = 0;
                return c;
            };
            Facture.prototype.Freeze = function () {
                //this.FromJson
                //super.Freeze();
                //this.Articles.Freeze();
                this._isFrozen = true;
            };
            Facture.getById = function (id, type) {
                return Facture.pstore.Get(id);
            };
            Facture.prototype.getStore = function () { return Facture.pstore; };
            Facture.freezeArray = function (e) {
                if (e._new == null)
                    if (e._old == null)
                        return;
                    else {
                        e._old.Clear();
                        e._new = e._old;
                    }
            };
            Facture._ctor = function () {
                this.DPAgent = Corelib_1.bind.DObject.CreateField("Vendeur", Agent, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPClient = Corelib_1.bind.DObject.CreateField("Client", models.Client, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
                this.DPArticles = Corelib_1.bind.DObject.CreateField("Articles", Articles, null, null, this.freezeArray);
                this.DPAbonment = Corelib_1.bind.DObject.CreateField('Abonment', Number, models.Abonment.Detaillant, null);
                Facture.DPPour = Corelib_1.bind.DObject.CreateField('Pour', Client, null);
            };
            Facture.prototype.Update = function () {
            };
            Facture.pstore = new Corelib_1.collection.Dictionary("Factures", true);
            return Facture;
        }(FactureBase));
        models.Facture = Facture;
        var SFactures = /** @class */ (function (_super) {
            __extends(SFactures, _super);
            function SFactures(owner, array) {
                return _super.call(this, owner, SFacture, function (id) { return new SFacture(id); }, array) || this;
            }
            Object.defineProperty(SFactures.prototype, "ArgType", {
                get: function () { return SFacture; },
                enumerable: true,
                configurable: true
            });
            SFactures.prototype.getArgType = function (json) { return SFacture; };
            SFactures.prototype.GetType = function () { return SFactures; };
            return SFactures;
        }(System_1.sdata.DataTable));
        models.SFactures = SFactures;
        var Factures = /** @class */ (function (_super) {
            __extends(Factures, _super);
            function Factures(_parent, items) {
                return _super.call(this, _parent, Facture, function (id) { return new Facture(id); }, items) || this;
            }
            Object.defineProperty(Factures.prototype, "ArgType", {
                get: function () { return Facture; },
                enumerable: true,
                configurable: true
            });
            Factures.prototype.getArgType = function (json) { return Facture; };
            Factures.prototype.GetType = function () { return Factures; };
            Factures.prototype.OnDeserialize = function (list) {
                this.Order(function (a, b) { return a.Date > b.Date; });
            };
            return Factures;
        }(System_1.sdata.DataTable));
        models.Factures = Factures;
        var QData = /** @class */ (function (_super) {
            __extends(QData, _super);
            function QData() {
                var _this = _super.call(this, Corelib_1.basic.New()) || this;
                _this.oacd = { Owner: _this, Invoke: _this.OnArticlesChanged };
                _this.articles = new Articles(_this);
                _this.i = 0;
                _this.set(QData.DPAgents, new models.Agents(_this));
                _this.set(QData.DPProducts, new Products(_this));
                _this.set(QData.DPFactures, new Factures(_this));
                _this.set(QData.DPArticles, new Articles(_this));
                _this.set(QData.DPCostmers, new Costumers(_this));
                _this.set(QData.DPCategories, new Categories(_this));
                _this.set(QData.DPFournisseurs, new Fournisseurs(_this));
                _this.set(QData.DPProducts, new Products(_this));
                _this.set(QData.DPVersments, new Versments(_this));
                _this.set(QData.DPSVersments, new SVersments(_this));
                var cc = new FakePrices(_this);
                _this.set(QData.DPPrices, cc);
                cc.Listen = function (v) { };
                _this.set(QData.DPSFactures, new SFactures(_this));
                window.ctgs = _this.Categories;
                window.qdata = _this;
                Corelib_1.bind.NamedScop.Create("qdata", _this);
                return _this;
            }
            QData.prototype.getStore = function () { return QData.pStore; };
            QData.__fields__ = function () { return [QData.DPProducts, QData.DPSelectedFacture, QData.DPFactures, QData.DPAgents, QData.DPArticles, QData.DPCategories, QData.DPPrices, QData.DPSFactures, QData.DPFournisseurs, QData.DPVersments, QData.DPSVersments]; };
            Object.defineProperty(QData.prototype, "Products", {
                get: function () { return this.get(QData.DPProducts); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Prices", {
                get: function () { return this.get(QData.DPPrices); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Categories", {
                get: function () { return this.get(QData.DPCategories); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Articles", {
                get: function () { return this.get(QData.DPArticles); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Factures", {
                get: function () { return this.get(QData.DPFactures); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "SFactures", {
                get: function () { return this.get(QData.DPSFactures); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Costumers", {
                get: function () { return this.get(QData.DPCostmers); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Fournisseurs", {
                get: function () { return this.get(QData.DPFournisseurs); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Agents", {
                get: function () { return this.get(QData.DPAgents); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "Versments", {
                get: function () { return this.get(QData.DPVersments); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QData.prototype, "SVersments", {
                get: function () { return this.get(QData.DPSVersments); },
                enumerable: true,
                configurable: true
            });
            QData.prototype.onCurrentFactureChanged = function (e) {
                if (e._old) {
                    var o = e._old.Articles;
                    for (var i = 0, l = o.Count; i < l; i++) {
                        var j = o.Get(i);
                        j.Product.CurrentArticle = null;
                    }
                    this.articles.Clear();
                    o.Unlisten = this.oacd;
                }
                if (e._new) {
                    var o = e._new.Articles;
                    for (var i = 0, l = o.Count; i < l; i++) {
                        var j = o.Get(i);
                        var p = j.Product;
                        if (p)
                            p.CurrentArticle = j;
                        this.articles.Add(j);
                    }
                    o.Listen = this.oacd;
                }
            };
            QData.prototype.OnArticlesChanged = function (e) {
                switch (e.event) {
                    case Corelib_1.collection.CollectionEvent.Added:
                        e.newItem.Product.CurrentArticle = e.newItem;
                        this.articles.Insert(e.startIndex, e.newItem);
                        break;
                    case Corelib_1.collection.CollectionEvent.Cleared:
                        var o = this.articles;
                        for (var i = 0, l = o.Count; i < l; i++) {
                            var j = o.Get(i);
                            j.Product.CurrentArticle = null;
                        }
                        this.articles.Clear();
                        break;
                    case Corelib_1.collection.CollectionEvent.Removed:
                        e.oldItem.Product.CurrentArticle = null;
                        this.articles.RemoveAt(e.startIndex);
                        break;
                    case Corelib_1.collection.CollectionEvent.Replace:
                        e.oldItem.Product.CurrentArticle = null;
                        e.newItem.Product.CurrentArticle = e.newItem;
                        this.articles.Set(e.startIndex, e.newItem);
                        break;
                    case Corelib_1.collection.CollectionEvent.Reset:
                        var o = this.articles;
                        for (var i = 0, l = o.Count; i < l; i++) {
                            var j = o.Get(i);
                            j.Product.CurrentArticle = null;
                        }
                        this.articles.Clear();
                        var o = this.SelectedFacture.Articles;
                        for (var i = 0, l = o.Count; i < l; i++) {
                            var j = o.Get(i);
                            j.Product.CurrentArticle = j;
                            this.articles.Add(j);
                        }
                        break;
                }
            };
            QData.prototype.Clear = function () {
                var c = this.GetValues();
                for (var i = 0; i < c.length; i++) {
                    var j = c[i];
                    if (j instanceof Corelib_1.collection.List) {
                        j.Clear();
                    }
                }
            };
            QData.prototype.createNew = function () {
                var pr = new models.Product(Corelib_1.basic.New());
                var t = this.i++ % 2000;
                var i = QData.i++ % 2;
                if (i == 0) {
                    pr.Name = "W3 School 00" + t + '-';
                    pr.Revage = new models.FakePrice();
                    pr.Revage.Value = 200;
                    pr.Picture = new models.Picture(Corelib_1.basic.New(), "./img/2.jpg");
                    pr.Description = "Ce coude est plus haut quality exist in algeria \r where ever you found it buy it dont wory";
                }
                else {
                    pr.Name = "Coude 110 00" + t + '-';
                    pr.Revage = new models.FakePrice();
                    pr.Revage.Value = 120;
                    pr.Picture = new models.Picture(Corelib_1.basic.New(), "./img/2.jpg");
                    pr.Description = "We have used Bootstrap's grid system \rto create some responsive HTML templates.";
                }
                return pr;
            };
            QData.pStore = new Corelib_1.collection.Dictionary("QData", true);
            QData.DPProducts = Corelib_1.bind.DObject.CreateField("Products", Products, null);
            QData.DPPrices = Corelib_1.bind.DObject.CreateField("Prices", FakePrices, null);
            QData.DPCategories = Corelib_1.bind.DObject.CreateField("Categories", Categories);
            QData.DPArticles = Corelib_1.bind.DObject.CreateField("Articles", Articles, null);
            QData.DPSelectedFacture = Corelib_1.bind.DObject.CreateField("SelectedFacture", Facture, null, function (e) { return e.__this.onCurrentFactureChanged(e); });
            QData.DPFactures = Corelib_1.bind.DObject.CreateField("Factures", Factures, null);
            QData.DPSFactures = Corelib_1.bind.DObject.CreateField("SFactures", SFactures, null);
            QData.DPCostmers = Corelib_1.bind.DObject.CreateField("Costumers", Costumers, null);
            QData.DPFournisseurs = Corelib_1.bind.DObject.CreateField("Fournisseurs", Fournisseurs, null);
            QData.DPAgents = Corelib_1.bind.DObject.CreateField("Agents", Agents, null);
            QData.DPVersments = Corelib_1.bind.DObject.CreateField('Versments', Versments, null);
            QData.DPSVersments = Corelib_1.bind.DObject.CreateField('SVersments', SVersments, null);
            QData.i = 0;
            return QData;
        }(System_1.sdata.QShopRow));
        models.QData = QData;
        var ii = /** @class */ (function () {
            function ii() {
            }
            return ii;
        }());
        models.ii = ii;
        var Logout = /** @class */ (function (_super) {
            __extends(Logout, _super);
            function Logout() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Logout.prototype.getStore = function () { };
            return Logout;
        }(System_1.sdata.QShopRow));
        models.Logout = Logout;
        var Login = /** @class */ (function (_super) {
            __extends(Login, _super);
            function Login(id) {
                return _super.call(this, id || Corelib_1.basic.New()) || this;
            }
            Object.defineProperty(Login.prototype, "IsLogged", {
                get: function () { return this.get(DPIsLogged); },
                enumerable: true,
                configurable: true
            });
            Login.__fields__ = function () { return [DPIsLogged, Login.DPUsername, Login.DPPwd, Login.DPIdentification, Login.DPClient]; };
            Login.prototype.getStore = function () { return Login.pStore; };
            Login.prototype.GetType = function () { return Login; };
            Login.prototype.OnMessage = function (invoke) {
                this.OnPropertyChanged(DPIsLogged, invoke);
                _super.prototype.FromJson;
            };
            Login.prototype.FromJson = function (json, context, update) {
                if (typeof json === 'number') {
                    if (this.Stat >= System_1.sdata.DataStat.Updating)
                        return this;
                    this.Id = json;
                    this.set(System_1.sdata.DataRow.DPStat, System_1.sdata.DataStat.Updating);
                    System_1.Controller.ProxyData.Default.Request(this.constructor, "UPDATE", this, this);
                    //Controller.ProxyData.Default.Push(this.constructor, this, null);
                }
                else {
                    Corelib_1.bind.DObject.prototype.FromJson.call(this, json, context, update);
                    if (json != null && json.IsFrozen == true) {
                        this.Freeze();
                    }
                }
                return this;
            };
            Login.DPUsername = Corelib_1.bind.DObject.CreateField("Username", String, null);
            Login.DPPwd = Corelib_1.bind.DObject.CreateField("Pwd", String, null);
            Login.DPIdentification = Corelib_1.bind.DObject.CreateField("Identification", String, undefined);
            Login.DPClient = Corelib_1.bind.DObject.CreateField("Client", models.Client, null);
            //public get Stat() {
            //	
            //	return Login.update ? 0 : this.get(models.QData.DPStat);
            //}															
            Login.pStore = new Corelib_1.collection.Dictionary("Signup", false);
            return Login;
        }(System_1.sdata.QShopRow));
        models.Login = Login;
        var Signup = /** @class */ (function (_super) {
            __extends(Signup, _super);
            function Signup() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return Signup;
        }(Login));
        models.Signup = Signup;
        var Signout = /** @class */ (function (_super) {
            __extends(Signout, _super);
            function Signout() {
                return _super.call(this, Corelib_1.basic.New()) || this;
            }
            Signout.__fields__ = function () {
                return [];
            };
            Signout.prototype.getStore = function () { return Signout.pStore; };
            Signout.prototype.GetType = function () { return Signout; };
            Signout.pStore = new Corelib_1.collection.Dictionary("Signout", false);
            return Signout;
        }(System_1.sdata.QShopRow));
        models.Signout = Signout;
        var Logins = /** @class */ (function (_super) {
            __extends(Logins, _super);
            function Logins(_parent, items) {
                return _super.call(this, _parent, Login, function (id) { return new Login(); }, items) || this;
            }
            Object.defineProperty(Logins.prototype, "ArgType", {
                get: function () { return Facture; },
                enumerable: true,
                configurable: true
            });
            Logins.prototype.getArgType = function (json) { return Facture; };
            Logins.prototype.GetType = function () { return Factures; };
            Logins.prototype.OnDeserialize = function (list) {
                this.Order(function (a, b) { return a.Client.Id > b.Client.Id; });
            };
            return Logins;
        }(System_1.sdata.DataTable));
        models.Logins = Logins;
        var IsAdmin = /** @class */ (function (_super) {
            __extends(IsAdmin, _super);
            function IsAdmin() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            IsAdmin.prototype.getStore = function () { return null; };
            return IsAdmin;
        }(System_1.sdata.QShopRow));
        models.IsAdmin = IsAdmin;
        var TransferType;
        (function (TransferType) {
            TransferType[TransferType["Versment"] = 0] = "Versment";
            TransferType[TransferType["Facture"] = 1] = "Facture";
        })(TransferType = models.TransferType || (models.TransferType = {}));
        var EtatTransfer = /** @class */ (function (_super) {
            __extends(EtatTransfer, _super);
            function EtatTransfer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            EtatTransfer.prototype.getStore = function () {
                return EtatTransfer._store;
            };
            EtatTransfer.prototype.Update = function () {
            };
            EtatTransfer.prototype.Upload = function () {
            };
            EtatTransfer.__fields__ = function () {
                return [this.DPType, this.DPDate, this.DPMontantEntree, this.DPMontantSortie, this.DPTransactionId, this.DPActualSold];
            };
            EtatTransfer._store = new Corelib_1.collection.Dictionary("EtatTransfer");
            EtatTransfer.DPType = Corelib_1.bind.DObject.CreateField('Type', Number, TransferType.Facture);
            EtatTransfer.DPDate = Corelib_1.bind.DObject.CreateField('Date', Date);
            EtatTransfer.DPMontantEntree = Corelib_1.bind.DObject.CreateField('MontantEntree', Number, 0);
            EtatTransfer.DPMontantSortie = Corelib_1.bind.DObject.CreateField('MontantSortie', Number, 0);
            EtatTransfer.DPTransactionId = Corelib_1.bind.DObject.CreateField('TransactionId', Number, 0);
            EtatTransfer.DPActualSold = Corelib_1.bind.DObject.CreateField('ActualSold', Number, 0);
            return EtatTransfer;
        }(System_1.sdata.DataRow));
        models.EtatTransfer = EtatTransfer;
        var EtatTransfers = /** @class */ (function (_super) {
            __extends(EtatTransfers, _super);
            function EtatTransfers(parent) {
                return _super.call(this, parent, EtatTransfer, function (id) { return new EtatTransfer(id); }) || this;
            }
            EtatTransfers.prototype.FromJson = function (json, x, update, callback) {
                _super.prototype.FromJson.call(this, json, x, update, callback);
                this.Recalc();
                return this;
            };
            EtatTransfers.prototype.Recalc = function () {
                this.Sold = (this.TotalSortie || 0) - (this.TotalEntree || 0);
            };
            EtatTransfers.__fields__ = function () {
                return [this.DPTotalEntree, this.DPTotalSortie, this.DPIsVente, this.DPSold];
            };
            EtatTransfers.prototype.ReOrder = function () {
                this.OrderBy(function (a, b) { return (b.Date.getTime() - a.Date.getTime()); });
                var l = this.AsList();
                var c = 0;
                for (var i = l.length - 1; i >= 0; i--) {
                    var v = l[i];
                    var d = (v.MontantSortie || 0) - (v.MontantEntree || 0);
                    c += d;
                    v.ActualSold = this.IsVente ? c : -c;
                }
            };
            EtatTransfers.DPTotalEntree = Corelib_1.bind.DObject.CreateField('TotalEntree', Number, 0, function (e) {
                e.__this.Recalc();
            });
            EtatTransfers.DPTotalSortie = Corelib_1.bind.DObject.CreateField('TotalSortie', Number, 0, function (e) {
                e.__this.Recalc();
            });
            EtatTransfers.DPSold = Corelib_1.bind.DObject.CreateField('Sold', Number, 0);
            EtatTransfers.DPIsVente = Corelib_1.bind.DObject.CreateField('IsVente', Boolean, true);
            return EtatTransfers;
        }(System_1.sdata.DataTable));
        models.EtatTransfers = EtatTransfers;
    })(models = exports.models || (exports.models = {}));
    function total(a) {
        if (a == null)
            return 0;
        var r = 0;
        for (var i = 0, l = a.Count; i < l; i++)
            r += a.Get(i).Montant;
        return r;
    }
    Corelib_1.bind.Register(new Corelib_1.bind.Job('totalarray', function (ji, e) {
        var c = ji.Scop.Value;
        var dm = ji.dom;
        dm.innerHTML = (c == null ? '<span style="color:red">0.00 DZD</span>' : (total(c)) + ' DZD');
    }, null, null, function (ji, e) {
        var c = ji.Scop.Value;
        var dm = ji.dom;
        dm.innerHTML = (c == null ? '<span style="color:red">0.00 DZD</span>' : (total(c)) + ' DZD');
    }, null));
    Corelib_1.bind.Register(new Corelib_1.bind.Job('jobi', function (ji, e) {
        var dm = ji.dom;
        dm.textContent = (ji.Scop.Value || 0) + ' Articles';
    }, null, null, function (ji, e) {
        var dm = ji.dom;
        dm.textContent = (ji.Scop.Value || 0) + ' Articles';
    }, null));
});
//# sourceMappingURL=Models.js.map