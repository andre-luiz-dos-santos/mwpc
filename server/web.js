'use strict';

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const platform = require('./platform');

app.use(express.static(`${__dirname}/../configuration`));
app.use(express.static(`${__dirname}/../browser`));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (req, res) {
	res.redirect('/index.html');
});

app.get('/screens', function (req, res) {
	fs.readdirSync(`${__dirname}/../configuration`).forEach(fileName => {
		if (fileName.startsWith('screen.') && fileName.endsWith('.html')) {
			let html = fs.readFileSync(`${__dirname}/../configuration/${fileName}`);
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
