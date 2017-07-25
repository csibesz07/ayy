import {combineReducers} from "redux";

//import {reduceReducers} from "common/utils/reducerUtils";

//import tabReducer from "features/tabs/tabReducer";
//import stepReducer from "features/steps/stepReducer";
import selectorReducers from "features/selectorReducers";
import builderReducers from "features/msc/builder_tab/builderReducers"
import typeFetcherReducers from "features/msc/typeFetcher/typeFetcherReducers"


const ui_state = combineReducers({
    "selectors": selectorReducers
});


const app_data = combineReducers({
    "types": typeFetcherReducers
});

export default combineReducers({
    "ui": ui_state,
    "builder": builderReducers,
    "app-data": app_data,
});
