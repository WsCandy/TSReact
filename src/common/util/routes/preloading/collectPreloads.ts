import AppRoute from "_model/routes/AppRoute";
import RoutePreload from "_model/routes/RoutePreload";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import flattenDeep from "lodash/flattenDeep";

const getPreload = (route: AppRoute) => {
    const { component } = route;
    return (component as any)?.preLoad?.();
};

const collectPreloads = (routes: AppRoute[]): RoutePreload[] => {
    const preloads = routes.map(route => {
        const preload = getPreload(route);

        // Don't want to do this on the client, modals appear over routes that are showing.
        if (route.modal && typeof window === "undefined") {
            const modal = getMatchedRoute(route.modal.path, routes);

            return [preload, getPreload(modal)];
        }

        return [preload];
    });

    return flattenDeep(preloads).filter(l => typeof l !== "undefined");
};

export default collectPreloads;
