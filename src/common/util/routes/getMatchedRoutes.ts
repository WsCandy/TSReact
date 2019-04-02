import { matchPath } from "react-router";
import AppRoute from "_common/model/routes/AppRoute";
import get404Route from "_util/routes/get404Route";

const getMatchedRoutes = (path: string, routes: AppRoute[]): AppRoute[] => {
    const matchedRoutes = routes.filter(route => matchPath(path, route));

    return matchedRoutes.length > 0 ? matchedRoutes : [get404Route()];
};

export default getMatchedRoutes;
