import {SELECTED,SELECTED_AND_TO_SELECTOR,SELECTED_AND_CHILD_TO_SELECTOR} from "./selectorConstants";

import {createReducer} from "common/utils/reducerUtils";

export default createReducer({},{
  [SELECTED] : (state,payload) => ({...state,
    [payload.storeID] : {...state[payload.storeID],id: payload.selected}}),
  [SELECTED_AND_TO_SELECTOR] : (state,payload) => ({...state,
    [payload.storeID] : {...state[payload.storeID],id: payload.selected},
    [payload.selectedID]: {...state[payload.selectedID],id: payload.selected}}),
  [SELECTED_AND_CHILD_TO_SELECTOR] : (state,payload) => ({...state,
    [payload.storeID] : {...state[payload.storeID],id: payload.selected},
    [payload.selectedID]: {...state[payload.selectedID],id: state[payload.childID].id}}),
})
