import reducers from "@reducers/index";
import { createStore, Store } from "redux";
import AppState from "@model/redux/AppState";
import createMemoryHistory from "history/createMemoryHistory";

const store = (url: string): Store<AppState> => {
    const history = createMemoryHistory({ initialEntries: [url] });
    return createStore(reducers(history));
};

export default store;
