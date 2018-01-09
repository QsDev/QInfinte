import { models } from "../../js/Models";
import { bind, collection } from "../../js/Corelib";
import { Controller } from "../../js/System";
import { UI } from "../../js/UI";
import { ShopApis } from "./Apis/ShopApis";
//import {  } from "./Common";

export namespace basics {
    export interface vars {
        __data: models.QData;
        modify: bind.Scop;
        user: models.Login;
        requester: Controller.ProxyData;
        invalidateFactures: collection.List<models.Facture>;
        invalidateLogins: collection.List<models.Login>;
        validateLogins: collection.List<models.Login>;
        mails: collection.List<models.Mail>;
        spin: UI.Spinner;
        apis: ShopApis;
    }
    export enum DataStat {
        UnknownStat = undefined,
        DataCheckError = null,
        Fail = 0,
        Success = 1,
        OperationCanceled = 2
    }
}