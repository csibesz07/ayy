import {ERROR,CLEAR_ERROR} from "./uiConstants";

import {createReducer} from "common/utils/reducerUtils";

export default createReducer({},{
  [ERROR] : (state,payload) => ({...state,error:{message: payload.message,
                                                 number:state.error && state.error.number+1 || 0}}),
  [CLEAR_ERROR] : (state,payload) => ({...state,error: {...state.error,
                                                    message: undefined,
                                                    number: payload.clear_number?0:state.error && state.error.number}}),
})
