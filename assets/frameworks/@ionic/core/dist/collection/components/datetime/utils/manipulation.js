/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { isAfter, isBefore, isSameDay } from "./comparison";
import { getNumDaysInMonth } from "./helpers";
import { clampDate, parseAmPm } from "./parse";
const twoDigit = (val) => {
    return ('0' + (val !== undefined ? Math.abs(val) : '0')).slice(-2);
};
const fourDigit = (val) => {
    return ('000' + (val !== undefined ? Math.abs(val) : '0')).slice(-4);
};
export function convertDataToISO(data) {
    if (Array.isArray(data)) {
        return data.map((parts) => convertDataToISO(parts));
    }
    // https://www.w3.org/TR/NOTE-datetime
    let rtn = '';
    if (data.year !== undefined) {
        // YYYY
        rtn = fourDigit(data.year);
        if (data.month !== undefined) {
            // YYYY-MM
            rtn += '-' + twoDigit(data.month);
            if (data.day !== undefined) {
                // YYYY-MM-DD
                rtn += '-' + twoDigit(data.day);
                if (data.hour !== undefined) {
                    // YYYY-MM-DDTHH:mm:SS
                    rtn += `T${twoDigit(data.hour)}:${twoDigit(data.minute)}:00`;
                }
            }
        }
    }
    else if (data.hour !== undefined) {
        // HH:mm
        rtn = twoDigit(data.hour) + ':' + twoDigit(data.minute);
    }
    return rtn;
}
/**
 * Converts an 12 hour value to 24 hours.
 */
export const convert12HourTo24Hour = (hour, ampm) => {
    if (ampm === undefined) {
        return hour;
    }
    /**
     * If AM and 12am
     * then return 00:00.
     * Otherwise just return
     * the hour since it is
     * already in 24 hour format.
     */
    if (ampm === 'am') {
        if (hour === 12) {
            return 0;
        }
        return hour;
    }
    /**
     * If PM and 12pm
     * just return 12:00
     * since it is already
     * in 24 hour format.
     * Otherwise add 12 hours
     * to the time.
     */
    if (hour === 12) {
        return 12;
    }
    return hour + 12;
};
export const getStartOfWeek = (refParts) => {
    const { dayOfWeek } = refParts;
    if (dayOfWeek === null || dayOfWeek === undefined) {
        throw new Error('No day of week provided');
    }
    return subtractDays(refParts, dayOfWeek);
};
export const getEndOfWeek = (refParts) => {
    const { dayOfWeek } = refParts;
    if (dayOfWeek === null || dayOfWeek === undefined) {
        throw new Error('No day of week provided');
    }
    return addDays(refParts, 6 - dayOfWeek);
};
export const getNextDay = (refParts) => {
    return addDays(refParts, 1);
};
export const getPreviousDay = (refParts) => {
    return subtractDays(refParts, 1);
};
export const getPreviousWeek = (refParts) => {
    return subtractDays(refParts, 7);
};
export const getNextWeek = (refParts) => {
    return addDays(refParts, 7);
};
/**
 * Given datetime parts, subtract
 * numDays from the date.
 * Returns a new DatetimeParts object
 * Currently can only go backward at most 1 month.
 */
export const subtractDays = (refParts, numDays) => {
    const { month, day, year } = refParts;
    if (day === null) {
        throw new Error('No day provided');
    }
    const workingParts = {
        month,
        day,
        year,
    };
    workingParts.day = day - numDays;
    /**
     * If wrapping to previous month
     * update days and decrement month
     */
    if (workingParts.day < 1) {
        workingParts.month -= 1;
    }
    /**
     * If moving to previous year, reset
     * month to December and decrement year
     */
    if (workingParts.month < 1) {
        workingParts.month = 12;
        workingParts.year -= 1;
    }
    /**
     * Determine how many days are in the current
     * month
     */
    if (workingParts.day < 1) {
        const daysInMonth = getNumDaysInMonth(workingParts.month, workingParts.year);
        /**
         * Take num days in month and add the
         * number of underflow days. This number will
         * be negative.
         * Example: 1 week before Jan 2, 2021 is
         * December 26, 2021 so:
         * 2 - 7 = -5
         * 31 + (-5) = 26
         */
        workingParts.day = daysInMonth + workingParts.day;
    }
    return workingParts;
};
/**
 * Given datetime parts, add
 * numDays to the date.
 * Returns a new DatetimeParts object
 * Currently can only go forward at most 1 month.
 */
export const addDays = (refParts, numDays) => {
    const { month, day, year } = refParts;
    if (day === null) {
        throw new Error('No day provided');
    }
    const workingParts = {
        month,
        day,
        year,
    };
    const daysInMonth = getNumDaysInMonth(month, year);
    workingParts.day = day + numDays;
    /**
     * If wrapping to next month
     * update days and increment month
     */
    if (workingParts.day > daysInMonth) {
        workingParts.day -= daysInMonth;
        workingParts.month += 1;
    }
    /**
     * If moving to next year, reset
     * month to January and increment year
     */
    if (workingParts.month > 12) {
        workingParts.month = 1;
        workingParts.year += 1;
    }
    return workingParts;
};
/**
 * Given DatetimeParts, generate the previous month.
 */
export const getPreviousMonth = (refParts) => {
    /**
     * If current month is January, wrap backwards
     *  to December of the previous year.
     */
    const month = refParts.month === 1 ? 12 : refParts.month - 1;
    const year = refParts.month === 1 ? refParts.year - 1 : refParts.year;
    const numDaysInMonth = getNumDaysInMonth(month, year);
    const day = numDaysInMonth < refParts.day ? numDaysInMonth : refParts.day;
    return { month, year, day };
};
/**
 * Given DatetimeParts, generate the next month.
 */
export const getNextMonth = (refParts) => {
    /**
     * If current month is December, wrap forwards
     *  to January of the next year.
     */
    const month = refParts.month === 12 ? 1 : refParts.month + 1;
    const year = refParts.month === 12 ? refParts.year + 1 : refParts.year;
    const numDaysInMonth = getNumDaysInMonth(month, year);
    const day = numDaysInMonth < refParts.day ? numDaysInMonth : refParts.day;
    return { month, year, day };
};
const changeYear = (refParts, yearDelta) => {
    const month = refParts.month;
    const year = refParts.year + yearDelta;
    const numDaysInMonth = getNumDaysInMonth(month, year);
    const day = numDaysInMonth < refParts.day ? numDaysInMonth : refParts.day;
    return { month, year, day };
};
/**
 * Given DatetimeParts, generate the previous year.
 */
export const getPreviousYear = (refParts) => {
    return changeYear(refParts, -1);
};
/**
 * Given DatetimeParts, generate the next year.
 */
export const getNextYear = (refParts) => {
    return changeYear(refParts, 1);
};
/**
 * If PM, then internal value should
 * be converted to 24-hr time.
 * Does not apply when public
 * values are already 24-hr time.
 */
export const getInternalHourValue = (hour, use24Hour, ampm) => {
    if (use24Hour) {
        return hour;
    }
    return convert12HourTo24Hour(hour, ampm);
};
/**
 * Unless otherwise stated, all month values are
 * 1 indexed instead of the typical 0 index in JS Date.
 * Example:
 *   January = Month 0 when using JS Date
 *   January = Month 1 when using this datetime util
 */
/**
 * Given the current datetime parts and a new AM/PM value
 * calculate what the hour should be in 24-hour time format.
 * Used when toggling the AM/PM segment since we store our hours
 * in 24-hour time format internally.
 */
export const calculateHourFromAMPM = (currentParts, newAMPM) => {
    const { ampm: currentAMPM, hour } = currentParts;
    let newHour = hour;
    /**
     * If going from AM --> PM, need to update the
     *
     */
    if (currentAMPM === 'am' && newAMPM === 'pm') {
        newHour = convert12HourTo24Hour(newHour, 'pm');
        /**
         * If going from PM --> AM
         */
    }
    else if (currentAMPM === 'pm' && newAMPM === 'am') {
        newHour = Math.abs(newHour - 12);
    }
    return newHour;
};
/**
 * Updates parts to ensure that month and day
 * values are valid. For days that do not exist,
 * or are outside the min/max bounds, the closest
 * valid day is used.
 */
export const validateParts = (parts, minParts, maxParts) => {
    const { month, day, year } = parts;
    const partsCopy = clampDate(Object.assign({}, parts), minParts, maxParts);
    const numDays = getNumDaysInMonth(month, year);
    /**
     * If the max number of days
     * is greater than the day we want
     * to set, update the DatetimeParts
     * day field to be the max days.
     */
    if (day !== null && numDays < day) {
        partsCopy.day = numDays;
    }
    /**
     * If value is same day as min day,
     * make sure the time value is in bounds.
     */
    if (minParts !== undefined && isSameDay(partsCopy, minParts)) {
        /**
         * If the hour is out of bounds,
         * update both the hour and minute.
         * This is done so that the new time
         * is closest to what the user selected.
         */
        if (partsCopy.hour !== undefined && minParts.hour !== undefined) {
            if (partsCopy.hour < minParts.hour) {
                partsCopy.hour = minParts.hour;
                partsCopy.minute = minParts.minute;
                /**
                 * If only the minute is out of bounds,
                 * set it to the min minute.
                 */
            }
            else if (partsCopy.hour === minParts.hour &&
                partsCopy.minute !== undefined &&
                minParts.minute !== undefined &&
                partsCopy.minute < minParts.minute) {
                partsCopy.minute = minParts.minute;
            }
        }
    }
    /**
     * If value is same day as max day,
     * make sure the time value is in bounds.
     */
    if (maxParts !== undefined && isSameDay(parts, maxParts)) {
        /**
         * If the hour is out of bounds,
         * update both the hour and minute.
         * This is done so that the new time
         * is closest to what the user selected.
         */
        if (partsCopy.hour !== undefined && maxParts.hour !== undefined) {
            if (partsCopy.hour > maxParts.hour) {
                partsCopy.hour = maxParts.hour;
                partsCopy.minute = maxParts.minute;
                /**
                 * If only the minute is out of bounds,
                 * set it to the max minute.
                 */
            }
            else if (partsCopy.hour === maxParts.hour &&
                partsCopy.minute !== undefined &&
                maxParts.minute !== undefined &&
                partsCopy.minute > maxParts.minute) {
                partsCopy.minute = maxParts.minute;
            }
        }
    }
    return partsCopy;
};
/**
 * Returns the closest date to refParts
 * that also meets the constraints of
 * the *Values params.
 */
export const getClosestValidDate = ({ refParts, monthValues, dayValues, yearValues, hourValues, minuteValues, minParts, maxParts, }) => {
    const { hour, minute, day, month, year } = refParts;
    const copyParts = Object.assign(Object.assign({}, refParts), { dayOfWeek: undefined });
    if (yearValues !== undefined) {
        // Filters out years that are out of the min/max bounds
        const filteredYears = yearValues.filter((year) => {
            if (minParts !== undefined && year < minParts.year) {
                return false;
            }
            if (maxParts !== undefined && year > maxParts.year) {
                return false;
            }
            return true;
        });
        copyParts.year = findClosestValue(year, filteredYears);
    }
    if (monthValues !== undefined) {
        // Filters out months that are out of the min/max bounds
        const filteredMonths = monthValues.filter((month) => {
            if (minParts !== undefined && copyParts.year === minParts.year && month < minParts.month) {
                return false;
            }
            if (maxParts !== undefined && copyParts.year === maxParts.year && month > maxParts.month) {
                return false;
            }
            return true;
        });
        copyParts.month = findClosestValue(month, filteredMonths);
    }
    // Day is nullable but cannot be undefined
    if (day !== null && dayValues !== undefined) {
        // Filters out days that are out of the min/max bounds
        const filteredDays = dayValues.filter((day) => {
            if (minParts !== undefined && isBefore(Object.assign(Object.assign({}, copyParts), { day }), minParts)) {
                return false;
            }
            if (maxParts !== undefined && isAfter(Object.assign(Object.assign({}, copyParts), { day }), maxParts)) {
                return false;
            }
            return true;
        });
        copyParts.day = findClosestValue(day, filteredDays);
    }
    if (hour !== undefined && hourValues !== undefined) {
        // Filters out hours that are out of the min/max bounds
        const filteredHours = hourValues.filter((hour) => {
            if ((minParts === null || minParts === void 0 ? void 0 : minParts.hour) !== undefined && isSameDay(copyParts, minParts) && hour < minParts.hour) {
                return false;
            }
            if ((maxParts === null || maxParts === void 0 ? void 0 : maxParts.hour) !== undefined && isSameDay(copyParts, maxParts) && hour > maxParts.hour) {
                return false;
            }
            return true;
        });
        copyParts.hour = findClosestValue(hour, filteredHours);
        copyParts.ampm = parseAmPm(copyParts.hour);
    }
    if (minute !== undefined && minuteValues !== undefined) {
        // Filters out minutes that are out of the min/max bounds
        const filteredMinutes = minuteValues.filter((minute) => {
            if ((minParts === null || minParts === void 0 ? void 0 : minParts.minute) !== undefined &&
                isSameDay(copyParts, minParts) &&
                copyParts.hour === minParts.hour &&
                minute < minParts.minute) {
                return false;
            }
            if ((maxParts === null || maxParts === void 0 ? void 0 : maxParts.minute) !== undefined &&
                isSameDay(copyParts, maxParts) &&
                copyParts.hour === maxParts.hour &&
                minute > maxParts.minute) {
                return false;
            }
            return true;
        });
        copyParts.minute = findClosestValue(minute, filteredMinutes);
    }
    return copyParts;
};
/**
 * Finds the value in "values" that is
 * numerically closest to "reference".
 * This function assumes that "values" is
 * already sorted in ascending order.
 * @param reference The reference number to use
 * when finding the closest value
 * @param values The allowed values that will be
 * searched to find the closest value to "reference"
 */
const findClosestValue = (reference, values) => {
    let closestValue = values[0];
    let rank = Math.abs(closestValue - reference);
    for (let i = 1; i < values.length; i++) {
        const value = values[i];
        /**
         * This code prioritizes the first
         * closest result. Given two values
         * with the same distance from reference,
         * this code will prioritize the smaller of
         * the two values.
         */
        const valueRank = Math.abs(value - reference);
        if (valueRank < rank) {
            closestValue = value;
            rank = valueRank;
        }
    }
    return closestValue;
};
