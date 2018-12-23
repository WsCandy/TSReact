import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "@containers/App";
import { BrowserRouter } from "react-router-dom";
import store from "@client/store";

const clientStore = store();

const app = (
    <BrowserRouter>
        <App store={clientStore} />
    </BrowserRouter>
);

if (module.hot) {
    module.hot.accept();
}

ReactDOM.hydrate(app, document.getElementById("main"));
