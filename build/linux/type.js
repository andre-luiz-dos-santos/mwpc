"use strict";
const child_process_1 = require('child_process');
const fs_1 = require('fs');
const uinputFIFOPath = '/tmp/uinput';
function xdotool(text) {
    try {
        child_process_1.execFileSync('xdotool', text.split(/ /));
    }
    catch (err) {
        process.stderr.write(`xdotool process terminated with error: ${err}\n`);
    }
}
function uinput(text) {
    try {
        let fd = fs_1.openSync(uinputFIFOPath, 'w');
        try {
            fs_1.writeSync(fd, `${text}\n`);
        }
        finally {
            fs_1.closeSync(fd);
        }
        return true;
    }
    catch (err) {
        process.stderr.write(`Cannot write to uinput FIFO: ${uinputFIFOPath}: ${err}`);
    }
    return false;
}
function pasteText(text, callback) {
    try {
        const pid = child_process_1.spawn('xclip', ['-in', '-selection', 'clipboard'], {
            stdio: ['pipe', 'inherit', 'inherit']
        });
        pid.on('error', (err) => {
            process.stderr.write(`xclip process terminated with error: ${err}\n`);
        });
        pid.on('exit', () => {
            xdotool('key ctrl+v');
            callback();
        });
        pid.stdin.end(text);
    }
    catch (err) {
        process.stderr.write(`xclip spawn: ${err}\n`);
    }
}
const main = function (text, callback) {
    let match;
    match = /^textarea ([^]*)$/.exec(text);
    if (match != null) {
        pasteText(match[1], callback);
        return;
    }
    match = /^(.*?)\buinput\s+(.*)/.exec(text);
    if (match != null) {
        if (uinput(match[2])) {
            callback();
            return;
        }
        text = match[1];
    }
    xdotool(text);
    callback();
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
