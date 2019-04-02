import RoutePreload from "_model/routes/RoutePreload";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import { match } from "react-router";
import { CallHistoryMethodAction } from "connected-react-router";

interface PreloadLinkActions {
    readonly preloadRoute: (
        preLoad: RoutePreload,
        props: PreloadLinkProps,
        match: match,
        modal: boolean
    ) => void;
    readonly loadRoute: (props: PreloadLinkProps) => CallHistoryMethodAction;
}

export default PreloadLinkActions;
