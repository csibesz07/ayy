import {createSelector} from "reselect";

const select = state => state.selected;

export const createSelect = () => createSelector(
    (state,props) => state.ui.selectors[props.storeID].name,
    selected => selected
);

export const createNavSelect = () => createSelector(
    [(state,props) => state.ui.selectors[props.storeID].name,
     (_,props) => props.components,
     (_,props) => props.children
   ],
    (name,components,children) => {
      var pos = -1
      var other = {}

      if (components) {
        pos = components.findIndex((obj) => obj.name == name)
        other = components[pos]
      }

      var children
      if (children && children.length > pos && pos > -1)
          children = children[pos]

      return {current: {"name":name,
                           "pos":pos,
                           "children": children,...other}}
    }
);
