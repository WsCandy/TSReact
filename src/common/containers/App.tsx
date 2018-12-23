import * as React from "react";
import routes from "@common/config/routing/routes";
import generateRoutes from "@common/util/routes/generateRoutes";
import Reset from "@common/components/util/css/Reset";
import theme from "@common/config/theming/theme";
import { ThemeProvider } from "styled-components";

interface Props {}

const App: React.FunctionComponent<Props> = () => (
    <ThemeProvider theme={theme}>
        <React.Fragment>
            <Reset />
            {generateRoutes(routes)}
        </React.Fragment>
    </ThemeProvider>
);

export default App;
