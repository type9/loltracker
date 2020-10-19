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
/******/ 	return __webpack_require__(__webpack_require__.s = "./windows/desktop/desktop.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./consts.ts":
/*!*******************!*\
  !*** ./consts.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fortniteClassId = 21216;
exports.fortniteClassId = fortniteClassId;
const interestingFeatures = [
    'counters',
    'death',
    'items',
    'kill',
    'killed',
    'killer',
    'location',
    'match_info',
    'match',
    'me',
    'phase',
    'rank',
    'revived',
    'roster',
    'team'
];
exports.interestingFeatures = interestingFeatures;
const windowNames = {
    inGame: 'in_game',
    desktop: 'desktop'
};
exports.windowNames = windowNames;
const hotkeys = {
    toggle: 'showhide'
};
exports.hotkeys = hotkeys;


/***/ }),

/***/ "./odk-ts/ow-window.ts":
/*!*****************************!*\
  !*** ./odk-ts/ow-window.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWWindow {
    constructor(name = null) {
        this._name = name;
        this._id = null;
    }
    async restore() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.restore(id, result => {
                if (!result.success)
                    console.error(`[restore] - an error occurred, windowId=${id}, reason=${result.error}`);
                resolve();
            });
        });
    }
    async minimize() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.minimize(id, () => { });
            return resolve();
        });
    }
    async maximize() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.maximize(id, () => { });
            return resolve();
        });
    }
    async hide() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.hide(id, () => { });
            return resolve();
        });
    }
    async close() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            const result = await this.getWindowState();
            if (result.success &&
                (result.window_state !== 'closed')) {
                await this.internalClose();
            }
            return resolve();
        });
    }
    dragMove(elem) {
        elem.onmousedown = e => {
            e.preventDefault();
            overwolf.windows.dragMove(this._name);
        };
    }
    async getWindowState() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.getWindowState(id, resolve);
        });
    }
    static async getCurrentInfo() {
        return new Promise(async (resolve) => {
            overwolf.windows.getCurrentWindow(result => {
                resolve(result.window);
            });
        });
    }
    obtain() {
        return new Promise((resolve, reject) => {
            const cb = res => {
                if (res && res.status === "success" && res.window && res.window.id) {
                    this._id = res.window.id;
                    if (!this._name) {
                        this._name = res.window.name;
                    }
                    resolve(res.window);
                }
                else {
                    this._id = null;
                    reject();
                }
            };
            if (!this._name) {
                overwolf.windows.getCurrentWindow(cb);
            }
            else {
                overwolf.windows.obtainDeclaredWindow(this._name, cb);
            }
        });
    }
    async assureObtained() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.obtain();
            return resolve();
        });
    }
    async internalClose() {
        let that = this;
        return new Promise(async (resolve, reject) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.close(id, res => {
                if (res && res.success)
                    resolve();
                else
                    reject(res);
            });
        });
    }
}
exports.OWWindow = OWWindow;


/***/ }),

/***/ "./windows/AppWindow.ts":
/*!******************************!*\
  !*** ./windows/AppWindow.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ow_window_1 = __webpack_require__(/*! ../odk-ts/ow-window */ "./odk-ts/ow-window.ts");
class AppWindow {
    constructor(windowName) {
        this.maximized = false;
        this.mainWindow = new ow_window_1.OWWindow('background');
        this.currWindow = new ow_window_1.OWWindow(windowName);
        const closeButton = document.getElementById('closeButton');
        const maximizeButton = document.getElementById('maximizeButton');
        const minimizeButton = document.getElementById('minimizeButton');
        const modal = document.getElementById('exitMinimizeModal');
        const modalCloseButton = document.getElementById('exit');
        const modalMinimizeButton = document.getElementById('minimize');
        const header = document.getElementById('header');
        this.setDrag(header);
        closeButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });
        modalCloseButton.addEventListener('click', () => {
            this.mainWindow.close();
        });
        minimizeButton.addEventListener('click', () => {
            this.currWindow.minimize();
        });
        maximizeButton.addEventListener('click', () => {
            if (!this.maximized) {
                this.currWindow.maximize();
            }
            else {
                this.currWindow.restore();
            }
            this.maximized = !this.maximized;
        });
        modalMinimizeButton.addEventListener('click', () => {
            this.currWindow.minimize();
            modal.style.display = 'none';
        });
    }
    async getWindowState() {
        return await this.currWindow.getWindowState();
    }
    async setDrag(elem) {
        this.currWindow.dragMove(elem);
    }
}
exports.AppWindow = AppWindow;


/***/ }),

/***/ "./windows/desktop/desktop.ts":
/*!************************************!*\
  !*** ./windows/desktop/desktop.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AppWindow_1 = __webpack_require__(/*! ../AppWindow */ "./windows/AppWindow.ts");
const consts_1 = __webpack_require__(/*! ../../consts */ "./consts.ts");
new AppWindow_1.AppWindow(consts_1.windowNames.desktop);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy13aW5kb3cudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9BcHBXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9kZXNrdG9wL2Rlc2t0b3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztBQThCNUIsMENBQWU7QUE1QmpCLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsVUFBVTtJQUNWLE9BQU87SUFDUCxPQUFPO0lBQ1AsTUFBTTtJQUNOLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixPQUFPO0lBQ1AsSUFBSTtJQUNKLE9BQU87SUFDUCxNQUFNO0lB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QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYztRQUN6QixPQUFPLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FDRjtBQXZERCw4QkF1REM7Ozs7Ozs7Ozs7Ozs7OztBQzNERCxzRkFBeUM7QUFDekMsd0VBQTJDO0FBSzNDLElBQUkscUJBQVMsQ0FBQyxvQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6ImRlc2t0b3AvZGVza3RvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vd2luZG93cy9kZXNrdG9wL2Rlc2t0b3AudHNcIik7XG4iLCJjb25zdCBmb3J0bml0ZUNsYXNzSWQgPSAyMTIxNjtcblxuY29uc3QgaW50ZXJlc3RpbmdGZWF0dXJlcyA9IFtcbiAgJ2NvdW50ZXJzJyxcbiAgJ2RlYXRoJyxcbiAgJ2l0ZW1zJyxcbiAgJ2tpbGwnLFxuICAna2lsbGVkJyxcbiAgJ2tpbGxlcicsXG4gICdsb2NhdGlvbicsXG4gICdtYXRjaF9pbmZvJyxcbiAgJ21hdGNoJyxcbiAgJ21lJyxcbiAgJ3BoYXNlJyxcbiAgJ3JhbmsnLFxuICAncmV2aXZlZCcsXG4gICdyb3N0ZXInLFxuICAndGVhbSdcbl07XG5cbmNvbnN0IHdpbmRvd05hbWVzID0ge1xuICBpbkdhbWU6ICdpbl9nYW1lJyxcbiAgZGVza3RvcDogJ2Rlc2t0b3AnXG59O1xuXG5jb25zdCBob3RrZXlzID0ge1xuICB0b2dnbGU6ICdzaG93aGlkZSdcbn07XG5cbmV4cG9ydCB7XG4gIGZvcnRuaXRlQ2xhc3NJZCxcbiAgaW50ZXJlc3RpbmdGZWF0dXJlcyxcbiAgd2luZG93TmFtZXMsXG4gIGhvdGtleXNcbn0iLCJ0eXBlIEdldFdpbmRvd1N0YXRlUmVzdWx0ID0gb3ZlcndvbGYud2luZG93cy5HZXRXaW5kb3dTdGF0ZVJlc3VsdDtcbnR5cGUgT3dXaW5kb3dJbmZvID0gb3ZlcndvbGYud2luZG93cy5XaW5kb3dJbmZvO1xuZXhwb3J0IGNsYXNzIE9XV2luZG93IHtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9pZCA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzdG9yZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MucmVzdG9yZShpZCwgcmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcylcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbcmVzdG9yZV0gLSBhbiBlcnJvciBvY2N1cnJlZCwgd2luZG93SWQ9JHtpZH0sIHJlYXNvbj0ke3Jlc3VsdC5lcnJvcn1gKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBtaW5pbWl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLm1pbmltaXplKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIG1heGltaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MubWF4aW1pemUoaWQsICgpID0+IHsgfSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaGlkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmhpZGUoaWQsICgpID0+IHsgfSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xvc2UoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmdldFdpbmRvd1N0YXRlKCk7XG5cbiAgICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJlxuICAgICAgICAocmVzdWx0LndpbmRvd19zdGF0ZSAhPT0gJ2Nsb3NlZCcpKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW50ZXJuYWxDbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgZHJhZ01vdmUoZWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICBlbGVtLm9ubW91c2Vkb3duID0gZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmRyYWdNb3ZlKHRoaXMuX25hbWUpO1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0V2luZG93U3RhdGUoKTogUHJvbWlzZTxHZXRXaW5kb3dTdGF0ZVJlc3VsdD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxHZXRXaW5kb3dTdGF0ZVJlc3VsdD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmdldFdpbmRvd1N0YXRlKGlkLCByZXNvbHZlKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRDdXJyZW50SW5mbygpOiBQcm9taXNlPE93V2luZG93SW5mbz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxPd1dpbmRvd0luZm8+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KHJlc3VsdCA9PiB7XG4gICAgICAgIHJlc29sdmUocmVzdWx0LndpbmRvdyk7XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIG9idGFpbigpOiBQcm9taXNlPE93V2luZG93SW5mbyB8IG51bGw+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2IgPSByZXMgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5zdGF0dXMgPT09IFwic3VjY2Vzc1wiICYmIHJlcy53aW5kb3cgJiYgcmVzLndpbmRvdy5pZCkge1xuICAgICAgICAgIHRoaXMuX2lkID0gcmVzLndpbmRvdy5pZDtcblxuICAgICAgICAgIGlmICghdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHJlcy53aW5kb3cubmFtZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKHJlcy53aW5kb3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2lkID0gbnVsbDtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKCF0aGlzLl9uYW1lKSB7XG4gICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhjYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KHRoaXMuX25hbWUsIGNiKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhc3N1cmVPYnRhaW5lZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5vYnRhaW4oKTtcbiAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGludGVybmFsQ2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcblxuICAgICAgb3ZlcndvbGYud2luZG93cy5jbG9zZShpZCwgcmVzID0+IHtcblxuICAgICAgICBpZiAocmVzICYmIHJlcy5zdWNjZXNzKVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgT1dXaW5kb3cgfSBmcm9tIFwiLi4vb2RrLXRzL293LXdpbmRvd1wiO1xuXG4vLyBBIGJhc2UgY2xhc3MgZm9yIHRoZSBhcHAncyBmb3JlZ3JvdW5kIHdpbmRvd3MuXG4vLyBTZXRzIHRoZSBtb2RhbCBhbmQgZHJhZyBiZWhhdmlvcnMsIHdoaWNoIGFyZSBzaGFyZWQgYWNjcm9zcyB0aGUgZGVza3RvcCBhbmQgaW4tZ2FtZSB3aW5kb3dzLlxuZXhwb3J0IGNsYXNzIEFwcFdpbmRvdyB7XG4gIHByb3RlY3RlZCBjdXJyV2luZG93OiBPV1dpbmRvdztcbiAgcHJvdGVjdGVkIG1haW5XaW5kb3c6IE9XV2luZG93O1xuICBwcm90ZWN0ZWQgbWF4aW1pemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iod2luZG93TmFtZSkge1xuICAgIHRoaXMubWFpbldpbmRvdyA9IG5ldyBPV1dpbmRvdygnYmFja2dyb3VuZCcpO1xuICAgIHRoaXMuY3VycldpbmRvdyA9IG5ldyBPV1dpbmRvdyh3aW5kb3dOYW1lKTtcbiAgICBcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUJ1dHRvbicpO1xuICAgIGNvbnN0IG1heGltaXplQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21heGltaXplQnV0dG9uJyk7XG4gICAgY29uc3QgbWluaW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1pemVCdXR0b24nKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGl0TWluaW1pemVNb2RhbCcpO1xuICAgIGNvbnN0IG1vZGFsQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpO1xuICAgIGNvbnN0IG1vZGFsTWluaW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1pemUnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKTtcbiAgICBcbiAgICB0aGlzLnNldERyYWcoaGVhZGVyKTtcbiAgICBcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuXG4gICAgbW9kYWxDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMubWFpbldpbmRvdy5jbG9zZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIG1pbmltaXplQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyV2luZG93Lm1pbmltaXplKCk7XG4gICAgfSk7XG5cbiAgICBtYXhpbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5tYXhpbWl6ZWQpIHtcbiAgICAgICAgdGhpcy5jdXJyV2luZG93Lm1heGltaXplKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJXaW5kb3cucmVzdG9yZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1heGltaXplZCA9ICF0aGlzLm1heGltaXplZDtcbiAgICB9KTtcblxuICAgIG1vZGFsTWluaW1pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJXaW5kb3cubWluaW1pemUoKTtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0V2luZG93U3RhdGUoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY3VycldpbmRvdy5nZXRXaW5kb3dTdGF0ZSgpO1xuICB9XG4gIFxuICBwcml2YXRlIGFzeW5jIHNldERyYWcoZWxlbSkge1xuICAgIHRoaXMuY3VycldpbmRvdy5kcmFnTW92ZShlbGVtKTtcbiAgfVxufSIsImltcG9ydCB7IEFwcFdpbmRvdyB9IGZyb20gXCIuLi9BcHBXaW5kb3dcIjtcbmltcG9ydCB7IHdpbmRvd05hbWVzIH0gZnJvbSBcIi4uLy4uL2NvbnN0c1wiO1xuXG4vLyBUaGUgZGVza3RvcCB3aW5kb3cgaXMgdGhlIHdpbmRvdyBkaXNwbGF5ZWQgd2hpbGUgRm9ydG5pdGUgaXMgbm90IHJ1bm5pbmcuXG4vLyBJbiBvdXIgY2FzZSwgb3VyIGRlc2t0b3Agd2luZG93IGhhcyBubyBsb2dpYyAtIGl0IG9ubHkgZGlzcGxheXMgc3RhdGljIGRhdGEuXG4vLyBUaGVyZWZvcmUsIG9ubHkgdGhlIGdlbmVyaWMgQXBwV2luZG93IGNsYXNzIGlzIGNhbGxlZC5cbm5ldyBBcHBXaW5kb3cod2luZG93TmFtZXMuZGVza3RvcCk7Il0sInNvdXJjZVJvb3QiOiIifQ==