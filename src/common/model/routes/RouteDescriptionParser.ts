type RouteDescriptionParser<P> = (
    props: P,
    description?: string
) => string | undefined;

export default RouteDescriptionParser;
