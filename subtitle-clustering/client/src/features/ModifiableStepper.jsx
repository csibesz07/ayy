import Stepper from "features/msc/steps/Stepper"
import React from "react";

import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelect} from "./selector";
import {selectAndChildToSelected,selectAndToSelector,select} from "./selectorActions";

export default class ModifiableStepper extends React.Component {
    render() {
        return (<div>
                  <Stepper {...this.props}/>
                </div>)
      }
}
