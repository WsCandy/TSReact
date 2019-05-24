import RoutePreload from "_model/routes/RoutePreload";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import { match } from "react-router";
import { CallHistoryMethodAction } from "connected-react-router";
import { History } from "history";

import LocationState = History.LocationState;

interface PreloadLinkActions {
    readonly preloadRoute: (
        preLoad: RoutePreload,
        props: PreloadLinkProps,
        match: match,
        modal: boolean
    ) => void;
    readonly loadRoute: (
        props: PreloadLinkProps,
        state: LocationState
    ) => CallHistoryMethodAction;
}

export default PreloadLinkActions;
