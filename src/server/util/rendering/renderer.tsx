import * as React from "react";
import ViewParams from "@server/model/ViewParams";
import App from "@containers/App";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

const renderer = (): ViewParams => {
    const sheet = new ServerStyleSheet();
    const appWithStyles = sheet.collectStyles(<App />);

    return {
        title: "Hello World!",
        scripts: "",
        html: renderToString(appWithStyles),
        state: JSON.stringify({}),
        styles: sheet.getStyleTags()
    };
};

export default renderer;
