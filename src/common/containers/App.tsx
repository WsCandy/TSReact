import * as React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "@common/config/routing/routes";

interface Props {}

const App: React.FunctionComponent<Props> = () => (
    <Switch>
        {routes.map(r => (
            <Route {...r} />
        ))}
    </Switch>
);

export default App;
