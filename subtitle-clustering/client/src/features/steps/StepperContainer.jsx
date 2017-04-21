import {connect} from "react-redux";

import Stepper from "./Stepper";

import {selectCurrentStep} from "./stepSelectors";
import {selectStep} from "./stepActions";

const mapState = (state) => {
    const currentStep = selectCurrentStep(state);
    return {currentStep};
}

const actions = {onStepClick : selectStep};

export default connect(mapState, actions,null,{ withRef: true })(Stepper);
