import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import "semantic-ui-css/semantic.css";

import configureStore from "app/store/configureStore";

import App from "app/layout/App"

const initialState={
    'ui': {
            'selectors' : {
              'main-tab': {
                  'name':'home'
              },
              'main-msc':{
                'name' : 'build'
              },
              'main-msc-build':{
                'name':'gyujt'
              },
              'main-msc-info': {
                  'name': 'gyujt'
              },
              'main-selected': {
                'name' : 'home'
              }
          }
        },
    "builder" : [],
    'app-data' : {
        'types': []
    }
}

const store = configureStore(initialState);
//store.subscribe(() => console.log(store.getState()))

// Save a reference to the root element for reuse
const rootEl = document.getElementById("root");

// Create a reusable render method that we can call more than once
let render = () => {
    // Dynamically import our main App component, and render it

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        rootEl
    );
};

if(module.hot) {
    // Support hot reloading of components
    // and display an overlay for runtime errors
    const renderApp = render;
    const renderError = (error) => {
        const RedBox = require("redbox-react").default;
        ReactDOM.render(
            <RedBox error={error} />,
            rootEl,
        );
    };

    // In development, we wrap the rendering function to catch errors,
    // and if something breaks, log the error and render it to the screen
    render = () => {
        try {
            renderApp();
        }
        catch(error) {
            console.log(error);
            renderError(error);
        }
    };

    // Whenever the App component file or one of its dependencies
    // is changed, re-import the updated component and re-render it
    module.hot.accept("./app/layout/App", () => {
        setTimeout(render);
    });
}

render();
