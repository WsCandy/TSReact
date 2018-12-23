import { combineReducers } from "redux";
import AppState from "@common/model/redux/AppState";
import example from "@reducers/example/example";

const reducers = combineReducers<AppState>({
    example
});

export default reducers;
