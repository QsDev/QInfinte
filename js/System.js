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
define(["require", "exports", "./Corelib", "./context"], function (require, exports, Corelib_1, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _services = {};
    var _defualt;
    var apis = new Corelib_1.collection.Dictionary("Apis", false);
    var Controller;
    (function (Controller) {
        function Register(service) {
            Object.freeze(service);
            Object.defineProperty(_services, service.Name, {
                configurable: false,
                enumerable: false,
                value: service,
                writable: false
            });
        }
        Controller.Register = Register;
        var Api = /** @class */ (function () {
            function Api(reg) {
                this._methodsShema = {};
                apis.Set(this.GetType(), this);
            }
            Api.prototype.Register = function (method) {
                method.Name = method.Name.toUpperCase();
                if (typeof method.ParamsFormat === 'string')
                    method.ParamsFormat = Corelib_1.basic.CompileString(method.ParamsFormat);
                this._methodsShema[method.Name] = method;
            };
            Api.prototype.ERegister = function (method, name, paramsFormat, sendData) {
                this.Register({ Method: method, Name: name, ParamsFormat: paramsFormat && Corelib_1.basic.CompileString(paramsFormat), SendData: sendData });
            };
            Api.prototype.GetMethodShema = function (m) {
                if (typeof m === 'string')
                    return this._methodsShema[m.toUpperCase()]; //|| { Name: m, Method: 0} as any;
                if (typeof m === 'number') {
                    var x = this._methodsShema[Corelib_1.net.WebRequestMethod[m].toUpperCase()];
                    if (x != null)
                        return x;
                    for (var i in this._methodsShema) {
                        var v = this._methodsShema[i];
                        if (v.Method === m)
                            return v;
                    }
                    return; // { Name: String(m), Method: m } as any;
                }
                else if (m) {
                    if (!m.Name)
                        return m;
                }
                for (var i in this._methodsShema) {
                    var v = this._methodsShema[i];
                    return v;
                }
                return; // { Name: 'GET', Method: 0 } as any;
            };
            return Api;
        }());
        Controller.Api = Api;
        var CostumeApi = /** @class */ (function (_super) {
            __extends(CostumeApi, _super);
            function CostumeApi(_type, _getRequest, _onResponse) {
                var _this = _super.call(this) || this;
                _this._type = _type;
                _this._getRequest = _getRequest;
                _this._onResponse = _onResponse;
                return _this;
            }
            CostumeApi.prototype.GetType = function () { return this._type; };
            CostumeApi.prototype.GetRequest = function (data) { return this._getRequest(data); };
            CostumeApi.prototype.OnResponse = function (response, data) { return this._onResponse(response, data); };
            return CostumeApi;
        }(Api));
        Controller.CostumeApi = CostumeApi;
        var mt;
        function messageType() { return mt || (mt = context_1.context.GetType('models.Message')); }
        var ProxyCallback = /** @class */ (function (_super) {
            __extends(ProxyCallback, _super);
            function ProxyCallback(data, param, api, context, callBack, method) {
                var _this = _super.call(this, null, data, true) || this;
                _this.param = param;
                _this.api = api;
                _this.context = context;
                _this.callBack = callBack;
                _this.method = method;
                return _this;
            }
            ProxyCallback.parse = function (json) {
                if (json == null || json.trim() == "")
                    return null;
                try {
                    return JSON.parse(json);
                }
                catch (e) {
                    return null;
                }
            };
            ProxyCallback.prototype.Callback = function (sender, result) {
                var iss = true;
                try {
                    var r = sender.Request.IsSuccess ? ProxyCallback.parse(result.Response) : null;
                    if (r && r.hasOwnProperty('__service__')) {
                        var sr = r;
                        if (sr.__service__) {
                            var s = _services[sr.__service__];
                            if (s)
                                s.OnResponse(this, sender, sr);
                            if (sr.dropRequest)
                                return;
                            r = sr.rdata;
                        }
                        iss = sr.iss;
                    }
                    if (this.api)
                        this.api.OnResponse(r, this.data, this.context || Corelib_1.encoding.SerializationContext.GlobalContext);
                }
                catch (ee) {
                    iss = false;
                }
                if (this.callBack)
                    this.callBack(this, r, iss && this.IsSuccess);
            };
            ProxyCallback.prototype.OutputData = function () {
                if ('string' === typeof this.data)
                    return this.data;
                var r = this.context == null;
                var e = r ? new Corelib_1.encoding.SerializationContext(true) : this.context.reset();
                var d = e.ToJson(this.data);
                if (r)
                    e.Dispose();
                return JSON.stringify(d);
            };
            return ProxyCallback;
        }(Corelib_1.net.RequestParams));
        Controller.ProxyCallback = ProxyCallback;
        var ProxyData = /** @class */ (function () {
            function ProxyData(crpt, isCostume) {
                this.quee = [];
                if (_defualt != null)
                    throw null;
                this.http = new Corelib_1.net.QueeDownloader(crpt);
                this.apis = isCostume ? new Corelib_1.collection.Dictionary("Apis", false) : apis;
            }
            Object.defineProperty(ProxyData.prototype, "Crypto", {
                set: function (v) {
                    this.http.Crypto = v;
                },
                enumerable: true,
                configurable: true
            });
            ProxyData.prototype.Register = function (api) {
                this.apis.Set(api.GetType(), api);
            };
            ProxyData.getMethod = function (api, m) {
                if (!x)
                    return 0;
                if (typeof m === 'number')
                    return m;
                if (typeof m === 'string') {
                    var x = api.GetMethodShema(m);
                    return x ? 0 : x.Method;
                }
                if (x.Name)
                    return Corelib_1.net.WebRequestMethod[m.Name] || 0;
                return 0;
            };
            ProxyData.prototype.Request = function (type, method, data, params, callback, costumize, beforRequest, objectStat) {
                var api = this.apis.Get(type != null ? type : data.constructor);
                var t = new ProxyCallback(data, objectStat, api, Corelib_1.encoding.SerializationContext.GlobalContext, callback, ProxyData.getMethod(api, method));
                var req = api.GetRequest(data, method, params);
                req.beforRequest = beforRequest;
                if (costumize)
                    costumize(req, t);
                this.http.Push(req, t, null);
            };
            ProxyData.prototype.Push = function (type, data, param, callBack, method, costumize, serializer, beforRequest, params) {
                var api = this.apis.Get(type != null ? type : data.constructor);
                var t = new ProxyCallback(data, param, api, serializer || new Corelib_1.encoding.SerializationContext(true) || Corelib_1.encoding.SerializationContext.GlobalContext, callBack);
                var req = api.GetRequest(data, null, params);
                req.HasBody = true;
                req.beforRequest = beforRequest;
                if (method != undefined)
                    req.Method = method;
                if (costumize)
                    costumize(req, t);
                this.http.Push(req, t, params);
            };
            ProxyData.prototype.Post = function (type, data, param, callBack, costumize, serializer, params) {
                var api = this.apis.Get(type != null ? type : data.constructor);
                var t = new ProxyCallback(data, param, api, serializer || Corelib_1.encoding.SerializationContext.GlobalContext, callBack);
                var req = api.GetRequest(data, null, params);
                req.HasBody = true;
                req.Method = Corelib_1.net.WebRequestMethod.Post;
                if (costumize)
                    costumize(req, t);
                this.http.Push(req, t, params);
            };
            ProxyData.prototype.Put = function (type, data, param, callBack, costumize, serializer, params) {
                var api = this.apis.Get(type != null ? type : data.constructor);
                var t = new ProxyCallback(data, param, api, serializer || Corelib_1.encoding.SerializationContext.GlobalContext, callBack);
                var req = api.GetRequest(data, null, params);
                req.HasBody = true;
                req.Method = Corelib_1.net.WebRequestMethod.Put;
                if (costumize)
                    costumize(req, t);
                this.http.Push(req, t, params);
            };
            ProxyData.prototype.Get = function (type, data, param, callBack, costumize, serializer, params) {
                var api = this.apis.Get(type != null ? type : data.constructor);
                var t = new ProxyCallback(data, param, api, serializer || Corelib_1.encoding.SerializationContext.GlobalContext, callBack);
                var req = api.GetRequest(data, null, params);
                req.Method = Corelib_1.net.WebRequestMethod.Get;
                if (costumize)
                    costumize(req, t);
                this.http.Push(req, t, params);
            };
            ProxyData.prototype.Delete = function (type, data, param, callBack, costumize, serializer, params) {
                var api = this.apis.Get(type != null ? type : data.constructor);
                var t = new ProxyCallback(data, param, api, serializer || Corelib_1.encoding.SerializationContext.GlobalContext, callBack);
                var req = api.GetRequest(data, null, params);
                req.Method = Corelib_1.net.WebRequestMethod.Delete;
                if (costumize)
                    costumize(req, t);
                this.http.Push(req, t, params);
                return req;
            };
            Object.defineProperty(ProxyData, "Default", {
                get: function () { return _defualt || (_defualt = new ProxyData(Corelib_1.basic.Crypto, false)); },
                enumerable: true,
                configurable: true
            });
            return ProxyData;
        }());
        Controller.ProxyData = ProxyData;
    })(Controller = exports.Controller || (exports.Controller = {}));
    var sdata;
    (function (sdata) {
        var DataStat;
        (function (DataStat) {
            DataStat[DataStat["IsNew"] = 0] = "IsNew";
            DataStat[DataStat["Modified"] = 1] = "Modified";
            DataStat[DataStat["Saved"] = 2] = "Saved";
            DataStat[DataStat["Updating"] = 4] = "Updating";
            DataStat[DataStat["Uploading"] = 8] = "Uploading";
            DataStat[DataStat["Updated"] = 16] = "Updated";
            DataStat[DataStat["Frozed"] = 32] = "Frozed";
        })(DataStat = sdata.DataStat || (sdata.DataStat = {}));
        var DataRow = /** @class */ (function (_super) {
            __extends(DataRow, _super);
            function DataRow(id) {
                var _this = _super.call(this) || this;
                var st = _this.getStore();
                if (id) {
                    if (st.Get(id) != null)
                        throw "enristrement exist";
                    _this.set(DataRow.DPId, id);
                }
                return _this;
            }
            Object.defineProperty(DataRow.prototype, "Stat", {
                get: function () { return this.get(DataRow.DPStat); },
                set: function (s) { this.set(DataRow.DPStat, s); },
                enumerable: true,
                configurable: true
            });
            DataRow.CreateFromJson = function (json, type, requireNew) {
                if (requireNew)
                    return null;
                var id = (typeof json === 'number' ? json : json.Id);
                return typeof id === 'number' ? type.getById(id, type) : null;
            };
            DataRow.prototype.OnIdChanged = function (old, nw) {
                var store = this.getStore();
                if (old)
                    store.Remove(old);
                if (nw)
                    store.Set(nw, this);
            };
            Object.defineProperty(DataRow.prototype, "Id", {
                get: function () {
                    return this.get(DataRow.DPId);
                },
                set: function (v) {
                    this.set(DataRow.DPId, v);
                },
                enumerable: true,
                configurable: true
            });
            DataRow.__fields__ = function () {
                return [
                    DataRow.DPId, DataRow.DPStat
                ];
            };
            DataRow.getById = function (id, type) {
            };
            DataRow.prototype.FromJson = function (json, context, update) {
                var _this = this;
                if (typeof json === 'number') {
                    if (this.Stat >= DataStat.Updating)
                        return this;
                    this.Id = json;
                    this.set(DataRow.DPStat, DataStat.Updating);
                    Controller.ProxyData.Default.Request(this.constructor, "UPDATE", this, this, function () { if (_this.Stat > DataStat.Updating) {
                        return false;
                    } return true; });
                }
                else {
                    this.set(DataRow.DPStat, DataStat.Updated);
                    _super.prototype.FromJson.call(this, json, context, update);
                    if (json != null && json.IsFrozen == true) {
                        this.Freeze();
                    }
                }
                return this;
            };
            Object.defineProperty(DataRow.prototype, "TableName", {
                //private t: string;
                get: function () {
                    return context_1.context.NameOf(this.constructor).replace("models.", ""); // this.t;
                },
                enumerable: true,
                configurable: true
            });
            DataRow.DPId = Corelib_1.bind.DObject.CreateField("Id", Number, 0, function (e) {
                e.__this.OnIdChanged(e._old, e._new);
            }, function (e) {
                if (e._new == null || e._new === 0)
                    e._new = Corelib_1.basic.New();
            }, Corelib_1.bind.PropertyAttribute.IsKey);
            DataRow.DPStat = Corelib_1.bind.DObject.CreateField("Stat", Number, 0, null, null, Corelib_1.bind.PropertyAttribute.Private);
            return DataRow;
        }(Corelib_1.bind.DObject));
        sdata.DataRow = DataRow;
        var QShopRow = /** @class */ (function (_super) {
            __extends(QShopRow, _super);
            function QShopRow(id) {
                return _super.call(this, id) || this;
            }
            QShopRow.__fields__ = function () { return []; };
            QShopRow.prototype.GenType = function () { return QShopRow; };
            Object.defineProperty(QShopRow, "QueryApi", {
                get: function () {
                    return this._QueryApi;
                },
                enumerable: true,
                configurable: true
            });
            QShopRow.prototype.Update = function () {
            };
            QShopRow.prototype.Upload = function () {
            };
            return QShopRow;
        }(sdata.DataRow));
        sdata.QShopRow = QShopRow;
        var DataTable = /** @class */ (function (_super) {
            __extends(DataTable, _super);
            function DataTable(_parent, argType, ctor, array) {
                var _this = _super.call(this, argType, array) || this;
                _this._parent = _parent;
                _this.ctor = ctor;
                return _this;
            }
            DataTable.__fields__ = function () {
                return [DataTable.DPOwner];
            };
            Object.defineProperty(DataTable.prototype, "Owner", {
                get: function () { return this.get(DataTable.DPOwner); },
                set: function (v) { this.set(DataTable.DPOwner, v); },
                enumerable: true,
                configurable: true
            });
            DataTable.prototype.CreateNewItem = function (id) { return this.ctor(id); };
            DataTable.prototype.FromJson = function (json, x, update, callback) {
                if (this.Stat == sdata.DataStat.Frozed)
                    return;
                this.set(DataTable.DPStat, DataStat.Updating);
                var obj = _super.prototype.FromJson.call(this, json, x, update, callback);
                this.set(DataTable.DPStat, DataStat.Updated);
                if (json == null)
                    return this;
                if (json != null && json.IsFrozen == true)
                    this.Freeze();
                return this;
            };
            DataTable.prototype.GetById = function (id) {
                var t = this.AsList();
                var _ = DataRow.DPId;
                for (var i = 0, l = t.length; i < l; i++)
                    if (t[i].GetValue(_) === id)
                        return t[i];
                return undefined;
            };
            DataTable.prototype.Update = function () {
            };
            DataTable.prototype.Upload = function () {
            };
            DataTable.prototype.Add = function (item) {
                return (this._list.indexOf(item) == -1) ? _super.prototype.Add.call(this, item) : this;
            };
            DataTable.DPOwner = DataTable.CreateField('Owner', DataRow, null, null, null, Corelib_1.bind.PropertyAttribute.SerializeAsId);
            DataTable.DPStat = Corelib_1.bind.DObject.CreateField('Stat', Number, 0, null, null, Corelib_1.bind.PropertyAttribute.Private);
            return DataTable;
        }(Corelib_1.collection.List));
        sdata.DataTable = DataTable;
        var stp = true;
    })(sdata = exports.sdata || (exports.sdata = {}));
    var base;
    (function (base) {
        var DateVecteur = /** @class */ (function (_super) {
            __extends(DateVecteur, _super);
            function DateVecteur() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(DateVecteur.prototype, "From", {
                get: function () { return this.get(DateVecteur.DPFrom); },
                set: function (v) { this.set(DateVecteur.DPFrom, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DateVecteur.prototype, "To", {
                get: function () { return this.get(DateVecteur.DPTo); },
                set: function (v) { this.set(DateVecteur.DPTo, v); },
                enumerable: true,
                configurable: true
            });
            DateVecteur.__fields__ = function () { return [DateVecteur.DPFrom, DateVecteur.DPTo]; };
            DateVecteur.prototype.Check = function (date) {
                if (!sdata)
                    return true;
                var f = this.From;
                var t = this.To;
                var val = date.getTime();
                return (f == null || f.getTime() <= val) && (t == null || t.getTime() >= val);
            };
            DateVecteur.DPFrom = Corelib_1.bind.DObject.CreateField('From', Date);
            DateVecteur.DPTo = Corelib_1.bind.DObject.CreateField('To', Date);
            return DateVecteur;
        }(Corelib_1.bind.DObject));
        base.DateVecteur = DateVecteur;
        var NumberVecteur = /** @class */ (function (_super) {
            __extends(NumberVecteur, _super);
            function NumberVecteur() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(NumberVecteur.prototype, "From", {
                get: function () { return this.get(NumberVecteur.DPFrom); },
                set: function (v) { this.set(NumberVecteur.DPFrom, v); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NumberVecteur.prototype, "To", {
                get: function () { return this.get(NumberVecteur.DPTo); },
                set: function (v) { this.set(NumberVecteur.DPTo, v); },
                enumerable: true,
                configurable: true
            });
            NumberVecteur.__fields__ = function () { return [NumberVecteur.DPFrom, NumberVecteur.DPTo]; };
            NumberVecteur.prototype.Check = function (val) {
                if (!val)
                    return true;
                return (this.From == null || this.From <= val) && (this.To == null || this.To >= val);
            };
            NumberVecteur.DPFrom = Corelib_1.bind.DObject.CreateField('From', Number);
            NumberVecteur.DPTo = Corelib_1.bind.DObject.CreateField('To', Number);
            return NumberVecteur;
        }(Corelib_1.bind.DObject));
        base.NumberVecteur = NumberVecteur;
    })(base = exports.base || (exports.base = {}));
    var crypto;
    (function (crypto) {
        var aes_store = {};
        var Sbox = new Uint8Array([99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]);
        var ShiftRowTab = new Uint8Array([0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 1, 6, 11]);
        var ShiftRowTab_Inv;
        var Sbox_Inv, xtime;
        function string2bytes(a) {
            var c = new Uint8Array(a.length);
            for (var d = 0; d < a.length; d++)
                c[d] = a.charCodeAt(d);
            return c;
        }
        crypto.string2bytes = string2bytes;
        function bytes2string(a) {
            for (var c = "", d = 0; d < a.length; d++)
                c += String.fromCharCode(a[d]);
            return c;
        }
        crypto.bytes2string = bytes2string;
        {
            ;
            Sbox_Inv = new Uint8Array(256);
            for (var b = 0; b < 256; b++)
                Sbox_Inv[Sbox[b]] = b;
            ShiftRowTab_Inv = new Uint8Array(16);
            for (b = 0; b < 16; b++)
                ShiftRowTab_Inv[ShiftRowTab[b]] = b;
            xtime = new Uint8Array(256);
            for (b = 0; b < 128; b++)
                xtime[b] = b << 1,
                    xtime[128 + b] = b << 1 ^ 27;
        }
        var ExAes = /** @class */ (function () {
            function ExAes(key) {
                if ('string' === typeof (key))
                    this.Key = this.InitKey(string2bytes(key));
                else if (key instanceof Uint8Array)
                    this.Key = this.InitKey(key);
                else
                    throw "Invalid Key";
            }
            ExAes.prototype.InitKey = function (key) {
                return key;
            };
            ExAes.ExpandKey = function (b) {
                ;
                var c = b.length, d, e = 1;
                switch (c) {
                    case 16:
                        d = 176;
                        break;
                    case 24:
                        d = 208;
                        break;
                    case 32:
                        d = 240;
                        break;
                    default:
                        alert("my.ExpandKey: Only key lengths of 16, 24 or 32 bytes allowed!");
                }
                for (var g = c; g < d; g += 4) {
                    var h = b.slice(g - 4, g);
                    if (g % c == 0) {
                        if (h = new Uint8Array([Sbox[h[1]] ^ e, Sbox[h[2]], Sbox[h[3]], Sbox[h[0]]]),
                            (e <<= 1) >= 256)
                            e ^= 283;
                    }
                    else
                        c > 24 && g % c == 16 && (h = new Uint8Array([Sbox[h[0]], Sbox[h[1]], Sbox[h[2]], Sbox[h[3]]]));
                    for (var f = 0; f < 4; f++)
                        b[g + f] = b[g + f - c] ^ h[f];
                }
            };
            ExAes.prototype.Encrypt = function (data) {
                ;
                var Key = this.Key;
                var d = Key.length;
                ExAes.AddRoundKey(data, Key.slice(0, 16));
                for (var e = 16; e < d - 16; e += 16)
                    ExAes.SubBytes(data, Sbox),
                        ExAes.ShiftRows(data, ShiftRowTab),
                        ExAes.MixColumns(data),
                        ExAes.AddRoundKey(data, Key.slice(e, e + 16));
                ExAes.SubBytes(data, Sbox);
                ExAes.ShiftRows(data, ShiftRowTab);
                ExAes.AddRoundKey(data, Key.slice(e, d));
                return data;
            };
            ExAes.prototype.Decrypt = function (data) {
                ;
                var Key = this.Key;
                var d = Key.length;
                ExAes.AddRoundKey(data, Key.slice(d - 16, d));
                ExAes.ShiftRows(data, ShiftRowTab_Inv);
                ExAes.SubBytes(data, Sbox_Inv);
                for (d -= 32; d >= 16; d -= 16)
                    ExAes.AddRoundKey(data, Key.slice(d, d + 16)),
                        ExAes.MixColumns_Inv(data),
                        ExAes.ShiftRows(data, ShiftRowTab_Inv),
                        ExAes.SubBytes(data, Sbox_Inv);
                ExAes.AddRoundKey(data, Key.slice(0, 16));
                return data;
            };
            ExAes.SubBytes = function (a, c) {
                ;
                for (var d = 0; d < 16; d++)
                    a[d] = c[a[d]];
            };
            ExAes.AddRoundKey = function (a, c) {
                ;
                for (var d = 0; d < 16; d++)
                    a[d] ^= c[d];
            };
            ExAes.ShiftRows = function (a, c) {
                ;
                for (var d = [].concat(a), e = 0; e < 16; e++)
                    a[e] = d[c[e]];
            };
            ExAes.MixColumns = function (b) {
                ;
                var _xtime = xtime;
                for (var c = 0; c < 16; c += 4) {
                    var d = b[c + 0], e = b[c + 1], g = b[c + 2], h = b[c + 3], f = d ^ e ^ g ^ h;
                    b[c + 0] ^= f ^ _xtime[d ^ e];
                    b[c + 1] ^= f ^ _xtime[e ^ g];
                    b[c + 2] ^= f ^ _xtime[g ^ h];
                    b[c + 3] ^= f ^ _xtime[h ^ d];
                }
            };
            ExAes.MixColumns_Inv = function (b) {
                ;
                var _xtime = xtime;
                for (var c = 0; c < 16; c += 4) {
                    var d = b[c + 0], e = b[c + 1], g = b[c + 2], h = b[c + 3], f = d ^ e ^ g ^ h, o = _xtime[f], p = _xtime[_xtime[o ^ d ^ g]] ^ f;
                    f ^= _xtime[_xtime[o ^ e ^ h]];
                    b[c + 0] ^= p ^ _xtime[d ^ e];
                    b[c + 1] ^= f ^ _xtime[e ^ g];
                    b[c + 2] ^= p ^ _xtime[g ^ h];
                    b[c + 3] ^= f ^ _xtime[h ^ d];
                }
            };
            return ExAes;
        }());
        crypto.ExAes = ExAes;
        var AesCBC = /** @class */ (function (_super) {
            __extends(AesCBC, _super);
            function AesCBC(key) {
                return _super.call(this, key) || this;
            }
            AesCBC.prototype.InitKey = function (key) {
                ExAes.ExpandKey(key);
                return key;
            };
            AesCBC.blockXOR = function (a, c) {
                ;
                for (var d = new Uint8Array(16), e = 0; e < 16; e++)
                    d[e] = a[e] ^ c[e];
                return d;
            };
            AesCBC.blockIV = function () {
                ;
                var a = new crypto.SecureRandom(), c = new Uint8Array(16);
                a.nextBytes(c);
                return c;
            };
            AesCBC.pad16 = function (a) {
                ;
                var c = a.slice(0), d = (16 - a.length % 16) % 16;
                var c = new Uint8Array(a.length + d);
                for (var i = 0, l = a.length; i < l; i++)
                    c[i] = a[i];
                return c;
            };
            ;
            AesCBC.depad = function (a) {
                ;
                for (var i = a.length - 1; i >= 0; i--)
                    if (a[i] != 0)
                        return a.slice(0, i + 1);
                return new Uint8Array(0);
            };
            AesCBC.prototype.concate = function (a, b) {
                var x = new Uint8Array(a.length + b.length);
                for (var i = 0, l = a.length; i < l; i++)
                    x[i] = a[i];
                for (var i = 0, j = a.length, l = b.length; i < l; i++, j++)
                    x[j] = b[i];
                return x;
            };
            AesCBC.prototype.Encrypt = function (data) {
                ;
                var Key = this.Key;
                data = AesCBC.pad16(data);
                var g = AesCBC.blockIV();
                for (var h = 0; h < data.length / 16; h++) {
                    var f = data.slice(h * 16, h * 16 + 16);
                    var o = g.slice(h * 16, (h + 1) * 16);
                    f = AesCBC.blockXOR(o, f);
                    _super.prototype.Encrypt.call(this, f);
                    g = this.concate(g, f);
                }
                return g;
            };
            AesCBC.prototype.Decrypt = function (data) {
                ;
                var g = new Uint8Array(data.length);
                var i0 = 0;
                var i1 = 16;
                var i2 = 32;
                for (var h = 1; h < data.length / 16; h++) {
                    var f = data.slice(i1, i2);
                    var o = data.slice(i0, i1);
                    _super.prototype.Decrypt.call(this, f);
                    f = AesCBC.blockXOR(o, f);
                    g.set(f, i0);
                    i0 = i1;
                    i1 = i2;
                    i2 += 16;
                }
                return AesCBC.depad(g);
            };
            return AesCBC;
        }(ExAes));
        crypto.AesCBC = AesCBC;
    })(crypto = exports.crypto || (exports.crypto = {}));
    (function (crypto) {
        var Arcfour = /** @class */ (function () {
            function Arcfour() {
                this.S = new Uint8Array(256);
            }
            ;
            Arcfour.prototype.init = function (a) {
                ;
                var b, c, d;
                for (b = 0; b < 256; ++b)
                    this.S[b] = b;
                for (b = c = 0; b < 256; ++b)
                    c = c + this.S[b] + a[b % a.length] & 255,
                        d = this.S[b],
                        this.S[b] = this.S[c],
                        this.S[c] = d;
                this.j = this.i = 0;
            };
            Arcfour.prototype.next = function () {
                ;
                var a;
                this.i = this.i + 1 & 255;
                this.j = this.j + this.S[this.i] & 255;
                a = this.S[this.i];
                this.S[this.i] = this.S[this.j];
                this.S[this.j] = a;
                return this.S[a + this.S[this.i] & 255];
            };
            return Arcfour;
        }());
        var rng_psize = 256, rng_state, rng_pool, rng_pptr;
        if (rng_pool == null) {
            rng_pool = new Uint8Array(rng_psize);
            rng_pptr = 0;
            var t;
            if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
                var z = window.crypto.random(32);
                for (t = 0; t < z.length; ++t)
                    rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
            }
            for (; rng_pptr < rng_psize;)
                t = Math.floor(65536 * Math.random()),
                    rng_pool[rng_pptr++] = t >>> 8,
                    rng_pool[rng_pptr++] = t & 255;
            rng_pptr = 0;
            rng_seed_time();
        }
        function prng_newstate() {
            return new Arcfour;
        }
        function rng_seed_int(a) {
            ;
            rng_pool[rng_pptr++] ^= a & 255;
            rng_pool[rng_pptr++] ^= a >> 8 & 255;
            rng_pool[rng_pptr++] ^= a >> 16 & 255;
            rng_pool[rng_pptr++] ^= a >> 24 & 255;
            rng_pptr >= rng_psize && (rng_pptr -= rng_psize);
        }
        function rng_seed_time() {
            rng_seed_int((new Date).getTime());
        }
        var SecureRandom = /** @class */ (function () {
            function SecureRandom() {
            }
            SecureRandom.prototype.nextBytes = function (a) {
                ;
                var b;
                for (b = 0; b < a.length; ++b)
                    a[b] = this.rng_get_byte();
            };
            SecureRandom.prototype.rng_get_byte = function () {
                ;
                if (rng_state == null) {
                    rng_seed_time();
                    rng_state = prng_newstate();
                    rng_state.init(rng_pool);
                    for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
                        rng_pool[rng_pptr] = 0;
                    rng_pptr = 0;
                }
                return rng_state.next();
            };
            return SecureRandom;
        }());
        crypto.SecureRandom = SecureRandom;
    })(crypto = exports.crypto || (exports.crypto = {}));
    var System;
    (function (System) {
        var co;
        var Color = /** @class */ (function () {
            function Color() {
            }
            Color.prototype.toHex = function (t, e) {
                t = parseInt(t, 10);
                for (var i = ""; t > 0;)
                    i = co[t % 16] + i, t = Math.floor(t / 16);
                for (; i.length < e;)
                    i = "0" + i;
                return i;
            };
            Color.prototype.hexToDec = function (t) {
                return parseInt(t, 16);
            };
            Color.prototype.toRgb = function (t) {
                var e, i, s, n;
                return "string" != typeof t
                    ? (e = t[0], i = t[1], s = t[2])
                    : -1 != t.indexOf("rgb")
                        ? (n = t.substr(t
                            .indexOf("(") +
                            1, t.lastIndexOf(")") - t.indexOf("(") - 1)
                            .split(","), e = n[0], i = n[1], s = n[2])
                        : ("#" == t.substr(0, 1) && (t = t.substr(1)), e = this.hexToDec(t.substr(0, 2)), i = this
                            .hexToDec(t.substr(2, 2)), s = this
                            .hexToDec(t
                            .substr(4, 2))), e = parseInt(e, 10) || 0, i = parseInt(i, 10) || 0, s =
                    parseInt(s, 10) || 0,
                    (0 > e || e > 255) && (e = 0), (0 > i || i > 255) && (i = 0), (0 > s || s > 255) && (s = 0), [e, i, s];
            };
            Color.prototype.hsvToRgb = function (t, e, i) {
                var s, n, a, r, h, o, l, c;
                switch (s = Math
                    .floor(t / 60) %
                    6, n = t / 60 - s, a = i * (1 - e), r = i * (1 - n * e), h = i * (1 - (1 - n) * e), o = 0, l = 0,
                    c = 0, s) {
                    case 0:
                        o = i, l = h, c = a;
                        break;
                    case 1:
                        o = r, l = i, c = a;
                        break;
                    case 2:
                        o = a, l = i, c = h;
                        break;
                    case 3:
                        o = a, l = r, c = i;
                        break;
                    case 4:
                        o = h, l = a, c = i;
                        break;
                    case 5:
                        o = i, l = a, c = r;
                }
                return o = Math.floor(255 * o), l = Math.floor(255 * l), c = Math.floor(255 * c), [o, l, c];
            };
            Color.prototype.rgbToHsv = function (t, e, i) {
                var s, n, a, r, h, o, l, c;
                return s = t / 255, n = e / 255, a = i / 255, r = Math.min(s, n, a), h = Math
                    .max(s, n, a), l = 0, o = 0 === h ? 0 : 1 - r / h, c = h,
                    h == r
                        ? l = 0
                        : h == s && n >= a
                            ? l = 60 * (n - a) / (h - r) + 0
                            : h == s && a > n
                                ? l = 60 * (n - a) / (h - r) + 360
                                : h == n ? l = 60 * (a - s) / (h - r) + 120 : h == a && (l = 60 * (s - n) / (h - r) + 240),
                    [l, o, c];
            };
            return Color;
        }());
    })(System = exports.System || (exports.System = {}));
});
//# sourceMappingURL=System.js.map