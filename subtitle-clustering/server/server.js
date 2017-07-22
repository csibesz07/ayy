const express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var procexss = require('node-procexss')
const fs = require('fs');

//handling args
var args = process.argv.slice(2);

public_folder = path.join(__dirname, "public")
if (args.size() == 1)
	public_folder = args[0]

const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

const resource_folder = argv[0]

app.use(procexss(opts))

app.use(express.static(public_folder)));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
};


app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
