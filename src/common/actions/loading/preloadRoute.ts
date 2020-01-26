import AsyncAction from "_model/redux/AsyncAction";
import setLoadingState from "_actions/loading/setState";
import RoutePreload from "_model/routes/RoutePreload";
import { match } from "react-router";
import getParams from "_util/misc/getParams";

const preloadRoute = (
    load: RoutePreload,
    match: match
): AsyncAction<Promise<any>> => dispatch => {
    dispatch(setLoadingState({ isLoading: true }));

    const promise = new Promise((resolve, reject) => {
        const pl = load(dispatch, {
            ...match,
            query: getParams(window.location.search)
        });

        if (typeof pl !== "undefined") {
            return pl.then(resolve).catch(reject);
        }

        return resolve();
    });

    return promise.finally(() =>
        dispatch(setLoadingState({ isLoading: false }))
    );
};

export default preloadRoute;
