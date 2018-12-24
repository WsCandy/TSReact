import RoutePreload from "@model/routes/RoutePreload";

interface RouteMethods<P, M = {}> {
    readonly getTitle?: (props: P, title: string) => string;
    readonly getDescription?: (
        props: P,
        description?: string
    ) => string | undefined;
    readonly preLoad?: RoutePreload<M>;
}

export default RouteMethods;
