import {TYPES_FETCHED,TYPES_FETCH} from "./typeFetcherConstants";

import {createReducer} from "common/utils/reducerUtils";

export default createReducer({},{
  [TYPES_FETCHED] : (state,payload) => payload.types,
  [TYPES_FETCH] : (state,payload) => state,
})
