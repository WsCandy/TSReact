import { Dispatch } from "redux";
import { match } from "react-router";

type RoutePreload = (dispatch: Dispatch, match: match | null) => Promise<any>;

export default RoutePreload;
