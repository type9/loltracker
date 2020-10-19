define(["../SampleAppView.js"], function(SampleAppView) {
  class SpellTrackerView extends SampleAppView {
    constructor() {
      super();
      this._hotkey = document.getElementById("hotkey");
      this._setCooldown = _setCooldown.bind(this);
      this._getCooldownLength = _getCooldownLength.bind(this);
      this._calcSecMinLeft = _calcSecMinLeft.bind(this);
      this._bindButtonEvents = _bindButtonEvents.bind(this);
      this._updateTimers = _updateTimers.bind(this);

      this.cooldowns ={
        sum1: {
          spell1: null,
          spell2: null
        },
        sum2: {
          spell1: null,
          spell2: null
        },
        sum3: {
          spell1: null,
          spell2: null
        },
        sum4: {
          spell1: null,
          spell2: null
        },
        sum5: {
          spell1: null,
          spell2: null
        },
      }

      this._bindButtonEvents();
      this._updateTimers();
    }

    // -- Public --



    // -- Private --
    _bindButtonEvents(){ //binds buttons to set the time they were used
      for(sum = 1; sum <= 5; sum++){
        for(spell = 1; spell <= 2; spell++){
          document.getElementById("sum" + sum + "-spell" + spell).addEventListener("click", this._setCooldown(sum, spell));
        }
      }
    }

    _updateTimers(){ //updates timer elements once a second
      setInterval(() => {
        for(sum = 1; sum <= 5; sum++){
          for(spell = 1; spell <= 2; spell++){
            let timer = document.getElementById("sum" + sum + "-spell" + spell + "-timer");
            let timeLeft = this._calcSecMinLeft(this.cooldowns["sum" + sum]["spell" + spell], this._getCooldownLength(spell));
            if(timeLeft){
              timer.innerHTML = time_Left;
            } else{
              timer.innerHTML = "Ready";
            }
          }
        }
      }, 1000);
    }

    _setCooldown(sum, spell){ //sets the time used to the current time
      this.cooldowns["sum" + sum]["spell" + spell] = Date.now();
    }

    _getCooldownLength(spell){
      let cooldownLength = 0;
      switch(spell){
        case 1: //flash 30s
          cooldownLength = 300000;
        case 2: //teleport 45s TODO: Make cooldown function of player level (it becomes shorter with higher level)
          cooldownLength = 450000;
      }
      return cooldownLength;
    }

    _calcSecMinLeft(useTime, cooldownLength){ //calculates time left from when used. returns false if time is 0, negative, or data incomplete
      if(useTime){
        let milli = cooldownLength - (Date.now() - useTime);
        if(milli <= 0){
          return False;
        }
        let min = Math.floor((milli % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((milli % (1000 * 60)) / 1000);
        
        return min + ":" + sec;
      } else {
        return False;
      }
    }

    // _copyEventsLog() {
    //   this._copyLog(this._eventsLog);
    // }

    // _copyInfoLog() {
    //   this._copyLog(this._infoLog);
    // }

    // // Copy text from log
    // _copyLog(log) {
    //   // Get text from all span children
    //   const nodes = log.childNodes;
    //   let text = "";
    //   for (let node of nodes) {
    //     if (node.tagName === "P") {
    //       text += node.innerText + "\n";
    //     }
    //   }

    //   // Create temporary textarea to copy to clipboard from
    //   const textarea = document.createElement("textarea");
    //   textarea.value = text;
    //   textarea.setAttribute("readonly", "");
    //   textarea.style = { position: "absolute", left: "-9999px" };
    //   document.body.appendChild(textarea);
    //   textarea.select();
    //   document.execCommand("copy");
    //   document.body.removeChild(textarea);
    // }

    // // Add a line to a log
    // _logLine(log, string, isHighlight) {
    //   const line = document.createElement("p");
    //   // Check if scroll is near bottom
    //   const autoScrollOn =
    //     log.scrollTop + log.offsetHeight > log.scrollHeight - 10;

    //   if (isHighlight) {
    //     line.className = "highlight";
    //   }

    //   line.textContent = string;

    //   log.appendChild(line);

    //   if (autoScrollOn) {
    //     log.scrollTop = log.scrollHeight;
    //   }
    // }
  }

  return SpellTrackerView;
});
