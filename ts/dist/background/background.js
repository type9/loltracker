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
/******/ 	return __webpack_require__(__webpack_require__.s = "./windows/background/background.ts");
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

/***/ "./odk-ts/ow-game-listener.ts":
/*!************************************!*\
  !*** ./odk-ts/ow-game-listener.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ow_listener_1 = __webpack_require__(/*! ./ow-listener */ "./odk-ts/ow-listener.ts");
class OWGameListener extends ow_listener_1.OWListener {
    constructor(delegate) {
        super(delegate);
        this.onGameInfoUpdated = (update) => {
            if (!update || !update.gameInfo) {
                return;
            }
            if (!update.runningChanged && !update.gameChanged) {
                return;
            }
            if (update.gameInfo.isRunning) {
                if (this._delegate.onGameStarted) {
                    this._delegate.onGameStarted(update.gameInfo);
                }
            }
            else {
                if (this._delegate.onGameEnded) {
                    this._delegate.onGameEnded(update.gameInfo);
                }
            }
        };
        this.onRunningGameInfo = (info) => {
            if (!info) {
                return;
            }
            if (info.isRunning) {
                if (this._delegate.onGameStarted) {
                    this._delegate.onGameStarted(info);
                }
            }
        };
    }
    start() {
        super.start();
        overwolf.games.onGameInfoUpdated.addListener(this.onGameInfoUpdated);
        overwolf.games.getRunningGameInfo(this.onRunningGameInfo);
    }
    stop() {
        overwolf.games.onGameInfoUpdated.removeListener(this.onGameInfoUpdated);
    }
}
exports.OWGameListener = OWGameListener;


/***/ }),

/***/ "./odk-ts/ow-games.ts":
/*!****************************!*\
  !*** ./odk-ts/ow-games.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWGames {
    static getRunningGameInfo() {
        return new Promise((resolve) => {
            overwolf.games.getRunningGameInfo(resolve);
        });
    }
    static classIdFromGameId(gameId) {
        let classId = Math.floor(gameId / 10);
        return classId;
    }
    static async getRecentlyPlayedGames(limit = 3) {
        return new Promise((resolve) => {
            if (!overwolf.games.getRecentlyPlayedGames) {
                return resolve(null);
            }
            overwolf.games.getRecentlyPlayedGames(limit, result => {
                resolve(result.games);
            });
        });
    }
    static async getGameDBInfo(gameClassId) {
        return new Promise((resolve) => {
            overwolf.games.getGameDBInfo(gameClassId, resolve);
        });
    }
}
exports.OWGames = OWGames;


/***/ }),

/***/ "./odk-ts/ow-listener.ts":
/*!*******************************!*\
  !*** ./odk-ts/ow-listener.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWListener {
    constructor(delegate) {
        this._delegate = delegate;
    }
    start() {
        this.stop();
    }
}
exports.OWListener = OWListener;


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

/***/ "./windows/background/background.ts":
/*!******************************************!*\
  !*** ./windows/background/background.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = __webpack_require__(/*! ../../consts */ "./consts.ts");
const ow_games_1 = __webpack_require__(/*! ../../odk-ts/ow-games */ "./odk-ts/ow-games.ts");
const ow_game_listener_1 = __webpack_require__(/*! ../../odk-ts/ow-game-listener */ "./odk-ts/ow-game-listener.ts");
const ow_window_1 = __webpack_require__(/*! ../../odk-ts/ow-window */ "./odk-ts/ow-window.ts");
class BackgroundController {
    constructor() {
        this._windows = {};
        this._windows[consts_1.windowNames.desktop] = new ow_window_1.OWWindow(consts_1.windowNames.desktop);
        this._windows[consts_1.windowNames.inGame] = new ow_window_1.OWWindow(consts_1.windowNames.inGame);
        this._fortniteGameListener = new ow_game_listener_1.OWGameListener({
            onGameStarted: this.toggleWindows.bind(this),
            onGameEnded: this.toggleWindows.bind(this)
        });
    }
    ;
    static instance() {
        if (!BackgroundController._instance) {
            BackgroundController._instance = new BackgroundController();
        }
        return BackgroundController._instance;
    }
    async run() {
        this._fortniteGameListener.start();
        const currWindow = await this.isFortniteRunning() ? consts_1.windowNames.inGame : consts_1.windowNames.desktop;
        this._windows[currWindow].restore();
    }
    toggleWindows(info) {
        if (!info || !this.isGameFortnite(info)) {
            return;
        }
        if (info.isRunning) {
            this._windows[consts_1.windowNames.desktop].close();
            this._windows[consts_1.windowNames.inGame].restore();
        }
        else {
            this._windows[consts_1.windowNames.inGame].close();
            this._windows[consts_1.windowNames.desktop].restore();
        }
    }
    async isFortniteRunning() {
        const info = await ow_games_1.OWGames.getRunningGameInfo();
        return info && info.isRunning && this.isGameFortnite(info);
    }
    isGameFortnite(info) {
        return info.classId === consts_1.fortniteClassId;
    }
}
BackgroundController.instance().run();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy1nYW1lLWxpc3RlbmVyLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy1nYW1lcy50cyIsIndlYnBhY2s6Ly8vLi9vZGstdHMvb3ctbGlzdGVuZXIudHMiLCJ3ZWJwYWNrOi8vLy4vb2RrLXRzL293LXdpbmRvdy50cyIsIndlYnBhY2s6Ly8vLi93aW5kb3dzL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsTUFBTSxlQUFlLEdBQUcsS0FBSyxDQUFDO0FBOEI1QiwwQ0FBZTtBQTVCakIsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixVQUFVO0lBQ1YsT0FBTztJQUNQLE9BQU87SUFDUCxNQUFN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T0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDN0M7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDOUM7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFDLGlCQUFpQjtRQUM3QixNQUFNLElBQUksR0FBRyxNQUFNLGtCQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUVoRCxPQUFPLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUdPLGNBQWMsQ0FBQyxJQUFxQjtRQUMxQyxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssd0JBQWUsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFFRCxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJiYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3dpbmRvd3MvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiY29uc3QgZm9ydG5pdGVDbGFzc0lkID0gMjEyMTY7XG5cbmNvbnN0IGludGVyZXN0aW5nRmVhdHVyZXMgPSBbXG4gICdjb3VudGVycycsXG4gICdkZWF0aCcsXG4gICdpdGVtcycsXG4gICdraWxsJyxcbiAgJ2tpbGxlZCcsXG4gICdraWxsZXInLFxuICAnbG9jYXRpb24nLFxuICAnbWF0Y2hfaW5mbycsXG4gICdtYXRjaCcsXG4gICdtZScsXG4gICdwaGFzZScsXG4gICdyYW5rJyxcbiAgJ3Jldml2ZWQnLFxuICAncm9zdGVyJyxcbiAgJ3RlYW0nXG5dO1xuXG5jb25zdCB3aW5kb3dOYW1lcyA9IHtcbiAgaW5HYW1lOiAnaW5fZ2FtZScsXG4gIGRlc2t0b3A6ICdkZXNrdG9wJ1xufTtcblxuY29uc3QgaG90a2V5cyA9IHtcbiAgdG9nZ2xlOiAnc2hvd2hpZGUnXG59O1xuXG5leHBvcnQge1xuICBmb3J0bml0ZUNsYXNzSWQsXG4gIGludGVyZXN0aW5nRmVhdHVyZXMsXG4gIHdpbmRvd05hbWVzLFxuICBob3RrZXlzXG59IiwiaW1wb3J0IHsgT1dMaXN0ZW5lciwgT1dMaXN0ZW5lckRlbGVnYXRlIH0gZnJvbSBcIi4vb3ctbGlzdGVuZXJcIjtcblxuZXhwb3J0IGludGVyZmFjZSBPV0dhbWVMaXN0ZW5lckRlbGVnYXRlIGV4dGVuZHMgT1dMaXN0ZW5lckRlbGVnYXRlIHtcbiAgb25HYW1lU3RhcnRlZD8oaW5mbzogb3ZlcndvbGYuZ2FtZXMuUnVubmluZ0dhbWVJbmZvKTtcbiAgb25HYW1lRW5kZWQ/KGluZm86IG92ZXJ3b2xmLmdhbWVzLlJ1bm5pbmdHYW1lSW5mbyk7XG59XG5cbmV4cG9ydCBjbGFzcyBPV0dhbWVMaXN0ZW5lciBleHRlbmRzIE9XTGlzdGVuZXI8T1dHYW1lTGlzdGVuZXJEZWxlZ2F0ZT4ge1xuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZTogT1dHYW1lTGlzdGVuZXJEZWxlZ2F0ZSkge1xuICAgIHN1cGVyKGRlbGVnYXRlKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgb3ZlcndvbGYuZ2FtZXMub25HYW1lSW5mb1VwZGF0ZWQuYWRkTGlzdGVuZXIodGhpcy5vbkdhbWVJbmZvVXBkYXRlZCk7XG4gICAgb3ZlcndvbGYuZ2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKHRoaXMub25SdW5uaW5nR2FtZUluZm8pO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgb3ZlcndvbGYuZ2FtZXMub25HYW1lSW5mb1VwZGF0ZWQucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkdhbWVJbmZvVXBkYXRlZCk7XG4gIH1cblxuICBwcml2YXRlIG9uR2FtZUluZm9VcGRhdGVkID0gKHVwZGF0ZTogb3ZlcndvbGYuZ2FtZXMuR2FtZUluZm9VcGRhdGVkRXZlbnQpOiB2b2lkID0+IHtcbiAgICBpZiAoIXVwZGF0ZSB8fCAhdXBkYXRlLmdhbWVJbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF1cGRhdGUucnVubmluZ0NoYW5nZWQgJiYgIXVwZGF0ZS5nYW1lQ2hhbmdlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh1cGRhdGUuZ2FtZUluZm8uaXNSdW5uaW5nKSB7XG4gICAgICBpZiAodGhpcy5fZGVsZWdhdGUub25HYW1lU3RhcnRlZCkge1xuICAgICAgICB0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVTdGFydGVkKHVwZGF0ZS5nYW1lSW5mbylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2RlbGVnYXRlLm9uR2FtZUVuZGVkKSB7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uR2FtZUVuZGVkKHVwZGF0ZS5nYW1lSW5mbylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uUnVubmluZ0dhbWVJbmZvID0gKGluZm86IG92ZXJ3b2xmLmdhbWVzLlJ1bm5pbmdHYW1lSW5mbyk6IHZvaWQgPT4ge1xuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBpZiAoaW5mby5pc1J1bm5pbmcpIHtcbiAgICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVTdGFydGVkKSB7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uR2FtZVN0YXJ0ZWQoaW5mbylcbiAgICAgIH1cbiAgICB9XG4gIH0gIFxufSIsInR5cGUgR2V0R2FtZURCSW5mb1Jlc3VsdCA9IG92ZXJ3b2xmLmdhbWVzLkdldEdhbWVEQkluZm9SZXN1bHRcbnR5cGUgUnVubmluZ0dhbWVJbmZvID0gb3ZlcndvbGYuZ2FtZXMuUnVubmluZ0dhbWVJbmZvXG5cbmV4cG9ydCBjbGFzcyBPV0dhbWVzIHtcblx0cHVibGljIHN0YXRpYyBnZXRSdW5uaW5nR2FtZUluZm8oKTogUHJvbWlzZTxSdW5uaW5nR2FtZUluZm8+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8UnVubmluZ0dhbWVJbmZvPigocmVzb2x2ZSkgPT4ge1xuICAgICAgb3ZlcndvbGYuZ2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKHJlc29sdmUpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGNsYXNzSWRGcm9tR2FtZUlkKGdhbWVJZDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBsZXQgY2xhc3NJZCA9IE1hdGguZmxvb3IoZ2FtZUlkIC8gMTApO1xuICAgIHJldHVybiBjbGFzc0lkO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRSZWNlbnRseVBsYXllZEdhbWVzKGxpbWl0OiBudW1iZXIgPSAzKTpcbiAgICBQcm9taXNlPG51bWJlcltdfG51bGw+IHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxudW1iZXJbXXxudWxsPigocmVzb2x2ZSkgPT4ge1xuICAgICAgaWYgKCFvdmVyd29sZi5nYW1lcy5nZXRSZWNlbnRseVBsYXllZEdhbWVzKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKG51bGwpO1xuICAgICAgfVxuXG4gICAgICBvdmVyd29sZi5nYW1lcy5nZXRSZWNlbnRseVBsYXllZEdhbWVzKGxpbWl0LCByZXN1bHQgPT4ge1xuICAgICAgICByZXNvbHZlKHJlc3VsdC5nYW1lcyk7XG4gICAgICB9KTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRHYW1lREJJbmZvKGdhbWVDbGFzc0lkOiBudW1iZXIpOlxuICAgIFByb21pc2U8R2V0R2FtZURCSW5mb1Jlc3VsdD4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEdldEdhbWVEQkluZm9SZXN1bHQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBvdmVyd29sZi5nYW1lcy5nZXRHYW1lREJJbmZvKGdhbWVDbGFzc0lkLCByZXNvbHZlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBPV0xpc3RlbmVyRGVsZWdhdGUge1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgT1dMaXN0ZW5lcjxUIGV4dGVuZHMgT1dMaXN0ZW5lckRlbGVnYXRlPiB7XG4gIHByb3RlY3RlZCBfZGVsZWdhdGU6IFQ7XG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGU6IFQpIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcCgpO1xuICB9XG5cbiAgYWJzdHJhY3Qgc3RvcCgpOiB2b2lkO1xufVxuIiwidHlwZSBHZXRXaW5kb3dTdGF0ZVJlc3VsdCA9IG92ZXJ3b2xmLndpbmRvd3MuR2V0V2luZG93U3RhdGVSZXN1bHQ7XG50eXBlIE93V2luZG93SW5mbyA9IG92ZXJ3b2xmLndpbmRvd3MuV2luZG93SW5mbztcbmV4cG9ydCBjbGFzcyBPV1dpbmRvdyB7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyB8IG51bGw7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmcgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5faWQgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc3RvcmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUoaWQsIHJlc3VsdCA9PiB7XG4gICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW3Jlc3RvcmVdIC0gYW4gZXJyb3Igb2NjdXJyZWQsIHdpbmRvd0lkPSR7aWR9LCByZWFzb249JHtyZXN1bHQuZXJyb3J9YCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbWluaW1pemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5taW5pbWl6ZShpZCwgKCkgPT4geyB9KTtcbiAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBtYXhpbWl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLm1heGltaXplKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGhpZGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5oaWRlKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsb3NlKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTdGF0ZSgpO1xuXG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiZcbiAgICAgICAgKHJlc3VsdC53aW5kb3dfc3RhdGUgIT09ICdjbG9zZWQnKSkge1xuICAgICAgICBhd2FpdCB0aGlzLmludGVybmFsQ2xvc2UoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGRyYWdNb3ZlKGVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgZWxlbS5vbm1vdXNlZG93biA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5kcmFnTW92ZSh0aGlzLl9uYW1lKTtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFdpbmRvd1N0YXRlKCk6IFByb21pc2U8R2V0V2luZG93U3RhdGVSZXN1bHQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8R2V0V2luZG93U3RhdGVSZXN1bHQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRXaW5kb3dTdGF0ZShpZCwgcmVzb2x2ZSk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0Q3VycmVudEluZm8oKTogUHJvbWlzZTxPd1dpbmRvd0luZm8+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8T3dXaW5kb3dJbmZvPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhyZXN1bHQgPT4ge1xuICAgICAgICByZXNvbHZlKHJlc3VsdC53aW5kb3cpO1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBvYnRhaW4oKTogUHJvbWlzZTxPd1dpbmRvd0luZm8gfCBudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNiID0gcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuc3RhdHVzID09PSBcInN1Y2Nlc3NcIiAmJiByZXMud2luZG93ICYmIHJlcy53aW5kb3cuaWQpIHtcbiAgICAgICAgICB0aGlzLl9pZCA9IHJlcy53aW5kb3cuaWQ7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSByZXMud2luZG93Lm5hbWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZShyZXMud2luZG93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9pZCA9IG51bGw7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5fbmFtZSkge1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3coY2IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3ZlcndvbGYud2luZG93cy5vYnRhaW5EZWNsYXJlZFdpbmRvdyh0aGlzLl9uYW1lLCBjYik7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYXNzdXJlT2J0YWluZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQub2J0YWluKCk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbnRlcm5hbENsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG5cbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MuY2xvc2UoaWQsIHJlcyA9PiB7XG5cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuc3VjY2VzcylcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCB7IHdpbmRvd05hbWVzLCBmb3J0bml0ZUNsYXNzSWQgfSBmcm9tIFwiLi4vLi4vY29uc3RzXCI7XG5pbXBvcnQgeyBPV0dhbWVzIH0gZnJvbSAnLi4vLi4vb2RrLXRzL293LWdhbWVzJztcbmltcG9ydCB7IE9XR2FtZUxpc3RlbmVyIH0gZnJvbSAnLi4vLi4vb2RrLXRzL293LWdhbWUtbGlzdGVuZXInO1xuaW1wb3J0IHsgT1dXaW5kb3cgfSBmcm9tICcuLi8uLi9vZGstdHMvb3ctd2luZG93JztcbmltcG9ydCBSdW5uaW5nR2FtZUluZm8gPSBvdmVyd29sZi5nYW1lcy5SdW5uaW5nR2FtZUluZm87XG5cbi8vIFRoZSBiYWNrZ3JvdW5kIGNvbnRyb2xsZXIgaG9sZHMgYWxsIG9mIHRoZSBhcHAncyBiYWNrZ3JvdW5kIGxvZ2ljIC0gaGVuY2UgaXRzIG5hbWUuIGl0IGhhc1xuLy8gbWFueSBwb3NzaWJsZSB1c2UgY2FzZXMsIGZvciBleGFtcGxlIHNoYXJpbmcgZGF0YSBiZXR3ZWVuIHdpbmRvd3MsIG9yLCBpbiBvdXIgY2FzZSxcbi8vIG1hbmFnaW5nIHdoaWNoIHdpbmRvdyBpcyBjdXJyZW50bHkgcHJlc2VudGVkIHRvIHRoZSB1c2VyLiBUbyB0aGF0IGVuZCwgaXQgaG9sZHMgYSBkaWN0aW9uYXJ5XG4vLyBvZiB0aGUgd2luZG93cyBhdmFpbGFibGUgaW4gdGhlIGFwcC5cbi8vIE91ciBiYWNrZ3JvdW5kIGNvbnRyb2xsZXIgaW1wbGVtZW50cyB0aGUgU2luZ2xldG9uIGRlc2lnbiBwYXR0ZXJuLCBzaW5jZSBvbmx5IG9uZVxuLy8gaW5zdGFuY2Ugb2YgaXQgc2hvdWxkIGV4aXN0LlxuY2xhc3MgQmFja2dyb3VuZENvbnRyb2xsZXIge1xuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEJhY2tncm91bmRDb250cm9sbGVyO1xuICBwcml2YXRlIF93aW5kb3dzID0ge307XG4gIHByaXZhdGUgX2ZvcnRuaXRlR2FtZUxpc3RlbmVyOiBPV0dhbWVMaXN0ZW5lcjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIFBvcHVsYXRpbmcgdGhlIGJhY2tncm91bmQgY29udHJvbGxlcidzIHdpbmRvdyBkaWN0aW9uYXJ5XG4gICAgdGhpcy5fd2luZG93c1t3aW5kb3dOYW1lcy5kZXNrdG9wXSA9IG5ldyBPV1dpbmRvdyh3aW5kb3dOYW1lcy5kZXNrdG9wKTtcbiAgICB0aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmluR2FtZV0gPSBuZXcgT1dXaW5kb3cod2luZG93TmFtZXMuaW5HYW1lKTtcblxuICAgIC8vIFdoZW4gYSBGb3J0bml0ZSBnYW1lIGlzIHN0YXJ0ZWQgb3IgaXMgZW5kZWQsIHRvZ2dsZSB0aGUgYXBwJ3Mgd2luZG93c1xuICAgIHRoaXMuX2ZvcnRuaXRlR2FtZUxpc3RlbmVyID0gbmV3IE9XR2FtZUxpc3RlbmVyKHtcbiAgICAgIG9uR2FtZVN0YXJ0ZWQ6IHRoaXMudG9nZ2xlV2luZG93cy5iaW5kKHRoaXMpLFxuICAgICAgb25HYW1lRW5kZWQ6IHRoaXMudG9nZ2xlV2luZG93cy5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH07XG5cbiAgLy8gSW1wbGVtZW50aW5nIHRoZSBTaW5nbGV0b24gZGVzaWduIHBhdHRlcm5cbiAgcHVibGljIHN0YXRpYyBpbnN0YW5jZSgpOiBCYWNrZ3JvdW5kQ29udHJvbGxlciB7XG4gICAgaWYgKCFCYWNrZ3JvdW5kQ29udHJvbGxlci5faW5zdGFuY2UpIHtcbiAgICAgIEJhY2tncm91bmRDb250cm9sbGVyLl9pbnN0YW5jZSA9IG5ldyBCYWNrZ3JvdW5kQ29udHJvbGxlcigpO1xuICAgIH1cblxuICAgIHJldHVybiBCYWNrZ3JvdW5kQ29udHJvbGxlci5faW5zdGFuY2U7XG4gIH1cblxuICAvLyBXaGVuIHJ1bm5pbmcgdGhlIGFwcCwgc3RhcnQgbGlzdGVuaW5nIHRvIGdhbWVzJyBzdGF0dXMgYW5kIGRlY2lkZSB3aGljaCB3aW5kb3cgc2hvdWxkXG4gIC8vIGJlIGxhdW5jaGVkIGZpcnN0LCBiYXNlZCBvbiB3aGV0aGVyIEZvcnRuaXRlIGlzIGN1cnJlbnRseSBydW5uaW5nXG4gIHB1YmxpYyBhc3luYyBydW4oKSB7XG4gICAgdGhpcy5fZm9ydG5pdGVHYW1lTGlzdGVuZXIuc3RhcnQoKTtcbiAgICBjb25zdCBjdXJyV2luZG93ID0gYXdhaXQgdGhpcy5pc0ZvcnRuaXRlUnVubmluZygpID8gd2luZG93TmFtZXMuaW5HYW1lIDogd2luZG93TmFtZXMuZGVza3RvcDtcbiAgICB0aGlzLl93aW5kb3dzW2N1cnJXaW5kb3ddLnJlc3RvcmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlV2luZG93cyhpbmZvKSB7XG4gICAgaWYgKCFpbmZvIHx8ICF0aGlzLmlzR2FtZUZvcnRuaXRlKGluZm8pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGluZm8uaXNSdW5uaW5nKSB7XG4gICAgICB0aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmRlc2t0b3BdLmNsb3NlKCk7XG4gICAgICB0aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmluR2FtZV0ucmVzdG9yZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmluR2FtZV0uY2xvc2UoKTtcbiAgICAgIHRoaXMuX3dpbmRvd3Nbd2luZG93TmFtZXMuZGVza3RvcF0ucmVzdG9yZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaXNGb3J0bml0ZVJ1bm5pbmcoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgaW5mbyA9IGF3YWl0IE9XR2FtZXMuZ2V0UnVubmluZ0dhbWVJbmZvKCk7XG5cbiAgICByZXR1cm4gaW5mbyAmJiBpbmZvLmlzUnVubmluZyAmJiB0aGlzLmlzR2FtZUZvcnRuaXRlKGluZm8pO1xuICB9XG5cbiAgLy8gSWRlbnRpZnkgd2hldGhlciB0aGUgUnVubmluZ0dhbWVJbmZvIG9iamVjdCB3ZSBoYXZlIHJlZmVyZW5jZXMgRm9ydG5pdGVcbiAgcHJpdmF0ZSBpc0dhbWVGb3J0bml0ZShpbmZvOiBSdW5uaW5nR2FtZUluZm8pIHtcbiAgICByZXR1cm4gaW5mby5jbGFzc0lkID09PSBmb3J0bml0ZUNsYXNzSWQ7XG4gIH1cbn1cblxuQmFja2dyb3VuZENvbnRyb2xsZXIuaW5zdGFuY2UoKS5ydW4oKTsiXSwic291cmNlUm9vdCI6IiJ9