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
import AppState from "@model/redux/AppState";
import { LoadingState } from "@reducers/loading/loading";
import setLoadingState from "@actions/loading/setLoadingState";

interface Props extends LinkProps, DispatchProp, RouteComponentProps<any> {
    readonly to: string;
    readonly loading: LoadingState;
}

const action = (props: Props) => {
    const { replace, history, to } = props;

    return replace ? history.replace(to) : history.push(to);
};

const onClick = (props: Props) => {
    const {
        to, dispatch, location, history
    } = props;

    const matchedRoute = getMatchedRoute(to, routes);
    const match = matchPath(to, matchedRoute);
    const Component = matchedRoute.component as any;

    if (Component && Component.preLoad) {
        const load = Component.preLoad();

        if (load) {
            let outerReject: (reason?: any) => void;
            dispatch(setLoadingState({ isLoading: true }));

            const promise = new Promise((resolve, reject) => {
                outerReject = reject;

                return load(dispatch, match).then(resolve);
            });

            const unRegister = history.listen(() => {
                outerReject();
            });

            return promise
                .then(() => {
                    const { pathname } = window.location;

                    unRegister();
                    // User has transitioned pages since clicking first link
                    if (pathname !== location.pathname) {
                        return;
                    }

                    return action(props);
                })
                .catch(unRegister)
                .finally(() => dispatch(setLoadingState({ isLoading: false })));
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

const mapStateToProps = ({ loading }: AppState) => ({ loading });

export default connect(mapStateToProps)(withRouter(PreloadLink));
