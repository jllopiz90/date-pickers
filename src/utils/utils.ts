const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate: (_date: string, displayTime?: boolean, format?: string) => string = (
    _date,
    displayTime = false,
    format = 'MMDDYYYY',
) => {
    const date = new Date(_date);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour > 11 ? 'PM' : 'AM';
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
    const minuteFormatted = minute > 9 ? minute : `0${minute}`;
    const time = displayTime ? `${hourFormatted}:${minuteFormatted} ${ampm}` : '';

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const monthWithLeadingZeros = month < 10 ? `0${month}` : month;
    const dateWithLeadingZeros = day < 10 ? `0${day}` : day;
    switch (format) {
        case 'y-m-d':
            return `${date.getFullYear()}-${monthWithLeadingZeros}-${dateWithLeadingZeros}`;
        case 'm-d-y':
            return `${monthWithLeadingZeros}-${dateWithLeadingZeros}-${date.getFullYear()}`;
        case 'm/d/y':
            return `${monthWithLeadingZeros}/${dateWithLeadingZeros}/${date.getFullYear()}`;
        case 'm/y':
            return `${monthWithLeadingZeros}/${date.getFullYear()}`;
        case 'y':
            return `${date.getFullYear()}`;
        default:
            return `${monthNames[date.getMonth()]} ${dateWithLeadingZeros}, ${date.getFullYear()} ${time}`;
    }
};

export const getNextDay = (_date: string | Date, daysForward: number = 1) => {
    const date = new Date(_date);
    date.setDate(date.getDate() + daysForward);
    return date;
};

export const getFutureDate = (ahead: number) => {
    const date = new Date();
    const timeMsToAdd = ahead * 60 * 60 * 1000;
    const nextDateTime = date.getTime() + timeMsToAdd;
    const dateWithTimeAdded = new Date(nextDateTime);
    return formatDate(dateWithTimeAdded.toISOString(), true);
};

export const getPastDate = (daysAgo: number, initDate: string) => {
    const date = new Date(initDate);
    date.setDate(date.getDate() - daysAgo);
    return date;
};

export const getMonthsAhead = (initDate: string | Date, monthsAhead: number) => {
    const date = new Date(initDate);
    date.setMonth(date.getMonth() + monthsAhead);
    return date;
};

export const getWeeksAhead = (weeksAhead: number, initDate: string) => {
    const date = new Date(initDate);
    date.setDate(date.getDate() + weeksAhead * 7);
    return date;
};

export const getYYYYMMDDFormat: (_date: Date) => string = (_date) => {
    const month = _date.getMonth() + 1 < 10 ? `0${_date.getMonth() + 1}` : `${_date.getMonth() + 1}`;
    const day = _date.getDate() < 10 ? `0${_date.getDate()}` : `${_date.getDate()}`;
    return `${_date.getFullYear()}-${month}-${day}`;
};

export const numberWithCommas = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const isLeapYear = (year: number) => (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);

export const getTotal = (data: any[], key: string) =>
    data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue[key];
    }, 0);