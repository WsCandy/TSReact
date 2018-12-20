import { StaticRouterContext } from "react-router";

interface Context extends StaticRouterContext {
    status?: number;
}

export default Context;
