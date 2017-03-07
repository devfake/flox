webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(41);

	var _Header = __webpack_require__(42);

	var _Header2 = _interopRequireDefault(_Header);

	var _Search = __webpack_require__(103);

	var _Search2 = _interopRequireDefault(_Search);

	var _Footer = __webpack_require__(106);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _Login = __webpack_require__(109);

	var _Login2 = _interopRequireDefault(_Login);

	var _Index = __webpack_require__(113);

	var _Index2 = _interopRequireDefault(_Index);

	var _routes = __webpack_require__(126);

	var _routes2 = _interopRequireDefault(_routes);

	var _index = __webpack_require__(45);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(180);

	var App = new _vue2.default({
	  store: _index2.default,
	  router: _routes2.default,

	  created: function created() {
	    this.checkForUserColorScheme();
	  },


	  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
	    colorScheme: function colorScheme(state) {
	      return state.colorScheme;
	    }
	  })),

	  components: {
	    SiteHeader: _Header2.default, Search: _Search2.default, SiteFooter: _Footer2.default, Login: _Login2.default, Modal: _Index2.default
	  },

	  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['setColorScheme']), {
	    checkForUserColorScheme: function checkForUserColorScheme() {
	      if (!localStorage.getItem('color')) {
	        localStorage.setItem('color', 'dark');
	      }

	      this.setColorScheme(localStorage.getItem('color'));
	    }
	  })
	});

	App.$mount('#app');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(2);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(20)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , hide      = __webpack_require__(10)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
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
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(15) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(18)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(15) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(15) && !__webpack_require__(16)(function(){
	  return Object.defineProperty(__webpack_require__(17)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(21)
	  , gOPS     = __webpack_require__(36)
	  , pIE      = __webpack_require__(37)
	  , toObject = __webpack_require__(38)
	  , IObject  = __webpack_require__(25)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(16)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(22)
	  , enumBugKeys = __webpack_require__(35);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(23)
	  , toIObject    = __webpack_require__(24)
	  , arrayIndexOf = __webpack_require__(28)(false)
	  , IE_PROTO     = __webpack_require__(32)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(25)
	  , defined = __webpack_require__(27);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(26);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(24)
	  , toLength  = __webpack_require__(29)
	  , toIndex   = __webpack_require__(31);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(30)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(33)('keys')
	  , uid    = __webpack_require__(34);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 36 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 37 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(27);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(43)

	/* template */
	var __vue_template__ = __webpack_require__(101)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Header.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-fe1be044", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-fe1be044", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Header.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _index = __webpack_require__(45);

	var _index2 = _interopRequireDefault(_index);

	var _vuex = __webpack_require__(41);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  created: function created() {
	    this.checkForUserFilter();
	  },


	  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
	    userFilter: function userFilter(state) {
	      return state.userFilter;
	    },
	    colorScheme: function colorScheme(state) {
	      return state.colorScheme;
	    },
	    itemLoadedSubpage: function itemLoadedSubpage(state) {
	      return state.itemLoadedSubpage;
	    }
	  }), {
	    root: function root() {
	      return config.uri;
	    }
	  }),

	  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['setColorScheme', 'loadItems']), (0, _vuex.mapMutations)(['SET_USER_FILTER']), {
	    toggleColorScheme: function toggleColorScheme() {
	      var color = this.colorScheme == 'light' ? 'dark' : 'light';

	      this.setColorScheme(color);
	    },
	    checkForUserFilter: function checkForUserFilter() {
	      if (!localStorage.getItem('filter')) {
	        localStorage.setItem('filter', 'last_seen_at');
	      }

	      this.SET_USER_FILTER(localStorage.getItem('filter'));
	    },
	    setUserFilter: function setUserFilter(filter) {
	      var name = this.$route.name;

	      localStorage.setItem('filter', filter);
	      this.SET_USER_FILTER(filter);
	      this.loadItems({ name: name, filter: filter });
	    }
	  })
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	'use strict';

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
	    addZero: function addZero(item) {
	      if (item < 10) {
	        return '0' + item;
	      }

	      return item;
	    },
	    lang: function lang(text) {
	      var language = JSON.parse(config.language);

	      return language[text];
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

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(41);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _actions = __webpack_require__(46);

	var actions = _interopRequireWildcard(_actions);

	var _mutations = __webpack_require__(72);

	var _mutations2 = _interopRequireDefault(_mutations);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vuex2.default);

	exports.default = new _vuex2.default.Store({
	  state: {
	    items: [],
	    searchTitle: '',
	    userFilter: '',
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

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadItems = loadItems;
	exports.loadMoreItems = loadMoreItems;
	exports.setSearchTitle = setSearchTitle;
	exports.setColorScheme = setColorScheme;
	exports.fetchEpisodes = fetchEpisodes;

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function loadItems(_ref, response) {
	  var commit = _ref.commit;

	  commit('SET_LOADING', true);
	  (0, _axios2.default)(config.api + '/items/' + response.name + '/' + response.filter).then(function (value) {
	    var _value$data = value.data,
	        data = _value$data.data,
	        next_page_url = _value$data.next_page_url;


	    commit('SET_ITEMS', data);
	    commit('SET_PAGINATOR', next_page_url);

	    setTimeout(function () {
	      commit('SET_LOADING', false);
	    }, 500);
	  }, function (error) {
	    if (error.status == 404) {
	      window.location.href = config.url;
	    }
	  });
	}

	function loadMoreItems(_ref2, next_page_url) {
	  var commit = _ref2.commit;

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

	function setSearchTitle(_ref3, title) {
	  var commit = _ref3.commit;

	  commit('SET_SEARCH_TITLE', title);
	}

	function setColorScheme(_ref4, color) {
	  var commit = _ref4.commit;

	  document.body.classList.remove('dark', 'light');

	  localStorage.setItem('color', color);
	  document.body.classList.add(color);

	  commit('SET_COLOR_SCHEME', color);
	}

	function fetchEpisodes(_ref5, data) {
	  var commit = _ref5.commit;

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

/***/ },
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(73);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _toConsumableArray2 = __webpack_require__(77);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _type$SET_SEARCH_TITL;

	var _types = __webpack_require__(100);

	var type = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (_type$SET_SEARCH_TITL = {}, (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_SEARCH_TITLE, function (state, title) {
	  state.searchTitle = title;
	}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_USER_FILTER, function (state, filter) {
	  state.userFilter = filter;
	}), (0, _defineProperty3.default)(_type$SET_SEARCH_TITL, type.SET_ITEMS, function (state, items) {
	  state.items = items;
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
	}), _type$SET_SEARCH_TITL);

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(74);

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

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(75), __esModule: true };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(76);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(78);

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

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	__webpack_require__(93);
	module.exports = __webpack_require__(7).Array.from;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(81)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(82)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(30)
	  , defined   = __webpack_require__(27);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(83)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(84)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(23)
	  , Iterators      = __webpack_require__(85)
	  , $iterCreate    = __webpack_require__(86)
	  , setToStringTag = __webpack_require__(90)
	  , getPrototypeOf = __webpack_require__(92)
	  , ITERATOR       = __webpack_require__(91)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(87)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(90)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(91)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(88)
	  , enumBugKeys = __webpack_require__(35)
	  , IE_PROTO    = __webpack_require__(32)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(17)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(89).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(21);

	module.exports = __webpack_require__(15) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(23)
	  , TAG = __webpack_require__(91)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(33)('wks')
	  , uid        = __webpack_require__(34)
	  , Symbol     = __webpack_require__(6).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(23)
	  , toObject    = __webpack_require__(38)
	  , IE_PROTO    = __webpack_require__(32)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(8)
	  , $export        = __webpack_require__(5)
	  , toObject       = __webpack_require__(38)
	  , call           = __webpack_require__(94)
	  , isArrayIter    = __webpack_require__(95)
	  , toLength       = __webpack_require__(29)
	  , createProperty = __webpack_require__(96)
	  , getIterFn      = __webpack_require__(97);

	$export($export.S + $export.F * !__webpack_require__(99)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(85)
	  , ITERATOR   = __webpack_require__(91)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(19);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(98)
	  , ITERATOR  = __webpack_require__(91)('iterator')
	  , Iterators = __webpack_require__(85);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(26)
	  , TAG = __webpack_require__(91)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(91)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SET_SEARCH_TITLE = exports.SET_SEARCH_TITLE = 'SET_SEARCH_TITLE';
	var SET_USER_FILTER = exports.SET_USER_FILTER = 'SET_USER_FILTER';
	var SET_ITEMS = exports.SET_ITEMS = 'SET_ITEMS';
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

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('header', {
	    class: {
	      active: _vm.displayHeader
	    }
	  }, [_c('div', {
	    staticClass: "wrap"
	  }, [_c('router-link', {
	    staticClass: "logo",
	    attrs: {
	      "to": "/"
	    }
	  }, [_c('img', {
	    attrs: {
	      "src": __webpack_require__(102),
	      "alt": "Flox",
	      "width": "108",
	      "height": "32"
	    }
	  })]), _vm._v(" "), (!_vm.isSubpage()) ? _c('span', {
	    staticClass: "sort-wrap"
	  }, [_c('i', {
	    staticClass: "icon-sort-time",
	    class: {
	      active: _vm.userFilter == 'last_seen_at'
	    },
	    attrs: {
	      "title": _vm.lang('last seen')
	    },
	    on: {
	      "click": function($event) {
	        _vm.setUserFilter('last_seen_at')
	      }
	    }
	  }), _vm._v(" "), _c('i', {
	    staticClass: "icon-sort-star",
	    class: {
	      active: _vm.userFilter == 'rating'
	    },
	    attrs: {
	      "title": _vm.lang('best rated')
	    },
	    on: {
	      "click": function($event) {
	        _vm.setUserFilter('rating')
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "icon-constrast",
	    attrs: {
	      "title": _vm.lang('change color')
	    },
	    on: {
	      "click": function($event) {
	        _vm.toggleColorScheme()
	      }
	    }
	  }, [_c('i')])]) : _vm._e(), _vm._v(" "), _c('ul', {
	    staticClass: "site-nav"
	  }, [_c('li', [_c('router-link', {
	    attrs: {
	      "to": "/trending"
	    }
	  }, [_vm._v(_vm._s(_vm.lang('trending')))])], 1), _vm._v(" "), _c('li', [_c('router-link', {
	    attrs: {
	      "to": "/upcoming"
	    }
	  }, [_vm._v(_vm._s(_vm.lang('upcoming')))])], 1)]), _vm._v(" "), _c('ul', {
	    staticClass: "site-nav-second"
	  }, [_c('li', [_c('router-link', {
	    attrs: {
	      "to": "/tv",
	      "exact": ""
	    }
	  }, [_vm._v(_vm._s(_vm.lang('tv')))])], 1), _vm._v(" "), _c('li', [_c('router-link', {
	    attrs: {
	      "to": "/movies",
	      "exact": ""
	    }
	  }, [_vm._v(_vm._s(_vm.lang('movies')))])], 1)])], 1)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-fe1be044", module.exports)
	  }
	}

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAgCAMAAADAIm3oAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA3VUzEYcLwLuZj0R37swdFCks88gh69G2q19TA8M5+Ahm2KiinWg75n597FBo4OziAAACOklEQVRIx71Xf3eqMAxtocUCFlDHlCnqfvq29/L9v947FtLMyCadx90/PBporklvL0H8EMlsrZvVcrlq9HqWiFuielstwGOxeqvErVB9SGCQHyPpcnkG3YXFINZPMICnNd1RyJStia3M3ZcIzqBdeJAsyeALZIlPDRCdriqgp4/ARgzxl2SlAY+7V61f7+i3KfGuKdj686oUpEIylvWbcOlz32fzxFU6z+49u2czYAQhB8hFMJlqMe9kTtH5BKOt6kO1hSmtkqBFMNnmGbO+JCf7+ILx500fegSIqcxChJNNfV0JUw3WRvU0UHheW4eTbRe4X9hDtS37TuK+LbbUuxSl+SiCyTYTL3IMzUDqrsjMF71hqiigEeFkD5hvN/NesgOYKEe7w6sPeFGDVcdPqcLJ1NL/+T3G/vk6977spaKTbLC+QDIqDFLPXxx//im7c0ulkZFMcecCycgqtCOqVVSAg9OEJmM5Ua/kWUEyjCA77FCbnKz9bImQczIOOaKNNYp9qI0kSDCczMYMFwWCYv9WIEpCg7Z1pfQrl35Q+mRTaFtXH+pESxg81CSPGG3rCrv625/q8nAoeythdoU2hbZ1jRGb/emFvWFG3B1pVEmEsRs9YkQKVuG3ENcnVJcenhWthpzVeLOxoLZup8i2gsn4wNMeB56WDTwdDC4mXQaQBY1ylJ241QUybixqxJDK+0ZdvUDGoVEm7+fj93snDbQpc54swvF73FSuR75YaClrni2V2MjfemX6D0AKmiHCtfAOAAAAAElFTkSuQmCC"

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(104)

	/* template */
	var __vue_template__ = __webpack_require__(105)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Search.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3e8ae50e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3e8ae50e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Search.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _vuex = __webpack_require__(41);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  mounted: function mounted() {
	    this.initSticky();
	  },
	  data: function data() {
	    return {
	      sticky: false
	    };
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
	    initSticky: function initSticky() {
	      var _this = this;

	      var height = document.querySelector('header').scrollHeight;

	      window.onscroll = function () {
	        _this.sticky = document.body.scrollTop + document.documentElement.scrollTop > height;
	      };
	    },
	    search: function search() {
	      if (this.title != '') {
	        this.$router.push({
	          path: '/search?q=' + this.title
	        });
	      }
	    }
	  }
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('section', {
	    staticClass: "search-wrap",
	    class: {
	      sticky: _vm.sticky, active: _vm.displayHeader
	    }
	  }, [_c('div', {
	    staticClass: "wrap"
	  }, [_c('form', {
	    staticClass: "search-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.search()
	      }
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/"
	    }
	  }, [_c('i', {
	    staticClass: "icon-logo-small",
	    on: {
	      "click": function($event) {
	        _vm.scrollToTop()
	      }
	    }
	  })]), _vm._v(" "), _c('i', {
	    staticClass: "icon-search"
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.title),
	      expression: "title"
	    }],
	    staticClass: "search-input",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.placeholder,
	      "autofocus": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.title = $event.target.value
	      }
	    }
	  })], 1)]), _vm._v(" "), (_vm.suggestionsFor) ? _c('div', {
	    staticClass: "suggestions-for"
	  }, [_c('div', {
	    staticClass: "wrap"
	  }, [_vm._v("\n      " + _vm._s(_vm.lang('suggestions for')) + " "), _c('router-link', {
	    attrs: {
	      "to": {
	        name: ("subpage-" + (_vm.$route.query.type)),
	        params: {
	          tmdbId: _vm.$route.query.for
	        }
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.suggestionsFor))])], 1)]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-3e8ae50e", module.exports)
	  }
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(107)

	/* template */
	var __vue_template__ = __webpack_require__(108)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Footer.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5fbfabec", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5fbfabec", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Footer.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  data: function data() {
	    return {
	      auth: config.auth,
	      logout: config.api + '/logout',
	      login: config.url + '/login',
	      settings: config.url + '/settings'
	    };
	  },


	  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
	    loading: function loading(state) {
	      return state.loading;
	    }
	  }))
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('footer', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.loading),
	      expression: " ! loading"
	    }]
	  }, [_c('div', {
	    staticClass: "wrap"
	  }, [_vm._m(0), _vm._v(" "), _c('a', {
	    staticClass: "icon-github",
	    attrs: {
	      "href": "https://github.com/devfake/flox",
	      "target": "_blank"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "sub-links"
	  }, [(_vm.auth) ? _c('a', {
	    staticClass: "login-btn",
	    attrs: {
	      "href": _vm.settings
	    }
	  }, [_vm._v(_vm._s(_vm.lang('settings')))]) : _vm._e(), _vm._v(" "), (_vm.auth) ? _c('a', {
	    staticClass: "login-btn",
	    attrs: {
	      "href": _vm.logout
	    }
	  }, [_vm._v(_vm._s(_vm.lang('logout')))]) : _vm._e(), _vm._v(" "), (!_vm.auth) ? _c('a', {
	    staticClass: "login-btn",
	    attrs: {
	      "href": _vm.login
	    }
	  }, [_vm._v("Login")]) : _vm._e()])])])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "attribution"
	  }, [_c('a', {
	    attrs: {
	      "href": "https://www.themoviedb.org/",
	      "target": "_blank"
	    }
	  }, [_c('i', {
	    staticClass: "icon-tmdb"
	  })]), _vm._v("\n      This product uses the TMDb API but is not endorsed or certified by TMDb\n    ")])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5fbfabec", module.exports)
	  }
	}

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(110)

	/* template */
	var __vue_template__ = __webpack_require__(111)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Login.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0d6db128", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0d6db128", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Login.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

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

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('span', {
	    staticClass: "top-bar"
	  }), _vm._v(" "), _c('div', {
	    staticClass: "login-wrap"
	  }, [_c('img', {
	    staticClass: "logo-login",
	    attrs: {
	      "src": __webpack_require__(112),
	      "alt": "Flox",
	      "width": "108",
	      "height": "32"
	    }
	  }), _vm._v(" "), _c('form', {
	    staticClass: "login-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.login()
	      }
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.username),
	      expression: "username"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.lang('username'),
	      "autofocus": ""
	    },
	    domProps: {
	      "value": _vm._s(_vm.username)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.username = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": _vm.lang('password')
	    },
	    domProps: {
	      "value": _vm._s(_vm.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "login-error"
	  }, [(_vm.error) ? _c('span', [_vm._v(_vm._s(_vm.lang('login error')))]) : _vm._e()]), _vm._v(" "), _c('input', {
	    class: _vm.errorShake ? 'shake-horizontal shake-constant' : '',
	    attrs: {
	      "type": "submit"
	    },
	    domProps: {
	      "value": _vm.lang('login button')
	    }
	  })])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0d6db128", module.exports)
	  }
	}

/***/ },
/* 112 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAgCAMAAADAIm3oAAACE1BMVEUAAACKW/+cU+yaVO6KW/7GQsSQWPnnNKToNKOSV/e8Rs7QPruMWv2PWfqhUejGQsXEQsaqTeDoNKS7Rs+TV/bkNae/RcvtMZ6+RczGQsWVVvSlT+SrTd7sMp/wMJvtMZ7nNKS/RcvNP77QPrvTPbjNP73uMZ2RWPigUenhN6u6RtDSPbnGQsSwStqxStnARMrPPrvVPLbLQL/GQsTqM6LRPbrGQsTwMJy4R9LLQL/TPLe0SdbKQMHWO7XnNKStTN3eOK7QPruSV/fEQ8azSdfjNqjoNKPARMvmNaXmNKXEQsbdOK+6RtDuMZ29Rc3sMp/ARMnrM6DiNqntMZ3vMJy5R9HTPbiwS9m/RcvbObCKW/66R9DRPbnLQL+JW//IQcKtTNzdOK7oNKPfN6zXO7PJQcHYOrLKQMC1SdTqM6LEQ8axStjZOrG8Rs25R9HjNqjmNKWWVvLTPbi6R9CwS9m8Rs3PPrvlNabrMqDjNqivS9rNP73cOa/ARMrARMnGQsPBRMicU+zEQ8bfOKztMZ23SNPVPLa1SdXYOrPKQMG6R9GbU+2JW//RPbq8Rs7EQ8fBRMnPPrzWO7SwS9rGQsOyStfIQcLTPbixStjFQsXZOrHLQL/vMZyTV/boNKPrM6HtMZ6MWv2+RczbObDiNqmPWPm/RcvNP73cOa/lNafmNKWtTN2KW/6kUOaeUurdOK6pTeCVJkKBAAAAhXRSTlMAVd1V3QszETNVER3d3TMDhzMhFN27U0QpCN3d3d3dzEQsLCkU7+7d3d3b29HIwsG/vrarq56dmY+Pj4eHendfX1NEOh3u7uvdzMvBwLu4mY+Hd3dV+Pjz8/Pu7Ovm3d3R0czKyMbDwLu7tqioopmZmYeHfXdoaGZmVTk5OSH4+PPu3Ydmpzv5zwAAAydJREFUSMe9l+dX01AYxl+R0lpUakspRQsFBCx7FMosIntPF25w4QInoOJmCwVBFI1J1DqSovInmqQ3F9rGtoFTfx96evIhv3Pf3PvkCWwRRWyMpuBaZmZ+QXlVsgJCie5+24mFBYdjdXllevpjSv6DgxAqdHfT579835D9WFzMqAhSd+RsePhujj0caWnR0dFxcbf5y2FhIElM+sy8t2xuLqMKMP2WQfBElRpvAJ4dr9fWPvN84/gkwMt2zkrKFMXjM1KydxOlCnxrp3MUPEggbIBkvTsEdmEi/imruTqOZU1FGk3RJSybyIsERJezVgubsBHxSlEWDr5Iy2qyJpGsviNRIaw0qSQFyd5cxDa9Uw8bGAjCALJl6uxJJMtJBExSLpJNXVaiS9paxg4iShPRCbJlUdffItlNhcdzLESyqRtR6NIww6gA0UongHzZvfdI1oJc2JaLZB8qAGFlGtG/ETpVK1/28DiSnRJnqK6ORJM8jWQnH4uza2CH3FuTpl+BbFlU9hKSFQMidvlcuXuRpUj2tVkcpJllzcKup60gX1a5hGRHY3GWPF2ZvqIGjuRjSPbzMCA62Tol90uZlPJl6vOirMWIw4Q/1CXAYcwTZRfwvRvJATBTlAHkyypdouwW9jfxsjPCcysUZX/w0lQkaTdR7bAFWRaWlQmiMXVMkzuuHgHHHSzrBxE7SVIm8JKteQdxELLqJ88cDklZM2D6SI8hSgZxXBBjHKvng9jvGMHMrWzAW9Yb4UUwG6SDl/ndIMoG0lpHdQNsf+vrcniZn60PerIPRihKBbD9Q63QvFj1c6jBzpKcx0qhYNxyXKFTHVktxlWyT1yBimWHhcin2wG2E8RtRvDA6BvE0MjqgcdA0z0AIX3FwCBTh3ZKu7zUx+gCvTxxxxplGDMuIHQrAISiFuA39RCIqGiiW6bMt/DkSBQe3EEaYINuglAFlMmvcrhdOT1OV2vgdvV8L2KfG3Xgkop7YxdsRptK2ALIZn9z/OJZX193uVxlQdZvpUUscpgegugR6zf4INTvsEMc+3kO8JQF+WHx0mLRghe2eDTI//bJ9BcGDf91+LWedQAAAABJRU5ErkJggg=="

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(114)

	/* template */
	var __vue_template__ = __webpack_require__(125)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Modal\\Index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-c47cfb7c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-c47cfb7c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Season = __webpack_require__(115);

	var _Season2 = _interopRequireDefault(_Season);

	var _Trailer = __webpack_require__(203);

	var _Trailer2 = _interopRequireDefault(_Trailer);

	var _vuex = __webpack_require__(41);

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
	    Season: _Season2.default, Trailer: _Trailer2.default
	  }
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(116)

	/* template */
	var __vue_template__ = __webpack_require__(124)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Modal\\Season.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0fe28f23", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0fe28f23", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Season.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(117);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(41);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

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

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(118), __esModule: true };

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(119);
	__webpack_require__(80);
	module.exports = __webpack_require__(123);

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(120);
	var global        = __webpack_require__(6)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(85)
	  , TO_STRING_TAG = __webpack_require__(91)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(121)
	  , step             = __webpack_require__(122)
	  , Iterators        = __webpack_require__(85)
	  , toIObject        = __webpack_require__(24);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(82)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(12)
	  , get      = __webpack_require__(97);
	module.exports = __webpack_require__(7).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal-wrap"
	  }, [_c('div', {
	    staticClass: "modal-header"
	  }, [_c('span', [_vm._v(_vm._s(_vm.modalData.title))]), _vm._v(" "), _c('span', {
	    staticClass: "close-modal",
	    on: {
	      "click": function($event) {
	        _vm.CLOSE_MODAL()
	      }
	    }
	  }, [_c('i', {
	    staticClass: "icon-close"
	  })])]), _vm._v(" "), (_vm.loadingModalData) ? _c('div', {
	    staticClass: "modal-content modal-content-loading"
	  }, [_vm._m(0)]) : _vm._e(), _vm._v(" "), (!_vm.loadingModalData) ? _c('div', {
	    staticClass: "season-tabs"
	  }, _vm._l((_vm.episodes), function(season, index) {
	    return _c('span', {
	      staticClass: "season-number no-select",
	      class: {
	        active: index == _vm.seasonActiveModal, completed: _vm.seasonCompleted(index)
	      },
	      on: {
	        "click": function($event) {
	          _vm.SET_SEASON_ACTIVE_MODAL(index)
	        }
	      }
	    }, [_vm._v("\n      S" + _vm._s(_vm.addZero(index)) + "\n    ")])
	  })) : _vm._e(), _vm._v(" "), (!_vm.loadingModalData) ? _c('div', {
	    staticClass: "item-header no-select"
	  }, [_c('span', {
	    staticClass: "header-episode"
	  }, [_vm._v("#")]), _vm._v(" "), _c('span', {
	    staticClass: "header-name"
	  }, [_vm._v("Name")]), _vm._v(" "), (_vm.auth) ? _c('span', {
	    staticClass: "header-seen",
	    on: {
	      "click": function($event) {
	        _vm.toggleAll()
	      }
	    }
	  }, [_vm._v("Toggle all")]) : _vm._e()]) : _vm._e(), _vm._v(" "), (!_vm.loadingModalData) ? _c('div', {
	    staticClass: "modal-content"
	  }, _vm._l((_vm.episodes[_vm.seasonActiveModal]), function(episode, index) {
	    return _c('div', {
	      staticClass: "modal-item",
	      attrs: {
	        "data-episode": episode.episode_number
	      },
	      on: {
	        "click": function($event) {
	          _vm.toggleEpisode(episode)
	        }
	      }
	    }, [_c('span', {
	      staticClass: "modal-episode no-select"
	    }, [_vm._v("E" + _vm._s(_vm.addZero(episode.episode_number)))]), _vm._v(" "), _c('span', {
	      staticClass: "modal-name",
	      class: {
	        'spoiler-protect': _vm.spoiler && !episode.seen && _vm.auth
	      }
	    }, [_vm._v(_vm._s(episode.name))]), _vm._v(" "), (episode.release_episode_human_format) ? _c('span', {
	      staticClass: "modal-release-episode",
	      attrs: {
	        "title": _vm.released(episode.release_episode)
	      }
	    }, [_c('i'), _vm._v(" " + _vm._s(episode.release_episode_human_format))]) : _vm._e(), _vm._v(" "), _c('span', {
	      staticClass: "episode-seen",
	      class: {
	        seen: episode.seen
	      }
	    }, [_c('i')])])
	  })) : _vm._e()])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_c('i')])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0fe28f23", module.exports)
	  }
	}

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "all-modals"
	  }, [_c('transition', {
	    attrs: {
	      "mode": "out-in",
	      "name": "fade"
	    }
	  }, [(_vm.modalType == 'season') ? _c('season') : _vm._e(), _vm._v(" "), (_vm.modalType == 'trailer') ? _c('trailer') : _vm._e()], 1), _vm._v(" "), (_vm.overlay) ? _c('span', {
	    staticClass: "overlay",
	    on: {
	      "click": function($event) {
	        _vm.CLOSE_MODAL()
	      }
	    }
	  }) : _vm._e()], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c47cfb7c", module.exports)
	  }
	}

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(127);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _config = __webpack_require__(128);

	var _config2 = _interopRequireDefault(_config);

	var _Content = __webpack_require__(129);

	var _Content2 = _interopRequireDefault(_Content);

	var _SearchContent = __webpack_require__(140);

	var _SearchContent2 = _interopRequireDefault(_SearchContent);

	var _Index = __webpack_require__(159);

	var _Index2 = _interopRequireDefault(_Index);

	var _TMDBContent = __webpack_require__(174);

	var _TMDBContent2 = _interopRequireDefault(_TMDBContent);

	var _Subpage = __webpack_require__(177);

	var _Subpage2 = _interopRequireDefault(_Subpage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);

	exports.default = new _vueRouter2.default({
	    mode: 'history',
	    base: _config2.default.uri,
	    routes: [{ path: '/', component: _Content2.default, name: 'home' }, { path: '/movies', component: _Content2.default, name: 'movie' }, { path: '/tv', component: _Content2.default, name: 'tv' }, { path: '/movies/:tmdbId', component: _Subpage2.default, name: 'subpage-movie', props: { mediaType: 'movie' } }, { path: '/tv/:tmdbId', component: _Subpage2.default, name: 'subpage-tv', props: { mediaType: 'tv' } }, { path: '/search', component: _SearchContent2.default, name: 'search' }, { path: '/settings', component: _Index2.default, name: 'settings' }, { path: '/suggestions', component: _TMDBContent2.default, name: 'suggestions' }, { path: '/trending', component: _TMDBContent2.default, name: 'trending' }, { path: '/upcoming', component: _TMDBContent2.default, name: 'upcoming' }, { path: '*', component: _Content2.default }]
	});

/***/ },
/* 127 */,
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _axios = __webpack_require__(47);

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

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(130)

	/* template */
	var __vue_template__ = __webpack_require__(139)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Content.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-36b52675", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-36b52675", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Content.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Item = __webpack_require__(131);

	var _Item2 = _interopRequireDefault(_Item);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  created: function created() {
	    this.fetchData();
	    this.fetchSettings();
	  },
	  data: function data() {
	    return {
	      displayGenre: null,
	      displayDate: null
	    };
	  },


	  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
	    loading: function loading(state) {
	      return state.loading;
	    },
	    items: function items(state) {
	      return state.items;
	    },
	    userFilter: function userFilter(state) {
	      return state.userFilter;
	    },
	    clickedMoreLoading: function clickedMoreLoading(state) {
	      return state.clickedMoreLoading;
	    },
	    paginator: function paginator(state) {
	      return state.paginator;
	    }
	  })),

	  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['loadItems', 'loadMoreItems', 'setSearchTitle']), {
	    fetchData: function fetchData() {
	      var name = this.$route.name;

	      this.loadItems({ name: name, filter: this.userFilter });
	      this.setSearchTitle('');
	    },
	    fetchSettings: function fetchSettings() {
	      var _this = this;

	      (0, _axios2.default)(config.api + '/settings').then(function (value) {
	        var data = value.data;

	        _this.displayGenre = data.genre;
	        _this.displayDate = data.date;
	      });
	    },
	    loadMore: function loadMore() {
	      this.loadMoreItems(this.paginator);
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

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(132)

	/* template */
	var __vue_template__ = __webpack_require__(138)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Item.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-92f11a72", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-92f11a72", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Item.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Rating = __webpack_require__(133);

	var _Rating2 = _interopRequireDefault(_Rating);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _vuex = __webpack_require__(41);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  props: ['item', 'genre', 'date'],

	  data: function data() {
	    return {
	      localItem: this.item,
	      latestEpisode: this.item.latest_episode,
	      prevRating: null,
	      auth: config.auth
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
	    suggestions: function suggestions() {
	      return '/suggestions?for=' + this.localItem.tmdb_id + '&name=' + this.localItem.title + '&type=' + this.localItem.media_type;
	    },
	    noImage: function noImage() {
	      return config.url + '/assets/img/no-image.png';
	    },
	    released: function released() {
	      var path = this.$route.path;
	      var released = new Date(this.localItem.released * 1000);

	      if (path == '/upcoming') {
	        return this.formatLocaleDate(released);
	      }

	      return released.getFullYear();
	    },
	    displaySeason: function displaySeason() {
	      return this.localItem.media_type == 'tv' && this.localItem.rating != null && this.localItem.tmdb_id;
	    },
	    season: function season() {
	      if (this.latestEpisode) {
	        return this.addZero(this.latestEpisode.season_number);
	      }

	      return '01';
	    },
	    episode: function episode() {
	      if (this.latestEpisode) {
	        return this.addZero(this.latestEpisode.episode_number);
	      }

	      return '0';
	    }
	  },

	  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['OPEN_MODAL']), (0, _vuex.mapActions)(['fetchEpisodes']), {
	    openSeasonModal: function openSeasonModal() {
	      var data = {
	        tmdb_id: this.localItem.tmdb_id,
	        title: this.localItem.title
	      };

	      this.fetchEpisodes(data);

	      this.OPEN_MODAL({
	        type: 'season',
	        data: data
	      });
	    },
	    setItem: function setItem(item) {
	      this.localItem = item;
	    },
	    addToWatchlist: function addToWatchlist() {},
	    editItem: function editItem() {}
	  }),

	  components: {
	    Rating: _Rating2.default
	  }
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(134)

	/* template */
	var __vue_template__ = __webpack_require__(137)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Rating.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-f0965224", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-f0965224", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Rating.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _debounce = __webpack_require__(135);

	var _debounce2 = _interopRequireDefault(_debounce);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ratingMilliseconds = 700;
	var newItemMilliseconds = 200;

	exports.default = {
	  props: ['item', 'set-item'],

	  data: function data() {
	    return {
	      rated: false,
	      auth: config.auth
	    };
	  },
	  created: function created() {
	    this.saveNewRating = (0, _debounce2.default)(this.saveNewRating, ratingMilliseconds);
	    this.addNewItem = (0, _debounce2.default)(this.addNewItem, newItemMilliseconds, true);
	  },


	  methods: {
	    changeRating: function changeRating() {
	      if (this.auth) {
	        this.prevRating = this.item.rating;
	        this.item.rating = this.prevRating == 3 ? 1 : +this.prevRating + 1;

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
	        this.rated = true;

	        _axios2.default.post(config.api + '/add', { item: this.item }).then(function (value) {
	          _this2.setItem(value.data);
	          _this2.rated = false;
	        }, function (error) {
	          if (error.status == 409) {
	            alert(_this2.item.title + ' already exists!');
	          }
	        });
	      }
	    }
	  }
	};

/***/ },
/* 135 */,
/* 136 */,
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [(_vm.item.rating != null) ? _c('span', {
	    class: 'item-rating rating-' + _vm.item.rating,
	    on: {
	      "click": function($event) {
	        _vm.changeRating()
	      }
	    }
	  }, [_c('i', {
	    staticClass: "icon-rating"
	  })]) : _vm._e(), _vm._v(" "), (_vm.item.rating == null && _vm.item.tmdb_id && !_vm.rated && _vm.auth) ? _c('span', {
	    staticClass: "item-rating item-new",
	    on: {
	      "click": function($event) {
	        _vm.addNewItem()
	      }
	    }
	  }, [_c('i', {
	    staticClass: "icon-add"
	  })]) : _vm._e(), _vm._v(" "), (_vm.item.rating == null && _vm.item.tmdb_id && _vm.rated) ? _c('span', {
	    staticClass: "item-rating item-new"
	  }, [_vm._m(0)]) : _vm._e()])
	},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('span', {
	    staticClass: "loader smallsize-loader"
	  }, [_c('i')])
	}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-f0965224", module.exports)
	  }
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "mode": "out-in",
	      "name": "fade"
	    }
	  }, [_c('div', {
	    staticClass: "item-wrap"
	  }, [_c('div', {
	    staticClass: "item-image-wrap no-select"
	  }, [_c('rating', {
	    attrs: {
	      "item": _vm.localItem,
	      "set-item": _vm.setItem
	    }
	  }), _vm._v(" "), (_vm.localItem.tmdb_id) ? _c('router-link', {
	    staticClass: "recommend-item",
	    attrs: {
	      "to": _vm.suggestions
	    }
	  }, [_vm._v(_vm._s(_vm.lang('suggestions')))]) : _vm._e(), _vm._v(" "), (_vm.auth && _vm.localItem.rating == null) ? _c('span', {
	    staticClass: "add-to-watchlist",
	    on: {
	      "click": function($event) {
	        _vm.addToWatchlist()
	      }
	    }
	  }, [_vm._v("Add to watchlist")]) : _vm._e(), _vm._v(" "), (_vm.auth && !_vm.localItem.tmdb_id) ? _c('span', {
	    staticClass: "edit-item",
	    on: {
	      "click": function($event) {
	        _vm.editItem()
	      }
	    }
	  }, [_vm._v("Edit")]) : _vm._e(), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": {
	        name: ("subpage-" + (_vm.localItem.media_type)),
	        params: {
	          tmdbId: _vm.localItem.tmdb_id
	        }
	      }
	    }
	  }, [(_vm.localItem.poster) ? _c('img', {
	    staticClass: "item-image",
	    attrs: {
	      "src": _vm.poster,
	      "width": "185",
	      "height": "278"
	    }
	  }) : _vm._e(), _vm._v(" "), (!_vm.localItem.poster) ? _c('img', {
	    staticClass: "item-image",
	    attrs: {
	      "src": _vm.noImage,
	      "width": "185",
	      "height": "278"
	    }
	  }) : _vm._e()]), _vm._v(" "), (_vm.displaySeason) ? _c('span', {
	    staticClass: "show-episode",
	    on: {
	      "click": function($event) {
	        _vm.openSeasonModal()
	      }
	    }
	  }, [_c('span', {
	    staticClass: "season-item"
	  }, [_c('i', [_vm._v("S")]), _vm._v(_vm._s(_vm.season))]), _vm._v(" "), _c('span', {
	    staticClass: "episode-item"
	  }, [_c('i', [_vm._v("E")]), _vm._v(_vm._s(_vm.episode))])]) : _vm._e()], 1), _vm._v(" "), _c('div', {
	    staticClass: "item-content"
	  }, [(_vm.date == 1) ? _c('span', {
	    staticClass: "item-year"
	  }, [_vm._v(_vm._s(_vm.released))]) : _vm._e(), _vm._v(" "), (_vm.hasSrc) ? _c('i', {
	    staticClass: "item-has-src"
	  }) : _vm._e(), _vm._v(" "), _c('router-link', {
	    staticClass: "item-title",
	    attrs: {
	      "to": {
	        name: ("subpage-" + (_vm.localItem.media_type)),
	        params: {
	          tmdbId: _vm.localItem.tmdb_id
	        }
	      },
	      "title": _vm.localItem.title
	    }
	  }, [_vm._v(_vm._s(_vm.localItem.title))]), _vm._v(" "), (_vm.genre == 1) ? _c('span', {
	    staticClass: "item-genre"
	  }, [_vm._v(_vm._s(_vm.localItem.genre))]) : _vm._e()], 1)])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-92f11a72", module.exports)
	  }
	}

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('main', [(!_vm.loading) ? _c('div', {
	    staticClass: "wrap-content"
	  }, [_vm._l((_vm.items), function(item, index) {
	    return _c('Item', {
	      key: index,
	      attrs: {
	        "item": item,
	        "genre": _vm.displayGenre,
	        "date": _vm.displayDate
	      }
	    })
	  }), _vm._v(" "), (!_vm.items.length) ? _c('span', {
	    staticClass: "nothing-found"
	  }, [_vm._v(_vm._s(_vm.lang('nothing found')))]) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "load-more-wrap"
	  }, [(!_vm.clickedMoreLoading && _vm.paginator) ? _c('span', {
	    staticClass: "load-more",
	    on: {
	      "click": function($event) {
	        _vm.loadMore()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.lang('load more')))]) : _vm._e(), _vm._v(" "), (_vm.clickedMoreLoading) ? _c('span', {
	    staticClass: "loader"
	  }, [_c('i')]) : _vm._e()])], 2) : _vm._e(), _vm._v(" "), (_vm.loading) ? _c('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_c('i')]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-36b52675", module.exports)
	  }
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(141)

	/* template */
	var __vue_template__ = __webpack_require__(158)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\SearchContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0fde54ad", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0fde54ad", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] SearchContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(142);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(145);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Item = __webpack_require__(131);

	var _Item2 = _interopRequireDefault(_Item);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	var _vuex = __webpack_require__(41);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

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

	  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_SEARCH_TITLE', 'SET_LOADING']), {
	    initSearch: function initSearch() {
	      var _this = this;

	      this.SET_SEARCH_TITLE(this.$route.query.q);
	      this.SET_LOADING(true);
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

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(143);


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(144);

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

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
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

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
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

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

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
	        return !!caught;
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
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
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

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(40)))

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _promise = __webpack_require__(146);

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

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(147), __esModule: true };

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(148);
	__webpack_require__(80);
	__webpack_require__(119);
	__webpack_require__(149);
	module.exports = __webpack_require__(7).Promise;

/***/ },
/* 148 */
/***/ function(module, exports) {

	

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(83)
	  , global             = __webpack_require__(6)
	  , ctx                = __webpack_require__(8)
	  , classof            = __webpack_require__(98)
	  , $export            = __webpack_require__(5)
	  , isObject           = __webpack_require__(13)
	  , aFunction          = __webpack_require__(9)
	  , anInstance         = __webpack_require__(150)
	  , forOf              = __webpack_require__(151)
	  , speciesConstructor = __webpack_require__(152)
	  , task               = __webpack_require__(153).set
	  , microtask          = __webpack_require__(155)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(91)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(156)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(90)($Promise, PROMISE);
	__webpack_require__(157)(PROMISE);
	Wrapper = __webpack_require__(7)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(99)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(8)
	  , call        = __webpack_require__(94)
	  , isArrayIter = __webpack_require__(95)
	  , anObject    = __webpack_require__(12)
	  , toLength    = __webpack_require__(29)
	  , getIterFn   = __webpack_require__(97)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(12)
	  , aFunction = __webpack_require__(9)
	  , SPECIES   = __webpack_require__(91)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(8)
	  , invoke             = __webpack_require__(154)
	  , html               = __webpack_require__(89)
	  , cel                = __webpack_require__(17)
	  , global             = __webpack_require__(6)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(26)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 154 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
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
	  } return              fn.apply(that, args);
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(153).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(26)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(10);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , core        = __webpack_require__(7)
	  , dP          = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(15)
	  , SPECIES     = __webpack_require__(91)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('main', [(!_vm.loading) ? _c('div', {
	    staticClass: "wrap-content"
	  }, [_vm._l((_vm.floxItems), function(item, index) {
	    return _c('Item', {
	      key: index,
	      attrs: {
	        "item": item,
	        "genre": true,
	        "date": true
	      }
	    })
	  }), _vm._v(" "), _vm._l((_vm.tmdbItems), function(item, index) {
	    return _c('Item', {
	      key: index,
	      attrs: {
	        "item": item,
	        "genre": true,
	        "date": true
	      }
	    })
	  }), _vm._v(" "), (!_vm.floxItems.length && !_vm.tmdbItems.length) ? _c('span', {
	    staticClass: "nothing-found"
	  }, [_vm._v(_vm._s(_vm.lang('nothing found')))]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), (_vm.loading) ? _c('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_c('i')]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0fde54ad", module.exports)
	  }
	}

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(160)

	/* template */
	var __vue_template__ = __webpack_require__(173)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Settings\\Index.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-13e6896d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-13e6896d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Index.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _User = __webpack_require__(161);

	var _User2 = _interopRequireDefault(_User);

	var _Options = __webpack_require__(164);

	var _Options2 = _interopRequireDefault(_Options);

	var _Backup = __webpack_require__(167);

	var _Backup2 = _interopRequireDefault(_Backup);

	var _Misc = __webpack_require__(170);

	var _Misc2 = _interopRequireDefault(_Misc);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  components: {
	    User: _User2.default, Options: _Options2.default, Backup: _Backup2.default, Misc: _Misc2.default
	  },

	  data: function data() {
	    return {
	      activeTab: 'user'
	    };
	  },


	  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
	    loading: function loading(state) {
	      return state.loading;
	    }
	  })),

	  methods: {
	    changeActiveTab: function changeActiveTab(tab) {
	      this.activeTab = tab;
	    }
	  }
	};

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(162)

	/* template */
	var __vue_template__ = __webpack_require__(163)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Settings\\User.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4d0e2500", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4d0e2500", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] User.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	var _debounce = __webpack_require__(135);

	var _debounce2 = _interopRequireDefault(_debounce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var debounceMilliseconds = 2000;

	exports.default = {
	  mixins: [_helper2.default],

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

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.loading) ? _c('div', {
	    staticClass: "settings-box"
	  }, [_c('form', {
	    staticClass: "login-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.editUser()
	      }
	    }
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.username),
	      expression: "username"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.lang('username')
	    },
	    domProps: {
	      "value": _vm._s(_vm.username)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.username = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.password),
	      expression: "password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": _vm.lang('password'),
	      "autocomplete": "off"
	    },
	    domProps: {
	      "value": _vm._s(_vm.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.password = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "userdata-info"
	  }, [_vm._v(_vm._s(_vm.lang('password message')))]), _vm._v(" "), _c('span', {
	    staticClass: "userdata-changed"
	  }, [(_vm.success) ? _c('span', [_vm._v(_vm._s(_vm.lang('success message')))]) : _vm._e()]), _vm._v(" "), _c('input', {
	    attrs: {
	      "type": "submit"
	    },
	    domProps: {
	      "value": _vm.lang('save button')
	    }
	  })])]) : _vm._e()
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4d0e2500", module.exports)
	  }
	}

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(165)

	/* template */
	var __vue_template__ = __webpack_require__(166)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Settings\\Options.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e20f270e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e20f270e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Options.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	var _debounce = __webpack_require__(135);

	var _debounce2 = _interopRequireDefault(_debounce);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var debounceMilliseconds = 700;

	exports.default = {
	  mixins: [_helper2.default],

	  created: function created() {
	    this.fetchOptions();
	    this.updateOptions = (0, _debounce2.default)(this.updateOptions, debounceMilliseconds);
	  },
	  data: function data() {
	    return {
	      genre: null,
	      date: null,
	      spoiler: null
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
	      });
	    },
	    updateOptions: function updateOptions() {
	      var date = this.date;
	      var genre = this.genre;
	      var spoiler = this.spoiler;

	      _axios2.default.patch(config.api + '/settings', { date: date, genre: genre, spoiler: spoiler }).catch(function () {
	        alert('Error');
	      });
	    }
	  })

	};

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.loading) ? _c('div', {
	    staticClass: "settings-box no-select"
	  }, [_c('div', {
	    staticClass: "checkbox"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.genre),
	      expression: "genre"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "value": "genre",
	      "id": "genre"
	    },
	    domProps: {
	      "checked": Array.isArray(_vm.genre) ? _vm._i(_vm.genre, "genre") > -1 : (_vm.genre)
	    },
	    on: {
	      "change": _vm.updateOptions,
	      "click": function($event) {
	        var $$a = _vm.genre,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = "genre",
	            $$i = _vm._i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (_vm.genre = $$a.concat($$v))
	          } else {
	            $$i > -1 && (_vm.genre = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.genre = $$c
	        }
	      }
	    }
	  }), _c('label', {
	    attrs: {
	      "for": "genre"
	    }
	  }, [_vm._v(_vm._s(_vm.lang('display genre')))])]), _vm._v(" "), _c('div', {
	    staticClass: "checkbox"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.date),
	      expression: "date"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "value": "date",
	      "id": "date"
	    },
	    domProps: {
	      "checked": Array.isArray(_vm.date) ? _vm._i(_vm.date, "date") > -1 : (_vm.date)
	    },
	    on: {
	      "change": _vm.updateOptions,
	      "click": function($event) {
	        var $$a = _vm.date,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = "date",
	            $$i = _vm._i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (_vm.date = $$a.concat($$v))
	          } else {
	            $$i > -1 && (_vm.date = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.date = $$c
	        }
	      }
	    }
	  }), _c('label', {
	    attrs: {
	      "for": "date"
	    }
	  }, [_vm._v(_vm._s(_vm.lang('display date')))])]), _vm._v(" "), _c('div', {
	    staticClass: "checkbox"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.spoiler),
	      expression: "spoiler"
	    }],
	    attrs: {
	      "type": "checkbox",
	      "value": "spoiler",
	      "id": "spoiler"
	    },
	    domProps: {
	      "checked": Array.isArray(_vm.spoiler) ? _vm._i(_vm.spoiler, "spoiler") > -1 : (_vm.spoiler)
	    },
	    on: {
	      "change": _vm.updateOptions,
	      "click": function($event) {
	        var $$a = _vm.spoiler,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = "spoiler",
	            $$i = _vm._i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (_vm.spoiler = $$a.concat($$v))
	          } else {
	            $$i > -1 && (_vm.spoiler = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          _vm.spoiler = $$c
	        }
	      }
	    }
	  }), _c('label', {
	    attrs: {
	      "for": "spoiler"
	    }
	  }, [_vm._v(_vm._s(_vm.lang('spoiler')))])])]) : _vm._e()
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e20f270e", module.exports)
	  }
	}

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(168)

	/* template */
	var __vue_template__ = __webpack_require__(169)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Settings\\Backup.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-0755f0b7", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-0755f0b7", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Backup.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

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

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.loading) ? _c('div', {
	    staticClass: "settings-box"
	  }, [_c('a', {
	    staticClass: "export-btn",
	    attrs: {
	      "href": _vm.exportLink
	    }
	  }, [_vm._v(_vm._s(_vm.lang('export button')))]), _vm._v(" "), _c('form', {
	    staticClass: "login-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.importMovies()
	      }
	    }
	  }, [_c('span', {
	    staticClass: "import-info"
	  }, [_vm._v(_vm._s(_vm.lang('or divider')))]), _vm._v(" "), _c('input', {
	    staticClass: "file-btn",
	    attrs: {
	      "type": "file",
	      "required": ""
	    },
	    on: {
	      "change": _vm.upload
	    }
	  }), _vm._v(" "), _c('span', {
	    staticClass: "userdata-changed"
	  }, [(_vm.uploadSuccess) ? _c('span', [_vm._v(_vm._s(_vm.lang('success import')))]) : _vm._e()]), _vm._v(" "), _c('input', {
	    attrs: {
	      "type": "submit"
	    },
	    domProps: {
	      "value": _vm.lang('import button')
	    }
	  })])]) : _vm._e()
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-0755f0b7", module.exports)
	  }
	}

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(171)

	/* template */
	var __vue_template__ = __webpack_require__(172)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Settings\\Misc.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-befca3be", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-befca3be", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Misc.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

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
	    },
	    callPatch: function callPatch(uri) {
	      var _this4 = this;

	      this.SET_LOADING(true);

	      _axios2.default.patch(config.api + '/' + uri).then(function () {
	        _this4.SET_LOADING(false);
	      }).catch(function (error) {
	        _this4.SET_LOADING(false);
	        alert(error.response.data);
	      });
	    }
	  })
	};

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return (!_vm.loading) ? _c('div', {
	    staticClass: "settings-box"
	  }, [_c('div', {
	    staticClass: "version-wrap"
	  }, [_c('span', {
	    staticClass: "current-version"
	  }, [_vm._v(_vm._s(_vm.lang('current version')) + " "), _c('span', [_vm._v(_vm._s(_vm.version))])]), _vm._v(" "), (!_vm.isUpdate) ? _c('span', {
	    staticClass: "update-check"
	  }, [_vm._v(_vm._s(_vm.updateMessage))]) : _vm._e(), _vm._v(" "), (_vm.isUpdate) ? _c('span', {
	    staticClass: "update-check"
	  }, [_c('a', {
	    staticClass: "new-update",
	    attrs: {
	      "href": "https://github.com/devfake/flox/releases",
	      "target": "_blank"
	    }
	  }, [_vm._v(_vm._s(_vm.lang('new update')))])]) : _vm._e()]), _vm._v(" "), _c('div', {
	    staticClass: "misc-btn-wrap"
	  }, [_c('button', {
	    staticClass: "export-btn",
	    on: {
	      "click": function($event) {
	        _vm.fetchFiles()
	      }
	    }
	  }, [_vm._v("Update files")]), _vm._v(" "), _c('button', {
	    staticClass: "export-btn",
	    on: {
	      "click": function($event) {
	        _vm.callPatch('update-genre')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.lang('update genre')))]), _vm._v(" "), _c('button', {
	    staticClass: "export-btn",
	    on: {
	      "click": function($event) {
	        _vm.callPatch('update-alternative-titles')
	      }
	    }
	  }, [_vm._v("Update alternative titles")])])]) : _vm._e()
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-befca3be", module.exports)
	  }
	}

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('main', [_c('div', {
	    staticClass: "wrap-content"
	  }, [_c('div', {
	    staticClass: "navigation-tab no-select"
	  }, [_c('span', {
	    class: {
	      active: _vm.activeTab == 'user'
	    },
	    on: {
	      "click": function($event) {
	        _vm.changeActiveTab('user')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.lang('tab user')))]), _vm._v(" "), _c('span', {
	    class: {
	      active: _vm.activeTab == 'options'
	    },
	    on: {
	      "click": function($event) {
	        _vm.changeActiveTab('options')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.lang('tab options')))]), _vm._v(" "), _c('span', {
	    class: {
	      active: _vm.activeTab == 'backup'
	    },
	    on: {
	      "click": function($event) {
	        _vm.changeActiveTab('backup')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.lang('tab backup')))]), _vm._v(" "), _c('span', {
	    class: {
	      active: _vm.activeTab == 'misc'
	    },
	    on: {
	      "click": function($event) {
	        _vm.changeActiveTab('misc')
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.lang('tab misc')))])]), _vm._v(" "), (_vm.loading) ? _c('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_c('i')]) : _vm._e(), _vm._v(" "), (_vm.activeTab == 'user') ? _c('user') : _vm._e(), _vm._v(" "), (_vm.activeTab == 'options') ? _c('options') : _vm._e(), _vm._v(" "), (_vm.activeTab == 'backup') ? _c('backup') : _vm._e(), _vm._v(" "), (_vm.activeTab == 'misc') ? _c('misc') : _vm._e()], 1)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-13e6896d", module.exports)
	  }
	}

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(175)

	/* template */
	var __vue_template__ = __webpack_require__(176)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\TMDBContent.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-54c33944", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-54c33944", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] TMDBContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Item = __webpack_require__(131);

	var _Item2 = _interopRequireDefault(_Item);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	var _vuex = __webpack_require__(41);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  created: function created() {
	    this.init();
	  },
	  data: function data() {
	    return {
	      items: [],
	      path: ''
	    };
	  },


	  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
	    loading: function loading(state) {
	      return state.loading;
	    }
	  })),

	  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING']), {
	    init: function init() {
	      this.SET_LOADING(true);
	      this.path = this.$route.name;

	      switch (this.path) {
	        case 'trending':
	          return this.initTrending();
	        case 'suggestions':
	          return this.initSuggestions();
	        case 'upcoming':
	          return this.initUpcoming();
	      }
	    },
	    initSuggestions: function initSuggestions() {
	      var _this = this;

	      var tmdbID = this.$route.query.for;
	      var type = this.$route.query.type;

	      (0, _axios2.default)(config.api + '/suggestions/' + tmdbID + '/' + type).then(function (value) {
	        _this.items = value.data;
	        _this.SET_LOADING(false);
	      });
	    },
	    initTrending: function initTrending() {
	      var _this2 = this;

	      (0, _axios2.default)(config.api + '/trending').then(function (value) {
	        _this2.items = value.data;
	        _this2.SET_LOADING(false);
	      });
	    },
	    initUpcoming: function initUpcoming() {
	      var _this3 = this;

	      (0, _axios2.default)(config.api + '/upcoming').then(function (value) {
	        _this3.items = value.data;
	        _this3.SET_LOADING(false);
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

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('main', {
	    class: {
	      'display-suggestions': _vm.path == 'suggestions'
	    }
	  }, [(!_vm.loading) ? _c('div', {
	    staticClass: "wrap-content"
	  }, [_c('div', {
	    staticClass: "items-wrap"
	  }, _vm._l((_vm.items), function(item, index) {
	    return _c('Item', {
	      key: index,
	      attrs: {
	        "item": item,
	        "genre": true,
	        "date": true
	      }
	    })
	  }))]) : _vm._e(), _vm._v(" "), (_vm.loading) ? _c('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_c('i')]) : _vm._e()])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-54c33944", module.exports)
	  }
	}

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(178)

	/* template */
	var __vue_template__ = __webpack_require__(179)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Content\\Subpage.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-68be506a", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-68be506a", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Subpage.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Rating = __webpack_require__(133);

	var _Rating2 = _interopRequireDefault(_Rating);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	var _axios = __webpack_require__(47);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

	  props: ['mediaType'],

	  created: function created() {
	    document.body.classList.add('subpage-open');
	    window.scrollTo(0, 0);
	    this.fetchData();
	  },
	  destroyed: function destroyed() {
	    document.body.classList.remove('subpage-open');
	    this.SET_ITEM_LOADED_SUBPAGE(false);
	  },
	  data: function data() {
	    return {
	      item: {},
	      loadingImdb: false,
	      auth: config.auth
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
	      if (this.item.rating != null) {
	        return config.posterSubpage + this.item.poster;
	      }

	      return config.posterSubpageTMDB + this.item.poster;
	    },
	    released: function released() {
	      var released = new Date(this.item.released * 1000);

	      return released.getFullYear();
	    },
	    noImage: function noImage() {
	      return config.url + '/assets/img/no-image-subpage.png';
	    }
	  }),

	  methods: (0, _extends3.default)({}, (0, _vuex.mapMutations)(['SET_LOADING', 'SET_ITEM_LOADED_SUBPAGE', 'OPEN_MODAL']), {
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
	          _this.$set(_this.item, 'imdb_rating', response.data);
	          _this.loadingImdb = false;
	        }, function (error) {
	          console.log(error);
	          _this.loadingImdb = false;
	        });
	      }
	    },
	    fetchData: function fetchData() {
	      var _this2 = this;

	      var tmdbId = this.$route.params.tmdbId;

	      this.SET_LOADING(true);
	      (0, _axios2.default)(config.api + '/item/' + tmdbId + '/' + this.mediaType).then(function (response) {
	        _this2.item = response.data;
	        _this2.disableLoading();
	        _this2.fetchImdbRating();
	      }, function (error) {
	        _this2.SET_LOADING(false);
	        console.log(error);
	      });
	    },
	    disableLoading: function disableLoading() {
	      var _this3 = this;

	      setTimeout(function () {
	        _this3.SET_LOADING(false);
	        _this3.displayItem();
	      }, 300);
	    },
	    displayItem: function displayItem() {
	      var _this4 = this;

	      setTimeout(function () {
	        _this4.SET_ITEM_LOADED_SUBPAGE(true);
	      }, 100);
	    },
	    setItem: function setItem(item) {
	      this.item = item;
	    },
	    removeItem: function removeItem() {
	      var _this5 = this;

	      if (this.auth) {
	        var confirm = window.confirm(this.lang('confirm delete'));

	        if (confirm) {
	          _axios2.default.delete(config.api + '/remove/' + this.item.id).then(function (response) {
	            _this5.item.rating = null;
	          }, function (error) {
	            alert('Error in removeItem()');
	          });
	        }
	      }
	    }
	  }),

	  components: {
	    Rating: _Rating2.default
	  },

	  watch: {
	    $route: function $route() {}
	  }
	};

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('main', [_c('section', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.loading),
	      expression: " ! loading"
	    }],
	    staticClass: "big-teaser-wrap",
	    class: {
	      active: _vm.itemLoadedSubpage
	    }
	  }, [_c('div', {
	    staticClass: "big-teaser-image",
	    style: (_vm.backdropImage)
	  }), _vm._v(" "), _c('div', {
	    staticClass: "wrap"
	  }, [_c('div', {
	    staticClass: "big-teaser-content"
	  }, [_c('div', {
	    staticClass: "big-teaser-data-wrap"
	  }, [_c('div', {
	    staticClass: "big-teaser-item-data"
	  }, [_c('span', {
	    staticClass: "item-year"
	  }, [_vm._v(_vm._s(_vm.released))]), _vm._v(" "), _c('span', {
	    staticClass: "item-title"
	  }, [_vm._v(_vm._s(_vm.item.title))]), _vm._v(" "), _c('span', {
	    staticClass: "item-genre"
	  }, [_vm._v(_vm._s(_vm.item.genre))])]), _vm._v(" "), _c('div', {
	    staticClass: "big-teaser-buttons no-select"
	  }, [(_vm.item.youtube_key) ? _c('span', {
	    staticClass: "button-trailer",
	    on: {
	      "click": function($event) {
	        _vm.openTrailer()
	      }
	    }
	  }, [_c('i', {
	    staticClass: "icon-trailer"
	  }), _vm._v(" Watch Trailer")]) : _vm._e(), _vm._v(" "), (_vm.item.rating == null && _vm.auth) ? _c('span', {
	    staticClass: "button-watchlist"
	  }, [_c('i', {
	    staticClass: "icon-watchlist"
	  }), _vm._v(" Add to Watchlist")]) : _vm._e(), _vm._v(" "), _c('a', {
	    staticClass: "button-tmdb-rating",
	    attrs: {
	      "href": ("https://www.themoviedb.org/" + (_vm.item.media_type) + "/" + (_vm.item.tmdb_id)),
	      "target": "_blank"
	    }
	  }, [(_vm.item.tmdb_rating != 0) ? _c('i', [_c('b', [_vm._v(_vm._s(_vm.item.tmdb_rating))]), _vm._v(" TMDb")]) : _c('i', [_vm._v("No TMDb Rating")])]), _vm._v(" "), (_vm.item.imdb_id) ? _c('a', {
	    staticClass: "button-imdb-rating",
	    attrs: {
	      "href": ("http://www.imdb.com/title/" + (_vm.item.imdb_id)),
	      "target": "_blank"
	    }
	  }, [(_vm.loadingImdb) ? _c('i', [_vm._v("Loading IMDb Rating...")]) : _vm._e(), _vm._v(" "), (_vm.item.imdb_rating && !_vm.loadingImdb) ? _c('i', [_c('b', [_vm._v(_vm._s(_vm.item.imdb_rating))]), _vm._v(" IMDb")]) : _vm._e(), _vm._v(" "), (!_vm.item.imdb_rating && !_vm.loadingImdb) ? _c('i', [_vm._v("No IMDb Rating")]) : _vm._e()]) : _vm._e()])])])])]), _vm._v(" "), _c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!_vm.loading),
	      expression: " ! loading"
	    }],
	    staticClass: "subpage-content",
	    class: {
	      active: _vm.itemLoadedSubpage
	    }
	  }, [_c('div', {
	    staticClass: "wrap"
	  }, [_c('div', {
	    staticClass: "subpage-sidebar"
	  }, [_c('div', {
	    staticClass: "subpage-poster-wrap"
	  }, [_c('rating', {
	    attrs: {
	      "item": _vm.item,
	      "set-item": _vm.setItem
	    }
	  }), _vm._v(" "), _c('img', {
	    staticClass: "base",
	    attrs: {
	      "src": _vm.noImage,
	      "width": "272",
	      "height": "408"
	    }
	  }), _vm._v(" "), _c('img', {
	    staticClass: "real",
	    attrs: {
	      "src": _vm.posterImage,
	      "width": "272",
	      "height": "408"
	    }
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "subpage-sidebar-buttons"
	  }, [(_vm.item.rating != null && _vm.auth) ? _c('span', {
	    staticClass: "remove-item",
	    on: {
	      "click": function($event) {
	        _vm.removeItem()
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.lang('delete movie')))]) : _vm._e()])]), _vm._v(" "), _c('div', {
	    staticClass: "subpage-overview"
	  }, [_c('h2', [_vm._v("Overview")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.overview))])])])]), _vm._v(" "), _c('span', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.loading),
	      expression: "loading"
	    }],
	    staticClass: "loader fullsize-loader"
	  }, [_c('i')])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-68be506a", module.exports)
	  }
	}

/***/ },
/* 180 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(204)

	/* template */
	var __vue_template__ = __webpack_require__(205)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "C:\\xampp\\htdocs\\flox\\client\\app\\components\\Modal\\Trailer.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2fd24023", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2fd24023", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Trailer.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(41);

	var _helper = __webpack_require__(44);

	var _helper2 = _interopRequireDefault(_helper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  mixins: [_helper2.default],

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

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "modal-wrap modal-wrap-big"
	  }, [_c('div', {
	    staticClass: "modal-header"
	  }, [_c('span', [_vm._v("Trailer for " + _vm._s(_vm.modalData.title))]), _vm._v(" "), _c('span', {
	    staticClass: "close-modal",
	    on: {
	      "click": function($event) {
	        _vm.CLOSE_MODAL()
	      }
	    }
	  }, [_c('i', {
	    staticClass: "icon-close"
	  })])]), _vm._v(" "), _c('div', {
	    staticClass: "modal-content"
	  }, [_c('iframe', {
	    attrs: {
	      "width": "100%",
	      "height": "100%",
	      "src": _vm.trailerSrc,
	      "frameborder": "0",
	      "allowfullscreen": ""
	    }
	  })], 1)])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2fd24023", module.exports)
	  }
	}

/***/ }
]);