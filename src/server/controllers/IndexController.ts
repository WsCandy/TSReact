import { Request, Response } from "express";
import Context from "_common/model/routes/Context";
import store from "_server/store";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import routes from "_common/config/routing/routes";
import { matchPath } from "react-router";
import config from "_locales/config";
import generateResponse from "_server/util/rendering/generateResponse";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const serverStore = store(req.url);

    const supportedLanguages = Object.keys(config.resources);
    const lang: string =
        supportedLanguages.indexOf(req.i18n.language) > -1
            ? req.i18n.language
            : config.fallbackLng[0];

    await req.i18n.changeLanguage(lang);

    const context: Context = {
        language: lang
    };

    const matchedRoute = getMatchedRoute(req.path, routes);
    const { component } = matchedRoute;
    const match = { query: req.query, ...matchPath(req.path, matchedRoute) };

    const preLoad =
        component && (component as any).preLoad
            ? (component as any).preLoad()
            : undefined;

    if (typeof preLoad !== "undefined" && match) {
        try {
            await preLoad(serverStore.dispatch, match);
        } catch (err) {
            console.log(err);
            return generateResponse(req, res, context, serverStore, true);
        }
    }

    return generateResponse(req, res, context, serverStore);
};

export default IndexController;
