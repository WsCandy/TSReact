import { RouteProps } from "react-router";

interface AppRoute extends RouteProps {
    key: string;
    title: string;
    preLoad?: () => Promise<any>;
}

export default AppRoute;
