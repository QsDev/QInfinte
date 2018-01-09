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
define(["require", "exports", "../../js/Corelib", "../../js/System", "../../js/Models", "./Common", "./../../js/models", "./../../js/UI", "../../js/Jobs", "./Basics"], function (require, exports, Corelib_1, System_1, Models_1, Common_1, models_1, UI_1, Jobs_1, Basics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    window.__data = GData.__data;
    var b = true;
    var lc = [10, 10, 10, 10, 7.5, 6, 5.1, 4.4, 3.9, 3.4, 3.1, 2.8, 2.6, 2.6, 2.4, 2.3];
    window['lc'] = lc;
    var Binds;
    (function (Binds) {
        Corelib_1.bind.Register({
            Name: 'trade',
            OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var v = j.Scop.Value;
                var d = j.dom;
                if (v != null) {
                    var hasDot = v % 1 !== 0;
                    var s = v.toString();
                    if (s.length > 10)
                        s = s.slice(0, 10);
                }
                else
                    s = "";
                d.style.fontSize = lc[s.length] + 'em';
                d.textContent = s;
            }
        });
        Corelib_1.bind.Register({
            Name: 'openprice', OnInitialize: function (j, e) {
                j.addEventListener('click', 'click', function (e) {
                    var prd = j.Scop.Value;
                    if (!prd)
                        return;
                    var p = prd && prd.Revage;
                    var isNew = false;
                    if (!p) {
                        p = new Models_1.models.FakePrice(Corelib_1.basic.New());
                        p.Product = prd;
                        prd.Revage = p;
                        isNew = true;
                    }
                    else {
                        //p = imodels.FakePrice.getById(p.Id);
                        //if (t && t.Product !== prd) { UI.InfoArea.push("An Internal Error x5674"); return; }
                    }
                    if (!p) {
                        isNew = true;
                        UI_1.UI.Spinner.Default.Start("Wait");
                        p = new Models_1.models.FakePrice(p.Id);
                        p.Product = prd;
                        GData.requester.Get(Models_1.models.FakePrice, p, null, function (s, r, iss) {
                            if (iss)
                                Common_1.funcs.priceModal().edit(s.data, isNew, {
                                    OnSuccess: { Invoke: OnSuccessCategory, Owner: prd },
                                    OnError: { Invoke: OnErrorCategory, Owner: prd }
                                });
                            else
                                UI_1.UI.InfoArea.push("Fatal ERROR Occured !!!! ");
                            UI_1.UI.Spinner.Default.Pause();
                        });
                    }
                    else
                        Common_1.funcs.priceModal().edit(p, isNew, {
                            OnSuccess: { Invoke: OnSuccessCategory, Owner: p },
                            OnError: { Invoke: OnErrorCategory, Owner: p }
                        });
                    if (prd.Revage == null)
                        prd.Revage = p;
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'openfprice', OnInitialize: function (j, e) {
                j.addEventListener('click', 'click', function (e) {
                    var pr = j.Scop.Value;
                    if (!pr)
                        return;
                    if (pr.NextRevage)
                        Common_1.funcs.pricesModal().show(function (s, i, r) { }, pr.ToList());
                    else
                        Common_1.funcs.priceModal().edit(pr, false, null);
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'applyprice', OnInitialize: function (j, e) {
                var method = j.dom.getAttribute('method');
                j.addEventListener('click', 'click', function (e) {
                    var art = j.Scop.Value;
                    var f = art.Facture;
                    if (f && !f.IsOpen)
                        return UI_1.UI.Modal.ShowDialog("Apprentissage", 'La Facture Is Clossed donc vous ne pouver pas executer cette command', null, "Ok", null);
                    var old = art.Product;
                    if (old == null)
                        return UI_1.UI.Modal.ShowDialog('Apprentissage', "Vous dever selectioner un produit pour appliquer le prix");
                    switch (method) {
                        case 'moyen':
                            art.ApplyPrice = models_1.models.Price.CalclMoyen(old, art);
                            break;
                        case 'new':
                            art.ApplyPrice = art;
                            break;
                        case 'old':
                            art.ApplyPrice = null;
                            break;
                        case 'costum':
                            return GData.apis.Revage.Edit(false, art, true);
                        case 'percent':
                            UI_1.UI.InfoArea.push("this option is depricated");
                            break;
                    }
                    //var pr = j.Scop.Value as imodels.FakePrice;
                    //if (!pr) return;
                    //if (pr.NextRevage)
                    //    funcs.pricesModal().show((s, i, r) => { }, pr.ToList());
                    //else funcs.priceModal().edit(pr, false, null);
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'openfprice', OnInitialize: function (j, e) {
                j.addEventListener('click', 'click', function (e) {
                    var pr = j.Scop.Value;
                    if (!pr)
                        return;
                    if (pr.NextRevage)
                        Common_1.funcs.pricesModal().show(function (s, i, r) { }, pr.ToList());
                    else
                        Common_1.funcs.priceModal().edit(pr, false, null);
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'openfsprice', OnInitialize: function (j, e) {
                j.addEventListener('click', 'click', function (e) {
                    var p = j.Scop.Value;
                    if (!p)
                        return;
                    var pr = p.Revage;
                    if (!pr)
                        return UI_1.UI.InfoArea.push('Cannot find Price for this item');
                    if (pr.NextRevage)
                        Common_1.funcs.pricesModal().show(function (s, i, r) { }, pr.ToList());
                    else
                        GData.apis.Revage.Edit(true, pr, false);
                    //FakePrice.edit(pr);
                });
            }
        });
        //bind.Register({
        //    Name: 'openprdprice', OnInitialize(j, e) {
        //        j.addEventListener('click', 'click', (e) => {
        //            var prd = j.Scop.Value as imodels.Product;
        //            if (prd)
        //                FakePrice.edit(prd);
        //        });
        //    }
        //});
        Corelib_1.bind.Register({
            Name: 'dopenfprice', OnInitialize: function (j, e) {
                j.addEventListener('dblclick', 'dblclick', function (e) {
                    var p = j.Scop.Value;
                    if (!p)
                        UI_1.UI.InfoArea.push('Cannot find Price for this item');
                    else
                        GData.apis.Revage.Edit(true, p, false);
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'dopenfsprice', OnInitialize: function (j, e) {
                j.addEventListener('dblclick', 'dblclick', function (e) {
                    var p = j.Scop.Value;
                    if (!p)
                        return;
                    Common_1.funcs.pricesModal().show(function (s, i, r) { }, p && p.ToList());
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'dopenfsprice', OnInitialize: function (j, e) {
                j.addEventListener('dblclick', 'dblclick', function (e) {
                    var p = j.Scop.Value;
                    if (!p)
                        return;
                    Common_1.funcs.pricesModal().show(function (s, i, r) { }, p && p.ToList());
                });
            }
        });
        Corelib_1.bind.Register({
            Name: 'factureStat', OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var d = j.dom;
                if (j.Scop.Value) {
                    d.style.backgroundColor = "#0F9D58";
                }
                else {
                    d.style.backgroundColor = "var(--qshop-yellow-700)";
                }
            }
        });
        Corelib_1.bind.Register({
            Name: 'applyPriceStat', OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var ps = j.Scop.getParent();
                ps = ps && ps.Value;
                var cv = j.Scop.Value;
                var dom = j.dom.parentElement;
                if (!cv) {
                    dom.classList.remove('btn-success', 'btn-primary');
                }
                else if (cv === ps) {
                    dom.classList.remove('btn-primary');
                    dom.classList.add('btn-success');
                }
                else {
                    dom.classList.add('btn-primary');
                    dom.classList.remove('btn-success');
                }
                //if (j.Scop.Value) {
                //    j.dom.parentElement.classList.add("hasApplyPrice");
                //}
                //else {
                //    j.dom.parentElement.classList.remove("hasApplyPrice");
                //}
            }
        });
        Corelib_1.bind.Register({
            Name: 'sfactureStat', OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var d = j.dom;
                if (j.Scop.Value) {
                    d.style.backgroundColor = "#0F9D58";
                }
                else {
                    d.style.backgroundColor = "var(--qshop-yellow-700)";
                }
            }
        });
        Corelib_1.bind.Register({
            Name: 'clientStat', OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var t = j.Scop.Value || 0;
                if (t == 0)
                    j.dom.parentElement.style.backgroundColor = "#0F9D58";
                else if (t > 0)
                    j.dom.parentElement.style.backgroundColor = "var(--paper-red-500)";
                else
                    j.dom.parentElement.style.backgroundColor = "var(--qshop-yellow-500)";
            }
        });
        Corelib_1.bind.Register({
            Name: 'soldStatus', OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var t = j.Scop.Value || 0;
                var n = j.dom.style;
                j.dom.innerText = String(t);
                if (t == 0)
                    n.backgroundColor = "";
                else if (t > 0)
                    n.backgroundColor = "var(--paper-red-500)";
                else
                    n.backgroundColor = "var(--qshop-yellow-500)";
            }
        });
        Corelib_1.bind.Register({
            Name: 'fournisseurStat', OnInitialize: function (j, e) {
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var t = j.Scop.Value || 0;
                if (t == 0)
                    j.dom.parentElement.style.backgroundColor = "#0F9D58";
                else if (t < 0)
                    j.dom.parentElement.style.backgroundColor = "var(--paper-red-500)";
                else
                    j.dom.parentElement.style.backgroundColor = "var(--qshop-yellow-500)";
            }
        });
        Corelib_1.bind.Register({
            Name: 'auto-product', OnInitialize: function (j, e) {
                var d = j.dom;
                var inp = new UI_1.UI.Input(d);
                var ac = new UI_1.UI.ProxyAutoCompleteBox(inp, GData.__data.Products);
                inp.Parent = UI_1.UI.Desktop.Current;
                ac.OnValueChanged(j, function (box, old, nw) {
                    if (t.IsChanging)
                        return;
                    var artScop = j.Scop.getParent();
                    if (artScop) {
                        var art = artScop.Value;
                        if (art instanceof models_1.models.FakePrice) {
                            var f = art.Facture;
                            if (art.Stat <= System_1.sdata.DataStat.Modified) {
                                debugger;
                                art.PSel = nw.PSel;
                                art.Value = nw.Value;
                            }
                            if (art.Stat >= 8 && f && f.IsValidated) {
                                t.ac.Value = j.Scop.Value;
                                return UI_1.UI.InfoArea.push("Ce article ne peu pas changer a cause est deja valide");
                            }
                        }
                    }
                    t.IsChanging = true;
                    j.Scop.Value = nw;
                    t.IsChanging = false;
                });
                ac.initialize();
                var t = { ac: ac, IsChanging: false };
                j.Scop.BindingMode = Corelib_1.bind.BindingMode.TwoWay;
                j.addValue('ac', t);
                this.Todo(j, e);
            }, Todo: function (ji, e) {
                var t = ji.getValue('ac');
                if (t.IsChanging)
                    return;
                t.IsChanging = true;
                t.ac.Value = ji.Scop.Value;
                t.IsChanging = false;
            }
        });
        Corelib_1.bind.Register({
            Name: 'auto-pproduct', OnInitialize: function (j, e) {
                var d = j.dom;
                var inp = new UI_1.UI.Input(d);
                var ac = new UI_1.UI.ProxyAutoCompleteBox(inp, GData.__data.Prices);
                inp.Parent = UI_1.UI.Desktop.Current;
                ac.OnValueChanged(j, function (box, old, nw) {
                    if (t.IsChanging)
                        return;
                    var artScop = j.Scop.getParent();
                    if (artScop) {
                        var art = artScop.Value;
                        var f = art.Facture;
                        if (f.IsOpen) {
                            debugger;
                            art.PSel = nw.PSel;
                            art.Value = nw.Value;
                        }
                    }
                    t.IsChanging = true;
                    j.Scop.Value = nw;
                    t.IsChanging = false;
                });
                ac.initialize();
                var t = { ac: ac, IsChanging: false };
                j.Scop.BindingMode = Corelib_1.bind.BindingMode.TwoWay;
                j.addValue('ac', t);
                this.Todo(j, e);
            }, Todo: function (ji, e) {
                var t = ji.getValue('ac');
                if (t.IsChanging)
                    return;
                t.IsChanging = true;
                t.ac.Value = ji.Scop.Value;
                t.IsChanging = false;
            }
        });
        Corelib_1.bind.Register({
            Name: 'autocomplet', OnInitialize: function (j, e) {
                var d = j.dom;
                var s = d.getAttribute('db-source');
                var sc = Corelib_1.bind.Scop.Create(s, j.Scop, 1);
                var inp = new UI_1.UI.Input(d);
                var data;
                if (sc) {
                    data = sc.Value;
                    var ac = new UI_1.UI.ProxyAutoCompleteBox(inp, data);
                    sc.OnPropertyChanged(Corelib_1.bind.Scop.DPValue, function (s, e) {
                        this.DataSource = e._new;
                    }, ac);
                    ac.OnValueChanged(j, function (box, old, nw) {
                        j.Scop.Value = nw;
                    });
                    inp.Parent = UI_1.UI.Desktop.Current;
                    ac.initialize();
                    ac.Value = j.Scop.Value;
                }
                else
                    throw "datasource not found";
            }
        });
        function collapse(e) {
            var p;
            var b = this.self;
            var d = p = b.parentElement;
            if (!d)
                return;
            d = d.nextElementSibling;
            if (!d)
                return;
            var s = d.style.display;
            if (s == 'none') {
                d.style.display = '';
                b.classList.remove('glyphicon-triangle-top');
                b.classList.add('glyphicon-triangle-bottom');
            }
            else {
                d.style.display = 'none';
                b.classList.add('glyphicon-triangle-top');
                b.classList.remove('glyphicon-triangle-bottom');
            }
        }
        Corelib_1.ScopicCommand.Register({
            Invoke: function (n, dom, s, p) {
                dom.addEventListener('click', { handleEvent: collapse, self: dom });
            }
        }, null, 'collapse');
        Corelib_1.ScopicCommand.Register({
            Invoke: function (n, dom, s, p) {
                dom.addEventListener('click', function (e) {
                    var isopen = dom.classList.contains('open');
                    if (isopen)
                        dom.classList.remove('open');
                    else {
                        dom.classList.add('open');
                        var t = function (e) { dom.classList.remove('open'); document.removeEventListener('click', t, true); };
                        document.addEventListener('click', t, true);
                    }
                }, true);
                var dom = dom.parentElement;
            }
        }, null, 'opendropdown');
        Corelib_1.ScopicCommand.Register({
            Invoke: function (n, dom, s, p) {
                dom.innerText = s.Value;
            }
        }, null, 'write');
        function setValue(s, dom, rev) {
            var c;
            if (typeof s !== 'boolean') {
                c = s.getScop('activate');
                c = !(c && c.Value);
                s.setToScop('activate', c);
            }
            else
                c = s;
            dom.style.backgroundColor = c ? '' : 'var(--qshop-grey-500)';
        }
        Corelib_1.ScopicCommand.Register({
            Invoke: function (n, dom, s, p) {
                s = s.getParent();
                dom.addEventListener('click', function () {
                    setValue(s, dom);
                });
                setValue(false, dom);
            }
        }, null, 'activateCrt');
        Corelib_1.bind.Register({
            Name: 'auto-category', OnInitialize: function (j, e) {
                var d = j.dom;
                var inp = new UI_1.UI.Input(d);
                var ac = new UI_1.UI.ProxyAutoCompleteBox(inp, GData.__data.Categories);
                inp.Parent = UI_1.UI.Desktop.Current;
                ac.OnValueChanged(j, function (box, old, nw) {
                    j.Scop.Value.Category = nw;
                });
                ac.initialize();
                j.addValue('ac', ac);
                this.Todo(j, e);
            }, Todo: function (j, e) {
                var ac = j.getValue('ac');
                var p = j.Scop.Value;
                ac.Value = p ? p.Category : null;
            },
            OnScopDisposing: function (j, e) {
                var ac = j.getValue('ac');
                ac.Box.Dispose();
                ac.Dispose();
            }
        });
        var jobs = [];
        Corelib_1.bind.NamedScop.Create('UserAbonment', Models_1.models.Abonment.Detaillant, 3).OnPropertyChanged(Corelib_1.bind.Scop.DPValue, function (e, c) {
            var x = typeof c._new === 'number';
            if (x)
                Filters.setAbonment(c._new);
            if (c._new instanceof Corelib_1.basic.EnumValue)
                Filters.setAbonment(c._new.Value);
        }, null);
        Corelib_1.bind.Register({
            Name: 'enumoption',
            OnInitialize: function (j, e) {
                if (!(j.dom instanceof HTMLInputElement))
                    throw "Dom must be Select";
                var dm = j.dom;
                var c = dm.getAttribute('enum');
                var et = dm.getAttribute('enum-type');
                if (et !== 'string')
                    et = 'number';
                var lst = Corelib_1.basic.getEnum(c);
                var ac = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(j.dom), lst);
                ac.Box.Parent = UI_1.UI.Desktop.Current;
                ac.initialize();
                var p = { ac: ac, lst: lst, et: et };
                j.addValue('params', p);
                this.Todo(j, e);
                ac.OnValueChanged(ac, function (b, o, n) {
                    return j.Scop.Value = et === 'string' ? (n ? n.Name : lst.Get(0)) : n ? n.Value : 0;
                });
            }, Todo: function (ji, e) {
                var p = ji.getValue('params');
                var v = ji.Scop.Value;
                p.ac.Value = p.et === 'number' ? Corelib_1.basic.EnumValue.GetValue(p.lst, v || 0) : v;
            }
        });
        Corelib_1.bind.Register({
            Name: 'enumstring',
            OnInitialize: function (j, e) {
                var dm = j.dom;
                var c = dm.getAttribute('type');
                var lst = Corelib_1.basic.getEnum(c);
                j.addValue('params', lst);
                this.Todo(j, e);
            }, Todo: function (ji, e) {
                var p = ji.getValue('params');
                var v = ji.Scop.Value;
                ji.dom.textContent = typeof v === 'string' ? v : p.Get(v || 0).Name;
            }
        });
        Corelib_1.bind.Register({
            Name: 'adapter', OnInitialize: function (ji, e) {
                var dm = ji.dom;
                var itemTemplate = dm.getAttribute('item-template');
                var x = new UI_1.UI.ListAdapter(dm, itemTemplate);
                x.Parent = UI_1.UI.Desktop.Current;
                x.OnInitialized = function (x) { return x.Source = ji.Scop.Value; };
                ji.addValue('cnt', x);
                ji.Control = x;
            }, Todo: function (j, e) {
                var x = j.getValue('cnt');
                x.Source = j.Scop.Value;
            }, OnScopDisposing: function (j, e) {
                var x = j.getValue('cnt');
                x.Dispose();
            }
        });
        Corelib_1.ScopicControl.register('adapter', function (name, dom, currentScop, parentScop, parentControl, controller) {
            var itemTemplate = dom.getAttribute('item-template');
            var x = new UI_1.UI.ListAdapter(dom, itemTemplate);
            if (currentScop)
                currentScop.OnPropertyChanged(Corelib_1.bind.Scop.DPValue, function (s, e) {
                    x.Source = e._new;
                }, x);
            x.OnInitialized = function (x) { return x.Source = currentScop.Value; };
            return x;
        });
        Binds.LabelJob = Corelib_1.bind.Register({
            Name: "hideIfNull",
            OnInitialize: function (ji, e) {
                this.Todo(ji, e);
            }, Todo: function (ji, e) {
                var dm = ji.dom;
                var d = dm.parentElement;
                var dsp = d.style.display;
                var val = ji.Scop.Value;
                if (val == null) {
                    if (dsp == 'none')
                        return;
                    ji.addValue('display', dsp);
                    d.style.display = 'none';
                }
                else
                    d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
            }
        });
        Binds.LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("prodprice", function (ji, x) {
            var v = ji.Scop.Value;
            if (!v) {
                v = 0;
            }
            else {
                v = v.IGetValue(userAbonment || 0) || 0;
            }
            var dm = ji.dom;
            dm.innerText = Jobs_1.round(v, 2) + ' DZD';
        }, null, null, function (ji, x) {
            this.Todo(ji, x);
            var c;
            prodprices.push(c = { ji: ji, job: this });
            ji.addValue('c', c);
        }, function (ji, e) {
            var i = prodprices.indexOf(ji.getValue('c'));
            if (i > -1)
                prodprices.splice(i, 1);
        }));
        Corelib_1.bind.Register({
            Name: "deleteItem", OnInitialize: function (ji, e) {
                ji.dom.addEventListener('click', function (e) {
                    var s = ji.Scop;
                    if (s instanceof Corelib_1.bind.Bind) {
                        if (s.Parent) {
                            var l = s.Parent.Value;
                            if (l instanceof Corelib_1.collection.List) {
                                l.Remove(s.Value);
                                return;
                            }
                        }
                    }
                    alert("remove");
                });
            }
        });
        function getTarget(dom, depth, id) {
            var x = dom;
            for (var i = 0; i < depth; i++)
                x = x.parentElement;
            return $(id, x);
        }
        Corelib_1.ScopicCommand.Register({
            Invoke: function (s, dom, scop, p) {
                var href = dom.getAttribute('target');
                if (href == null)
                    return;
                var cs = href.split('/');
                var x = dom;
                if (cs.length > 2)
                    throw 'Error';
                if (cs.length > 1) {
                    href = cs[1];
                    var l = parseInt(cs[0]) + 1;
                }
                else
                    l = 1;
                var target = getTarget(dom, l, href);
                if (target != null) {
                    dom.addEventListener('click', {
                        handleEvent: function (e) {
                            var hin = target.classList.contains('in');
                            if (hin)
                                target.classList.remove('in');
                            else
                                target.classList.add('in');
                        }
                    });
                }
            }
        }, null, 'accordion');
        Corelib_1.ScopicCommand.Register({
            Invoke: function (s, dom, scop, p) {
                var templatePath = dom.getAttribute('as');
                if (!templatePath)
                    return UI_1.UI.InfoArea.push("command <template> required : as attribute ");
                var template = Corelib_1.mvc.MvcDescriptor.Get(templatePath);
                if (!templatePath)
                    return UI_1.UI.InfoArea.push("the template " + templatePath + "Cannot be found");
                dom.appendChild(template.Create());
            }
        }, null, 'template');
        function getPrice(p, a) {
            var pr = p.GetPrice(a);
            if (pr == 0) {
                for (var i = a - 1; i >= 0; i--) {
                    pr = p.GetPrice(i);
                    if (pr != 0)
                        return pr;
                }
                for (var i = a + 1; i < 4; i++) {
                    pr = p.GetPrice(i);
                    if (pr != 0)
                        return pr;
                }
                if (p.PSel != 0)
                    return p.PSel;
                return 0;
            }
            return pr;
        }
        Corelib_1.ScopicCommand.Register({
            Invoke: function (s, dom, scop, p) {
                var data = dom.getAttribute('db-data');
                dom.addEventListener('click', function (e) {
                    switch (data) {
                        case 'costume':
                            var t = scop.Value;
                            if (t.ApplyPrice === t || t.ApplyPrice == null)
                                var y = new models_1.models.FakePrice(Corelib_1.basic.New());
                            else
                                y = t.ApplyPrice;
                            for (var i = 3; i >= 0; i--) {
                                y.ISetValue(i, t.GetPrice(i));
                            }
                            y.PSel = t.PSel;
                            y.Product = t.Product;
                            y.Qte = t.Product.Qte;
                            t.ApplyPrice = y;
                            break;
                        case 'current':
                            var val = scop.Value;
                            if (val instanceof models_1.models.Product)
                                return;
                            fakePrice = scop.Value;
                            var prd = fakePrice.Product;
                            if (!prd)
                                return UI_1.UI.InfoArea.push('The product of this revage is not setted', false);
                            for (var i = 3; i >= 0; i--) {
                                fakePrice.ISetValue(i, prd.GetPrice(i));
                            }
                            break;
                        case 'calc':
                            var fakePrice = scop.Value;
                            var ps = fakePrice.PSel;
                            for (var i = 3; i >= 0; i--) {
                                fakePrice.ISetValue(i, ps = parseFloat(Jobs_1.round(ps * 1.33, 2)));
                            }
                            break;
                        case 'default':
                            var t = scop.Value;
                            t.ApplyPrice = t;
                            break;
                        case 'update':
                            var t = scop.Value;
                            GData.apis.Revage.Save(t.ApplyPrice, true, function (item, isNew, err) {
                                if (err === Basics_1.basics.DataStat.Success) {
                                    t.ApplyPrice = null;
                                    UI_1.UI.InfoArea.push("The Product Price successfully Updated .", true);
                                }
                                else
                                    UI_1.UI.InfoArea.push("Error Occoured When Updating <h1>Product</h1> Price .", false);
                            });
                            break;
                        case 'restore':
                            //requester.Post(models.FakePrice, y, null,
                            //    (s, r, iss) => {
                            //    },
                            //    (r, t) => {
                            //        r.Url='/_/Price'
                            //    });
                            var t = scop.Value;
                            t.ApplyPrice = null;
                            break;
                        default:
                    }
                }, false);
            }
        }, null, 'prdPrice');
    })(Binds || (Binds = {}));
    function OnSuccessCategory(cat, isNew) {
        GData.requester.Post(Models_1.models.FakePrice, cat, null, function (s, r, iss) {
            if (iss) {
                UI_1.UI.InfoArea.push("The Category Successfully Added", true);
                if (isNew) {
                    Models_1.models.FakePrice.pStore.Set(cat.Id, cat);
                    var p = Models_1.models.FakePrice.getById(cat.Id);
                    if (p == null) {
                        p = new Models_1.models.FakePrice(cat.Id);
                        Models_1.models.FakePrice.pStore.Set(cat.Id, p);
                    }
                }
                cat.Save();
                return;
            }
            else
                UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Category", false, 8000);
            cat.Undo();
        });
        return true;
    }
    function OnErrorCategory(cat, isNew) {
        UI_1.UI.InfoArea.push("The Modification Aborded", false, 2500);
        return false;
    }
    var prodprices = [];
    var Filters;
    (function (Filters) {
        var _ = [];
        var FakePriceFilter = /** @class */ (function (_super) {
            __extends(FakePriceFilter, _super);
            function FakePriceFilter(scop, b) {
                var _this = _super.call(this, scop, b) || this;
                _this.fraction = -2;
                return _this;
            }
            FakePriceFilter.prototype.Initialize = function () {
                _super.prototype.Initialize.call(this);
            };
            Object.defineProperty(FakePriceFilter.prototype, "Fraction", {
                set: function (v) {
                    if (this.fraction === v)
                        return;
                    var f = this.source.Value;
                    if (f) {
                        var d = Models_1.models.FakePrice.GetDProperty(v);
                        if (!d)
                            return;
                        var ld = Models_1.models.FakePrice.GetDProperty(this.fraction);
                        if (this.dbe)
                            f.removeEvent(ld, this.dbe);
                        this.dbe = f.OnPropertyChanged(d, this.OntargetVC, this);
                    }
                    this.fraction = v;
                    this.Update();
                },
                enumerable: true,
                configurable: true
            });
            FakePriceFilter.prototype.Convert = function (data) {
                return data ? data.IGetValue(this.fraction || 0) : 0;
            };
            FakePriceFilter.prototype.ConvertBack = function (data) {
                var fake = this.source.Value;
                if (fake)
                    fake.ISetValue(this.fraction || 0, data);
                return fake;
            };
            FakePriceFilter.prototype.OntargetVC = function (s, e) {
                if (this.isChanging)
                    return;
                this.isChanging = true;
                this.Update();
                this.isChanging = false;
            };
            FakePriceFilter.prototype.SourceChanged = function (s, e) {
                _super.prototype.SourceChanged.call(this, s, e);
                var n = e._new;
                var o = e._old;
                var ld = Models_1.models.FakePrice.GetDProperty(this.fraction);
                if (this.dbe)
                    if (o) {
                        o.removeEvent(ld, this.dbe);
                        this.dbe = null;
                    }
                    else
                        throw "";
                if (n)
                    this.dbe = n.OnPropertyChanged(ld, this.OntargetVC, this);
            };
            FakePriceFilter.prototype.Dispose = function () {
                var ld = Models_1.models.FakePrice.GetDProperty(this.fraction);
                if (this.dbe)
                    this.source.Value.removeEvent(ld, this.dbe);
                if (this.source)
                    this.source.removeEvent(Corelib_1.bind.Scop.DPValue, this.dbsvc);
                var i = _.indexOf(this);
                if (i !== -1)
                    _.splice(i, 1);
                _super.prototype.Dispose.call(this);
            };
            return FakePriceFilter;
        }(Corelib_1.bind.Filter));
        Filters.FakePriceFilter = FakePriceFilter;
        Corelib_1.bind.RegisterFilter({
            BindingMode: 3, Name: 'fackeprice', CreateNew: function (s, m, p) {
                var e = new FakePriceFilter(s, m);
                e.Fraction = p == null ? userAbonment : isNaN(p) ? Models_1.models.Abonment[p] : parseFloat(p);
                _.push(e);
                return e;
            }
        });
        window['_'] = _;
        window['__'] = prodprices;
        function setAbonment(v) {
            userAbonment = v || 0;
            for (var _i = 0, _1 = _; _i < _1.length; _i++) {
                var i = _1[_i];
                i.Fraction = v;
            }
            for (var _a = 0, prodprices_1 = prodprices; _a < prodprices_1.length; _a++) {
                var j = prodprices_1[_a];
                j.job.Todo(j.ji, null);
            }
        }
        Filters.setAbonment = setAbonment;
        var pb;
        GData.user.OnMessage(function (s, e) {
            if (e._new) {
                var c = Corelib_1.bind.NamedScop.Get('User');
                pb = Corelib_1.bind.Scop.Create('Client.Abonment', c, Corelib_1.bind.BindingMode.SourceToTarget);
                pb.addListener(function (ev) {
                    Filters.setAbonment(ev._new);
                });
            }
            else {
                pb.Dispose();
                Filters.setAbonment(-1);
            }
        });
    })(Filters = exports.Filters || (exports.Filters = {}));
    var userAbonment = GData.user.Client.Abonment || 0;
    function LoadJobs() {
    }
    exports.LoadJobs = LoadJobs;
    var redEx = /\0([\+|\-]{0,1}[\d]+(\.[\d]+){0,1})([\%]{0,1})\0/gmi;
    var redEx = /\0([\=\*\-\+\:\/]){0,1}([\-]{0,1}[\d]+(\.[\d]+){0,1})([\%]{0,1})\0/gmi;
    var reduction = Corelib_1.bind.Register({
        Name: 'reduction',
        Todo: function (ji, e) {
            if (ji._store.lock)
                return;
            ji._store.lock = true;
            try {
                var prd = ji.Scop.Value;
                var art = ji.getValue('parent');
                if (art)
                    art = art.Value;
                if (prd && art) {
                    if (art.Product != prd) {
                        alert("Unkown Error");
                    }
                    var vv = prd.GetPrice(GData.user.Client.Abonment || 0);
                    var pv = art.Price || vv;
                    var ps = prd.PSel;
                    art.Price = pv;
                    var def = pv - vv;
                    if (ji.dom instanceof HTMLInputElement)
                        ji.dom.value = "" + def;
                    else
                        ji.dom.textContent = "" + def;
                }
            }
            catch (e) {
            }
            ji._store.lock = false;
        }, OnInitialize: function (ji, e) {
            var d = ji.dom;
            if (d instanceof HTMLInputElement) {
                d.addEventListener('change', {
                    handleEvent: function (e) {
                        if (ji._store.lock)
                            return;
                        ji._store.lock = true;
                        var d = ji.dom;
                        try {
                            var _num, _isp;
                            redEx.exec(null);
                            var rslt = redEx.exec('\0' + ji.dom.value + '\0');
                            if (rslt == null) {
                                d.classList.add('error');
                                ji._store.lock = false;
                                return;
                            }
                            d.classList.remove('error');
                            reduction.Calc(ji, {
                                Method: rslt[1],
                                Value: parseFloat(rslt[2]),
                                IsPercent: (rslt[4] || "").trim() == "%"
                            });
                        }
                        catch (e) {
                        }
                        ji._store.lock = false;
                    }
                });
                ji.addValue('parent', ji.Scop.getParent());
            }
        }, Calc: function (ji, val) {
            var prd = ji.Scop.Value;
            var art = ji.getValue('parent');
            if (art)
                art = art.Value;
            if (prd && art) {
                var pv = prd.GetPrice(GData.user.Client.Abonment || 0);
                var ps = prd.PSel;
                if (pv < ps)
                    pv = ps;
                var v = val.Value;
                switch (val.Method) {
                    case '=':
                        art.Price = v;
                        break;
                    case '*':
                        art.Price = prd.PSel * v;
                        break;
                    case ':':
                        art.Price = prd.GetPrice(v);
                        break;
                    case '+':
                        if (val.IsPercent) {
                            art.Price = prd.PSel * (1 + v / 100);
                        }
                        else {
                            art.Price = pv + v;
                        }
                        break;
                    case '-':
                        if (val.IsPercent) {
                            art.Price = prd.PSel * (1 - v / 100);
                        }
                        else {
                            art.Price = pv - v;
                        }
                        break;
                    case '/':
                        art.Price = prd.PSel + Math.abs(pv - ps) / v;
                        break;
                    default:
                        if (val.IsPercent) {
                            art.Price = prd.PSel * (1 + v / 100);
                        }
                        else {
                            art.Price = pv + v;
                        }
                        break;
                }
            }
        }
    }, true);
});
//# sourceMappingURL=Jobs.js.map