import { Middleware, Dispatch } from "redux";
import { LoadingRejection, SET_LOADING } from "_actions/loading/setLoading";
import isAction from "_util/actions/isAction";
import { END_LOADING } from "_actions/loading/endLoading";

let preloads: LoadingRejection[] = [];

const loadingMiddleware: Middleware = () => (next: Dispatch) => action => {
    if (isAction(action, SET_LOADING)) {
        preloads.forEach(obj => obj.reject("Aborted"));
        preloads = [action.payload];
    }

    if (isAction(action, END_LOADING)) {
        preloads = [...preloads].filter(obj => obj.key !== action.payload);
    }

    return next(action);
};

export default loadingMiddleware;
