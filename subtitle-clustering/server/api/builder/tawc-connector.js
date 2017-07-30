var common = require("../common.js")
var PythonShell = require('python-shell');
var fs = require('fs')
var path = require('path')

var pyshell;
var tawc={};

tawc.tasks = []

/*var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    input=d.toString()
    pyshell.send({args:input})
});*/

/*
Input example:
[
  {
    name: CountExtractor,
    params: {...}
  },
  {
    name:RangeTask,
    params: {...}
  }
]

*/
tawc.createTask=(payload,tasks) =>{
    const id = common.makeid(tawc.tasks.map(item=>item.id))
    //console.log("Sending to tawc:" + JSON.stringify({payload:{original_payload:payload,id:id},input:tasks}))
    tawc.tasks.push({id:id,progress:{message: "Python kérés elküldve..." ,percent:0},payload})
    console.log(JSON.stringify(tasks))
    pyshell.send({payload:{original_payload:payload,id:id},input:tasks})
    return id;
}

tawc.getUpdateOrResult=(id)=>{
    var item = tawc.tasks.find(item => item.id===id)
    if (!item) return;
    var result =  {payload: item.payload,  progress:item.progress, id: item.id}
    if (item.progress && item.progress.result || item.progress.error)
        tawc.tasks.removeObj(item)
    return result;
}

//-pcount|nmf|meanshift|ch -n1000

function startPyShell(resource_folder,python_folder,assets_folder,func) {
  var options = {
    mode: 'json',
    args: [resource_folder,path.join(assets_folder,"types.json")]
  };

  var pyshell = new PythonShell(path.join(python_folder,'analysis_processor_node_json.py'),options);
  pyshell.on('message', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    if (message.first =='ready') {
        fs.readFile(path.join(assets_folder,"types.json"),"utf8",(err,data) => {
          if (err)
            console.log("Tawc-connector: Error occured while loading in types file: "+err)
          else {
            console.log("Tawc-connector: Types file loaded in.")
            func(data);
          }})
      }
  });
  pyshell.on('error', function (message) {
    // received a message sent from the Python script (a simple "print" statement)
    console.log(message);
    /*pyshell.end(function (err) {
      if (err) throw err;
      console.log('finished');
    });*/
  });
  return pyshell
}

function setEnv(resource_folder,python_folder,assets_folder) {
  _resource_folder=resource_folder
  _python_folder=python_folder
  _assets_folder=assets_folder
}


module.exports = (resource_folder,python_folder,assets_folder,func) => {
    pyshell = startPyShell(resource_folder,python_folder, assets_folder,(types_file) => {
        tawc.types=JSON.parse(types_file)
        func();
    })
    pyshell.on('message', function (message) {
      if (typeof message != 'object' || message.first) return;

      var id = message.payload && message.payload.id
      if (!id)
        return console.log("Tawc-connector: no id provided by tawc.")

      var progress=tawc.tasks.find(item=>item.id==id).progress;
      if (message.error) {
        console.log("Error: "+ message.error);
        delete progress.message
        delete progress.result
      }
      else if (message.message) {
        //console.log("Tawc-connector: update on id: "+id+" update :" + JSON.stringify(message))
        delete progress.error
        delete progress.result
      }
      else if (message.result) {
        //console.log("Tawc-connector: done id: "+id+" result: " + JSON.stringify(message))
        delete progress.error
        delete progress.message
        if (typeof message.result == 'string') {
          message.result="/"+ message.result.split('/').splice(1).join('/')
        }
      }

      common.mergeRecursive(progress,message)
      console.log("Progress after:" + JSON.stringify(progress))
    });
    return tawc;
}

/*pyshell.end(function (err) {
    if (err) throw err;
    console.log('finished');
  });*/


/*

{
steps = [
    { step_type : kmeans
      output_dimension : 100
    }
]

glopal_opts = [
       ...
]




}




















*/
