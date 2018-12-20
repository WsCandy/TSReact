import { Request, Response } from "express";
import renderer from "@server/util/rendering/renderer";
import Context from "@common/model/routing/Context";
import getMatchedRoute from "@common/util/routes/getMatchedRoute";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const context: Context = {};
    const matchedRoute = getMatchedRoute(req.path);
    const params = renderer(req, context, matchedRoute);

    if (context.status) {
        res.status(context.status);
    }

    res.render("index", params);
};

export default IndexController;
