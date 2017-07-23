import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelect} from "./selector";
import {selectAndChildToSelected,selectAndToSelector,select} from "./selectorActions";

const makeMapStateToProps= () => {
    const getSelectedName = createSelect();
    return function(state,props) {
      return {current: getSelectedName(state,props)}
    } //({current: getSelectedName(state,props)})
}

const actions = (props,dispatch) =>  {
        if (props.onClick) return {}

        return {onClick : (name,state) => {
          //var child=props.components.find(x=>x.name===name);
          return select(props.storeID,name);
          /*if (props.selectedStoreID) {
              return selectAndToSelector(props.storeID,props.selectedStoreID,name);
          }
          if (props.selectedChildStoreID)
              return selectAndChildToSelected(props.storeID,props.selectedStoreID,selectedChildStoreID,name);
          //if (child.component && child.componentProps.storeID)
          //    return selectAndChildToSelector(props.storeID,props.selectedStoreID,child.componentProps.storeID,name);
          return select(props.storeID,name);*/
        }}
};


export default (Component) => connect(makeMapStateToProps, createActionsUsesProps(actions))(Component);
