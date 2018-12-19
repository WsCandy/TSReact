import express, { Router } from "express";
import config from "./config/config";
import IndexController from "./controllers/IndexController";

const server = express();
const router = Router();

router.get("*", IndexController);

server.set("port", config.port);
server.set("view engine", config.engine);
server.set("views", config.views);
server.listen(config.port);

server.get("*", router);
