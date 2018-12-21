import * as React from "react";
import { Link } from "react-router-dom";
import route from "@common/components/higher-order/route";
import RouteProps from "@common/model/routing/RouteProps";

const Home: React.FunctionComponent<RouteProps> = () => (
    <div>
        <p>Hello World!</p>
        <Link to="/adwadaw">Hello!</Link>
    </div>
);

export default route<RouteProps>(Home);
