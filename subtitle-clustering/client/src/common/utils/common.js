import React from "react";
import {Menu,Divider,Image,Container,Grid} from "semantic-ui-react";
import { StickyContainer, Sticky } from 'react-sticky';

export function da(attribute, value){
  var opts = {};
  if(typeof value !== 'undefined' && value !== null) {
    opts['"'+attribute+'"'] = value;
    return opts;
  }
  return false;
};

export function add_grid(columns,props) {
      return (<Grid {...props}>
                {columns.map( (props) => {
                  var [content,otherProps] = props
                  return (<Grid.Column {...otherProps}>
                              {content}
                          </Grid.Column>)
                  }
                )}
              </Grid>)
}

export function add_sticky(upper,lower,stickyStyle) {
      return [
              (
                <Sticky ref="sticky" {...stickyStyle}>
                  {upper}
               </Sticky>),
              (<StickyContainer>
                  {lower}
                </StickyContainer>)
            ]
}

export function CurrentChildrenDiv(props) {
      return unwrap(<wrap>
                {props.current.children}
                </wrap>)
}


//https://www.wptutor.io/web/js/react-multiple-elements-without-wrapper
export function unwrap(element) {
  return addKeys(element.props.children);
};

export function addKeys(arr) {
  if (!arr.map)
    return arr
  return arr.map((obj, idx) => {
    if (obj instanceof Object && obj.hasOwnProperty('key') && obj.key === null) {
      return React.cloneElement(obj, {key: idx});
    }
    return obj;
  });
};

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
