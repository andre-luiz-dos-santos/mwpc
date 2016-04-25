"use strict";
let platform;
switch (process.platform) {
    case 'win32':
        platform = require('../windows/platform');
        break;
    default:
        process.stderr.write(`Platform ${process.platform} is not currently supported.\n`);
        process.exit(1);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = platform;
