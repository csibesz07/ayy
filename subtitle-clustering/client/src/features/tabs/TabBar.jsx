import React from "react";
import {Menu} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
        var initialTab=props.initialTab;
        if (!initialTab)
          initialTab=props.tabs[0]?props.tabs[0].name:undefined;
        this.state={currentTab:initialTab};
    }

    render () {
      const {sticky,tabs, initialTab, onTabClick, ...otherProps} = this.props;

      const tabItems = tabs.map(tabInfo => {
          const {name, label, icon} = tabInfo;
          return (
              <Menu.Item
                  name={name}
                  content={label}
                  icon={icon}
                  active={this.state.currentTab === name}
                  onClick={() => {onTabClick(name);this.setState({currentTab:name});}}
              />
          );
      });

      const tabPanels = tabs.map(tabInfo => {
          const {name, component : TabComponent, componentProps} = tabInfo;
          if (TabComponent) {
            return (
                <ToggleDisplay show={name === this.state.currentTab} key={name}>
                    <TabComponent ref={name === this.state.currentTab && 'selected'} {...componentProps}/>
                </ToggleDisplay>
            )
          }
      })

      var isPanel=sticky == "panels";

      if (isPanel)
        return (
          <Sticky ref='sticky' stickyStyle={{background:'white',zIndex:20}}>
              <Menu {...otherProps}>
                  {tabItems}
              </Menu>
          {tabPanels}
          </Sticky>
        );

      if (sticky!==undefined)
        return (
            <div>
              <Sticky isActive={sticky!==undefined} ref='sticky' stickyStyle={{background:'white',zIndex:20}}>
                    <Menu {...otherProps}>
                        {tabItems}
                    </Menu>
                  </Sticky>
                {tabPanels}
            </div>
        );

        return (
            <div>
                <Menu {...otherProps}>
                    {tabItems}
                </Menu>
                {tabPanels}
            </div>
        );
    }
}

TabBar.defaultProps = {
  currentTab: undefined
};
