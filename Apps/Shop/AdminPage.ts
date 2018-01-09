import {UI, conv2template} from '../../js/UI';
import {mvc, utils, basic, Api, thread, encoding, net, bind, reflection, collection } from '../../js/Corelib';
import { models} from "../../js/Models";
import { Load } from '../../js/services';
import {LoadJobs} from './Jobs';
import { AdminNavs } from './Admin/ListOfFactures';
import { Clients } from './Admin/Costumers';
import {Fournisseurs  } from './Admin/Fournisseurs';
import { FactureAchat, FactureVent } from './Admin/Facture';
import {RegularUsers, UnRegularUsers  } from './Admin/Logins';
import {ProductsNav  } from './Admin/Products';
import { FactureNav } from './Admin/FacturesNonValider';
import { CategoryNav } from './Admin/Categories';
import {EtatBases, Etats, /* PricesInfo*/  } from './Admin/Revages';
import {Agents  } from './Admin/Agents';
import { GetVars, funcs } from './Common';
import { basics } from './Basics';

LoadJobs();
var userAbonment = bind.NamedScop.Get('UserAbonment');
var GData:basics. vars;
GetVars((v) => { GData = v; return false; });
export namespace Admin {
    export class AdminPage extends UI.NavPage {
        
        constructor(app: UI.App) {
            super(app, 'Administration', 'Administration');
        }
        private ca: FactureAchat;

        private cv: FactureVent;

        public initialize() {
            super.initialize();
            this.Caption = "DeskTop";

            this.SetPanel(new Clients());
            this.SetPanel(new AdminNavs.FacturesLivraison());
            this.SetPanel(this.cv = new FactureVent());
            this.SetPanel(new Etats(false));
            this.SetSeparator();


            this.SetPanel(new Fournisseurs());
            this.SetPanel(new AdminNavs.FacturesReciption());
            this.SetPanel(this.ca = new FactureAchat());
            this.SetPanel(new Etats(true));
            this.SetSeparator();

            this.SetPanel(new ProductsNav());
            this.SetPanel(new CategoryNav());
            this.SetSeparator();


            //this.SetPanel(new FactureNav(this.app));
            this.SetPanel(new RegularUsers());
            this.SetPanel(new UnRegularUsers());
            this.SetSeparator();
            
            this.SetPanel(new Agents());
            this.SetSeparator();
            
            bind.Register({
                Name: 'openafacture', OnInitialize: (j, e) => {
                    j.addEventListener('dblclick', 'dblclick', (e) => {
                        var f = j.Scop.Value as models.Facture;
                        this.cv.Open(f);
                        this.Select('facture_vent');
                    });
                }
            });

            bind.Register({
                Name: 'openasfacture', OnInitialize: (j, e) => {
                    j.addEventListener('dblclick', 'dblclick', (e) => {
                        var f = j.Scop.Value as models.SFacture;
                        this.ca.Open(f);
                        this.Select('facture_achat');
                    });
                }
            });
            this.initAchatCmd();
            this.initVentsCmd();

            this.initVersmentCmd();
            this.initSVersmentCmd();
        }

        private initAchatCmd() {

            Api.RegisterApiCallback({
                Name: 'OpenSFacture', DoApiCallback: (j, e, p) => {
                    this.ca.Open(p.data);
                    this.Select('facture_achat');
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'SaveSFacture', DoApiCallback: (j, e, p) => {
                    var d = p.data;
                    var apis = GData.apis.SFacture;
                    if (!apis.Check(d)) return;
                    apis.Save(p.data, undefined,
                        (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                            switch (error_data_notsuccess_iss) {
                                case basics.DataStat.Success:
                                    UI.InfoArea.push('The Facture <h1>Successfully</H1> Saved', true);
                                    break;
                                case basics.DataStat.DataCheckError:
                                    UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnSaved', false);
                                    break;
                                default:
                                    UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                    //this.ca.Data = p.data;
                    //this.Select('facture_achat');
                    //this.ca.SaveFacture();
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'DeleteSFacture', DoApiCallback: (j, e, p) => {
                    UI.Modal.ShowDialog("Confirmation", "Do you want realy to delete this facture", (xx) => {
                        if (xx.Result===UI.MessageResult.ok) {
                            var apis = GData.apis.SFacture;
                            apis.Delete(true, p.data, (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                                if (error_data_notsuccess_iss == basics.DataStat.Success) {
                                    UI.InfoArea.push('The Facture Successfully Deleted');
                                } else UI.InfoArea.push('An Error Happened When deleting The Facture');
                            });
                        }
                    }, "DELETE", 'CANCEL');
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'NewSFacture', DoApiCallback: (j, e, p) => {
                    var apis = GData.apis.SFacture;
                    var callback1 = (data:models.SFacture) => {
                        if (!data) return;
                        p.callback && p.callback(p, data);
                        GData.__data.SFactures.Add(data);
                        this.ca.Open(data);
                        this.Select('facture_achat');
                    };
                    var callback = (data: models.SFacture) => {
                        Api.RiseApi('OpenFactureInfo', {
                            callback: (p, n) => { callback1(p.data); }, data: data
                        });
                    };
                    var data = apis.New(
                        (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                            if (error_data_notsuccess_iss == basics.DataStat.Success) {
                                GData.apis.Fournisseur.Select((n, fournisseur: models.Fournisseur, r) => {
                                    if (r === UI.MessageResult.ok) {
                                        data.Fournisseur = fournisseur;
                                        GData.apis.Agent.Select((modal, agent, err) => {
                                            if (err === UI.MessageResult.ok)
                                                data.Achteur = agent;
                                            else return data.Dispose();
                                            callback && callback(data);
                                        }, data.Achteur).Title("Achteur");
                                    }
                                    else return data && data.Dispose();
                                }, null).Title('Fournisseur');
                            } else {
                                callback(data);
                                UI.InfoArea.push("Un Expected Error Occured When Open New Facture");
                            }
                        }, false, false
                    );
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'UpdateSFacture', DoApiCallback: (j, e, p) => {
                    var t = p.data as models.SFacture;
                    if (!t) UI.InfoArea.push("Please . Select one facture");
                    if (t.IsOpen) {
                        UI.Modal.ShowDialog('Confirmation', "This Facture IsOpened .If You Update It You Will loss all changes data<br> Do you wand realy to Update it", (xx) => {
                            if (xx.Result === UI.MessageResult.ok) GData.apis.SFacture.Update(t);
                        }, "Update");
                    } else GData.apis.SFacture.Update(t);
                }, Owner: this
            });

            Api.RegisterApiCallback({
                Name: 'ValidateSFacture', DoApiCallback: (j, e, p) => {
                    var d = p.data;
                    var apis = GData.apis.SFacture;
                    if (!apis.Check(d)) return;
                    apis.Validate(p.data, undefined,
                        (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                            switch (error_data_notsuccess_iss) {
                                case basics.DataStat.Success:
                                    UI.InfoArea.push('The Facture <h1>Successfully</H1> Validated', true);
                                    break;
                                case basics.DataStat.DataCheckError:
                                    UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnValidated', false);
                                    break;
                                default:
                                    UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                    //this.ca.Data = p.data;
                    //this.Select('facture_achat');
                    //this.ca.Validate();
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'PrintSFacture', DoApiCallback: (j, e, p) => {
                    var d = p.data as models.SFacture;
                    var apis = GData.apis.SFacture;
                    if (!apis.Check(d)) return;
                    if (d.IsOpen)
                        UI.InfoArea.push("We annot print The Facture While It's open");
                    else
                        apis.Print(p.data,
                            (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                                switch (error_data_notsuccess_iss) {
                                    case basics.DataStat.Success:
                                        UI.InfoArea.push('The Facture <h1> Is Printing Successfully</H1> Saved', true);
                                        break;
                                    default:
                                        UI.InfoArea.push("UnExpected Error Occurred ", false);
                                        break;
                                }
                            });
                }, Owner: this
            });
        }

        private initVentsCmd() {

            Api.RegisterApiCallback({
                Name: 'OpenFacture', DoApiCallback: (j, e, p) => {
                    this.cv.Open(p.data);
                    this.Select('facture_vent');
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'SaveFacture', DoApiCallback: (j, e, p) => {
                    var d = p.data;
                    var apis = GData.apis.Facture;
                    if (!apis.Check(d)) return;
                    apis.Save(p.data, undefined,
                        (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                            switch (error_data_notsuccess_iss) {
                                case basics.DataStat.Success:
                                    UI.InfoArea.push('The Facture <h1>Successfully</H1> Saved', true);
                                    break;
                                case basics.DataStat.DataCheckError:
                                    UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnSaved', false);
                                    break;
                                default:
                                    UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                    //this.ca.Data = p.data;
                    //this.Select('facture_achat');
                    //this.ca.SaveFacture();
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'DeleteFacture', DoApiCallback: (j, e, p) => {
                    UI.Modal.ShowDialog("Confirmation", "Do you want realy to delete this facture", (xx) => {
                        if (xx.Result == UI.MessageResult.ok) {
                            var apis = GData.apis.Facture;
                            apis.Delete(true, p.data, (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                                if (error_data_notsuccess_iss == basics.DataStat.Success) {
                                    UI.InfoArea.push('The Facture Successfully Deleted');
                                } else UI.InfoArea.push('An Error Happened When deleting The Facture');
                            });
                        }
                    }, "DELETE", 'CANCEL');
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'NewFacture', DoApiCallback: (j, e, p) => {
                    var apis = GData.apis.Facture;
                    var callback1 = (data:models.Facture) => {
                        if (!data) return;
                        GData.__data.Factures.Add(data);
                        p.callback && p.callback(p, data);
                        this.cv.Open(data);
                        this.Select('facture_vent');
                    };

                    var callback = (data: models.Facture) => {
                        Api.RiseApi('OpenFactureInfo', {
                            callback: (p, n) => { callback1(p.data); }, data: data
                        });
                    };

                    function selectClient(data) {
                        GData.apis.Client.Select((n, client, iss) => {
                            if (iss === UI.MessageResult.ok) {
                                if (!client) {
                                    UI.InfoArea.push("You must selet a client");
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
                    var data = apis.New(
                        (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                            if (error_data_notsuccess_iss == basics.DataStat.Success) {
                                selectClient(data);
                            } else {
                                UI.InfoArea.push("Un Expected Error Occured When Open New Facture");
                                data && data.Dispose();
                            }
                        }, false, false
                    );
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'UpdateFacture', DoApiCallback: (j, e, p) => {
                    var t = p.data as models.Facture;
                    if (!t) UI.InfoArea.push("Please . Select one facture");
                    if (t.IsOpen) {
                        UI.Modal.ShowDialog('Confirmation', "This Facture IsOpened .If You Update It You Will loss all changes data<br> Do you wand realy to Update it", (xx) => {
                            if (xx.Result == UI.MessageResult.ok) GData.apis.Facture.Update(t);
                        }, "Update");
                    } else GData.apis.Facture.Update(t);
                }, Owner: this
            });

            Api.RegisterApiCallback({
                Name: 'ValidateFacture', DoApiCallback: (j, e, p) => {
                    var d = p.data;
                    var apis = GData.apis.Facture;
                    if (!apis.Check(d)) return;
                    apis.Validate(p.data, undefined,
                        (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                            switch (error_data_notsuccess_iss) {
                                case basics.DataStat.Success:
                                    UI.InfoArea.push('The Facture <h1>Successfully</H1> Validated', true);
                                    break;
                                case basics.DataStat.DataCheckError:
                                    UI.InfoArea.push('Check your <h1 style="color:yellow">Data</h1>  of <h2 style="color:red">Facture</h2> <br> UnValidated', false);
                                    break;
                                default:
                                    UI.InfoArea.push("UnExpected Error Occurred ", false);
                                    break;
                            }
                        });
                    //this.ca.Data = p.data;
                    //this.Select('facture_achat');
                    //this.ca.Validate();
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'PrintFacture', DoApiCallback: (j, e, p) => {
                    var d = p.data as models.Facture;
                    var apis = GData.apis.Facture;
                    if (d.IsOpen)
                        UI.InfoArea.push("We annot print The Facture While It's open");
                    else
                        apis.Print(p.data,
                            (data, isNew: boolean, error_data_notsuccess_iss?: basics.DataStat) => {
                                switch (error_data_notsuccess_iss) {
                                    case basics.DataStat.Success:
                                        UI.InfoArea.push('The Facture <h1> Is Printing Successfully</H1> Saved', true);
                                        break;
                                    default:
                                        UI.InfoArea.push("UnExpected Error Occurred ", false);
                                        break;
                                }
                            });
                }, Owner: this
            });
        }

        private initVersmentCmd() {
            Api.RegisterApiCallback({
                Name: 'OpenVersment', DoApiCallback: (j, e, p) => {
                    
                    GData.apis.Versment.Edit(true, p.data, false, (c, d) => { {} });
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'DeleteVersment', DoApiCallback: (j, e, p) => {
                    GData.apis.Versment.Delete(true, p.data, (c, d) => { {} });
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'NewVersment', DoApiCallback: (j, e, p) => {
                    GData.apis.Versment.New((data, c, x) => {
                        if (!p || !p.data) {
                            GData.apis.Client.Select((n, item, iss) => {
                                if (item && iss === UI.MessageResult.ok) {
                                    data.Client = item;
                                    GData.apis.Versment.Edit(true, data, true, (data, cd, vf) => { {} });
                                }
                            }, null);
                            //Client.Select((selected, item) => {
                            //    {}
                            //    if (selected) {
                            //        data.Client = item;
                            //        GData.apis.Versment.Edit(true, data, true, (data, cd, vf) => { {} });
                            //    }
                            //}, p.data);
                        } else {
                            data.Client = p.data;
                            GData.apis.Versment.Edit(true, data, true, (data, cd, vf) => { if (p.callback) p.callback(p, data); });
                        }
                    }, false, false);
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'UpdateVersments', DoApiCallback: (j, e, p) => {
                    GData.apis.Versment.Update(p.data || GData.__data.Versments);
                }, Owner: this
            });
        }

        private initSVersmentCmd() {
            Api.RegisterApiCallback({
                Name: 'OpenSVersment', DoApiCallback: (j, e, p) => {
                    GData.apis.SVersment.Edit(true, p.data, false, (c, d) => { {} });
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'DeleteSVersment', DoApiCallback: (j, e, p) => {
                    GData.apis.SVersment.Delete(true, p.data, (c, d) => { {} });
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'NewSVersment', DoApiCallback: (j, e, p) => {
                    GData.apis.SVersment.New((data, c, x) => {
                        {}
                        data.Fournisseur = p.data;
                        GData.apis.SVersment.Edit(true, data, true, (data, cd, vf) => { {} });
                    }, true, false);
                }, Owner: this
            });
            Api.RegisterApiCallback({
                Name: 'UpdateSVersments', DoApiCallback: (j, e, p) => {
                    GData.apis.SVersment.Update(p.data || GData.__data.SVersments);
                }, Owner: this
            });
        }

        OnKeyDown(e: KeyboardEvent) {
            if (e.ctrlKey) {
                switch (e.keyCode) {
                    case 67: //Client 
                        this.Select('Clients');
                        break;
                    case 76:
                        this.Select('facture_clientels');
                        break;
                    case 86: //Vent
                        this.Select('facture_vent');
                        break;
                    case 70: //Fournisseur
                        this.Select('Fournissurs');
                        break;
                    case 82:
                        this.Select('facture_fournisseurs');
                        break;
                    case 65: //Achat
                        this.Select('facture_achat');
                        break;
                    default:
                        return super.OnKeyDown(e);
                }
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
                return true;
            }
            return super.OnKeyDown(e);
        }
    }
}