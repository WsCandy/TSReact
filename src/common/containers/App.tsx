import * as React from "react";
import routes from "_common/config/routing/routes";
import Reset from "_common/components/util/css/Reset";
import theme from "_common/config/theming/theme";
import { ThemeProvider } from "styled-components";
import AppState from "_model/redux/AppState";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import AppSwitch from "_common/components/util/routes/AppSwitch";
import BaseStyles from "_common/components/util/css/BaseStyles";
import MapStateToProps from "_model/redux/MapStateToProps";
import { LoadingState } from "_reducers/loading";
import RoutesContext from "_components/util/routes/RoutesContext";

interface StateProps {
    readonly loading: LoadingState;
}

interface Props extends RouteComponentProps, StateProps {}

const App: React.FunctionComponent<Props> = ({ loading }) => (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            {loading.isLoading ? "Page loading" : "Idle"}
            <Reset />
            <BaseStyles />
            <RoutesContext.Provider value={{ routes }}>
                <AppSwitch routes={routes} />
            </RoutesContext.Provider>
        </React.Fragment>
    </ThemeProvider>
);

const mapStateToProps: MapStateToProps<StateProps> = ({
    loading
}: AppState) => ({ loading });

export default withRouter(connect(mapStateToProps)(App));
