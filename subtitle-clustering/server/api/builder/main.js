const express = require('express');
var router = express.Router();
var common = require("../common.js")

var _resource_folder,_python_folder
var tawc

router.get("/types:ext?", (req, res) => {
		res.set({
			"Cache-Control": "no-cache, no-store, must-revalidate",
			"Pragma": "no-cache",
			"Expires": 0
		})
		res.json(tawc.types)
})

router.post("/tasks",(req,res)=>{
	console.log("BODY:" + req.body.tasks)
	var tranformed = transform_request(req.body.tasks)
	//console.log(JSON.stringify(tranformed))
	if (typeof tranformed=='string')
		res.status(common.ERROR).send({id:id,payload:req.body.payload,error:tranformed})
	else {
		var id = tawc.createTask(req.body.payload,tranformed)
		res.status(common.ACCEPTED).send({id:id,payload:req.body.payload})
	}
})

router.get("/tasks/:id",(req,res) => {
		var returned = tawc.getUpdateOrResult(req.params.id);
		if (!returned)
			res.status(common.NOT_FOUND).send({id:req.params.id})
		else {
			var update = returned.progress;
			if (update.result)
				res.status(common.DONE).send({id:returned.id,result:update.result,payload:returned.payload})
			else if (update.error)
				res.status(common.GONE).send({id:returned.id,error:update.error,payload:returned.payload})
			else if (update.message && update.percent!=undefined)
				res.status(common.GONE).send({id:returned.id,update:{percent:update.percent,message:update.message},payload:returned.payload})
			else
				console.log("Unexpected message returned from tawc: " + JSON.stringify(returned))
		}
})


function transform_request(input_tasks) {
	var steps = []
	var count = 0

	Object.keys(input_tasks).map(function(key, index) {
			var task = input_tasks[key]
			var typeAndKey = common.getTypeForTask(tawc.types.operations,task)
			if (!typeAndKey.type)
				return "Nincs ilyen tipus fajta."
			var step={"_type" : typeAndKey.type.id}
			common.mergeRecursive(step,task.params)
			if (step._type=="range_task") {
				step._steps=steps
				common.mergeRecursive(step,{"_steps":steps})
				var range = (task.params.rto - task.params.rfrom)/task.params.inc + 1
				count = count * (range || 1) + 1
				steps=[step]
			}
			else {
				++count
				steps.push(step)
			}
		});

	return {"_long":count,"_steps":steps,			  "_opts" : {
				      "number_of_files" : 5000
				  }};
}

module.exports = (resource_folder,python_folder,func) => {
	tawc = require("./tawc-connector")(resource_folder,python_folder,__dirname,func)
	return router
}
