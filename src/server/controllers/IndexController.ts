import { Request, Response } from "express";
import renderer from "@server/util/rendering/renderer";
import Context from "@common/model/routing/Context";
import store from "@server/store";

const IndexController = async (req: Request, res: Response): Promise<any> => {
    const context: Context = {};
    const serverStore = store(req.url);
    const params = renderer(req, context, serverStore);

    const {
        title, description, status, preLoad
    } = context;

    if (status) {
        res.status(status);
    }

    Promise.all([preLoad]).then(() => {
        res.render("index", {
            ...params,
            title,
            description
        });
    });
};

export default IndexController;
