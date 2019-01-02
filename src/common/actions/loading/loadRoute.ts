import AsyncAction from "_model/redux/AsyncAction";
import setLoadingState from "_actions/loading/setLoadingState";
import { match } from "react-router";
import RoutePreload from "_model/routes/RoutePreload";
import getAction from "_util/routes/getAction";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";

const loadRoute = (
    preLoad: RoutePreload,
    props: PreloadLinkProps,
    match: match
): AsyncAction<void> => dispatch => {
    let outerReject: (reason?: any) => void;

    // Some requests are so fast it's not worth changing the loading state, add a small delay to prevent unnecessary loading state change on fast requests
    const delay = setTimeout(
        () => dispatch(setLoadingState({ isLoading: true })),
        200
    );
    const { history } = props;
    const promise = new Promise((resolve, reject) => {
        outerReject = reject;
        return preLoad(dispatch, match)
            .then(resolve)
            .catch(reject);
    });

    const unRegister = history.listen(() => {
        outerReject();
    });

    promise.finally(() => {
        unRegister();
        clearTimeout(delay);
        dispatch(setLoadingState({ isLoading: false }));
        return getAction(props)(props.to);
    });
};

export default loadRoute;
