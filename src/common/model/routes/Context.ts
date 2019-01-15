import { StaticRouterContext } from "react-router";
import RoutePreload from "_model/routes/RoutePreload";

interface Context extends StaticRouterContext {
    status?: number;
    title?: string;
    description?: string;
    url?: string;
    preLoad?: RoutePreload;
}

export default Context;
