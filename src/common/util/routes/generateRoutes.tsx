import AppRoute from "@common/model/routing/AppRoute";
import { Route, Switch } from "react-router";
import React from "react";

const render = (Component: any, props: {}, route: AppRoute) => <Component {...props} route={route} />;

const generateRoutes = (routes?: AppRoute[]) => {
    if (typeof routes === "undefined") {
        return null;
    }

    return (
        <Switch>
            {routes.map(r => (
                <Route
                    path={r.path}
                    exact={r.exact}
                    strict={r.strict}
                    key={r.key}
                    render={props => {
                        if (typeof r.render !== "undefined") {
                            return r.render({ ...props });
                        }

                        return render(r.component, props, r);
                    }}
                />
            ))}
        </Switch>
    );
};

export default generateRoutes;
