/**
 * @fileoverview ç™¾åº¦åœ°å›¾çš„é¼ æ ‡ç»˜åˆ¶å·¥å…·ï¼Œå¯¹å¤–å¼€æ”¾ã€‚
 * å…è®¸ç”¨æˆ·åœ¨åœ°å›¾ä¸Šç‚¹å‡»å®Œæˆé¼ æ ‡ç»˜åˆ¶çš„åŠŸèƒ½ã€‚
 * ä½¿ç”¨è€…å¯ä»¥è‡ªå®šä¹‰æ‰€ç»˜åˆ¶ç»“æžœçš„ç›¸å…³æ ·å¼ï¼Œä¾‹å¦‚çº¿å®½ã€é¢œè‰²ã€æµ‹çº¿æ®µè·ç¦»ã€é¢ç§¯ç­‰ç­‰ã€‚
 * ä¸»å…¥å£ç±»æ˜¯<a href="symbols/BMapLib.DrawingManager.html">DrawingManager</a>ï¼Œ
 * åŸºäºŽBaidu Map API 1.4ã€‚
 *
 * @author Baidu Map Api Group 
 * @version 1.4
 */

/** 
 * @namespace BMapçš„æ‰€æœ‰libraryç±»å‡æ”¾åœ¨BMapLibå‘½åç©ºé—´ä¸‹
 */
var BMapLib = window.BMapLib = BMapLib || {};

/**
 * å®šä¹‰å¸¸é‡, ç»˜åˆ¶çš„æ¨¡å¼
 * @final {Number} DrawingType
 */
var BMAP_DRAWING_MARKER    = "marker",     // é¼ æ ‡ç”»ç‚¹æ¨¡å¼
    BMAP_DRAWING_POLYLINE  = "polyline",   // é¼ æ ‡ç”»çº¿æ¨¡å¼
    BMAP_DRAWING_CIRCLE    = "circle",     // é¼ æ ‡ç”»åœ†æ¨¡å¼
    BMAP_DRAWING_RECTANGLE = "rectangle",  // é¼ æ ‡ç”»çŸ©å½¢æ¨¡å¼
    BMAP_DRAWING_POLYGON   = "polygon";    // é¼ æ ‡ç”»å¤šè¾¹å½¢æ¨¡å¼

(function() {

    /**
     * å£°æ˜ŽbaiduåŒ…
     */
    var baidu = baidu || {guid : "$BAIDU$"};
    (function() {
        // ä¸€äº›é¡µé¢çº§åˆ«å”¯ä¸€çš„å±žæ€§ï¼Œéœ€è¦æŒ‚è½½åœ¨window[baidu.guid]ä¸Š
        window[baidu.guid] = {};

        /**
         * å°†æºå¯¹è±¡çš„æ‰€æœ‰å±žæ€§æ‹·è´åˆ°ç›®æ ‡å¯¹è±¡ä¸­
         * @name baidu.extend
         * @function
         * @grammar baidu.extend(target, source)
         * @param {Object} target ç›®æ ‡å¯¹è±¡
         * @param {Object} source æºå¯¹è±¡
         * @returns {Object} ç›®æ ‡å¯¹è±¡
         */
        baidu.extend = function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }    
            return target;
        };

        /**
         * @ignore
         * @namespace
         * @baidu.lang å¯¹è¯­è¨€å±‚é¢çš„å°è£…ï¼ŒåŒ…æ‹¬ç±»åž‹åˆ¤æ–­ã€æ¨¡å—æ‰©å±•ã€ç»§æ‰¿åŸºç±»ä»¥åŠå¯¹è±¡è‡ªå®šä¹‰äº‹ä»¶çš„æ”¯æŒã€‚
         * @property guid å¯¹è±¡çš„å”¯ä¸€æ ‡è¯†
         */
        baidu.lang = baidu.lang || {};

        /**
         * è¿”å›žä¸€ä¸ªå½“å‰é¡µé¢çš„å”¯ä¸€æ ‡è¯†å­—ç¬¦ä¸²ã€‚
         * @function
         * @grammar baidu.lang.guid()
         * @returns {String} å½“å‰é¡µé¢çš„å”¯ä¸€æ ‡è¯†å­—ç¬¦ä¸²
         */
        baidu.lang.guid = function() {
            return "TANGRAM__" + (window[baidu.guid]._counter ++).toString(36);
        };

        window[baidu.guid]._counter = window[baidu.guid]._counter || 1;

        /**
         * æ‰€æœ‰ç±»çš„å®žä¾‹çš„å®¹å™¨
         * keyä¸ºæ¯ä¸ªå®žä¾‹çš„guid
         */
        window[baidu.guid]._instances = window[baidu.guid]._instances || {};

        /**
         * Tangramç»§æ‰¿æœºåˆ¶æä¾›çš„ä¸€ä¸ªåŸºç±»ï¼Œç”¨æˆ·å¯ä»¥é€šè¿‡ç»§æ‰¿baidu.lang.Classæ¥èŽ·å–å®ƒçš„å±žæ€§åŠæ–¹æ³•ã€‚
         * @function
         * @name baidu.lang.Class
         * @grammar baidu.lang.Class(guid)
         * @param {string} guid å¯¹è±¡çš„å”¯ä¸€æ ‡è¯†
         * @meta standard
         * @remark baidu.lang.Classå’Œå®ƒçš„å­ç±»çš„å®žä¾‹å‡åŒ…å«ä¸€ä¸ªå…¨å±€å”¯ä¸€çš„æ ‡è¯†guidã€‚
         * guidæ˜¯åœ¨æž„é€ å‡½æ•°ä¸­ç”Ÿæˆçš„ï¼Œå› æ­¤ï¼Œç»§æ‰¿è‡ªbaidu.lang.Classçš„ç±»åº”è¯¥ç›´æŽ¥æˆ–è€…é—´æŽ¥è°ƒç”¨å®ƒçš„æž„é€ å‡½æ•°ã€‚<br>
         * baidu.lang.Classçš„æž„é€ å‡½æ•°ä¸­äº§ç”Ÿguidçš„æ–¹å¼å¯ä»¥ä¿è¯guidçš„å”¯ä¸€æ€§ï¼ŒåŠæ¯ä¸ªå®žä¾‹éƒ½æœ‰ä¸€ä¸ªå…¨å±€å”¯ä¸€çš„guidã€‚
         */
        baidu.lang.Class = function(guid) {
            this.guid = guid || baidu.lang.guid();
            window[baidu.guid]._instances[this.guid] = this;
        };

        window[baidu.guid]._instances = window[baidu.guid]._instances || {};

        /**
         * åˆ¤æ–­ç›®æ ‡å‚æ•°æ˜¯å¦stringç±»åž‹æˆ–Stringå¯¹è±¡
         * @name baidu.lang.isString
         * @function
         * @grammar baidu.lang.isString(source)
         * @param {Any} source ç›®æ ‡å‚æ•°
         * @shortcut isString
         * @meta standard
         *             
         * @returns {boolean} ç±»åž‹åˆ¤æ–­ç»“æžœ
         */
        baidu.lang.isString = function (source) {
            return '[object String]' == Object.prototype.toString.call(source);
        };

        /**
         * åˆ¤æ–­ç›®æ ‡å‚æ•°æ˜¯å¦ä¸ºfunctionæˆ–Functionå®žä¾‹
         * @name baidu.lang.isFunction
         * @function
         * @grammar baidu.lang.isFunction(source)
         * @param {Any} source ç›®æ ‡å‚æ•°
         * @returns {boolean} ç±»åž‹åˆ¤æ–­ç»“æžœ
         */
        baidu.lang.isFunction = function (source) {
            return '[object Function]' == Object.prototype.toString.call(source);
        };

        /**
         * é‡è½½äº†é»˜è®¤çš„toStringæ–¹æ³•ï¼Œä½¿å¾—è¿”å›žä¿¡æ¯æ›´åŠ å‡†ç¡®ä¸€äº›ã€‚
         * @return {string} å¯¹è±¡çš„Stringè¡¨ç¤ºå½¢å¼
         */
        baidu.lang.Class.prototype.toString = function(){
            return "[object " + (this._className || "Object" ) + "]";
        };

        /**
         * é‡Šæ”¾å¯¹è±¡æ‰€æŒæœ‰çš„èµ„æºï¼Œä¸»è¦æ˜¯è‡ªå®šä¹‰äº‹ä»¶ã€‚
         * @name dispose
         * @grammar obj.dispose()
         */
        baidu.lang.Class.prototype.dispose = function(){
            delete window[baidu.guid]._instances[this.guid];
            for(var property in this){
                if (!baidu.lang.isFunction(this[property])) {
                    delete this[property];
                }
            }
            this.disposed = true;
        };

        /**
         * è‡ªå®šä¹‰çš„äº‹ä»¶å¯¹è±¡ã€‚
         * @function
         * @name baidu.lang.Event
         * @grammar baidu.lang.Event(type[, target])
         * @param {string} type  äº‹ä»¶ç±»åž‹åç§°ã€‚ä¸ºäº†æ–¹ä¾¿åŒºåˆ†äº‹ä»¶å’Œä¸€ä¸ªæ™®é€šçš„æ–¹æ³•ï¼Œäº‹ä»¶ç±»åž‹åç§°å¿…é¡»ä»¥"on"(å°å†™)å¼€å¤´ã€‚
         * @param {Object} [target]è§¦å‘äº‹ä»¶çš„å¯¹è±¡
         * @meta standard
         * @remark å¼•å…¥è¯¥æ¨¡å—ï¼Œä¼šè‡ªåŠ¨ä¸ºClasså¼•å…¥3ä¸ªäº‹ä»¶æ‰©å±•æ–¹æ³•ï¼šaddEventListenerã€removeEventListenerå’ŒdispatchEventã€‚
         * @see baidu.lang.Class
         */
        baidu.lang.Event = function (type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
        };

        /**
         * æ³¨å†Œå¯¹è±¡çš„äº‹ä»¶ç›‘å¬å™¨ã€‚å¼•å…¥baidu.lang.EventåŽï¼ŒClassçš„å­ç±»å®žä¾‹æ‰ä¼šèŽ·å¾—è¯¥æ–¹æ³•ã€‚
         * @grammar obj.addEventListener(type, handler[, key])
         * @param   {string}   type         è‡ªå®šä¹‰äº‹ä»¶çš„åç§°
         * @param   {Function} handler      è‡ªå®šä¹‰äº‹ä»¶è¢«è§¦å‘æ—¶åº”è¯¥è°ƒç”¨çš„å›žè°ƒå‡½æ•°
         * @param   {string}   [key]        ä¸ºäº‹ä»¶ç›‘å¬å‡½æ•°æŒ‡å®šçš„åç§°ï¼Œå¯åœ¨ç§»é™¤æ—¶ä½¿ç”¨ã€‚å¦‚æžœä¸æä¾›ï¼Œæ–¹æ³•ä¼šé»˜è®¤ä¸ºå®ƒç”Ÿæˆä¸€ä¸ªå…¨å±€å”¯ä¸€çš„keyã€‚
         * @remark  äº‹ä»¶ç±»åž‹åŒºåˆ†å¤§å°å†™ã€‚å¦‚æžœè‡ªå®šä¹‰äº‹ä»¶åç§°ä¸æ˜¯ä»¥å°å†™"on"å¼€å¤´ï¼Œè¯¥æ–¹æ³•ä¼šç»™å®ƒåŠ ä¸Š"on"å†è¿›è¡Œåˆ¤æ–­ï¼Œå³"click"å’Œ"onclick"ä¼šè¢«è®¤ä¸ºæ˜¯åŒä¸€ç§äº‹ä»¶ã€‚ 
         */
        baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
            if (!baidu.lang.isFunction(handler)) {
                return;
            }
            !this.__listeners && (this.__listeners = {});
            var t = this.__listeners, id;
            if (typeof key == "string" && key) {
                if (/[^\w\-]/.test(key)) {
                    throw("nonstandard key:" + key);
                } else {
                    handler.hashCode = key; 
                    id = key;
                }
            }
            type.indexOf("on") != 0 && (type = "on" + type);
            typeof t[type] != "object" && (t[type] = {});
            id = id || baidu.lang.guid();
            handler.hashCode = id;
            t[type][id] = handler;
        };
         
        /**
         * ç§»é™¤å¯¹è±¡çš„äº‹ä»¶ç›‘å¬å™¨ã€‚å¼•å…¥baidu.lang.EventåŽï¼ŒClassçš„å­ç±»å®žä¾‹æ‰ä¼šèŽ·å¾—è¯¥æ–¹æ³•ã€‚
         * @grammar obj.removeEventListener(type, handler)
         * @param {string}   type     äº‹ä»¶ç±»åž‹
         * @param {Function|string} handler  è¦ç§»é™¤çš„äº‹ä»¶ç›‘å¬å‡½æ•°æˆ–è€…ç›‘å¬å‡½æ•°çš„key
         * @remark  å¦‚æžœç¬¬äºŒä¸ªå‚æ•°handleræ²¡æœ‰è¢«ç»‘å®šåˆ°å¯¹åº”çš„è‡ªå®šä¹‰äº‹ä»¶ä¸­ï¼Œä»€ä¹ˆä¹Ÿä¸åšã€‚
         */
        baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
            if (baidu.lang.isFunction(handler)) {
                handler = handler.hashCode;
            } else if (!baidu.lang.isString(handler)) {
                return;
            }
            !this.__listeners && (this.__listeners = {});
            type.indexOf("on") != 0 && (type = "on" + type);
            var t = this.__listeners;
            if (!t[type]) {
                return;
            }
            t[type][handler] && delete t[type][handler];
        };

        /**
         * æ´¾å‘è‡ªå®šä¹‰äº‹ä»¶ï¼Œä½¿å¾—ç»‘å®šåˆ°è‡ªå®šä¹‰äº‹ä»¶ä¸Šé¢çš„å‡½æ•°éƒ½ä¼šè¢«æ‰§è¡Œã€‚å¼•å…¥baidu.lang.EventåŽï¼ŒClassçš„å­ç±»å®žä¾‹æ‰ä¼šèŽ·å¾—è¯¥æ–¹æ³•ã€‚
         * @grammar obj.dispatchEvent(event, options)
         * @param {baidu.lang.Event|String} event   Eventå¯¹è±¡ï¼Œæˆ–äº‹ä»¶åç§°(1.1.1èµ·æ”¯æŒ)
         * @param {Object} options æ‰©å±•å‚æ•°,æ‰€å«å±žæ€§é”®å€¼ä¼šæ‰©å±•åˆ°Eventå¯¹è±¡ä¸Š(1.2èµ·æ”¯æŒ)
         * @remark å¤„ç†ä¼šè°ƒç”¨é€šè¿‡addEventListenrç»‘å®šçš„è‡ªå®šä¹‰äº‹ä»¶å›žè°ƒå‡½æ•°ä¹‹å¤–ï¼Œè¿˜ä¼šè°ƒç”¨ç›´æŽ¥ç»‘å®šåˆ°å¯¹è±¡ä¸Šé¢çš„è‡ªå®šä¹‰äº‹ä»¶ã€‚
         * ä¾‹å¦‚ï¼š<br>
         * myobj.onMyEvent = function(){}<br>
         * myobj.addEventListener("onMyEvent", function(){});
         */
        baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
            if (baidu.lang.isString(event)) {
                event = new baidu.lang.Event(event);
            }
            !this.__listeners && (this.__listeners = {});
            options = options || {};
            for (var i in options) {
                event[i] = options[i];
            }
            var i, t = this.__listeners, p = event.type;
            event.target = event.target || this;
            event.currentTarget = this;
            p.indexOf("on") != 0 && (p = "on" + p);
            baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
            if (typeof t[p] == "object") {
                for (i in t[p]) {
                    t[p][i].apply(this, arguments);
                }
            }
            return event.returnValue;
        };

        /**
         * ä¸ºç±»åž‹æž„é€ å™¨å»ºç«‹ç»§æ‰¿å…³ç³»
         * @name baidu.lang.inherits
         * @function
         * @grammar baidu.lang.inherits(subClass, superClass[, className])
         * @param {Function} subClass å­ç±»æž„é€ å™¨
         * @param {Function} superClass çˆ¶ç±»æž„é€ å™¨
         * @param {string} className ç±»åæ ‡è¯†
         * @remark ä½¿subClassç»§æ‰¿superClassçš„prototypeï¼Œ
         * å› æ­¤subClassçš„å®žä¾‹èƒ½å¤Ÿä½¿ç”¨superClassçš„prototypeä¸­å®šä¹‰çš„æ‰€æœ‰å±žæ€§å’Œæ–¹æ³•ã€‚<br>
         * è¿™ä¸ªå‡½æ•°å®žé™…ä¸Šæ˜¯å»ºç«‹äº†subClasså’ŒsuperClassçš„åŽŸåž‹é“¾é›†æˆï¼Œå¹¶å¯¹subClassè¿›è¡Œäº†constructorä¿®æ­£ã€‚<br>
         * <strong>æ³¨æ„ï¼šå¦‚æžœè¦ç»§æ‰¿æž„é€ å‡½æ•°ï¼Œéœ€è¦åœ¨subClassé‡Œé¢callä¸€ä¸‹ï¼Œå…·ä½“è§ä¸‹é¢çš„demoä¾‹å­</strong>
         * @shortcut inherits
         * @meta standard
         * @see baidu.lang.Class
         */
        baidu.lang.inherits = function (subClass, superClass, className) {
            var key, proto, 
                selfProps = subClass.prototype, 
                clazz = new Function();        
            clazz.prototype = superClass.prototype;
            proto = subClass.prototype = new clazz();
            for (key in selfProps) {
                proto[key] = selfProps[key];
            }
            subClass.prototype.constructor = subClass;
            subClass.superClass = superClass.prototype;

            if ("string" == typeof className) {
                proto._className = className;
            }
        };

        /**
         * @ignore
         * @namespace baidu.dom æ“ä½œdomçš„æ–¹æ³•ã€‚
         */
        baidu.dom = baidu.dom || {};

        /**
         * ä»Žæ–‡æ¡£ä¸­èŽ·å–æŒ‡å®šçš„DOMå…ƒç´ 
         * 
         * @param {string|HTMLElement} id å…ƒç´ çš„idæˆ–DOMå…ƒç´ 
         * @meta standard
         * @return {HTMLElement} DOMå…ƒç´ ï¼Œå¦‚æžœä¸å­˜åœ¨ï¼Œè¿”å›žnullï¼Œå¦‚æžœå‚æ•°ä¸åˆæ³•ï¼Œç›´æŽ¥è¿”å›žå‚æ•°
         */
        baidu._g = baidu.dom._g = function (id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id);
            }
            return id;
        };

        /**
         * ä»Žæ–‡æ¡£ä¸­èŽ·å–æŒ‡å®šçš„DOMå…ƒç´ 
         * @name baidu.dom.g
         * @function
         * @grammar baidu.dom.g(id)
         * @param {string|HTMLElement} id å…ƒç´ çš„idæˆ–DOMå…ƒç´ 
         * @meta standard
         *             
         * @returns {HTMLElement|null} èŽ·å–çš„å…ƒç´ ï¼ŒæŸ¥æ‰¾ä¸åˆ°æ—¶è¿”å›žnull,å¦‚æžœå‚æ•°ä¸åˆæ³•ï¼Œç›´æŽ¥è¿”å›žå‚æ•°
         */
        baidu.g = baidu.dom.g = function (id) {
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        };

        /**
         * åœ¨ç›®æ ‡å…ƒç´ çš„æŒ‡å®šä½ç½®æ’å…¥HTMLä»£ç 
         * @name baidu.dom.insertHTML
         * @function
         * @grammar baidu.dom.insertHTML(element, position, html)
         * @param {HTMLElement|string} element ç›®æ ‡å…ƒç´ æˆ–ç›®æ ‡å…ƒç´ çš„id
         * @param {string} position æ’å…¥htmlçš„ä½ç½®ä¿¡æ¯ï¼Œå–å€¼ä¸ºbeforeBegin,afterBegin,beforeEnd,afterEnd
         * @param {string} html è¦æ’å…¥çš„html
         * @remark
         * 
         * å¯¹äºŽpositionå‚æ•°ï¼Œå¤§å°å†™ä¸æ•æ„Ÿ<br>
         * å‚æ•°çš„æ„æ€ï¼šbeforeBegin&lt;span&gt;afterBegin   this is span! beforeEnd&lt;/span&gt; afterEnd <br />
         * æ­¤å¤–ï¼Œå¦‚æžœä½¿ç”¨æœ¬å‡½æ•°æ’å…¥å¸¦æœ‰scriptæ ‡ç­¾çš„HTMLå­—ç¬¦ä¸²ï¼Œscriptæ ‡ç­¾å¯¹åº”çš„è„šæœ¬å°†ä¸ä¼šè¢«æ‰§è¡Œã€‚
         * 
         * @shortcut insertHTML
         * @meta standard
         *             
         * @returns {HTMLElement} ç›®æ ‡å…ƒç´ 
         */
        baidu.insertHTML = baidu.dom.insertHTML = function (element, position, html) {
            element = baidu.dom.g(element);
            var range,begin;

            if (element.insertAdjacentHTML) {
                element.insertAdjacentHTML(position, html);
            } else {
                // è¿™é‡Œä¸åš"undefined" != typeof(HTMLElement) && !window.operaåˆ¤æ–­ï¼Œå…¶å®ƒæµè§ˆå™¨å°†å‡ºé”™ï¼Ÿï¼
                // ä½†æ˜¯å…¶å®žåšäº†åˆ¤æ–­ï¼Œå…¶å®ƒæµè§ˆå™¨ä¸‹ç­‰äºŽè¿™ä¸ªå‡½æ•°å°±ä¸èƒ½æ‰§è¡Œäº†
                range = element.ownerDocument.createRange();
                // FFä¸‹rangeçš„ä½ç½®è®¾ç½®é”™è¯¯å¯èƒ½å¯¼è‡´åˆ›å»ºå‡ºæ¥çš„fragmentåœ¨æ’å…¥domæ ‘ä¹‹åŽhtmlç»“æž„ä¹±æŽ‰
                // æ”¹ç”¨range.insertNodeæ¥æ’å…¥html, by wenyuxiang @ 2010-12-14.
                position = position.toUpperCase();
                if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
                    range.selectNodeContents(element);
                    range.collapse(position == 'AFTERBEGIN');
                } else {
                    begin = position == 'BEFOREBEGIN';
                    range[begin ? 'setStartBefore' : 'setEndAfter'](element);
                    range.collapse(begin);
                }
                range.insertNode(range.createContextualFragment(html));
            }
            return element;
        };

        /**
         * ä¸ºç›®æ ‡å…ƒç´ æ·»åŠ className
         * @name baidu.dom.addClass
         * @function
         * @grammar baidu.dom.addClass(element, className)
         * @param {HTMLElement|string} element ç›®æ ‡å…ƒç´ æˆ–ç›®æ ‡å…ƒç´ çš„id
         * @param {string} className è¦æ·»åŠ çš„classNameï¼Œå…è®¸åŒæ—¶æ·»åŠ å¤šä¸ªclassï¼Œä¸­é—´ä½¿ç”¨ç©ºç™½ç¬¦åˆ†éš”
         * @remark
         * ä½¿ç”¨è€…åº”ä¿è¯æä¾›çš„classNameåˆæ³•æ€§ï¼Œä¸åº”åŒ…å«ä¸åˆæ³•å­—ç¬¦ï¼ŒclassNameåˆæ³•å­—ç¬¦å‚è€ƒï¼šhttp://www.w3.org/TR/CSS2/syndata.htmlã€‚
         * @shortcut addClass
         * @meta standard
         *              
         * @returns {HTMLElement} ç›®æ ‡å…ƒç´ 
         */
        baidu.ac = baidu.dom.addClass = function (element, className) {
            element = baidu.dom.g(element);
            var classArray = className.split(/\s+/),
                result = element.className,
                classMatch = " " + result + " ",
                i = 0,
                l = classArray.length;

            for (; i < l; i++){
                 if ( classMatch.indexOf( " " + classArray[i] + " " ) < 0 ) {
                     result += (result ? ' ' : '') + classArray[i];
                 }
            }

            element.className = result;
            return element;
        };

        /**
         * @ignore
         * @namespace baidu.event å±è”½æµè§ˆå™¨å·®å¼‚æ€§çš„äº‹ä»¶å°è£…ã€‚
         * @property target     äº‹ä»¶çš„è§¦å‘å…ƒç´ 
         * @property pageX      é¼ æ ‡äº‹ä»¶çš„é¼ æ ‡xåæ ‡
         * @property pageY      é¼ æ ‡äº‹ä»¶çš„é¼ æ ‡yåæ ‡
         * @property keyCode    é”®ç›˜äº‹ä»¶çš„é”®å€¼
         */
        baidu.event = baidu.event || {};

        /**
         * äº‹ä»¶ç›‘å¬å™¨çš„å­˜å‚¨è¡¨
         * @private
         * @meta standard
         */
        baidu.event._listeners = baidu.event._listeners || [];

        /**
         * ä¸ºç›®æ ‡å…ƒç´ æ·»åŠ äº‹ä»¶ç›‘å¬å™¨
         * @name baidu.event.on
         * @function
         * @grammar baidu.event.on(element, type, listener)
         * @param {HTMLElement|string|window} element ç›®æ ‡å…ƒç´ æˆ–ç›®æ ‡å…ƒç´ id
         * @param {string} type äº‹ä»¶ç±»åž‹
         * @param {Function} listener éœ€è¦æ·»åŠ çš„ç›‘å¬å™¨
         * @remark
         *  1. ä¸æ”¯æŒè·¨æµè§ˆå™¨çš„é¼ æ ‡æ»šè½®äº‹ä»¶ç›‘å¬å™¨æ·»åŠ <br>
         *  2. æ”¹æ–¹æ³•ä¸ä¸ºç›‘å¬å™¨çŒå…¥äº‹ä»¶å¯¹è±¡ï¼Œä»¥é˜²æ­¢è·¨iframeäº‹ä»¶æŒ‚è½½çš„äº‹ä»¶å¯¹è±¡èŽ·å–å¤±è´¥            
         * @shortcut on
         * @meta standard
         * @see baidu.event.un
         *             
         * @returns {HTMLElement|window} ç›®æ ‡å…ƒç´ 
         */
        baidu.on = baidu.event.on = function (element, type, listener) {
            type = type.replace(/^on/i, '');
            element = baidu._g(element);
            var realListener = function (ev) {
                // 1. è¿™é‡Œä¸æ”¯æŒEventArgument,  åŽŸå› æ˜¯è·¨frameçš„äº‹ä»¶æŒ‚è½½
                // 2. elementæ˜¯ä¸ºäº†ä¿®æ­£this
                listener.call(element, ev);
            },
            lis = baidu.event._listeners,
            filter = baidu.event._eventFilter,
            afterFilter,
            realType = type;
            type = type.toLowerCase();
            // filterè¿‡æ»¤
            if(filter && filter[type]){
                afterFilter = filter[type](element, type, realListener);
                realType = afterFilter.type;
                realListener = afterFilter.listener;
            }
            // äº‹ä»¶ç›‘å¬å™¨æŒ‚è½½
            if (element.addEventListener) {
                element.addEventListener(realType, realListener, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + realType, realListener);
            }
          
            // å°†ç›‘å¬å™¨å­˜å‚¨åˆ°æ•°ç»„ä¸­
            lis[lis.length] = [element, type, listener, realListener, realType];
            return element;
        };

        /**
         * ä¸ºç›®æ ‡å…ƒç´ ç§»é™¤äº‹ä»¶ç›‘å¬å™¨
         * @name baidu.event.un
         * @function
         * @grammar baidu.event.un(element, type, listener)
         * @param {HTMLElement|string|window} element ç›®æ ‡å…ƒç´ æˆ–ç›®æ ‡å…ƒç´ id
         * @param {string} type äº‹ä»¶ç±»åž‹
         * @param {Function} listener éœ€è¦ç§»é™¤çš„ç›‘å¬å™¨
         * @shortcut un
         * @meta standard
         *             
         * @returns {HTMLElement|window} ç›®æ ‡å…ƒç´ 
         */
        baidu.un = baidu.event.un = function (element, type, listener) {
            element = baidu._g(element);
            type = type.replace(/^on/i, '').toLowerCase();
            
            var lis = baidu.event._listeners, 
                len = lis.length,
                isRemoveAll = !listener,
                item,
                realType, realListener;
            
            //å¦‚æžœå°†listenerçš„ç»“æž„æ”¹æˆjson
            //å¯ä»¥èŠ‚çœæŽ‰è¿™ä¸ªå¾ªçŽ¯ï¼Œä¼˜åŒ–æ€§èƒ½
            //ä½†æ˜¯ç”±äºŽunçš„ä½¿ç”¨é¢‘çŽ‡å¹¶ä¸é«˜ï¼ŒåŒæ—¶åœ¨listenerä¸å¤šçš„æ—¶å€™
            //éåŽ†æ•°ç»„çš„æ€§èƒ½æ¶ˆè€—ä¸ä¼šå¯¹ä»£ç äº§ç”Ÿå½±å“
            //æš‚ä¸è€ƒè™‘æ­¤ä¼˜åŒ–
            while (len--) {
                item = lis[len];
                
                // listenerå­˜åœ¨æ—¶ï¼Œç§»é™¤elementçš„æ‰€æœ‰ä»¥listenerç›‘å¬çš„typeç±»åž‹äº‹ä»¶
                // listenerä¸å­˜åœ¨æ—¶ï¼Œç§»é™¤elementçš„æ‰€æœ‰typeç±»åž‹äº‹ä»¶
                if (item[1] === type
                    && item[0] === element
                    && (isRemoveAll || item[2] === listener)) {
                    realType = item[4];
                    realListener = item[3];
                    if (element.removeEventListener) {
                        element.removeEventListener(realType, realListener, false);
                    } else if (element.detachEvent) {
                        element.detachEvent('on' + realType, realListener);
                    }
                    lis.splice(len, 1);
                }
            }            
            return element;
        };

        /**
         * èŽ·å–eventäº‹ä»¶,è§£å†³ä¸åŒæµè§ˆå™¨å…¼å®¹é—®é¢˜
         * @param {Event}
         * @return {Event}
         */
        baidu.getEvent = baidu.event.getEvent = function (event) {
            return window.event || event;
        }

        /**
         * èŽ·å–event.target,è§£å†³ä¸åŒæµè§ˆå™¨å…¼å®¹é—®é¢˜
         * @param {Event}
         * @return {Target}
         */
        baidu.getTarget = baidu.event.getTarget = function (event) {
            var event = baidu.getEvent(event);
            return event.target || event.srcElement;
        }

        /**
         * é˜»æ­¢äº‹ä»¶çš„é»˜è®¤è¡Œä¸º
         * @name baidu.event.preventDefault
         * @function
         * @grammar baidu.event.preventDefault(event)
         * @param {Event} event äº‹ä»¶å¯¹è±¡
         * @meta standard
         */
        baidu.preventDefault = baidu.event.preventDefault = function (event) {
           var event = baidu.getEvent(event);
           if (event.preventDefault) {
               event.preventDefault();
           } else {
               event.returnValue = false;
           }
        };

        /**
         * åœæ­¢äº‹ä»¶å†’æ³¡ä¼ æ’­
         * @param {Event}
         */
        baidu.stopBubble = baidu.event.stopBubble = function (event) {
            event = baidu.getEvent(event);
            event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
        }

        baidu.browser = baidu.browser || {};

            if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
                //IE 8ä¸‹ï¼Œä»¥documentModeä¸ºå‡†
                //åœ¨ç™¾åº¦æ¨¡æ¿ä¸­ï¼Œå¯èƒ½ä¼šæœ‰$ï¼Œé˜²æ­¢å†²çªï¼Œå°†$1 å†™æˆ \x241
            /**
             * åˆ¤æ–­æ˜¯å¦ä¸ºieæµè§ˆå™¨
             * @property ie ieç‰ˆæœ¬å·
             * @grammar baidu.browser.ie
             * @meta standard
             * @shortcut ie
             * @see baidu.browser.firefox,baidu.browser.safari,baidu.browser.opera,baidu.browser.chrome,baidu.browser.maxthon 
             */
               baidu.browser.ie = baidu.ie = document.documentMode || + RegExp['\x241'];
}

    })();

    /** 
     * @exports DrawingManager as BMapLib.DrawingManager 
     */
    var DrawingManager =
        /**
         * DrawingManagerç±»çš„æž„é€ å‡½æ•°
         * @class é¼ æ ‡ç»˜åˆ¶ç®¡ç†ç±»ï¼Œå®žçŽ°é¼ æ ‡ç»˜åˆ¶ç®¡ç†çš„<b>å…¥å£</b>ã€‚
         * å®žä¾‹åŒ–è¯¥ç±»åŽï¼Œå³å¯è°ƒç”¨è¯¥ç±»æä¾›çš„open
         * æ–¹æ³•å¼€å¯ç»˜åˆ¶æ¨¡å¼çŠ¶æ€ã€‚
         * ä¹Ÿå¯åŠ å…¥å·¥å…·æ è¿›è¡Œé€‰æ‹©æ“ä½œã€‚
         * 
         * @constructor
         * @param {Map} map Baidu mapçš„å®žä¾‹å¯¹è±¡
         * @param {Json Object} opts å¯é€‰çš„è¾“å…¥å‚æ•°ï¼Œéžå¿…å¡«é¡¹ã€‚å¯è¾“å…¥é€‰é¡¹åŒ…æ‹¬ï¼š<br />
         * {"<b>isOpen</b>" : {Boolean} æ˜¯å¦å¼€å¯ç»˜åˆ¶æ¨¡å¼
         * <br />"<b>enableDrawingTool</b>" : {Boolean} æ˜¯å¦æ·»åŠ ç»˜åˆ¶å·¥å…·æ æŽ§ä»¶ï¼Œé»˜è®¤ä¸æ·»åŠ 
         * <br />"<b>drawingToolOptions</b>" : {Json Object} å¯é€‰çš„è¾“å…¥å‚æ•°ï¼Œéžå¿…å¡«é¡¹ã€‚å¯è¾“å…¥é€‰é¡¹åŒ…æ‹¬
         * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>anchor</b>" : {ControlAnchor} åœé ä½ç½®ã€é»˜è®¤å·¦ä¸Šè§’
         * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>offset</b>" : {Size} åç§»å€¼ã€‚
         * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>scale</b>" : {Number} å·¥å…·æ çš„ç¼©æ”¾æ¯”ä¾‹,é»˜è®¤ä¸º1
         * <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"<b>drawingModes</b>" : {DrawingType<Array>} å·¥å…·æ ä¸Šå¯ä»¥é€‰æ‹©å‡ºçŽ°çš„ç»˜åˆ¶æ¨¡å¼,å°†éœ€è¦æ˜¾ç¤ºçš„DrawingTypeä»¥æ•°ç»„åž‹å½¢å¼ä¼ å…¥ï¼Œå¦‚[BMAP_DRAWING_MARKER, BMAP_DRAWING_CIRCLE] å°†åªæ˜¾ç¤ºç”»ç‚¹å’Œç”»åœ†çš„é€‰é¡¹
         * <br />"<b>enableCalculate</b>" : {Boolean} ç»˜åˆ¶æ˜¯å¦è¿›è¡Œæµ‹è·(ç”»çº¿æ—¶å€™)ã€æµ‹é¢(ç”»åœ†ã€å¤šè¾¹å½¢ã€çŸ©å½¢)
         * <br />"<b>markerOptions</b>" : {CircleOptions} æ‰€ç”»çš„ç‚¹çš„å¯é€‰å‚æ•°ï¼Œå‚è€ƒapiä¸­çš„<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">å¯¹åº”ç±»</a>
         * <br />"<b>circleOptions</b>" : {CircleOptions} æ‰€ç”»çš„åœ†çš„å¯é€‰å‚æ•°ï¼Œå‚è€ƒapiä¸­çš„<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">å¯¹åº”ç±»</a>
         * <br />"<b>polylineOptions</b>" : {CircleOptions} æ‰€ç”»çš„çº¿çš„å¯é€‰å‚æ•°ï¼Œå‚è€ƒapiä¸­çš„<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">å¯¹åº”ç±»</a>
         * <br />"<b>polygonOptions</b>" : {PolygonOptions} æ‰€ç”»çš„å¤šè¾¹å½¢çš„å¯é€‰å‚æ•°ï¼Œå‚è€ƒapiä¸­çš„<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">å¯¹åº”ç±»</a>
         * <br />"<b>rectangleOptions</b>" : {PolygonOptions} æ‰€ç”»çš„çŸ©å½¢çš„å¯é€‰å‚æ•°ï¼Œå‚è€ƒapiä¸­çš„<a href="http://developer.baidu.com/map/reference/index.php?title=Class:%E6%80%BB%E7%B1%BB/%E8%A6%86%E7%9B%96%E7%89%A9%E7%B1%BB">å¯¹åº”ç±»</a>
         *
         * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b><br />
         * var map = new BMap.Map("container");<br />map.centerAndZoom(new BMap.Point(116.404, 39.915), 15);<br />
         * var myDrawingManagerObject = new BMapLib.DrawingManager(map, {isOpen: true, 
         *     drawingType: BMAP_DRAWING_MARKER, enableDrawingTool: true,
         *     enableCalculate: false,
         *     drawingToolOptions: {
         *         anchor: BMAP_ANCHOR_TOP_LEFT,
         *         offset: new BMap.Size(5, 5),
         *         drawingTypes : [
         *             BMAP_DRAWING_MARKER,
         *             BMAP_DRAWING_CIRCLE,
         *             BMAP_DRAWING_POLYLINE,
         *             BMAP_DRAWING_POLYGON,
         *             BMAP_DRAWING_RECTANGLE 
         *          ]
         *     },
         *     polylineOptions: {
         *         strokeColor: "#333"
         *     });
         */
        BMapLib.DrawingManager = function(map, opts){
            if (!map) {
                return;
            }
            instances.push(this);
            
            opts = opts || {};

            this._initialize(map, opts);
        }

    // é€šè¿‡baidu.langä¸‹çš„inheritsæ–¹æ³•ï¼Œè®©DrawingManagerç»§æ‰¿baidu.lang.Class
    baidu.lang.inherits(DrawingManager, baidu.lang.Class, "DrawingManager");

    /**
     * å¼€å¯åœ°å›¾çš„ç»˜åˆ¶æ¨¡å¼
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b><br />
     * myDrawingManagerObject.open();
     */
    DrawingManager.prototype.open = function() {
        // åˆ¤æ–­ç»˜åˆ¶çŠ¶æ€æ˜¯å¦å·²ç»å¼€å¯
        if (this._isOpen == true){
            return true;
        }
        closeInstanceExcept(this);

        this._open();
    }

    /**
     * å…³é—­åœ°å›¾çš„ç»˜åˆ¶çŠ¶æ€
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b><br />
     * myDrawingManagerObject.close();
     */
    DrawingManager.prototype.close = function() {

        // åˆ¤æ–­ç»˜åˆ¶çŠ¶æ€æ˜¯å¦å·²ç»å¼€å¯
        if (this._isOpen == false){
            return true;
        }
        var me = this;
        this._close();
        setTimeout(function(){
            me._map.enableDoubleClickZoom();
        },2000);
        
    }

    /**
     * è®¾ç½®å½“å‰çš„ç»˜åˆ¶æ¨¡å¼ï¼Œå‚æ•°DrawingTypeï¼Œä¸º5ä¸ªå¯é€‰å¸¸é‡:
     * <br/>BMAP_DRAWING_MARKER    ç”»ç‚¹
     * <br/>BMAP_DRAWING_CIRCLE    ç”»åœ†
     * <br/>BMAP_DRAWING_POLYLINE  ç”»çº¿
     * <br/>BMAP_DRAWING_POLYGON   ç”»å¤šè¾¹å½¢
     * <br/>BMAP_DRAWING_RECTANGLE ç”»çŸ©å½¢
     * @param {DrawingType} DrawingType
     * @return {Boolean} 
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b><br />
     * myDrawingManagerObject.setDrawingMode(BMAP_DRAWING_POLYLINE);
     */
    DrawingManager.prototype.setDrawingMode = function(drawingType) {
        //ä¸Žå½“å‰æ¨¡å¼ä¸ä¸€æ ·æ—¶å€™æ‰è¿›è¡Œé‡æ–°ç»‘å®šäº‹ä»¶
        if (this._drawingType != drawingType) {
            closeInstanceExcept(this);
            this._setDrawingMode(drawingType);
        }
    }

    /**
     * èŽ·å–å½“å‰çš„ç»˜åˆ¶æ¨¡å¼
     * @return {DrawingType} ç»˜åˆ¶çš„æ¨¡å¼
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b><br />
     * alert(myDrawingManagerObject.getDrawingMode());
     */
    DrawingManager.prototype.getDrawingMode = function() {
        return this._drawingType;
    }

    /**
     * æ‰“å¼€è·ç¦»æˆ–é¢ç§¯è®¡ç®—
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b><br />
     * myDrawingManagerObject.enableCalculate();
     */
    DrawingManager.prototype.enableCalculate = function() {
        this._enableCalculate = true;
        this._addGeoUtilsLibrary();
    }

    /**
     * å…³é—­è·ç¦»æˆ–é¢ç§¯è®¡ç®—
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b><br />
     * myDrawingManagerObject.disableCalculate();
     */
    DrawingManager.prototype.disableCalculate = function() {
        this._enableCalculate = false;
    }

    /**
     * é¼ æ ‡ç»˜åˆ¶å®ŒæˆåŽï¼Œæ´¾å‘æ€»äº‹ä»¶çš„æŽ¥å£
     * @name DrawingManager#overlaycomplete
     * @event
     * @param {Event Object} e å›žè°ƒå‡½æ•°ä¼šè¿”å›ževentå‚æ•°ï¼ŒåŒ…æ‹¬ä»¥ä¸‹è¿”å›žå€¼ï¼š
     * <br />{"<b>drawingMode</b> : {DrawingType} å½“å‰çš„ç»˜åˆ¶æ¨¡å¼
     * <br />"<b>overlay</b>ï¼š{Marker||Polyline||Polygon||Circle} å¯¹åº”çš„ç»˜åˆ¶æ¨¡å¼è¿”å›žå¯¹åº”çš„è¦†ç›–ç‰©
     * <br />"<b>calculate</b>ï¼š{Number} éœ€è¦å¼€å¯è®¡ç®—æ¨¡å¼æ‰ä¼šè¿”å›žè¿™ä¸ªå€¼ï¼Œå½“ç»˜åˆ¶çº¿çš„æ—¶å€™è¿”å›žè·ç¦»ã€ç»˜åˆ¶å¤šè¾¹å½¢ã€åœ†ã€çŸ©å½¢æ—¶å€™è¿”å›žé¢ç§¯ï¼Œå•ä½ä¸ºç±³ï¼Œ
     * <br />"<b>label</b>ï¼š{Label} è®¡ç®—é¢ç§¯æ—¶å€™å‡ºçŽ°åœ¨Mapä¸Šçš„Labelå¯¹è±¡
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b>
     * myDrawingManagerObject.addEventListener("overlaycomplete", function(e) {
     *     alert(e.drawingMode);
     *     alert(e.overlay);
     *     alert(e.calculate);
     *     alert(e.label);
     * });
     */

    /**
     * ç»˜åˆ¶ç‚¹å®ŒæˆåŽï¼Œæ´¾å‘çš„äº‹ä»¶æŽ¥å£
     * @name DrawingManager#markercomplete
     * @event
     * @param {Marker} overlay å›žè°ƒå‡½æ•°ä¼šè¿”å›žç›¸åº”çš„è¦†ç›–ç‰©ï¼Œ
     * <br />{"<b>overlay</b> : {Marker} 
     *
     * @example <b>å‚è€ƒç¤ºä¾‹ï¼š</b>
     * myDrawingManagerObject.addEventListener("circlecomplete", function(e, overlay) {
     *     alert(overlay);
     * });
     */

    /**
     * ç»˜åˆ¶åœ†å®ŒæˆåŽï¼Œæ´¾å‘çš„äº‹ä»¶æŽ¥å£
     * @name DrawingManager#circlecomplete
     * @event
     * @param {Circle} overlay å›žè°ƒå‡½æ•°ä¼šè¿”å›žç›¸åº”çš„è¦†ç›–ç‰©ï¼Œ
     * <br />{"<b>overlay</b> : {Circle} 
     */

    /**
     * ç»˜åˆ¶çº¿å®ŒæˆåŽï¼Œæ´¾å‘çš„äº‹ä»¶æŽ¥å£
     * @name DrawingManager#polylinecomplete
     * @event
     * @param {Polyline} overlay å›žè°ƒå‡½æ•°ä¼šè¿”å›žç›¸åº”çš„è¦†ç›–ç‰©ï¼Œ
     * <br />{"<b>overlay</b> : {Polyline} 
     */

    /**
     * ç»˜åˆ¶å¤šè¾¹å½¢å®ŒæˆåŽï¼Œæ´¾å‘çš„äº‹ä»¶æŽ¥å£
     * @name DrawingManager#polygoncomplete
     * @event
     * @param {Polygon} overlay å›žè°ƒå‡½æ•°ä¼šè¿”å›žç›¸åº”çš„è¦†ç›–ç‰©ï¼Œ
     * <br />{"<b>overlay</b> : {Polygon} 
     */

    /**
     * ç»˜åˆ¶çŸ©å½¢å®ŒæˆåŽï¼Œæ´¾å‘çš„äº‹ä»¶æŽ¥å£
     * @name DrawingManager#rectanglecomplete
     * @event
     * @param {Polygon} overlay å›žè°ƒå‡½æ•°ä¼šè¿”å›žç›¸åº”çš„è¦†ç›–ç‰©ï¼Œ
     * <br />{"<b>overlay</b> : {Polygon} 
     */

    /**
     * åˆå§‹åŒ–çŠ¶æ€
     * @param {Map} åœ°å›¾å®žä¾‹
     * @param {Object} å‚æ•°
     */
    DrawingManager.prototype._initialize = function(map, opts) {

        /**
         * mapå¯¹è±¡
         * @private
         * @type {Map}
         */
        this._map = map;

        /**
         * é…ç½®å¯¹è±¡
         * @private
         * @type {Object}
         */
        this._opts = opts;

        /**
         * å½“å‰çš„ç»˜åˆ¶æ¨¡å¼, é»˜è®¤æ˜¯ç»˜åˆ¶ç‚¹
         * @private
         * @type {DrawingType}
         */
        this._drawingType = opts.drawingMode || BMAP_DRAWING_MARKER;

        /**
         * æ˜¯å¦æ·»åŠ æ·»åŠ é¼ æ ‡ç»˜åˆ¶å·¥å…·æ é¢æ¿
         */
        if (opts.enableDrawingTool) {
            var drawingTool  = new DrawingTool(this, opts.drawingToolOptions);
            this._drawingTool = drawingTool;
            map.addControl(drawingTool);
        }

        //æ˜¯å¦è®¡ç®—ç»˜åˆ¶å‡ºçš„é¢ç§¯ 
        if (opts.enableCalculate === true) {
            this.enableCalculate();
        } else {
            this.disableCalculate();
        }

        /**
         * æ˜¯å¦å·²ç»å¼€å¯äº†ç»˜åˆ¶çŠ¶æ€
         * @private
         * @type {Boolean}
         */
        this._isOpen = !!(opts.isOpen === true);
        if (this._isOpen) {
            this._open();
        }

        // added by me
        this._showLabel = !!(opts.showLabel === true);

        this._closeCallback = opts.closeCallback || function() {};

        this.markerOptions    = opts.markerOptions    || {};
        this.circleOptions    = opts.circleOptions    || {};
        this.polylineOptions  = opts.polylineOptions  || {};
        this.polygonOptions   = opts.polygonOptions   || {};
        this.rectangleOptions = opts.rectangleOptions || {};
        this.controlButton =  opts.controlButton == "right" ? "right" : "left";

    },

    /**
     * å¼€å¯åœ°å›¾çš„ç»˜åˆ¶çŠ¶æ€
     * @return {Boolean}ï¼Œå¼€å¯ç»˜åˆ¶çŠ¶æ€æˆåŠŸï¼Œè¿”å›žtrueï¼›å¦åˆ™è¿”å›žfalseã€‚
     */
    DrawingManager.prototype._open = function() {

        this._isOpen = true;

        //æ·»åŠ é®ç½©ï¼Œæ‰€æœ‰é¼ æ ‡æ“ä½œéƒ½åœ¨è¿™ä¸ªé®ç½©ä¸Šå®Œæˆ
        if (!this._mask) {
            this._mask = new Mask();
        }
        this._map.addOverlay(this._mask);
        this._setDrawingMode(this._drawingType);

    }

    /**
     * è®¾ç½®å½“å‰çš„ç»˜åˆ¶æ¨¡å¼
     * @param {DrawingType}
     */
    DrawingManager.prototype._setDrawingMode = function(drawingType) {

        this._drawingType = drawingType;

        /**
         * å¼€å¯ç¼–è¾‘çŠ¶æ€æ—¶å€™æ‰é‡æ–°è¿›è¡Œäº‹ä»¶ç»‘å®š
         */
        if (this._isOpen) {

            //æ¸…ç©ºä¹‹å‰çš„è‡ªå®šä¹‰äº‹ä»¶
            this._mask.__listeners = {};

            switch (drawingType) {
                case BMAP_DRAWING_MARKER:
                    this._bindMarker();
                    break;
                case BMAP_DRAWING_CIRCLE:
                    this._bindCircle();
                    break;
                case BMAP_DRAWING_POLYLINE:
                case BMAP_DRAWING_POLYGON:
                    this._bindPolylineOrPolygon();
                    break;
                case BMAP_DRAWING_RECTANGLE:
                    this._bindRectangle();
                    break;
            }
        }

        /** 
         * å¦‚æžœæ·»åŠ äº†å·¥å…·æ ï¼Œåˆ™ä¹Ÿéœ€è¦æ”¹å˜å·¥å…·æ çš„æ ·å¼
         */
        if (this._drawingTool && this._isOpen) {
            this._drawingTool.setStyleByDrawingMode(drawingType);
        }
    }

    /**
     * å…³é—­åœ°å›¾çš„ç»˜åˆ¶çŠ¶æ€
     * @return {Boolean}ï¼Œå…³é—­ç»˜åˆ¶çŠ¶æ€æˆåŠŸï¼Œè¿”å›žtrueï¼›å¦åˆ™è¿”å›žfalseã€‚
     */
    DrawingManager.prototype._close = function() {

        this._isOpen = false;


        if (this._mask) {
            this._map.removeOverlay(this._mask);
        }

        /** 
         * å¦‚æžœæ·»åŠ äº†å·¥å…·æ ï¼Œåˆ™å…³é—­æ—¶å€™å°†å·¥å…·æ æ ·å¼è®¾ç½®ä¸ºæ‹–æ‹½åœ°å›¾
         */
        if (this._drawingTool) {
            this._drawingTool.setStyleByDrawingMode("hander");
        }
    }

    /**
     * ç»‘å®šé¼ æ ‡ç”»ç‚¹çš„äº‹ä»¶
     */
    DrawingManager.prototype._bindMarker = function() {

        var me   = this,
            map  = this._map,
            mask = this._mask;

        /**
         * é¼ æ ‡ç‚¹å‡»çš„äº‹ä»¶
         */
        var clickAction = function (e) {
            // å¾€åœ°å›¾ä¸Šæ·»åŠ marker
            var marker = new BMap.Marker(e.point, me.markerOptions);
            map.addOverlay(marker);
            me._dispatchOverlayComplete(marker);
        }

        mask.addEventListener('click', clickAction);
    }

    /**
     * ç»‘å®šé¼ æ ‡ç”»åœ†çš„äº‹ä»¶
     */
    DrawingManager.prototype._bindCircle = function() {

        var me           = this,
            map          = this._map,
            mask         = this._mask,
            circle       = null,
            centerPoint  = null; //åœ†çš„ä¸­å¿ƒç‚¹

        /**
         * å¼€å§‹ç»˜åˆ¶åœ†å½¢
         */
        var startAction = function (e) {
            if(me.controlButton == "right" && (e.button == 1 || e.button==0)){
                return ;
            }
            centerPoint = e.point;
            circle = new BMap.Circle(centerPoint, 0, me.circleOptions);
            map.addOverlay(circle);
            mask.enableEdgeMove();
            mask.addEventListener('mousemove', moveAction);
            baidu.on(document, 'mouseup', endAction);
        }

        /**
         * ç»˜åˆ¶åœ†å½¢è¿‡ç¨‹ä¸­ï¼Œé¼ æ ‡ç§»åŠ¨è¿‡ç¨‹çš„äº‹ä»¶
         */
        var moveAction = function(e) {
            circle.setRadius(me._map.getDistance(centerPoint, e.point));
        }

        /**
         * ç»˜åˆ¶åœ†å½¢ç»“æŸ
         */
        var endAction = function (e) {
            var calculate = me._calculate(circle, e.point);
            me._dispatchOverlayComplete(circle, calculate);
            centerPoint = null;
            mask.disableEdgeMove();
            mask.removeEventListener('mousemove', moveAction);
            baidu.un(document, 'mouseup', endAction);
        }

        /**
         * é¼ æ ‡ç‚¹å‡»èµ·å§‹ç‚¹
         */
        var mousedownAction = function (e) {
            baidu.preventDefault(e);
            baidu.stopBubble(e);
            if(me.controlButton == "right" && e.button == 1){
                return ;
            }
            if (centerPoint == null) {
                startAction(e);
            } 
        }

        mask.addEventListener('mousedown', mousedownAction);
    }

    /**
     * ç”»çº¿å’Œç”»å¤šè¾¹å½¢ç›¸ä¼¼æ€§æ¯”è¾ƒå¤§ï¼Œå…¬ç”¨ä¸€ä¸ªæ–¹æ³•
     */
    DrawingManager.prototype._bindPolylineOrPolygon = function() {

        var me           = this,
            map          = this._map,
            mask         = this._mask,
            points       = [],   //ç”¨æˆ·ç»˜åˆ¶çš„ç‚¹
            drawPoint    = null; //å®žé™…éœ€è¦ç”»åœ¨åœ°å›¾ä¸Šçš„ç‚¹
            overlay      = null,
            isBinded     = false;

        /**
         * é¼ æ ‡ç‚¹å‡»çš„äº‹ä»¶
         */
        var startAction = function (e) {
            if(me.controlButton == "right" && (e.button == 1 || e.button==0)){
                return ;
            }
            points.push(e.point);
            drawPoint = points.concat(points[points.length - 1]);
            if (points.length == 1) {
                if (me._drawingType == BMAP_DRAWING_POLYLINE) {

                    overlay = new BMap.Polyline(drawPoint, me.polylineOptions);
                } else if (me._drawingType == BMAP_DRAWING_POLYGON) {
                    overlay = new BMap.Polygon(drawPoint, me.polygonOptions);
                }
                map.addOverlay(overlay);
            } else {
                overlay.setPath(drawPoint);
            }
            if (!isBinded) {
                isBinded = true;
                mask.enableEdgeMove();
                mask.addEventListener('mousemove', mousemoveAction);
                mask.addEventListener('dblclick', dblclickAction);
            }
        }

        /**
         * é¼ æ ‡ç§»åŠ¨è¿‡ç¨‹çš„äº‹ä»¶
         */
        var mousemoveAction = function(e) {
            overlay.setPositionAt(drawPoint.length - 1, e.point);
        }

        /**
         * é¼ æ ‡åŒå‡»çš„äº‹ä»¶
         */
        var dblclickAction = function (e) {
            baidu.stopBubble(e);
            isBinded = false;
            mask.disableEdgeMove();
            mask.removeEventListener('mousedown',startAction);
            mask.removeEventListener('mousemove', mousemoveAction);
            mask.removeEventListener('dblclick', dblclickAction);
            //console.log(me.controlButton);
            if(me.controlButton == "right"){
                points.push(e.point);
            }
            else if(baidu.ie <= 8){
            }else{
                points.pop();
            }
            //console.log(points.length);
            overlay.setPath(points);
            var calculate = me._calculate(overlay, points.pop());
            me._dispatchOverlayComplete(overlay, calculate);
            points.length = 0;
            drawPoint.length = 0;
            me.close();

        }
        
        mask.addEventListener('mousedown', startAction);

        //åŒå‡»æ—¶å€™ä¸æ”¾å¤§åœ°å›¾çº§åˆ«
        mask.addEventListener('dblclick', function(e){
            baidu.stopBubble(e);
        });
    }

    /**
     * ç»‘å®šé¼ æ ‡ç”»çŸ©å½¢çš„äº‹ä»¶
     */
    DrawingManager.prototype._bindRectangle = function() {

        var me           = this,
            map          = this._map,
            mask         = this._mask,
            polygon      = null,
            startPoint   = null;

        /**
         * å¼€å§‹ç»˜åˆ¶çŸ©å½¢
         */
        var startAction = function (e) {
            baidu.stopBubble(e);
            baidu.preventDefault(e);
            if(me.controlButton == "right" && (e.button == 1 || e.button==0)){
                return ;
            }
            startPoint = e.point;
            var endPoint = startPoint;
            polygon = new BMap.Polygon(me._getRectanglePoint(startPoint, endPoint), me.rectangleOptions);
            map.addOverlay(polygon);
            mask.enableEdgeMove();
            mask.addEventListener('mousemove', moveAction);
            baidu.on(document, 'mouseup', endAction);
        }

        /**
         * ç»˜åˆ¶çŸ©å½¢è¿‡ç¨‹ä¸­ï¼Œé¼ æ ‡ç§»åŠ¨è¿‡ç¨‹çš„äº‹ä»¶
         */
        var moveAction = function(e) {
            polygon.setPath(me._getRectanglePoint(startPoint, e.point));
        }

        /**
         * ç»˜åˆ¶çŸ©å½¢ç»“æŸ
         */
        var endAction = function (e) {
            var calculate = me._calculate(polygon, polygon.getPath()[2]);
            me._dispatchOverlayComplete(polygon, calculate);
            startPoint = null;
            mask.disableEdgeMove();
            mask.removeEventListener('mousemove', moveAction);
            baidu.un(document, 'mouseup', endAction);
        }

        mask.addEventListener('mousedown', startAction);
    }

    /**
     * æ·»åŠ æ˜¾ç¤ºæ‰€ç»˜åˆ¶å›¾å½¢çš„é¢ç§¯æˆ–è€…é•¿åº¦
     * @param {overlay} è¦†ç›–ç‰©
     * @param {point} æ˜¾ç¤ºçš„ä½ç½®
     */
    DrawingManager.prototype._calculate = function (overlay, point) {
        var result = {
            data  : 0,    //è®¡ç®—å‡ºæ¥çš„é•¿åº¦æˆ–é¢ç§¯
            label : null  //æ˜¾ç¤ºé•¿åº¦æˆ–é¢ç§¯çš„labelå¯¹è±¡
        };
        if (this._enableCalculate && BMapLib.GeoUtils) {
            var type = overlay.toString();
            //ä¸åŒè¦†ç›–ç‰©è°ƒç”¨ä¸åŒçš„è®¡ç®—æ–¹æ³•
            switch (type) {
                case "[object Polyline]":
                    result.data = BMapLib.GeoUtils.getPolylineDistance(overlay);
                    break;
                case "[object Polygon]":
                    result.data = BMapLib.GeoUtils.getPolygonArea(overlay);
                    break;
                case "[object Circle]":
                    var radius = overlay.getRadius();
                    result.data = Math.PI * radius * radius;
                    break;
            }
            //ä¸€åœºæƒ…å†µå¤„ç†
            if (!result.data || result.data < 0) {
                result.data = 0;
            } else {
                //ä¿ç•™2ä½å°æ•°ä½
                result.data = result.data.toFixed(2);
            }
            // add by me
            if (this._showLabel) {
                result.label = this._addLabel(point, result.data);
            }
        }
        return result;
    }

    /**
     * å¼€å¯æµ‹è·å’Œæµ‹é¢åŠŸèƒ½éœ€è¦ä¾èµ–äºŽGeoUtilsåº“
     * æ‰€ä»¥è¿™é‡Œåˆ¤æ–­ç”¨æˆ·æ˜¯å¦å·²ç»åŠ è½½,è‹¥æœªåŠ è½½åˆ™ç”¨jsåŠ¨æ€åŠ è½½
     */
    DrawingManager.prototype._addGeoUtilsLibrary = function () {
        if (!BMapLib.GeoUtils) {
            var script = document.createElement('script');
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", 'http://api.map.baidu.com/library/GeoUtils/1.2/src/GeoUtils_min.js');
            document.body.appendChild(script);
        }
    }

    /**
     * å‘åœ°å›¾ä¸­æ·»åŠ æ–‡æœ¬æ ‡æ³¨
     * @param {Point}
     * @param {String} æ‰€ä»¥æ˜¾ç¤ºçš„å†…å®¹
     */
    DrawingManager.prototype._addLabel = function (point, content) {
        var label = new BMap.Label(content, {
            position: point
        });
        this._map.addOverlay(label);
        return label;
    }

    /**
     * æ ¹æ®èµ·ç»ˆç‚¹èŽ·å–çŸ©å½¢çš„å››ä¸ªé¡¶ç‚¹
     * @param {Point} èµ·ç‚¹
     * @param {Point} ç»ˆç‚¹
     */
    DrawingManager.prototype._getRectanglePoint = function (startPoint, endPoint) {
        return [
            new BMap.Point(startPoint.lng,startPoint.lat),
            new BMap.Point(endPoint.lng,startPoint.lat),
            new BMap.Point(endPoint.lng,endPoint.lat),
            new BMap.Point(startPoint.lng,endPoint.lat)
        ];
    }

    /**
     * æ´¾å‘äº‹ä»¶
     */
    DrawingManager.prototype._dispatchOverlayComplete = function (overlay, calculate) {
        var options = {
            'overlay'     : overlay,
            'drawingMode' : this._drawingType
        };
        if (calculate) {
            options.calculate = calculate.data || null;
            options.label = calculate.label || null;
        }
        this.dispatchEvent(this._drawingType + 'complete', overlay);
        this.dispatchEvent('overlaycomplete', options);
    }

    /**
     * åˆ›å»ºé®ç½©å¯¹è±¡
     */
    function Mask(){
        /**
         * é¼ æ ‡åˆ°åœ°å›¾è¾¹ç¼˜çš„æ—¶å€™æ˜¯å¦è‡ªåŠ¨å¹³ç§»åœ°å›¾
         */
        this._enableEdgeMove = false;
    }

    Mask.prototype = new BMap.Overlay();

    /**
     * è¿™é‡Œä¸ä½¿ç”¨apiä¸­çš„è‡ªå®šä¹‰äº‹ä»¶ï¼Œæ˜¯ä¸ºäº†æ›´çµæ´»ä½¿ç”¨
     */
    Mask.prototype.dispatchEvent = baidu.lang.Class.prototype.dispatchEvent;
    Mask.prototype.addEventListener = baidu.lang.Class.prototype.addEventListener;
    Mask.prototype.removeEventListener = baidu.lang.Class.prototype.removeEventListener;

    Mask.prototype.initialize = function(map){
        var me = this;
        this._map = map;
        var div = this.container = document.createElement("div");
        var size = this._map.getSize();
        div.style.cssText = "position:absolute;background:url(about:blank);cursor:crosshair;width:" + size.width + "px;height:" + size.height + "px";
        this._map.addEventListener('resize', function(e) {
            me._adjustSize(e.size);
        });
        this._map.getPanes().floatPane.appendChild(div);
        this._bind();
        return div; 
    };

    Mask.prototype.draw = function() {
        var map   = this._map,
            point = map.pixelToPoint(new BMap.Pixel(0, 0)),
            pixel = map.pointToOverlayPixel(point);
        this.container.style.left = pixel.x + "px";
        this.container.style.top  = pixel.y + "px"; 
    };

    /**
     * å¼€å¯é¼ æ ‡åˆ°åœ°å›¾è¾¹ç¼˜ï¼Œè‡ªåŠ¨å¹³ç§»åœ°å›¾
     */
    Mask.prototype.enableEdgeMove = function() {
        this._enableEdgeMove = true;
    }

    /**
     * å…³é—­é¼ æ ‡åˆ°åœ°å›¾è¾¹ç¼˜ï¼Œè‡ªåŠ¨å¹³ç§»åœ°å›¾
     */
    Mask.prototype.disableEdgeMove = function() {
        clearInterval(this._edgeMoveTimer);
        this._enableEdgeMove = false;
    }

    /**
     * ç»‘å®šäº‹ä»¶,æ´¾å‘è‡ªå®šä¹‰äº‹ä»¶
     */
    Mask.prototype._bind = function() {

        var me = this,
            map = this._map,
            container = this.container,
            lastMousedownXY = null,
            lastClickXY = null;

        /**
         * æ ¹æ®eventå¯¹è±¡èŽ·å–é¼ æ ‡çš„xyåæ ‡å¯¹è±¡
         * @param {Event}
         * @return {Object} {x:e.x, y:e.y}
         */
        var getXYbyEvent = function(e){
            return {
                x : e.clientX,
                y : e.clientY
            }
        };

        var domEvent = function(e) {
            var type = e.type;
                e = baidu.getEvent(e);
                point = me.getDrawPoint(e); //å½“å‰é¼ æ ‡æ‰€åœ¨ç‚¹çš„åœ°ç†åæ ‡

            var dispatchEvent = function(type) {
                e.point = point;
                me.dispatchEvent(e);
            }

            if (type == "mousedown") {
                lastMousedownXY = getXYbyEvent(e);
            }

            var nowXY = getXYbyEvent(e);
            //clickç»è¿‡ä¸€äº›ç‰¹æ®Šå¤„ç†æ´¾å‘ï¼Œå…¶ä»–åŒäº‹ä»¶æŒ‰æ­£å¸¸çš„domäº‹ä»¶æ´¾å‘
            if (type == "click") {
                //é¼ æ ‡ç‚¹å‡»è¿‡ç¨‹ä¸è¿›è¡Œç§»åŠ¨æ‰æ´¾å‘clickå’Œdblclick
                if (Math.abs(nowXY.x - lastMousedownXY.x) < 5 && Math.abs(nowXY.y - lastMousedownXY.y) < 5 ) {
                    if (!lastClickXY || !(Math.abs(nowXY.x - lastClickXY.x) < 5 && Math.abs(nowXY.y - lastClickXY.y) < 5)) {
                        dispatchEvent('click');
                        lastClickXY = getXYbyEvent(e);
                    } else {
                        lastClickXY = null;
                    }
                }
            } else {
                dispatchEvent(type);
            }
        }

        /**
         * å°†äº‹ä»¶éƒ½é®ç½©å±‚çš„äº‹ä»¶éƒ½ç»‘å®šåˆ°domEventæ¥å¤„ç†
         */
        var events = ['click', 'mousedown', 'mousemove', 'mouseup', 'dblclick'],
            index = events.length;
        while (index--) {
            baidu.on(container, events[index], domEvent);
        }

        //é¼ æ ‡ç§»åŠ¨è¿‡ç¨‹ä¸­ï¼Œåˆ°åœ°å›¾è¾¹ç¼˜åŽè‡ªåŠ¨å¹³ç§»åœ°å›¾
        baidu.on(container, 'mousemove', function(e) {
            if (me._enableEdgeMove) {
                me.mousemoveAction(e);
            }
        });
    };

    //é¼ æ ‡ç§»åŠ¨è¿‡ç¨‹ä¸­ï¼Œåˆ°åœ°å›¾è¾¹ç¼˜åŽè‡ªåŠ¨å¹³ç§»åœ°å›¾
    Mask.prototype.mousemoveAction = function(e) {
        function getClientPosition(e) {
            var clientX = e.clientX,
                clientY = e.clientY;
            if (e.changedTouches) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            }
            return new BMap.Pixel(clientX, clientY);
        }

        var map       = this._map,
            me        = this,
            pixel     = map.pointToPixel(this.getDrawPoint(e)),
            clientPos = getClientPosition(e),
            offsetX   = clientPos.x - pixel.x,
            offsetY   = clientPos.y - pixel.y;
        pixel = new BMap.Pixel((clientPos.x - offsetX), (clientPos.y - offsetY));
        this._draggingMovePixel = pixel;
        var point = map.pixelToPoint(pixel),
            eventObj = {
                pixel: pixel,
                point: point
            };
        // æ‹–æ‹½åˆ°åœ°å›¾è¾¹ç¼˜ç§»åŠ¨åœ°å›¾
        this._panByX = this._panByY = 0;
        if (pixel.x <= 20 || pixel.x >= map.width - 20
            || pixel.y <= 50 || pixel.y >= map.height - 10) {
            if (pixel.x <= 20) {
                this._panByX = 8;
            } else if (pixel.x >= map.width - 20) {
                this._panByX = -8;
            }
            if (pixel.y <= 50) {
                this._panByY = 8;
            } else if (pixel.y >= map.height - 10) {
                this._panByY = -8;
            }
            if (!this._edgeMoveTimer) {
                this._edgeMoveTimer = setInterval(function(){
                    map.panBy(me._panByX, me._panByY, {"noAnimation": true});
                }, 30);
            }
        } else {
            if (this._edgeMoveTimer) {
                clearInterval(this._edgeMoveTimer);
                this._edgeMoveTimer = null;
            }
        }
    }

    /*
     * è°ƒæ•´å¤§å°
     * @param {Size}
     */
    Mask.prototype._adjustSize = function(size) {
        this.container.style.width  = size.width + 'px';
        this.container.style.height = size.height + 'px';
    };

    /**
     * èŽ·å–å½“å‰ç»˜åˆ¶ç‚¹çš„åœ°ç†åæ ‡
     *
     * @param {Event} e eå¯¹è±¡
     * @return Pointå¯¹è±¡çš„ä½ç½®ä¿¡æ¯
     */
    Mask.prototype.getDrawPoint = function(e) {
        
        var map = this._map,
        trigger = baidu.getTarget(e),
        x = e.offsetX || e.layerX || 0,
        y = e.offsetY || e.layerY || 0;
        if (trigger.nodeType != 1) trigger = trigger.parentNode;
        while (trigger && trigger != map.getContainer()) {
            if (!(trigger.clientWidth == 0 &&
                trigger.clientHeight == 0 &&
                trigger.offsetParent && trigger.offsetParent.nodeName == 'TD')) {
                x += trigger.offsetLeft || 0;
                y += trigger.offsetTop || 0;
            }
            trigger = trigger.offsetParent;
        }
        var pixel = new BMap.Pixel(x, y);
        var point = map.pixelToPoint(pixel);
        return point;

    }

    /**
     * ç»˜åˆ¶å·¥å…·é¢æ¿ï¼Œè‡ªå®šä¹‰æŽ§ä»¶
     */
    function DrawingTool(drawingManager, drawingToolOptions) {
        this.drawingManager = drawingManager;

        drawingToolOptions = this.drawingToolOptions = drawingToolOptions || {};
        // é»˜è®¤åœé ä½ç½®å’Œåç§»é‡
        this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
        this.defaultOffset = new BMap.Size(10, 10);

        //é»˜è®¤æ‰€æœ‰å·¥å…·æ éƒ½æ˜¾ç¤º
        this.defaultDrawingModes = [
            BMAP_DRAWING_MARKER,
            BMAP_DRAWING_CIRCLE,
            BMAP_DRAWING_POLYLINE,
            BMAP_DRAWING_POLYGON,
            BMAP_DRAWING_RECTANGLE
        ];
        //å·¥å…·æ å¯æ˜¾ç¤ºçš„ç»˜åˆ¶æ¨¡å¼
        if (drawingToolOptions.drawingModes) {
            this.drawingModes = drawingToolOptions.drawingModes;
        } else {
            this.drawingModes = this.defaultDrawingModes
        }

        //ç”¨æˆ·è®¾ç½®åœé ä½ç½®å’Œåç§»é‡
        if (drawingToolOptions.anchor) {
            this.setAnchor(drawingToolOptions.anchor);
        }
        if (drawingToolOptions.offset) {
            this.setOffset(drawingToolOptions.offset);
        }
    }

    // é€šè¿‡JavaScriptçš„prototypeå±žæ€§ç»§æ‰¿äºŽBMap.Control
    DrawingTool.prototype = new BMap.Control();

    // è‡ªå®šä¹‰æŽ§ä»¶å¿…é¡»å®žçŽ°è‡ªå·±çš„initializeæ–¹æ³•,å¹¶ä¸”å°†æŽ§ä»¶çš„DOMå…ƒç´ è¿”å›ž
    // åœ¨æœ¬æ–¹æ³•ä¸­åˆ›å»ºä¸ªdivå…ƒç´ ä½œä¸ºæŽ§ä»¶çš„å®¹å™¨,å¹¶å°†å…¶æ·»åŠ åˆ°åœ°å›¾å®¹å™¨ä¸­
    DrawingTool.prototype.initialize = function(map){
        // åˆ›å»ºä¸€ä¸ªDOMå…ƒç´ 
        var container = this.container = document.createElement("div");
        container.className = "BMapLib_Drawing";
        //ç”¨æ¥è®¾ç½®å¤–å±‚è¾¹æ¡†é˜´å½±
        var panel = this.panel = document.createElement("div");
        panel.className = "BMapLib_Drawing_panel";
        if (this.drawingToolOptions && this.drawingToolOptions.scale) {
            this._setScale(this.drawingToolOptions.scale);
        }
        container.appendChild(panel);
        // æ·»åŠ å†…å®¹
        panel.innerHTML = this._generalHtml();
        //ç»‘å®šäº‹ä»¶
        this._bind(panel);
        // æ·»åŠ DOMå…ƒç´ åˆ°åœ°å›¾ä¸­
        map.getContainer().appendChild(container);
        // å°†DOMå…ƒç´ è¿”å›ž
        return container;
    }

    //ç”Ÿæˆå·¥å…·æ çš„htmlå…ƒç´ 
    DrawingTool.prototype._generalHtml = function(map){

        //é¼ æ ‡ç»è¿‡å·¥å…·æ ä¸Šçš„æç¤ºä¿¡æ¯
        var tips = {};
        tips["hander"]               = "æ‹–åŠ¨åœ°å›¾";
        tips[BMAP_DRAWING_MARKER]    = "ç”»ç‚¹";
        tips[BMAP_DRAWING_CIRCLE]    = "ç”»åœ†";
        tips[BMAP_DRAWING_POLYLINE]  = "ç”»æŠ˜çº¿";
        tips[BMAP_DRAWING_POLYGON]   = "ç”»å¤šè¾¹å½¢";
        tips[BMAP_DRAWING_RECTANGLE] = "ç”»çŸ©å½¢";

        var getItem = function(className, drawingType) {
            return '<a class="' + className + '" drawingType="' + drawingType + '" href="javascript:void(0)" title="' + tips[drawingType] + '" onfocus="this.blur()"></a>';
        }

        var html = [];
        html.push(getItem("BMapLib_box BMapLib_hander", "hander"));
        for (var i = 0, len = this.drawingModes.length; i < len; i++) {
            var classStr = 'BMapLib_box BMapLib_' + this.drawingModes[i];
            if (i == len-1) {
                classStr += ' BMapLib_last';
            }
            html.push(getItem(classStr, this.drawingModes[i]));
        }
        return html.join('');
    }

    /**
     * è®¾ç½®å·¥å…·æ çš„ç¼©æ”¾æ¯”ä¾‹
     */
    DrawingTool.prototype._setScale = function(scale){
        var width  = 390,
            height = 50,
            ml = -parseInt((width - width * scale) / 2, 10),
            mt = -parseInt((height - height * scale) / 2, 10);
        this.container.style.cssText = [
            "-moz-transform: scale(" + scale + ");",
            "-o-transform: scale(" + scale + ");",
            "-webkit-transform: scale(" + scale + ");",
            "transform: scale(" + scale + ");",
            "margin-left:" + ml + "px;",
            "margin-top:" + mt + "px;",
            "*margin-left:0px;", //ie6ã€7
            "*margin-top:0px;",  //ie6ã€7
            "margin-left:0px\\0;", //ie8
            "margin-top:0px\\0;",  //ie8
            //ieä¸‹ä½¿ç”¨æ»¤é•œ
            "filter: progid:DXImageTransform.Microsoft.Matrix(",
            "M11=" + scale + ",",
            "M12=0,",
            "M21=0,",
            "M22=" + scale + ",",
            "SizingMethod='auto expand');"
        ].join('');
    }

    //ç»‘å®šå·¥å…·æ çš„äº‹ä»¶
    DrawingTool.prototype._bind = function(panel){
        var me = this;
        baidu.on(this.panel, 'click', function (e) {
            var target = baidu.getTarget(e);
            var drawingType = target.getAttribute('drawingType');
            me.setStyleByDrawingMode(drawingType);
            me._bindEventByDraingMode(drawingType);
        });
    }

    //è®¾ç½®å·¥å…·æ å½“å‰é€‰ä¸­çš„é¡¹æ ·å¼
    DrawingTool.prototype.setStyleByDrawingMode = function(drawingType){
        if (!drawingType) {
            return;
        }
        var boxs = this.panel.getElementsByTagName("a");
        for (var i = 0, len = boxs.length; i < len; i++) {
            var box = boxs[i];
            if (box.getAttribute('drawingType') == drawingType) {
                var classStr = "BMapLib_box BMapLib_" + drawingType + "_hover";
                if (i == len - 1) {
                    classStr += " BMapLib_last";
                }
                box.className = classStr;
            } else {
                box.className = box.className.replace(/_hover/, "");
            }
        }
    }

    //è®¾ç½®å·¥å…·æ å½“å‰é€‰ä¸­çš„é¡¹æ ·å¼
    DrawingTool.prototype._bindEventByDraingMode = function(drawingType){
        var me = this;
        var drawingManager = this.drawingManager;
        //ç‚¹åœ¨æ‹–æ‹½åœ°å›¾çš„æŒ‰é’®ä¸Š
        if (drawingType == "hander") {
            drawingManager.close();
            drawingManager._map.enableDoubleClickZoom();
        } else {
            if(drawingManager._isOpen) {
                drawingManager.close();
                drawingManager._closeCallback();
                drawingManager._map.enableDoubleClickZoom();
            } else {
                drawingManager.setDrawingMode(drawingType);
                drawingManager.open();
                drawingManager._map.disableDoubleClickZoom();                
            }
        }
    }

    //ç”¨æ¥å­˜å‚¨ç”¨æˆ·å®žä¾‹åŒ–å‡ºæ¥çš„drawingmanagerå¯¹è±¡
    var instances = [];

    /*
     * å…³é—­å…¶ä»–å®žä¾‹çš„ç»˜åˆ¶æ¨¡å¼
     * @param {DrawingManager} å½“å‰çš„å®žä¾‹
     */
    function closeInstanceExcept(instance) {
        var index = instances.length;
        while (index--) {
            if (instances[index] != instance) {
                instances[index].close();
            }
        }
    }

})();