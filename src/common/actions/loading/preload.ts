import AsyncAction from "_model/redux/AsyncAction";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import { matchPath } from "react-router";
import preloadRoute from "_actions/loading/preloadRoute";
import getLoadAction from "_util/routes/getLoadAction";
import AppRoute from "_model/routes/AppRoute";

const preload = (
    path: string,
    routes: AppRoute[] | null,
    replace: boolean = false
): AsyncAction<void> => dispatch => {
    if (!routes) {
        return;
    }

    const p = path.split("?")[0];
    const matchedRoute = getMatchedRoute(p, routes);
    const match = matchPath(p, matchedRoute);
    const Component = matchedRoute.component as any;
    const modal = !!matchedRoute.modal;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load && match) {
            return dispatch(preloadRoute(load, match)).then(() => {
                dispatch(getLoadAction(replace)(path, { modal }));
            });
        }
    }

    return dispatch(getLoadAction(replace)(path, { modal }));
};

export default preload;
