import { StaticRouterContext } from "react-router";

interface Context extends StaticRouterContext {
    status?: number;
    title?: string;
    description?: string;
    url?: string;
    language?: string;
}

export default Context;
