import * as React from "react";
import ViewParams from "@server/model/ViewParams";
import { Request } from "express";
import App from "@containers/App";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter } from "react-router-dom";
import Context from "@common/model/routes/Context";
import { Provider } from "react-redux";
import AppState from "@model/redux/AppState";
import { Store } from "redux";

const renderer = (
    req: Request,
    context: Context,
    serverStore: Store<AppState>
): Partial<ViewParams> => {
    const app = (
        <Provider store={serverStore}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    const sheet = new ServerStyleSheet();
    const appWithStyles = sheet.collectStyles(app);

    return {
        scripts: "",
        html: renderToString(appWithStyles),
        state: JSON.stringify(serverStore.getState()),
        styles: sheet.getStyleTags()
    };
};

export default renderer;
