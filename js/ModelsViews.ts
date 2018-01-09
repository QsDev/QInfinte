import { encoding ,bind, mvc,basic,collection} from './Corelib';
import { models } from "./Models";
import { UI } from "./UI";
import {context} from './context';
import Client = require("./Client");;

declare var require: (modules: string, onsuccss?: (result: any) => void, onerror?: (result: any) => void, context?: any) => void;
var temp = "../templates/";
var _system: collection.List<mvc.MvcDescriptor> = new collection.List<mvc.MvcDescriptor>(mvc.MvcDescriptor);
export class ModelsViews extends mvc.Initializer {
    constructor() {
        super(require);                
    }

    Init() {
        
        _system.Add(new mvc.MvcDescriptor('Article', models.Article).Add(new Article()).Add(new OArticle()));
        _system.Add(new mvc.MvcDescriptor('RegUser', models.Login).Add(new RegUser()));
        _system.Add(new mvc.MvcDescriptor('UnRegUser', models.Login).Add(new UnRegUser()));
        _system.Add(new mvc.MvcDescriptor('Factures', models.Factures).Add(new FactureRow()));
        _system.Add(new mvc.MvcDescriptor('Mail', models.Mail).Add(new Mail()));
        _system.Add(new mvc.MvcDescriptor('Product', models.Product).Add(new Product()));
        _system.Add(new mvc.MvcDescriptor('Category', models.Category).Add(new Category()));
        _system.Add(new mvc.MvcDescriptor('Price', models.FakePrice).Add(new FakePricePrices()));
        _system.Add(new mvc.MvcDescriptor('FProduct', models.FakePrice).Add(new FakePrice()));
        _system.Add(new mvc.MvcDescriptor('SFacture', models.SFacture).Add(new SFactureRow()));
        _system.Add(new mvc.MvcDescriptor('Agents', models.Agents).Add(new Agents()));

        this.Add({ Url: '../../templates/Templates.html', OnError: null, OnSuccess: null });
        this.Add({ Url: '../../templates/AdminTemplates.html', OnError: null, OnSuccess: null });
        this.Add({ Url: '../../Controls/StretchyButton.html', OnError: null, OnSuccess: null });
        this.Add({ Url: '../../components/qui/dom.html', OnError: null, OnSuccess: null });
        this.Add({ Url: '../../components/Canvas3D/dom.html', OnError: null, OnSuccess: null });
        this.Add({ Url: '../../components/StrechyButton/dom.html', OnError: null, OnSuccess: null });
        this.Add({ Url: '../../components/ClearTabe/index.html', OnError: null, OnSuccess: null });
        
        (window as any).init = this;
        if (Math.sin(0) == 0) return;
        
    }
    Dispose() { _system.Clear(); }
    get System(): collection.List<mvc.MvcDescriptor> {  return _system; }
}

function crt(_dom: HTMLElement | string, dbbind?, dbbjob?, dbtwoway?: boolean, attributes?: any, styles?: { [name: string]: string },child?:Node[]) {
    var dom: HTMLElement;
    if (typeof _dom === 'string') dom = document.createElement(_dom as string);
    else dom = _dom as any;
    if(dbbind) dom.setAttribute('db-bind', dbbind);
    if (dbbjob) dom.setAttribute('db-job', dbbjob);
    if (dbtwoway != undefined) dom.setAttribute('db-twoway', dbtwoway as any);
    if (attributes)
        for (let i in attributes)
            dom.setAttribute(i, attributes[i]);

    if (styles)
        for (var i in styles)
            dom.style[i] = styles[i];
    if (child)
        for (let i = 0; i < child.length; i++)
            dom.appendChild(child[i]);
    return dom;
}
var d;
bind.Register({
    Name: 'checkok', OnInitialize: (d = (j, i) => {
        if (j.Scop.Value)
            j.dom.classList.add('glyphicon', 'glyphicon-ok');
        else j.dom.classList.remove('glyphicon-ok');
    }), Todo: d
});
bind.Register({
    Name: 'openmail', OnInitialize: (d = (j: bind.JobInstance, i) => {
        j.addEventListener('onclick', 'dblclick', {
            handleEvent: (e) => {
                var t = j.Scop.Value as models.Mail;
                if (t) {
                    UI.Modal.ShowDialog(t.Subject, t.Body, undefined, "Close", null);
                }
            }, Owner: this
        });
    }), Todo: d
});
bind.Register({
    Name: 'tostring', OnInitialize: (d = (ji: bind.JobInstance, i) => {
        var b = ji.Scop.Value as string || '';        
        if (typeof b !== 'string') b = (b && (<any>b).toString()) || '';
        if (b.length > 45) b = b.substring(0, 45) + '...';
        ji.dom.textContent = b;
    }), Todo: d
});

class Article extends mvc.ITemplate {
    constructor() {
        super('cart');
        var t = document.createElement('tr');
        var th = document.createElement('td'); t.setAttribute('scope', 'row');
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}
class RegUser extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = document.createElement('tr');
        t.setAttribute('scope', 'row');
        var vu: HTMLTableDataCellElement;
        var st: models.Client;
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}
class UnRegUser extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = document.createElement('tr');
        //var th = document.createElement('th');
        t.setAttribute('scope', 'row');
        //UserName FullName Tel Email Job
        var vu: HTMLTableDataCellElement;
        var st: models.Client;
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}

class Mail extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = crt(document.createElement('tr'), undefined, 'openmail', false);
        t.setAttribute('scope', 'row');
        var vu: HTMLTableDataCellElement;
        var st: models.Client;
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}
class FactureRow extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = crt(document.createElement('tr'), undefined, 'openafacture', false, { 'db-exec': '.IsValidated->factureStat' });
        t.setAttribute('scope', 'row');        
        var vu: HTMLTableDataCellElement;
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}

class SFactureRow extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = crt(document.createElement('tr'), undefined, 'openasfacture', false, { 'db-exec': '.IsValidated->sfactureStat' });
        t.setAttribute('scope', 'row');
        var vu: HTMLTableDataCellElement;       
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}

class Product extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = crt(document.createElement('tr'), undefined, 'openproduct', false);
        
        t.setAttribute('scope', 'row');
        
        var st: models.Client;
        var t1 = document.createElement('td');
        
        var z: HTMLElement;
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}
class OArticle extends mvc.ITemplate {
    constructor() {
        super('orow');
        var t = crt(document.createElement('tr'));
        t.setAttribute('scope', 'row');
        var cols = [
            crt('td', null, null, true, null, null, [crt('input', 'Count', 'number', true, { class: "form-control unborder", placeholder: "Qte" })]),
            crt('td', null, null, true, null, null, [crt('input', 'Product', 'auto-product', true, { "text-transform":"uppercase", class: "form-control unborder", placeholder: "Enter the Product Name" })]),
            crt('td', null, null, true, null, null, [crt('label', 'Product.Qte', 'number', false, { class: "form-control unborder" })]),
            crt('td', null, null, true, null, null, [crt('label', 'Product.PSel', 'number', false, { class: "form-control unborder" })]),
            crt('td', null, null, true, null, null, [crt('label', 'Product', 'number', true, { 'readonly': '', 'db-filter': "fackeprice:0", class: "form-control unborder", placeholder: "Help" })]),
            crt('td', null, null, true, null, null, [crt('input', 'Product', 'reduction', true, { class: "form-control unborder", placeholder: "Help" })]),
            crt('td', null, null, true, null, null, [crt('label', 'Price', 'number', true, { class: "form-control unborder" })]),
            crt('td', null, null, true, null, null, [crt('button', 'Product', 'openfprice', false, { type: "button", autofocus: "true", class: "btn btn-sm btn-danger glyphicon glyphicon-usd pull-right" })])
        ];      
        for (var i = 0; i < cols.length; i++)
            t.appendChild(cols[i]);
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}

function createButtonMenu() {
    var x = '<div class="dropdown">' +
                '<button class="btn btn-primary dropdown-toggle" id="menu1" type="button" data-toggle="dropdown" db-cmd="opendropdown"> &#160;Appliquer le &#160;&#160; ' +
                '<span class="caret"></span></button>' +
                '<ul class="dropdown-menu dropdown-menu-right" role="menu" aria-labelledby="menu1">' +
                    '<li class="dropdown-header">Choisir la method</li>'+
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

class FakePrice extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = crt(document.createElement('tr'), null, null, null/*, { 'db-exec': '^.Facture.IsOpen->editable'}*/);
        t.setAttribute('scope', 'row');
        var app = crt('span', 'ApplyPrice', "applyPriceStat", false, null, { display: 'none' });
        t.appendChild(app);
        var st: models.SFacture;
        var t1 = document.createElement('td');
        
        var z: HTMLElement, p: HTMLElement, q: HTMLElement, ps: HTMLElement;
        var cols = [
            q = crt('td', null, null, true, null, null, [crt('input', 'Qte', 'number', true, { class: "form-control unborder", placeholder: "Qte" })]),
            p = crt('td', null, null, true, null, null, [crt('input', 'Product', 'auto-product', true, { "text-transform": "uppercase", class: "form-control unborder", placeholder: "Enter the Product Name" })]),
            ps = crt('td', null, null, true, null, null, [crt('input', 'PSel', 'number', true, { class: "form-control unborder", placeholder: "Prix D\'Achat" })]),
            ps = crt('td', null, null, true, null, null, [crt('input', undefined, 'number', true, { 'db-filter': 'fackeprice:0', class: "form-control unborder", placeholder: "Prix D\'Vent" })]),
            z = createButtonMenu() || crt('td', null, null, true, null, null, [crt('button', undefined, 'openfprice', null, { type: "button", autofocus: "true", class: "btn btn-sm btn-danger glyphicon glyphicon-usd pull-right" })]),
        ];

        for (var i = 0; i < cols.length; i++)
            t.appendChild(cols[i]);
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}
class FakePricePrices extends mvc.ITemplate {
    constructor() {
        super('price');
        var t = crt(document.createElement('tr'), undefined, 'dopenfprice', false);
        t.setAttribute('scope', 'row');
		var q: HTMLElement;
		
		var cols = [
            crt(document.createElement('td'), 'Facture.Fournisseur.Name', 'label', false),
            crt(document.createElement('td'), 'Product.Name', 'label', false),
            crt(document.createElement('td'), 'Qte', 'number', false),
            crt(document.createElement('td'), 'PSel', 'number', false),
            crt(document.createElement('td'), 'Value', 'price', false),
            crt(document.createElement('td'), 'PValue', 'price', false),
            crt(document.createElement('td'), 'HWValue', 'price', false),
            crt(document.createElement('td'), 'WValue', 'price', false),            

            //crt('td', null, null, true, null, null, [crt('button', "Next", 'openfprice', null, { type: "button", autofocus: "true", class: "btn btn-sm btn-danger glyphicon glyphicon-circle-arrow-right pull-right" })]),
        ];
        for (var i = 0; i < cols.length; i++)
            t.appendChild(cols[i]);
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}

class Category extends mvc.ITemplate {
    constructor() {
        super('row');
        var t = crt(document.createElement('tr'), undefined, 'opencategory', false);
        t.setAttribute('scope', 'row');        
        var q: HTMLElement;
        var cols = [
            crt(document.createElement('td'), "Name", 'tostring',true),
            crt(document.createElement('td'), 'Base', 'tostring', true),
            crt(document.createElement('td'), 'Base.Base', 'tostring', true)
        ];
        for (var i = 0; i < cols.length; i++)
            t.appendChild(cols[i]);
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}
class Agents extends mvc.ITemplate {
    constructor() {
        super('row');

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
        var q: HTMLElement;
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
        this._Shadow = t;
    }
    private _Shadow: HTMLElement;
    Create(): HTMLElement {
        return this._Shadow.cloneNode(true) as HTMLElement;
    }
}