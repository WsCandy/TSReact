import * as React from "react";
import routes from "@common/config/routing/routes";
import generateRoutes from "@common/util/routes/generateRoutes";
import Reset from "@common/components/util/css/Reset";
import theme from "@common/config/theming/theme";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import AppState from "@model/redux/AppState";
import { Store } from "redux";

interface Props {
    readonly store: Store<AppState>;
}

const App: React.FunctionComponent<Props> = ({ store }) => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <Reset />
                {generateRoutes(routes)}
            </React.Fragment>
        </ThemeProvider>
    </Provider>
);

export default App;
