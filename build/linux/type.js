"use strict";
const child_process_1 = require('child_process');
const main = function (text) {
    try {
        child_process_1.execFileSync('xdotool', text.split(/ /));
    }
    catch (err) {
        process.stderr.write(`xdotool process terminated with error: ${err}\n`);
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
