import * as React from "react";
import ViewParams from "@server/model/ViewParams";
import App from "@containers/App";
import { renderToString } from "react-dom/server";

const renderer = (): ViewParams => ({
    title: "Hello World!",
    scripts: "",
    html: renderToString(<App />),
    state: JSON.stringify({})
});

export default renderer;
