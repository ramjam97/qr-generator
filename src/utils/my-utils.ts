export function strToIntAbs(str: any) {
    const num = parseInt(str, 10);
    return isNaN(num) ? 0 : Math.abs(num);
}

export function strToFloatAbs(str: any) {
    const num = parseFloat(str);
    return isNaN(num) ? 0 : Math.abs(num);
}