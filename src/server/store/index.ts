import reducers from "@reducers/index";
import { applyMiddleware, createStore, Store } from "redux";
import AppState from "@model/redux/AppState";
import createMemoryHistory from "history/createMemoryHistory";
import thunk from "redux-thunk";

const store = (url: string): Store<AppState> => {
    const history = createMemoryHistory({ initialEntries: [url] });
    return createStore(reducers(history), applyMiddleware(thunk));
};

export default store;
