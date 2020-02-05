import getMatchedRoute from "_util/routes/getMatchedRoute";
import { matchPath } from "react-router";
import getLoadAction from "_util/routes/getLoadAction";
import AppRoute from "_model/routes/AppRoute";
import collectPreloads from "_util/routes/preloading/collectPreloads";
import getAllMatchedRoutes from "_util/routes/getAllMatchedRoutes";
import Match from "_model/misc/Match";
import getParams from "_util/misc/getParams";
import AsyncAction from "_model/redux/AsyncAction";
import setLoading from "_actions/loading/setLoading";
import generateKey from "_util/misc/generateKey";
import endLoading from "_actions/loading/endLoading";

const preload = (
    path: string,
    routes: AppRoute[] | null,
    replace = false
): AsyncAction<any> => dispatch => {
    if (!routes) {
        return;
    }

    const p = path.split("?")[0];
    const allMatched = getAllMatchedRoutes(p, routes);
    const preloads = collectPreloads(allMatched);

    const matchedRoute = getMatchedRoute(p, routes);
    const match = {
        query: getParams(window.location.search),
        ...matchPath(p, matchedRoute)
    };

    const key = generateKey();
    const promises = preloads.map(l => l(dispatch, match as Match<any>));

    const load = new Promise((resolve, reject) => {
        dispatch(setLoading({ key, reject }));

        return Promise.all(promises).then(resolve);
    });

    load.then(() => {
        dispatch(getLoadAction(replace)(path, { modal: !!matchedRoute.modal }));

        dispatch(endLoading(key));
    }).catch(err => {
        if (err !== "Aborted") {
            dispatch(endLoading(key));
        }
    });
};

export default preload;
