import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import saveState from "redux-save-state/localStorage";


import thunk from "redux-thunk";

import rootReducer from "app/reducers/rootReducer";

export default function configureStore(preloadedState) {
    const middlewares = [thunk,saveState('appState')];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );

    if(process.env.NODE_ENV !== "production") {
        if(module.hot) {
            module.hot.accept("app/reducers/rootReducer", () =>{
                const newRootReducer = require("app/reducers/rootReducer").default;
                store.replaceReducer(newRootReducer)
            });
        }
    }

    return store;
}
