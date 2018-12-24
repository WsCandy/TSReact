import * as React from "react";
import route from "@common/components/higher-order/route";
import RouteProps from "@model/routes/RouteProps";
import { Dispatch } from "redux";
import { match } from "react-router";

interface Props extends RouteProps<Params> {}

interface Params {
    test: string;
}

const preLoad = (_: Dispatch, match: match<Params>) => {
    console.log(match.params.test);

    return new Promise(resolve => {
        setTimeout(() => resolve(), 2000);
    });
};

const LoadTest: React.FunctionComponent<Props> = props => {
    const { match } = props;

    return (
        <React.Fragment>
            <p>
                Load Test, this page should take 2 seconds! -{" "}
                {match.params.test}
            </p>
        </React.Fragment>
    );
};

export default route<Props>(LoadTest, {
    preLoad
});
