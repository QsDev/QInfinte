"use strict";

if (typeof s === 'undefined') var s;
if (typeof stop === 'undefined') var stop =function () { if (s) {} };
var str = {};
if (typeof localStorage === 'undefined')
    var localStorage = {
        setItem: function (a, b) { str[a] = b; },
        getItem: function (a) { return str[a]; },
        function() { if (s) {} }
    };
var __extends = function (d, b) {
    Object.defineProperty(d, 'base', {
        value: b,
        writable: false,
        enumerable: true,
        configurable: false
    });
    for (var p in b) if (p != 'base' && b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __extend1 = __extends;
String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.startsWith = function (suffix) {
    return this.indexOf(suffix) === 0;
};

var isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
var w = window;
var isWebWorker = !isBrowser && typeof importScripts !== 'undefined';
var isOpera = typeof w.opera !== 'undefined' && w.opera.toString() === '[object Opera]';
var net;
(function (net) {
    var Header = (function () {
        function Header(key, value) {
            this._key = key;
            this._value = value;
        }
        Object.defineProperty(Header.prototype, "key", {
            get: function () {
                return this._key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Header.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: true,
            configurable: true
        });
        return Header;
    }());
    net.Header = Header;
    var EventListener = (function () {
        function EventListener(key) {
            this._deleagtes = [];
            this.key = new Object();
            this.key = key;
        }
        Object.defineProperty(EventListener.prototype, "On", {
            set: function (delegate) {
                this._deleagtes.push(delegate);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventListener.prototype, "Off", {
            set: function (delegate) {
                var i = this._deleagtes.indexOf(delegate);
                if (i == -1)
                    return;
                this._deleagtes.splice(i, 1);
            },
            enumerable: true,
            configurable: true
        });
        EventListener.prototype.Invok = function (key, callBack) {
            var l = this._deleagtes.length;
            if (key == this.key && l > 0)
                for (var i = 0; i < l; i++)
                    try {
                        callBack(this._deleagtes[i]);
                    }
                    catch (e) {
                        
                    }
        };
        EventListener.prototype.Add = function (delegate, key) {
            if (this._store == null)
                this._store = [];
            if (key)
                this._store.push({ k: key, d: delegate });
            this._deleagtes.push(delegate);
        };
        EventListener.prototype.Remove = function (key) {
            if (this._store)
                for (var i = 0; i < this._store.length; i++) {
                    var p = this._store[i];
                    if (p.k == key) {
                        this._store.splice(i, 1);
                        i--;
                    }
                }
        };
        return EventListener;
    }());
    net.EventListener = EventListener;
    var ResponseType;
    (function (ResponseType) {
        ResponseType[ResponseType["json"] = 0] = "json";
        ResponseType[ResponseType["Document"] = 1] = "Document";
        ResponseType[ResponseType["Text"] = 2] = "Text";
        ResponseType[ResponseType["ArrayBuffer"] = 3] = "ArrayBuffer";
        ResponseType[ResponseType["Blob"] = 4] = "Blob";
    })(ResponseType = net.ResponseType || (net.ResponseType = {}));
    var WebRequestMethod;
    (function (WebRequestMethod) {
        WebRequestMethod[WebRequestMethod["Get"] = 0] = "Get";
        WebRequestMethod[WebRequestMethod["Post"] = 1] = "Post";
        WebRequestMethod[WebRequestMethod["Head"] = 2] = "Head";
        WebRequestMethod[WebRequestMethod["Put"] = 3] = "Put";
        WebRequestMethod[WebRequestMethod["Delete"] = 4] = "Delete";
        WebRequestMethod[WebRequestMethod["Options"] = 5] = "Options";
        WebRequestMethod[WebRequestMethod["Connect"] = 6] = "Connect";
    })(WebRequestMethod = net.WebRequestMethod || (net.WebRequestMethod = {}));
    var WebRequest = (function () {
        function WebRequest() {
            this.http = new XMLHttpRequest();
            this._responseType = null;
            this.key = new Object();
            this.OnInitialized = new EventListener(this.key);
            this.OnSetup = new EventListener(this.key);
            this.OnSended = new EventListener(this.key);
            this.OnProgress = new EventListener(this.key);
            this.OnComplete = new EventListener(this.key);
            this.http.onprogress = this._onprogress.bind(this);
            this.http.onload = this._onprogress.bind(this);
        }
        Object.defineProperty(WebRequest.prototype, "method", {
            get: function () {
                return this._method == null ? 0 : this._method;
            },
            set: function (v) {
                if (WebRequestMethod[v] == null)
                    return;
                this._method = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebRequest.prototype, "ResponseType", {
            get: function () {
                return this._responseType || ResponseType.Text;
            },
            set: function (v) {
                this._responseType = v;
            },
            enumerable: true,
            configurable: true
        });
        WebRequest.prototype._onprogress = function (e) {
            var cur = null;
            switch (this.http.readyState) {
                case 0:
                    cur = this.OnInitialized;
                    break;
                case 1:
                    cur = this.OnSetup;
                    break;
                case 2:
                    cur = this.OnSended;
                    break;
                case 3:
                    cur = this.OnProgress;
                    break;
                case 4:
                    cur = this.OnComplete;
                    break;
            }
            if (cur) {
                var t = this;
                cur.Invok(this.key, function (dlg) { dlg(t); });
            }
        };
        Object.defineProperty(WebRequest.prototype, "IsSuccess", {
            get: function () { return this.http.status == 200 && this.http.readyState == 4; },
            enumerable: true,
            configurable: true
        });
        WebRequest.prototype.Download = function (url, data) {
            this.http.onprogress = this._onprogress.bind(this);
            this.http.open(WebRequestMethod[this.method], url, true);
            this.http.responseType = ResponseType[this.ResponseType].toLowerCase();
            if (this.method == WebRequestMethod.Get)
                this.http.send();
            else
                this.http.send(data);
        };
        WebRequest.prototype.GetFileSize = function (url, callback) {
            this.http.open("HEAD", url, true);
            this.http.onreadystatechange = function () {
                if (this.readyState == this.DONE) {
                    if (callback)
                        callback(parseInt(this.getResponseHeader("Content-Length")));
                }
            };
            this.http.send();
        };
        WebRequest.prototype.GetHeader = function (url, callback) {
            this.http.open("HEAD", url, true);
            this.http.onreadystatechange = function () {
                if (this.readyState == this.DONE) {
                    if (callback) {
                        var h = this.getAllResponseHeaders().split('\r\n');
                        var t = [];
                        for (var i = h.length - 1; i >= 0; i--) {
                            var p = h[i];
                            if (p) {
                                var vk = p.split(': ');
                                t.push(new Header(vk[0], vk[1]));
                            }
                        }
                        Object.freeze(t);
                        callback(t);
                    }
                }
            };
            this.http.send();
        };
        Object.defineProperty(WebRequest.prototype, "Response", {
            get: function () {
                return this.http.response;
            },
            enumerable: true,
            configurable: true
        });
        return WebRequest;
    }());
    net.WebRequest = WebRequest;
    var __data = (function () {
        function __data(url, data) {
            this.url = url;
            this.data = data;
        }
        return __data;
    }());
    var Downloader = (function () {
        function Downloader() {
            this.webr = new net.WebRequest();
            this.quee = [];
            this.isRunning = false;
            this.isDownloading = false;
            this.success = [];
            this.fails = [];
            this.OnSuccess = new EventListener(1);
            this.OnFail = new EventListener(1);
            this.OnFinish = new EventListener(1);
            this.webr.method = net.WebRequestMethod.Get;
            this.webr.ResponseType = net.ResponseType.Text;
            this.webr.OnComplete.Add(this.DownloadComplete.bind(this), "DCT");
        }
        Object.defineProperty(Downloader.prototype, "Request", {
            get: function () { return this.webr; },
            enumerable: true,
            configurable: true
        });
        Downloader.prototype.DownloadComplete = function (xmlRequest) {
            var x;
            this.isDownloading = false;
            if (this.webr.IsSuccess) {
                x = this.OnSuccess;
                this.success.push(this.current);
            }
            else {
                x = this.OnFail;
                this.fails.push(this.current);
            }
            try {
                var ___this = this;
                x.Invok(1, function (arg) { arg(___this, ___this.current.data); });
            }
            catch (error) {
            }
            this.Next();
        };
        Downloader.prototype.Push = function (url, data) {
            this.quee.push(new __data(url, data));
            if (!this.isRunning)
                this.Start();
        };
        Downloader.prototype.Start = function () {
            if (this.isDownloading)
                return;
            this.isRunning = true;
            this.Next();
        };
        Downloader.prototype.Next = function () {
            if (0 == this.quee.length) {
                this.isRunning = false;
                this.isDownloading = false;
                var ___this = this;
                this.OnFinish.Invok(1, function (arg) { arg(___this, ___this.current.data); });
                return;
            }
            var c = this.current = this.quee.shift();
            this.webr.Download(c.url, c.data);
            this.isDownloading = true;
        };
        Downloader.prototype.Restart = function () {
            this.isDownloading = false;
            this.Start();
        };
        return Downloader;
    }());
    net.Downloader = Downloader;
    function loadScript(path, callback) {
        var done = false;
        var scr = document.createElement('script');
        scr.onload = handleLoad;
        //scr.addEventListener('readystatechange', handleReadyStateChange);
        scr.onerror = handleError;
        scr.src = path;
        try {
            document.body.appendChild(scr);
        }
        catch (e) {
            
            handleError();
        }
        function handleLoad() {
            if (!done) {
                done = true;
                callback(path, "ok");
            }
        }
        function handleError() {
            if (!done) {
                done = true;
                callback(path, "error");
            }
        }
    }
    net.loadScript = loadScript;
})(net = exports.net || (exports.net = {}));
window.net = net;
var wr = new net.WebRequest();
var ff = true;
var SubsFolder = (function () {
    function SubsFolder(folder) {
        this.folder = folder;
        this._store = {};
    }
    SubsFolder.prototype.GetFolder = function (folderName) {
        return this._store[folderName.toLowerCase().trim()];
    };
    SubsFolder.prototype.createFolder = function (foldername) {
        var t = new Folder(this.folder, foldername);
        this._store[foldername.toLowerCase().trim()] = t;
        return t;
    };
    return SubsFolder;
}());
exports.SubsFolder = SubsFolder;
var Modules = (function () {
    function Modules() {
        this._store = {};
        this.OnExecuted = new net.EventListener(1);
    }
    Modules.prototype.getModule = function (name) {
        name = name.toLowerCase().trim();
        if (!name.endsWith('.js'))
            name += ".js";
        return this._store[name];
    };
    Modules.prototype.setModule = function (name, _module) {
        name = name.toLowerCase().trim();
        if (!name.endsWith('.js'))
            name += ".js";
        this._store[name] = _module;
    };
    return Modules;
}());
exports.Modules = Modules;
var Folder = (function () {
    function Folder(Parent, Name) {
        this.Parent = Parent;
        this.Name = Name;
        this.Modules = new Modules();
        if (ff) {
            this.Parent = this;
            ff = false;
            this.Name = "";
        }
        else if (parent == null) {
            this.Parent = root;
        }
        this.subFolders = new SubsFolder(this);
    }
    Folder.prototype.GetModule = function (modulePath) {
        if (typeof (modulePath) == 'string') {
            modulePath = modulePath.split('/');
        }
        if (modulePath.length == 0)
            return null;
        var folder = this.createPath(modulePath);
        var moduleName = modulePath[modulePath.length - 1];
        var t = folder.Modules.getModule(moduleName);
        if (t)
            return t;
        folder.Modules.setModule(moduleName, t = new Module(folder, moduleName));
        return t;
    };
    Object.defineProperty(Folder.prototype, "FullName", {
        get: function () {
            if (this._fn == null) {
                if (this == this.Parent)
                    return "./";
                return this.Parent.FullName + this.Name + '/';
            }
        },
        enumerable: true,
        configurable: true
    });
    Folder.prototype.createPath = function (modulePath) {
        if (typeof (modulePath) == 'string') {
            modulePath = modulePath.split('/');
        }
        var cf = this;
        for (var i = 0, l = modulePath.length - 1; i < l; i++) {
            var folderName = modulePath[i];
            folderName = folderName.trim();
            switch (folderName) {
                case '':
                    cf = root;
                    break;
                case '.':
                    continue;
                case '..':
                    cf = cf.Parent;
                    continue;
                default:
                    var f = cf.subFolders.GetFolder(folderName);
                    if (f == null)
                        cf = cf.subFolders.createFolder(folderName);
                    else
                        cf = f;
                    break;
            }
        }
        return cf;
    };
    return Folder;
}());
exports.Folder = Folder;
var Dependency = (function () {
    function Dependency(Args, module, Index) {
        this.Args = Args;
        this.module = module;
        this.Index = Index;
    }
    return Dependency;
}());
exports.Dependency = Dependency;
var ModuleStat;
(function (ModuleStat) {
    ModuleStat[ModuleStat["New"] = 0] = "New";
    ModuleStat[ModuleStat["Downloading"] = 1] = "Downloading";
    ModuleStat[ModuleStat["Downloaded"] = 2] = "Downloaded";
    ModuleStat[ModuleStat["Defining"] = 3] = "Defining";
    ModuleStat[ModuleStat["Defined"] = 4] = "Defined";
    ModuleStat[ModuleStat["Executing"] = 5] = "Executing";
    ModuleStat[ModuleStat["Executed"] = 6] = "Executed";
    ModuleStat[ModuleStat["Failed"] = 7] = "Failed";
})(ModuleStat = exports.ModuleStat || (exports.ModuleStat = {}));
;
var Args = (function () {
    function Args(module, calback) {
        this.Dependencies = new Array(2);
        this.nsuccess = 0;
        this.Module = module;
        this.callback = calback;
        this.moduleExecuted = this.moduleExecuted.bind(this);
    }
    Args.prototype.createDependency = function (module, index) {
        if (!(module instanceof Module)) {
            this.nsuccess++;
        }
        else {
            switch (module.Stat) {
                case ModuleStat.Executed:
                    this.nsuccess++;
                    break;
                case ModuleStat.Failed:
                    throw "one dependency failed to execute";
                case ModuleStat.New:
                    module.Download();
                    module.OnExecuted.Add(this.moduleExecuted, "me");
                    break;
                default:
                    module.OnExecuted.Add(this.moduleExecuted, "me");
                    break;
            }
        }
        var t = new Dependency(this, module, index);
        this.Dependencies[index] = t;
        return t;
    };
    Args.prototype.moduleExecuted = function (module) {
        module.OnExecuted.Remove("me");
        this.nsuccess++;
        if (this.nsuccess >= this.Dependencies.length) {
            this.Execute();
        }
    };
    Args.prototype.populateArgs = function () {
        var _ = new Array(this.Dependencies.length);
        var $ = this.Dependencies;
        for (var i = 0, l = $.length; i < l; i++) {
            var m = $[i].module;
            if (m instanceof Module)
                _[i] = m.exports;
            else
                _[i] = m;
        }
        this._args = _;
    };

    Args.prototype.Execute = function () {
        try {
            this.populateArgs();
            var t = this.Module;
            try {
                if (t.Stat >= ModuleStat.Executed)
                    return;
                t.Stat = ModuleStat.Executing;
                this.callback.apply(window, this._args);
                t.Stat = ModuleStat.Executed;
                try {
                    this.Module.OnExecuted.Invok(1, function (f) { return f(t); });
                }
                catch (e) {
                    
                }
            }
            catch (e) {
                t.Stat = ModuleStat.Failed;
            }
        }
        catch (e) {
        }
    };
    Args.prototype.Invoke = function () {
        if (this.nsuccess >= this.Dependencies.length) {
            this.Execute();
        }
    };
    return Args;
}());
exports.Args = Args;
var Exports = (function () {
    function Exports() {
    }
    return Exports;
}());
exports.Exports = Exports;
var Module = (function () {
    function Module(folder, name) {
        this.http = new net.Downloader();
        this.OnExecuted = new net.EventListener(1);
        this.exports = new Exports();
        this._dependencies = [];
        this.dependencies = [];
        this._stat = ModuleStat.New;
        this.Script = "";
        this._thisContext = {};
        this.ext = '.js';
        this.Name = name;
        if (folder == null) {
            throw "Context errro";
        }
        this.Folder = folder;
        this._require = this.require.bind(this);
    }
    Module.prototype.require = function (modulePath, callback, onerror) {
        if (typeof modulePath == 'string') {
            var t = this.Folder.GetModule(modulePath);
            if (t.Stat == ModuleStat.Executed)
                return callback(t.exports);
            else if (t.Stat == ModuleStat.Failed)
                return onerror(t);
            else if (t.Stat == ModuleStat.Downloading) {
                var fid = Date.now();
                t.OnExecuted.Add(function (d) {
                    d.OnExecuted.Remove(fid);
                    callback(d.exports);
                }, fid);
            }
            else if (t.Stat == ModuleStat.New) {
                t.OnExecuted.Add(function (d) {
                    d.OnExecuted.Remove(fid);
                    callback(d.exports);
                }, fid);
                return t.Download(callback, onerror);
            }
        }
    };
    Module.prototype.Download = function (callback, onerror) {
        if (this.Stat >= ModuleStat.Downloading)
            return;        
        var fid = Date.now();
        this.http.Push(this.FullName, { callback: callback, fid: fid, onerror: onerror });
        this.Stat = ModuleStat.Downloading;
        this.http.OnSuccess.Add(this.OnID.bind(this), fid);
        this.http.OnFail.Add(this.OnIND.bind(this), fid);
    };
    Module.prototype.OnID = function (downloader, data) {
        if (this.Stat > ModuleStat.Downloading)
            return;
        this.http.OnSuccess.Remove(data.fid);
        this.Script = downloader.Request.Response;
        this.Stat = ModuleStat.Downloaded;
        this.BeginDefine();
    };
    Module.prototype.OnIND = function (downloader, data) {
        this.http.OnFail.Remove(data.fid);
        this.Stat = ModuleStat.Failed;
        data.onerror(this);
    };
    Module.prototype.define = function (dependencies, callback) {
        if (this.Stat >= ModuleStat.Defining)
            return;
        this.Stat = ModuleStat.Defining;
        var args = new Args(this, callback);
        var http = this.http;
        for (var i = 0, l = dependencies.length; i < l; i++) {
            var d = dependencies[i];
            if (d == "exports") {
                args.createDependency(this.exports, i);
                continue;
            }
            else if (d == 'require') {
                args.createDependency(this.require.bind(this), i);
                continue;
            }
            else if(d=='module'){
    
            }
            else {
                var dependencyModule = this.Folder.GetModule(d);
                var dm = args.createDependency(dependencyModule, i);
            }
        }
        this.Stat = ModuleStat.Defined;
        args.Invoke();
    };
    Module.prototype.BeginDefine = function () {
        try {
            var define = this.define.bind(this);
            eval(this.Script);
        }
        catch (e) {
            this.Stat = ModuleStat.Failed;
        }
    };
    Module.prototype.__extends = __extends;
    Object.defineProperty(Module.prototype, "Stat", {
        get: function () {
            return this._stat;
        },
        set: function (v) {
            if (v == this._stat)
                return;
            if (v == ModuleStat.Failed) 
                console.error(this.FullName, " : ", ModuleStat[v]);
             else console.log(this.FullName, " : ", ModuleStat[v]);
            this._stat = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "Name", {
        get: function () { return this._name; },
        set: function (path) {
            var t = (path.lastIndexOf(".") - 1 >>> 0) + 2;
            this.ext = path.slice(t);
            this._name = path.substring(0, t - 1);
            if (this.ext == "")
                this.ext = "js";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Module.prototype, "FullName", {
        get: function () {
            if (this._fn == null) {
                if (this == globalContext)
                    return "/";
                this._fn = this.Folder.FullName + this.Name + "." + this.ext;
            }
            return this._fn;
        },
        enumerable: true,
        configurable: true
    });
    return Module;
}());
exports.Module = Module;
var root = new Folder(null, "");
var globalContext = new Module(root, "");
//globalContext.Stat = ModuleStat.Executed;
window.require = globalContext.require.bind(globalContext);
window.define = globalContext.define.bind(globalContext);
var scrs = document.getElementsByTagName('script');
for (var i = 0; i < scrs.length; i++) {
    var scr = scrs.item(i);
    //var app =scr.getAttribute('context');
    //if (app != undefined) {
    //    window .require(app,
    //    function (o) { },
    //    function (o) { alert('we cannot find app'); });
    //}
    var app = scr.getAttribute('data-main');
    if (app != undefined) {
        window.require(app,
        function (o) { },
        function (o) { alert('we cannot find app'); });
    }
    window.require(app, function (o) { }, function (o) { alert('we cannot find app'); });
}