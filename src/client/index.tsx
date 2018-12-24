import * as React from "react";
import * as ReactDOM from "react-dom";
import Loadable from "react-loadable";
import "core-js/es6/promise";
import "core-js/es7/promise";
import App from "@containers/App";
import store, { history } from "@client/store";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";

const clientStore = store();

const app = (
    <Provider store={clientStore}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

if (module.hot) {
    module.hot.accept();
}

Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(app, document.getElementById("main"));
});
