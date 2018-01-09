import { Agent } from './../Admin/Apis/Agent';
import { Article } from './../Admin/Apis/Article';
import { Category } from './../Admin/Apis/Category';
import { Client } from './../Admin/Apis/Client';
import { SFacture } from './../Admin/Apis/FactureAchat';
import { Facture } from './../Admin/Apis/FactureVent';
import { Fournisseur } from './../Admin/Apis/Fournisseur';
import { Product } from './../Admin/Apis/Product';
import { Revage } from './../Admin/Apis/Revage';
import { Versment } from './../Admin/Apis/Versment';
import { SVersment } from './../Admin/Apis/SVersment';
import { basics } from '../Basics';

export class ShopApis
{
    private vars:basics.vars;
    public Agent: Agent;
    public Article: Article;
    public Category: Category;
    public Client: Client;
    public SFacture: SFacture;
    public Facture: Facture;
    public Fournisseur: Fournisseur;
    public Product: Product;
    public Revage: Revage;
    public Versment: Versment;
    public SVersment: SVersment;

    constructor() {

    }
    Init(vars:basics.vars):this {
        this.vars = vars;
        this.Agent = new Agent(vars);
        this.Article = new Article(vars);
        this.Client = new Client(vars);
        this.Category = new Category(vars);
        this.SFacture = new SFacture(vars);
        this.Facture = new Facture(vars);
        this.Fournisseur = new Fournisseur(vars);
        this.Product = new Product(vars);
        this.Revage = new Revage(vars);
        this.Versment = new Versment(vars);
        this.SVersment = new SVersment(vars);
        return this;
    }
}
