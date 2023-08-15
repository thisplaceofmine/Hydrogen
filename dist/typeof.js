"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf = (value) => {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};
exports.default = typeOf;
