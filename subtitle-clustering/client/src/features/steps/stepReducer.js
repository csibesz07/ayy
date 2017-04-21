import {createReducer} from "common/utils/reducerUtils";

import {STEP_SELECTED} from "./stepConstants";

const initialState = {
    currentStep : "home",
};

export function selectStep(state, payload) {
    return {
        currentStep : payload.stepName,
    };
}

export default createReducer(initialState, {
    [STEP_SELECTED] : selectStep,
});
