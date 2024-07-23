import {Hours, Minutes, Seconds, SetTimerDuration, StartTimer, StopTimer} from "../wailsjs/go/backend/Backend";
import {stringifyTime, getHours, getMinutes, getElapsedTime, getSeconds} from "./utils.js";
import {EventsOn} from "../wailsjs/runtime";

(function() {

    // DOM elements
    var timerDuration = document.getElementById("timer_duration");
    var elapsedTime = document.getElementById("elapsed_time");
    var breakMessage = document.getElementById("break_message");
    var startButton = document.getElementById("start_timer");
    var stopButton = document.getElementById("stop_timer");

    var startTime;

    // app initialisation
    window.addEventListener("DOMContentLoaded", () => {

        // initialise default timer duration
        Hours().then((hours) => {
            Minutes().then((minutes) => {
                Seconds().then((seconds) => {
                    timerDuration.value = stringifyTime(hours, minutes, seconds)
                });
            });
        });

        // break time event
        EventsOn("breakTime", () => {
            // hide elapsed time and stop button
            elapsedTime.classList.add("hidden_element");
            stopButton.classList.add("hidden_element");

            // reveal timer duration and start button
            timerDuration.classList.remove("hidden_element");
            displayStartButton(startButton);

            // reveal break message
            breakMessage.classList.remove("hidden_element");
        });
    });

    // timer duration change
    timerDuration.addEventListener("input", (event) => {
        var hours = getHours(event.target.value);
        var minutes = getMinutes(event.target.value);
        var seconds = getSeconds(event.target.value);
        SetTimerDuration(hours, minutes, seconds).then()

        // if duration was 00:00, display button
        displayStartButton(startButton);
    });

    // start timer button
    startButton.addEventListener("click", () => {
        // hide timer duration and start button
        timerDuration.classList.add("hidden_element");
        startButton.classList.add("hidden_element")

        // if timer expired, hide break message
        breakMessage.classList.add("hidden_element");

        // start timer
        StartTimer().then();
        // manage elapsed time
        elapsedTime.innerHTML = "00:00:00";
        startTime = new Date()
        setInterval(() => {
            elapsedTime.innerHTML = getElapsedTime(startTime);
        }, 1000);

        // reveal elapsed time and stop button
        elapsedTime.classList.remove("hidden_element");
        stopButton.classList.remove("hidden_element");
    });

    // stop timer button
    stopButton.addEventListener("click", () => {
        // hide elapsed time and stop button
        elapsedTime.classList.add("hidden_element");
        stopButton.classList.add("hidden_element");

        // stop timer
        StopTimer().then()

        // reveal timer duration and start button
        timerDuration.classList.remove("hidden_element");
        displayStartButton(startButton);
    });

})();

function displayStartButton(startButton) {
    Hours().then((hours) => {
        Minutes().then((minutes) => {
            Seconds().then((seconds) => {
                if(!(hours === 0 && minutes === 0 && seconds === 0)) {
                    startButton.classList.remove("hidden_element")
                }else {
                    startButton.classList.add("hidden_element")
                }
            })
        });
    });
}