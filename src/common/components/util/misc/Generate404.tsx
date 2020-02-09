import React, { useContext } from "react";
import StatusContext from "_contexts/StatusContext";
import { RouteComponentProps, withRouter } from "react-router";
import Context from "_model/routes/Context";

type Props = RouteComponentProps<any, Context>;

const Generate404: React.FunctionComponent<Props> = props => {
    const { staticContext } = props;
    const { setStatus } = useContext(StatusContext);
    const status = 404;

    setStatus?.(status);

    if (typeof staticContext !== "undefined") {
        staticContext.status = status;
    }

    return null;
};

export default withRouter(Generate404);
