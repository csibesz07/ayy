import React from "react";
import {Step,Divider,Container,Grid,Dimmer,Loader,Segment,Image} from "semantic-ui-react";
import { StickyContainer, Sticky } from 'react-sticky';

import './Stepper.css';
import Headroom from "react-headroom"

import {add_sticky,add_grid} from "common/utils/common"

export default class Stepper extends React.Component {

    render() {
        const {isFetching,grid,gridProps,sticky,stickyStyle,upper,lower,current, onClick, align, components, childName, ...otherProps} = this.props;

        const loading =  <span>
                              <Image inline size="small" src='images/mini-paragraph.png' />
                        </span>

        const stepItems = components.map(stepInfo => {
            const {name,id,icon,description,isStepFetching} = stepInfo;
            return (
                <Step
                    {...stepInfo}
                    description={((isFetching || isStepFetching) && loading) || description}
                    icon={((isFetching || isStepFetching) && 'spinner loading') || icon}
                    key={id || name}
                    name={name}
                    active={current.id === name || current.id ===id}
                    onClick={() => onClick(id || name,childName)}
                />
            );
        });

        var up = (<Container key="container" {...upper}>
                        <Step.Group key="step" style={{background:null}} {...otherProps}>
                          {stepItems}
                        </Step.Group>
                      </Container>)

        var low = (<Container {...lower}>
                      {current.children}
                    </Container>)

        if (sticky) {
            var [upp,loww] = add_sticky(up,low,stickyStyle)
            up=upp
            low = loww
          }

          var Final = (<div>
                      {up}
                      {low}
                      </div>)

        if (grid)
            Final = add_grid([[up,gridProps],[low,lower]],{})

        return Final
      }
}
