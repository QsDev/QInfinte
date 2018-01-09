import { UI } from '../../js/UI';
export declare namespace Admin {
    class AdminPage extends UI.NavPage {
        constructor(app: UI.App);
        private ca;
        private cv;
        initialize(): void;
        private initAchatCmd();
        private initVentCmd();
    }
}
