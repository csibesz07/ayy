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

import ComponentSelector from "features/ComponentSelector";


export default class InfoTab extends Component {
    render() {
        const steps=[
          { name:'gyujt', icon: 'find', title: 'Gyüjtés', description: 'Feliratok gyüjtése'},
          { name:'tisztit', icon: 'filter', title: 'Tisztitás', description: 'Szavak szürése, átalakítása' },
          { name:'doc2vec', icon: 'sort numeric descending', title: 'Vektorizálás', description: 'Dokumentum jellem generálás' },
          { name:'cluster', icon: 'tags', title: 'Clusterezés', description: 'Hasonloságok felfedezése, csoportosítás' },
          { name:'abrazol', icon: 'line chart', title: 'Ábrázolás', description: 'Eredmény kiértékelése, megjelenitése' },
        ];

        const stepProps= {
          fluid:true,pointing:true,size:"tiny",selectedStoreID:"main-nav-selected",storeID:'msc-stepper',childrens:steps,displayComponent:false
        };

        var StepperContainer=NavContainer(Stepper);

        return (
          <StickyContainer>
              <Sticky style={{transition: "box-shadow 1s ease"}} stickyStyle={{background:"white !important",zIndex:20,boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)"}} ref={"sticky"}>
                <StepperContainer selectedStoreID="main-selected" storeID='main-msc-info' childrens={steps} displayComponent={false} fluid pointing size="tiny"/>
              </Sticky>
              <Divider section hidden/>
              <Divider section hidden/>
              <Container fluid text>
                  <ComponentSelectorContainer storeID="main-msc-info" components={steps}/>
              </Container>
          </StickyContainer>
        );
    }

    componentDidUpdate() {
      this.refs.sticky.recomputeState();
    }
}

function doNothing(){}
