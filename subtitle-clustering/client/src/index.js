import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import "semantic-ui-css/semantic.css";

import configureStore from "app/store/configureStore";

import AppContainer from "app/layout/AppContainer"

const initialState={
    'ui': {
            'selectors' : {
              'main-tab': {
                  'id':'msc'
              },
              'main-msc':{
                'id' : 'build'
              },
              'main-msc-build':{
                'id':1
              },
              'main-msc-info': {
                  'id': 'gyujt'
              },
              'main-selected': {
                'id' : 'home'
              }
          }
        },
    "builder" : [
      {
        'id':1,
        name: "CountExtractor",
        params: {}
      },
      {
        'id':2,
        name: "HashingExtractor",
        params: {}
      },
      {
        'id':3,
        name: "NonNegativeMatrixFactorization",
        params: {}
      },
      {
        'id':4,
        name: "AffinityClustering",
        params: {}
      },
      {
        'id':5,
        name: "HierarchicalClustering",
        params: {}
      },
      {
        'id':6,
        name: "CalinskiHarabazAnalysis",
        params: {}
      },
      {
        'id':7,
        name: "ValuePlotter",
        params: {}
      },
      {
        'id':8,
        name: "RangeTask",
        params: {}
      }
    ],
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
            <AppContainer/>
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
