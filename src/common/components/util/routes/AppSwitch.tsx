import * as React from "react";
import { Location } from "history";
import AppRoute from "_model/routes/AppRoute";
import {
    // eslint-disable-next-line
    match,
    matchPath,
    RouteComponentProps,
    Switch,
    withRouter
} from "react-router";
import { generateRouteComponent } from "_util/routes/generateRoutes";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScrollToTop from "_util/routes/ScrollToTop";
import get404Route from "_util/routes/get404Route";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import NotFoundContext from "_components/util/misc/NotFoundContext";
import { replace } from "connected-react-router";
import Overlay from "_containers/Overlay";
import _omit from "lodash/omit";

interface Actions {
    readonly go: (path: string) => void;
}

interface Props extends RouteComponentProps<any>, Actions {
    readonly routes?: AppRoute[];
    readonly is404: boolean;
}

interface State {
    readonly is404: boolean;
}

class AppSwitch extends React.Component<Props, State> {
    private previousLocation: Location | undefined;

    private timeout?: number;

    public static defaultProps = {
        is404: false
    };

    public constructor(props: Props) {
        super(props);
        this.state = {
            is404: props.is404
        };
    }

    public componentDidMount(): void {
        this.previousLocation = this.getPreviousLocation();
    }

    private getPreviousLocation(newProps?: Props): Location | undefined {
        const { location, history, routes } = this.props;

        if (typeof routes === "undefined") {
            return this.previousLocation;
        }

        if (typeof location.state === "undefined") {
            return location;
        }

        if (history.action === "POP" && typeof newProps !== "undefined") {
            const route = getMatchedRoute(history.location.pathname, routes);

            if (!route.modal) {
                return this.previousLocation;
            }

            if (this.previousLocation !== location) {
                return this.previousLocation;
            }

            return newProps.location;
        }

        if (history.action !== "POP" && !location.state.modal) {
            return location;
        }

        if (!this.previousLocation && location.state.modal) {
            return { ...location, pathname: "/", state: {} };
        }

        return this.previousLocation;
    }

    private getRouteFromPath(route: AppRoute) {
        const { routes } = this.props;

        if (typeof route.modal === "undefined") {
            return get404Route();
        }

        if (typeof routes === "undefined") {
            return get404Route();
        }

        return getMatchedRoute(route.modal.path, routes);
    }

    private modalBack(route: AppRoute) {
        const { history, location, go } = this.props;

        const match: match<{ un: string }> | null = matchPath(
            location.pathname,
            route
        );

        if (!match) {
            return;
        }

        const path = route.modal
            ? route.modal.path.replace(":un", match.params.un)
            : "/";

        if (history.action === "PUSH" || history.action === "REPLACE") {
            return history.goBack();
        }

        go(path);
    }

    public UNSAFE_componentWillUpdate(nextProps: Props): void {
        this.previousLocation = this.getPreviousLocation(nextProps);
    }

    public render(): React.ReactNode {
        const { location, routes } = this.props;
        const { is404 } = this.state;

        if (typeof routes === "undefined") {
            return null;
        }

        const isModal =
            location.state &&
            location.state.modal &&
            this.previousLocation !== location;

        const loc =
            isModal && typeof this.previousLocation !== "undefined"
                ? this.previousLocation
                : location;

        const targetRoute = !is404
            ? getMatchedRoute(location.pathname, routes)
            : get404Route();

        const modalBgRoute = _omit(this.getRouteFromPath(targetRoute), "path");
        const coreRoutes = routes.filter(route => !route.modal);
        const modalRoutes = routes.filter(route => route.modal);

        return (
            <NotFoundContext.Provider
                value={{ set404: is404 => this.setState({ is404 }) }}
            >
                {!isModal ? <ScrollToTop scroll={targetRoute.scroll} /> : null}
                <Switch location={loc}>
                    {coreRoutes.map(r => {
                        return r.key === "404"
                            ? generateRouteComponent(modalBgRoute)
                            : generateRouteComponent(r);
                    })}
                </Switch>

                {!is404 ? (
                    <TransitionGroup component={null}>
                        {typeof targetRoute.modal !== "undefined" ? (
                            <CSSTransition
                                classNames="fade"
                                timeout={300}
                                exit
                                enter
                                appear
                            >
                                <Overlay
                                    onMouseDown={() =>
                                        this.modalBack(targetRoute)
                                    }
                                >
                                    <Switch location={location}>
                                        {modalRoutes.map(r =>
                                            generateRouteComponent(r)
                                        )}
                                    </Switch>
                                </Overlay>
                            </CSSTransition>
                        ) : null}
                    </TransitionGroup>
                ) : null}
            </NotFoundContext.Provider>
        );
    }
}

const mapDispatchToProps: MapDispatchToProps<Actions> = dispatch => ({
    go: path => dispatch(replace(path))
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(AppSwitch)
);
