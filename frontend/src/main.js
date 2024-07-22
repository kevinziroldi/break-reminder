import {Hours, Minutes, TimerActive, ToggleTimer, SetTimerDuration, StartTimer} from "../wailsjs/go/backend/Backend";
import {stringifyTime, getHours, getMinutes, getElapsedTime} from "./utils.js";
import {EventsOn} from "../wailsjs/runtime";

(function() {

    // DOM elements
    var timerSwitch = document.getElementById("timer_switch").querySelector("input");
    var timerDuration = document.getElementById("timer_duration");
    var restartButton = document.getElementById("restart_timer");
    var elapsedTime = document.getElementById("elapsed_time");
    var breakMessage = document.getElementById("break_message");

    var startTime;

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

        // timer started event
        EventsOn("timerStarted", () => {
            startTime = new Date()
            elapsedTime.classList.remove("hidden_element");
            setInterval(() => {
                elapsedTime.innerHTML = getElapsedTime(startTime);
            }, 1000);
        })

        // timer expiration
        EventsOn("timerExpired", () => {
            // hide elapsed time
            elapsedTime.classList.add("hidden_element");

            // display restart button
            var timerActive, hours, minutes;
            TimerActive().then((result) => {
                timerActive = result;
                Hours().then((result) => {
                    hours = result;
                    Minutes().then((result) => {
                        minutes = result
                        if(timerActive && !(hours === 0 && minutes === 0)) {
                            restartButton.classList.remove("hidden_element")
                        }else {
                            restartButton.classList.add("hidden_element")
                        }
                    });
                });
            });
        });

        // break time event (a timer can expire before finishing)
        EventsOn("breakTime", () => {
           breakMessage.classList.remove("hidden_element");
        });
    });

    // timer switch toggle
    timerSwitch.addEventListener("click", () => {
        ToggleTimer().then();
        breakMessage.classList.add("hidden_element");
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
        StartTimer().then();
        breakMessage.classList.add("hidden_element");
    });

})();
