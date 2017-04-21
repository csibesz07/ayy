import React from "react";
import {Menu} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
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

    onSelected() {
      this.refs.sticky.recomputeState();
    }

    componentDidUpdate() {
      this.signalSelected();
    }

    render () {
      const {sticky,tabs, currentTab, onTabClick, ...otherProps} = this.props;

      const tabItems = tabs.map(tabInfo => {
          const {name, label, icon} = tabInfo;
          return (
              <Menu.Item
                  name={name}
                  content={label}
                  icon={icon}
                  active={currentTab === name}
                  onClick={() => onTabClick(name)}
              />
          );
      });

      var selectedHasComponent=false;

      const tabPanels = tabs.map(tabInfo => {
          const {name, component : TabComponent, componentProps} = tabInfo;
          if (TabComponent) {
            if (name===currentTab)
              selectedHasComponent=true;
            return (
                <ToggleDisplay show={name === currentTab} key={name}>
                    <TabComponent ref={name === currentTab && 'selected'} {...componentProps}/>
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

      return (
          <div>
            <Sticky isActive={sticky!==undefined || !selectedHasComponent} ref='sticky' stickyStyle={{background:'white',zIndex:20}}>
                  <Menu {...otherProps}>
                      {tabItems}
                  </Menu>
                </Sticky>
              {tabPanels}
          </div>
      );
    }
}
