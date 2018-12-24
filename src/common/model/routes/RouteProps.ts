import { RouteComponentProps } from "react-router";
import Context from "@common/model/routes/Context";
import AppRoute from "@common/model/routes/AppRoute";

interface RouteProps<P = {}> extends RouteComponentProps<P, Context> {
    readonly route: AppRoute;
}

export default RouteProps;
