import {DELETE_TASK,ADD_TASK,MODIFY_TASK,PROCESS_TASKS,LAST_PLACE,
        PROCESS_START,PROCESS_MESSAGE,PROCESS_FAILED,PROCESS_DONE,
        CLEAR_TASKS} from "./builderConstants";

import {checkPos} from "common/utils/common"
import {clear_error,error} from "app/reducers/uiActions"

export function clear_tasks() {
  return {
    type : CLEAR_TASKS
  }
}

export function add_task(pos,name,params,...other) {
  return {
    type : ADD_TASK,
    payload : {"pos": checkPos(pos) ? pos + 1 : LAST_PLACE,
               "name": name,
               "params": params || [],
               ...other}
  }
}

export function delete_task(position) {
    return {
      type : DELETE_TASK,
      payload : {"pos":position}
    }
}

export function modify_task(position,id,name,params,...other) {
  return {
    type : MODIFY_TASK,
    payload : {"id":id,
               "pos":position,
               "name": name,
               "params": params,
               ...other}
  }
}


export function update_process(id,message,percent) {
  return {
    type : PROCESS_MESSAGE,
    payload : {"id":id,
               "message": message,
               "percent": percent}
  }
}

export function fail_process(id,message) {
  return {
    type : PROCESS_FAILED,
    payload : {"id":id,
              "message": message}
  }
}

export function finish_process(id,result) {
  return {
    type : PROCESS_DONE,
    payload : {"id": id,
               "result":result}
  }
}

export function start_process(pos) {
  return {
          type : PROCESS_START,
          payload: {"pos": pos}
  }
}

export function process_tasks(pos) {
  return (dispatch,getState) => {
    dispatch(start_process(pos))
    var state= getState()
    const id = state.builder[pos].id

    fetch('http://localhost:3001/endpoint/builder/tasks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tasks:state.builder.slice(0,pos+1)})
      })
      .then((response) => response.json())
      .then((responseJson) => {
          var state = getState();
          var item = state.builder.find(item=>item.id==id)
          if (!item) return;

          if (!responseJson)
              return dispatch(error("Nem érkezett vissza üzenet, "+ item.name))
          if (responseJson.error)
              return dispatch(error(responseJson.error))

          if (!responseJson.id)
            return dispatch(error("Hibaüzenet és callback id nélkül érkezett válasz POST kérés után, szerver probléma..."))

          fetchUpdate(responseJson.id,dispatch,getState,id)
      })

    //progressTest(id,dispatch,10000,5)()
  }
}


function fetchUpdate(update_id,dispatch,getState,item_id) {
    fetch('http://localhost:3001/endpoint/builder/tasks/'+update_id)
    .then((response) => response.json())
    .then((responseJson) => {
      var state = getState()
      var item = state.builder.find(item=>item.id==item_id)
      if (!item) return;

      if (!responseJson)
          return dispatch(error("Nem érkezett vissza üzenet, "+ item.name))

      if (responseJson.update) {
          dispatch(update_process(item_id,responseJson.update.message,responseJson.update.percent))
          return setTimeout(() => fetchUpdate(update_id,dispatch,getState,item_id),2000)
        }

      if (responseJson.error)
          return dispatch(fail_process(item_id,responseJson.error))

      if (responseJson.result)
          return dispatch(finish_process(item_id,responseJson.result))

      return dispatch(error("Nem elvárt üzenet érkezett a GET hivásból, "+ item.name))
    })
}


function progressTest(id,dispatch,time,times){
  var timeout = (time,percent,func) =>
      () => setTimeout(function(){
        dispatch(update_process(id,null,percent));
        func();
      }, time);

  setTimeout(()=>dispatch(update_process(id,"Kérés elküldve...",5)),1000);
  var func = timeout(time/times,100,()=>dispatch(finish_process(id,"Sajnalom...")))//finish_process(id)))
  for (var i=times-2;i>0;--i) {
      func = timeout(time/times,i/times*100,func)
  }
  return func
}
