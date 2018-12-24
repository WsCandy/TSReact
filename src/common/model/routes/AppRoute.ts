import { RouteProps } from "react-router";

interface AppRoute extends RouteProps {
    key: string;
    title: string;
    description?: string;
    routes?: AppRoute[];
}

export default AppRoute;
