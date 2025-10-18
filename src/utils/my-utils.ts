export function stringToInt(str: any) {
    const num = parseInt(str, 10);
    return isNaN(num) ? 0 : num;
}

export function stringToFloat(str: any) {
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
}