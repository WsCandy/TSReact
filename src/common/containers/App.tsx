import * as React from "react";
import routes from "@common/config/routing/routes";
import generateRoutes from "@common/util/routes/generateRoutes";
import Reset from "@common/components/util/css/Reset";

interface Props {}

const App: React.FunctionComponent<Props> = () => (
    <div>
        <Reset />
        {generateRoutes(routes)}
    </div>
);

export default App;
