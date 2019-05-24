import { RouteProps } from "react-router";
import RP from "_model/routes/RouteProps";
import Modal from "_model/routes/Modal";
import { ComponentType } from "react";

interface AppRoute extends RouteProps {
    readonly key: string;
    readonly title: string;
    readonly description?: string;
    readonly component?: ComponentType<RouteProps & RP>;
    readonly routes?: AppRoute[];
    readonly modal?: Modal<RP>;
}

export default AppRoute;
