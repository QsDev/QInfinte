import { UI, conv2template } from '../../js/UI';
import { mvc, utils, basic, Api, thread, encoding, net, bind, collection } from '../../js/Corelib';
import { context } from './context';
import { models } from "../../js/Models";
import { sdata, Controller } from '../../js/System';
import { filters } from '../../js/Filters';
import { init } from '../../js/Encoding';
import { Load } from '../../js/services';
import Client1 = require("../../js/Client");
import { basics } from './Basics';
import { ShopApis } from './Apis/ShopApis';
declare var stop: () => void;
declare var s;
declare var clone: (a) => any;
declare var $;
declare var require: (modules: string, onsuccss?: (result: any) => void, onerror?: (result: any) => void, context?: any) => void;
var abonEnum = basic.getEnum('models.Abonment');
var GData: basics.vars = {
    __data: new models.QData(),
    modify: bind.NamedScop.Create("modify", false, 3),
    user: (() => { var t = new models.Login(); t.Client = new models.Client(basic.New()); return t; })(),
    requester: Controller.ProxyData.Default,
    invalidateFactures: new collection.List<any>(models.Facture),
    invalidateLogins: new collection.List<any>(models.Login),
    validateLogins: new collection.List<any>(models.Login),
    mails: new collection.List<any>(models.Mail),
    spin: UI.Spinner.Default,
    apis: new ShopApis(),
};
GData.apis.Init(GData);
var userAbonment = bind.NamedScop.Create('UserAbonment', models.Abonment.Detaillant, bind.BindingMode.TwoWay);
var cgv;

export function GetVars(call: (vars: basics.vars) => boolean): void {
    if (cgv) return;
    cgv = call( GData);
}

export function InitModule() {
    UI.Desktop.Current.OnInitialized = (d) => GData.spin.Parent = d;
    init();
    Load();
    initialize();
}


function initialize() {

    (window as any).data = GData.__data;
    thread.Dispatcher.call(GData.__data, GData.__data.OnPropertyChanged, models.QData.DPSelectedFacture, function (s, e) {
        if (e._new)
            this.Value = !(e._new as models.Facture).IsValidated;
        else this.Value = false;
    }, GData.modify);

    bind.NamedScop.Create('qdata', GData.__data);
    bind.NamedScop.Create('User', GData.user, 0);

    internal.initializeOprs();
    var LabelJob = bind.Register(new bind.Job("showIfModifiable",
        (ji, e) => {

            var t: sdata.DataRow = ji.Scop.Value;
            var dm = ji.dom;
            dm.parentElement.style.display = (t ? t.IsFrozen() : false) ? 'none' : '';
        }, null, null,
        (ji, e) => {
            var dm = ji.dom;
            var t: sdata.DataRow = ji.Scop.Value;
            dm.parentElement.style.display = (t ? t.IsFrozen() : false) ? 'none' : '';
        },
        (ji, e) => {
        }));

    var LabelJob = bind.Register(new bind.Job("ilabel",
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            (dm as HTMLElement).innerText = ji.Scop.Value || 'Personal';
        }, null, null,
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.innerText = ji.Scop.Value || 'Personal';
        },
        (ji, e) => {
        }));

    var LabelJob = bind.Register(new bind.Job("dosave", null, null, null,
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.click = () => {
                var v = ji.Scop.Value as sdata.DataRow;
                if (v instanceof sdata.DataRow)
                    UI.Modal.ShowDialog('Confirm', 'Are you sure save data ?', (xx) => { if (xx.Result === UI.MessageResult.ok) v.Upload(); }, 'Yes', 'No');
            }
        }, null));
    var LabelJob = bind.Register(new bind.Job("dodiscart",
        null, null, null,
        (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.click = () => {
                var v = ji.Scop.Value as sdata.DataRow;
                if (v instanceof sdata.DataRow)
                    UI.Modal.ShowDialog('Confirm', 'Are you sure discart data ?', (xx) => { if (xx.Result === UI.MessageResult.ok) v.Update(); }, 'Yes', 'No');
            }
        }, null));


    bind.Register({
        Name: 'openfournisseur', OnInitialize(ji, e) {
            ji.addEventListener('ondblclick', 'dblclick', () => GData.apis.Fournisseur.Edit(true, ji.Scop.Value, false));
        }
    });
    bind.Register({
        Name: 'opencostumer', OnInitialize(ji, e) {
            ji.addEventListener('ondblclick', 'dblclick', () => {
                GData.apis.Client.Edit(true, ji.Scop.Value, false);
            });
        }
    });
}


export namespace funcs {
    export interface ITParam<T> {
        t: T;
        c: UI.Glyphs;
    }
    export function setTepmlate<T>(lb: UI.Navbar<any>, owner: T, handleService: (s, e, p: ITParam<T>) => void) {
        var oldget = lb.getTemplate;
        lb.getTemplate = (c: UI.JControl) => {
            var e = oldget(new UI.Anchore(c));
            if (e.Enable === false)
                e.Enable = false;
            else e.addEventListener('click', handleService, { t: owner, c: (c as UI.Glyph).Type as UI.Glyphs });
            return e;
        }
    }
    export function createSparator() {
        var separ0 = new UI.Glyph(UI.Glyphs.none, false);
        separ0.Enable = false;
        return separ0;
    }

    
    
    var _priceModal;
    export function priceModal(): UI.Modals.ModalEditer<any> {
        return _priceModal || (_priceModal = new UI.Modals.ModalEditer<any>('Price.edit'));
    }


    var _pricesModal: UI.Modals.ModalList<models.FakePrice>;
    export function pricesModal(): UI.Modals.ModalList<models.FakePrice> {
        return _pricesModal || (_pricesModal = new UI.Modals.ModalList(<models.FakePrices>undefined, 'Price.info', 'Price.price'));
    }
}
namespace internal {
    function getPrd(p) {
        return p instanceof models.Article ? p.Product : p;
    }  
    function newArticle(prd: models.Product, count?: number) {
        var art = new models.Article(basic.New());
        art.Product = prd;
        if (count)
            art.Count = count;
        art.Price = prd.IGetValue(GData.__data.SelectedFacture.Abonment || GData.user.Client.Abonment || models.Abonment.Detaillant);
        art.Owner = GData.__data.SelectedFacture;
        GData.__data.SelectedFacture.Articles.Add(art);
        GData.__data.Articles.Add(art);
        return art;
    }
    function removeArticle(prd: models.Product, art?: models.Article) {
        var art = art || prd.CurrentArticle;
        if (!art) return;
        var sf = GData.__data.SelectedFacture;
        sf.Articles.Remove(art);
        GData.__data.Articles.Remove(art);
        prd.CurrentArticle = null;
    }
    function setValue(prd: models.Product, val?: number, def?: number) {
        if (!GData.__data.QteLimited) return setValueUnlimited(prd, val, def);
        var art = prd.CurrentArticle;
        val = val != null ? val : ((art && art.Count || 0) + def);
        var tq = prd.Qte;
        if (art)
            tq += art.OCount;
        else
            if (val <= 0) return;
            else art = newArticle(prd);
        if (val <= 0)
            removeArticle(prd, art);
        else if (val <= tq)
            art.Count = val;
        else {
            art.Count = tq;
        }
    }
    function setValueUnlimited(prd: models.Product, val?: number, def?: number) {
        var art = prd.CurrentArticle;
        val = val != undefined ? val : ((art && art.Count || 0) + def);
        if (val == 0) return art && removeArticle(prd, art);
        if (!art) art = newArticle(prd, val);
        else art.Count = val;
    }
    var types: enumsMap = {};
    interface enumMap {
        type;
        list: collection.List<string>;
    }
    interface enumsMap {
        [s: string]: enumMap;
    }
    function getEnumList(tname): enumMap {
        var lst = types[tname];
        if (lst) return lst;
        var type = tname && context.GetEnum(tname);
        if (type == undefined) throw 'type not found';
        var _lst = [];
        for (var i in type) {
            if (isNaN(parseFloat(i)))
                _lst.push(i);
        }
        lst = { list: new collection.List(String, _lst), type: type };
        lst.list.Freeze();
        Object.freeze(lst);
        Object.freeze(lst.list);
        Object.defineProperty(types, tname, { value: lst, writable: false, enumerable: false, configurable: false });
        return lst;
    }
    interface enumInfo {
        rIsNumber: boolean;
        map: enumMap;
        dom?: UI.ComboBox;
    }

    function swip(v, x) {
        return GData.__data.QteLimited ? v >= 0 && v <= x ? v : (v < 0 ? 0 : x) : v;
    }
    class ProdOpr implements basic.IJob {
        private modadd: UI.Modal;
        private selectedJobInstance: bind.JobInstance;
        private t: UI.NumericUpDown;
        constructor(public Name: string) {
            switch (Name) {
                case 'prod-add':
                    var t: UI.NumericUpDown;
                    this.modadd = new UI.Modal();
                    this.modadd.OnInitialized = (m) =>
                        m.Add(this.t = new UI.NumericUpDown());
                    this.modadd.OnClosed.On = (e) => this.addr(e.Modal, e.msg);
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
        Todo(ji, e) { }
        Check(ji, e) { }
        OnError(ji, e) { }
        OnInitialize(ji: bind.JobInstance, e) {
            ji.dom.addEventListener('click', (e) => this.oper(ji));
        }
        oper: (ji: bind.JobInstance) => void;
        OnScopDisposing(ji, e) { }

        addr(e: UI.Modal, r: string) {
            if (r == 'ok')
                setValue(getPrd(this.selectedJobInstance.Scop.Value), this.t.Value);
        }

        add(ji: bind.JobInstance) {
            var t = GData.__data.SelectedFacture;
            if (t == null) return UI.InfoArea.push('<p><h1>Select</h1> a facture</p>');
            this.selectedJobInstance = ji;
            this.modadd.Open();
            this.modadd.OnInitialized = (m) => {
                this.t.Focus();
                this.t.SelectAll();
            }
        }

        plus(ji: bind.JobInstance) {
            return setValue(<models.Product>ji.Scop.Value, undefined, +1);
        }
        minus(ji: bind.JobInstance) {
            return setValue(<models.Product>ji.Scop.Value, undefined, -1);
        }
        remove(ji: bind.JobInstance) {
            var prod = <models.Product>ji.Scop.Value;
            var art = prod.CurrentArticle;
            if (art != null)
                UI.Modal.ShowDialog('Confirmation', "Do you want realy  to delete this Article", (xx) => {
                    if (xx.Result === UI.MessageResult.ok)
                        removeArticle(prod, art);
                });
        }
    }
    class ArtOpr implements basic.IJob {

        private modadd: UI.Modal;
        private selectedScop: bind.JobInstance;
        private t: UI.NumericUpDown;
        constructor(public Name: string) {
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
                    this.modadd = new UI.Modal();
                    this.modadd.OnInitialized = (m) =>
                        m.Add(this.t = new UI.NumericUpDown());
                    this.modadd.OnClosed.On = (e) => this.addr(e.Modal, e.msg);
                    this.oper = this.add;
                    return;
            }
            throw '';
        }
        Todo(ji, e) { }
        Check(ji, e) { }
        OnError(ji, e) { }
        OnInitialize(ji: bind.JobInstance, e) {
            var dm = ji.dom;
            dm.addEventListener('click', (e) => { this.oper(ji); });
        }
        oper: (ji: bind.JobInstance) => void;
        OnScopDisposing(ji, e) { }


        addr(e: UI.Modal, r: string) {
            if (r == 'ok')
                setValue(getPrd(<models.Article>this.selectedScop.Scop.Value), this.t.Value);

        }


        add(ji: bind.JobInstance) {
            var t = GData.__data.SelectedFacture;
            if (t == null) return UI.InfoArea.push('<p><h1>Select</h1> a facture</p>');
            this.selectedScop = ji;
            this.modadd.Open();
            this.t.Focus();
            this.t.SelectAll();
        }

        plus(ji: bind.JobInstance) {
            setValue(getPrd(ji.Scop.Value), undefined, +1);
        }
        minus(ji: bind.JobInstance) {
            setValue(getPrd(ji.Scop.Value), undefined, -1);
        }
        remove(ji: bind.JobInstance) {
            var art = <models.Article>ji.Scop.Value;
            if (art != null)
                UI.Modal.ShowDialog('Confirmation', "Do you want realy  to delete this Article", (xx) => {
                    if (xx.Result === UI.MessageResult.ok)
                        removeArticle(art.Product, art);
                });
        }
    }
    export function initializeOprs() {
        bind.Register(new ProdOpr('prod-add'));
        bind.Register(new ProdOpr('prod-plus'));
        bind.Register(new ProdOpr('prod-remove'));
        bind.Register(new ProdOpr('prod-minus'));

        bind.Register(new ArtOpr('art-add'));
        bind.Register(new ArtOpr('art-plus'));
        bind.Register(new ArtOpr('art-remove'));
        bind.Register(new ArtOpr('art-minus'));

        bind.Register(new bind.Job('calctotal', null, null, null, (ji, e) => {

            var dm = ji.dom as HTMLElement;
            dm.onclick = (e) => {
                var v = ji.Scop.Value as models.Facture;
                if (v)
                    v.CalcTotal();
            };
            var v = ji.Scop.Value as models.Facture;
            if (v)
                v.CalcTotal();

        }, null));

        bind.Register(new bind.Job('calcsold', null, null, null, (ji, e) => {
            var dm = ji.dom as HTMLElement;
            dm.onclick = (e) => {
                var v = ji.Scop.Value;
                if (v)
                    (ji.dom as HTMLElement).nextElementSibling.textContent = v.CalcTotal() || '0.00';
            };
            var v = ji.Scop.Value;
            if (v)
                (ji.dom as HTMLElement).nextElementSibling.textContent = v.CalcTotal() || '0.00';

        }, null));
    }

    function removeUser(p: models.Login) {
        UI.Modal.ShowDialog("Confirmation", "Are you Sure To <b>Delete</b> This Client", (xx) => {
            if (xx.Result === UI.MessageResult.ok)
                GData.requester.Post(models.Login, p, null, (s, r, iss) => {
                    if (iss) {
                        GData.invalidateLogins.Remove(p);
                        if (GData.validateLogins.IndexOf(p) == -1)
                            GData.validateLogins.Remove(p);
                        UI.InfoArea.push('The Client Successffuly <h2>Removed</h2>', true, 3000);
                    } else {
                        UI.InfoArea.push("A <h2 style='color:red'>Error</h2> Occured When Removing A Client", false);
                    }
                }, (e, t) => {
                    e.Url = '/_/Login?remove';
                });
        }, "DELETE", "Cancel")
    }
    function validateUser(p: models.Login) {
        GData.requester.Post(models.Login, p, null, (s, r, iss) => {
            if (iss) {
                GData.invalidateLogins.Remove(p);
                if (GData.validateLogins.IndexOf(p) == -1)
                    GData.validateLogins.Add(p);
                UI.InfoArea.push('The Client Successffuly <h2>Validated</h2>', true, 3000);
            } else {
                UI.InfoArea.push("A Error Occured When Validating A Client", false);
            }
        }, (e, t) => {
            e.Url = '/_/Login?Validate';
        });
    }
    function lockUser(p: models.Login) {
        if (p instanceof models.Login == false) throw 'invalid param';
        GData.requester.Post(models.Login, p, null, (s, r, iss) => {
            if (iss) {
                GData.validateLogins.Remove(p);
                GData.invalidateLogins.Add(p);
                UI.InfoArea.push('The Client Successffuly <h2>Locke</h2>', true, 3000);
            } else {
                UI.InfoArea.push("A <h2 style='color:red'>Error</h2> Occured When Locking A Client", false);
            }
        }, (e, t) => {
            e.Url = '/_/Login?lock';
        });
    }

    Api.RegisterApiCallback({
        Name: 'validateuser',
        DoApiCallback(c, n, p) { validateUser(p.data); }
    });
    bind.Register({
        Name: 'validateuser',
        OnInitialize: (j, e) => {
            j.addEventListener('onclick', 'click', (e) => validateUser(j.Scop.Value));
        }
    });
    (function () {
        var obsModal: UI.Modal;
        
        class obsObject extends bind.DObject {

            public static DPObservation: bind.DProperty<string, obsObject>;
            public Observation: string;
            static ctor() {
                obsObject.DPObservation = bind.DObject.CreateField<string, obsObject>('Observation', String, null);
            }
            static __fields__() { return [this.DPObservation]; }
        }
        var obsValue = new obsObject();
        var Scop = new bind.ValueScop(obsValue, bind.BindingMode.TwoWay);
        Api.RegisterApiCallback({
            Name: "OpenObservation", DoApiCallback: (c, n, p) => {
                if (!obsModal) {
                    obsModal = new UI.Modal(); obsModal.OnInitialized = n => {
                        n.setStyle("minWidth", "50%").setStyle('minHeight', "50%");
                        obsModal.Add(new UI.TControl("templates.Observation", Scop));
                    }
                }
                obsValue.Observation = p.data;
                obsModal.Open();
                obsModal.OnClosed.Add((e) => {
                    try {
                        e.Modal.OnClosed.Remove('');
                        if (e.Result === UI.MessageResult.ok)
                            p.callback(p, obsValue.Observation);
                    } catch (e) {

                    }
                }, '');
            }
        });
    })();

    (function () {
        var obsModal: UI.Modal;
        var Scop: bind.ValueScop;
        var t: UI.TControl<any>;
        Api.RegisterApiCallback({
            Name: "OpenFactureInfo", DoApiCallback: (c, n, p) => {
                if (!obsModal) {
                    obsModal = new UI.Modal();
                    Scop = new bind.ValueScop(null, bind.BindingMode.TwoWay);
                    t = new UI.TControl("templates.factureInfo", Scop);
                    obsModal.OnInitialized = n => {
                        n.setStyle("minWidth", "50%").setStyle('minHeight', "50%");                        
                        obsModal.Add(t);
                    }
                }
                obsModal.OnInitialized = n =>
                    t.Data = p.data;
                obsModal.Open();
                obsModal.OnClosed.Add((e) => {
                    try {
                        e.Modal.OnClosed.Remove('');
                        if (e.Result === UI.MessageResult.ok)
                            p.callback(p, Scop.Value);
                    } catch (e) {

                    }
                }, '');
            }
        });
    })();

    Api.RegisterApiCallback({
        Name: 'removeuser', DoApiCallback(c, n, p) {            
            removeUser(p.data);
        }
    });


    bind.Register({
        Name: 'removeuser', OnInitialize: (j, e) => {
            j.addEventListener('onclick', 'click', (e) => removeUser(j.Scop.Value));
        }
    });

    Api.RegisterApiCallback({
        Name: 'lockuser', DoApiCallback(a, v, p) {
            lockUser(p.data);
        }
    });

    bind.Register({
        Name: 'lockuser', OnInitialize: (j, e) => { j.addEventListener('onclick', 'click', (e) => lockUser(j.Scop.Value)); }
    });

    bind.Register({
        Name: 'openclient', OnInitialize: (j, p) => {
            j.addEventListener('click', 'click', {
                Owner: j,
                handleEvent(e) {
                    GData.apis.Client.Edit(true, (this.Owner as bind.JobInstance).Scop.Value as models.Client, false);
                    //Client.Edit((this.Owner as bind.JobInstance).Scop.Value as models.Client, false);
                }
            });
        }
    });
    bind.Register({
        Name: 'selectclient', OnInitialize: (j, e) => {
            j.addEventListener('click', 'click', {
                Owner: j,
                handleEvent(e) {
                    var t = j.Scop.Value as models.Client;
                    GData.apis.Client.Select((modal, i, err) => {
                        {}
                        if (err === UI.MessageResult.ok)
                            j.Scop.Value = i;
                            //t.Login.Client = i;
                    }, t);
                }
            });
        }
    });
    bind.Register({
        Name: 'openproduct', OnInitialize: (j, e) => {
            j.addEventListener('dblclick', 'dblclick', {
                Owner: j,
                handleEvent(e) {                    
                    var t = (this.Owner as bind.JobInstance).Scop.Value as models.Product;
                    GData.apis.Product.Edit(true, t, false);
                }
            });
        }
    });
    bind.Register({
        Name: 'opencategory', OnInitialize(j, e) {
            j.addEventListener('dblclick', 'dblclick', {
                handleEvent(e) {
                    var t = (this.self as bind.JobInstance).Scop.Value as models.Category;
                    GData.apis.Category.Edit(true, t, false);
                }, self: j
            });
        }
    });
    bind.Register({
        Name: 'enum',
        OnInitialize(ji, e) {
            var d = ji.dom as HTMLElement;
            var tname = d.getAttribute('type');
            var ReurnIsNumber = d.getAttribute('rtype') || 'string';
            var map = getEnumList(tname);
            var k = new UI.ComboBox(ji.dom as HTMLSelectElement, map.list);

            var info: enumInfo = { map: map, rIsNumber: ReurnIsNumber === 'number', dom: k };
            ji.addValue('info', info);

            k.addEventListener('change', (s, e: any, k: UI.ComboBox) => {
                stop();//check e type
                var x = k.Content.getChild(e.target.selectedIndex) as UI.TemplateShadow;
                if (x) {
                    var c = x.getDataContext() as string || map.type[0];
                    if (info.rIsNumber)
                        ji.Scop.Value = typeof map.type[c] === 'number' ? map.type[c] : null;
                    else ji.Scop.Value = c;
                }
            }, k);
        },
        Todo(j, e) {

            var info = j.getValue('info') as enumInfo;
            (info.dom.View as HTMLSelectElement).selectedIndex = info.dom.Source.IndexOf(info.rIsNumber ? info.map.type[j.Scop.Value] : j.Scop.Value);
        }

    });
    bind.Register({
        Name: 'enum2string',
        OnInitialize(ji, e) {
            var dm = ji.dom as HTMLElement;
            ji.addValue('info', <enumInfo>{ map: getEnumList(dm.getAttribute('type')), rIsNumber: dm.getAttribute('rtype') === 'number' });
            this.Todo(ji, e);
        },
        Todo(ji, e) {
            var info = ji.getValue('info') as enumInfo;
            var vl = ji.Scop.Value;
            var dm = ji.dom;
            dm.textContent = info.rIsNumber ? (info.map.type[vl || 0] || (vl || 0).toString()) : vl || info.map.type[0];
        }
    });
    bind.Register({
        Name: 'selectcategory',
        OnInitialize: (j, e) => {
            if (!(j.dom instanceof HTMLSelectElement))
                throw "Dom must be Select";
            var k = new UI.ComboBox(j.dom as HTMLSelectElement, GData.__data.Categories);
            k.addEventListener('change', (s, e: any, k: UI.ComboBox) => {
                var x = k.Content.getChild(e.target.selectedIndex) as UI.TemplateShadow;
                if (x) {
                    var c = x.getDataContext() as models.Category;
                    if (c) {
                        j.Scop.Value = c;
                    }
                }
            }, k);
        }
    });

}
export namespace extern {
    export function crb(icon, title, type, attr?) {
        var t = document.createElement('button');
        t.classList.add('btn', 'btn-' + type, 'glyphicon', 'glyphicon-' + icon);
        t.textContent = '  ' + title;
        if (attr)
            for (var i in attr)
                t.setAttribute(i, attr[i]);
        return t;
    }
}

export abstract class Facture<I, D extends models.FactureBase> extends UI.NavPanel implements basic.IJob {
    Name: string;
    Todo?(job?: bind.JobInstance, e?: bind.EventArgs<any, any>): void {        
        var c = !this.Data.IsOpen;
        this.btn_add.disabled = c;
        this.btn_save.disabled = c;
        this.btn_remove.disabled = c;
        ////(this.abonment.Box.View as HTMLInputElement).disabled = c;
        this.disableAlll(this.View, c);
        this.btn_OpenClose.textContent = c ? "  Open" : "  Close";

    }
    private disableAlll(dom: HTMLElement, v: boolean) {
        var e = $('input', dom) as HTMLInputElement[];
        for (var i = 0; i < e.length; i++)
            e[i].disabled = v;
    }
    OnInitialize(job: bind.JobInstance, e: bind.EventArgs<any, any>): void {
        this.Todo(job, e);
    }
    public Dispose() {

    }
    private btn_OpenClose = extern.crb('pencil', 'Open', 'default', { 'db-bind': 'IsOpen', 'db-job': 'factureIsOpen' });
    private btn_add = extern.crb('plus', 'Add', 'primary');
    private btn_save = extern.crb('save', ' Save ', 'success');
    private btn_remove = extern.crb('trash', 'Remove', 'danger');

    private group_cnt: UI.Div = new UI.Div().applyStyle('pull-right', 'flat');
    private group_tcnt = new UI.Div().applyStyle('icontent-header');
    private _caption = document.createTextNode("Facture D'Achat");
    protected abonment: UI.ProxyAutoCompleteBox<basic.EnumValue> = new UI.ProxyAutoCompleteBox(new UI.Input(document.createElement('input')), basic.getEnum('models.Abonment'));
    protected adapter: UI.ListAdapter<I, D>;
    private pb: bind.PropBinding;

    public set Data(v: D) {
        if (this.adapter)
            this.adapter.Data = v;
        else this._data = v;
    }
    public get Data() { return this.adapter.Data; }
    private scp;
    protected abstract LoadArticles();
    public Open(x: D) {        
        this.OnInitialized = (me) => {
            var lx = me.Data;
            me.Data = x;
            me.LoadArticles();
            if (me.scp) return;
            var scp = me.adapter.getScop();

            var _scop = bind.Scop.Create('IsOpen', scp, bind.BindingMode.TwoWay);
            _scop.AddJob(me, me.View);
            me.scp = scp;
            me.adapter.OnItemInserted.On = (x, f, c, s) => {
                me.disableAlll(s.View, !x.Data.IsOpen);
            }
            ////this.abonment.Box.Disable(true);
            ////this.abonment.View.style.visibility = 'collapse';
        }
    }

     

    public OpenInfo() {
        Api.RiseApi('OpenFactureInfo', {
            callback: (p, da) => {
                if (this.Data.IsOpen)
                    return;
                else if (this.Data.Observation != da) {
                    UI.InfoArea.push("The Observation Cannot be changed while the facture is not opened");
                }
            },
            data: this.Data,
        });
    }
    private focuser: basic.focuser;
    public getHelp() {
        var t = {
            "F2": "Add New",
            "F3": "Deep Searche",
            "F4": "Open Info",
            "F5": "Update",
            "F7": "Open | Close ",
            "F8": "Save Facture",
            "F9": "Regler Facture",
        };
        var l = ["primary", "success", "danger", "info", "warning"]; var k = 0;
        var s = "";
        for (var i in t) {
            s += '<div class="input-group" style="background:gray"> <span class="input-group-btn"> <label class="btn btn-' + l[(k++) % l.length] + '">' + i + '</label> </span> <label class="form-control" >' + t[i] + '</label> </div>';                
        }
        UI.InfoArea.push(s, true, 10000);
    }
    protected OnKeyDown(e: KeyboardEvent) {
        if (!this.adapter.OnKeyDown(e)) {
            switch (e.keyCode) {
                case UI.Keys.F1:
                    this.getHelp();
                    break;
                case 13:
                    this.focuser.focuseNext(true);
                    break;
                case UI.Keys.F2:
                    if (this.Data.IsOpen)
                        this.AddNewArticle();
                    break;
                case UI.Keys.F3:
                    this.OnDeepSearch();
                    break;
                case UI.Keys.F4:
                    this.OpenInfo();
                    break;
                case UI.Keys.F5:
                    this.Update();
                    break;
                case UI.Keys.F6:
                    break;
                case UI.Keys.F7:
                    this.OpenCloseFacture();                    
                    break;
                case UI.Keys.F8:
                    if (this.Data.IsOpen)
                        this.SaveFacture();
                    break;
                case UI.Keys.F9:
                    this.ReglerFacture();
                    break;
                case UI.Keys.F10:
                    this.OpenVersments(false);
                    break;
                default:
                    return super.OnKeyDown(e);
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }
    constructor(name: string, caption: string, private template: conv2template, private _data: D) {
        super(name, caption);
    }
    static ctor() {
        bind.Register({
            Name: 'factureIsOpen',
            OnInitialize(ji, e) {
                {}
                this.Todo(ji, e);
            },
            Todo(ji, e) {
                {}
                var d = ji.dom as HTMLButtonElement;
                if (ji.Scop.Value)
                    d.value = "Close";
                else d.value = "Open";
            }
        });
    }

    initialize() {
        super.initialize();
        this._view.style.minWidth = '750px';
        this.adapter = new UI.ListAdapter<I, D>(this.template, undefined, this._data, true);
        this.adapter.AcceptNullValue = false;
        var div = this.group_cnt.View;
        div.appendChild(this.btn_add); div.appendChild(this.btn_remove); div.appendChild(this.btn_save);
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
        
        this.btn_add.addEventListener('click', <any>{ handleEvent(e) { if (this.self.IsOpen) (this.self as Facture<any, any>).AddNewArticle(); }, self: this });
        this.btn_save.addEventListener('click', <any>{ handleEvent(e) { if (this.self.IsOpen) (this.self as Facture<any, any>).SaveFacture(); }, self: this });
        this.btn_remove.addEventListener('click', <any>{ handleEvent(e) { if (this.self.IsOpen) (this.self as Facture<any, any>).DeleteArticle(); }, self: this });
        var isc = false;
        var so = { Title: "Save Only" } as UI.IContextMenuItem;
        var vld = { Title: "Validate" } as UI.IContextMenuItem;

        var m = new UI.ExContextMenu([so, vld]);
        //m.Target = this.btn_OpenClose;
        m.OnAction.On = (sndr, slct) => {
            var data = this.adapter.Data;
            if (slct === so) {
                GData.apis.Facture.EOpenFacture(data, false);
            } else {
                GData.apis.Facture.EOpenFacture(data, true);
            }
        }
        m.location = UI.Location.Right | UI.Location.Top;
        this.btn_OpenClose.addEventListener('click', () => {
            var data = this.adapter.Data;
            var v = this.btn_OpenClose;
            if (data.IsOpen && data.IsValidated !== true)
                m.Show(v.offsetLeft + v.clientWidth, v.offsetTop + v.clientHeight + 7);
            else
                GData.apis.Facture.EOpenFacture(data);
        });
        this.adapter.OnItemSelected.On = (n) => {
            var t = n.SelectedChild; if (t && t.View) basic.focuseOn(t.View);
        }
        this.focuser = new basic.focuser(this.adapter.View,true);
    }
    
    private get IsOpen(): boolean { var d = this.Data; if (d) return d.IsOpen; return false; }
    protected abstract OnAbonmentChanged(b: UI.IAutoCompleteBox, o: basic.EnumValue, n: basic.EnumValue);
    protected abstract AddNewArticle();
    protected abstract DeleteArticle();
    protected abstract SaveFacture();
    protected abstract ReglerFacture();
    protected abstract OpenVersments(forDelete: boolean);

    protected OpenCloseFacture() {
        var data = this.adapter.Data;
        GData.apis.Facture.EOpenFacture(data);
    }
}
