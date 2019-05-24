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

interface StateProps {}

interface Props extends RouteComponentProps<any>, StateProps {
    readonly routes?: AppRoute[];
}

class AppSwitch extends React.Component<Props> {
    private previousLocation: Location | undefined;

    componentWillUpdate(newProps: Props): void {
        const { location, history, routes } = this.props;

        if (typeof routes === "undefined") {
            return;
        }

        if (history.action === "POP") {
            const route = getMatchedRoute(history.location.pathname, routes);

            if (!route.modal) {
                return;
            }

            if (this.previousLocation !== location) {
                return;
            }

            this.previousLocation = newProps.location;
        }

        if (history.action !== "POP") {
            this.previousLocation = location;
        }
    }

    shouldRenderContainer(route: AppRoute): boolean {
        return (
            typeof this.previousLocation === "undefined" &&
            typeof route.modal === "object" &&
            typeof route.modal.container !== "undefined"
        );
    }

    private renderContainer(route: AppRoute, location: Location) {
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
        const { location, routes, history } = this.props;

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
                    <CSSTransition
                        key={location.key}
                        classNames="slide"
                        timeout={400}
                        exit={false}
                        enter={history.action !== "POP"}
                    >
                        <Switch location={location}>
                            {modalRoutes.map(r => generateRouteComponent(r))}
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </React.Fragment>
        );
    }
}

export default withRouter(connect()(AppSwitch));
