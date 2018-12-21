import * as React from "react";
import Context from "@common/model/routing/Context";
import route from "@common/components/higher-order/route";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {
    readonly staticContext: Context;
}

const NotFound: React.FunctionComponent<Props> = ({ staticContext = {} }) => {
    staticContext.status = 404;

    return (
        <div>
            <p>Page not found :(</p>
        </div>
    );
};

const getTitle = ({ location }: Props) => `${location.pathname} not found`;

export default route(NotFound, {
    getTitle
});
