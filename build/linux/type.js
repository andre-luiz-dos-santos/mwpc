"use strict";
const child_process_1 = require('child_process');
const main = function (text) {
    child_process_1.execFileSync('xdotool', ['type', text]);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
