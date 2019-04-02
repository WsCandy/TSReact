import AppRoute from "_common/model/routes/AppRoute";
import { Route, RouteComponentProps } from "react-router";
import React, { ComponentType } from "react";
import Modal from "_containers/Modal";

const render = (props: any, route: AppRoute, Component?: ComponentType<any>) =>
    (typeof Component !== "undefined" ? (
        <Component key={route.key} {...props} route={route} />
    ) : null);

const renderModal = (props: RouteComponentProps<any>, route: AppRoute) => (
    <Modal key={route.key}>{render(props, route, route.component)}</Modal>
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
                return route.render(props);
            }

            return route.modal
                ? renderModal(props, route)
                : render(props, route, route.component);
        }}
    />
);

export { render, generateRouteComponent };
