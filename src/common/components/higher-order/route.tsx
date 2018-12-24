import React, { ComponentType } from "react";
import getMatchedRoute from "@common/util/routes/getMatchedRoute";
import RouteMethods from "@common/model/routes/RouteMethods";
import AppRoute from "@common/model/routes/AppRoute";
import routes from "@common/config/routing/routes";
import RouteProps from "@model/routes/RouteProps";

const route = function<P extends RouteProps, M = {}>(
    Component: ComponentType,
    routeMethods: RouteMethods<P, M> = {}
): ComponentType {
    return class RouteComponent extends React.Component<P> {
        static preLoad() {
            return routeMethods.preLoad;
        }

        componentWillMount(): void {
            const { location, staticContext } = this.props;
            const matchedRoute = getMatchedRoute(location.pathname, routes);
            const title = this.getTitle(matchedRoute);

            if (typeof document !== "undefined") {
                document.title = title;
            }

            if (typeof staticContext !== "undefined") {
                staticContext.title = title;
                staticContext.description = this.getDescription(matchedRoute);

                if (typeof routeMethods.preLoad !== "undefined") {
                    staticContext.preLoad = RouteComponent.preLoad();
                }
            }
        }

        public getTitle(matchedRoute: AppRoute): string {
            return routeMethods.getTitle
                ? routeMethods.getTitle(this.props, matchedRoute.title)
                : matchedRoute.title;
        }

        public getDescription(matchedRoute: AppRoute): string | undefined {
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
