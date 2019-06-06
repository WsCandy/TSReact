import * as React from "react";
import ViewParams from "_server/model/ViewParams";
import { Request } from "express";
import Loadable from "react-loadable";
import App from "_containers/App";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter } from "react-router-dom";
import Context from "_common/model/routes/Context";
import { Provider } from "react-redux";
import AppState from "_model/redux/AppState";
import { Store } from "redux";
import path from "path";
import { getBundles } from "react-loadable/webpack";
import sprite from "svg-sprite-loader/runtime/sprite.build";

const loadable = path.resolve(__dirname, "react-loadable.json");

const renderer = (
    req: Request,
    context: Context,
    serverStore: Store<AppState>
): Partial<ViewParams> => {
    const modules: string[] = [];
    const data = __non_webpack_require__(loadable);

    const app = (
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={serverStore}>
                <StaticRouter location={req.url} context={context}>
                    <App locales={req.i18n} />
                </StaticRouter>
            </Provider>
        </Loadable.Capture>
    );

    const sheet = new ServerStyleSheet();
    const appWithStyles = sheet.collectStyles(app);
    const html = renderToString(appWithStyles);
    const bundles = getBundles(data, modules);
    const scripts = bundles
        .filter(b => !b.file.match(/\.hot-update.js$/))
        .map(b => `<script src="/${b.file}" defer></script>`)
        .join("");

    return {
        scripts,
        html,
        state: JSON.stringify(serverStore.getState()),
        styles: sheet.getStyleTags(),
        svg: sprite.stringify()
    };
};

export default renderer;
