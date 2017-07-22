import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {
    Header,
    Container,
    Segment,
    Divider,
    Icon
} from "semantic-ui-react";

import TabBar from "features/tabs/TabBar";
import Stepper from "features/msc/info_tab/steps/Stepper";
import NavContainer from "features/NavContainer";
import ComponentSelectorContainer from "features/ComponentSelectorContainer";

import Tisztitas from "features/msc/info_tab/content/Tisztitas";
import Gyujtes from "features/msc/info_tab/content/Gyujtes";

import ComponentSelector from "features/ComponentSelector";

import './App.css';

class App extends Component {

    render() {
        const steps=[
          { name:'gyujt', component: Gyujtes, icon: 'find', title: 'Gyüjtés', description: 'Feliratok gyüjtése'},
          { name:'tisztit',component: Tisztitas, icon: 'filter', title: 'Tisztitás', description: 'Szavak szürése, átalakítása' },
          { name:'doc2vec', icon: 'sort numeric descending', title: 'Vektorizálás', description: 'Dokumentum jellem generálás' },
          { name:'cluster', icon: 'tags', title: 'Clusterezés', description: 'Hasonloságok felfedezése, csoportosítás' },
          { name:'abrazol', icon: 'line chart', title: 'Ábrázolás', description: 'Eredmény kiértékelése, megjelenitése' },
        ];

        const stepProps= {
          fluid:true,pointing:true,size:"tiny",selectedStoreID:"main-nav-selected",storeID:'msc-stepper',childrens:steps,displayComponent:false
        };

        var StepperContainer=NavContainer(Stepper);

        const tabs = [
            {name : "home",title: "", subtitle:"", image:"", label : "Home"},
            {name : "msc", icon:"film",component : StepperContainer, componentProps:stepProps, label : "Movie Subtitle Clustering"}
        ];

        var TabBarContainer=NavContainer(TabBar);
        var HeaderComponent=NavContainer(ComponentSelector);
        var allComponents=[...steps,...tabs];

        return (
          <StickyContainer withTaps={tabs}>
            <div className="App">
              <div className="App-header">
                <Header inverted as="h1">Hi</Header>
              </div>
              <Sticky style={{transition: "box-shadow 1s ease"}} stickyStyle={{background:"white !important",zIndex:20,boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}} ref={"sticky"}>
                <TabBarContainer selectedStoreID="main-nav-selected" id="main-tab-bar" storeID="main-tab" childrens={tabs} icon='labeled' stackable pointing secondary fluid widths={2} size="large" displayComponents/>
              </Sticky>
              <Divider section hidden/>
              <Divider section hidden/>
              <Container fluid text>
                  <ComponentSelectorContainer storeID="main-nav-selected" components={allComponents}/>
              </Container>
            </div>
          </StickyContainer>
        );
    }

    componentDidUpdate() {
      this.refs.sticky.recomputeState();
    }
}


//                <ComponentSelector StoreID="main-nav-selected" components={allComponents}/>
export default App;
