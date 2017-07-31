import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelect,createNavSelect} from "./selector";
import {selectAndChildToSelected,selectAndToSelector,select} from "./selectorActions";

var paramMap

const makeMapStateToProps= () => {
    const getSelectedName = createNavSelect();
    return function(state,props) {
      var own = {current: getSelectedName(state,props)}
      var all=  paramMap({...state,...own},props)
      var finish = {...all,...own}
      return finish;
    } //({current: getSelectedName(state,props)})
}

const makeMapStateToPropsWithMap = (maps) => {
  return () => {
        const getSelectedNavProps = createNavSelect();
        return function(state,props) {
          var own= getSelectedNavProps(state,props)
          var all=  maps({...state,...own},props)
          return {...all,...own};
        } //({current: getSelectedName(state,props)})
  }
}

const actions = (props,dispatch) =>  {
        if (props.onClick) return {}

        return {onClick : (id,state) => {
          var child=props.components.find(x=>x.id===id || x.name===id);
          if (child.OnClick)
            return child.Onclick(id,state)
          if (props.selectedStoreID)
            return selectAndToSelector(props.storeID,props.selectedStoreID,id)
          return select(props.storeID,id);
          /*if (props.selectedStoreID) {
              return selectAndToSelector(props.storeID,props.selectedStoreID,id);
          }
          if (props.selectedChildStoreID)
              return selectAndChildToSelected(props.storeID,props.selectedStoreID,selectedChildStoreID,id);
          //if (child.component && child.componentProps.storeID)
          //    return selectAndChildToSelector(props.storeID,props.selectedStoreID,child.componentProps.storeID,id);
          return select(props.storeID,id);*/
        }}
};


export default (Component,mapsStateToProps=(state,props) => {}) => {
    return connect(makeMapStateToPropsWithMap(mapsStateToProps), createActionsUsesProps(actions))(Component);
  }
