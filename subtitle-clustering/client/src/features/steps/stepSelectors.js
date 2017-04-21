import {createSelector} from "reselect";

export const selectSteps = state => state.steps;

export const selectCurrentStep = createSelector(
    selectSteps,
    step => step.currentStep
);
