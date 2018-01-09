import { basic, bind } from "./Corelib";
import { models } from "./Models";
export declare function round1(_n: any, x: any): string;
export declare function round(_n: any, x: any): string;
export declare module Jobs {
    function InputChecks(name: string, check: (value: string) => boolean): void;
    function Load(): void;
    class FloatJob implements basic.IJob {
        private checks;
        Name: string;
        Todo(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnInitialize(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        handleEvent(ji: bind.JobInstance, e: Event): void;
        OnDispose(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
    }
    class AccordionSelectJob implements basic.IJob {
        private checks;
        Name: string;
        Todo(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        Check(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnError(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnInitialize(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        callback(e: Event): void;
        OnDispose(job: bind.JobInstance, e: bind.EventArgs<any, any>): void;
    }
    class ProductCartJob implements basic.IJob {
        Name: string;
        Todo(ji: bind.JobInstance, e: bind.EventArgs<models.Product, any>): void;
        Check(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnError(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnDispose(ji: bind.JobInstance, e: bind.EventArgs<any, any>): void;
        OnInitialize(ji: bind.JobInstance, e: bind.EventArgs<models.Product, any>): void;
    }
    var LabelJob: basic.IJob;
    var LabelJob: basic.IJob;
    var LabelJob: basic.IJob;
    var textboxJob: basic.IJob;
    var LabelJob: basic.IJob;
    var ratingJob: basic.IJob;
    var LabelJob: basic.IJob;
    var LabelJob: basic.IJob;
    var LabelJob: basic.IJob;
    var LabelJob: basic.IJob;
    var LabelJob: basic.IJob;
    var TextJob: basic.IJob;
    var TextJob: basic.IJob;
    var TextJob: basic.IJob;
    var SlideJob: basic.IJob;
    var CheckJob: basic.IJob;
}
