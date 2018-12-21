import { Request, Response } from "express";
import renderer from "@server/util/rendering/renderer";
import Context from "@common/model/routing/Context";
import getMatchedRoute from "@common/util/routes/getMatchedRoute";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const context: Context = {};
    const matchedRoute = getMatchedRoute(req.path);
    const params = renderer(req, context);
    const title = context.title || matchedRoute.title;

    if (context.status) {
        res.status(context.status);
    }

    res.render("index", { ...params, title });
};

export default IndexController;
