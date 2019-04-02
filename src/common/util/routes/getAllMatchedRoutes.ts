import AppRoute from "_model/routes/AppRoute";
import getMatchedRoutes from "_util/routes/getMatchedRoutes";
import flattenDeep from "lodash/flattenDeep";

const getAllMatchedRoutes = (path: string, routes: AppRoute[]): AppRoute[] => {
    const matched = getMatchedRoutes(path, routes);

    const nested = matched
        .map(route =>
            (route.routes ? getAllMatchedRoutes(path, route.routes) : undefined)
        )
        .filter(route => typeof route !== "undefined");

    return flattenDeep([matched, nested]) as AppRoute[];
};

export default getAllMatchedRoutes;
