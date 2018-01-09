define(["require", "exports", "./Corelib", "./Models", "./context"], function (require, exports, Corelib_1, Models_1, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var t = [1, 10, 100, 1000, 10000, 100000, 1e6, 1e7, 1e8, 1e9];
    function round1(_n, x) {
        var n = _n + '';
        var i = n.indexOf('.');
        var e = n.indexOf('e');
        if (i === -1)
            i = n.length;
        var ex = 0;
        if (e !== -1)
            if (i > e)
                return n;
            else {
                ex = parseFloat(n.substring(e + 1));
                if (ex < x - 1)
                    return '0';
                n = n.substring(0, e);
            }
        var l = n.length;
        if (ex !== 0) {
            if (i + ex > 1) {
                var fi = n.substr(0, i);
                var li = n.substring(i + 1);
                var shift = l - i <= ex ? l - i : ex;
                shift--;
                ex -= shift;
                i += shift;
                if (shift > 0) {
                    n = fi + li.substr(0, shift);
                    var lm = li.substring(shift);
                    if (lm.length > 0)
                        n += lm;
                    i = n.indexOf('.');
                }
                if (i === -1)
                    i = n.length;
                l = n.length;
            }
        }
        var l1 = x == 0 ? i : i + x + 1;
        var r = l1 - l;
        if (r > 0)
            l1 = l;
        n = n.substr(0, l1);
        if (r > 0) {
            if (i == l) {
                n += '.';
                r--;
            }
            for (; r > 0; r--)
                n += '0';
        }
        n = ex !== 0 ? n + 'e' + ex : n;
        return n;
    }
    exports.round1 = round1;
    function round(_n, x) {
        var n = _n + '';
        var i = n.indexOf('.');
        var e = n.indexOf('e');
        if (i === -1)
            i = e === -1 ? n.length : e;
        var ex = 0;
        if (e !== -1)
            if (i <= e) {
                ex = parseFloat(n.substring(e + 1));
                if (ex < x - 1)
                    return '0';
                n = n.substring(0, e);
            }
            else {
                ex = parseFloat(n.substring(e + 1));
                n = n.substring(0, e);
            }
        var l = n.length;
        if (ex !== 0) {
            if (i + ex > 1) {
                var fi = n.substr(0, i);
                var li = n.substring(i + 1);
                var shift = l - i <= ex ? l - i : ex;
                shift = Math.abs(shift + shift === 0 ? 0 : (shift < 0 ? 1 : -1));
                ex -= shift;
                i += shift;
                if (shift > 0) {
                    n = fi + li.substr(0, shift);
                    var lm = li.substring(shift);
                    if (lm.length > 0)
                        n += lm;
                    i = n.indexOf('.');
                }
                if (i === -1)
                    i = n.length;
                l = n.length;
            }
        }
        var l1 = x == 0 ? i : i + x + 1;
        var r = x - (n.length - i);
        if (r > 0)
            l1 = l;
        n = n.substr(0, l1);
        if (r > 0) {
            if (i == l) {
                n += '.';
                r--;
            }
            for (; r >= 0; r--)
                n += '0';
        }
        n = ex !== 0 ? n + 'e' + ex : n;
        return n;
    }
    exports.round = round;
    Corelib_1.bind.Register({
        Name: 'dimension',
        OnInitialize: function (ji, e) {
            this.Todo(ji, e);
        },
        Todo: function (ji, e) {
            var u = ji.dom;
        }
    });
    var Jobs;
    (function (Jobs) {
        function InputChecks(name, check) { }
        Jobs.InputChecks = InputChecks;
        function Load() { }
        Jobs.Load = Load;
        var InputJob;
        (function (InputJob) {
            function Register(name, check, freeze) {
                Object.defineProperty(checks, name, { value: check, configurable: !freeze, writable: !freeze, enumerable: false });
            }
            InputJob.Register = Register;
            var checks = {};
            var Name = 'input';
            function init() {
                var telM = /(0{1}[5|7|6|9]{1}\d{8})/;
                var telF = /(0{1}[2|3]{1}\d{7})/;
                var mail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
                var name = /[a-z|A-Z\s]+/;
                var username = /[\w\s\.\d\/\*\ \+\-\%\=°\"]*/;
                var dimention = /[\w\s\.\d\/\*\ \+\-\%\=°]*/;
                var url = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;
                checks['readonly'] = function (i) { return false; };
                checks['alphanumeric'] = function (str) { return !!str.match(/^[a-zA-Z0-9]*$/); };
                checks['ip'] = function (str) { return !!str.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/); };
                checks['numeric'] = function (str) { return !!str.match(/^-?[0-9]+$/); };
                checks['int'] = function (str) { return !!str.match(/^(?:-?(?:0|[1-9][0-9]*))$/); };
                checks['decimal'] = function (str) { return !!str.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/); };
                checks['text'] = function (str) { return !!str.match(/^[a-zA-Z0-9\s\.]*$/); };
                checks['password'] = function (str) { return !!str.match(/^[a-zA-Z0-9\s\.\@\!\?]+$/); };
                checks['any'] = function (str) { return true; };
                checks['ref'] = function (str) { return !!str.match(/^[A-Z]{1}[0-9]{1,5}$/); };
                checks['creditcard'] = function (str) {
                    str = str.replace(/[^0-9]+/g, "");
                    if (!str.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
                        return false;
                    }
                    var t = 0;
                    var r;
                    var e;
                    var i = false;
                    for (var s = str.length - 1; s >= 0; s--) {
                        r = str.substring(s, s + 1);
                        e = parseInt(r, 10);
                        if (i) {
                            e *= 2;
                            if (e >= 10) {
                                t += e % 10 + 1;
                            }
                            else {
                                t += e;
                            }
                        }
                        else {
                            t += e;
                        }
                        if (i) {
                            i = false;
                        }
                        else {
                            i = true;
                        }
                    }
                    if (t % 10 !== 0)
                        return false;
                    return true;
                };
                checks['tel'] = function (i) {
                    i = i.trim();
                    return (telF.test(i) && i.length === 9) || (telM.test(i) && i.length === 10);
                };
                checks['mail'] = function (i) {
                    var t = mail.exec(i);
                    return t !== null && t[0].length === i.length;
                };
                checks['name'] = function (i) {
                    var r = name.exec(i);
                    return r !== null && r[0].length === i.length;
                };
                checks['username'] = function (i) {
                    var r = username.exec(i);
                    return r !== null && r[0].length === i.length;
                };
                checks['dimention'] = function (i) {
                    var r = dimention.exec(i);
                    return r !== null && r[0].length === i.length;
                };
                checks['select'] = function (i) {
                    var r = username.exec(i);
                    return r !== null && r[0].length === i.length;
                };
                Object.freeze(InputJob);
                Object.freeze(telM);
                Object.freeze(telF);
            }
            InputJob.init = init;
            function Todo(job, e) {
                if (job.Ischanging)
                    return;
                job.Ischanging = true;
                try {
                    job.dom.value = job.Scop.Value || '';
                }
                catch (e) {
                }
                job.Ischanging = false;
            }
            function Check(job, e) {
            }
            function OnError(job, e) {
            }
            function OnInitialize(ji, e) {
                var check = ji.dom.getAttribute('db-check');
                if (check === 'readonly')
                    ji.dom.contentEditable = 'false';
                ji.Checker = checks[check];
                ji.Handle = this.handleEvent;
                this.Todo(ji, e);
                ji.addEventListener('ochange', 'change', ji);
            }
            function handleEvent(t, e) {
                if (t.Ischanging)
                    return;
                t.Ischanging = true;
                try {
                    var b = t.dom.value;
                    if (t.Checker) {
                        if (!t.Checker(b))
                            t.dom.value = t.Scop.Value;
                        else
                            t.Scop.Value = b;
                    }
                    else
                        t.Scop.Value = b;
                }
                catch (e) {
                }
                t.Ischanging = false;
            }
            function callback(e) {
            }
            function OnDispose(job, e) {
                job.removeEventListener('ochange');
            }
            function Instance() {
                return { Name: Name, Todo: Todo, OnInitialize: OnInitialize, Check: Check, OnScopDisposing: OnDispose, OnError: OnError, handleEvent: handleEvent };
            }
            InputJob.Instance = Instance;
            init();
        })(InputJob || (InputJob = {}));
        var compiler = new Corelib_1.basic.CodeCompiler();
        var interpolation = /** @class */ (function () {
            function interpolation() {
                this.Name = "$";
            }
            interpolation.prototype.Todo = function (job, e) {
                var regs = job.getValue('regs');
                var scp = job.Scop;
                var val = job.Scop.Value;
                var params = [val, scp, undefined, job, undefined];
                for (var i = 0; i < regs.length; i++) {
                    var reg = regs[i];
                    params[2] = reg.stat || job.dom;
                    params[4] = reg.evalCode;
                    params[2].textContent = reg.evalCode.apply(scp, params);
                }
            };
            interpolation.prototype.Check = function (job, e) {
            };
            interpolation.prototype.OnError = function (job, e) {
            };
            interpolation.prototype.OnInitialize = function (job, e) {
                var _this = this;
                var d = job.dom.firstChild;
                var arr = [];
                job.addValue("regs", arr);
                do {
                    if (d instanceof Text) {
                        var reg = compiler.push(d.textContent);
                        if (reg.IsString)
                            compiler.remove(reg);
                        else {
                            reg.stat = d;
                            arr.push(reg);
                            Corelib_1.bind.Observer;
                        }
                    }
                } while ((d = d.nextSibling));
                compiler.onload = function (t) { t.reset(); _this.Todo(job, e); };
                compiler.Compile();
            };
            interpolation.prototype.OnScopDisposing = function (job, e) {
                var regs = job.getValue('regs');
                regs.length = 0;
            };
            return interpolation;
        }());
        Jobs.interpolation = interpolation;
        Corelib_1.bind.Register(new interpolation());
        var CheckBox = /** @class */ (function () {
            function CheckBox() {
                this.Name = 'checkbox';
            }
            CheckBox.prototype.Todo = function (job, e) {
                job.dom.checked = job.Scop.Value;
            };
            CheckBox.prototype.Check = function (job, e) {
            };
            CheckBox.prototype.OnError = function (job, e) {
            };
            CheckBox.prototype.OnInitialize = function (job, e) {
                this.Todo(job, e);
                job.addEventListener('change', 'change', job);
                job.Handle = this.Handle;
            };
            CheckBox.prototype.OnScopDisposing = function (job, e) {
            };
            CheckBox.prototype.Handle = function (ji, e) {
                var v = ji.dom.checked;
                ji.Scop.Value = v == null ? null : !!v;
            };
            return CheckBox;
        }());
        Jobs.CheckBox = CheckBox;
        Corelib_1.bind.Register(new CheckBox());
        var FloatJob = /** @class */ (function () {
            function FloatJob() {
                this.checks = {};
                this.Name = 'number';
                this.reg = function (str) { return !!str.match(/^[+-]?\d+(?:\.\d+)?$/); };
            }
            FloatJob.prototype.Todo = function (job, e) {
                if (job.Ischanging)
                    return;
                job.Ischanging = true;
                try {
                    var val = job.Scop.Value;
                    val = val == null ? job._store.def : val;
                    if (job.dom instanceof HTMLInputElement)
                        job.dom.value = val;
                    else
                        job.dom.textContent = val;
                }
                catch (e) {
                }
                job.Ischanging = false;
            };
            FloatJob.prototype.OnInitialize = function (ji, e) {
                var _this = this;
                var d = ji.dom;
                var check = d.getAttribute('db-check');
                ji.addValue('max', parseFloat(d.getAttribute('max') || '9999999999'));
                ji.addValue('min', parseFloat(d.getAttribute('min') || '-9999999999'));
                ji.addValue('def', parseFloat(d.getAttribute('default') || '0.00'));
                if (check === 'readonly')
                    d.contentEditable = 'false';
                else {
                    ji.Handle = this.handleEvent;
                    ji.addEventListener('ochange', 'change', function (e) { _this.handleEvent(ji, e); });
                }
                this.Todo(ji, e);
            };
            FloatJob.prototype.handleEvent = function (ji, e) {
                if (ji.Ischanging)
                    return;
                ji.Ischanging = true;
                try {
                    var dm = ji.dom;
                    var b = dm.value;
                    if (this.reg(b)) {
                        var v = Math.round(parseFloat(b) * 1000) / 1000;
                        var nv = Math.max(ji.getValue('min'), Math.min(v, ji.getValue('max')));
                        ji.Scop.Value = nv;
                        if (v != nv)
                            dm.value = nv.toString();
                    }
                    else
                        dm.value = String(Math.round((ji.Scop.Value || 0) * 1000) / 1000);
                }
                catch (e) {
                }
                ji.Ischanging = false;
            };
            FloatJob.prototype.OnScopDisposing = function (job, e) {
                job.removeEventListener('ochange');
            };
            return FloatJob;
        }());
        Jobs.FloatJob = FloatJob;
        var AccordionSelectJob = /** @class */ (function () {
            function AccordionSelectJob() {
                this.checks = {};
                this.Name = 'select';
            }
            AccordionSelectJob.prototype.Todo = function (ji, e) {
                var val = ji.getValue('db-const');
                var style = ji.getValue('db-style');
                var dval = ji.Scop.Value;
                try {
                    var dm = ji.dom;
                    if (val === dval)
                        dm.classList.add(style);
                    else
                        dm.classList.remove(style);
                }
                catch (e) {
                }
            };
            AccordionSelectJob.prototype.Check = function (job, e) {
            };
            AccordionSelectJob.prototype.OnError = function (job, e) {
            };
            AccordionSelectJob.prototype.OnInitialize = function (ji, e) {
                var dm = ji.dom;
                var t = this.callback.bind(ji);
                ji.addValue('__', t);
                ji.addValue('db-const', dm.getAttribute('db-const'));
                ji.addValue('db-style', dm.getAttribute('db-style'));
                this.Todo(ji, e);
                dm.addEventListener('click', t);
            };
            AccordionSelectJob.prototype.callback = function (e) {
                var t = this;
                try {
                    var val = t.getValue('db-const');
                    t.Scop.Value = val;
                }
                catch (e) {
                }
            };
            AccordionSelectJob.prototype.OnScopDisposing = function (job, e) {
            };
            return AccordionSelectJob;
        }());
        Jobs.AccordionSelectJob = AccordionSelectJob;
        var ProductCartJob = /** @class */ (function () {
            function ProductCartJob() {
                this.Name = 'productcart';
            }
            ProductCartJob.prototype.Todo = function (ji, e) {
                var t = ji._store;
                var n = e._new;
                var p = e._new.Picture;
                t.img.style.backgroundImage = p == null ? '' : 'url(' + p.ImageUrl + ')';
                t.description.textContent = n.Description;
                t.name.textContent = n.Name;
                t.price.textContent = n.Revage == null ? '0' : n.Revage.Value + '';
            };
            ProductCartJob.prototype.Check = function (ji, e) {
            };
            ProductCartJob.prototype.OnError = function (ji, e) {
            };
            ProductCartJob.prototype.OnScopDisposing = function (ji, e) {
            };
            ProductCartJob.prototype.OnInitialize = function (ji, e) {
                var d = ji.dom;
                ji._store['img'] = $('img', d);
                ji._store['name'] = $('name', d);
                ji._store['description'] = $('description', d);
                ji._store['price'] = $('price', d);
                this.Todo(ji, e);
            };
            return ProductCartJob;
        }());
        Jobs.ProductCartJob = ProductCartJob;
        Corelib_1.bind.Register(new ProductCartJob());
        Jobs.LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("label", function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value || '';
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value || '';
        }, function (ji, e) {
        }));
        Jobs.LabelJob = Corelib_1.bind.Register({
            Name: 'date',
            OnInitialize: function (ji, e) {
                var c = ji.dom;
                ji.addEventListener('change', 'change', {
                    handleEvent: function (e) {
                        this.self.Scop.Value = ji.dom.valueAsDate;
                    }, self: ji
                });
                this.Todo(ji, e);
            }, Todo: function (ji, e) {
                var d = ji.dom;
                var v = ji.Scop.Value;
                var dt = (v == null ? new Date(0) : v instanceof Date ? v : typeof v === 'number' ? new Date(v) : typeof v === 'string' ? Date.parse(v) : new Date(0));
                if (d instanceof HTMLInputElement)
                    ji.dom.valueAsDate = dt;
                else
                    ji.dom.textContent = dt.toLocaleString();
            }
        });
        Jobs.LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("rinput", function (ji, e) {
            ji.dom.value = ji.Scop.Value;
        }, null, null, function (ji, e) {
            ji.dom.value = ji.Scop.Value;
        }, function (ji, e) {
        }));
        Jobs.textboxJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("textbox", function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value;
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value;
        }, function (ji, e) {
        }));
        Jobs.LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("price", function (ji, e) {
            var dm = ji.dom;
            dm.innerText = round(ji.Scop.Value || 0, 2) + ' DZD';
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.innerText = round(ji.Scop.Value || 0, 2) + ' DZD';
        }, function (ji, e) {
        }));
        Jobs.ratingJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("rateing", function (ji, e) {
            var dm = ji.dom;
            var v = Math.round(ji.Scop.Value || 0);
            var length = dm.childElementCount;
            for (var i = 0; i < v; i++) {
                dm.children[i].style.visibility = "visible";
            }
            for (var i = v; i < length; i++) {
                dm.children[i].style.visibility = "hidden";
            }
        }, null, null, function (ji, e) {
            Jobs.ratingJob.Todo(ji, e);
        }));
        Jobs.LabelJob = Corelib_1.bind.Register({
            Name: "enable",
            Todo: function (ji, i) {
                ji.dom.style.pointerEvents = ji.Scop.Value ? 'all' : 'none';
            },
            OnInitialize: function (ji, e) {
                this.Todo(ji, e);
            }
        });
        Jobs.LabelJob = Corelib_1.bind.Register({
            Name: "applyStyle",
            Todo: function (ji, i) {
                var d = ji.getValue('target');
                var dt = ji.getValue('data') || defaultDispaly;
                var type = this.getType(ji);
                var x = ji.Scop.Value;
                if (type)
                    x = x instanceof type;
                d.classList.add.apply(d.classList, x ? dt[1] : dt[0]);
                d.classList.remove.apply(d.classList, x ? dt[0] : dt[1]);
            },
            OnInitialize: function (ji, e) {
                var d = ji.dom;
                var dt = d.getAttribute('db-data');
                if (dt) {
                    dt = dt.split(',');
                    if (dt.length == 1)
                        dt = [dt[0].split(' '), 'none'];
                    else {
                        dt[0] = dt[0].split(' ');
                        dt[1] = dt[1].split(' ');
                    }
                    ji.addValue('data', dt);
                }
                var ofType = d.getAttribute('ofType');
                if (ofType)
                    ji.addValue('ofType', ofType);
                this.getTarget(ji);
                this.Todo(ji, e);
            },
            getType: function (ji) {
                var type = ji.getValue('ofType');
                if (typeof type === 'string') {
                    type = context_1.context.GetType(type);
                    if (type instanceof Function)
                        ji.addValue('ofType', type);
                }
                return type;
            },
            getTarget: function (ji) {
                var target = ji.dom.getAttribute('target');
                if (!target)
                    return;
                var opt = target.split('/');
                var num = parseInt(opt[0]) || 0;
                var id = opt[1];
                var d = ji.dom;
                while (num != 0) {
                    num--;
                    d = d.parentElement || d;
                }
                if (id) {
                    var sd = $(id, d);
                    if (sd) {
                        if (sd instanceof Array) {
                            if (sd.length != 0)
                                d = sd[0];
                        }
                        else
                            d = sd;
                    }
                }
                ji.addValue('target', d || ji.dom.parentElement || ji.dom);
            }
        });
        Jobs.LabelJob = Corelib_1.bind.Register({
            Name: "show",
            Todo: function (ji, i) {
                var d = ji.getValue('target');
                var dt = ji.getValue('data') || defaultDispaly;
                var type = this.getType(ji);
                var x = ji.Scop.Value;
                if (type)
                    x = x instanceof type;
                d.style.display = x ? dt[1] : dt[0];
            },
            OnInitialize: function (ji, e) {
                var d = ji.dom;
                var dt = d.getAttribute('db-data');
                if (dt) {
                    dt = dt.split(',');
                    if (dt.length == 1)
                        dt = [dt[0], 'none'];
                    ji.addValue('data', dt);
                }
                var ofType = d.getAttribute('ofType');
                if (ofType)
                    ji.addValue('ofType', ofType);
                this.getTarget(ji);
                this.Todo(ji, e);
            },
            getType: function (ji) {
                var type = ji.getValue('ofType');
                if (typeof type === 'string') {
                    type = context_1.context.GetType(type);
                    if (type instanceof Function)
                        ji.addValue('ofType', type);
                }
                return type;
            },
            getTarget: function (ji) {
                var target = ji.dom.getAttribute('target');
                if (!target)
                    return;
                var opt = target.split('/');
                var num = parseInt(opt[0]) || 0;
                var id = opt[1];
                var d = ji.dom;
                while (num != 0) {
                    num--;
                    d = d.parentElement || d;
                }
                if (id) {
                    var sd = $(id, d);
                    if (sd) {
                        if (sd instanceof Array) {
                            if (sd.length != 0)
                                d = sd[0];
                        }
                        else
                            d = sd;
                    }
                }
                ji.addValue('target', d || ji.dom.parentElement || ji.dom);
            }
        });
        Jobs.LabelJob = Corelib_1.bind.Register({
            Name: "editable",
            Todo: function (ji, e) {
                var c = !ji.Scop.Value;
                var ins = $('input', ji.dom);
                for (var i = 0; i < ins.length; i++) {
                    var b = ins[i];
                    b.disabled = c;
                }
            },
            OnInitialize: function (ji, e) {
                this.Todo(ji);
            }, OnScopDisposing: function (ji, e) {
            }
        });
        var defaultDispaly = ['none', ''];
        Jobs.LabelJob = Corelib_1.bind.Register({
            Name: "toggle",
            Todo: function (ji, i) {
            },
            OnInitialize: function (ji, e) {
                ji.addEventListener('domclick', 'click', function (e) {
                    ji.Scop.Value = !!!ji.Scop.Value;
                });
            }, OnScopDisposing: function (ji, e) {
                ji.removeEventListener('domclick');
            }
        });
        Jobs.LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("showIf", function (ji, e) {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            if (val === false) {
                if (dsp == 'none')
                    return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            }
            else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            { }
            if (val === false) {
                if (dsp == 'none')
                    return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            }
            else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        }, function (ji, e) {
        }));
        Jobs.LabelJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("hideIf", function (ji, e) {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            if (val === true) {
                if (dsp == 'none')
                    return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            }
            else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            var d = dm.parentElement;
            var dsp = d.style.display;
            var val = ji.Scop.Value;
            if (val === true) {
                if (dsp == 'none')
                    return;
                ji.addValue('display', dsp);
                d.style.display = 'none';
            }
            else
                d.style.display = dsp == 'none' ? ji.getValue('display') : dsp;
        }, function (ji, e) {
        }));
        Jobs.TextJob = Corelib_1.bind.Register(InputJob.Instance());
        Jobs.TextJob = Corelib_1.bind.Register(new FloatJob());
        Jobs.TextJob = Corelib_1.bind.Register(new AccordionSelectJob());
        Jobs.SlideJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("image", function (ji, e) {
            var src = ji.Scop.Value;
            src = src == null ? "" : src;
            if (typeof src == 'string') {
                ji.dom.src = src == null ? "" : src;
            }
            else if (src instanceof Models_1.models.Picture)
                ji.dom.src = src.ImageUrl;
            else
                ji.dom.src = "";
        }, null, null, function (ji, e) {
            var src = ji.Scop.Value;
            src = src == null ? "" : src;
            if (typeof src == 'string') {
                ji.dom.src = src == null ? "" : src;
            }
            else if (src instanceof Models_1.models.Picture)
                ji.dom.style.backgroundImage = 'url(' + src.ImageUrl + ')';
            else
                ji.dom.style.backgroundImage = "";
        }, function (ji, e) {
        }));
        Jobs.CheckJob = Corelib_1.bind.Register(new Corelib_1.bind.Job("check", function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value;
        }, null, null, function (ji, e) {
            var dm = ji.dom;
            dm.innerText = ji.Scop.Value;
        }, function (ji, e) {
        }));
        //export var ListJob = bind.Register(new bind.Job("list",
        //    (ji, e) => {
        //        var x = <Component.ListView>ji.getValue('cnt');
        //        x.Source = ji.Scop.Value;
        //    }, null, null,
        //    (ji, e) => {
        //        var x = new Component.ListView(ji.Scop.Value, ji.dom);
        //        ji.addValue('cnt', x);
        //    },
        //    (ji, e) => {
        //        var x = <Component.ListView>ji.getValue('cnt');
        //        x.Dispose();
        //    }));
    })(Jobs = exports.Jobs || (exports.Jobs = {}));
});
//# sourceMappingURL=Jobs.js.map