import {compose, applyMiddleware, createStore} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk'

import rootReducer from "app/reducers/rootReducer";


export default function configureStore(preloadedState) {
    const middlewares = [thunk];
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
