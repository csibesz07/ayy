import React from "react";
import {Step} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery';

export default class Stepper extends React.Component {
    constructor(props) {
        super(props);
    }

    onSelected() {
      this.refs.sticky.recomputeState();
    }

    signalSelected() {
      try {
        if (this.refs.selected && this.refs.selected.getWrappedInstance().onSelected){
          this.refs.selected.getWrappedInstance().onSelected();
        }
      }
      //ignore error
      catch(err) {

      }
    }

    componentDidUpdate() {
      this.signalSelected();
    }

    render() {
        const {sticky,steps, currentStep, onStepClick, ...otherProps} = this.props;

        const stepItems = steps.map(stepInfo => {
            const {name} = stepInfo;

            return (
                <Step
                    {...stepInfo}
                    name={name}
                    active={currentStep === name}
                    onClick={() => onStepClick(name)}
                />
            );
        });

        const stepPanels = steps.map(stepInfo => {
            const {name, component : StepComponent, componentProps} = stepInfo;
            if (StepComponent)
                return (
                  <ToggleDisplay show={name === currentStep} key={name}>
                    <StepComponent {...componentProps}/>
                  </ToggleDisplay>
                )
        })

        var isPanel=sticky == "panels";

        if (isPanel)
          return (
                <Sticky ref='sticky' stickyStyle={{background:'white',zIndex:20}}>
                      <Step.Group {...otherProps}>
                        {stepItems}
                      </Step.Group>
                  <br/>
                  {stepPanels}
                </Sticky>
          );

        return (
            <div>
                  <Sticky isActive={sticky!==undefined} ref='sticky' stickyStyle={{background:'white',zIndex:20}}>
                      <Step.Group {...otherProps}>
                        {stepItems}
                      </Step.Group>
                  </Sticky>
                  <br/>
                  {stepPanels}
            </div>
        );
      }
}
