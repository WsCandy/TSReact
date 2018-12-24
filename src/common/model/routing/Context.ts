import { match, StaticRouterContext } from "react-router";
import { Dispatch } from "redux";

interface Context extends StaticRouterContext {
    status?: number;
    title?: string;
    description?: string;
    preLoad?: (dispatch: Dispatch, match: match<{}> | null) => Promise<any>;
}

export default Context;
