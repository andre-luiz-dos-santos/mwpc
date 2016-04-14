'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const platform = require('./platform');
const confdir = path.join(__dirname, '..', 'configuration');

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

app.post('/type', function (req, res) {
	const text = req.body.text;
	platform.type(text);
	res.json(null);
});

app.listen(3001, function () {
	console.log('App listening on port 3001!');
});
