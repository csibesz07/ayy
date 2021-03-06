import {createSelector} from "reselect";

const select = state => state.selected;

export const createSelect = () => createSelector(
    (state,props) => state.ui.selectors[props.storeID].name,
    selected => selected
);

export const createNavSelect = () => createSelector(
    [(state,props) => state.ui.selectors[props.storeID].id,
     (_,props) => props.components,
     (_,props) => props.children
   ],
    (id,components,children) => {
      var pos = -1
      var other = {}

      if (components) {
        pos = components.findIndex((obj) => obj.id == id || obj.name == id)
        other = components[pos]
      }

      var children
      if (children && pos > -1)
        if (Array.isArray(children) && children.length > pos)
          children = children[pos]
        else if (typeof children === 'function') {
          children = children(pos)
        }

      return {current:    {"id":id,
                           "pos":pos,
                           "children": children,
                           ...other}}
    }
);
