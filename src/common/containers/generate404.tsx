import * as React from "react";
import NotFound from "_containers/NotFound";
import get404Route from "_util/routes/get404Route";

// eslint-disable-next-line
import RouteProps from "_model/routes/RouteProps";

const generate404: React.FunctionComponent<RouteProps> = props => (
    <NotFound {...props} route={get404Route()} />
);

export default generate404;
