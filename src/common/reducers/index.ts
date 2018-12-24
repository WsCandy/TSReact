import { combineReducers } from "redux";
import AppState from "@common/model/redux/AppState";
import example from "@reducers/example/example";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import loading from "@reducers/loading/loading";

const reducers = (history: History) =>
    combineReducers<AppState>({
        example,
        router: connectRouter(history),
        loading
    });

export default reducers;
