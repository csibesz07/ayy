import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {
    Header,
    Container,
    Segment,
    Divider,
    Icon
} from "semantic-ui-react";

import TabBar from "features/tabs/TabBar";;
import NavContainer from "features/NavContainer";
import ComponentSelectorContainer from "features/ComponentSelectorContainer";

import ComponentSelector from "features/ComponentSelector";

import InfoTab from "features/msc/info_tab/InfoTab";

import Stepper from "features/msc/info_tab/steps/Stepper"

import Tisztitas from "features/msc/info_tab/content/Tisztitas";
import Gyujtes from "features/msc/info_tab/content/Gyujtes";

import { da } from "common/utils/common"

import './App.css';

class App extends Component {

    render() {
        const tabs = [
            {name : "projects" , label: "Projektek", className: "header disabled", onClick: doNothing, img: "images/project.png", imgProps:{height:"45px",centered:true,floated:"left"}},
            {name : "home", label : "Kezdőlap"},
            {name : "msc", label : "Filmfeliratok klaszterezése"}
        ];


        const msc_tabs = [
          {name : "build", label: "Cső építése"},
          {name : "info", label: "Általános leírás"}
        ]

        const msc_info_steps=[
          { name:'gyujt', icon: 'find', title: 'Gyüjtés', description: 'Feliratok gyüjtése'},
          { name:'tisztit', icon: 'filter', title: 'Tisztitás', description: 'Szavak szürése, átalakítása' },
          { name:'doc2vec', icon: 'sort numeric descending', title: 'Vektorizálás', description: 'Dokumentum jellem generálás' },
          { name:'cluster', icon: 'tags', title: 'Clusterezés', description: 'Hasonloságok felfedezése, csoportosítás' },
          { name:'abrazol', icon: 'line chart', title: 'Ábrázolás', description: 'Eredmény kiértékelése, megjelenitése' },
        ];

        var MainTabBarContainer=NavContainer(TabBar);
        var MscTabBarContainer=NavContainer(TabBar);

        var StepperContainer=NavContainer(Stepper);

        return (
          <StickyContainer>
            <div className="App">
              <div className="App-header">
                <Container>
                    <MainTabBarContainer inverted storeID="main-tab" id="main-tab" components={tabs} icon='labeled'/>
                </Container>
                <Header inverted as="h1">Hi</Header>
              </div>
              <Divider section hidden size="tiny"/>
                <ComponentSelectorContainer storeID="main-tab" components={tabs.slice(1)}>
                      <div/>
                      <MscTabBarContainer sticky lower="fluid" upper="fluid center aligned" id="main-msc" storeID="main-msc" icon='labeled' components={msc_tabs} compact pointing secondary>
                          <div/>
                          <StepperContainer sticky lower="text" upper="fluid center aligned" id="main-msc-info" storeID="main-msc-info" components={msc_info_steps}  size="tiny" stickyStyle={{zIndex:10}}>
                            <Gyujtes/>
                            <Tisztitas/>
                          </StepperContainer>
                      </MscTabBarContainer>
                </ComponentSelectorContainer>
            </div>
          </StickyContainer>
        );
    }

    componentDidUpdate() {
      this.refs.sticky.recomputeState();
    }
}

function doNothing(){}

//                <ComponentSelector StoreID="main-nav-selected" components={allComponents}/>
export default App;
