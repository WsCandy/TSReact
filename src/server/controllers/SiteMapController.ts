import { Request, Response } from "express";
import { createSitemap, EnumChangefreq } from "sitemap";
import routes from "_common/config/routing/routes";
import fs from "fs";
import moment from "moment";
import getAppUrl from "_server/util/getAppUrl";

const SiteMapController = async (req: Request, res: Response): Promise<any> => {
    const stats = fs.statSync("dist/index.js");
    const lastmod = moment(stats.mtime).format("YYYY-MM-DDTHH:mm:ss");

    const urls = routes(req.i18n)
        .filter(v => v.path)
        .filter(v => v.priority)
        .map(v => ({
            url: v.path as string,
            priority: v.priority,
            changefreq: EnumChangefreq.WEEKLY,
            lastmod
        }));

    const sitemap = createSitemap({
        hostname: getAppUrl(req),
        cacheTime: 600000,
        urls
    });

    res.setHeader("Content-Type", "application/xml");
    return res.end(sitemap.toXML());
};

export default SiteMapController;
