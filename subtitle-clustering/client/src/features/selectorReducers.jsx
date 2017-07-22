import {SELECTED,SELECTED_AND_TO_SELECTOR,SELECTED_AND_CHILD_TO_SELECTOR} from "./selectorConstants";

import {createReducer} from "common/utils/reducerUtils";

export default createReducer({},{
  [SELECTED] : (state,payload) => ({...state,
    [payload.storeID] : {...state[payload.storeID],name: payload.selected}}),
  [SELECTED_AND_TO_SELECTOR] : (state,payload) => ({...state,
    [payload.storeID] : {...state[payload.storeID],name: payload.selected},
    [payload.selectedID]: {...state[payload.selectedID],name: payload.selected}}),
  [SELECTED_AND_CHILD_TO_SELECTOR] : (state,payload) => ({...state,
    [payload.storeID] : {...state[payload.storeID],name: payload.selected},
    [payload.selectedID]: {...state[payload.selectedID],name: state[payload.childID].name}}),
})
