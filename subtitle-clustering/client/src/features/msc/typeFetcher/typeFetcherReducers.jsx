import {FETCH_TYPES} from "./typeFetcherConstants";

import {createReducer} from "common/utils/reducerUtils";

export default createReducer({},{
  [FETCH_TYPES] : (state,payload) => ({...state,
    [payload.storeID] : {...state[payload.storeID],name: payload.selected}}),
})
