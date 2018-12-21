import * as React from "react";
import routes from "@common/config/routing/routes";
import generateRoutes from "@common/util/routes/generateRoutes";

interface Props {}

const App: React.FunctionComponent<Props> = () => (
    <div>{generateRoutes(routes)}</div>
);

export default App;
