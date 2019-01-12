import * as React from "react";
import routes from "_common/config/routing/routes";
import Reset from "_common/components/util/css/Reset";
import theme from "_common/config/theming/theme";
import { ThemeProvider } from "styled-components";
import AppState from "_model/redux/AppState";
import { connect } from "react-redux";
import { LoadingState } from "_reducers/loading/loading";
import { RouteComponentProps, withRouter } from "react-router";
import AppSwitch from "_common/components/util/routes/AppSwitch";

interface Props extends RouteComponentProps {
    readonly loading: LoadingState;
}

const App: React.FunctionComponent<Props> = ({ loading }) => (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            {loading.isLoading ? "Page loading" : "Idle"}
            <Reset />
            <AppSwitch routes={routes} />
        </React.Fragment>
    </ThemeProvider>
);

const mapStateToProps = ({ loading }: AppState) => ({ loading });

export default withRouter(connect(mapStateToProps)(App));
