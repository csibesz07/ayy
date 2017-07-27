import {DELETE_TASK,ADD_TASK,MODIFY_TASK,LAST_PLACE,
        PROCESS_START,PROCESS_MESSAGE,PROCESS_FAILED,PROCESS_DONE} from "./builderConstants";

import {createReducer} from "common/utils/reducerUtils";

import { makeid,checkPos,deepCopy} from "common/utils/common"

function initReducer(state,payload,onlyCopyPos,deepCopyState) {
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
    if (onlyCopyPos) {
      state.splice(pos,1,deepCopy(state[pos]))
      newState=[...state]
    }
    else if (deepCopyState)
      newState=deepCopy(state)
    else
      newState=[...state]

    return {newState:newState,pos,id,
            name: payload.name || exists && state[pos].name,
            params: payload.params || exists && state[pos].params,
            exists}
}


export default createReducer({},{
  [MODIFY_TASK] : (state,payload) => {
        var {newState,pos,id,name,params} = initReducer(state,payload,true)
        newState[pos] = {
            id : id,
            name : name,
            params: params,
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
        var {newState,pos,exists} = initReducer(state,payload)
        if (exists) {
          newState.splice(payload.pos,1);
          return newState;
        }
        return state
      },


  [PROCESS_START]: (state,payload) => {
        var {newState,pos} = initReducer(state,payload,true)
        newState[pos].isFetching=true
        return newState;
    },
  [PROCESS_DONE]: (state,payload) => {
        var {newState,pos,exists} = initReducer(state,payload,true)
        if (exists) {
          newState[pos].isFetching=false
          newState[pos].result = payload.result
          return newState;
        }
        return state;
      },
  [PROCESS_FAILED]: (state,payload) => {
        var {newState,pos,id,exists} = initReducer(state,payload,true)
        if (exists) {
          newState[pos].isFetching=false
          newState[pos].result = undefined
          newState[pos].message = payload.message
          return newState;
        }
        return state;
    },
  [PROCESS_MESSAGE]: (state,payload) => {
        var {newState,pos,exists} = initReducer(state,payload,true)
        if (exists) {
          newState[pos].isFetching=true
          newState[pos].message = payload.message
          return newState;
        }
        return state;
    }}
)
