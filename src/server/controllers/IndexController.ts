import { Request, Response } from "express";
import renderer from "@server/util/rendering/renderer";

const IndexController = async (_: Request, res: Response): Promise<any> => {
    res.status(200);
    res.render("index", renderer());
};

export default IndexController;
