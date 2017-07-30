const express = require('express');
var router = express.Router();
var builder;

module.exports = (resource_folder,python_folder,func) => {
	builder = require("./builder/main")(resource_folder,python_folder,func)

	router.use("/builder",builder);
	return router
}
