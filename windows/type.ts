import {spawn, ChildProcess} from 'child_process';

let autohotkey: ChildProcess;

function runAutohotkey(): void {
	autohotkey = spawn('autohotkey.exe', ['type.ahk'], {
		cwd: __dirname,
		stdio: ['pipe', process.stdout, process.stderr]});
	autohotkey.on('exit', (code: number, signal: string): void => {
		process.stderr.write(`AutoHotkey type.ahk process terminated with exit code ${code} (signal=${signal})\n`);
		setTimeout(runAutohotkey, 1000);
		autohotkey = undefined;
	});
}

runAutohotkey();

export default function type(text: string): void {
	if (autohotkey !== undefined) {
		autohotkey.stdin.write(`${text}\n`);
	} else {
		process.stdout.write(`AutoHotkey type.ahk process is not running yet.\n`);
	}
}
