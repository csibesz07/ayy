import React from "react";
import {Menu,Divider,Container,Header} from "semantic-ui-react";
import ToggleDisplay from 'react-toggle-display';
import $ from 'jquery';
import { StickyContainer, Sticky } from 'react-sticky';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import "./Header.css"

export default class HeaderComponent extends React.Component {
    constructor(props) {
      super(props)
    }

    render () {
      const { children,current } = this.props

      return (<div>
                  <ReactCSSTransitionGroup transitionName="carousel-swap">
                        <Container id="header-image" floated key={current.image}
                            style={{backgroundImage:"url("+current.image+")"}} fluid/>
                  </ReactCSSTransitionGroup>
                  <Container fluid id="App-header">
                      {children}
                      <ReactCSSTransitionGroup transitionName="cross-fade"
                               transitionEnterTimeout={1000} transitionLeaveTimeout={400}>
                        <Header fluid id="header-text" key={current.image}
                        inverted as="h1">{current.desc}</Header>
                      </ReactCSSTransitionGroup>
                  </Container>
                </div>
          )
    }
}
