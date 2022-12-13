window.MagicZoom = (function () {
   var y, z;
   y = z = (function () {
       var V = {
           version: "v3.3.7",
           UUID: 0,
           storage: {},
           $uuid: function (Z) {
               return (Z.$J_UUID || (Z.$J_UUID = ++P.UUID))
           },
           getStorage: function (Z) {
               return (P.storage[Z] || (P.storage[Z] = {}))
           },
           $F: function () {},
           $false: function () {
               return false
           },
           $true: function () {
               return true
           },
           stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
           defined: function (Z) {
               return (Z != null)
           },
           ifndef: function (aa, Z) {
               return (aa != null) ? aa : Z
           },
           exists: function (Z) {
               return !!(Z)
           },
           jTypeOf: function (ab) {
               var Z = 9007199254740991;
               function aa(ac) {
                   return typeof ac === "number" && ac > -1 && ac % 1 === 0 && ac <= Z
               }
               if (!P.defined(ab)) {
                   return false
               }
               if (ab.$J_TYPE) {
                   return ab.$J_TYPE
               }
               if (!!ab.nodeType) {
                   if (ab.nodeType === 1) {
                       return "element"
                   }
                   if (ab.nodeType === 3) {
                       return "textnode"
                   }
               }
               if (ab === window) {
                   return "window"
               }
               if (ab === document) {
                   return "document"
               }
               if (ab instanceof window.Function) {
                   return "function"
               }
               if (ab instanceof window.String) {
                   return "string"
               }
               if (ab instanceof window.Array) {
                   return "array"
               }
               if (ab instanceof window.Date) {
                   return "date"
               }
               if (ab instanceof window.RegExp) {
                   return "regexp"
               }
               if (aa(ab.length) && ab.item) {
                   return "collection"
               }
               if (aa(ab.length) && ab.callee) {
                   return "arguments"
               }
               if ((ab instanceof window.Object || ab instanceof window.Function) && ab.constructor === P.Class) {
                   return "class"
               }
               if (P.browser.trident) {
                   if (P.defined(ab.cancelBubble)) {
                       return "event"
                   }
               } else {
                   if (ab === window.event || ab.constructor === window.Event || ab.constructor === window.MouseEvent || ab.constructor === window.UIEvent || ab.constructor === window.KeyboardEvent || ab.constructor === window.KeyEvent) {
                       return "event"
                   }
               }
               return typeof (ab)
           },
           extend: function (ae, ad) {
               if (!(ae instanceof window.Array)) {
                   ae = [ae]
               }
               if (!ad) {
                   return ae[0]
               }
               for (var ac = 0, aa = ae.length; ac < aa; ac++) {
                   if (!P.defined(ae)) {
                       continue
                   }
                   for (var ab in ad) {
                       if (!Object.prototype.hasOwnProperty.call(ad, ab)) {
                           continue
                       }
                       try {
                           ae[ac][ab] = ad[ab]
                       } catch (Z) {}
                   }
               }
               return ae[0]
           },
           implement: function (ad, ac) {
               if (!(ad instanceof window.Array)) {
                   ad = [ad]
               }
               for (var ab = 0, Z = ad.length; ab < Z; ab++) {
                   if (!P.defined(ad[ab])) {
                       continue
                   }
                   if (!ad[ab].prototype) {
                       continue
                   }
                   for (var aa in (ac || {})) {
                       if (!ad[ab].prototype[aa]) {
                           ad[ab].prototype[aa] = ac[aa]
                       }
                   }
               }
               return ad[0]
           },
           nativize: function (ab, aa) {
               if (!P.defined(ab)) {
                   return ab
               }
               for (var Z in (aa || {})) {
                   if (!ab[Z]) {
                       ab[Z] = aa[Z]
                   }
               }
               return ab
           },
           $try: function () {
               for (var aa = 0, Z = arguments.length; aa < Z; aa++) {
                   try {
                       return arguments[aa]()
                   } catch (ab) {}
               }
               return null
           },
           $A: function (ab) {
               if (!P.defined(ab)) {
                   return P.$([])
               }
               if (ab.toArray) {
                   return P.$(ab.toArray())
               }
               if (ab.item) {
                   var aa = ab.length || 0,
                       Z = new Array(aa);
                   while (aa--) {
                       Z[aa] = ab[aa]
                   }
                   return P.$(Z)
               }
               return P.$(Array.prototype.slice.call(ab))
           },
           now: function () {
               return new Date().getTime()
           },
           detach: function (ad) {
               var ab;
               switch (P.jTypeOf(ad)) {
               case "object":
                   ab = {};
                   for (var ac in ad) {
                       ab[ac] = P.detach(ad[ac])
                   }
                   break;
               case "array":
                   ab = [];
                   for (var aa = 0, Z = ad.length; aa < Z; aa++) {
                       ab[aa] = P.detach(ad[aa])
                   }
                   break;
               default:
                   return ad
               }
               return P.$(ab)
           },
           $: function (ab) {
               var Z = true;
               if (!P.defined(ab)) {
                   return null
               }
               if (ab.$J_EXT) {
                   return ab
               }
               switch (P.jTypeOf(ab)) {
               case "array":
                   ab = P.nativize(ab, P.extend(P.Array, {
                       $J_EXT: P.$F
                   }));
                   ab.jEach = ab.forEach;
                   ab.contains = P.Array.contains;
                   return ab;
                   break;
               case "string":
                   var aa = document.getElementById(ab);
                   if (P.defined(aa)) {
                       return P.$(aa)
                   }
                   return null;
                   break;
               case "window":
               case "document":
                   P.$uuid(ab);
                   ab = P.extend(ab, P.Doc);
                   break;
               case "element":
                   P.$uuid(ab);
                   ab = P.extend(ab, P.Element);
                   break;
               case "event":
                   ab = P.extend(ab, P.Event);
                   break;
               case "textnode":
               case "function":
               case "date":
               default:
                   Z = false;
                   break
               }
               if (Z) {
                   return P.extend(ab, {
                       $J_EXT: P.$F
                   })
               } else {
                   return ab
               }
           },
           $new: function (Z, ab, aa) {
               return P.$(P.doc.createElement(Z)).setProps(ab || {}).jSetCss(aa || {})
           },
           addCSS: function (ac, ad, aa) {
               var Z, af, ab, ah = [],
                   ag = -1;
               aa || (aa = P.stylesId);
               Z = P.$(aa) || P.$new("style", {
                   id: aa,
                   type: "text/css"
               }).jAppendTo((document.head || document.body), "top");
               af = Z.sheet || Z.styleSheet;
               if (P.jTypeOf(ad) !== "string") {
                   for (var ab in ad) {
                       ah.push(ab + ":" + ad[ab])
                   }
                   ad = ah.join(";")
               }
               if (af.insertRule) {
                   ag = af.insertRule(ac + " {" + ad + "}", af.cssRules.length)
               } else {
                   try {
                       ag = af.addRule(ac, ad, af.rules.length)
                   } catch (ae) {}
               }
               return ag
           },
           removeCSS: function (ac, Z) {
               var ab, aa;
               ab = P.$(ac);
               if (P.jTypeOf(ab) !== "element") {
                   return
               }
               aa = ab.sheet || ab.styleSheet;
               if (aa.deleteRule) {
                   aa.deleteRule(Z)
               } else {
                   if (aa.removeRule) {
                       aa.removeRule(Z)
                   }
               }
           },
           generateUUID: function () {
               return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (ab) {
                   var aa = Math.random() * 16 | 0,
                       Z = ab === "x" ? aa : (aa & 3 | 8);
                   return Z.toString(16)
               }).toUpperCase()
           },
           getAbsoluteURL: (function () {
               var Z;
               return function (aa) {
                   if (!Z) {
                       Z = document.createElement("a")
                   }
                   Z.setAttribute("href", aa);
                   return ("!!" + Z.href).replace("!!", "")
               }
           })(),
           getHashCode: function (ab) {
               var ac = 0,
                   Z = ab.length;
               for (var aa = 0; aa < Z; ++aa) {
                   ac = 31 * ac + ab.charCodeAt(aa);
                   ac %= 4294967296
               }
               return ac
           }
       };
       var P = V;
       var Q = V.$;
       if (!window.magicJS) {
           window.magicJS = V;
           window.$mjs = V.$
       }
       P.Array = {
           $J_TYPE: "array",
           indexOf: function (ac, ad) {
               var Z = this.length;
               for (var aa = this.length, ab = (ad < 0) ? Math.max(0, aa + ad) : ad || 0; ab < aa; ab++) {
                   if (this[ab] === ac) {
                       return ab
                   }
               }
               return -1
           },
           contains: function (Z, aa) {
               return this.indexOf(Z, aa) != -1
           },
           forEach: function (Z, ac) {
               for (var ab = 0, aa = this.length; ab < aa; ab++) {
                   if (ab in this) {
                       Z.call(ac, this[ab], ab, this)
                   }
               }
           },
           filter: function (Z, ae) {
               var ad = [];
               for (var ac = 0, aa = this.length; ac < aa; ac++) {
                   if (ac in this) {
                       var ab = this[ac];
                       if (Z.call(ae, this[ac], ac, this)) {
                           ad.push(ab)
                       }
                   }
               }
               return ad
           },
           map: function (Z, ad) {
               var ac = [];
               for (var ab = 0, aa = this.length; ab < aa; ab++) {
                   if (ab in this) {
                       ac[ab] = Z.call(ad, this[ab], ab, this)
                   }
               }
               return ac
           }
       };
       P.implement(String, {
           $J_TYPE: "string",
           jTrim: function () {
               return this.replace(/^\s+|\s+$/g, "")
           },
           eq: function (Z, aa) {
               return (aa || false) ? (this.toString() === Z.toString()) : (this.toLowerCase().toString() === Z.toLowerCase().toString())
           },
           jCamelize: function () {
               return this.replace(/-\D/g, function (Z) {
                   return Z.charAt(1).toUpperCase()
               })
           },
           dashize: function () {
               return this.replace(/[A-Z]/g, function (Z) {
                   return ("-" + Z.charAt(0).toLowerCase())
               })
           },
           jToInt: function (Z) {
               return parseInt(this, Z || 10)
           },
           toFloat: function () {
               return parseFloat(this)
           },
           jToBool: function () {
               return !this.replace(/true/i, "").jTrim()
           },
           has: function (aa, Z) {
               Z = Z || "";
               return (Z + this + Z).indexOf(Z + aa + Z) > -1
           }
       });
       V.implement(Function, {
           $J_TYPE: "function",
           jBind: function () {
               var aa = P.$A(arguments),
                   Z = this,
                   ab = aa.shift();
               return function () {
                   return Z.apply(ab || null, aa.concat(P.$A(arguments)))
               }
           },
           jBindAsEvent: function () {
               var aa = P.$A(arguments),
                   Z = this,
                   ab = aa.shift();
               return function (ac) {
                   return Z.apply(ab || null, P.$([ac || (P.browser.ieMode ? window.event : null)]).concat(aa))
               }
           },
           jDelay: function () {
               var aa = P.$A(arguments),
                   Z = this,
                   ab = aa.shift();
               return window.setTimeout(function () {
                   return Z.apply(Z, aa)
               }, ab || 0)
           },
           jDefer: function () {
               var aa = P.$A(arguments),
                   Z = this;
               return function () {
                   return Z.jDelay.apply(Z, aa)
               }
           },
           interval: function () {
               var aa = P.$A(arguments),
                   Z = this,
                   ab = aa.shift();
               return window.setInterval(function () {
                   return Z.apply(Z, aa)
               }, ab || 0)
           }
       });
       var W = {};
       var O = navigator.userAgent.toLowerCase();
       var N = O.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);
       var S = O.match(/(edge|opr)\/(\d+\.?\d*)/i) || O.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);
       var U = O.match(/version\/(\d+\.?\d*)/i);
       var J = document.documentElement.style;
       function K(aa) {
           var Z = aa.charAt(0).toUpperCase() + aa.slice(1);
           return aa in J || ("Webkit" + Z) in J || ("Moz" + Z) in J || ("ms" + Z) in J || ("O" + Z) in J
       }
       P.browser = {
           features: {
               xpath: !!(document.evaluate),
               air: !!(window.runtime),
               query: !!(document.querySelector),
               fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
               xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
               transition: K("transition"),
               transform: K("transform"),
               perspective: K("perspective"),
               animation: K("animation"),
               requestAnimationFrame: false,
               multibackground: false,
               cssFilters: false,
               canvas: false,
               svg: (function () {
                   return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
               }())
           },
           touchScreen: (function () {
               return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
           }()),
           mobile: !!O.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),
           engine: (N && N[1]) ? N[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (document.getBoxObjectFor !== undefined || window.mozInnerScreenY !== null) ? "gecko" : (window.WebKitPoint !== null || !navigator.taintEnabled) ? "webkit" : "unknown",
           version: (N && N[2]) ? parseFloat(N[2]) : 0,
           uaName: (S && S[1]) ? S[1].toLowerCase() : "",
           uaVersion: (S && S[2]) ? parseFloat(S[2]) : 0,
           cssPrefix: "",
           cssDomPrefix: "",
           domPrefix: "",
           ieMode: 0,
           platform: O.match(/ip(?:ad|od|hone)/) ? "ios" : (O.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
           backCompat: document.compatMode && document.compatMode.toLowerCase() === "backcompat",
           scrollbarsWidth: 0,
           getDoc: function () {
               return (document.compatMode && document.compatMode.toLowerCase() === "backcompat") ? document.body : document.documentElement
           },
           requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
           cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
           ready: false,
           onready: function () {
               if (P.browser.ready) {
                   return
               }
               var ac;
               var ab;
               P.browser.ready = true;
               P.body = P.$(document.body);
               P.win = P.$(window);
               try {
                   var aa = P.$new("div").jSetCss({
                       width: 100,
                       height: 100,
                       overflow: "scroll",
                       position: "absolute",
                       top: -9999
                   }).jAppendTo(document.body);
                   P.browser.scrollbarsWidth = aa.offsetWidth - aa.clientWidth;
                   aa.jRemove()
               } catch (Z) {}
               try {
                   ac = P.$new("div");
                   ab = ac.style;
                   ab.cssText = "background:url(https://),url(https://),red url(https://)";
                   P.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(ab.background);
                   ab = null;
                   ac = null
               } catch (Z) {}
               if (!P.browser.cssTransformProp) {
                   P.browser.cssTransformProp = P.normalizeCSS("transform").dashize()
               }
               try {
                   ac = P.$new("div");
                   ac.style.cssText = P.normalizeCSS("filter").dashize() + ":blur(2px);";
                   P.browser.features.cssFilters = !!ac.style.length && (!P.browser.ieMode || P.browser.ieMode > 9);
                   ac = null
               } catch (Z) {}
               if (!P.browser.features.cssFilters) {
                   P.$(document.documentElement).jAddClass("no-cssfilters-magic")
               }
               try {
                   P.browser.features.canvas = (function () {
                       var ad = P.$new("canvas");
                       return !!(ad.getContext && ad.getContext("2d"))
                   }())
               } catch (Z) {}
               if (window.TransitionEvent === undefined && window.WebKitTransitionEvent !== undefined) {
                   W.transitionend = "webkitTransitionEnd"
               }
               P.Doc.jCallEvent.call(P.$(document), "domready")
           }
       };
       (function () {
           var aa = [],
               ad, ac, ae;
           function Z() {
               return !!(arguments.callee.caller)
           }
           switch (P.browser.engine) {
           case "trident":
               if (!P.browser.version) {
                   P.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
               }
               break;
           case "gecko":
               P.browser.version = (S && S[2]) ? parseFloat(S[2]) : 0;
               break
           }
           P.browser[P.browser.engine] = true;
           if (S && S[1] === "crios") {
               P.browser.uaName = "chrome"
           }
           if (!!window.chrome) {
               P.browser.chrome = true
           }
           if (S && S[1] === "opr") {
               P.browser.uaName = "opera";
               P.browser.opera = true
           }
           if (P.browser.uaName === "safari" && (U && U[1])) {
               P.browser.uaVersion = parseFloat(U[1])
           }
           if (P.browser.platform === "android" && P.browser.webkit && (U && U[1])) {
               P.browser.androidBrowser = true
           }
           ad = ({
               gecko: ["-moz-", "Moz", "moz"],
               webkit: ["-webkit-", "Webkit", "webkit"],
               trident: ["-ms-", "ms", "ms"],
               presto: ["-o-", "O", "o"]
           })[P.browser.engine] || ["", "", ""];
           P.browser.cssPrefix = ad[0];
           P.browser.cssDomPrefix = ad[1];
           P.browser.domPrefix = ad[2];
           P.browser.ieMode = !P.browser.trident ? undefined : (document.documentMode) ? document.documentMode : (function () {
               var af = 0;
               if (P.browser.backCompat) {
                   return 5
               }
               switch (P.browser.version) {
               case 2:
                   af = 6;
                   break;
               case 3:
                   af = 7;
                   break
               }
               return af
           }());
           if (!P.browser.mobile && P.browser.platform === "mac" && P.browser.touchScreen) {
               P.browser.mobile = true;
               P.browser.platform = "ios"
           }
           aa.push(P.browser.platform + "-magic");
           if (P.browser.mobile) {
               aa.push("mobile-magic")
           }
           if (P.browser.androidBrowser) {
               aa.push("android-browser-magic")
           }
           if (P.browser.ieMode) {
               P.browser.uaName = "ie";
               P.browser.uaVersion = P.browser.ieMode;
               aa.push("ie" + P.browser.ieMode + "-magic");
               for (ac = 11; ac > P.browser.ieMode; ac--) {
                   aa.push("lt-ie" + ac + "-magic")
               }
           }
           if (P.browser.webkit && P.browser.version < 536) {
               P.browser.features.fullScreen = false
           }
           if (P.browser.requestAnimationFrame) {
               P.browser.requestAnimationFrame.call(window, function () {
                   P.browser.features.requestAnimationFrame = true
               })
           }
           if (P.browser.features.svg) {
               aa.push("svg-magic")
           } else {
               aa.push("no-svg-magic")
           }
           ae = (document.documentElement.className || "").match(/\S+/g) || [];
           document.documentElement.className = P.$(ae).concat(aa).join(" ");
           try {
               document.documentElement.setAttribute("data-magic-ua", P.browser.uaName);
               document.documentElement.setAttribute("data-magic-ua-ver", P.browser.uaVersion);
               document.documentElement.setAttribute("data-magic-engine", P.browser.engine);
               document.documentElement.setAttribute("data-magic-engine-ver", P.browser.version)
           } catch (ab) {}
           if (P.browser.ieMode && P.browser.ieMode < 9) {
               document.createElement("figure");
               document.createElement("figcaption")
           }
           if (!window.navigator.pointerEnabled) {
               P.$(["Down", "Up", "Move", "Over", "Out"]).jEach(function (af) {
                   W["pointer" + af.toLowerCase()] = window.navigator.msPointerEnabled ? "MSPointer" + af : -1
               })
           }
       }());
       (function () {
           P.browser.fullScreen = {
               capable: P.browser.features.fullScreen,
               enabled: function () {
                   return !!(document.fullscreenElement || document[P.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[P.browser.domPrefix + "FullScreen"])
               },
               request: function (Z, aa) {
                   if (!aa) {
                       aa = {}
                   }
                   if (this.capable) {
                       P.$(document).jAddEvent(this.changeEventName, this.onchange = function (ab) {
                           if (this.enabled()) {
                               if (aa.onEnter) {
                                   aa.onEnter()
                               }
                           } else {
                               P.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                               if (aa.onExit) {
                                   aa.onExit()
                               }
                           }
                       }.jBindAsEvent(this));
                       P.$(document).jAddEvent(this.errorEventName, this.onerror = function (ab) {
                           if (aa.fallback) {
                               aa.fallback()
                           }
                           P.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                       }.jBindAsEvent(this));
                       (Z.requestFullscreen || Z[P.browser.domPrefix + "RequestFullscreen"] || Z[P.browser.domPrefix + "RequestFullScreen"] || function () {}).call(Z)
                   } else {
                       if (aa.fallback) {
                           aa.fallback()
                       }
                   }
               },
               cancel: (document.exitFullscreen || document.cancelFullScreen || document[P.browser.domPrefix + "ExitFullscreen"] || document[P.browser.domPrefix + "CancelFullScreen"] || function () {}).jBind(document),
               changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : P.browser.domPrefix) + "fullscreenchange",
               errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : P.browser.domPrefix) + "fullscreenerror",
               prefix: P.browser.domPrefix,
               activeElement: null
           }
       }());
       var Y = /\S+/g,
           M = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
           R = {
               "float": ("undefined" === typeof (J.styleFloat)) ? "cssFloat" : "styleFloat"
           },
           T = {
               fontWeight: true,
               lineHeight: true,
               opacity: true,
               zIndex: true,
               zoom: true
           },
           L = (window.getComputedStyle) ? function (ab, Z) {
               var aa = window.getComputedStyle(ab, null);
               return aa ? aa.getPropertyValue(Z) || aa[Z] : null
           } : function (ac, aa) {
               var ab = ac.currentStyle,
                   Z = null;
               Z = ab ? ab[aa] : null;
               if (null == Z && ac.style && ac.style[aa]) {
                   Z = ac.style[aa]
               }
               return Z
           };
       function X(ab) {
           var Z, aa;
           aa = (P.browser.webkit && "filter" == ab) ? false : (ab in J);
           if (!aa) {
               Z = P.browser.cssDomPrefix + ab.charAt(0).toUpperCase() + ab.slice(1);
               if (Z in J) {
                   return Z
               }
           }
           return ab
       }
       P.normalizeCSS = X;
       P.Element = {
           jHasClass: function (Z) {
               return !(Z || "").has(" ") && (this.className || "").has(Z, " ")
           },
           jAddClass: function (ad) {
               var aa = (this.className || "").match(Y) || [],
                   ac = (ad || "").match(Y) || [],
                   Z = ac.length,
                   ab = 0;
               for (; ab < Z; ab++) {
                   if (!P.$(aa).contains(ac[ab])) {
                       aa.push(ac[ab])
                   }
               }
               this.className = aa.join(" ");
               return this
           },
           jRemoveClass: function (ae) {
               var aa = (this.className || "").match(Y) || [],
                   ad = (ae || "").match(Y) || [],
                   Z = ad.length,
                   ac = 0,
                   ab;
               for (; ac < Z; ac++) {
                   if ((ab = P.$(aa).indexOf(ad[ac])) > -1) {
                       aa.splice(ab, 1)
                   }
               }
               this.className = ae ? aa.join(" ") : "";
               return this
           },
           jToggleClass: function (Z) {
               return this.jHasClass(Z) ? this.jRemoveClass(Z) : this.jAddClass(Z)
           },
           jGetCss: function (aa) {
               var ab = aa.jCamelize(),
                   Z = null;
               aa = R[ab] || (R[ab] = X(ab));
               Z = L(this, aa);
               if ("auto" === Z) {
                   Z = null
               }
               if (null !== Z) {
                   if ("opacity" == aa) {
                       return P.defined(Z) ? parseFloat(Z) : 1
                   }
                   if (M.test(aa)) {
                       Z = parseInt(Z, 10) ? Z : "0px"
                   }
               }
               return Z
           },
           jSetCssProp: function (aa, Z) {
               var ac = aa.jCamelize();
               try {
                   if ("opacity" == aa) {
                       this.jSetOpacity(Z);
                       return this
                   }
                   aa = R[ac] || (R[ac] = X(ac));
                   this.style[aa] = Z + (("number" == P.jTypeOf(Z) && !T[ac]) ? "px" : "")
               } catch (ab) {}
               return this
           },
           jSetCss: function (aa) {
               for (var Z in aa) {
                   this.jSetCssProp(Z, aa[Z])
               }
               return this
           },
           jGetStyles: function () {
               var Z = {};
               P.$A(arguments).jEach(function (aa) {
                   Z[aa] = this.jGetCss(aa)
               }, this);
               return Z
           },
           jSetOpacity: function (ab, Z) {
               var aa;
               Z = Z || false;
               this.style.opacity = ab;
               ab = parseInt(parseFloat(ab) * 100);
               if (Z) {
                   if (0 === ab) {
                       if ("hidden" != this.style.visibility) {
                           this.style.visibility = "hidden"
                       }
                   } else {
                       if ("visible" != this.style.visibility) {
                           this.style.visibility = "visible"
                       }
                   }
               }
               if (P.browser.ieMode && P.browser.ieMode < 9) {
                   if (!isNaN(ab)) {
                       if (!~this.style.filter.indexOf("Alpha")) {
                           this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + ab + ")"
                       } else {
                           this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + ab)
                       }
                   } else {
                       this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                       if ("" === this.style.filter) {
                           this.style.removeAttribute("filter")
                       }
                   }
               }
               return this
           },
           setProps: function (Z) {
               for (var aa in Z) {
                   if ("class" === aa) {
                       this.jAddClass("" + Z[aa])
                   } else {
                       this.setAttribute(aa, "" + Z[aa])
                   }
               }
               return this
           },
           jGetTransitionDuration: function () {
               var aa = 0,
                   Z = 0;
               aa = this.jGetCss("transition-duration");
               Z = this.jGetCss("transition-delay");
               aa = aa.indexOf("ms") > -1 ? parseFloat(aa) : aa.indexOf("s") > -1 ? parseFloat(aa) * 1000 : 0;
               Z = Z.indexOf("ms") > -1 ? parseFloat(Z) : Z.indexOf("s") > -1 ? parseFloat(Z) * 1000 : 0;
               return aa + Z
           },
           hide: function () {
               return this.jSetCss({
                   display: "none",
                   visibility: "hidden"
               })
           },
           show: function () {
               return this.jSetCss({
                   display: "",
                   visibility: "visible"
               })
           },
           jGetSize: function () {
               return {
                   width: this.offsetWidth,
                   height: this.offsetHeight
               }
           },
           getInnerSize: function (aa) {
               var Z = this.jGetSize();
               Z.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
               Z.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
               if (!aa) {
                   Z.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                   Z.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
               }
               return Z
           },
           jGetScroll: function () {
               return {
                   top: this.scrollTop,
                   left: this.scrollLeft
               }
           },
           jGetFullScroll: function () {
               var Z = this,
                   aa = {
                       top: 0,
                       left: 0
                   };
               do {
                   aa.left += Z.scrollLeft || 0;
                   aa.top += Z.scrollTop || 0;
                   Z = Z.parentNode
               } while (Z);
               return aa
           },
           jGetPosition: function () {
               var ad = this,
                   aa = 0,
                   ac = 0;
               if (P.defined(document.documentElement.getBoundingClientRect)) {
                   var Z = this.getBoundingClientRect(),
                       ab = P.$(document).jGetScroll(),
                       ae = P.browser.getDoc();
                   return {
                       top: Z.top + ab.y - ae.clientTop,
                       left: Z.left + ab.x - ae.clientLeft
                   }
               }
               do {
                   aa += ad.offsetLeft || 0;
                   ac += ad.offsetTop || 0;
                   ad = ad.offsetParent
               } while (ad && !(/^(?:body|html)$/i).test(ad.tagName));
               return {
                   top: ac,
                   left: aa
               }
           },
           jGetOffset: function () {
               var Z = this;
               var ab = 0;
               var aa = 0;
               do {
                   ab += Z.offsetLeft || 0;
                   aa += Z.offsetTop || 0;
                   Z = Z.offsetParent
               } while (Z && !(/^(?:body|html)$/i).test(Z.tagName));
               return {
                   top: aa,
                   left: ab
               }
           },
           jGetRect: function () {
               var aa = this.jGetPosition();
               var Z = this.jGetSize();
               return {
                   top: aa.top,
                   bottom: aa.top + Z.height,
                   left: aa.left,
                   right: aa.left + Z.width
               }
           },
           changeContent: function (aa) {
               try {
                   this.innerHTML = aa
               } catch (Z) {
                   this.innerText = aa
               }
               return this
           },
           jRemove: function () {
               return (this.parentNode) ? this.parentNode.removeChild(this) : this
           },
           kill: function () {
               P.$A(this.childNodes).jEach(function (Z) {
                   if (3 == Z.nodeType || 8 == Z.nodeType) {
                       return
                   }
                   P.$(Z).kill()
               });
               this.jRemove();
               this.jClearEvents();
               if (this.$J_UUID) {
                   P.storage[this.$J_UUID] = null;
                   delete P.storage[this.$J_UUID]
               }
               return null
           },
           append: function (ab, aa) {
               aa = aa || "bottom";
               var Z = this.firstChild;
               ("top" == aa && Z) ? this.insertBefore(ab, Z): this.appendChild(ab);
               return this
           },
           jAppendTo: function (ab, aa) {
               var Z = P.$(ab).append(this, aa);
               return this
           },
           enclose: function (Z) {
               this.append(Z.parentNode.replaceChild(this, Z));
               return this
           },
           hasChild: function (Z) {
               if ("element" !== P.jTypeOf("string" == P.jTypeOf(Z) ? Z = document.getElementById(Z) : Z)) {
                   return false
               }
               return (this == Z) ? false : (this.contains && !(P.browser.webkit419)) ? (this.contains(Z)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(Z) & 16) : P.$A(this.byTag(Z.tagName)).contains(Z)
           }
       };
       P.Element.jGetStyle = P.Element.jGetCss;
       P.Element.jSetStyle = P.Element.jSetCss;
       if (!window.Element) {
           window.Element = P.$F;
           if (P.browser.engine.webkit) {
               window.document.createElement("iframe")
           }
           window.Element.prototype = (P.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
       }
       P.implement(window.Element, {
           $J_TYPE: "element"
       });
       P.Doc = {
           jGetSize: function () {
               if (P.browser.touchScreen || P.browser.presto925 || P.browser.webkit419) {
                   return {
                       width: window.innerWidth,
                       height: window.innerHeight
                   }
               }
               return {
                   width: P.browser.getDoc().clientWidth,
                   height: P.browser.getDoc().clientHeight
               }
           },
           jGetScroll: function () {
               return {
                   x: window.pageXOffset || P.browser.getDoc().scrollLeft,
                   y: window.pageYOffset || P.browser.getDoc().scrollTop
               }
           },
           jGetFullSize: function () {
               var Z = this.jGetSize();
               return {
                   width: Math.max(P.browser.getDoc().scrollWidth, Z.width),
                   height: Math.max(P.browser.getDoc().scrollHeight, Z.height)
               }
           }
       };
       P.extend(document, {
           $J_TYPE: "document"
       });
       P.extend(window, {
           $J_TYPE: "window"
       });
       P.extend([P.Element, P.Doc], {
           jFetch: function (ac, aa) {
               var Z = P.getStorage(this.$J_UUID),
                   ab = Z[ac];
               if (undefined !== aa && undefined === ab) {
                   ab = Z[ac] = aa
               }
               return (P.defined(ab) ? ab : null)
           },
           jStore: function (ab, aa) {
               var Z = P.getStorage(this.$J_UUID);
               Z[ab] = aa;
               return this
           },
           jDel: function (aa) {
               var Z = P.getStorage(this.$J_UUID);
               delete Z[aa];
               return this
           }
       });
       if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
           P.extend([P.Element, P.Doc], {
               getElementsByClassName: function (Z) {
                   return P.$A(this.getElementsByTagName("*")).filter(function (ab) {
                       try {
                           return (1 == ab.nodeType && ab.className.has(Z, " "))
                       } catch (aa) {}
                   })
               }
           })
       }
       P.extend([P.Element, P.Doc], {
           byClass: function () {
               return this.getElementsByClassName(arguments[0])
           },
           byTag: function () {
               return this.getElementsByTagName(arguments[0])
           }
       });
       if (P.browser.fullScreen.capable && !document.requestFullScreen) {
           P.Element.requestFullScreen = function () {
               P.browser.fullScreen.request(this)
           }
       }
       P.Event = {
           $J_TYPE: "event",
           isQueueStopped: P.$false,
           stop: function () {
               return this.stopDistribution().stopDefaults()
           },
           stopDistribution: function () {
               if (this.stopPropagation) {
                   this.stopPropagation()
               } else {
                   this.cancelBubble = true
               }
               return this
           },
           stopDefaults: function () {
               if (this.preventDefault) {
                   this.preventDefault()
               } else {
                   this.returnValue = false
               }
               return this
           },
           stopQueue: function () {
               this.isQueueStopped = P.$true;
               return this
           },
           getClientXY: function () {
               var Z = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
               return !P.defined(Z) ? {
                   x: 0,
                   y: 0
               } : {
                   x: Z.clientX,
                   y: Z.clientY
               }
           },
           jGetPageXY: function () {
               var Z = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
               return !P.defined(Z) ? {
                   x: 0,
                   y: 0
               } : {
                   x: Z.pageX || Z.clientX + P.browser.getDoc().scrollLeft,
                   y: Z.pageY || Z.clientY + P.browser.getDoc().scrollTop
               }
           },
           getTarget: function () {
               var Z = this.target || this.srcElement;
               while (Z && Z.nodeType === 3) {
                   Z = Z.parentNode
               }
               return Z
           },
           getRelated: function () {
               var aa = null;
               switch (this.type) {
               case "mouseover":
               case "pointerover":
               case "MSPointerOver":
                   aa = this.relatedTarget || this.fromElement;
                   break;
               case "mouseout":
               case "pointerout":
               case "MSPointerOut":
                   aa = this.relatedTarget || this.toElement;
                   break;
               default:
                   return aa
               }
               try {
                   while (aa && aa.nodeType === 3) {
                       aa = aa.parentNode
                   }
               } catch (Z) {
                   aa = null
               }
               return aa
           },
           getButton: function () {
               if (!this.which && this.button !== undefined) {
                   return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
               }
               return this.which
           },
           isTouchEvent: function () {
               return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
           },
           isPrimaryTouch: function () {
               if (this.pointerType) {
                   return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches.length === 1 && this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
                   }
               }
               return false
           },
           getPrimaryTouch: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0]
                   }
               }
               return null
           },
           getPrimaryTouchId: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0].identifier
                   }
               }
               return null
           }
       };
       P._event_add_ = "addEventListener";
       P._event_del_ = "removeEventListener";
       P._event_prefix_ = "";
       if (!document.addEventListener) {
           P._event_add_ = "attachEvent";
           P._event_del_ = "detachEvent";
           P._event_prefix_ = "on"
       }
       P.Event.Custom = {
           type: "",
           x: null,
           y: null,
           timeStamp: null,
           button: null,
           target: null,
           relatedTarget: null,
           $J_TYPE: "event.custom",
           isQueueStopped: P.$false,
           events: P.$([]),
           pushToEvents: function (Z) {
               var aa = Z;
               this.events.push(aa)
           },
           stop: function () {
               return this.stopDistribution().stopDefaults()
           },
           stopDistribution: function () {
               this.events.jEach(function (aa) {
                   try {
                       aa.stopDistribution()
                   } catch (Z) {}
               });
               return this
           },
           stopDefaults: function () {
               this.events.jEach(function (aa) {
                   try {
                       aa.stopDefaults()
                   } catch (Z) {}
               });
               return this
           },
           stopQueue: function () {
               this.isQueueStopped = P.$true;
               return this
           },
           getClientXY: function () {
               return {
                   x: this.clientX,
                   y: this.clientY
               }
           },
           jGetPageXY: function () {
               return {
                   x: this.x,
                   y: this.y
               }
           },
           getTarget: function () {
               return this.target
           },
           getRelated: function () {
               return this.relatedTarget
           },
           getButton: function () {
               return this.button
           },
           getOriginalTarget: function () {
               return this.events.length > 0 ? this.events[0].getTarget() : undefined
           },
           isTouchEvent: function () {
               return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
           },
           isPrimaryTouch: function () {
               if (this.pointerType) {
                   return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
                   }
               }
               return false
           },
           getPrimaryTouch: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0]
                   }
               }
               return null
           },
           getPrimaryTouchId: function () {
               if (this.pointerType) {
                   return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
               } else {
                   if (this instanceof window.TouchEvent) {
                       return this.changedTouches[0].identifier
                   }
               }
               return null
           }
       };
       P.extend([P.Element, P.Doc], {
           jAddEvent: function (ab, ad, ae, ah) {
               var ag, Z, ac, af, aa;
               if (P.jTypeOf(ab) === "string") {
                   aa = ab.split(" ");
                   if (aa.length > 1) {
                       ab = aa
                   }
               }
               if (P.jTypeOf(ab) === "array") {
                   P.$(ab).jEach(this.jAddEvent.jBindAsEvent(this, ad, ae, ah));
                   return this
               }
               ab = W[ab] || ab;
               if (!ab || !ad || P.jTypeOf(ab) !== "string" || P.jTypeOf(ad) !== "function") {
                   return this
               }
               if (ab === "domready" && P.browser.ready) {
                   ad.call(this);
                   return this
               }
               ae = parseInt(ae || 50, 10);
               if (!ad.$J_EUID) {
                   ad.$J_EUID = Math.floor(Math.random() * P.now())
               }
               ag = P.Doc.jFetch.call(this, "_EVENTS_", {});
               Z = ag[ab];
               if (!Z) {
                   ag[ab] = Z = P.$([]);
                   ac = this;
                   if (P.Event.Custom[ab]) {
                       P.Event.Custom[ab].handler.add.call(this, ah)
                   } else {
                       Z.handle = function (ai) {
                           ai = P.extend(ai || window.e, {
                               $J_TYPE: "event"
                           });
                           P.Doc.jCallEvent.call(ac, ab, P.$(ai))
                       };
                       this[P._event_add_](P._event_prefix_ + ab, Z.handle, false)
                   }
               }
               af = {
                   type: ab,
                   fn: ad,
                   priority: ae,
                   euid: ad.$J_EUID
               };
               Z.push(af);
               Z.sort(function (aj, ai) {
                   return aj.priority - ai.priority
               });
               return this
           },
           jRemoveEvent: function (af) {
               var ad = P.Doc.jFetch.call(this, "_EVENTS_", {});
               var ab;
               var Z;
               var aa;
               var ag;
               var ae;
               var ac;
               ae = arguments.length > 1 ? arguments[1] : -100;
               if (P.jTypeOf(af) === "string") {
                   ac = af.split(" ");
                   if (ac.length > 1) {
                       af = ac
                   }
               }
               if (P.jTypeOf(af) === "array") {
                   P.$(af).jEach(this.jRemoveEvent.jBindAsEvent(this, ae));
                   return this
               }
               af = W[af] || af;
               if (!af || P.jTypeOf(af) !== "string" || !ad || !ad[af]) {
                   return this
               }
               ab = ad[af] || [];
               for (aa = 0; aa < ab.length; aa++) {
                   Z = ab[aa];
                   if (ae === -100 || !!ae && ae.$J_EUID === Z.euid) {
                       ag = ab.splice(aa--, 1)
                   }
               }
               if (ab.length === 0) {
                   if (P.Event.Custom[af]) {
                       P.Event.Custom[af].handler.jRemove.call(this)
                   } else {
                       this[P._event_del_](P._event_prefix_ + af, ab.handle, false)
                   }
                   delete ad[af]
               }
               return this
           },
           jCallEvent: function (ac, ae) {
               var ab = P.Doc.jFetch.call(this, "_EVENTS_", {});
               var aa;
               var Z;
               ac = W[ac] || ac;
               if (!ac || P.jTypeOf(ac) !== "string" || !ab || !ab[ac]) {
                   return this
               }
               try {
                   ae = P.extend(ae || {}, {
                       type: ac
                   })
               } catch (ad) {}
               if (ae.timeStamp === undefined) {
                   ae.timeStamp = P.now()
               }
               aa = ab[ac] || [];
               for (Z = 0; Z < aa.length && !(ae.isQueueStopped && ae.isQueueStopped()); Z++) {
                   aa[Z].fn.call(this, ae)
               }
           },
           jRaiseEvent: function (aa, Z) {
               var ad = (aa !== "domready");
               var ac = this;
               var ab;
               aa = W[aa] || aa;
               if (!ad) {
                   P.Doc.jCallEvent.call(this, aa);
                   return this
               }
               if (ac === document && document.createEvent && !ac.dispatchEvent) {
                   ac = document.documentElement
               }
               if (document.createEvent) {
                   ab = document.createEvent(aa);
                   ab.initEvent(Z, true, true)
               } else {
                   ab = document.createEventObject();
                   ab.eventType = aa
               }
               if (document.createEvent) {
                   ac.dispatchEvent(ab)
               } else {
                   ac.fireEvent("on" + Z, ab)
               }
               return ab
           },
           jClearEvents: function () {
               var aa = P.Doc.jFetch.call(this, "_EVENTS_");
               if (!aa) {
                   return this
               }
               for (var Z in aa) {
                   P.Doc.jRemoveEvent.call(this, Z)
               }
               P.Doc.jDel.call(this, "_EVENTS_");
               return this
           }
       });
       (function (Z) {
           if (document.readyState === "complete") {
               return Z.browser.onready.jDelay(1)
           }
           if (Z.browser.webkit && Z.browser.version < 420) {
               (function () {
                   if (Z.$(["loaded", "complete"]).contains(document.readyState)) {
                       Z.browser.onready()
                   } else {
                       arguments.callee.jDelay(50)
                   }
               }())
           } else {
               if (Z.browser.trident && Z.browser.ieMode < 9 && window === top) {
                   (function () {
                       if (Z.$try(function () {
                               Z.browser.getDoc().doScroll("left");
                               return true
                           })) {
                           Z.browser.onready()
                       } else {
                           arguments.callee.jDelay(50)
                       }
                   }())
               } else {
                   Z.Doc.jAddEvent.call(Z.$(document), "DOMContentLoaded", Z.browser.onready);
                   Z.Doc.jAddEvent.call(Z.$(window), "load", Z.browser.onready)
               }
           }
       }(V));
       P.Class = function () {
           var ad = null,
               aa = P.$A(arguments);
           if ("class" == P.jTypeOf(aa[0])) {
               ad = aa.shift()
           }
           var Z = function () {
               for (var ag in this) {
                   this[ag] = P.detach(this[ag])
               }
               if (this.constructor.$parent) {
                   this.$parent = {};
                   var ai = this.constructor.$parent;
                   for (var ah in ai) {
                       var af = ai[ah];
                       switch (P.jTypeOf(af)) {
                       case "function":
                           this.$parent[ah] = P.Class.wrap(this, af);
                           break;
                       case "object":
                           this.$parent[ah] = P.detach(af);
                           break;
                       case "array":
                           this.$parent[ah] = P.detach(af);
                           break
                       }
                   }
               }
               var ae = (this.init) ? this.init.apply(this, arguments) : this;
               delete this.caller;
               return ae
           };
           if (!Z.prototype.init) {
               Z.prototype.init = P.$F
           }
           if (ad) {
               var ac = function () {};
               ac.prototype = ad.prototype;
               Z.prototype = new ac;
               Z.$parent = {};
               for (var ab in ad.prototype) {
                   Z.$parent[ab] = ad.prototype[ab]
               }
           } else {
               Z.$parent = null
           }
           Z.constructor = P.Class;
           Z.prototype.constructor = Z;
           P.extend(Z.prototype, aa[0]);
           P.extend(Z, {
               $J_TYPE: "class"
           });
           return Z
       };
       V.Class.wrap = function (Z, aa) {
           return function () {
               var ac = this.caller;
               var ab = aa.apply(Z, arguments);
               return ab
           }
       };
       (function (ac) {
           var ab = ac.$;
           var Z = 5,
               aa = 300;
           ac.Event.Custom.btnclick = new ac.Class(ac.extend(ac.Event.Custom, {
               type: "btnclick",
               init: function (af, ae) {
                   var ad = ae.jGetPageXY();
                   this.x = ad.x;
                   this.y = ad.y;
                   this.clientX = ae.clientX;
                   this.clientY = ae.clientY;
                   this.timeStamp = ae.timeStamp;
                   this.button = ae.getButton();
                   this.target = af;
                   this.pushToEvents(ae)
               }
           }));
           ac.Event.Custom.btnclick.handler = {
               options: {
                   threshold: aa,
                   button: 1
               },
               add: function (ad) {
                   this.jStore("event:btnclick:options", ac.extend(ac.detach(ac.Event.Custom.btnclick.handler.options), ad || {}));
                   this.jAddEvent("mousedown", ac.Event.Custom.btnclick.handler.handle, 1);
                   this.jAddEvent("mouseup", ac.Event.Custom.btnclick.handler.handle, 1);
                   this.jAddEvent("click", ac.Event.Custom.btnclick.handler.onclick, 1);
                   if (ac.browser.trident && ac.browser.ieMode < 9) {
                       this.jAddEvent("dblclick", ac.Event.Custom.btnclick.handler.handle, 1)
                   }
               },
               jRemove: function () {
                   this.jRemoveEvent("mousedown", ac.Event.Custom.btnclick.handler.handle);
                   this.jRemoveEvent("mouseup", ac.Event.Custom.btnclick.handler.handle);
                   this.jRemoveEvent("click", ac.Event.Custom.btnclick.handler.onclick);
                   if (ac.browser.trident && ac.browser.ieMode < 9) {
                       this.jRemoveEvent("dblclick", ac.Event.Custom.btnclick.handler.handle)
                   }
               },
               onclick: function (ad) {
                   ad.stopDefaults()
               },
               handle: function (ag) {
                   var af, ad, ae;
                   ad = this.jFetch("event:btnclick:options");
                   if (ag.type != "dblclick" && ag.getButton() != ad.button) {
                       return
                   }
                   if (this.jFetch("event:btnclick:ignore")) {
                       this.jDel("event:btnclick:ignore");
                       return
                   }
                   if ("mousedown" == ag.type) {
                       af = new ac.Event.Custom.btnclick(this, ag);
                       this.jStore("event:btnclick:btnclickEvent", af)
                   } else {
                       if ("mouseup" == ag.type) {
                           af = this.jFetch("event:btnclick:btnclickEvent");
                           if (!af) {
                               return
                           }
                           ae = ag.jGetPageXY();
                           this.jDel("event:btnclick:btnclickEvent");
                           af.pushToEvents(ag);
                           if (ag.timeStamp - af.timeStamp <= ad.threshold && Math.sqrt(Math.pow(ae.x - af.x, 2) + Math.pow(ae.y - af.y, 2)) <= Z) {
                               this.jCallEvent("btnclick", af)
                           }
                           document.jCallEvent("mouseup", ag)
                       } else {
                           if (ag.type == "dblclick") {
                               af = new ac.Event.Custom.btnclick(this, ag);
                               this.jCallEvent("btnclick", af)
                           }
                       }
                   }
               }
           }
       })(V);
       (function (aa) {
           var Z = aa.$;
           aa.Event.Custom.mousedrag = new aa.Class(aa.extend(aa.Event.Custom, {
               type: "mousedrag",
               state: "dragstart",
               dragged: false,
               init: function (ae, ad, ac) {
                   var ab = ad.jGetPageXY();
                   this.x = ab.x;
                   this.y = ab.y;
                   this.clientX = ad.clientX;
                   this.clientY = ad.clientY;
                   this.timeStamp = ad.timeStamp;
                   this.button = ad.getButton();
                   this.target = ae;
                   this.pushToEvents(ad);
                   this.state = ac
               }
           }));
           aa.Event.Custom.mousedrag.handler = {
               add: function () {
                   var ac = aa.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this);
                   var ab = aa.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                   this.jAddEvent("mousedown", aa.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                   this.jAddEvent("mouseup", aa.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                   document.jAddEvent("mousemove", ac, 1);
                   document.jAddEvent("mouseup", ab, 1);
                   this.jStore("event:mousedrag:listeners:document:move", ac);
                   this.jStore("event:mousedrag:listeners:document:end", ab)
               },
               jRemove: function () {
                   this.jRemoveEvent("mousedown", aa.Event.Custom.mousedrag.handler.handleMouseDown);
                   this.jRemoveEvent("mouseup", aa.Event.Custom.mousedrag.handler.handleMouseUp);
                   Z(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || aa.$F);
                   Z(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || aa.$F);
                   this.jDel("event:mousedrag:listeners:document:move");
                   this.jDel("event:mousedrag:listeners:document:end")
               },
               handleMouseDown: function (ac) {
                   var ab;
                   if (ac.getButton() !== 1) {
                       return
                   }
                   ab = new aa.Event.Custom.mousedrag(this, ac, "dragstart");
                   this.jStore("event:mousedrag:dragstart", ab)
               },
               handleMouseUp: function (ac) {
                   var ab;
                   ab = this.jFetch("event:mousedrag:dragstart");
                   if (!ab) {
                       return
                   }
                   if (ab.dragged) {
                       ac.stopDefaults()
                   }
                   ab = new aa.Event.Custom.mousedrag(this, ac, "dragend");
                   this.jDel("event:mousedrag:dragstart");
                   this.jCallEvent("mousedrag", ab)
               },
               handleMouseMove: function (ac) {
                   var ab;
                   ab = this.jFetch("event:mousedrag:dragstart");
                   if (!ab) {
                       return
                   }
                   ac.stopDefaults();
                   if (!ab.dragged) {
                       ab.dragged = true;
                       this.jCallEvent("mousedrag", ab)
                   }
                   ab = new aa.Event.Custom.mousedrag(this, ac, "dragmove");
                   this.jCallEvent("mousedrag", ab)
               }
           }
       })(V);
       (function (aa) {
           var Z = aa.$;
           aa.Event.Custom.dblbtnclick = new aa.Class(aa.extend(aa.Event.Custom, {
               type: "dblbtnclick",
               timedout: false,
               tm: null,
               init: function (ad, ac) {
                   var ab = ac.jGetPageXY();
                   this.x = ab.x;
                   this.y = ab.y;
                   this.clientX = ac.clientX;
                   this.clientY = ac.clientY;
                   this.timeStamp = ac.timeStamp;
                   this.button = ac.getButton();
                   this.target = ad;
                   this.pushToEvents(ac)
               }
           }));
           aa.Event.Custom.dblbtnclick.handler = {
               options: {
                   threshold: 200
               },
               add: function (ab) {
                   this.jStore("event:dblbtnclick:options", aa.extend(aa.detach(aa.Event.Custom.dblbtnclick.handler.options), ab || {}));
                   this.jAddEvent("btnclick", aa.Event.Custom.dblbtnclick.handler.handle, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent("btnclick", aa.Event.Custom.dblbtnclick.handler.handle)
               },
               handle: function (ad) {
                   var ac, ab;
                   ac = this.jFetch("event:dblbtnclick:event");
                   ab = this.jFetch("event:dblbtnclick:options");
                   if (!ac) {
                       ac = new aa.Event.Custom.dblbtnclick(this, ad);
                       ac.tm = setTimeout(function () {
                           ac.timedout = true;
                           ad.isQueueStopped = aa.$false;
                           this.jCallEvent("btnclick", ad);
                           this.jDel("event:dblbtnclick:event")
                       }.jBind(this), ab.threshold + 10);
                       this.jStore("event:dblbtnclick:event", ac);
                       ad.stopQueue()
                   } else {
                       clearTimeout(ac.tm);
                       this.jDel("event:dblbtnclick:event");
                       if (!ac.timedout) {
                           ac.pushToEvents(ad);
                           ad.stopQueue().stop();
                           this.jCallEvent("dblbtnclick", ac)
                       } else {}
                   }
               }
           }
       })(V);
       (function (ac) {
           var ab = ac.$;
           var Z = 10;
           var aa = 200;
           ac.Event.Custom.tap = new ac.Class(ac.extend(ac.Event.Custom, {
               type: "tap",
               id: null,
               init: function (ae, ad) {
                   var af = ad.getPrimaryTouch();
                   this.id = af.pointerId || af.identifier;
                   this.x = af.pageX;
                   this.y = af.pageY;
                   this.pageX = af.pageX;
                   this.pageY = af.pageY;
                   this.clientX = af.clientX;
                   this.clientY = af.clientY;
                   this.timeStamp = ad.timeStamp;
                   this.button = 0;
                   this.target = ae;
                   this.pushToEvents(ad)
               }
           }));
           ac.Event.Custom.tap.handler = {
               add: function (ad) {
                   this.jAddEvent(["touchstart", "pointerdown"], ac.Event.Custom.tap.handler.onTouchStart, 1);
                   this.jAddEvent(["touchend", "pointerup"], ac.Event.Custom.tap.handler.onTouchEnd, 1);
                   this.jAddEvent("click", ac.Event.Custom.tap.handler.onClick, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(["touchstart", "pointerdown"], ac.Event.Custom.tap.handler.onTouchStart);
                   this.jRemoveEvent(["touchend", "pointerup"], ac.Event.Custom.tap.handler.onTouchEnd);
                   this.jRemoveEvent("click", ac.Event.Custom.tap.handler.onClick)
               },
               onClick: function (ad) {
                   ad.stopDefaults()
               },
               onTouchStart: function (ad) {
                   if (!ad.isPrimaryTouch()) {
                       this.jDel("event:tap:event");
                       return
                   }
                   this.jStore("event:tap:event", new ac.Event.Custom.tap(this, ad));
                   this.jStore("event:btnclick:ignore", true)
               },
               onTouchEnd: function (ag) {
                   var ae = ac.now();
                   var af = this.jFetch("event:tap:event");
                   var ad = this.jFetch("event:tap:options");
                   if (!af || !ag.isPrimaryTouch()) {
                       return
                   }
                   this.jDel("event:tap:event");
                   if (af.id === ag.getPrimaryTouchId() && ag.timeStamp - af.timeStamp <= aa && Math.sqrt(Math.pow(ag.getPrimaryTouch().pageX - af.x, 2) + Math.pow(ag.getPrimaryTouch().pageY - af.y, 2)) <= Z) {
                       this.jDel("event:btnclick:btnclickEvent");
                       ag.stop();
                       af.pushToEvents(ag);
                       this.jCallEvent("tap", af)
                   }
               }
           }
       }(V));
       P.Event.Custom.dbltap = new P.Class(P.extend(P.Event.Custom, {
           type: "dbltap",
           timedout: false,
           tm: null,
           init: function (aa, Z) {
               this.x = Z.x;
               this.y = Z.y;
               this.clientX = Z.clientX;
               this.clientY = Z.clientY;
               this.timeStamp = Z.timeStamp;
               this.button = 0;
               this.target = aa;
               this.pushToEvents(Z)
           }
       }));
       P.Event.Custom.dbltap.handler = {
           options: {
               threshold: 300
           },
           add: function (Z) {
               this.jStore("event:dbltap:options", P.extend(P.detach(P.Event.Custom.dbltap.handler.options), Z || {}));
               this.jAddEvent("tap", P.Event.Custom.dbltap.handler.handle, 1)
           },
           jRemove: function () {
               this.jRemoveEvent("tap", P.Event.Custom.dbltap.handler.handle)
           },
           handle: function (ab) {
               var aa, Z;
               aa = this.jFetch("event:dbltap:event");
               Z = this.jFetch("event:dbltap:options");
               if (!aa) {
                   aa = new P.Event.Custom.dbltap(this, ab);
                   aa.tm = setTimeout(function () {
                       aa.timedout = true;
                       ab.isQueueStopped = P.$false;
                       this.jCallEvent("tap", ab)
                   }.jBind(this), Z.threshold + 10);
                   this.jStore("event:dbltap:event", aa);
                   ab.stopQueue()
               } else {
                   clearTimeout(aa.tm);
                   this.jDel("event:dbltap:event");
                   if (!aa.timedout) {
                       aa.pushToEvents(ab);
                       ab.stopQueue().stop();
                       this.jCallEvent("dbltap", aa)
                   } else {}
               }
           }
       };
       (function (ab) {
           var aa = ab.$;
           var Z = 10;
           ab.Event.Custom.touchdrag = new ab.Class(ab.extend(ab.Event.Custom, {
               type: "touchdrag",
               state: "dragstart",
               id: null,
               dragged: false,
               init: function (ae, ad, ac) {
                   var af = ad.getPrimaryTouch();
                   this.id = af.pointerId || af.identifier;
                   this.clientX = af.clientX;
                   this.clientY = af.clientY;
                   this.pageX = af.pageX;
                   this.pageY = af.pageY;
                   this.x = af.pageX;
                   this.y = af.pageY;
                   this.timeStamp = ad.timeStamp;
                   this.button = 0;
                   this.target = ae;
                   this.pushToEvents(ad);
                   this.state = ac
               }
           }));
           ab.Event.Custom.touchdrag.handler = {
               add: function () {
                   var ad = ab.Event.Custom.touchdrag.handler.onTouchMove.jBind(this);
                   var ac = ab.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                   this.jAddEvent(["touchstart", "pointerdown"], ab.Event.Custom.touchdrag.handler.onTouchStart, 1);
                   this.jAddEvent(["touchend", "pointerup"], ab.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                   this.jAddEvent(["touchmove", "pointermove"], ab.Event.Custom.touchdrag.handler.onTouchMove, 1);
                   this.jStore("event:touchdrag:listeners:document:move", ad);
                   this.jStore("event:touchdrag:listeners:document:end", ac);
                   aa(document).jAddEvent("pointermove", ad, 1);
                   aa(document).jAddEvent("pointerup", ac, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(["touchstart", "pointerdown"], ab.Event.Custom.touchdrag.handler.onTouchStart);
                   this.jRemoveEvent(["touchend", "pointerup"], ab.Event.Custom.touchdrag.handler.onTouchEnd);
                   this.jRemoveEvent(["touchmove", "pointermove"], ab.Event.Custom.touchdrag.handler.onTouchMove);
                   aa(document).jRemoveEvent("pointermove", this.jFetch("event:touchdrag:listeners:document:move") || ab.$F, 1);
                   aa(document).jRemoveEvent("pointerup", this.jFetch("event:touchdrag:listeners:document:end") || ab.$F, 1);
                   this.jDel("event:touchdrag:listeners:document:move");
                   this.jDel("event:touchdrag:listeners:document:end")
               },
               onTouchStart: function (ad) {
                   var ac;
                   if (!ad.isPrimaryTouch()) {
                       return
                   }
                   ac = new ab.Event.Custom.touchdrag(this, ad, "dragstart");
                   this.jStore("event:touchdrag:dragstart", ac)
               },
               onTouchEnd: function (ad) {
                   var ac;
                   ac = this.jFetch("event:touchdrag:dragstart");
                   if (!ac || !ac.dragged || ac.id !== ad.getPrimaryTouchId()) {
                       return
                   }
                   ac = new ab.Event.Custom.touchdrag(this, ad, "dragend");
                   this.jDel("event:touchdrag:dragstart");
                   this.jCallEvent("touchdrag", ac)
               },
               onTouchMove: function (ad) {
                   var ac;
                   ac = this.jFetch("event:touchdrag:dragstart");
                   if (!ac || !ad.isPrimaryTouch()) {
                       return
                   }
                   if (ac.id !== ad.getPrimaryTouchId()) {
                       this.jDel("event:touchdrag:dragstart");
                       return
                   }
                   if (!ac.dragged && Math.sqrt(Math.pow(ad.getPrimaryTouch().pageX - ac.x, 2) + Math.pow(ad.getPrimaryTouch().pageY - ac.y, 2)) > Z) {
                       ac.dragged = true;
                       this.jCallEvent("touchdrag", ac)
                   }
                   if (!ac.dragged) {
                       return
                   }
                   ac = new ab.Event.Custom.touchdrag(this, ad, "dragmove");
                   this.jCallEvent("touchdrag", ac)
               }
           }
       }(V));
       (function (ac) {
           var ag = ac.$;
           var ad = null;
           function Z(ap, ao) {
               var an = ao.x - ap.x;
               var aq = ao.y - ap.y;
               return Math.sqrt(an * an + aq * aq)
           }
           function ai(au, av) {
               var at = Array.prototype.slice.call(au);
               var ar = Math.abs(at[1].pageX - at[0].pageX);
               var ap = Math.abs(at[1].pageY - at[0].pageY);
               var aq = Math.min(at[1].pageX, at[0].pageX) + ar / 2;
               var ao = Math.min(at[1].pageY, at[0].pageY) + ap / 2;
               var an = 0;
               av.points = [at[0], at[1]];
               an = Math.pow(Z({
                   x: at[0].pageX,
                   y: at[0].pageY
               }, {
                   x: at[1].pageX,
                   y: at[1].pageY
               }), 2);
               av.centerPoint = {
                   x: aq,
                   y: ao
               };
               av.x = av.centerPoint.x;
               av.y = av.centerPoint.y;
               return an
           }
           function al(an) {
               return an / ad
           }
           function aa(ap, ao) {
               var an;
               if (ap.targetTouches && ap.changedTouches) {
                   if (ap.targetTouches) {
                       an = ap.targetTouches
                   } else {
                       an = ap.changedTouches
                   }
                   an = Array.prototype.slice.call(an)
               } else {
                   an = [];
                   if (ao) {
                       ao.forEach(function (aq) {
                           an.push(aq)
                       })
                   }
               }
               return an
           }
           function ab(aq, ap, ao) {
               var an = false;
               if (aq.pointerId && aq.pointerType === "touch" && (!ao || ap.has(aq.pointerId))) {
                   ap.set(aq.pointerId, aq);
                   an = true
               }
               return an
           }
           function ah(ao, an) {
               if (ao.pointerId && ao.pointerType === "touch" && an && an.has(ao.pointerId)) {
                   an["delete"](ao.pointerId)
               }
           }
           function ak(ao) {
               var an;
               if (ao.pointerId && ao.pointerType === "touch") {
                   an = ao.pointerId
               } else {
                   an = ao.identifier
               }
               return an
           }
           function af(aq, ao) {
               var ap;
               var ar;
               var an = false;
               for (ap = 0; ap < aq.length; ap++) {
                   if (ao.length === 2) {
                       break
                   } else {
                       ar = ak(aq[ap]);
                       if (!ao.contains(ar)) {
                           ao.push(ar);
                           an = true
                       }
                   }
               }
               return an
           }
           function aj(ao) {
               var an = ag([]);
               ao.forEach(function (ap) {
                   an.push(ak(ap))
               });
               return an
           }
           function am(ar, ao) {
               var ap;
               var aq;
               var an = false;
               if (ao) {
                   aq = aj(ar);
                   for (ap = 0; ap < ao.length; ap++) {
                       if (!aq.contains(ao[ap])) {
                           ao.splice(ap, 1);
                           an = true;
                           break
                       }
                   }
               }
               return an
           }
           function ae(aq, ao) {
               var ap;
               var an = ag([]);
               for (ap = 0; ap < aq.length; ap++) {
                   if (ao.contains(ak(aq[ap]))) {
                       an.push(aq[ap]);
                       if (an.length === 2) {
                           break
                       }
                   }
               }
               return an
           }
           ac.Event.Custom.pinch = new ac.Class(ac.extend(ac.Event.Custom, {
               type: "pinch",
               state: "pinchstart",
               init: function (ap, ao, an, aq) {
                   this.target = ap;
                   this.state = an;
                   this.x = aq.x;
                   this.y = aq.y;
                   this.timeStamp = ao.timeStamp;
                   this.scale = aq.scale;
                   this.space = aq.space;
                   this.zoom = aq.zoom;
                   this.state = an;
                   this.centerPoint = aq.centerPoint;
                   this.points = aq.points;
                   this.pushToEvents(ao)
               }
           }));
           ac.Event.Custom.pinch.handler = {
               variables: {
                   x: 0,
                   y: 0,
                   space: 0,
                   scale: 1,
                   zoom: 0,
                   startSpace: 0,
                   startScale: 1,
                   started: false,
                   dragged: false,
                   points: [],
                   centerPoint: {
                       x: 0,
                       y: 0
                   }
               },
               add: function (ap) {
                   if (!ad) {
                       ad = (function () {
                           var aq = ag(window).jGetSize();
                           aq.width = Math.min(aq.width, aq.height);
                           aq.height = aq.width;
                           return Math.pow(Z({
                               x: 0,
                               y: 0
                           }, {
                               x: aq.width,
                               y: aq.height
                           }), 2)
                       })()
                   }
                   var ao = ac.Event.Custom.pinch.handler.onTouchMove.jBind(this);
                   var an = ac.Event.Custom.pinch.handler.onTouchEnd.jBind(this);
                   this.jAddEvent(["click", "tap"], ac.Event.Custom.pinch.handler.onClick, 1);
                   this.jAddEvent(["touchstart", "pointerdown"], ac.Event.Custom.pinch.handler.onTouchStart, 1);
                   this.jAddEvent(["touchend", "pointerup"], ac.Event.Custom.pinch.handler.onTouchEnd, 1);
                   this.jAddEvent(["touchmove", "pointermove"], ac.Event.Custom.pinch.handler.onTouchMove, 1);
                   this.jStore("event:pinch:listeners:touchmove", ao);
                   this.jStore("event:pinch:listeners:touchend", an);
                   ac.doc.jAddEvent("pointermove", ao, 1);
                   ac.doc.jAddEvent("pointerup", an, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(["click", "tap"], ac.Event.Custom.pinch.handler.onClick);
                   this.jRemoveEvent(["touchstart", "pointerdown"], ac.Event.Custom.pinch.handler.onTouchStart);
                   this.jRemoveEvent(["touchend", "pointerup"], ac.Event.Custom.pinch.handler.onTouchEnd);
                   this.jRemoveEvent(["touchmove", "pointermove"], ac.Event.Custom.pinch.handler.onTouchMove);
                   ac.doc.jRemoveEvent("pointermove", this.jFetch("event:pinch:listeners:touchmove"));
                   ac.doc.jRemoveEvent("pointerup", this.jFetch("event:pinch:listeners:touchend"));
                   this.jDel("event:pinch:listeners:touchmove");
                   this.jDel("event:pinch:listeners:touchend");
                   this.jDel("event:pinch:pinchstart");
                   this.jDel("event:pinch:variables");
                   this.jDel("event:pinch:activepoints");
                   var an = this.jFetch("event:pinch:cache");
                   if (an) {
                       an.clear()
                   }
                   this.jDel("event:pinch:cache")
               },
               onClick: function (an) {
                   an.stop()
               },
               setVariables: function (ao, ap) {
                   var an = ap.space;
                   if (ao.length > 1) {
                       ap.space = ai(ao, ap);
                       if (!ap.startSpace) {
                           ap.startSpace = ap.space
                       }
                       if (an > ap.space) {
                           ap.zoom = -1
                       } else {
                           if (an < ap.space) {
                               ap.zoom = 1
                           } else {
                               ap.zoom = 0
                           }
                       }
                       ap.scale = al(ap.space)
                   } else {
                       ap.points = Array.prototype.slice.call(ao, 0, 2)
                   }
               },
               onTouchMove: function (ap) {
                   var ao;
                   var an = this.jFetch("event:pinch:cache");
                   var ar = this.jFetch("event:pinch:variables") || ac.extend({}, ac.Event.Custom.pinch.handler.variables);
                   var aq = this.jFetch("event:pinch:activepoints");
                   if (ar.started) {
                       if (ap.pointerId && !ab(ap, an, true)) {
                           return
                       }
                       ap.stop();
                       ac.Event.Custom.pinch.handler.setVariables(ae(aa(ap, an), aq), ar);
                       ao = new ac.Event.Custom.pinch(this, ap, "pinchmove", ar);
                       this.jCallEvent("pinch", ao)
                   }
               },
               onTouchStart: function (aq) {
                   var ao;
                   var at;
                   var ap;
                   var an = this.jFetch("event:pinch:cache");
                   var ar = this.jFetch("event:pinch:activepoints");
                   if (aq.pointerType === "mouse") {
                       return
                   }
                   if (!ar) {
                       ar = ag([]);
                       this.jStore("event:pinch:activepoints", ar)
                   }
                   if (!ar.length) {
                       ag(aq.target).jAddEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"), 1)
                   }
                   if (!an) {
                       an = new Map();
                       this.jStore("event:pinch:cache", an)
                   }
                   ab(aq, an);
                   ap = aa(aq, an);
                   af(ap, ar);
                   if (ap.length === 2) {
                       ao = this.jFetch("event:pinch:pinchstart");
                       at = this.jFetch("event:pinch:variables") || ac.extend({}, ac.Event.Custom.pinch.handler.variables);
                       ac.Event.Custom.pinch.handler.setVariables(ae(ap, ar), at);
                       if (!ao) {
                           ao = new ac.Event.Custom.pinch(this, aq, "pinchstart", at);
                           this.jStore("event:pinch:pinchstart", ao);
                           this.jStore("event:pinch:variables", at);
                           ad = at.space;
                           this.jCallEvent("pinch", ao);
                           at.started = true
                       }
                   }
               },
               onTouchEnd: function (at) {
                   var ar;
                   var aq;
                   var av;
                   var ao;
                   var ap = this.jFetch("event:pinch:cache");
                   var au;
                   var an;
                   if (at.pointerType === "mouse" || at.pointerId && (!ap || !ap.has(at.pointerId))) {
                       return
                   }
                   aq = this.jFetch("event:pinch:pinchstart");
                   av = this.jFetch("event:pinch:variables");
                   au = this.jFetch("event:pinch:activepoints");
                   ar = aa(at, ap);
                   ah(at, ap);
                   an = am(ar, au);
                   if (!aq || !av || !av.started || !an || !au) {
                       return
                   }
                   if (an) {
                       af(ar, au)
                   }
                   ao = "pinchend";
                   if (ar.length > 1) {
                       ao = "pinchresize"
                   } else {
                       at.target.jRemoveEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"));
                       if (ap) {
                           ap.clear()
                       }
                       this.jDel("event:pinch:pinchstart");
                       this.jDel("event:pinch:variables");
                       this.jDel("event:pinch:cache");
                       this.jDel("event:pinch:activepoints")
                   }
                   ac.Event.Custom.pinch.handler.setVariables(ae(ar, au), av);
                   aq = new ac.Event.Custom.pinch(this, at, ao, av);
                   this.jCallEvent("pinch", aq)
               }
           }
       }(V));
       (function (ae) {
           var ac = ae.$;
           ae.Event.Custom.mousescroll = new ae.Class(ae.extend(ae.Event.Custom, {
               type: "mousescroll",
               init: function (ak, aj, am, ag, af, al, ah) {
                   var ai = aj.jGetPageXY();
                   this.x = ai.x;
                   this.y = ai.y;
                   this.timeStamp = aj.timeStamp;
                   this.target = ak;
                   this.delta = am || 0;
                   this.deltaX = ag || 0;
                   this.deltaY = af || 0;
                   this.deltaZ = al || 0;
                   this.deltaFactor = ah || 0;
                   this.deltaMode = aj.deltaMode || 0;
                   this.isMouse = false;
                   this.pushToEvents(aj)
               }
           }));
           var ad, aa;
           function Z() {
               ad = null
           }
           function ab(af, ag) {
               return (af > 50) || (1 === ag && !("win" == ae.browser.platform && af < 1)) || (0 === af % 12) || (0 == af % 4.000244140625)
           }
           ae.Event.Custom.mousescroll.handler = {
               eventType: "onwheel" in document || ae.browser.ieMode > 8 ? "wheel" : "mousewheel",
               add: function () {
                   this.jAddEvent(ae.Event.Custom.mousescroll.handler.eventType, ae.Event.Custom.mousescroll.handler.handle, 1)
               },
               jRemove: function () {
                   this.jRemoveEvent(ae.Event.Custom.mousescroll.handler.eventType, ae.Event.Custom.mousescroll.handler.handle, 1)
               },
               handle: function (ak) {
                   var al = 0,
                       ai = 0,
                       ag = 0,
                       af = 0,
                       aj, ah;
                   if (ak.detail) {
                       ag = ak.detail * -1
                   }
                   if (ak.wheelDelta !== undefined) {
                       ag = ak.wheelDelta
                   }
                   if (ak.wheelDeltaY !== undefined) {
                       ag = ak.wheelDeltaY
                   }
                   if (ak.wheelDeltaX !== undefined) {
                       ai = ak.wheelDeltaX * -1
                   }
                   if (ak.deltaY) {
                       ag = -1 * ak.deltaY
                   }
                   if (ak.deltaX) {
                       ai = ak.deltaX
                   }
                   if (0 === ag && 0 === ai) {
                       return
                   }
                   al = 0 === ag ? ai : ag;
                   af = Math.max(Math.abs(ag), Math.abs(ai));
                   if (!ad || af < ad) {
                       ad = af
                   }
                   aj = al > 0 ? "floor" : "ceil";
                   al = Math[aj](al / ad);
                   ai = Math[aj](ai / ad);
                   ag = Math[aj](ag / ad);
                   if (aa) {
                       clearTimeout(aa)
                   }
                   aa = setTimeout(Z, 200);
                   ah = new ae.Event.Custom.mousescroll(this, ak, al, ai, ag, 0, ad);
                   ah.isMouse = ab(ad, ak.deltaMode || 0);
                   this.jCallEvent("mousescroll", ah)
               }
           }
       })(V);
       P.win = P.$(window);
       P.doc = P.$(document);
       return V
   })();
   (function (L) {
       if (!L) {
           throw "MagicJS not found"
       }
       var K = L.$;
       var J = window.URL || window.webkitURL || null;
       y.ImageLoader = new L.Class({
           img: null,
           ready: false,
           options: {
               onprogress: L.$F,
               onload: L.$F,
               onabort: L.$F,
               onerror: L.$F,
               oncomplete: L.$F,
               onxhrerror: L.$F,
               xhr: false,
               progressiveLoad: true
           },
           size: null,
           _timer: null,
           loadedBytes: 0,
           _handlers: {
               onprogress: function (M) {
                   if (M.target && (200 === M.target.status || 304 === M.target.status) && M.lengthComputable) {
                       this.options.onprogress.jBind(null, (M.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / M.total).jDelay(1);
                       this.loadedBytes = M.loaded
                   }
               },
               onload: function (M) {
                   if (M) {
                       K(M).stop()
                   }
                   this._unbind();
                   if (this.ready) {
                       return
                   }
                   this.ready = true;
                   this._cleanup();
                   !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
                   this.options.onload.jBind(null, this).jDelay(1);
                   this.options.oncomplete.jBind(null, this).jDelay(1)
               },
               onabort: function (M) {
                   if (M) {
                       K(M).stop()
                   }
                   this._unbind();
                   this.ready = false;
                   this._cleanup();
                   this.options.onabort.jBind(null, this).jDelay(1);
                   this.options.oncomplete.jBind(null, this).jDelay(1)
               },
               onerror: function (M) {
                   if (M) {
                       K(M).stop()
                   }
                   this._unbind();
                   this.ready = false;
                   this._cleanup();
                   this.options.onerror.jBind(null, this).jDelay(1);
                   this.options.oncomplete.jBind(null, this).jDelay(1)
               }
           },
           _bind: function () {
               K(["load", "abort", "error"]).jEach(function (M) {
                   this.img.jAddEvent(M, this._handlers["on" + M].jBindAsEvent(this).jDefer(1))
               }, this)
           },
           _unbind: function () {
               if (this._timer) {
                   try {
                       clearTimeout(this._timer)
                   } catch (M) {}
                   this._timer = null
               }
               K(["load", "abort", "error"]).jEach(function (N) {
                   this.img.jRemoveEvent(N)
               }, this)
           },
           _cleanup: function () {
               this.jGetSize();
               if (this.img.jFetch("new")) {
                   var M = this.img.parentNode;
                   this.img.jRemove().jDel("new").jSetCss({
                       position: "static",
                       top: "auto"
                   });
                   M.kill()
               }
           },
           loadBlob: function (N) {
               var O = new XMLHttpRequest(),
                   M;
               K(["abort", "progress"]).jEach(function (P) {
                   O["on" + P] = K(function (Q) {
                       this._handlers["on" + P].call(this, Q)
                   }).jBind(this)
               }, this);
               O.onerror = K(function () {
                   this.options.onxhrerror.jBind(null, this).jDelay(1);
                   this.options.xhr = false;
                   this._bind();
                   this.img.src = N
               }).jBind(this);
               O.onload = K(function () {
                   if (200 !== O.status && 304 !== O.status) {
                       this._handlers.onerror.call(this);
                       return
                   }
                   M = O.response;
                   this._bind();
                   if (J && !L.browser.trident && !("ios" === L.browser.platform && L.browser.version < 537)) {
                       this.img.setAttribute("src", J.createObjectURL(M))
                   } else {
                       this.img.src = N
                   }
               }).jBind(this);
               O.open("GET", N);
               O.responseType = "blob";
               O.send()
           },
           init: function (N, M) {
               this.options = L.extend(this.options, M);
               this.img = K(N) || L.$new("img").jSetCss({
                   maxWidth: "none",
                   maxHeight: "none"
               }).jAppendTo(L.$new("div").jAddClass("magic-temporary-img").jSetCss({
                   position: "absolute",
                   top: -10000,
                   width: 10,
                   height: 10,
                   overflow: "hidden"
               }).jAppendTo(document.body)).jStore("new", true);
               if (M.referrerPolicy) {
                   this.img.setAttribute("referrerpolicy", M.referrerPolicy)
               }
               if (L.browser.features.xhr2 && this.options.xhr && L.jTypeOf(N) === "string") {
                   this.loadBlob(N);
                   return
               }
               var O = function () {
                   if (this.isReady()) {
                       this._handlers.onload.call(this)
                   } else {
                       this._handlers.onerror.call(this)
                   }
                   O = null
               }.jBind(this);
               this._bind();
               if ("string" == L.jTypeOf(N)) {
                   this.img.src = N
               } else {
                   if (L.browser.trident && 5 == L.browser.version && L.browser.ieMode < 9) {
                       this.img.onreadystatechange = function () {
                           if (/loaded|complete/.test(this.img.readyState)) {
                               this.img.onreadystatechange = null;
                               O && O()
                           }
                       }.jBind(this)
                   }
                   this.img.src = N.getAttribute("src")
               }
               this.img && this.img.complete && O && (this._timer = O.jDelay(100))
           },
           destroy: function () {
               this._unbind();
               this._cleanup();
               this.ready = false;
               return this
           },
           isReady: function () {
               var M = this.img;
               return (M.naturalWidth) ? (M.naturalWidth > 0) : (M.readyState) ? ("complete" == M.readyState) : M.width > 0
           },
           jGetSize: function () {
               return this.size || (this.size = {
                   width: this.img.naturalWidth || this.img.width,
                   height: this.img.naturalHeight || this.img.height
               })
           }
       })
   })(y);
   (function (K) {
       if (!K) {
           throw "MagicJS not found"
       }
       if (K.FX) {
           return
       }
       var J = K.$;
       K.FX = new K.Class({
           init: function (M, L) {
               var N;
               this.el = K.$(M);
               this.options = K.extend(this.options, L);
               this.timer = false;
               this.easeFn = this.cubicBezierAtTime;
               N = K.FX.Transition[this.options.transition] || this.options.transition;
               if ("function" === K.jTypeOf(N)) {
                   this.easeFn = N
               } else {
                   this.cubicBezier = this.parseCubicBezier(N) || this.parseCubicBezier("ease")
               }
               if ("string" == K.jTypeOf(this.options.cycles)) {
                   this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
               }
           },
           options: {
               fps: 60,
               duration: 600,
               transition: "ease",
               cycles: 1,
               direction: "normal",
               onStart: K.$F,
               onComplete: K.$F,
               onBeforeRender: K.$F,
               onAfterRender: K.$F,
               forceAnimation: false,
               roundCss: false
           },
           styles: null,
           cubicBezier: null,
           easeFn: null,
           setTransition: function (L) {
               this.options.transition = L;
               L = K.FX.Transition[this.options.transition] || this.options.transition;
               if ("function" === K.jTypeOf(L)) {
                   this.easeFn = L
               } else {
                   this.easeFn = this.cubicBezierAtTime;
                   this.cubicBezier = this.parseCubicBezier(L) || this.parseCubicBezier("ease")
               }
           },
           start: function (N) {
               var L = /\%$/,
                   M;
               this.styles = N || {};
               this.cycle = 0;
               this.state = 0;
               this.curFrame = 0;
               this.pStyles = {};
               this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
               this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
               for (M in this.styles) {
                   L.test(this.styles[M][0]) && (this.pStyles[M] = true);
                   if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                       this.styles[M].reverse()
                   }
               }
               this.startTime = K.now();
               this.finishTime = this.startTime + this.options.duration;
               this.options.onStart.call();
               if (0 === this.options.duration) {
                   this.render(1);
                   this.options.onComplete.call()
               } else {
                   this.loopBind = this.loop.jBind(this);
                   if (!this.options.forceAnimation && K.browser.features.requestAnimationFrame) {
                       this.timer = K.browser.requestAnimationFrame.call(window, this.loopBind)
                   } else {
                       this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                   }
               }
               return this
           },
           stopAnimation: function () {
               if (this.timer) {
                   if (!this.options.forceAnimation && K.browser.features.requestAnimationFrame && K.browser.cancelAnimationFrame) {
                       K.browser.cancelAnimationFrame.call(window, this.timer)
                   } else {
                       clearInterval(this.timer)
                   }
                   this.timer = false
               }
           },
           stop: function (L) {
               L = K.defined(L) ? L : false;
               this.stopAnimation();
               if (L) {
                   this.render(1);
                   this.options.onComplete.jDelay(10)
               }
               return this
           },
           calc: function (N, M, L) {
               N = parseFloat(N);
               M = parseFloat(M);
               return (M - N) * L + N
           },
           loop: function () {
               var M = K.now(),
                   L = (M - this.startTime) / this.options.duration,
                   N = Math.floor(L);
               if (M >= this.finishTime && N >= this.options.cycles) {
                   this.stopAnimation();
                   this.render(1);
                   this.options.onComplete.jDelay(10);
                   return this
               }
               if (this.alternate && this.cycle < N) {
                   for (var O in this.styles) {
                       this.styles[O].reverse()
                   }
               }
               this.cycle = N;
               if (!this.options.forceAnimation && K.browser.features.requestAnimationFrame) {
                   this.timer = K.browser.requestAnimationFrame.call(window, this.loopBind)
               }
               this.render((this.continuous ? N : 0) + this.easeFn(L % 1))
           },
           render: function (L) {
               var M = {},
                   O = L;
               for (var N in this.styles) {
                   if ("opacity" === N) {
                       M[N] = Math.round(this.calc(this.styles[N][0], this.styles[N][1], L) * 100) / 100
                   } else {
                       M[N] = this.calc(this.styles[N][0], this.styles[N][1], L);
                       this.pStyles[N] && (M[N] += "%")
                   }
               }
               this.options.onBeforeRender(M, this.el);
               this.set(M);
               this.options.onAfterRender(M, this.el)
           },
           set: function (L) {
               return this.el.jSetCss(L)
           },
           parseCubicBezier: function (L) {
               var M, N = null;
               if ("string" !== K.jTypeOf(L)) {
                   return null
               }
               switch (L) {
               case "linear":
                   N = J([0, 0, 1, 1]);
                   break;
               case "ease":
                   N = J([0.25, 0.1, 0.25, 1]);
                   break;
               case "ease-in":
                   N = J([0.42, 0, 1, 1]);
                   break;
               case "ease-out":
                   N = J([0, 0, 0.58, 1]);
                   break;
               case "ease-in-out":
                   N = J([0.42, 0, 0.58, 1]);
                   break;
               case "easeInSine":
                   N = J([0.47, 0, 0.745, 0.715]);
                   break;
               case "easeOutSine":
                   N = J([0.39, 0.575, 0.565, 1]);
                   break;
               case "easeInOutSine":
                   N = J([0.445, 0.05, 0.55, 0.95]);
                   break;
               case "easeInQuad":
                   N = J([0.55, 0.085, 0.68, 0.53]);
                   break;
               case "easeOutQuad":
                   N = J([0.25, 0.46, 0.45, 0.94]);
                   break;
               case "easeInOutQuad":
                   N = J([0.455, 0.03, 0.515, 0.955]);
                   break;
               case "easeInCubic":
                   N = J([0.55, 0.055, 0.675, 0.19]);
                   break;
               case "easeOutCubic":
                   N = J([0.215, 0.61, 0.355, 1]);
                   break;
               case "easeInOutCubic":
                   N = J([0.645, 0.045, 0.355, 1]);
                   break;
               case "easeInQuart":
                   N = J([0.895, 0.03, 0.685, 0.22]);
                   break;
               case "easeOutQuart":
                   N = J([0.165, 0.84, 0.44, 1]);
                   break;
               case "easeInOutQuart":
                   N = J([0.77, 0, 0.175, 1]);
                   break;
               case "easeInQuint":
                   N = J([0.755, 0.05, 0.855, 0.06]);
                   break;
               case "easeOutQuint":
                   N = J([0.23, 1, 0.32, 1]);
                   break;
               case "easeInOutQuint":
                   N = J([0.86, 0, 0.07, 1]);
                   break;
               case "easeInExpo":
                   N = J([0.95, 0.05, 0.795, 0.035]);
                   break;
               case "easeOutExpo":
                   N = J([0.19, 1, 0.22, 1]);
                   break;
               case "easeInOutExpo":
                   N = J([1, 0, 0, 1]);
                   break;
               case "easeInCirc":
                   N = J([0.6, 0.04, 0.98, 0.335]);
                   break;
               case "easeOutCirc":
                   N = J([0.075, 0.82, 0.165, 1]);
                   break;
               case "easeInOutCirc":
                   N = J([0.785, 0.135, 0.15, 0.86]);
                   break;
               case "easeInBack":
                   N = J([0.6, -0.28, 0.735, 0.045]);
                   break;
               case "easeOutBack":
                   N = J([0.175, 0.885, 0.32, 1.275]);
                   break;
               case "easeInOutBack":
                   N = J([0.68, -0.55, 0.265, 1.55]);
                   break;
               default:
                   L = L.replace(/\s/g, "");
                   if (L.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                       N = L.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                       for (M = N.length - 1; M >= 0; M--) {
                           N[M] = parseFloat(N[M])
                       }
                   }
               }
               return J(N)
           },
           cubicBezierAtTime: function (X) {
               var L = 0,
                   W = 0,
                   T = 0,
                   Y = 0,
                   V = 0,
                   R = 0,
                   S = this.options.duration;
               function Q(Z) {
                   return ((L * Z + W) * Z + T) * Z
               }
               function P(Z) {
                   return ((Y * Z + V) * Z + R) * Z
               }
               function N(Z) {
                   return (3 * L * Z + 2 * W) * Z + T
               }
               function U(Z) {
                   return 1 / (200 * Z)
               }
               function M(Z, aa) {
                   return P(O(Z, aa))
               }
               function O(ag, ah) {
                   var af, ae, ad, aa, Z, ac;
                   function ab(ai) {
                       if (ai >= 0) {
                           return ai
                       } else {
                           return 0 - ai
                       }
                   }
                   for (ad = ag, ac = 0; ac < 8; ac++) {
                       aa = Q(ad) - ag;
                       if (ab(aa) < ah) {
                           return ad
                       }
                       Z = N(ad);
                       if (ab(Z) < 0.000001) {
                           break
                       }
                       ad = ad - aa / Z
                   }
                   af = 0;
                   ae = 1;
                   ad = ag;
                   if (ad < af) {
                       return af
                   }
                   if (ad > ae) {
                       return ae
                   }
                   while (af < ae) {
                       aa = Q(ad);
                       if (ab(aa - ag) < ah) {
                           return ad
                       }
                       if (ag > aa) {
                           af = ad
                       } else {
                           ae = ad
                       }
                       ad = (ae - af) * 0.5 + af
                   }
                   return ad
               }
               T = 3 * this.cubicBezier[0];
               W = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - T;
               L = 1 - T - W;
               R = 3 * this.cubicBezier[1];
               V = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - R;
               Y = 1 - R - V;
               return M(X, U(S))
           }
       });
       K.FX.Transition = {
           linear: "linear",
           sineIn: "easeInSine",
           sineOut: "easeOutSine",
           expoIn: "easeInExpo",
           expoOut: "easeOutExpo",
           quadIn: "easeInQuad",
           quadOut: "easeOutQuad",
           cubicIn: "easeInCubic",
           cubicOut: "easeOutCubic",
           backIn: "easeInBack",
           backOut: "easeOutBack",
           elasticIn: function (M, L) {
               L = L || [];
               return Math.pow(2, 10 * --M) * Math.cos(20 * M * Math.PI * (L[0] || 1) / 3)
           },
           elasticOut: function (M, L) {
               return 1 - K.FX.Transition.elasticIn(1 - M, L)
           },
           bounceIn: function (N) {
               for (var M = 0, L = 1; 1; M += L, L /= 2) {
                   if (N >= (7 - 4 * M) / 11) {
                       return L * L - Math.pow((11 - 6 * M - 11 * N) / 4, 2)
                   }
               }
           },
           bounceOut: function (L) {
               return 1 - K.FX.Transition.bounceIn(1 - L)
           },
           none: function (L) {
               return 0
           }
       }
   })(y);
   (function (K) {
       if (!K) {
           throw "MagicJS not found"
       }
       if (K.PFX) {
           return
       }
       var J = K.$;
       K.PFX = new K.Class(K.FX, {
           init: function (L, M) {
               this.el_arr = L;
               this.options = K.extend(this.options, M);
               this.timer = false;
               this.$parent.init()
           },
           start: function (P) {
               var L = /\%$/,
                   O, N, M = P.length;
               this.styles_arr = P;
               this.pStyles_arr = new Array(M);
               for (N = 0; N < M; N++) {
                   this.pStyles_arr[N] = {};
                   for (O in P[N]) {
                       L.test(P[N][O][0]) && (this.pStyles_arr[N][O] = true);
                       if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                           this.styles_arr[N][O].reverse()
                       }
                   }
               }
               this.$parent.start({});
               return this
           },
           render: function (L) {
               for (var M = 0; M < this.el_arr.length; M++) {
                   this.el = K.$(this.el_arr[M]);
                   this.styles = this.styles_arr[M];
                   this.pStyles = this.pStyles_arr[M];
                   this.$parent.render(L)
               }
           }
       })
   })(y);
   (function (K) {
       if (!K) {
           throw "MagicJS not found";
           return
       }
       if (K.Tooltip) {
           return
       }
       var J = K.$;
       K.Tooltip = function (M, N) {
           var L = this.tooltip = K.$new("div", null, {
               position: "absolute",
               "z-index": 999
           }).jAddClass("MagicToolboxTooltip");
           K.$(M).jAddEvent("mouseover", function () {
               L.jAppendTo(document.body)
           });
           K.$(M).jAddEvent("mouseout", function () {
               L.jRemove()
           });
           K.$(M).jAddEvent("mousemove", function (S) {
               var U = 20,
                   R = K.$(S).jGetPageXY(),
                   Q = L.jGetSize(),
                   P = K.$(window).jGetSize(),
                   T = K.$(window).jGetScroll();
               function O(X, V, W) {
                   return (W < (X - V) / 2) ? W : ((W > (X + V) / 2) ? (W - V) : (X - V) / 2)
               }
               L.jSetCss({
                   left: T.x + O(P.width, Q.width + 2 * U, R.x - T.x) + U,
                   top: T.y + O(P.height, Q.height + 2 * U, R.y - T.y) + U
               })
           });
           this.text(N)
       };
       K.Tooltip.prototype.text = function (L) {
           this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
           this.tooltip.append(document.createTextNode(L))
       }
   })(y);
   (function (K) {
       if (!K) {
           throw "MagicJS not found";
           return
       }
       if (K.MessageBox) {
           return
       }
       var J = K.$;
       K.Message = function (O, N, M, L) {
           this.hideTimer = null;
           this.messageBox = K.$new("span", null, {
               position: "absolute",
               "z-index": 999,
               visibility: "hidden",
               opacity: 0.8
           }).jAddClass(L || "").jAppendTo(M || document.body);
           this.setMessage(O);
           this.show(N)
       };
       K.Message.prototype.show = function (L) {
           this.messageBox.show();
           this.hideTimer = this.hide.jBind(this).jDelay(K.ifndef(L, 5000))
       };
       K.Message.prototype.hide = function (L) {
           clearTimeout(this.hideTimer);
           this.hideTimer = null;
           if (this.messageBox && !this.hideFX) {
               this.hideFX = new y.FX(this.messageBox, {
                   duration: K.ifndef(L, 500),
                   onComplete: function () {
                       this.messageBox.kill();
                       delete this.messageBox;
                       this.hideFX = null
                   }.jBind(this)
               }).start({
                   opacity: [this.messageBox.jGetCss("opacity"), 0]
               })
           }
       };
       K.Message.prototype.setMessage = function (L) {
           this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
           this.messageBox.append(document.createTextNode(L))
       }
   })(y);
   (function (K) {
       if (!K) {
           throw "MagicJS not found"
       }
       if (K.Options) {
           return
       }
       var N = K.$,
           J = null,
           R = {
               "boolean": 1,
               array: 2,
               number: 3,
               "function": 4,
               string: 100
           },
           L = {
               "boolean": function (U, T, S) {
                   if ("boolean" != K.jTypeOf(T)) {
                       if (S || "string" != K.jTypeOf(T)) {
                           return false
                       } else {
                           if (!/^(true|false)$/.test(T)) {
                               return false
                           } else {
                               T = T.jToBool()
                           }
                       }
                   }
                   if (U.hasOwnProperty("enum") && !N(U["enum"]).contains(T)) {
                       return false
                   }
                   J = T;
                   return true
               },
               string: function (U, T, S) {
                   if ("string" !== K.jTypeOf(T)) {
                       return false
                   } else {
                       if (U.hasOwnProperty("enum") && !N(U["enum"]).contains(T)) {
                           return false
                       } else {
                           J = "" + T;
                           return true
                       }
                   }
               },
               number: function (V, U, T) {
                   var S = false,
                       X = /%$/,
                       W = (K.jTypeOf(U) == "string" && X.test(U));
                   if (T && !"number" == typeof U) {
                       return false
                   }
                   U = parseFloat(U);
                   if (isNaN(U)) {
                       return false
                   }
                   if (isNaN(V.minimum)) {
                       V.minimum = Number.NEGATIVE_INFINITY
                   }
                   if (isNaN(V.maximum)) {
                       V.maximum = Number.POSITIVE_INFINITY
                   }
                   if (V.hasOwnProperty("enum") && !N(V["enum"]).contains(U)) {
                       return false
                   }
                   if (V.minimum > U || U > V.maximum) {
                       return false
                   }
                   J = W ? (U + "%") : U;
                   return true
               },
               array: function (V, T, S) {
                   if ("string" === K.jTypeOf(T)) {
                       try {
                           T = window.JSON.parse(T)
                       } catch (U) {
                           return false
                       }
                   }
                   if (K.jTypeOf(T) === "array") {
                       J = T;
                       return true
                   } else {
                       return false
                   }
               },
               "function": function (U, T, S) {
                   if (K.jTypeOf(T) === "function") {
                       J = T;
                       return true
                   } else {
                       return false
                   }
               }
           },
           M = function (X, W, T) {
               var V;
               V = X.hasOwnProperty("oneOf") ? X.oneOf : [X];
               if ("array" != K.jTypeOf(V)) {
                   return false
               }
               for (var U = 0, S = V.length - 1; U <= S; U++) {
                   if (L[V[U].type](V[U], W, T)) {
                       return true
                   }
               }
               return false
           },
           P = function (X) {
               var V, U, W, S, T;
               if (X.hasOwnProperty("oneOf")) {
                   S = X.oneOf.length;
                   for (V = 0; V < S; V++) {
                       for (U = V + 1; U < S; U++) {
                           if (R[X.oneOf[V]["type"]] > R[X.oneOf[U].type]) {
                               T = X.oneOf[V];
                               X.oneOf[V] = X.oneOf[U];
                               X.oneOf[U] = T
                           }
                       }
                   }
               }
               return X
           },
           Q = function (V) {
               var U;
               U = V.hasOwnProperty("oneOf") ? V.oneOf : [V];
               if ("array" != K.jTypeOf(U)) {
                   return false
               }
               for (var T = U.length - 1; T >= 0; T--) {
                   if (!U[T].type || !R.hasOwnProperty(U[T].type)) {
                       return false
                   }
                   if (K.defined(U[T]["enum"])) {
                       if ("array" !== K.jTypeOf(U[T]["enum"])) {
                           return false
                       }
                       for (var S = U[T]["enum"].length - 1; S >= 0; S--) {
                           if (!L[U[T].type]({
                                   type: U[T].type
                               }, U[T]["enum"][S], true)) {
                               return false
                           }
                       }
                   }
               }
               if (V.hasOwnProperty("default") && !M(V, V["default"], true)) {
                   return false
               }
               return true
           },
           O = function (S) {
               this.schema = {};
               this.options = {};
               this.parseSchema(S)
           };
       K.extend(O.prototype, {
           parseSchema: function (U) {
               var T, S, V;
               for (T in U) {
                   if (!U.hasOwnProperty(T)) {
                       continue
                   }
                   S = (T + "").jTrim().jCamelize();
                   if (!this.schema.hasOwnProperty(S)) {
                       this.schema[S] = P(U[T]);
                       if (!Q(this.schema[S])) {
                           throw "Incorrect definition of the '" + T + "' parameter in " + U
                       }
                       this.options[S] = undefined
                   }
               }
           },
           set: function (T, S) {
               T = (T + "").jTrim().jCamelize();
               if (K.jTypeOf(S) == "string") {
                   S = S.jTrim()
               }
               if (this.schema.hasOwnProperty(T)) {
                   J = S;
                   if (M(this.schema[T], S)) {
                       this.options[T] = J
                   }
                   J = null
               }
           },
           get: function (S) {
               S = (S + "").jTrim().jCamelize();
               if (this.schema.hasOwnProperty(S)) {
                   return K.defined(this.options[S]) ? this.options[S] : this.schema[S]["default"]
               }
           },
           fromJSON: function (T) {
               for (var S in T) {
                   this.set(S, T[S])
               }
           },
           getJSON: function () {
               var T = K.extend({}, this.options);
               for (var S in T) {
                   if (undefined === T[S] && undefined !== this.schema[S]["default"]) {
                       T[S] = this.schema[S]["default"]
                   }
               }
               return T
           },
           fromString: function (S) {
               N(S.split(";")).jEach(N(function (T) {
                   T = T.split(":");
                   this.set(T.shift().jTrim(), T.join(":"))
               }).jBind(this))
           },
           exists: function (S) {
               S = (S + "").jTrim().jCamelize();
               return this.schema.hasOwnProperty(S)
           },
           isset: function (S) {
               S = (S + "").jTrim().jCamelize();
               return this.exists(S) && K.defined(this.options[S])
           },
           jRemove: function (S) {
               S = (S + "").jTrim().jCamelize();
               if (this.exists(S)) {
                   delete this.options[S];
                   delete this.schema[S]
               }
           }
       });
       K.Options = O
   })(y);
   var g = z.$;
   if (typeof Object.assign !== "function") {
       Object.assign = function (M) {
           if (M == null) {
               throw new TypeError("Cannot convert undefined or null to object")
           }
           M = Object(M);
           for (var J = 1; J < arguments.length; J++) {
               var L = arguments[J];
               if (L != null) {
                   for (var K in L) {
                       if (Object.prototype.hasOwnProperty.call(L, K)) {
                           M[K] = L[K]
                       }
                   }
               }
           }
           return M
       }
   }
   if (!z.browser.cssTransform) {
       z.browser.cssTransform = z.normalizeCSS("transform").dashize()
   }
   var o = {
       zoomOn: {
           type: "string",
           "enum": ["click", "hover"],
           "default": "hover"
       },
       zoomMode: {
           oneOf: [{
               type: "string",
               "enum": ["zoom", "magnifier", "preview", "off"],
               "default": "zoom"
           }, {
               type: "boolean",
               "enum": [false]
           }],
           "default": "zoom"
       },
       zoomWidth: {
           oneOf: [{
               type: "string",
               "enum": ["auto"]
           }, {
               type: "number",
               minimum: 1
           }],
           "default": "auto"
       },
       zoomHeight: {
           oneOf: [{
               type: "string",
               "enum": ["auto"]
           }, {
               type: "number",
               minimum: 1
           }],
           "default": "auto"
       },
       zoomPosition: {
           type: "string",
           "default": "right"
       },
       zoomDistance: {
           type: "number",
           minimum: 0,
           "default": 15
       },
       zoomCaption: {
           oneOf: [{
               type: "string",
               "enum": ["bottom", "top", "off"],
               "default": "off"
           }, {
               type: "boolean",
               "enum": [false]
           }],
           "default": "off"
       },
       hint: {
           oneOf: [{
               type: "string",
               "enum": ["once", "always", "off"]
           }, {
               type: "boolean",
               "enum": [false]
           }],
           "default": "once"
       },
       smoothing: {
           type: "boolean",
           "default": true
       },
       upscale: {
           type: "boolean",
           "default": true
       },
       variableZoom: {
           type: "boolean",
           "default": false
       },
       lazyZoom: {
           type: "boolean",
           "default": false
       },
       autostart: {
           type: "boolean",
           "default": true
       },
       rightClick: {
           type: "boolean",
           "default": false
       },
       transitionEffect: {
           type: "boolean",
           "default": true
       },
       selectorTrigger: {
           type: "string",
           "enum": ["click", "hover"],
           "default": "click"
       },
       cssClass: {
           type: "string"
       },
       forceTouch: {
           type: "boolean",
           "default": false
       },
       textHoverZoomHint: {
           type: "string",
           "default": "Hover to zoom"
       },
       textClickZoomHint: {
           type: "string",
           "default": "Click to zoom"
       },
       textBtnNext: {
           type: "string",
           "default": "Next"
       },
       textBtnPrev: {
           type: "string",
           "default": "Previous"
       },
   };
   var k = {
       zoomMode: {
           oneOf: [{
               type: "string",
               "enum": ["zoom", "magnifier", "off"],
               "default": "zoom"
           }, {
               type: "boolean",
               "enum": [false]
           }],
           "default": "zoom"
       },
       textHoverZoomHint: {
           type: "string",
           "default": "Touch to zoom"
       },
       textClickZoomHint: {
           type: "string",
           "default": "Double tap or pinch to zoom"
       }
   };
   var n = "MagicZoom";
   var E = "mz";
   var b = 20;
   var A = ["onZoomReady", "onUpdate", "onZoomIn", "onZoomOut", "onExpandOpen", "onExpandClose"];
   var D = 600;
   var B = 1.1;
   var l = 0.5;
   var t;
   var p = {};
   var G = g([]);
   var I;
   var e = window.devicePixelRatio || 1;
   var H;
   var x = true;
   var f = z.browser.features.perspective ? "translate3d(" : "translate(";
   var C = z.browser.features.perspective ? ",0)" : ")";
   var m = null;
   var v;
   var q = (function () {
       var K, N, M, L, J;
      // J = ["2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigmtaac!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5.zkvz#jkma|ozga`4.`a`k5,0Coigm.Taac(z|ojk5.z|gob.xk|}ga`2!o0", "#ff0000", 11, "normal", "", "center", "100%"];
       return J
   })();
   var r = function () {
       return "mgctlbxN$MZ" + "".toUpperCase() + " mgctlbxV$" + "v5.3.7".replace("v", "") + " mgctlbxL$" + "t".toUpperCase() + ((window.mgctlbx$Pltm && z.jTypeOf(window.mgctlbx$Pltm) === "string") ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
   };
   function w(L) {
       var K, J;
       K = "";
       for (J = 0; J < L.length; J++) {
           K += String.fromCharCode(14 ^ L.charCodeAt(J))
       }
       return K
   }
   function h(L) {
       var K = [],
           J = null;
       (L && (J = g(L))) && (K = G.filter(function (M) {
           return M.placeholder === J
       }));
       return K.length ? K[0] : null
   }
   function a(L) {
       var K = g(window).jGetSize();
       var J = g(window).jGetScroll();
       L = L || 0;
       return {
           left: L,
           right: K.width - L,
           top: L,
           bottom: K.height - L,
           x: J.x,
           y: J.y
       }
   }
   function d(J) {
       return Object.assign({}, J, {
           type: J.type,
           pageX: J.pageX,
           pageY: J.pageY,
           screenX: J.screenX,
           screenY: J.screenY,
           clientX: J.clientX,
           clientY: J.clientY,
           cloned: true
       })
   }
   function s() {
       var L = z.$A(arguments);
       var K = L.shift();
       var J = p[K];
       if (J) {
           for (var M = 0; M < J.length; M++) {
               J[M].apply(null, L)
           }
       }
   }
   function F() {
       var N = arguments[0],
           J, M, K = [];
       try {
           do {
               M = N.tagName;
               if (/^[A-Za-z]*$/.test(M)) {
                   if (J = N.getAttribute("id")) {
                       if (/^[A-Za-z][-A-Za-z0-9_]*/.test(J)) {
                           M += "#" + J
                       }
                   }
                   K.push(M)
               }
               N = N.parentNode
           } while (N && N !== document.documentElement);
           K = K.reverse();
           z.addCSS(K.join(" ") + "> .mz-figure > img", {
               transition: "none",
               transform: "none"
           }, "mz-runtime-css", true);
           z.addCSS(K.join(" ") + ":not(.mz-no-rt-width-css)> .mz-figure:not(.mz-no-rt-width-css) > img", {
               width: "100% !important;"
           }, "mz-runtime-css", true)
       } catch (L) {}
   }
   function u() {
       var K = null,
           L = null,
           J = function () {
               window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
               window.dispatchEvent(new Event("resize"))
           };
       L = setInterval(function () {
           var O = window.orientation === 90 || window.orientation === -90;
           var N = window.innerHeight;
           var M = (O ? screen.availWidth : screen.availHeight) * 0.85;
           if ((K === null || K === false) && ((O && N < M) || (!O && N < M))) {
               K = true;
               J()
           } else {
               if ((K === null || K === true) && ((O && N > M) || (!O && N > M))) {
                   K = false;
                   J()
               }
           }
       }, 250);
       return L
   }
   function c() {
       z.addCSS(".magic-hidden-wrapper, .magic-temporary-img", {
           display: "block !important",
           "min-height": "0 !important",
           "min-width": "0 !important",
           "max-height": "none !important",
           "max-width": "none !important",
           width: "10px !important",
           height: "10px !important",
           position: "absolute !important",
           top: "-10000px !important",
           left: "0 !important",
           overflow: "hidden !important",
           "-webkit-transform": "none !important",
           transform: "none !important",
           "-webkit-transition": "none !important",
           transition: "none !important"
       }, "magiczoom-reset-css");
       z.addCSS(".magic-temporary-img img, .magic-temporary-img picture", {
           display: "inline-block !important",
           border: "0 !important",
           padding: "0 !important",
           "min-height": "0 !important",
           "min-width": "0 !important",
           "max-height": "none !important",
           "max-width": "none !important",
           "-webkit-transform": "none !important",
           transform: "none !important",
           "-webkit-transition": "none !important",
           transition: "none !important"
       }, "magiczoom-reset-css");
       z.addCSS(".magic-temporary-img picture, .magic-temporary-img picture > img", {
           width: "auto !important",
           height: "auto !important"
       }, "magiczoom-reset-css");
       if (z.browser.androidBrowser) {
           z.addCSS(".mobile-magic .mz-expand .mz-expand-bg", {
               display: "none !important"
           }, "magiczoom-reset-css")
       }
       if (z.browser.androidBrowser && (z.browser.uaName !== "chrome" || z.browser.uaVersion === 44)) {
           z.addCSS(".mobile-magic .mz-zoom-window.mz-magnifier, .mobile-magic .mz-zoom-window.mz-magnifier:before", {
               "border-radius": "0 !important"
           }, "magiczoom-reset-css")
       }
   }
   var j = function (M, N, K, L, J) {
       this.small = {
           src: null,
           url: null,
           dppx: 1,
           node: null,
           state: 0,
           size: {
               width: 0,
               height: 0
           },
           loaded: false
       };
       this.zoom = {
           src: null,
           url: null,
           dppx: 1,
           node: null,
           state: 0,
           size: {
               width: 0,
               height: 0
           },
           loaded: false
       };
       if (z.jTypeOf(M) === "object") {
           this.small = M
       } else {
           if (z.jTypeOf(M) === "string") {
               this.small.url = z.getAbsoluteURL(M)
           }
       }
       if (z.jTypeOf(N) === "object") {
           this.zoom = N
       } else {
           if (z.jTypeOf(N) === "string") {
               this.zoom.url = z.getAbsoluteURL(N)
           }
       }
       this.alt = "";
       this.caption = K;
       this.options = L;
       this.origin = J;
       this.callback = null;
       this.link = null;
       this.node = null
   };
   j.prototype = {
       parseNode: function (L, K, J) {
           var M = L.byTag("img")[0];
           if (J) {
               this.small.node = M || z.$new("img").jAppendTo(L)
           }
           if (e > 1) {
               this.small.url = L.getAttribute("data-image-2x");
               if (this.small.url) {
                   this.small.dppx = 2
               }
               this.zoom.url = L.getAttribute("data-zoom-image-2x");
               if (this.zoom.url) {
                   this.zoom.dppx = 2
               }
           }
           this.small.src = L.getAttribute("data-image") || L.getAttribute("rev") || (M ? M.currentSrc || M.getAttribute("src") : null);
           if (this.small.src) {
               this.small.src = z.getAbsoluteURL(this.small.src)
           }
           this.small.url = this.small.url || this.small.src;
           if (this.small.url) {
               this.small.url = z.getAbsoluteURL(this.small.url)
           }
           this.zoom.src = L.getAttribute("data-zoom-image") || L.getAttribute("href");
           if (this.zoom.src) {
               this.zoom.src = z.getAbsoluteURL(this.zoom.src)
           }
           this.zoom.url = this.zoom.url || this.zoom.src;
           if (this.zoom.url) {
               this.zoom.url = z.getAbsoluteURL(this.zoom.url)
           }
           this.caption = L.getAttribute("data-caption") || L.getAttribute("title") || K;
           this.link = L.getAttribute("data-link");
           this.origin = L;
           if (M) {
               this.alt = M.getAttribute("alt") || ""
           }
           return this
       },
       loadImg: function (J) {
           var K = null;
           if (arguments.length > 1 && z.jTypeOf(arguments[1]) === "function") {
               K = arguments[1]
           }
           if (this[J].state !== 0) {
               if (this[J].loaded) {
                   this.onload(K)
               }
               return
           }
           if (this[J].url && this[J].node && !this[J].node.getAttribute("src") && !this[J].node.getAttribute("srcset")) {
               this[J].node.setAttribute("src", this[J].url)
           }
           this[J].state = 1;
           new z.ImageLoader(this[J].node || this[J].url, {
               oncomplete: g(function (L) {
                   this[J].loaded = true;
                   this[J].state = L.ready ? 2 : -1;
                   if (L.ready) {
                       if (this[J].size.width === 0 && this[J].size.height === 0) {
                           this[J].size = L.jGetSize()
                       }
                       if (!this[J].node) {
                           this[J].node = g(L.img);
                           this[J].node.getAttribute("style");
                           this[J].node.removeAttribute("style");
                           this[J].node.alt = this.alt;
                           this[J].size.width /= this[J].dppx;
                           this[J].size.height /= this[J].dppx
                       } else {
                           this[J].node.jSetCss({
                               maxWidth: this[J].size.width,
                               maxHeight: this[J].size.height
                           });
                           if (this[J].node.currentSrc && this[J].node.currentSrc !== this[J].node.src) {
                               this[J].url = this[J].node.currentSrc
                           } else {
                               if (z.getAbsoluteURL(this[J].node.getAttribute("src") || "") !== this[J].url) {
                                   this[J].node.setAttribute("src", this[J].url)
                               }
                           }
                       }
                   }
                   this.onload(K)
               }).jBind(this)
           })
       },
       loadSmall: function () {
           this.loadImg("small", arguments[0])
       },
       loadZoom: function () {
           this.loadImg("zoom", arguments[0])
       },
       load: function () {
           this.callback = null;
           if (arguments.length > 0 && z.jTypeOf(arguments[0]) === "function") {
               this.callback = arguments[0]
           }
           this.loadSmall();
           this.loadZoom()
       },
       onload: function (J) {
           if (J) {
               J.call(null, this)
           }
           if (this.callback && this.small.loaded && this.zoom.loaded) {
               this.callback.call(null, this);
               this.callback = null;
               return
           }
       },
       loaded: function () {
           return (this.small.loaded && this.zoom.loaded)
       },
       ready: function () {
           return (this.small.state === 2 && this.zoom.state === 2)
       },
       getURL: function (K) {
           var J = K === "small" ? "zoom" : "small";
           if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
               return this[K].url
           } else {
               if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                   return this[J].url
               }
           }
           return null
       },
       getNode: function (K) {
           var J = K === "small" ? "zoom" : "small";
           if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
               return this[K].node
           } else {
               if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                   return this[J].node
               }
           }
           return null
       },
       jGetSize: function (K) {
           var J = K === "small" ? "zoom" : "small";
           if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
               return this[K].size
           } else {
               if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                   return this[J].size
               }
           }
           return {
               width: 0,
               height: 0
           }
       },
       setSize: function (K, J) {
           this[K].size = J
       },
       getRatio: function (K) {
           var J = K === "small" ? "zoom" : "small";
           if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
               return this[K].dppx
           } else {
               if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                   return this[J].dppx
               }
           }
           return 1
       },
       setCurNode: function (J) {
           this.node = this.getNode(J)
       }
   };
   var i = function (K, J) {
       this.options = new z.Options(o);
       this.option = g(function () {
           if (arguments.length > 1) {
               return this.set(arguments[0], arguments[1])
           }
           return this.get(arguments[0])
       }).jBind(this.options);
       this.touchOptions = new z.Options(k);
       this.additionalImages = [];
       this.image = null;
       this.primaryImage = null;
       this.placeholder = g(K).jAddEvent("dragstart selectstart click", function (L) {
           L.stop()
       });
       this.id = null;
       this.node = null;
       this.stubNode = null;
       this.originalImg = null;
       this.originalImgSrc = null;
       this.originalTitle = null;
       this.normalSize = {
           width: 0,
           height: 0
       };
       this.size = {
           width: 0,
           height: 0
       };
       this.zoomSize = {
           width: 0,
           height: 0
       };
       this.zoomSizeOrigin = {
           width: 0,
           height: 0
       };
       this.boundaries = {
           top: 0,
           left: 0,
           bottom: 0,
           right: 0
       };
       this.ready = false;
       this.expanded = false;
       this.activateTimer = null;
       this.resizeTimer = null;
       this.resizeCallback = g(function () {
           if (this.expanded) {
               if (v) {
                   this.expandBox.jSetCss({
                       height: window.innerHeight,
                       top: Math.abs(v.getBoundingClientRect().top)
                   })
               }
               this.image.node.jSetCss({
                   "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
               });
               this.image.node.jSetCss({
                   "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
               })
           }
           this.reflowZoom(arguments[0])
       }).jBind(this);
       this.onResize = g(function (L) {
           clearTimeout(this.resizeTimer);
           this.resizeTimer = g(this.resizeCallback).jDelay(10, L.type === "scroll")
       }).jBindAsEvent(this);
       this.onHistoryStateChange = g(function (L) {
           if (!L.state && this.expanded) {
               this.close()
           }
           if (L.state && L.state.mzId === this.id && !this.expanded) {
               this.expand()
           }
       }).jBindAsEvent(this);
       if (r) {
           I.append(z.$new("div", {}, {
               display: "none",
               visibility: "hidden"
           }).append(document.createTextNode(r)));
           r = undefined
       }
       this.lens = null;
       this.zoomBox = null;
       this.hint = null;
       this.hintMessage = null;
       this.hintRuns = 0;
       this.mobileZoomHint = true;
       this.loadingBox = null;
       this.loadTimer = null;
       this.thumb = null;
       this.expandBox = null;
       this.expandBg = null;
       this.expandCaption = null;
       this.expandStage = null;
       this.expandImageStage = null;
       this.expandFigure = null;
       this.navControlsLayer = null;
       this.expandNav = null;
       this.expandThumbs = null;
       this.expandGallery = [];
       this.buttons = {};
       this.startAttempts = 0;
       this.startTimer = null;
       this.start(J)
   };
   i.prototype = {
       loadOptions: function (J) {
           this.options.fromJSON(window[E + "Options"] || {});
           this.options.fromString(this.placeholder.getAttribute("data-options") || "");
           if (!z.browser.touchScreen) {
               this.option("forceTouch", false)
           }
           if (z.browser.mobile || this.option("forceTouch")) {
               this.options.fromJSON(this.touchOptions.getJSON());
               this.options.fromJSON(window[E + "MobileOptions"] || {});
               this.options.fromString(this.placeholder.getAttribute("data-mobile-options") || "")
           }
           if (z.jTypeOf(J) === "string") {
               this.options.fromString(J || "")
           } else {
               this.options.fromJSON(J || {})
           }
           if (this.option("cssClass")) {
               this.option("cssClass", this.option("cssClass").replace(",", " "))
           }
           if (this.option("zoomCaption") === false) {
               this.option("zoomCaption", "off")
           }
           if (this.option("hint") === false) {
               this.option("hint", "off")
           }
           switch (this.option("hint")) {
           case "off":
               this.hintRuns = 0;
               break;
           case "always":
               this.hintRuns = Infinity;
               break;
           case "once":
           default:
               this.hintRuns = 2;
               break
           }
           if (this.option("zoomMode") === "off") {
               this.option("zoomMode", false)
           }
           if (this.option("expand") === "off") {
               this.option("expand", false)
           }
           if (this.option("expandZoomMode") === "off") {
               this.option("expandZoomMode", false)
           }
           if (z.browser.mobile && this.option("zoomMode") === "zoom" && this.option("zoomPosition") === "inner") {
               if (this.option("expand")) {
                   this.option("zoomMode", false)
               } else {
                   this.option("zoomOn", "click")
               }
           }
       },
       start: function (M) {
           var K;
           var J = this;
           var L;
           if (this.startAttempts < 1) {
               this.loadOptions(M);
               if (x && !this.option("autostart")) {
                   return
               }
               this.originalImg = this.placeholder.querySelector("img");
               this.originalImgSrc = this.originalImg ? this.originalImg.getAttribute("src") : null;
               this.originalTitle = g(this.placeholder).getAttribute("title");
               g(this.placeholder).removeAttribute("title");
               if (this.originalImg && this.originalImg.parentNode.tagName === "PICTURE") {
                   this.originalImgSrc = null;
                   var Q = z.$new("div").jAddClass("magic-temporary-img").jAppendTo(document.body);
                   var O = this.originalImg.parentNode.cloneNode(true);
                   O.getAttribute("style");
                   O.removeAttribute("style");
                   var N = O.querySelector("img");
                   N.getAttribute("style");
                   N.removeAttribute("style");
                   g(N).jAddEvent("load", function () {
                       J.size = g(N).jGetSize();
                       Q.kill();
                       var R = J.originalImg.cloneNode(false);
                       g(R).jSetCss({
                           maxWidth: J.size.width,
                           maxHeight: J.size.height
                       }).setAttribute("src", J.originalImg.currentSrc || J.originalImg.src);
                       J.originalImg = J.placeholder.replaceChild(R, J.originalImg.parentNode);
                       J.start()
                   });
                   Q.append(O);
                   ++this.startAttempts;
                   return
               }
           }
           L = new j().parseNode(this.placeholder, this.originalTitle, true);
           L.setSize("small", this.size);
           if (!L.small.url) {
               if (++this.startAttempts <= D) {
                   this.startTimer = setTimeout(function () {
                       J.start()
                   }, 100)
               }
               return
           }
           this.primaryImage = L;
           this.image = this.primaryImage;
           F(this.placeholder);
           this.id = this.placeholder.getAttribute("id") || "mz-" + Math.floor(Math.random() * z.now());
           this.placeholder.setAttribute("id", this.id);
           this.node = z.$new("figure").jAddClass("mz-figure");
           this.node.enclose(this.image.small.node).jAddClass(this.option("cssClass"));
           if (this.option("rightClick") !== true) {
               this.node.jAddEvent("contextmenu", function (R) {
                   R.stop();
                   return false
               })
           }
           this.node.jAddClass("mz-" + this.option("zoomOn") + "-zoom");
           if (!this.option("expand")) {
               this.node.jAddClass("mz-no-expand")
           }
           this.lens = {
               node: z.$new("div", {
                   "class": "mz-lens"
               }, {
                   top: 0
               }).jAppendTo(this.node),
               image: z.$new("img", {
                   src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
               }, {
                   position: "absolute",
                   top: 0,
                   left: 0
               }),
               width: 0,
               height: 0,
               pos: {
                   x: 0,
                   y: 0
               },
               spos: {
                   x: 0,
                   y: 0
               },
               size: {
                   width: 0,
                   height: 0
               },
               border: {
                   x: 0,
                   y: 0
               },
               dx: 0,
               dy: 0,
               innertouch: false,
               hide: function () {
                   if (z.browser.features.transform) {
                       this.node.jSetCss({
                           transform: "translate(-10000px, -10000px)"
                       })
                   } else {
                       this.node.jSetCss({
                           top: -10000
                       })
                   }
               }
           };
           this.lens.hide();
           this.lens.node.append(this.lens.image);
           this.zoomBox = {
               node: z.$new("div", {
                   "class": "mz-zoom-window"
               }, {
                   top: -100000
               }).jAddClass(this.option("cssClass")).jAppendTo(I),
               image: z.$new("img", {
                   src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
               }, {
                   position: "absolute"
               }),
               aspectRatio: 0,
               width: 0,
               height: 0,
               innerWidth: 0,
               innerHeight: 0,
               size: {
                   width: "auto",
                   wunits: "px",
                   height: "auto",
                   hunits: "px"
               },
               mode: this.option("zoomMode"),
               position: this.option("zoomPosition"),
               trigger: this.option("zoomOn"),
               custom: false,
               active: false,
               activating: false,
               enabled: false,
               enable: g(function () {
                   this.zoomBox.enabled = arguments[0] !== false;
                   this.node[this.zoomBox.enabled ? "jRemoveClass" : "jAddClass"]("mz-no-zoom")
               }).jBind(this),
               hide: g(function () {
                   var R = g(this.node).jFetch("cr");
                   this.zoomBox.node.jRemoveEvent("transitionend");
                   this.zoomBox.node.jSetCss({
                       top: -100000
                   }).jAppendTo(I);
                   this.zoomBox.node.jRemoveClass("mz-deactivating mz-p-" + (this.zoomBox.mode === "zoom" ? this.zoomBox.position : this.zoomBox.mode));
                   if (!this.expanded && R) {
                       R.jRemove()
                   }
                   this.zoomBox.image.getAttribute("style");
                   this.zoomBox.image.removeAttribute("style")
               }).jBind(this),
               setMode: g(function (R) {
                   this.node[R === false ? "jAddClass" : "jRemoveClass"]("mz-no-zoom");
                   this.node[R === "magnifier" ? "jAddClass" : "jRemoveClass"]("mz-magnifier-zoom");
                   this.zoomBox.node[R === "magnifier" ? "jAddClass" : "jRemoveClass"]("mz-magnifier");
                   this.zoomBox.node[R === "preview" ? "jAddClass" : "jRemoveClass"]("mz-preview");
                   if (R !== "zoom") {
                       this.node.jRemoveClass("mz-inner-zoom");
                       this.zoomBox.node.jRemoveClass("mz-inner")
                   }
                   this.zoomBox.mode = R;
                   if (R === false) {
                       this.zoomBox.enable(false)
                   }
               }).jBind(this)
           };
           this.zoomBox.node.append(this.zoomBox.image);
           this.zoomBox.setMode(this.option("zoomMode"));
           this.zoomBox.image.removeAttribute("width");
           this.zoomBox.image.removeAttribute("height");
           if (typeof (q) !== "undefined") {
               var P = Math.floor(Math.random() * z.now());
               g(this.node).jStore("cr", z.$new(((Math.floor(Math.random() * 101) + 1) % 2) ? "span" : "div").setProps({
                   id: "crMz" + P
               }).jSetCss({
                   display: "inline",
                   overflow: "hidden",
                   visibility: "visible",
                   color: q[1],
                   fontSize: q[2],
                   fontWeight: q[3],
                   fontFamily: "sans-serif",
                   position: "absolute",
                   top: 8,
                   left: 8,
                   margin: "auto",
                   width: "auto",
                   textAlign: "right",
                   lineHeight: "2em",
                   zIndex: 2147483647
               }).changeContent(w(q[0])));
               if (g(g(this.node).jFetch("cr")).byTag("a")[0]) {
                   g(g(g(this.node).jFetch("cr")).byTag("a")[0]).jAddEvent("tap btnclick", function (R) {
                       R.stopDistribution();
                       window.open(this.href)
                   }).setProps({
                       id: "mzCrA" + P
                   })
               }
               z.addCSS("#" + this.id + " > figure.mz-figure > #" + ("crMz" + P) + ",#" + this.id + " > figure.mz-figure > #" + ("crMz" + P) + " > #" + ("mzCrA" + P) + ",html body .mz-expand > #" + ("crMz" + P) + ",html body .mz-expand > #" + ("crMz" + P) + " > #" + ("mzCrA" + P), {
                   display: "inline !important;",
                   visibility: "visible !important;",
                   color: q[1] + " !important;",
                   "font-size": q[2] + "px !important;",
                   "z-index": "2147483647 !important;"
               }, "mz-runtime-css", true)
           }
           if ((K = ("" + this.option("zoomWidth")).match(/^([0-9]+)?(px|%)?$/))) {
               this.zoomBox.size.wunits = K[2] || "px";
               this.zoomBox.size.width = (parseFloat(K[1]) || "auto")
           }
           if ((K = ("" + this.option("zoomHeight")).match(/^([0-9]+)?(px|%)?$/))) {
               this.zoomBox.size.hunits = K[2] || "px";
               this.zoomBox.size.height = (parseFloat(K[1]) || "auto")
           }
           if (this.zoomBox.mode === "magnifier") {
               this.node.jAddClass("mz-magnifier-zoom");
               this.zoomBox.node.jAddClass("mz-magnifier");
               if (this.zoomBox.size.width === "auto") {
                   this.zoomBox.size.wunits = "%";
                   this.zoomBox.size.width = 70
               }
               if (this.zoomBox.size.height === "auto") {
                   this.zoomBox.size.hunits = "%"
               }
           } else {
               if (this.option("zoom-position").match(/^#/)) {
                   if (this.zoomBox.custom = g(this.option("zoom-position").replace(/^#/, ""))) {
                       if (g(this.zoomBox.custom).jGetSize().height > 50) {
                           if (this.zoomBox.size.width === "auto") {
                               this.zoomBox.size.wunits = "%";
                               this.zoomBox.size.width = 100
                           }
                           if (this.zoomBox.size.height === "auto") {
                               this.zoomBox.size.hunits = "%";
                               this.zoomBox.size.height = 100
                           }
                       }
                   } else {
                       this.option("zoom-position", "right")
                   }
               }
               if (this.zoomBox.mode === "preview") {
                   if (this.zoomBox.size.width === "auto") {
                       this.zoomBox.size.wunits = "px"
                   }
                   if (this.zoomBox.size.height === "auto") {
                       this.zoomBox.size.hunits = "px"
                   }
               }
               if (this.zoomBox.mode === "zoom") {
                   if (this.zoomBox.size.width === "auto" || this.option("zoom-position") === "inner") {
                       this.zoomBox.size.wunits = "%";
                       this.zoomBox.size.width = 100
                   }
                   if (this.zoomBox.size.height === "auto" || this.option("zoom-position") === "inner") {
                       this.zoomBox.size.hunits = "%";
                       this.zoomBox.size.height = 100
                   }
               }
               if (this.option("zoom-position") === "inner") {
                   this.node.jAddClass("mz-inner-zoom")
               }
           }
           this.zoomBox.position = this.zoomBox.custom ? "custom" : this.option("zoom-position");
           this.lens.border.x = parseFloat(this.lens.node.jGetCss("border-left-width") || "0");
           this.lens.border.y = parseFloat(this.lens.node.jGetCss("border-top-width") || "0");
           this.image.loadSmall(function () {
               if (this.image.small.state !== 2) {
                   return
               }
               this.image.setCurNode("small");
               this.size = this.image.node.jGetSize();
               this.registerEvents();
               this.ready = true;
               if (this.option("lazyZoom") === true) {
                   s("onZoomReady", this.id);
                   if (z.browser.mobile) {
                       this.reflowZoom()
                   } else {
                       this.showHint()
                   }
               }
           }.jBind(this));
           if (this.option("lazyZoom") !== true || this.option("zoomOn") === "always") {
               this.image.load(g(function (R) {
                   this.setupZoom(R, true)
               }).jBind(this));
               this.loadTimer = g(this.showLoading).jBind(this).jDelay(400)
           }
           this.setupSelectors();
           this.setupButtons()
       },
       stop: function () {
           clearTimeout(this.startTimer);
           this.unregisterEvents();
           if (this.zoomBox) {
               this.zoomBox.node.kill()
           }
           if (this.expandThumbs) {
               this.expandThumbs.stop();
               this.expandThumbs = null
           }
           if (this.expandBox) {
               this.expandBox.kill()
           }
           if (this.expanded) {
               g(z.browser.getDoc()).jSetCss({
                   overflow: ""
               })
           }
           g(this.additionalImages).jEach(function (J) {
               g(J.origin).jRemoveClass("mz-thumb-selected").jRemoveClass(this.option("cssClass") || "mz-$dummy-css-class-to-jRemove$")
           }, this);
           if (this.originalImg) {
               this.placeholder.append(this.originalImg);
               if (this.originalImgSrc) {
                   this.originalImg.setAttribute("src", this.originalImgSrc)
               }
           }
           if (this.originalTitle) {
               this.placeholder.setAttribute("title", this.originalTitle)
           }
           if (this.node) {
               this.node.kill()
           }
       },
       setupZoom: function (K, L) {
           var J = this.image;
           if (K.zoom.state !== 2) {
               this.image = K;
               this.ready = true;
               this.zoomBox.enable(false);
               return
           }
           this.image = K;
           this.image.setCurNode(this.expanded ? "zoom" : "small");
           this.zoomBox.image.src = this.image.getURL("zoom");
           this.zoomBox.image.alt = this.image.alt;
           this.zoomBox.node.jRemoveClass("mz-preview");
           this.zoomBox.image.getAttribute("style");
           this.zoomBox.image.removeAttribute("style");
           this.zoomBox.node.jGetSize();
           setTimeout(g(function () {
               var N = this.zoomBox.image.jGetSize();
               var M;
               this.zoomSizeOrigin = this.image.jGetSize("zoom");
               if (N.width * N.height > 1 && N.width * N.height < this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) {
                   this.zoomSizeOrigin = N
               }
               this.zoomSize = z.detach(this.zoomSizeOrigin);
               if (this.zoomBox.mode === "preview") {
                   this.zoomBox.node.jAddClass("mz-preview")
               }
               this.setCaption();
               this.lens.image.src = this.image.node.currentSrc || this.image.node.src;
               this.lens.image.alt = this.image.alt;
               this.zoomBox.enable(this.zoomBox.mode && !(this.expanded && this.zoomBox.mode === "preview"));
               this.ready = true;
               this.activateTimer = null;
               this.resizeCallback();
               this.node.jAddClass("mz-ready");
               this.hideLoading();
               if (J !== this.image) {
                   s("onUpdate", this.id, J.origin, this.image.origin);
                   if (this.nextImage) {
                       M = this.nextImage;
                       this.nextImage = null;
                       this.update(M.image, M.onswipe)
                   }
               } else {
                   if (!!L) {
                       s("onZoomReady", this.id)
                   }
               }
               if (this.initEvent) {
                   this.node.jCallEvent(this.initEvent.type, this.initEvent)
               } else {
                   if (this.expanded && this.option("expandZoomOn") === "always") {
                       this.activate()
                   } else {
                       if (!!L) {
                           this.showHint()
                       }
                   }
               }
           }).jBind(this), 256)
       },
       setupSelectors: function () {
           var K = this.id;
           var J;
           var L;
           L = new RegExp("zoom\\-id(\\s+)?:(\\s+)?" + K + "($|;)");
           if (z.browser.features.query) {
               J = z.$A(document.querySelectorAll('[data-zoom-id="' + this.id + '"]'));
               J = g(J).concat(z.$A(document.querySelectorAll('[rel*="zoom-id"]')).filter(function (M) {
                   return L.test(M.getAttribute("rel") || "")
               }))
           } else {
               J = z.$A(document.getElementsByTagName("A")).filter(function (M) {
                   return K === M.getAttribute("data-zoom-id") || L.test(M.getAttribute("rel") || "")
               })
           }
           g(J).jEach(function (N) {
               var M;
               var O;
               g(N).jAddEvent("click", function (P) {
                   P.stopDefaults()
               });
               M = new j().parseNode(N, this.originalTitle);
               if ((this.image.zoom.src.has(M.zoom.url) || this.image.zoom.url.has(M.zoom.url)) && (this.image.small.src.has(M.small.url) || this.image.small.url.has(M.small.url))) {
                   g(M.origin).jAddClass("mz-thumb-selected");
                   M = this.image;
                   M.origin = N
               }
               if (!M.link && this.image.link) {
                   M.link = this.image.link
               }
               O = g(function () {
                   this.update(M)
               }).jBind(this);
               g(N).jAddEvent("mousedown", function (P) {
                   if ("stopImmediatePropagation" in P) {
                       P.stopImmediatePropagation()
                   }
               }, 5);
               g(N).jAddEvent("tap " + (this.option("selectorTrigger") === "hover" ? "mouseover mouseout" : "btnclick"), g(function (Q, P) {
                   if (this.updateTimer) {
                       clearTimeout(this.updateTimer)
                   }
                   this.updateTimer = false;
                   if (Q.type === "mouseover") {
                       this.updateTimer = g(O).jDelay(P)
                   } else {
                       if (Q.type === "tap" || Q.type === "btnclick") {
                           O()
                       }
                   }
               }).jBindAsEvent(this, 60)).jAddClass(this.option("cssClass")).jAddClass("mz-thumb");
               if (this.option("lazyZoom") !== true) {
                   M.loadSmall();
                   M.loadZoom()
               }
               this.additionalImages.push(M)
           }, this)
       },
       update: function (J, L) {
           if (!this.ready) {
               this.nextImage = {
                   image: J,
                   onswipe: L
               };
               return
           }
           if (!J || J === this.image) {
               return false
           }
           this.deactivate(null, true);
           this.ready = false;
           this.node.jRemoveClass("mz-ready");
           this.loadTimer = g(this.showLoading).jBind(this).jDelay(400);
           var K = g(function (S) {
               var M, T, R, O, N, Q, P = (z.browser.ieMode < 10) ? "jGetSize" : "getBoundingClientRect";
               this.hideLoading();
               S.setCurNode("small");
               if (!S.node) {
                   this.ready = true;
                   this.node.jAddClass("mz-ready");
                   return
               }
               this.setActiveThumb(S);
               M = this.image.node[P]();
               if (this.expanded) {
                   S.setCurNode("zoom");
                   R = z.$new("div").jAddClass("mz-expand-bg");
                   if (z.browser.features.cssFilters || z.browser.ieMode < 10) {
                       R.append(z.$new("img", {
                           srcset: S.getURL("zoom") + " " + S.getRatio("zoom") + "x",
                           src: S.getURL("zoom"),
                           alt: S.alt
                       }).jSetCss({
                           opacity: 0
                       }))
                   } else {
                       R.append(new z.SVGImage(S.node).blur(b).getNode().jSetCss({
                           opacity: 0
                       }))
                   }
                   g(R).jSetCss({
                       "z-index": -99
                   }).jAppendTo(this.expandBox)
               }
               if (this.expanded && this.zoomBox.mode === "zoom" && this.option("expandZoomOn") === "always") {
                   g(S.node).jSetCss({
                       opacity: 0
                   }).jAppendTo(this.node);
                   T = M;
                   N = [S.node, this.image.node];
                   Q = [{
                       opacity: [0, 1]
                   }, {
                       opacity: [1, 0]
                   }];
                   g(S.node).jSetCss({
                       "max-width": Math.min(S.jGetSize("zoom").width, this.expandMaxWidth()),
                       "max-height": Math.min(S.jGetSize("zoom").height, this.expandMaxHeight())
                   })
               } else {
                   this.node.jSetCss({
                       height: this.node[P]().height
                   });
                   this.image.node.jSetCss({
                       position: "absolute",
                       top: 0,
                       left: 0,
                       bottom: 0,
                       right: 0,
                       width: "100%",
                       height: "100%",
                       "max-width": "",
                       "max-height": ""
                   });
                   g(S.node).jSetCss({
                       "max-width": Math.min(S.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                       "max-height": Math.min(S.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity),
                       position: "relative",
                       top: 0,
                       left: 0,
                       opacity: 0,
                       transform: ""
                   }).jAppendTo(this.node);
                   T = g(S.node)[P]();
                   if (!L) {
                       g(S.node).jSetCss({
                           "min-width": M.width,
                           height: M.height,
                           "max-width": M.width,
                           "max-height": ""
                       })
                   }
                   this.node.jSetCss({
                       height: "",
                       overflow: ""
                   }).jGetSize();
                   g(S.node).jGetSize();
                   N = [S.node, this.image.node];
                   Q = [z.extend({
                       opacity: [0, 1]
                   }, L ? {
                       scale: [0.6, 1]
                   } : {
                       "min-width": [M.width, T.width],
                       "max-width": [M.width, T.width],
                       height: [M.height, T.height]
                   }), {
                       opacity: [1, 0]
                   }]
               }
               if (this.expanded) {
                   if (this.expandBg.firstChild && R.firstChild) {
                       O = g(this.expandBg.firstChild).jGetCss("opacity");
                       if (z.browser.gecko) {
                           N = N.concat([R.firstChild]);
                           Q = Q.concat([{
                               opacity: [0.0001, O]
                           }])
                       } else {
                           N = N.concat([R.firstChild, this.expandBg.firstChild]);
                           Q = Q.concat([{
                               opacity: [0.0001, O]
                           }, {
                               opacity: [O, 0.0001]
                           }])
                       }
                   }
               }
               new z.PFX(N, {
                   duration: (L || this.option("transitionEffect")) ? L ? 160 : 350 : 0,
                   transition: L ? "cubic-bezier(0.175, 0.885, 0.320, 1)" : (M.width === T.width) ? "linear" : "cubic-bezier(0.25, .1, .1, 1)",
                   onComplete: g(function () {
                       this.image.node.jRemove().getAttribute("style");
                       this.image.node.removeAttribute("style");
                       g(S.node).jSetCss(this.expanded ? {
                           width: "auto",
                           height: "auto"
                       } : {
                           width: "",
                           height: ""
                       }).jSetCss({
                           "min-width": "",
                           "min-height": "",
                           opacity: "",
                           "max-width": Math.min(S.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                           "max-height": Math.min(S.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity)
                       });
                       if (this.expanded) {
                           this.expandBg.jRemove();
                           this.expandBg = undefined;
                           this.expandBg = R.jSetCssProp("z-index", -100);
                           g(this.expandBg.firstChild).jSetCss({
                               opacity: ""
                           });
                           if (this.expandCaption) {
                               if (S.caption) {
                                   if (S.link) {
                                       this.expandCaption.changeContent("").append(z.$new("a", {
                                           href: S.link
                                       }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(S.caption))
                                   } else {
                                       this.expandCaption.changeContent(S.caption).jAddClass("mz-show")
                                   }
                               } else {
                                   this.expandCaption.jRemoveClass("mz-show")
                               }
                           }
                       }
                       this.setupZoom(S)
                   }).jBind(this),
                   onBeforeRender: g(function (U, V) {
                       if (undefined !== U.scale) {
                           V.jSetCssProp("transform", "scale(" + U.scale + ")")
                       }
                   })
               }).start(Q)
           }).jBind(this);
           if (this.expanded) {
               J.load(K)
           } else {
               J.loadSmall(K)
           }
       },
       setActiveThumb: function (K) {
           var J = false;
           g(this.additionalImages).jEach(function (L) {
               g(L.origin).jRemoveClass("mz-thumb-selected");
               if (L === K) {
                   J = true
               }
           });
           if (J && K.origin) {
               g(K.origin).jAddClass("mz-thumb-selected")
           }
           if (this.expandThumbs) {
               this.expandThumbs.selectItem(K.selector)
           }
       },
       setCaption: function (J) {
           if (this.image.caption && this.option("zoomCaption") !== "off" && this.zoomBox.mode !== "magnifier") {
               if (!this.zoomBox.caption) {
                   this.zoomBox.caption = z.$new("div", {
                       "class": "mz-caption"
                   }).jAppendTo(this.zoomBox.node.jAddClass("caption-" + this.option("zoomCaption")))
               }
               this.zoomBox.caption.changeContent(this.image.caption)
           }
       },
       showHint: function (J, M, K) {
           var L;
           if (!this.expanded) {
               if (this.hintRuns <= 0) {
                   return
               }
               if (K !== true) {
                   this.hintRuns--
               }
           }
           if (M === undefined || M === null) {
               if (!this.zoomBox.active && !this.zoomBox.activating) {
                   if (this.option("zoomMode") && (this.zoomBox.enabled || !this.image.loaded()) && !(z.browser.mobile && this.option("expand") && this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner")) {
                       if (this.zoomBox.trigger === "hover") {
                           M = this.option("textHoverZoomHint")
                       } else {
                           if (this.zoomBox.trigger === "click") {
                               M = this.option("textClickZoomHint")
                           }
                       }
                   } else {
                       M = this.option("expand") ? this.option("textExpandHint") : ""
                   }
               } else {
                   M = this.option("expand") ? this.option("textExpandHint") : ""
               }
           }
           if (!M) {
               this.hideHint();
               return
           }
           L = this.node;
           if (!this.hint) {
               this.hint = z.$new("div", {
                   "class": "mz-hint"
               });
               this.hintMessage = z.$new("span", {
                   "class": "mz-hint-message"
               }).append(document.createTextNode(M)).jAppendTo(this.hint);
               g(this.hint).jAppendTo(this.node)
           } else {
               g(this.hintMessage).changeContent(M)
           }
           this.hint.jSetCss({
               "transition-delay": ""
           }).jRemoveClass("mz-hint-hidden");
           if (this.expanded) {
               L = this.expandFigure
           } else {
               if ((this.zoomBox.active || this.zoomBox.activating) && this.zoomBox.mode !== "magnifier" && this.zoomBox.position === "inner") {
                   L = this.zoomBox.node
               }
           }
           if (J === true) {
               setTimeout(g(function () {
                   this.hint.jAddClass("mz-hint-hidden")
               }).jBind(this), 16)
           }
           this.hint.jAppendTo(L)
       },
       hideHint: function () {
           if (this.hint) {
               this.hint.jSetCss({
                   "transition-delay": "0ms"
               }).jAddClass("mz-hint-hidden")
           }
       },
       showLoading: function () {
           if (!this.loadingBox) {
               this.loadingBox = z.$new("div", {
                   "class": "mz-loading"
               });
               this.node.append(this.loadingBox);
               this.loadingBox.jGetSize()
           }
           this.loadingBox.jAddClass("shown")
       },
       hideLoading: function () {
           clearTimeout(this.loadTimer);
           this.loadTimer = null;
           if (this.loadingBox) {
               g(this.loadingBox).jRemoveClass("shown")
           }
       },
       setSize: function (L, P) {
           var O = z.detach(this.zoomBox.size),
               N = (!this.expanded && this.zoomBox.custom) ? g(this.zoomBox.custom).jGetSize() : {
                   width: 0,
                   height: 0
               },
               K, J, M = this.size,
               Q = {
                   x: 0,
                   y: 0
               };
           P = P || this.zoomBox.position;
           this.normalSize = this.image.node.jGetSize();
           this.size = this.image.node.jGetSize();
           this.boundaries = this.image.node.getBoundingClientRect();
           if (!N.height) {
               N = this.size
           }
           if (this.option("upscale") === false || this.zoomBox.mode === false || this.zoomBox.mode === "preview") {
               L = false
           }
           if (this.zoomBox.mode === "preview") {
               if (O.width === "auto") {
                   O.width = this.zoomSizeOrigin.width
               }
               if (O.height === "auto") {
                   O.height = this.zoomSizeOrigin.height
               }
           }
           if (this.expanded && this.zoomBox.mode === "magnifier") {
               O.width = 70;
               O.height = "auto"
           }
           if (this.zoomBox.mode === "magnifier" && O.height === "auto") {
               this.zoomBox.width = parseFloat(O.width / 100) * Math.min(N.width, N.height);
               this.zoomBox.height = this.zoomBox.width
           } else {
               if (this.zoomBox.mode === "zoom" && P === "inner") {
                   this.size = this.node.jGetSize();
                   N = this.size;
                   this.boundaries = this.node.getBoundingClientRect();
                   this.zoomBox.width = N.width;
                   this.zoomBox.height = N.height
               } else {
                   this.zoomBox.width = (O.wunits === "%") ? parseFloat(O.width / 100) * N.width : parseInt(O.width);
                   this.zoomBox.height = (O.hunits === "%") ? parseFloat(O.height / 100) * N.height : parseInt(O.height)
               }
           }
           if (this.zoomBox.mode === "preview") {
               J = Math.min(Math.min(this.zoomBox.width / this.zoomSizeOrigin.width, this.zoomBox.height / this.zoomSizeOrigin.height), 1);
               this.zoomBox.width = this.zoomSizeOrigin.width * J;
               this.zoomBox.height = this.zoomSizeOrigin.height * J
           }
           this.zoomBox.width = Math.ceil(this.zoomBox.width);
           this.zoomBox.height = Math.ceil(this.zoomBox.height);
           this.zoomBox.aspectRatio = this.zoomBox.width / this.zoomBox.height;
           this.zoomBox.node.jSetCss({
               width: this.zoomBox.width,
               height: this.zoomBox.height
           });
           if (L) {
               N = this.expanded ? this.expandBox.jGetSize() : this.zoomBox.node.jGetSize();
               if (!this.expanded && (this.normalSize.width * this.normalSize.height) / (this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) > 0.8) {
                   this.zoomSize.width = 1.5 * this.zoomSizeOrigin.width;
                   this.zoomSize.height = 1.5 * this.zoomSizeOrigin.height
               } else {
                   this.zoomSize = z.detach(this.zoomSizeOrigin)
               }
           }
           if (this.zoomBox.mode !== false && !this.zoomBox.active && !(this.expanded && this.option("expandZoomOn") === "always")) {
               if ((this.normalSize.width * this.normalSize.height) / (this.zoomSize.width * this.zoomSize.height) > 0.8) {
                   this.zoomSize = z.detach(this.zoomSizeOrigin);
                   this.zoomBox.enable(false)
               } else {
                   this.zoomBox.enable(true)
               }
           }
           this.zoomBox.image.jSetCss({
               width: this.zoomSize.width,
               height: this.zoomSize.height
           });
           this.zoomSize.maxWidth = this.zoomSize.width;
           this.zoomSize.maxHeight = this.zoomSize.height;
           K = this.zoomBox.node.getInnerSize();
           this.zoomBox.innerWidth = Math.ceil(K.width);
           this.zoomBox.innerHeight = Math.ceil(K.height);
           this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
           this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
           this.lens.node.jSetCss({
               width: this.lens.width,
               height: this.lens.height
           });
           this.lens.image.jSetCss(this.size);
           z.extend(this.lens, this.lens.node.jGetSize());
           if (this.zoomBox.active) {
               clearTimeout(this.moveTimer);
               this.moveTimer = null;
               if (this.lens.innertouch) {
                   this.lens.pos.x *= (this.size.width / M.width);
                   this.lens.pos.y *= (this.size.height / M.height);
                   Q.x = this.lens.spos.x;
                   Q.y = this.lens.spos.y
               } else {
                   Q.x = this.boundaries.left + this.lens.width / 2 + (this.lens.pos.x * (this.size.width / M.width));
                   Q.y = this.boundaries.top + this.lens.height / 2 + (this.lens.pos.y * (this.size.height / M.height))
               }
               this.animate(null, Q)
           }
       },
       reflowZoom: function (N) {
           var Q;
           var P;
           var J;
           var O;
           var M;
           var L;
           var K = g(this.node).jFetch("cr");
           J = a(5);
           M = this.zoomBox.position;
           O = this.expanded ? "inner" : this.zoomBox.custom ? "custom" : this.option("zoom-position");
           L = this.expanded && this.zoomBox.mode === "zoom" ? this.expandImageStage : document.body;
           if (this.expanded) {
               J.y = 0;
               J.x = 0
           }
           if (!N) {
               this.setSize(true, O)
           }
           Q = this.boundaries.top;
           if (this.zoomBox.mode !== "magnifier") {
               if (N) {
                   this.setSize(false);
                   return
               }
               switch (O) {
               case "inner":
               case "custom":
                   Q = 0;
                   P = 0;
                   break;
               case "top":
                   Q = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                   if (J.top > Q) {
                       Q = this.boundaries.bottom + this.option("zoom-distance");
                       O = "bottom"
                   }
                   P = this.boundaries.left;
                   break;
               case "bottom":
                   Q = this.boundaries.bottom + this.option("zoom-distance");
                   if (J.bottom < Q + this.zoomBox.height) {
                       Q = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                       O = "top"
                   }
                   P = this.boundaries.left;
                   break;
               case "left":
                   P = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                   if (J.left > P && J.right >= this.boundaries.right + this.option("zoom-distance") + this.zoomBox.width) {
                       P = this.boundaries.right + this.option("zoom-distance");
                       O = "right"
                   }
                   break;
               case "right":
               default:
                   P = this.boundaries.right + this.option("zoom-distance");
                   if (J.right < P + this.zoomBox.width && J.left <= this.boundaries.left - this.zoomBox.width - this.option("zoom-distance")) {
                       P = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                       O = "left"
                   }
                   break
               }
               switch (this.option("zoom-position")) {
               case "top":
               case "bottom":
                   if (J.top > Q || J.bottom < Q + this.zoomBox.height) {
                       O = "inner"
                   }
                   break;
               case "left":
               case "right":
                   if (J.left > P || J.right < P + this.zoomBox.width) {
                       O = "inner"
                   }
                   break;
               default:
               }
               this.zoomBox.position = O;
               if (!this.zoomBox.activating && !this.zoomBox.active) {
                   if (z.browser.mobile && !this.expanded && (this.zoomBox.mode === "zoom" || this.zoomBox.mode === false && this.option("expand"))) {
                       if (this.option("expand")) {
                           this.zoomBox.enable(O !== "inner")
                       } else {
                           if (this.option("zoomOn") !== "click") {
                               this.zoomBox.trigger = O === "inner" ? "click" : this.option("zoomOn");
                               this.unregisterActivateEvent();
                               this.unregisterDeactivateEvent();
                               this.registerActivateEvent(this.zoomBox.trigger === "click");
                               this.registerDeactivateEvent(this.zoomBox.trigger === "click" && !this.option("expand"))
                           }
                       }
                       this.showHint(false, null, !(this.option("lazyZoom") && this.image.loaded()))
                   }
                   return
               }
               this.setSize(false);
               if (N) {
                   return
               }
               if (O === "custom") {
                   L = this.zoomBox.custom;
                   J.y = 0;
                   J.x = 0
               }
               if (O === "inner") {
                   if (this.zoomBox.mode !== "preview") {
                       this.zoomBox.node.jAddClass("mz-inner");
                       this.node.jAddClass("mz-inner-zoom")
                   }
                   this.lens.hide();
                   Q = this.boundaries.top + J.y;
                   P = this.boundaries.left + J.x;
                   Q = 0;
                   P = 0;
                   if (!this.expanded) {
                       L = this.node
                   }
               } else {
                   Q += J.y;
                   P += J.x;
                   this.node.jRemoveClass("mz-inner-zoom");
                   this.zoomBox.node.jRemoveClass("mz-inner")
               }
               this.zoomBox.node.jSetCss({
                   top: Q,
                   left: P
               })
           } else {
               this.setSize(false);
               L = this.node;
               if (z.browser.mobile && !this.expanded && !this.zoomBox.activating && !this.zoomBox.active) {
                   this.showHint(false, null, !(this.option("lazyZoom") && this.image.loaded()))
               }
           }
           this.zoomBox.node[this.expanded ? "jAddClass" : "jRemoveClass"]("mz-expanded");
           if (!this.expanded && K) {
               K.jAppendTo(this.zoomBox.mode === "zoom" && O === "inner" ? this.zoomBox.node : this.node, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom")
           }
           this.zoomBox.node.jAppendTo(L)
       },
       changeZoomLevel: function (P) {
           var L;
           var J;
           var N;
           var M;
           var O = false;
           var K = P.isMouse ? 5 : 3 / 54;
           if (!this.zoomBox.active) {
               return
           }
           g(P).stop();
           K = (100 + K * Math.abs(P.deltaY)) / 100;
           if (P.deltaY < 0) {
               K = 1 / K
           }
           if (this.zoomBox.mode === "magnifier") {
               J = Math.max(100, Math.round(this.zoomBox.width * K));
               J = Math.min(J, this.size.width * 0.9);
               N = J / this.zoomBox.aspectRatio;
               this.zoomBox.width = Math.ceil(J);
               this.zoomBox.height = Math.ceil(N);
               this.zoomBox.node.jSetCss({
                   width: this.zoomBox.width,
                   height: this.zoomBox.height
               });
               L = this.zoomBox.node.getInnerSize();
               this.zoomBox.innerWidth = Math.ceil(L.width);
               this.zoomBox.innerHeight = Math.ceil(L.height);
               O = true
           } else {
               if (!this.expanded && this.zoomBox.mode === "zoom") {
                   J = Math.max(this.size.width, Math.round(this.zoomSize.width * K));
                   J = Math.min(J, this.zoomSize.maxWidth);
                   N = J / (this.zoomSize.maxWidth / this.zoomSize.maxHeight);
                   this.zoomSize.width = Math.ceil(J);
                   this.zoomSize.height = Math.ceil(N)
               } else {
                   return
               }
           }
           M = g(window).jGetScroll();
           this.lens.width = (this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
           this.lens.height = (this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
           this.lens.node.jSetCss({
               width: this.lens.width,
               height: this.lens.height
           });
           z.extend(this.lens, this.lens.node.jGetSize());
           if (this.zoomBox.active) {
               clearTimeout(this.moveTimer);
               this.moveTimer = null;
               if (O) {
                   this.moveTimer = true
               }
               this.animate(null, {
                   x: P.x - M.x,
                   y: P.y - M.y
               });
               if (O) {
                   this.moveTimer = null
               }
           }
       },
       registerActivateEvent: function (L) {
           var K;
           var J = L ? "dbltap btnclick" : "touchstart" + (window.navigator.pointerEnabled ? " pointerdown" : window.navigator.msPointerEnabled ? " MSPointerDown" : "") + (window.navigator.pointerEnabled ? " pointermove" : window.navigator.msPointerEnabled ? " MSPointerMove" : " mousemove");
           var M = this.node.jFetch("mz:handlers:activate:fn", (!L) ? g(function (N) {
               if (N.isTouchEvent() && !N.isPrimaryTouch()) {
                   return
               }
               if (N && N.pointerType === "touch" && N.type !== "pointerdown") {
                   return
               }
               K = (z.browser.ieMode < 9) ? z.extend({}, N) : N;
               if (!this.activateTimer) {
                   clearTimeout(this.activateTimer);
                   this.activateTimer = setTimeout(g(function () {
                       this.activate(K)
                   }).jBind(this), 120)
               }
           }).jBindAsEvent(this) : g(this.activate).jBindAsEvent(this));
           this.node.jStore("mz:handlers:activate:event", J).jAddEvent(J, M, 10)
       },
       unregisterActivateEvent: function () {
           var J = this.node.jFetch("mz:handlers:activate:event");
           var K = this.node.jFetch("mz:handlers:activate:fn");
           this.node.jRemoveEvent(J, K);
           this.node.jDel("mz:handlers:activate:fn")
       },
       registerDeactivateEvent: function (K) {
           var J = "touchend";
           if (window.navigator.pointerEnabled) {
               J += " pointerup pointerout pointermove"
           } else {
               if (window.navigator.msPointerEnabled) {
                   J += " MSPointerUp MSPointerOut MSPointerMove"
               } else {
                   J += " mouseout mousemove"
               }
           }
           if (K) {
               if (this.expanded || z.browser.mobile) {
                   J = "dbltap btnclick"
               } else {
                   J += " dbltap btnclick"
               }
           }
           var L = this.node.jFetch("mz:handlers:deactivate:fn", g(function (N) {
               if (N.isTouchEvent() && !N.isPrimaryTouch()) {
                   return
               }
               if (N && N.type === "pointerup" && N.pointerType !== "touch") {
                   return
               }
               if (N && (N.type === "pointermove" || N.type === "MSPointerMove" || N.type === "mousemove")) {
                   if (!this.ready || !this.zoomBox.enabled || !this.zoomBox.active) {
                       return
                   }
                   var M = N.getClientXY();
                   if (M.x < this.boundaries.left || M.x > this.boundaries.right || M.y < this.boundaries.top || M.y > this.boundaries.bottom) {
                       this.deactivate(N);
                       return
                   }
               } else {
                   if (this.zoomBox.node !== N.getRelated() && !((this.zoomBox.position === "inner" || this.zoomBox.mode === "magnifier") && this.zoomBox.node.hasChild(N.getRelated())) && !this.node.hasChild(N.getRelated())) {
                       this.deactivate(N);
                       return
                   }
               }
           }).jBindAsEvent(this));
           this.node.jStore("mz:handlers:deactivate:event", J).jAddEvent(J, L, 20)
       },
       unregisterDeactivateEvent: function () {
           var J = this.node.jFetch("mz:handlers:deactivate:event");
           var K = this.node.jFetch("mz:handlers:deactivate:fn");
           this.node.jRemoveEvent(J, K);
           this.node.jDel("mz:handlers:deactivate:fn")
       },
       registerAnimateEvent: function () {
           var J = "touchmove";
           if (z.browser.platform !== "android") {
               if (window.navigator.pointerEnabled) {
                   J += " pointermove"
               } else {
                   if (window.navigator.msPointerEnabled) {
                       J += " MSPointerMove"
                   } else {
                       J += " mousemove"
                   }
               }
           }
           var K = this.node.jFetch("mz:handlers:animate:fn", g(this.animate).jBindAsEvent(this));
           this.node.jStore("mz:handlers:animate:event", J).jAddEvent(J, K)
       },
       unregisterAnimateEvent: function () {
           var J = this.node.jFetch("mz:handlers:animate:event");
           var K = this.node.jFetch("mz:handlers:animate:fn");
           this.node.jRemoveEvent(J, K)
       },
       registerEvents: function () {
           this.moveBind = this.move.jBind(this);
           this.node.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], g(function (J) {
               if ((z.browser.androidBrowser) && this.option("zoomMode") && this.option("zoomOn") !== "click" && J.type === "touchstart") {
                   J.stopDefaults();
                   if (z.browser.gecko) {
                       J.stopDistribution()
                   }
               }
               if (!this.zoomBox.active) {
                   return
               }
               if (this.zoomBox.position === "inner" && J.isPrimaryTouch()) {
                   this.lens.spos = J.getClientXY()
               }
           }).jBindAsEvent(this), 10);
           this.node.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], g(function (J) {
               if (J.isTouchEvent() && J.isPrimaryTouch()) {
                   this.lens.touchmovement = false
               }
           }).jBindAsEvent(this), 10);
           this.registerAnimateEvent();
           if (this.option("zoomMode")) {
               this.registerActivateEvent(this.option("zoomOn") === "click");
               this.registerDeactivateEvent(this.option("zoomOn") === "click")
           }
           this.node.jAddEvent("mousedown", function (J) {
               J.stopDistribution()
           }, 10).jAddEvent("btnclick", g(function (J) {
               this.node.jRaiseEvent("MouseEvent", "click");
               if (this.expanded) {
                   this.expandBox.jCallEvent("btnclick", J)
               }
           }).jBind(this), 15);
           if (this.option("expand")) {
               this.node.jAddEvent("tap btnclick", g(this.expand).jBindAsEvent(this), 15)
           } else {
               this.node.jAddEvent("tap btnclick", g(this.openLink).jBindAsEvent(this), 15)
           }
           if (this.additionalImages.length > 1) {
               this.swipe()
           }
           if (!z.browser.mobile && this.option("variableZoom")) {
               this.node.jAddEvent("mousescroll", this.changeZoomLevel.jBindAsEvent(this))
           }
           if (z.browser.mobile) {
               this.pinchToZoom()
           }
           g(window).jAddEvent(z.browser.mobile ? "resize" : "resize scroll", this.onResize);
           if (this.option("history")) {
               g(window).jAddEvent("popstate", this.onHistoryStateChange)
           }
       },
       unregisterEvents: function () {
           if (this.node) {
               this.node.jRemoveEvent("mousescroll")
           }
           g(window).jRemoveEvent("resize scroll", this.onResize);
           if (this.option("history")) {
               g(window).jRemoveEvent("popstate", this.onHistoryStateChange)
           }
           g(this.additionalImages).jEach(function (J) {
               g(J.origin).jClearEvents()
           })
       },
       activate: function (P) {
           var Q;
           var O;
           var M;
           var N;
           var J;
           var K = 0;
           var L = 0;
           if (!this.image.loaded() || !this.ready || !this.zoomBox.enabled || this.zoomBox.active || this.zoomBox.activating) {
               if (!this.image.loaded() && !this.initEvent) {
                   if (P) {
                       this.initEvent = d(P);
                       P.stopQueue()
                   }
                   this.image.load(this.setupZoom.jBind(this));
                   if (!this.loadTimer) {
                       this.loadTimer = g(this.showLoading).jBind(this).jDelay(400)
                   }
               }
               return
           }
           if (P && P.type === "pointermove" && P.pointerType === "touch") {
               return
           }
           if (!this.option("zoomMode") && this.option("expand") && !this.expanded) {
               this.zoomBox.active = true;
               return
           }
           this.zoomBox.activating = true;
           if (this.expanded && this.zoomBox.mode === "zoom") {
               N = this.image.node.jGetRect();
               this.expandStage.jAddClass("mz-zoom-in");
               J = this.expandFigure.jGetRect();
               L = ((N.left + N.right) / 2 - (J.left + J.right) / 2);
               K = ((N.top + N.bottom) / 2 - (J.top + J.bottom) / 2)
           }
           this.zoomBox.image.jRemoveEvent("transitionend");
           this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend");
           this.zoomBox.node.jAddClass("mz-activating");
           this.node.jAddClass("mz-activating");
           this.reflowZoom();
           O = (this.zoomBox.mode === "zoom") ? this.zoomBox.position : this.zoomBox.mode;
           if (z.browser.features.transition && !(this.expanded && this.option("expandZoomOn") === "always")) {
               if (O === "inner") {
                   M = this.image.node.jGetSize();
                   this.zoomBox.image.jSetCss({
                       transform: "translate3d(0," + K + "px, 0) scale(" + M.width / this.zoomSize.width + ", " + M.height / this.zoomSize.height + ")"
                   }).jGetSize();
                   this.zoomBox.image.jAddEvent("transitionend", g(function () {
                       this.zoomBox.image.jRemoveEvent("transitionend");
                       this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + O);
                       this.zoomBox.activating = false;
                       this.zoomBox.active = true
                   }).jBind(this));
                   this.zoomBox.node.jAddClass("mz-p-" + O).jGetSize();
                   if (!z.browser.mobile && z.browser.chrome && (z.browser.uaName === "chrome" || z.browser.uaName === "opera")) {
                       this.zoomBox.activating = false;
                       this.zoomBox.active = true
                   }
               } else {
                   this.zoomBox.node.jAddEvent("transitionend", g(function () {
                       this.zoomBox.node.jRemoveEvent("transitionend");
                       this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + O)
                   }).jBind(this));
                   this.zoomBox.node.jSetCss({
                       transition: "none"
                   });
                   this.zoomBox.node.jAddClass("mz-p-" + O).jGetSize();
                   this.zoomBox.node.jSetCss({
                       transition: ""
                   }).jGetSize();
                   this.zoomBox.node.jRemoveClass("mz-p-" + O);
                   this.zoomBox.activating = false;
                   this.zoomBox.active = true
               }
           } else {
               this.zoomBox.node.jRemoveClass("mz-activating");
               this.zoomBox.activating = false;
               this.zoomBox.active = true
           }
           if (!this.expanded) {
               this.showHint(true)
           }
           if (P) {
               P.stop().stopQueue();
               Q = P.getClientXY();
               if (this.zoomBox.mode === "magnifier" && (/tap/i).test(P.type)) {
                   Q.y -= this.zoomBox.height / 2 + 10
               }
               if (O === "inner" && ((/tap/i).test(P.type) || P.isTouchEvent())) {
                   this.lens.pos = {
                       x: 0,
                       y: 0
                   };
                   Q.x = -(Q.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                   Q.y = -(Q.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
               }
           } else {
               Q = {
                   x: this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2,
                   y: this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2
               };
               if (z.browser.mobile && this.expanded && this.option("expandZoomOn") === "always") {
                   this.lens.innertouch = true;
                   this.lens.pos = {
                       x: 0,
                       y: 0
                   };
                   Q.x = -(Q.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                   Q.y = -(Q.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
               }
           }
           this.node.jRemoveClass("mz-activating").jAddClass("mz-active");
           Q.x += -L;
           Q.y += -K;
           this.lens.spos = {
               x: 0,
               y: 0
           };
           this.lens.dx = 0;
           this.lens.dy = 0;
           this.animate(P, Q, true);
           s("onZoomIn", this.id)
       },
       deactivate: function (L, Q) {
           var O;
           var M;
           var J;
           var K;
           var N = 0;
           var P = 0;
           var R = this.zoomBox.active;
           this.initEvent = null;
           if (!this.ready) {
               return
           }
           if (L && L.type === "pointerout" && L.pointerType === "touch") {
               return
           }
           clearTimeout(this.moveTimer);
           this.moveTimer = null;
           clearTimeout(this.activateTimer);
           this.activateTimer = null;
           this.zoomBox.activating = false;
           this.zoomBox.active = false;
           if (Q !== true && !this.expanded) {
               if (R) {
                   if (z.browser.mobile && !this.expanded && this.zoomBox.mode === "zoom") {
                       this.reflowZoom()
                   } else {
                       this.showHint()
                   }
               }
           }
           if (!this.zoomBox.enabled) {
               return
           }
           if (L) {
               L.stop()
           }
           this.zoomBox.image.jRemoveEvent("transitionend");
           this.zoomBox.node.jRemoveClass("mz-activating").jRemoveEvent("transitionend");
           if (this.expanded) {
               K = this.expandFigure.jGetRect();
               if (this.option("expandZoomOn") !== "always") {
                   this.expandStage.jRemoveClass("mz-zoom-in")
               }
               this.image.node.jSetCss({
                   "max-height": this.expandMaxHeight()
               });
               J = this.image.node.jGetRect();
               P = ((J.left + J.right) / 2 - (K.left + K.right) / 2);
               N = ((J.top + J.bottom) / 2 - (K.top + K.bottom) / 2)
           }
           O = (this.zoomBox.mode === "zoom") ? this.zoomBox.position : this.zoomBox.mode;
           if (z.browser.features.transition && L && !(this.expanded && this.option("expandZoomOn") === "always")) {
               if (O === "inner") {
                   this.zoomBox.image.jAddEvent("transitionend", g(function () {
                       this.zoomBox.image.jRemoveEvent("transitionend");
                       this.node.jRemoveClass("mz-active");
                       setTimeout(g(function () {
                           this.zoomBox.hide()
                       }).jBind(this), 32)
                   }).jBind(this));
                   M = this.image.node.jGetSize();
                   this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + O).jGetSize();
                   this.zoomBox.image.jSetCss({
                       transform: "translate3d(0," + N + "px,0) scale(" + M.width / this.zoomSize.maxWidth + ", " + M.height / this.zoomSize.maxHeight + ")"
                   })
               } else {
                   this.zoomBox.node.jAddEvent("transitionend", g(function () {
                       this.zoomBox.hide();
                       this.node.jRemoveClass("mz-active")
                   }).jBind(this));
                   this.zoomBox.node.jGetCss("opacity");
                   this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + O);
                   this.node.jRemoveClass("mz-active")
               }
           } else {
               this.zoomBox.hide();
               this.node.jRemoveClass("mz-active")
           }
           this.lens.dx = 0;
           this.lens.dy = 0;
           this.lens.spos = {
               x: 0,
               y: 0
           };
           this.lens.hide();
           if (R) {
               s("onZoomOut", this.id)
           }
       },
       animate: function (T, S, R) {
           var L = S;
           var N;
           var M;
           var P = 0;
           var K;
           var O = 0;
           var J;
           var U;
           var Q = false;
           if (!this.zoomBox.active && !R) {
               return
           }
           if (T) {
               g(T).stopDefaults().stopDistribution();
               if (T.isTouchEvent() && !T.isPrimaryTouch()) {
                   return
               }
               Q = (/tap/i).test(T.type) || T.isTouchEvent();
               if (Q && !this.lens.touchmovement) {
                   this.lens.touchmovement = Q
               }
               if (!L) {
                   L = T.getClientXY()
               }
           }
           if (this.zoomBox.mode === "preview") {
               return
           }
           if (this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner" && (T && Q || !T && this.lens.innertouch)) {
               this.lens.innertouch = true;
               N = this.lens.pos.x + (L.x - this.lens.spos.x);
               M = this.lens.pos.y + (L.y - this.lens.spos.y);
               this.lens.spos = L;
               P = Math.min(0, this.zoomBox.innerWidth - this.zoomSize.width) / 2;
               K = -P;
               O = Math.min(0, this.zoomBox.innerHeight - this.zoomSize.height) / 2;
               J = -O
           } else {
               this.lens.innertouch = false;
               if (this.zoomBox.mode === "magnifier") {
                   L.y = Math.max(this.boundaries.top, Math.min(L.y, this.boundaries.bottom));
                   L.x = Math.max(this.boundaries.left, Math.min(L.x, this.boundaries.right))
               }
               N = L.x - this.boundaries.left;
               M = L.y - this.boundaries.top;
               K = this.size.width - this.lens.width;
               J = this.size.height - this.lens.height;
               N -= this.lens.width / 2;
               M -= this.lens.height / 2
           }
           if (this.zoomBox.mode !== "magnifier") {
               N = Math.max(P, Math.min(N, K));
               M = Math.max(O, Math.min(M, J))
           }
           this.lens.pos.x = N;
           this.lens.pos.y = M;
           if (this.zoomBox.mode === "zoom") {
               if (z.browser.features.transform) {
                   this.lens.node.jSetCss({
                       transform: "translate(" + this.lens.pos.x + "px," + this.lens.pos.y + "px)"
                   });
                   this.lens.image.jSetCss({
                       transform: "translate(" + -(this.lens.pos.x + this.lens.border.x) + "px, " + -(this.lens.pos.y + this.lens.border.y) + "px)"
                   })
               } else {
                   this.lens.node.jSetCss({
                       top: this.lens.pos.y,
                       left: this.lens.pos.x
                   });
                   this.lens.image.jSetCss({
                       top: -(this.lens.pos.y + this.lens.border.y),
                       left: -(this.lens.pos.x + this.lens.border.x)
                   })
               }
           }
           if (this.zoomBox.mode === "magnifier") {
               if (this.lens.touchmovement && !(T && T.type === "dbltap")) {
                   L.y -= this.zoomBox.height / 2 + 10
               }
               this.zoomBox.node.jSetCss({
                   top: L.y - this.boundaries.top - this.zoomBox.height / 2,
                   left: L.x - this.boundaries.left - this.zoomBox.width / 2
               })
           }
           if (!this.moveTimer) {
               this.lens.dx = 0;
               this.lens.dy = 0;
               this.move(1)
           }
       },
       move: function (O) {
           var M;
           var K;
           var J;
           var P;
           var N;
           var L;
           if (!isFinite(O)) {
               if (this.lens.innertouch) {
                   O = this.lens.touchmovement ? 0.4 : 0.16
               } else {
                   O = this.option("smoothing") ? 0.2 : this.lens.touchmovement ? 0.4 : 0.8
               }
           }
           M = ((this.lens.pos.x - this.lens.dx) * O);
           K = ((this.lens.pos.y - this.lens.dy) * O);
           this.lens.dx += M;
           this.lens.dy += K;
           if (!this.moveTimer || Math.abs(M) > 0.000001 || Math.abs(K) > 0.000001) {
               if (this.lens.innertouch) {
                   J = this.lens.dx;
                   P = this.lens.dy
               } else {
                   J = (this.lens.dx * (this.zoomSize.width / this.size.width) - Math.max(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2);
                   P = (this.lens.dy * (this.zoomSize.height / this.size.height) - Math.max(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2);
                   if (this.zoomBox.mode === "magnifier") {
                       J = Math.round(J);
                       P = Math.round(P)
                   }
                   J = -J;
                   P = -P
               }
               N = this.zoomSize.width / this.zoomSize.maxWidth;
               L = this.zoomSize.height / this.zoomSize.maxHeight;
               this.zoomBox.image.jSetCss(z.browser.features.transform ? {
                   transform: f + J + "px," + P + "px" + C + " scale(" + N + "," + L + ")"
               } : {
                   width: this.zoomSize.width,
                   height: this.zoomSize.height,
                   left: -(this.lens.dx * (this.zoomSize.width / this.size.width) + Math.min(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2),
                   top: -(this.lens.dy * (this.zoomSize.height / this.size.height) + Math.min(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2)
               })
           }
           if (this.zoomBox.mode === "magnifier") {
               return
           }
           this.moveTimer = setTimeout(this.moveBind, 16)
       },
       swipe: function () {
           var V;
           var L;
           var Q = 30;
           var N = 201;
           var S;
           var T = "";
           var K = {};
           var J;
           var P;
           var U = 0;
           var W = {
               transition: z.browser.cssTransform + String.fromCharCode(32) + "300ms cubic-bezier(.18,.35,.58,1)"
           };
           var M;
           var R;
           var O = g(function (X) {
               if (!this.ready || this.zoomBox.active) {
                   return
               }
               if (X.state === "dragstart") {
                   clearTimeout(this.activateTimer);
                   this.activateTimer = null;
                   U = 0;
                   K = {
                       x: X.x,
                       y: X.y,
                       ts: X.timeStamp
                   };
                   V = this.size.width;
                   L = V / 2;
                   this.image.node.jRemoveEvent("transitionend");
                   this.image.node.jSetCssProp("transition", "");
                   this.image.node.jSetCssProp("transform", "translate3d(0, 0, 0)");
                   R = null
               } else {
                   J = (X.x - K.x);
                   P = {
                       x: 0,
                       y: 0,
                       z: 0
                   };
                   if (R === null) {
                       R = (Math.abs(X.x - K.x) < Math.abs(X.y - K.y))
                   }
                   if (R) {
                       return
                   }
                   X.stop();
                   if (X.state === "dragend") {
                       U = 0;
                       M = null;
                       S = X.timeStamp - K.ts;
                       if (Math.abs(J) > L || (S < N && Math.abs(J) > Q)) {
                           if ((T = (J > 0) ? "backward" : (J <= 0) ? "forward" : "")) {
                               if (T === "backward") {
                                   M = this.getPrev();
                                   U += V * 10
                               } else {
                                   M = this.getNext();
                                   U -= V * 10
                               }
                           }
                       }
                       P.x = U;
                       P.deg = -90 * (P.x / V);
                       this.image.node.jAddEvent("transitionend", g(function (Y) {
                           this.image.node.jRemoveEvent("transitionend");
                           this.image.node.jSetCssProp("transition", "");
                           if (M) {
                               this.image.node.jSetCss({
                                   transform: "translate3d(" + P.x + "px, 0px, 0px)"
                               });
                               this.update(M, true)
                           }
                       }).jBind(this));
                       this.image.node.jSetCss(W);
                       this.image.node.jSetCss({
                           "transition-duration": P.x ? "100ms" : "300ms",
                           opacity: 1 - 0.2 * Math.abs(P.x / V),
                           transform: "translate3d(" + P.x + "px, 0px, 0px)"
                       });
                       J = 0;
                       return
                   }
                   P.x = J;
                   P.z = -50 * Math.abs(P.x / L);
                   P.deg = -60 * (P.x / L);
                   this.image.node.jSetCss({
                       opacity: 1 - 0.2 * Math.abs(P.x / L),
                       transform: "translate3d(" + P.x + "px, 0px, " + P.z + "px)"
                   })
               }
           }).jBind(this);
           this.node.jAddEvent("touchdrag", O)
       },
       pinchToZoom: function () {
           var L = {
               width: 0,
               height: 0
           };
           var N = false;
           var M;
           var K = g(function (S, O, R) {
               var P;
               var Q;
               if (!this.zoomBox.active && !R) {
                   return
               }
               var T = z.detach(this.zoomSize);
               P = Math.max(M.width, Math.round(L.width * S));
               P = Math.min(P, this.zoomSize.maxWidth);
               Q = P / (this.zoomSize.maxWidth / this.zoomSize.maxHeight);
               this.zoomSize.width = Math.floor(P);
               this.zoomSize.height = Math.floor(Q);
               this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / M.width));
               this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / M.height));
               this.lens.node.jSetCss({
                   width: this.lens.width,
                   height: this.lens.height
               });
               z.extend(this.lens, this.lens.node.jGetSize());
               clearTimeout(this.moveTimer);
               this.moveTimer = null;
               O.x = this.lens.spos.x * (this.zoomSize.width / T.width) + (O.x - this.boundaries.left - this.size.width / 2) * (1 - (this.zoomSize.width / T.width));
               O.y = this.lens.spos.y * (this.zoomSize.height / T.height) + (O.y - this.boundaries.top - this.size.height / 2) * (1 - (this.zoomSize.height / T.height));
               this.lens.spos = {
                   x: 0,
                   y: 0
               };
               this.lens.pos = {
                   x: 0,
                   y: 0
               };
               this.lens.innertouch = true;
               this.animate(null, {
                   x: O.x,
                   y: O.y
               });
               clearTimeout(this.moveTimer);
               this.moveTimer = null
           }).jBind(this);
           var J = g(function (Q) {
               if (!N && Q.state !== "pinchstart" && !Q.cloned) {
                   return
               }
               Q.stop();
               var P = g(window).jGetScroll();
               var O = false;
               var R = {
                   x: Q.centerPoint.x - P.x,
                   y: Q.centerPoint.y - P.y
               };
               switch (Q.state) {
               case "pinchstart":
                   this.unregisterAnimateEvent();
                   L = z.detach(this.zoomSize);
                   if (this.expanded) {
                       M = this.image.node.jGetSize()
                   } else {
                       M = this.size
                   }
                   clearTimeout(this.moveTimer);
                   this.moveTimer = null;
                   if (this.zoomBox.active) {
                       this.lens.spos = z.detach(this.lens.pos)
                   }
                   N = true;
                   break;
               case "pinchend":
                   N = false;
                   if (this.zoomBox.active) {
                       if (this.option("expandZoomOn") !== "always" && this.zoomSize.width <= M.width && this.zoomSize.height <= M.height) {
                           N = false;
                           this.deactivate(null)
                       } else {
                           if (Q.points.length > 0) {
                               this.lens.spos = {
                                   x: Q.points[0].clientX,
                                   y: Q.points[0].clientY
                               }
                           }
                       }
                   }
                   this.registerAnimateEvent();
                   break;
               case "pinchresize":
                   break;
               case "pinchmove":
                   if (this.expanded && Q.zoom === -1 && (!this.zoomBox.active || this.option("expandZoomOn") === "always")) {
                       if (Q.scale < l) {
                           this.close()
                       }
                   } else {
                       if (this.expanded && Q.zoom === 1 && this.option("expandZoomOn") === "always") {} else {
                           if (this.option("expand") && !this.expanded) {
                               if (Q.scale > B) {
                                   N = false;
                                   this.registerAnimateEvent();
                                   this.expand(Q);
                                   return
                               }
                           } else {
                               if (Q.zoom === 1 && !this.zoomBox.active) {
                                   if (!this.image.loaded() || !this.ready || !this.zoomBox.enabled) {
                                       if (!this.image.loaded() && !this.initEvent) {
                                           if (Q) {
                                               this.initEvent = d(Q);
                                               Q.stopQueue()
                                           }
                                           this.image.load(this.setupZoom.jBind(this));
                                           if (!this.loadTimer) {
                                               this.loadTimer = g(this.showLoading).jBind(this).jDelay(400)
                                           }
                                       }
                                       return
                                   }
                                   this.zoomBox.activating = true;
                                   if (this.expanded && this.zoomBox.mode === "zoom") {
                                       this.expandStage.jAddClass("mz-zoom-in")
                                   }
                                   this.zoomBox.image.jRemoveEvent("transitionend");
                                   this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend");
                                   this.zoomBox.node.jAddClass("mz-activating");
                                   this.node.jAddClass("mz-activating");
                                   this.reflowZoom();
                                   this.zoomSize.width = M.width;
                                   this.zoomSize.height = M.height;
                                   this.zoomBox.activating = false;
                                   this.zoomBox.active = true;
                                   L = z.detach(this.zoomSize);
                                   this.zoomBox.node.jRemoveClass("mz-activating");
                                   this.node.jRemoveClass("mz-activating").jAddClass("mz-active");
                                   this.lens.spos = {
                                       x: 0,
                                       y: 0
                                   };
                                   this.lens.pos = {
                                       x: 0,
                                       y: 0
                                   };
                                   O = true;
                                   if (!this.expanded) {
                                       this.showHint(true)
                                   }
                               }
                               K(Q.scale, R, O);
                               if (O) {
                                   s("onZoomIn", this.id)
                               }
                           }
                       }
                   }
                   break
               }
           }).jBind(this);
           this.node.jAddEvent("pinch", J)
       },
       setupButtons: function () {
           var J = document.createDocumentFragment();
           g(["prev", "next", "close"]).jEach(function (L) {
               var K = "mz-button";
               this.buttons[L] = z.$new("button", {
                   type: "button",
                   title: this.option("text-btn-" + L)
               }).jAddClass(K).jAddClass(K + "-" + L);
               J.appendChild(this.buttons[L]);
               switch (L) {
               case "prev":
                   this.buttons[L].jAddEvent("tap btnclick", function (M) {
                       M.stop();
                       this.update(this.getPrev())
                   }.jBindAsEvent(this));
                   break;
               case "next":
                   this.buttons[L].jAddEvent("tap btnclick", function (M) {
                       M.stop();
                       this.update(this.getNext())
                   }.jBindAsEvent(this));
                   break;
               case "close":
                   this.buttons[L].jAddEvent("tap btnclick", function (M) {
                       M.stop();
                       this.close()
                   }.jBindAsEvent(this)).hide();
                   break;
               default:
               }
           }, this);
           this.toggleNavButtons(this.additionalImages.length > 1);
           this.navControlsLayer = z.$new("div").jAddClass("mz-nav-controls").append(J).jAppendTo(this.node)
       },
       toggleNavButtons: function (J) {
           if (J) {
               this.buttons.next.show();
               this.buttons.prev.show()
           } else {
               this.buttons.next.hide();
               this.buttons.prev.hide()
           }
       },
       openLink: function () {
           if (this.image.link) {
               window.open(this.image.link, "_self")
           }
       },
       getNext: function () {
           var J = (this.expanded ? this.expandGallery : this.additionalImages).filter(function (M) {
               return (M.small.state !== -1 || M.zoom.state !== -1)
           });
           var K = J.length;
           var L = g(J).indexOf(this.image) + 1;
           return (K <= 1) ? null : J[(L >= K) ? 0 : L]
       },
       getPrev: function () {
           var J = (this.expanded ? this.expandGallery : this.additionalImages).filter(function (M) {
               return (M.small.state !== -1 || M.zoom.state !== -1)
           });
           var K = J.length;
           var L = g(J).indexOf(this.image) - 1;
           return (K <= 1) ? null : J[(L < 0) ? K - 1 : L]
       },
       imageByURL: function (K, L) {
           var J = this.additionalImages.filter(function (M) {
               return ((M.zoom.src.has(K) || M.zoom.url.has(K)) && (M.small.src.has(L) || M.small.url.has(L)))
           }) || [];
           return J[0] || ((L && K && z.jTypeOf(L) === "string" && z.jTypeOf(K) === "string") ? new j(L, K) : null)
       },
       imageByOrigin: function (K) {
           var J = this.additionalImages.filter(function (L) {
               return (L.origin === K)
           }) || [];
           return J[0]
       },
       imageByIndex: function (J) {
           return this.additionalImages[J]
       }
   };
   t = {
       version: "v5.3.7 DEMO",
       start: function (M, K) {
           var L = null;
           var J = [];
           z.$A((M ? [g(M)] : z.$A(document.byClass("MagicZoom")).concat(z.$A(document.byClass("MagicZoomPlus"))))).jEach(g(function (N) {
               if (g(N)) {
                   if (!h(N)) {
                       L = new i(N, K);
                       if (x && !L.option("autostart")) {
                           L.stop();
                           L = null
                       } else {
                           G.push(L);
                           J.push(L)
                       }
                   }
               }
           }).jBind(this));
           return M ? J[0] : J
       },
       stop: function (M) {
           var K, L, J;
           if (M) {
               (L = h(M)) && (L = G.splice(G.indexOf(L), 1)) && L[0].stop() && (delete L[0]);
               return
           }
           while (K = G.length) {
               L = G.splice(K - 1, 1);
               L[0].stop();
               delete L[0]
           }
       },
       refresh: function (J) {
           this.stop(J);
           return this.start(J)
       },
       update: function (O, N, M, K) {
           var L = h(O);
           var J;
           if (L) {
               J = z.jTypeOf(N) === "element" ? L.imageByOrigin(N) : L.imageByURL(N, M);
               if (J) {
                   L.update(J)
               }
           }
       },
       switchTo: function (M, L) {
           var K = h(M);
           var J;
           if (K) {
               switch (z.jTypeOf(L)) {
               case "element":
                   J = K.imageByOrigin(L);
                   break;
               case "number":
                   J = K.imageByIndex(L);
                   break;
               default:
               }
               if (J) {
                   K.update(J)
               }
           }
       },
       prev: function (K) {
           var J;
           (J = h(K)) && J.update(J.getPrev())
       },
       next: function (K) {
           var J;
           (J = h(K)) && J.update(J.getNext())
       },
       zoomIn: function (K) {
           var J;
           (J = h(K)) && J.activate()
       },
       zoomOut: function (K) {
           var J;
           (J = h(K)) && J.deactivate()
       },
       registerCallback: function (J, K) {
           if (!p[J]) {
               p[J] = []
           }
           if (z.jTypeOf(K) === "function") {
               p[J].push(K)
           }
       },
       running: function (J) {
           return !!h(J)
       }
   };
   g(document).jAddEvent("domready", function () {
       var K = window[E + "Options"] || {};
       r = r();
       c();
       I = z.$new("div", {
           "class": "magic-hidden-wrapper"
       }).jAppendTo(document.body);
       H = (z.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches);
       if (z.browser.mobile) {
           z.extend(o, k)
       }
       if (H && z.browser.platform === "ios") {
           v = z.$new("div").jSetCss({
               position: "fixed",
               top: 0,
               width: 0,
               height: "100vh"
           })
       }
       for (var J = 0; J < A.length; J++) {
           if (K[A[J]] && z.$F !== K[A[J]]) {
               t.registerCallback(A[J], K[A[J]])
           }
       }
       t.start();
       x = false
   });
   window.MagicZoomPlus = window.MagicZoomPlus || {};
   return t
})();