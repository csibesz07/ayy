import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelector} from "reselect";

import BuilderComponent from "./BuilderComponent"

import {getTypeForTask} from "./common"
import {modify_task,delete_task,add_task,process_tasks} from "./builder/builderActions"
import {fetch_types} from "features/msc/typeFetcher/typeFetcherActions"

const mapStateToProps= () => {
    return createSelector([
      (state,props) => state.builder[props.pos],
      (state) => state.builder.length,
      (state) => state.app_data.types
    ],
      (item,length,types) => {
        var {type,key} = getTypeForTask(types.operations,item)
        var type_params= type && type.params
        return {
            current: {
                ...item,
                type : {...type,"type_params": type_params, category_key: key}
            },
            types: types,
            isFetchingType: Object.getOwnPropertyNames(types).length == 0,
            isFetchingProcess: item.isFetching,
            canDelete: length>1,
            result: item.result
        }}
      )
}

const actions = (props,dispatch) =>  {
    dispatch(fetch_types())
    return {onTaskChange: (id,name,new_params) => modify_task(props.pos,id,name,new_params),
            onTaskDelete: () => delete_task(props.pos),
            onTaskAdd: (name,params) => add_task(props.pos,name,params),
            onTaskProcess: () => process_tasks(props.pos)}
};


export default connect(mapStateToProps, createActionsUsesProps(actions))(BuilderComponent);
