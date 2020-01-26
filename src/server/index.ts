import express, { Router } from "express";
import middleware from "i18next-express-middleware";
import locales from "_server/locales/locales";
import IndexController from "_server/controllers/IndexController";
import config from "_server/config/config";
import SiteMapController from "_server/controllers/SiteMapController";
import yargs from "yargs";

const env = process.env.NODE_ENV;
const args = yargs.argv;

const server = express();
const router = Router();

server.use(middleware.handle(locales));
router.get("/sitemap.xml", SiteMapController);
router.get("*", IndexController);
server.set("port", config.port);
server.set("view engine", config.engine);
server.set("views", config.views);

if (env !== "production" || args.assets === "true") {
    server.use(express.static("dist/public"));
}

server.get("*", router);
server.listen(config.port);
