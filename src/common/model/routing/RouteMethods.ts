interface RouteMethods<T> {
    readonly getTitle?: (props: T, title: string) => string;
    readonly getDescription?: (
        props: T,
        description?: string
    ) => string | undefined;
    readonly preLoad?: (props: T) => Promise<any>;
}

export default RouteMethods;
