import * as React from "react";
import { Link } from "react-router-dom";
import route from "@common/components/higher-order/route";
import RouteProps from "@common/model/routing/RouteProps";
import generateRoutes from "@common/util/routes/generateRoutes";

const Home: React.FunctionComponent<RouteProps> = props => {
    const { route, match } = props;

    return (
        <div>
            <p>
Hello World! -
                {match.path}
            </p>
            <Link to="/nested/example">Hello!</Link>

            {generateRoutes(route.routes)}
        </div>
    );
};

export default route<RouteProps>(Home);
