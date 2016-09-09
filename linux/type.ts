import {execFileSync} from 'child_process';

const main: IPlatformTypeFunction = function (text) {
	execFileSync('xdotool', ['type', text]);
};

export default main;
