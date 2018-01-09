export interface IEnum {
    //[s: string|number]: number|string;
    //[n: number]: string;
    [n: string]: number;

}
export interface IContext {
    CanAccessToMe(type: string, folder: string, name: string);
    GetPath(path: string): string;
    NameOf(type: Function): string;
    GetType(path: string): Function;
    GetEnum(path: string): IEnum;
}
export class icontext implements IContext {
    CanAccessToMe(type: string, folder: string, name: string) { }
    GetPath(path: string): string { return path; }
    NameOf(type: Function): string { return ""; }
    GetType(path: string): Function { return null; }
    GetEnum(path: string): IEnum { return undefined; };
}
export var context = new icontext();