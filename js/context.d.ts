import { ModuleStat } from 'Consts';
export interface IEnum {
    [n: string]: number;
}
export interface IContext {
    CanAccessToMe(type: string, folder: string, name: string): any;
    GetPath(path: string): string;
    NameOf(type: Function): string;
    GetType(path: string): Function;
    GetEnum(path: string): IEnum;
    GetStat(): ModuleStat;
    OnStat(target: string, stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void): any;
    OnGStat(stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void): any;
    Assemblies: any;
}
export declare class icontext implements IContext {
    CanAccessToMe(type: string, folder: string, name: string): void;
    GetPath(path: string): string;
    NameOf(type: Function): string;
    GetType(path: string): Function;
    GetEnum(path: string): IEnum;
    GetStat(): ModuleStat;
    OnStat(target: string, stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void): void;
    OnGStat(stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void): void;
    readonly Assemblies: any;
}
export declare module context {
}
export declare var context: icontext;
