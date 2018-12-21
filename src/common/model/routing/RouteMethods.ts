interface RouteMethods<T> {
    readonly getTitle?: (props: T, title: string) => string;
    readonly getDescription?: (
        props: T,
        description?: string
    ) => string | undefined;
}

export default RouteMethods;
