import {DELETE_TASK,ADD_TASK,MODIFY_TASK,PROCESS_TASKS,LAST_PLACE,
        PROCESS_START,PROCESS_MESSAGE,PROCESS_FAILED,PROCESS_DONE} from "./builderConstants";

import { checkPos} from "common/utils/common"

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
    const state= getState()
    const id = state.builder[pos].id

    //async fetch
    setTimeout(function(){
      dispatch(finish_process(id));
    }, 3000);
  }
}
