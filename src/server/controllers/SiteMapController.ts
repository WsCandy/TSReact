import { Request, Response } from "express";
import { createSitemap, EnumChangefreq } from "sitemap";
import config from "_locales/config";
import routes from "_common/config/routing/routes";
import fs from "fs";
import moment from "moment";
import appConfig from "_common/config/appConfig";

const SiteMapController = async (req: Request, res: Response): Promise<any> => {
    const supportedLanguages = Object.keys(config.resources);
    const lang: string =
        supportedLanguages.indexOf(req.i18n.language) > -1
            ? req.i18n.language
            : config.fallbackLng[0];

    const stats = fs.statSync("dist/index.js");
    const lastmod = moment(stats.mtime).format("YYYY-MM-DDTHH:mm:ss");

    await req.i18n.changeLanguage(lang);

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
        hostname: appConfig.app_url,
        cacheTime: 600000,
        urls
    });

    res.setHeader("Content-Type", "application/xml");
    return res.end(sitemap.toXML());
};

export default SiteMapController;
