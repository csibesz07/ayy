import React from "react";
import {Step} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery';

export default class Stepper extends React.Component {
    constructor(props) {
        super(props);
        this.state={currentStep:props.initialStep};
    }

    render() {
        const {steps, currentStep, onStepClick, ...otherProps} = this.props;

        const stepItems = steps.map(stepInfo => {
            const {name} = stepInfo;

            return (
                <Step
                    {...stepInfo}
                    name={name}
                    active={this.state.currentStep === name}
                    onClick={() => {onStepClick(name);this.setState({'currentStep':name})}}
                />
            );
        });

        const stepPanels = steps.map(stepInfo => {
            const {name, component : StepComponent, componentProps} = stepInfo;
            if (StepComponent)
                return (
                  <ToggleDisplay show={name === this.state.currentStep} key={name}>
                    <StepComponent {...componentProps}/>
                  </ToggleDisplay>
                )
        })

        return (
            <div>
                <Step.Group {...otherProps}>
                  {stepItems}
                </Step.Group>
                {stepPanels[0] && <br/>}
                {stepPanels}
            </div>
        );
      }
}
