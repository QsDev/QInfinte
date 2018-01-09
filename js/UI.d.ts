import { basic, bind, mvc, collection, utils } from './Corelib';
import { models } from './Models';
import { filters } from '../js/Filters';
export declare type conv2template = mvc.ITemplate | string | Function | UI.Template | HTMLElement;
export declare module UI {
    enum Events {
        keydown = 2,
        keyup = 3,
        keypress = 5,
    }
    abstract class JControl extends bind.DObject implements EventListenerObject {
        protected _view: HTMLElement;
        static __fields__(): any[];
        readonly InnerHtml: string;
        Float(v: HorizontalAlignement): void;
        Clear(): void;
        protected parent: JControl;
        _presenter: JControl;
        private _hotKey;
        _onInitialize: bind.EventListener<(s: JControl) => void>;
        OnInitialize: (s: this) => void;
        Presenter: JControl;
        setAttribute(name: any, value: any): this;
        applyStyle(...classNames: string[]): this;
        disapplyStyle(...classNames: string[]): this;
        private _display;
        Visible: boolean;
        Wait: boolean;
        Enable: boolean;
        Parent: JControl;
        private static counter;
        private _id;
        private init;
        /** @override */
        readonly IsInit: boolean;
        private _();
        private __(v);
        ToolTip: string;
        readonly View: HTMLElement;
        constructor(_view: HTMLElement);
        protected abstract initialize(): any;
        static createDiv(): HTMLDivElement;
        addEventListener<T>(event: string, handle: (sender: this, e: Event, param: T) => void, param: T): basic.DomEventHandler<any, any>;
        private static _handle(eth, ev, p);
        AddRange(chidren: JControl[]): this;
        Add(child: JControl): this;
        Insert(child: JControl, to: number): this;
        Remove(child: JControl, dispose?: boolean): boolean;
        protected getTemplate(child: JControl): JControl;
        readonly Id: number;
        Dispose(): void;
        protected OnHotKey(): void;
        HotKey: HotKey;
        handleEvent(e: Event): void;
        private _events;
        private isEventRegistred(event);
        private registerEvent(event);
    }
    abstract class Control<T extends JControl> extends JControl {
        private _c;
        private readonly Children;
        Add(child: T): this;
        Insert(child: T, to: number): this;
        Remove(child: T, dispose?: boolean): boolean;
        RemoveAt(i: number, dispose: boolean): boolean;
        protected abstract Check(child: T): any;
        protected readonly HasTemplate: boolean;
        protected getTemplate(child: T): JControl;
        protected OnChildAdded(child: T): void;
        getChild(i: number): T;
        IndexOf(item: T): number;
        constructor(view: HTMLElement);
        readonly Count: number;
        CloneChildren(): void;
        Clear(dispose?: boolean): void;
        Dispose(): void;
    }
    class Desktop extends Control<App> {
        static DPCurrentApp: bind.DProperty<App, Desktop>;
        CurrentApp: App;
        static ctor(): void;
        private selectApp(oldApp, app);
        static __fields__(): bind.DProperty<App, Desktop>[];
        AuthStatChanged(v: boolean): void;
        private apps;
        IsSingleton: boolean;
        constructor();
        initialize(): void;
        private mouseController(e);
        GetKeyControl(owner: any, invoke: (e: KeyboardEvent, ...params: any[]) => boolean, params: any[]): void;
        ReleaseKeyControl(): void;
        private _keyboardController;
        handleEvent(e: KeyboardEvent): void;
        private ShowStart();
        static readonly Current: Desktop;
        Check(v: App): boolean;
        Show(app: App): void;
        private to;
        private loadApp;
        Add(i: App): this;
        Register(app: App): void;
        private redirectApp;
        AuthenticationApp: AuthApp;
        private Redirect(app);
    }
    class Container extends Control<JControl> {
        constructor();
        initialize(): void;
        Check(child: JControl): boolean;
    }
    enum Icons {
        Bar = 0,
        Next = 1,
        Prev = 2,
    }
    enum Glyphs {
        none = 0,
        asterisk = 1,
        plus = 2,
        eur = 3,
        euro = 4,
        minus = 5,
        cloud = 6,
        envelope = 7,
        pencil = 8,
        glass = 9,
        music = 10,
        search = 11,
        heart = 12,
        star = 13,
        starEmpty = 14,
        user = 15,
        film = 16,
        thLarge = 17,
        th = 18,
        thList = 19,
        ok = 20,
        remove = 21,
        zoomIn = 22,
        zoomOut = 23,
        off = 24,
        signal = 25,
        cog = 26,
        trash = 27,
        home = 28,
        file = 29,
        time = 30,
        road = 31,
        downloadAlt = 32,
        download = 33,
        upload = 34,
        inbox = 35,
        playCircle = 36,
        repeat = 37,
        refresh = 38,
        listAlt = 39,
        lock = 40,
        flag = 41,
        headphones = 42,
        volumeOff = 43,
        volumeDown = 44,
        volumeUp = 45,
        qrcode = 46,
        barcode = 47,
        tag = 48,
        tags = 49,
        book = 50,
        bookmark = 51,
        print = 52,
        camera = 53,
        font = 54,
        bold = 55,
        italic = 56,
        textHeight = 57,
        textWidth = 58,
        alignLeft = 59,
        alignCenter = 60,
        alignRight = 61,
        alignJustify = 62,
        list = 63,
        indentLeft = 64,
        indentRight = 65,
        facetimeVideo = 66,
        picture = 67,
        mapMarker = 68,
        adjust = 69,
        tint = 70,
        edit = 71,
        share = 72,
        check = 73,
        move = 74,
        stepBackward = 75,
        fastBackward = 76,
        backward = 77,
        play = 78,
        pause = 79,
        stop = 80,
        forward = 81,
        fastForward = 82,
        stepForward = 83,
        eject = 84,
        chevronLeft = 85,
        chevronRight = 86,
        plusSign = 87,
        minusSign = 88,
        removeSign = 89,
        okSign = 90,
        questionSign = 91,
        infoSign = 92,
        screenshot = 93,
        removeCircle = 94,
        okCircle = 95,
        banCircle = 96,
        arrowLeft = 97,
        arrowRight = 98,
        arrowUp = 99,
        arrowDown = 100,
        shareAlt = 101,
        resizeFull = 102,
        resizeSmall = 103,
        exclamationSign = 104,
        gift = 105,
        leaf = 106,
        fire = 107,
        eyeOpen = 108,
        eyeClose = 109,
        warningSign = 110,
        plane = 111,
        calendar = 112,
        random = 113,
        comment = 114,
        magnet = 115,
        chevronUp = 116,
        chevronDown = 117,
        retweet = 118,
        shoppingCart = 119,
        folderClose = 120,
        folderOpen = 121,
        resizeVertical = 122,
        resizeHorizontal = 123,
        hdd = 124,
        bullhorn = 125,
        bell = 126,
        certificate = 127,
        thumbsUp = 128,
        thumbsDown = 129,
        handRight = 130,
        handLeft = 131,
        handUp = 132,
        handDown = 133,
        circleArrowRight = 134,
        circleArrowLeft = 135,
        circleArrowUp = 136,
        circleArrowDown = 137,
        globe = 138,
        wrench = 139,
        tasks = 140,
        filter = 141,
        briefcase = 142,
        fullscreen = 143,
        dashboard = 144,
        paperclip = 145,
        heartEmpty = 146,
        link = 147,
        phone = 148,
        pushpin = 149,
        usd = 150,
        gbp = 151,
        sort = 152,
        sortByAlphabet = 153,
        sortByAlphabetAlt = 154,
        sortByOrder = 155,
        sortByOrderAlt = 156,
        sortByAttributes = 157,
        sortByAttributesAlt = 158,
        unchecked = 159,
        expand = 160,
        collapseDown = 161,
        collapseUp = 162,
        logIn = 163,
        flash = 164,
        logOut = 165,
        newWindow = 166,
        record = 167,
        save = 168,
        open = 169,
        saved = 170,
        import = 171,
        export = 172,
        send = 173,
        floppyDisk = 174,
        floppySaved = 175,
        floppyRemove = 176,
        floppySave = 177,
        floppyOpen = 178,
        creditCard = 179,
        transfer = 180,
        cutlery = 181,
        header = 182,
        compressed = 183,
        earphone = 184,
        phoneAlt = 185,
        tower = 186,
        stats = 187,
        sdVideo = 188,
        hdVideo = 189,
        subtitles = 190,
        soundStereo = 191,
        soundDolby = 192,
        sound$5$1 = 193,
        sound$6$1 = 194,
        sound$7$1 = 195,
        copyrightMark = 196,
        registrationMark = 197,
        cloudDownload = 198,
        cloudUpload = 199,
        treeConifer = 200,
        treeDeciduous = 201,
        cd = 202,
        saveFile = 203,
        openFile = 204,
        levelUp = 205,
        copy = 206,
        paste = 207,
        alert = 208,
        equalizer = 209,
        king = 210,
        queen = 211,
        pawn = 212,
        bishop = 213,
        knight = 214,
        babyFormula = 215,
        tent = 216,
        blackboard = 217,
        bed = 218,
        apple = 219,
        erase = 220,
        hourglass = 221,
        lamp = 222,
        duplicate = 223,
        piggyBank = 224,
        scissors = 225,
        bitcoin = 226,
        btc = 227,
        xbt = 228,
        yen = 229,
        jpy = 230,
        ruble = 231,
        rub = 232,
        scale = 233,
        iceLolly = 234,
        iceLollyTasted = 235,
        education = 236,
        optionHorizontal = 237,
        optionVertical = 238,
        menuHamburger = 239,
        modalWindow = 240,
        oil = 241,
        grain = 242,
        sunglasses = 243,
        textSize = 244,
        textColor = 245,
        textBackground = 246,
        objectAlignTop = 247,
        objectAlignBottom = 248,
        objectAlignHorizontal = 249,
        objectAlignLeft = 250,
        objectAlignVertical = 251,
        objectAlignRight = 252,
        triangleRight = 253,
        triangleLeft = 254,
        triangleBottom = 255,
        triangleTop = 256,
        console = 257,
        superscript = 258,
        subscript = 259,
        menuLeft = 260,
        menuRight = 261,
        menuDown = 262,
        menuUp = 263,
    }
    class Glyph extends JControl {
        private isIcon;
        static AllGlyphs(panel: JControl): void;
        static Test(): Div;
        static Create(glyph: UI.Glyphs, toolTip: string, cssClass?: string): HTMLSpanElement;
        private static GetGlyphCSS(name);
        private static GetIconCSS(name);
        private getStyle();
        constructor(glyph: Glyphs | Icons, isIcon?: boolean, toolTip?: string);
        initialize(): void;
        private v;
        Type: Glyphs | Icons;
    }
    class Button extends JControl {
        private v;
        Style: ButtonStyle;
        initialize(): void;
        constructor();
        Text: string;
        Type: string;
    }
    class GlyphButton extends Button {
        initialize(): void;
        AddGlyphs(isIcon: (i: number) => boolean, ...glyphs: (Glyphs | Icons)[]): void;
        AddGlyph(glyph: Glyphs | Icons, isIcon?: boolean): Glyph;
        protected Check(child: JControl): boolean;
        private target;
        CollapsedZone: JControl;
    }
    class Dom extends JControl {
        constructor(tagName: string | HTMLElement, classList?: string[]);
        initialize(): void;
    }
    class Anchore extends JControl {
        constructor(content?: string | HTMLElement | JControl, href?: string);
        initialize(): void;
        Add(child: JControl): this;
        Remove(child: JControl): boolean;
        Text: string;
        Href: string;
    }
    class Label extends JControl {
        constructor(text: string);
        initialize(): void;
        Text: string;
    }
    class Text extends JControl {
        constructor(text: string);
        initialize(): void;
        Text: string;
    }
    class Textbox extends JControl {
        constructor(text?: string);
        Focus(): void;
        initialize(): void;
        Add(child: JControl): this;
        Remove(child: JControl): boolean;
        Text: string;
        PlaceHolder: string;
    }
    enum ListType {
        Ordred = 0,
        UnOrdred = 1,
    }
    class List extends Control<JControl> {
        constructor(type?: ListType);
        initialize(): void;
        Check(child: JControl): boolean;
        readonly HasTemplate: boolean;
        getTemplate(child: JControl | HTMLElement | string): JControl;
        AddText(item: string): Div;
        protected OnChildAdded(child: JControl): void;
        private _si;
        SelectedIndex: number;
    }
    class DivControl extends Control<JControl> {
        constructor(tag?: string | HTMLElement);
        initialize(): void;
        Check(child: JControl): boolean;
    }
    class Div extends Control<JControl> {
        constructor();
        initialize(): void;
        Check(item: JControl): boolean;
    }
    class ServiceNavBar<T extends IItem> extends JControl {
        private autoInitializePanels;
        constructor(autoInitializePanels: boolean);
        initialize(): void;
        private _lefttabs;
        private _righttabs;
        private bi;
        LeftTabs: Navbar<T>;
        RightTabs: Navbar<T>;
        private createItem(page);
        OnPageSelected: (page: T) => void;
        OnClick(page: T): void;
        Add(child: JControl): this;
        AddRange(child: JControl[]): this;
        Remove(child: JControl): boolean;
    }
    class Navbar<T extends IItem> extends List {
        private _items;
        constructor();
        initialize(): void;
        private oicd;
        private ItemsChanged(e);
        private createItem(page);
        selectable: boolean;
        private _selectedItem;
        readonly SelectedItem: MenuItem;
        private onClick(page, sender);
        Float(v: HorizontalAlignement): void;
        private CClear(m);
        readonly Items: collection.ExList<T, any>;
        OnSelectedItem: bind.EventListener<(item: T) => void>;
    }
    class NavbarHeader extends JControl {
        Title: string;
        private _brand;
        private _brandContainer;
        private _toggleButton;
        readonly Brand: JControl;
        readonly ToggleButton: GlyphButton;
        constructor();
        initialize(): void;
        IsFixedTop: boolean;
        IsHeader: boolean;
    }
    interface IItem {
        Tag: any;
        Content: string | HTMLElement | JControl;
        Url: string;
        OnItemSelected(menuItem: MenuItem): any;
    }
    class MenuItem extends Anchore implements EventListenerObject, basic.IDisposable {
        Source: IItem;
        constructor(Source: IItem);
        propChanged(p: bind.PropBinding, e: bind.EventArgs<string, Page>): void;
        handleEvent(e: Event): void;
        OnClick: (page: IItem, sender: MenuItem) => void;
        Dispose(): void;
    }
    class ContentControl extends JControl {
        constructor();
        initialize(): void;
        private _content;
        Content: JControl;
    }
    enum ButtonStyle {
        Default = 0,
        Primary = 1,
        success = 2,
        Info = 3,
        Warning = 4,
        Danger = 5,
        Link = 6,
        Block = 7,
    }
    class Input extends JControl {
        constructor(dom?: any);
        initialize(): void;
        Placeholder: string;
        Text: string;
    }
    class ActionText extends JControl {
        private btn_ok;
        private txtInput;
        readonly Box: Input;
        readonly Icon: Button;
        OnAction: bind.EventListener<(sender: ActionText, oldText: string, newText: string) => void>;
        constructor(input?: HTMLInputElement);
        initialize(): void;
        private ia;
        AutoAction: boolean;
        btnClicked(ev: Event): void;
        txtChanged(ev: Event): void;
        handleEvent(e: Event): void;
        private ls;
        Text: string;
        Focus(): void;
    }
    class CItem implements IItem {
        Tag: any;
        Content: string | HTMLElement | JControl;
        Url: string;
        private onselect;
        OnPropertyChanged(e: bind.DProperty<string, any>, m: (p: bind.PropBinding, e: bind.EventArgs<string, Page>) => void): void;
        constructor(Tag: any, Content: string | HTMLElement | JControl, Url: string, onselect: basic.ITBindable<(menuItem: MenuItem) => void>);
        OnItemSelected(menuItem: MenuItem): void;
    }
    class QBar<T extends IItem> extends JControl {
        private top;
        private _header;
        private _container;
        private _lefttabs;
        private _righttabs;
        private _colapsedZone;
        private bi;
        LeftTabs: Navbar<T>;
        RightTabs: Navbar<T>;
        readonly Header: NavbarHeader;
        constructor(top: boolean);
        private createItem(page);
        initialize(): void;
        Open(on?: boolean): void;
        OnPageSelected: (page: T) => void;
        OnClick(page: T): void;
        Add(child: JControl): this;
        Remove(child: JControl): boolean;
    }
    class Head<T extends IItem> extends JControl {
        private top;
        private _container;
        private _header;
        private _tabs;
        private _stabs;
        readonly Menu: Navbar<T>;
        readonly SubsMenu: Navbar<T>;
        private _colapsedZone;
        private _searchBox;
        static __fields__(): bind.DProperty<string, Head<any>>[];
        static DPPatent: bind.DProperty<string, Head<any>>;
        Patent: string;
        readonly Header: NavbarHeader;
        readonly Container: Container;
        constructor(top: boolean);
        private createItem(page);
        Clear(): void;
        private CClear(m);
        initialize(): void;
        private searchActioned(s, o, n);
        readonly SearchBox: AutoCompleteBox;
        OnPageSelected: (page: T) => void;
        OnClick(page: T): void;
    }
    class Foot extends JControl {
        constructor();
        initialize(): void;
        Check(c: JControl): boolean;
    }
    enum Keys {
        Enter = 13,
        Tab = 9,
        Esc = 27,
        Escape = 27,
        Up = 38,
        Down = 40,
        Left = 37,
        Right = 39,
        PgDown = 34,
        PageDown = 34,
        PgUp = 33,
        PageUp = 33,
        End = 35,
        Home = 36,
        Insert = 45,
        Delete = 46,
        Backspace = 8,
        Space = 32,
        Meta = 91,
        Win = 91,
        Mac = 91,
        Multiply = 106,
        Add = 107,
        Subtract = 109,
        Decimal = 110,
        Divide = 111,
        Scrollock = 145,
        Pausebreak = 19,
        Numlock = 144,
        "5numlocked" = 12,
        Shift = 16,
        Capslock = 20,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        AltLeft = 18,
        AltRight = 18,
        ShiftLeft = 18,
        ShiftRight = 18,
        ControlLeft = 17,
        ControlRight = 17,
        MetaLeft = 91,
        MetaRight = 91,
    }
    enum Controlkeys {
        Alt = 18,
        Shift = 16,
        Control = 17,
        Meta = 91,
    }
    class HotKey {
        private _key;
        private __ctrl;
        Key: Keys;
        Control: Controlkeys;
        IsPressed(e: KeyboardEvent): boolean;
        private checkKey(e);
        private checkControl(e);
    }
    class Page extends Control<JControl> implements basic.IDisposable, IService, IItem {
        protected app: App;
        Name: string;
        Tag: any;
        Callback(args: any): void;
        _fl: boolean;
        FloatLeft: boolean;
        static DPTitle: bind.DProperty<string | HTMLElement | JControl, Page>;
        getDPTitle(): bind.DProperty<string | HTMLElement | JControl, Page>;
        getDPUrl(): bind.DProperty<string, {}>;
        Content: string | HTMLElement | JControl;
        ServiceType: ServiceType;
        Notify: bind.EventListener<(s: IService, notifyTYpe: NotifyType) => void>;
        static DPUrl: bind.DProperty<string, {}>;
        Url: string;
        static __fields__(): (bind.DProperty<string | HTMLElement | JControl, Page> | bind.DProperty<string, {}>)[];
        HasSearch: boolean;
        getSuggessions(): collection.List<any>;
        OnSearche(oldPatent: string, newPatent: string): void;
        initialize(): void;
        Update(): void;
        private readonly intern;
        Check(c: Page): boolean;
        constructor(app: App, title: string | HTMLElement | JControl, Name: string);
        Dispose(): void;
        GetLeftBar(): JControl | QBar<any>;
        GetRightBar(): any;
        OnItemSelected(menuItem: MenuItem): void;
        _onSelected: bind.EventListener<(p: Page) => void>;
        readonly OnSelected: bind.EventListener<(p: Page) => void>;
        ContextMenu: ContextMenu;
        Handled(): boolean;
        protected OnKeyDown(e: KeyboardEvent): void;
    }
    class BarStack {
        private _current;
        private others;
        constructor(current: IService);
        readonly Current: IService;
        Push(s: IService): void;
        Pop(): IService;
        Has(s: IService): number;
        Exit(): void;
    }
    enum HorizontalAlignement {
        Left = 0,
        Center = 1,
        Right = 2,
    }
    enum VerticalAlignement {
        Top = 0,
        Center = 1,
        Bottom = 2,
    }
    class Point {
        x: number;
        y: number;
        constructor(x: number, y: number);
    }
    enum MetricType {
        Pixel = 0,
        Percentage = 1,
        Inch = 2,
        Em = 3,
    }
    class Metric {
        Value: number;
        Type: MetricType;
        constructor(value: number | string, type?: MetricType);
        minus(v: any): Metric;
        toString(): string;
        fromString(s: string): void;
    }
    class Error extends JControl {
        IsInfo: boolean;
        private container;
        private _text;
        Message: string;
        Expire: number;
        constructor();
        initialize(): void;
        handleEvent(e: any): void;
        Push(): void;
        private timeout;
        Pop(): void;
        Dispose(): void;
    }
    class InfoArea extends Control<JControl> {
        static readonly Default: InfoArea;
        constructor();
        initialize(): void;
        Check(j: JControl): boolean;
        static push(msg: string, isInfo?: boolean, expire?: number): void;
    }
    class Size {
        w: Metric;
        h: Metric;
        constructor(w: Metric | string | number, h: Metric | number | string);
    }
    class Badge extends JControl {
        constructor();
        initialize(): void;
        Content: any;
    }
    class DragManager {
        private handler;
        private target;
        private View;
        private loc;
        constructor(handler: JControl, target: JControl);
        private mouseloc;
        private cntloc;
        handleEvent(e: DragEvent): void;
        Location: Point;
        private RelocationJob;
        reLocation(hr: boolean, vr: boolean): void;
    }
    class FixedPanel extends JControl {
        private ha;
        private va;
        private loc;
        private body;
        private size;
        constructor(view?: HTMLElement);
        initialize(): void;
        Check(i: any): boolean;
        private mouseloc;
        private cntloc;
        handleEvent(e: DragEvent): void;
        private static resizeBody;
        Height: Metric;
        Width: Metric;
        HorizontalAlignement: HorizontalAlignement;
        VerticalAlignement: VerticalAlignement;
        Location: Point;
        Size: Size;
        private RelocationJob;
        private reLocation(hr, vr);
        Add(child: JControl): this;
        AddRange(childs: JControl[]): this;
    }
    class App extends Control<Head<Page> | Page | QBar<IItem> | Foot | ContentControl | ServiceNavBar<IItem>> {
        private name;
        static DPIcon: bind.DProperty<models.Picture, App>;
        Icon: models.Picture;
        static DPSnapshot: bind.DProperty<models.Picture, App>;
        Snapshot: models.Picture;
        static DPDescription: bind.DProperty<String, App>;
        Description: String;
        static DPTitle: bind.DProperty<String, App>;
        Title: String;
        static DPBadge: bind.DProperty<String, App>;
        Badge: String;
        protected OnContextMenu(e: MouseEvent): void;
        private static Apps;
        static readonly CurrentApp: App;
        readonly Name: string;
        Head: Head<Page>;
        Body: ContentControl;
        Foot: ServiceNavBar<IItem>;
        Pages: collection.List<Page>;
        private _search;
        slogant: Dom;
        readonly SearchBox: AutoCompleteBox;
        private searchActioned(s, o, n);
        private static getView();
        Update(): void;
        protected OnKeyDown(e: KeyboardEvent): void;
        createTitle(t: string): ContentControl;
        OpenPage(pageNme: string): boolean;
        constructor(name: string);
        private PagesChanged(e);
        Logout(): void;
        private mapHotKeys();
        private cpage;
        private silentPageSelected(page);
        private PageSelected(page);
        OnPageSelected: bind.EventListener<(s: this, p: Page) => void>;
        Open(page: Page): void;
        initialize(): void;
        private opcd;
        private intern;
        Check(page: any): boolean;
        Add(child: Page | Head<IItem> | Foot | QBar<IItem> | ContentControl | ServiceNavBar<IItem>): this;
        AddPage(child: Page): void;
        Show(): void;
        Register(service: IService): void;
        handleEvent(e: KeyboardEvent): void;
        SelectedPage: Page;
        SelectNaxtPage(): void;
        SelectPrevPage(): void;
        serviceNotified(s: IService, n: NotifyType): void;
        private services;
        private readonly currentStack;
        private CurrentService();
        PushGBar(ser: IService): void;
        PopGBar(ser: IService): void;
        ExitBar(): void;
        PushBar(ser: IService): void;
        PopBar(): void;
        private HideCurrentService();
        private ShowCurrentService();
        Push(s: IService): void;
        private Has(s);
        Pop(s?: IService): void;
        private _services;
    }
    abstract class AuthApp extends App {
        constructor(b: bind.EventListener<(v: boolean) => void>);
        abstract IsLogged(callback: (v: boolean) => void): any;
        OnLogged: basic.IBindable;
    }
    enum NotifyType {
        Focuse = 0,
        UnFocus = 1,
    }
    enum ServiceType {
        Main = 0,
        Stackable = 1,
        Instantany = 3,
    }
    interface IService {
        GetLeftBar(): JControl;
        GetRightBar(): JControl;
        Handler?: EventTarget;
        ServiceType: ServiceType;
        Notify?: bind.EventListener<(s: IService, notifyTYpe: NotifyType) => void>;
        Callback(args: any): any;
        Handled(): boolean;
    }
    class FunctionGroup<T extends Function> extends Function {
        private _;
        private map;
        constructor();
        Push(f: T, name?: string): void;
        Remove(name: string): T;
        Create(): Function;
    }
    class ModelExit {
        constructor();
        static readonly DontExit: {};
        static readonly ReOpen: {};
    }
    class Modal extends JControl {
        private _searchBox;
        private abonment;
        private getSearchBox(d);
        private callBack(b, old, _new);
        readonly CurrentModal: Modal;
        onSearch: (modal: this, s: ProxyAutoCompleteBox<any>, oldValue: any, newValue: any) => void;
        OnSearch(i: (modal: this, s: ProxyAutoCompleteBox<any>, oldValue: any, newValue: any) => void): void;
        private _container;
        private _container1;
        private _fm;
        private _head;
        private _body;
        private _foot;
        private _title;
        private _okt;
        private _cancelt;
        OkTitle(v: string): void;
        Canceltitle(v: string): void;
        Title(v: string): void;
        Search(d: collection.List<any>): void;
        private asSearch;
        private drgmngr;
        ShowDialog(title: string, content: JControl): void;
        private static zIndex;
        private IsOpen;
        Open(): void;
        private silentClose();
        Close(msg: any): void;
        constructor();
        initialize(): void;
        private _dtitle;
        private _ts;
        protected createHeader(head: JControl): void;
        private bok;
        private bcancel;
        protected createFoot(foot: JControl): void;
        Add(child: JControl): this;
        Clear(): void;
        Remove(child: JControl): boolean;
        Insert(child: JControl, i: number): this;
        Dispose(): void;
        private _onClick;
        readonly OnClosed: bind.EventListener<(s: Modal, message: string) => void | ModelExit>;
        OnKeyDown(e: KeyboardEvent): void;
        static ShowDialog(title: string, msg: string | HTMLElement | JControl, callback?: (r, m: Modal) => void, ok?: string, cancel?: string): (msg: any) => void | ModelExit;
    }
    class Image extends JControl {
        Source: string;
        constructor();
        initialize(): void;
    }
    class CarouselItem extends JControl {
        Indicator: any;
        private _image;
        private _caption;
        constructor(url: string, caption: any);
        initialize(): void;
        Active: boolean;
    }
    class Carousel extends Control<CarouselItem> {
        private _items;
        private _indecators;
        private _inner;
        private leftButton;
        private rightButton;
        constructor();
        initialize(): void;
        private opcd;
        private fromInit;
        protected createButton(isLeft: boolean): Dom;
        private createIndecator(i);
        private b;
        private ItemsChanged(e);
        private selectNext();
        Clear(): void;
        Check(child: CarouselItem): boolean;
        Add(child: CarouselItem): this;
        Remove(child: CarouselItem): boolean;
        RemoveAt(i: number): boolean;
    }
    class PaginationSurf extends JControl {
        private isNext;
        private anchore;
        private span;
        private text;
        constructor(isNext?: boolean);
        initialize(): void;
        Icon: string;
        Title: string;
        OnClick: (e: PaginationSurf) => void;
        handleEvent(e: MouseEvent): void;
    }
    class BiPagination extends JControl {
        static __fields__(): bind.DProperty<number, BiPagination>[];
        private isc;
        static DPIndex: bind.DProperty<number, BiPagination>;
        Index: number;
        Max: number;
        static DPMax: bind.DProperty<number, BiPagination>;
        private prev;
        private next;
        private list;
        private actionText;
        constructor();
        initialize(): void;
        handleEvent(e: Event): void;
        static ctor(): void;
    }
    class Pagination extends JControl {
        private prev;
        private next;
        private items;
        static DPRange: bind.DProperty<number, Pagination>;
        static DPStartIndex: bind.DProperty<number, Pagination>;
        static DPCount: bind.DProperty<number, Pagination>;
        readonly SelectedRange: number;
        readonly Count: number;
        StartIndex: number;
        private OnCountChanged(o, n);
        private OnRangeChanged(o, n);
        private OnStartIndexChanged(n);
        constructor();
        AddItem(page: PaginationSurf): void;
        initialize(): void;
        private opcd;
        private sp;
        OnClick(e: PaginationSurf): void;
        private isInRange(i);
        private convert(i);
        private OnItemsChanged(e);
    }
    class NumericUpDown extends JControl {
        private f;
        static DPValue: bind.DProperty<number, NumericUpDown>;
        Value: number;
        static __fields__(): bind.DProperty<number, NumericUpDown>[];
        private minValue;
        private defaultValue;
        private maxvalue;
        private sleft;
        private sright;
        private text;
        constructor();
        initialize(): void;
        private textChanged(e);
        Focus(): void;
        SelectAll(): void;
    }
    interface pair<K, P> {
        Key: K;
        Value: P;
    }
    class NavPanel extends JControl implements IService {
        Name: string;
        private title;
        private container;
        private caption;
        HasSearch: boolean;
        readonly CaptionControl: Button;
        Title: string | HTMLElement;
        Caption: string;
        constructor(Name: string, caption: string);
        initialize(): void;
        Add(item: JControl): this;
        AddRange(items: JControl[]): this;
        Remove(item: JControl): boolean;
        RemoveAt(i: number, dispose?: boolean): boolean;
        Clear(): void;
        Update(): void;
        GetLeftBar(): any;
        GetRightBar(): any;
        Handled(): boolean;
        readonly ServiceType: ServiceType;
        Callback(): void;
        OnBringIntoFront(): void;
        IsActive: boolean;
        protected OnKeyDown(e: KeyboardEvent): void;
        OnSearche(oldPatent: string, newPatent: string): void;
    }
    class IContent extends JControl {
        private navPage;
        constructor(navPage: NavPage);
        initialize(): void;
        Check(item: JControl): boolean;
        Add(p: NavPanel): this;
        Remove(p: NavPanel): boolean;
    }
    class NavPage extends UI.Page {
        static DPSelectedItem: bind.DProperty<NavPanel, NavPage>;
        static __fields__(): any;
        private con;
        private nav;
        private caption;
        Caption: string;
        constructor(app: App, title: string | HTMLElement | JControl, name: string);
        private islocal;
        initialize(): void;
        Add(c: JControl): this;
        AddRange(c: JControl[]): this;
        Check(j: JControl): boolean;
        SelectedItem: NavPanel;
        SetPanel(panel: NavPanel): void;
        SetSeparator(): void;
        protected OnKeyDown(e: KeyboardEvent): void;
        private static _onItemSelected(s, e, p);
        private events;
        Select(name: string): boolean;
        GetLeftBar(): any;
        HasSearch: boolean;
        GetRightBar(): any;
        Update(): void;
        private panels;
        OnSearche(oldPatent: string, newPatent: string): void;
    }
}
export declare namespace UI {
    interface ITemplateShadow {
        setDataContext(data: any): any;
        getDataContext(): any;
    }
    abstract class TemplateShadow extends JControl implements ITemplateShadow {
        abstract setDataContext(data: any): any;
        abstract getDataContext(): any;
        static Create(item: any): ScopicTemplateShadow;
    }
    class ScopicTemplateShadow extends TemplateShadow {
        private scop;
        private cnt;
        setDataContext(data: any): void;
        getDataContext(): any;
        constructor(dom: HTMLElement, scop?: bind.Scop);
        initialize(): void;
        Check(c: JControl): boolean;
    }
    interface ITemplate {
        CreateShadow<T>(data: T | bind.Scop): TemplateShadow;
    }
    abstract class Template implements ITemplate {
        /**
        *   if(data is scop) scop=data;
        *   if(data is undefined) scop=null;
        *   else scop=new ScopValue(data);
        **/
        abstract CreateShadow<T>(data?: T | bind.Scop): TemplateShadow;
    }
    class HtmlTemplate implements Template {
        private dom;
        private asTemplate;
        constructor(dom: HTMLElement, asTemplate?: boolean);
        /**
        *   if(data is scop) scop=data;
        *   if(data is undefined) scop=null;
        *   else scop=new ScopValue(data);
        **/
        CreateShadow<T>(data?: T | bind.Scop): TemplateShadow;
    }
    class ScopicTemplate implements Template {
        private template;
        /**
        *   if(data is scop) scop=data;
        *   if(data is undefined) scop=null;
        *   else scop=new ScopValue(data);
        **/
        CreateShadow<T>(data?: T | bind.Scop): TemplateShadow;
        constructor(templatePath: string | mvc.ITemplate);
    }
    class TControl<T> extends JControl {
        private data;
        static ToTemplate(itemTemplate: conv2template, asTemplate: boolean): Template;
        constructor(itemTemplate: mvc.ITemplate | string | Function | Template | HTMLElement, data: T | bind.Scop);
        private Shadow;
        Data: T;
        private _template;
        initialize(): void;
    }
    class ListAdapter<T, P> extends TControl<P> {
        private garbage;
        static __fields__(): (bind.DProperty<number, ListAdapter<any, any>> | bind.DProperty<ITemplate, ListAdapter<any, any>> | bind.DProperty<collection.List<any>, ListAdapter<any, any>>)[];
        static DPSource: bind.DProperty<collection.List<any>, ListAdapter<any, any>>;
        Source: collection.List<any>;
        static DPSelectedIndex: bind.DProperty<number, ListAdapter<any, any>>;
        AcceptNullValue: boolean;
        private swap(i);
        SelectedIndex: number;
        static DPItemStyle: bind.DProperty<string[], ListAdapter<any, any>>;
        ItemStyle: string[];
        static DPTemplate: bind.DProperty<ITemplate, ListAdapter<any, any>>;
        Template: ITemplate;
        OnItemSelected: bind.EventListener<(s: ListAdapter<T, P>, index: number, template: TemplateShadow, oldIndex?: number, oldTemplate?: TemplateShadow) => void>;
        OnItemInserted: bind.EventListener<(s: ListAdapter<T, P>, index: number, data: T, template: TemplateShadow) => void>;
        OnRemovedInseted: bind.EventListener<(s: ListAdapter<T, P>, index: number, data: T, template: TemplateShadow) => void>;
        private _content;
        readonly Content: Control<TemplateShadow>;
        _selectedItem: TemplateShadow;
        readonly SelectedChild: TemplateShadow;
        readonly SelectedItem: T;
        private OnSelectedIndexChanged(_old, _new);
        Select(t: TemplateShadow): void;
        SelectItem(t: T): void;
        static _getTemplate(template: mvc.ITemplate | string | Function): mvc.ITemplate;
        static _getTemplateShadow(template: mvc.ITemplate | string | Function | HTMLElement): HTMLElement;
        constructor(template: conv2template, itemTemplate?: conv2template, data?: P, getSourceFromScop?: boolean);
        private static getTemplate(d);
        private sli;
        private getSourceFromScop(x);
        private CmdExecuter(n, d, s);
        private AttachSelectedItem(x);
        private CmdAttacheSelectedItemExecuter(n, d, s);
        private RlSourceScop;
        initialize(): void;
        private OnSourceChanged(e);
        private ReSelect();
        private _insert(item, i);
        private _remove(item, i);
        private count;
        private OnAdd(e);
        private OnClear(e?);
        private OnRemove(e);
        private OnReplace(e);
        private Reset(e?);
        private clearGarbage();
        private Recycle();
        Dispose(): void;
        Add(child: JControl): this;
        AddRange(children: JControl[]): this;
        Remove(child: JControl, dispose: boolean): boolean;
        RemoveAt(i: number, dispose: boolean): boolean;
        Clear(dispose?: boolean): void;
        Insert(c: JControl, i: number): this;
        CloneChildren(): void;
        Check(c: JControl): boolean;
    }
    class Spinner extends JControl {
        private container;
        private circle;
        private message;
        constructor(test: any);
        initialize(): void;
        private isStarted;
        Start(logo: string): void;
        Pause(): void;
        Message: string;
        static Default: Spinner;
    }
    class RichMenu<T> extends JControl {
        private menu;
        private adapter;
        private itemTemplate;
        constructor(itemTemplate?: conv2template, data?: T[], parent?: JControl);
        initialize(): void;
        private timeout;
        private isOpen;
        private i;
        private toInt(b);
        Open(e: MouseEvent, callback: basic.ITBindable<(r: RichMenu<T>, si: T) => void>, left: boolean, bottom: boolean): void;
        Close(imediate: boolean): void;
        Data: any[];
    }
    class ContextMenu extends JControl {
        private dic;
        Items: collection.List<CItem>;
        constructor(items?: (CItem | string)[]);
        initialize(): void;
        private itemChangedDlg;
        private SourceChanged(e);
        private add(t);
        private OnItemSelected;
        OnMenuItemSelected: bind.EventListener<(s: ContextMenu, i: MenuItem) => void>;
        private remove(t);
        private replace(o, n);
        private clear();
        reset(): void;
        Add(j: JControl): this;
        AddRange(citem: JControl[]): this;
        Remove(j: JControl, dispose: boolean): boolean;
        Show(x: any, y: any): void;
        private thrid;
        private dateout;
        handleEvent(e: MouseEvent): void;
        private timeout(t);
    }
    class Gage {
        initialize(): void;
        static deg2str(diam: number, n: number): number;
        static createDashArray(diam: number, degs: number[]): void;
    }
    class CostumizedShadow extends TemplateShadow {
        private data;
        setDataContext(data: any): void;
        getDataContext(): any;
        constructor(dom: HTMLOptionElement, data?: any);
        initialize(): void;
    }
    class CostumizedTemplate extends Template {
        constructor();
        CreateShadow(data: any): TemplateShadow;
    }
    class ComboBox extends ListAdapter<any, any> {
        constructor(dom: HTMLSelectElement, DataSource: collection.List<any>);
    }
    class TreeComboBox<T> extends JControl {
        private tree;
        private getString;
        constructor(tree: utils.Tree<T>, getString: (v: T) => string);
        initialize(): void;
        Reset(): void;
        private add(cont, node);
    }
}
export declare namespace UI {
}
export declare namespace UI {
    interface IAutoCompleteBox {
        Box: Input;
        DataSource: collection.List<any>;
        View: HTMLElement;
        IsChanged: boolean;
        Value: any;
        PrintSelection?: boolean;
        AutoPopup: boolean;
    }
    class AutoCompleteBox extends ActionText implements IAutoCompleteBox {
        AutoPopup: boolean;
        private dataSource;
        IsChanged: boolean;
        DataSource: collection.List<any>;
        constructor(input?: HTMLInputElement);
        initialize(): void;
        Value: any;
    }
    type AutoCompleteCallback<T> = (box: IAutoCompleteBox, oldValue: T, newValue: T) => void;
    class ProxyAutoCompleteBox<T> implements IAutoCompleteBox {
        Box: Input;
        AutoPopup: boolean;
        private callback;
        private _value;
        DataSource: collection.List<any>;
        OnValueChanged(owner: any, invoke: AutoCompleteCallback<T>): void;
        readonly View: HTMLElement;
        Value: T;
        IsChanged: boolean;
        constructor(Box: Input, source: collection.List<T>);
        initialize(): void;
    }
}
export declare module UI {
    class Paginator<T> extends JControl {
        countPerPage: number;
        private content;
        private paginator;
        private paginationFilter;
        readonly Filter: filters.list.SubListFilter<T>;
        constructor(countPerPage: number, dom?: HTMLElement);
        initialize(): void;
        private _cnt;
        Content: JControl;
        private whenIndexChanged(b, e);
        OnIndexChanged(ev: (b: bind.PropBinding, e: bind.EventArgs<number, BiPagination>) => void): bind.PropBinding;
        OffIndexChanged(b: bind.PropBinding): bind.PropBinding[];
        Max: number;
        BindMaxToSourceCount(x: collection.List<any>): void;
        UnbindMaxFromSourceCount(x: collection.List<T>): void;
        private bm2sc;
    }
}
export declare module UI {
    class Grid extends UI.JControl {
        initialize(): void;
    }
}
