import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelector} from "reselect";

import App from "./App"

var paramMap

const mapsStateToProps= () => {
  return createSelector([
    (state,props) => state.builder,
    (state) => state.app_data.types,
  ],
    (tasks,types) => ({
          build_tasks: tasks,
          types: types,
      }))
}


export default connect(mapsStateToProps)(App);
