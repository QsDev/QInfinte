"use strict";
if (typeof __extends === 'undefined') {
    //var __extends1 = function (d, b) {
    //    Object.defineProperty(d, 'base', {
    //        value: b,
    //        writable: false,
    //        enumerable: true,
    //        configurable: false
    //    });
    //    for (var p in b)
    //        if (p == 'base' && p == '__id__' && p == '__fields__')
    //            continue;
    //    if (b.hasOwnProperty(p))
    //        d[p] = b[p];
    //    function __() { this.constructor = d; }
    //    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    //};
    //Object.defineProperty(window, '__extends', { value: __extends1, writable: false, configurable: false, enumerable: false });
}

var Qrc = {
    UseRelativePath: true,
};
if (typeof QReqConfig === 'object')
    for (var p in Qrc)
        if (QReqConfig.hasOwnProperty(p))
            Qrc[p] = QReqConfig[p];
var globalContext;
var define;
var OnModuleCreated = [];
var _listeners = [];
OnModuleCreated.push(function (m) {
	if (m.FullName.toLowerCase().indexOf('apps/js') != -1) {  }
})
var SynDownloader = (function () {
    function SynDownloader() {
        this.quee = [];
        this.dquee = [];
        this.isRunning = false;
        this.isDownloading = false;
    }
    SynDownloader.prototype.Push = function (module) {
        for (var i = 0; i < OnModuleCreated.length; i++)
            OnModuleCreated[i](module);
        this.quee.push(module);
        if (!this.isRunning)
            this.Start();
    };
    SynDownloader.prototype.Start = function () {
        if (this.isDownloading)
            return;
        this.isRunning = true;
        this.Next();
    };
    SynDownloader.prototype.Next = function () {
        if (0 == this.quee.length) {
            this.isRunning = false;
            this.isDownloading = false;
            var ___this = this;
            return;
        }
        this.isDownloading = true;
        do {
            var c = this.current = this.quee.shift();
            if (c == null) {
                this.isDownloading = false;
                this.isRunning = false;
                return;
            }
            if (c.Stat > 4) {
                continue;
            } else if (c.Stat > 1) {
                this.handleEvent({ type: 'load' });
                continue;
            } else break;
        } while (c.Stat>1);        

        var s = document.createElement('script');
        s.src = c.FullName;
        c.Stat = 1;
        //this.dquee.push((window as any).define);
        window.define = c.define;
        s.addEventListener('load', this);
        s.addEventListener('error', this);
        s.addEventListener('onreadystatechange', this);
        document.head.appendChild(s);
    };
    SynDownloader.prototype.handleEvent = function (e) {
        if (e.type == 'load') {
            this.current.OnLoad(e);
        }
        else if (e.type == 'error') {
            this.current.OnError(e);
        }
        document.head.removeChild(e.target);
        this.isDownloading = false;
        window.define = globalContext.define;
        this.Next();
    };
    return SynDownloader;
}());
var synd = new SynDownloader();



var ModuleType = (function ()
{
    var t = {};
    t[t["Code"] = 0] = "Code";
    t[t["Json"] = 1] = "Json";
    t[t["Xml"] = 2] = "Xml";
    t[t["Html"] = 3] = "Html";
    t[t["Image"] = 4] = "Image";
    t[t["template"] = 5] = "template";
    return t;
}
)();
var ModuleExt = (function ()
{
    var t = {};
    t[t["js"] = 0] = "js";
    t[t["json"] = 1] = "json";
    t[t["xml"] = 2] = "xml";
    t[t["html"] = 3] = "html";
    t[t["img"] = 4] = "img";
    t[t["template"] = 5] = "html";
    return t;
}
)();
    
var ModuleStat = (function ()
{
    var enumt = {};
    enumt[enumt["New"] = 0] = "New";
    enumt[enumt["Downloading"] = 1] = "Downloading";
    enumt[enumt["Downloaded"] = 2] = "Downloaded";
    enumt[enumt["Defining"] = 3] = "Defining";
    enumt[enumt["Defined"] = 4] = "Defined";
    enumt[enumt["Executing"] = 5] = "Executing";
    enumt[enumt["Executed"] = 6] = "Executed";
    enumt[enumt["Failed"] = 7] = "Failed";
    return enumt;
})();

var dic = (function () {
    function dic() {
    }
    dic.set = function (key, obj) {
        var l = this.keys.length;
        this.keys.push(key);
        this.values[l] = obj;
    };
    dic.get = function (key) {
        var i = this.keys.indexOf(key);
        if (i === -1)
            return undefined;
        return this.values[i];
    };
    dic.getkey = function (val) {
        var i = this.values.indexOf(val);
        if (i === -1)
            return undefined;
        return this.keys[i];
    };
    dic.keys = [];
    dic.values = [];
    return dic;
}());

var t=setTimeout((function () {

    clearTimeout(t);
    
    String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
    String.prototype.startsWith = function (suffix) {
        return this.indexOf(suffix) === 0;
    };
    if (HTMLElement.prototype.remove == void 0) {
        HTMLElement.prototype.remove = function () {
            this.removeNode(true);
        };
    }
    var isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document);
    var w = window;
    var isWebWorker = !isBrowser && typeof importScripts !== 'undefined';
    var isOpera = typeof w.opera !== 'undefined' && w.opera.toString() === '[object Opera]';
    var net;
    var exports = {};

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
                            console.log(e);
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
        (function (ResponseType) {
            ResponseType[ResponseType["json"] = 0] = "json";
            ResponseType[ResponseType["Document"] = 1] = "Document";
            ResponseType[ResponseType["Text"] = 2] = "Text";
            ResponseType[ResponseType["ArrayBuffer"] = 3] = "ArrayBuffer";
            ResponseType[ResponseType["Blob"] = 4] = "Blob";
        })(net.ResponseType || (net.ResponseType = {}));
        var ResponseType = net.ResponseType;
        (function (WebRequestMethod) {
            WebRequestMethod[WebRequestMethod["Get"] = 0] = "Get";
            WebRequestMethod[WebRequestMethod["Post"] = 1] = "Post";
            WebRequestMethod[WebRequestMethod["Head"] = 2] = "Head";
            WebRequestMethod[WebRequestMethod["Put"] = 3] = "Put";
            WebRequestMethod[WebRequestMethod["Delete"] = 4] = "Delete";
            WebRequestMethod[WebRequestMethod["Options"] = 5] = "Options";
            WebRequestMethod[WebRequestMethod["Connect"] = 6] = "Connect";
        })(net.WebRequestMethod || (net.WebRequestMethod = {}));
        var WebRequestMethod = net.WebRequestMethod;
        var WebRequest = (function () {
            function WebRequest() {
                this.http = new XMLHttpRequest();
                this._responseType = null;
                this.key = new Object();
                this.OnComplete = new EventListener(this.key);
                this._onprogress = this._onprogress.bind(this);
                //this.http.onprogress = this._onprogress.bind(this);
                this.http.onload = this._onprogress
                this.http.onerror = this._onprogress;
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

                if (this.http.readyState == 4) {
                    cur = this.OnComplete;
                    if (cur) {
                        var t = this;
                        cur.Invok(this.key, function (dlg) { dlg(t); });
                    }
                } else {
                    throw "";
                    
                }
            };
            Object.defineProperty(WebRequest.prototype, "IsSuccess", {
                get: function () { return this.http.status == 200 && this.http.readyState == 4; },
                enumerable: true,
                configurable: true
            });

            WebRequest.prototype.Download1 = function (url, data) {
                
                this.http.open(WebRequestMethod[this.method], url, true);
                this.http.responseType = ResponseType[this.ResponseType].toLowerCase();
                if (this.method == WebRequestMethod.Get)
                    this.http.send();
                else
                    this.http.send(data);
            };
            WebRequest.prototype.Download = function (url, data) {
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
        var downloadCallback = (function () {
            function downloadCallback(callback, data, isPrivate) {
                this.callback = callback;
                this.data = data;
                this.isPrivate = isPrivate;
                this.IsSuccess = null;
                if (isPrivate == void 0)
                    isPrivate = false;
            }
            return downloadCallback;
        }());
        net.downloadCallback = downloadCallback;
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
                    var ip = true;
                    var th = this;
                    if (th.current.data instanceof downloadCallback) {
                        try {
                            var c = th.current.data;
                            c.IsSuccess = th.webr.IsSuccess;
                            if (c.callback instanceof Function)
                                c.callback(this, c);
                        }
                        catch (e) { }
                        ip = !(c.isPrivate);
                    }
                    if (ip)
                        x.Invok(1, function (arg) { arg(th, th.current.data); });
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
    })(net = exports.net || (exports.net = {}));
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

    var Modules = (function () {
        function Modules() {
            this._store = {};
            this.OnExecuted = new net.EventListener(1);
        }
        Modules.prototype.getModule = function (name, type)
        {
            name = name.toLowerCase().trim();
            var ext = '.' + ModuleExt[type || 0];
            if (!name.endsWith(ext))
                name += ext;
            return this._store[name];
        };
        Modules.prototype.setModule = function (_module) {
            this._store[_module.EName] = _module;
        };
        return Modules;
    }());

    var Folder = (function () {
        function Folder(Parent, Name) {
            this.Parent = Parent;
            this.Name = Name;
            this.Modules = new Modules();
            this.Assets = new Modules();
            if (ff) {
                this.Parent = this;
                ff = false;
                this.Name = "";
            }
            else if (Parent == null) {
                this.Parent = root;
            }
            this.subFolders = new SubsFolder(this);
        }
        Folder.prototype.GetModule = function (modulePath, isAsset)
        {
            var type = 0;
            var moduleName;
            if (typeof (modulePath) == 'string')
            {
                var i=modulePath.indexOf(':');
                if (i != -1)
                {
                    var t_1 = [
                        modulePath.substr(0, i),
                        modulePath.substring(i + 1)
                    ];
                    if (ModuleType[t_1[0]] != undefined)
                    {
                        
                        type = ModuleType[t_1[0]];
                        modulePath = t_1[1];
                        isAsset = isAsset || type !== 0;
                    }
                }
                modulePath = modulePath.split('/');
            }
            if (modulePath.length == 0)
                throw 'modulePath argument is null';
            var folder = this.createPath(modulePath);
            moduleName = modulePath[modulePath.length - 1];
            if ((isAsset === true || isAsset == null) && (type === 0 || type == undefined))
            {
                var dot = moduleName.lastIndexOf('.');
                if (dot !== -1)
                {
                    var ext = moduleName.substring(dot + 1).toLowerCase();
                    type = ModuleExt[ext];
                } else
                {
                    isAsset = false;
                    type == 0;
                }
            }
            isAsset = isAsset || type !== 0;
            var ressource = isAsset === true ? folder.Assets : folder.Modules;
            var t = ressource.getModule(moduleName, type);
            if (t)
                return t;
            ressource.setModule(t = new Module(folder, moduleName, type));
            return t;
        };
        Object.defineProperty(Folder.prototype, "FullName", {
            get: function () {
                if (this._fn == null) {
                    if (this == this.Parent)
                        return "/";
                    var p = this.Parent;
                    return (p == null ? "" : p.FullName) + this.Name + '/';
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
                switch (folderName)
                {
                    case '~':
                        cf = root;
                        break;

                    case '':
                        cf = external;
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

        Folder.prototype._nameOf = function (type) {
            var s = this.Modules._store;
            for (var i in s) {
                var m = s[i];
                var fn = Type.GetType(type, m.exports);
                if (fn != null)
                    return  fn;
            }
            var s1 = this.subFolders._store;
            for (var i in s1) {
                var f = s1[i];
                var fn = f._nameOf(type);
                if (fn != null)
                    return fn;
            }
        };
        Folder.prototype.NameOf = function (type) {
            var fn = dic.get(type);
            if (fn != undefined)
                return fn;
            fn = this._nameOf(type);
            if (fn != null)
                dic.set(type, fn);
            return fn;
        };

        Folder.prototype.GetType = function (path) {
            var s = this.Modules._store;
            for (var i in s) {
                var m = s[i];
                var fn = m.GetType(path);
                if (fn !== undefined)
                    return fn;
            }
            var s1 = this.subFolders._store;
            for (var i in s1) {
                var f = s1[i];
                var fn = f.GetType(path);
                if (fn !== undefined)
                    return fn;
            }
            return undefined;
        }
        Folder.prototype.GetEnum = function (path) {
            var s = this.Modules._store;
            for (var i in s) {
                var m = s[i];
                var fn = m.GetEnum(path);
                if (fn !== undefined)
                    return fn;
            }
            var s1 = this.subFolders._store;
            for (var i in s1) {
                var f = s1[i];
                var fn = f.GetEnum(path);
                if (fn !== undefined)
                    return fn;
            }
            return undefined;
        }


        return Folder;
    }());
    var Type = (function () {
        function Type() {
        }
        Type._getPath = function (root) {
            if (root.constructor === Object || root.constructor===Exports)
                for (var i in root) {
                    var v = root[i];
                    if (v == null) continue;
                    if (this.passed.indexOf(v) !== -1)
                        continue;
                    this.passed.push(v);
                    switch (typeof v) {
                        case 'string':
                        case 'number':
                        case 'boolean':
                        case 'undefined': continue;
                        default:
                            if (v === this.type) {
                                return i;
                            }
                            if (v instanceof Function)
                                continue;
                            var x = this._getPath(v);
                            if (x != null)
                                return i + '.' + x;
                            break;
                    }
                }
            return null;
        };
        Type.GetType = function (type, root) {
            this.type = type;
            if (this.passed == null)
                this.passed = [];
            this.passed.length = 0;
            return this._getPath(root);
        };
        Type.passed = [];
        return Type;
    }());
    var Dependency = (function () {
        function Dependency(Args, module, Index) {
            this.Args = Args;
            this.module = module;
            this.Index = Index;
        }
        return Dependency;
    }());

    
    var Args = (function () {
        function Args(module, calback) {
            this.Dependencies = new Array();
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
                    _[i] = this.Module.call(m);
                else
                    _[i] = m;
            }
            this._args = _;
        };
        Args.prototype.Execute = function ()
        {
            this.populateArgs();
            calldefine(this);
        };
        Args.prototype.Invoke = function () {
            if (this.nsuccess >= this.Dependencies.length) {
                this.Execute();
            }
        };
        return Args;
    }());

    var Exports = (function () {
        function Exports() {
        }
        return Exports;
    }());

    var http = new net.Downloader();
    var tx = "";
    var Module = (function ()
    {        
        function Module(folder, name, type) {
            this.Type = type || 0;
            this.OnExecuted = new net.EventListener(1);
            this.exports = new Exports();
            this._dependencies = [];
            this.dependencies = [];
            this._stat = ModuleStat.New;
            this.Script = "";
            this._thisContext = new Context(this);
            this.setName(name, type);
            if (folder == null)
                throw "Context errro";
            this.Folder = folder;
            this._require = this.require.bind(this);
            this.define = this.define.bind(this);
            this._listeners = [];
        }
        Module.prototype.setName = function (name, type){
            name = name.toLowerCase().trim();
            var ext = '.' + ModuleExt[type || 0];
            if (!name.endsWith(ext))
                name += ext;
            this.Type = type;
            this.Name = name;
        }


        Module.prototype.call = function (toGet, callback, onerror, context)
        {
            if (!toGet._thisContext.canAccessToMe(ModuleType[this.Type], this.Folder.FullName, this.EName))
                return onerror ? (context == null ? onerror("access denied") : onerror.call(context, "access denied")) : null;
            return callback ? (context == null ? callback(toGet.exports) : callback.call(context, toGet.exports)) : toGet.exports;
        };

        Module.prototype.require = function (modulePath, callback, onerror,context) {
            var me = this;
            if (typeof modulePath == 'string')
            {
                var toGet = this.Folder.GetModule(modulePath);
                if (toGet.Stat == ModuleStat.Executed)
                    return this.call(toGet, callback, onerror, context);
                else if (toGet.Stat == ModuleStat.Failed)
                    return onerror && onerror.call(context, 'module failed to execute');
                else if (toGet.Stat >= ModuleStat.Downloading)
                {
                    var fid = Date.now();
                    toGet.OnExecuted.Add(function (d)
                    {
                        d.OnExecuted.Remove(fid);
                        me.call(d, callback, onerror, context);
                    }, fid);
                }
                else if (toGet.Stat == ModuleStat.New)
                {
                    var fid = Date.now();
                    toGet.OnExecuted.Add(function (d)
                    {
                        d.OnExecuted.Remove(fid);
                        me.call(d, callback, onerror, context);
                    }, fid);
                    return toGet.Download(callback, onerror || function () { });
                }
                return null;
            }
        };

        Module.prototype.Download = function (callback, onerror) {
            
            if (this.Stat >= ModuleStat.Downloading)
                return;
            if (this.Type == 0)
                synd.Push(this);
            else return this.Download1(callback, onerror);
            //var data = new net.downloadCallback(this.OnID.bind(this), { callback: callback, fid: fid, onerror: onerror }, true);
            //http.Push(this.FullName, data);
            this.Stat = ModuleStat.Downloading;
        };
        Module.prototype.Download1 = function (callback, onerror) {
            if (this.Stat >= ModuleStat.Downloading)
                return;
            var fid = Date.now();
            var data = new net.downloadCallback(this.OnID.bind(this), { callback: callback, fid: fid, onerror: onerror }, true);
            http.Push(this.FullName, data);
            this.Stat = ModuleStat.Downloading;
        };
        Module.prototype.OnLoad = function (e) {
            this.Stat = ModuleStat.Defined;
            //var t = this;
            //this.OnExecuted.Invok(1, function (f) { return f(t); });
        }
        Module.prototype.OnError = function (e) {
            
            console.log("module " + this.FullName + ' failed to download');
            this.Stat = ModuleStat.Failed;
        }
        Module.prototype.OnID = function (downloader, callback) {
            if (!callback.IsSuccess)
                return this.OnIND(downloader, callback);

            if (this.Stat > ModuleStat.Downloading)
                return;
            this.Script = downloader.Request.Response;
            this.Stat = ModuleStat.Downloaded;
            this.BeginDefine();
        };
        Module.prototype.OnIND = function (downloader, callback) {
            this.Stat = ModuleStat.Failed;
            callback.data.onerror(this);
        };
        Module.prototype.define = function () {
            
            var s = 0;
            var module = this;
            if (typeof arguments[0] === 'string') {
                module = (Qrc.UseRelativePath ? this.Folder : root).GetModule(arguments[s++], false);
                if (module.Stat > 2)
                    throw "module " + module.FullName + ' exist';
                module.Stat = ModuleStat.Downloaded;
            }
            if (module.Stat <= 2)
                module.idefine(arguments[0 + s], arguments[1 + s]);
        }
        Module.id = 0;
        Module.prototype.idefine = function (dependencies, callback) {
            if (this.Stat >= ModuleStat.Defining)
                return;
            this.Stat = ModuleStat.Defining;
            console.log(this.FullName);
            var args = new Args(this, callback);
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
                else if (d === 'context' || d === 'context.js' || d.endsWith('/context') || d.endsWith('/context.js')) {
                    args.createDependency(this._thisContext, i);
                }
                else {
                    var dependencyModule = (Qrc.UseRelativePath ? this.Folder : root).GetModule(d);
                    var dm = args.createDependency(dependencyModule, i);
                    console.log("\t\t" + dependencyModule.FullName);
                }
            }
            this.Stat = ModuleStat.Defined;
            args.Invoke();
        };
        Module.prototype.BeginDefine = function ()
        {
            if (this.Type > 0)
            {
                this.exports = this.Script;
                this.Stat = ModuleStat.Executed;
                var t = this;
                this.OnExecuted.Invok(1, function (f) { return f(t); });
                return;
            }
            try
            {
                call(this, this.Access);
            }
            catch (e) {
                this.Stat = ModuleStat.Failed;
                console.log(e);
            }
        };
        Module.prototype.NameOf = function (type) {
            return root.NameOf(type);
        }
        Module.prototype.GGetType = function (path) {
            var c = dic.getkey(path);
            if (c != null) return c;
            c = root.GetType(path.split('.'));
            if (c === undefined) return undefined;
            dic.set(c, path);
            return c;
        }

        Module.prototype.GGetEnum = function (path) {
            var c = dic.getkey(path);
            if (c != null) return c;
            c = root.GetEnum(path.split('.'));
            if (c === undefined) return undefined;
            dic.set(c, path);
            return c;
        }


        Module.prototype.GetStat = function () {
            return this._stat;
        }

        Module.prototype.OnStatChanged = function (module, stat, callback) {
            var m = module ? this.Folder.GetModule(module) : this;
            var s = m.Stat;
            if (s >= stat) {
                var ns = callback(this, module, s, stat);
                if (typeof ns === 'number') {
                    if (ns <= s)
                        return;
                    else stat = ns;
                }
                else return;
            }
            m._listeners.push({ t: this, m: module, s: stat, c: callback });
        }

        Module.prototype.OnGStatChanged = function (stat, callback) {
            _listeners.push({ t: this, m: this, s: stat, c: callback });
        }

        /// <returns type="Function" />
        Module.prototype.GetType = function (path) {
            
            var c = this.exports;
            for (var i = 0; i < path.length; i++) {
                c = c[path[i]];
                if (c === undefined) return undefined;
            }
            return c instanceof Function ? c : undefined;
        }
        Module.prototype.GetEnum = function (path) {

            var c = this.exports;
            for (var i = 0; i < path.length; i++) {
                c = c[path[i]];
                if (c === undefined) return undefined;
            }
            return typeof c === 'object' ? c : undefined;
        }
        Module.prototype.onStatChanged = function (_old, _new) {
            for (var i = 0; i < this._listeners.length; i++) {
                var l = this._listeners[i];
                if (l.s > _old && l.s <= _new) {                    
                    try {
                        var ns = l.c(l.t.FullName, this.FullName, _new, l.s);
                        if (typeof ns === 'number') {
                            if (ns > l.s)
                            {
                                l.s = ns; continue;
                            }
                        }
                    } catch (e) {
                    }
                    this._listeners.splice(i, 1);
                    i--;
                }
            }
        }
        var _modls = [];
        Module.prototype.onGStatChanged = function (_old, _new) {
            if (_new == 6)
                _modls.push(this.FullName);
            
            for (var i = 0; i < _listeners.length; i++) {
                var l = _listeners[i];
                if (l.s > _old && l.s <= _new) {
                    try {
                        var ns = l.c(l.t.FullName, this.FullName, _new, l.s);
                        if (typeof ns === 'number' && ns > l.s)
                            l.s = ns;
                    } catch (e) {
                    }
                }
            }
        }
        Object.defineProperty(Module.prototype, "Stat", {
            get: function () {
                return this._stat;
            },
            set: function (v) {
                if (v == this._stat)
                    return;
                if (v < this._stat) return;
                this.onStatChanged(this._stat, v);
                this.onGStatChanged(this._stat, v);
                this._stat = v;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(Module.prototype, "Access", {
            get: function () { return this._access; },
            set: function (v) { this._access = v; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Module.prototype, "Name", {
            get: function () { return this._name; },
            set: function (path)
            {
                var t = (path.lastIndexOf(".") >>> 0) + 1;
                this.ext = path.slice(t);
                this._name = path.substring(0, t - 1);
                if (this.ext == "")
                    this.ext = ModuleExt[this.Type];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Module.prototype, "EName", {
            get: function () { return this._name + '.' + this.ext; },
            enumerable: true,
            configurable: false
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

        Object.defineProperty(Module.prototype, 'Assemblies', {
            get: function () {
                return _modls;
            }
        });
		Module.Init = function () {
			
            window.define = globalContext.define.bind(globalContext);
            var scrs = document.getElementsByTagName('script');
            for (var i = 0; i < scrs.length; i++) {
                var scr = scrs.item(i);
                var app = scr.getAttribute('data-main');
                if (app != undefined) {
                    globalContext.require(app, function (o) { o.Start(); }, function (o) { alert('we cannot find app'); });
                }
                //if (app)
                //    globalContext.require(app, function (o) { }, function (o) { alert('we cannot find app'); });
            }
        };
        return Module;
    }());

    var _store = [];
    var counter = 0;
    var Context = (function ()
    {
        function Context(module)
        {
            var id = ++counter;
            Object.defineProperty(this, 'Id', { value: id, writable: false, configurable: false });
            var config = {};
            config.Module = module;
            _store[id] = config;
            this.context = this;
            Object.freeze(this);
            Object.preventExtensions(this);
            Object.seal(this);
        }
        Object.defineProperty(Context.prototype, "CanAccessToMe", {
            set: function (m)
            {
                if (!(m instanceof Function))
                    return;
                var config = _store[this['Id']];
                Object.defineProperty(config, 'CanAccessToMe', { value: m, writable: false, configurable: false });
            },
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(Context.prototype, '__extends', { value: __extends, writable: false, configurable: false, enumerable: false });


        Context.prototype.canAccessToMe = function (type, folder, name)
        {
            var config = _store[this['Id']];
            if (config.CanAccessToMe)
                return config.CanAccessToMe(type, folder, name);
            return true;
        };
        Context.prototype.GetPath = function (url)
        {
            var config = _store[this['Id']];
            return config.Module.Folder.FullName + url.startsWith('/') ? url.substring(1) : url;
        };
        Context.prototype.NameOf = function (type) {
            var config = _store[this['Id']];
            return config.Module.NameOf(type);            
        };
        Context.prototype.GetType = function (path) {
            if (path == null) return null;
            var config = _store[this['Id']];
            return config.Module.GGetType(path);
        };

        Context.prototype.GetEnum = function (path) {
            if (path == null) return null;
            var config = _store[this['Id']];
            return config.Module.GGetEnum(path);
        };
        Context.prototype.GetStat = function (path) {
            if (path == null) return null;
            var config = _store[this['Id']];
            return config.Module.GetStat();
        };
        Context.prototype.OnStat = function (module, stat, callback) {
            var config = _store[this['Id']];
            return config.Module.OnStatChanged(module, stat, callback);
        };
        Context.prototype.OnGStat = function (stat, callback) {
            var config = _store[this['Id']];
            return config.Module.OnGStatChanged(stat, callback);
        };
        Object.defineProperty(Context.prototype, 'Assemblies', {
            get: function () {
                var config = _store[this['Id']];
                return config.Module.Assemblies
            }
        });

        return Context;
    }());
    Object.freeze(Context);
    Object.preventExtensions(Context);
    Object.seal(Context);
    
    var root = new Folder(null, "");
    var external = new Folder(null, "//");
    globalContext = new Module(root, "", 0);
    define = globalContext.define;
    Module.Init();
    window.require = globalContext.require.bind(globalContext);
}), 0);

function sec(ret,p)
{
    return ret;
}
function call(module, isSceure)
{
    var define=module.define.bind(module);
    if (isSceure)
        return callsecure(define, new SecureValue(module.Script, 1));
    callunsecure(define, new SecureValue(module, 2));
}
function callunsecure(define, module)
{
    var context = module.Value._thisContext;
    var __extends = window.__extends;
    eval(sec(module.Value.Script, module = undefined));
}
function callsecure(define, script)
{
    eval(sec(script.value, script = null));
}
var SecureValue = (function ()
{
    function SecureValue(_v, count)
    {
        this._v = _v;
        this.count = count;
        if (typeof count !== 'number')
            count = 1;
    }
    Object.defineProperty(SecureValue.prototype, "Value", {
        get: function ()
        {
            var l = this._v;
            if (--this.count <= 0)
                this._v = undefined;
            return l;
        },
        enumerable: true,
        configurable: true
    });
    return SecureValue;
}());
function getValue(v)
{
    if (v instanceof SecureValue)
        return v.Value;
    else
        return v;
}

function calldefine(args)
{
    var mod = args.Module;
    try
    {
        if (mod.Stat >= ModuleStat.Executed)
            return;
        mod.Stat = ModuleStat.Executing;
        var exp = args.callback.apply(mod._thisContext, args._args);
        if (exp) {
            if (isEmpty(mod.Exports))
                mod.Exports = exp;
            else throw "";
        }
        mod.Stat = ModuleStat.Executed;
        console.log(mod.FullName);
        args.Module.OnExecuted.Invok(1, function (f) { return f(mod); });
    }
    catch (e)
    {
        mod.Stat = ModuleStat.Failed;
    }
}
function isEmpty(obj) {
    for (var i in obj)
        return false;
    return true;
}