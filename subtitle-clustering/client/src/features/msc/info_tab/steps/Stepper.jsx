import React from "react";
import {Step,Divider,Container} from "semantic-ui-react";
import { StickyContainer, Sticky } from 'react-sticky';

import './Stepper.css';
import Headroom from "react-headroom"

import ComponentSelectorContainer from "features/ComponentSelectorContainer";

export default class Stepper extends React.Component {
    render() {
        const {sticky,stickyStyle,upper,lower,current, onClick, align, components, childName, ...otherProps} = this.props;

        const stepItems = components.map(stepInfo => {
            const {name} = stepInfo;
            return (
                <Step
                    {...stepInfo}
                    key={name}
                    name={name}
                    active={current=== name}
                    onClick={() => onClick(name,childName)}
                />
            );
        });

        if (sticky)
            return (<div>
                      <Sticky stickyStyle={stickyStyle}>
                        <Container className={upper}>
                          <Step.Group style={{background:null}} {...otherProps}>
                            {stepItems}
                          </Step.Group>
                        </Container>
                      </Sticky>
                      <Container className={lower}>
                        <ComponentSelectorContainer components={components} {...otherProps}/>
                      </Container>
                    </div>
            );
          return (<div>
                    <Container className={upper}>
                      <Step.Group style={{background:null}} {...otherProps}>
                        {stepItems}
                      </Step.Group>
                    </Container>
                    <Container className={lower}>
                      <ComponentSelectorContainer components={components} {...otherProps}/>
                    </Container>
                  </div>
          );
      }
}
