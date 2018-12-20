import routes from "@common/config/routing/routes";
import { matchPath } from "react-router";
import AppRoute from "@common/model/routing/AppRoute";

const getMatchedRoutes = (path: string): AppRoute[] => {
    const matchedRoutes = routes.filter(route => matchPath(path, route));

    return matchedRoutes.length > 0
        ? matchedRoutes
        : routes.filter(route => route.key === "404");
};

export default getMatchedRoutes;