import * as React from "react";
import Context from "@common/model/routing/Context";

interface Props {
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

export default NotFound;
