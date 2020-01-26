import { Request, Response } from "express";
import store from "_server/store";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import routes from "_common/config/routing/routes";
import { matchPath } from "react-router";
import generateResponse from "_server/util/rendering/generateResponse";
import collectPreloads from "_server/util/collectPreloads";
import Match from "_model/misc/Match";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const serverStore = store(req.url);
    const mainRoutes = routes(req.i18n);

    const matchedRoute = getMatchedRoute(req.path, mainRoutes);
    const match = { query: req.query, ...matchPath(req.path, matchedRoute) };

    const preloads = collectPreloads(matchedRoute, mainRoutes);
    const promises = Promise.all(
        preloads.map(l => l(serverStore.dispatch, match as Match<any>))
    );

    try {
        await promises;
    } catch (err) {
        console.log(err);
        return generateResponse(req, res, serverStore, true);
    }

    return generateResponse(req, res, serverStore);
};

export default IndexController;
