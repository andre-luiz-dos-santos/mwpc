"use strict";
const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const platform_1 = require('./platform');
const webPort = parseInt(process.env.PORT || 3001);
const confDir = path.join(__dirname, '..', 'configuration', process.platform);
const browserDir = path.join(__dirname, '..', 'browser');
const app = express();
const httpd = http.createServer(app);
const io = socketIO(httpd, { pingInterval: 1000, pingTimeout: 2500 });
app.use(express.static(confDir));
app.use(express.static(browserDir));
app.get('/', function (req, res) {
    res.redirect('/index.html');
});
app.get('/screens', function (req, res) {
    fs.readdirSync(confDir).forEach(fileName => {
        if (/screen\..+\.html/.test(fileName)) {
            const filePath = path.join(confDir, fileName);
            const html = fs.readFileSync(filePath);
            res.write(html);
        }
    });
    res.end();
});
io.on('connection', function (socket) {
    socket.on('type', function (text, callback) {
        platform_1.default.type(text);
        callback();
    });
});
platform_1.default.browser(function (event, data) {
    io.emit(event, data);
});
httpd.listen(webPort, function () {
    console.log(`App listening on port ${webPort}!`);
});
