define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scops;
    (function (Scops) {
        Scops[Scops["email"] = 0] = "email";
        Scops[Scops["public_profile"] = 1] = "public_profile";
        Scops[Scops["read_custom_friendlists"] = 2] = "read_custom_friendlists";
        Scops[Scops["user_about_me"] = 3] = "user_about_me";
        Scops[Scops["user_birthday"] = 4] = "user_birthday";
        Scops[Scops["user_education_history"] = 5] = "user_education_history";
        Scops[Scops["user_friends"] = 6] = "user_friends";
        Scops[Scops["user_hometown"] = 7] = "user_hometown";
        Scops[Scops["user_location"] = 8] = "user_location";
        Scops[Scops["user_relationship_details"] = 9] = "user_relationship_details";
        Scops[Scops["user_relationships"] = 10] = "user_relationships";
        Scops[Scops["user_religion_politics"] = 11] = "user_religion_politics";
        Scops[Scops["user_work_history"] = 12] = "user_work_history";
        Scops[Scops["publish_actions"] = 13] = "publish_actions";
        Scops[Scops["invitable_friends"] = 14] = "invitable_friends";
        Scops[Scops["manage_pages"] = 15] = "manage_pages";
        Scops[Scops["read_page_mailboxes"] = 16] = "read_page_mailboxes"; /*, user_posts*/
    })(Scops = exports.Scops || (exports.Scops = {}));
    var appTestID = '394907654315490';
    var appID = '1619534588085111';
    var Facebook = /** @class */ (function () {
        function Facebook(AppID, debug) {
            if (AppID === void 0) { AppID = appTestID; }
            if (debug === void 0) { debug = true; }
            this.AppID = AppID;
            this.scops = [];
            if (_default != null)
                throw null;
            _default = this;
            var js, fjs = document.getElementsByTagName('script')[0];
            if (!document.getElementById('facebook-jssdk')) {
                js = document.createElement('script');
                js.id = 'facebook-jssdk';
                var dbg = 'https://connect.facebook.net/en_US/all/debug.js';
                js.src = dbg || (debug ? "https://connect.facebook.net/en_US/sdk/debug.js" : "https://connect.facebook.net/en_US/sdk.js");
                fjs.parentNode.insertBefore(js, fjs);
            }
            this.init = this.init.bind(this);
            this.init();
        }
        Object.defineProperty(Facebook.prototype, "IsConnected", {
            get: function () { return this.status === 'connected' ? true : (this.status === 'not_authorized' ? false : null); },
            enumerable: true,
            configurable: true
        });
        Facebook.prototype._parseResponse = function (r) {
            this.status = r.status;
            if (r.authResponse)
                for (var i in r.authResponse)
                    this[i] = r.authResponse[i];
            else {
                this.accessToken = "";
                this.expiresIn = 0;
                this.grantedScopes = "";
                this.signedRequest = "";
                this.userID = "";
            }
        };
        Facebook.prototype.AsyncIsConnected = function (callback) {
            var _this = this;
            FB.getLoginStatus(function (response) {
                _this._parseResponse(response);
                callback && callback(_this, response.status === 'connected');
            });
        };
        Facebook.prototype.AllScops = function () {
            var scps = [];
            for (var i in Scops) {
                var v = Scops[i];
                if (typeof v === 'string')
                    scps.push(Scops[i]);
            }
            this.RegisterScop(scps);
        };
        Facebook.prototype.Connect = function (callback) {
            var _this = this;
            FB.login(function (r) {
                _this._parseResponse(r);
                callback && callback(_this);
            }, { scope: this.scops.join(','), enable_profile_selector: true, return_scopes: true, });
        };
        Facebook.prototype.fbAsyncInit = function () {
            FB.init({
                appId: this.AppID,
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });
            this.AsyncIsConnected();
        };
        Facebook.prototype.init = function () {
            var _this = this;
            if (window['fbAsyncInit'])
                setTimeout(this.init, 200);
            window['fbAsyncInit'] = function (x) {
                window['fbAsyncInit'] = undefined;
                _this.fbAsyncInit();
            };
        };
        Facebook.prototype.Login = function (callback) {
            FB.login(callback);
        };
        Facebook.prototype.getFriendsList = function (callback) {
            this.AsyncIsConnected(function (r) {
                if (r.IsConnected)
                    FB.api('/' + r.userID + '/friendlists', function (response) {
                        callback(r, response);
                    });
            });
        };
        Object.defineProperty(Facebook.prototype, "Scops", {
            get: function () { return this.scops; },
            enumerable: true,
            configurable: true
        });
        Facebook.prototype.RegisterScop = function (args) {
            var isn = this._processedArrays == null;
            if (isn)
                this._processedArrays = [];
            switch (typeof args) {
                case 'number':
                    var s = Scops[args];
                    if (typeof s === 'string')
                        this.scops.indexOf(s) === -1 && this.scops.push(s);
                    break;
                case 'string':
                    s = args;
                    var si = Scops[s];
                    if (typeof si === 'number')
                        this.scops.indexOf(args) === -1 && this.scops.push(args);
                    break;
                case 'object':
                    if (args instanceof Array) {
                        if (this._processedArrays.indexOf(args) !== -1)
                            return;
                        this._processedArrays.push(args);
                        for (var i = 0; i < args.length; i++)
                            this.RegisterScop(args[i]);
                    }
                    break;
                default:
            }
            if (isn)
                this._processedArrays = null;
        };
        Facebook.prototype.someApi = function () {
            var c = null;
            FB.login(function (r) { debugger; }, { scope: 'public_profile,email,invitable_friends' });
        };
        Facebook.Default = function (appId, debug) {
            return _default || (_default = new Facebook(appId, debug));
        };
        return Facebook;
    }());
    exports.Facebook = Facebook;
    var _default = null;
    exports.Fields_Names = ['about', 'id', 'address', 'admin_notes', 'age_range', 'birthday', 'can_review_measurement_request', 'context', 'cover', 'currency', 'devices', 'education', 'email', 'employee_number', 'favorite_athletes', 'favorite_teams', 'first_name', 'gender', 'hometown', 'inspirational_people', 'install_type', 'installed', 'interested_in', 'is_payment_enabled', 'is_shared_login', 'is_verified', 'labels', 'languages', 'last_ad_referral', 'last_name', 'link', 'local_news_megaphone_dismiss_status', 'local_news_subscription_status', 'locale', 'location', 'meeting_for', 'middle_name', 'name', 'name_format', 'payment_pricepoints', 'political', 'profile_pic', 'public_key', 'quotes', 'relationship_status', 'religion', 'security_settings', 'shared_login_upgrade_required_by', 'short_name', 'significant_other', 'sports', 'test_group', 'third_party_id', 'timezone', 'token_for_business', 'updated_time', 'verified', 'video_upload_limits', 'viewer_can_send_gift', 'website', 'work'];
    var EFields;
    (function (EFields) {
        EFields["about"] = "about";
        EFields["id"] = "id";
        EFields["address"] = "address";
        EFields["admin_notes"] = "admin_notes";
        EFields["age_range"] = "age_range";
        EFields["birthday"] = "birthday";
        EFields["can_review_measurement_request"] = "can_review_measurement_request";
        EFields["context"] = "context";
        EFields["cover"] = "cover";
        EFields["currency"] = "currency";
        EFields["devices"] = "devices";
        EFields["education"] = "education";
        EFields["email"] = "email";
        EFields["employee_number"] = "employee_number";
        EFields["favorite_athletes"] = "favorite_athletes";
        EFields["favorite_teams"] = "favorite_teams";
        EFields["first_name"] = "first_name";
        EFields["gender"] = "gender";
        EFields["hometown"] = "hometown";
        EFields["inspirational_people"] = "inspirational_people";
        EFields["install_type"] = "install_type";
        EFields["installed"] = "installed";
        EFields["interested_in"] = "interested_in";
        EFields["is_payment_enabled"] = "is_payment_enabled";
        EFields["is_shared_login"] = "is_shared_login";
        EFields["is_verified"] = "is_verified";
        EFields["labels"] = "labels";
        EFields["languages"] = "languages";
        EFields["last_ad_referral"] = "last_ad_referral";
        EFields["last_name"] = "last_name";
        EFields["link"] = "link";
        EFields["local_news_megaphone_dismiss_status"] = "local_news_megaphone_dismiss_status";
        EFields["local_news_subscription_status"] = "local_news_subscription_status";
        EFields["locale"] = "locale";
        EFields["location"] = "location";
        EFields["meeting_for"] = "meeting_for";
        EFields["middle_name"] = "middle_name";
        EFields["name"] = "name";
        EFields["name_format"] = "name_format";
        EFields["payment_pricepoints"] = "payment_pricepoints";
        EFields["political"] = "political";
        EFields["profile_pic"] = "profile_pic";
        EFields["public_key"] = "public_key";
        EFields["quotes"] = "quotes";
        EFields["relationship_status"] = "relationship_status";
        EFields["religion"] = "religion";
        EFields["security_settings"] = "security_settings";
        EFields["shared_login_upgrade_required_by"] = "shared_login_upgrade_required_by";
        EFields["short_name"] = "short_name";
        EFields["significant_other"] = "significant_other";
        EFields["sports"] = "sports";
        EFields["test_group"] = "test_group";
        EFields["third_party_id"] = "third_party_id";
        EFields["timezone"] = "timezone";
        EFields["token_for_business"] = "token_for_business";
        EFields["updated_time"] = "updated_time";
        EFields["verified"] = "verified";
        EFields["video_upload_limits"] = "video_upload_limits";
        EFields["viewer_can_send_gift"] = "viewer_can_send_gift";
        EFields["website"] = "website";
        EFields["work"] = "work";
    })(EFields = exports.EFields || (exports.EFields = {}));
    exports.Edges_fields = ['accounts', 'achievements', 'ad_studies', 'adaccounts', 'adcontracts', 'adnetworkanalytics', 'albums', 'apprequestformerrecipients', 'apprequests', 'asset3ds', 'assigned_ad_accounts', 'assigned_monetization_properties', 'assigned_pages', 'assigned_product_catalogs', 'books', 'business_activities', 'business_users', 'businesses', 'conversations', 'curated_collections', 'custom_labels', 'domains', 'events', 'family', 'favorite_requests', 'friendlists', 'friends', 'games', 'groups', 'ids_for_apps', 'ids_for_business', 'ids_for_pages', 'invitable_friends', 'leadgen_forms', 'likes', 'live_encoders', 'live_videos', 'movies', 'music', 'objects', 'permissions', 'personal_ad_accounts', 'photos', 'picture', 'promotable_domains', 'promotable_events', 'request_history', 'rich_media_documents', 'session_keys', 'stream_filters', 'taggable_friends', 'tagged_places', 'television', 'threads', 'video_broadcasts', 'videos', 'checkins', 'feed', 'friendrequests', 'home', 'inbox', 'locations', 'mutualfriends', 'notifications', 'outbox', 'questions', 'scores', 'subscribers', 'subscribedto'];
});
//# sourceMappingURL=Facebook.js.map