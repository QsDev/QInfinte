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
define(["require", "exports", "./Corelib", "./Models", "./UI"], function (require, exports, Corelib_1, Models_1, UI_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    var temp = "../templates/";
    var _system = new Corelib_1.collection.List(Corelib_1.mvc.MvcDescriptor);
    var ModelsViews = /** @class */ (function (_super) {
        __extends(ModelsViews, _super);
        function ModelsViews() {
            return _super.call(this, require) || this;
        }
        ModelsViews.prototype.Init = function () {
            _system.Add(new Corelib_1.mvc.MvcDescriptor('Article', Models_1.models.Article).Add(new Article()).Add(new OArticle()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('RegUser', Models_1.models.Login).Add(new RegUser()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('UnRegUser', Models_1.models.Login).Add(new UnRegUser()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('Factures', Models_1.models.Factures).Add(new FactureRow()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('Mail', Models_1.models.Mail).Add(new Mail()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('Product', Models_1.models.Product).Add(new Product()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('Category', Models_1.models.Category).Add(new Category()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('Price', Models_1.models.FakePrice).Add(new FakePricePrices()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('FProduct', Models_1.models.FakePrice).Add(new FakePrice()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('SFacture', Models_1.models.SFacture).Add(new SFactureRow()));
            _system.Add(new Corelib_1.mvc.MvcDescriptor('Agents', Models_1.models.Agents).Add(new Agents()));
            this.Add({ Url: '../../templates/Templates.html', OnError: null, OnSuccess: null });
            this.Add({ Url: '../../templates/AdminTemplates.html', OnError: null, OnSuccess: null });
            this.Add({ Url: '../../Controls/StretchyButton.html', OnError: null, OnSuccess: null });
            this.Add({ Url: '../../components/qui/dom.html', OnError: null, OnSuccess: null });
            this.Add({ Url: '../../components/Canvas3D/dom.html', OnError: null, OnSuccess: null });
            this.Add({ Url: '../../components/StrechyButton/dom.html', OnError: null, OnSuccess: null });
            this.Add({ Url: '../../components/ClearTabe/index.html', OnError: null, OnSuccess: null });
            window.init = this;
            if (Math.sin(0) == 0)
                return;
        };
        ModelsViews.prototype.Dispose = function () { _system.Clear(); };
        Object.defineProperty(ModelsViews.prototype, "System", {
            get: function () { return _system; },
            enumerable: true,
            configurable: true
        });
        return ModelsViews;
    }(Corelib_1.mvc.Initializer));
    exports.ModelsViews = ModelsViews;
    function crt(_dom, dbbind, dbbjob, dbtwoway, attributes, styles, child) {
        var dom;
        if (typeof _dom === 'string')
            dom = document.createElement(_dom);
        else
            dom = _dom;
        if (dbbind)
            dom.setAttribute('db-bind', dbbind);
        if (dbbjob)
            dom.setAttribute('db-job', dbbjob);
        if (dbtwoway != undefined)
            dom.setAttribute('db-twoway', dbtwoway);
        if (attributes)
            for (var i_1 in attributes)
                dom.setAttribute(i_1, attributes[i_1]);
        if (styles)
            for (var i in styles)
                dom.style[i] = styles[i];
        if (child)
            for (var i_2 = 0; i_2 < child.length; i_2++)
                dom.appendChild(child[i_2]);
        return dom;
    }
    var d;
    Corelib_1.bind.Register({
        Name: 'checkok', OnInitialize: (d = function (j, i) {
            if (j.Scop.Value)
                j.dom.classList.add('glyphicon', 'glyphicon-ok');
            else
                j.dom.classList.remove('glyphicon-ok');
        }), Todo: d
    });
    Corelib_1.bind.Register({
        Name: 'openmail', OnInitialize: (d = function (j, i) {
            j.addEventListener('onclick', 'dblclick', {
                handleEvent: function (e) {
                    var t = j.Scop.Value;
                    if (t) {
                        UI_1.UI.Modal.ShowDialog(t.Subject, t.Body, undefined, "Close", null);
                    }
                }, Owner: _this
            });
        }), Todo: d
    });
    Corelib_1.bind.Register({
        Name: 'tostring', OnInitialize: (d = function (ji, i) {
            var b = ji.Scop.Value || '';
            if (typeof b !== 'string')
                b = (b && b.toString()) || '';
            if (b.length > 45)
                b = b.substring(0, 45) + '...';
            ji.dom.textContent = b;
        }), Todo: d
    });
    var Article = /** @class */ (function (_super) {
        __extends(Article, _super);
        function Article() {
            var _this = _super.call(this, 'cart') || this;
            var t = document.createElement('tr');
            var th = document.createElement('td');
            t.setAttribute('scope', 'row');
            var an = crt(document.createElement('td'), 'Product.Name', 'label');
            var qt = crt(document.createElement('td'), 'Count', 'label');
            var pr = crt(document.createElement('td'), 'Price', 'price');
            var cn = document.createElement('td');
            cn.innerHTML = '<h4 class="pull-right activeShadow glyphicon glyphicon-open" style="margin-left:5px;margin-right:5px" db-job="art-add"></h4><h4 class="pull-right activeShadow glyphicon glyphicon-plus-sign" style="margin-left:5px;margin-right:5px" db-job="art-plus"></h4>    <h4 class="pull-right glyphicon fa-book glyphicon-minus-sign" style="margin-left: 5px; margin-right: 5px" db-job="art-minus"></h4>    <h4 class="pull-right glyphicon fa-book glyphicon-remove-circle" style="margin-left: 5px; margin-right: 5px" db-job="art-remove"></h4><span db-job="showIf" db-bind="$modify" />';
            cn.style.maxWidth = '100px';
            t.appendChild(th);
            t.appendChild(an);
            t.appendChild(qt);
            t.appendChild(pr);
            t.appendChild(cn);
            _this._Shadow = t;
            return _this;
        }
        Article.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return Article;
    }(Corelib_1.mvc.ITemplate));
    var RegUser = /** @class */ (function (_super) {
        __extends(RegUser, _super);
        function RegUser() {
            var _this = _super.call(this, 'row') || this;
            var t = document.createElement('tr');
            t.setAttribute('scope', 'row');
            var vu;
            var st;
            var cols = [
                crt(document.createElement('td'), 'Username', 'label', false),
                crt(document.createElement('td'), 'Client.FullName', 'label', false),
                crt(document.createElement('td'), 'Client.Tel', 'label', false),
                crt(document.createElement('td'), 'Client.Email', 'label', false),
                crt(document.createElement('td'), 'Client.Job', 'label', false),
                crt(vu = document.createElement('td'), undefined, undefined),
            ];
            vu.innerHTML =
                '<span class="pull-right activeShadow glyphicon glyphicon-check" style="margin-left:5px;margin-right:5px" db-job="validateuser"></span>' +
                    '<span class="pull-right glyphicon glyphicon-fire" style="margin-left: 5px; margin-right: 5px" db-job="removeuser"></span>';
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        RegUser.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return RegUser;
    }(Corelib_1.mvc.ITemplate));
    var UnRegUser = /** @class */ (function (_super) {
        __extends(UnRegUser, _super);
        function UnRegUser() {
            var _this = _super.call(this, 'row') || this;
            var t = document.createElement('tr');
            //var th = document.createElement('th');
            t.setAttribute('scope', 'row');
            //UserName FullName Tel Email Job
            var vu;
            var st;
            var cols = [
                crt(document.createElement('td'), 'Username', 'label', false),
                crt(document.createElement('td'), 'Client.FullName', 'label', false),
                crt(document.createElement('td'), 'Client.Tel', 'label', false),
                crt(document.createElement('td'), 'Client.Email', 'label', false),
                crt(document.createElement('td'), 'Client.Job', 'label', false),
                crt(vu = document.createElement('td'), undefined, undefined),
            ];
            vu.innerHTML =
                '<span class="pull-right activeShadow glyphicon glyphicon-lock" style="margin-left:5px;margin-right:5px" db-job="lockuser"></span>' +
                    '<span class="pull-right glyphicon glyphicon-fire" style="margin-left: 5px; margin-right: 5px" db-job="removeuser"></span>';
            vu.style.maxWidth = "auto";
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        UnRegUser.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return UnRegUser;
    }(Corelib_1.mvc.ITemplate));
    var Mail = /** @class */ (function (_super) {
        __extends(Mail, _super);
        function Mail() {
            var _this = _super.call(this, 'row') || this;
            var t = crt(document.createElement('tr'), undefined, 'openmail', false);
            t.setAttribute('scope', 'row');
            var vu;
            var st;
            var t1 = document.createElement('td');
            t1.appendChild(crt(document.createElement('span'), 'Visited', 'checkok', false));
            var cols = [
                t1,
                crt(document.createElement('td'), 'From.FullName', 'label', false),
                crt(document.createElement('td'), 'To', 'label', false),
                crt(document.createElement('td'), 'Subject', 'label', false),
                crt(document.createElement('td'), 'Body', 'tostring', false),
                crt(document.createElement('td'), 'TargetId', 'label', false),
                crt(vu = document.createElement('td'), undefined, undefined),
            ];
            vu.innerHTML =
                '<span class="pull-right activeShadow glyphicon glyphicon-lock" style="margin-left:5px;margin-right:5px" db-job="mailvisite"></span>' +
                    '<span class="pull-right glyphicon glyphicon-fire" style="margin-left: 5px; margin-right: 5px" db-job="maildelete"></span>';
            vu.style.maxWidth = "auto";
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        Mail.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return Mail;
    }(Corelib_1.mvc.ITemplate));
    var FactureRow = /** @class */ (function (_super) {
        __extends(FactureRow, _super);
        function FactureRow() {
            var _this = _super.call(this, 'row') || this;
            var t = crt(document.createElement('tr'), undefined, 'openafacture', false, { 'db-exec': '.IsValidated->factureStat' });
            t.setAttribute('scope', 'row');
            var vu;
            var cols = [
                crt(document.createElement('td'), 'Ref', 'label', false),
                crt(document.createElement('td'), 'Date', 'date', false),
                crt(document.createElement('td'), 'Client.FullName', 'label', false),
                crt(document.createElement('td'), 'NArticles', 'label', false),
                crt(document.createElement('td'), 'Total', 'label', false),
                crt(vu = document.createElement('td'), undefined, undefined),
            ];
            vu.innerHTML =
                '<span class="pull-right activeShadow glyphicon glyphicon-check" style="margin-left:5px;margin-right:5px" db-job="show" db-bind="IsValidated" target="0" db-data="none,"></span>' +
                    '<span class="pull-right glyphicon glyphicon-record" style="margin-left: 5px; margin-right: 5px" db-job="show" db-bind="IsOpen" target="0" db-data="none,"></span>';
            vu.style.maxWidth = "auto";
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        FactureRow.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return FactureRow;
    }(Corelib_1.mvc.ITemplate));
    var SFactureRow = /** @class */ (function (_super) {
        __extends(SFactureRow, _super);
        function SFactureRow() {
            var _this = _super.call(this, 'row') || this;
            var t = crt(document.createElement('tr'), undefined, 'openasfacture', false, { 'db-exec': '.IsValidated->sfactureStat' });
            t.setAttribute('scope', 'row');
            var vu;
            var cols = [
                crt(document.createElement('td'), 'Ref', 'label', false),
                crt(document.createElement('td'), 'Fournisseur.Name', 'label', false),
                crt(document.createElement('td'), 'Date', 'date', false),
                crt(document.createElement('td'), 'NArticles', 'label', false),
                crt(document.createElement('td'), 'Total', 'price', false),
                crt(document.createElement('td'), 'Observation', 'label', false),
                crt(vu = document.createElement('td'), undefined, undefined),
            ];
            vu.innerHTML =
                '<span class="pull-right activeShadow glyphicon glyphicon-check" style="margin-left:5px;margin-right:5px" db-job="show" db-bind="IsValidated" target="0" db-data="none,"></span>' +
                    '<span class="pull-right glyphicon glyphicon-record" style="margin-left: 5px; margin-right: 5px" db-job="show" db-bind="IsOpen" target="0" db-data="none,"></span>';
            vu.style.maxWidth = "auto";
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        SFactureRow.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return SFactureRow;
    }(Corelib_1.mvc.ITemplate));
    var Product = /** @class */ (function (_super) {
        __extends(Product, _super);
        function Product() {
            var _this = _super.call(this, 'row') || this;
            var t = crt(document.createElement('tr'), undefined, 'openproduct', false);
            t.setAttribute('scope', 'row');
            var st;
            var t1 = document.createElement('td');
            var z;
            var cols = [
                crt(document.createElement('td'), 'Category', 'tostring', false),
                crt(document.createElement('td'), 'Name', 'label', false),
                crt(document.createElement('td'), 'Dimention', 'label', false),
                crt(document.createElement('td'), 'SerieName', 'tostring', false),
                crt(document.createElement('td'), 'Quality', 'enum2string', false, { type: 'models.Quality', rtype: 'number' }, { maxWidth: '70px' }),
                crt(document.createElement('td'), 'Qte', 'label', false),
                crt(document.createElement('td'), 'Value', 'price', false),
                z = crt(document.createElement('td'))
            ];
            z.innerHTML = '<span type="button" db-job="openfsprice" class="btn btn-sm btn-danger glyphicon glyphicon-usd pull-right"></span>';
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        Product.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return Product;
    }(Corelib_1.mvc.ITemplate));
    var OArticle = /** @class */ (function (_super) {
        __extends(OArticle, _super);
        function OArticle() {
            var _this = _super.call(this, 'orow') || this;
            var t = crt(document.createElement('tr'));
            t.setAttribute('scope', 'row');
            var cols = [
                crt('td', null, null, true, null, null, [crt('input', 'Count', 'number', true, { class: "form-control unborder", placeholder: "Qte" })]),
                crt('td', null, null, true, null, null, [crt('input', 'Product', 'auto-product', true, { "text-transform": "uppercase", class: "form-control unborder", placeholder: "Enter the Product Name" })]),
                crt('td', null, null, true, null, null, [crt('label', 'Product.Qte', 'number', false, { class: "form-control unborder" })]),
                crt('td', null, null, true, null, null, [crt('label', 'Product.PSel', 'number', false, { class: "form-control unborder" })]),
                crt('td', null, null, true, null, null, [crt('label', 'Product', 'number', true, { 'readonly': '', 'db-filter': "fackeprice:0", class: "form-control unborder", placeholder: "Help" })]),
                crt('td', null, null, true, null, null, [crt('input', 'Product', 'reduction', true, { class: "form-control unborder", placeholder: "Help" })]),
                crt('td', null, null, true, null, null, [crt('label', 'Price', 'number', true, { class: "form-control unborder" })]),
                crt('td', null, null, true, null, null, [crt('button', 'Product', 'openfprice', false, { type: "button", autofocus: "true", class: "btn btn-sm btn-danger glyphicon glyphicon-usd pull-right" })])
            ];
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        OArticle.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return OArticle;
    }(Corelib_1.mvc.ITemplate));
    function createButtonMenu() {
        var x = '<div class="dropdown">' +
            '<button class="btn btn-primary dropdown-toggle" id="menu1" type="button" data-toggle="dropdown" db-cmd="opendropdown"> &#160;Appliquer le &#160;&#160; ' +
            '<span class="caret"></span></button>' +
            '<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">' +
            '<li class="dropdown-header">Choisir la method</li>' +
            '<li role="presentation"><a role="menuitem" db-job="applyprice" method="moyen">Prix Moyen Pondere </a></li>' +
            '<li role="presentation"><a role="menuitem" db-job="applyprice" method="percent" class="disabled">Precentage</a></li>' +
            '<li role="presentation" class="divider"></li>' +
            '<li role="presentation"><a role="menuitem" db-job="applyprice" method="new">Nouveau prix d\'achat</a></li>' +
            '<li role="presentation"><a role="menuitem" db-job="applyprice" method="old">Ancien prix d\'achat</a></li>' +
            '<li role="presentation" class="divider"></li>' +
            '<li role="presentation"><a role="menuitem" db-job="applyprice" method="costum">marche</a></li>    ' +
            '</ul>' +
            '</div>';
        var td = document.createElement('td');
        td.innerHTML = x;
        return td;
    }
    var FakePrice = /** @class */ (function (_super) {
        __extends(FakePrice, _super);
        function FakePrice() {
            var _this = _super.call(this, 'row') || this;
            var t = crt(document.createElement('tr'), null, null, null /*, { 'db-exec': '^.Facture.IsOpen->editable'}*/);
            t.setAttribute('scope', 'row');
            var app = crt('span', 'ApplyPrice', "applyPriceStat", false, null, { display: 'none' });
            t.appendChild(app);
            var st;
            var t1 = document.createElement('td');
            var z, p, q, ps;
            var cols = [
                q = crt('td', null, null, true, null, null, [crt('input', 'Qte', 'number', true, { class: "form-control unborder", placeholder: "Qte" })]),
                p = crt('td', null, null, true, null, null, [crt('input', 'Product', 'auto-product', true, { "text-transform": "uppercase", class: "form-control unborder", placeholder: "Enter the Product Name" })]),
                ps = crt('td', null, null, true, null, null, [crt('input', 'PSel', 'number', true, { class: "form-control unborder", placeholder: "Prix D\'Achat" })]),
                ps = crt('td', null, null, true, null, null, [crt('input', undefined, 'number', true, { 'db-filter': 'fackeprice:0', class: "form-control unborder", placeholder: "Prix D\'Vent" })]),
                z = createButtonMenu() || crt('td', null, null, true, null, null, [crt('button', undefined, 'openfprice', null, { type: "button", autofocus: "true", class: "btn btn-sm btn-danger glyphicon glyphicon-usd pull-right" })]),
            ];
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        FakePrice.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return FakePrice;
    }(Corelib_1.mvc.ITemplate));
    var FakePricePrices = /** @class */ (function (_super) {
        __extends(FakePricePrices, _super);
        function FakePricePrices() {
            var _this = _super.call(this, 'price') || this;
            var t = crt(document.createElement('tr'), undefined, 'dopenfprice', false);
            t.setAttribute('scope', 'row');
            var q;
            var cols = [
                crt(document.createElement('td'), 'Facture.Fournisseur.Name', 'label', false),
                crt(document.createElement('td'), 'Product.Name', 'label', false),
                crt(document.createElement('td'), 'Qte', 'number', false),
                crt(document.createElement('td'), 'PSel', 'number', false),
                crt(document.createElement('td'), 'Value', 'price', false),
                crt(document.createElement('td'), 'PValue', 'price', false),
                crt(document.createElement('td'), 'HWValue', 'price', false),
                crt(document.createElement('td'), 'WValue', 'price', false),
            ];
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        FakePricePrices.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return FakePricePrices;
    }(Corelib_1.mvc.ITemplate));
    var Category = /** @class */ (function (_super) {
        __extends(Category, _super);
        function Category() {
            var _this = _super.call(this, 'row') || this;
            var t = crt(document.createElement('tr'), undefined, 'opencategory', false);
            t.setAttribute('scope', 'row');
            var q;
            var cols = [
                crt(document.createElement('td'), "Name", 'tostring', true),
                crt(document.createElement('td'), 'Base', 'tostring', true),
                crt(document.createElement('td'), 'Base.Base', 'tostring', true)
            ];
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        Category.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return Category;
    }(Corelib_1.mvc.ITemplate));
    var Agents = /** @class */ (function (_super) {
        __extends(Agents, _super);
        function Agents() {
            var _this = _super.call(this, 'row') || this;
            /*
            <tr  db-twoway="0">
                <td db-bind="Person.FullName" db-job="label" db-twoway="0"></td>
                <td db-bind="Person.Tel" db-job="label" db-twoway="0"></td>
                <td db-bind="Person.Email" db-job="label" db-twoway="0"></td>
                <td style="max-width:75px">
                <button type="button" db-bind='Person' db-twoway='0' db-job='openclient' class="btn b btn-default pull-right">Edit</button></td></tr>
            */
            var t = crt(document.createElement('tr'), undefined, 'opencategory', false);
            t.setAttribute('scope', 'row');
            var q;
            var cols = [
                crt(document.createElement('td'), 'Person.FullName', 'tostring', false),
                crt(document.createElement('td'), 'Person.Tel', 'tostring', false),
                crt(document.createElement('td'), 'Person.Email', 'tostring', false),
                crt('td', null, null, null, null, { 'max-width': '75px' }, [
                    crt('button', 'Person', 'openclient', false, { type: "button", class: "btn b btn-default pull-right" }, null, [document.createTextNode('Edit')])
                ])
            ];
            for (var i = 0; i < cols.length; i++)
                t.appendChild(cols[i]);
            _this._Shadow = t;
            return _this;
        }
        Agents.prototype.Create = function () {
            return this._Shadow.cloneNode(true);
        };
        return Agents;
    }(Corelib_1.mvc.ITemplate));
});
//# sourceMappingURL=ModelsViews.js.map