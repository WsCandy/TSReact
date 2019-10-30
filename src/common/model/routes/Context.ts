import { StaticRouterContext } from "react-router";
import OpenGraph from "_server/model/OpenGraph";

interface Context extends StaticRouterContext {
    language?: string;
    status?: number;
    title?: string;
    description?: string;
    url?: string;
    og?: Partial<OpenGraph>;
}

export default Context;
