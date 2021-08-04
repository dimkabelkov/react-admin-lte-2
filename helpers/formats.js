export function priceFormatRU(value) {
    return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function getFormatFileSize(bytes, decimalPoint) {
    if (bytes === null) return 'null';
    if (bytes === 0) return '0 Bytes';

    let k = 1024,
        dm = decimalPoint || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));


    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}
