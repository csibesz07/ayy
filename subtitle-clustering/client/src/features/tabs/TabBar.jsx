import React from "react";
import {Menu,Divider,Image,Container,Grid} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

import './TabBar.css';

import {add_sticky,add_grid} from "common/utils/common"

export default class TabBar extends React.Component {
    render () {
      const {divContainer,grid,gridStyle,sticky,stickyStyle,upper,lower,current, onClick,align, components, childName,displayComponents, ...otherProps} = this.props;

      const tabItems =  components.map(tabInfo => {
          const {img,imgProps,name, label, icon,style, ...otherProps} = tabInfo;
          if (img)
            return (
                <div>
                  <Image src={img} {...imgProps} />
                  <Menu.Item
                      key={name}
                      name={name}
                      content={label}
                      icon={icon}
                      active={current.name === name}
                      onClick={() => onClick(name,childName)}
                      style={{style}}
                      {...otherProps}
                  />
                </div>
            );
          else
            return (
                <Menu.Item
                    key={name}
                    name={name}
                    content={label}
                    icon={icon}
                    active={current.name === name}
                    onClick={() => onClick(name,childName)}
                    style={{style}}
                    {...otherProps}
                />
            );
      });

      var up = (<Container {...upper}>
                  <Menu {...otherProps}>
                      {tabItems}
                  </Menu>
                </Container>)

        var low = (<Container {...lower}>
                        <div/>
                        {current.children}
                     </Container>)

      if (sticky) {
          //var [upp,loww] = add_sticky.bind(this)(up,upper,low,stickyStyle)
          var [upp,loww] = add_sticky(up,low,stickyStyle)
          up=upp
          low = loww
        }

        var Final = (<div>
                    {up}
                    {low}
                    </div>)

      if (grid)
          Final = add_grid([[up,upper],[low,lower]])

      return Final
    }

    componentDidMount() {
      this.refs.sticky.recomputeState()
    }
}
