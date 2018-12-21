import { RouteComponentProps } from "react-router";
import Context from "@common/model/routing/Context";
import AppRoute from "@common/model/routing/AppRoute";

interface RouteProps extends RouteComponentProps<{}, Context> {
    route: AppRoute;
}

export default RouteProps;
