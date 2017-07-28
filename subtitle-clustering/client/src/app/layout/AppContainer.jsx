import {connect} from "react-redux";
import {createActionsUsesProps} from "common/utils/reducerUtils";

import {createSelector} from "reselect";

import {clear_error} from "app/reducers/uiActions"

import App from "./App"

var paramMap

const mapsStateToProps= () => {
  return createSelector([
    (state) => {
      return state.ui.ui_state.error && state.ui.ui_state.error.message
    }
  ],
    (error) => ({
          error: error,
      }))
}

const mapDispatchToProps= (props,dispatch) => ({onErrorDismiss: () => clear_error()})


export default connect(mapsStateToProps,createActionsUsesProps(mapDispatchToProps))(App);
