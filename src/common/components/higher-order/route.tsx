import React, { ComponentType } from "react";
import { RouteComponentProps } from "react-router";
import getMatchedRoute from "@common/util/routes/getMatchedRoute";
import RouteMethods from "@common/model/routing/RouteMethods";
import Context from "@common/model/routing/Context";

const route = function<P extends RouteComponentProps<{}, Context>>(
    Component: ComponentType,
    routeMethods: RouteMethods<P> = {}
) {
    return class extends React.Component<P> {
        componentWillMount(): void {
            const { staticContext } = this.props;
            const title = this.getTitle();

            if (typeof document !== "undefined") {
                document.title = title;
            }

            if (typeof staticContext !== "undefined") {
                staticContext.title = title;
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
