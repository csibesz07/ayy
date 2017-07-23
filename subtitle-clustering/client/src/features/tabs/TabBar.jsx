import React from "react";
import {Menu,Divider,Image,Container} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

import ComponentSelectorContainer from "features/ComponentSelectorContainer"

import './TabBar.css';

export default class TabBar extends React.Component {
    render () {
      const {sticky,upper,lower,current, onClick,align, components, childName,displayComponents, ...otherProps} = this.props;

      var that=this;

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
                      active={current === name}
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
                    active={current === name}
                    onClick={() => onClick(name,childName)}
                    style={{style}}
                    {...otherProps}
                />
            );
      });

      if (sticky)
        return (
              <div>
                <Sticky style={{background:"white !important"}} stickyStyle={{zIndex:"20 !important",boxShadow:"0px 3px 5px rgba(0, 0, 0, 0.2) !important"}}>
                  <Container className={upper}>
                    <Menu {...otherProps}>
                        {tabItems}
                    </Menu>
                  </Container>
                </Sticky>
                <StickyContainer>
                  <Container className={lower}>
                      <div/>
                      <ComponentSelectorContainer components={components}  {...otherProps}/>
                  </Container>
                </StickyContainer>
              </div>
          );
          return (
                <div>
                    <Container className={upper}>
                      <Menu {...otherProps}>
                          {tabItems}
                      </Menu>
                    </Container>
                    <Container className={lower}>
                        <div/>
                        <ComponentSelectorContainer components={components}  {...otherProps}/>
                    </Container>
                </div>
            );
    }
}
