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
define(["require", "exports", "../../../js/UI", "../../../js/Corelib", "../../../js/Models", "../Common", "../../../js/Filters", "../Search"], function (require, exports, UI_1, Corelib_1, Models_1, Common_1, Filters_1, Search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GData;
    Common_1.GetVars(function (v) {
        GData = v;
        return false;
    });
    var EtatBases = /** @class */ (function (_super) {
        __extends(EtatBases, _super);
        function EtatBases(Name, Caption, Title, tableTemplate) {
            var _this = _super.call(this, Name, Caption) || this;
            _this.tableTemplate = tableTemplate;
            _this.HasSearch = UI_1.UI.SearchActionMode.Validated;
            _this.serv = new VersmentBaseServiceBar();
            return _this;
        }
        EtatBases.prototype.OnKeyDown = function (e) {
            if (!this.adapter.OnKeyDown(e)) {
                if (e.keyCode == UI_1.UI.Keys.F1) {
                    this.getHelp({
                        "Enter": "Open Transaction",
                        "Suppr": "Delete Transaction",
                        "F3": "Deep Searche",
                        "F4": "New Etat"
                    });
                }
                else if (e.keyCode === UI_1.UI.Keys.F4)
                    this.btnOpen();
                else if (e.keyCode == UI_1.UI.Keys.Enter) {
                    var x = this.adapter.SelectedItem;
                    if (x)
                        this.Open(x);
                }
                else if (e.keyCode === UI_1.UI.Keys.Delete) {
                    var x = this.adapter.SelectedItem;
                    if (x)
                        this.Delete();
                }
                if (e.keyCode == UI_1.UI.Keys.Left)
                    this.paginator.Previous();
                else if (e.keyCode == UI_1.UI.Keys.Right)
                    this.paginator.Next();
                else
                    return _super.prototype.OnKeyDown.call(this, e);
            }
            e.preventDefault();
            e.stopPropagation();
            return true;
        };
        EtatBases.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            this.adapter = new UI_1.UI.ListAdapter(this.tableTemplate);
            this.adapter.AcceptNullValue = false;
            this.adapter.ItemStyle = [];
            this.paginator = new UI_1.UI.Paginator(21);
            this.paginator.OnInitialized = function (p) {
                (_this.adapter).OnInitialized = function (l) {
                    l.Source =
                        _this.paginationList = Corelib_1.collection.ExList.New(_this.searchList = Corelib_1.collection.ExList.New(_this.getSource(), new Filters_1.filters.list.StringFilter()), _this.paginator.Filter);
                    _this.paginator.BindMaxToSourceCount(_this.searchList);
                };
                _this.paginator.Content = _this.adapter;
            };
            this.head = new UI_1.UI.TControl('templates.transferHeader', this.getSource());
            this.Add(this.head);
            this.Add(this.paginator);
        };
        EtatBases.prototype.OnDeepSearch = function () {
            var _this = this;
            if (!this._deepSearch)
                this._deepSearch = new Search_1.SearchData.Etats;
            this._deepSearch.Open(function (x) {
                var t = _this.searchList.Filter == _this._deepSearch;
                _this.searchList.Filter = _this._deepSearch;
                if (t)
                    _this.searchList.Reset();
                var xx;
            });
        };
        EtatBases.prototype.setSource = function (v) {
            { }
            this.head.Data = v;
            if (this.searchList)
                this.searchList.Source = v;
        };
        EtatBases.prototype.OnSearche = function (o, n) {
            this.searchList.Filter.Patent = new Filters_1.filters.list.StringPatent(n);
        };
        EtatBases.prototype.GetLeftBar = function () { return this.serv.GetLeftBar(this); };
        EtatBases.prototype.GetRightBar = function () { return this.serv.GetRightBar(this); };
        return EtatBases;
    }(UI_1.UI.NavPanel));
    exports.EtatBases = EtatBases;
    var Etats = /** @class */ (function (_super) {
        __extends(Etats, _super);
        function Etats(isFrn) {
            var _this = _super.call(this, isFrn ? "fournisseurEtat" : "clientEtat", isFrn ? "Situation Fournisseur" : "Situation  Clientele", isFrn ? "Situation  Fournisseur" : "Situation  Clientele", isFrn ? "etatTransfers.atable" : "etatTransfers.table") || this;
            _this.isFrn = isFrn;
            _this.source = new Models_1.models.EtatTransfers(null);
            return _this;
        }
        Etats.prototype.Delete = function () {
            deleteTransaction(this.adapter.SelectedItem, this.isFrn);
        };
        Etats.prototype.Open = function (v) {
            openTransaction(v, this.isFrn);
        };
        Etats.prototype.btnDeleteVersment = function () {
        };
        Etats.prototype.btnAddVersment = function () {
            throw new Error("Method not implemented.");
        };
        Etats.prototype.btnSearch = function () {
            throw new Error("Method not implemented.");
        };
        Etats.prototype.btnVersmentOfOwner = function () {
            throw new Error("Method not implemented.");
        };
        Etats.prototype.Update = function () {
            var o = this.source.Owner;
            if (o instanceof Models_1.models.Client)
                this.ExecuteCLient(o);
            else if (o instanceof Models_1.models.Fournisseur)
                this.ExecuteFournisseur(o);
            else
                this.btnOpen();
        };
        Etats.prototype.btnOpen = function () {
            var _this = this;
            if (this.isFrn)
                GData.apis.Fournisseur.Select(function (n, data, iss) {
                    if (iss === UI_1.UI.MessageResult.ok)
                        _this.ExecuteFournisseur(data);
                }, null);
            else
                GData.apis.Client.Select(function (n, data, iss) {
                    if (iss === UI_1.UI.MessageResult.ok)
                        _this.ExecuteCLient(data);
                }, null);
        };
        Etats.prototype.check = function (si) {
            throw new Error("Method not implemented.");
        };
        Etats.prototype.getSource = function () {
            return this.source;
        };
        Etats.prototype.ExecuteCLient = function (l) {
            var _this = this;
            this.setSource(this.source);
            this.source.Clear();
            GData.requester.Request(Models_1.models.EtatTransfers, "GET", this.source, { Id: l.Id, "IsAchat": false }, function (req, json, iss) {
                _this.source.Owner = l;
                _this.source.ReOrder();
                //this.source.OrderBy((a, b) => (b.Date.getTime() - a.Date.getTime()) as any);
            });
        };
        Etats.prototype.ExecuteFournisseur = function (l) {
            var _this = this;
            this.source.Clear();
            GData.requester.Request(Models_1.models.EtatTransfers, "GET", this.source, { Id: l.Id, "IsAchat": true }, function (req, json, iss) {
                _this.source.Owner = l;
                _this.source.ReOrder();
                //this.source.OrderBy((a, b) => (b.Date.getTime() - a.Date.getTime()) as any);
            });
        };
        return Etats;
    }(EtatBases));
    exports.Etats = Etats;
    var VersmentBaseServiceBar = /** @class */ (function () {
        function VersmentBaseServiceBar() {
        }
        VersmentBaseServiceBar.prototype.handleSerices = function (s, e, p) {
            var t = p.t.target;
            if (!t)
                return;
            var c = UI_1.UI.Glyphs;
            switch (p.c) {
                case c.search:
                    return t.btnOpen();
            }
        };
        VersmentBaseServiceBar.prototype.GetLeftBar = function (target) {
            var _this = this;
            this.target = target;
            if (!this.lb) {
                var r = this.lb = new UI_1.UI.Navbar();
                Common_1.funcs.setTepmlate(r, this, this.handleSerices);
                r.OnInitialized = function (r) {
                    //this._add = new UI.Glyph(UI.Glyphs.plusSign, false, 'New');
                    //this._open = new UI.Glyph(UI.Glyphs.open, false, 'Open');
                    _this._search = new UI_1.UI.Glyph(UI_1.UI.Glyphs.search, false, 'Search');
                    //this._versOf = new UI.Glyph(UI.Glyphs.euro, false, 'Versment Of');
                    r.AddRange([
                        /*this._add, this._open, funcs.createSparator(), funcs.createSparator(),*/ _this._search /*, this._versOf*/
                    ]);
                };
            }
            return this.lb;
        };
        VersmentBaseServiceBar.prototype.GetRightBar = function (target) {
            var _this = this;
            this.target = target;
            if (!this.rb) {
                var r = this.rb = new UI_1.UI.Navbar();
                Common_1.funcs.setTepmlate(r, this, this.handleSerices);
                r.OnInitialized = function (r) {
                    _this._delete = new UI_1.UI.Glyph(UI_1.UI.Glyphs.fire, false, 'Delete');
                    r.AddRange([_this._delete]);
                };
            }
            return this.rb;
        };
        return VersmentBaseServiceBar;
    }());
    Corelib_1.ScopicCommand.Register({
        Invoke: function (n, d, s) {
            d.addEventListener('click', function (e) { return openTransaction(s.Value); });
            return false;
        }
    }, null, 'openTransaction');
    function openTransaction(v, isFrn) {
        var data;
        if (isFrn) {
            if (v.Type == Models_1.models.TransferType.Facture) {
                data = GData.__data.SFactures.GetById(v.TransactionId);
                if (data)
                    Corelib_1.Api.RiseApi("OpenSFacture", { data: data });
            }
            else {
                GData.apis.SVersment.Open(GData.apis.SVersment.Get(v.TransactionId), false);
            }
        }
        else {
            if (v.Type == Models_1.models.TransferType.Facture) {
                data = GData.__data.Factures.GetById(v.TransactionId);
                if (data)
                    Corelib_1.Api.RiseApi("OpenFacture", { data: data });
            }
            else {
                GData.apis.Versment.Open(GData.apis.Versment.Get(v.TransactionId), false);
            }
        }
    }
    function deleteTransaction(v, isFrn) {
        if (isFrn) {
            if (v.Type == Models_1.models.TransferType.Facture) {
                GData.apis.SFacture.Delete(true, GData.__data.SFactures.GetById(v.TransactionId), null);
            }
            else {
                GData.apis.SVersment.Delete(true, GData.apis.SVersment.Get(v.TransactionId), null);
            }
        }
        else {
            if (v.Type == Models_1.models.TransferType.Facture) {
                GData.apis.Facture.Delete(true, GData.__data.Factures.GetById(v.TransactionId), null);
            }
            else {
                GData.apis.Versment.Delete(true, GData.apis.Versment.Get(v.TransactionId), null);
            }
        }
    }
    Corelib_1.ScopicCommand.Register({
        Invoke: function (n, d, s) {
            d.addEventListener('click', function (e) { return openTransaction(s.Value, true); });
            return false;
        }
    }, null, 'openaTransaction');
});
//# sourceMappingURL=Revages.js.map