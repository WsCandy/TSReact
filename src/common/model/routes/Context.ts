import { StaticRouterContext } from "react-router";
import RoutePreload from "@model/routes/RoutePreload";

interface Context extends StaticRouterContext {
    status?: number;
    title?: string;
    description?: string;
    preLoad?: RoutePreload;
}

export default Context;
