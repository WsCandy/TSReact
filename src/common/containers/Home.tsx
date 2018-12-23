import * as React from "react";
import { Link } from "react-router-dom";
import route from "@common/components/higher-order/route";
import RouteProps from "@common/model/routing/RouteProps";
import generateRoutes from "@common/util/routes/generateRoutes";
import AppState from "@model/redux/AppState";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ExampleState } from "@reducers/example/example";
import setExampleMessage from "@actions/example/setExampleMessage";

interface Props extends RouteProps {
    readonly dispatch: Dispatch;
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
            <Link to="/nested/example">Hello!</Link>

            <div>
                <input
                    type="text"
                    onChange={e => dispatch(setExampleMessage(e.target.value))}
                />
            </div>
            {generateRoutes(route.routes)}
        </React.Fragment>
    );
};

const mapStateToProps = ({ example }: AppState) => ({ example });

export default route(connect(mapStateToProps)(Home));
