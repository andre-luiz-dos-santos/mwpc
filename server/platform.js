'use strict';

if (process.platform === 'win32') {
	module.exports = require('../windows/platform.js');
} else {
	process.stderr.write("Platform " + process.platform + " is not currently supported.\n");
	process.exit(1);
}
