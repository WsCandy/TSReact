import * as React from "react";
import { connect } from "react-redux";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import routes from "_common/config/routing/routes";
import omit from "lodash/omit";
import { Link, matchPath, withRouter } from "react-router-dom";
import loadRoute from "_actions/loading/loadRoute";
import getAction from "_util/routes/getAction";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";

const onClick = (props: PreloadLinkProps) => {
    const { to, loadRoute } = props;

    const matchedRoute = getMatchedRoute(to, routes);
    const match = matchPath(to, matchedRoute);
    const Component = matchedRoute.component as any;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load && match) {
            return loadRoute(load, props, match);
        }
    }

    return getAction(props);
};

const PreloadLink: React.FunctionComponent<PreloadLinkProps> = props => {
    const renderProps = omit(
        props,
        "staticContext",
        "match",
        "history",
        "location",
        "loadRoute"
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

const mapDispatchToProps: MapDispatchToProps<
    PreloadLinkActions
> = dispatch => ({
    loadRoute: (preLoad, props, match) =>
        dispatch(loadRoute(preLoad, props, match))
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(PreloadLink));
