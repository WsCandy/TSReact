import Dispatch from "_model/redux/Dispatch";
import Match from "_model/misc/Match";

type RoutePreload<M = {}> = (
    dispatch: Dispatch,
    match: Match<M>
) => Promise<any>;

export default RoutePreload;
