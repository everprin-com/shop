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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/*!**********************************!*\
  !*** ./app/assets/packs/Root.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (47:4)\n\n\u001b[0m \u001b[90m 45 | \u001b[39mdocument\u001b[33m.\u001b[39maddEventListener(\u001b[32m'DOMContentLoaded'\u001b[39m\u001b[33m,\u001b[39m () \u001b[33m=>\u001b[39m {\n \u001b[90m 46 | \u001b[39m  \u001b[33mReactDOM\u001b[39m\u001b[33m.\u001b[39mrender(\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 47 | \u001b[39m    \u001b[33m<\u001b[39m\u001b[33mProvider\u001b[39m store\u001b[33m=\u001b[39m{store}\u001b[33m>\u001b[39m\n \u001b[90m    | \u001b[39m    \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 48 | \u001b[39m      \u001b[33m<\u001b[39m\u001b[33mRouter\u001b[39m\u001b[33m>\u001b[39m\n \u001b[90m 49 | \u001b[39m        \u001b[33m<\u001b[39m\u001b[33mRoute\u001b[39m exact path\u001b[33m=\u001b[39m\u001b[32m\"/\"\u001b[39m component\u001b[33m=\u001b[39m{\u001b[33mApp\u001b[39m} \u001b[33m/\u001b[39m\u001b[33m>\u001b[39m\n \u001b[90m 50 | \u001b[39m        \u001b[33m<\u001b[39m\u001b[33mRoute\u001b[39m path\u001b[33m=\u001b[39m\u001b[32m\"/productcart/:id\"\u001b[39m component\u001b[33m=\u001b[39m{\u001b[33mProductCart\u001b[39m} \u001b[33m/\u001b[39m\u001b[33m>\u001b[39m\u001b[0m\n");

/***/ })
/******/ ]);
//# sourceMappingURL=Root-c8ddd4ec89ec6eafd75f.js.map