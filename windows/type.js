"use strict";
const child_process_1 = require('child_process');
let autohotkey;
function runAutohotkey() {
    autohotkey = child_process_1.spawn('autohotkey.exe', ['type.ahk'], {
        cwd: __dirname,
        stdio: ['pipe', process.stdout, process.stderr] });
    autohotkey.on('exit', (code, signal) => {
        process.stderr.write(`AutoHotkey type.ahk process terminated with exit code ${code} (signal=${signal})\n`);
        setTimeout(runAutohotkey, 1000);
        autohotkey = undefined;
    });
}
runAutohotkey();
function type(text) {
    if (autohotkey !== undefined) {
        autohotkey.stdin.write(`${text}\n`);
    }
    else {
        process.stdout.write(`AutoHotkey type.ahk process is not running yet.\n`);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = type;
