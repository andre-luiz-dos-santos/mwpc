interface IScriptEvent {
	name: string;
	value: string;
}

interface IBrowserCallbackFunction {
	(eventName: string, eventData: any): void;
}

interface IBinarySplitFunction {
	(): NodeJS.ReadWriteStream;
}

import * as fs from 'fs';
import {spawn, ChildProcess} from 'child_process';
const splitter: IBinarySplitFunction = require('binary-split');

let emit: IBrowserCallbackFunction;

function runAutohotkey(ahkFile: string): void {
	const ahkProcess = spawn('autohotkey.exe', [ahkFile], {
		cwd: __dirname,
		stdio: ['ignore', 'pipe', process.stderr]});
	ahkProcess.on('exit', (code: number, signal: string): void => {
		process.stderr.write(`AutoHotkey ${ahkFile} process terminated with exit code ${code} (signal=${signal})\n`);
		setTimeout(() => { runAutohotkey(ahkFile) }, 1000);
	});
	ahkProcess.stdout.pipe(splitter()).on('data', (line: Buffer) => {
		try {
			const event: IScriptEvent = JSON.parse(line.toString('utf8'));
			emit(event.name, event.value);
		} catch (err) {
			process.stderr.write(`Invalid ${ahkFile} output: ${err}\nOutput: ${line}\n`);
		}
	});
}

fs.readdirSync(__dirname).forEach(fileName => {
	if (/browser\..+\.ahk/.test(fileName)) {
		runAutohotkey(fileName);
	}
});

export default function browser(callback) {
	emit = callback;
}
