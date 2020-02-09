import { Request, Response } from "express";
import store from "_server/store";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import routes from "_common/config/routing/routes";
import { matchPath } from "react-router";
import generateResponse from "_server/util/rendering/generateResponse";
import collectPreloads from "_util/routes/preloading/collectPreloads";
import Match from "_model/misc/Match";
import getAllMatchedRoutes from "_util/routes/getAllMatchedRoutes";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const serverStore = store(req.url);
    const mainRoutes = routes(req.i18n);

    const allMatched = getAllMatchedRoutes(req.path, mainRoutes);
    const preloads = collectPreloads(allMatched);

    const matchedRoute = getMatchedRoute(req.path, mainRoutes);
    const match = { query: req.query, ...matchPath(req.path, matchedRoute) };

    const promises = Promise.all(
        preloads.map(l => l(serverStore.dispatch, match as Match<any>))
    );

    try {
        await promises;
    } catch (err) {
        return generateResponse(req, res, serverStore, 404);
    }

    return generateResponse(req, res, serverStore);
};

export default IndexController;
