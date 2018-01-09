define(["require", "exports", '../js/Corelib', '../js/Jobs', '../js/ModelsViews', '../js/UI', '../apis/qshopapis', 'Shop/Apps'], function (require, exports, Corelib_1, Jobs_1, ModelsViews_1, UI_1, qshopapis_1, Apps_1) {
    "use strict";
    "use asm";
    function Main() {
        (new ModelsViews_1.ModelsViews()).
            then((p) => Corelib_1.thread.Dispatcher.call(Apps_1.Init, Apps_1.Init.Main, UI_1.UI.Desktop.Current));
    }
    exports.Main = Main;
    function Start() {
        Jobs_1.Jobs.Load();
        qshopapis_1.Apis.Load();
        Main();
    }
    exports.Start = Start;
});
