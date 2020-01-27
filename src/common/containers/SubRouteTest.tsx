import React from "react";
import route from "_components/higher-order/route";
import RouteProps from "_model/routes/RouteProps";
import AppSwitch from "_components/util/routes/AppSwitch";
import RoutePreload from "_model/routes/RoutePreload";
import PreloadLink from "_components/util/routes/PreloadLink";

type Props = RouteProps;

const SubRouteTest: React.FunctionComponent<Props> = props => {
    const { route } = props;

    return (
        <>
            <PreloadLink href="/test">None</PreloadLink>
            <PreloadLink href="/test/sub">Sub 1</PreloadLink>
            <PreloadLink href="/test/sub2">Sub 2</PreloadLink>
            <AppSwitch routes={route.routes} />
        </>
    );
};

const preLoad: RoutePreload = () => {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    });
};

export default route(SubRouteTest, {
    preLoad
});
