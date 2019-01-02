import reducers from "_reducers/index";
import { applyMiddleware, createStore, Store } from "redux";
import AppState from "_model/redux/AppState";
import createMemoryHistory from "history/createMemoryHistory";
import thunk from "redux-thunk";
import { enableBatching } from "redux-batched-actions";

const store = (url: string): Store<AppState> => {
    const history = createMemoryHistory({ initialEntries: [url] });
    return createStore(
        enableBatching(reducers(history)),
        applyMiddleware(thunk)
    );
};

export default store;
