import AppRoute from "_common/model/routes/AppRoute";
import { Route, Switch } from "react-router";
import React from "react";

const render = (Component: any, props: {}, route: AppRoute) => (
    <Component {...props} route={route} />
);

const generateRouteComponent = (route: AppRoute) => (
    <Route
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        key={route.key}
        sensitive={route.sensitive}
        render={props => {
            if (typeof route.render !== "undefined") {
                return route.render({ ...props });
            }

            return render(route.component, props, route);
        }}
    />
);

const generateRoutes = (routes?: AppRoute[]) => {
    if (typeof routes === "undefined") {
        return null;
    }

    return <Switch>{routes.map(r => generateRouteComponent(r))}</Switch>;
};

export default generateRoutes;
export { render, generateRouteComponent };
