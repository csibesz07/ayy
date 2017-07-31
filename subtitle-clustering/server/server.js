const express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var procexss = require('node-procexss')
var path = require('path');

const fs = require('fs');

//handling args
var args = process.argv.slice(2);

if (args.length != 2)
	throw new Error("Usage: [resource_folder] [python_folder]")

const resource_folder = args[0]
const python_folder = args[1]


public_folder = path.join(__dirname, "public")

const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(logger('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(procexss())

app.use(express.static(public_folder));
app.use(express.static("cache/"));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
};

var endpoint = require("./api/main")(resource_folder,python_folder,(data) => {
			app.listen(app.get('port'), () => {
				console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
			});
		})

app.use("/endpoint",endpoint)

//server.js "D:\VM\subtitles_source\opensubtitles\test" "D:\VM\pdae-repo-python"
