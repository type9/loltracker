define(["../SampleAppView.js"], function(SampleAppView) {
  class SpellTrackerView extends SampleAppView {
    constructor() {
      super();
      this._hotkey = document.getElementById("hotkey");
      this._getCooldownLength = this._getCooldownLength.bind(this);
      this._calcSecMinLeft = this._calcSecMinLeft.bind(this);
      this._calcTimeUp = this._calcTimeUp.bind(this);
      this._bindButtonEvents = this._bindButtonEvents.bind(this);
      this._updateTimers = this._updateTimers.bind(this);
      this._getTrackerText = this._getTrackerText.bind(this);
      this._roleMap = this._roleMap.bind(this);
      this.copyText = this.copyText.bind(this);

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
      };

      this.abilities ={
        sum1: {
          spell1: "flash",
          spell2: "tp"
        },
        sum2: {
          spell1: "flash",
          spell2: "tp"
        },
        sum3: {
          spell1: "flash",
          spell2: "tp"
        },
        sum4: {
          spell1: "flash",
          spell2: "tp"
        },
        sum5: {
          spell1: "flash",
          spell2: "tp"
        },
      };

      this._bindButtonEvents();
      this._updateTimers();
    }

    // -- Public --
    copyText(){
      const textarea = document.createElement("textarea");
      textarea.value = this._getTrackerText;
      textarea.setAttribute("readonly", "");
      textarea.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    // -- Private --
    _getTrackerText(){
      let text = "";
      for(let sum = 1; sum <= 5; sum++){
        let added = false;
        let roleText = "";
        for(let spell = 1; spell <= 2; spell++){
          if(added === false){
            roleText = this._roleMap(sum) + " ";
            added = true;
          }
          let timeUp = this._calcTimeUp(this.cooldowns["sum" + sum]["spell" + spell], this._getCooldownLength(spell));
          let ability = this.abilities["sum" + sum]["spell" + spell];
          let abilityText = `${ability}:${timeUp} `;
          roleText = roleText + abilityText;
        }
        if(added === true){
          roleText = roleText + "| ";
          text = text + roleText;
        }
      }
      return text;
    }

    _bindButtonEvents(){ //binds buttons to set the time they were used
      for(let sum = 1; sum <= 5; sum++){
        for(let spell = 1; spell <= 2; spell++){
          document.getElementById("sum" + sum + "-spell" + spell).addEventListener("click", () => {
            //sets the time used to the current time
            this.cooldowns["sum" + sum]["spell" + spell] = Date.now();
          });
        }
      }
    }

    _updateTimers(){ //updates timer elements once a second
      setInterval(() => {
        for(let sum = 1; sum <= 5; sum++){
          for(let spell = 1; spell <= 2; spell++){
            let timer = document.getElementById("sum" + sum + "-spell" + spell + "-timer");
            let icon = document.getElementById("sum" + sum + "-spell" + spell + "-icon");
            let timeLeft = this._calcSecMinLeft(this.cooldowns["sum" + sum]["spell" + spell], this._getCooldownLength(spell));
            if(timeLeft){
              timer.innerHTML = timeLeft; // set timer number
              icon.style.opacity = "0.3"; //set lower opacity on spell icon
            } else{
              timer.innerHTML = " ";
              icon.style.opacity = "1"; //bring back to full opacity on spell icon
            }
          }
        }
      }, 1000);
    }

    _getCooldownLength(spell){
      let cooldownLength = 0;
      switch(spell){
        case 1: //flash 30s
          cooldownLength = 300000;
          break;
        case 2: //teleport 45s TODO: Make cooldown function of player level (it becomes shorter with higher level)
          cooldownLength = 450000;
          break;
      }
      return cooldownLength;
    }

    _calcSecMinLeft(useTime, cooldownLength){ //calculates time left from when used. returns false if time is 0, negative, or data incomplete
      if(useTime){
        let milli = cooldownLength - (Date.now() - useTime);
        if(milli <= 0){
          return false;
        }
        let min = Math.floor((milli % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((milli % (1000 * 60)) / 1000);

        if(sec < 10){
          sec = "0" + sec;
        }

        return min + ":" + sec;
      } else {
        return false;
      }
    }

    _calcTimeUp(useTime, cooldownLength){
      if(useTime){
        let milli = Date.now() + (cooldownLength - (Date.now() - useTime));
        if(milli <= Date.now()){
          return false;
        }
        let min = Math.floor((milli % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((milli % (1000 * 60)) / 1000);

        if(sec < 10){
          sec = "0" + sec;
        }

        return min + ":" + sec;
      } else {
        return false;
      }
    }

    _roleMap(sum){
      switch(sum){
        case 1:
          return "TOP";
        case 2:
          return "JG";
        case 3:
          return "MID";
        case 4:
          return "AD";
        case 5:
          return "SUP";
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
