import { matchPath } from "react-router";
import AppRoute from "_common/model/routes/AppRoute";

const getMatchedRoutes = (
    path: string,
    routes: AppRoute[],
    fallback?: AppRoute
): AppRoute[] => {
    const matchedRoutes = routes.filter(route => matchPath(path, route));

    const fall = fallback || {
        key: "404",
        title: "Error 404 - $s Not Found",
        headerTitle: "Not Found",
        description: "Error 404 - $s not found",
        scope: "all"
    };

    return matchedRoutes.length > 0 ? matchedRoutes : [fall];
};

export default getMatchedRoutes;
