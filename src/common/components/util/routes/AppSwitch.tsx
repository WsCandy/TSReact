import * as React from "react";
import { Location } from "history";
import AppRoute from "_model/routes/AppRoute";
import { RouteComponentProps, Switch, withRouter } from "react-router";
import { generateRouteComponent } from "_util/routes/generateRoutes";
import getMatchedRoute from "_util/routes/getMatchedRoute";
import appRoutes from "_common/config/routing/routes";

interface Props extends RouteComponentProps<any> {
    readonly routes?: AppRoute[];
}

class AppSwitch extends React.Component<Props> {
    componentWillUpdate(): void {
        const { location } = this.props;
        this.previousLocation = location;
    }

    private previousLocation: Location | undefined;

    shouldRenderContainer(route: AppRoute): boolean {
        return (
            typeof this.previousLocation === "undefined" &&
            typeof route.modal === "object" &&
            typeof route.modal.container !== "undefined"
        );
    }

    private renderContainer(route: AppRoute) {
        if (
            typeof route.modal === "object" &&
            typeof route.modal.container !== "undefined"
        ) {
            return <route.modal.container {...this.props} route={route} />;
        }

        return null;
    }

    render(): React.ReactNode {
        const { location, routes } = this.props;
        const route = getMatchedRoute(location.pathname, appRoutes);

        if (typeof routes === "undefined") {
            return null;
        }

        const coreRoutes = routes.filter(route => !route.modal);
        const modalRoutes = routes.filter(route => route.modal);

        return (
            <React.Fragment>
                {this.shouldRenderContainer(route) ? (
                    this.renderContainer(route)
                ) : (
                    <Switch
                        location={
                            route.modal ? this.previousLocation : location
                        }
                    >
                        {coreRoutes.map(r => generateRouteComponent(r))}
                    </Switch>
                )}
                {modalRoutes.map(r => generateRouteComponent(r))}
            </React.Fragment>
        );
    }
}

export default withRouter(AppSwitch);
