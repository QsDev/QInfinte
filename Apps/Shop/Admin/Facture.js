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
define(["require", "exports", "../../../js/UI", "../../../js/Corelib", "../Common", "../../../js/Models", "../Basics"], function (require, exports, UI_1, Corelib_1, Common_1, Models_1, Basics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var userAbonment = Corelib_1.bind.NamedScop.Get('UserAbonment');
    var FactureAchat = /** @class */ (function (_super) {
        __extends(FactureAchat, _super);
        function FactureAchat() {
            var _this = _super.call(this, 'facture_achat', 'Facture D\'<b><u>A</u></b>chat', 'SFacture.view', null) || this;
            _this._abonment = 0;
            return _this;
        }
        FactureAchat.prototype.ReglerFacture = function () {
            this.verser(true);
        };
        FactureAchat.prototype.LoadArticles = function () {
            if (!this.Data.IsOpen)
                if (this.Data.Articles == null || !this.Data.Articles.Stat) {
                    GData.apis.SFacture.UpdateArticlesOf(this.Data, null);
                }
        };
        FactureAchat.prototype.Update = function () {
            var _this = this;
            { }
            UI_1.UI.Modal.ShowDialog("Update", "Do you want realy to update this facture from server", function (e) {
                if (e.Result === UI_1.UI.MessageResult.ok) {
                    GData.apis.SFacture.UpdateArticlesOf(_this.Data, null);
                }
            });
        };
        FactureAchat.prototype.AddNewArticle = function () {
            var _this = this;
            var data = this.adapter.Data;
            if (data.IsOpen)
                GData.apis.Revage.New(function (revage, p, i) {
                    if (i !== Basics_1.basics.DataStat.Success)
                        return UI_1.UI.InfoArea.push("UnExpected Error");
                    revage.Facture = data;
                    data.Articles.Add(revage);
                    _this.adapter.SelectItem(revage);
                    Corelib_1.basic.focuseOn(_this.adapter.SelectedChild.View);
                }, false, false);
        };
        FactureAchat.prototype.SaveFacture = function () {
            Corelib_1.Api.RiseApi("SaveSFacture", {
                data: this.Data
            });
        };
        FactureAchat.prototype.DeleteArticle = function () {
            var d = this.adapter.Data;
            if (!d || !d.IsOpen)
                return;
            var c = this.adapter.SelectedItem;
            if (c == null)
                UI_1.UI.InfoArea.push("select an article to delete");
            var p = c.Product;
            var arts = d.GetValue(Models_1.models.SFacture.DPArticles);
            var tt;
            UI_1.UI.Modal.ShowDialog('Confirmation', 'Do you want to remove this Article <br>' + (p || '').toString(), function (xx) {
                if (xx.Result === UI_1.UI.MessageResult.ok)
                    arts.Remove(c);
            }, 'DELETE', 'Cancel');
        };
        FactureAchat.prototype.GetLeftBar = function () {
            fs.Target = this;
            var l = fs.GetLeftBar();
            l.OnInitialized = function (l) { return fs.ShowFournisseur(); };
            return l;
        };
        FactureAchat.prototype.GetRightBar = function () {
            fs.Target = this;
            return fs.GetRightBar();
        };
        FactureAchat.prototype.OnContextMenuFired = function (r, selected) {
            if (selected === 'Ouvrir' || selected === 'Supprimer')
                this.OpenVersments(selected === 'Supprimer');
            else if (selected === 'Regler' || selected === 'Verser')
                this.verser(selected === 'Regler');
        };
        FactureAchat.prototype.verser = function (regler) {
            var data = this.Data;
            if (!data)
                return UI_1.UI.Modal.ShowDialog("ERROR", "Selecter une facture pour ajouter une versment");
            if (regler)
                return GData.apis.SVersment.Regler(data, data.Client);
            GData.apis.SVersment.VerserTo(data, data.Fournisseur);
        };
        FactureAchat.prototype.OpenVersments = function (forDelete) {
            var data = this.Data;
            if (data)
                GData.apis.SVersment.OpenSVersmentsOfFacture(data, function (results, selected, fournisseur, success) {
                    data.Recalc(results);
                    if (success && forDelete) {
                        if (selected) {
                            UI_1.UI.Modal.ShowDialog("Confirmation", "Voulez- vous vraiment supprimer ce veremnet", function (xx) {
                                if (xx.Result === UI_1.UI.MessageResult.ok)
                                    GData.apis.SVersment.Delete(true, selected, function (a, b, c) {
                                        if (c === Basics_1.basics.DataStat.Success) {
                                            UI_1.UI.InfoArea.push("Ce Virement Est bien Supprimé", true, 5000);
                                        }
                                        else {
                                            UI_1.UI.InfoArea.push("Une erreur s'est produite lorsque nous avons supprimé cette version", true, 5000);
                                        }
                                    });
                            }, "Supprimer", "Annuler");
                        }
                        else
                            UI_1.UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                    }
                });
            else {
                UI_1.UI.InfoArea.push("You Must Set first the client");
            }
        };
        FactureAchat.prototype.OpenStatistics = function () { };
        FactureAchat.prototype.OpenMails = function () { };
        FactureAchat.prototype.NewProduct = function () {
            GData.apis.Product.CreateNew(function (pr) {
                { }
                var t;
            });
        };
        FactureAchat.prototype.SelectFournisseur = function (onSuccessCallback) {
            var _this = this;
            GData.apis.Fournisseur.Select(function (n, item, r) {
                if (r === UI_1.UI.MessageResult.ok) {
                    if (item) {
                        _this.Data.Fournisseur = item;
                        if (_this.adapter.Data.Achteur == null)
                            _this.SelectAchteur(onSuccessCallback);
                        else
                            onSuccessCallback && onSuccessCallback();
                    }
                    else
                        _this.SelectFournisseur(onSuccessCallback);
                }
            }, this.Data.Fournisseur);
        };
        FactureAchat.prototype.SelectAchteur = function (onSuccessCallback) {
            var _this = this;
            var dt = this.adapter.Data.GetValue(Models_1.models.SFacture.DPAchteur);
            GData.apis.Agent.Select(function (n, item, r) {
                if (r === UI_1.UI.MessageResult.ok) {
                    if (item) {
                        _this.Data.Achteur = item;
                        onSuccessCallback && onSuccessCallback();
                    }
                    else {
                        _this.SelectAchteur(onSuccessCallback);
                    }
                }
            }, dt);
        };
        FactureAchat.prototype.Validate = function () {
            Corelib_1.Api.RiseApi("ValidateSFacture", {
                data: this.Data
            });
        };
        FactureAchat.prototype.Print = function () {
            Corelib_1.Api.RiseApi("PrintSFacture", {
                data: this.Data
            });
            var data = this.adapter.Data;
            if (data)
                GData.requester.Request(Models_1.models.SFacture, "PRINT", data, data, function (r, c) {
                });
        };
        FactureAchat.prototype.Delete = function () {
            var _this = this;
            var d = this.adapter.SelectedItem;
            if (d)
                UI_1.UI.Modal.ShowDialog("Confirmation", "Do you want remove <br>" + d.Product.toString() + " ", function (xx) { if (xx.Result === UI_1.UI.MessageResult.ok)
                    _this.Data.Articles.Remove(d); });
            else
                UI_1.UI.InfoArea.push("Selectioner l'article a supprimé");
        };
        FactureAchat.prototype.New = function () {
            Corelib_1.Api.RiseApi('NewSFacture', { data: null, callback: function (p, f) { } });
        };
        FactureAchat.prototype.OnBringIntoFront = function () {
            var _this = this;
            var d = this.adapter.Data;
            if (d == null) {
                UI_1.UI.Modal.ShowDialog(this.Caption, 'There no facture selected do you want to create a new one', function (xx) {
                    if (xx.Result === UI_1.UI.MessageResult.ok) {
                        _this.New();
                    }
                    else {
                        var p = _this.parent;
                        p.Select('facture_fournisseurs');
                    }
                }, 'Create New', 'Cancel');
            }
            this.abonment.Box.Enable = true;
            userAbonment.Value = Models_1.models.Abonment.Detaillant;
            this.abonment.Box.Disable(true);
        };
        FactureAchat.prototype.OnAbonmentChanged = function (b, o, n) {
            if (!this.IsActive)
                return;
            if (n) {
                this._abonment = n.Value;
                userAbonment.Value = abonEnum.Get(this._abonment);
            }
            else
                userAbonment.Value = abonEnum.Get(0);
        };
        return FactureAchat;
    }(Common_1.Facture));
    exports.FactureAchat = FactureAchat;
    var FactureVent = /** @class */ (function (_super) {
        __extends(FactureVent, _super);
        function FactureVent() {
            return _super.call(this, 'facture_vent', "Facture <b><u>V</u></b>ent", 'Facture.oview', null) || this;
        }
        FactureVent.prototype.ReglerFacture = function () {
            this.verser(true);
        };
        FactureVent.prototype.LoadArticles = function () {
            if (!this.Data.IsOpen)
                if (this.Data.Articles == null || !this.Data.Articles.Stat) {
                    GData.apis.Facture.UpdateArticlesOf(this.Data, null);
                }
        };
        FactureVent.prototype.Update = function () {
            var _this = this;
            { }
            UI_1.UI.Modal.ShowDialog("Update", "Do you want realy to update this facture from server", function (e) {
                if (e.Result === UI_1.UI.MessageResult.ok) {
                    GData.apis.Facture.UpdateArticlesOf(_this.Data, null);
                }
            });
        };
        FactureVent.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.Enable = true;
        };
        FactureVent.prototype.AddNewArticle = function () {
            var _this = this;
            var data = this.adapter.Data;
            if (data.IsOpen)
                GData.apis.Article.New(function (revage, isn, t) {
                    if (t !== Basics_1.basics.DataStat.Success)
                        return UI_1.UI.InfoArea.push("UnExpected Error");
                    revage.Owner = data;
                    data.Articles.Add(revage);
                    _this.adapter.SelectItem(revage);
                    //thread.Dispatcher.call(this, function () { basic.focuseOn(this.adapter.SelectedChild.View); });
                }, false, false);
        };
        FactureVent.prototype.SaveFacture = function () {
            var d = this.Data;
            if (!d)
                return UI_1.UI.InfoArea.push("There no facture selected");
            Corelib_1.Api.RiseApi("SaveFacture", {
                data: d
            });
        };
        FactureVent.prototype.DeleteArticle = function () {
            var d = this.adapter.Data;
            if (!d || !d.IsOpen)
                return;
            var c = this.adapter.SelectedItem;
            if (c == null)
                UI_1.UI.InfoArea.push("select an article to delete");
            var arts = d.GetValue(Models_1.models.Facture.DPArticles);
            if (arts.Remove(c))
                UI_1.UI.InfoArea.push("Article Was Successfully <h1>Deleted</h1>", true);
            else
                UI_1.UI.InfoArea.push("Fatal <h1>Error</h1>", true);
        };
        FactureVent.prototype.GetLeftBar = function () {
            fs.Target = this;
            var l = fs.GetLeftBar();
            l.OnInitialized = function (l) { return fs.HideFournisseur(); };
            return l;
        };
        FactureVent.prototype.GetRightBar = function () {
            fs.Target = this;
            return fs.GetRightBar();
        };
        FactureVent.prototype.verser = function (regler) {
            var data = this.Data;
            if (!data)
                return UI_1.UI.Modal.ShowDialog("ERROR", "Selecter une facture pour ajouter une versment");
            if (regler)
                return GData.apis.Versment.Regler(data, data.Client);
            GData.apis.Versment.VerserTo(data, data.Client);
        };
        FactureVent.prototype.OpenVersments = function (forDelete) {
            if (this.Data)
                GData.apis.Versment.OpenVersmentsOfFacture(this.Data, function (results, selected, fournisseur, success) {
                    if (success && forDelete) {
                        if (selected) {
                            UI_1.UI.Modal.ShowDialog("Confirmation", "Voulez- vous vraiment supprimer ce veremnet", function (xx) {
                                if (xx.Result === UI_1.UI.MessageResult.ok)
                                    GData.apis.Versment.Delete(true, selected, function (a, b, c) {
                                        if (c === Basics_1.basics.DataStat.Success) {
                                            UI_1.UI.InfoArea.push("Ce Virement Est bien Supprimé", true, 5000);
                                        }
                                        else {
                                            UI_1.UI.InfoArea.push("Une erreur s'est produite lorsque nous avons supprimé cette version", true, 5000);
                                        }
                                    });
                            }, "Supprimer", "Annuler");
                        }
                        else
                            UI_1.UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                    }
                });
            else {
                UI_1.UI.InfoArea.push("You Must Set first the client");
            }
        };
        FactureVent.prototype.OpenStatistics = function () { };
        FactureVent.prototype.OpenMails = function () { };
        FactureVent.prototype.NewProduct = function () {
            var _this = this;
            GData.apis.Facture.CreateNew;
            GData.apis.Product.CreateNew(function (product) {
                var data = _this.Data;
                if (data && data.IsOpen) {
                    GData.apis.Article.New(function (art, isn, err) {
                        art.Product = product;
                        art.Count = 1;
                        data.Articles.Add(art);
                    }, false, false);
                }
            });
        };
        FactureVent.prototype.SelectFournisseur = function () { };
        FactureVent.prototype.SelectAchteur = function () {
            var _this = this;
            var facture = this.Data;
            var dt = facture.Client;
            GData.apis.Client.Select(function (modal, client, err) {
                if (err === UI_1.UI.MessageResult.ok) {
                    if (!client)
                        return _this.SelectAchteur();
                    facture.Client = client;
                    facture.Abonment = client.Abonment;
                    userAbonment.Value = client.Abonment;
                }
            }, this.Data.Client);
        };
        FactureVent.prototype.Validate = function () {
            Corelib_1.Api.RiseApi("ValidateFacture", { data: this.Data });
        };
        FactureVent.prototype.Print = function () {
            Corelib_1.Api.RiseApi("PrintFacture", { data: this.Data });
        };
        FactureVent.prototype.Delete = function () {
            Corelib_1.Api.RiseApi("DeleteFacture", { data: this.Data });
        };
        FactureVent.prototype.New = function () {
            var _this = this;
            GData.apis.Article.New(function (s, t, g) {
                if (g == Basics_1.basics.DataStat.Success)
                    _this.Data.Articles.Add(s);
                else
                    UI_1.UI.InfoArea.push("UnExpected  Error");
            }, false, false);
        };
        FactureVent.prototype.OnBringIntoFront = function () {
            var _this = this;
            var d = this.adapter.Data;
            if (d == null) {
                UI_1.UI.Modal.ShowDialog('Facture De Livraison', 'There no facture selected do you want to create new one', function (xx) {
                    if (xx.Result === UI_1.UI.MessageResult.ok) {
                        _this.New();
                    }
                    else {
                        var p = _this.parent;
                        p.Select('facture_clientels');
                    }
                }, 'Create New', 'Cancel');
            }
            var v;
            if (d && d.Client)
                v = d.Client.Abonment;
            else
                v = 0;
            userAbonment.Value = v;
            this.abonment.Box.Enable = true;
            this.Enable = !!d;
        };
        FactureVent.prototype.OnAbonmentChanged = function (b, o, n) {
            var d = this.Data;
            if (!d)
                return;
            d.Abonment = n.Value;
        };
        return FactureVent;
    }(Common_1.Facture));
    exports.FactureVent = FactureVent;
    var abonEnum = Corelib_1.basic.getEnum('models.Abonment');
    var FactureService = /** @class */ (function () {
        function FactureService() {
        }
        FactureService.prototype.GetLeftBar = function () {
            var _this = this;
            if (!this.lb) {
                this._edit = new UI_1.UI.Glyph(UI_1.UI.Glyphs.edit, false, 'Edit');
                this._new = new UI_1.UI.Glyph(UI_1.UI.Glyphs.plusSign, false, 'New');
                this._delete = new UI_1.UI.Glyph(UI_1.UI.Glyphs.fire, false, 'Delete');
                this._acht = new UI_1.UI.Glyph(UI_1.UI.Glyphs.user, false, 'Achteur');
                this._forn = new UI_1.UI.Glyph(UI_1.UI.Glyphs.home, false, 'Fournisseur');
                this._creditCart = new UI_1.UI.Glyph(UI_1.UI.Glyphs.creditCard, false, 'Versments');
                this._stat = new UI_1.UI.Glyph(UI_1.UI.Glyphs.stats, false, 'Statistics');
                this._info = new UI_1.UI.Glyph(UI_1.UI.Glyphs.infoSign, false, 'Information');
                this._mail = new UI_1.UI.Glyph(UI_1.UI.Glyphs.envelope, false, 'Post Message');
                this._prod = new UI_1.UI.Glyph(UI_1.UI.Glyphs.rub, false, 'Insert New Product');
                this.lb = new UI_1.UI.Navbar();
                Common_1.funcs.setTepmlate(this.lb, this, this.handleSerices);
                this.rm = new UI_1.UI.RichMenu(undefined, ["Regler", "Verser", "Supprimer", "", "Ouvrir"], this._creditCart);
                this.lb.OnInitialized = function (n) { return n.AddRange([_this._new, _this._edit, _this._delete, Common_1.funcs.createSparator(), _this._forn, _this._acht, _this._creditCart, Common_1.funcs.createSparator(), _this._stat, _this._info, Common_1.funcs.createSparator(), _this._mail, Common_1.funcs.createSparator(), _this._prod]); };
            }
            return this.lb;
        };
        FactureService.prototype.GetRightBar = function () {
            var _this = this;
            if (!this.rb) {
                this._print = new UI_1.UI.Glyph(UI_1.UI.Glyphs.print, false, 'Print');
                this._save = new UI_1.UI.Glyph(UI_1.UI.Glyphs.floppyDisk, false, 'Save');
                this._valid = new UI_1.UI.Glyph(UI_1.UI.Glyphs.check, false, 'Validate');
                this.rb = new UI_1.UI.Navbar();
                Common_1.funcs.setTepmlate(this.rb, this, this.handleSerices);
                this.rb.OnInitialized = function (n) { return n.AddRange([_this._print, Common_1.funcs.createSparator(), _this._valid, _this._save]); };
            }
            return this.rb;
        };
        FactureService.prototype.handleSerices = function (s, e, p) {
            var c = UI_1.UI.Glyphs;
            var t = p.t.target;
            switch (p.c) {
                case c.print:
                    t.Print();
                    break;
                case c.floppyDisk:
                    t.SaveFacture();
                    break;
                case c.check:
                    t.Validate();
                    break;
                case c.fire:
                    t.Delete();
                    break;
                case c.plusSign:
                    t.New();
                    break;
                case c.user:
                    t.SelectAchteur();
                    break;
                case c.home:
                    t.SelectFournisseur();
                    break;
                case c.creditCard:
                    p.t.rm.Open(e, { Owner: p.t, Invoke: p.t.OnContextMenuFired }, null, true);
                    break;
                case c.infoSign:
                    t.OpenInfo();
                    break;
                case c.envelope:
                    t.OpenMails();
                    break;
                case c.rub:
                    t.NewProduct();
                    break;
                case c.stats:
                    t.OpenStatistics();
                    return;
                default:
                    UI_1.UI.InfoArea.push("This Option need for money to activate");
                    return;
            }
        };
        FactureService.prototype.HideFournisseur = function () { this._forn.Visible = false; };
        FactureService.prototype.ShowFournisseur = function () { this._forn.Visible = true; };
        FactureService.prototype.OnContextMenuFired = function (r, selected) {
            if (selected === 'Ouvrir' || selected === 'Supprimer')
                this.target.OpenVersments(selected === 'Supprimer');
            else if (selected === 'Regler' || selected === 'Verser')
                this.target.verser(selected === 'Regler');
        };
        Object.defineProperty(FactureService.prototype, "Target", {
            set: function (target) {
                this.target = target;
            },
            enumerable: true,
            configurable: true
        });
        return FactureService;
    }());
    var FacturesService = /** @class */ (function () {
        function FacturesService() {
        }
        FacturesService.prototype.GetRightBar = function () {
            var _this = this;
            if (!this.lb) {
                this._print = new UI_1.UI.Glyph(UI_1.UI.Glyphs.print, false, 'Print');
                this._open = new UI_1.UI.Glyph(UI_1.UI.Glyphs.open, false, 'Open');
                this._new = new UI_1.UI.Glyph(UI_1.UI.Glyphs.openFile, false, 'New');
                this.lb = new UI_1.UI.Navbar();
                var oldget = this.lb.getTemplate;
                this.lb.getTemplate = function (c) {
                    var e = oldget(new UI_1.UI.Anchore(c));
                    if (!c.Enable)
                        e.Enable = false;
                    return e;
                };
                this.lb.OnInitialized = function (n) { return n.AddRange([_this._print, _this._open, _this._new]); };
                this.lb.OnSelectedItem.On = function (u) {
                };
            }
            return this.lb;
        };
        FacturesService.prototype.GetLeftBar = function () {
            var _this = this;
            if (!this.rb) {
                this._update = new UI_1.UI.Glyph(UI_1.UI.Glyphs.banCircle, false, 'Update');
                this._validate = new UI_1.UI.Glyph(UI_1.UI.Glyphs.openFile, false, 'Validate');
                this._save = new UI_1.UI.Glyph(UI_1.UI.Glyphs.openFile, false, 'Save');
                this._delete = new UI_1.UI.Glyph(UI_1.UI.Glyphs.openFile, false, 'Delete');
                this.rb = new UI_1.UI.Navbar();
                var oldget = this.rb.getTemplate;
                this.rb.getTemplate = function (c) { return oldget(new UI_1.UI.Anchore(c)); };
                this.rb.OnInitialized = function (n) {
                    n.AddRange([_this._delete, Common_1.funcs.createSparator(), _this._save, _this._validate, _this._update]);
                };
            }
            return this.rb;
        };
        return FacturesService;
    }());
    var fs = new FactureService();
});
//# sourceMappingURL=Facture.js.map