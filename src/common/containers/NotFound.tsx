import * as React from "react";
import route from "@common/components/higher-order/route";
import RouteProps from "@common/model/routes/RouteProps";

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

const getTitle = ({ location }: RouteProps, title: string) =>
    title.replace("$s", location.pathname);

const getDescription = ({ location }: RouteProps, description?: string) => {
    if (typeof description === "undefined") {
        return;
    }

    return description.replace("$s", location.pathname);
};

export default route<RouteProps>(NotFound, {
    getTitle,
    getDescription
});
