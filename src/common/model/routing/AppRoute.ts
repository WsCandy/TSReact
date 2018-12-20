import { RouteProps } from "react-router";

interface AppRoute extends RouteProps {
    key: string;
    title: string;
}

export default AppRoute;
