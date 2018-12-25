import * as React from "react";
import route from "_common/components/higher-order/route";
import RouteProps from "_common/model/routes/RouteProps";
import generateRoutes from "_common/util/routes/generateRoutes";
import AppState from "_model/redux/AppState";
import { connect } from "react-redux";
import { ExampleState } from "_reducers/example/example";
import setExampleMessage from "_actions/example/setExampleMessage";
import PreloadLink from "_common/components/util/routes/PreloadLink";
import DispatchProp from "_model/redux/DispatchProp";

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

            <ul>
                <li>
                    <PreloadLink to="/load-test/heya">Hello</PreloadLink>
                </li>
                <li>
                    <PreloadLink to="/load-test">404</PreloadLink>
                </li>
                <li>
                    <PreloadLink to="/react-loadable">
                        React Loadable Test
                    </PreloadLink>
                </li>
            </ul>

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
