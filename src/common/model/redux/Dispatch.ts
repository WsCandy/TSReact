/* eslint-disable */
import { ThunkDispatch } from "redux-thunk";
import AppState from "_model/redux/AppState";
import { Action } from "redux";

type Dispatch = ThunkDispatch<AppState, any, Action>;

export default Dispatch;
