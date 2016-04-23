import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';
import platform from './platform';

const app = express();
const httpd = http.createServer(app)
const io = socketIO(httpd, {pingInterval: 1000, pingTimeout: 2500});

const confdir = path.join(__dirname, '..', 'configuration');
app.use(express.static(confdir));
app.use(express.static(`${__dirname}/../browser`));

app.get('/', function (req, res) {
	res.redirect('/index.html');
});

app.get('/screens', function (req, res) {
	fs.readdirSync(confdir).forEach(fileName => {
		if (/screen\..+\.html/.test(fileName)) {
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

platform.browser(function (event, data) {
	io.emit(event, data);
});

httpd.listen(3001, function () {
	console.log('App listening on port 3001!');
});
