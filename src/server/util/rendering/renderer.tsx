import * as React from "react";
import ViewParams from "@server/model/ViewParams";
import { Request } from "express";
import App from "@containers/App";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter } from "react-router-dom";
import Context from "@common/model/routing/Context";
import store from "@server/store";

const renderer = (req: Request, context: Context): Partial<ViewParams> => {
    const serverStore = store();

    const app = (
        <StaticRouter location={req.url} context={context}>
            <App store={serverStore} />
        </StaticRouter>
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
