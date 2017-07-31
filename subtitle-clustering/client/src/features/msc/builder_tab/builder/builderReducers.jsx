import {DELETE_TASK,ADD_TASK,MODIFY_TASK,LAST_PLACE,
        PROCESS_START,PROCESS_MESSAGE,PROCESS_FAILED,PROCESS_DONE,
        CLEAR_TASKS} from "./builderConstants";

import {createReducer} from "common/utils/reducerUtils";

import { makeid,checkPos,deepCopy,mergeRecursive} from "common/utils/common"

function initReducer(state,payload,arrayCopy,onlyCopyPos) {
    if (!checkPos(payload.pos) && !payload.id)
        throw new Error("No id and no pos provided.")

    var id=payload.id
    var pos = payload.pos
    if (pos && id && pos!=state.findIndex(item=>item.id==id))
          throw new Error("ID and position point to different item.")
    else {
      if (!checkPos(pos)) pos =state.findIndex(item=>item.id==id)
      else if (!id) id = state[pos].id
    }
    var exists = -1 < pos && pos < state.length

    var newState
    if (!arrayCopy && !onlyCopyPos)
      newState=deepCopy(state)
    else {
      newState = state
      if (arrayCopy)
        newState = [...state]
      if (onlyCopyPos)
          newState.splice(pos,1,deepCopy(state[pos]))
    }

    return {newState:newState,pos,id,
            name: payload.name || exists && state[pos].name,
            params: payload.params || exists && state[pos].params,
            exists}
}


export default createReducer({},{
  [CLEAR_TASKS] : (state,payload) => {
      var newState = state.map(item => ({...item,isFetching:false}))
      return newState;
  },
  [MODIFY_TASK] : (state,payload) => {
        var {newState,pos,id,name,params} = initReducer(state,payload,true,true)
        var param = deepCopy(state[pos].params)
        mergeRecursive(param,params)
        newState[pos] = {
            id : id,
            name : name,
            params: param,
            ...state[pos].other,...payload.other}
        return newState;
      },
  [ADD_TASK]: (state,payload) => {
        const pos = payload.pos == LAST_PLACE? state.length : payload.pos;
        var newState  = [...state]
        newState.insert(pos,{
                id : makeid(state.map(task=>task.id)),
                name : payload.name,
                params: payload.params,
                ...payload.other})
        return newState;
      },
  [DELETE_TASK]: (state,payload) => {
        var {newState,pos,exists} = initReducer(state,payload,true)
        if (exists) {
          newState.splice(payload.pos,1);
          return newState;
        }
        return state
      },


  [PROCESS_START]: (state,payload) => {
        var {newState,pos} = initReducer(state,payload,true,true)
        newState[pos].isFetching=true
        newState[pos].result={progress: {message:"Előkészités...",percent:0}}
        return newState;
    },
  [PROCESS_DONE]: (state,payload) => {
        var {newState,pos,exists} = initReducer(state,payload,true,true)
        if (exists) {
          newState[pos].isFetching=false
          newState[pos].result = {progress: {message:"Végrehajtva",percent:100},
                                  content:payload.result}
          return newState;
        }
        return state;
      },
  [PROCESS_FAILED]: (state,payload) => {
        var {newState,pos,id,exists} = initReducer(state,payload,true,true)
        if (exists) {
          newState[pos].isFetching=false
          newState[pos].result = {...newState[pos].result,
                                  error:payload.message}
          return newState;
        }
        return state;
    },
  [PROCESS_MESSAGE]: (state,payload) => {
        var {newState,pos,exists} = initReducer(state,payload,true,true)
        if (exists) {
          newState[pos].isFetching= true
          newState[pos].result = {progress:
                                      {message:payload.message,
                                      percent:payload.percent}}
          return newState;
        }
        return state;
    }}
)
