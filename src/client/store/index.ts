import { compose, createStore, Store } from "redux";
import AppState from "@model/redux/AppState";
import reducers from "@reducers/index";

const store = (): Store<AppState> => {
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        reducers,
        (window as any).INITIAL_STATE,
        composeEnhancers()
    );

    if (module.hot) {
        if ((window as any).store) {
            return (window as any).store;
        }

        (window as any).store = store;

        module.hot.accept("@reducers", () => {
            store.replaceReducer(reducers);
        });
    }

    return store;
};

export default store;
