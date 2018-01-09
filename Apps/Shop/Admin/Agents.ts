import {UI, conv2template} from '../../../js/UI';
import { models} from "../../../js/Models";
import {GetVars} from '../Common';
import { basic, collection, utils} from '../../../js/corelib';
import { basics } from '../Basics';
import { filters } from '../../../js/Filters';
import { SearchData } from '../Search';
var GData: basics.vars;
GetVars((v) => {
    GData = v;
    return false;
});


export class Agents extends UI.NavPanel {
    private adapter: UI.ListAdapter<models.Agent, any>;
    public get HasSearch(): UI.SearchActionMode { return UI.SearchActionMode.NoSearch; }
    public set HasSearch(v: UI.SearchActionMode) { }


    Update() {
        GData.apis.Agent.SmartUpdate();
    }
    protected OnKeyDown(e: KeyboardEvent) {
        if (!this.adapter.OnKeyDown(e)) {
            if (e.keyCode === UI.Keys.F1)
                this.getHelp({
                    "Enter": "Edit",
                    "Suppr": "Delete",
                    "F2": "Add New",
                });
            else if (e.keyCode === UI.Keys.F2)
                GData.apis.Agent.CreateNew();
            else if (this.adapter.SelectedIndex != -1)
                if (e.keyCode === 13)
                    GData.apis.Agent.Edit(true, this.adapter.SelectedItem, false);
                else if (e.keyCode === UI.Keys.Delete)
                    GData.apis.Agent.Delete(true, this.adapter.SelectedItem);
                else
                    return super.OnKeyDown(e);
            else return super.OnKeyDown(e);
        }
        e.stopPropagation();
        e.preventDefault();
        return true;
    }
    constructor() {
        super('agents_info', "Agents");
        this.Title = "Agents";
    }
    initialize() {
        super.initialize();
        this.adapter = new UI.ListAdapter<models.Agent, any>('Agents.table');
        this.adapter.AcceptNullValue = false;
        this.Add(this.adapter);
        this.adapter.OnInitialized = (p) => p.Source = GData.__data.Agents;// this.searchList = GVars.__data.Agents.Filtred(this.searchFilter as any);
    }
    
    GetLeftBar() {
        if (!this.lb) {
            let l = new UI.Navbar<any>();
            let add = new UI.Glyph(UI.Glyphs.plusSign, false, 'Add');
            let edit = new UI.Glyph(UI.Glyphs.edit, false, 'Edit');
            let remove = new UI.Glyph(UI.Glyphs.fire, false, 'Remove');
            let oldget = l.getTemplate;
            l.getTemplate = (c: UI.JControl) => {
                var e = oldget(new UI.Anchore(c));
                if (c.Enable === false)
                    e.Enable = false;
                else
                    e.addEventListener('click', this.handleSerices, { t: this, c: (c as UI.Glyph).Type as UI.Glyphs });
                return e;
            }
            l.OnInitialized = l => l.AddRange([add, edit, remove]);
            this.lb = l;
        }
        return this.lb;
    }
    handleSerices(s, e, p: { t: Agents, c: UI.Glyphs }) {
        var c = UI.Glyphs;
        switch (p.c) {
            case c.plusSign:
                return GData.apis.Agent.CreateNew();
            case c.edit:
                return GData.apis.Agent.Edit(true, p.t.adapter.SelectedItem, false);
            case c.fire:
                return GData.apis.Agent.Delete(true, p.t.adapter.SelectedItem);
        }
    }


    private lb: UI.Navbar<any>;
}