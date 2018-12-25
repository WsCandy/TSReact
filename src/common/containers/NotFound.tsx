import * as React from "react";
import route from "_common/components/higher-order/route";
import RouteProps from "_common/model/routes/RouteProps";
import RouteTitleParser from "_model/routes/RouteTitleParser";
import RouteDescriptionParser from "_model/routes/RouteDescriptionParser";

const NotFound: React.FunctionComponent<RouteProps> = ({
    staticContext = {}
}) => {
    staticContext.status = 404;

    return (
        <div>
            <p>Page not found :(</p>
        </div>
    );
};

const getTitle: RouteTitleParser<RouteProps> = ({ location }, title) =>
    title.replace("$s", location.pathname);

const getDescription: RouteDescriptionParser<RouteProps> = (
    { location },
    description
) => {
    if (typeof description === "undefined") {
        return;
    }

    return description.replace("$s", location.pathname);
};

export default route<RouteProps>(NotFound, {
    getTitle,
    getDescription
});
