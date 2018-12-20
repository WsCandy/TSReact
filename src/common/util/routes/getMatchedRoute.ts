import AppRoute from "@common/model/routing/AppRoute";
import getMatchedRoutes from "@common/util/routes/getMatchedRoutes";

const getMatchedRoute = (path: string): AppRoute => {
    const matched = getMatchedRoutes(path);
    return matched.reduce((_, b) => b);
};

export default getMatchedRoute;
