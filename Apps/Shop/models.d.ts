import { utils, bind } from '../../js/Corelib';
import { models as imodels } from "../../js/Models";
import { base } from '../../js/System';
export declare namespace ikmodels {
    class FactureSearch extends bind.DObject implements utils.IPatent<imodels.Facture>, IFS {
        static DPClient: bind.DProperty<imodels.Client, FactureSearch>;
        static DPVendeur: bind.DProperty<imodels.Agent, FactureSearch>;
        static DPDate: bind.DProperty<base.DateVecteur, FactureSearch>;
        static DPDateLivraison: bind.DProperty<base.DateVecteur, FactureSearch>;
        static DPTotal: bind.DProperty<base.NumberVecteur, FactureSearch>;
        static DPSold: bind.DProperty<base.NumberVecteur, FactureSearch>;
        static DPIsValidated: bind.DProperty<boolean, FactureSearch>;
        static __fields__(): (bind.DProperty<imodels.Client, FactureSearch> | bind.DProperty<imodels.Agent, FactureSearch> | bind.DProperty<base.DateVecteur, FactureSearch> | bind.DProperty<base.NumberVecteur, FactureSearch> | bind.DProperty<boolean, FactureSearch>)[];
        Client: imodels.Client;
        Vendeur: imodels.Agent;
        Date: base.DateVecteur;
        DateLivraison: any;
        Total: base.NumberVecteur;
        Sold: base.NumberVecteur;
        IsValidated: boolean;
        constructor();
        Check(s: imodels.Facture): boolean;
        equals(p: IFS): boolean;
        ToInterface(): IFS;
    }
    interface IFS extends utils.IPatent<imodels.Facture> {
        Client: imodels.Client;
        Vendeur: imodels.Agent;
        Date: base.DateVecteur;
        DateLivraison: base.DateVecteur;
        Total: base.NumberVecteur;
        Sold: base.NumberVecteur;
        IsValidated: boolean;
    }
    class FSFilter extends utils.Filter<imodels.Facture, IFS> {
        private fs;
        private ifs;
        constructor(fs: FactureSearch);
        protected convertFromString(x: string): IFS;
        Begin(deb: number, count: number): void;
        IsMatch(index: number, item: imodels.Facture): boolean;
    }
}
export declare namespace ikmodels {
    class SFactureSearch extends bind.DObject implements utils.IPatent<imodels.SFacture>, ISFS {
        static DPFournisseur: bind.DProperty<imodels.Fournisseur, SFactureSearch>;
        static DPAchteur: bind.DProperty<imodels.Agent, SFactureSearch>;
        static DPValidateur: bind.DProperty<imodels.Agent, SFactureSearch>;
        static DPDate: bind.DProperty<base.DateVecteur, SFactureSearch>;
        static DPTotal: bind.DProperty<base.NumberVecteur, SFactureSearch>;
        static DPSold: bind.DProperty<base.NumberVecteur, SFactureSearch>;
        static DPIsValidated: bind.DProperty<boolean, SFactureSearch>;
        static __fields__(): (bind.DProperty<imodels.Fournisseur, SFactureSearch> | bind.DProperty<imodels.Agent, SFactureSearch> | bind.DProperty<base.DateVecteur, SFactureSearch> | bind.DProperty<base.NumberVecteur, SFactureSearch> | bind.DProperty<boolean, SFactureSearch>)[];
        Fournisseur: imodels.Fournisseur;
        Achteur: imodels.Agent;
        Validateur: imodels.Agent;
        Date: base.DateVecteur;
        Total: base.NumberVecteur;
        Sold: base.NumberVecteur;
        IsValidated: boolean;
        constructor();
        Check(s: imodels.SFacture): boolean;
        equals(p: ISFS): boolean;
        ToInterface(): ISFS;
    }
    interface ISFS extends utils.IPatent<imodels.SFacture> {
        Fournisseur: imodels.Fournisseur;
        Achteur: imodels.Agent;
        Validateur: imodels.Agent;
        Date: base.DateVecteur;
        Total: base.NumberVecteur;
        Sold: base.NumberVecteur;
        IsValidated: boolean;
    }
    class SFSFilter extends utils.Filter<imodels.SFacture, ISFS> {
        private fs;
        private ifs;
        constructor(fs: SFactureSearch);
        protected convertFromString(x: string): ISFS;
        Begin(deb: number, count: number): void;
        IsMatch(index: number, item: imodels.SFacture): boolean;
    }
}
