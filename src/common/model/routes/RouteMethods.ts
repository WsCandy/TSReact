import RoutePreload from "@model/routes/RoutePreload";
import RouteTitleParser from "@model/routes/RouteTitleParser";
import RouteDescriptionParser from "@model/routes/RouteDescriptionParser";

interface RouteMethods<P, M = {}> {
    readonly getTitle?: RouteTitleParser<P>;
    readonly getDescription?: RouteDescriptionParser<P>;
    readonly preLoad?: RoutePreload<M>;
}

export default RouteMethods;
