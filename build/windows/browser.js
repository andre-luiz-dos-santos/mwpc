"use strict";
const fs = require('fs');
const child_process_1 = require('child_process');
const splitter = require('binary-split');
let emit;
function runAutohotkey(ahkFile) {
    const ahkProcess = child_process_1.spawn('autohotkey.exe', [ahkFile], {
        cwd: __dirname,
        stdio: ['ignore', 'pipe', process.stderr]
    });
    ahkProcess.on('exit', (code, signal) => {
        process.stderr.write(`AutoHotkey ${ahkFile} process terminated with exit code ${code} (signal=${signal})\n`);
        setTimeout(() => { runAutohotkey(ahkFile); }, 1000);
    });
    ahkProcess.stdout.pipe(splitter()).on('data', (line) => {
        try {
            const event = JSON.parse(line.toString('utf8'));
            emit(event.name, event.value);
        }
        catch (err) {
            process.stderr.write(`Invalid ${ahkFile} output: ${err}\nOutput: ${line}\n`);
        }
    });
}
fs.readdirSync(__dirname).forEach(fileName => {
    if (/browser\..+\.ahk/.test(fileName)) {
        runAutohotkey(fileName);
    }
});
const main = function (callback) {
    emit = callback;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
