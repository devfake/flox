webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(40);

	var _Header = __webpack_require__(41);

	var _Header2 = _interopRequireDefault(_Header);

	var _Search = __webpack_require__(77);

	var _Search2 = _interopRequireDefault(_Search);

	var _Footer = __webpack_require__(81);

	var _Footer2 = _interopRequireDefault(_Footer);

	var _Login = __webpack_require__(84);

	var _Login2 = _interopRequireDefault(_Login);

	var _routes = __webpack_require__(88);

	var _routes2 = _interopRequireDefault(_routes);

	var _index = __webpack_require__(43);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(124);

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
	    SiteHeader: _Header2.default, Search: _Search2.default, SiteFooter: _Footer2.default, Login: _Login2.default
	  },

	  methods: (0, _extends3.default)({}, (0, _vuex.mapActions)(['setColorScheme']), {
	    checkForUserColorScheme: function checkForUserColorScheme() {
	      if (!localStorage.getItem('color')) {
	        localStorage.setItem('color', 'light');
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(42)

	/* template */
	var __vue_template__ = __webpack_require__(75)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Header.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _index = __webpack_require__(43);

	var _index2 = _interopRequireDefault(_index);

	var _vuex = __webpack_require__(40);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  created: function created() {
	    this.checkForUserFilter();
	  },


	  computed: (0, _extends3.default)({}, (0, _vuex.mapState)({
	    userFilter: function userFilter(state) {
	      return state.userFilter;
	    },
	    colorScheme: function colorScheme(state) {
	      return state.colorScheme;
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
	        localStorage.setItem('filter', 'created_at');
	      }

	      this.SET_USER_FILTER(localStorage.getItem('filter'));
	    },
	    setUserFilter: function setUserFilter(type) {
	      localStorage.setItem('filter', type);
	      this.SET_USER_FILTER(type);
	      this.loadItems(type);
	    }
	  })
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(40);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _actions = __webpack_require__(44);

	var actions = _interopRequireWildcard(_actions);

	var _mutations = __webpack_require__(46);

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
	    colorScheme: ''
	  },
	  mutations: _mutations2.default,
	  actions: actions
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadItems = loadItems;
	exports.loadMoreItems = loadMoreItems;
	exports.setSearchTitle = setSearchTitle;
	exports.setColorScheme = setColorScheme;

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueResource = __webpack_require__(45);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueResource2.default);

	function loadItems(_ref, filter) {
	  var commit = _ref.commit;

	  commit('SET_LOADING', true);
	  _vue2.default.http.get(config.api + '/items/' + filter).then(function (value) {
	    var _value$data = value.data;
	    var data = _value$data.data;
	    var next_page_url = _value$data.next_page_url;


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
	  _vue2.default.http.get(next_page_url).then(function (value) {
	    var _value$data2 = value.data;
	    var data = _value$data2.data;
	    var next_page_url = _value$data2.next_page_url;


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

	  localStorage.setItem('color', color);
	  commit('SET_COLOR_SCHEME', color);
	}

/***/ },
/* 45 */,
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(47);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _toConsumableArray2 = __webpack_require__(51);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _type$SET_SEARCH_TITL;

	var _types = __webpack_require__(74);

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
	}), _type$SET_SEARCH_TITL);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(48);

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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(50);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(52);

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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	__webpack_require__(67);
	module.exports = __webpack_require__(7).Array.from;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(55)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(56)(String, 'String', function(iterated){
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
/* 55 */
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(57)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(58)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(23)
	  , Iterators      = __webpack_require__(59)
	  , $iterCreate    = __webpack_require__(60)
	  , setToStringTag = __webpack_require__(64)
	  , getPrototypeOf = __webpack_require__(66)
	  , ITERATOR       = __webpack_require__(65)('iterator')
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
/* 57 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(61)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(64)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(65)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(62)
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
	  __webpack_require__(63).appendChild(iframe);
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
/* 62 */
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(23)
	  , TAG = __webpack_require__(65)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 65 */
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
/* 66 */
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(8)
	  , $export        = __webpack_require__(5)
	  , toObject       = __webpack_require__(38)
	  , call           = __webpack_require__(68)
	  , isArrayIter    = __webpack_require__(69)
	  , toLength       = __webpack_require__(29)
	  , createProperty = __webpack_require__(70)
	  , getIterFn      = __webpack_require__(71);

	$export($export.S + $export.F * !__webpack_require__(73)(function(iter){ Array.from(iter); }), 'Array', {
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
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(59)
	  , ITERATOR   = __webpack_require__(65)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(19);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(72)
	  , ITERATOR  = __webpack_require__(65)('iterator')
	  , Iterators = __webpack_require__(59);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(26)
	  , TAG = __webpack_require__(65)('toStringTag')
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(65)('iterator')
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
/* 74 */
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

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('header', [_h('div', {
	    staticClass: "wrap"
	  }, [_h('router-link', {
	    staticClass: "logo",
	    attrs: {
	      "to": "/"
	    }
	  }, [_m(0)]), " ", _h('span', {
	    staticClass: "sort-wrap"
	  }, [_h('i', {
	    staticClass: "icon-sort-time",
	    class: {
	      active: userFilter == 'created_at'
	    },
	    on: {
	      "click": function($event) {
	        setUserFilter('created_at')
	      }
	    }
	  }), " ", _h('i', {
	    staticClass: "icon-sort-star",
	    class: {
	      active: userFilter == 'rating'
	    },
	    on: {
	      "click": function($event) {
	        setUserFilter('rating')
	      }
	    }
	  }), " ", _h('span', {
	    staticClass: "icon-constrast",
	    on: {
	      "click": function($event) {
	        toggleColorScheme()
	      }
	    }
	  }, [_m(1)])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('img', {
	    attrs: {
	      "src": __webpack_require__(76),
	      "alt": "Flox",
	      "width": "108",
	      "height": "32"
	    }
	  })
	}},function (){with(this) {
	  return _h('i')
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2", module.exports)
	  }
	}

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAgCAMAAADAIm3oAAAAilBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2N2iNAAAALXRSTlMA3VUzEYcLwLuZj0R37swdFCks88gh69G2q19TA8M5+Ahm2KiinWg75n597FBo4OziAAACOklEQVRIx71Xf3eqMAxtocUCFlDHlCnqfvq29/L9v947FtLMyCadx90/PBporklvL0H8EMlsrZvVcrlq9HqWiFuielstwGOxeqvErVB9SGCQHyPpcnkG3YXFINZPMICnNd1RyJStia3M3ZcIzqBdeJAsyeALZIlPDRCdriqgp4/ARgzxl2SlAY+7V61f7+i3KfGuKdj686oUpEIylvWbcOlz32fzxFU6z+49u2czYAQhB8hFMJlqMe9kTtH5BKOt6kO1hSmtkqBFMNnmGbO+JCf7+ILx500fegSIqcxChJNNfV0JUw3WRvU0UHheW4eTbRe4X9hDtS37TuK+LbbUuxSl+SiCyTYTL3IMzUDqrsjMF71hqiigEeFkD5hvN/NesgOYKEe7w6sPeFGDVcdPqcLJ1NL/+T3G/vk6977spaKTbLC+QDIqDFLPXxx//im7c0ulkZFMcecCycgqtCOqVVSAg9OEJmM5Ua/kWUEyjCA77FCbnKz9bImQczIOOaKNNYp9qI0kSDCczMYMFwWCYv9WIEpCg7Z1pfQrl35Q+mRTaFtXH+pESxg81CSPGG3rCrv625/q8nAoeythdoU2hbZ1jRGb/emFvWFG3B1pVEmEsRs9YkQKVuG3ENcnVJcenhWthpzVeLOxoLZup8i2gsn4wNMeB56WDTwdDC4mXQaQBY1ylJ241QUybixqxJDK+0ZdvUDGoVEm7+fj93snDbQpc54swvF73FSuR75YaClrni2V2MjfemX6D0AKmiHCtfAOAAAAAElFTkSuQmCC"

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(78)

	/* template */
	var __vue_template__ = __webpack_require__(80)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Search.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _helper = __webpack_require__(79);

	var _helper2 = _interopRequireDefault(_helper);

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


	  computed: {
	    algolia: function algolia() {
	      return config.scoutDriver == 'algolia' && this.$route.query.q;
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
	      return config.auth ? 'Search or add movie' : 'Search movie';
	    }
	  },

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
/* 79 */
/***/ function(module, exports) {

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
	    }
	  }
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('section', {
	    staticClass: "search-wrap",
	    class: {
	      sticky: sticky
	    }
	  }, [_h('div', {
	    staticClass: "wrap"
	  }, [_h('form', {
	    staticClass: "search-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        search()
	      }
	    }
	  }, [_h('router-link', {
	    attrs: {
	      "to": "/"
	    }
	  }, [_h('i', {
	    staticClass: "icon-logo-small",
	    on: {
	      "click": function($event) {
	        scrollToTop()
	      }
	    }
	  })]), " ", _m(0), " ", _h('input', {
	    directives: [{
	      name: "model",
	      value: (title),
	      expression: "title"
	    }],
	    staticClass: "search-input",
	    attrs: {
	      "type": "text",
	      "placeholder": placeholder,
	      "autofocus": ""
	    },
	    domProps: {
	      "value": _s(title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        title = $event.target.value
	      }
	    }
	  }), " ", (algolia) ? _h('i', {
	    staticClass: "icon-algolia"
	  }) : _e()])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('i', {
	    staticClass: "icon-search"
	  })
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4", module.exports)
	  }
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(82)

	/* template */
	var __vue_template__ = __webpack_require__(83)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-3", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-3", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Footer.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _vuex = __webpack_require__(40);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('footer', {
	    directives: [{
	      name: "show",
	      value: (!loading),
	      expression: " ! loading"
	    }]
	  }, [_h('div', {
	    staticClass: "wrap"
	  }, [_m(0), " ", _m(1), " ", _h('div', {
	    staticClass: "sub-links"
	  }, [(auth) ? _h('a', {
	    staticClass: "login-btn",
	    attrs: {
	      "href": settings
	    }
	  }, ["Settings"]) : _e(), " ", (auth) ? _h('a', {
	    staticClass: "login-btn",
	    attrs: {
	      "href": logout
	    }
	  }, ["Logout"]) : _e(), " ", (!auth) ? _h('a', {
	    staticClass: "login-btn",
	    attrs: {
	      "href": login
	    }
	  }, ["Login"]) : _e()])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', {
	    staticClass: "attribution"
	  }, [_h('a', {
	    attrs: {
	      "href": "https://www.themoviedb.org/",
	      "target": "_blank"
	    }
	  }, [_h('i', {
	    staticClass: "icon-tmdb"
	  })]), "\n      This product uses the TMDb API but is not endorsed or certified by TMDb\n    "])
	}},function (){with(this) {
	  return _h('a', {
	    staticClass: "icon-github",
	    attrs: {
	      "href": "https://github.com/devfake/flox",
	      "target": "_blank"
	    }
	  })
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3", module.exports)
	  }
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(85)

	/* template */
	var __vue_template__ = __webpack_require__(86)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-1", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-1", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Login.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  created: function created() {
	    document.body.className += ' dark';
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

	      this.$http.post(config.api + '/login', { username: username, password: password }).then(function (value) {
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', [_m(0), " ", _h('div', {
	    staticClass: "login-wrap"
	  }, [_m(1), " ", _h('form', {
	    staticClass: "login-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        login()
	      }
	    }
	  }, [_h('input', {
	    directives: [{
	      name: "model",
	      value: (username),
	      expression: "username"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "Username",
	      "autofocus": ""
	    },
	    domProps: {
	      "value": _s(username)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        username = $event.target.value
	      }
	    }
	  }), " ", _h('input', {
	    directives: [{
	      name: "model",
	      value: (password),
	      expression: "password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "Password"
	    },
	    domProps: {
	      "value": _s(password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        password = $event.target.value
	      }
	    }
	  }), " ", _h('span', {
	    staticClass: "login-error"
	  }, [(error) ? _h('span', ["Wrong username or password"]) : _e()]), " ", _h('input', {
	    class: errorShake ? 'shake-horizontal shake-constant' : '',
	    attrs: {
	      "type": "submit",
	      "value": "Sign In"
	    }
	  })])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', {
	    staticClass: "top-bar"
	  })
	}},function (){with(this) {
	  return _h('img', {
	    staticClass: "logo-login",
	    attrs: {
	      "src": __webpack_require__(87),
	      "alt": "Flox",
	      "width": "108",
	      "height": "32"
	    }
	  })
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1", module.exports)
	  }
	}

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAgCAMAAADAIm3oAAACE1BMVEUAAACKW/+cU+yaVO6KW/7GQsSQWPnnNKToNKOSV/e8Rs7QPruMWv2PWfqhUejGQsXEQsaqTeDoNKS7Rs+TV/bkNae/RcvtMZ6+RczGQsWVVvSlT+SrTd7sMp/wMJvtMZ7nNKS/RcvNP77QPrvTPbjNP73uMZ2RWPigUenhN6u6RtDSPbnGQsSwStqxStnARMrPPrvVPLbLQL/GQsTqM6LRPbrGQsTwMJy4R9LLQL/TPLe0SdbKQMHWO7XnNKStTN3eOK7QPruSV/fEQ8azSdfjNqjoNKPARMvmNaXmNKXEQsbdOK+6RtDuMZ29Rc3sMp/ARMnrM6DiNqntMZ3vMJy5R9HTPbiwS9m/RcvbObCKW/66R9DRPbnLQL+JW//IQcKtTNzdOK7oNKPfN6zXO7PJQcHYOrLKQMC1SdTqM6LEQ8axStjZOrG8Rs25R9HjNqjmNKWWVvLTPbi6R9CwS9m8Rs3PPrvlNabrMqDjNqivS9rNP73cOa/ARMrARMnGQsPBRMicU+zEQ8bfOKztMZ23SNPVPLa1SdXYOrPKQMG6R9GbU+2JW//RPbq8Rs7EQ8fBRMnPPrzWO7SwS9rGQsOyStfIQcLTPbixStjFQsXZOrHLQL/vMZyTV/boNKPrM6HtMZ6MWv2+RczbObDiNqmPWPm/RcvNP73cOa/lNafmNKWtTN2KW/6kUOaeUurdOK6pTeCVJkKBAAAAhXRSTlMAVd1V3QszETNVER3d3TMDhzMhFN27U0QpCN3d3d3dzEQsLCkU7+7d3d3b29HIwsG/vrarq56dmY+Pj4eHendfX1NEOh3u7uvdzMvBwLu4mY+Hd3dV+Pjz8/Pu7Ovm3d3R0czKyMbDwLu7tqioopmZmYeHfXdoaGZmVTk5OSH4+PPu3Ydmpzv5zwAAAydJREFUSMe9l+dX01AYxl+R0lpUakspRQsFBCx7FMosIntPF25w4QInoOJmCwVBFI1J1DqSovInmqQ3F9rGtoFTfx96evIhv3Pf3PvkCWwRRWyMpuBaZmZ+QXlVsgJCie5+24mFBYdjdXllevpjSv6DgxAqdHfT579835D9WFzMqAhSd+RsePhujj0caWnR0dFxcbf5y2FhIElM+sy8t2xuLqMKMP2WQfBElRpvAJ4dr9fWPvN84/gkwMt2zkrKFMXjM1KydxOlCnxrp3MUPEggbIBkvTsEdmEi/imruTqOZU1FGk3RJSybyIsERJezVgubsBHxSlEWDr5Iy2qyJpGsviNRIaw0qSQFyd5cxDa9Uw8bGAjCALJl6uxJJMtJBExSLpJNXVaiS9paxg4iShPRCbJlUdffItlNhcdzLESyqRtR6NIww6gA0UongHzZvfdI1oJc2JaLZB8qAGFlGtG/ETpVK1/28DiSnRJnqK6ORJM8jWQnH4uza2CH3FuTpl+BbFlU9hKSFQMidvlcuXuRpUj2tVkcpJllzcKup60gX1a5hGRHY3GWPF2ZvqIGjuRjSPbzMCA62Tol90uZlPJl6vOirMWIw4Q/1CXAYcwTZRfwvRvJATBTlAHkyypdouwW9jfxsjPCcysUZX/w0lQkaTdR7bAFWRaWlQmiMXVMkzuuHgHHHSzrBxE7SVIm8JKteQdxELLqJ88cDklZM2D6SI8hSgZxXBBjHKvng9jvGMHMrWzAW9Yb4UUwG6SDl/ndIMoG0lpHdQNsf+vrcniZn60PerIPRihKBbD9Q63QvFj1c6jBzpKcx0qhYNxyXKFTHVktxlWyT1yBimWHhcin2wG2E8RtRvDA6BvE0MjqgcdA0z0AIX3FwCBTh3ZKu7zUx+gCvTxxxxplGDMuIHQrAISiFuA39RCIqGiiW6bMt/DkSBQe3EEaYINuglAFlMmvcrhdOT1OV2vgdvV8L2KfG3Xgkop7YxdsRptK2ALIZn9z/OJZX193uVxlQdZvpUUscpgegugR6zf4INTvsEMc+3kO8JQF+WHx0mLRghe2eDTI//bJ9BcGDf91+LWedQAAAABJRU5ErkJggg=="

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(89);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _config = __webpack_require__(90);

	var _config2 = _interopRequireDefault(_config);

	var _Content = __webpack_require__(91);

	var _Content2 = _interopRequireDefault(_Content);

	var _SearchContent = __webpack_require__(97);

	var _SearchContent2 = _interopRequireDefault(_SearchContent);

	var _Settings = __webpack_require__(121);

	var _Settings2 = _interopRequireDefault(_Settings);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.config = _config2.default;

	_vue2.default.use(_vueRouter2.default);

	exports.default = new _vueRouter2.default({
	  mode: 'history',
	  base: _config2.default.uri,
	  routes: [{ path: '/', component: _Content2.default }, { path: '/search', component: _SearchContent2.default }, { path: '/settings', component: _Settings2.default }, { path: '*', component: _Content2.default }]
	});

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vue-router v2.0.0
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.VueRouter = factory());
	}(this, (function () { 'use strict';

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true

	    var route = parent.$route
	    var cache = parent._routerViewCache || (parent._routerViewCache = {})
	    var depth = 0
	    var inactive = false

	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++
	      }
	      if (parent._inactive) {
	        inactive = true
	      }
	      parent = parent.$parent
	    }

	    data.routerViewDepth = depth
	    var matched = route.matched[depth]
	    if (!matched) {
	      return h()
	    }

	    var component = inactive
	      ? cache[props.name]
	      : (cache[props.name] = matched.components[props.name])

	    if (!inactive) {
	      (data.hook || (data.hook = {})).init = function (vnode) {
	        matched.instances[props.name] = vnode.child
	      }
	    }

	    return h(component, data, children)
	  }
	}

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }

	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }

	  var stack = base.split('/')

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop()
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/')
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i]
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop()
	    } else {
	      stack.push(segment)
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('')
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = ''
	  var query = ''

	  var hashIndex = path.indexOf('#')
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex)
	    path = path.slice(0, hashIndex)
	  }

	  var queryIndex = path.indexOf('?')
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1)
	    path = path.slice(0, queryIndex)
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
	  }
	}

	/*  */

	var encode = encodeURIComponent
	var decode = decodeURIComponent

	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  if (query) {
	    var parsedQuery
	    try {
	      parsedQuery = parseQuery(query)
	    } catch (e) {
	      warn(false, e.message)
	      parsedQuery = {}
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key]
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}

	function parseQuery (query) {
	  var res = Object.create(null)

	  query = query.trim().replace(/^(\?|#|&)/, '')

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=')
	    var key = decode(parts.shift())
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null

	    if (res[key] === undefined) {
	      res[key] = val
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val)
	    } else {
	      res[key] = [res[key], val]
	    }
	  })

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).sort().map(function (key) {
	    var val = obj[key]

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = []
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key))
	        } else {
	          result.push(encode(key) + '=' + encode(val2))
	        }
	      })
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null
	  return res ? ("?" + res) : ''
	}

	/*  */

	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  }
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom)
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	})

	function formatMatch (record) {
	  var res = []
	  while (record) {
	    res.unshift(record)
	    record = record.parent
	  }
	  return res
	}

	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  return (path || '/') + stringifyQuery(query) + hash
	}

	var trailingSlashRE = /\/$/
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a)
	  var bKeys = Object.keys(b)
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.indexOf(target.path) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw
	  if (next.name || next._normalized) {
	    return next
	  }

	  var parsedPath = parsePath(next.path || '')
	  var basePath = (current && current.path) || '/'
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append)
	    : (current && current.path) || '/'
	  var query = resolveQuery(parsedPath.query, next.query)
	  var hash = next.hash || parsedPath.hash
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object]

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router
	    var current = this.$route
	    var to = normalizeLocation(this.to, current, this.append)
	    var resolved = router.match(to)
	    var fullPath = resolved.redirectedFrom || resolved.fullPath
	    var base = router.history.base
	    var href = base ? cleanPath(base + fullPath) : fullPath
	    var classes = {}
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
	    var compareTarget = to.path ? createRoute(null, to) : resolved
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget)

	    var on = {
	      click: function (e) {
	        e.preventDefault()
	        if (this$1.replace) {
	          router.replace(to)
	        } else {
	          router.push(to)
	        }
	      }
	    }

	    var data = {
	      class: classes
	    }

	    if (this.tag === 'a') {
	      data.on = on
	      data.attrs = { href: href }
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default)
	      if (a) {
	        var aData = a.data || (a.data = {})
	        aData.on = on
	        var aAttrs = aData.attrs || (aData.attrs = {})
	        aAttrs.href = href
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	}

	function findAnchor (children) {
	  if (children) {
	    var child
	    for (var i = 0; i < children.length; i++) {
	      child = children[i]
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  })

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get$1 () { return this.$root._route }
	  })

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router
	        this._router.init(this)
	        Vue.util.defineReactive(this, '_route', this._router.history.current)
	      }
	    }
	  })

	  Vue.component('router-view', View)
	  Vue.component('router-link', Link)
	}

	var __moduleExports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = __moduleExports

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp
	var parse_1 = parse
	var compile_1 = compile
	var tokensToFunction_1 = tokensToFunction
	var tokensToRegExp_1 = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: escapeGroup(pattern)
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }

	  return attachKeys(re, keys)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }

	  return new RegExp('^' + route, flags(options))
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []

	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys)
	    keys = []
	  } else if (!options) {
	    options = {}
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	function createRouteMap (routes) {
	  var pathMap = Object.create(null)
	  var nameMap = Object.create(null)

	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route)
	  })

	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  assert(path != null, "\"path\" is required in a route configuration.")

	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {}
	  }

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (false) {}
	    route.children.forEach(function (child) {
	      addRouteRecord(pathMap, nameMap, child, record)
	    })
	  }

	  if (route.alias) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
	      })
	    } else {
	      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
	    }
	  }

	  pathMap[record.path] = record
	  if (name) { nameMap[name] = record }
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '')
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	/*  */

	var regexpCache = Object.create(null)

	var regexpCompileCache = Object.create(null)

	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute)
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name]
	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {}
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect }
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }

	    var re = redirect
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query
	    hash = re.hasOwnProperty('hash') ? re.hash : hash
	    params = re.hasOwnProperty('params') ? re.params : params

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name]
	      assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record)
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    })
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched
	      var aliasedRecord = matched[matched.length - 1]
	      location.params = aliasedMatch.params
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }

	  return match
	}

	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var keys, regexp
	  var hit = regexpCache[path]
	  if (hit) {
	    keys = hit.keys
	    regexp = hit.regexp
	  } else {
	    keys = []
	    regexp = index(path, keys)
	    regexpCache[path] = { keys: keys, regexp: regexp }
	  }
	  var m = pathname.match(regexp)

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1]
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
	    if (key) { params[key.name] = val }
	  }

	  return true
	}

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path))
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    assert(false, ("missing param for " + routeMsg + ": " + (e.message)))
	    return ''
	  }
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */

	var inBrowser = typeof window !== 'undefined'

	var supportsHistory = inBrowser && (function () {
	  var ua = window.navigator.userAgent

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})()

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb()
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1)
	        })
	      } else {
	        step(index + 1)
	      }
	    }
	  }
	  step(0)
	}

	/*  */


	var History = function History (router, base) {
	  this.router = router
	  this.base = normalizeBase(base)
	  // start with a route object that stands for "nowhere"
	  this.current = START
	  this.pending = null
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb
	};

	History.prototype.transitionTo = function transitionTo (location, cb) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current)
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route)
	    cb && cb(route)
	    this$1.ensureURL()
	  })
	};

	History.prototype.confirmTransition = function confirmTransition (route, cb) {
	    var this$1 = this;

	  var current = this.current
	  if (isSameRoute(route, current)) {
	    this.ensureURL()
	    return
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  )

	  this.pending = route
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) { return }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL()
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        this$1.push(to)
	      } else {
	        // confirm transition and pass on the value
	        next(to)
	      }
	    })
	  }

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = []
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(extractEnterGuards(activated, postEnterCbs), iterator, function () {
	      if (this$1.pending === route) {
	        this$1.pending = null
	        cb(route)
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); })
	        })
	      }
	    })
	  })
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current
	  this.current = route
	  this.cb && this.cb(route)
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev)
	  })
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base')
	      base = baseEl ? baseEl.getAttribute('href') : '/'
	    } else {
	      base = '/'
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i
	  var max = Math.max(current.length, next.length)
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractLeaveGuards (matched) {
	  return flatMapComponents(matched, function (def, instance) {
	    var guard = def && def.beforeRouteLeave
	    if (guard) {
	      return function routeLeaveGuard () {
	        return guard.apply(instance, arguments)
	      }
	    }
	  }).reverse()
	}

	function extractEnterGuards (matched, cbs) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    var guard = def && def.beforeRouteEnter
	    if (guard) {
	      return function routeEnterGuard (to, from, next) {
	        return guard(to, from, function (cb) {
	          next(cb)
	          if (typeof cb === 'function') {
	            cbs.push(function () {
	              cb(match.instances[key])
	            })
	          }
	        })
	      }
	    }
	  })
	}

	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = function (resolvedDef) {
	          match.components[key] = resolvedDef
	          next()
	        }

	        var reject = function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason))
	          next(false)
	        }

	        var res = def(resolve, reject)
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject)
	        }
	      }
	    }
	  })
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return Array.prototype.concat.apply([], matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	/*  */

	function saveScrollPosition (key) {
	  if (!key) { return }
	  window.sessionStorage.setItem(key, JSON.stringify({
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  }))
	}

	function getScrollPosition (key) {
	  if (!key) { return }
	  return JSON.parse(window.sessionStorage.getItem(key))
	}

	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect()
	  var elRect = el.getBoundingClientRect()
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */


	var genKey = function () { return String(Date.now()); }
	var _key = genKey()

	var HTML5History = (function (History) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History.call(this, router, base)

	    this.transitionTo(getLocation(this.base))

	    var expectScroll = router.options.scrollBehavior
	    window.addEventListener('popstate', function (e) {
	      _key = e.state && e.state.key
	      var current = this$1.current
	      this$1.transitionTo(getLocation(this$1.base), function (next) {
	        if (expectScroll) {
	          this$1.handleScroll(next, current, true)
	        }
	      })
	    })

	    if (expectScroll) {
	      window.addEventListener('scroll', function () {
	        saveScrollPosition(_key)
	      })
	    }
	  }

	  if ( History ) HTML5History.__proto__ = History;
	  HTML5History.prototype = Object.create( History && History.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HTML5History.prototype.push = function push (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.replace = function replace (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.ensureURL = function ensureURL () {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      replaceState(cleanPath(this.base + this.current.fullPath))
	    }
	  };

	  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
	    var router = this.router
	    if (!router.app) {
	      return
	    }

	    var behavior = router.options.scrollBehavior
	    if (!behavior) {
	      return
	    }
	    assert(typeof behavior === 'function', "scrollBehavior must be a function")

	    // wait until re-render finishes before scrolling
	    router.app.$nextTick(function () {
	      var position = getScrollPosition(_key)
	      var shouldScroll = behavior(to, from, isPop ? position : null)
	      if (!shouldScroll) {
	        return
	      }
	      var isObject = typeof shouldScroll === 'object'
	      if (isObject && typeof shouldScroll.selector === 'string') {
	        var el = document.querySelector(shouldScroll.selector)
	        if (el) {
	          position = getElementPosition(el)
	        } else if (isValidPosition(shouldScroll)) {
	          position = normalizePosition(shouldScroll)
	        }
	      } else if (isObject && isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll)
	      }

	      if (position) {
	        window.scrollTo(position.x, position.y)
	      }
	    })
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length)
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	function pushState (url, replace) {
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url)
	    } else {
	      _key = genKey()
	      history.pushState({ key: _key }, '', url)
	    }
	    saveScrollPosition(_key)
	  } catch (e) {
	    window.location[replace ? 'assign' : 'replace'](url)
	  }
	}

	function replaceState (url) {
	  pushState(url, true)
	}

	/*  */


	var HashHistory = (function (History) {
	  function HashHistory (router, base, fallback) {
	    var this$1 = this;

	    History.call(this, router, base)

	    // check history fallback deeplinking
	    if (fallback && this.checkFallback()) {
	      return
	    }

	    ensureSlash()
	    this.transitionTo(getHash())

	    window.addEventListener('hashchange', function () {
	      this$1.onHashChange()
	    })
	  }

	  if ( History ) HashHistory.__proto__ = History;
	  HashHistory.prototype = Object.create( History && History.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  HashHistory.prototype.checkFallback = function checkFallback () {
	    var location = getLocation(this.base)
	    if (!/^\/#/.test(location)) {
	      window.location.replace(
	        cleanPath(this.base + '/#' + location)
	      )
	      return true
	    }
	  };

	  HashHistory.prototype.onHashChange = function onHashChange () {
	    if (!ensureSlash()) {
	      return
	    }
	    this.transitionTo(getHash(), function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.push = function push (location) {
	    History.prototype.transitionTo.call(this, location, function (route) {
	      pushHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.replace = function replace (location) {
	    History.prototype.transitionTo.call(this, location, function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HashHistory.prototype.ensureURL = function ensureURL () {
	    if (getHash() !== this.current.fullPath) {
	      replaceHash(this.current.fullPath)
	    }
	  };

	  return HashHistory;
	}(History));

	function ensureSlash () {
	  var path = getHash()
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path)
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href
	  var index = href.indexOf('#')
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#')
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  )
	}

	/*  */


	var AbstractHistory = (function (History) {
	  function AbstractHistory (router) {
	    History.call(this, router)
	    this.stack = []
	    this.index = 0
	  }

	  if ( History ) AbstractHistory.__proto__ = History;
	  AbstractHistory.prototype = Object.create( History && History.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location) {
	    var this$1 = this;

	    History.prototype.transitionTo.call(this, location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
	      this$1.index++
	    })
	  };

	  AbstractHistory.prototype.replace = function replace (location) {
	    var this$1 = this;

	    History.prototype.transitionTo.call(this, location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
	    })
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var location = this.stack[targetIndex]
	    this.confirmTransition(location, function () {
	      this$1.index = targetIndex
	      this$1.updateRoute(location)
	    })
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null
	  this.options = options
	  this.beforeHooks = []
	  this.afterHooks = []
	  this.match = createMatcher(options.routes || [])

	  var mode = options.mode || 'hash'
	  this.fallback = mode === 'history' && !supportsHistory
	  if (this.fallback) {
	    mode = 'hash'
	  }
	  if (!inBrowser) {
	    mode = 'abstract'
	  }
	  this.mode = mode
	};

	var prototypeAccessors = { currentRoute: {} };

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  )

	  this.app = app

	  var ref = this;
	    var mode = ref.mode;
	    var options = ref.options;
	    var fallback = ref.fallback;
	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base)
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, fallback)
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this)
	      break
	    default:
	      assert(false, ("invalid mode: " + mode))
	  }

	  this.history.listen(function (route) {
	    this$1.app._route = route
	  })
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn)
	};

	VueRouter.prototype.push = function push (location) {
	  this.history.push(location)
	};

	VueRouter.prototype.replace = function replace (location) {
	  this.history.replace(location)
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n)
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1)
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1)
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents () {
	  if (!this.currentRoute) {
	    return []
	  }
	  return [].concat.apply([], this.currentRoute.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	VueRouter.install = install

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter)
	}

	return VueRouter;

	})));

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _vue = __webpack_require__(39);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueResource = __webpack_require__(45);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueResource2.default);

	_vue2.default.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('content');

	var _document$body$datase = document.body.dataset;
	var url = _document$body$datase.url;
	var uri = _document$body$datase.uri;
	var auth = _document$body$datase.auth;
	var scoutDriver = _document$body$datase.scoutDriver;
	exports.default = {
	  uri: uri,
	  url: url,
	  auth: auth,
	  scoutDriver: scoutDriver,
	  poster: url + '/assets/poster',
	  posterTMDB: 'http://image.tmdb.org/t/p/w185',
	  api: url + '/api'
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(92)

	/* template */
	var __vue_template__ = __webpack_require__(96)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Content.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Item = __webpack_require__(93);

	var _Item2 = _interopRequireDefault(_Item);

	var _vuex = __webpack_require__(40);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  created: function created() {
	    this.fetchData();
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
	      this.loadItems(this.userFilter);
	      this.setSearchTitle('');
	    },
	    loadMore: function loadMore() {
	      this.loadMoreItems(this.paginator);
	    }
	  }),

	  components: {
	    Item: _Item2.default
	  },

	  watch: {
	    '$route': 'fetchData'
	  }
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(94)

	/* template */
	var __vue_template__ = __webpack_require__(95)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Item.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['item'],

	  data: function data() {
	    return {
	      localItem: this.item,
	      saveTimeout: null,
	      auth: config.auth,
	      prevRating: null,
	      rated: false
	    };
	  },


	  computed: {
	    title: function title() {
	      return this.localItem.alternative_title ? this.localItem.alternative_title : this.localItem.title;
	    },
	    poster: function poster() {
	      if (this.localItem.rating) {
	        return config.poster + this.localItem.poster;
	      }

	      return config.posterTMDB + this.localItem.poster;
	    },
	    released: function released() {
	      var released = new Date(this.localItem.released * 1000);

	      return released.getFullYear();
	    }
	  },

	  methods: {
	    changeRating: function changeRating() {
	      var _this = this;

	      if (this.auth) {
	        clearTimeout(this.saveTimeout);

	        this.prevRating = this.localItem.rating;
	        this.localItem.rating = this.prevRating == 3 ? 1 : +this.prevRating + 1;

	        this.saveTimeout = setTimeout(function () {
	          _this.saveNewRating();
	        }, 500);
	      }
	    },
	    saveNewRating: function saveNewRating() {
	      var _this2 = this;

	      this.$http.patch(config.api + '/change-rating/' + this.localItem.id, { rating: this.localItem.rating }).catch(function (error) {
	        _this2.localItem.rating = _this2.prevRating;
	        alert('Error in saveNewRating()');
	      });
	    },
	    addNewItem: function addNewItem() {
	      var _this3 = this;

	      if (this.auth) {
	        this.rated = true;

	        this.$http.post(config.api + '/add', { item: this.localItem }).then(function (value) {
	          _this3.localItem = value.data;
	        }, function (error) {
	          if (error.status == 409) {
	            alert(_this3.title + ' already exists!');
	          }
	        });
	      }
	    },
	    removeItem: function removeItem() {
	      var _this4 = this;

	      if (this.auth) {
	        var confirm = window.confirm('Are you sure?');

	        if (confirm) {
	          this.$http.delete(config.api + '/remove/' + this.localItem.id).then(function (value) {
	            _this4.localItem.rating = null;
	          }, function (error) {
	            alert('Error in removeItem()');
	          });
	        }
	      }
	    }
	  }
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('transition', {
	    attrs: {
	      "mode": "out-in",
	      "name": "fade"
	    }
	  }, [_h('div', {
	    staticClass: "item-wrap"
	  }, [_h('div', {
	    staticClass: "item-image-wrap"
	  }, [(localItem.rating) ? _h('span', {
	    class: 'item-rating rating-' + localItem.rating,
	    on: {
	      "click": function($event) {
	        changeRating()
	      }
	    }
	  }, [_m(0)]) : _e(), " ", (!localItem.rating) ? _h('span', {
	    staticClass: "item-rating item-new",
	    on: {
	      "click": function($event) {
	        addNewItem()
	      }
	    }
	  }, [(rated) ? _h('span', {
	    staticClass: "loader smallsize-loader"
	  }, [_m(1)]) : _e(), " ", (!rated) ? _h('i', {
	    staticClass: "icon-add"
	  }) : _e()]) : _e(), " ", (localItem.rating && auth) ? _h('span', {
	    staticClass: "remove-item",
	    on: {
	      "click": function($event) {
	        removeItem()
	      }
	    }
	  }, [_m(2)]) : _e(), " ", (localItem.poster) ? _h('img', {
	    staticClass: "item-image",
	    attrs: {
	      "src": poster,
	      "width": "185",
	      "height": "278"
	    }
	  }) : _e(), " ", (!localItem.poster) ? _h('span', {
	    staticClass: "no-image"
	  }) : _e()]), " ", _h('div', {
	    staticClass: "item-content"
	  }, [_h('span', {
	    staticClass: "item-year"
	  }, [_s(released)]), " ", _h('a', {
	    staticClass: "item-title",
	    attrs: {
	      "href": 'https://www.youtube.com/results?search_query=' + title + ' Trailer',
	      "target": "_blank",
	      "title": title
	    }
	  }, [_s(title)])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('i', {
	    staticClass: "icon-rating"
	  })
	}},function (){with(this) {
	  return _h('i')
	}},function (){with(this) {
	  return _h('i', {
	    staticClass: "icon-remove"
	  })
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-8", module.exports)
	  }
	}

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('main', [(!loading) ? _h('div', {
	    staticClass: "wrap-content"
	  }, [_l((items), function(item, index) {
	    return _h('Item', {
	      key: index,
	      attrs: {
	        "item": item
	      }
	    })
	  }), " ", (!items.length) ? _h('span', {
	    staticClass: "nothing-found"
	  }, ["No Movies Found"]) : _e(), " ", _h('div', {
	    staticClass: "load-more-wrap"
	  }, [(!clickedMoreLoading && paginator) ? _h('span', {
	    staticClass: "load-more",
	    on: {
	      "click": function($event) {
	        loadMore()
	      }
	    }
	  }, ["LOAD MORE"]) : _e(), " ", (clickedMoreLoading) ? _h('span', {
	    staticClass: "loader"
	  }, [_m(0)]) : _e()])]) : _e(), " ", (loading) ? _h('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_m(1)]) : _e()])
	}},staticRenderFns: [function (){with(this) {
	  return _h('i')
	}},function (){with(this) {
	  return _h('i')
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7", module.exports)
	  }
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(98)

	/* template */
	var __vue_template__ = __webpack_require__(120)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] SearchContent.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(99);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(103);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _extends2 = __webpack_require__(1);

	var _extends3 = _interopRequireDefault(_extends2);

	var _Item = __webpack_require__(93);

	var _Item2 = _interopRequireDefault(_Item);

	var _helper = __webpack_require__(79);

	var _helper2 = _interopRequireDefault(_helper);

	var _vuex = __webpack_require__(40);

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

	  methods: {
	    initSearch: function initSearch() {
	      var _this = this;

	      this.$store.commit('SET_SEARCH_TITLE', this.$route.query.q);
	      this.$store.commit('SET_LOADING', true);
	      this.searchFlox();
	      this.searchTMDB().then(function () {
	        setTimeout(function () {
	          _this.$store.commit('SET_LOADING', false);
	        }, 500);
	      });
	    },
	    searchFlox: function searchFlox() {
	      var _this2 = this;

	      this.$http.get(config.api + '/search-items?q=' + this.searchTitle).then(function (value) {
	        _this2.floxItems = value.data;
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
	                return _this3.$http.get(config.api + '/search-tmdb?q=' + _this3.searchTitle).then(function (value) {
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
	  },

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
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(100);


/***/ },
/* 100 */
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

	module.exports = __webpack_require__(101);

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
/* 101 */
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

	  var hasOwn = Object.prototype.hasOwnProperty;
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
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
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

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

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
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
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

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

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

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(102)))

/***/ },
/* 102 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _promise = __webpack_require__(104);

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
	            return step("next", value);
	          }, function (err) {
	            return step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	__webpack_require__(54);
	__webpack_require__(107);
	__webpack_require__(111);
	module.exports = __webpack_require__(7).Promise;

/***/ },
/* 106 */
/***/ function(module, exports) {

	

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	var global        = __webpack_require__(6)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(59)
	  , TO_STRING_TAG = __webpack_require__(65)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(109)
	  , step             = __webpack_require__(110)
	  , Iterators        = __webpack_require__(59)
	  , toIObject        = __webpack_require__(24);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(56)(Array, 'Array', function(iterated, kind){
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
/* 109 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 110 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(57)
	  , global             = __webpack_require__(6)
	  , ctx                = __webpack_require__(8)
	  , classof            = __webpack_require__(72)
	  , $export            = __webpack_require__(5)
	  , isObject           = __webpack_require__(13)
	  , aFunction          = __webpack_require__(9)
	  , anInstance         = __webpack_require__(112)
	  , forOf              = __webpack_require__(113)
	  , speciesConstructor = __webpack_require__(114)
	  , task               = __webpack_require__(115).set
	  , microtask          = __webpack_require__(117)()
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
	      , FakePromise = (promise.constructor = {})[__webpack_require__(65)('species')] = function(exec){ exec(empty, empty); };
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
	  Internal.prototype = __webpack_require__(118)($Promise.prototype, {
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
	__webpack_require__(64)($Promise, PROMISE);
	__webpack_require__(119)(PROMISE);
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
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(73)(function(iter){
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
/* 112 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(8)
	  , call        = __webpack_require__(68)
	  , isArrayIter = __webpack_require__(69)
	  , anObject    = __webpack_require__(12)
	  , toLength    = __webpack_require__(29)
	  , getIterFn   = __webpack_require__(71)
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
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(12)
	  , aFunction = __webpack_require__(9)
	  , SPECIES   = __webpack_require__(65)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(8)
	  , invoke             = __webpack_require__(116)
	  , html               = __webpack_require__(63)
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
/* 116 */
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
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , macrotask = __webpack_require__(115).set
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
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(10);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(6)
	  , core        = __webpack_require__(7)
	  , dP          = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(15)
	  , SPECIES     = __webpack_require__(65)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('main', [(!loading) ? _h('div', {
	    staticClass: "wrap-content"
	  }, [_l((floxItems), function(item, index) {
	    return _h('Item', {
	      key: index,
	      attrs: {
	        "item": item
	      }
	    })
	  }), " ", _l((tmdbItems), function(item, index) {
	    return _h('Item', {
	      key: index,
	      attrs: {
	        "item": item
	      }
	    })
	  }), " ", (!floxItems.length && !tmdbItems.length) ? _h('span', {
	    staticClass: "nothing-found"
	  }, ["Nothing Found"]) : _e()]) : _e(), " ", (loading) ? _h('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_m(0)]) : _e()])
	}},staticRenderFns: [function (){with(this) {
	  return _h('i')
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5", module.exports)
	  }
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(122)

	/* template */
	var __vue_template__ = __webpack_require__(123)
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
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Settings.vue: functional components are not supported and should be defined in plain js files using render functions.")}

	module.exports = __vue_exports__


/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  created: function created() {
	    this.fetchUserData();
	  },
	  data: function data() {
	    return {
	      loading: true,
	      username: '',
	      password: '',
	      usernameSuccess: false,
	      passwordSuccess: false
	    };
	  },


	  methods: {
	    fetchUserData: function fetchUserData() {
	      var _this = this;

	      this.$http.get(config.api + '/userdata').then(function (value) {
	        var data = value.body;
	        _this.loading = false;
	        _this.username = data.username;
	      });
	    },
	    editUser: function editUser(type) {
	      var _this2 = this;

	      if (type == 'username' && this.username != '' || type == 'password' && this.password != '') {
	        var username = this.username;
	        var password = this.password;

	        this.$http.post(config.api + '/change-' + type, { username: username, password: password }).then(function (value) {
	          _this2.showSuccessMessage(type);
	          _this2.clearSuccessMessage(type);

	          console.log(value);
	        }, function (error) {
	          console.log(error);
	        });
	      }
	    },
	    showSuccessMessage: function showSuccessMessage(type) {
	      if (type == 'username') {
	        this.usernameSuccess = true;
	      } else {
	        this.passwordSuccess = true;
	      }
	    },
	    clearSuccessMessage: function clearSuccessMessage(type) {
	      var _this3 = this;

	      setTimeout(function () {
	        if (type == 'username') {
	          _this3.usernameSuccess = false;
	        } else {
	          _this3.passwordSuccess = false;
	        }
	      }, 2000);
	    }
	  }
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('main', [(!loading) ? _h('div', {
	    staticClass: "wrap-content"
	  }, [_m(0), " ", _h('div', {
	    staticClass: "user-settings-box"
	  }, [_h('form', {
	    staticClass: "login-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        editUser('username')
	      }
	    }
	  }, [_h('input', {
	    directives: [{
	      name: "model",
	      value: (username),
	      expression: "username"
	    }],
	    attrs: {
	      "type": "text",
	      "placeholder": "Username"
	    },
	    domProps: {
	      "value": _s(username)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        username = $event.target.value
	      }
	    }
	  }), " ", _h('span', {
	    staticClass: "userdata-changed"
	  }, [(usernameSuccess) ? _h('span', ["Username changed"]) : _e()]), " ", _m(1)])]), " ", _h('div', {
	    staticClass: "user-settings-box"
	  }, [_h('form', {
	    staticClass: "login-form",
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        editUser('password')
	      }
	    }
	  }, [_h('input', {
	    directives: [{
	      name: "model",
	      value: (password),
	      expression: "password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "Password",
	      "autocomplete": "off"
	    },
	    domProps: {
	      "value": _s(password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        password = $event.target.value
	      }
	    }
	  }), " ", _h('span', {
	    staticClass: "userdata-changed"
	  }, [(passwordSuccess) ? _h('span', ["Password changed"]) : _e()]), " ", _m(2)])])]) : _e(), " ", (loading) ? _h('span', {
	    staticClass: "loader fullsize-loader"
	  }, [_m(3)]) : _e()])
	}},staticRenderFns: [function (){with(this) {
	  return _h('span', {
	    staticClass: "nothing-found"
	  }, ["Settings"])
	}},function (){with(this) {
	  return _h('input', {
	    attrs: {
	      "type": "submit",
	      "value": "Change username"
	    }
	  })
	}},function (){with(this) {
	  return _h('input', {
	    attrs: {
	      "type": "submit",
	      "value": "Change password"
	    }
	  })
	}},function (){with(this) {
	  return _h('i')
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6", module.exports)
	  }
	}

/***/ },
/* 124 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);