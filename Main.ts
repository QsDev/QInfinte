
// https://codyhouse.co Sites for good controls
import { basic, mvc, thread, encoding, bind, reflection } from './js/Corelib';
import * as Core from './js/Corelib';
import { db} from './js/db';
import { Jobs } from './js/Jobs';
import { ModelsViews } from './js/ModelsViews';
import { UI } from './js/UI';
import { Init } from './Apps/Shop/Apps';
import { models } from './js/Models';
import { sdata } from './js/System';

declare var require: Function;

export function Main() {
    (new ModelsViews()).
        then((p: ModelsViews) => thread.Dispatcher.call(Init, Init.Main, UI.Desktop.Current));
}
export function Start() {    
    Jobs.Load();
    Main();
    window["lib"] = {
        UI: UI, Core: Core, Jobs: Jobs
    };
}
declare var QReqConfig;
window["db"] = db;
window['test'] = () => {
    debugger;
    var _db = new db.Database();
    _db.initialize();
    var tbl = new db.DatabaseTable(_db, 'Product', models.Product);
    tbl.Create((iss, db, sql, rslt) => {
        debugger;
        if (iss) {
            var vls = window["__data"].Products._list as models.Product[];
            tbl.Insert(vls[2220], (iss, db, sql, rslt) => {
                debugger;
            });
        } else {

        }
    });
    
}