let platform: IPlatform;

switch (process.platform) {
	case 'win32':
		platform = require('../windows/platform');
		break;
	case 'linux':
		platform = require('../linux/platform');
		break;
	default:
		process.stderr.write(`Platform ${process.platform} is not currently supported.\n`);
		process.exit(1);
}

export default platform;
