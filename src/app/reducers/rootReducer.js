import {combineReducers} from "redux";

//import {reduceReducers} from "common/utils/reducerUtils";

//import tabReducer from "features/tabs/tabReducer";
//import stepReducer from "features/steps/stepReducer";
import selectorReducers from "features/selectorReducers";
import builderReducers from "features/msc/builder_tab/builder/builderReducers"
import typeFetcherReducers from "features/msc/typeFetcher/typeFetcherReducers"
import uiReducers from "app/reducers/uiReducers"


const ui_state = combineReducers({
    "selectors": selectorReducers,
    "ui_state": uiReducers
});


const app_data = combineReducers({
    "types": typeFetcherReducers
});

export default combineReducers({
    "ui": ui_state,
    "builder": builderReducers,
    "app_data": app_data,
});
