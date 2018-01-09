import {UI, conv2template} from '../../../js/UI';
import {funcs, GetVars, extern, Facture} from '../Common';
import { models} from "../../../js/Models";
import {filters } from '../../../js/Filters';
import { collection, basic, thread, utils } from '../../../js/Corelib';
import { basics } from '../Basics';
import { SearchData } from '../Search';

var GData: basics.vars;
GetVars((v) => {
    GData = v;
    return false;
});

export class ProductsNav extends UI.NavPanel {
    private btn_add = extern.crb('plus', 'Add', 'primary');
    private btn_edit = extern.crb('pencile', 'Edit', 'success');
    private btn_remove = extern.crb('trash', 'Remove', 'danger');
    //private txt_action: UI.ActionText = new UI.ActionText().applyStyle('pull-right');
    private group_cnt: UI.Div = new UI.Div().applyStyle('pull-right', 'flat');
    private group_tcnt = new UI.Div().applyStyle('icontent-header');
    private adapter: UI.ListAdapter<models.Product, any> = new UI.ListAdapter<any, any>('Products.table', null && 'Product.row');
    private _caption = document.createTextNode("Products");
    private paginator: UI.Paginator<models.Product>;
    private searchFilter: filters.list.StringFilter<models.Product> = new filters.list.StringFilter<models.Product>();
    public OnSearche(oldPatent: string, newPatent: string) {
        var t = this.searchList.Filter == this.searchFilter;
        this.searchFilter.Patent = new filters.list.StringPatent(newPatent);
        if (!t)
            this.searchList.Filter = this.searchFilter as any;
        else this.searchList.Reset();
    }
    private _deepSearch: SearchData.Product;
    searchList: collection.ExList<models.Product, utils.IPatent<models.Product>>;
    OnDeepSearch() {
        if (!this._deepSearch)
            this._deepSearch = new SearchData.Product;
        this._deepSearch.Open((x) => {
            var t = this.searchList.Filter == this._deepSearch as any;
            this.searchList.Filter = this._deepSearch as any;
            if (t) this.searchList.Reset();
        });
    }
    public get HasSearch(): UI.SearchActionMode { return UI.SearchActionMode.Instantany; }
    public set HasSearch(v: UI.SearchActionMode) { }
    protected OnKeyDown(e: KeyboardEvent) {
        if (!this.adapter.OnKeyDown(e)) {
            if (e.keyCode === UI.Keys.Right)
                this.paginator.Next();
            else if (e.keyCode === UI.Keys.Left)
                this.paginator.Previous();
            else if (e.keyCode === UI.Keys.F1)
                this.getHelp({
                    "F2": "Add New",
                    "F3": "Deep Searche",
                    "F5": "Update",
                    "F9": "Add Revage",
                    "F10": "Edit Revage",
                    "Suppr": "Delete",
                    "Enter": "Edit"
                });
            else if (e.keyCode === UI.Keys.F2)
                this.btnAddClick();
            else  if (this.adapter.SelectedIndex != -1)
                if (e.keyCode === 13)
                    this.btnEditClick();
                else if (e.keyCode === UI.Keys.Delete)
                    this.btnRemoveClick();
                else if (e.keyCode === UI.Keys.F9)
                    this.addRevage();
                else if (e.keyCode === UI.Keys.F10)
                    this.corrigerRvage();
                else
                    return super.OnKeyDown(e);
            else return super.OnKeyDown(e);
        }
        e.stopPropagation();
        e.preventDefault();
        return true;
    }
    constructor() {
        super('products', "Produits");
    }

    Update() {
        GData.apis.Product.SmartUpdate();
    }
    initsec() {
        var div = this.group_cnt.View;
        div.appendChild(this.btn_add); div.appendChild(this.btn_edit); div.appendChild(this.btn_remove);
        this.group_tcnt.View.appendChild(this._caption);
        this.group_tcnt.Add(this.group_cnt);
        //this.group_tcnt.Add(this.txt_action);
        this.Add(this.group_tcnt);
        this.initPaginator();

        this.btn_add.addEventListener('click', <any>{ handleEvent(e) { this.self.btnAddClick(); }, self: this });
        this.btn_edit.addEventListener('click', <any>{ handleEvent(e) { this.self.btnEditClick(); }, self: this });
        this.btn_remove.addEventListener('click', <any>{ handleEvent(e) { this.self.btnRemoveClick(); }, self: this });
        //this.txt_action.OnAction.On = (s, o, n) => {
        //    o = (o || "").trim().toLowerCase();
        //    n = (n || "").trim().toLowerCase();
        //    if (o == n) return;
        //    this.searchFilter.Patent = new filters.list.StringPatent(n);
        //};
        this.adapter.AcceptNullValue = false;
        
    }
    initPaginator() {
        this.paginator = new UI.Paginator<models.Product>(8);
        this.paginator.OnInitialized = (p) => {
            this.adapter.OnInitialized = (l) => {
                var x: collection.ExList<any, any> = this.searchList = collection.ExList.New(GData.__data.Products, this.searchFilter);
                l.Source = collection.ExList.New(x, this.paginator.Filter);
                this.paginator.BindMaxToSourceCount(x);
            }
            this.paginator.Content = this.adapter;
        };
        this.Add(this.paginator);
    }
    btnAddClick() {
        GData.apis.Product.CreateNew();
    }
    btnEditClick() {
        GData.apis.Product.Edit(true, this.adapter.SelectedItem, false);
    }
    btnRemoveClick() {
        GData.apis.Product.Delete(true, this.adapter.SelectedItem, null);
    }
    initEvents() {
        this.btn_add.addEventListener('click', <any>{ handleEvent(e) { this.self.btnAddClick(e); }, self: this });
        this.btn_edit.addEventListener('click', <any>{ handleEvent: function (e) { this.self.btnEditClick(e); }, self: this });
        this.btn_remove.addEventListener('click', <any>{ handleEvent: function (e) { this.self.btnRemoveClick(e); }, self: this });
    }
    initialize() {
        super.initialize();
        this.initsec();
    }

    corrigerRvage() {

    }
    addRevage() {
        var p = this.adapter.SelectedItem;
        if (p)
            GData.apis.Revage.New((f) => {
                f.Product = p;
                GData.apis.Revage.Edit(true, f, true, (n, item, error) => {
                    GData.apis.Product.Update(p);
                })
            }, false, false);
        else UI.InfoArea.push("Select One Product to Add An Revage");
    }
    private edit(pr: models.FakePrice) {
        GData.apis.Revage.New((f, isn, err) => {
            GData.apis.Revage.Edit(true, f, isn, (f, isn, err) => {
                var iss = err === basics.DataStat.Success;
                var p = f.Product;
                if (iss) {
                    if (p.Revage == null)
                        p.Revage = f;
                    else {
                        var t = p.Revage;
                        var r = t.NextRevage;
                        while ((r = t.NextRevage) != null)
                            t = r;
                        t.NextRevage = f;
                    }
                } else {
                    thread.Dispatcher.call(this, this.edit, f);
                }
            });
        }, false, false);
        //var xp = FakePrice.AddNew(pr, (f, isn, iss) => {
        //    var p = f.Product;
        //    if (iss) {
        //        if (p.Revage == null)
        //            p.Revage = f;
        //        else {
        //            var t = p.Revage;
        //            var r = t.NextRevage;
        //            while ((r = t.NextRevage) != null)
        //                t = r;
        //            t.NextRevage = f;
        //        }
        //        GData.__data.Prices.Add(f);
        //    } else {
        //        thread.Dispatcher.call(this, this.edit, f);
        //    }
            
        //});
    }
    selectavatar() {
    }
    private serv = new ProductService();
    GetLeftBar() { return this.serv.GetLeftBar(this); }
    GetRightBar() { return this.serv.GetRightBar(this); }
}

class ProductService {
    private target: ProductsNav;
    public picture: UI.Glyph;
    public add2stock: UI.Glyph;
    
    private _edit: UI.Glyph;
    private _new: UI.Glyph;
    private _delete: UI.Glyph;
    handleSerices(s, e, p: { t: ProductService, c: UI.Glyphs }) {
        var t = p.t.target;
        if (!t) return;
        var c = UI.Glyphs;
        switch (p.c) {
            case c.edit:
                t.btnEditClick();
                break;
            case c.plusSign:
                t.btnAddClick();
                break;
            case c.fire:
                t.btnRemoveClick();
                break;
            case c.flash:
                t.addRevage();
                break;
            //case c.erase:
            //    t.corrigerRvage();
            //    break;
            case c.picture:
                t.selectavatar();
                break;
        }
    }

    GetLeftBar(target: ProductsNav) {
        this.target = target;
        if (!this.lb) {
            var r = this.lb = new UI.Navbar<any>();
            funcs.setTepmlate(r, this, this.handleSerices);
            r.OnInitialized = r => {

                this._edit = new UI.Glyph(UI.Glyphs.edit, false, 'Edit');
                this._new = new UI.Glyph(UI.Glyphs.plusSign, false, 'New');
                this._delete = new UI.Glyph(UI.Glyphs.fire, false, 'Delete');

                r.AddRange([this._new, this._edit, this._delete, funcs.createSparator(),
                    

                ]);
            };
        }
        return this.lb;
    }
    GetRightBar(target: ProductsNav) {
        this.target = target;
        if (!this.rb) {
            var r = this.rb = new UI.Navbar<any>();
            funcs.setTepmlate(r,this,this.handleSerices);
            r.OnInitialized = r => {
                r.AddRange([
                    //this.swapStock = new UI.Glyph(UI.Glyphs.erase, false, 'Corriger le Stock'),
                    this.add2stock = new UI.Glyph(UI.Glyphs.flash, false, 'Add 2 Stock'),
                    funcs.createSparator(),
                    this.picture = new UI.Glyph(UI.Glyphs.picture, false, 'Select Avatar')
                ]);
            }
        }
        return this.rb;
    }

    private lb: UI.Navbar<any>;
    private rb: UI.Navbar<any>;
}