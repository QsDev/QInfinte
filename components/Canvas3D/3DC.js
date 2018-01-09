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
define(["require", "exports", "./../../js/corelib", "../../js/UI", "../../js/context"], function (require, exports, corelib_1, UI_1, context_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Material;
    (function (Material) {
        var c = { Title: "Achour", Data: null, Icon: null };
        var _template;
        var _stemplate;
        function getTemplate() {
            return _template || (_template = new Template());
        }
        function getSTemplate() {
            return _stemplate || (_stemplate = corelib_1.mvc.MvcDescriptor.Get('templates.qui-3ditem'));
        }
        var Canvas3D = (function (_super) {
            __extends(Canvas3D, _super);
            function Canvas3D() {
                var _this = _super.call(this, 'templates.qui-Canvas3D', UI_1.UI.TControl.Me) || this;
                _this.Items = new corelib_1.collection.List(Object, [c, c, c, c, c, c, c, c, c, c, c, c]);
                _this.count = 0;
                return _this;
            }
            Canvas3D.prototype.setName = function (name, dom, cnt, e) {
                this[name] = dom;
                if (name === 'galleryItems') {
                    //this.cnt_galleryItems = new UI.ListAdapter(dom, getTemplate());
                    //this.cnt_galleryItems.Parent = this;
                    //this.cnt_galleryItems.Source = this.Items;
                    //e.Control = this.cnt_galleryItems;
                    this.cnt_galleryItems = cnt;
                    this.cnt_galleryItems.Template = getTemplate();
                }
            };
            Canvas3D.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                UI_1.UI.JControl.LoadCss(context_1.context.GetPath('3DC.css'));
            };
            return Canvas3D;
        }(UI_1.UI.TControl));
        Material.Canvas3D = Canvas3D;
        var _classes = [["move-right", "hidden"], ["cd-item-front"], ["cd-item-middle"], ["cd-item-back"], ["cd-item-out"], []];
        var _sclasses = ["move-right", "hidden", "cd-item-front", "cd-item-middle", "cd-item-back", "cd-item-out"];
        var GalleryItem = (function (_super) {
            __extends(GalleryItem, _super);
            function GalleryItem(data, dom) {
                var _this = _super.call(this, dom || getSTemplate().Create(), GalleryItem.getScop(data)) || this;
                _this.data = data;
                _this.selectedIndex = 0;
                _this.items = [];
                return _this;
            }
            GalleryItem.getScop = function (item) {
                var isscop = item instanceof corelib_1.bind.Scop;
                return isscop ? item : new corelib_1.bind.ValueScop(item);
            };
            GalleryItem.prototype.setName = function (name, dom, cnt, e) {
                this[name] = dom;
                if (name === 'visionTrigger')
                    this.visionTrigger.addEventListener('click', this);
                else if (name === 'Next')
                    this.Next.addEventListener('click', this);
                else if (name === 'Prev')
                    this.Prev.addEventListener('click', this);
                else if (name === 'itemsWrapper') {
                    for (var i = 0; i < dom.children.length; i++) {
                        var c = dom.children[i];
                        this.items.push(c);
                    }
                }
            };
            GalleryItem.prototype.handleEvent = function (e) {
                var src = e.srcElement;
                var name = src.getAttribute('db-name');
                switch (name) {
                    case 'visionTrigger':
                        return this.onVisionTriggerClick(e);
                    case 'Next':
                        this.GoNext();
                        break;
                    case 'Prev':
                        this.GoPrev();
                        break;
                    default:
                }
            };
            GalleryItem.prototype.onVisionTriggerClick = function (e) {
                if (this._view.classList.contains('active')) {
                    this.View.classList.remove('active');
                    this.hideNavigation();
                }
                else {
                    this.View.classList.add('active');
                    this.updateNavigation();
                }
            };
            GalleryItem.prototype.hideNavigation = function () {
                this.Next.classList.remove('visible');
                this.Prev.classList.remove('visible');
            };
            GalleryItem.prototype.updateNavigation = function () {
                this.ActiveNext = this.IsNextActive;
                this.ActivePrev = this.IsPrevActive;
            };
            Object.defineProperty(GalleryItem.prototype, "ActiveNext", {
                set: function (v) {
                    this.Next.classList[v ? 'add' : 'remove']('visible');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GalleryItem.prototype, "ActivePrev", {
                set: function (v) {
                    this.Prev.classList[v ? 'add' : 'remove']('visible');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GalleryItem.prototype, "IsPrevActive", {
                get: function () {
                    return this.selectedIndex > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GalleryItem.prototype, "IsNextActive", {
                get: function () {
                    return this.selectedIndex < this.items.length - 1;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GalleryItem.prototype, "SelectedIndex", {
                get: function () {
                    return this.selectedIndex;
                },
                set: function (v) {
                    if (v <= 0)
                        this.selectedIndex = 0;
                    else if (v >= this.items.length)
                        this.selectedIndex = this.items.length - 1;
                    else
                        this.selectedIndex = v;
                },
                enumerable: true,
                configurable: true
            });
            GalleryItem.prototype.Update = function () {
                var items = this.items;
                var osi = this.SelectedIndex;
                var si = osi + 1;
                for (var i = 0; i < items.length; i++) {
                    var ci = items[i];
                    ci.classList.remove("cd-item-front", "cd-item-middle", "cd-item-back", "cd-item-out", "move-right", "hidden");
                    if (i < si)
                        ci.classList.add('move-right', 'hidden');
                    else if (i === si)
                        ci.classList.add('cd-item-front');
                    else if (i === si + 1)
                        ci.classList.add('cd-item-middle');
                }
            };
            GalleryItem.prototype.GoNext = function () {
                var items = this.items;
                var osi = this.SelectedIndex;
                var csi = ++this.SelectedIndex;
                if (osi === csi || csi >= this.items.length)
                    return this.ActiveNext = false;
                this.showNextSlide(items[osi], items[osi + 1], items[osi + 2], items[osi + 3]);
                //if (0 === Math.sin(3))
                //    for (var i = 0; i < 4; i++) {
                //        this.updateCss(osi + i, _classes[1 + i], _classes[i]);  //front
                //    }
                if (osi + 1 >= this.items.length - 1)
                    this.ActiveNext = false;
                if (osi >= 0)
                    this.ActivePrev = true;
            };
            GalleryItem.prototype.GoPrev = function () {
                var items = this.items;
                var osi = this.SelectedIndex;
                var csi = --this.SelectedIndex;
                if (osi === csi || osi <= 0)
                    return this.ActivePrev = false;
                this.showPreviousSlide(items[osi], items[osi + 1], items[csi], items[osi + 2]);
                //if (0 === Math.sin(566))
                //    for (var i = 0; i < 4; i++) {
                //        this.updateCss(csi + i, _classes[i], _classes[i + 1]);  //front
                //    }
                if (csi <= 0)
                    this.ActivePrev = false;
                if (csi < items.length)
                    this.ActiveNext = true;
            };
            GalleryItem.prototype.updateCss = function (index, remove, add) {
                var i = this.items[index];
                if (!i)
                    return;
                if (add)
                    i.classList.add.apply(i.classList, add);
                if (remove)
                    i.classList.remove.apply(i.classList, remove);
            };
            GalleryItem.prototype.showNextSlide = function (itemToHide, itemToShow, itemMiddle, itemToBack) {
                if (itemToHide)
                    itemToHide.classList.add('move-right'), itemToHide.classList.remove('cd-item-front'),
                        this.createEvent(itemToHide, 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend'.split(' '), function (e, d) { d.itemToHide.classList.add('hidden'); d.data.swap(); }, this);
                if (itemToShow)
                    itemToShow.classList.add('cd-item-front'), itemToShow.classList.remove('cd-item-middle');
                if (itemMiddle)
                    itemMiddle.classList.add('cd-item-middle'), itemMiddle.classList.remove('cd-item-back');
                if (itemToBack)
                    itemToBack.classList.add('cd-item-back'), itemToBack.classList.remove('cd-item-out');
            };
            GalleryItem.prototype.showPreviousSlide = function (itemToMiddle, itemToBack, itemToShow, itemToOut) {
                if (itemToShow)
                    itemToShow.classList.remove('hidden'), itemToShow.classList.add('cd-item-front');
                if (itemToMiddle)
                    itemToMiddle.classList.remove('cd-item-front'), itemToMiddle.classList.add('cd-item-middle');
                if (itemToBack)
                    itemToBack.classList.remove('cd-item-middle'), itemToBack.classList.add('cd-item-back');
                if (itemToOut)
                    itemToOut.classList.remove('cd-item-back'), itemToOut.classList.add('cd-item-out');
                if (itemToShow) {
                    var r = { stop: 0, t: this };
                    r.stop = setInterval(this.myTimer, 100, itemToShow, r);
                }
            };
            GalleryItem.prototype.myTimer = function (itemToShow, stop) {
                if (!itemToShow.classList.contains('hidden')) {
                    itemToShow.classList.remove('move-right');
                    window.clearInterval(stop.stop);
                    stop.t.swap();
                }
            };
            GalleryItem.prototype.createEvent = function (itemToHide, events, callback, data) {
                if (!itemToHide)
                    return;
                var x = {
                    callback: callback,
                    events: events,
                    itemToHide: itemToHide,
                    handleEvent: one, data: data
                };
                for (var i = 0; i < events.length; i++) {
                    itemToHide.addEventListener(events[i], x);
                }
            };
            GalleryItem.prototype.swap = function () {
                if (0 === 0)
                    return;
                var si = this.SelectedIndex;
                var esi = si + 2;
                for (var i = 0; i < this.items.length; i++) {
                    var t = this.items[i];
                    if (i < si)
                        t.classList.remove("move-right", "hidden", "cd-item-front", "cd-item-middle", "cd-item-back", "cd-item-out"), t.classList.add("move-right", "hidden");
                    if (i > esi)
                        t.classList.remove("move-right", "hidden", "cd-item-front", "cd-item-middle", "cd-item-back", "cd-item-out"), t.classList.add("cd-item-out");
                }
            };
            return GalleryItem;
        }(UI_1.UI.ScopicTemplateShadow));
        Material.GalleryItem = GalleryItem;
        function one(e) {
            if (!this.events)
                return;
            e.preventDefault();
            e.stopImmediatePropagation();
            try {
                this.callback(e, this);
            }
            catch (e) {
            }
            for (var i = 0; i < this.events.length; i++)
                this.itemToHide.removeEventListener(this.events[i], this);
            delete this.events;
            delete this.itemToHide;
            delete this.handleEvent;
        }
        var Template = (function (_super) {
            __extends(Template, _super);
            function Template() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Template.prototype.CreateShadow = function (data) {
                return new GalleryItem(data);
            };
            return Template;
        }(UI_1.UI.Template));
        Material.Template = Template;
    })(Material = exports.Material || (exports.Material = {}));
    corelib_1.ScopicControl.register("Material.Canvas3D", function (n, d, c, p, pc, cnt) {
        return new Material.Canvas3D();
    });
    corelib_1.ScopicControl.register("Material.GalleryItem", function (name, dom, currentScop, parentScop, parentControl, cnt) {
        return new Material.GalleryItem(currentScop || parentScop, dom);
    });
    window["C3D"] = function () {
        require('./../QUI/QUI', function (x) {
            window['Qui']();
            setTimeout(function () {
                var app = window['app'];
                var c3d = new Material.Canvas3D();
                window['c3d'] = c3d;
                c3d.Parent = UI_1.UI.Desktop.Current;
            }, 2000);
        });
    };
});
//# sourceMappingURL=3DC.js.map