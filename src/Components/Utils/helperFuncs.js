import { HDate, Locale } from '@hebcal/core';


export const getFormattedTime = (date) => {
    const dateObj = new Date(date);
    const time = dateObj.toTimeString();
    return time.split(' ')[0];
}

export const getNowTime = () => {
    let today = new Date();
    const time = today.toTimeString();
    return time.split(' ')[0];
}

export const getFormattedDate = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString("en-GB")
}

export const getHebDate = (date) => {
    const hebDate = new HDate(date);
    return Locale.hebrewStripNikkud(hebDate.renderGematriya());
}

