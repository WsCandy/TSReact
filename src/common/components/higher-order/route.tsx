import React, { ComponentType } from "react";
import RouteProps from "_model/routes/RouteProps";
import RouteMethods from "_model/routes/RouteMethods";
import { UnregisterCallback } from "history";
import AppRoute from "_model/routes/AppRoute";
import RoutePreload from "_model/routes/RoutePreload";
import getMatchedRoute from "_util/routes/getMatchedRoute";

type Props = RouteProps;

const route = function(
    Component: ComponentType,
    routeMethods: RouteMethods<RouteProps> = {}
) {
    class RouteComponent extends React.Component<Props> {
        public static preLoad(): RoutePreload | undefined {
            return routeMethods.preLoad;
        }

        private unListen?: UnregisterCallback;

        public constructor(props: Props, context: any) {
            super(props, context);

            if (typeof window === "undefined") {
                this.setMetas(props);
            }
        }

        public componentDidMount(): void {
            const { history, match } = this.props;

            this.unListen = history.listen(() => {
                const { match } = this.props;

                if (match.url !== window.location.pathname) {
                    return;
                }

                this.setMetas(this.props);
            });

            if (match.url !== window.location.pathname && match.isExact) {
                return;
            }

            return this.setMetas(this.props);
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
            this.unListen?.();
        }

        private setMetas(props: Props) {
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
            const { location } = this.props;

            if (matchedRoute.routes) {
                const matched = getMatchedRoute(
                    location.pathname,
                    matchedRoute.routes
                );

                if (matched.key !== "404") {
                    return (
                        routeMethods?.getTitle?.(this.props, matched.title) ||
                        matched.title
                    );
                }
            }

            return (
                routeMethods?.getTitle?.(this.props, matchedRoute.title) ||
                matchedRoute.title
            );
        }

        public getDescription(matchedRoute: AppRoute): string | undefined {
            const { location } = this.props;

            if (matchedRoute.routes) {
                const matched = getMatchedRoute(
                    location.pathname,
                    matchedRoute.routes
                );

                if (matched.key !== "404") {
                    return (
                        routeMethods?.getDescription?.(
                            this.props,
                            matched.description
                        ) || matched.description
                    );
                }
            }

            return (
                routeMethods?.getDescription?.(
                    this.props,
                    matchedRoute.description
                ) || matchedRoute.description
            );
        }

        public render() {
            return <Component {...this.props} />;
        }
    }

    return RouteComponent;
};

export default route;
