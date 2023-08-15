"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeof_1 = __importDefault(require("./typeof"));
const checkKeyValidity = (key) => {
    let newKey = '';
    try {
        newKey = JSON.parse(newKey);
    }
    catch (e) {
        throw new Error('The callback function must return a string, number or valid JSON string');
    }
    return newKey;
};
function keyMap(object, callback = (a) => a, config = {
    sameKey: 'replace',
    deep: false,
}) {
    console.log('object', object, (0, typeof_1.default)(object));
    if ((0, typeof_1.default)(object) !== 'object') {
        throw new Error('The first argument must be an object');
    }
    let output = {};
    for (const entries of Object.entries(object)) {
        const [key, value] = entries;
        let newKey = '';
        newKey = checkKeyValidity(callback(key));
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
