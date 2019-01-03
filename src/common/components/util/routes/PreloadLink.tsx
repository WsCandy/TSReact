import * as React from "react";
import { connect } from "react-redux";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import routes from "_common/config/routing/routes";
import omit from "lodash/omit";
import { Link, matchPath, withRouter } from "react-router-dom";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import getLoadAction from "_util/routes/getLoadAction";
import preloadRoute from "_actions/loading/preloadRoute";

const onClick = (props: PreloadLinkProps) => {
    const { to, preloadRoute, loadRoute } = props;

    const matchedRoute = getMatchedRoute(to, routes);
    const match = matchPath(to, matchedRoute);
    const Component = matchedRoute.component as any;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load && match) {
            return preloadRoute(load, props, match);
        }
    }

    return loadRoute(props);
};

const PreloadLink: React.FunctionComponent<PreloadLinkProps> = props => {
    const renderProps = omit(
        props,
        "staticContext",
        "match",
        "history",
        "location",
        "loadRoute",
        "preloadRoute"
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
    preloadRoute: (preLoad, props, match) =>
        dispatch(preloadRoute(preLoad, props, match)),
    loadRoute: props => dispatch(getLoadAction(props)(props.to))
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(PreloadLink));
