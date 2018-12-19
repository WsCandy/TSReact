import { Request, Response } from "express";

const IndexController = async (_: Request, res: Response): Promise<any> => {
    res.status(200);
    res.render("index", {
        title: "Hello World!",
        scripts: "",
        html: "<p>Hello!</p>",
        state: "{}"
    });
};

export default IndexController;
