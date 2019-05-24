import { Request, Response } from "express";
import renderer from "_server/util/rendering/renderer";
import Context from "_common/model/routes/Context";
import store from "_server/store";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import routes from "_common/config/routing/routes";
import { matchPath } from "react-router";
import config from "_locales/config";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const supportedLanguages = Object.keys(config.resources);
    const lang: string =
        supportedLanguages.indexOf(req.i18n.language) > -1
            ? req.i18n.language
            : config.fallbackLng[0];

    await req.i18n.changeLanguage(lang);

    const context: Context = {
        language: lang
    };

    const serverStore = store(req.url);
    const matchedRoute = getMatchedRoute(req.path, routes);
    const match = matchPath(req.path, matchedRoute);
    const { component } = matchedRoute;
    const preLoad =
        component && (component as any).preLoad
            ? (component as any).preLoad()
            : undefined;

    if (typeof preLoad !== "undefined" && match) {
        await preLoad(serverStore.dispatch, match);
    }

    const render = renderer(req, context, serverStore);

    const {
        title, description, status, url, language
    } = context;

    if (url) {
        return res.redirect(status || 301, url);
    }

    if (status) {
        res.status(status);
    }

    res.render("index", {
        ...render,
        title,
        description,
        language
    });
};

export default IndexController;
