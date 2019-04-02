import React, { ComponentType } from "react";
import RouteMethods from "_common/model/routes/RouteMethods";
import AppRoute from "_common/model/routes/AppRoute";
import RouteProps from "_model/routes/RouteProps";
import { connect } from "react-redux";

interface StateProps {}

type Props = RouteProps & StateProps;

const route = function(
    Component: ComponentType,
    routeMethods: RouteMethods<RouteProps> = {}
): ComponentType<RouteProps> {
    class RouteComponent extends React.Component<Props> {
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
    }

    return connect()(RouteComponent);
};

export default route;
