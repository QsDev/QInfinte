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
define(["require", "exports", "../../../js/Corelib", "../../../js/UI", "../../../js/Models", "../../../js/System", "./../Basics"], function (require, exports, Corelib_1, UI_1, Models_1, System_1, Basics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyApi = /** @class */ (function () {
        function MyApi(_vars, templateName, listTemplate) {
            this.Init(_vars, templateName, listTemplate);
        }
        MyApi.prototype.ShowInfo = function (msg, isInfo, time) {
            UI_1.UI.InfoArea.push(msg, isInfo, time);
        };
        MyApi.prototype.getAction = function (callback) {
            return callback == undefined ? this._action : this._action.Clone(callback);
        };
        Object.defineProperty(MyApi.prototype, "EditData", {
            get: function () {
                if (!this._catModal && this._templateName)
                    this._catModal = new UI_1.UI.Modals.ModalEditer(this._templateName);
                return this._catModal;
            },
            enumerable: true,
            configurable: true
        });
        MyApi.prototype.getEditList = function () {
            if (!this._listModal && this._listTemplateName) {
                this._listModal = new UI_1.UI.Modals.ModalList(undefined, this._listTemplateName.templateName, this._listTemplateName.itemTemplateName);
                this._listModal.OnInitialized = function (n) { return n.setWidth("90%"); };
            }
            return this._listModal;
        };
        MyApi.prototype.Init = function (vars, modal, listTemplate) {
            this._action = UI_1.UI.Modals.EditorAction.Create(this, this.OnModalSuccess, this.OnModalError, this.defaultCallback);
            this._vars = vars;
            if (listTemplate instanceof UI_1.UI.Modals.ModalList)
                this._listModal = listTemplate;
            else
                this._listTemplateName = listTemplate;
            if (typeof modal === 'string')
                this._templateName = modal;
            else
                this._catModal = modal;
        };
        MyApi.prototype.Open = function (data_table, isNew, action) {
            var c = this.EditData;
            if (c)
                c.edit(data_table, isNew, action);
            else
                UI_1.UI.InfoArea.push("This data has no template editor yet");
        };
        MyApi.prototype.OpenList = function (data, action) {
            var c = this.getEditList();
            if (c)
                c.show(action, data);
            else
                UI_1.UI.InfoArea.push("This data has no template editor yet");
        };
        /**
         * Update Data From The Server
         * @param _data if(T) Update data
                       if(P) Update list of P.Owner
                       if(undefinned) Update A whole Data Of Type T
         */
        MyApi.prototype.Update = function (_data) {
            if (!_data)
                return this.UpdateAll();
            _data.Stat = System_1.sdata.DataStat.Updating;
            if (_data instanceof System_1.sdata.DataRow)
                this.UpdateData(_data);
            if (_data instanceof System_1.sdata.DataTable)
                this.UpdateList(_data, _data.Owner);
            throw new Error("UnExpected Type Of Data");
        };
        MyApi.prototype.SmartUpdate = function () {
            var type = this.getDefaultList().GetType();
            this._vars.requester.Request(type, "SUPDATE", null, {});
        };
        MyApi.prototype.Get = function (data, full) {
            throw new Error("Method not implemented.");
        };
        MyApi.prototype.Select = function (n, defaultList, list) {
            this.getEditList().show(n, list || this.getDefaultList());
            this.getEditList().OnInitialized = function (n) { return n.SelectedItem = defaultList; };
            return this.getEditList();
        };
        MyApi.prototype.CreateNew = function (callback) {
            var _this = this;
            this.New(function (data, isNew, error) {
                if (error == Basics_1.basics.DataStat.Success) {
                    var cll;
                    _this.Edit(true, data, isNew, cll = function (data, isNew, error) {
                        var iss = error === Basics_1.basics.DataStat.Success;
                        switch (error) {
                            case Basics_1.basics.DataStat.Success:
                                _this.getDefaultList().Add(data);
                                break;
                            case Basics_1.basics.DataStat.Fail:
                            case Basics_1.basics.DataStat.UnknownStat:
                                UI_1.UI.InfoArea.push("Fatal Error Occured");
                                return _this.Edit(true, data, isNew, cll);
                            case Basics_1.basics.DataStat.OperationCanceled:
                                UI_1.UI.InfoArea.push("Operation Cancled");
                                break;
                            case Basics_1.basics.DataStat.DataCheckError:
                                UI_1.UI.InfoArea.push("Please Validate Your Data");
                                return _this.Edit(true, data, isNew, cll);
                        }
                        callback && callback(iss ? data : null);
                    });
                }
            }, false, false);
        };
        return MyApi;
    }());
    exports.MyApi = MyApi;
    var FactureBase = /** @class */ (function (_super) {
        __extends(FactureBase, _super);
        function FactureBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FactureBase.prototype.close = function (data, callback) {
            this._vars.requester.Request(data.GetType(), "CLOSE", data, data, function (c, is, succ) {
                if (succ) {
                    data.IsOpen = false;
                }
                else
                    UI_1.UI.Modal.ShowDialog("Critical Error", "The Data was Saved But Closed Yet");
                callback && callback(data, succ);
            });
        };
        ;
        FactureBase.prototype.EOpenFacture = function (data, validate) {
            var _this = this;
            if (data.IsOpen) {
                this._vars.requester.Post(data.GetType(), data, null, function (c, is, succ) {
                    if (succ) {
                        _this.close(data, function (data, iss) {
                            if (data instanceof Models_1.models.SFacture)
                                return _this._vars.apis.SVersment.Regler(data, data.Client);
                            else if (data instanceof Models_1.models.Facture)
                                return _this._vars.apis.Versment.Regler(data, data.Client);
                        });
                    }
                    else
                        UI_1.UI.Modal.ShowDialog("Critical Error", "The Facture Is Saved But doesn't Closed <br> Fatal Error When Closing The Facture");
                }, undefined, undefined, validate ? { "Validate": data.Id } : undefined);
            }
            else {
                this._vars.requester.Request(data.GetType(), "OPEN", data, data, function (c, is, succ) {
                    if (succ) {
                        data.IsOpen = true;
                    }
                    else
                        UI_1.UI.Modal.ShowDialog("Critical Error", "It'seem that the facture cannot be opened . Sory");
                });
            }
        };
        FactureBase.prototype.CreateNew = function (callback) {
            { }
            _super.prototype.CreateNew.call(this, function (fact) {
                Corelib_1.Api.RiseApi('OpenFactureInfo', {
                    callback: function (p, da) {
                        callback(p.data);
                    },
                    data: fact,
                });
            });
        };
        return FactureBase;
    }(MyApi));
    exports.FactureBase = FactureBase;
});
//# sourceMappingURL=AdminApis.js.map