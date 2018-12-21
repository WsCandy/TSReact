import { StaticRouterContext } from "react-router";

interface Context extends StaticRouterContext {
    status?: number;
    title?: string;
}

export default Context;
