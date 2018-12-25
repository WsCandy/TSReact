import { LinkProps, RouteComponentProps } from "react-router-dom";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";

interface PreloadLinkProps
    extends LinkProps,
        PreloadLinkActions,
        RouteComponentProps<any> {
    readonly to: string;
}

export default PreloadLinkProps;
