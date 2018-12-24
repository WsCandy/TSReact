import * as React from "react";
import { connect } from "react-redux";
import getMatchedRoute from "@util/routes/getMatchedRoute";
import routes from "@common/config/routing/routes";
import omit from "lodash/omit";
import { Link, matchPath, withRouter } from "react-router-dom";
import loadRoute from "@actions/loading/loadRoute";
import getAction from "@util/routes/getAction";
import PreloadLinkProps from "@model/routes/PreloadLinkProps";

const onClick = (props: PreloadLinkProps) => {
    const { to, dispatch } = props;

    const matchedRoute = getMatchedRoute(to, routes);
    const match = matchPath(to, matchedRoute);
    const Component = matchedRoute.component as any;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load && match) {
            return dispatch(loadRoute(load, props, match));
        }
    }

    return getAction(props);
};

const PreloadLink: React.FunctionComponent<PreloadLinkProps> = props => {
    const renderProps = omit(
        props,
        "staticContext",
        "dispatch",
        "match",
        "history",
        "location"
    );

    return (
        <Link
            {...renderProps}
            onClick={e => {
                e.preventDefault();
                onClick(props);
            }}
        />
    );
};

export default connect()(withRouter(PreloadLink));
