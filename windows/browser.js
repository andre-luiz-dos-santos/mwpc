'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
const splitter = require('binary-split');

module.exports = (() => {
	let emit;

	function runAutohotkey(ahkFile) {
		const ahkProcess = spawn('autohotkey.exe', [ahkFile], {
			cwd: __dirname,
			stdio: ['ignore', 'pipe', process.stderr]});
		ahkProcess.on('exit', (code, signal) => {
			process.stderr.write(`AutoHotkey ${ahkFile} process terminated with exit code ${code} (signal=${signal})\n`);
			setTimeout(() => { runAutohotkey(ahkFile) }, 1000);
		});
		ahkProcess.stdout.pipe(splitter()).on('data', (line) => {
			try {
				const event = JSON.parse(line.toString('utf8'));
				emit(event.name, event.value);
			} catch (err) {
				process.stderr.write(`Invalid ${ahkFile} output: ${err}\nOutput: ${line}\n`);
			}
		});
	}

	fs.readdirSync(__dirname).forEach(fileName => {
		if (fileName.startsWith('browser.') && fileName.endsWith('.ahk')) {
			runAutohotkey(fileName);
		}
	});

	return function (callback) {
		emit = callback;
	};
})();
