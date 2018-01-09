define(["require", "exports", "./js/Corelib", "./js/Corelib", "./js/db", "./js/Jobs", "./js/ModelsViews", "./js/UI", "./Apps/Shop/Apps", "./js/Models"], function (require, exports, Corelib_1, Core, db_1, Jobs_1, ModelsViews_1, UI_1, Apps_1, Models_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function Main() {
        (new ModelsViews_1.ModelsViews()).
            then(function (p) { return Corelib_1.thread.Dispatcher.call(Apps_1.Init, Apps_1.Init.Main, UI_1.UI.Desktop.Current); });
    }
    exports.Main = Main;
    function Start() {
        Jobs_1.Jobs.Load();
        Main();
        window["lib"] = {
            UI: UI_1.UI, Core: Core, Jobs: Jobs_1.Jobs
        };
    }
    exports.Start = Start;
    window["db"] = db_1.db;
    window['test'] = function () {
        debugger;
        var _db = new db_1.db.Database();
        _db.initialize();
        var tbl = new db_1.db.DatabaseTable(_db, 'Product', Models_1.models.Product);
        tbl.Create(function (iss, db, sql, rslt) {
            debugger;
            if (iss) {
                var vls = window["__data"].Products._list;
                tbl.Insert(vls[2220], function (iss, db, sql, rslt) {
                    debugger;
                });
            }
            else {
            }
        });
    };
});
//# sourceMappingURL=Main.js.map