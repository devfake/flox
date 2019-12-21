webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(100);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  methods: {
    scrollToTop: function scrollToTop() {
      var scrollDuration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

      var cosParameter = window.scrollY / 2;
      var scrollCount = 0;
      var oldTimestamp = performance.now();

      function step(newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));

        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;

        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    },
    suggestionsUri: function suggestionsUri(item) {
      return '/suggestions?for=' + item.tmdb_id + '&name=' + item.title + '&type=' + item.media_type;
    },
    lang: function lang(text) {
      var language = JSON.parse(config.language);

      return language[text] || text;
    },
    formatLocaleDate: function formatLocaleDate(date) {
      var language = navigator.language || navigator.userLanguage;

      return date.toLocaleDateString(language, {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      });
    },
    isSubpage: function isSubpage() {
      return this.$route.name.includes('subpage');
    }
  },

  computed: {
    displayHeader: function displayHeader() {
      if (this.isSubpage()) {
        return this.itemLoadedSubpage;
      }

      return true;
    }
  }
};

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(39)('wks');
var uid = __webpack_require__(28);
var Symbol = __webpack_require__(5).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(51);
var toPrimitive = __webpack_require__(34);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(6);
var ctx = __webpack_require__(18);
var hide = __webpack_require__(13);
var has = __webpack_require__(15);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(19)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(20);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(53);
var defined = __webpack_require__(35);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(26);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(153);

var _typeof3 = _interopRequireDefault(_typeof2);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  methods: {
    addToWatchlist: function addToWatchlist(item) {
      var _this = this;

      if (this.auth) {
        this.rated = true;

        _axios2.default.post(config.api + '/watchlist', { item: item }).then(function (response) {
          _this.setItem(response.data);
          _this.rated = false;
        }, function (error) {
          alert(error.message);
          _this.rated = false;
        });
      }
    },
    genreAsString: function genreAsString(genre) {
      if ((typeof genre === 'undefined' ? 'undefined' : (0, _typeof3.default)(genre)) == 'object') {
        return genre.map(function (item) {
          return item.name;
        }).join(', ');
      }

      return genre;
    },
    displaySeason: function displaySeason(item) {
      return item.media_type == 'tv' && item.rating != null && item.tmdb_id && !item.watchlist;
    },
    isOnNetflix: function isOnNetflix(homepage) {
      return homepage && homepage.includes('netflix');
    },
    isOnAmazon: function isOnAmazon(homepage) {
      return homepage && homepage.includes('amazon');
    },
    openSeasonModal: function openSeasonModal(item) {
      var data = {
        tmdb_id: item.tmdb_id,
        title: item.title
      };

      this.fetchEpisodes(data);

      this.OPEN_MODAL({
        type: 'season',
        data: data
      });
    },
    openListModal: function openListModal(item) {
      var data = {
        tmdb_id: item.tmdb_id,
        title: item.title
      };

      this.OPEN_MODAL({
        type: 'add-to-list',
        data: data
      });
    },
    addZero: function addZero(item) {
      if (item < 10) {
        return '0' + item;
      }

      return item;
    },
    intToFloat: function intToFloat(int) {
      if (int) {
        return parseFloat(int).toFixed(1);
      }

      return null;
    }
  },

  computed: {
    season: function season() {
      if (this.latestEpisode) {
        return this.addZero(this.latestEpisode.season_number);
      }
    },
    episode: function episode() {
      if (this.latestEpisode) {
        return this.addZero(this.latestEpisode.episode_number);
      }
    }
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(52);
var enumBugKeys = __webpack_require__(40);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(15);
var TAG = __webpack_require__(7)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(151)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(65)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(5).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(37);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(39)('keys');
var uid = __webpack_require__(28);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(6);
var global = __webpack_require__(5);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(22) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 41 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(35);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 43 */,
/* 44 */,
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(145);
var global = __webpack_require__(5);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(24);
var TO_STRING_TAG = __webpack_require__(7)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(69);
var ITERATOR = __webpack_require__(7)('iterator');
var Iterators = __webpack_require__(24);
module.exports = __webpack_require__(6).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(7);


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var core = __webpack_require__(6);
var LIBRARY = __webpack_require__(22);
var wksExt = __webpack_require__(47);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Item_vue__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Item_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Item_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Item_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ff09f514_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Item_vue__ = __webpack_require__(178);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Item_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_ff09f514_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Item.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ff09f514", Component.options)
  } else {
    hotAPI.reload("data-v-ff09f514", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(26);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(19)(function () {
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(15);
var toIObject = __webpack_require__(16);
var arrayIndexOf = __webpack_require__(104)(false);
var IE_PROTO = __webpack_require__(38)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _Search = __webpack_require__(114);

var _Search2 = _interopRequireDefault(_Search);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _vuex = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  data: function data() {
    return {
      sticky: false,
      enableStickyOn: 100,
      latestRoute: '',
      mobileNavigationOpen: false
    };
  },
  mounted: function mounted() {
    this.latestRoute = this.$route.name;
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    itemLoadedSubpage: function itemLoadedSubpage(state) {
      return state.itemLoadedSubpage;
    }
  }), {
    root: function root() {
      return config.uri;
    }
  }),

  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['loadItems']), {
    initSticky: function initSticky() {
      var _this = this;

      window.onscroll = function () {
        _this.sticky = document.body.scrollTop + document.documentElement.scrollTop > _this.enableStickyOn;
      };
    },
    toggleMobileNavigation: function toggleMobileNavigation() {
      this.mobileNavigationOpen = !this.mobileNavigationOpen;
    },
    refresh: function refresh(route) {
      this.mobileNavigationOpen = false;
      var name = this.$route.name;

      if (this.latestRoute === route) {
        this.loadItems({ name: name });
      }

      this.latestRoute = name;
    }
  }),

  components: {
    Search: _Search2.default
  }
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _vuex = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  data: function data() {
    return {
      hideSearch: false
    };
  },
  created: function created() {
    this.disableSearch();
  },


  watch: {
    $route: function $route() {
      this.disableSearch();
    }
  },

  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    itemLoadedSubpage: function itemLoadedSubpage(state) {
      return state.itemLoadedSubpage;
    }
  }), {
    suggestionsFor: function suggestionsFor() {
      return this.$route.query.name;
    },


    title: {
      get: function get() {
        return this.$store.state.searchTitle;
      },
      set: function set(title) {
        this.$store.commit('SET_SEARCH_TITLE', title);
      }
    },

    placeholder: function placeholder() {
      return config.auth ? this.lang('search or add') : this.lang('search');
    }
  }),

  methods: {
    search: function search() {
      if (this.title !== '') {
        this.$router.push({
          path: '/search?q=' + this.title
        });
      }
    },
    disableSearch: function disableSearch() {
      this.hideSearch = this.$route.name === 'calendar';
    }
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  data: function data() {
    return {
      hideFooter: false,
      auth: config.auth,
      logout: config.api + '/logout',
      login: config.url + '/login',
      settings: config.url + '/settings'
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    colorScheme: function colorScheme(state) {
      return state.colorScheme;
    },
    loading: function loading(state) {
      return state.loading;
    }
  })),

  created: function created() {
    this.disableFooter();
  },


  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['setColorScheme']), {
    toggleColorScheme: function toggleColorScheme() {
      var color = this.colorScheme === 'light' ? 'dark' : 'light';

      this.setColorScheme(color);
    },
    disableFooter: function disableFooter() {
      this.hideFooter = this.$route.name === 'calendar';
    }
  }),

  watch: {
    $route: function $route() {
      this.disableFooter();
    }
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    document.body.classList.add('dark');
  },
  data: function data() {
    return {
      username: '',
      password: '',
      error: false,
      errorShake: false
    };
  },


  methods: {
    login: function login() {
      var _this = this;

      this.error = false;
      var username = this.username;
      var password = this.password;

      _axios2.default.post(config.api + '/login', { username: username, password: password }).then(function (value) {
        window.location.href = config.url;
      }, function (error) {
        _this.error = true;
        _this.errorShake = true;

        setTimeout(function () {
          _this.errorShake = false;
        }, 500);
      });
    }
  }
};

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _Season = __webpack_require__(142);

var _Season2 = _interopRequireDefault(_Season);

var _Trailer = __webpack_require__(167);

var _Trailer2 = _interopRequireDefault(_Trailer);

var _ListForm = __webpack_require__(169);

var _ListForm2 = _interopRequireDefault(_ListForm);

var _AddToList = __webpack_require__(171);

var _AddToList2 = _interopRequireDefault(_AddToList);

var _vuex = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    overlay: function overlay(state) {
      return state.overlay;
    },
    modalType: function modalType(state) {
      return state.modalType;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['CLOSE_MODAL'])),

  components: {
    Season: _Season2.default, Trailer: _Trailer2.default, ListForm: _ListForm2.default, AddToList: _AddToList2.default
  }
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = __webpack_require__(143);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _item = __webpack_require__(25);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default, _item2.default],

  data: function data() {
    return {
      auth: config.auth
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    modalData: function modalData(state) {
      return state.modalData;
    },
    loadingModalData: function loadingModalData(state) {
      return state.loadingModalData;
    },
    seasonActiveModal: function seasonActiveModal(state) {
      return state.seasonActiveModal;
    }
  }), {
    episodes: function episodes() {
      return this.modalData.episodes;
    },
    spoiler: function spoiler() {
      return this.modalData.spoiler;
    }
  }),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_SEASON_ACTIVE_MODAL', 'CLOSE_MODAL', 'SET_LOADING_MODAL_DATA', 'SET_MODAL_DATA']), {
    released: function released(date) {
      var released = new Date(date * 1000);

      return this.formatLocaleDate(released);
    },
    toggleAll: function toggleAll() {
      var season = this.seasonActiveModal;
      var tmdb_id = this.modalData.episodes[1][0].tmdb_id;
      var seen = this.seasonCompleted(season);

      this.markAllEpisodes(season, seen);

      _axios2.default.patch(config.api + '/toggle-season', {
        tmdb_id: tmdb_id,
        season: season,
        seen: !seen
      });
    },
    markAllEpisodes: function markAllEpisodes(season, seen) {
      var episodes = this.episodes[season];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(episodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var episode = _step.value;

          episode.seen = !seen;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    toggleEpisode: function toggleEpisode(episode) {
      if (this.auth) {
        episode.seen = !episode.seen;

        _axios2.default.patch(config.api + '/toggle-episode/' + episode.id).catch(function (error) {
          episode.seen = !episode.seen;
        });
      }
    },
    seasonCompleted: function seasonCompleted(index) {
      var episodes = this.episodes[index];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(episodes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var episode = _step2.value;

          if (!episode.seen) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return true;
    }
  })
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var $export = __webpack_require__(11);
var redefine = __webpack_require__(66);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(24);
var $iterCreate = __webpack_require__(148);
var setToStringTag = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(150);
var ITERATOR = __webpack_require__(7)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(149);
var enumBugKeys = __webpack_require__(40);
var IE_PROTO = __webpack_require__(38)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(33)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(68).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(5).document;
module.exports = document && document.documentElement;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(21);
var TAG = __webpack_require__(7)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(52);
var hiddenKeys = __webpack_require__(40).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {



/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    modalData: function modalData(state) {
      return state.modalData;
    }
  }), {
    trailerSrc: function trailerSrc() {
      return 'https://www.youtube.com/embed/' + this.modalData.youtubeKey;
    }
  }),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['CLOSE_MODAL']))
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _item = __webpack_require__(25);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default, _item2.default],

  data: function data() {
    return {
      auth: config.auth,
      name: '',
      is_public: true
    };
  },
  created: function created() {
    var list = this.modalData.list;


    if (list) {
      this.name = list.name;
      this.is_public = list.is_public;
    }
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    modalData: function modalData(state) {
      return state.modalData;
    },
    seasonActiveModal: function seasonActiveModal(state) {
      return state.seasonActiveModal;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['CLOSE_MODAL']), (0, _vuex.mapActions)(['loadLists']), {
    removeList: function removeList() {
      var _this = this;

      var confirm = window.confirm(this.lang('confirm delete'));

      if (confirm) {
        var list = this.modalData.list;

        _axios2.default.delete(config.api + '/list/' + list.id).then(function () {
          _this.CLOSE_MODAL();
          _this.loadLists();
        });
      }
    },
    saveList: function saveList() {
      var _this2 = this;

      if (this.name) {
        var name = this.name;
        var is_public = this.is_public;
        var list = this.modalData.list;

        if (!list) {
          _axios2.default.post(config.api + '/list', { name: name, is_public: is_public }).then(function () {
            _this2.CLOSE_MODAL();
            _this2.loadLists();
          });
        } else {
          _axios2.default.put(config.api + '/list/' + list.id, { name: name, is_public: is_public }).then(function () {
            _this2.CLOSE_MODAL();
            _this2.loadLists();
          });
        }
      }
    }
  })
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _item = __webpack_require__(25);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default, _item2.default],

  data: function data() {
    return {
      auth: config.auth
    };
  },
  created: function created() {
    this.loadListsForItem(this.modalData.tmdb_id);
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    modalData: function modalData(state) {
      return state.modalData;
    },
    lists: function lists(state) {
      return state.lists;
    },
    loadingModalData: function loadingModalData(state) {
      return state.loadingModalData;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['CLOSE_MODAL']), (0, _vuex.mapActions)(['loadListsForItem']), {
    saveList: function saveList() {
      var _this = this;

      if (this.name) {
        var name = this.name;
        var is_public = this.is_public;
        var list = this.modalData.list;

        if (!list) {
          _axios2.default.post(config.api + '/list', { name: name, is_public: is_public }).then(function () {
            _this.CLOSE_MODAL();
            _this.loadLists();
          });
        } else {
          _axios2.default.put(config.api + '/list/' + list.id, { name: name, is_public: is_public }).then(function () {
            _this.CLOSE_MODAL();
            _this.loadLists();
          });
        }
      }
    }
  })
};

/***/ }),
/* 75 */,
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _Item = __webpack_require__(49);

var _Item2 = _interopRequireDefault(_Item);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.fetchData();
    this.fetchSettings();
  },
  data: function data() {
    return {
      showTotal: false,
      displayGenre: null,
      displayDate: null,
      displayRatings: null
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    filters: function filters(state) {
      return state.filters;
    },
    showFilters: function showFilters(state) {
      return state.showFilters;
    },
    loading: function loading(state) {
      return state.loading;
    },
    items: function items(state) {
      return state.items;
    },
    total: function total(state) {
      return state.total;
    },
    userFilter: function userFilter(state) {
      return state.userFilter;
    },
    userSortDirection: function userSortDirection(state) {
      return state.userSortDirection;
    },
    clickedMoreLoading: function clickedMoreLoading(state) {
      return state.clickedMoreLoading;
    },
    paginator: function paginator(state) {
      return state.paginator;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['loadItems', 'loadMoreItems', 'setSearchTitle', 'setPageTitle']), (0, _vuex.mapMutations)(['SET_USER_FILTER', 'SET_SHOW_FILTERS', 'SET_USER_SORT_DIRECTION']), {
    fetchData: function fetchData() {
      var name = this.$route.name;

      this.setTitle(name);
      this.loadItems({ name: name });
      this.setSearchTitle('');
    },
    setTitle: function setTitle(name) {
      switch (name) {
        case 'home':
          this.showTotal = false;
          return this.setPageTitle();
        case 'tv':
        case 'movie':
        case 'watchlist':
          this.showTotal = true;
          return this.setPageTitle(this.lang(name));
      }
    },
    fetchSettings: function fetchSettings() {
      var _this = this;

      (0, _axios2.default)(config.api + '/settings').then(function (value) {
        var data = value.data;

        _this.displayGenre = data.genre;
        _this.displayDate = data.date;
        _this.displayRatings = data.ratings;
      });
    },
    loadMore: function loadMore() {
      this.loadMoreItems(this.paginator);
    },
    toggleShowFilters: function toggleShowFilters() {
      this.SET_SHOW_FILTERS(!this.showFilters);
    },
    setUserFilter: function setUserFilter(filter) {
      this.SET_SHOW_FILTERS(false);

      localStorage.setItem('filter', filter);
      this.SET_USER_FILTER(filter);
      this.fetchData();
    },
    setUserSortDirection: function setUserSortDirection() {
      var newSort = this.userSortDirection === 'asc' ? 'desc' : 'asc';

      localStorage.setItem('sort-direction', newSort);
      this.SET_USER_SORT_DIRECTION(newSort);
      this.fetchData();
    }
  }),

  components: {
    Item: _Item2.default
  },

  watch: {
    $route: function $route() {
      this.fetchData();
    }
  }
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _Rating = __webpack_require__(78);

var _Rating2 = _interopRequireDefault(_Rating);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _item = __webpack_require__(25);

var _item2 = _interopRequireDefault(_item);

var _vuex = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default, _item2.default],

  props: ['item', 'genre', 'date', 'ratings'],

  data: function data() {
    return {
      localItem: this.item,
      latestEpisode: this.item.latest_episode,
      prevRating: null,
      auth: config.auth,
      rated: false
    };
  },


  computed: {
    hasSrc: function hasSrc() {
      return this.localItem.src || this.localItem.episodes_with_src_count > 0;
    },
    poster: function poster() {
      if (this.localItem.rating) {
        return config.poster + this.localItem.poster;
      }

      return config.posterTMDB + this.localItem.poster;
    },
    noImage: function noImage() {
      return config.url + '/assets/img/no-image.png';
    },
    released: function released() {
      var path = this.$route.path;
      var released = new Date(this.localItem.released * 1000);

      if (path === '/upcoming' || path === '/now-playing') {
        return this.formatLocaleDate(released);
      }

      return released.getFullYear();
    }
  },

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['OPEN_MODAL', 'SET_RATED']), (0, _vuex.mapActions)(['fetchEpisodes']), {
    setItem: function setItem(item) {
      this.localItem = item;
    },
    setRated: function setRated(rated) {
      this.rated = rated;
    },
    removeItem: function removeItem() {
      var _this = this;

      this.rated = true;

      _axios2.default.delete(config.api + '/remove/' + this.localItem.id).then(function (response) {
        _this.rated = false;
        _this.localItem.rating = null;
        _this.localItem.watchlist = null;
      }, function (error) {
        alert(error);
        _this.rated = false;
      });
    },
    editItem: function editItem() {}
  }),

  components: {
    Rating: _Rating2.default
  }
};

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Rating_vue__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Rating_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Rating_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Rating_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Rating_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c86fc6c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Rating_vue__ = __webpack_require__(177);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Rating_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c86fc6c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Rating_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Rating.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c86fc6c", Component.options)
  } else {
    hotAPI.reload("data-v-2c86fc6c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _debounce = __webpack_require__(32);

var _debounce2 = _interopRequireDefault(_debounce);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ratingMilliseconds = 700;
var newItemMilliseconds = 200;

exports.default = {
  props: ['item', 'set-item', 'rated', 'set-rated'],

  data: function data() {
    return {
      auth: config.auth
    };
  },


  computed: {
    localRated: function localRated() {
      return this.rated;
    }
  },

  created: function created() {
    this.saveNewRating = (0, _debounce2.default)(this.saveNewRating, ratingMilliseconds);
    this.addNewItem = (0, _debounce2.default)(this.addNewItem, newItemMilliseconds, true);
  },


  methods: {
    changeRating: function changeRating() {
      if (this.auth) {
        if (this.item.watchlist) {
          this.rating = 0;
        } else {
          this.prevRating = this.item.rating;
          this.item.rating = this.prevRating == 3 ? 1 : +this.prevRating + 1;
        }

        this.item.watchlist = false;

        this.saveNewRating();
      }
    },
    saveNewRating: function saveNewRating() {
      var _this = this;

      _axios2.default.patch(config.api + '/change-rating/' + this.item.id, { rating: this.item.rating }).catch(function (error) {
        _this.item.rating = _this.prevRating;
        alert('Error in saveNewRating()');
      });
    },
    addNewItem: function addNewItem() {
      var _this2 = this;

      if (this.auth) {
        this.setRated(true);

        _axios2.default.post(config.api + '/add', { item: this.item }).then(function (response) {
          _this2.setItem(response.data);

          _this2.setRated(false);
        }, function (error) {
          if (error.status == 409) {
            alert(_this2.item.title + ' already exists!');
          }
        });
      }
    }
  }
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(181);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(184);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _Item = __webpack_require__(49);

var _Item2 = _interopRequireDefault(_Item);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _vuex = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.initSearch();
  },
  data: function data() {
    return {
      floxItems: [],
      tmdbItems: []
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    searchTitle: function searchTitle(state) {
      return state.searchTitle;
    },
    loading: function loading(state) {
      return state.loading;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_SEARCH_TITLE', 'SET_LOADING']), (0, _vuex.mapActions)(['setPageTitle']), {
    initSearch: function initSearch() {
      var _this = this;

      this.SET_SEARCH_TITLE(this.$route.query.q);
      this.SET_LOADING(true);
      this.setPageTitle(this.lang('search for') + ' ' + this.$route.query.q);
      this.searchFlox();
      this.searchTMDB().then(function () {
        setTimeout(function () {
          _this.SET_LOADING(false);
        }, 500);
      });
    },
    searchFlox: function searchFlox() {
      var _this2 = this;

      (0, _axios2.default)(config.api + '/search-items?q=' + this.searchTitle).then(function (value) {
        _this2.floxItems = value.data;
      }, function (error) {
        console.log(error);
      });
    },
    searchTMDB: function searchTMDB() {
      var _this3 = this;

      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!config.auth) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return (0, _axios2.default)(config.api + '/search-tmdb?q=' + _this3.searchTitle).then(function (value) {
                  var floxItems = _this3.floxItems.map(function (item) {
                    return item.tmdb_id;
                  });
                  _this3.tmdbItems = value.data.filter(function (item) {
                    return !floxItems.includes(item.tmdb_id);
                  });
                }).catch(function (error) {
                  alert('Error in searchTMDB(): ' + error);
                });

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this3);
      }))();
    }
  }),

  components: {
    Item: _Item2.default
  },

  watch: {
    $route: function $route() {
      this.scrollToTop();
      this.initSearch();
    }
  }
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(24);
var ITERATOR = __webpack_require__(7)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(10);
var aFunction = __webpack_require__(26);
var SPECIES = __webpack_require__(7)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(190);
var html = __webpack_require__(68);
var cel = __webpack_require__(33);
var global = __webpack_require__(5);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(21)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var isObject = __webpack_require__(14);
var newPromiseCapability = __webpack_require__(50);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(7)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _User = __webpack_require__(199);

var _User2 = _interopRequireDefault(_User);

var _Options = __webpack_require__(201);

var _Options2 = _interopRequireDefault(_Options);

var _Backup = __webpack_require__(203);

var _Backup2 = _interopRequireDefault(_Backup);

var _Misc = __webpack_require__(205);

var _Misc2 = _interopRequireDefault(_Misc);

var _Refresh = __webpack_require__(207);

var _Refresh2 = _interopRequireDefault(_Refresh);

var _Reminders = __webpack_require__(209);

var _Reminders2 = _interopRequireDefault(_Reminders);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.setPageTitle(this.lang('settings'));
  },


  components: {
    User: _User2.default, Options: _Options2.default, Backup: _Backup2.default, Misc: _Misc2.default, Refresh: _Refresh2.default, Reminders: _Reminders2.default
  },

  data: function data() {
    return {
      activeTab: 'misc'
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['setPageTitle']), {
    changeActiveTab: function changeActiveTab(tab) {
      this.activeTab = tab;
    }
  })
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _debounce = __webpack_require__(32);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debounceMilliseconds = 2000;

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.fetchUserData();
    this.clearSuccessMessage = (0, _debounce2.default)(this.clearSuccessMessage, debounceMilliseconds);
  },
  data: function data() {
    return {
      username: '',
      password: '',
      success: false
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), {
    fetchUserData: function fetchUserData() {
      var _this = this;

      this.SET_LOADING(true);

      (0, _axios2.default)(config.api + '/settings').then(function (response) {
        _this.SET_LOADING(false);
        _this.username = response.data.username;
      });
    },
    editUser: function editUser() {
      var _this2 = this;

      var username = this.username;
      var password = this.password;

      if (username != '') {
        _axios2.default.patch(config.api + '/userdata', { username: username, password: password }).then(function () {
          _this2.success = true;
          _this2.clearSuccessMessage();
        });
      }
    },
    clearSuccessMessage: function clearSuccessMessage() {
      this.success = false;
    }
  })
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.fetchOptions();
  },
  data: function data() {
    return {
      genre: null,
      date: null,
      spoiler: null,
      watchlist: null,
      ratings: null
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), {
    fetchOptions: function fetchOptions() {
      var _this = this;

      this.SET_LOADING(true);
      (0, _axios2.default)(config.api + '/settings').then(function (response) {
        var data = response.data;

        _this.SET_LOADING(false);

        _this.genre = data.genre;
        _this.date = data.date;
        _this.spoiler = data.spoiler;
        _this.watchlist = data.watchlist;
        _this.ratings = data.ratings;
      });
    },
    updateOptions: function updateOptions() {
      var _this2 = this;

      this.SET_LOADING(true);

      var date = this.date;
      var genre = this.genre;
      var spoiler = this.spoiler;
      var watchlist = this.watchlist;
      var ratings = this.ratings;

      _axios2.default.patch(config.api + '/settings', { date: date, genre: genre, spoiler: spoiler, watchlist: watchlist, ratings: ratings }).then(function (response) {
        _this2.SET_LOADING(false);
      }, function (error) {
        alert(error.message);
      });
    }
  })

};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  data: function data() {
    return {
      uploadSuccess: false,
      uploadedFile: null
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  }), {
    exportLink: function exportLink() {
      return config.api + '/export';
    }
  }),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), {
    upload: function upload(event) {
      var file = event.target.files || event.dataTransfer.files;

      this.uploadedFile = new FormData();
      this.uploadedFile.append('import', file[0]);
    },
    importMovies: function importMovies() {
      var _this = this;

      if (this.uploadedFile) {
        var confirm = window.confirm(this.lang('import warn'));

        if (confirm) {
          this.SET_LOADING(true);

          _axios2.default.post(config.api + '/import', this.uploadedFile).then(function () {
            _this.SET_LOADING(false);
            _this.uploadSuccess = true;
          }, function (error) {
            _this.SET_LOADING(false);
            alert('Error: ' + error.response.data);
          });
        }
      }
    }
  })

};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.checkUpdate();
    this.fetchVersion();
  },
  data: function data() {
    return {
      version: '',
      isUpdate: null
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  }), {
    updateMessage: function updateMessage() {
      if (this.isUpdate === false) {
        return this.lang('no update');
      }

      return this.lang('checking update');
    }
  }),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), {
    fetchFiles: function fetchFiles() {
      var _this = this;

      this.SET_LOADING(true);

      _axios2.default.post(config.api + '/fetch-files').then(function () {
        _this.SET_LOADING(false);
      }).catch(function (error) {
        _this.SET_LOADING(false);
        alert(error.response.data);
      });
    },
    checkUpdate: function checkUpdate() {
      var _this2 = this;

      (0, _axios2.default)(config.api + '/check-update').then(function (response) {
        _this2.isUpdate = response.data;
      });
    },
    fetchVersion: function fetchVersion() {
      var _this3 = this;

      this.SET_LOADING(true);

      (0, _axios2.default)(config.api + '/version').then(function (response) {
        _this3.SET_LOADING(false);
        _this3.version = response.data.version;
      });
    }
  })
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.fetchOptions();
  },
  data: function data() {
    return {
      refresh: false,
      refreshAllClicked: false,
      showRefreshAllMessage: false
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), {
    fetchOptions: function fetchOptions() {
      var _this = this;

      this.SET_LOADING(true);
      (0, _axios2.default)(config.api + '/settings').then(function (response) {
        _this.refresh = response.data.refresh;

        _this.SET_LOADING(false);
      });
    },
    updateRefresh: function updateRefresh() {
      var _this2 = this;

      this.SET_LOADING(true);

      _axios2.default.patch(config.api + '/settings/refresh', { refresh: this.refresh }).then(function () {
        _this2.SET_LOADING(false);
      }, function (error) {
        alert(error.message);
      });
    },
    refreshAll: function refreshAll() {
      var _this3 = this;

      this.refreshAllClicked = true;

      _axios2.default.patch(config.api + '/refresh-all').then(function () {
        _this3.showRefreshAllMessage = true;
      }).catch(function (error) {
        _this3.refreshAllClicked = false;
        alert(error.response.data);
      });
    }
  })

};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _debounce = __webpack_require__(32);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debounceMilliseconds = 2000;

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.fetchUserData();
    this.clearSuccessMessage = (0, _debounce2.default)(this.clearSuccessMessage, debounceMilliseconds);
  },
  data: function data() {
    return {
      reminders_send_to: '',
      success: false,
      daily: false,
      weekly: false
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), {
    fetchUserData: function fetchUserData() {
      var _this = this;

      this.SET_LOADING(true);

      (0, _axios2.default)(config.api + '/settings').then(function (response) {
        var data = response.data;

        _this.reminders_send_to = data.reminders_send_to;
        _this.daily = data.daily;
        _this.weekly = data.weekly;

        _this.SET_LOADING(false);
      });
    },
    editSetting: function editSetting() {
      var _this2 = this;

      _axios2.default.patch(config.api + '/settings/reminders-send-to', { reminders_send_to: this.reminders_send_to }).then(function () {
        _this2.success = true;
        _this2.clearSuccessMessage();
      });
    },
    updateReminders: function updateReminders() {
      var _this3 = this;

      this.SET_LOADING(true);

      var daily = this.daily;
      var weekly = this.weekly;

      _axios2.default.patch(config.api + '/settings/reminder-options', { daily: daily, weekly: weekly }).then(function () {
        _this3.SET_LOADING(false);
      }, function (error) {
        alert(error.message);
      });
    },
    clearSuccessMessage: function clearSuccessMessage() {
      this.success = false;
    }
  })
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _Item = __webpack_require__(49);

var _Item2 = _interopRequireDefault(_Item);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _vuex = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.fetchSettings();
    this.init();
  },
  data: function data() {
    return {
      items: [],
      genres: [],
      isGenrePage: false,
      currentGenre: '',
      showWatchlistItems: false,
      path: '',
      displayRatings: null
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    },
    showFilters: function showFilters(state) {
      return state.showFilters;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING', 'SET_SHOW_FILTERS']), (0, _vuex.mapActions)(['setPageTitle']), {
    init: function init() {
      this.SET_LOADING(true);
      this.path = this.$route.name;

      switch (this.path) {
        case 'suggestions':
          return this.initSuggestions();
        case 'genre':
          this.isGenrePage = true;
          return this.initContentByGenre();
        case 'trending':
        case 'upcoming':
        case 'now-playing':
          return this.initContent(this.path);
      }
    },
    toggleWatchlistItems: function toggleWatchlistItems() {
      this.showWatchlistItems = !this.showWatchlistItems;
    },
    toggleShowGenres: function toggleShowGenres() {
      this.SET_SHOW_FILTERS(!this.showFilters);
    },
    initAllGenres: function initAllGenres() {
      var _this = this;

      (0, _axios2.default)(config.api + '/genres').then(function (response) {
        _this.genres = response.data;
      }, function (error) {
        console.log(error);
      });
    },
    initContentByGenre: function initContentByGenre() {
      var _this2 = this;

      this.initAllGenres();

      this.currentGenre = this.$route.params.genre;

      this.setPageTitle(this.lang('genre'));

      (0, _axios2.default)(config.api + '/genre/' + this.currentGenre).then(function (response) {
        _this2.items = response.data;
        _this2.SET_LOADING(false);
      }, function (error) {
        console.log(error);
        _this2.$router.push('/');
      });
    },
    initSuggestions: function initSuggestions() {
      var _this3 = this;

      var tmdbID = this.$route.query.for;
      var type = this.$route.query.type;

      this.setPageTitle(this.lang('suggestions for') + ' ' + this.$route.query.name);

      (0, _axios2.default)(config.api + '/suggestions/' + tmdbID + '/' + type).then(function (response) {
        _this3.items = response.data;
        _this3.SET_LOADING(false);
      });
    },
    initContent: function initContent(path) {
      var _this4 = this;

      this.items = [];
      this.setPageTitle(this.lang(path));

      (0, _axios2.default)(config.api + '/' + path).then(function (response) {
        _this4.items = response.data;
        _this4.SET_LOADING(false);
      });
    },
    fetchSettings: function fetchSettings() {
      var _this5 = this;

      (0, _axios2.default)(config.api + '/settings').then(function (value) {
        _this5.displayRatings = value.data.ratings;
      });
    }
  }),

  components: {
    Item: _Item2.default
  },

  watch: {
    $route: function $route() {
      this.scrollToTop();
      this.init();
    }
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _Rating = __webpack_require__(78);

var _Rating2 = _interopRequireDefault(_Rating);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _item = __webpack_require__(25);

var _item2 = _interopRequireDefault(_item);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default, _item2.default],

  props: ['mediaType'],

  created: function created() {
    document.body.classList.add('subpage-open');
    window.scrollTo(0, 0);
    this.fetchSettings();
    this.fetchData();
  },
  destroyed: function destroyed() {
    document.body.classList.remove('subpage-open');
    this.SET_ITEM_LOADED_SUBPAGE(false);
    this.CLOSE_MODAL();
  },
  data: function data() {
    return {
      item: {},
      latestEpisode: null,
      loadingImdb: false,
      auth: config.auth,
      rated: false,
      displayRatings: null
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    },
    itemLoadedSubpage: function itemLoadedSubpage(state) {
      return state.itemLoadedSubpage;
    }
  }), {
    overview: function overview() {
      return this.item.overview ? this.item.overview : '-';
    },
    backdropImage: function backdropImage() {
      var backdropUrl = config.backdropTMDB;

      if (this.item.rating != null) {
        backdropUrl = config.backdrop;
      }

      return {
        backgroundImage: 'url(' + backdropUrl + this.item.backdrop + ')'
      };
    },
    posterImage: function posterImage() {
      if (!this.item.poster) {
        return this.noImage;
      }

      if (this.item.rating != null) {
        return config.posterSubpage + this.item.poster;
      }

      return config.posterSubpageTMDB + this.item.poster;
    },
    noImage: function noImage() {
      return config.url + '/assets/img/no-image-subpage.png';
    },
    released: function released() {
      var released = new Date(this.item.released * 1000);

      return released.getFullYear();
    }
  }),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING', 'SET_ITEM_LOADED_SUBPAGE', 'OPEN_MODAL', 'CLOSE_MODAL', 'SET_RATED']), (0, _vuex.mapActions)(['setPageTitle', 'fetchEpisodes']), {
    openTrailer: function openTrailer() {
      this.OPEN_MODAL({
        type: 'trailer',
        data: {
          youtubeKey: this.item.youtube_key,
          title: this.item.title
        }
      });
    },
    fetchImdbRating: function fetchImdbRating() {
      var _this = this;

      if (this.item.imdb_id && this.item.rating == null) {
        this.loadingImdb = true;

        (0, _axios2.default)(config.api + '/imdb-rating/' + this.item.imdb_id).then(function (response) {
          var rating = _this.intToFloat(response.data);

          _this.$set(_this.item, 'imdb_rating', rating);
          _this.loadingImdb = false;
        }, function (error) {
          alert(error);
          _this.loadingImdb = false;
        });
      }
    },
    fetchSettings: function fetchSettings() {
      var _this2 = this;

      (0, _axios2.default)(config.api + '/settings').then(function (value) {
        _this2.displayRatings = value.data.ratings;
      });
    },
    fetchData: function fetchData() {
      var _this3 = this;

      var tmdbId = this.$route.params.tmdbId;

      this.SET_LOADING(true);
      (0, _axios2.default)(config.api + '/item/' + tmdbId + '/' + this.mediaType).then(function (response) {
        _this3.item = response.data;
        _this3.item.tmdb_rating = _this3.intToFloat(response.data.tmdb_rating);
        _this3.latestEpisode = _this3.item.latest_episode;

        _this3.setPageTitle(_this3.item.title);

        _this3.disableLoading();
        _this3.fetchImdbRating();
      }, function (error) {
        console.log(error);
        _this3.SET_LOADING(false);
        _this3.$router.push('/');
      });
    },
    disableLoading: function disableLoading() {
      var _this4 = this;

      setTimeout(function () {
        _this4.SET_LOADING(false);
        _this4.displayItem();
      }, 100);
    },
    displayItem: function displayItem() {
      var _this5 = this;

      setTimeout(function () {
        _this5.SET_ITEM_LOADED_SUBPAGE(true);
      }, 50);
    },
    setItem: function setItem(item) {
      this.item = item;
    },
    setRated: function setRated(rated) {
      this.rated = rated;
    },
    removeItem: function removeItem() {
      var _this6 = this;

      this.rated = true;

      _axios2.default.delete(config.api + '/remove/' + this.item.id).then(function (response) {
        _this6.rated = false;
        _this6.item.rating = null;
        _this6.item.watchlist = null;
      }, function (error) {
        alert(error);
        _this6.rated = false;
      });
    },
    refreshInfos: function refreshInfos() {
      var _this7 = this;

      this.SET_LOADING(true);
      this.SET_ITEM_LOADED_SUBPAGE(false);

      _axios2.default.patch(config.api + '/refresh/' + this.item.id).then(function (response) {
        location.reload();
      }, function (error) {
        alert(error);
        _this7.SET_LOADING(false);
      });
    }
  }),

  components: {
    Rating: _Rating2.default
  }
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vueSimpleCalendar = __webpack_require__(217);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

var _isBetween = __webpack_require__(218);

var _isBetween2 = _interopRequireDefault(_isBetween);

var _dayjs = __webpack_require__(219);

var _dayjs2 = _interopRequireDefault(_dayjs);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

__webpack_require__(220);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs2.default.extend(_isBetween2.default);

exports.default = {
  mixins: [_misc2.default],

  data: function data() {
    return {
      showDate: new Date(),
      events: [],
      filteredEvents: []
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    }
  }), {
    keymap: function keymap() {
      return {
        left: this.navigateViaKey,
        right: this.navigateViaKey
      };
    }
  }),

  created: function created() {
    var _this = this;

    this.setPageTitle(this.lang('calendar'));
    this.SET_LOADING(true);
    this.checkForDate();

    (0, _axios2.default)(config.api + '/calendar').then(function (value) {
      _this.events = value.data;
      _this.SET_LOADING(false);
      _this.removeEventsOutsideOfMonth();
    });
  },


  watch: {
    $route: function $route() {
      this.checkForDate();
      this.removeEventsOutsideOfMonth();
    }
  },

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), (0, _vuex.mapActions)(['setPageTitle']), {
    removeEventsOutsideOfMonth: function removeEventsOutsideOfMonth() {
      var date = (0, _dayjs2.default)(this.showDate);
      var firstDay = date.startOf('month');
      var lastDay = date.endOf('month');

      this.filteredEvents = this.events.filter(function (event) {
        return (0, _dayjs2.default)(event.startDate).isBetween(firstDay, lastDay);
      });
    },
    navigateViaKey: function navigateViaKey(_ref) {
      var keyCode = _ref.keyCode;

      var date = (0, _dayjs2.default)(this.showDate);

      switch (keyCode) {
        case 37:
          return this.setShowDate(date.subtract(1, 'month'));
        case 39:
          return this.setShowDate(date.add(1, 'month'));
      }
    },
    checkForDate: function checkForDate() {
      var date = this.$route.query.date;


      if (date) {
        this.showDate = (0, _dayjs2.default)(date).toDate();
      } else {
        this.showDate = new Date();
      }
    },
    setShowDate: function setShowDate(date) {
      date = (0, _dayjs2.default)(date).format('YYYY-MM-DD');

      this.showDate = date;

      this.$router.push({ name: 'calendar', query: { date: date } });

      this.removeEventsOutsideOfMonth();
    },
    navigateToItem: function navigateToItem(event) {
      var _event$originalEvent = event.originalEvent,
          tmdb_id = _event$originalEvent.tmdb_id,
          type = _event$originalEvent.type;


      this.$router.push('/' + type + '/' + tmdb_id);
    }
  }),

  components: {
    CalendarView: _vueSimpleCalendar.CalendarView,
    CalendarViewHeader: _vueSimpleCalendar.CalendarViewHeader
  }
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(0);

var _misc = __webpack_require__(3);

var _misc2 = _interopRequireDefault(_misc);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_misc2.default],

  created: function created() {
    this.fetchData();
    this.fetchSettings();
  },
  data: function data() {
    return {
      auth: config.auth,
      displayGenre: null,
      displayDate: null,
      displayRatings: null
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    loading: function loading(state) {
      return state.loading;
    },
    lists: function lists(state) {
      return state.lists;
    }
  })),

  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['OPEN_MODAL']), (0, _vuex.mapActions)(['loadLists', 'setSearchTitle', 'setPageTitle']), {
    fetchData: function fetchData() {
      var name = this.$route.name;

      this.setTitle(name);
      this.loadLists();
      this.setSearchTitle('');
    },
    openList: function openList() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.OPEN_MODAL({
        type: 'list-form',
        data: {
          list: list
        }
      });
    },
    backdropImage: function backdropImage(latestBackdrop) {
      var backdropUrl = config.backdropTMDB;

      if (!latestBackdrop) {
        return {};
      }

      return {
        backgroundImage: 'url(' + backdropUrl + latestBackdrop + ')'
      };
    },
    setTitle: function setTitle(name) {
      return this.setPageTitle(this.lang(name));
    },
    fetchSettings: function fetchSettings() {
      var _this = this;

      (0, _axios2.default)(config.api + '/settings').then(function (value) {
        var data = value.data;

        _this.displayGenre = data.genre;
        _this.displayDate = data.date;
        _this.displayRatings = data.ratings;
      });
    }
  }),

  watch: {
    $route: function $route() {
      this.fetchData();
    }
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(2);

var _extends3 = _interopRequireDefault(_extends2);

var _checkbox = __webpack_require__(106);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _checkbox3 = __webpack_require__(107);

var _checkbox4 = _interopRequireDefault(_checkbox3);

__webpack_require__(109);

var _vue = __webpack_require__(23);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(0);

var _vHotkey = __webpack_require__(112);

var _vHotkey2 = _interopRequireDefault(_vHotkey);

var _Header = __webpack_require__(113);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(118);

var _Footer2 = _interopRequireDefault(_Footer);

var _Login = __webpack_require__(120);

var _Login2 = _interopRequireDefault(_Login);

var _Index = __webpack_require__(141);

var _Index2 = _interopRequireDefault(_Index);

var _routes = __webpack_require__(174);

var _routes2 = _interopRequireDefault(_routes);

var _store = __webpack_require__(224);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(239);

_vue2.default.use(_checkbox4.default);
_vue2.default.use(_vHotkey2.default);

var App = new _vue2.default({
  store: _store2.default,
  router: _routes2.default,

  created: function created() {
    var _this = this;

    this.checkForUserColorScheme();
    this.checkForUserFilter();
    this.checkForUserSortDirection();

    document.body.onclick = function (event) {
      var target = event.target;

      if (target !== document.querySelector('.current-filter') && _this.showFilters) {
        _this.SET_SHOW_FILTERS(false);
      }
    };
  },


  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
    colorScheme: function colorScheme(state) {
      return state.colorScheme;
    },
    filters: function filters(state) {
      return state.filters;
    },
    showFilters: function showFilters(state) {
      return state.showFilters;
    }
  })),

  components: {
    SiteHeader: _Header2.default, SiteFooter: _Footer2.default, Login: _Login2.default, Modal: _Index2.default
  },

  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['setColorScheme']), (0, _vuex.mapMutations)(['SET_USER_FILTER', 'SET_SHOW_FILTERS', 'SET_USER_SORT_DIRECTION']), {
    checkForUserColorScheme: function checkForUserColorScheme() {
      if (!localStorage.getItem('color')) {
        localStorage.setItem('color', 'dark');
      }

      this.setColorScheme(localStorage.getItem('color'));
    },
    checkForUserFilter: function checkForUserFilter() {
      var filter = localStorage.getItem('filter');

      if (!filter || !this.filters.includes(filter)) {
        localStorage.setItem('filter', this.filters[0]);
      }

      this.SET_USER_FILTER(localStorage.getItem('filter'));
    },
    checkForUserSortDirection: function checkForUserSortDirection() {
      if (!localStorage.getItem('sort-direction')) {
        localStorage.setItem('sort-direction', 'desc');
      }

      this.SET_USER_SORT_DIRECTION(localStorage.getItem('sort-direction'));
    }
  })
});

App.$mount('#app');

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
module.exports = __webpack_require__(6).Object.assign;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(11);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(103) });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(41);
var pIE = __webpack_require__(29);
var toObject = __webpack_require__(42);
var IObject = __webpack_require__(53);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(19)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(16);
var toLength = __webpack_require__(36);
var toAbsoluteIndex = __webpack_require__(105);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 122);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __webpack_require__(108);

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _checkbox = __webpack_require__(123);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_checkbox2.default.install = function (Vue) {
  Vue.component(_checkbox2.default.name, _checkbox2.default);
};

exports.default = _checkbox2.default;

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_45167309_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(125);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_45167309_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _emitter = __webpack_require__(1);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElCheckbox',

  mixins: [_emitter2.default],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  componentName: 'ElCheckbox',

  data: function data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },


  computed: {
    model: {
      get: function get() {
        return this.isGroup ? this.store : this.value !== undefined ? this.value : this.selfModel;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          this._checkboxGroup.min !== undefined && val.length < this._checkboxGroup.min && (this.isLimitExceeded = true);

          this._checkboxGroup.max !== undefined && val.length > this._checkboxGroup.max && (this.isLimitExceeded = true);

          this.isLimitExceeded === false && this.dispatch('ElCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    isChecked: function isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
    },
    isGroup: function isGroup() {
      var parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'ElCheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    store: function store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },
    isDisabled: function isDisabled() {
      return this.isGroup ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled : this.disabled || (this.elForm || {}).disabled;
    },
    _elFormItemSize: function _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxSize: function checkboxSize() {
      var temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize : temCheckboxSize;
    }
  },

  props: {
    value: {},
    label: {},
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系*/
    border: Boolean,
    size: String
  },

  methods: {
    addToStore: function addToStore() {
      if (Array.isArray(this.model) && this.model.indexOf(this.label) === -1) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange: function handleChange(ev) {
      var _this = this;

      if (this.isLimitExceeded) return;
      var value = void 0;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(function () {
        if (_this.isGroup) {
          _this.dispatch('ElCheckboxGroup', 'change', [_this._checkboxGroup.value]);
        }
      });
    }
  },

  created: function created() {
    this.checked && this.addToStore();
  },
  mounted: function mounted() {
    // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  },


  watch: {
    value: function value(_value) {
      this.dispatch('ElFormItem', 'el.form.change', _value);
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"el-checkbox",class:[
    _vm.border && _vm.checkboxSize ? 'el-checkbox--' + _vm.checkboxSize : '',
    { 'is-disabled': _vm.isDisabled },
    { 'is-bordered': _vm.border },
    { 'is-checked': _vm.isChecked }
  ],attrs:{"role":"checkbox","aria-checked":_vm.indeterminate ? 'mixed': _vm.isChecked,"aria-disabled":_vm.isDisabled,"id":_vm.id}},[_c('span',{staticClass:"el-checkbox__input",class:{
      'is-disabled': _vm.isDisabled,
      'is-checked': _vm.isChecked,
      'is-indeterminate': _vm.indeterminate,
      'is-focus': _vm.focus
    },attrs:{"aria-checked":"mixed"}},[_c('span',{staticClass:"el-checkbox__inner"}),(_vm.trueLabel || _vm.falseLabel)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"el-checkbox__original",attrs:{"type":"checkbox","aria-hidden":"true","name":_vm.name,"disabled":_vm.isDisabled,"true-value":_vm.trueLabel,"false-value":_vm.falseLabel},domProps:{"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,null)>-1:_vm._q(_vm.model,_vm.trueLabel)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(_vm.trueLabel):(_vm.falseLabel);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.handleChange],"focus":function($event){_vm.focus = true},"blur":function($event){_vm.focus = false}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],staticClass:"el-checkbox__original",attrs:{"type":"checkbox","aria-hidden":"true","disabled":_vm.isDisabled,"name":_vm.name},domProps:{"value":_vm.label,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.label)>-1:(_vm.model)},on:{"change":[function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.label,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.model=$$a.concat([$$v]))}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{_vm.model=$$c}},_vm.handleChange],"focus":function($event){_vm.focus = true},"blur":function($event){_vm.focus = false}}})]),(_vm.$slots.default || _vm.label)?_c('span',{staticClass:"el-checkbox__label"},[_vm._t("default"),(!_vm.$slots.default)?[_vm._v(_vm._s(_vm.label))]:_vm._e()],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

/******/ });

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
exports.default = {
  methods: {
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }
};

/***/ }),
/* 109 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 110 */,
/* 111 */,
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueHotkey=t():e.VueHotkey=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){var o,r,a;!function(n,u){r=[t],o=u,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.default=function(e){if(e&&"object"===(void 0===e?"undefined":t(e))){var r=e.which||e.keyCode||e.charCode;r&&(e=r)}if("number"==typeof e)return names[e];var a=String(e),u=n[a.toLowerCase()];if(u)return u;var u=o[a.toLowerCase()];return u||(1===a.length?a.charCodeAt(0):void 0)};var n=e.codes={backspace:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,"pause/break":19,"caps lock":20,esc:27,space:32,"page up":33,"page down":34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,delete:46,command:91,"left command":91,"right command":93,"numpad *":106,"numpad +":107,"numpad -":109,"numpad .":110,"numpad /":111,"num lock":144,"scroll lock":145,"my computer":182,"my calculator":183,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,"\\":220,"]":221,"'":222},o=e.aliases={windows:91,"⇧":16,"⌥":18,"⌃":17,"⌘":91,ctl:17,control:17,option:18,pause:19,break:19,caps:20,return:13,escape:27,spc:32,pgup:33,pgdn:34,ins:45,del:46,cmd:91};for(r=97;r<123;r++)n[String.fromCharCode(r)]=r-32;for(var r=48;r<58;r++)n[r-48]=r;for(r=1;r<13;r++)n["f"+r]=r+111;for(r=0;r<10;r++)n["numpad "+r]=r+96})},function(e,t,n){var o,r,a;!function(u,c){r=[e,t,n(0)],o=c,void 0!==(a="function"==typeof o?o.apply(t,r):o)&&(e.exports=a)}(0,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}(n),r=function(e){return Object.keys(e).map(function(t){var n={};return t.split("+").forEach(function(e){switch(e.toLowerCase()){case"ctrl":case"alt":case"shift":case"meta":n[e]=!0;break;default:n.keyCode=(0,o.default)(e)}}),n.callback=e[t],n})};t.default={install:function(e){e.directive("hotkey",{bind:function(e,t,n,o){e._keymap=r(t.value),e._keymapHasKeyUp=e._keymap.some(function(e){return e.callback.keyup}),e._keyHandler=function(t){var n=!0,o=!1,r=void 0;try{for(var a,u=e._keymap[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var c=a.value,i=c.keyCode===t.keyCode&&!!c.ctrl===t.ctrlKey&&!!c.alt===t.altKey&&!!c.shift===t.shiftKey&&!!c.meta===t.metaKey&&("keydown"===t.type?c.callback.keydown||c.callback:c.callback.keyup);i&&i(t)}}catch(e){o=!0,r=e}finally{try{!n&&u.return&&u.return()}finally{if(o)throw r}}},document.addEventListener("keydown",e._keyHandler),e._keymapHasKeyUp&&document.addEventListener("keyup",e._keyHandler)},unbind:function(e,t,n,o){document.removeEventListener("keydown",e._keyHandler),e._keymapHasKeyUp&&document.removeEventListener("keyup",e._keyHandler)}})}},e.exports=t.default})}])});

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3a0c8a8c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Header_vue__ = __webpack_require__(116);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Header_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3a0c8a8c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Header.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a0c8a8c", Component.options)
  } else {
    hotAPI.reload("data-v-3a0c8a8c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Search_vue__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Search_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Search_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Search_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Search_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42c23855_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Search_vue__ = __webpack_require__(115);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Search_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_42c23855_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Search_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Search.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42c23855", Component.options)
  } else {
    hotAPI.reload("data-v-42c23855", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: !_vm.hideSearch,
          expression: " ! hideSearch"
        }
      ],
      staticClass: "search-wrap"
    },
    [
      _c("div", { staticClass: "wrap" }, [
        _c(
          "form",
          {
            staticClass: "search-form",
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.search()
              }
            }
          },
          [
            _c("i", { staticClass: "icon-search" }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.title,
                  expression: "title"
                }
              ],
              staticClass: "search-input",
              attrs: {
                type: "text",
                placeholder: _vm.placeholder,
                autofocus: ""
              },
              domProps: { value: _vm.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.title = $event.target.value
                }
              }
            })
          ]
        )
      ]),
      _vm._v(" "),
      _vm.suggestionsFor
        ? _c("div", { staticClass: "suggestions-for" }, [
            _c(
              "div",
              { staticClass: "wrap" },
              [
                _vm._v("\n      " + _vm._s(_vm.lang("suggestions for")) + " "),
                _c(
                  "router-link",
                  {
                    attrs: {
                      to: {
                        name: "subpage-" + _vm.$route.query.type,
                        params: {
                          tmdbId: _vm.$route.query.for,
                          slug: _vm.$route.query.name
                        }
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.suggestionsFor))]
                )
              ],
              1
            )
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-42c23855", esExports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "header-wrap",
      class: {
        active: _vm.displayHeader,
        sticky: _vm.sticky,
        "mobile-open": _vm.mobileNavigationOpen
      }
    },
    [
      _c("header", [
        _c(
          "div",
          { staticClass: "wrap" },
          [
            _c(
              "router-link",
              {
                staticClass: "logo",
                attrs: { to: "/" },
                nativeOn: {
                  click: function($event) {
                    _vm.refresh("home")
                  }
                }
              },
              [
                _c("img", {
                  attrs: {
                    src: __webpack_require__(117),
                    alt: "Flox",
                    width: "108",
                    height: "32"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("i", {
              staticClass: "icon-hamburger",
              on: {
                click: function($event) {
                  _vm.toggleMobileNavigation()
                }
              }
            }),
            _vm._v(" "),
            _c("ul", { staticClass: "site-nav site-nav-first" }, [
              _c(
                "li",
                [
                  _c(
                    "router-link",
                    {
                      attrs: { to: "/trending" },
                      nativeOn: {
                        click: function($event) {
                          _vm.refresh("trending")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("trending")))]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                [
                  _c(
                    "router-link",
                    {
                      attrs: { to: "/now-playing" },
                      nativeOn: {
                        click: function($event) {
                          _vm.refresh("now-playing")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("now-playing")) + "\n          ")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                [
                  _c(
                    "router-link",
                    {
                      attrs: { to: "/upcoming" },
                      nativeOn: {
                        click: function($event) {
                          _vm.refresh("upcoming")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("upcoming")))]
                  )
                ],
                1
              )
            ]),
            _vm._v(" "),
            _c("ul", { staticClass: "site-nav-second" }, [
              _c(
                "li",
                [
                  _c(
                    "router-link",
                    {
                      attrs: { to: "/calendar" },
                      nativeOn: {
                        click: function($event) {
                          _vm.refresh("calendar")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("calendar")))]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                [
                  _c(
                    "router-link",
                    {
                      attrs: { to: "/lists", exact: "" },
                      nativeOn: {
                        click: function($event) {
                          _vm.refresh("lists")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("lists")) + "\n          ")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                [
                  _c(
                    "router-link",
                    {
                      attrs: { to: "/tv", exact: "" },
                      nativeOn: {
                        click: function($event) {
                          _vm.refresh("tv")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("tv")))]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "li",
                [
                  _c(
                    "router-link",
                    {
                      attrs: { to: "/movies", exact: "" },
                      nativeOn: {
                        click: function($event) {
                          _vm.refresh("movie")
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("movies")))]
                  )
                ],
                1
              )
            ])
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("search")
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3a0c8a8c", esExports)
  }
}

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAgCAMAAADAIm3oAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA3VUzEYcLwLuZj0R37swdFCks88gh69G2q19TA8M5+Ahm2KiinWg75n597FBo4OziAAACOklEQVRIx71Xf3eqMAxtocUCFlDHlCnqfvq29/L9v947FtLMyCadx90/PBporklvL0H8EMlsrZvVcrlq9HqWiFuielstwGOxeqvErVB9SGCQHyPpcnkG3YXFINZPMICnNd1RyJStia3M3ZcIzqBdeJAsyeALZIlPDRCdriqgp4/ARgzxl2SlAY+7V61f7+i3KfGuKdj686oUpEIylvWbcOlz32fzxFU6z+49u2czYAQhB8hFMJlqMe9kTtH5BKOt6kO1hSmtkqBFMNnmGbO+JCf7+ILx500fegSIqcxChJNNfV0JUw3WRvU0UHheW4eTbRe4X9hDtS37TuK+LbbUuxSl+SiCyTYTL3IMzUDqrsjMF71hqiigEeFkD5hvN/NesgOYKEe7w6sPeFGDVcdPqcLJ1NL/+T3G/vk6977spaKTbLC+QDIqDFLPXxx//im7c0ulkZFMcecCycgqtCOqVVSAg9OEJmM5Ua/kWUEyjCA77FCbnKz9bImQczIOOaKNNYp9qI0kSDCczMYMFwWCYv9WIEpCg7Z1pfQrl35Q+mRTaFtXH+pESxg81CSPGG3rCrv625/q8nAoeythdoU2hbZ1jRGb/emFvWFG3B1pVEmEsRs9YkQKVuG3ENcnVJcenhWthpzVeLOxoLZup8i2gsn4wNMeB56WDTwdDC4mXQaQBY1ylJ241QUybixqxJDK+0ZdvUDGoVEm7+fj93snDbQpc54swvF73FSuR75YaClrni2V2MjfemX6D0AKmiHCtfAOAAAAAElFTkSuQmCC"

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Footer_vue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Footer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Footer_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Footer_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Footer_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7c715270_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Footer_vue__ = __webpack_require__(119);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Footer_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7c715270_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Footer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Footer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c715270", Component.options)
  } else {
    hotAPI.reload("data-v-7c715270", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "footer",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: !_vm.loading && !_vm.hideFooter,
          expression: " ! loading && ! hideFooter"
        }
      ]
    },
    [
      _c("div", { staticClass: "wrap" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("span", { staticClass: "footer-actions" }, [
          _c(
            "span",
            {
              staticClass: "icon-constrast",
              attrs: { title: _vm.lang("change color") },
              on: {
                click: function($event) {
                  _vm.toggleColorScheme()
                }
              }
            },
            [_c("i")]
          ),
          _vm._v(" "),
          _c("a", {
            staticClass: "icon-github",
            attrs: { href: "https://github.com/devfake/flox", target: "_blank" }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "sub-links" }, [
          _vm.auth
            ? _c(
                "a",
                { staticClass: "login-btn", attrs: { href: _vm.settings } },
                [_vm._v(_vm._s(_vm.lang("settings")))]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.auth
            ? _c(
                "a",
                { staticClass: "login-btn", attrs: { href: _vm.logout } },
                [_vm._v(_vm._s(_vm.lang("logout")))]
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.auth
            ? _c(
                "a",
                { staticClass: "login-btn", attrs: { href: _vm.login } },
                [_vm._v("Login")]
              )
            : _vm._e()
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "attribution" }, [
      _c(
        "a",
        {
          staticClass: "tmdb-logo",
          attrs: { href: "https://www.themoviedb.org/", target: "_blank" }
        },
        [_c("i", { staticClass: "icon-tmdb" })]
      ),
      _vm._v(
        "\n      This product uses the TMDb API but is not endorsed or certified by TMDb\n    "
      )
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7c715270", esExports)
  }
}

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_10973acc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__ = __webpack_require__(139);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Login_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_10973acc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10973acc", Component.options)
  } else {
    hotAPI.reload("data-v-10973acc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("span", { staticClass: "top-bar" }),
    _vm._v(" "),
    _c("div", { staticClass: "login-wrap" }, [
      _c("img", {
        staticClass: "logo-login",
        attrs: {
          src: __webpack_require__(140),
          alt: "Flox",
          width: "108",
          height: "32"
        }
      }),
      _vm._v(" "),
      _c(
        "form",
        {
          staticClass: "login-form",
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.login()
            }
          }
        },
        [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.username,
                expression: "username"
              }
            ],
            attrs: {
              type: "text",
              placeholder: _vm.lang("username"),
              autofocus: ""
            },
            domProps: { value: _vm.username },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.username = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.password,
                expression: "password"
              }
            ],
            attrs: { type: "password", placeholder: _vm.lang("password") },
            domProps: { value: _vm.password },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.password = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "login-error" }, [
            _vm.error
              ? _c("span", [_vm._v(_vm._s(_vm.lang("login error")))])
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("input", {
            class: _vm.errorShake ? "shake-horizontal shake-constant" : "",
            attrs: { type: "submit" },
            domProps: { value: _vm.lang("login button") }
          })
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-10973acc", esExports)
  }
}

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAgCAMAAADAIm3oAAACE1BMVEUAAACKW/+cU+yaVO6KW/7GQsSQWPnnNKToNKOSV/e8Rs7QPruMWv2PWfqhUejGQsXEQsaqTeDoNKS7Rs+TV/bkNae/RcvtMZ6+RczGQsWVVvSlT+SrTd7sMp/wMJvtMZ7nNKS/RcvNP77QPrvTPbjNP73uMZ2RWPigUenhN6u6RtDSPbnGQsSwStqxStnARMrPPrvVPLbLQL/GQsTqM6LRPbrGQsTwMJy4R9LLQL/TPLe0SdbKQMHWO7XnNKStTN3eOK7QPruSV/fEQ8azSdfjNqjoNKPARMvmNaXmNKXEQsbdOK+6RtDuMZ29Rc3sMp/ARMnrM6DiNqntMZ3vMJy5R9HTPbiwS9m/RcvbObCKW/66R9DRPbnLQL+JW//IQcKtTNzdOK7oNKPfN6zXO7PJQcHYOrLKQMC1SdTqM6LEQ8axStjZOrG8Rs25R9HjNqjmNKWWVvLTPbi6R9CwS9m8Rs3PPrvlNabrMqDjNqivS9rNP73cOa/ARMrARMnGQsPBRMicU+zEQ8bfOKztMZ23SNPVPLa1SdXYOrPKQMG6R9GbU+2JW//RPbq8Rs7EQ8fBRMnPPrzWO7SwS9rGQsOyStfIQcLTPbixStjFQsXZOrHLQL/vMZyTV/boNKPrM6HtMZ6MWv2+RczbObDiNqmPWPm/RcvNP73cOa/lNafmNKWtTN2KW/6kUOaeUurdOK6pTeCVJkKBAAAAhXRSTlMAVd1V3QszETNVER3d3TMDhzMhFN27U0QpCN3d3d3dzEQsLCkU7+7d3d3b29HIwsG/vrarq56dmY+Pj4eHendfX1NEOh3u7uvdzMvBwLu4mY+Hd3dV+Pjz8/Pu7Ovm3d3R0czKyMbDwLu7tqioopmZmYeHfXdoaGZmVTk5OSH4+PPu3Ydmpzv5zwAAAydJREFUSMe9l+dX01AYxl+R0lpUakspRQsFBCx7FMosIntPF25w4QInoOJmCwVBFI1J1DqSovInmqQ3F9rGtoFTfx96evIhv3Pf3PvkCWwRRWyMpuBaZmZ+QXlVsgJCie5+24mFBYdjdXllevpjSv6DgxAqdHfT579835D9WFzMqAhSd+RsePhujj0caWnR0dFxcbf5y2FhIElM+sy8t2xuLqMKMP2WQfBElRpvAJ4dr9fWPvN84/gkwMt2zkrKFMXjM1KydxOlCnxrp3MUPEggbIBkvTsEdmEi/imruTqOZU1FGk3RJSybyIsERJezVgubsBHxSlEWDr5Iy2qyJpGsviNRIaw0qSQFyd5cxDa9Uw8bGAjCALJl6uxJJMtJBExSLpJNXVaiS9paxg4iShPRCbJlUdffItlNhcdzLESyqRtR6NIww6gA0UongHzZvfdI1oJc2JaLZB8qAGFlGtG/ETpVK1/28DiSnRJnqK6ORJM8jWQnH4uza2CH3FuTpl+BbFlU9hKSFQMidvlcuXuRpUj2tVkcpJllzcKup60gX1a5hGRHY3GWPF2ZvqIGjuRjSPbzMCA62Tol90uZlPJl6vOirMWIw4Q/1CXAYcwTZRfwvRvJATBTlAHkyypdouwW9jfxsjPCcysUZX/w0lQkaTdR7bAFWRaWlQmiMXVMkzuuHgHHHSzrBxE7SVIm8JKteQdxELLqJ88cDklZM2D6SI8hSgZxXBBjHKvng9jvGMHMrWzAW9Yb4UUwG6SDl/ndIMoG0lpHdQNsf+vrcniZn60PerIPRihKBbD9Q63QvFj1c6jBzpKcx0qhYNxyXKFTHVktxlWyT1yBimWHhcin2wG2E8RtRvDA6BvE0MjqgcdA0z0AIX3FwCBTh3ZKu7zUx+gCvTxxxxplGDMuIHQrAISiFuA39RCIqGiiW6bMt/DkSBQe3EEaYINuglAFlMmvcrhdOT1OV2vgdvV8L2KfG3Xgkop7YxdsRptK2ALIZn9z/OJZX193uVxlQdZvpUUscpgegugR6zf4INTvsEMc+3kO8JQF+WHx0mLRghe2eDTI//bJ9BcGDf91+LWedQAAAABJRU5ErkJggg=="

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06755e73_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__(173);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06755e73_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Modal/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06755e73", Component.options)
  } else {
    hotAPI.reload("data-v-06755e73", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Season_vue__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Season_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Season_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Season_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Season_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_84ab8ddc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Season_vue__ = __webpack_require__(166);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Season_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_84ab8ddc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Season_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Modal/Season.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-84ab8ddc", Component.options)
  } else {
    hotAPI.reload("data-v-84ab8ddc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(144), __esModule: true };

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(31);
module.exports = __webpack_require__(152);


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(146);
var step = __webpack_require__(147);
var Iterators = __webpack_require__(24);
var toIObject = __webpack_require__(16);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(65)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(67);
var descriptor = __webpack_require__(20);
var setToStringTag = __webpack_require__(30);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(7)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(27);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(15);
var toObject = __webpack_require__(42);
var IE_PROTO = __webpack_require__(38)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(37);
var defined = __webpack_require__(35);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var get = __webpack_require__(46);
module.exports = __webpack_require__(6).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(154);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(156);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(155), __esModule: true };

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(45);
module.exports = __webpack_require__(47).f('iterator');


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(157), __esModule: true };

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(158);
__webpack_require__(71);
__webpack_require__(164);
__webpack_require__(165);
module.exports = __webpack_require__(6).Symbol;


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(5);
var has = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(12);
var $export = __webpack_require__(11);
var redefine = __webpack_require__(66);
var META = __webpack_require__(159).KEY;
var $fails = __webpack_require__(19);
var shared = __webpack_require__(39);
var setToStringTag = __webpack_require__(30);
var uid = __webpack_require__(28);
var wks = __webpack_require__(7);
var wksExt = __webpack_require__(47);
var wksDefine = __webpack_require__(48);
var enumKeys = __webpack_require__(160);
var isArray = __webpack_require__(161);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(14);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(34);
var createDesc = __webpack_require__(20);
var _create = __webpack_require__(67);
var gOPNExt = __webpack_require__(162);
var $GOPD = __webpack_require__(163);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(27);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(70).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(29).f = $propertyIsEnumerable;
  __webpack_require__(41).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(22)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(28)('meta');
var isObject = __webpack_require__(14);
var has = __webpack_require__(15);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(19)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(27);
var gOPS = __webpack_require__(41);
var pIE = __webpack_require__(29);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(21);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(16);
var gOPN = __webpack_require__(70).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(29);
var createDesc = __webpack_require__(20);
var toIObject = __webpack_require__(16);
var toPrimitive = __webpack_require__(34);
var has = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(51);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(12) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('asyncIterator');


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48)('observable');


/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-wrap" }, [
    _c("div", { staticClass: "modal-header" }, [
      _c("span", [_vm._v(_vm._s(_vm.modalData.title))]),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "close-modal",
          on: {
            click: function($event) {
              _vm.CLOSE_MODAL()
            }
          }
        },
        [_c("i", { staticClass: "icon-close" })]
      )
    ]),
    _vm._v(" "),
    _vm.loadingModalData
      ? _c("div", { staticClass: "modal-content modal-content-loading" }, [
          _vm._m(0)
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loadingModalData
      ? _c(
          "div",
          { staticClass: "season-tabs" },
          _vm._l(_vm.episodes, function(season, index) {
            return _c(
              "span",
              {
                staticClass: "season-number no-select",
                class: {
                  active: index == _vm.seasonActiveModal,
                  completed: _vm.seasonCompleted(index)
                },
                on: {
                  click: function($event) {
                    _vm.SET_SEASON_ACTIVE_MODAL(index)
                  }
                }
              },
              [_vm._v("\n      S" + _vm._s(_vm.addZero(index)) + "\n    ")]
            )
          })
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.loadingModalData
      ? _c("div", { staticClass: "item-header no-select" }, [
          _c("span", { staticClass: "header-episode" }, [_vm._v("#")]),
          _vm._v(" "),
          _c("span", { staticClass: "header-name" }, [_vm._v("Name")]),
          _vm._v(" "),
          _vm.auth
            ? _c(
                "span",
                {
                  staticClass: "header-seen",
                  on: {
                    click: function($event) {
                      _vm.toggleAll()
                    }
                  }
                },
                [_vm._v("Toggle all")]
              )
            : _vm._e()
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loadingModalData
      ? _c(
          "div",
          { staticClass: "modal-content" },
          _vm._l(_vm.episodes[_vm.seasonActiveModal], function(episode, index) {
            return _c(
              "div",
              {
                staticClass: "modal-item",
                attrs: { "data-episode": episode.episode_number },
                on: {
                  click: function($event) {
                    _vm.toggleEpisode(episode)
                  }
                }
              },
              [
                _c("span", { staticClass: "modal-episode no-select" }, [
                  _vm._v("E" + _vm._s(_vm.addZero(episode.episode_number)))
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "modal-name",
                    class: { "spoiler-protect": _vm.spoiler && !episode.seen }
                  },
                  [_vm._v(_vm._s(episode.name))]
                ),
                _vm._v(" "),
                episode.src
                  ? _c("i", { staticClass: "item-has-src" })
                  : _vm._e(),
                _vm._v(" "),
                episode.release_episode_human_format
                  ? _c(
                      "span",
                      {
                        staticClass: "modal-release-episode",
                        attrs: { title: _vm.released(episode.release_episode) }
                      },
                      [
                        _c("i"),
                        _vm._v(
                          " " + _vm._s(episode.release_episode_human_format)
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                !episode.release_episode
                  ? _c("span", { staticClass: "modal-release-episode" }, [
                      _c("i"),
                      _vm._v(" " + _vm._s(_vm.lang("no release")))
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "episode-seen",
                    class: { seen: episode.seen }
                  },
                  [_c("i")]
                )
              ]
            )
          })
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-84ab8ddc", esExports)
  }
}

/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Trailer_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Trailer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Trailer_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Trailer_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Trailer_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3affd414_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Trailer_vue__ = __webpack_require__(168);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Trailer_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3affd414_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Trailer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Modal/Trailer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3affd414", Component.options)
  } else {
    hotAPI.reload("data-v-3affd414", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-wrap modal-wrap-big" }, [
    _c("div", { staticClass: "modal-header" }, [
      _c("span", [
        _vm._v(
          _vm._s(_vm.lang("trailer for")) + " " + _vm._s(_vm.modalData.title)
        )
      ]),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "close-modal",
          on: {
            click: function($event) {
              _vm.CLOSE_MODAL()
            }
          }
        },
        [_c("i", { staticClass: "icon-close" })]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal-content" }, [
      _c("iframe", {
        attrs: {
          width: "100%",
          height: "100%",
          src: _vm.trailerSrc,
          frameborder: "0",
          allowfullscreen: ""
        }
      })
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3affd414", esExports)
  }
}

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListForm_vue__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListForm_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListForm_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListForm_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListForm_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3f32a11e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ListForm_vue__ = __webpack_require__(170);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_ListForm_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3f32a11e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ListForm_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Modal/ListForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3f32a11e", Component.options)
  } else {
    hotAPI.reload("data-v-3f32a11e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-wrap" }, [
    _c("div", { staticClass: "modal-header" }, [
      _c("span", [
        _vm._v(
          "\n      " +
            _vm._s(_vm.modalData.list ? "Edit List" : "New List") +
            "\n    "
        )
      ]),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "close-modal",
          on: {
            click: function($event) {
              _vm.CLOSE_MODAL()
            }
          }
        },
        [_c("i", { staticClass: "icon-close" })]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal-content list-modal-content" }, [
      _c(
        "form",
        {
          staticClass: "login-form settings-box element-ui-checkbox",
          on: {
            submit: function($event) {
              $event.preventDefault()
              _vm.saveList()
            }
          }
        },
        [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.name,
                expression: "name"
              }
            ],
            attrs: { type: "text", name: "name", placeholder: "Name" },
            domProps: { value: _vm.name },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.name = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "setting-box with-margin" },
            [
              _c(
                "el-checkbox",
                {
                  model: {
                    value: _vm.is_public,
                    callback: function($$v) {
                      _vm.is_public = $$v
                    },
                    expression: "is_public"
                  }
                },
                [_vm._v("Public")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("input", {
            attrs: { type: "submit" },
            domProps: { value: _vm.lang("save button") }
          }),
          _vm._v(" "),
          _vm.modalData.list
            ? _c("input", {
                staticClass: "btn-delete-light",
                attrs: { type: "button", value: _vm.lang("delete item") },
                on: {
                  click: function($event) {
                    _vm.removeList()
                  }
                }
              })
            : _vm._e()
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3f32a11e", esExports)
  }
}

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddToList_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddToList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddToList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddToList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddToList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_40cc7adb_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AddToList_vue__ = __webpack_require__(172);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_AddToList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_40cc7adb_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_AddToList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Modal/AddToList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-40cc7adb", Component.options)
  } else {
    hotAPI.reload("data-v-40cc7adb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-wrap" }, [
    _c("div", { staticClass: "modal-header" }, [
      _c("span", [_vm._v("\n      Add To List\n    ")]),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "close-modal",
          on: {
            click: function($event) {
              _vm.CLOSE_MODAL()
            }
          }
        },
        [_c("i", { staticClass: "icon-close" })]
      )
    ]),
    _vm._v(" "),
    _vm.loadingModalData
      ? _c("div", { staticClass: "modal-content modal-content-loading" }, [
          _vm._m(0)
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loadingModalData
      ? _c("div", { staticClass: "item-header no-select" }, [
          _vm.auth
            ? _c("span", { staticClass: "header-seen" }, [_vm._v("New List")])
            : _vm._e()
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loadingModalData
      ? _c(
          "div",
          { staticClass: "modal-content" },
          [
            _c("div", { key: "watchlist", staticClass: "modal-item" }, [
              _c("span", { staticClass: "modal-name" }, [_vm._v("Watchlist")]),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "episode-seen", class: { seen: true } },
                [_c("i")]
              )
            ]),
            _vm._v(" "),
            _vm._l(_vm.lists.lists, function(list) {
              return _c("div", { key: list.id, staticClass: "modal-item" }, [
                _c("span", { staticClass: "modal-name" }, [
                  _vm._v(_vm._s(list.name))
                ]),
                _vm._v(" "),
                !list.is_public
                  ? _c("span", { staticClass: "modal-release-episode" }, [
                      _vm._v("Privat")
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "span",
                  { staticClass: "episode-seen", class: { seen: true } },
                  [_c("i")]
                )
              ])
            })
          ],
          2
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-40cc7adb", esExports)
  }
}

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "all-modals" },
    [
      _c(
        "transition",
        { attrs: { mode: "out-in", name: "fade" } },
        [
          _vm.modalType == "season" ? _c("season") : _vm._e(),
          _vm._v(" "),
          _vm.modalType == "trailer" ? _c("trailer") : _vm._e(),
          _vm._v(" "),
          _vm.modalType == "list-form" ? _c("list-form") : _vm._e(),
          _vm._v(" "),
          _vm.modalType == "add-to-list" ? _c("add-to-list") : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm.overlay
        ? _c("span", {
            staticClass: "overlay",
            on: {
              click: function($event) {
                _vm.CLOSE_MODAL()
              }
            }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-06755e73", esExports)
  }
}

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = __webpack_require__(23);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(75);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _config = __webpack_require__(175);

var _config2 = _interopRequireDefault(_config);

var _Content = __webpack_require__(176);

var _Content2 = _interopRequireDefault(_Content);

var _SearchContent = __webpack_require__(180);

var _SearchContent2 = _interopRequireDefault(_SearchContent);

var _Index = __webpack_require__(198);

var _Index2 = _interopRequireDefault(_Index);

var _TMDBContent = __webpack_require__(212);

var _TMDBContent2 = _interopRequireDefault(_TMDBContent);

var _Subpage = __webpack_require__(214);

var _Subpage2 = _interopRequireDefault(_Subpage);

var _Calendar = __webpack_require__(216);

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Lists = __webpack_require__(222);

var _Lists2 = _interopRequireDefault(_Lists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
    mode: 'history',
    base: _config2.default.uri,
    routes: [{ path: '/', component: _Content2.default, name: 'home' }, { path: '/movies', component: _Content2.default, name: 'movie' }, { path: '/tv', component: _Content2.default, name: 'tv' }, { path: '/lists', component: _Lists2.default, name: 'lists' }, { path: '/watchlist/:type?', component: _Content2.default, name: 'watchlist' }, { path: '/movies/:tmdbId/:slug?', component: _Subpage2.default, name: 'subpage-movie', props: { mediaType: 'movie' } }, { path: '/tv/:tmdbId/:slug?', component: _Subpage2.default, name: 'subpage-tv', props: { mediaType: 'tv' } }, { path: '/search', component: _SearchContent2.default, name: 'search' }, { path: '/settings', component: _Index2.default, name: 'settings' }, { path: '/suggestions', component: _TMDBContent2.default, name: 'suggestions' }, { path: '/trending', component: _TMDBContent2.default, name: 'trending' }, { path: '/upcoming', component: _TMDBContent2.default, name: 'upcoming' }, { path: '/now-playing', component: _TMDBContent2.default, name: 'now-playing' }, { path: '/genre/:genre', component: _TMDBContent2.default, name: 'genre' }, { path: '/calendar', component: _Calendar2.default, name: 'calendar' }, { path: '*', redirect: '/' }]
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_axios2.default.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content');

var _document$body$datase = document.body.dataset,
    url = _document$body$datase.url,
    uri = _document$body$datase.uri,
    auth = _document$body$datase.auth,
    language = _document$body$datase.language,
    posterTmdb = _document$body$datase.posterTmdb,
    posterSubpageTmdb = _document$body$datase.posterSubpageTmdb,
    backdropTmdb = _document$body$datase.backdropTmdb;


var config = {
  uri: uri,
  url: url,
  auth: auth,
  language: language,
  poster: url + '/assets/poster',
  backdrop: url + '/assets/backdrop',
  posterSubpage: url + '/assets/poster/subpage',
  posterTMDB: posterTmdb,
  posterSubpageTMDB: posterSubpageTmdb,
  backdropTMDB: backdropTmdb,
  api: url + '/api'
};

window.config = config;

exports.default = config;

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Content_vue__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Content_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Content_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Content_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Content_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f2e03d34_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Content_vue__ = __webpack_require__(179);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Content_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f2e03d34_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Content_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Content.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f2e03d34", Component.options)
  } else {
    hotAPI.reload("data-v-f2e03d34", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.item.rating != null && !_vm.item.watchlist
      ? _c(
          "span",
          {
            class: "item-rating rating-" + _vm.item.rating,
            on: {
              click: function($event) {
                _vm.changeRating()
              }
            }
          },
          [_c("i", { staticClass: "icon-rating" })]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.item.rating == null &&
    !_vm.item.watchlist &&
    _vm.item.tmdb_id &&
    _vm.auth &&
    !_vm.localRated
      ? _c(
          "span",
          {
            staticClass: "item-rating item-new",
            on: {
              click: function($event) {
                _vm.addNewItem()
              }
            }
          },
          [_c("i", { staticClass: "icon-add" })]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.item.watchlist
      ? _c(
          "span",
          {
            staticClass: "item-rating item-new",
            on: {
              click: function($event) {
                _vm.changeRating()
              }
            }
          },
          [_c("i", { staticClass: "icon-add" })]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.item.rating == null && _vm.item.tmdb_id && _vm.localRated
      ? _c("span", { staticClass: "item-rating item-new item-rating-loader" }, [
          _c("span", { staticClass: "loader smallsize-loader" })
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2c86fc6c", esExports)
  }
}

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { mode: "out-in", name: "fade" } }, [
    _c(
      "div",
      { staticClass: "item-wrap", class: "show-ratings-" + _vm.ratings },
      [
        _c(
          "div",
          { staticClass: "item-image-wrap no-select" },
          [
            _c("rating", {
              attrs: {
                rated: _vm.rated,
                "set-rated": _vm.setRated,
                item: _vm.localItem,
                "set-item": _vm.setItem
              }
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "item-actions" },
              [
                _vm.localItem.tmdb_id
                  ? _c(
                      "router-link",
                      {
                        staticClass: "has-suggestion",
                        attrs: {
                          title: _vm.lang("suggestions"),
                          to: _vm.suggestionsUri(_vm.localItem)
                        }
                      },
                      [_c("i", { staticClass: "icon-suggest" })]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.auth
                  ? _c(
                      "span",
                      {
                        staticClass: "is-on-watchlist",
                        attrs: { title: _vm.lang("add to list") },
                        on: {
                          click: function($event) {
                            _vm.openListModal(_vm.localItem)
                          }
                        }
                      },
                      [_c("i", { staticClass: "icon-watchlist" })]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.displaySeason(_vm.localItem) && _vm.latestEpisode
                  ? _c(
                      "span",
                      {
                        staticClass: "is-a-show",
                        attrs: { title: _vm.lang("episodes") },
                        on: {
                          click: function($event) {
                            _vm.openSeasonModal(_vm.localItem)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n          S" +
                            _vm._s(_vm.season) +
                            "E" +
                            _vm._s(_vm.episode) +
                            "\n        "
                        )
                      ]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.displaySeason(_vm.localItem) && !_vm.latestEpisode
                  ? _c(
                      "span",
                      {
                        staticClass: "is-a-show",
                        attrs: { title: _vm.lang("episodes") },
                        on: {
                          click: function($event) {
                            _vm.openSeasonModal(_vm.localItem)
                          }
                        }
                      },
                      [_c("i", { staticClass: "is-finished" })]
                    )
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _vm.auth && !_vm.localItem.tmdb_id
              ? _c(
                  "span",
                  {
                    staticClass: "edit-item",
                    on: {
                      click: function($event) {
                        _vm.editItem()
                      }
                    }
                  },
                  [_vm._v("Edit")]
                )
              : _vm._e(),
            _vm._v(" "),
            _c(
              "router-link",
              {
                attrs: {
                  to: {
                    name: "subpage-" + _vm.localItem.media_type,
                    params: {
                      tmdbId: _vm.localItem.tmdb_id,
                      slug: _vm.localItem.slug
                    }
                  }
                }
              },
              [
                _vm.localItem.poster
                  ? _c("img", {
                      staticClass: "item-image",
                      attrs: { src: _vm.poster, width: "185", height: "278" }
                    })
                  : _vm._e(),
                _vm._v(" "),
                !_vm.localItem.poster
                  ? _c("img", {
                      staticClass: "item-image",
                      attrs: { src: _vm.noImage, width: "185", height: "278" }
                    })
                  : _vm._e()
              ]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "item-content" },
          [
            _vm.date == 1
              ? _c("span", { staticClass: "item-year" }, [
                  _vm._v(_vm._s(_vm.released) + " "),
                  _c("i", [_vm._v(_vm._s(_vm.lang(_vm.localItem.media_type)))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "router-link",
              {
                staticClass: "item-title",
                attrs: {
                  to: {
                    name: "subpage-" + _vm.localItem.media_type,
                    params: { tmdbId: _vm.localItem.tmdb_id }
                  },
                  title: _vm.localItem.title
                }
              },
              [
                _vm.hasSrc
                  ? _c("i", { staticClass: "item-has-src" })
                  : _vm._e(),
                _vm._v("\n        " + _vm._s(_vm.localItem.title) + "\n      ")
              ]
            ),
            _vm._v(" "),
            _vm.genre == 1
              ? _c("span", { staticClass: "item-genre" }, [
                  _vm._v(_vm._s(_vm.genreAsString(_vm.localItem.genre)))
                ])
              : _vm._e()
          ],
          1
        )
      ]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ff09f514", esExports)
  }
}

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("main", [
    !_vm.loading && _vm.items.length
      ? _c("div", { staticClass: "content-submenu" }, [
          _vm.showTotal
            ? _c("div", { staticClass: "content-submenu-headline" }, [
                _vm._v("Added: " + _vm._s(_vm.total))
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", { staticClass: "sort-wrap no-select" }, [
            _c(
              "div",
              {
                staticClass: "sort-direction",
                on: {
                  click: function($event) {
                    _vm.setUserSortDirection()
                  }
                }
              },
              [
                _vm.userSortDirection == "asc"
                  ? _c("i", [_vm._v("↑")])
                  : _vm._e(),
                _vm._v(" "),
                _vm.userSortDirection == "desc"
                  ? _c("i", [_vm._v("↓")])
                  : _vm._e()
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "filter-wrap" }, [
              _c(
                "span",
                {
                  staticClass: "current-filter",
                  on: {
                    click: function($event) {
                      _vm.toggleShowFilters()
                    }
                  }
                },
                [
                  _vm._v(_vm._s(_vm.lang(_vm.userFilter)) + " "),
                  _c("span", { staticClass: "arrow-down" })
                ]
              ),
              _vm._v(" "),
              _c(
                "ul",
                {
                  staticClass: "all-filters",
                  class: { active: _vm.showFilters }
                },
                _vm._l(_vm.filters, function(filter) {
                  return filter !== _vm.userFilter
                    ? _c(
                        "li",
                        {
                          on: {
                            click: function($event) {
                              _vm.setUserFilter(filter)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.lang(filter)))]
                      )
                    : _vm._e()
                })
              )
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    !_vm.loading
      ? _c(
          "div",
          { staticClass: "wrap-content" },
          [
            _vm._l(_vm.items, function(item, index) {
              return _c("Item", {
                key: index,
                attrs: {
                  item: item,
                  genre: _vm.displayGenre,
                  date: _vm.displayDate,
                  ratings: _vm.displayRatings
                }
              })
            }),
            _vm._v(" "),
            !_vm.items.length
              ? _c("span", { staticClass: "nothing-found" }, [
                  _vm._v(_vm._s(_vm.lang("nothing found")))
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "load-more-wrap" }, [
              !_vm.clickedMoreLoading && _vm.paginator
                ? _c(
                    "span",
                    {
                      staticClass: "load-more",
                      on: {
                        click: function($event) {
                          _vm.loadMore()
                        }
                      }
                    },
                    [_vm._v(_vm._s(_vm.lang("load more")))]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.clickedMoreLoading
                ? _c("span", { staticClass: "loader" }, [_c("i")])
                : _vm._e()
            ])
          ],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.loading
      ? _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f2e03d34", esExports)
  }
}

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SearchContent_vue__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SearchContent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SearchContent_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SearchContent_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SearchContent_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aff95244_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SearchContent_vue__ = __webpack_require__(197);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SearchContent_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aff95244_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SearchContent_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/SearchContent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aff95244", Component.options)
  } else {
    hotAPI.reload("data-v-aff95244", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(182);


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(183);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 183 */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _promise = __webpack_require__(185);

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(186), __esModule: true };

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
__webpack_require__(31);
__webpack_require__(45);
__webpack_require__(187);
__webpack_require__(195);
__webpack_require__(196);
module.exports = __webpack_require__(6).Promise;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var global = __webpack_require__(5);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(69);
var $export = __webpack_require__(11);
var isObject = __webpack_require__(14);
var aFunction = __webpack_require__(26);
var anInstance = __webpack_require__(188);
var forOf = __webpack_require__(189);
var speciesConstructor = __webpack_require__(83);
var task = __webpack_require__(84).set;
var microtask = __webpack_require__(191)();
var newPromiseCapabilityModule = __webpack_require__(50);
var perform = __webpack_require__(85);
var userAgent = __webpack_require__(192);
var promiseResolve = __webpack_require__(86);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(7)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(193)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(30)($Promise, PROMISE);
__webpack_require__(194)(PROMISE);
Wrapper = __webpack_require__(6)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(87)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(81);
var isArrayIter = __webpack_require__(82);
var anObject = __webpack_require__(10);
var toLength = __webpack_require__(36);
var getIterFn = __webpack_require__(46);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 190 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var macrotask = __webpack_require__(84).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(21)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(5);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(5);
var core = __webpack_require__(6);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(12);
var SPECIES = __webpack_require__(7)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(11);
var core = __webpack_require__(6);
var global = __webpack_require__(5);
var speciesConstructor = __webpack_require__(83);
var promiseResolve = __webpack_require__(86);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(11);
var newPromiseCapability = __webpack_require__(50);
var perform = __webpack_require__(85);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("main", [
    !_vm.loading
      ? _c(
          "div",
          { staticClass: "wrap-content" },
          [
            _vm._l(_vm.floxItems, function(item, index) {
              return _c("Item", {
                key: index,
                attrs: { item: item, genre: true, date: true }
              })
            }),
            _vm._v(" "),
            _vm._l(_vm.tmdbItems, function(item, index) {
              return _c("Item", {
                key: index,
                attrs: { item: item, genre: true, date: true }
              })
            }),
            _vm._v(" "),
            !_vm.floxItems.length && !_vm.tmdbItems.length
              ? _c("span", { staticClass: "nothing-found" }, [
                  _vm._v(_vm._s(_vm.lang("nothing found")))
                ])
              : _vm._e()
          ],
          2
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.loading
      ? _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-aff95244", esExports)
  }
}

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e10e2a2e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__ = __webpack_require__(211);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e10e2a2e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Settings/Index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e10e2a2e", Component.options)
  } else {
    hotAPI.reload("data-v-e10e2a2e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_User_vue__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_User_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_User_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_User_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_User_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61966c84_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_User_vue__ = __webpack_require__(200);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_User_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_61966c84_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_User_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Settings/User.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61966c84", Component.options)
  } else {
    hotAPI.reload("data-v-61966c84", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.loading
    ? _c("div", { staticClass: "settings-box" }, [
        _c(
          "form",
          {
            staticClass: "login-form",
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.editUser()
              }
            }
          },
          [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.username,
                  expression: "username"
                }
              ],
              attrs: { type: "text", placeholder: _vm.lang("username") },
              domProps: { value: _vm.username },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.username = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.password,
                  expression: "password"
                }
              ],
              attrs: {
                type: "password",
                placeholder: _vm.lang("password"),
                autocomplete: "off"
              },
              domProps: { value: _vm.password },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.password = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "userdata-info" }, [
              _vm._v(_vm._s(_vm.lang("password message")))
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "userdata-changed" }, [
              _vm.success
                ? _c("span", [_vm._v(_vm._s(_vm.lang("success message")))])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("input", {
              attrs: { type: "submit" },
              domProps: { value: _vm.lang("save button") }
            })
          ]
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-61966c84", esExports)
  }
}

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Options_vue__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Options_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Options_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Options_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Options_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f785ef5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Options_vue__ = __webpack_require__(202);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Options_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6f785ef5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Options_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Settings/Options.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f785ef5", Component.options)
  } else {
    hotAPI.reload("data-v-6f785ef5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.loading
    ? _c("div", { staticClass: "settings-box element-ui-checkbox no-select" }, [
        _c(
          "div",
          { staticClass: "setting-box" },
          [
            _c(
              "el-checkbox",
              {
                on: { change: _vm.updateOptions },
                model: {
                  value: _vm.genre,
                  callback: function($$v) {
                    _vm.genre = $$v
                  },
                  expression: "genre"
                }
              },
              [_vm._v(_vm._s(_vm.lang("display genre")))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-box" },
          [
            _c(
              "el-checkbox",
              {
                on: { change: _vm.updateOptions },
                model: {
                  value: _vm.date,
                  callback: function($$v) {
                    _vm.date = $$v
                  },
                  expression: "date"
                }
              },
              [_vm._v(_vm._s(_vm.lang("display date")))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-box" },
          [
            _c(
              "el-checkbox",
              {
                on: { change: _vm.updateOptions },
                model: {
                  value: _vm.spoiler,
                  callback: function($$v) {
                    _vm.spoiler = $$v
                  },
                  expression: "spoiler"
                }
              },
              [_vm._v(_vm._s(_vm.lang("spoiler")))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-box" },
          [
            _c(
              "el-checkbox",
              {
                on: { change: _vm.updateOptions },
                model: {
                  value: _vm.watchlist,
                  callback: function($$v) {
                    _vm.watchlist = $$v
                  },
                  expression: "watchlist"
                }
              },
              [_vm._v(_vm._s(_vm.lang("show watchlist")))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "setting-box select-box" }, [
          _c("label", { attrs: { for: "ratings" } }, [
            _vm._v(_vm._s(_vm.lang("show own ratings")))
          ]),
          _vm._v(" "),
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.ratings,
                  expression: "ratings"
                }
              ],
              attrs: { id: "ratings" },
              on: {
                change: [
                  function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.ratings = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                  _vm.updateOptions
                ]
              }
            },
            [
              _c("option", { attrs: { value: "always" } }, [
                _vm._v(_vm._s(_vm.lang("always")))
              ]),
              _vm._v(" "),
              _c("option", { attrs: { value: "hover" } }, [
                _vm._v(_vm._s(_vm.lang("on hover")))
              ]),
              _vm._v(" "),
              _c("option", { attrs: { value: "never" } }, [
                _vm._v(_vm._s(_vm.lang("never")))
              ])
            ]
          )
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6f785ef5", esExports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Backup_vue__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Backup_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Backup_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Backup_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Backup_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03e0828a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Backup_vue__ = __webpack_require__(204);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Backup_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03e0828a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Backup_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Settings/Backup.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03e0828a", Component.options)
  } else {
    hotAPI.reload("data-v-03e0828a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.loading
    ? _c("div", { staticClass: "settings-box" }, [
        _c(
          "a",
          { staticClass: "setting-btn", attrs: { href: _vm.exportLink } },
          [_vm._v(_vm._s(_vm.lang("export button")))]
        ),
        _vm._v(" "),
        _c(
          "form",
          {
            staticClass: "login-form",
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.importMovies()
              }
            }
          },
          [
            _c("span", { staticClass: "import-info" }, [
              _vm._v(_vm._s(_vm.lang("or divider")))
            ]),
            _vm._v(" "),
            _c("input", {
              staticClass: "file-btn",
              attrs: { type: "file", required: "" },
              on: { change: _vm.upload }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "userdata-changed" }, [
              _vm.uploadSuccess
                ? _c("span", [_vm._v(_vm._s(_vm.lang("success import")))])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("input", {
              attrs: { type: "submit" },
              domProps: { value: _vm.lang("import button") }
            })
          ]
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-03e0828a", esExports)
  }
}

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Misc_vue__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Misc_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Misc_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Misc_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Misc_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_289f2d25_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Misc_vue__ = __webpack_require__(206);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Misc_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_289f2d25_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Misc_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Settings/Misc.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-289f2d25", Component.options)
  } else {
    hotAPI.reload("data-v-289f2d25", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.loading
    ? _c("div", { staticClass: "settings-box" }, [
        _c("div", { staticClass: "version-wrap" }, [
          _c("span", { staticClass: "current-version" }, [
            _vm._v(_vm._s(_vm.lang("current version")) + " "),
            _c("span", [_vm._v(_vm._s(_vm.version))])
          ]),
          _vm._v(" "),
          !_vm.isUpdate
            ? _c("span", { staticClass: "update-check" }, [
                _vm._v(_vm._s(_vm.updateMessage))
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.isUpdate
            ? _c("span", { staticClass: "update-check" }, [
                _c(
                  "a",
                  {
                    staticClass: "new-update",
                    attrs: {
                      href: "https://github.com/devfake/flox/releases",
                      target: "_blank"
                    }
                  },
                  [_vm._v(_vm._s(_vm.lang("new update")))]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("span", { staticClass: "update-check" }, [
            _vm._v(_vm._s(_vm.lang("feedback")) + " "),
            _c(
              "a",
              {
                attrs: {
                  href: "https://github.com/devfake/flox/issues",
                  target: "_blank"
                }
              },
              [_vm._v("GitHub")]
            )
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-289f2d25", esExports)
  }
}

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refresh_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refresh_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refresh_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refresh_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refresh_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_311a04b2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Refresh_vue__ = __webpack_require__(208);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Refresh_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_311a04b2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Refresh_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Settings/Refresh.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-311a04b2", Component.options)
  } else {
    hotAPI.reload("data-v-311a04b2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.loading
    ? _c("div", { staticClass: "settings-box element-ui-checkbox no-select" }, [
        _c(
          "div",
          { staticClass: "setting-box" },
          [
            _c(
              "el-checkbox",
              {
                on: { change: _vm.updateRefresh },
                model: {
                  value: _vm.refresh,
                  callback: function($$v) {
                    _vm.refresh = $$v
                  },
                  expression: "refresh"
                }
              },
              [_vm._v(_vm._s(_vm.lang("refresh automatically")))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "misc-btn-wrap" }, [
          _c(
            "button",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: !_vm.refreshAllClicked,
                  expression: " ! refreshAllClicked"
                }
              ],
              staticClass: "setting-btn",
              on: {
                click: function($event) {
                  _vm.refreshAll()
                }
              }
            },
            [_vm._v(_vm._s(_vm.lang("refresh all infos")))]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.showRefreshAllMessage,
                  expression: "showRefreshAllMessage"
                }
              ],
              staticClass: "update-check"
            },
            [_vm._v(_vm._s(_vm.lang("refresh all triggered")))]
          )
        ])
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-311a04b2", esExports)
  }
}

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Reminders_vue__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Reminders_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Reminders_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Reminders_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Reminders_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78cb2d50_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Reminders_vue__ = __webpack_require__(210);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Reminders_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_78cb2d50_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Reminders_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Settings/Reminders.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-78cb2d50", Component.options)
  } else {
    hotAPI.reload("data-v-78cb2d50", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.loading
    ? _c("div", { staticClass: "settings-box element-ui-checkbox no-select" }, [
        _c(
          "form",
          {
            staticClass: "login-form",
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.editSetting()
              }
            }
          },
          [
            _c("span", { staticClass: "update-check" }, [
              _vm._v(_vm._s(_vm.lang("reminders send to")))
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.reminders_send_to,
                  expression: "reminders_send_to"
                }
              ],
              attrs: { type: "email", placeholder: "E-Mail" },
              domProps: { value: _vm.reminders_send_to },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.reminders_send_to = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "userdata-changed" }, [
              _vm.success
                ? _c("span", [_vm._v(_vm._s(_vm.lang("success message")))])
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("input", {
              attrs: { type: "submit" },
              domProps: { value: _vm.lang("save button") }
            })
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-box" },
          [
            _c(
              "el-checkbox",
              {
                on: { change: _vm.updateReminders },
                model: {
                  value: _vm.daily,
                  callback: function($$v) {
                    _vm.daily = $$v
                  },
                  expression: "daily"
                }
              },
              [_vm._v(_vm._s(_vm.lang("daily reminder")))]
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "setting-box" },
          [
            _c(
              "el-checkbox",
              {
                on: { change: _vm.updateReminders },
                model: {
                  value: _vm.weekly,
                  callback: function($$v) {
                    _vm.weekly = $$v
                  },
                  expression: "weekly"
                }
              },
              [_vm._v(_vm._s(_vm.lang("weekly reminder")))]
            )
          ],
          1
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-78cb2d50", esExports)
  }
}

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("main", [
    _c(
      "div",
      { staticClass: "wrap-content" },
      [
        _c("div", { staticClass: "navigation-tab no-select" }, [
          _c(
            "span",
            {
              class: { active: _vm.activeTab == "misc" },
              on: {
                click: function($event) {
                  _vm.changeActiveTab("misc")
                }
              }
            },
            [_vm._v(_vm._s(_vm.lang("tab misc")))]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              class: { active: _vm.activeTab == "user" },
              on: {
                click: function($event) {
                  _vm.changeActiveTab("user")
                }
              }
            },
            [_vm._v(_vm._s(_vm.lang("tab user")))]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              class: { active: _vm.activeTab == "options" },
              on: {
                click: function($event) {
                  _vm.changeActiveTab("options")
                }
              }
            },
            [_vm._v(_vm._s(_vm.lang("tab options")))]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              class: { active: _vm.activeTab == "backup" },
              on: {
                click: function($event) {
                  _vm.changeActiveTab("backup")
                }
              }
            },
            [_vm._v(_vm._s(_vm.lang("tab backup")))]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              class: { active: _vm.activeTab == "refresh" },
              on: {
                click: function($event) {
                  _vm.changeActiveTab("refresh")
                }
              }
            },
            [_vm._v(_vm._s(_vm.lang("refresh")))]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              class: { active: _vm.activeTab == "reminders" },
              on: {
                click: function($event) {
                  _vm.changeActiveTab("reminders")
                }
              }
            },
            [_vm._v(_vm._s(_vm.lang("reminders")))]
          )
        ]),
        _vm._v(" "),
        _vm.loading
          ? _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
          : _vm._e(),
        _vm._v(" "),
        _vm.activeTab == "user" ? _c("user") : _vm._e(),
        _vm._v(" "),
        _vm.activeTab == "options" ? _c("options") : _vm._e(),
        _vm._v(" "),
        _vm.activeTab == "backup" ? _c("backup") : _vm._e(),
        _vm._v(" "),
        _vm.activeTab == "misc" ? _c("misc") : _vm._e(),
        _vm._v(" "),
        _vm.activeTab == "refresh" ? _c("refresh") : _vm._e(),
        _vm._v(" "),
        _vm.activeTab == "reminders" ? _c("reminders") : _vm._e()
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e10e2a2e", esExports)
  }
}

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TMDBContent_vue__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TMDBContent_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TMDBContent_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TMDBContent_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TMDBContent_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a5f8462_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TMDBContent_vue__ = __webpack_require__(213);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_TMDBContent_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a5f8462_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TMDBContent_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/TMDBContent.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a5f8462", Component.options)
  } else {
    hotAPI.reload("data-v-1a5f8462", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    { class: { "display-suggestions": _vm.path === "suggestions" } },
    [
      !_vm.loading && _vm.items.length
        ? _c("div", { staticClass: "content-submenu" }, [
            _vm.isGenrePage
              ? _c("div", { staticClass: "sort-wrap no-select" }, [
                  _c("div", { staticClass: "filter-wrap" }, [
                    _c(
                      "span",
                      {
                        staticClass: "current-filter",
                        on: {
                          click: function($event) {
                            _vm.toggleShowGenres()
                          }
                        }
                      },
                      [
                        _vm._v(_vm._s(_vm.currentGenre) + " "),
                        _c("span", { staticClass: "arrow-down" })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      {
                        staticClass: "all-filters",
                        class: { active: _vm.showFilters }
                      },
                      _vm._l(_vm.genres, function(genre) {
                        return genre.name !== _vm.currentGenre
                          ? _c(
                              "router-link",
                              {
                                key: genre.id,
                                attrs: { to: "/genre/" + genre.name }
                              },
                              [_vm._v(_vm._s(genre.name))]
                            )
                          : _vm._e()
                      })
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "show-watchlist-items element-ui-checkbox",
                      on: {
                        click: function($event) {
                          _vm.toggleWatchlistItems()
                        }
                      }
                    },
                    [
                      _c(
                        "el-checkbox",
                        {
                          model: {
                            value: _vm.showWatchlistItems,
                            callback: function($$v) {
                              _vm.showWatchlistItems = $$v
                            },
                            expression: "showWatchlistItems"
                          }
                        },
                        [_vm._v("Watchlist")]
                      )
                    ],
                    1
                  )
                ])
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      !_vm.loading
        ? _c("div", { staticClass: "wrap-content" }, [
            _c(
              "div",
              { staticClass: "items-wrap" },
              _vm._l(_vm.items, function(item, index) {
                return !item.watchlist ||
                  (_vm.showWatchlistItems && item.watchlist)
                  ? _c("Item", {
                      key: index,
                      attrs: {
                        item: item,
                        genre: true,
                        date: true,
                        ratings: _vm.displayRatings
                      }
                    })
                  : _vm._e()
              })
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.loading
        ? _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1a5f8462", esExports)
  }
}

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Subpage_vue__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Subpage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Subpage_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Subpage_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Subpage_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b7b92bc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Subpage_vue__ = __webpack_require__(215);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Subpage_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1b7b92bc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Subpage_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Subpage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b7b92bc", Component.options)
  } else {
    hotAPI.reload("data-v-1b7b92bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("main", [
    _c("div", { staticClass: "bigsize-header" }, [
      _c(
        "section",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: !_vm.loading,
              expression: " ! loading"
            }
          ],
          staticClass: "big-teaser-wrap",
          class: { active: _vm.itemLoadedSubpage }
        },
        [
          _c("div", {
            staticClass: "big-teaser-image",
            style: _vm.backdropImage
          }),
          _vm._v(" "),
          _c("div", { staticClass: "wrap" }, [
            _c("div", { staticClass: "big-teaser-content" }, [
              _c("div", { staticClass: "big-teaser-data-wrap" }, [
                _c(
                  "div",
                  {
                    staticClass: "subpage-poster-wrap-mobile no-select",
                    class: "show-ratings-" + _vm.displayRatings
                  },
                  [
                    _c("rating", {
                      attrs: {
                        rated: _vm.rated,
                        item: _vm.item,
                        "set-item": _vm.setItem,
                        "set-rated": _vm.setRated
                      }
                    }),
                    _vm._v(" "),
                    _c("img", {
                      staticClass: "base",
                      attrs: { src: _vm.noImage, width: "120", height: "180" }
                    }),
                    _vm._v(" "),
                    _c("img", {
                      staticClass: "real",
                      attrs: {
                        src: _vm.posterImage,
                        width: "120",
                        height: "180"
                      }
                    })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "big-teaser-item-data" }, [
                  _c("span", { staticClass: "item-year" }, [
                    _vm._v(_vm._s(_vm.released) + ", "),
                    _c("i", [_vm._v(_vm._s(_vm.lang(_vm.item.media_type)))])
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "item-title" }, [
                    _vm._v(_vm._s(_vm.item.title))
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    { staticClass: "item-genre" },
                    _vm._l(_vm.item.genre, function(genre) {
                      return _c(
                        "router-link",
                        {
                          key: genre.id,
                          attrs: { to: "/genre/" + genre.name }
                        },
                        [_vm._v(_vm._s(genre.name))]
                      )
                    })
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass: "big-teaser-buttons no-select",
                    class: {
                      "without-watchlist": _vm.item.rating != null || !_vm.auth
                    }
                  },
                  [
                    _vm.isOnNetflix(_vm.item.homepage)
                      ? _c(
                          "a",
                          {
                            staticClass: "button-netflix",
                            attrs: { href: _vm.item.homepage, target: "_blank" }
                          },
                          [_vm._v("\n                Netflix\n              ")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.isOnAmazon(_vm.item.homepage)
                      ? _c(
                          "a",
                          {
                            staticClass: "button-amazon",
                            attrs: { href: _vm.item.homepage, target: "_blank" }
                          },
                          [_vm._v("\n                Amazon\n              ")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.item.youtube_key
                      ? _c(
                          "span",
                          {
                            staticClass: "button-trailer",
                            on: {
                              click: function($event) {
                                _vm.openTrailer()
                              }
                            }
                          },
                          [
                            _c("i", { staticClass: "icon-trailer" }),
                            _vm._v(" " + _vm._s(_vm.lang("watch trailer")))
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "button-tmdb-rating",
                        attrs: {
                          href:
                            "https://www.themoviedb.org/" +
                            _vm.item.media_type +
                            "/" +
                            _vm.item.tmdb_id,
                          target: "_blank"
                        }
                      },
                      [
                        _vm.item.tmdb_rating && _vm.item.tmdb_rating != 0
                          ? _c("i", [
                              _c("b", [_vm._v(_vm._s(_vm.item.tmdb_rating))]),
                              _vm._v(" TMDb")
                            ])
                          : _c("i", [
                              _vm._v(_vm._s(_vm.lang("no tmdb rating")))
                            ])
                      ]
                    ),
                    _vm._v(" "),
                    _vm.item.imdb_id
                      ? _c(
                          "a",
                          {
                            staticClass: "button-imdb-rating",
                            attrs: {
                              href:
                                "http://www.imdb.com/title/" + _vm.item.imdb_id,
                              target: "_blank"
                            }
                          },
                          [
                            _vm.loadingImdb
                              ? _c("i", [
                                  _vm._v(
                                    _vm._s(_vm.lang("loading imdb rating"))
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.item.imdb_rating && !_vm.loadingImdb
                              ? _c("i", [
                                  _c("b", [
                                    _vm._v(_vm._s(_vm.item.imdb_rating))
                                  ]),
                                  _vm._v(" IMDb")
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            !_vm.item.imdb_rating && !_vm.loadingImdb
                              ? _c("i", [
                                  _vm._v(_vm._s(_vm.lang("no imdb rating")))
                                ])
                              : _vm._e()
                          ]
                        )
                      : _vm._e()
                  ]
                )
              ])
            ])
          ])
        ]
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: !_vm.loading,
            expression: " ! loading"
          }
        ],
        staticClass: "subpage-content",
        class: { active: _vm.itemLoadedSubpage }
      },
      [
        _c("div", { staticClass: "wrap" }, [
          _c("div", { staticClass: "subpage-overview" }, [
            _c("h2", [_vm._v(_vm._s(_vm.lang("overview")))]),
            _vm._v(" "),
            _c("p", [_vm._v(_vm._s(_vm.overview))])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "subpage-sidebar" }, [
            _c(
              "div",
              {
                staticClass: "subpage-poster-wrap no-select",
                class: "show-ratings-" + _vm.displayRatings
              },
              [
                _c(
                  "div",
                  { staticClass: "item-actions" },
                  [
                    _vm.item.tmdb_id
                      ? _c(
                          "router-link",
                          {
                            staticClass: "has-suggestion",
                            attrs: {
                              title: _vm.lang("suggestions"),
                              to: _vm.suggestionsUri(_vm.item)
                            }
                          },
                          [_c("i", { staticClass: "icon-suggest" })]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.auth
                      ? _c(
                          "span",
                          {
                            staticClass: "is-on-watchlist",
                            attrs: { title: _vm.lang("add to list") },
                            on: {
                              click: function($event) {
                                _vm.openListModal(_vm.item)
                              }
                            }
                          },
                          [_c("i", { staticClass: "icon-watchlist" })]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.displaySeason(_vm.item) && _vm.latestEpisode
                      ? _c(
                          "span",
                          {
                            staticClass: "is-a-show",
                            attrs: { title: _vm.lang("episodes") },
                            on: {
                              click: function($event) {
                                _vm.openSeasonModal(_vm.item)
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n              S" +
                                _vm._s(_vm.season) +
                                "E" +
                                _vm._s(_vm.episode) +
                                "\n            "
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.displaySeason(_vm.item) && !_vm.latestEpisode
                      ? _c(
                          "span",
                          {
                            staticClass: "is-a-show",
                            attrs: { title: _vm.lang("episodes") },
                            on: {
                              click: function($event) {
                                _vm.openSeasonModal(_vm.item)
                              }
                            }
                          },
                          [_c("i", { staticClass: "is-finished" })]
                        )
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c("rating", {
                  attrs: {
                    rated: _vm.rated,
                    item: _vm.item,
                    "set-item": _vm.setItem,
                    "set-rated": _vm.setRated
                  }
                }),
                _vm._v(" "),
                _c("img", {
                  staticClass: "base",
                  attrs: { src: _vm.noImage, width: "272", height: "408" }
                }),
                _vm._v(" "),
                _c("img", {
                  staticClass: "real",
                  attrs: { src: _vm.posterImage, width: "272", height: "408" }
                })
              ],
              1
            ),
            _vm._v(" "),
            _vm.item.rating != null && _vm.auth
              ? _c(
                  "div",
                  { staticClass: "subpage-sidebar-buttons no-select" },
                  [
                    _c(
                      "span",
                      {
                        staticClass: "refresh-infos",
                        on: {
                          click: function($event) {
                            _vm.refreshInfos()
                          }
                        }
                      },
                      [_vm._v(_vm._s(_vm.lang("refresh infos")))]
                    ),
                    _vm._v(" "),
                    !_vm.item.watchlist
                      ? _c(
                          "span",
                          {
                            staticClass: "remove-item",
                            on: {
                              click: function($event) {
                                _vm.removeItem()
                              }
                            }
                          },
                          [_vm._v(_vm._s(_vm.lang("delete item")))]
                        )
                      : _vm._e()
                  ]
                )
              : _vm._e()
          ])
        ])
      ]
    ),
    _vm._v(" "),
    _c(
      "span",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.loading,
            expression: "loading"
          }
        ],
        staticClass: "loader fullsize-loader"
      },
      [_c("i")]
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1b7b92bc", esExports)
  }
}

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Calendar_vue__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Calendar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Calendar_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Calendar_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Calendar_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0772daa1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Calendar_vue__ = __webpack_require__(221);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Calendar_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0772daa1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Calendar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Calendar.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0772daa1", Component.options)
  } else {
    hotAPI.reload("data-v-0772daa1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(23));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CalendarView"] = factory(require("vue"));
	else
		root["CalendarView"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1a67":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "\n.cv-header{align-items:center;border-width:1px 1px 0;display:flex;flex:0 1 auto;flex-flow:row nowrap;min-height:2.5em\n}\n.cv-header .periodLabel{display:flex;flex:1 1 auto;flex-flow:row nowrap;font-size:1.5em;line-height:1;min-height:1.5em\n}\n.cv-header,.cv-header button{border-color:#ddd;border-style:solid\n}\n.cv-header-nav,.cv-header .periodLabel{margin:.1em .6em\n}\n.cv-header-nav button,.cv-header .periodLabel{padding:.4em .6em\n}\n.cv-header button{border-width:1px;box-sizing:border-box;font-size:1em;line-height:1em\n}", ""]);

// exports


/***/ }),

/***/ "1eb2":
/***/ (function(module, exports, __webpack_require__) {

// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}


/***/ }),

/***/ "1f02":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("1a67");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("3c828df1", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "2350":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "28a5":
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__("214f")('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__("aae3");
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "3417":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("2350")(false);
// imports


// module
exports.push([module.i, "\n.cv-wrapper{display:flex;flex-direction:column;flex-grow:1;height:100%;max-height:100%;min-height:100%;overflow-x:hidden;overflow-y:hidden\n}\n.cv-wrapper,.cv-wrapper div{box-sizing:border-box;font-size:1em;line-height:1em\n}\n.cv-header-days{border-width:0 0 0 1px;flex-basis:auto;flex-grow:0\n}\n.cv-header-day,.cv-header-days{display:flex;flex-flow:row nowrap;flex-shrink:0\n}\n.cv-header-day{align-items:center;border-width:1px 1px 0 0;flex-basis:0;flex-grow:1;justify-content:center;text-align:center\n}\n.cv-weeks{border-width:0 0 1px 1px;flex-basis:auto;flex-flow:column nowrap;flex-shrink:1\n}\n.cv-week,.cv-weeks{-ms-overflow-style:none;display:flex;flex-grow:1;overflow-y:auto\n}\n.cv-week{border-width:0;flex-flow:row nowrap;min-height:3em;position:relative;width:100%\n}\n.cv-day,.cv-week{flex-basis:0;flex-shrink:0\n}\n.cv-day{border-width:1px 1px 0 0;display:flex;flex-grow:1;position:relative;position:sticky;top:0\n}\n.cv-day-number{position:absolute;right:0\n}\n.cv-event{background-color:#f7f7f7;border-width:1px;overflow:hidden;position:absolute;white-space:nowrap\n}\n.cv-wrapper.wrap-event-title-on-hover .cv-event:hover{white-space:normal;z-index:1\n}\n.cv-day,.cv-event,.cv-header-day,.cv-header-days,.cv-week,.cv-weeks{border-color:#ddd;border-style:solid\n}\n.cv-event .endTime:before{content:\"-\"\n}\n.cv-day-number,.cv-event,.cv-header-day{padding:.2em\n}\n.cv-day-number:before{margin-right:.5em\n}\n.cv-event.offset0{left:0\n}\n.cv-event.offset1{left:14.28571%\n}\n.cv-event.offset2{left:28.57143%\n}\n.cv-event.offset3{left:42.85714%\n}\n.cv-event.offset4{left:57.14286%\n}\n.cv-event.offset5{left:71.42857%\n}\n.cv-event.offset6{left:85.71429%\n}\n.cv-event.span1{width:calc(14.28571% - .05em)\n}\n.cv-event.span2{width:calc(28.57143% - .05em)\n}\n.cv-event.span3{text-align:center;width:calc(42.85714% - .05em)\n}\n.cv-event.span4{text-align:center;width:calc(57.14286% - .05em)\n}\n.cv-event.span5{text-align:center;width:calc(71.42857% - .05em)\n}\n.cv-event.span6{text-align:center;width:calc(85.71429% - .05em)\n}\n.cv-event.span7{text-align:center;width:calc(100% - .05em)\n}\n.cv-week::-webkit-scrollbar,.cv-weeks::-webkit-scrollbar{background:transparent;width:0\n}", ""]);

// exports


/***/ }),

/***/ "36bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__("4bf8");
var toAbsoluteIndex = __webpack_require__("77f1");
var toLength = __webpack_require__("9def");
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addStylesClient; });
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5dbc":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var setPrototypeOf = __webpack_require__("8b97").set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "608f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarViewHeader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1f02");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarViewHeader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarViewHeader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarViewHeader_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6c7b":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__("5ca1");

$export($export.P, 'Array', { fill: __webpack_require__("36bd") });

__webpack_require__("9c6c")('fill');


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8b97":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("d3f4");
var anObject = __webpack_require__("cb7c");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("9b43")(Function.call, __webpack_require__("11e9").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a45d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d6d2");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_lib_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CalendarView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "aa77":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("5ca1");
var defined = __webpack_require__("be13");
var fails = __webpack_require__("79e5");
var spaces = __webpack_require__("fdef");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c5f6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var cof = __webpack_require__("2d95");
var inheritIfRequired = __webpack_require__("5dbc");
var toPrimitive = __webpack_require__("6a99");
var fails = __webpack_require__("79e5");
var gOPN = __webpack_require__("9093").f;
var gOPD = __webpack_require__("11e9").f;
var dP = __webpack_require__("86cc").f;
var $trim = __webpack_require__("aa77").trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__("2aeb")(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__("9e1e") ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__("2aba")(global, NUMBER, $Number);
}


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d6d2":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("3417");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("a33d69de", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
var setPublicPath = __webpack_require__("1eb2");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d50f023a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CalendarView.vue?vue&type=template&id=1719d5b1&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
	'cv-wrapper',
	'locale-' + _vm.languageCode(_vm.displayLocale),
	'locale-' + _vm.displayLocale,
	'y' + _vm.periodStart.getFullYear(),
	'm' + _vm.paddedMonth(_vm.periodStart),
	'period-' + _vm.displayPeriodUom,
	'periodCount-' + _vm.displayPeriodCount,
	{
		past: _vm.isPastMonth(_vm.periodStart),
		future: _vm.isFutureMonth(_vm.periodStart),
		noIntl: !_vm.supportsIntl,
	}
]},[_vm._t("header",null,{headerProps:_vm.headerProps}),_c('div',{staticClass:"cv-header-days"},[_vm._l((_vm.weekdayNames),function(label,index){return [_vm._t("dayHeader",[_c('div',{key:_vm.getColumnDOWClass(index),staticClass:"cv-header-day",class:_vm.getColumnDOWClass(index)},[_vm._v(_vm._s(label))])],{index:_vm.getColumnDOWClass(index),label:label})]})],2),_c('div',{staticClass:"cv-weeks"},_vm._l((_vm.weeksOfPeriod),function(weekStart,weekIndex){return _c('div',{key:(weekIndex + "-week"),class:['cv-week', 'week' + (weekIndex+1), 'ws' + _vm.isoYearMonthDay(weekStart)]},[_vm._l((_vm.daysOfWeek(weekStart)),function(day,dayIndex){return _c('div',{key:_vm.getColumnDOWClass(dayIndex),class:[
					'cv-day',
					_vm.getColumnDOWClass(dayIndex),
					'd' + _vm.isoYearMonthDay(day),
					'd' + _vm.isoMonthDay(day),
					'd' + _vm.paddedDay(day),
					'instance' + _vm.instanceOfMonth(day),
					{
						outsideOfMonth: !_vm.isSameMonth(day, _vm.defaultedShowDate),
						today: _vm.isSameDate(day, _vm.today()),
						past: _vm.isInPast(day),
						future: _vm.isInFuture(day),
						last: _vm.isLastDayOfMonth(day),
						lastInstance: _vm.isLastInstanceOfMonth(day)
					} ].concat( ((_vm.dateClasses && _vm.dateClasses[_vm.isoYearMonthDay(day)]) || null)
				),on:{"click":function($event){_vm.onClickDay(day)},"drop":function($event){$event.preventDefault();_vm.onDrop(day, $event)},"dragover":function($event){$event.preventDefault();_vm.onDragOver(day)},"dragenter":function($event){$event.preventDefault();_vm.onDragEnter(day, $event)},"dragleave":function($event){$event.preventDefault();_vm.onDragLeave(day, $event)}}},[_c('div',{staticClass:"cv-day-number"},[_vm._v(_vm._s(day.getDate()))]),_vm._t("dayContent",null,{day:day})],2)}),_vm._l((_vm.getWeekEvents(weekStart)),function(e){return [_vm._t("event",[_c('div',{key:e.id,staticClass:"cv-event",class:e.classes,style:(("top:" + (_vm.getEventTop(e)) + ";" + (e.originalEvent.style))),attrs:{"draggable":_vm.enableDragDrop,"title":e.title},domProps:{"innerHTML":_vm._s(_vm.getEventTitle(e))},on:{"dragstart":function($event){_vm.onDragStart(e, $event)},"mouseenter":function($event){_vm.onMouseEnter(e)},"mouseleave":_vm.onMouseLeave,"click":function($event){$event.stopPropagation();_vm.onClickEvent(e)}}})],{event:e,weekStartDate:weekStart,top:_vm.getEventTop(e)})]})],2)}))],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CalendarView.vue?vue&type=template&id=1719d5b1&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/arrayWithoutHoles.js
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/iterableToArray.js
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/toConsumableArray.js



function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.fill.js
var es6_array_fill = __webpack_require__("6c7b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js
var es6_number_constructor = __webpack_require__("c5f6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/construct.js

function construct_construct(Parent, args, Class) {
  if (typeof Reflect !== "undefined" && Reflect.construct) {
    construct_construct = Reflect.construct;
  } else {
    construct_construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Parent.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return construct_construct.apply(null, arguments);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.split.js
var es6_regexp_split = __webpack_require__("28a5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// CONCATENATED MODULE: ./src/components/CalendarMathMixin.js











/*
***********************************************************
This mix-in includes a computed properties and methods that
are useful in displaying a calendar. It has no state.
***********************************************************
*/
/* harmony default export */ var CalendarMathMixin = ({
  methods: {
    // ******************************
    // Series
    // ******************************
    today: function today() {
      return this.dateOnly(new Date());
    },
    beginningOfPeriod: function beginningOfPeriod(d, periodUom, startDow) {
      switch (periodUom) {
        case "year":
          return new Date(d.getFullYear(), 0);

        case "month":
          return new Date(d.getFullYear(), d.getMonth());

        case "week":
          return this.beginningOfWeek(d, startDow);

        default:
          return null;
      }
    },
    daysOfWeek: function daysOfWeek(weekStart) {
      var _this = this;

      return Array(7).fill().map(function (_, i) {
        return _this.addDays(weekStart, i);
      });
    },
    // ********************************************
    // Date transforms that retain time of day
    // ********************************************
    addDays: function addDays(d, days) {
      return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, d.getHours(), d.getMinutes(), d.getSeconds());
    },
    beginningOfWeek: function beginningOfWeek(d, startDow) {
      return this.addDays(d, (startDow - d.getDay() - 7) % -7);
    },
    endOfWeek: function endOfWeek(d, startDow) {
      return this.addDays(this.beginningOfWeek(d, startDow), 7);
    },
    // ********************************************
    // Date transforms that ignore/wipe time of day
    // ********************************************
    beginningOfMonth: function beginningOfMonth(d) {
      return new Date(d.getFullYear(), d.getMonth());
    },
    instanceOfMonth: function instanceOfMonth(d) {
      return Math.ceil(d.getDate() / 7);
    },
    // This function increments a date by a given number of date units. Accepted units are: year, month, week. For year and month,
    // the day of the month is unchanged. This could cause an unexpected result if the units are "month" and the starting day is
    // higher than the number of days in the destination month. The count can be positive or negative.
    incrementPeriod: function incrementPeriod(d, uom, count) {
      return new Date(d.getFullYear() + (uom == "year" ? count : 0), d.getMonth() + (uom == "month" ? count : 0), d.getDate() + (uom == "week" ? count * 7 : 0));
    },
    // ******************************
    // Date formatting
    // ******************************
    paddedMonth: function paddedMonth(d) {
      return ("0" + String(d.getMonth() + 1)).slice(-2);
    },
    paddedDay: function paddedDay(d) {
      return ("0" + String(d.getDate())).slice(-2);
    },
    isoYearMonth: function isoYearMonth(d) {
      return d.getFullYear() + "-" + this.paddedMonth(d);
    },
    isoYearMonthDay: function isoYearMonthDay(d) {
      return this.isoYearMonth(d) + "-" + this.paddedDay(d);
    },
    isoMonthDay: function isoMonthDay(d) {
      return this.paddedMonth(d) + "-" + this.paddedDay(d);
    },
    formattedTime: function formattedTime(d, locale, options) {
      // Assume midnight = "all day" or indeterminate time
      if (d.getHours() === 0 && d.getMinutes() === 0 && d.getSeconds() === 0) return ""; // If Intl is not supported, send back the 24-hour, zero-padded
      // hours and minutes, expressed as local time.

      if (!this.supportsIntl()) {
        var ms = new Date().getTimezoneOffset() * 60000; // TZ offset in milliseconds

        return new Date(d - ms).toISOString().slice(11, 16);
      }

      return d.toLocaleTimeString(locale, options);
    },
    // Formats a date period in long English style. Examples supported:
    // May 2018
    // May – June 2018
    // December 2018 – January 2019
    // May 6 – 26, 2018
    // May 13 – June 2, 2018
    // December 16, 2018 – January 5, 2019
    formattedPeriod: function formattedPeriod(startDate, endDate, periodUom, monthNames) {
      var singleYear = startDate.getFullYear() === endDate.getFullYear();
      var singleMonth = this.isSameMonth(startDate, endDate);
      var isYear = periodUom === "year";
      var isMonth = periodUom === "month";
      var isWeek = !isYear && !isMonth;
      var s = [];
      s.push(monthNames[startDate.getMonth()]);

      if (isWeek) {
        s.push(" ");
        s.push(startDate.getDate());
      }

      if (!singleYear) {
        s.push(isWeek ? ", " : " ");
        s.push(startDate.getFullYear());
      }

      if (!singleMonth || !singleYear) {
        s.push(" \u2013 ");

        if (!singleMonth) {
          s.push(monthNames[endDate.getMonth()]);
        }

        if (isWeek) s.push(" ");
      } else if (isWeek) {
        s.push(" \u2013 ");
      }

      if (isWeek) {
        s.push(endDate.getDate());
        s.push(", ");
      } else {
        s.push(" ");
      }

      s.push(endDate.getFullYear());
      return s.join("");
    },
    // ******************************
    // Date comparisons
    // ******************************
    // Number of whole days between two dates. If present, time of day is ignored.
    // Have to use setUTCHours to ensure that DST changes between these dates don't
    // result in a fractional answer.
    dayDiff: function dayDiff(d1, d2) {
      var endDate = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()),
          startDate = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
      endDate.setUTCHours(0, 0, 0, 0);
      startDate.setUTCHours(0, 0, 0, 0);
      return (endDate - startDate) / 86400000;
    },
    isSameDate: function isSameDate(d1, d2) {
      // http://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
      return this.dayDiff(d1, d2) === 0;
    },
    isSameDateTime: function isSameDateTime(d1, d2) {
      return d1.getTime() === d2.getTime();
    },
    isSameMonth: function isSameMonth(d1, d2) {
      return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    },
    isPastMonth: function isPastMonth(d) {
      return this.beginningOfMonth(d) < this.beginningOfMonth(this.today());
    },
    isFutureMonth: function isFutureMonth(d) {
      return this.beginningOfMonth(d) > this.beginningOfMonth(this.today());
    },
    isInFuture: function isInFuture(d) {
      return this.dateOnly(d) > this.today();
    },
    isInPast: function isInPast(d) {
      return this.dateOnly(d) < this.today();
    },
    isLastInstanceOfMonth: function isLastInstanceOfMonth(d) {
      return d.getMonth() !== this.addDays(d, 7).getMonth();
    },
    isLastDayOfMonth: function isLastDayOfMonth(d) {
      return d.getMonth() !== this.addDays(d, 1).getMonth();
    },
    isSelectedDay: function isSelectedDay(d) {
      var _this2 = this;

      var day = Object.keys(this.dateClasses).find(function (day) {
        return _this2.isSameDate(_this2.fromIsoStringToLocalDate(day), d);
      });
      return day ? this.dateClasses[day] : undefined;
    },
    // Courtesy https://stackoverflow.com/questions/33908299/javascript-parse-a-string-to-date-as-local-time-zone/42626876#42626876
    fromIsoStringToLocalDate: function fromIsoStringToLocalDate(s) {
      var ds = s.split(/\D/).map(function (s) {
        return Number(s);
      });
      ds[1]--; // adjust month

      return construct_construct(Date, _toConsumableArray(ds));
    },
    toLocalDate: function toLocalDate(d) {
      return typeof d === "string" ? this.fromIsoStringToLocalDate(d) : new Date(d);
    },
    dateOnly: function dateOnly(d) {
      // Always use a copy, setHours mutates argument
      var d2 = new Date(d);
      d2.setHours(0, 0, 0, 0);
      return d2;
    },
    // ******************************
    // Localization
    // ******************************
    languageCode: function languageCode(l) {
      return l.substring(0, 2);
    },
    supportsIntl: function supportsIntl() {
      return typeof Intl !== "undefined";
    },
    getFormattedMonthNames: function getFormattedMonthNames(locale, format) {
      // Use the provided locale and format if possible to obtain the name of the month
      if (!this.supportsIntl()) return Array(12).fill("");
      var formatter = new Intl.DateTimeFormat(locale, {
        month: format
      }); // The year doesn't matter, using 2017 for convenience

      return Array(12).fill().map(function (_, i) {
        return formatter.format(new Date(2017, i, 1));
      });
    },
    getFormattedWeekdayNames: function getFormattedWeekdayNames(locale, format, startingDayOfWeek) {
      // Use the provided locale and format if possible to obtain the name of the days of the week
      if (!this.supportsIntl()) return Array(7).fill("");
      var formatter = new Intl.DateTimeFormat(locale, {
        weekday: format
      }); // 2017 starts on Sunday, so use it as the baseline date

      return Array(7).fill().map(function (_, i) {
        return formatter.format(new Date(2017, 0, (i + 1 + startingDayOfWeek) % 7));
      });
    },
    getDefaultBrowserLocale: function getDefaultBrowserLocale() {
      // If not running in the browser, cannot determine a default, return the code for unknown (blank is invalid)
      if (typeof navigator === "undefined") return "unk"; // Return the browser's language setting, implementation is browser-specific

      return (navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language || navigator.browserLanguage).toLowerCase();
    },
    // ******************************
    // Events
    // ******************************
    normalizeEvent: function normalizeEvent(event, isHovered) {
      // Classes may be a string, an array, or null. Normalize to an array
      var eventClasses = event.classes ? Array.isArray(event.classes) ? _toConsumableArray(event.classes) : [event.classes] : []; // Provides support for pseudo-hover of entire event when one part of it is hovered

      if (isHovered) eventClasses.push("isHovered");
      return {
        originalEvent: event,
        startDate: this.toLocalDate(event.startDate),
        // For an event without an end date, the end date is the start date
        endDate: this.toLocalDate(event.endDate || event.startDate),
        classes: eventClasses,
        // Events without a title are untitled
        title: event.title || "Untitled",
        // Events without an id receive an auto-generated ID
        id: event.id || "e" + Math.random().toString(36).substr(2, 10)
      };
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"d50f023a-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CalendarViewHeader.vue?vue&type=template&id=0e2cc1aa&
var CalendarViewHeadervue_type_template_id_0e2cc1aa_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cv-header"},[_c('div',{staticClass:"cv-header-nav"},[_c('button',{staticClass:"previousYear",attrs:{"disabled":!_vm.headerProps.previousYear},on:{"click":function($event){_vm.onInput(_vm.headerProps.previousYear)}}},[_vm._v("<<")]),_c('button',{staticClass:"previousPeriod",attrs:{"disabled":!_vm.headerProps.previousPeriod},on:{"click":function($event){_vm.onInput(_vm.headerProps.previousPeriod)}}},[_vm._v("<")]),_c('button',{staticClass:"nextPeriod",attrs:{"disabled":!_vm.headerProps.nextPeriod},on:{"click":function($event){_vm.onInput(_vm.headerProps.nextPeriod)}}},[_vm._v(">")]),_c('button',{staticClass:"nextYear",attrs:{"disabled":!_vm.headerProps.nextYear},on:{"click":function($event){_vm.onInput(_vm.headerProps.nextYear)}}},[_vm._v(">>")]),_c('button',{staticClass:"currentPeriod",on:{"click":function($event){_vm.onInput(_vm.headerProps.currentPeriod)}}},[_vm._v("Today")])]),_c('div',{staticClass:"periodLabel"},[_vm._t("label",[_vm._v("\n\t\t\t"+_vm._s(_vm.headerProps.periodLabel)+"\n\t\t")])],2)])}
var CalendarViewHeadervue_type_template_id_0e2cc1aa_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/CalendarViewHeader.vue?vue&type=template&id=0e2cc1aa&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CalendarViewHeader.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var CalendarViewHeadervue_type_script_lang_js_ = ({
  name: "CalendarViewHeader",
  props: {
    headerProps: {
      type: Object,
      required: true
    }
  },
  methods: {
    onInput: function onInput(d) {
      this.$emit("input", d);
    }
  }
});
// CONCATENATED MODULE: ./src/components/CalendarViewHeader.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CalendarViewHeadervue_type_script_lang_js_ = (CalendarViewHeadervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CalendarViewHeader.vue?vue&type=style&index=0&lang=css&
var CalendarViewHeadervue_type_style_index_0_lang_css_ = __webpack_require__("608f");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/CalendarViewHeader.vue






/* normalize component */

var component = normalizeComponent(
  components_CalendarViewHeadervue_type_script_lang_js_,
  CalendarViewHeadervue_type_template_id_0e2cc1aa_render,
  CalendarViewHeadervue_type_template_id_0e2cc1aa_staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "CalendarViewHeader.vue"
/* harmony default export */ var CalendarViewHeader = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/components/CalendarView.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var CalendarViewvue_type_script_lang_js_ = ({
  name: "CalendarView",
  components: {
    CalendarViewHeader: CalendarViewHeader
  },
  mixins: [CalendarMathMixin],
  props: {
    showDate: {
      type: Date,
      default: undefined
    },
    displayPeriodUom: {
      type: String,
      default: "month"
    },
    displayPeriodCount: {
      type: Number,
      default: 1
    },
    locale: {
      type: String,
      default: undefined
    },
    monthNameFormat: {
      type: String,
      default: "long"
    },
    weekdayNameFormat: {
      type: String,
      default: "short"
    },
    showEventTimes: {
      type: Boolean,
      default: false
    },
    timeFormatOptions: {
      type: Object,
      default: function _default() {}
    },
    disablePast: {
      type: Boolean,
      default: false
    },
    disableFuture: {
      type: Boolean,
      default: false
    },
    enableDragDrop: {
      type: Boolean,
      default: false
    },
    startingDayOfWeek: {
      type: Number,
      default: 0
    },
    events: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    dateClasses: {
      type: Object,
      default: function _default() {}
    },
    eventTop: {
      type: String,
      default: "1.4em"
    },
    eventContentHeight: {
      type: String,
      default: "1.4em"
    },
    eventBorderHeight: {
      type: String,
      default: "2px"
    },
    periodChangedCallback: {
      type: Function,
      default: undefined
    }
  },
  data: function data() {
    return {
      currentDragEvent: null,
      currentHoveredEventId: undefined
    };
  },
  computed: {
    /*
    Props cannot default to computed/method returns, so create defaulted version of this
    property and use it rather than the bare prop (Vue Issue #6013).
    */
    displayLocale: function displayLocale() {
      return this.locale || this.getDefaultBrowserLocale();
    },

    /*
    ShowDate, but defaulted to today. Needed both for periodStart below and for the
    "outside of month" class. Any time component passed as part of showDate is discarded.
    */
    defaultedShowDate: function defaultedShowDate() {
      if (this.showDate) return this.dateOnly(this.showDate);
      return this.today();
    },

    /*
    Given the showDate, defaulted to today, computes the beginning and end of the period
    that the date falls within.
    */
    periodStart: function periodStart() {
      return this.beginningOfPeriod(this.defaultedShowDate, this.displayPeriodUom, this.startingDayOfWeek);
    },
    periodEnd: function periodEnd() {
      return this.addDays(this.incrementPeriod(this.periodStart, this.displayPeriodUom, this.displayPeriodCount), -1);
    },

    /*
    For month and year views, the first and last dates displayed in the grid may not
    be the same as the intended period, since the period may not start and stop evenly
    on the starting day of the week.
    */
    displayFirstDate: function displayFirstDate() {
      return this.beginningOfWeek(this.periodStart, this.startingDayOfWeek);
    },
    displayLastDate: function displayLastDate() {
      return this.endOfWeek(this.periodEnd, this.startingDayOfWeek);
    },

    /*
    Create an array of dates, where each date represents the beginning of a week that
    should be rendered in the view for the current period.
    */
    weeksOfPeriod: function weeksOfPeriod() {
      var _this = this;

      // Returns an array of object representing the date of the beginning of each week
      // included in the view.
      var numWeeks = Math.floor((this.dayDiff(this.displayFirstDate, this.displayLastDate) + 1) / 7);
      return Array(numWeeks).fill().map(function (_, i) {
        return _this.addDays(_this.displayFirstDate, i * 7);
      });
    },
    // Cache the names based on current locale and format settings
    monthNames: function monthNames() {
      return this.getFormattedMonthNames(this.displayLocale, this.monthNameFormat);
    },
    weekdayNames: function weekdayNames() {
      return this.getFormattedWeekdayNames(this.displayLocale, this.weekdayNameFormat, this.startingDayOfWeek);
    },
    // Ensure all event properties have suitable default
    fixedEvents: function fixedEvents() {
      var self = this;
      return this.events.map(function (e) {
        return self.normalizeEvent(e, self.currentHoveredEventId && e.id === self.currentHoveredEventId);
      });
    },
    // Creates the HTML to render the date range for the calendar header.
    periodLabel: function periodLabel() {
      return this.formattedPeriod(this.periodStart, this.periodEnd, this.displayPeriodUom, this.monthNames);
    },
    headerProps: function headerProps() {
      return {
        // Dates for UI navigation
        previousYear: this.getIncrementedPeriod(-12),
        previousPeriod: this.getIncrementedPeriod(-1),
        nextPeriod: this.getIncrementedPeriod(1),
        previousFullPeriod: this.getIncrementedPeriod(-this.displayPeriodCount),
        nextFullPeriod: this.getIncrementedPeriod(this.displayPeriodCount),
        nextYear: this.getIncrementedPeriod(12),
        currentPeriod: this.beginningOfPeriod(this.today(), this.displayPeriodUom, this.startingDayOfWeek),
        // Dates for header display
        periodStart: this.periodStart,
        periodEnd: this.periodEnd,
        // Extra information that could be useful to a custom header
        displayLocale: this.displayLocale,
        displayFirstDate: this.displayFirstDate,
        displayLastDate: this.displayLastDate,
        monthNames: this.monthNames,
        fixedEvents: this.fixedEvents,
        periodLabel: this.periodLabel
      };
    },
    periodRange: function periodRange() {
      return {
        periodStart: this.periodStart,
        periodEnd: this.periodEnd,
        displayFirstDate: this.displayFirstDate,
        displayLastDate: this.displayLastDate
      };
    }
  },
  watch: {
    periodRange: {
      immediate: true,
      handler: function handler(newVal) {
        if (this.periodChangedCallback) {
          this.$emit("period-changed");
          this.periodChangedCallback(newVal, "watch");
        }
      }
    }
  },
  methods: {
    // ******************************
    // UI Events
    // ******************************
    onClickDay: function onClickDay(day) {
      if (this.disablePast && this.isInPast(day)) return;
      if (this.disableFuture && this.isInFuture(day)) return;
      this.$emit("click-date", day);
    },
    onClickEvent: function onClickEvent(e, day) {
      this.$emit("click-event", e, day);
    },

    /*
    The day name header needs to know the dow for class assignment, and this value should
    not change based on startingDayOfWeek (i.e., Sunday is always 0). This function
    computes the dow for a given day index.
    */
    getColumnDOWClass: function getColumnDOWClass(dayIndex) {
      return "dow" + (dayIndex + this.startingDayOfWeek) % 7;
    },
    // ******************************
    // Date Periods
    // ******************************

    /*
    Returns a date for the current display date moved forward or backward by a given
    number of the current display units. Returns null if said move would result in a
    disallowed display period.
    */
    getIncrementedPeriod: function getIncrementedPeriod(count) {
      var newStartDate = this.incrementPeriod(this.periodStart, this.displayPeriodUom, count);
      var newEndDate = this.incrementPeriod(newStartDate, this.displayPeriodUom, this.displayPeriodCount);
      if (this.disablePast && newEndDate <= this.today()) return null;
      if (this.disableFuture && newStartDate > this.today()) return null;
      return newStartDate;
    },
    // ******************************
    // Hover events (#95)
    // ******************************
    onMouseEnter: function onMouseEnter(calendarEvent) {
      this.currentHoveredEventId = calendarEvent.id;
    },
    onMouseLeave: function onMouseLeave() {
      this.currentHoveredEventId = undefined;
    },
    // ******************************
    // Drag and drop events
    // ******************************
    onDragStart: function onDragStart(calendarEvent, windowEvent) {
      if (!this.enableDragDrop) return false; // Not using dataTransfer.setData to store the event ID because it (a) doesn't allow access to the data being
      // dragged during dragover, dragenter, and dragleave events, and because storing an ID requires an unnecessary
      // lookup. This does limit the drop zones to areas within this instance of this component.

      this.currentDragEvent = calendarEvent; // Firefox and possibly other browsers require dataTransfer to be set, even if the value is not used. IE11
      // requires that the first argument be exactly "text" (not "text/plain", etc.).

      windowEvent.dataTransfer.setData("text", "foo");
      this.$emit("drag-start", calendarEvent);
      return true;
    },
    handleDragEvent: function handleDragEvent(bubbleEventName, bubbleParam) {
      if (!this.enableDragDrop) return false;

      if (!this.currentDragEvent) {
        // shouldn't happen
        // If current drag event is not set, check if user has set its own slot for events
        if (!this.$scopedSlots["event"]) return false;
      }

      this.$emit(bubbleEventName, this.currentDragEvent, bubbleParam);
      return true;
    },
    onDragOver: function onDragOver(day) {
      this.handleDragEvent("drag-over-date", day);
    },
    onDragEnter: function onDragEnter(day, windowEvent) {
      if (!this.handleDragEvent("drag-enter-date", day)) return;
      windowEvent.target.classList.add("draghover");
    },
    onDragLeave: function onDragLeave(day, windowEvent) {
      if (!this.handleDragEvent("drag-leave-date", day)) return;
      windowEvent.target.classList.remove("draghover");
    },
    onDrop: function onDrop(day, windowEvent) {
      if (!this.handleDragEvent("drop-on-date", day)) return;
      windowEvent.target.classList.remove("draghover");
    },
    // ******************************
    // Calendar Events
    // ******************************
    findAndSortEventsInWeek: function findAndSortEventsInWeek(weekStart) {
      var _this2 = this;

      // Return a list of events that INCLUDE any day of a week starting on a
      // particular day. Sorted so the events that start earlier are always
      // shown first.
      var events = this.fixedEvents.filter(function (event) {
        return event.startDate < _this2.addDays(weekStart, 7) && event.endDate >= weekStart;
      }, this).sort(function (a, b) {
        if (a.startDate < b.startDate) return -1;
        if (b.startDate < a.startDate) return 1;
        if (a.endDate > b.endDate) return -1;
        if (b.endDate > a.endDate) return 1;
        return a.id < b.id ? -1 : 1;
      });
      return events;
    },
    getWeekEvents: function getWeekEvents(weekStart) {
      // Return a list of events that CONTAIN the week starting on a day.
      // Sorted so the events that start earlier are always shown first.
      var events = this.findAndSortEventsInWeek(weekStart);
      var results = [];
      var eventRows = [[], [], [], [], [], [], []];

      for (var i = 0; i < events.length; i++) {
        var ep = Object.assign({}, events[i], {
          classes: _toConsumableArray(events[i].classes),
          eventRow: 0
        });
        var continued = ep.startDate < weekStart;
        var startOffset = continued ? 0 : this.dayDiff(weekStart, ep.startDate);
        var span = Math.min(7 - startOffset, this.dayDiff(this.addDays(weekStart, startOffset), ep.endDate) + 1);
        if (continued) ep.classes.push("continued");
        if (this.dayDiff(weekStart, ep.endDate) > 6) ep.classes.push("toBeContinued");
        if (this.isInPast(ep.endDate)) ep.classes.push("past");
        if (ep.originalEvent.url) ep.classes.push("hasUrl");

        for (var d = 0; d < 7; d++) {
          if (d === startOffset) {
            var s = 0;

            while (eventRows[d][s]) {
              s++;
            }

            ep.eventRow = s;
            eventRows[d][s] = true;
          } else if (d < startOffset + span) {
            eventRows[d][ep.eventRow] = true;
          }
        }

        ep.classes.push("offset".concat(startOffset));
        ep.classes.push("span".concat(span));
        results.push(ep);
      }

      return results;
    },

    /*
    Creates the HTML to prefix the event title showing the event's start and/or
    end time. Midnight is not displayed.
    */
    getFormattedTimeRange: function getFormattedTimeRange(e) {
      var startTime = this.formattedTime(e.startDate, this.displayLocale, this.timeFormatOptions);
      var endTime = "";

      if (!this.isSameDateTime(e.startDate, e.endDate)) {
        endTime = this.formattedTime(e.endDate, this.displayLocale, this.timeFormatOptions);
      }

      return (startTime !== "" ? "<span class=\"startTime\">".concat(startTime, "</span>") : "") + (endTime !== "" ? "<span class=\"endTime\">".concat(endTime, "</span>") : "");
    },
    getEventTitle: function getEventTitle(e) {
      if (!this.showEventTimes) return e.title;
      return this.getFormattedTimeRange(e) + " " + e.title;
    },
    getEventTop: function getEventTop(e) {
      // Compute the top position of the event based on its assigned row within the given week.
      var r = e.eventRow;
      var h = this.eventContentHeight;
      var b = this.eventBorderHeight;
      return "calc(".concat(this.eventTop, " + ").concat(r, "*").concat(h, " + ").concat(r, "*").concat(b, ")");
    }
  }
});
// CONCATENATED MODULE: ./src/components/CalendarView.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_CalendarViewvue_type_script_lang_js_ = (CalendarViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/CalendarView.vue?vue&type=style&index=0&lang=css&
var CalendarViewvue_type_style_index_0_lang_css_ = __webpack_require__("a45d");

// CONCATENATED MODULE: ./src/components/CalendarView.vue






/* normalize component */

var CalendarView_component = normalizeComponent(
  components_CalendarViewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

CalendarView_component.options.__file = "CalendarView.vue"
/* harmony default export */ var CalendarView = (CalendarView_component.exports);
// CONCATENATED MODULE: ./src/components/bundle.js








external_commonjs_vue_commonjs2_vue_root_Vue_default.a.config.productionTip = false;
var Components = {
  CalendarView: CalendarView,
  CalendarViewHeader: CalendarViewHeader
};
Object.keys(Components).forEach(function (name) {
  external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(name, Components[name]);
}); // Export the compiled Vue components, and also the mixin for those who wish to use
// those methods in their own custom headers, etc.


// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js
/* concated harmony reexport CalendarView */__webpack_require__.d(__webpack_exports__, "CalendarView", function() { return CalendarView; });
/* concated harmony reexport CalendarViewHeader */__webpack_require__.d(__webpack_exports__, "CalendarViewHeader", function() { return CalendarViewHeader; });
/* concated harmony reexport CalendarMathMixin */__webpack_require__.d(__webpack_exports__, "CalendarMathMixin", function() { return CalendarMathMixin; });




/***/ }),

/***/ "fdef":
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ })

/******/ });
});
//# sourceMappingURL=CalendarView.umd.js.map

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.dayjs_plugin_isBetween=t()}(this,function(){"use strict";return function(e,t,i){t.prototype.isBetween=function(e,t){var n=i(e),o=i(t);return this.isAfter(n)&&this.isBefore(o)||this.isBefore(n)&&this.isAfter(o)}}});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):t.dayjs=e()}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",s="day",i="week",a="month",u="year",c=/^(\d{4})-?(\d{1,2})-?(\d{0,2})(.*?(\d{1,2}):(\d{1,2}):(\d{1,2}))?.?(\d{1,3})?$/,o=/\[.*?\]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},d=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},$={padStart:d,padZoneStr:function(t){var e=Math.abs(t),n=Math.floor(e/60),r=e%60;return(t<=0?"+":"-")+d(n,2,"0")+":"+d(r,2,"0")},monthDiff:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,"months"),s=e-r<0,i=t.clone().add(n+(s?-1:1),"months");return Number(-(n+(e-r)/(s?r-i:i-r)))},absFloor:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},prettyUnit:function(c){return{M:a,y:u,w:i,d:s,h:r,m:n,s:e,ms:t}[c]||String(c||"").toLowerCase().replace(/s$/,"")},isUndefined:function(t){return void 0===t}},f="en",l={};l[f]=h;var m=function(t){return t instanceof D},y=function(t,e,n){var r;if(!t)return null;if("string"==typeof t)l[t]&&(r=t),e&&(l[t]=e,r=t);else{var s=t.name;l[s]=t,r=s}return n||(f=r),r},M=function(t,e){if(m(t))return t.clone();var n=e||{};return n.date=t,new D(n)},S=function(t,e){return M(t,{locale:e.$L})},p=$;p.parseLocale=y,p.isDayjs=m,p.wrapper=S;var D=function(){function h(t){this.parse(t)}var d=h.prototype;return d.parse=function(t){var e,n;this.$d=null===(e=t.date)?new Date(NaN):p.isUndefined(e)?new Date:e instanceof Date?e:"string"==typeof e&&/.*[^Z]$/i.test(e)&&(n=e.match(c))?new Date(n[1],n[2]-1,n[3]||1,n[5]||0,n[6]||0,n[7]||0,n[8]||0):new Date(e),this.init(t)},d.init=function(t){this.$y=this.$d.getFullYear(),this.$M=this.$d.getMonth(),this.$D=this.$d.getDate(),this.$W=this.$d.getDay(),this.$H=this.$d.getHours(),this.$m=this.$d.getMinutes(),this.$s=this.$d.getSeconds(),this.$ms=this.$d.getMilliseconds(),this.$L=this.$L||y(t.locale,null,!0)||f},d.$utils=function(){return p},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.$compare=function(t){return this.valueOf()-M(t).valueOf()},d.isSame=function(t){return 0===this.$compare(t)},d.isBefore=function(t){return this.$compare(t)<0},d.isAfter=function(t){return this.$compare(t)>0},d.year=function(){return this.$y},d.month=function(){return this.$M},d.day=function(){return this.$W},d.date=function(){return this.$D},d.hour=function(){return this.$H},d.minute=function(){return this.$m},d.second=function(){return this.$s},d.millisecond=function(){return this.$ms},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,c){var o=this,h=!!p.isUndefined(c)||c,d=function(t,e){var n=S(new Date(o.$y,e,t),o);return h?n:n.endOf(s)},$=function(t,e){return S(o.toDate()[t].apply(o.toDate(),h?[0,0,0,0].slice(e):[23,59,59,999].slice(e)),o)};switch(p.prettyUnit(t)){case u:return h?d(1,0):d(31,11);case a:return h?d(1,this.$M):d(0,this.$M+1);case i:return d(h?this.$D-this.$W:this.$D+(6-this.$W),this.$M);case s:case"date":return $("setHours",0);case r:return $("setMinutes",1);case n:return $("setSeconds",2);case e:return $("setMilliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(i,c){switch(p.prettyUnit(i)){case s:this.$d.setDate(this.$D+(c-this.$W));break;case"date":this.$d.setDate(c);break;case a:this.$d.setMonth(c);break;case u:this.$d.setFullYear(c);break;case r:this.$d.setHours(c);break;case n:this.$d.setMinutes(c);break;case e:this.$d.setSeconds(c);break;case t:this.$d.setMilliseconds(c)}return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.add=function(t,c){var o=this;t=Number(t);var h,d=p.prettyUnit(c),$=function(e,n){var r=o.set("date",1).set(e,n+t);return r.set("date",Math.min(o.$D,r.daysInMonth()))};if(d===a)return $(a,this.$M);if(d===u)return $(u,this.$y);switch(d){case n:h=6e4;break;case r:h=36e5;break;case s:h=864e5;break;case i:h=6048e5;break;case e:h=1e3;break;default:h=1}var f=this.valueOf()+t*h;return S(f,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this,n=t||"YYYY-MM-DDTHH:mm:ssZ",r=p.padZoneStr(this.$d.getTimezoneOffset()),s=this.$locale(),i=s.weekdays,a=s.months,u=function(t,e,n,r){return t&&t[e]||n[e].substr(0,r)};return n.replace(o,function(t){if(t.indexOf("[")>-1)return t.replace(/\[|\]/g,"");switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return String(e.$y);case"M":return String(e.$M+1);case"MM":return p.padStart(e.$M+1,2,"0");case"MMM":return u(s.monthsShort,e.$M,a,3);case"MMMM":return a[e.$M];case"D":return String(e.$D);case"DD":return p.padStart(e.$D,2,"0");case"d":return String(e.$W);case"dd":return u(s.weekdaysMin,e.$W,i,2);case"ddd":return u(s.weekdaysShort,e.$W,i,3);case"dddd":return i[e.$W];case"H":return String(e.$H);case"HH":return p.padStart(e.$H,2,"0");case"h":case"hh":return 0===e.$H?12:p.padStart(e.$H<13?e.$H:e.$H-12,"hh"===t?2:1,"0");case"a":return e.$H<12?"am":"pm";case"A":return e.$H<12?"AM":"PM";case"m":return String(e.$m);case"mm":return p.padStart(e.$m,2,"0");case"s":return String(e.$s);case"ss":return p.padStart(e.$s,2,"0");case"SSS":return p.padStart(e.$ms,3,"0");case"Z":return r;default:return r.replace(":","")}})},d.diff=function(t,c,o){var h=p.prettyUnit(c),d=M(t),$=this-d,f=p.monthDiff(this,d);switch(h){case u:f/=12;break;case a:break;case"quarter":f/=3;break;case i:f=$/6048e5;break;case s:f=$/864e5;break;case r:f=$/36e5;break;case n:f=$/6e4;break;case e:f=$/1e3;break;default:f=$}return o?f:p.absFloor(f)},d.daysInMonth=function(){return this.endOf(a).$D},d.$locale=function(){return l[this.$L]},d.locale=function(t,e){var n=this.clone();return n.$L=y(t,e,!0),n},d.clone=function(){return S(this.toDate(),this)},d.toDate=function(){return new Date(this.$d)},d.toArray=function(){return[this.$y,this.$M,this.$D,this.$H,this.$m,this.$s,this.$ms]},d.toJSON=function(){return this.toISOString()},d.toISOString=function(){return this.toDate().toISOString()},d.toObject=function(){return{years:this.$y,months:this.$M,date:this.$D,hours:this.$H,minutes:this.$m,seconds:this.$s,milliseconds:this.$ms}},d.toString=function(){return this.$d.toUTCString()},h}();return M.extend=function(t,e){return t(e,D,M),M},M.locale=y,M.isDayjs=m,M.en=l[f],M});


/***/ }),
/* 220 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    {
      directives: [
        {
          name: "hotkey",
          rawName: "v-hotkey",
          value: _vm.keymap,
          expression: "keymap"
        }
      ],
      staticClass: "calendar-main no-select"
    },
    [
      _c("transition", { attrs: { mode: "out-in", name: "fade" } }, [
        !_vm.loading
          ? _c(
              "div",
              { staticClass: "wrap-content calendar-wrap" },
              [
                _c("calendar-view", {
                  staticClass: "theme-default",
                  attrs: {
                    "show-date": _vm.showDate,
                    events: _vm.filteredEvents,
                    "starting-day-of-week": 1
                  },
                  on: { "click-event": _vm.navigateToItem },
                  scopedSlots: _vm._u([
                    {
                      key: "header",
                      fn: function(t) {
                        return _c("calendar-view-header", {
                          attrs: {
                            title: "You can also use the arrow keys",
                            "header-props": t.headerProps
                          },
                          on: { input: _vm.setShowDate }
                        })
                      }
                    }
                  ])
                })
              ],
              1
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.loading
        ? _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0772daa1", esExports)
  }
}

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Lists_vue__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Lists_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Lists_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Lists_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Lists_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d8a587c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Lists_vue__ = __webpack_require__(223);
var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Lists_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d8a587c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Lists_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "app/components/Content/Lists.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d8a587c", Component.options)
  } else {
    hotAPI.reload("data-v-6d8a587c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "main",
    [
      !_vm.loading && _vm.auth
        ? _c("div", { staticClass: "content-submenu" }, [
            _c("div", { staticClass: "sort-wrap no-select" }, [
              _c("div", { staticClass: "filter-wrap" }, [
                _c(
                  "span",
                  {
                    staticClass: "current-filter",
                    on: {
                      click: function($event) {
                        _vm.openList()
                      }
                    }
                  },
                  [_vm._v("New List")]
                )
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("transition", { attrs: { mode: "out-in", name: "fade" } }, [
        !_vm.loading
          ? _c(
              "div",
              { staticClass: "wrap-content" },
              [
                _c(
                  "router-link",
                  {
                    key: "watchlist",
                    staticClass: "list-item-wrap",
                    attrs: { to: "/watchlist" }
                  },
                  [
                    _vm.lists.latest_watchlist
                      ? _c("div", {
                          staticClass: "list-item-teaser-image",
                          style: _vm.backdropImage(
                            _vm.lists.latest_watchlist.backdrop
                          )
                        })
                      : _vm._e(),
                    _vm._v(" "),
                    _c("span", { staticClass: "list-item-title" }, [
                      _vm._v("Watchlist")
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "list-item-amount" }, [
                      _vm._v(_vm._s(_vm.lists.watchlist_count) + " Items")
                    ])
                  ]
                ),
                _vm._v(" "),
                _vm._l(_vm.lists.lists, function(list) {
                  return _c(
                    "router-link",
                    {
                      key: list.id,
                      staticClass: "list-item-wrap",
                      attrs: { to: "/" }
                    },
                    [
                      _vm.auth
                        ? _c(
                            "span",
                            {
                              staticClass: "edit-list",
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.openList(list)
                                }
                              }
                            },
                            [_c("i", { staticClass: "icon-edit" })]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", {
                        staticClass: "list-item-teaser-image",
                        style: _vm.backdropImage(list.latest_backdrop)
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "list-item-title" }, [
                        _vm._v(_vm._s(list.name))
                      ]),
                      _vm._v(" "),
                      _c("span", { staticClass: "list-item-amount" }, [
                        _vm._v(_vm._s(list.items_count) + " Items")
                      ])
                    ]
                  )
                })
              ],
              2
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _vm.loading
        ? _c("span", { staticClass: "loader fullsize-loader" }, [_c("i")])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6d8a587c", esExports)
  }
}

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(23);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(0);

var _vuex2 = _interopRequireDefault(_vuex);

var _actions = __webpack_require__(225);

var actions = _interopRequireWildcard(_actions);

var _mutations = __webpack_require__(228);

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

exports.default = new _vuex2.default.Store({
  state: {
    filters: ['last seen', 'own rating', 'title', 'release', 'tmdb rating', 'imdb rating'],
    showFilters: false,
    items: [],
    total: null,
    lists: [],
    searchTitle: '',
    userFilter: '',
    userSortDirection: '',
    loading: false,
    clickedMoreLoading: false,
    paginator: null,
    colorScheme: '',
    overlay: false,
    modalData: {},
    loadingModalData: true,
    seasonActiveModal: 1,
    modalType: '',
    itemLoadedSubpage: false
  },
  mutations: _mutations2.default,
  actions: actions
});

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectDestructuringEmpty2 = __webpack_require__(226);

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

exports.loadItems = loadItems;
exports.loadLists = loadLists;
exports.loadListsForItem = loadListsForItem;
exports.loadMoreItems = loadMoreItems;
exports.setSearchTitle = setSearchTitle;
exports.setColorScheme = setColorScheme;
exports.setPageTitle = setPageTitle;
exports.fetchEpisodes = fetchEpisodes;

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadItems(_ref, response) {
  var state = _ref.state,
      commit = _ref.commit;

  commit('SET_LOADING', true);
  (0, _axios2.default)(config.api + '/items/' + response.name + '/' + state.userFilter + '/' + state.userSortDirection).then(function (value) {
    var _value$data = value.data,
        data = _value$data.data,
        next_page_url = _value$data.next_page_url,
        total = _value$data.total;


    commit('SET_ITEMS', data);
    commit('SET_TOTAL', total);
    commit('SET_PAGINATOR', next_page_url);

    setTimeout(function () {
      commit('SET_LOADING', false);
    }, 500);
  }, function (error) {
    if (error.status === 404) {
      window.location.href = config.url;
    }
  });
}

function loadLists(_ref2) {
  var state = _ref2.state,
      commit = _ref2.commit;

  commit('SET_LOADING', true);
  (0, _axios2.default)(config.api + '/lists').then(function (value) {
    commit('SET_LISTS', value.data);

    setTimeout(function () {
      commit('SET_LOADING', false);
    }, 500);
  }, function (error) {
    if (error.status === 404) {
      window.location.href = config.url;
    }
  });
}

function loadListsForItem(_ref3, tmdbId) {
  var state = _ref3.state,
      commit = _ref3.commit;

  commit('SET_LOADING_MODAL_DATA', true);
  (0, _axios2.default)(config.api + '/lists/' + tmdbId).then(function (value) {
    commit('SET_LISTS', value.data);

    setTimeout(function () {
      commit('SET_LOADING_MODAL_DATA', false);
    }, 500);
  }, function (error) {
    if (error.status === 404) {
      window.location.href = config.url;
    }
  });
}

function loadMoreItems(_ref4, next_page_url) {
  var commit = _ref4.commit;

  commit('SET_CLICKED_LOADING', true);
  (0, _axios2.default)(next_page_url).then(function (value) {
    var _value$data2 = value.data,
        data = _value$data2.data,
        next_page_url = _value$data2.next_page_url;


    commit('SET_PAGINATOR', next_page_url);

    setTimeout(function () {
      commit('PUSH_TO_ITEMS', data);
      commit('SET_CLICKED_LOADING', false);
    }, 500);
  });
}

function setSearchTitle(_ref5, title) {
  var commit = _ref5.commit;

  commit('SET_SEARCH_TITLE', title);
}

function setColorScheme(_ref6, color) {
  var commit = _ref6.commit;

  document.body.classList.remove('dark', 'light');

  localStorage.setItem('color', color);
  document.body.classList.add(color);

  commit('SET_COLOR_SCHEME', color);
}

function setPageTitle(_ref7) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  (0, _objectDestructuringEmpty3.default)(_ref7);

  if (!title) {
    document.title = 'Flox';
  } else {
    document.title = title + ' - Flox';
  }
}

function fetchEpisodes(_ref8, data) {
  var commit = _ref8.commit;

  commit('SET_LOADING_MODAL_DATA', true);
  (0, _axios2.default)(config.api + '/episodes/' + data.tmdb_id).then(function (response) {
    var nextEpisode = response.data.next_episode;

    commit('SET_MODAL_DATA', {
      title: data.title,
      episodes: response.data.episodes,
      spoiler: response.data.spoiler
    });

    commit('SET_LOADING_MODAL_DATA', false);

    if (nextEpisode) {
      commit('SET_SEASON_ACTIVE_MODAL', nextEpisode.season_number);

      setTimeout(function () {
        var container = document.querySelector('.modal-content');
        var episode = document.querySelector('[data-episode=\'' + nextEpisode.episode_number + '\']');

        container.scrollTop = episode.offsetTop - episode.offsetHeight;
      }, 10);
    }
  });
}

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

/***/ }),
/* 227 */,
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(229);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__(233);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _type$SET_SEARCH_TITL;

var _types = __webpack_require__(238);

var type = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (_type$SET_SEARCH_TITL = {}, (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_SEARCH_TITLE, function (state, title) {
  state.searchTitle = title;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_USER_FILTER, function (state, filter) {
  state.userFilter = filter;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_USER_SORT_DIRECTION, function (state, direction) {
  state.userSortDirection = direction;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_ITEMS, function (state, items) {
  state.items = items;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_TOTAL, function (state, total) {
  state.total = total;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_LISTS, function (state, lists) {
  state.lists = lists;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.PUSH_TO_ITEMS, function (state, items) {
  var _state$items;

  (_state$items = state.items).push.apply(_state$items, (0, _toConsumableArray3.default)(items));
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_LOADING, function (state, loading) {
  state.loading = loading;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_PAGINATOR, function (state, data) {
  state.paginator = data;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_CLICKED_LOADING, function (state, loading) {
  state.clickedMoreLoading = loading;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_COLOR_SCHEME, function (state, color) {
  state.colorScheme = color;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.CLOSE_MODAL, function (state) {
  state.modalType = false;
  state.overlay = false;
  state.seasonActiveModal = 1;
  document.body.classList.remove('open-modal');
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.OPEN_MODAL, function (state, data) {
  state.overlay = true;
  state.modalType = data.type;
  state.modalData = data.data;
  document.body.classList.add('open-modal');
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_LOADING_MODAL_DATA, function (state, bool) {
  state.loadingModalData = bool;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_SEASON_ACTIVE_MODAL, function (state, season) {
  state.seasonActiveModal = season;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_MODAL_DATA, function (state, data) {
  state.modalData = data;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_ITEM_LOADED_SUBPAGE, function (state, bool) {
  state.itemLoadedSubpage = bool;
}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_SHOW_FILTERS, function (state, bool) {
  state.showFilters = bool;
}), _type$SET_SEARCH_TITL);

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(230);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(231), __esModule: true };

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(232);
var $Object = __webpack_require__(6).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(11);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(234);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(235), __esModule: true };

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
__webpack_require__(236);
module.exports = __webpack_require__(6).Array.from;


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(11);
var toObject = __webpack_require__(42);
var call = __webpack_require__(81);
var isArrayIter = __webpack_require__(82);
var toLength = __webpack_require__(36);
var createProperty = __webpack_require__(237);
var getIterFn = __webpack_require__(46);

$export($export.S + $export.F * !__webpack_require__(87)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(9);
var createDesc = __webpack_require__(20);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_SEARCH_TITLE = exports.SET_SEARCH_TITLE = 'SET_SEARCH_TITLE';
var SET_USER_FILTER = exports.SET_USER_FILTER = 'SET_USER_FILTER';
var SET_USER_SORT_DIRECTION = exports.SET_USER_SORT_DIRECTION = 'SET_USER_SORT_DIRECTION';
var SET_ITEMS = exports.SET_ITEMS = 'SET_ITEMS';
var SET_TOTAL = exports.SET_TOTAL = 'SET_TOTAL';
var SET_LISTS = exports.SET_LISTS = 'SET_LISTS';
var PUSH_TO_ITEMS = exports.PUSH_TO_ITEMS = 'PUSH_TO_ITEMS';
var SET_LOADING = exports.SET_LOADING = 'SET_LOADING';
var SET_PAGINATOR = exports.SET_PAGINATOR = 'SET_PAGINATOR';
var SET_CLICKED_LOADING = exports.SET_CLICKED_LOADING = 'SET_CLICKED_LOADING';
var SET_COLOR_SCHEME = exports.SET_COLOR_SCHEME = 'SET_COLOR_SCHEME';
var CLOSE_MODAL = exports.CLOSE_MODAL = 'CLOSE_MODAL';
var OPEN_MODAL = exports.OPEN_MODAL = 'OPEN_MODAL';
var SET_SEASON_ACTIVE_MODAL = exports.SET_SEASON_ACTIVE_MODAL = 'SET_SEASON_ACTIVE_MODAL';
var SET_LOADING_MODAL_DATA = exports.SET_LOADING_MODAL_DATA = 'SET_LOADING_MODAL_DATA';
var SET_MODAL_DATA = exports.SET_MODAL_DATA = 'SET_MODAL_DATA';
var SET_ITEM_LOADED_SUBPAGE = exports.SET_ITEM_LOADED_SUBPAGE = 'SET_ITEM_LOADED_SUBPAGE';
var SET_SHOW_FILTERS = exports.SET_SHOW_FILTERS = 'SET_SHOW_FILTERS';

/***/ }),
/* 239 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[99]);