import { RouteProps } from "react-router";
import Modal from "_model/routes/Modal";

interface AppRoute extends RouteProps {
    readonly key: string;
    readonly title: string;
    readonly description?: string;
    readonly routes?: AppRoute[];
    readonly modal?: Modal<any>;
}

export default AppRoute;
