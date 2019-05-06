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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/*!*******************************************!*\
  !*** ./app/assets/packs/TestComponent.js ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (32:13)\n\n\u001b[0m \u001b[90m 30 | \u001b[39m    render(){\n \u001b[90m 31 | \u001b[39m      \u001b[36mconst\u001b[39m { data } \u001b[33m=\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39mstate \n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 32 | \u001b[39m      \u001b[36mreturn\u001b[39m \u001b[33m<\u001b[39m\u001b[33mh1\u001b[39m className\u001b[33m=\u001b[39m\u001b[32m\"text\"\u001b[39m onClick\u001b[33m=\u001b[39m{\u001b[36mthis\u001b[39m\u001b[33m.\u001b[39msendFetch}\u001b[33m>\u001b[39m\n \u001b[90m    | \u001b[39m             \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 33 | \u001b[39m      {data \u001b[33m?\u001b[39m data\u001b[33m.\u001b[39mresults[\u001b[35m0\u001b[39m]\u001b[33m.\u001b[39memail \u001b[33m:\u001b[39m \u001b[32m\"LOADING...\"\u001b[39m}\n \u001b[90m 34 | \u001b[39m      \u001b[33m<\u001b[39m\u001b[33m/\u001b[39m\u001b[33mh1\u001b[39m\u001b[33m>\u001b[39m \n \u001b[90m 35 | \u001b[39m    }\u001b[0m\n");

/***/ })

/******/ });
//# sourceMappingURL=TestComponent-87bb846852c90e156766.js.map