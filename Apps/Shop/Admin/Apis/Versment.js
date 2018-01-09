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
define(["require", "exports", "./../AdminApis", "../../Basics", "../../../../js/UI", "../../../../js/Models", "../../../../js/System", "../../../../js/Corelib"], function (require, exports, AdminApis_1, Basics_1, UI_1, Models_1, System_1, Corelib_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Versment = /** @class */ (function (_super) {
        __extends(Versment, _super);
        function Versment(_vars) {
            return _super.call(this, _vars, 'Versment.cart', { templateName: 'Versment.table', itemTemplateName: undefined }) || this;
        }
        Versment.prototype.UpdateData = function (data, callback, costumize) {
            this._vars.requester.Request(Models_1.models.Versment, "UPDATE", data, data, callback, costumize);
        };
        Versment.prototype.UpdateList = function (list, ofOwner, callback, costumize) {
            this._vars.requester.Get(Models_1.models.Versments, list, { OwnerId: ofOwner && ofOwner.Id }, callback, costumize);
        };
        Versment.prototype.UpdateAll = function (callback, costumize) {
            this._vars.requester.Get(Models_1.models.Versments, this._vars.__data.Versments, { FromDate: 0 }, callback, costumize);
        };
        Versment.prototype.Check = function (data) {
            return true;
        };
        Versment.prototype.Avaible = function (callback) {
            return callback ? callback(this._vars.__data.Versments, undefined, Basics_1.basics.DataStat.Fail) || true : true;
        };
        Versment.prototype.New = function (callback, saveToApp, saveToServer) {
            var c = new Models_1.models.Versment(Corelib_1.basic.New());
            if (saveToApp)
                this._vars.__data.Versments.Add(c);
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
        Versment.prototype.Save = function (data, isNew, callback) {
            var _this = this;
            if (this.Check(data))
                this._vars.requester.Request(Models_1.models.Versment, "SAVE", data, null, function (s, r, iss) {
                    if (iss) {
                        UI_1.UI.InfoArea.push("The Versment Successfully Saved", true);
                        if (isNew)
                            _this._vars.__data.Versments.Add(data);
                        data.Save();
                        if (callback)
                            callback(data, isNew, Basics_1.basics.DataStat.Success);
                        return;
                    }
                    else
                        UI_1.UI.InfoArea.push("AN Expected Error !!!!!<br>while Inserting The Versment", false, 8000);
                    if (callback)
                        callback(data, isNew, Basics_1.basics.DataStat.Fail);
                    data.Undo();
                });
            else if (callback)
                callback(data, isNew, Basics_1.basics.DataStat.DataCheckError);
            return true;
        };
        Versment.prototype.Delete = function (saveToServer, data, callback) {
            var _this = this;
            if (!data)
                return this.ShowInfo('Select one Versment PLEASE;');
            UI_1.UI.Modal.ShowDialog('Confirmation !!', 'Are you sur to delete this Versment', function (xx) {
                if (xx.Result !== UI_1.UI.MessageResult.ok)
                    return callback && callback(data, undefined, Basics_1.basics.DataStat.OperationCanceled);
                if (saveToServer)
                    _this._vars.requester.Request(Models_1.models.Versment, "DELETE", data, data, function (s, r, iss) {
                        if (iss)
                            _this.deleteData(data);
                        if (!callback || !callback(data, false, iss ? Basics_1.basics.DataStat.Success : Basics_1.basics.DataStat.Fail))
                            _this.ShowInfo(iss ? 'The Versment :' + data.toString() + '  Deleted!! ' : 'Could Not Delete The Versment :' + data.toString(), false);
                    });
                else {
                    _this.deleteData(data);
                    if (!callback || !callback(data, false, Basics_1.basics.DataStat.Success))
                        _this.ShowInfo('The Versment :' + data.toString() + '  Deleted!! from App ', true);
                }
            }, 'DELETE', "Let's");
        };
        Versment.prototype.deleteData = function (data) {
            this._vars.__data.Versments.Remove(data);
        };
        Versment.prototype.Edit = function (saveToServer, data, isNew, callback) {
            if (!data) {
                if (!callback || !callback(data, isNew, Basics_1.basics.DataStat.DataCheckError))
                    UI_1.UI.InfoArea.push('Select one Versment PLEASE;');
            }
            else {
                this.EditData.edit(data, false, this.getAction(callback));
            }
        };
        Versment.prototype.OnModalSuccess = function (data, isNew, callback) {
            return this.Save(data, isNew, callback);
        };
        Versment.prototype.OnModalError = function (cat, isNew, callback) {
            UI_1.UI.InfoArea.push("The Modification Aborded", true, 2500);
            if (callback)
                return callback(cat, isNew, Basics_1.basics.DataStat.OperationCanceled);
            return false;
        };
        Versment.prototype.getDefaultList = function () { return this._vars.__data.Versments; };
        Versment.prototype.VerserTo = function (facture, client, callback, montant) {
            var _this = this;
            client = client || (facture && facture.Client);
            if (facture && facture.IsOpen)
                return UI_1.UI.Modal.ShowDialog("Error", 'Close the facture for you can make a versment');
            if (!client) {
                this._vars.apis.Client.Select(function (s, r, t) {
                    if (t === UI_1.UI.MessageResult.ok) {
                        if (r)
                            _this.VerserTo(facture, r, callback);
                        UI_1.UI.InfoArea.push("You are'nt select any fournisseur");
                        return _this.VerserTo(facture, client, callback);
                    }
                    UI_1.UI.InfoArea.push("Versment est abondonnee");
                    callback && callback(null, false, Basics_1.basics.DataStat.OperationCanceled);
                }, client);
            }
            this.New(function (data, isNew, error) {
                if (error == Basics_1.basics.DataStat.Success) {
                    data.Client = client;
                    data.Facture = facture;
                    data.Montant = montant || 0;
                    _this.Edit(true, data, isNew, function (data, isNew, error) {
                        if (error === Basics_1.basics.DataStat.Success) {
                            _this._vars.__data.Versments.Add(data);
                            data.Client.VersmentTotal += data.Montant;
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
        Versment.prototype.Regler = function (facture, client, callback) {
            var _this = this;
            if (!facture && !client)
                return UI_1.UI.InfoArea.push("Vous devez au moin selectioner soit un fournisseur au une facture.");
            if (facture) {
                if (facture.IsOpen)
                    return UI_1.UI.Modal.ShowDialog("Error", 'Close the facture for you can make a versment');
                var results = new Models_1.models.Versments(facture);
                this._vars.requester.Request(Models_1.models.Versments, "VFacture", results, facture, function (c, d, f) {
                    facture.Recalc(results);
                    if (facture.Sold != 0)
                        _this.VerserTo(facture, client, callback, facture.Sold);
                });
            }
            else {
                this._vars.apis.Client.UpdateClient(client, function (d, iss) {
                    if (!iss)
                        UI_1.UI.InfoArea.push("Une Error Produit Quant le versment est calcer");
                    _this.VerserTo(facture, client, callback, client.SoldTotal);
                });
            }
        };
        Versment.prototype.Get = function (id) {
            var c = Models_1.models.Versment.getById(id, Models_1.models.Versment);
            if (!c || c.Stat <= System_1.sdata.DataStat.Modified) {
                c = c || new Models_1.models.Versment(id);
                Corelib_1.encoding.SerializationContext.GlobalContext.reset();
                c.FromJson(id, Corelib_1.encoding.SerializationContext.GlobalContext, true);
            }
            return c;
        };
        Versment.prototype.OpenVersmentsOfClient = function (client, callback) {
            var _this = this;
            var results = new Models_1.models.Versments(client);
            this._vars.requester.Request(Models_1.models.Versments, "VClient", results, client, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (a, b, c) {
                        callback && callback(results, b, client, c === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        Versment.prototype.OpenVersmentsOfFacture = function (facture, callback) {
            var _this = this;
            var results = new Models_1.models.Versments(facture);
            this._vars.requester.Request(Models_1.models.Versments, "VFacture", results, facture, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (modal, selectedItem, result) {
                        callback && callback(results, selectedItem, facture, result === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        Versment.prototype.OpenVersmentsOfPour = function (client, callback) {
            var _this = this;
            var results = new Models_1.models.Versments(client);
            this._vars.requester.Request(Models_1.models.Versments, "VPour", results, client, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (a, b, c) {
                        callback && callback(results, b, client, c === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        Versment.prototype.OpenVersmentsWithObservation = function (Observation, callback) {
            var _this = this;
            var results = new Models_1.models.Versments(null);
            this._vars.requester.Request(Models_1.models.Versments, "VObservation", results, { Observation: Observation }, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (a, b, c) {
                        callback && callback(results, b, Observation, c === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        Versment.prototype.OpenVersmentsWithPeriod = function (Period, callback) {
            var _this = this;
            var results = new Models_1.models.Versments(null);
            this._vars.requester.Request(Models_1.models.Versments, "VObservation", results, Period, function (c, d, f) {
                if (f)
                    _this.OpenList(results, function (a, b, c) {
                        callback && callback(results, b, Period, c === UI_1.UI.MessageResult.ok);
                    });
                else
                    UI_1.UI.InfoArea.push("The Server Respond With UnExpected Error");
            });
        };
        return Versment;
    }(AdminApis_1.MyApi));
    exports.Versment = Versment;
});
//# sourceMappingURL=Versment.js.map