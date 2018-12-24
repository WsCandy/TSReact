import { RouteProps } from "react-router";

interface AppRoute extends RouteProps {
    readonly key: string;
    readonly title: string;
    readonly description?: string;
    readonly routes?: AppRoute[];
}

export default AppRoute;
