/* eslint-disable */
import { ThunkAction } from "redux-thunk";
import AppState from "_model/redux/AppState";
import { Action } from "redux";

type AsyncAction<R> = ThunkAction<R, AppState, any, Action>;

export default AsyncAction;
