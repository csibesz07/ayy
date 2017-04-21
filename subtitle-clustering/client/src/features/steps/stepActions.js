import {STEP_SELECTED} from "./stepConstants";

export function selectStep(stepName) {
    return {
        type : STEP_SELECTED,
        payload : {stepName},
    };
}
