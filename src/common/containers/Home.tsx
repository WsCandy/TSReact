import * as React from "react";
import route from "@common/components/higher-order/route";
import RouteProps from "@common/model/routes/RouteProps";
import generateRoutes from "@common/util/routes/generateRoutes";
import AppState from "@model/redux/AppState";
import { connect } from "react-redux";
import { ExampleState } from "@reducers/example/example";
import setExampleMessage from "@actions/example/setExampleMessage";
import PreloadLink from "@common/components/util/routes/PreloadLink";
import DispatchProp from "@model/redux/DispatchProp";

interface Props extends RouteProps, DispatchProp {
    readonly example: ExampleState;
}

const Home: React.FunctionComponent<Props> = props => {
    const {
        route, match, dispatch, example
    } = props;

    return (
        <React.Fragment>
            <p>
                {example.message} - {match.path}
            </p>

            <PreloadLink to="/load-test/heya">Hello</PreloadLink>

            <PreloadLink to="/load-test">404</PreloadLink>

            <div>
                <input
                    type="text"
                    onChange={e => dispatch(setExampleMessage(e.target.value))}
                    value={example.message}
                />
            </div>
            {generateRoutes(route.routes)}
        </React.Fragment>
    );
};

const mapStateToProps = ({ example }: AppState) => ({ example });

export default connect(mapStateToProps)(route(Home));
