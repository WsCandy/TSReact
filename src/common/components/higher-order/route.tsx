import React, { ComponentType } from "react";
import RouteMethods from "_common/model/routes/RouteMethods";
import AppRoute from "_common/model/routes/AppRoute";
import RouteProps from "_model/routes/RouteProps";

const route = function<P extends RouteProps>(
    Component: ComponentType,
    routeMethods: RouteMethods<P> = {}
): ComponentType<P> {
    return class RouteComponent extends React.Component<P> {
        static preLoad() {
            return routeMethods.preLoad;
        }

        componentWillMount(): void {
            const { staticContext, route } = this.props;
            const title = this.getTitle(route);

            if (typeof document !== "undefined") {
                document.title = title;
            }

            if (typeof staticContext !== "undefined") {
                staticContext.title = title;
                staticContext.description = this.getDescription(route);

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
