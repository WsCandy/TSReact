import * as React from "react";
import * as ReactDOM from "react-dom";
import Loadable from "react-loadable";
import "core-js/es6/promise";
import "core-js/es7/promise";
import "core-js/es6/array";
import App from "_containers/App";
import store, { history } from "_client/store";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import locales from "_client/locales/locales";

const clientStore = store();

const app = (
    <Provider store={clientStore}>
        <ConnectedRouter history={history}>
            <App locales={locales} />
        </ConnectedRouter>
    </Provider>
);

if (module.hot) {
    module.hot.accept();
}

Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(app, document.getElementById("main"));
});

if (!module.hot && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js");
    });
}
