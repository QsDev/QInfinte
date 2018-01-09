import { UI } from '../../js/UI';
import { models } from "../../js/Models";
import { Services } from './Services/QServices';
export declare namespace Pages {
    class SearchPage extends UI.Page implements UI.IService {
        private paginator;
        private searchList;
        private paginationList;
        private pstore;
        constructor(app: UI.App);
        getSuggessions(): models.Products;
        initialize(): void;
        OnSearche(o: string, n: string): void;
        private fs;
        GetLeftBar(): any;
        Update(): void;
        Callback(args: any): void;
        Handled(): boolean;
    }
    class FacturesPage extends UI.Page implements UI.IService {
        private paginator;
        private pagination;
        private searchList;
        private paginationList;
        private paginationFilter;
        private pstore;
        constructor(app: UI.App);
        getSuggessions(): models.Factures;
        initialize(): void;
        OnSearche(o: string, n: string): void;
        GetLeftBar(): Services.FacturesService;
        private service;
        Callback(args: any): void;
        Handled(): boolean;
    }
    class FacturePage extends UI.Page {
        private service;
        private rservice;
        private modal;
        private c;
        private filter;
        readonly Modal: UI.Modal;
        constructor(app: UI.App);
        private adapter;
        initialize(): void;
        Update(): void;
        GetLeftBar(): Services.FactureService;
        GetRightBar(): Services.RFactureServices;
        Callback(args: any): void;
        Handled(): boolean;
    }
    class CostumersPage extends UI.Page {
        private paginator;
        private searchList;
        private paginationList;
        costumers: UI.ListAdapter<models.Client, any>;
        private service;
        constructor(app: UI.App);
        private selectedItem;
        initialize(): void;
        OnSearche(o: string, n: string): void;
        SelectedClient: models.Client;
        GetLeftBar(): Services.MyClientsService;
        getSuggessions(): models.Costumers;
        Callback(args: any): void;
        Handled(): boolean;
    }
}
