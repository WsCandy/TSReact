import * as React from "react";
import route from "@common/components/higher-order/route";
import RouteProps from "@model/routing/RouteProps";

interface Props extends RouteProps {}

const preLoad = () =>
    new Promise(resolve => {
        setTimeout(() => resolve(), 2000);
    });

const LoadTest: React.FunctionComponent<Props> = () => (
    <React.Fragment>
        <p>Load Test, this page should take 2 seconds!</p>
    </React.Fragment>
);

export default route(LoadTest, {
    preLoad
});
