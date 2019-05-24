import * as React from "react";
import { connect } from "react-redux";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import { Link, matchPath, withRouter } from "react-router-dom";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import PreloadLinkActions from "_model/routes/PreloadLinkActions";
import getLoadAction from "_util/routes/getLoadAction";
import preloadRoute from "_actions/loading/preLoadRoute";
import RoutesContext from "_components/util/routes/RoutesContext";
import AppRoute from "_model/routes/AppRoute";
import PreloadLinkProps from "_model/routes/PreloadLinkProps";

const navigate = (props: PreloadLinkProps, routes: AppRoute[]) => {
    const {
        href, preloadRoute, loadRoute, location
    } = props;

    if (location.pathname === href) {
        return;
    }

    const matchedRoute = getMatchedRoute(href, routes);
    const match = matchPath(href, matchedRoute);
    const Component = matchedRoute.component as any;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load && match) {
            return preloadRoute(load, props, match, !!matchedRoute.modal);
        }
    }

    return loadRoute(props, { modal: !!matchedRoute.modal });
};

const PreloadLink: React.FunctionComponent<PreloadLinkProps> = props => {
    const {
        onClick, href, children, title, className
    } = props;

    return (
        <RoutesContext.Consumer>
            {context => (
                <Link
                    to={href}
                    title={title}
                    className={className}
                    onClick={e => {
                        if (context.routes) {
                            e.preventDefault();
                            onClick
                                ? onClick()
                                : navigate(props, context.routes);
                        }
                    }}
                >
                    {children}
                </Link>
            )}
        </RoutesContext.Consumer>
    );
};

const mapDispatchToProps: MapDispatchToProps<
    PreloadLinkActions
> = dispatch => ({
    preloadRoute: (preLoad, props, match, modal) =>
        dispatch(preloadRoute(preLoad, props, match, modal)),
    loadRoute: (props, state) =>
        dispatch(getLoadAction(props)(props.href, state))
});

export default connect(
    null,
    mapDispatchToProps
)(withRouter(PreloadLink));
