import {UI, conv2template} from '../../../js/UI';
import {mvc, utils, basic, thread, encoding, net, bind, reflection, collection, Api, ScopicCommand} from '../../../js/Corelib';
import {sdata, Controller, base} from '../../../js/System';
import { models as models } from "../../../js/Models";
import {Apis} from '../apis/QShopApis';
import {init} from '../../../js/Encoding';
import { Load } from '../../../js/services';

import { funcs, GetVars, extern} from './../Common';
import {ikmodels as iimodels} from '../models';
import {LoadJobs} from '../Jobs';
import {filters } from '../../../js/Filters';
import Client = require("../../../js/Client");
import { basics } from '../Basics';
import { SearchData } from '../Search';

var GData: basics.vars;
var b = true;
GetVars((v) => {
    GData = v;
    return false;
});


function crb(dom,icon, title, type,attri:any) {
    var t = document.createElement(dom);
    t.classList.add('btn', 'btn-' + type, 'glyphicon', 'glyphicon-' + icon);
    t.textContent = '  ' + title;
    for (var i in attri)
        t.setAttribute(i, attri[i]);
    return t;
}

export namespace AdminNavs {
    export class FacturesReciption extends UI.NavPanel implements IFacturesOperation {
        private OnContextMenuFired(r: UI.RichMenu<string>, selected: string) {
            if (selected === 'Ouvrir' || selected === 'Supprimer')
                this.OpenVersments(selected === 'Supprimer');
            else if (selected === 'Regler' || selected === 'Verser')
                this.verser(selected === 'Regler');
        }

        public OpenVersments(forDelete: boolean) {
            
            if (this.adapter.SelectedItem)
                GData.apis.SVersment.OpenSVersmentsOfFacture(this.adapter.SelectedItem, (results, selected, fournisseur, success) => {
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
                                    });
                            }, "Supprimer", "Annuler");
                        }
                        else UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                    }
                });
            else {
                UI.InfoArea.push("You Must Set first the client");
            }
        }
        public verser(regler: boolean) {
            var data = this.adapter.SelectedItem;
            if (!data) return UI.Modal.ShowDialog("ERROR", "Selecter une Facture pour ajouter une versment");
            if (regler) return GData.apis.SVersment.Regler(data, data.Client);
            GData.apis.SVersment.VerserTo(data, data.Client);
        }
        searchList: collection.ExList<models.SFacture, utils.IPatent<models.SFacture>>;
        constructor() {
            super("facture_fournisseurs", "Factures <b><u>R</u></b>eciption");
        }

        private adapter: UI.ListAdapter<models.SFacture, any>;
        private btn_filter = crb('label', 'filter', '', 'default', {});
        private group_cnt: UI.Div = new UI.Div().applyStyle('pull-right', 'flat');
        private group_tcnt = new UI.Div().applyStyle('icontent-header');
        private _caption = document.createTextNode("Les Factures de ");
        protected abonment: UI.ProxyAutoCompleteBox<models.Client> = new UI.ProxyAutoCompleteBox(new UI.Input(document.createElement('input')), GData.__data.Costumers);
        private searchFilter: filters.list.StringFilter<models.SFacture> = new filters.list.StringFilter<models.SFacture>();
        public OnSearche(oldPatent: string, newPatent: string) {
            this.searchFilter.Patent = new filters.list.StringPatent(newPatent);
        }
        public get HasSearch(): UI.SearchActionMode { return UI.SearchActionMode.Instantany; }
        public set HasSearch(v: UI.SearchActionMode) { }
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
                    this.New();
                else  if (this.adapter.SelectedIndex != -1)
                    if (e.keyCode === 13)
                        this.Open();
                    else if (e.keyCode === UI.Keys.Delete)
                        this.Delete();
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

            this.btn_filter.addEventListener('click', () => this.OnDeepSearch());
        }
        initialize() {
            super.initialize();
            this.initializeSBox();
            this.initPaginator();
            var isc = false;
        }
        private searchRequest: iimodels.SFactureSearch = new iimodels.SFactureSearch();
        private paginator: UI.Paginator<models.SFacture>;
        initPaginator() {
            this.adapter = new UI.ListAdapter<any, any>('SFactures.table');
            this.adapter.AcceptNullValue = false;
            this.paginator = new UI.Paginator<models.SFacture>(10);
            this.paginator.OnInitialized = (p) => {
                this.adapter.OnInitialized = (l) => {
                    l.Source = this.searchList= GData.__data.SFactures.Filtred(this.searchFilter as any).Filtred(this.paginator.Filter);
                    this.paginator.BindMaxToSourceCount(GData.__data.SFactures);
                }
                this.paginator.Content = this.adapter;
            };
            this.Add(this.paginator);
        }
        private Search(f: iimodels.SFactureSearch) {
            var t = GData.__data.Costumers.AsList();
            for (var i = 0, l = t.length; i < l; i++) {
                var e = t[i];
            }
        }
        private service = new FactureBaseServices(this);
        public GetLeftBar() {
            return this.service.GetLeftBar(this);
        }
        public GetRightBar() {
            return this.service.GetRightBar(this);
        }
        Print() {
            Api.RiseApi('PrintSFacture',  { data: this.adapter.SelectedItem });
        }
        Open() {
            Api.RiseApi('OpenSFacture',  { data: this.adapter.SelectedItem });
        }
        New() {
            
            Api.RiseApi('NewSFacture', { data: null, callback(p, f: models.SFacture) { } });
        }

        FsSave() {
            Api.RiseApi('SaveSFacture',  { data: this.adapter.SelectedItem });
        }

        Update() {
            GData.apis.SFacture.SmartUpdate();
        }
        FsUpdate() {
            Api.RiseApi('UpdateSFacture',  { data: this.adapter.SelectedItem });
        }
        Validate() {
            Api.RiseApi('ValidateSFacture',  { data: this.adapter.SelectedItem });
        }
        Delete() {
            Api.RiseApi('DeleteSFacture',  { data: this.adapter.SelectedItem });
        }

        OnDeepSearch() {
            if (!this._deepSearch)
                this._deepSearch = new SearchData.SFacture;
            this._deepSearch.Open((x) => {
                var t = this.searchList.Filter == this._deepSearch as any;
                this.searchList.Filter = this._deepSearch as any;
                if (t) this.searchList.Reset();
            });
        }
        private _deepSearch: SearchData.SFacture;

    }

    export class FacturesLivraison extends UI.NavPanel {
        searchList: collection.ExList<models.Facture, iimodels.IFS>;
        private adapter: UI.ListAdapter<models.Facture, any>;
        private btn_filter = crb('label', 'filter', '', 'default', {});
        private group_cnt: UI.Div = new UI.Div().applyStyle('pull-right', 'flat');
        private group_tcnt = new UI.Div().applyStyle('icontent-header');
        private _caption = document.createTextNode("Les Factures de ");
        protected abonment: UI.ProxyAutoCompleteBox<models.Client> = new UI.ProxyAutoCompleteBox(new UI.Input(document.createElement('input')), GData.__data.Costumers);

        OnDeepSearch() {
            if (!this._deepSearch)
                this._deepSearch = new SearchData.Facture;
            this._deepSearch.Open((x) => {
                var t = this.searchList.Filter == this._deepSearch as any;
                this.searchList.Filter = this._deepSearch as any;
                if (t) this.searchList.Reset();
            });
        }
        private _deepSearch: SearchData.Facture;


        Update() {
            GData.apis.Facture.SmartUpdate();
        }
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
                    this.New();
                else if (this.adapter.SelectedIndex != -1)
                    if (e.keyCode === 13)
                        this.Open();
                    else if (e.keyCode === UI.Keys.Delete)
                        this.Delete();
                    else  if (e.keyCode === UI.Keys.F9)
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
        constructor() {
            super("facture_clientels", "Factures <b><u>L</u></b>ivraison ");
        }
        initialize() {
            super.initialize();
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
            this.initPaginator();
            var isc = false;
            this.btn_filter.addEventListener('click', () => this.OnDeepSearch());
            this.adapter.AcceptNullValue = false;
        }
        private searchRequest: iimodels.FactureSearch = new iimodels.FactureSearch();
        private Search(f: iimodels.FactureSearch) {
            var t = GData.__data.Costumers.AsList();
            for (var i = 0, l = t.length; i < l; i++) {
                var e = t[i];
            }
        }

        private paginator: UI.Paginator<models.Facture>;
        private searchFilter: iimodels.FSFilter;
        initPaginator() {
            this.paginator = new UI.Paginator<models.Facture>(15);
            this.paginator.OnInitialized = (p) => {
                this.adapter = new UI.ListAdapter<any, any>('Factures.InValidation', 'Factures.row');
                this.adapter.OnInitialized = (l) => {
                    var x = this.searchList = collection.ExList.New(GData.__data.Factures, this.searchFilter = new iimodels.FSFilter(this.searchRequest));
                    l.Source = collection.ExList.New(x, this.paginator.Filter);
                    this.paginator.BindMaxToSourceCount(x);
                }
                this.paginator.Content = this.adapter;
            };
            this.Add(this.paginator);
        }
        private service = new FactureBaseServices(this);
        public GetLeftBar() {
            return this.service.GetLeftBar(this);
        }
        public GetRightBar() {
            return this.service.GetRightBar(this);
        }
        Print() {
            Api.RiseApi('PrintFacture', { data: this.adapter.SelectedItem });
        }
        Open() {
            Api.RiseApi('OpenFacture', { data: this.adapter.SelectedItem });
        }
        New() {
            Api.RiseApi("NewFacture", {
                data: null,
                callback(p, k) { }
            });
        }

        FsSave() {
            Api.RiseApi('SaveFacture', { data: this.adapter.SelectedItem });
        }
        FsUpdate() {
            Api.RiseApi('UpdateFacture', { data: this.adapter.SelectedItem });
        }
        

        Validate() {
            Api.RiseApi('ValidateFacture', { data: this.adapter.SelectedItem });
        }
        Delete() {
            Api.RiseApi('DeleteFacture', { data: this.adapter.SelectedItem });
        }
        
        private OnContextMenuFired(r: UI.RichMenu<string>, selected: string) {
            if (selected === 'Ouvrir' || selected === 'Supprimer')
                this.OpenVersments(selected === 'Supprimer');
            else if (selected === 'Regler' || selected === 'Verser')
                this.verser(selected === 'Regler');
        }

        public OpenVersments(forDelete: boolean) {
            
            if (this.adapter.SelectedItem)
                GData.apis.Versment.OpenVersmentsOfFacture(this.adapter.SelectedItem, (results, selected, fournisseur, success) => {
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
                                    });
                            }, "Supprimer", "Annuler");
                        }
                        else UI.InfoArea.push("Vous ne sélectionnez aucun Virement");
                    }
                });
            else {
                UI.InfoArea.push("You Must Set first the client");
            }
        }
        public verser(regler: boolean) {
            var data = this.adapter.SelectedItem;
            if (!data) return UI.Modal.ShowDialog("ERROR", "Selecter une Facture pour ajouter une versment");
            if (regler) return GData.apis.Versment.Regler(data, data.Client);
            GData.apis.Versment.VerserTo(data, data.Client);
        }
    }
    
    export interface IFacturesOperation {
        Print();
        Open();
        New();

        FsSave();
        FsUpdate();
        Validate();
        Delete();

        OpenVersments(toDelete: boolean);
        verser(regelr: boolean);
    }
}

 

class FactureBaseServices {
    constructor(private target: AdminNavs.IFacturesOperation) { }
    private lb: UI.Navbar<any>;
    private rb: UI.Navbar<any>;
    GetLeftBar(target: AdminNavs.IFacturesOperation) {
        if (this.lb) return this.lb;
        this.lb = new UI.Navbar<any>();
        var oldget = this.lb.getTemplate; this.rm
        this.lb.getTemplate = (c) => {
            var x = new UI.Anchore(c);
            var e = oldget(x);
            e.addEventListener('click', this.callback, { t: this, p: c as UI.Glyph });
            return e;
        }
        this.lb.OnInitialized = (n) => {
            var _creditCart: UI.JControl;
            n.AddRange([

                new UI.Glyph(UI.Glyphs.edit, false, 'Edit'),
                new UI.Glyph(UI.Glyphs.plusSign, false, 'New'),
                new UI.Glyph(UI.Glyphs.fire, false, 'Delete'),
                funcs.createSparator(),
                new UI.Glyph(UI.Glyphs.print, false, 'Print'),
                funcs.createSparator(),
                _creditCart = new UI.Glyph(UI.Glyphs.creditCard, false, 'Versment Manager'),
            ]);
            this.rm = new UI.RichMenu(undefined, ["Regler", "Verser", "Supprimer", "", "Ouvrir"], _creditCart);
        };
    }
    GetRightBar(target: AdminNavs.IFacturesOperation) {
        if (this.rb) return this.rb;
        this.rb = new UI.Navbar<any>();
        var oldget = this.rb.getTemplate;
        this.rb.getTemplate = (c) => {
            var x = new UI.Anchore(c);
            var e = oldget(x);
            e.addEventListener('click', this.callback, { t: this, p: c as UI.Glyph });
            return e;
        }
        this.rb.OnInitialized = (n) => n.AddRange([
            new UI.Glyph(UI.Glyphs.refresh, false, 'Update'),
            new UI.Glyph(UI.Glyphs.check, false, 'Validate'),
            new UI.Glyph(UI.Glyphs.floppyDisk, false, 'Save')
        ]);
    }
    private callback(x: UI.JControl, e: MouseEvent, c: { t: FactureBaseServices, p: UI.Glyph }) {
        var target = c.t.target;
        switch (c.p.Type) {
            case UI.Glyphs.refresh:
                return target.FsUpdate();
            case UI.Glyphs.check:
                return target.Validate();
            case UI.Glyphs.floppyDisk:
                return target.FsSave();
            case UI.Glyphs.edit:
                return target.Open();
            case UI.Glyphs.plusSign:
                return target.New();
            case UI.Glyphs.fire:
                return target.Delete();
            case UI.Glyphs.print:
                return target.Print();
            case UI.Glyphs.creditCard:
                c.t.rm.Open(e, { Owner: c.t, Invoke: c.t.OnContextMenuFired }, null, true);
                break;
            default:
                UI.InfoArea.push("Unrechable Code");
                return;
        }
    }
    private OnContextMenuFired(r: UI.RichMenu<string>, selected: string) {
        if (selected === 'Ouvrir' || selected === 'Supprimer')
            this.target.OpenVersments(selected === 'Supprimer');
        else if (selected === 'Regler' || selected === 'Verser')
            this.target.verser(selected === 'Regler');
    }
    Print(g, m, t) { t.target.Print(); }
    Open(g, m, t) { t.target.Open(); }
    New(g, m, t) { t.target.New(); }
    Versement(g, m, t) {
        t.rm.Open(m, { Owner: t.target, Invoke: t.target.OnContextMenuFired }, null, true);
    }
    FsSave(g, m, t) { t.target.FsSave(); }
    Update(g, m, t) { t.target.FsUpdate(); }
    Validate(g, m, t) { t.target.Validate(); }
    Delete(g, m, t) { t.target.Delete(); }
    rm: UI.RichMenu<string>;

}
