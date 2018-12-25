import { LinkProps, RouteComponentProps } from "react-router-dom";
import DispatchProp from "_model/redux/DispatchProp";

interface PreloadLinkProps
    extends LinkProps,
        DispatchProp,
        RouteComponentProps<any> {
    readonly to: string;
}

export default PreloadLinkProps;
