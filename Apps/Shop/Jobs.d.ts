import { bind } from '../../js/Corelib';
import { models as imodels } from "../../js/Models";
import { models } from './../../js/models';
export declare namespace Filters {
    class FakePriceFilter extends bind.Filter<imodels.FakePrice, number> {
        private dbsvc;
        constructor(scop: bind.Scop, b: bind.BindingMode);
        Initialize(): void;
        Fraction: imodels.Abonment;
        private dbe;
        private fraction;
        protected Convert(data: imodels.FakePrice): number;
        protected ConvertBack(data: number): imodels.FakePrice;
        private OntargetVC(s, e);
        protected SourceChanged(s: bind.PropBinding, e: bind.EventArgs<imodels.FakePrice, bind.Scop>): void;
        Dispose(): void;
    }
    function setAbonment(v: models.Abonment): void;
}
export declare function LoadJobs(): void;
