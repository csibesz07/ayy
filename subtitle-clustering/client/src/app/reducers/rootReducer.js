import {combineReducers} from "redux";

//import {reduceReducers} from "common/utils/reducerUtils";

//import tabReducer from "features/tabs/tabReducer";
//import stepReducer from "features/steps/stepReducer";
import selectorReducer from "features/selectorReducers";

const combinedReducer = combineReducers({
    selector: selectorReducer
});


const rootReducer = combinedReducer;

export default rootReducer;
