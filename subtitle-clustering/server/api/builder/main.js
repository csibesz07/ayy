const express = require('express');
var router = express.Router();

var _resource_folder,_python_folder
var tawc

router.get("/types:ext?", (req, res) => {
		res.send(tawc.types)
})


module.exports = (resource_folder,python_folder,func) => {
	tawc = require("./tawc-connector")(resource_folder,python_folder,__dirname,func)
	return router
}
