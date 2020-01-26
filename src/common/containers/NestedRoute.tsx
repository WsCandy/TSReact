import React from "react";
import RouteProps from "_model/routes/RouteProps";
import route from "_components/higher-order/route";

interface Params {
    readonly name: string;
}

type Props = RouteProps<Params>;

const NestedRoute: React.FunctionComponent<Props> = props => {
    const { match } = props;

    return <p>Route...! {match.params.name}</p>;
};

export default route(NestedRoute);
