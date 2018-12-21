import { StaticRouterContext } from "react-router";

interface Context extends StaticRouterContext {
    status?: number;
    title?: string;
    description?: string;
}

export default Context;
