import React from "react";
import {Menu,Divider} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

export default class ComponentSelector extends React.Component {
    render () {
      const {current,components} = this.props;

      var selected=components.find(component => component.name === current);
      var CurrentComponent;
      if (selected)
          CurrentComponent=selected.component;

      return ( <div>
                  {selected && CurrentComponent && <CurrentComponent {...selected.componentProps}/>}
              </div>
      )
    }
}
