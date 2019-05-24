import {
    applyMiddleware, compose, createStore, Store
} from "redux";
import thunk from "redux-thunk";
import AppState from "_model/redux/AppState";
import reducers from "_reducers/index";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { enableBatching } from "redux-batched-actions";
import analyticsMiddleware from "_client/middleware/analyticsMiddleware";
import serviceMiddleware from "_client/middleware/serviceMiddleware";

const history = createBrowserHistory();

const store = (): Store<AppState> => {
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        enableBatching(reducers(history)),
        (window as any).INITIAL_STATE,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history),
                thunk,
                analyticsMiddleware,
                serviceMiddleware
            )
        )
    );

    if (module.hot) {
        if ((window as any).store) {
            return (window as any).store;
        }

        (window as any).store = store;

        module.hot.accept("_reducers", () => {
            store.replaceReducer(enableBatching(reducers(history)));
        });
    }

    return store;
};

export default store;
export { history };
