import { RouteComponentProps } from "react-router";
import Context from "@common/model/routes/Context";
import AppRoute from "@common/model/routes/AppRoute";

interface RouteProps extends RouteComponentProps<any, Context> {
    route: AppRoute;
}

export default RouteProps;
