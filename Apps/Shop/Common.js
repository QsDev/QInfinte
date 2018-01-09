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
define(["require", "exports", "../../js/UI", "../../js/Corelib", "./context", "../../js/Models", "../../js/System", "../../js/Encoding", "../../js/services", "./Apis/ShopApis"], function (require, exports, UI_1, Corelib_1, context_1, Models_1, System_1, Encoding_1, services_1, ShopApis_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var abonEnum = Corelib_1.basic.getEnum('models.Abonment');
    var GData = {
        __data: new Models_1.models.QData(),
        modify: Corelib_1.bind.NamedScop.Create("modify", false, 3),
        user: (function () { var t = new Models_1.models.Login(); t.Client = new Models_1.models.Client(Corelib_1.basic.New()); return t; })(),
        requester: System_1.Controller.ProxyData.Default,
        invalidateFactures: new Corelib_1.collection.List(Models_1.models.Facture),
        invalidateLogins: new Corelib_1.collection.List(Models_1.models.Login),
        validateLogins: new Corelib_1.collection.List(Models_1.models.Login),
        mails: new Corelib_1.collection.List(Models_1.models.Mail),
        spin: UI_1.UI.Spinner.Default,
        apis: new ShopApis_1.ShopApis(),
    };
    GData.apis.Init(GData);
    var userAbonment = Corelib_1.bind.NamedScop.Create('UserAbonment', Models_1.models.Abonment.Detaillant, Corelib_1.bind.BindingMode.TwoWay);
    var cgv;
    function GetVars(call) {
        if (cgv)
            return;
        cgv = call(GData);
    }
    exports.GetVars = GetVars;
    function InitModule() {
        UI_1.UI.Desktop.Current.OnInitialized = function (d) { return GData.spin.Parent = d; };
        Encoding_1.init();
        services_1.Load();
        initialize();
    }
    exports.InitModule = InitModule;
    function initialize() {
        window.data = GData.__data;
        Corelib_1.thread.Dispatcher.call(GData.__data, GData.__data.OnPropertyChanged, Models_1.models.QData.DPSelectedFacture, function (s, e) {
            if (e._new)
                this.Value = !e._new.IsValidated;
            else
                this.Value = false;
        }, GData.modify);
        Corelib_1.bind.NamedScop.Create('qdata', GData.__data);
        Corelib_1.bind.NamedScop.Create('User', GData.user, 0);
        internal.initializeOprs();
        var LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("showIfModifiable", function (ji, e) {
            var t = ji.Scop.Value;
            var dm = ji.dom;
            dm.parentElement.style.display = (t ? t.IsFrozen() : false) ? 'none' : '';
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            var t = ji.Scop.Value;
            dm.parentElement.style.display = (t ? t.IsFrozen() : false) ? 'none' : '';
        }, function (ji, e) {
        }));
        var LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("ilabel", function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value || 'Personal';
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value || 'Personal';
        }, function (ji, e) {
        }));
        var LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("dosave", null, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.click = function () {
                var v = ji.Scop.Value;
                if (v instanceof System_1.sdata.DataRow)
                    UI_1.UI.Modal.ShowDialog('Confirm', 'Are you sure save data ?', function (xx) { if (xx.Result === UI_1.UI.MessageResult.ok)
                        v.Upload(); }, 'Yes', 'No');
            };
        }, null));
        var LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("dodiscart", null, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.click = function () {
                var v = ji.Scop.Value;
                if (v instanceof System_1.sdata.DataRow)
                    UI_1.UI.Modal.ShowDialog('Confirm', 'Are you sure discart data ?', function (xx) { if (xx.Result === UI_1.UI.MessageResult.ok)
                        v.Update(); }, 'Yes', 'No');
            };
        }, null));
        Corelib_1.bind.Register({
            Name: 'openfournisseur', OnInitialize: function (ji, e) {
                ji.addEventListener('ondblclick', 'dblclick', function () { return GData.apis.Fournisseur.Edit(true, ji.Scop.Value, false); });
            }
        });
        Corelib_1.bind.Register({
            Name: 'opencostumer', OnInitialize: function (ji, e) {
                ji.addEventListener('ondblclick', 'dblclick', function () {
                    GData.apis.Client.Edit(true, ji.Scop.Value, false);
                });
            }
        });
    }
    var funcs;
    (function (funcs) {
        function setTepmlate(lb, owner, handleService) {
            var oldget = lb.getTemplate;
            lb.getTemplate = function (c) {
                var e = oldget(new UI_1.UI.Anchore(c));
                if (e.Enable === false)
                    e.Enable = false;
                else
                    e.addEventListener('click', handleService, { t: owner, c: c.Type });
                return e;
            };
        }
        funcs.setTepmlate = setTepmlate;
        function createSparator() {
            var separ0 = new UI_1.UI.Glyph(UI_1.UI.Glyphs.none, false);
            separ0.Enable = false;
            return separ0;
        }
        funcs.createSparator = createSparator;
        var _priceModal;
        function priceModal() {
            return _priceModal || (_priceModal = new UI_1.UI.Modals.ModalEditer('Price.edit'));
        }
        funcs.priceModal = priceModal;
        var _pricesModal;
        function pricesModal() {
            return _pricesModal || (_pricesModal = new UI_1.UI.Modals.ModalList(undefined, 'Price.info', 'Price.price'));
        }
        funcs.pricesModal = pricesModal;
    })(funcs = exports.funcs || (exports.funcs = {}));
    var internal;
    (function (internal) {
        function getPrd(p) {
            return p instanceof Models_1.models.Article ? p.Product : p;
        }
        function newArticle(prd, count) {
            var art = new Models_1.models.Article(Corelib_1.basic.New());
            art.Product = prd;
            if (count)
                art.Count = count;
            art.Price = prd.IGetValue(GData.__data.SelectedFacture.Abonment || GData.user.Client.Abonment || Models_1.models.Abonment.Detaillant);
            art.Owner = GData.__data.SelectedFacture;
            GData.__data.SelectedFacture.Articles.Add(art);
            GData.__data.Articles.Add(art);
            return art;
        }
        function removeArticle(prd, art) {
            var art = art || prd.CurrentArticle;
            if (!art)
                return;
            var sf = GData.__data.SelectedFacture;
            sf.Articles.Remove(art);
            GData.__data.Articles.Remove(art);
            prd.CurrentArticle = null;
        }
        function setValue(prd, val, def) {
            if (!GData.__data.QteLimited)
                return setValueUnlimited(prd, val, def);
            var art = prd.CurrentArticle;
            val = val != null ? val : ((art && art.Count || 0) + def);
            var tq = prd.Qte;
            if (art)
                tq += art.OCount;
            else if (val <= 0)
                return;
            else
                art = newArticle(prd);
            if (val <= 0)
                removeArticle(prd, art);
            else if (val <= tq)
                art.Count = val;
            else {
                art.Count = tq;
            }
        }
        function setValueUnlimited(prd, val, def) {
            var art = prd.CurrentArticle;
            val = val != undefined ? val : ((art && art.Count || 0) + def);
            if (val == 0)
                return art && removeArticle(prd, art);
            if (!art)
                art = newArticle(prd, val);
            else
                art.Count = val;
        }
        var types = {};
        function getEnumList(tname) {
            var lst = types[tname];
            if (lst)
                return lst;
            var type = tname && context_1.context.GetEnum(tname);
            if (type == undefined)
                throw 'type not found';
            var _lst = [];
            for (var i in type) {
                if (isNaN(parseFloat(i)))
                    _lst.push(i);
            }
            lst = { list: new Corelib_1.collection.List(String, _lst), type: type };
            lst.list.Freeze();
            Object.freeze(lst);
            Object.freeze(lst.list);
            Object.defineProperty(types, tname, { value: lst, writable: false, enumerable: false, configurable: false });
            return lst;
        }
        function swip(v, x) {
            return GData.__data.QteLimited ? v >= 0 && v <= x ? v : (v < 0 ? 0 : x) : v;
        }
        var ProdOpr = /** @class */ (function () {
            function ProdOpr(Name) {
                var _this = this;
                this.Name = Name;
                switch (Name) {
                    case 'prod-add':
                        var t;
                        this.modadd = new UI_1.UI.Modal();
                        this.modadd.OnInitialized = function (m) {
                            return m.Add(_this.t = new UI_1.UI.NumericUpDown());
                        };
                        this.modadd.OnClosed.On = function (e) { return _this.addr(e.Modal, e.msg); };
                        this.oper = this.add;
                        return;
                    case 'prod-plus':
                        this.oper = this.plus;
                        return;
                    case 'prod-minus':
                        this.oper = this.minus;
                        return;
                    case 'prod-remove':
                        this.oper = this.remove;
                        return;
                }
                throw '';
            }
            ProdOpr.prototype.Todo = function (ji, e) { };
            ProdOpr.prototype.Check = function (ji, e) { };
            ProdOpr.prototype.OnError = function (ji, e) { };
            ProdOpr.prototype.OnInitialize = function (ji, e) {
                var _this = this;
                ji.dom.addEventListener('click', function (e) { return _this.oper(ji); });
            };
            ProdOpr.prototype.OnScopDisposing = function (ji, e) { };
            ProdOpr.prototype.addr = function (e, r) {
                if (r == 'ok')
                    setValue(getPrd(this.selectedJobInstance.Scop.Value), this.t.Value);
            };
            ProdOpr.prototype.add = function (ji) {
                var _this = this;
                var t = GData.__data.SelectedFacture;
                if (t == null)
                    return UI_1.UI.InfoArea.push('<p><h1>Select</h1> a facture</p>');
                this.selectedJobInstance = ji;
                this.modadd.Open();
                this.modadd.OnInitialized = function (m) {
                    _this.t.Focus();
                    _this.t.SelectAll();
                };
            };
            ProdOpr.prototype.plus = function (ji) {
                return setValue(ji.Scop.Value, undefined, +1);
            };
            ProdOpr.prototype.minus = function (ji) {
                return setValue(ji.Scop.Value, undefined, -1);
            };
            ProdOpr.prototype.remove = function (ji) {
                var prod = ji.Scop.Value;
                var art = prod.CurrentArticle;
                if (art != null)
                    UI_1.UI.Modal.ShowDialog('Confirmation', "Do you want realy  to delete this Article", function (xx) {
                        if (xx.Result === UI_1.UI.MessageResult.ok)
                            removeArticle(prod, art);
                    });
            };
            return ProdOpr;
        }());
        var ArtOpr = /** @class */ (function () {
            function ArtOpr(Name) {
                var _this = this;
                this.Name = Name;
                switch (Name) {
                    case 'art-plus':
                        this.oper = this.plus;
                        return;
                    case 'art-minus':
                        this.oper = this.minus;
                        return;
                    case 'art-remove':
                        this.oper = this.remove;
                        return;
                    case 'art-add':
                        this.modadd = new UI_1.UI.Modal();
                        this.modadd.OnInitialized = function (m) {
                            return m.Add(_this.t = new UI_1.UI.NumericUpDown());
                        };
                        this.modadd.OnClosed.On = function (e) { return _this.addr(e.Modal, e.msg); };
                        this.oper = this.add;
                        return;
                }
                throw '';
            }
            ArtOpr.prototype.Todo = function (ji, e) { };
            ArtOpr.prototype.Check = function (ji, e) { };
            ArtOpr.prototype.OnError = function (ji, e) { };
            ArtOpr.prototype.OnInitialize = function (ji, e) {
                var _this = this;
                var dm = ji.dom;
                dm.addEventListener('click', function (e) { _this.oper(ji); });
            };
            ArtOpr.prototype.OnScopDisposing = function (ji, e) { };
            ArtOpr.prototype.addr = function (e, r) {
                if (r == 'ok')
                    setValue(getPrd(this.selectedScop.Scop.Value), this.t.Value);
            };
            ArtOpr.prototype.add = function (ji) {
                var t = GData.__data.SelectedFacture;
                if (t == null)
                    return UI_1.UI.InfoArea.push('<p><h1>Select</h1> a facture</p>');
                this.selectedScop = ji;
                this.modadd.Open();
                this.t.Focus();
                this.t.SelectAll();
            };
            ArtOpr.prototype.plus = function (ji) {
                setValue(getPrd(ji.Scop.Value), undefined, +1);
            };
            ArtOpr.prototype.minus = function (ji) {
                setValue(getPrd(ji.Scop.Value), undefined, -1);
            };
            ArtOpr.prototype.remove = function (ji) {
                var art = ji.Scop.Value;
                if (art != null)
                    UI_1.UI.Modal.ShowDialog('Confirmation', "Do you want realy  to delete this Article", function (xx) {
                        if (xx.Result === UI_1.UI.MessageResult.ok)
                            removeArticle(art.Product, art);
                    });
            };
            return ArtOpr;
        }());
        function initializeOprs() {
            Corelib_1.bind.Register(new ProdOpr('prod-add'));
            Corelib_1.bind.Register(new ProdOpr('prod-plus'));
            Corelib_1.bind.Register(new ProdOpr('prod-remove'));
            Corelib_1.bind.Register(new ProdOpr('prod-minus'));
            Corelib_1.bind.Register(new ArtOpr('art-add'));
            Corelib_1.bind.Register(new ArtOpr('art-plus'));
            Corelib_1.bind.Register(new ArtOpr('art-remove'));
            Corelib_1.bind.Register(new ArtOpr('art-minus'));
            Corelib_1.bind.Register(new Corelib_1.bind.Job('calctotal', null, null, null, function (ji, e) {
                var dm = ji.dom;
                dm.onclick = function (e) {
                    var v = ji.Scop.Value;
                    if (v)
                        v.CalcTotal();
                };
                var v = ji.Scop.Value;
                if (v)
                    v.CalcTotal();
            }, null));
            Corelib_1.bind.Register(new Corelib_1.bind.Job('calcsold', null, null, null, function (ji, e) {
                var dm = ji.dom;
                dm.onclick = function (e) {
                    var v = ji.Scop.Value;
                    if (v)
                        ji.dom.nextElementSibling.textContent = v.CalcTotal() || '0.00';
                };
                var v = ji.Scop.Value;
                if (v)
                    ji.dom.nextElementSibling.textContent = v.CalcTotal() || '0.00';
            }, null));
        }
        internal.initializeOprs = initializeOprs;
        function removeUser(p) {
            UI_1.UI.Modal.ShowDialog("Confirmation", "Are you Sure To <b>Delete</b> This Client", function (xx) {
                if (xx.Result === UI_1.UI.MessageResult.ok)
                    GData.requester.Post(Models_1.models.Login, p, null, function (s, r, iss) {
                        if (iss) {
                            GData.invalidateLogins.Remove(p);
                            if (GData.validateLogins.IndexOf(p) == -1)
                                GData.validateLogins.Remove(p);
                            UI_1.UI.InfoArea.push('The Client Successffuly <h2>Removed</h2>', true, 3000);
                        }
                        else {
                            UI_1.UI.InfoArea.push("A <h2 style='color:red'>Error</h2> Occured When Removing A Client", false);
                        }
                    }, function (e, t) {
                        e.Url = '/_/Login?remove';
                    });
            }, "DELETE", "Cancel");
        }
        function validateUser(p) {
            GData.requester.Post(Models_1.models.Login, p, null, function (s, r, iss) {
                if (iss) {
                    GData.invalidateLogins.Remove(p);
                    if (GData.validateLogins.IndexOf(p) == -1)
                        GData.validateLogins.Add(p);
                    UI_1.UI.InfoArea.push('The Client Successffuly <h2>Validated</h2>', true, 3000);
                }
                else {
                    UI_1.UI.InfoArea.push("A Error Occured When Validating A Client", false);
                }
            }, function (e, t) {
                e.Url = '/_/Login?Validate';
            });
        }
        function lockUser(p) {
            if (p instanceof Models_1.models.Login == false)
                throw 'invalid param';
            GData.requester.Post(Models_1.models.Login, p, null, function (s, r, iss) {
                if (iss) {
                    GData.validateLogins.Remove(p);
                    GData.invalidateLogins.Add(p);
                    UI_1.UI.InfoArea.push('The Client Successffuly <h2>Locke</h2>', true, 3000);
                }
                else {
                    UI_1.UI.InfoArea.push("A <h2 style='color:red'>Error</h2> Occured When Locking A Client", false);
                }
            }, function (e, t) {
                e.Url = '/_/Login?lock';
            });
        }
        Corelib_1.Api.RegisterApiCallback({
            Name: 'validateuser',
            DoApiCallback: function (c, n, p) { validateUser(p.data); }
        });
        Corelib_1.bind.Register({
            Name: 'validateuser',
            OnInitialize: function (j, e) {
                j.addEventListener('onclick', 'click', function (e) { return validateUser(j.Scop.Value); });
            }
        });
        (function () {
            var obsModal;
            var obsObject = /** @class */ (function (_super) {
                __extends(obsObject, _super);
                function obsObject() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                obsObject.ctor = function () {
                    obsObject.DPObservation = Corelib_1.bind.DObject.CreateField('Observation', String, null);
                };
                obsObject.__fields__ = function () { return [this.DPObservation]; };
                return obsObject;
            }(Corelib_1.bind.DObject));
            var obsValue = new obsObject();
            var Scop = new Corelib_1.bind.ValueScop(obsValue, Corelib_1.bind.BindingMode.TwoWay);
            Corelib_1.Api.RegisterApiCallback({
                Name: "OpenObservation", DoApiCallback: function (c, n, p) {
                    if (!obsModal) {
                        obsModal = new UI_1.UI.Modal();
                        obsModal.OnInitialized = function (n) {
                            n.setStyle("minWidth", "50%").setStyle('minHeight', "50%");
                            obsModal.Add(new UI_1.UI.TControl("templates.Observation", Scop));
                        };
                    }
                    obsValue.Observation = p.data;
                    obsModal.Open();
                    obsModal.OnClosed.Add(function (e) {
                        try {
                            e.Modal.OnClosed.Remove('');
                            if (e.Result === UI_1.UI.MessageResult.ok)
                                p.callback(p, obsValue.Observation);
                        }
                        catch (e) {
                        }
                    }, '');
                }
            });
        })();
        (function () {
            var obsModal;
            var Scop;
            var t;
            Corelib_1.Api.RegisterApiCallback({
                Name: "OpenFactureInfo", DoApiCallback: function (c, n, p) {
                    if (!obsModal) {
                        obsModal = new UI_1.UI.Modal();
                        Scop = new Corelib_1.bind.ValueScop(null, Corelib_1.bind.BindingMode.TwoWay);
                        t = new UI_1.UI.TControl("templates.factureInfo", Scop);
                        obsModal.OnInitialized = function (n) {
                            n.setStyle("minWidth", "50%").setStyle('minHeight', "50%");
                            obsModal.Add(t);
                        };
                    }
                    obsModal.OnInitialized = function (n) {
                        return t.Data = p.data;
                    };
                    obsModal.Open();
                    obsModal.OnClosed.Add(function (e) {
                        try {
                            e.Modal.OnClosed.Remove('');
                            if (e.Result === UI_1.UI.MessageResult.ok)
                                p.callback(p, Scop.Value);
                        }
                        catch (e) {
                        }
                    }, '');
                }
            });
        })();
        Corelib_1.Api.RegisterApiCallback({
            Name: 'removeuser', DoApiCallback: function (c, n, p) {
                removeUser(p.data);
            }
        });
        Corelib_1.bind.Register({
            Name: 'removeuser', OnInitialize: function (j, e) {
                j.addEventListener('onclick', 'click', function (e) { return removeUser(j.Scop.Value); });
            }
        });
        Corelib_1.Api.RegisterApiCallback({
            Name: 'lockuser', DoApiCallback: function (a, v, p) {
                lockUser(p.data);
            }
        });
        Corelib_1.bind.Register({
            Name: 'lockuser', OnInitialize: function (j, e) { j.addEventListener('onclick', 'click', function (e) { return lockUser(j.Scop.Value); }); }
        });
        Corelib_1.bind.Register({
            Name: 'openclient', OnInitialize: function (j, p) {
                j.addEventListener('click', 'click', {
                    Owner: j,
                    handleEvent: function (e) {
                        GData.apis.Client.Edit(true, this.Owner.Scop.Value, false);
                        //Client.Edit((this.Owner as bind.JobInstance).Scop.Value as models.Client, false);
                    }
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'selectclient', OnInitialize: function (j, e) {
                j.addEventListener('click', 'click', {
                    Owner: j,
                    handleEvent: function (e) {
                        var t = j.Scop.Value;
                        GData.apis.Client.Select(function (modal, i, err) {
                            { }
                            if (err === UI_1.UI.MessageResult.ok)
                                j.Scop.Value = i;
                            //t.Login.Client = i;
                        }, t);
                    }
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'openproduct', OnInitialize: function (j, e) {
                j.addEventListener('dblclick', 'dblclick', {
                    Owner: j,
                    handleEvent: function (e) {
                        var t = this.Owner.Scop.Value;
                        GData.apis.Product.Edit(true, t, false);
                    }
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'opencategory', OnInitialize: function (j, e) {
                j.addEventListener('dblclick', 'dblclick', {
                    handleEvent: function (e) {
                        var t = this.self.Scop.Value;
                        GData.apis.Category.Edit(true, t, false);
                    }, self: j
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'enum',
            OnInitialize: function (ji, e) {
                var d = ji.dom;
                var tname = d.getAttribute('type');
                var ReurnIsNumber = d.getAttribute('rtype') || 'string';
                var map = getEnumList(tname);
                var k = new UI_1.UI.ComboBox(ji.dom, map.list);
                var info = { map: map, rIsNumber: ReurnIsNumber === 'number', dom: k };
                ji.addValue('info', info);
                k.addEventListener('change', function (s, e, k) {
                    stop(); //check e type
                    var x = k.Content.getChild(e.target.selectedIndex);
                    if (x) {
                        var c = x.getDataContext() || map.type[0];
                        if (info.rIsNumber)
                            ji.Scop.Value = typeof map.type[c] === 'number' ? map.type[c] : null;
                        else
                            ji.Scop.Value = c;
                    }
                }, k);
            },
            Todo: function (j, e) {
                var info = j.getValue('info');
                info.dom.View.selectedIndex = info.dom.Source.IndexOf(info.rIsNumber ? info.map.type[j.Scop.Value] : j.Scop.Value);
            }
        });
        Corelib_1.bind.Register({
            Name: 'enum2string',
            OnInitialize: function (ji, e) {
                var dm = ji.dom;
                ji.addValue('info', { map: getEnumList(dm.getAttribute('type')), rIsNumber: dm.getAttribute('rtype') === 'number' });
                this.Todo(ji, e);
            },
            Todo: function (ji, e) {
                var info = ji.getValue('info');
                var vl = ji.Scop.Value;
                var dm = ji.dom;
                dm.textContent = info.rIsNumber ? (info.map.type[vl || 0] || (vl || 0).toString()) : vl || info.map.type[0];
            }
        });
        Corelib_1.bind.Register({
            Name: 'selectcategory',
            OnInitialize: function (j, e) {
                if (!(j.dom instanceof HTMLSelectElement))
                    throw "Dom must be Select";
                var k = new UI_1.UI.ComboBox(j.dom, GData.__data.Categories);
                k.addEventListener('change', function (s, e, k) {
                    var x = k.Content.getChild(e.target.selectedIndex);
                    if (x) {
                        var c = x.getDataContext();
                        if (c) {
                            j.Scop.Value = c;
                        }
                    }
                }, k);
            }
        });
    })(internal || (internal = {}));
    var extern;
    (function (extern) {
        function crb(icon, title, type, attr) {
            var t = document.createElement('button');
            t.classList.add('btn', 'btn-' + type, 'glyphicon', 'glyphicon-' + icon);
            t.textContent = '  ' + title;
            if (attr)
                for (var i in attr)
                    t.setAttribute(i, attr[i]);
            return t;
        }
        extern.crb = crb;
    })(extern = exports.extern || (exports.extern = {}));
    var Facture = /** @class */ (function (_super) {
        __extends(Facture, _super);
        function Facture(name, caption, template, _data) {
            var _this = _super.call(this, name, caption) || this;
            _this.template = template;
            _this._data = _data;
            _this.btn_OpenClose = extern.crb('pencil', 'Open', 'default', { 'db-bind': 'IsOpen', 'db-job': 'factureIsOpen' });
            _this.btn_add = extern.crb('plus', 'Add', 'primary');
            _this.btn_save = extern.crb('save', ' Save ', 'success');
            _this.btn_remove = extern.crb('trash', 'Remove', 'danger');
            _this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
            _this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
            _this._caption = document.createTextNode("Facture D'Achat");
            _this.abonment = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(document.createElement('input')), Corelib_1.basic.getEnum('models.Abonment'));
            return _this;
        }
        Facture.prototype.Todo = function (job, e) {
            var c = !this.Data.IsOpen;
            this.btn_add.disabled = c;
            this.btn_save.disabled = c;
            this.btn_remove.disabled = c;
            ////(this.abonment.Box.View as HTMLInputElement).disabled = c;
            this.disableAlll(this.View, c);
            this.btn_OpenClose.textContent = c ? "  Open" : "  Close";
        };
        Facture.prototype.disableAlll = function (dom, v) {
            var e = $('input', dom);
            for (var i = 0; i < e.length; i++)
                e[i].disabled = v;
        };
        Facture.prototype.OnInitialize = function (job, e) {
            this.Todo(job, e);
        };
        Facture.prototype.Dispose = function () {
        };
        Object.defineProperty(Facture.prototype, "Data", {
            get: function () { return this.adapter.Data; },
            set: function (v) {
                if (this.adapter)
                    this.adapter.Data = v;
                else
                    this._data = v;
            },
            enumerable: true,
            configurable: true
        });
        Facture.prototype.Open = function (x) {
            this.OnInitialized = function (me) {
                var lx = me.Data;
                me.Data = x;
                me.LoadArticles();
                if (me.scp)
                    return;
                var scp = me.adapter.getScop();
                var _scop = Corelib_1.bind.Scop.Create('IsOpen', scp, Corelib_1.bind.BindingMode.TwoWay);
                _scop.AddJob(me, me.View);
                me.scp = scp;
                me.adapter.OnItemInserted.On = function (x, f, c, s) {
                    me.disableAlll(s.View, !x.Data.IsOpen);
                };
                ////this.abonment.Box.Disable(true);
                ////this.abonment.View.style.visibility = 'collapse';
            };
        };
        Facture.prototype.OpenInfo = function () {
            var _this = this;
            Corelib_1.Api.RiseApi('OpenFactureInfo', {
                callback: function (p, da) {
                    if (_this.Data.IsOpen)
                        return;
                    else if (_this.Data.Observation != da) {
                        UI_1.UI.InfoArea.push("The Observation Cannot be changed while the facture is not opened");
                    }
                },
                data: this.Data,
            });
        };
        Facture.prototype.getHelp = function () {
            var t = {
                "F2": "Add New",
                "F3": "Deep Searche",
                "F4": "Open Info",
                "F5": "Update",
                "F7": "Open | Close ",
                "F8": "Save Facture",
                "F9": "Regler Facture",
            };
            var l = ["primary", "success", "danger", "info", "warning"];
            var k = 0;
            var s = "";
            for (var i in t) {
                s += '<div class="input-group" style="background:gray"> <span class="input-group-btn"> <label class="btn btn-' + l[(k++) % l.length] + '">' + i + '</label> </span> <label class="form-control" >' + t[i] + '</label> </div>';
            }
            UI_1.UI.InfoArea.push(s, true, 10000);
        };
        Facture.prototype.OnKeyDown = function (e) {
            if (!this.adapter.OnKeyDown(e)) {
                switch (e.keyCode) {
                    case UI_1.UI.Keys.F1:
                        this.getHelp();
                        break;
                    case 13:
                        this.focuser.focuseNext(true);
                        break;
                    case UI_1.UI.Keys.F2:
                        if (this.Data.IsOpen)
                            this.AddNewArticle();
                        break;
                    case UI_1.UI.Keys.F3:
                        this.OnDeepSearch();
                        break;
                    case UI_1.UI.Keys.F4:
                        this.OpenInfo();
                        break;
                    case UI_1.UI.Keys.F5:
                        this.Update();
                        break;
                    case UI_1.UI.Keys.F6:
                        break;
                    case UI_1.UI.Keys.F7:
                        this.OpenCloseFacture();
                        break;
                    case UI_1.UI.Keys.F8:
                        if (this.Data.IsOpen)
                            this.SaveFacture();
                        break;
                    case UI_1.UI.Keys.F9:
                        this.ReglerFacture();
                        break;
                    case UI_1.UI.Keys.F10:
                        this.OpenVersments(false);
                        break;
                    default:
                        return _super.prototype.OnKeyDown.call(this, e);
                }
                e.preventDefault();
                e.stopPropagation();
            }
        };
        Facture.ctor = function () {
            Corelib_1.bind.Register({
                Name: 'factureIsOpen',
                OnInitialize: function (ji, e) {
                    { }
                    this.Todo(ji, e);
                },
                Todo: function (ji, e) {
                    { }
                    var d = ji.dom;
                    if (ji.Scop.Value)
                        d.value = "Close";
                    else
                        d.value = "Open";
                }
            });
        };
        Facture.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this._view.style.minWidth = '750px';
            this.adapter = new UI_1.UI.ListAdapter(this.template, undefined, this._data, true);
            this.adapter.AcceptNullValue = false;
            var div = this.group_cnt.View;
            div.appendChild(this.btn_add);
            div.appendChild(this.btn_remove);
            div.appendChild(this.btn_save);
            div.appendChild(this.btn_OpenClose);
            ////div.appendChild(this.abonment.Box.View);
            ////this.abonment.Box.Parent = this.group_cnt;
            ////this.abonment.Box.OnInitialized = n => {
            ////    var s = n.View.style;
            ////    s.marginTop = '1px';
            ////    s.cssFloat = 'left';
            ////    s.width = 'auto';
            ////    n.applyStyle('form-control');
            ////    n.Disable(true);
            ////}
            ////this.abonment.initialize();
            this.group_tcnt.View.appendChild(this._caption);
            this.group_tcnt.Add(this.group_cnt);
            this.Add(this.group_tcnt);
            this.Add(this.adapter);
            this.btn_add.addEventListener('click', { handleEvent: function (e) { if (this.self.IsOpen)
                    this.self.AddNewArticle(); }, self: this });
            this.btn_save.addEventListener('click', { handleEvent: function (e) { if (this.self.IsOpen)
                    this.self.SaveFacture(); }, self: this });
            this.btn_remove.addEventListener('click', { handleEvent: function (e) { if (this.self.IsOpen)
                    this.self.DeleteArticle(); }, self: this });
            var isc = false;
            var so = { Title: "Save Only" };
            var vld = { Title: "Validate" };
            var m = new UI_1.UI.ExContextMenu([so, vld]);
            //m.Target = this.btn_OpenClose;
            m.OnAction.On = function (sndr, slct) {
                var data = _this.adapter.Data;
                if (slct === so) {
                    GData.apis.Facture.EOpenFacture(data, false);
                }
                else {
                    GData.apis.Facture.EOpenFacture(data, true);
                }
            };
            m.location = UI_1.UI.Location.Right | UI_1.UI.Location.Top;
            this.btn_OpenClose.addEventListener('click', function () {
                var data = _this.adapter.Data;
                var v = _this.btn_OpenClose;
                if (data.IsOpen && data.IsValidated !== true)
                    m.Show(v.offsetLeft + v.clientWidth, v.offsetTop + v.clientHeight + 7);
                else
                    GData.apis.Facture.EOpenFacture(data);
            });
            this.adapter.OnItemSelected.On = function (n) {
                var t = n.SelectedChild;
                if (t && t.View)
                    Corelib_1.basic.focuseOn(t.View);
            };
            this.focuser = new Corelib_1.basic.focuser(this.adapter.View, true);
        };
        Object.defineProperty(Facture.prototype, "IsOpen", {
            get: function () { var d = this.Data; if (d)
                return d.IsOpen; return false; },
            enumerable: true,
            configurable: true
        });
        Facture.prototype.OpenCloseFacture = function () {
            var data = this.adapter.Data;
            GData.apis.Facture.EOpenFacture(data);
        };
        return Facture;
    }(UI_1.UI.NavPanel));
    exports.Facture = Facture;
});
//# sourceMappingURL=Common.js.map