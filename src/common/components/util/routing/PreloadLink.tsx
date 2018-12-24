import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import getMatchedRoute from "@util/routes/getMatchedRoute";
import routes from "@common/config/routing/routes";
import omit from "lodash/omit";
import {
    Link,
    LinkProps,
    matchPath,
    RouteComponentProps,
    withRouter
} from "react-router-dom";

interface Props extends LinkProps, DispatchProp, RouteComponentProps<any> {
    readonly to: string;
}

const action = (props: Props) => {
    const { replace, history, to } = props;

    return replace ? history.replace(to) : history.push(to);
};

const onClick = (props: Props) => {
    const { to, dispatch, location } = props;

    const matchedRoute = getMatchedRoute(to, routes);
    const match = matchPath(to, matchedRoute);
    const Component = matchedRoute.component as any;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load) {
            return load(dispatch, match).then(() => {
                const { pathname } = window.location;

                // User has transitioned pages since clicking first link
                if (pathname !== location.pathname) {
                    return;
                }

                return action(props);
            });
        }
    }

    return action(props);
};

const PreloadLink: React.FunctionComponent<Props> = props => {
    const renderProps = omit(
        props,
        "staticContext",
        "dispatch",
        "match",
        "history",
        "location"
    );

    return (
        <Link
            {...renderProps}
            onClick={e => {
                e.preventDefault();
                onClick(props);
            }}
        />
    );
};

export default connect()(withRouter(PreloadLink));
