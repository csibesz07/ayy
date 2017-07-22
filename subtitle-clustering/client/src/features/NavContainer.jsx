import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelect} from "./selector";
import {selectAndChildToSelector,selectAndToSelector,select} from "./selectorActions";

const makeMapStateToProps= () => {
    const getSelectedName = createSelect();
    return (state,props) => ({current: getSelectedName(state,props)})
}

const actions = (props,dispatch) =>  ({onClick : (name,state) => {
                                  var child=props.childrens.find(x=>x.name===name);
                                  if (!props.displayComponents || (!child.component && props.selectedStoreID)) {
                                      return selectAndToSelector(props.storeID,props.selectedStoreID,name);
                                  }
                                  if (child.component && child.componentProps.storeID)
                                      return selectAndChildToSelector(props.storeID,props.selectedStoreID,child.componentProps.storeID,name);
                                  return select(props.storeID,name);
                                }});


export default (Component) => connect(makeMapStateToProps, createActionsUsesProps(actions))(Component);
