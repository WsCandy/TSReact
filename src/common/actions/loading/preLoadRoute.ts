import AsyncAction from "_model/redux/AsyncAction";
import setLoadingState from "_actions/loading/setLoadingState";
import { match } from "react-router";
import RoutePreload from "_model/routes/RoutePreload";
import getLoadAction from "_util/routes/getLoadAction";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";

const preloadRoute = (
    preLoad: RoutePreload,
    props: PreloadLinkProps,
    match: match,
    modal: boolean
): AsyncAction<void> => dispatch => {
    let outerReject: (reason?: any) => void;

    // Some requests are so fast it's not worth changing the loading state, add a small delay to prevent unnecessary loading state change on fast requests
    const delay = setTimeout(
        () => dispatch(setLoadingState({ isLoading: true })),
        150
    );
    const { history } = props;
    const promise = new Promise((resolve, reject) => {
        outerReject = reject;
        const pl = preLoad(dispatch, { ...match, query: {} });

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
        clearTimeout(delay);

        // Can't batch these, annoying!
        dispatch(setLoadingState({ isLoading: false }));
        dispatch(getLoadAction(props)(props.href, { modal }));
    });
};

export default preloadRoute;
