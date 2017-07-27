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
      return (<Grid {...props} stackable>
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
              (<div>
               <Sticky ref="sticky" {...stickyStyle}>
                  {upper}
               </Sticky>
              </div>),
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

export function makeid(previous_ids) {
  var id = "first";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  while (previous_ids.contains(id)) {
    id = ""
    for (var i = 0; i < 5; i++)
      id += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return id;
}

export function checkPos(pos) {
  return !(pos==undefined || pos==null || pos<0)
}


export function deepCopy(obj) {
    if(obj == null || typeof(obj) !== 'object'){
        return obj;
    }
    //make sure the returned object has the same prototype as the original
    var ret = object_create(obj.constructor.prototype);
    for(var key in obj){
        ret[key] = deepCopy(obj[key]);
    }
    return ret;
}

var object_create = Object.create;
if (typeof object_create !== 'function') {
    object_create = function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

/**
 * Deep copy an object (make copies of all its object properties, sub-properties, etc.)
 * An improved version of http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
 * that doesn't break if the constructor has required parameters
 *
 * It also borrows some code from http://stackoverflow.com/a/11621004/560114
 */
export function deepCopyCircular(src, /* INTERNAL */ _visited, _copiesVisited) {
    if(src === null || typeof(src) !== 'object'){
        return src;
    }

    //Honor native/custom clone methods
    if(typeof src.clone == 'function'){
        return src.clone(true);
    }

    //Special cases:
    //Date
    if(src instanceof Date){
        return new Date(src.getTime());
    }
    //RegExp
    if(src instanceof RegExp){
        return new RegExp(src);
    }
    //DOM Element
    if(src.nodeType && typeof src.cloneNode == 'function'){
        return src.cloneNode(true);
    }

    // Initialize the visited objects arrays if needed.
    // This is used to detect cyclic references.
    if (_visited === undefined){
        _visited = [];
        _copiesVisited = [];
    }

    // Check if this object has already been visited
    var i, len = _visited.length;
    for (i = 0; i < len; i++) {
        // If so, get the copy we already made
        if (src === _visited[i]) {
            return _copiesVisited[i];
        }
    }

    //Array
    if (Object.prototype.toString.call(src) == '[object Array]') {
        //[].slice() by itself would soft clone
        var ret = src.slice();

        //add it to the visited array
        _visited.push(src);
        _copiesVisited.push(ret);

        var i = ret.length;
        while (i--) {
            ret[i] = deepCopy(ret[i], _visited, _copiesVisited);
        }
        return ret;
    }

    //If we've reached here, we have a regular object

    //make sure the returned object has the same prototype as the original
    var proto = (Object.getPrototypeOf ? Object.getPrototypeOf(src): src.__proto__);
    if (!proto) {
        proto = src.constructor.prototype; //this line would probably only be reached by very old browsers
    }
    var dest = object_create(proto);

    //add this object to the visited array
    _visited.push(src);
    _copiesVisited.push(dest);

    for (var key in src) {
        //Note: this does NOT preserve ES5 property attributes like 'writable', 'enumerable', etc.
        //For an example of how this could be modified to do so, see the singleMixin() function
        dest[key] = deepCopy(src[key], _visited, _copiesVisited);
    }
    return dest;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

Array.prototype.last = function(){
        return this[this.length - 1];
};

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--)
        if (this[i] === obj)
            return true;
    return false;
}
