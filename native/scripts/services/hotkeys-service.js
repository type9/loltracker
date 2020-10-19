define(['../constants/hotkeys-ids.js'], function (HOTKEYS) {

  /**
   * get a hotkey combination by hotkey id
   * @param hotkeyId
   * @param callback
   * @private
   */
  function _getHotkey(hotkeyId, callback) {
    overwolf.settings.getHotKey(hotkeyId, function (result) {
      if (!result || result.status === "error" || !result.hotkey) {
        setTimeout(function () {
          _getHotkey(hotkeyId, callback);
        }, 2000);
      } else {
        callback(result.hotkey);
      }
    });
  }

  /**
   * set custom action for a hotkey id
   * @param action
   * @private
   */
  function _setHotkey(action) {
    overwolf.settings.hotkeys.onHold.addListener(action);
  }

  function getHoldHotkey() {
    return new Promise((resolve, reject) => {
      _getHotkey(HOTKEYS.HOLD, function (result) {
        resolve(result);
      });
    });
  }

  function setHoldHotkey(action) {
    _setHotkey(action);
  }

  function addHotkeyChangeListener(listener) {
    overwolf.settings.OnHotKeyChanged.addListener(listener);
  }

  return {
    getHoldHotkey,
    setHoldHotkey,
    addHotkeyChangeListener
  };
});