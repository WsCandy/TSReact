import * as React from "react";
import { Location } from "history";
import AppRoute from "_model/routes/AppRoute";
import { RouteComponentProps, Switch, withRouter } from "react-router";
import { generateRouteComponent } from "_util/routes/generateRoutes";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScrollToTop from "_util/routes/ScrollToTop";
import Overlay from "_components/util/misc/Overlay";
import get404Route from "_util/routes/get404Route";

interface Props extends RouteComponentProps<any> {
    readonly routes?: AppRoute[];
}

class AppSwitch extends React.Component<Props> {
    private previousLocation: Location | undefined;

    public componentDidMount(): void {
        this.previousLocation = this.getPreviousLocation();
    }

    public componentWillUpdate(newProps: Props): void {
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

    public render(): React.ReactNode {
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

        const targetRoute = getMatchedRoute(location.pathname, routes);
        const route = this.getRouteFromPath(targetRoute);
        const coreRoutes = routes.filter(route => !route.modal);
        const modalRoutes = routes.filter(route => route.modal);

        return (
            <>
                {!isModal ? <ScrollToTop /> : null}
                <Switch location={loc}>
                    {coreRoutes.map(r =>
                        r.key === "404"
                            ? generateRouteComponent({
                                ...route,
                                path: undefined
                            })
                            : generateRouteComponent(r)
                    )}
                </Switch>
                <TransitionGroup component={null}>
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
            </>
        );
    }
}

export default withRouter(connect()(AppSwitch));
