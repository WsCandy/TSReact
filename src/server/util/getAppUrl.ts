import { Request } from "express";
import createFullDomain from "_server/util/createFullDomain";

const getAppUrl = (req: Request, path: string = ""): string => {
    const host = req.get("host");
    const { protocol } = req;

    return `${createFullDomain(protocol, host!)}${path}`;
};

export default getAppUrl;
