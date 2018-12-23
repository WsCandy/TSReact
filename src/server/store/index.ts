import reducers from "@reducers/index";
import { createStore, Store } from "redux";
import AppState from "@model/redux/AppState";

const store = (): Store<AppState> => createStore(reducers);

export default store;
