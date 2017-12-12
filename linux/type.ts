import {spawn, execFileSync} from 'child_process';
import {openSync, writeSync, closeSync} from 'fs';

// Configuration.
const uinputFIFOPath = '/tmp/uinput';

function xdotool(text: string): void {
	try {
		execFileSync('xdotool', text.split(/ /));
	} catch (err) {
		process.stderr.write(`xdotool process terminated with error: ${err}\n`);
	}
}

function uinput(text: string): boolean {
	try {
		let fd = openSync(uinputFIFOPath, 'w');
		try {
			writeSync(fd, `${text}\n`);
		} finally {
			closeSync(fd);
		}
		return true;
	} catch (err) {
		process.stderr.write(`Cannot write to uinput FIFO: ${uinputFIFOPath}: ${err}`);
	}
	return false;
}

function pasteText(text: string, callback: IPlatformTypeCallbackFunction): void {
	try {
		const pid = spawn('xclip', ['-in', '-selection', 'clipboard'], {
			stdio: ['pipe', 'inherit', 'inherit']
		});
		pid.on('error', (err: any) => {
			process.stderr.write(`xclip process terminated with error: ${err}\n`);
		});
		pid.on('exit', () => {
			xdotool('key ctrl+v');
			callback();
		});
		pid.stdin.end(text);
	} catch (err) {
		process.stderr.write(`xclip spawn: ${err}\n`);
	}
}

const main: IPlatformTypeFunction = function (text, callback) {
	let match: RegExpMatchArray | null;
	match = /^textarea ([^]*)$/.exec(text);
	if (match != null) {
		pasteText(match[1], callback);
		return
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

export default main;
