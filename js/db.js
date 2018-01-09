define(["require", "exports", "./Corelib", "./System"], function (require, exports, Corelib_1, System_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var db;
    (function (db_1) {
        var Database = /** @class */ (function () {
            function Database() {
                this.databaseName = "data_store";
                this.databaseDesc = "Data store";
                this.sqlLiteDBVersion = "1.0";
                this.FIVE_MB = 5120;
                this.tableName = "data-store";
                this._commands = [];
                this._current = { value: null };
                this._IsExecuting = false;
                this._job = Corelib_1.thread.Dispatcher.cretaeJob(this._runCmd, [], this, false);
            }
            Database.prototype.initialize = function () {
                this.database = openDatabase(this.databaseName, this.sqlLiteDBVersion, this.databaseDesc, this.FIVE_MB);
                this._transaction = this._transaction.bind(this);
                this._OnError = this._OnError.bind(this);
                this._OnSuccess = this._OnSuccess.bind(this);
            };
            Database.prototype.execute = function (command, callback) {
                var _this = this;
                this.database.transaction(function (db) {
                    db.executeSql(command, [], callback ? function (s, r) { return callback(true, _this, s, r); } : void 0);
                }, callback ? function (err) { return callback(false, _this, err); } : void 0);
            };
            Database.prototype.syncExecute = function (command, callback) {
                this._Push({ cmd: command, callback: callback });
            };
            Database.prototype._Push = function (cmd) {
                this._commands.push(cmd);
                if (!this._IsExecuting)
                    return this._next();
            };
            Database.prototype._runCmd = function () {
                this.database.transaction(this._transaction, this._OnError);
            };
            Database.prototype._transaction = function (db) {
                db.executeSql(this._current.value.cmd, [], this._OnSuccess);
            };
            Database.prototype._OnSuccess = function (sql, rslt) {
                try {
                    this._current.value.callback && this._current.value.callback(true, this, sql, rslt);
                }
                catch (e) {
                }
                this._next();
            };
            Database.prototype._OnError = function (sqlE) {
                try {
                    this._current.value.callback && this._current.value.callback(false, this, sqlE);
                }
                catch (e) {
                }
                this._next();
            };
            Database.prototype._next = function () {
                if (this._commands.length === 0) {
                    this._IsExecuting = false;
                    return;
                }
                this._IsExecuting = true;
                this._current.value = this._commands.pop();
                Corelib_1.thread.Dispatcher.Push(this._job, [this._current]);
            };
            return Database;
        }());
        db_1.Database = Database;
        var SQLInstructureBuilder = /** @class */ (function () {
            function SQLInstructureBuilder(tableName, type) {
                this.tableName = tableName;
                this.type = type;
                this._map = {};
                this.init();
            }
            Object.defineProperty(SQLInstructureBuilder.prototype, "Key", {
                get: function () {
                    return this._key;
                },
                enumerable: true,
                configurable: true
            });
            SQLInstructureBuilder.prototype.init = function () {
                var flds = Corelib_1.bind.DObject.getFields(this.type);
                for (var i = 0; i < flds.length; i++) {
                    var fld = flds[i];
                    if (fld.IsKey)
                        this._key = fld;
                    this._map[fld.Name] = fld.Type;
                }
                this.cretaeCmd = this.getCreateCmd();
                this.insertCmd = this.getInsertCmd();
                this.updateCmd = this.getUpdateCmd();
                this.selectCmd = this.getSelectCmd();
                this.deleteCmd = this.getDeleteCmd();
            };
            SQLInstructureBuilder.prototype.getSB = function (s) {
                return Corelib_1.basic.CompileString(s, this.getDbValue, this);
            };
            SQLInstructureBuilder.prototype.getCreateCmd = function () {
                var flds = Corelib_1.bind.DObject.getFields(this.type);
                var s = "CREATE TABLE IF NOT EXISTS [" + this.tableName + "] (";
                for (var i = 0; i < flds.length; i++) {
                    var fld = flds[i];
                    var type = this.getTypeName(fld.Type);
                    if (type == undefined) {
                        console.error("Filed [" + fld.Name + "] of table " + this.tableName + " cannot be created");
                        continue;
                    }
                    if (i !== 0)
                        s += ",";
                    s += "[" + fld.Name + "] " + type + ((fld.Attribute & Corelib_1.bind.PropertyAttribute.IsKey) === Corelib_1.bind.PropertyAttribute.IsKey ? " PRIMARY KEY" : " ");
                }
                s += ")";
                return this.getSB(s);
            };
            SQLInstructureBuilder.prototype.getInsertCmd = function () {
                var flds = Corelib_1.bind.DObject.getFields(this.type);
                var names = "", values = "";
                for (var i = 0; i < flds.length; i++) {
                    var fld = flds[i];
                    if (i !== 0) {
                        names += ",";
                        values += ",";
                    }
                    names += "[" + fld.Name + "]";
                    values += "@" + fld.Name;
                }
                return this.getSB("INSERT INTO [" + this.tableName + "] (" + names + ") VALUES (" + values + ')');
            };
            SQLInstructureBuilder.prototype.getUpdateCmd = function () {
                var flds = Corelib_1.bind.DObject.getFields(this.type);
                var inst = "";
                var key = null;
                for (var i = 0; i < flds.length; i++) {
                    var fld = flds[i];
                    if (i !== 0)
                        inst += ",";
                    if (!key && fld.IsKey)
                        key = fld;
                    inst += "[" + fld.Name + "] = @" + fld.Name + "";
                }
                inst = "UPDATE [" + this.tableName + "] SET " + inst + " WHERE [" + key.Name + "] = @" + key.Name;
                return this.getSB(inst);
            };
            SQLInstructureBuilder.prototype.getSelectCmd = function () {
                return this.getSB("SELECT * FROM [" + this.tableName + "] WHERE [" + this._key.Name + "] = @" + this._key.Name + " LIMIT 1");
            };
            SQLInstructureBuilder.prototype.getDeleteCmd = function () {
                return this.getSB("DELETE FROM [" + this.tableName + "] WHERE [" + this._key.Name + "] = @" + this._key.Name);
            };
            SQLInstructureBuilder.prototype.getTypeName = function (type) {
                if (type === String)
                    return 'TEXT';
                if (type === Number)
                    return 'Number';
                if (type === Boolean)
                    return 'Boolean';
                if (Corelib_1.reflection.IsInstanceOf(type, System_1.sdata.DataRow))
                    return 'number';
                if (Corelib_1.reflection.IsInstanceOf(type, System_1.sdata.DataTable))
                    return undefined;
                console.error("Unresolved Type = " + type, type);
                throw "unresolved type";
            };
            SQLInstructureBuilder.prototype.getDbValue = function (name, v) {
                var _this = this.params;
                var type = _this._map[name];
                switch (type) {
                    case String:
                        return v == null ? "null" : "'" + v + "'";
                    case Number:
                        return v == undefined ? 'null' : String(v);
                    case Boolean:
                        return v == undefined ? 'null' : v ? '1' : '0';
                    default:
                        if (Corelib_1.reflection.IsInstanceOf(type, System_1.sdata.DataRow)) {
                            var id = v && v.Id;
                            if (id == null)
                                return 'null';
                            return String(id);
                        }
                        else
                            return undefined;
                }
            };
            SQLInstructureBuilder.parseBool = function (v) {
                if (v == null)
                    return null;
                switch (typeof v) {
                    case 'string':
                        if (v === 'true')
                            return true;
                        if (v === 'false')
                            return false;
                        v = parseFloat(v);
                        return !!v;
                    case 'number':
                        break;
                    case 'boolean':
                        return v;
                    default:
                        return !!v;
                }
            };
            SQLInstructureBuilder.prototype.getJsValue = function (name, v) {
                var _this = this.params;
                var type = _this._map[name];
                switch (type) {
                    case String:
                        return v;
                    case Number:
                        return typeof v === 'string' ? parseFloat(v) : v;
                    case Boolean:
                        return SQLInstructureBuilder.parseBool(v);
                    default:
                        if (Corelib_1.reflection.IsInstanceOf(type, System_1.sdata.DataRow)) {
                            var id = v && v.Id;
                            if (id == null)
                                return 'null';
                            return String(id);
                        }
                        else
                            return undefined;
                }
            };
            return SQLInstructureBuilder;
        }());
        db_1.SQLInstructureBuilder = SQLInstructureBuilder;
        var DatabaseTable = /** @class */ (function () {
            function DatabaseTable(database, tableName, type) {
                this.database = database;
                if (!Corelib_1.reflection.IsInstanceOf(type, Corelib_1.bind.DObject))
                    throw "Type not implimented";
                this.builder = new SQLInstructureBuilder(tableName, type);
            }
            DatabaseTable.prototype.Insert = function (row, callback) {
                this.database.syncExecute(this.builder.insertCmd.apply(row), callback);
            };
            DatabaseTable.prototype.Delete = function (row, callback) {
                this.database.syncExecute(this.builder.deleteCmd.apply(row), callback);
            };
            DatabaseTable.prototype.Update = function (row, callback) {
                this.database.syncExecute(this.builder.updateCmd.apply(row), callback);
            };
            DatabaseTable.prototype.Select = function (row, callback) {
                this.database.syncExecute(this.builder.selectCmd.apply(row), callback);
            };
            DatabaseTable.prototype.Create = function (callback) {
                this.database.syncExecute(this.builder.cretaeCmd.apply({}), callback);
            };
            return DatabaseTable;
        }());
        db_1.DatabaseTable = DatabaseTable;
    })(db = exports.db || (exports.db = {}));
});
//# sourceMappingURL=db.js.map