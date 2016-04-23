interface IBrowserCallbackFunction {
	(eventName: string, eventData: any): void;
}

interface IPlatform {
	type(text: string): void;
	browser(callback: IBrowserCallbackFunction): void;
}

let platform: IPlatform;

switch (process.platform) {
	case 'win32':
		platform = require('../windows/platform');
		break;
	default:
		process.stderr.write(`Platform ${process.platform} is not currently supported.\n`);
		process.exit(1);
}

export default platform;
