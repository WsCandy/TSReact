import * as React from "react";
import routes from "@common/config/routing/routes";
import generateRoutes from "@common/util/routes/generateRoutes";
import Reset from "@common/components/util/css/Reset";
import theme from "@common/config/theming/theme";
import { ThemeProvider } from "styled-components";
import AppState from "@model/redux/AppState";
import { connect } from "react-redux";
import { LoadingState } from "@reducers/loading/loading";

interface Props {
    readonly loading: LoadingState;
}

const App: React.FunctionComponent<Props> = ({ loading }) => (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            {loading.isLoading ? "Page loading" : "Idle"}
            <Reset />
            {generateRoutes(routes)}
        </React.Fragment>
    </ThemeProvider>
);

const mapStateToProps = ({ loading }: AppState) => ({ loading });

export default connect(mapStateToProps)(App);
