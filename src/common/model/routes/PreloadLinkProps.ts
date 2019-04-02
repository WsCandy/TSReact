import { LinkProps, RouteComponentProps } from "react-router-dom";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import AppRoute from "_model/routes/AppRoute";

interface PreloadLinkProps
    extends LinkProps,
        PreloadLinkActions,
        RouteComponentProps<any> {
    readonly to: string;
    readonly onClick?: () => void;
    readonly routes?: AppRoute[];
}

export default PreloadLinkProps;
