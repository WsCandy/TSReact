import { RouteProps } from "react-router";

interface AppRoute extends RouteProps {
    key: string;
    title: string;
    description?: string;
    preLoad?: () => Promise<any>;
    routes?: AppRoute[];
}

export default AppRoute;
