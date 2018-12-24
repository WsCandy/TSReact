import { Dispatch } from "redux";
import { match } from "react-router";

interface RouteMethods<P, M = {}> {
    readonly getTitle?: (props: P, title: string) => string;
    readonly getDescription?: (
        props: P,
        description?: string
    ) => string | undefined;
    readonly preLoad?: (
        dispatch: Dispatch,
        match: match<M> | null
    ) => Promise<any>;
}

export default RouteMethods;
