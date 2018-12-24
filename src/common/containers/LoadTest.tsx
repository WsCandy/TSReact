import * as React from "react";
import route from "@common/components/higher-order/route";
import RouteProps from "@model/routes/RouteProps";
import { Dispatch } from "redux";
import { match } from "react-router";

interface Props extends RouteProps {}

interface Params {
    test: string;
}

const preLoad = (_: Dispatch, match: match<Params>) => {
    console.log(match.params.test);

    return new Promise(resolve => {
        setTimeout(() => resolve(), 2000);
    });
};

const LoadTest: React.FunctionComponent<Props> = () => (
    <React.Fragment>
        <p>Load Test, this page should take 2 seconds!</p>
    </React.Fragment>
);

export default route<Props, Params>(LoadTest, {
    preLoad
});
