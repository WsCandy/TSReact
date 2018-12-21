import { RouteProps } from "react-router";

interface AppRoute extends RouteProps {
    key: string;
    title: string;
    description?: string;
    preLoad?: () => Promise<any>;
}

export default AppRoute;
