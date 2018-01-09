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
define(["require", "exports", "../../js/UI", "../../js/Corelib", "./Jobs", "./Admin/ListOfFactures", "./Admin/Costumers", "./Admin/Fournisseurs", "./Admin/Facture", "./Admin/Logins", "./Admin/Products", "./Admin/Categories", "./Admin/Revages", "./Admin/Agents", "./Common", "./Basics"], function (require, exports, UI_1, Corelib_1, Jobs_1, ListOfFactures_1, Costumers_1, Fournisseurs_1, Facture_1, Logins_1, Products_1, Categories_1, Revages_1, Agents_1, Common_1, Basics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Jobs_1.LoadJobs();
    var userAbonment = Corelib_1.bind.NamedScop.Get('UserAbonment');
    var GData;
    Common_1.GetVars(function (v) { GData = v; return false; });
    var Admin;
    (function (Admin) {
        var AdminPage = /** @class */ (function (_super) {
            __extends(AdminPage, _super);
            function AdminPage(app) {
                return _super.call(this, app, 'Administration', 'Administration') || this;
            }
            AdminPage.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                this.Caption = "DeskTop";
                this.SetPanel(new Costumers_1.Clients());
                this.SetPanel(new ListOfFactures_1.AdminNavs.FacturesLivraison());
                this.SetPanel(this.cv = new Facture_1.FactureVent());
                this.SetPanel(new Revages_1.Etats(false));
                this.SetSeparator();
                this.SetPanel(new Fournisseurs_1.Fournisseurs());
                this.SetPanel(new ListOfFactures_1.AdminNavs.FacturesReciption());
                this.SetPanel(this.ca = new Facture_1.FactureAchat());
                this.SetPanel(new Revages_1.Etats(true));
                this.SetSeparator();
                this.SetPanel(new Products_1.ProductsNav());
                this.SetPanel(new Categories_1.CategoryNav());
                this.SetSeparator();
                //this.SetPanel(new FactureNav(this.app));
                this.SetPanel(new Logins_1.RegularUsers());
                this.SetPanel(new Logins_1.UnRegularUsers());
                this.SetSeparator();
                this.SetPanel(new Agents_1.Agents());
                this.SetSeparator();
                Corelib_1.bind.Register({
                    Name: 'openafacture', OnInitialize: function (j, e) {
                        j.addEventListener('dblclick', 'dblclick', function (e) {
                            var f = j.Scop.Value;
                            _this.cv.Open(f);
                            _this.Select('facture_vent');
                        });
                    }
                });
                Corelib_1.bind.Register({
                    Name: 'openasfacture', OnInitialize: function (j, e) {
                        j.addEventListener('dblclick', 'dblclick', function (e) {
                            var f = j.Scop.Value;
                            _this.ca.Open(f);
                            _this.Select('facture_achat');
                        });
                    }
                });
                this.initAchatCmd();
                this.initVentsCmd();
                this.initVersmentCmd();
                this.initSVersmentCmd();
            };
            AdminPage.prototype.initAchatCmd = function () {
                var _this = this;
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'OpenSFacture', DoApiCallback: function (j, e, p) {
                        _this.ca.Open(p.data);
                        _this.Select('facture_achat');
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'SaveSFacture', DoApiCallback: function (j, e, p) {
                        var d = p.data;
                        var apis = GData.apis.SFacture;
                        if (!apis.Check(d))
                            return;
                        apis.Save(p.data, undefined, function (data, isNew, error_data_notsuccess_iss) {
                            switch (error_data_notsuccess_iss) {
                                case Basics_1.basics.DataStat.Success:
                                    UI_1.UI.InfoArea.push('The Facture <h1>Successfully</H1> Saved', true);
                                    break;
                                case Basics_1.basics.DataStat.DataCheckError:
                                    UI_1.UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnSaved', false);
                                    break;
                                default:
                                    UI_1.UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                        //this.ca.Data = p.data;
                        //this.Select('facture_achat');
                        //this.ca.SaveFacture();
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'DeleteSFacture', DoApiCallback: function (j, e, p) {
                        UI_1.UI.Modal.ShowDialog("Confirmation", "Do you want realy to delete this facture", function (xx) {
                            if (xx.Result === UI_1.UI.MessageResult.ok) {
                                var apis = GData.apis.SFacture;
                                apis.Delete(true, p.data, function (data, isNew, error_data_notsuccess_iss) {
                                    if (error_data_notsuccess_iss == Basics_1.basics.DataStat.Success) {
                                        UI_1.UI.InfoArea.push('The Facture Successfully Deleted');
                                    }
                                    else
                                        UI_1.UI.InfoArea.push('An Error Happened When deleting The Facture');
                                });
                            }
                        }, "DELETE", 'CANCEL');
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'NewSFacture', DoApiCallback: function (j, e, p) {
                        var apis = GData.apis.SFacture;
                        var callback1 = function (data) {
                            if (!data)
                                return;
                            p.callback && p.callback(p, data);
                            GData.__data.SFactures.Add(data);
                            _this.ca.Open(data);
                            _this.Select('facture_achat');
                        };
                        var callback = function (data) {
                            Corelib_1.Api.RiseApi('OpenFactureInfo', {
                                callback: function (p, n) { callback1(p.data); }, data: data
                            });
                        };
                        var data = apis.New(function (data, isNew, error_data_notsuccess_iss) {
                            if (error_data_notsuccess_iss == Basics_1.basics.DataStat.Success) {
                                GData.apis.Fournisseur.Select(function (n, fournisseur, r) {
                                    if (r === UI_1.UI.MessageResult.ok) {
                                        data.Fournisseur = fournisseur;
                                        GData.apis.Agent.Select(function (modal, agent, err) {
                                            if (err === UI_1.UI.MessageResult.ok)
                                                data.Achteur = agent;
                                            else
                                                return data.Dispose();
                                            callback && callback(data);
                                        }, data.Achteur).Title("Achteur");
                                    }
                                    else
                                        return data && data.Dispose();
                                }, null).Title('Fournisseur');
                            }
                            else {
                                callback(data);
                                UI_1.UI.InfoArea.push("Un Expected Error Occured When Open New Facture");
                            }
                        }, false, false);
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'UpdateSFacture', DoApiCallback: function (j, e, p) {
                        var t = p.data;
                        if (!t)
                            UI_1.UI.InfoArea.push("Please . Select one facture");
                        if (t.IsOpen) {
                            UI_1.UI.Modal.ShowDialog('Confirmation', "This Facture IsOpened .If You Update It You Will loss all changes data<br> Do you wand realy to Update it", function (xx) {
                                if (xx.Result === UI_1.UI.MessageResult.ok)
                                    GData.apis.SFacture.Update(t);
                            }, "Update");
                        }
                        else
                            GData.apis.SFacture.Update(t);
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'ValidateSFacture', DoApiCallback: function (j, e, p) {
                        var d = p.data;
                        var apis = GData.apis.SFacture;
                        if (!apis.Check(d))
                            return;
                        apis.Validate(p.data, undefined, function (data, isNew, error_data_notsuccess_iss) {
                            switch (error_data_notsuccess_iss) {
                                case Basics_1.basics.DataStat.Success:
                                    UI_1.UI.InfoArea.push('The Facture <h1>Successfully</H1> Validated', true);
                                    break;
                                case Basics_1.basics.DataStat.DataCheckError:
                                    UI_1.UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnValidated', false);
                                    break;
                                default:
                                    UI_1.UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                        //this.ca.Data = p.data;
                        //this.Select('facture_achat');
                        //this.ca.Validate();
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'PrintSFacture', DoApiCallback: function (j, e, p) {
                        var d = p.data;
                        var apis = GData.apis.SFacture;
                        if (!apis.Check(d))
                            return;
                        if (d.IsOpen)
                            UI_1.UI.InfoArea.push("We annot print The Facture While It's open");
                        else
                            apis.Print(p.data, function (data, isNew, error_data_notsuccess_iss) {
                                switch (error_data_notsuccess_iss) {
                                    case Basics_1.basics.DataStat.Success:
                                        UI_1.UI.InfoArea.push('The Facture <h1> Is Printing Successfully</H1> Saved', true);
                                        break;
                                    default:
                                        UI_1.UI.InfoArea.push("UnExpected Error Occurred ", false);
                                        break;
                                }
                            });
                    }, Owner: this
                });
            };
            AdminPage.prototype.initVentsCmd = function () {
                var _this = this;
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'OpenFacture', DoApiCallback: function (j, e, p) {
                        _this.cv.Open(p.data);
                        _this.Select('facture_vent');
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'SaveFacture', DoApiCallback: function (j, e, p) {
                        var d = p.data;
                        var apis = GData.apis.Facture;
                        if (!apis.Check(d))
                            return;
                        apis.Save(p.data, undefined, function (data, isNew, error_data_notsuccess_iss) {
                            switch (error_data_notsuccess_iss) {
                                case Basics_1.basics.DataStat.Success:
                                    UI_1.UI.InfoArea.push('The Facture <h1>Successfully</H1> Saved', true);
                                    break;
                                case Basics_1.basics.DataStat.DataCheckError:
                                    UI_1.UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnSaved', false);
                                    break;
                                default:
                                    UI_1.UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                        //this.ca.Data = p.data;
                        //this.Select('facture_achat');
                        //this.ca.SaveFacture();
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'DeleteFacture', DoApiCallback: function (j, e, p) {
                        UI_1.UI.Modal.ShowDialog("Confirmation", "Do you want realy to delete this facture", function (xx) {
                            if (xx.Result == UI_1.UI.MessageResult.ok) {
                                var apis = GData.apis.Facture;
                                apis.Delete(true, p.data, function (data, isNew, error_data_notsuccess_iss) {
                                    if (error_data_notsuccess_iss == Basics_1.basics.DataStat.Success) {
                                        UI_1.UI.InfoArea.push('The Facture Successfully Deleted');
                                    }
                                    else
                                        UI_1.UI.InfoArea.push('An Error Happened When deleting The Facture');
                                });
                            }
                        }, "DELETE", 'CANCEL');
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'NewFacture', DoApiCallback: function (j, e, p) {
                        var apis = GData.apis.Facture;
                        var callback1 = function (data) {
                            if (!data)
                                return;
                            GData.__data.Factures.Add(data);
                            p.callback && p.callback(p, data);
                            _this.cv.Open(data);
                            _this.Select('facture_vent');
                        };
                        var callback = function (data) {
                            Corelib_1.Api.RiseApi('OpenFactureInfo', {
                                callback: function (p, n) { callback1(p.data); }, data: data
                            });
                        };
                        function selectClient(data) {
                            GData.apis.Client.Select(function (n, client, iss) {
                                if (iss === UI_1.UI.MessageResult.ok) {
                                    if (!client) {
                                        UI_1.UI.InfoArea.push("You must selet a client");
                                        return selectClient(data);
                                    }
                                    data.Client = client;
                                    callback && callback(data);
                                }
                                else {
                                    data && data.Dispose();
                                }
                            }, null);
                        }
                        var data = apis.New(function (data, isNew, error_data_notsuccess_iss) {
                            if (error_data_notsuccess_iss == Basics_1.basics.DataStat.Success) {
                                selectClient(data);
                            }
                            else {
                                UI_1.UI.InfoArea.push("Un Expected Error Occured When Open New Facture");
                                data && data.Dispose();
                            }
                        }, false, false);
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'UpdateFacture', DoApiCallback: function (j, e, p) {
                        var t = p.data;
                        if (!t)
                            UI_1.UI.InfoArea.push("Please . Select one facture");
                        if (t.IsOpen) {
                            UI_1.UI.Modal.ShowDialog('Confirmation', "This Facture IsOpened .If You Update It You Will loss all changes data<br> Do you wand realy to Update it", function (xx) {
                                if (xx.Result == UI_1.UI.MessageResult.ok)
                                    GData.apis.Facture.Update(t);
                            }, "Update");
                        }
                        else
                            GData.apis.Facture.Update(t);
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'ValidateFacture', DoApiCallback: function (j, e, p) {
                        var d = p.data;
                        var apis = GData.apis.Facture;
                        if (!apis.Check(d))
                            return;
                        apis.Validate(p.data, undefined, function (data, isNew, error_data_notsuccess_iss) {
                            switch (error_data_notsuccess_iss) {
                                case Basics_1.basics.DataStat.Success:
                                    UI_1.UI.InfoArea.push('The Facture <h1>Successfully</H1> Validated', true);
                                    break;
                                case Basics_1.basics.DataStat.DataCheckError:
                                    UI_1.UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnValidated', false);
                                    break;
                                default:
                                    UI_1.UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                        //this.ca.Data = p.data;
                        //this.Select('facture_achat');
                        //this.ca.Validate();
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'PrintFacture', DoApiCallback: function (j, e, p) {
                        var d = p.data;
                        var apis = GData.apis.Facture;
                        if (d.IsOpen)
                            UI_1.UI.InfoArea.push("We annot print The Facture While It's open");
                        else
                            apis.Print(p.data, function (data, isNew, error_data_notsuccess_iss) {
                                switch (error_data_notsuccess_iss) {
                                    case Basics_1.basics.DataStat.Success:
                                        UI_1.UI.InfoArea.push('The Facture <h1> Is Printing Successfully</H1> Saved', true);
                                        break;
                                    default:
                                        UI_1.UI.InfoArea.push("UnExpected Error Occurred ", false);
                                        break;
                                }
                            });
                    }, Owner: this
                });
            };
            AdminPage.prototype.initVersmentCmd = function () {
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'OpenVersment', DoApiCallback: function (j, e, p) {
                        GData.apis.Versment.Edit(true, p.data, false, function (c, d) { { } });
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'DeleteVersment', DoApiCallback: function (j, e, p) {
                        GData.apis.Versment.Delete(true, p.data, function (c, d) { { } });
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'NewVersment', DoApiCallback: function (j, e, p) {
                        GData.apis.Versment.New(function (data, c, x) {
                            if (!p || !p.data) {
                                GData.apis.Client.Select(function (n, item, iss) {
                                    if (item && iss === UI_1.UI.MessageResult.ok) {
                                        data.Client = item;
                                        GData.apis.Versment.Edit(true, data, true, function (data, cd, vf) { { } });
                                    }
                                }, null);
                                //Client.Select((selected, item) => {
                                //    {}
                                //    if (selected) {
                                //        data.Client = item;
                                //        GData.apis.Versment.Edit(true, data, true, (data, cd, vf) => { {} });
                                //    }
                                //}, p.data);
                            }
                            else {
                                data.Client = p.data;
                                GData.apis.Versment.Edit(true, data, true, function (data, cd, vf) { if (p.callback)
                                    p.callback(p, data); });
                            }
                        }, false, false);
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'UpdateVersments', DoApiCallback: function (j, e, p) {
                        GData.apis.Versment.Update(p.data || GData.__data.Versments);
                    }, Owner: this
                });
            };
            AdminPage.prototype.initSVersmentCmd = function () {
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'OpenSVersment', DoApiCallback: function (j, e, p) {
                        GData.apis.SVersment.Edit(true, p.data, false, function (c, d) { { } });
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'DeleteSVersment', DoApiCallback: function (j, e, p) {
                        GData.apis.SVersment.Delete(true, p.data, function (c, d) { { } });
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'NewSVersment', DoApiCallback: function (j, e, p) {
                        GData.apis.SVersment.New(function (data, c, x) {
                            { }
                            data.Fournisseur = p.data;
                            GData.apis.SVersment.Edit(true, data, true, function (data, cd, vf) { { } });
                        }, true, false);
                    }, Owner: this
                });
                Corelib_1.Api.RegisterApiCallback({
                    Name: 'UpdateSVersments', DoApiCallback: function (j, e, p) {
                        GData.apis.SVersment.Update(p.data || GData.__data.SVersments);
                    }, Owner: this
                });
            };
            AdminPage.prototype.OnKeyDown = function (e) {
                if (e.ctrlKey) {
                    switch (e.keyCode) {
                        case 67://Client 
                            this.Select('Clients');
                            break;
                        case 76:
                            this.Select('facture_clientels');
                            break;
                        case 86://Vent
                            this.Select('facture_vent');
                            break;
                        case 70://Fournisseur
                            this.Select('Fournissurs');
                            break;
                        case 82:
                            this.Select('facture_fournisseurs');
                            break;
                        case 65://Achat
                            this.Select('facture_achat');
                            break;
                        default:
                            return _super.prototype.OnKeyDown.call(this, e);
                    }
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    return true;
                }
                return _super.prototype.OnKeyDown.call(this, e);
            };
            return AdminPage;
        }(UI_1.UI.NavPage));
        Admin.AdminPage = AdminPage;
    })(Admin = exports.Admin || (exports.Admin = {}));
});
//# sourceMappingURL=AdminPage.js.map