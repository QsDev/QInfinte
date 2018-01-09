import { utils, bind, collection } from '../js/Corelib';
export declare module filters {
    namespace scopic {
        interface IListFilterParam {
            Filter: string;
            Source: string;
            Patent: string;
            shift: string;
            max: string;
        }
        class ListFilter<T> extends bind.Filter<collection.List<T>, collection.ExList<T, list.StringPatent>> {
            private p;
            private fl;
            private isConst;
            constructor(s: bind.Scop, m: bind.BindingMode, p: string, fl?: collection.ExList<T, filters.list.StringPatent>);
            private sourceBind;
            private getFilter(s);
            private getSource(s);
            private getPatent(s);
            protected Convert(data: collection.List<T>): collection.ExList<T, any>;
            protected ConvertBack(data: collection.ExList<T, any>): collection.List<T>;
            Initialize(): void;
        }
    }
    namespace list {
        class SubListPatent implements utils.IPatent<any> {
            Start: number;
            End: number;
            constructor(start: number, end: number);
            Check(i: any): boolean;
            equals(p: SubListPatent): boolean;
        }
        class StringPatent implements utils.IPatent<any> {
            private p;
            private o;
            constructor(s: string);
            Check(s: any): boolean;
            equals(p: StringPatent): boolean;
        }
        class StringFilter<T> extends utils.Filter<T, StringPatent> {
            Begin(deb: number, count: number): void;
            IsMatch(i: number, item: T): boolean;
            protected convertFromString(x: string): StringPatent;
        }
        abstract class PatentGroup<T> implements utils.IPatent<T> {
            left: utils.IPatent<T>;
            right: utils.IPatent<T>;
            constructor(left: utils.IPatent<T>, right: utils.IPatent<T>);
            abstract Clone(): any;
            abstract Check(item: T): any;
            equals(p: utils.IPatent<T>): boolean;
            protected areEquals(a: utils.IPatent<T>, b: utils.IPatent<T>): boolean;
        }
        class ANDPatentGroup<T> extends PatentGroup<T> {
            Check(item: T): boolean;
            Clone(): ANDPatentGroup<T>;
        }
        class ORPatentGroup<T> extends PatentGroup<T> {
            Clone(): ORPatentGroup<T>;
            Check(item: T): boolean;
        }
        class FilterGroup<T> extends utils.Filter<T, PatentGroup<T>> {
            constructor(patent: PatentGroup<T>);
            Begin(deb: number, count: number): void;
            IsMatch(i: number, item: T): any;
            protected convertFromString(x: string): PatentGroup<T>;
            LeftPatent: utils.IPatent<T>;
            RightPatent: utils.IPatent<T>;
        }
        class LStringFilter<T> extends utils.Filter<T, StringPatent> {
            private deb;
            private count;
            Begin(deb: number, count: number): void;
            IsMatch(i: number, item: T): boolean;
            protected convertFromString(x: string): StringPatent;
        }
        class SubListFilter<T> extends utils.Filter<T, SubListPatent> {
            private deb;
            private count;
            Begin(deb: number, count: number): void;
            IsMatch(i: number, item: T): boolean;
            protected convertFromString(x: string): SubListPatent;
        }
    }
}
