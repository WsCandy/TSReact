import AsyncAction from "@model/redux/AsyncAction";
import setLoadingState from "@actions/loading/setLoadingState";
import { match } from "react-router";
import RoutePreload from "@model/routes/RoutePreload";
import getAction from "@util/routes/getAction";
import PreloadLinkProps from "@model/routes/PreloadLinkProps";

const loadRoute = (
    preLoad: RoutePreload,
    props: PreloadLinkProps,
    match: match
): AsyncAction<void> => dispatch => {
    dispatch(setLoadingState({ isLoading: true }));

    let outerReject: (reason?: any) => void;

    const { history, location } = props;
    const promise = new Promise((resolve, reject) => {
        outerReject = reject;
        return preLoad(dispatch, match).then(resolve);
    });

    const unRegister = history.listen(() => {
        outerReject();
    });

    promise
        .then(() => {
            const { pathname } = window.location;
            unRegister();

            // User has transitioned pages since clicking first link
            if (pathname !== location.pathname) {
                return;
            }

            return getAction(props);
        })
        .catch(unRegister)
        .finally(() => dispatch(setLoadingState({ isLoading: false })));
};

export default loadRoute;
