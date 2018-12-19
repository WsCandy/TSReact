import express, { Router } from "express";
import yargs from "yargs";
import config from "./config/config";
import IndexController from "./controllers/IndexController";

const env = process.env.NODE_ENV;
const args = yargs.argv;

const server = express();
const router = Router();

router.get("*", IndexController);

server.set("port", config.port);
server.set("view engine", config.engine);
server.set("views", config.views);
server.listen(config.port);

if (env === "production" && args.assets === "true") {
    server.use(express.static("dist/public"));
}

server.get("*", router);
