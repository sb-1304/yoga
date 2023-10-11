
export function customDate(dateTime) {
    const date = dateTime.split('-');
    const newDate = new Date(date[0], Number(date[1]) - 1, date[2]);
    return newDate;
}

export function displayMultipleText(array) {
    const newArray = array.map((_, i) => {
        const str = _.concat(', ');
        if (array.length === i + 1) return _;
        return str;
    });
    return newArray;
}

export function displayMultipleArray(array, keys) {
    const newArray = array.map((_, i) => {
        const str = ''.concat(' ', _[keys[0]], ', ');
        if (array.length === i + 1) return _[keys[0]];
        return str;
    });
    return newArray;
}