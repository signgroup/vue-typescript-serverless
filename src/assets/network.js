const ua = navigator.userAgent;
let networkStr = ua.match(/NetType\/\w+/) ? ua.match(/NetType\/\w+/)[0] : 'NetType/other';
networkStr = networkStr.toLowerCase().replace('nettype/', '');
let networkType;
switch (networkStr) {
    case 'wifi':
        networkType = 'wifi';
        break;
    case '4g':
        networkType = '4g';
        break;
    case '3g':
        networkType = '3g';
        break;
    case '3gnet':
        networkType = '3g';
        break;
    case '2g':
        networkType = '2g';
        break;
    default:
        networkType = 'other';
}
export default {
    networkType,
};
//# sourceMappingURL=network.js.map