import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "@containers/App";
import { BrowserRouter } from "react-router-dom";

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

if (module.hot) {
    module.hot.accept();
}

ReactDOM.hydrate(app, document.getElementById("main"));
