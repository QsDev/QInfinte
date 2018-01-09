import {UI, conv2template} from '../../../js/UI';
import { models} from "../../../js/Models";
import { funcs, GetVars, extern} from '../Common';
import {sdata, Controller} from '../../../js/System';
import { basic, utils, collection, Api} from '../../../js/Corelib';
import Client = require("../../../js/Client");
import { basics } from '../Basics';
import { filters } from '../../../js/Filters';
import { SearchData } from '../Search';
var GData:basics.vars;
GetVars((v) => {
    GData = v;
    return false;
});


export class Fournisseurs extends UI.NavPanel {    
    
    searchList: collection.ExList<models.Fournisseur, utils.IPatent<models.Fournisseur>>;
    private btn_filter = UI.Modals.CreateGlyph('label', 'filter', '', 'default', {});
    private group_cnt: UI.Div = new UI.Div().applyStyle('pull-right', 'flat');
    private group_tcnt = new UI.Div().applyStyle('icontent-header');
    private _caption = document.createTextNode("Fournisseurs");
    protected abonment: UI.ProxyAutoCompleteBox<models.Client> = new UI.ProxyAutoCompleteBox(new UI.Input(document.createElement('input')), GData.__data.Costumers);

    private adapter: UI.ListAdapter<models.Fournisseur, any>;
    constructor() {
        super("Fournissurs", "<b><u>F</u></b>ournisseurs");

    }
    private searchFilter: filters.list.StringFilter<models.Fournisseur> = new filters.list.StringFilter<models.Fournisseur>();
    public OnSearche(oldPatent: string, newPatent: string) {
        var t = this.searchList.Filter == this.searchFilter;
        this.searchFilter.Patent = new filters.list.StringPatent(newPatent);
        if (!t)
            this.searchList.Filter = this.searchFilter as any;
        else this.searchList.Reset();
    }
    OnDeepSearch() {
        if (!this._deepSearch)
            this._deepSearch = new SearchData.Fournisseur;
        this._deepSearch.Open((x) => {
            var t = this.searchList.Filter == this._deepSearch as any;
            this.searchList.Filter = this._deepSearch as any;
            if (t) this.searchList.Reset();
        });
    }
    private _deepSearch: SearchData.Fournisseur;
    public get HasSearch(): UI.SearchActionMode { return UI.SearchActionMode.Instantany; }    public set HasSearch(v: UI.SearchActionMode) { }
    protected OnKeyDown(e: KeyboardEvent) {
        if (!this.adapter.OnKeyDown(e)) {
            if (e.keyCode === UI.Keys.F1)
                this.getHelp({
                    "F2": "Add New",
                    "F3": "Deep Searche",
                    "F5": "Update",
                    "F9": "Settle Debts",
                    "F10": "Versments",
                    "Suppr": "Delete",
                    "Enter": "Edit"
                });
            else if (e.keyCode === UI.Keys.F2)
                this.AddFournisseur();
            else  if (this.adapter.SelectedIndex != -1)
                if (e.keyCode === 13)
                    this.EditFournisseur();
                else if (e.keyCode === UI.Keys.Delete)
                    this.RemoveFournisseur();
                else if (e.keyCode === UI.Keys.F9)
                    this.verser(true);
                else if (e.keyCode === UI.Keys.F10)
                    this.OpenVersments(false);
                else
                    return super.OnKeyDown(e);
            else return super.OnKeyDown(e);
        }
        e.stopPropagation();
        e.preventDefault();
        return true;
    }
    initialize() {
        super.initialize();
        this.initializeSBox();
        this.adapter = new UI.ListAdapter<any, any>('Fournisseur.table').applyStyle('row');
        this.adapter.OnInitialized = (n) => n.Source = this.searchList = GData.__data.Fournisseurs.Filtred(this.searchFilter);
        this.Add(this.adapter);
        this.adapter.AcceptNullValue = false;
    }
    initializeSBox() {
        var div = this.group_cnt.View;
        div.appendChild(this.btn_filter);
        this.abonment.Box.Placeholder = 'Select a Client';
        div.appendChild(this.abonment.Box.View);
        this.abonment.Box.Parent = this.group_cnt;
        this.abonment.Box.OnInitialized = n => {
            var s = n.View.style;
            s.marginTop = '1px';
            s.cssFloat = 'left';
            s.width = 'auto';
            n.applyStyle('form-control');
        }
        this.abonment.Box.View.style.minWidth = '300px';
        this.abonment.initialize();

        this.group_tcnt.View.appendChild(this._caption);
        this.group_tcnt.Add(this.group_cnt);
        this.Add(this.group_tcnt);

        this.btn_filter.addEventListener('click', () => {

        });
    }

    Update() {
        GData.apis.Fournisseur.SmartUpdate();
    }
    AddFournisseur() {
        GData.apis.Fournisseur.CreateNew((f) => { });
        //GData.apis.Fournisseur.New((n, i, x) => {
        //    if (x === basics.DataStat.Success) {
        //        GData.apis.Fournisseur.Edit(true, n, i);
        //    }
        //}, false, false)
    }
    RemoveFournisseur() {
        GData.apis.Fournisseur.Delete(true, this.adapter.SelectedItem, null);
    }
    EditFournisseur() {
        GData.apis.Fournisseur.Edit(true, this.adapter.SelectedItem, false);
    }
    Search() {
    }
    GetLeftBar() {
        if (!this.lb) {
            this.lb = new UI.Navbar<any>();
            var oldget = this.lb.getTemplate;
            this.lb.getTemplate = (c) => {
                var x = new UI.Anchore(c);
                var e = oldget(x);
                e.addEventListener('click', this.callback, { t: this, p: c as UI.Glyph });
                return e;
            }
            var _creditCart: UI.Glyph;
            
            this.lb.OnInitialized = (n) => n.AddRange([
                new UI.Glyph(UI.Glyphs.plusSign, false, 'Add'),
                new UI.Glyph(UI.Glyphs.edit, false, 'Edit'),
                new UI.Glyph(UI.Glyphs.fire, false, "Delete")

            ]);

        }
        return this.lb;
    }

    GetRightBar() {
        if (!this.rb) {
            this.rb = new UI.Navbar<any>();
            var oldget = this.rb.getTemplate;
            this.rb.getTemplate = (c) => {
                var x = new UI.Anchore(c);
                var e = oldget(x);
                e.addEventListener('click', this.callback, { t: this, p: c as UI.Glyph });
                return e;
            }
            this.rb.OnInitialized = (n) => n.AddRange([
                this._creditCart
            ]);
        }
        return this.rb;
    }
    private callback(s, e, p) {
        var __this = p.t as this;
        switch (p.p.Type) {
            case UI.Glyphs.plusSign:
                __this.AddFournisseur();
                break;
            case UI.Glyphs.edit:
                __this.EditFournisseur();
                break;
            case UI.Glyphs.fire:
                __this.RemoveFournisseur();
                break;
            case UI.Glyphs.search:
                __this.Search();
                break;
            case UI.Glyphs.creditCard:
                p.t.rm.Open(e, { Owner: __this, Invoke: p.t.OnContextMenuFired }, null, true);
                break;
            default:
                UI.InfoArea.push("Unrechable Code");
                return;
        }
    }
    private lb: UI.Navbar<any>;
    private rb: UI.Navbar<any>;
    _creditCart = new UI.Glyph(UI.Glyphs.creditCard, false, 'Add');
    rm: UI.RichMenu<string> = new UI.RichMenu(undefined, ["Regler", "Verser", "Supprimer", "", "Ouvrir"], this._creditCart);
    private OnContextMenuFired(r: UI.RichMenu<string>, selected: string) {
        if (selected === 'Ouvrir' || selected === 'Supprimer')
            this.OpenVersments(selected === 'Supprimer');
        else if (selected === 'Regler' || selected === 'Verser')
            this.verser(selected === 'Regler');
    }
    public OpenVersments(forDelete: boolean) {
        if (this.adapter.SelectedItem)
            GData.apis.SVersment.OpenSVersmentsOfFournisseur(this.adapter.SelectedItem, (results, selected, fournisseur, success) => {
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
                }
            });
        else {
            UI.InfoArea.push("You Must Select At Least one Provider");
        }
    }
    public verser(regler: boolean) {
        var data = this.adapter.SelectedItem;
        if (!data) return UI.Modal.ShowDialog("ERROR", "Selecter une Fournisseur pour ajouter une versment");
        if (regler) return GData.apis.SVersment.Regler(null, data);
        GData.apis.SVersment.VerserTo(null, data);
    }
    
}