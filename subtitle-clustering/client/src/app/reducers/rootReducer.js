import {combineReducers} from "redux";

//import {reduceReducers} from "common/utils/reducerUtils";

import tabReducer from "features/tabs/tabReducer";
import stepReducer from "features/steps/stepReducer";


const combinedReducer = combineReducers({
    tabs : tabReducer,
    steps: stepReducer
});


const rootReducer = combinedReducer;

export default rootReducer;
