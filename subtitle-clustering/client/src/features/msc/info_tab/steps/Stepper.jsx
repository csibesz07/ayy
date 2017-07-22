import React from "react";
import {Step,Divider} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import { StickyContainer, Sticky } from 'react-sticky';
import $ from 'jquery';
import Headroom from 'react-headroom';

import './Stepper.css';

export default class Stepper extends React.Component {
    render() {
        const {childrens, current, onClick,childName , displayComponents, ...otherProps} = this.props;

        const stepItems = childrens.map(stepInfo => {
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

        var selected=childrens.find(stepInfo => stepInfo.name === current);
        var Component=selected?selected.component:undefined;

        return (
            <div>
                <Headroom ref="headroom">
                <Step.Group style={{background:null}} {...otherProps}>
                  {stepItems}
                </Step.Group>
                </Headroom>
                {selected && displayComponents && Component!=undefined && <Component {...selected.componentProps}/>}
            </div>
        );
      }

      componentDidMount() {
        //elso render utan egybol unpinned lett scroll hatasara,
        //this.refs.headroom.setState({height:700})
      }
}
