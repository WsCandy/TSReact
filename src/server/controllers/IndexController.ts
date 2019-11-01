import { Request, Response } from "express";
import store from "_server/store";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import routes from "_common/config/routing/routes";
import { matchPath } from "react-router";
import generateResponse from "_server/util/rendering/generateResponse";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const serverStore = store(req.url);

    const matchedRoute = getMatchedRoute(req.path, routes(req.i18n));
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
            return generateResponse(req, res, serverStore, true);
        }
    }

    return generateResponse(req, res, serverStore);
};

export default IndexController;
