import AsyncAction from "_model/redux/AsyncAction";
import setLoadingState from "_actions/loading/setLoadingState";
import RoutePreload from "_model/routes/RoutePreload";
import getLoadAction from "_util/routes/getLoadAction";

// eslint-disable-next-line
import { match } from "react-router";
import { History } from "history";
import getParams from "_util/misc/getParams";

const preloadRoute = (
    preLoad: RoutePreload,
    path: string,
    match: match,
    history: History,
    modal: boolean,
    replace: boolean = false
): AsyncAction<void> => dispatch => {
    let outerReject: (reason?: any) => void;

    dispatch(setLoadingState({ isLoading: true }));

    const loadAction = getLoadAction(replace)(path, { modal });
    const promise = new Promise((resolve, reject) => {
        outerReject = reject;
        const pl = preLoad(dispatch, {
            ...match,
            query: getParams(window.location.search)
        });

        if (typeof pl !== "undefined") {
            return pl.then(resolve).catch(reject);
        }

        return resolve();
    });

    const unRegister = history.listen(() => {
        outerReject();
    });

    promise.finally(() => {
        unRegister();

        // Can't batch these, annoying!
        dispatch(loadAction);
        setTimeout(() => {
            dispatch(setLoadingState({ isLoading: false }));
        }, 150);
    });
};

export default preloadRoute;
