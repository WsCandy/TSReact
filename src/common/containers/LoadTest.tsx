import * as React from "react";
import route from "_common/components/higher-order/route";
import RouteProps from "_model/routes/RouteProps";
import RoutePreload from "_model/routes/RoutePreload";
import RouteTitleParser from "_model/routes/RouteTitleParser";

type Props = RouteProps<Params>;

interface Params {
    readonly test: string;
}

const preLoad: RoutePreload<Params> = () => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), 2000);
    });
};

const getTitle: RouteTitleParser<Props> = (props, title) =>
    title.replace("$s", props.match.params.test);

const LoadTest: React.FunctionComponent<Props> = props => {
    const { match } = props;

    return (
        <>
            <p>
                Load Test, this page should take 2 seconds! -{" "}
                {match.params.test}
            </p>
        </>
    );
};

export default route(LoadTest, {
    preLoad,
    getTitle
});
