import * as React from "react";
import Loadable from "react-loadable";
import route from "_common/components/higher-order/route";
import RoutePreload from "_model/routes/RoutePreload";

const LoadableTest = Loadable({
    loader: () => import("_containers/LoadableContent"),
    loading: () => <p>Loading</p>
});

const preLoad: RoutePreload = () => {
    const component = LoadableTest.preload();
    return Promise.all([component]);
};

export default route(LoadableTest, {
    preLoad
});
