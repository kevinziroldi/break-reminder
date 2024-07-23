// function used to create a string in format "HH:MM" from hours and minutes
export function stringifyTime(hours, minutes, seconds) {
    var result

    // hours
    if(hours < 10)
        result = "0" + hours;
    else
        result = hours.toString()

    result += ":"

    // minutes
    if(minutes < 10)
        result += "0" + minutes.toString();
    else
        result += minutes.toString()

    result += ":"

    // seconds
    if(seconds < 10)
        result += "0" + seconds.toString();
    else
        result += seconds.toString()

    return result
}

// get hours from a time in stringified format "HH:MM:SS"
export function getHours(stringifiedTime) {
    var [hours, minutes, seconds] = stringifiedTime.split(':');
    return Number(hours)
}

// get minutes from a time in stringified format "HH:MM:SS"
export function getMinutes(stringifiedTime) {
    var [hours, minutes, seconds] = stringifiedTime.split(':');
    return Number(minutes)
}

// get seconds from a time in stringified format "HH:MM:SS"
export function getSeconds(stringifiedTime) {
    var [hours, minutes, seconds] = stringifiedTime.split(':');
    return Number(seconds)
}

// function that computes elapsed time
export function getElapsedTime(startTime) {
    var currentTime = new Date();

    // time difference in milliseconds
    var timeDifference = currentTime.getTime() - startTime.getTime();
    // time difference in seconds
    timeDifference = timeDifference / 1000;
    var seconds = Math.floor(timeDifference % 60);
    var secondsAsString = ""
    if (seconds < 10)
        secondsAsString += "0" + seconds.toString();
    else
        secondsAsString += seconds.toString()

    // time difference in minutes
    timeDifference = Math.floor(timeDifference / 60);
    var minutes = timeDifference % 60;
    var minutesAsString = "";
    if (minutes < 10)
        minutesAsString += "0" + minutes.toString();
    else
        minutesAsString += minutes.toString()

    // time difference in hours
    timeDifference = Math.floor(timeDifference / 60);
    var hours = timeDifference
    var hoursAsString = "";
    if (hours < 10) {
        hoursAsString = "0" + hours.toString();
    }else {
        hoursAsString += hours.toString()
    }

    return hoursAsString + ":" + minutesAsString + ":" + secondsAsString;
}

export function sendNotification(content) {
    if (Notification.permission === "granted") {
        new Notification("Break Reminder", {
            body: "Time for a break!"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Break Reminder", {
                    body: "Time for a break!"
                });
            }
        });
    }
}