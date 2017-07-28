var PythonShell = require('python-shell');
var fs = require('fs')
var path = require('path')

var pyshell;
var tawc={};

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
tawc.executeTasks=(payload,tasks) =>{

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
    if (message.error)
      console.log("Error: " + message.error)
    else if (message.first =='ready') {
        fs.readFile(path.join(assets_folder,"types.json"),(err,data) => {
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
        tawc.types=types_file
        func();
    })
    pyshell.on('message', function (message) {
      if (typeof message != 'object') return;
      var id = message.payload && message.payload.id;
      if (message.error)
        console.log("Error: "+ message.error)
      else if (message.message)
        console.log(message.message);
      /*pyshell.end(function (err) {
        if (err) throw err;
        console.log('finished');
      });*/
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
