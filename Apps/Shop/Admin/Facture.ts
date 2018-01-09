import {UI, conv2template} from '../../../js/UI';
import {mvc, utils, basic, Api, thread, encoding, net, bind, reflection, collection } from '../../../js/Corelib';
import {sdata, Controller} from '../../../js/System';
import {funcs, GetVars, extern ,Facture} from '../Common';
import { models} from "../../../js/Models";
import Client = require("../../../js/Client");
import { basics } from '../Basics';
import { filters } from '../../../js/Filters';
declare var $;

var GData: basics.vars;
GetVars((v) => {
    GData = v;
    return false;
});
var userAbonment = bind.NamedScop.Get('UserAbonment');


export class FactureAchat extends Facture<models.FakePrice, models.SFacture>{
    protected ReglerFacture() {
        this.verser(true);
    }
    protected LoadArticles() {
        if (!this.Data.IsOpen)
            if (this.Data.Articles == null || !this.Data.Articles.Stat) {
                GData.apis.SFacture.UpdateArticlesOf(this.Data, null);
            }
    }


    Update() {
        {}
        UI.Modal.ShowDialog("Update", "Do you want realy to update this facture from server", (e) => {
            if (e.Result === UI.MessageResult.ok) {
                GData.apis.SFacture.UpdateArticlesOf(this.Data, null);
            }
        });
    }

    constructor() {
        super('facture_achat', 'Facture D\'<b><u>A</u></b>chat', 'SFacture.view', null);        
    }
    public AddNewArticle() {
        var data = this.adapter.Data;
        if (data.IsOpen)
            GData.apis.Revage.New((revage, p, i) => {
                if (i !== basics.DataStat.Success) return UI.InfoArea.push("UnExpected Error");
                revage.Facture = data;
                data.Articles.Add(revage);
                this.adapter.SelectItem(revage);
                basic.focuseOn(this.adapter.SelectedChild.View);
            }, false, false);
    }

    public SaveFacture() {
        Api.RiseApi("SaveSFacture", {
            data: this.Data
        });
    }

    public DeleteArticle() {
        var d = this.adapter.Data;
        if (!d || !d.IsOpen) return;
        var c = this.adapter.SelectedItem;
        if (c == null) UI.InfoArea.push("select an article to delete");
        var p = c.Product;
        var arts = d.GetValue(models.SFacture.DPArticles);
        var tt: models.SFacture;
        UI.Modal.ShowDialog('Confirmation', 'Do you want to remove this Article <br>' + (p || '').toString(), (xx) => {
            if (xx.Result === UI.MessageResult.ok) arts.Remove(c);
        }, 'DELETE', 'Cancel');
    }

    GetLeftBar() {
        fs.Target = this;
        var l = fs.GetLeftBar();
        l.OnInitialized = l => fs.ShowFournisseur();
        return l;
    }
    GetRightBar() {
        fs.Target = this;
        return fs.GetRightBar();
    }

    private OnContextMenuFired(r: UI.RichMenu<string>, selected: string) {
        if (selected === 'Ouvrir' || selected === 'Supprimer')
            this.OpenVersments(selected === 'Supprimer');
        else if (selected === 'Regler' || selected === 'Verser')
            this.verser(selected === 'Regler');
    }
    public verser(regler: boolean) {
        var data = this.Data;
        if (!data) return UI.Modal.ShowDialog("ERROR", "Selecter une facture pour ajouter une versment");
        if (regler) return GData.apis.SVersment.Regler(data, data.Client);
        GData.apis.SVersment.VerserTo(data, data.Fournisseur);
    }                    

    public OpenVersments(forDelete: boolean) {
        var data = this.Data;
        if (data)
            GData.apis.SVersment.OpenSVersmentsOfFacture(data, (results, selected, fournisseur, success) => {
                data.Recalc(results);
                if (success && forDelete) {
                    if (selected) {
                        UI.Modal.ShowDialog("Confirmation", "Voulez- vous vraiment supprimer ce veremnet", (xx) => {
                            if (xx.Result === UI.MessageResult.ok)
                                GData.apis.SVersment.Delete(true, selected, (a, b, c) => {
                                    if (c === basics.DataStat.Success) {
                                        UI.InfoArea.push("Ce Virement Est bien Supprimé", true, 5000);
                                    } else {
                                        UI.InfoArea.push("Une erreur s'est produite lorsque nous avons supprimé cette version", true, 5000);
                                    }
                                })
                        }, "Supprimer", "Annuler");
                    }
                    else UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                }
            });
        else {
            UI.InfoArea.push("You Must Set first the client");
        }
    }
    public OpenStatistics() { }
    public OpenMails() { }

    public NewProduct() {
        GData.apis.Product.CreateNew((pr) => {
            {}
            var t: models.EtatTransfer;
        });
    }

    public SelectFournisseur(onSuccessCallback?: () => void) {
        GData.apis.Fournisseur.Select((n, item, r) => {
            if (r === UI.MessageResult.ok) {
                if (item) {
                    this.Data.Fournisseur = item;
                    if (this.adapter.Data.Achteur == null)
                        this.SelectAchteur(onSuccessCallback);
                    else onSuccessCallback && onSuccessCallback();
                } else this.SelectFournisseur(onSuccessCallback);
            }
        }, this.Data.Fournisseur);
    }

    public SelectAchteur(onSuccessCallback: () => void) {
        var dt = this.adapter.Data.GetValue(models.SFacture.DPAchteur) as models.Agent;
        GData.apis.Agent.Select((n, item, r) => {
            if (r === UI.MessageResult.ok) {
                if (item) {
                    this.Data.Achteur = item;
                    onSuccessCallback && onSuccessCallback();
                } else {
                    this.SelectAchteur(onSuccessCallback);
                }
            }
        }, dt)

    }

    public Validate() {
        Api.RiseApi("ValidateSFacture", {
            data: this.Data
        });                                                                                                                          
    }
    
    public Print() {
        Api.RiseApi("PrintSFacture", {
            data: this.Data
        });
        var data = this.adapter.Data;
        if (data)
            GData.requester.Request(models.SFacture, "PRINT", data, data, (r, c) => {
                
            });
    }

    public Delete() {
        var d = this.adapter.SelectedItem;
        if (d)
            UI.Modal.ShowDialog("Confirmation", "Do you want remove <br>" + d.Product.toString() + " ", (xx) => { if (xx.Result === UI.MessageResult.ok) this.Data.Articles.Remove(d); });
        else UI.InfoArea.push("Selectioner l'article a supprimé");
    }
    public New() {
        Api.RiseApi('NewSFacture', { data: null, callback(p, f: models.SFacture) { } });
    }
    private _abonment: models.Abonment = 0;
    public OnBringIntoFront() {
        var d = this.adapter.Data;
        if (d == null) {
            UI.Modal.ShowDialog(this.Caption, 'There no facture selected do you want to create a new one', (xx) => {
                if (xx.Result === UI.MessageResult.ok) {
                    this.New();
                }
                else {
                    var p = this.parent as UI.NavPage;
                    p.Select('facture_fournisseurs');
                }
            }, 'Create New', 'Cancel');
        }
        this.abonment.Box.Enable = true;
        userAbonment.Value = models.Abonment.Detaillant;
        this.abonment.Box.Disable(true);
    }
    protected OnAbonmentChanged(b: UI.IAutoCompleteBox, o: basic.EnumValue, n: basic.EnumValue) {
        if (!this.IsActive) return;
        if (n) {
            this._abonment = n.Value;
            userAbonment.Value = abonEnum.Get(this._abonment);
        }
        else userAbonment.Value = abonEnum.Get(0);
    }
}

export class FactureVent extends Facture<models.Article, models.Facture> implements IFactureOperations {

    protected ReglerFacture() {
        this.verser(true);
    }
    protected LoadArticles() {
        if (!this.Data.IsOpen)
            if (this.Data.Articles == null || !this.Data.Articles.Stat) {
                GData.apis.Facture.UpdateArticlesOf(this.Data, null);
            }
    }


    Update() {
        {}
        UI.Modal.ShowDialog("Update", "Do you want realy to update this facture from server", (e) => {
            if (e.Result === UI.MessageResult.ok) {
                GData.apis.Facture.UpdateArticlesOf(this.Data, null);
            }
        });
    }
    constructor() {
        super('facture_vent', "Facture <b><u>V</u></b>ent", 'Facture.oview', null);
    }
    initialize() {
        super.initialize();
        this.Enable = true;
    }
    public AddNewArticle() {
        var data = this.adapter.Data;
        if (data.IsOpen)
            GData.apis.Article.New((revage, isn, t) => {
                if (t !== basics.DataStat.Success) return UI.InfoArea.push("UnExpected Error");
                revage.Owner = data;
                data.Articles.Add(revage);
                this.adapter.SelectItem(revage);
                //thread.Dispatcher.call(this, function () { basic.focuseOn(this.adapter.SelectedChild.View); });
            }, false, false);
    }
    public SaveFacture() {
        var d = this.Data;
        if (!d) return UI.InfoArea.push("There no facture selected");
        Api.RiseApi("SaveFacture", {
            data: d
        });
    }
    public DeleteArticle() {
        var d = this.adapter.Data;
        if (!d || !d.IsOpen) return;
        var c = this.adapter.SelectedItem;
        if (c == null) UI.InfoArea.push("select an article to delete");        
        var arts = d.GetValue(models.Facture.DPArticles);
        if (arts.Remove(c))
            UI.InfoArea.push("Article Was Successfully <h1>Deleted</h1>", true);
        else UI.InfoArea.push("Fatal <h1>Error</h1>", true);
    }
    GetLeftBar() {
        fs.Target = this;
        var l = fs.GetLeftBar();
        l.OnInitialized = l => fs.HideFournisseur();
        return l;
    }
    GetRightBar() {
        fs.Target = this;
        return fs.GetRightBar();
    }
    public verser(regler: boolean) {
        var data = this.Data;
        if (!data) return UI.Modal.ShowDialog("ERROR", "Selecter une facture pour ajouter une versment");
        if (regler) return GData.apis.Versment.Regler(data, data.Client);
        GData.apis.Versment.VerserTo(data, data.Client);
    }

    public OpenVersments(forDelete: boolean) {
        if (this.Data)
            GData.apis.Versment.OpenVersmentsOfFacture(this.Data, (results, selected, fournisseur, success) => {
                if (success && forDelete) {
                    if (selected) {
                        UI.Modal.ShowDialog("Confirmation", "Voulez- vous vraiment supprimer ce veremnet", (xx) => {
                            if (xx.Result === UI.MessageResult.ok)
                                GData.apis.Versment.Delete(true, selected, (a, b, c) => {
                                    if (c === basics.DataStat.Success) {
                                        UI.InfoArea.push("Ce Virement Est bien Supprimé", true, 5000);
                                    } else {
                                        UI.InfoArea.push("Une erreur s'est produite lorsque nous avons supprimé cette version", true, 5000);
                                    }
                                })
                        }, "Supprimer", "Annuler");
                    }
                    else UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                }
            });
        else {
            UI.InfoArea.push("You Must Set first the client");
        }
    }
    public OpenStatistics() { }
    
    public OpenMails() { }

    public NewProduct() {
        GData.apis.Facture.CreateNew
        GData.apis.Product.CreateNew((product) => {
            var data = this.Data;
            if (data && data.IsOpen) {
                GData.apis.Article.New((art, isn, err) => {
                    art.Product = product;
                    art.Count = 1;
                    data.Articles.Add(art);
                }, false, false);
            }
        });
    }

    public SelectFournisseur() {    }

    public SelectAchteur() {
        var facture = this.Data;
        var dt = facture.Client;
        GData.apis.Client.Select((modal, client, err) => {
            if (err === UI.MessageResult.ok) {
                if (!client) return this.SelectAchteur();
                facture.Client = client;
                facture.Abonment = client.Abonment;
                userAbonment.Value = client.Abonment;
            }
        }, this.Data.Client);
    }

    public Validate() {
        Api.RiseApi("ValidateFacture", { data: this.Data });
    }
    public Print() {
        Api.RiseApi("PrintFacture", { data: this.Data });
    }

    public Delete() {
        Api.RiseApi("DeleteFacture", { data: this.Data });
    }
    public New() {
        GData.apis.Article.New((s, t, g) => {
            if (g == basics.DataStat.Success)
                this.Data.Articles.Add(s);
            else UI.InfoArea.push("UnExpected  Error");
        }, false, false);
    }
    public OnBringIntoFront() {
        var d = this.adapter.Data;
        if (d == null) {
            UI.Modal.ShowDialog('Facture De Livraison', 'There no facture selected do you want to create new one', (xx) => {
                if (xx.Result === UI.MessageResult.ok) {
                    this.New();
                }
                else {
                    var p = this.parent as UI.NavPage;
                    p.Select('facture_clientels');
                }
            }, 'Create New', 'Cancel');
        }
        var v: models.Abonment;
        if (d && d.Client)
            v = d.Client.Abonment;
        else v = 0;
        userAbonment.Value = v;
        this.abonment.Box.Enable = true;
        this.Enable = !!d;

    }
    protected OnAbonmentChanged(b: UI.IAutoCompleteBox, o: basic.EnumValue, n: basic.EnumValue) {
        var d = this.Data;
        if (!d) return;
        d.Abonment = n.Value;
    }
}

var abonEnum = basic.getEnum('models.Abonment');



class FactureService {

    //* Right Panel*/
    private _print: UI.Glyph;
    private _save: UI.Glyph;
    private _valid: UI.Glyph;
    private _del: UI.Glyph;
    private _new: UI.Glyph;

    //* Left Panel*/
    private _edit: UI.Glyph;
    private _delete: UI.Glyph;

    private _acht: UI.Glyph;
    private _forn: UI.Glyph;
    private _creditCart: UI.Glyph;
    private _stat: UI.Glyph;
    private _info: UI.Glyph;
    private _mail: UI.Glyph;
    private _prod: UI.Glyph;

    private lb: UI.Navbar<any>;
    private rb: UI.Navbar<any>;

    GetLeftBar() {
        if (!this.lb) {
            this._edit = new UI.Glyph(UI.Glyphs.edit, false, 'Edit');
            this._new = new UI.Glyph(UI.Glyphs.plusSign, false, 'New');
            this._delete = new UI.Glyph(UI.Glyphs.fire, false, 'Delete');


            this._acht = new UI.Glyph(UI.Glyphs.user, false, 'Achteur');
            this._forn = new UI.Glyph(UI.Glyphs.home, false, 'Fournisseur');
            this._creditCart = new UI.Glyph(UI.Glyphs.creditCard, false, 'Versments');



            this._stat = new UI.Glyph(UI.Glyphs.stats, false, 'Statistics');
            this._info = new UI.Glyph(UI.Glyphs.infoSign, false, 'Information');



            this._mail = new UI.Glyph(UI.Glyphs.envelope, false, 'Post Message');

            this._prod = new UI.Glyph(UI.Glyphs.rub, false, 'Insert New Product');

            this.lb = new UI.Navbar<any>();
            funcs.setTepmlate(this.lb, this, this.handleSerices);
            this.rm = new UI.RichMenu(undefined, ["Regler", "Verser", "Supprimer", "", "Ouvrir"], this._creditCart);
            this.lb.OnInitialized = n => n.AddRange([this._new, this._edit, this._delete, funcs.createSparator(), this._forn, this._acht, this._creditCart, funcs.createSparator(), this._stat, this._info, funcs.createSparator(), this._mail, funcs.createSparator(), this._prod]);


        }
        return this.lb;
    }
    private rm: UI.RichMenu<any>;
    
    GetRightBar() {
        if (!this.rb) {
            this._print = new UI.Glyph(UI.Glyphs.print, false, 'Print');
            this._save = new UI.Glyph(UI.Glyphs.floppyDisk, false, 'Save');
            this._valid = new UI.Glyph(UI.Glyphs.check, false, 'Validate');

            this.rb = new UI.Navbar<any>();
            funcs.setTepmlate(this.rb, this, this.handleSerices);
            this.rb.OnInitialized = n => n.AddRange([this._print, funcs.createSparator(), this._valid, this._save]);
        }
        return this.rb;
    }

    handleSerices(s, e, p: { t: FactureService, c: UI.Glyphs }) {
        var c = UI.Glyphs;
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
                UI.InfoArea.push("This Option need for money to activate");
                return;
        }
    }
    HideFournisseur() { this._forn.Visible = false; }
    ShowFournisseur() { this._forn.Visible = true; }

    private target: IFactureOperations;
    private OnContextMenuFired(r: UI.RichMenu<string>, selected: string) {
        if (selected === 'Ouvrir' || selected === 'Supprimer')
            this.target.OpenVersments(selected === 'Supprimer');
        else if (selected === 'Regler' || selected === 'Verser')
            this.target.verser(selected === 'Regler');
    }

    public set Target(target: IFactureOperations) {
        this.target = target;
    }
}
class FacturesService {
    //* Right Panel*/
    private _print: UI.Glyph;
    private _open: UI.Glyph;
    private _new: UI.Glyph;
    //* Left Panel*/
    private _save: UI.Glyph;
    private _update: UI.Glyph;
    private _validate: UI.Glyph;
    private _delete: UI.Glyph;



    private lb: UI.Navbar<any>;
    private rb: UI.Navbar<any>;

    GetRightBar() {
        if (!this.lb) {
            this._print = new UI.Glyph(UI.Glyphs.print, false, 'Print');
            this._open = new UI.Glyph(UI.Glyphs.open, false, 'Open');
            this._new = new UI.Glyph(UI.Glyphs.openFile, false, 'New');

            this.lb = new UI.Navbar<any>();
            var oldget = this.lb.getTemplate;
            this.lb.getTemplate = (c) => {
                var e = oldget(new UI.Anchore(c));
                if (!(c as UI.JControl).Enable)
                    e.Enable = false;
                return e;
            }

            this.lb.OnInitialized = n => n.AddRange([this._print, this._open, this._new]);
            this.lb.OnSelectedItem.On = (u) => {
                
            }
        }
        return this.lb;
    }
    GetLeftBar() {
        if (!this.rb) {

            this._update = new UI.Glyph(UI.Glyphs.banCircle, false, 'Update');
            this._validate = new UI.Glyph(UI.Glyphs.openFile, false, 'Validate');
            this._save = new UI.Glyph(UI.Glyphs.openFile, false, 'Save');
            this._delete = new UI.Glyph(UI.Glyphs.openFile, false, 'Delete');

            this.rb = new UI.Navbar<any>();
            var oldget = this.rb.getTemplate;
            this.rb.getTemplate = (c) => { return oldget(new UI.Anchore(c)); }
            
            this.rb.OnInitialized = n => {
                n.AddRange([this._delete,funcs. createSparator(), this._save, this._validate, this._update]);
            }
        }
        return this.rb;
    }
}

export interface IFactureOperations {
    verser(regler: boolean);
    OpenVersments(forDelete: boolean);
    SelectAchteur(onSuccessCallback?: () => void);
    SelectFournisseur(onSuccessCallback?: () => void);
    OpenStatistics();
    OpenInfo();
    OpenMails();
    NewProduct();

    SaveFacture();
    Validate();
    Print();
    Delete();
    New();
}
var fs = new FactureService();