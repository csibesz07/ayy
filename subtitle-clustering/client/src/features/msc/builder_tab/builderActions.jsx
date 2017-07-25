import {DELETE_TASK,ADD_TASK,MODIFY_TASK,PROCESS_TASKS} from "./builderConstants";

export function add_task(task) {
  return {
    type : ADD_TASK,
    payload : {"task":task}
  }
}

export function delete_task(position) {
    return {
      type : DELETE_TASK,
      payload : {"task_position":position}
    }
}

export function modify_taks(old_position,new_task) {
  return {
    type : MODIFY_TASK,
    payload : {"old_task_position":old_position,
               "new_task": new_task}
  }
}

export function process_tasks() {
  return {
    type : PROCESS_TASKS,
  }
}
