import React, { ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import getMatchedRoute from "@common/util/routes/getMatchedRoute";
import RouteMethods from "@common/model/routing/RouteMethods";

const route = function<P extends RouteComponentProps>(
    Component: ComponentType,
    routeMethods: RouteMethods<P> = {}
) {
    return class extends React.Component<P> {
        componentWillMount(): void {
            if (typeof document !== "undefined") {
                document.title = this.getTitle();
            }
        }

        private getTitle(): string {
            const { location } = this.props;
            const { title } = getMatchedRoute(location.pathname);

            return routeMethods.getTitle
                ? routeMethods.getTitle(this.props, title)
                : title;
        }

        render() {
            return <Component {...this.props} />;
        }
    };
};

export default route;
