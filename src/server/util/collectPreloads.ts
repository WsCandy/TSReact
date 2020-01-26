import AppRoute from "_model/routes/AppRoute";
import RoutePreload from "_model/routes/RoutePreload";
import getMatchedRoute from "_util/routes/getMatchedRoute";

const getPreload = (route: AppRoute) => {
    const { component } = route;
    return (component as any)?.preLoad?.();
};

const collectPreloads = (
    route: AppRoute,
    routes: AppRoute[]
): RoutePreload[] => {
    const preload = getPreload(route);

    if (route.modal) {
        const modal = getMatchedRoute(route.modal.path, routes);

        return [preload, getPreload(modal)].filter(
            l => typeof l !== "undefined"
        );
    }

    return [preload].filter(l => typeof l !== "undefined");
};

export default collectPreloads;
