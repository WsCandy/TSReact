import * as React from "react";
import route from "_common/components/higher-order/route";
import RouteProps from "_common/model/routes/RouteProps";
import RouteTitleParser from "_model/routes/RouteTitleParser";
import RouteDescriptionParser from "_model/routes/RouteDescriptionParser";
import PreloadLink from "_components/util/routes/PreloadLink";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import StatusContext from "_contexts/StatusContext";

const NotFound: React.FunctionComponent<RouteProps> = props => {
    const { staticContext } = props;
    const context = useContext(StatusContext);
    const history = useHistory();
    const status = 404;

    if (typeof staticContext !== "undefined") {
        staticContext.status = status;
    }

    useEffect(() => {
        const listen = history.listen(() => {
            context.setStatus?.(200);
        });

        return () => listen();
    }, []);

    return (
        <div>
            <p>
                Page not found :({" "}
                <PreloadLink href="/" title="Go Home">
                    Go home
                </PreloadLink>
            </p>
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

export default route(NotFound, {
    getTitle,
    getDescription
});
