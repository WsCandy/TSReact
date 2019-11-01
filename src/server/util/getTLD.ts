import parser, { Domain } from "tld-extract";
import { Request } from "express";
import createFullDomain from "_server/util/createFullDomain";

const getTLD = (req: Request): Domain | undefined => {
    const host = req.get("host");

    if (typeof host === "undefined") {
        return host;
    }

    const h = host.split(":")[0];

    return h === "localhost"
        ? parser(createFullDomain(req.protocol, "localhost.com"))
        : parser(createFullDomain(req.protocol, h));
};

export default getTLD;
