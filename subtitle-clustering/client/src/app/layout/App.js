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

import ModifiableStepperContainer from "features/ModifiableStepperContainer"
import Stepper from "features/msc/steps/Stepper"

import Tisztitas from "features/msc/info_tab/content/Tisztitas";
import Gyujtes from "features/msc/info_tab/content/Gyujtes";

import { da, CurrentChildrenDiv} from "common/utils/common"

import HeaderComponent from "features/HeaderComponent"

import './App.css';
import './common.css';
import './scrollbar.css';
import './transition.css';

export default class App extends Component {

    render() {
        const tabs = [
            {name : "projects" , label: "Projektek", className: "header disabled", onClick: doNothing, img: "images/project.png", imgProps:{height:"45px",centered:true,floated:"left"}},
            {name : "home", label : "Kezdőlap",desc:"Néhány szó erről az oldalról." ,image:"images/moviesseats.jpg"},
            {name : "msc", label : "Filmfeliratok klaszterezése",desc:"Segítünk kiválasztani következő filmedet",image:"images/home.jpg"}
        ];


        const msc_tabs = [
          {key:"build",name : "build", label: "Cső építése"},
          {key:"info",name : "info", label: "Általános leírás"}
        ]

        const msc_info_steps=[
          { name:'gyujt', icon: 'find', title: 'Gyüjtés'},
          { name:'tisztit', icon: 'filter', title: 'Tisztitás'},
          { name:'doc2vec', icon: 'sort numeric descending', title: 'Vektorizálás'},
          { name:'cluster', icon: 'tags', title: 'Clusterezés'},
          { name:'abrazol', icon: 'line chart', title: 'Ábrázolás'},
          { name:'gyujt2', icon: 'find', title: 'Gyüjtés'},
          { name:'tisztit2', icon: 'filter', title: 'Tisztitás'},
          { name:'doc2vec2', icon: 'sort numeric descending', title: 'Vektorizálás'},
          { name:'cluster2', icon: 'tags', title: 'Clusterezés'},
          { name:'abrazol2', icon: 'line chart', title: 'Ábrázolás'},
          { name:'gyujt3', icon: 'find', title: 'Gyüjtés'},
          { name:'tisztit3', icon: 'filter', title: 'Tisztitás'},
          { name:'doc2vec3', icon: 'sort numeric descending', title: 'Vektorizálás'},
          { name:'cluster3', icon: 'tags', title: 'Clusterezés'},
          { name:'abrazol3', icon: 'line chart', title: 'Ábrázolás'},
          { name:'gyujt4', icon: 'find', title: 'Gyüjtés'},
          { name:'tisztit4', icon: 'filter', title: 'Tisztitás'},
          { name:'doc2vec4', icon: 'sort numeric descending', title: 'Vektorizálás'},
          { name:'cluster4', icon: 'tags', title: 'Clusterezés'},
          { name:'abrazol4', icon: 'line chart', title: 'Ábrázolás'},
        ];

        var HeaderContainer = NavContainer(HeaderComponent);
        var MainTabBarContainer=NavContainer(TabBar);
        var MscTabBarContainer=NavContainer(TabBar);
        var MainContainer = NavContainer(CurrentChildrenDiv)

        var StepperContainer=NavContainer(Stepper);

        var steppersProps = {className: "stepper",
                            grid:"true",
                            sticky:"true",
                            vertical:"true",
                            lower:{className:"text twelve wide centered"},
                            upper:{className:"center four wide fixed"},
                            style:{marginLeft:"20%"},
                            size:"small",
                            stickyStyle:{style: {display:"flex",height:"80vh",overflowY:"auto"}}}
                            //stickyStyle:{background:"transparent", zIndex:10}}}

        return (
          <StickyContainer>
            <div id="app">
              <HeaderContainer storeID='main-tab' components={tabs}>
                  <div>
                      <MainTabBarContainer style={{margin:"0 !important",width:"100% !important"}}
                      upper={{className:"fluid",style:{margin:"0 !important",width:"100% !important"}}} pointing borderless sticky
                      inverted storeID="main-tab" id="main-tab" components={tabs} icon='labeled'/>
                  </div>
              </HeaderContainer>
          <StickyContainer>
                <MainContainer storeID="main-tab" components={tabs.slice(1)}>
                      <MscTabBarContainer
                      sticky lower={{className:"fluid"}}
                      upper={{style:{backgroundColor: "white"},className:"fluid center aligned"}} id="main-msc"
                      storeID="main-msc" icon='labeled' components={msc_tabs} compact pointing secondary
                      stickyStyle={{stickyStyle:{boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}}}>
                        <ModifiableStepperContainer selectedStoreID="main-selected"
                            storeID="main-msc-build" components={msc_info_steps} {...steppersProps}>
                            <Gyujtes/>
                            <Tisztitas/>
                        </ModifiableStepperContainer>
                         <StepperContainer selectedStoreID="main-selected" storeID="main-msc-info"
                              components={msc_info_steps} {...steppersProps}>
                            <Gyujtes/>
                            <Tisztitas/>
                          </StepperContainer>
                      </MscTabBarContainer>
                      <MscTabBarContainer
                      sticky lower={{className:"fluid"}}
                      upper={{style:{backgroundColor: "white"},className:"fluid center aligned"}} id="main-msc"
                      storeID="main-msc" icon='labeled' components={msc_tabs} compact pointing secondary
                      stickyStyle={{stickyStyle:{boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}}}>
                        <ModifiableStepperContainer selectedStoreID="main-selected"
                            storeID="main-msc-build" components={msc_info_steps} {...steppersProps}>
                            <Gyujtes/>
                            <Tisztitas/>
                        </ModifiableStepperContainer>
                         <StepperContainer selectedStoreID="main-selected" storeID="main-msc-info"
                              components={msc_info_steps} {...steppersProps}>
                            <Gyujtes/>
                            <Tisztitas/>
                          </StepperContainer>
                      </MscTabBarContainer>
                </MainContainer>
                </StickyContainer>
            </div>
          </StickyContainer>
        );
    }

}

function doNothing(){}

//                <ComponentSelector StoreID="main-nav-selected" components={allComponents}/>
