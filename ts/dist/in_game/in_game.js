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
/******/ 	return __webpack_require__(__webpack_require__.s = "./windows/in_game/in_game.ts");
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

/***/ "./odk-ts/ow-games-events.ts":
/*!***********************************!*\
  !*** ./odk-ts/ow-games-events.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = __webpack_require__(/*! ./timer */ "./odk-ts/timer.ts");
class OWGamesEvents {
    constructor(delegate, requiredFeatures, featureRetries = 10) {
        this.onInfoUpdates = (info) => {
            this._delegate.onInfoUpdates(info.info);
        };
        this.onNewEvents = (e) => {
            this._delegate.onNewEvents(e);
        };
        this._delegate = delegate;
        this._requiredFeatures = requiredFeatures;
        this._featureRetries = featureRetries;
    }
    async getInfo() {
        return new Promise((resolve) => {
            overwolf.games.events.getInfo(resolve);
        });
    }
    async setRequiredFeatures() {
        let tries = 1, result;
        while (tries <= this._featureRetries) {
            result = await new Promise(resolve => {
                overwolf.games.events.setRequiredFeatures(this._requiredFeatures, resolve);
            });
            if (result.status === 'success') {
                console.log('setRequiredFeatures(): success: ' + JSON.stringify(result, null, 2));
                return (result.supportedFeatures.length > 0);
            }
            await timer_1.Timer.wait(3000);
            tries++;
        }
        console.warn('setRequiredFeatures(): failure after ' + tries + ' tries' + JSON.stringify(result, null, 2));
        return false;
    }
    registerEvents() {
        this.unRegisterEvents();
        overwolf.games.events.onInfoUpdates2.addListener(this.onInfoUpdates);
        overwolf.games.events.onNewEvents.addListener(this.onNewEvents);
    }
    unRegisterEvents() {
        overwolf.games.events.onInfoUpdates2.removeListener(this.onInfoUpdates);
        overwolf.games.events.onNewEvents.removeListener(this.onNewEvents);
    }
    async start() {
        console.log(`[ow-game-events] START`);
        this.registerEvents();
        await this.setRequiredFeatures();
        const { res, status } = await this.getInfo();
        if (res && status === 'success') {
            this.onInfoUpdates({ info: res });
        }
    }
    stop() {
        console.log(`[ow-game-events] STOP`);
        this.unRegisterEvents();
    }
}
exports.OWGamesEvents = OWGamesEvents;


/***/ }),

/***/ "./odk-ts/ow-hotkeys.ts":
/*!******************************!*\
  !*** ./odk-ts/ow-hotkeys.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWHotkeys {
    constructor() { }
    static getHotkeyText(hotkeyId) {
        return new Promise((resolve, reject) => {
            overwolf.settings.getHotKey(hotkeyId, result => {
                if (!result || !result.success || !result.hotkey) {
                    resolve('UNASSIGNED');
                }
                resolve(result.hotkey);
            });
        });
    }
    static onHotkeyDown(hotkeyId, action) {
        overwolf.settings.registerHotKey(hotkeyId, action);
    }
}
exports.OWHotkeys = OWHotkeys;


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

/***/ "./odk-ts/timer.ts":
/*!*************************!*\
  !*** ./odk-ts/timer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(delegate, id) {
        this._timerId = null;
        this.handleTimerEvent = () => {
            this._timerId = null;
            this._delegate.onTimer(this._id);
        };
        this._delegate = delegate;
        this._id = id;
    }
    static async wait(intervalInMS) {
        return new Promise(resolve => {
            setTimeout(resolve, intervalInMS);
        });
    }
    start(intervalInMS) {
        this.stop();
        this._timerId = setTimeout(this.handleTimerEvent, intervalInMS);
    }
    stop() {
        if (this._timerId == null) {
            return;
        }
        clearTimeout(this._timerId);
        this._timerId = null;
    }
}
exports.Timer = Timer;


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

/***/ "./windows/in_game/in_game.ts":
/*!************************************!*\
  !*** ./windows/in_game/in_game.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AppWindow_1 = __webpack_require__(/*! ../AppWindow */ "./windows/AppWindow.ts");
const ow_games_events_1 = __webpack_require__(/*! ../../odk-ts/ow-games-events */ "./odk-ts/ow-games-events.ts");
const ow_hotkeys_1 = __webpack_require__(/*! ../../odk-ts/ow-hotkeys */ "./odk-ts/ow-hotkeys.ts");
const consts_1 = __webpack_require__(/*! ../../consts */ "./consts.ts");
class InGame extends AppWindow_1.AppWindow {
    constructor() {
        super(consts_1.windowNames.inGame);
        this._eventsLog = document.getElementById('eventsLog');
        this._infoLog = document.getElementById('infoLog');
        this.setToggleHotkeyBehavior();
        this.setToggleHotkeyText();
        this._fortniteGameEventsListener = new ow_games_events_1.OWGamesEvents({
            onInfoUpdates: this.onInfoUpdates.bind(this),
            onNewEvents: this.onNewEvents.bind(this)
        }, consts_1.interestingFeatures);
    }
    static instance() {
        if (!this._instance) {
            this._instance = new InGame();
        }
        return this._instance;
    }
    run() {
        this._fortniteGameEventsListener.start();
    }
    onInfoUpdates(info) {
        this.logLine(this._infoLog, info, false);
    }
    onNewEvents(e) {
        const shouldHighlight = e.events.some(event => {
            return event.name === 'kill' ||
                event.name === 'death' ||
                event.name === 'assist' ||
                event.name === 'level';
        });
        this.logLine(this._eventsLog, e, shouldHighlight);
    }
    async setToggleHotkeyText() {
        const hotkeyText = await ow_hotkeys_1.OWHotkeys.getHotkeyText(consts_1.hotkeys.toggle);
        const hotkeyElem = document.getElementById('hotkey');
        hotkeyElem.textContent = hotkeyText;
    }
    async setToggleHotkeyBehavior() {
        const toggleInGameWindow = async (hotkeyResult) => {
            console.log(`pressed hotkey for ${hotkeyResult.featureId}`);
            const inGameState = await this.getWindowState();
            if (inGameState.window_state === "normal" ||
                inGameState.window_state === "maximized") {
                this.currWindow.minimize();
            }
            else if (inGameState.window_state === "minimized" ||
                inGameState.window_state === "closed") {
                this.currWindow.restore();
            }
        };
        ow_hotkeys_1.OWHotkeys.onHotkeyDown(consts_1.hotkeys.toggle, toggleInGameWindow);
    }
    logLine(log, data, highlight) {
        console.log(`${log.id}:`);
        console.log(data);
        const line = document.createElement('pre');
        line.textContent = JSON.stringify(data);
        if (highlight) {
            line.className = 'highlight';
        }
        const shouldAutoScroll = (log.scrollTop + log.offsetHeight) > (log.scrollHeight - 10);
        log.appendChild(line);
        if (shouldAutoScroll) {
            log.scrollTop = log.scrollHeight;
        }
    }
}
InGame.instance().run();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy1nYW1lcy1ldmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vb2RrLXRzL293LWhvdGtleXMudHMiLCJ3ZWJwYWNrOi8vLy4vb2RrLXRzL293LXdpbmRvdy50cyIsIndlYnBhY2s6Ly8vLi9vZGstdHMvdGltZXIudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9BcHBXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9pbl9nYW1lL2luX2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztBQThCNUIsMENBQWU7QUE1QmpCLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsVUFBVTtJQUNW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QkFBMEI7Z0JBQzNELFdBQVcsQ0FBQyxZQUFZLGFBQXVCLEVBQUU7Z0JBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDM0I7UUFDSCxDQUFDO1FBRUQsc0JBQVMsQ0FBQyxZQUFZLENBQUMsZ0JBQU8sQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBR08sT0FBTyxDQUFDLEdBQWdCLEVBQUUsSUFBSSxFQUFFLFNBQVM7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEMsSUFBSSxTQUFTLEVBQUU7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztTQUM5QjtRQUVELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFdEYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNsQztJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJpbl9nYW1lL2luX2dhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3dpbmRvd3MvaW5fZ2FtZS9pbl9nYW1lLnRzXCIpO1xuIiwiY29uc3QgZm9ydG5pdGVDbGFzc0lkID0gMjEyMTY7XG5cbmNvbnN0IGludGVyZXN0aW5nRmVhdHVyZXMgPSBbXG4gICdjb3VudGVycycsXG4gICdkZWF0aCcsXG4gICdpdGVtcycsXG4gICdraWxsJyxcbiAgJ2tpbGxlZCcsXG4gICdraWxsZXInLFxuICAnbG9jYXRpb24nLFxuICAnbWF0Y2hfaW5mbycsXG4gICdtYXRjaCcsXG4gICdtZScsXG4gICdwaGFzZScsXG4gICdyYW5rJyxcbiAgJ3Jldml2ZWQnLFxuICAncm9zdGVyJyxcbiAgJ3RlYW0nXG5dO1xuXG5jb25zdCB3aW5kb3dOYW1lcyA9IHtcbiAgaW5HYW1lOiAnaW5fZ2FtZScsXG4gIGRlc2t0b3A6ICdkZXNrdG9wJ1xufTtcblxuY29uc3QgaG90a2V5cyA9IHtcbiAgdG9nZ2xlOiAnc2hvd2hpZGUnXG59O1xuXG5leHBvcnQge1xuICBmb3J0bml0ZUNsYXNzSWQsXG4gIGludGVyZXN0aW5nRmVhdHVyZXMsXG4gIHdpbmRvd05hbWVzLFxuICBob3RrZXlzXG59IiwiaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi90aW1lclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPV0dhbWVzRXZlbnRzRGVsZWdhdGUge1xuICBvbkluZm9VcGRhdGVzKGluZm86IGFueSk7XG4gIG9uTmV3RXZlbnRzKGU6IGFueSk7XG59XG5cbmV4cG9ydCBjbGFzcyBPV0dhbWVzRXZlbnRzIHtcbiAgcHJpdmF0ZSBfZGVsZWdhdGU6IElPV0dhbWVzRXZlbnRzRGVsZWdhdGU7XG4gIHByaXZhdGUgX2ZlYXR1cmVSZXRyaWVzOiBudW1iZXI7XG4gIHByaXZhdGUgX3JlcXVpcmVkRmVhdHVyZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGRlbGVnYXRlOiBJT1dHYW1lc0V2ZW50c0RlbGVnYXRlLCBcbiAgICAgICAgICAgICAgcmVxdWlyZWRGZWF0dXJlczogc3RyaW5nW10sIFxuICAgICAgICAgICAgICBmZWF0dXJlUmV0cmllczogbnVtYmVyID0gMTApIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgIHRoaXMuX3JlcXVpcmVkRmVhdHVyZXMgPSByZXF1aXJlZEZlYXR1cmVzO1xuICAgIHRoaXMuX2ZlYXR1cmVSZXRyaWVzID0gZmVhdHVyZVJldHJpZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0SW5mbygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLmdldEluZm8ocmVzb2x2ZSk7XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBsZXQgdHJpZXM6bnVtYmVyID0gMSxcbiAgICAgICAgcmVzdWx0O1xuXG4gICAgd2hpbGUgKCB0cmllcyA8PSB0aGlzLl9mZWF0dXJlUmV0cmllcyApIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMuc2V0UmVxdWlyZWRGZWF0dXJlcyhcbiAgICAgICAgICB0aGlzLl9yZXF1aXJlZEZlYXR1cmVzLFxuICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgKTtcbiAgICAgIH0pXG5cbiAgICAgIGlmICggcmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBzdWNjZXNzOiAnKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcbiAgICAgICAgcmV0dXJuIChyZXN1bHQuc3VwcG9ydGVkRmVhdHVyZXMubGVuZ3RoID4gMCk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFRpbWVyLndhaXQoMzAwMCk7XG4gICAgICB0cmllcysrO1xuICAgIH1cblxuICAgIGNvbnNvbGUud2Fybignc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBmYWlsdXJlIGFmdGVyICcrIHRyaWVzICsnIHRyaWVzJysgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudHMoKTtcblxuICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbkluZm9VcGRhdGVzMi5hZGRMaXN0ZW5lcih0aGlzLm9uSW5mb1VwZGF0ZXMpO1xuICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbk5ld0V2ZW50cy5hZGRMaXN0ZW5lcih0aGlzLm9uTmV3RXZlbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5SZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcbiAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25JbmZvVXBkYXRlczIucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkluZm9VcGRhdGVzKTtcbiAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25OZXdFdmVudHMucmVtb3ZlTGlzdGVuZXIodGhpcy5vbk5ld0V2ZW50cyk7XG4gIH1cblxuICBwcml2YXRlIG9uSW5mb1VwZGF0ZXMgPSAoaW5mbzogYW55KTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUub25JbmZvVXBkYXRlcyhpbmZvLmluZm8pO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk5ld0V2ZW50cyA9IChlOiBhbnkpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5vbk5ld0V2ZW50cyhlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhgW293LWdhbWUtZXZlbnRzXSBTVEFSVGApO1xuXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xuICAgIGF3YWl0IHRoaXMuc2V0UmVxdWlyZWRGZWF0dXJlcygpO1xuXG4gICAgY29uc3QgeyByZXMsIHN0YXR1cyB9ID0gYXdhaXQgdGhpcy5nZXRJbmZvKCk7XG5cbiAgICBpZiAoIHJlcyAmJiBzdGF0dXMgPT09ICdzdWNjZXNzJyApIHtcbiAgICAgIHRoaXMub25JbmZvVXBkYXRlcyh7IGluZm86IHJlcyB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhgW293LWdhbWUtZXZlbnRzXSBTVE9QYCk7XG5cbiAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudHMoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIE9XSG90a2V5cyB7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0SG90a2V5VGV4dChob3RrZXlJZDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgb3ZlcndvbGYuc2V0dGluZ3MuZ2V0SG90S2V5KGhvdGtleUlkLCByZXN1bHQgPT4ge1xuICAgICAgICBpZiAoIXJlc3VsdCB8fCAhcmVzdWx0LnN1Y2Nlc3MgfHwgIXJlc3VsdC5ob3RrZXkpIHtcbiAgICAgICAgICByZXNvbHZlKCdVTkFTU0lHTkVEJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKHJlc3VsdC5ob3RrZXkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG9uSG90a2V5RG93bihob3RrZXlJZDogc3RyaW5nLCBhY3Rpb246IChob3RrZXlSZXN1bHQ6IG92ZXJ3b2xmLnNldHRpbmdzLkhvdEtleVJlc3VsdCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIG92ZXJ3b2xmLnNldHRpbmdzLnJlZ2lzdGVySG90S2V5KGhvdGtleUlkLCBhY3Rpb24pO1xuICB9XG59IiwidHlwZSBHZXRXaW5kb3dTdGF0ZVJlc3VsdCA9IG92ZXJ3b2xmLndpbmRvd3MuR2V0V2luZG93U3RhdGVSZXN1bHQ7XG50eXBlIE93V2luZG93SW5mbyA9IG92ZXJ3b2xmLndpbmRvd3MuV2luZG93SW5mbztcbmV4cG9ydCBjbGFzcyBPV1dpbmRvdyB7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyB8IG51bGw7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmcgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5faWQgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc3RvcmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUoaWQsIHJlc3VsdCA9PiB7XG4gICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW3Jlc3RvcmVdIC0gYW4gZXJyb3Igb2NjdXJyZWQsIHdpbmRvd0lkPSR7aWR9LCByZWFzb249JHtyZXN1bHQuZXJyb3J9YCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbWluaW1pemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5taW5pbWl6ZShpZCwgKCkgPT4geyB9KTtcbiAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBtYXhpbWl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLm1heGltaXplKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGhpZGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5oaWRlKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsb3NlKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTdGF0ZSgpO1xuXG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiZcbiAgICAgICAgKHJlc3VsdC53aW5kb3dfc3RhdGUgIT09ICdjbG9zZWQnKSkge1xuICAgICAgICBhd2FpdCB0aGlzLmludGVybmFsQ2xvc2UoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGRyYWdNb3ZlKGVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgZWxlbS5vbm1vdXNlZG93biA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5kcmFnTW92ZSh0aGlzLl9uYW1lKTtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFdpbmRvd1N0YXRlKCk6IFByb21pc2U8R2V0V2luZG93U3RhdGVSZXN1bHQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8R2V0V2luZG93U3RhdGVSZXN1bHQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRXaW5kb3dTdGF0ZShpZCwgcmVzb2x2ZSk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0Q3VycmVudEluZm8oKTogUHJvbWlzZTxPd1dpbmRvd0luZm8+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8T3dXaW5kb3dJbmZvPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhyZXN1bHQgPT4ge1xuICAgICAgICByZXNvbHZlKHJlc3VsdC53aW5kb3cpO1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBvYnRhaW4oKTogUHJvbWlzZTxPd1dpbmRvd0luZm8gfCBudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNiID0gcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuc3RhdHVzID09PSBcInN1Y2Nlc3NcIiAmJiByZXMud2luZG93ICYmIHJlcy53aW5kb3cuaWQpIHtcbiAgICAgICAgICB0aGlzLl9pZCA9IHJlcy53aW5kb3cuaWQ7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSByZXMud2luZG93Lm5hbWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZShyZXMud2luZG93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9pZCA9IG51bGw7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5fbmFtZSkge1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3coY2IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3ZlcndvbGYud2luZG93cy5vYnRhaW5EZWNsYXJlZFdpbmRvdyh0aGlzLl9uYW1lLCBjYik7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYXNzdXJlT2J0YWluZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQub2J0YWluKCk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbnRlcm5hbENsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG5cbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MuY2xvc2UoaWQsIHJlcyA9PiB7XG5cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuc3VjY2VzcylcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgVGltZXJEZWxlZ2F0ZSB7XG4gIG9uVGltZXIoaWQ/OiBzdHJpbmcpOiB2b2lkO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIFRpbWVyIHtcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHByaXZhdGUgX3RpbWVySWQ6IG51bWJlcnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZ3x1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2RlbGVnYXRlOiBUaW1lckRlbGVnYXRlO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBwdWJsaWMgc3RhdGljIGFzeW5jIHdhaXQoaW50ZXJ2YWxJbk1TOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIGludGVydmFsSW5NUyk7XG4gICAgfSlcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZTogVGltZXJEZWxlZ2F0ZSwgaWQ/OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcHVibGljIHN0YXJ0KGludGVydmFsSW5NUzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wKCk7XG5cbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLl90aW1lcklkID0gPG51bWJlcj5zZXRUaW1lb3V0KHRoaXMuaGFuZGxlVGltZXJFdmVudCwgaW50ZXJ2YWxJbk1TKTtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGltZXJJZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVySWQpO1xuICAgIHRoaXMuX3RpbWVySWQgPSBudWxsO1xuICB9XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHByaXZhdGUgaGFuZGxlVGltZXJFdmVudCA9ICgpID0+IHtcbiAgICB0aGlzLl90aW1lcklkID0gbnVsbDtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5vblRpbWVyKHRoaXMuX2lkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgT1dXaW5kb3cgfSBmcm9tIFwiLi4vb2RrLXRzL293LXdpbmRvd1wiO1xuXG4vLyBBIGJhc2UgY2xhc3MgZm9yIHRoZSBhcHAncyBmb3JlZ3JvdW5kIHdpbmRvd3MuXG4vLyBTZXRzIHRoZSBtb2RhbCBhbmQgZHJhZyBiZWhhdmlvcnMsIHdoaWNoIGFyZSBzaGFyZWQgYWNjcm9zcyB0aGUgZGVza3RvcCBhbmQgaW4tZ2FtZSB3aW5kb3dzLlxuZXhwb3J0IGNsYXNzIEFwcFdpbmRvdyB7XG4gIHByb3RlY3RlZCBjdXJyV2luZG93OiBPV1dpbmRvdztcbiAgcHJvdGVjdGVkIG1haW5XaW5kb3c6IE9XV2luZG93O1xuICBwcm90ZWN0ZWQgbWF4aW1pemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iod2luZG93TmFtZSkge1xuICAgIHRoaXMubWFpbldpbmRvdyA9IG5ldyBPV1dpbmRvdygnYmFja2dyb3VuZCcpO1xuICAgIHRoaXMuY3VycldpbmRvdyA9IG5ldyBPV1dpbmRvdyh3aW5kb3dOYW1lKTtcbiAgICBcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUJ1dHRvbicpO1xuICAgIGNvbnN0IG1heGltaXplQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21heGltaXplQnV0dG9uJyk7XG4gICAgY29uc3QgbWluaW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1pemVCdXR0b24nKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGl0TWluaW1pemVNb2RhbCcpO1xuICAgIGNvbnN0IG1vZGFsQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpO1xuICAgIGNvbnN0IG1vZGFsTWluaW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1pemUnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKTtcbiAgICBcbiAgICB0aGlzLnNldERyYWcoaGVhZGVyKTtcbiAgICBcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuXG4gICAgbW9kYWxDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMubWFpbldpbmRvdy5jbG9zZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIG1pbmltaXplQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyV2luZG93Lm1pbmltaXplKCk7XG4gICAgfSk7XG5cbiAgICBtYXhpbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5tYXhpbWl6ZWQpIHtcbiAgICAgICAgdGhpcy5jdXJyV2luZG93Lm1heGltaXplKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJXaW5kb3cucmVzdG9yZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1heGltaXplZCA9ICF0aGlzLm1heGltaXplZDtcbiAgICB9KTtcblxuICAgIG1vZGFsTWluaW1pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJXaW5kb3cubWluaW1pemUoKTtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0V2luZG93U3RhdGUoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY3VycldpbmRvdy5nZXRXaW5kb3dTdGF0ZSgpO1xuICB9XG4gIFxuICBwcml2YXRlIGFzeW5jIHNldERyYWcoZWxlbSkge1xuICAgIHRoaXMuY3VycldpbmRvdy5kcmFnTW92ZShlbGVtKTtcbiAgfVxufSIsImltcG9ydCB7IEFwcFdpbmRvdyB9IGZyb20gXCIuLi9BcHBXaW5kb3dcIjtcbmltcG9ydCB7IE9XR2FtZXNFdmVudHMgfSBmcm9tIFwiLi4vLi4vb2RrLXRzL293LWdhbWVzLWV2ZW50c1wiO1xuaW1wb3J0IHsgT1dIb3RrZXlzIH0gZnJvbSBcIi4uLy4uL29kay10cy9vdy1ob3RrZXlzXCI7XG5pbXBvcnQgeyBpbnRlcmVzdGluZ0ZlYXR1cmVzLCBob3RrZXlzLCB3aW5kb3dOYW1lcyB9IGZyb20gXCIuLi8uLi9jb25zdHNcIjtcbmltcG9ydCBXaW5kb3dTdGF0ZSA9IG92ZXJ3b2xmLndpbmRvd3MuV2luZG93U3RhdGU7XG5cbi8vIFRoZSB3aW5kb3cgZGlzcGxheWVkIGluLWdhbWUgd2hpbGUgYSBGb3J0bml0ZSBnYW1lIGlzIHJ1bm5pbmcuXG4vLyBJdCBsaXN0ZW5zIHRvIGFsbCBpbmZvIGV2ZW50cyBhbmQgdG8gdGhlIGdhbWUgZXZlbnRzIGxpc3RlZCBpbiB0aGUgY29uc3RzLnRzIGZpbGVcbi8vIGFuZCB3cml0ZXMgdGhlbSB0byB0aGUgcmVsZXZhbnQgbG9nIHVzaW5nIDxwcmU+IHRhZ3MuXG4vLyBUaGUgd2luZG93IGFsc28gc2V0cyB1cCBDdHJsK0YgYXMgdGhlIG1pbmltaXplL3Jlc3RvcmUgaG90a2V5LlxuLy8gTGlrZSB0aGUgYmFja2dyb3VuZCB3aW5kb3csIGl0IGFsc28gaW1wbGVtZW50cyB0aGUgU2luZ2xldG9uIGRlc2lnbiBwYXR0ZXJuLlxuY2xhc3MgSW5HYW1lIGV4dGVuZHMgQXBwV2luZG93IHtcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJbkdhbWU7XG4gIHByaXZhdGUgX2ZvcnRuaXRlR2FtZUV2ZW50c0xpc3RlbmVyOiBPV0dhbWVzRXZlbnRzO1xuICBwcml2YXRlIF9ldmVudHNMb2c6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9pbmZvTG9nOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHdpbmRvd05hbWVzLmluR2FtZSk7XG5cbiAgICB0aGlzLl9ldmVudHNMb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlbnRzTG9nJyk7XG4gICAgdGhpcy5faW5mb0xvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvTG9nJyk7XG5cbiAgICB0aGlzLnNldFRvZ2dsZUhvdGtleUJlaGF2aW9yKCk7XG4gICAgdGhpcy5zZXRUb2dnbGVIb3RrZXlUZXh0KCk7XG5cbiAgICB0aGlzLl9mb3J0bml0ZUdhbWVFdmVudHNMaXN0ZW5lciA9IG5ldyBPV0dhbWVzRXZlbnRzKHtcbiAgICAgIG9uSW5mb1VwZGF0ZXM6IHRoaXMub25JbmZvVXBkYXRlcy5iaW5kKHRoaXMpLFxuICAgICAgb25OZXdFdmVudHM6IHRoaXMub25OZXdFdmVudHMuYmluZCh0aGlzKVxuICAgIH0sXG4gICAgICBpbnRlcmVzdGluZ0ZlYXR1cmVzKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xuICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgSW5HYW1lKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG5cbiAgcHVibGljIHJ1bigpIHtcbiAgICB0aGlzLl9mb3J0bml0ZUdhbWVFdmVudHNMaXN0ZW5lci5zdGFydCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbkluZm9VcGRhdGVzKGluZm8pIHtcbiAgICB0aGlzLmxvZ0xpbmUodGhpcy5faW5mb0xvZywgaW5mbywgZmFsc2UpO1xuICB9XG5cbiAgLy8gU3BlY2lhbCBldmVudHMgd2lsbCBiZSBoaWdobGlnaHRlZCBpbiB0aGUgZXZlbnQgbG9nXG4gIHByaXZhdGUgb25OZXdFdmVudHMoZSkge1xuICAgIGNvbnN0IHNob3VsZEhpZ2hsaWdodCA9IGUuZXZlbnRzLnNvbWUoZXZlbnQgPT4ge1xuICAgICAgcmV0dXJuIGV2ZW50Lm5hbWUgPT09ICdraWxsJyB8fFxuICAgICAgICBldmVudC5uYW1lID09PSAnZGVhdGgnIHx8XG4gICAgICAgIGV2ZW50Lm5hbWUgPT09ICdhc3Npc3QnIHx8XG4gICAgICAgIGV2ZW50Lm5hbWUgPT09ICdsZXZlbCdcbiAgICB9KTtcbiAgICB0aGlzLmxvZ0xpbmUodGhpcy5fZXZlbnRzTG9nLCBlLCBzaG91bGRIaWdobGlnaHQpO1xuICB9XG5cbiAgLy8gRGlzcGxheXMgdGhlIHRvZ2dsZSBtaW5pbWl6ZS9yZXN0b3JlIGhvdGtleSBpbiB0aGUgd2luZG93IGhlYWRlclxuICBwcml2YXRlIGFzeW5jIHNldFRvZ2dsZUhvdGtleVRleHQoKSB7XG4gICAgY29uc3QgaG90a2V5VGV4dCA9IGF3YWl0IE9XSG90a2V5cy5nZXRIb3RrZXlUZXh0KGhvdGtleXMudG9nZ2xlKTtcbiAgICBjb25zdCBob3RrZXlFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdGtleScpO1xuICAgIGhvdGtleUVsZW0udGV4dENvbnRlbnQgPSBob3RrZXlUZXh0O1xuICB9XG5cbiAgLy8gU2V0cyB0b2dnbGVJbkdhbWVXaW5kb3cgYXMgdGhlIGJlaGF2aW9yIGZvciB0aGUgQ3RybCtGIGhvdGtleVxuICBwcml2YXRlIGFzeW5jIHNldFRvZ2dsZUhvdGtleUJlaGF2aW9yKCkge1xuICAgIGNvbnN0IHRvZ2dsZUluR2FtZVdpbmRvdyA9IGFzeW5jIGhvdGtleVJlc3VsdCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgcHJlc3NlZCBob3RrZXkgZm9yICR7aG90a2V5UmVzdWx0LmZlYXR1cmVJZH1gKTtcbiAgICAgIGNvbnN0IGluR2FtZVN0YXRlID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTdGF0ZSgpO1xuXG4gICAgICBpZiAoaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5OT1JNQUwgfHxcbiAgICAgICAgaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5NQVhJTUlaRUQpIHtcbiAgICAgICAgdGhpcy5jdXJyV2luZG93Lm1pbmltaXplKCk7XG4gICAgICB9IGVsc2UgaWYgKGluR2FtZVN0YXRlLndpbmRvd19zdGF0ZSA9PT0gV2luZG93U3RhdGUuTUlOSU1JWkVEIHx8XG4gICAgICAgIGluR2FtZVN0YXRlLndpbmRvd19zdGF0ZSA9PT0gV2luZG93U3RhdGUuQ0xPU0VEKSB7XG4gICAgICAgIHRoaXMuY3VycldpbmRvdy5yZXN0b3JlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgT1dIb3RrZXlzLm9uSG90a2V5RG93bihob3RrZXlzLnRvZ2dsZSwgdG9nZ2xlSW5HYW1lV2luZG93KTtcbiAgfVxuXG4gIC8vIEFwcGVuZHMgYSBuZXcgbGluZSB0byB0aGUgc3BlY2lmaWVkIGxvZ1xuICBwcml2YXRlIGxvZ0xpbmUobG9nOiBIVE1MRWxlbWVudCwgZGF0YSwgaGlnaGxpZ2h0KSB7XG4gICAgY29uc29sZS5sb2coYCR7bG9nLmlkfTpgKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICAgbGluZS50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG4gICAgaWYgKGhpZ2hsaWdodCkge1xuICAgICAgbGluZS5jbGFzc05hbWUgPSAnaGlnaGxpZ2h0JztcbiAgICB9XG5cbiAgICBjb25zdCBzaG91bGRBdXRvU2Nyb2xsID0gKGxvZy5zY3JvbGxUb3AgKyBsb2cub2Zmc2V0SGVpZ2h0KSA+IChsb2cuc2Nyb2xsSGVpZ2h0IC0gMTApO1xuXG4gICAgbG9nLmFwcGVuZENoaWxkKGxpbmUpO1xuXG4gICAgaWYgKHNob3VsZEF1dG9TY3JvbGwpIHtcbiAgICAgIGxvZy5zY3JvbGxUb3AgPSBsb2cuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cbiAgfVxufVxuXG5JbkdhbWUuaW5zdGFuY2UoKS5ydW4oKTsiXSwic291cmNlUm9vdCI6IiJ9