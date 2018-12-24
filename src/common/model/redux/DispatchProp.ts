import { ThunkDispatch } from "redux-thunk";
import AppState from "@model/redux/AppState";
import { Action } from "redux";

interface DispatchProp {
    readonly dispatch: ThunkDispatch<AppState, any, Action>;
}

export default DispatchProp;
