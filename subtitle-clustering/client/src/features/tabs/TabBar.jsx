import React from "react";
import {Menu,Divider} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

import './TabBar.css';

export default class TabBar extends React.Component {
    render () {
      const {current, onClick, childrens, childName,displayComponents, ...otherProps} = this.props;

      var that=this;

      const tabItems = childrens.map(tabInfo => {
          const {name, label, icon} = tabInfo;
          return (
              <Menu.Item
                  key={name}
                  name={name}
                  content={label}
                  icon={icon}
                  active={current === name}
                  onClick={() => onClick(name,childName)}
              />
          );
      });

      var selected=childrens.find(tabInfo => tabInfo.name === current);
      const Component=selected?selected.component:undefined;

      return (
            <div>
                <Menu {...otherProps}>
                    {tabItems}
                </Menu>
                {selected && displayComponents && Component!=undefined && <Component {...selected.componentProps}/>}
            </div>
        );
    }
}
