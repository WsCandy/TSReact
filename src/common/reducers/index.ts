import { combineReducers } from "redux";
import AppState from "_common/model/redux/AppState";
import example from "_reducers/example/example";
import { connectRouter } from "connected-react-router";
import { History } from "history";
import loading from "_reducers/loading/loading";

const reducers = (history: History) =>
    combineReducers<AppState>({
        example,
        router: connectRouter(history),
        loading
    });

export default reducers;
