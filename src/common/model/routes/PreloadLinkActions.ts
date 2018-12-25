import RoutePreload from "_model/routes/RoutePreload";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import { match } from "react-router";

interface PreloadLinkActions {
    readonly loadRoute: (
        preLoad: RoutePreload,
        props: PreloadLinkProps,
        match: match
    ) => void;
}

export default PreloadLinkActions;
