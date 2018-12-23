import * as React from "react";
import ViewParams from "@server/model/ViewParams";
import { Request } from "express";
import App from "@containers/App";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter } from "react-router-dom";
import Context from "@common/model/routing/Context";
import store from "@server/store";
import { Provider } from "react-redux";

const renderer = (req: Request, context: Context): Partial<ViewParams> => {
    const serverStore = store(req.url);

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
