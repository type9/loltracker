define([
  '../../windows/spell-tracker/spell-tracker-view.js',
  '../../scripts/services/hotkeys-service.js'
], function (
  SpellTrackerView,
  HotkeysService
  ) {

  class SpellTrackerController {

    constructor() {
      this.spellTrackerView = new SpellTrackerView();

      // this._gameEventHandler = this._gameEventHandler.bind(this);
      // this._infoUpdateHandler = this._infoUpdateHandler.bind(this);
      this._copyTextEventHandler = this._copyTextEventHandler.bind(this);
      this._eventListener = this._eventListener.bind(this);
      this._updateHotkey = this._updateHotkey.bind(this);
    }

    run() {
      // listen to events from the event bus from the main window,
      // the callback will be run in the context of the current window
      let mainWindow = overwolf.windows.getMainWindow();
      mainWindow.ow_eventBus.addListener(this._copyTextEventHandler);

      // Update hotkey view and listen to changes:
      this._updateHotkey();
      HotkeysService.addHotkeyChangeListener(this._updateHotkey);
    }

    async _updateHotkey() {
      const hotkey = await HotkeysService.getHoldHotkey();
      // this.spellTrackerView.updateHotkey(hotkey);
    }

    _eventListener(eventName, data) {
      switch (eventName) {
        case 'copy_tracker_text': {
          this._copyTextEventHandler(event);
          break;
        }
      }
    }

    _copyTextEventHandler(event){
      console.log("copyText handler triggered")
      this.spellTrackerView.copyText();
    }

    // Logs events
  //   _gameEventHandler(event) {
  //     let isHightlight = false;
  //     switch (event.name) {
  //       case 'kill':
  //       case 'death':
  //       case 'matchStart':
  //       case 'matchEnd':
  //         isHightlight = true;
  //     }
  //     this.inGameView.logEvent(JSON.stringify(event), isHightlight);
  //   }

    // Logs info updates
    // _infoUpdateHandler(infoUpdate) {
    //   this.inGameView.logInfoUpdate(JSON.stringify(infoUpdate), false);
    // }
  }

  return SpellTrackerController;
});
