import * as React from "react";
import ViewParams from "_server/model/ViewParams";
import { Request } from "express";
import App from "_containers/App";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter } from "react-router-dom";
import Context from "_common/model/routes/Context";
import { Provider } from "react-redux";
import AppState from "_model/redux/AppState";
import { Store } from "redux";
import path from "path";
import sprite from "svg-sprite-loader/runtime/sprite.build";
import getAppUrl from "_server/util/getAppUrl";
import appConfig from "_common/config/appConfig";
import { ChunkExtractor } from "@loadable/server";
import generateScripts from "_server/util/rendering/generateScripts";

const statsFile = path.resolve(__dirname, "public/loadable-stats.json");

const renderer = (
    req: Request,
    context: Context,
    serverStore: Store<AppState>,
    is404?: boolean
): ViewParams => {
    const extractor = new ChunkExtractor({ statsFile, entrypoints: ["m"] });

    const app = extractor.collectChunks(
        <Provider store={serverStore}>
            <StaticRouter location={req.url} context={context}>
                <App locales={req.i18n} is404={is404} />
            </StaticRouter>
        </Provider>
    );

    const sheet = new ServerStyleSheet();
    const appWithStyles = sheet.collectStyles(app);
    const appRender = renderToString(appWithStyles);
    const scripts = generateScripts(extractor);

    const og = {
        title: appConfig.site_name,
        description: req.i18n.t("og.description"),
        url: getAppUrl(req),
        image: getAppUrl(req, "/img/social-image.jpg")
    };

    return {
        scripts,
        html: appRender,
        state: JSON.stringify(serverStore.getState()),
        styles: sheet.getStyleTags(),
        svg: sprite.stringify(),
        og: {
            ...og,
            ...context.og
        }
    };
};

export default renderer;
