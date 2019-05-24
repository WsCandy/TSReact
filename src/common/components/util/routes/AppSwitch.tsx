import * as React from "react";
import { Location } from "history";
import AppRoute from "_model/routes/AppRoute";
import {
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
import Overlay from "_components/util/misc/Overlay";

interface StateProps {}

interface Props extends RouteComponentProps<any>, StateProps {
    readonly routes?: AppRoute[];
}

class AppSwitch extends React.Component<Props> {
    private previousLocation: Location | undefined;

    componentDidMount(): void {
        this.previousLocation = this.getPreviousLocation();
    }

    componentWillUpdate(newProps: Props): void {
        this.previousLocation = this.getPreviousLocation(newProps);
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

        return this.previousLocation;
    }

    private shouldRenderContainer(route: AppRoute): boolean {
        return (
            typeof this.previousLocation === "undefined" &&
            typeof route.modal === "object" &&
            (typeof route.modal.path !== "undefined" ||
                typeof route.modal.container !== "undefined")
        );
    }

    private renderContainer(route: AppRoute, location: Location) {
        if (typeof route.modal !== "object") {
            return null;
        }

        if (typeof route.modal.path !== "undefined") {
            return this.renderContainerFromPath(route, route.modal.path);
        }

        if (typeof route.modal.container !== "undefined") {
            return this.renderContainerFromComponent(route, location);
        }

        return null;
    }

    private renderContainerFromPath(route: AppRoute, path: string) {
        const { match, routes } = this.props;
        const m = matchPath(path, route) || match;

        if (typeof routes === "undefined") {
            return null;
        }

        const r = getMatchedRoute(path, routes);

        if (typeof r.component === "undefined") {
            return null;
        }

        return <r.component {...this.props} route={r} match={m} />;
    }

    private renderContainerFromComponent(route: AppRoute, location: Location) {
        const { match } = this.props;
        const m = matchPath(location.pathname, route) || match;

        if (
            typeof route.modal === "object" &&
            typeof route.modal.container !== "undefined"
        ) {
            return (
                <route.modal.container
                    {...this.props}
                    route={route}
                    match={m}
                />
            );
        }

        return null;
    }

    render(): React.ReactNode {
        const { location, routes } = this.props;

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

        const route = getMatchedRoute(loc.pathname, routes);
        const targetRoute = getMatchedRoute(location.pathname, routes);
        const coreRoutes = routes.filter(route => !route.modal);
        const modalRoutes = routes.filter(route => route.modal);

        return (
            <React.Fragment>
                {!isModal ? <ScrollToTop /> : null}
                {this.shouldRenderContainer(route) ? (
                    this.renderContainer(route, loc)
                ) : (
                    <Switch location={loc}>
                        {coreRoutes.map(r =>
                            (route.key === "404"
                                ? generateRouteComponent(route)
                                : generateRouteComponent(r))
                        )}
                    </Switch>
                )}
                <TransitionGroup>
                    {typeof targetRoute.modal !== "undefined" ? (
                        <CSSTransition
                            classNames="fade"
                            timeout={300}
                            exit
                            appear
                        >
                            <Overlay>
                                <Switch location={location}>
                                    {modalRoutes.map(r =>
                                        generateRouteComponent(r)
                                    )}
                                </Switch>
                            </Overlay>
                        </CSSTransition>
                    ) : null}
                </TransitionGroup>
            </React.Fragment>
        );
    }
}

export default withRouter(connect()(AppSwitch));
