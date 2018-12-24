import {
    applyMiddleware, compose, createStore, Store
} from "redux";
import thunk from "redux-thunk";
import AppState from "@model/redux/AppState";
import reducers from "@reducers/index";
import { routerMiddleware } from "connected-react-router";
import createBrowserHistory from "history/createBrowserHistory";

const history = createBrowserHistory();

const store = (): Store<AppState> => {
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        reducers(history),
        (window as any).INITIAL_STATE,
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
    );

    if (module.hot) {
        if ((window as any).store) {
            return (window as any).store;
        }

        (window as any).store = store;

        module.hot.accept("@reducers", () => {
            store.replaceReducer(reducers(history));
        });
    }

    return store;
};

export default store;
export { history };
