import React from "react";
import route from "_components/higher-order/route";
import RouteProps from "_model/routes/RouteProps";
import AppSwitch from "_components/util/routes/AppSwitch";
import RoutePreload from "_model/routes/RoutePreload";

type Props = RouteProps;

const SubRouteTest: React.FunctionComponent<Props> = props => {
    const { route } = props;

    return (
        <>
            <p>Hello</p>
            <AppSwitch routes={route.routes} />
        </>
    );
};

const preLoad: RoutePreload = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), 200);
    });
};

export default route(SubRouteTest, {
    preLoad
});
