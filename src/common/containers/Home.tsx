import * as React from "react";
import { Link } from "react-router-dom";
import route from "@common/components/higher-order/route";

interface Props {}

const Home: React.FunctionComponent<Props> = () => (
    <div>
        <p>Hello World!</p>
        <Link to="/adwadaw">Hello!</Link>
    </div>
);

export default route(Home);
