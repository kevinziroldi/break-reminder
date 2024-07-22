import {Hours, Minutes, TimerActive, ToggleTimer, SetTimerDuration, RestartTimer} from "../wailsjs/go/backend/Backend";
import {stringifyTime, getHours, getMinutes} from "./utils.js";

(function() {

    // DOM elements
    var timerSwitch = document.getElementById("timer_switch").querySelector("input");
    var timerDuration = document.getElementById("timer_duration");
    var restartButton = document.getElementById("restart_timer");

    // app initialisation
    window.addEventListener("DOMContentLoaded", () => {
        // initialise timer switch
        TimerActive().then((result) => {
            timerSwitch.checked = result
        });

        // initialise timer duration
        Hours().then((result) => {
            var hours = result
            Minutes().then((minutes) => {
                timerDuration.value = stringifyTime(hours, minutes)
            })
        })

        // start timer automatically
        // TODO
    });

    // timer switch toggle
    timerSwitch.addEventListener("click", () => {
        ToggleTimer().then();
    });

    // timer duration change
    timerDuration.addEventListener("input", (event) => {
        var hours = getHours(event.target.value);
        var minutes = getMinutes(event.target.value);
        SetTimerDuration(hours, minutes).then()
    });

    // restart timer
    restartButton.addEventListener("click", () => {
        RestartTimer().then();
    });

})();
