import * as React from "react";
import route from "_common/components/higher-order/route";
import RouteProps from "_common/model/routes/RouteProps";
import { connect } from "react-redux";
import { ExampleState } from "_reducers/example/example";
import setExampleMessage from "_actions/example/setExampleMessage";
import PreloadLink from "_common/components/util/routes/PreloadLink";
import MapDispatchToProps from "_model/redux/MapDispatchToProps";
import Action from "_model/redux/actions/Action";
import MapStateToProps from "_model/redux/MapStateToProps";
import AppSwitch from "_common/components/util/routes/AppSwitch";

interface Actions {
    readonly setMessage: (message: string) => Action<string>;
}

interface StateProps {
    readonly example: ExampleState;
}

interface Props extends RouteProps, Actions, StateProps {}

const Home: React.FunctionComponent<Props> = props => {
    const {
        route, match, setMessage, example
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
                    onChange={e => setMessage(e.target.value)}
                    value={example.message}
                />
            </div>
            <AppSwitch routes={route.routes} />
        </React.Fragment>
    );
};

const mapStateToProps: MapStateToProps<StateProps> = ({ example }) => ({
    example
});

const mapDispatchToProps: MapDispatchToProps<Actions> = dispatch => ({
    setMessage: message => dispatch(setExampleMessage(message))
});

export default route(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Home)
);
