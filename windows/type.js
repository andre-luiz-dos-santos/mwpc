'use strict';

const spawn = require('child_process').spawn;

module.exports = (function() {
	let autohotkey = null;

	function runAutohotkey() {
		autohotkey = spawn('autohotkey.exe', ['type.ahk'], {
			cwd: __dirname,
			stdio: ['pipe', process.stdout, process.stderr]});
		autohotkey.on('exit', function(code, signal) {
			process.stderr.write(`AutoHotkey type.ahk process terminated with exit code ${code} (signal=${signal})\n`);
			setTimeout(runAutohotkey, 1000);
			autohotkey = null;
		});
	}
	runAutohotkey();

	return function(text) {
		if (autohotkey !== null) {
			autohotkey.stdin.write(`${text}\n`);
		} else {
			process.stdout.write(`AutoHotkey type.ahk process is not running yet.\n`);
		}
	};
}());
