import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelector} from "reselect";

import BuilderComponent from "./BuilderComponent"

import {getTypeForTask,propsByType} from "./common"
import {modify_taks,delete_task,add_task,process_tasks} from "./builder/builderActions"

import NavContainer from "features/NavContainer";
import Stepper from "features/msc/steps/Stepper"

const mapStateToProps= () => {
    return createSelector([
      (state,props) => state.builder,
      (state) => state.app_data.types,
    ],
      (tasks,types) =>
        ({components: tasks.map( task => {
                      const {type,key} = getTypeForTask(types.operations,task)
                      return {...task, title:task.name,
                        ...(propsByType[key] || {}),
                        description: key,isStepFetching:task.isFetching}
                      }),
          isFetching: Object.getOwnPropertyNames(types).length == 0})
      )
}

export default connect(mapStateToProps)(NavContainer(Stepper));
