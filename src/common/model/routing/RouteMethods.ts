interface RouteMethods<T> {
    readonly getTitle?: (props: T, title: string) => string;
}

export default RouteMethods;
