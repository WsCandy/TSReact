import React, { ComponentType } from "react";
import getMatchedRoute from "@common/util/routes/getMatchedRoute";
import RouteMethods from "@common/model/routing/RouteMethods";
import RouteProps from "@common/model/routing/RouteProps";
import AppRoute from "@common/model/routing/AppRoute";

const route = function<P extends RouteProps>(
    Component: ComponentType,
    routeMethods: RouteMethods<P> = {}
) {
    return class extends React.Component<P> {
        componentWillMount(): void {
            const { location } = this.props;
            const { staticContext } = this.props;
            const matchedRoute = getMatchedRoute(location.pathname);

            const title = this.getTitle(matchedRoute);
            const description = this.getDescription(matchedRoute);

            if (typeof document !== "undefined") {
                document.title = title;
            }

            if (typeof staticContext !== "undefined") {
                staticContext.title = title;
                staticContext.description = description;
            }
        }

        private getTitle(matchedRoute: AppRoute): string {
            return routeMethods.getTitle
                ? routeMethods.getTitle(this.props, matchedRoute.title)
                : matchedRoute.title;
        }

        private getDescription(matchedRoute: AppRoute): string | undefined {
            return routeMethods.getDescription
                ? routeMethods.getDescription(
                    this.props,
                    matchedRoute.description
                )
                : matchedRoute.description;
        }

        render() {
            return <Component {...this.props} />;
        }
    };
};

export default route;
