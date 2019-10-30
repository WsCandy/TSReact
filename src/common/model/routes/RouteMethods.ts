import RoutePreload from "_model/routes/RoutePreload";
import RouteTitleParser from "_model/routes/RouteTitleParser";
import RouteDescriptionParser from "_model/routes/RouteDescriptionParser";

interface RouteMethods<P, M = {}> {
    readonly getTitle?: RouteTitleParser<P>;
    readonly getDescription?: RouteDescriptionParser<P>;
    readonly getHeaderTitle?: RouteTitleParser<P>;
    readonly preLoad?: RoutePreload<M>;
}

export default RouteMethods;
