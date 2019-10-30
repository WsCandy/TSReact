import { RouteComponentProps } from "react-router-dom";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import AppRoute from "_model/routes/AppRoute";
import { AnchorHTMLAttributes } from "react";

interface PreloadLinkProps
    extends AnchorHTMLAttributes<HTMLAnchorElement>,
        PreloadLinkActions,
        RouteComponentProps<any> {
    readonly href: string;
    readonly to?: string;
    readonly routes?: AppRoute[];
    readonly replace?: boolean;
    readonly disabled?: boolean;
    readonly defaultValue?: string;
    readonly eventTracker?: () => void;
}

export default PreloadLinkProps;
