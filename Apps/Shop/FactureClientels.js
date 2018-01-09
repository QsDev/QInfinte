var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../../js/UI', '../../js/Corelib', "../../js/Models", 'Common', 'models'], function (require, exports, UI_1, Corelib_1, Models_1, Common_1, models_1) {
    "use strict";
    var requester;
    var _ifactures;
    var _isfactures;
    var mails;
    var __idata;
    var modify;
    var user;
    var b = true;
    Common_1.GetVars(function (v) {
        requester = v.requester;
        mails = v.mails;
        __idata = v.__data;
        modify = v.modify;
        user = v.user;
        _ifactures = __idata.Factures;
        _isfactures = __idata.SFactures;
        return false;
    });
    function crb(dom, icon, title, type, attri) {
        var t = document.createElement(dom);
        t.classList.add('btn', 'btn-' + type, 'glyphicon', 'glyphicon-' + icon);
        t.textContent = '  ' + title;
        for (var i in attri)
            t.setAttribute(i, attri[i]);
        return t;
    }
    var AdminNavs;
    (function (AdminNavs) {
        var FacturesReciption = (function (_super) {
            __extends(FacturesReciption, _super);
            function FacturesReciption() {
                _super.call(this, "facture_fournisseurs", "Factures Reciption");
                this.btn_filter = crb('label', 'filter', '', 'default', {});
                this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
                this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
                this._caption = document.createTextNode("Les Factures de ");
                this.abonment = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(document.createElement('input')), __idata.Costumers);
                this.searchRequest = new models_1.models.FactureSearch();
            }
            FacturesReciption.prototype.initializeSBox = function () {
                var _this = this;
                var div = this.group_cnt.View;
                div.appendChild(this.btn_filter);
                this.abonment.Box.Placeholder = 'Select a Client';
                div.appendChild(this.abonment.Box.View);
                this.abonment.Box.Parent = this.group_cnt;
                this.abonment.Box.OnInitialize = function (n) {
                    var s = n.View.style;
                    s.marginTop = '1px';
                    s.cssFloat = 'left';
                    s.width = 'auto';
                    n.applyStyle('form-control');
                };
                this.abonment.Box.View.style.minWidth = '300px';
                this.abonment.initialize();
                this.group_tcnt.View.appendChild(this._caption);
                this.group_tcnt.Add(this.group_cnt);
                this.Add(this.group_tcnt);
                this.btn_filter.addEventListener('click', function () {
                    var c = internal.SearchModal();
                    c.edit(_this.searchRequest, true, {
                        OnSuccess: {
                            Invoke: function (f, n) {
                                _this.adapter.Source.Filter.Patent = f.ToInterface();
                                return false;
                            }
                        }
                    });
                });
            };
            FacturesReciption.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.initializeSBox();
                this.initPaginator();
                var isc = false;
                this.Update();
                var t;
            };
            FacturesReciption.prototype.initPaginator = function () {
                var _this = this;
                this.adapter = new UI_1.UI.ListAdapter('SFactures.table');
                this.paginator = new UI_1.UI.Paginator(3);
                this.paginator.OnInitialize = function (p) {
                    _this.adapter.OnInitialize = function (l) {
                        l.Source = Corelib_1.collection.ExList.New(_isfactures, _this.paginator.Filter);
                        _this.paginator.BindMaxToSourceCount(_isfactures);
                    };
                    _this.paginator.Content = _this.adapter;
                };
                this.Add(this.paginator);
                this.adapter.OnInitialize = function (p) { return _this.Update(); };
            };
            FacturesReciption.prototype.Search = function (f) {
                var t = __idata.Costumers.AsList();
                for (var i = 0, l = t.length; i < l; i++) {
                    var e = t[i];
                }
            };
            FacturesReciption.prototype.GetLeftBar = function () {
                return internal.service.GetLeftBar(this);
            };
            FacturesReciption.prototype.GetRightBar = function () {
                return internal.service.GetRightBar(this);
            };
            FacturesReciption.prototype.Print = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a Facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('PrintSFacture', c);
            };
            FacturesReciption.prototype.Open = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a Facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('OpenSFacture', c);
            };
            FacturesReciption.prototype.New = function () {
                Corelib_1.command.RiseCommand('NewSFacture', null);
            };
            FacturesReciption.prototype.FsSave = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a Facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('SaveSFacture', c);
            };
            FacturesReciption.prototype.Update = function () {
            };
            FacturesReciption.prototype.FsUpdate = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a Facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('UpdateSFacture', c);
            };
            FacturesReciption.prototype.Validate = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a Facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('ValidateSFacture', c);
            };
            FacturesReciption.prototype.Delete = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a Facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('DeleteSFacture', c);
            };
            return FacturesReciption;
        }(UI_1.UI.NavPanel));
        AdminNavs.FacturesReciption = FacturesReciption;
        var FacturesLivraison = (function (_super) {
            __extends(FacturesLivraison, _super);
            function FacturesLivraison() {
                _super.call(this, "facture_clientels", "Factures Clientel");
                this.btn_filter = crb('label', 'filter', '', 'default', {});
                this.group_cnt = new UI_1.UI.Div().applyStyle('pull-right', 'flat');
                this.group_tcnt = new UI_1.UI.Div().applyStyle('icontent-header');
                this._caption = document.createTextNode("Les Factures de ");
                this.abonment = new UI_1.UI.ProxyAutoCompleteBox(new UI_1.UI.Input(document.createElement('input')), __idata.Costumers);
                this.searchRequest = new models_1.models.FactureSearch();
            }
            FacturesLivraison.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                var div = this.group_cnt.View;
                div.appendChild(this.btn_filter);
                this.abonment.Box.Placeholder = 'Select a Client';
                div.appendChild(this.abonment.Box.View);
                this.abonment.Box.Parent = this.group_cnt;
                this.abonment.Box.OnInitialize = function (n) {
                    var s = n.View.style;
                    s.marginTop = '1px';
                    s.cssFloat = 'left';
                    s.width = 'auto';
                    n.applyStyle('form-control');
                };
                this.abonment.Box.View.style.minWidth = '300px';
                this.abonment.initialize();
                this.group_tcnt.View.appendChild(this._caption);
                this.group_tcnt.Add(this.group_cnt);
                this.Add(this.group_tcnt);
                this.initPaginator();
                var isc = false;
                this.btn_filter.addEventListener('click', function () {
                    var c = internal.SearchModal();
                    c.edit(_this.searchRequest, true, {
                        OnSuccess: {
                            Invoke: function (f, n) {
                                _this.searchFilter.Patent = f.ToInterface();
                                return false;
                            }
                        }
                    });
                });
            };
            FacturesLivraison.prototype.Search = function (f) {
                var t = __idata.Costumers.AsList();
                for (var i = 0, l = t.length; i < l; i++) {
                    var e = t[i];
                }
            };
            FacturesLivraison.prototype.initPaginator = function () {
                var _this = this;
                this.paginator = new UI_1.UI.Paginator(3);
                this.paginator.OnInitialize = function (p) {
                    _this.adapter = new UI_1.UI.ListAdapter('Factures.InValidation', 'Factures.row');
                    _this.adapter.OnInitialize = function (l) {
                        var x = Corelib_1.collection.ExList.New(_ifactures, _this.searchFilter = new models_1.models.FSFilter(_this.searchRequest));
                        l.Source = Corelib_1.collection.ExList.New(x, _this.paginator.Filter);
                        _this.paginator.BindMaxToSourceCount(x);
                    };
                    _this.paginator.Content = _this.adapter;
                };
                this.Add(this.paginator);
            };
            FacturesLivraison.prototype.GetLeftBar = function () {
                return internal.service.GetLeftBar(this);
            };
            FacturesLivraison.prototype.GetRightBar = function () {
                return internal.service.GetRightBar(this);
            };
            FacturesLivraison.prototype.Print = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('PrintFacture', c);
            };
            FacturesLivraison.prototype.Open = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('OpenFacture', c);
            };
            FacturesLivraison.prototype.New = function () {
                var c = new Models_1.models.Facture(Corelib_1.basic.New());
                c.Date = new Date();
                _ifactures.Add(c);
                Corelib_1.command.RiseCommand('OpenFacture', c);
            };
            FacturesLivraison.prototype.FsSave = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('SaveFacture', c);
            };
            FacturesLivraison.prototype.FsUpdate = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('UpdateFacture', c);
            };
            FacturesLivraison.prototype.Update = function () {
            };
            FacturesLivraison.prototype.Validate = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('ValidateFacture', c);
            };
            FacturesLivraison.prototype.Delete = function () {
                var c = this.adapter.SelectedItem;
                if (c == null) {
                    UI_1.UI.InfoArea.push('Select a facture', true);
                }
                else
                    Corelib_1.command.RiseCommand('DeleteFacture', c);
            };
            return FacturesLivraison;
        }(UI_1.UI.NavPanel));
        AdminNavs.FacturesLivraison = FacturesLivraison;
    })(AdminNavs = exports.AdminNavs || (exports.AdminNavs = {}));
    var internal;
    (function (internal) {
        function createSparator() {
            var separ0 = new UI_1.UI.Glyph(-1, false);
            separ0.Enable = false;
            return separ0;
        }
        var FacturesService = (function () {
            function FacturesService() {
            }
            FacturesService.prototype.GetRightBar = function (target) {
                var _this = this;
                if (!this.lb) {
                    this._print = new UI_1.UI.Glyph(UI_1.UI.Glyphs.print, false, 'Print');
                    this._open = new UI_1.UI.Glyph(UI_1.UI.Glyphs.open, false, 'Open');
                    this._new = new UI_1.UI.Glyph(UI_1.UI.Glyphs.openFile, false, 'New');
                    this.lb = new UI_1.UI.Navbar();
                    var oldget = this.lb.getTemplate;
                    this.lb.getTemplate = function (c) {
                        var e = oldget(new UI_1.UI.Anchore(c));
                        return e;
                    };
                    this.lb.OnInitialize = function (n) { return n.AddRange([_this._print, _this._open, _this._new]); };
                    this._print.addEventListener('click', this.Print, this);
                    this._open.addEventListener('click', this.Open, this);
                    this._new.addEventListener('click', this.New, this);
                }
                this.target = target;
                return this.lb;
            };
            FacturesService.prototype.GetLeftBar = function (target) {
                var _this = this;
                if (!this.rb) {
                    this._update = new UI_1.UI.Glyph(UI_1.UI.Glyphs.refresh, false, 'Update');
                    this._validate = new UI_1.UI.Glyph(UI_1.UI.Glyphs.check, false, 'Validate');
                    this._save = new UI_1.UI.Glyph(UI_1.UI.Glyphs.floppyDisk, false, 'Save');
                    this._delete = new UI_1.UI.Glyph(UI_1.UI.Glyphs.trash, false, 'Delete');
                    this.rb = new UI_1.UI.Navbar();
                    var oldget = this.rb.getTemplate;
                    this.rb.getTemplate = function (c) {
                        var e = oldget(new UI_1.UI.Anchore(c));
                        if (c.Type === -1)
                            e.Enable = false;
                        return e;
                    };
                    this.rb.OnInitialize = function (n) {
                        n.AddRange([_this._delete, createSparator(), _this._save, _this._validate, _this._update]);
                    };
                    this._update.addEventListener('click', this.Update, this);
                    this._validate.addEventListener('click', this.Validate, this);
                    this._save.addEventListener('click', this.FsSave, this);
                    this._delete.addEventListener('click', this.Delete, this);
                }
                this.target = target;
                return this.rb;
            };
            FacturesService.prototype.Print = function (g, m, t) { t.target.Print(); };
            FacturesService.prototype.Open = function (g, m, t) { t.target.Open(); };
            FacturesService.prototype.New = function (g, m, t) { t.target.New(); };
            FacturesService.prototype.FsSave = function (g, m, t) { t.target.FsSave(); };
            FacturesService.prototype.Update = function (g, m, t) { t.target.FsUpdate(); };
            FacturesService.prototype.Validate = function (g, m, t) { t.target.Validate(); };
            FacturesService.prototype.Delete = function (g, m, t) { t.target.Delete(); };
            return FacturesService;
        }());
        internal.FacturesService = FacturesService;
        internal.service = new FacturesService();
        function SearchModal() {
            if (internal.v)
                return internal.v;
            internal.v = new Common_1.UI.Modals.ModalEditer('Search.edit');
            internal.v.OkTitle('Search');
            internal.v.Canceltitle('Cancel');
            internal.v.Title('Facture Searcher');
            return internal.v;
        }
        internal.SearchModal = SearchModal;
    })(internal || (internal = {}));
});
