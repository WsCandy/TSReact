import { Dispatch } from "redux";
import { match } from "react-router";

type RoutePreload<M = {}> = (
    dispatch: Dispatch,
    match: match<M>
) => Promise<any>;

export default RoutePreload;
