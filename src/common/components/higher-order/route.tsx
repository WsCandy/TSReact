import React, { ComponentType } from "react";
import RouteProps from "_model/routes/RouteProps";
import RouteMethods from "_model/routes/RouteMethods";
import { UnregisterCallback } from "history";
import AppRoute from "_model/routes/AppRoute";
import get404Title from "_util/routes/get404Title";
import get404Description from "_util/routes/get404Description";

type Props = RouteProps;

const route = function(
    Component: ComponentType,
    routeMethods: RouteMethods<RouteProps> = {}
) {
    class RouteComponent extends React.Component<Props> {
        public static preLoad() {
            return routeMethods.preLoad;
        }

        private unListen?: UnregisterCallback;

        public constructor(props: Props, context: any) {
            super(props, context);

            if (typeof window === "undefined") {
                this.setTitles(props);
            }
        }

        public componentDidMount(): void {
            const { history, match } = this.props;

            this.unListen = history.listen(() => {
                const { match } = this.props;

                if (match.url !== window.location.pathname) {
                    return;
                }

                this.setTitles(this.props);
            });

            if (match.url !== window.location.pathname && match.isExact) {
                return;
            }

            return this.setTitles(this.props);
        }

        public componentDidUpdate(): void {
            const { route, match } = this.props;

            if (typeof document !== "undefined") {
                if (match.url !== window.location.pathname) {
                    return;
                }

                document.title = this.getTitle(route);
            }
        }

        public componentWillUnmount(): void {
            if (typeof this.unListen !== "undefined") {
                this.unListen();
            }
        }

        private setTitles(props: Props) {
            const { staticContext, route } = props;
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
            const { history } = this.props;

            if (routeMethods.getTitle) {
                return (
                    routeMethods.getTitle(this.props, matchedRoute.title) ||
                    get404Title(history)
                );
            }

            return matchedRoute.title;
        }

        public getDescription(matchedRoute: AppRoute): string | undefined {
            const { history } = this.props;

            if (routeMethods.getDescription) {
                return (
                    routeMethods.getDescription(
                        this.props,
                        matchedRoute.description
                    ) || get404Description(history)
                );
            }

            return matchedRoute.description;
        }

        public render() {
            return <Component {...this.props} />;
        }
    }

    return RouteComponent;
};

export default route;
