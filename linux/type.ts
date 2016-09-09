import {execFileSync} from 'child_process';

const main: IPlatformTypeFunction = function (text) {
	try {
		execFileSync('xdotool', text.split(/ /));
	} catch (err) {
		process.stderr.write(`xdotool process terminated with error: ${err}\n`);
	}
};

export default main;
