import * as React from "react";
import ReactDOM from "react-dom";
import "core-js/es6/promise";
import "core-js/es7/promise";
import "core-js/es6/array";
import App from "_containers/App";
import store, { history } from "_client/store";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import locales from "_client/locales/locales";
import { loadableReady } from "@loadable/component";

const clientStore = store();
const main = document.getElementById("main");

const app = (
    <Provider store={clientStore}>
        <ConnectedRouter history={history}>
            <App locales={locales} status={window.INITIAL_STATUS} />
        </ConnectedRouter>
    </Provider>
);

delete window.INITIAL_STATUS;

if (module.hot) {
    module.hot.accept();
}

if (!module.hot && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
    });
}

loadableReady().then(() => ReactDOM.hydrate(app, main));
