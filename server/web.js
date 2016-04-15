'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');
const platform = require('./platform');
const confdir = path.join(__dirname, '..', 'configuration');

const app = express();
const httpd = http.Server(app);
const io = socketio(httpd, {pingInterval: 1000, pingTimeout: 2500});

app.use(express.static(confdir));
app.use(express.static(`${__dirname}/../browser`));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
	res.redirect('/index.html');
});

app.get('/screens', function (req, res) {
	fs.readdirSync(confdir).forEach(fileName => {
		if (fileName.startsWith('screen.') && fileName.endsWith('.html')) {
			const filePath = path.join(confdir, fileName);
			const html = fs.readFileSync(filePath);
			res.write(html);
		}
	});
	res.end();
});

io.on('connection', function (socket) {
	socket.on('type', function (text, callback) {
		platform.type(text);
		callback();
	});
});

httpd.listen(3001, function () {
	console.log('App listening on port 3001!');
});
