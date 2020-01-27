import getMatchedRoute from "_util/routes/getMatchedRoute";
import { matchPath } from "react-router";
import getLoadAction from "_util/routes/getLoadAction";
import AppRoute from "_model/routes/AppRoute";
import collectPreloads from "_util/routes/preloading/collectPreloads";
import getAllMatchedRoutes from "_util/routes/getAllMatchedRoutes";
import Match from "_model/misc/Match";
import getParams from "_util/misc/getParams";
import AsyncAction from "_model/redux/AsyncAction";
import setState from "_actions/loading/setState";

const preload = (
    path: string,
    routes: AppRoute[] | null,
    replace: boolean = false
): AsyncAction<any> => (dispatch, getState) => {
    const { loading } = getState();

    if (!routes || loading.isLoading) {
        return;
    }

    dispatch(setState({ isLoading: true }));

    const p = path.split("?")[0];
    const allMatched = getAllMatchedRoutes(p, routes);
    const preloads = collectPreloads(allMatched);

    const matchedRoute = getMatchedRoute(p, routes);
    const match = {
        query: getParams(window.location.search),
        ...matchPath(p, matchedRoute)
    };

    const promises = Promise.all(
        preloads.map(l => l(dispatch, match as Match<any>))
    );

    promises
        .then(() => {
            dispatch(
                getLoadAction(replace)(path, { modal: !!matchedRoute.modal })
            );
        })
        .finally(() => {
            dispatch(setState({ isLoading: false }));
        });
};

export default preload;
