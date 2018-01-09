import {ModuleStat} from './Consts';
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
    GetStat(): ModuleStat;
    OnStat(target: string, stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void);
    OnGStat(stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void);
    Assemblies;
}
export class icontext implements IContext {
    CanAccessToMe(type: string, folder: string, name: string) { }
    GetPath(path: string): string { return path; }
    NameOf(type: Function): string { return ""; }
    GetType(path: string): Function { return null; }
    GetEnum(path: string): IEnum { return undefined; };
    GetStat(): ModuleStat { return ModuleStat.Failed; }
    OnStat(target: string, stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void) { }
    OnGStat(stat: ModuleStat, callback: (me: string, target: string, cstat: ModuleStat, stat: ModuleStat) => void) { }
    get Assemblies() { return undefined; }

}
export module context {
}
export var context = new icontext();
clearJQuery();
function clearJQuery() {
    var t = setTimeout(() => { });
    while (t >= 0)
        clearTimeout(t--);
    var t = setInterval(() => { });
    while (t >= 0)
        clearInterval(t--);
}