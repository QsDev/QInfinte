var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./../AdminApis", "../../Basics", "../../../../js/UI", "../../../../js/Models", "../../../../js/Corelib"], function (require, exports, AdminApis_1, Basics_1, UI_1, Models_1, Corelib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SVersment = /** @class */ (function (_super) {
        __extends(SVersment, _super);
        /*================================================================================================================*/
        function SVersment(_vars) {
            return _super.call(this, _vars, 'SVersment.cart', { templateName: 'SVersment.list', itemTemplateName: undefined }) || this;
        }
        SVersment.prototype.UpdateData = function (data, callback, costumize) {
            this._vars.requester.Request(Models_1.models.SVersment, "UPDATE", data, data, callback, costumize);
        };
        SVersment.prototype.UpdateList = function (list, ofOwner, callback, costumize) {
            this._vars.requester.Get(Models_1.models.SVersments, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
        };
        SVersment.prototype.UpdateAll = function (callback, costumize) {
            this._vars.requester.Get(Models_1.models.SVersments, this._vars.__data.SVersments, { FromDate: 0 }, callback, costumize);
        };
        SVersment.prototype.Check = function (data) {
            return true;
        };
        SVersment.prototype.Avaible = function (callback) {
            return callback ? callback(this._vars.__data.SVersments, undefined, Basics_1.basics.DataStat.Fail) || true : true;
        };
        SVersment.prototype.New = function (callback, saveToApp, saveToServer) {
            var c = new Models_1.models.SVersment(Corelib_1.basic.New());
            if (saveToApp)
                this._vars.__data.SVersments.Add(c);
            if (callback)
                callback(c, true, Basics_1.basics.DataStat.Success);
            if (saveToServer)
                if (!callback)
                    throw "callback must be setted when saveToServer is Setted to true";
                else
                    this.Save(c, true, callback);
            else
                return c;
        };
        SVersment.prototype.Save = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data))
                this._vars.requester.Request(Models_1.models.SVersment, "SAVE", data, null, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The SVersment Successfully Saved", true);
                        if (isNew)
                            _this._vars.__data.SVersments.Add(data);
                        data.Save();
                        if (callback)
                            callback(data, isNew, Basics_1.basics.DataStat.Success);
                        return;
                    }
                    else
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The SVersment", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        SVersment.prototype.Delete = function (saveToServer, data, callback) {
            var _this = this;
            if (!data)
                return this.ShowInfo('Select one SVersment PLEASE;');
            UI_1.UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this SVersment', function (xx) {
                if (xx.Result !== UI_1.UI.MessageResult.ok)
                    return callback && callback(data, undefined, Basics_1.basics.DataStat.OperationCanceled);
                if (saveToServer)
                    _this._vars.requester.Request(Models_1.models.SVersment, "DELETE", data, data, function (s, r, iss) {
                        if (iss)
                            _this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail))
                            _this.ShowInfo(iss ?
                                'The SVersment :' + data.toString() + '  Deleted!! ' :
                                'Could Not Delete The SVersment :' + data.toString(), false);
                    });
                else {
                    _this.deleteData(data);
                    if (!callback || !callback(data, false, Basics_1.basics.DataStat.Success))
                        _this.ShowInfo('The SVersment :' + data.toString() + '  Deleted!! from App ', true);
                }
            }, 'DELETE', "Let's");
        };
        SVersment.prototype.deleteData = function (data) {
            this._vars.__data.SVersments.Remove(data);
        };
        SVersment.prototype.Edit = function (saveToServer, data, isNew, callback) {
            if (!data) {
                if (!callback || !callback(data, isNew, Basics_1.basics.DataStat.DataCheckError))
                    UI_1.UI.InfoArea.push('Select one SVersment PLEASE;');
            }
            else {
                this.EditData.edit(data, false, this.getAction(callback));
            }
        };
        SVersment.prototype.OnModalSuccess = function (data, isNew, callback) {
            return this.Save(data, isNew, callback);
        };
        SVersment.prototype.OnModalError = function (cat, isNew, callback) {
            UI_1.UI.InfoArea.push("The Modification Aborded", true, 2500);
            if (callback)
                return callback(cat, isNew, Basics_1.basics.DataStat.OperationCanceled);
            return false;
        };
        SVersment.prototype.VerserTo = function (facture, fournisseur, callback, montant) {
            var _this = this;
            fournisseur = fournisseur || (facture && facture.Fournisseur);
            if (!fournisseur) {
                this._vars.apis.Fournisseur.Select(function (s, r, t) {
                    if (t === UI_1.UI.MessageResult.ok) {
                        if (r)
                            _this.VerserTo(facture, r, callback);
                        UI_1.UI.InfoArea.push("You are'nt select any fournisseur");
                        return _this.VerserTo(facture, fournisseur, callback);
                    }
                    UI_1.UI.InfoArea.push("Versment est abondonnee");
                    callback && callback(null, false, Basics_1.basics.DataStat.OperationCanceled);
                }, fournisseur);
            }
            this.New(function (data, isNew, error) {
                if (error == Basics_1.basics.DataStat.Success) {
                    data.Fournisseur = fournisseur;
                    data.Facture = facture;
                    data.Montant = montant || 0;
                    _this.Edit(true, data, isNew, function (data, isNew, error) {
                        if (error === Basics_1.basics.DataStat.Success) {
                            _this._vars.__data.SVersments.Add(data);
                            data.Fournisseur.VersmentTotal += data.Montant;
                        }
                        else {
                            UI_1.UI.InfoArea.push("Versment est annulé");
                        }
                        callback && callback(data, isNew, error);
                    });
                }
                else {
                    UI_1.UI.InfoArea.push("An Expected error while creating a Versment ");
                    callback && callback(data, isNew, error);
                }
            }, false, false);
        };
        SVersment.prototype.Regler = function (facture, fournisseur, callback) {
            var _this = this;
            this.OpenSVersmentsOfFacture;
            if (!facture && !fournisseur)
                return UI_1.UI.InfoArea.push("Vous devez au moin selectioner soit un fournisseur au une facture.");
            if (facture) {
                var results = new Models_1.models.SVersments(facture);
                this._vars.requester.Request(Models_1.models.SVersments, "VFacture", results, facture, function (c, d, f) {
                    facture.Recalc(results);
                    if (facture.Sold != 0)
                        _this.VerserTo(facture, fournisseur, callback, facture.Sold);
                });
            }
            else {
                this.VerserTo(facture, fournisseur, callback, fournisseur.SoldTotal);
            }
        };
        SVersment.prototype.Get = function (id /*, callback?: DBCallback<models.Versment>*/) {
            var c = Models_1.models.SVersment.getById(id, Models_1.models.SVersment);
            if (!c) {
                c = new Models_1.models.SVersment(id);
                Corelib_1.encoding.SerializationContext.GlobalContext.reset();
                c.FromJson(id, Corelib_1.encoding.SerializationContext.GlobalContext, true);
            }
            return c;
        };
        SVersment.prototype.getDefaultList = function () { return this._vars.__data.SVersments; };
        /*================================================================================================================*/
        SVersment.prototype.OpenSVersmentsOfFournisseur = function (fournisseur, callback) {
            var _this = this;
            var results = new Models_1.models.SVersments(fournisseur);
            this._vars.requester.Request(Models_1.models.SVersments, "VFournisseur", results, fournisseur, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (a, b, c) {
                        callback && callback(results, b, fournisseur, c === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        SVersment.prototype.OpenSVersmentsOfFacture = function (facture, callback) {
            var _this = this;
            var results = new Models_1.models.SVersments(facture);
            this._vars.requester.Request(Models_1.models.SVersments, "VFacture", results, facture, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (modal, selectedItem, result) {
                        callback && callback(results, selectedItem, facture, result === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        SVersment.prototype.OpenSVersmentsWithObservation = function (Observation, callback) {
            var _this = this;
            var results = new Models_1.models.SVersments(null);
            this._vars.requester.Request(Models_1.models.SVersments, "VObservation", results, { Observation: Observation }, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (a, b, c) {
                        callback && callback(results, b, Observation, c === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        SVersment.prototype.OpenSVersmentsWithPeriod = function (Period, callback) {
            var _this = this;
            var results = new Models_1.models.SVersments(null);
            this._vars.requester.Request(Models_1.models.SVersments, "VObservation", results, Period, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (a, b, c) {
                        callback && callback(results, b, Period, c === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        return SVersment;
    }(AdminApis_1.MyApi));
    exports.SVersment = SVersment;
});
//# sourceMappingURL=SVersment.js.map