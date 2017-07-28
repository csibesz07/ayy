import {ERROR,CLEAR_ERROR} from "./uiConstants";


export function error(message) {
    return {
        type: ERROR,
        payload: {
          message:message
        }
    }
}

export function clear_error(clearNumber) {
    return {
        type: CLEAR_ERROR,
        payload: { clear_number:clearNumber}
    }
}
