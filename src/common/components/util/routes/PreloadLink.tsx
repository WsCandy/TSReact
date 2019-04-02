import * as React from "react";
import { connect } from "react-redux";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import omit from "lodash/omit";
import { Link, matchPath, withRouter } from "react-router-dom";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import getLoadAction from "_util/routes/getLoadAction";
import preloadRoute from "_actions/loading/preLoadRoute";
import RoutesContext from "_components/util/routes/RoutesContext";
import AppRoute from "_model/routes/AppRoute";

/* eslint-disable-next-line */
import PreloadLinkProps from "_model/routes/PreloadLinkProps";

const navigate = (props: Props, routes: AppRoute[]) => {
    const {
        to, preloadRoute, loadRoute, location
    } = props;

    if (location.pathname === to) {
        return;
    }

    const matchedRoute = getMatchedRoute(to, routes);
    const match = matchPath(to, matchedRoute);
    const Component = matchedRoute.component as any;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load && match) {
            return preloadRoute(load, props, match, !!matchedRoute.modal);
        }
    }

    return loadRoute(props);
};

interface StateProps {}

type Props = PreloadLinkProps & StateProps;

const PreloadLink: React.FunctionComponent<Props> = props => {
    const { onClick } = props;

    const renderProps = omit(
        props,
        "staticContext",
        "match",
        "history",
        "location",
        "loadRoute",
        "preloadRoute",
        "routes"
    );

    return (
        <RoutesContext.Consumer>
            {context => (
                <Link
                    {...renderProps}
                    onClick={e => {
                        if (context.routes) {
                            e.preventDefault();
                            onClick
                                ? onClick()
                                : navigate(props, context.routes);
                        }
                    }}
                />
            )}
        </RoutesContext.Consumer>
    );
};

const mapDispatchToProps: MapDispatchToProps<
    PreloadLinkActions
> = dispatch => ({
    preloadRoute: (preLoad, props, match, modal) =>
        dispatch(preloadRoute(preLoad, props, match, modal)),
    loadRoute: props => dispatch(getLoadAction(props)(props.to))
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(PreloadLink));
