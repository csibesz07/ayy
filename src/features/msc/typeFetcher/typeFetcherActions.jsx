import {TYPES_FETCHED,TYPES_FETCH} from "./typeFetcherConstants";
import {clear_error,error} from "app/reducers/uiActions"

export function fetch_types() {
    return (dispatch,getState) => {
      var state=getState()

      if (state.ui.ui_state.error && state.ui.ui_state.error.number > 1){
        setTimeout(() => dispatch(clear_error(true)),10000)
      }

      if (state.app_data.types && state.app_data.types.operations && state.app_data.types.results) return;

      dispatch({type:TYPES_FETCH})

      fetch('http://localhost:3001/endpoint/builder/types')
        .then(response => response.json())
        .then(responseJson =>
              dispatch({type:TYPES_FETCHED, payload:{types:responseJson}}))
        .catch((err) => {
              dispatch(error("Típusokat nem sikerült betölteni. Ellenőrizd az internet kapcsolatot..."))
        });
      //setTimeout(() => dispatch({type:TYPES_FETCHED, payload:{types:init}}), 10);
    }
}
