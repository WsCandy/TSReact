import { RouteProps } from "react-router";
import { ComponentType } from "react";

// eslint-disable-next-line
import RP from "_model/routes/RouteProps";

interface AppRoute extends RouteProps {
    readonly key: string;
    readonly title: string;
    readonly priority?: number;
    readonly description?: string;
    readonly component?: ComponentType<RouteProps & RP>;
    readonly routes?: AppRoute[];
    readonly modal?: Modal;
    readonly scroll?: boolean;
}

export default AppRoute;
