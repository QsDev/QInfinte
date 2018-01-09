export interface IEnum {
    [n: string]: number;
}
export interface IContext {
    CanAccessToMe(type: string, folder: string, name: string): any;
    GetPath(path: string): string;
    NameOf(type: Function): string;
    GetType(path: string): Function;
    GetEnum(path: string): IEnum;
}
export declare class icontext implements IContext {
    CanAccessToMe(type: string, folder: string, name: string): void;
    GetPath(path: string): string;
    NameOf(type: Function): string;
    GetType(path: string): Function;
    GetEnum(path: string): IEnum;
}
export declare var context: icontext;
