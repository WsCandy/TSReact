import { Request, Response } from "express";
import renderer from "@server/util/rendering/renderer";
import Context from "@common/model/routing/Context";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const context: Context = {};
    const params = renderer(req, context);
    const { title, description, status } = context;

    if (status) {
        res.status(status);
    }

    res.render("index", {
        ...params,
        title,
        description
    });
};

export default IndexController;
