import { Request, Response } from "express";
import Context from "_model/routes/Context";
import { Store } from "redux";
import AppState from "_model/redux/AppState";
import renderer from "_server/util/rendering/renderer";

const generateResponse = (
    req: Request,
    res: Response,
    serverStore: Store<AppState>,
    status?: number
): any => {
    const context: Context = {
        language: req.i18n.language
    };

    const render = renderer(req, context, serverStore, status);

    const { url, title, description, language } = context;

    if (url) {
        return res.redirect(context.status || 301, url);
    }

    if (context.status) {
        res.status(context.status);
    }

    return res.render("index", {
        title,
        description,
        language,
        ...render
    });
};

export default generateResponse;
