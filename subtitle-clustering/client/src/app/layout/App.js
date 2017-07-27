import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import {Header,Container,Segment,Divider, Icon} from "semantic-ui-react";
import TabBar from "features/tabs/TabBar";
import NavContainer from "features/NavContainer";
import Stepper from "features/msc/steps/Stepper"
import Tisztitas from "features/msc/info_tab/content/Tisztitas";
import Gyujtes from "features/msc/info_tab/content/Gyujtes";
import { da, CurrentChildrenDiv} from "common/utils/common"
import HeaderComponent from "features/HeaderComponent"
import BuilderContainer from "features/msc/builder_tab/BuilderContainer"
import BuilderStepContainer from "features/msc/builder_tab/BuilderStepContainer"

import {getTypeForTask,propsByType} from "features/msc/builder_tab/common"

import './App.css';
import './common.css';
import './scrollbar.css';
import './transition.css';

export default class App extends Component {

    render() {
        const tabs = [
            {name : "projects" , label: "Projektek", className: "header disabled", onClick: doNothing, img: "images/project.png", imgProps:{height:"45px",floated:"left"}},
            {name : "home", label : "Kezdőlap",desc:"Néhány szó erről az oldalról." ,image:"images/home.jpg"},
            {name : "msc", label : "Filmfeliratok klaszterezése",desc:"Segítünk kiválasztani következő filmedet",image:"images/moviesseats.jpg"}
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
        ];

        var HeaderContainer = NavContainer(HeaderComponent);
        var MainTabBarContainer=NavContainer(TabBar);
        var MscTabBarContainer=NavContainer(TabBar);
        var MainContainer = NavContainer(CurrentChildrenDiv)

        var StepperContainer=NavContainer(Stepper);

        var builderStepProps = {className: "stepper",
                            grid:"true",
                            sticky:"true",
                            vertical:"true",
                            fluid:true,
                            lower:{style:{padding:"2em"},className:"eleven wide"},
                            upper:{style:{paddingRight:"5%",
                                         marginLeft:"5%"}},
                            style:{marginLeft:"10%",width:"90%"},
                            size:"small",
                            stickyStyle:{style: {display:"flex",height:"80vh",overflowY:"auto"}},
                            gridProps:{className:"center five wide fixed"}}
                            //stickyStyle:{background:"transparent", zIndex:10}}}

        var lower ={...builderStepProps.lower.classname,className:"text centered"}
        var steppersProps = {...builderStepProps,
                    lower:{...builderStepProps.lower,
                        className: builderStepProps.lower.className + " text centered"}}

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
                      <div/>
                      <MscTabBarContainer
                      sticky lower={{className:"fluid"}}
                      upper={{style:{backgroundColor: "white"},className:"fluid center aligned"}} id="main-msc"
                      storeID="main-msc" icon='labeled' components={msc_tabs} compact pointing secondary
                      stickyStyle={{stickyStyle:{boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}}}>
                      <BuilderStepContainer selectedStoreID="main-selected"
                          storeID="main-msc-build" {...builderStepProps}>
                          {(pos) =>
                          <BuilderContainer pos={pos}/>}
                      </BuilderStepContainer>
                      <StepperContainer selectedStoreID="main-selected" storeID="main-msc-info"
                           components={msc_info_steps}
                           {...steppersProps}>
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
