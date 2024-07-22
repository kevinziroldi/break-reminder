export function stringifyTime(hours, minutes) {
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

    return result
}

export function getHours(stringifiedTime) {
    var [hours, minutes] = stringifiedTime.split(':');
    return Number(hours)
}

export function getMinutes(stringifiedTime) {
    var [hours, minutes] = stringifiedTime.split(':');
    return Number(minutes)
}