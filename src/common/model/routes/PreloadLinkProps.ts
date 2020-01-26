import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import { AnchorHTMLAttributes } from "react";

interface PreloadLinkProps
    extends AnchorHTMLAttributes<HTMLAnchorElement>,
        PreloadLinkActions {
    readonly replace?: boolean;
    readonly href: string;
    readonly disabled?: boolean;
    readonly eventTracker?: () => void;
}

export default PreloadLinkProps;
