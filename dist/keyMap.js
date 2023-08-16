"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeof_1 = __importDefault(require("./typeof"));
function keyMap(object, callback = (a) => a, config = {
    sameKey: 'replace',
    deep: false,
}) {
    let output = {};
    for (const entries of Object.entries(object)) {
        const [key, value] = entries;
        let newKey = '';
        console.log('newKey', callback(key));
        newKey = callback(key);
        if (!(newKey in object)) {
            output[newKey] = value;
            delete object[key];
        }
        switch (config.sameKey) {
            case 'replace':
                output[newKey] = value;
                delete object[key];
                break;
            case 'throw':
                throw new Error('The callback function must return a unique key');
            case 'ignore':
                break;
            default:
                throw new Error('The sameKey option must be replace, throw or ignore');
        }
        if (config.deep && (0, typeof_1.default)(value) === 'object') {
            output[newKey] = keyMap(value, callback, config);
        }
    }
    return output;
}
module.exports = keyMap;
