import React from "react";
import {Menu,Divider} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

export default class ComponentSelector extends React.Component {
    render () {
      const {current,components,children} = this.props;
      if (!components)
          return (null)
      var selected=components.findIndex(component => component.name === current);
      var CurrentComponent;
      if (selected>-1)
          return (
            <div>
              <div/>
              {React.Children.map(children, (child, i) => {
                 if (i == selected)
                    return child
                 return (null)
              })}
            </div>
          )
      return (<div/>)
    }
}
