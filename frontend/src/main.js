import {Hours, Minutes, TimerActive, ToggleTimer, SetTimerDuration, RestartTimer} from "../wailsjs/go/backend/Backend";
import {stringifyTime, getHours, getMinutes} from "./utils.js";
import {EventsOn} from "../wailsjs/runtime";

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
        RestartTimer().then()

        // timer expiration
        EventsOn("timerExpired", () => {
            var timerActive, hours, minutes;
            TimerActive().then((result) => {
                timerActive = result;
                Hours().then((result) => {
                    hours = result;
                    Minutes().then((result) => {
                        minutes = result

                        // display restart button
                        if(timerActive && !(hours === 0 && minutes === 0)) {
                            restartButton.classList.remove("hidden_element")
                        }else {
                            restartButton.classList.add("hidden_element")
                        }
                    });
                });
            });
        });

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
        restartButton.classList.add("hidden_element")
        RestartTimer().then();
    });

})();
