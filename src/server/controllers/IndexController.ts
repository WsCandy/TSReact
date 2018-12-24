import { Request, Response } from "express";
import renderer from "@server/util/rendering/renderer";
import Context from "@common/model/routes/Context";
import store from "@server/store";
import getMatchedRoute from "@util/routes/getMatchedRoute";
import routes from "@common/config/routing/routes";
import { matchPath } from "react-router";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const context: Context = {};
    const serverStore = store(req.url);
    const matchedRoute = getMatchedRoute(req.path, routes);
    const match = matchPath(req.path, matchedRoute);

    const {
        title, description, status, preLoad
    } = context;

    const preLoadMethod =
        preLoad && match ? preLoad(serverStore.dispatch, match) : preLoad;

    if (status) {
        res.status(status);
    }

    Promise.all([preLoadMethod]).then(() => {
        const params = renderer(req, context, serverStore);

        res.render("index", {
            ...params,
            title,
            description
        });
    });
};

export default IndexController;
