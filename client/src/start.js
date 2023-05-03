import * as ReactDOMClient from "react-dom/client";
import Welcome from "./welcome";
import App from "./app";
import React from "react";

//----------------------------------------- Initializing IO socket------------------------------------------------------------------------
import { init } from "./socket";

//----------------------------------------- REDUX SETUP ------------------------------------------------------------------------

import { createStore, applyMiddleware } from "redux";
import * as immutableState from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";

import { Provider } from "react-redux";
import rootReducer from "./redux/reducer";
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(immutableState.default()))
);

//------------------------------------------------------------------------------------------------------------------------------

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        if (!data.userId) {
            //injecting elements into main in index.html

            ReactDOMClient.createRoot(document.querySelector("main")).render(
                <React.StrictMode>
                    <Welcome />
                </React.StrictMode>
            );
        } else {
            //initialize websocket connection and pass the store to it...
            init(store);
            ReactDOMClient.createRoot(document.querySelector("main")).render(
                //REDUX: wrap App in Provider to pass down accessto reader store
                <React.StrictMode>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </React.StrictMode>
            );
        }
    })
    .catch((err) => {
        console.log("error fetch user/id ", err);
    });
