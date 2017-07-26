import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelector} from "reselect";

import BuilderComponent from "./BuilderComponent"

import {getTypeForTask} from "./common"

const mapStateToProps= () => {
    return createSelector([
      (state,props) => state.builder[props.pos]?state.builder[props.pos]:{},
      (state) => state.app_data.types,
    ],
      (item,types) => {
        var {type,key} = getTypeForTask(types,item)
        var type_params= type ? type.params : undefined
        return {
            current: {
                ...item,
                type : {...type,"type_params": type_params, category_key: key}
            },
            types: types,
        }}
      )
}

const actions = (props,dispatch) =>  {
    return {}
};


export default connect(mapStateToProps, createActionsUsesProps(actions))(BuilderComponent);
