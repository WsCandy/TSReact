import AppRoute from "@common/model/routes/AppRoute";
import getMatchedRoutes from "@common/util/routes/getMatchedRoutes";

const getMatchedRoute = (path: string, routes: AppRoute[]): AppRoute => {
    const matched = getMatchedRoutes(path, routes).reduce((_, b) => b);

    if (matched.routes) {
        return getMatchedRoutes(path, matched.routes).reduce(
            (_, b) => b,
            matched
        );
    }

    return matched;
};

export default getMatchedRoute;
