import AsyncAction from "_model/redux/AsyncAction";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import { matchPath } from "react-router";
import AppRoute from "_model/routes/AppRoute";
import preloadRoute from "_actions/loading/preLoadRoute";
import { History } from "history";
import getLoadAction from "_util/routes/getLoadAction";

const preload = (
    path: string,
    history: History,
    routes: AppRoute[] | null,
    replace: boolean = false
): AsyncAction<void> => dispatch => {
    if (routes === null) {
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
            return dispatch(
                preloadRoute(load, path, match, history, modal, replace)
            );
        }
    }

    return dispatch(getLoadAction(replace)(path, { modal }));
};

export default preload;
