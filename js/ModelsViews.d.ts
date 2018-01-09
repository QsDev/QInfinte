import { mvc, collection } from './Corelib';
export declare class ModelsViews extends mvc.Initializer {
    constructor();
    Init(): void;
    Dispose(): void;
    readonly System: collection.List<mvc.MvcDescriptor>;
}
