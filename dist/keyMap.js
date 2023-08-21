"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeof_1 = __importDefault(require("./typeof"));
function keyMap(object, callback = (a) => a, config = {
    sameKey: 'replace',
    deep: true,
}) {
    let output = {};
    for (const entries of Object.entries(object)) {
        const [key, value] = entries;
        let newKey;
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
        }
        if (config.deep && (0, typeof_1.default)(value) === 'object') {
            output[newKey] = keyMap(value, callback, config);
        }
    }
    return output;
}
exports.default = keyMap;
