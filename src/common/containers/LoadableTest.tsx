import * as React from "react";
import Loadable from "react-loadable";
import route from "@common/components/higher-order/route";
import RoutePreload from "@model/routes/RoutePreload";

const LoadableTest = Loadable({
    loader: () => import("@containers/LoadableContent"),
    loading: () => <p>Loading</p>
});

const preLoad: RoutePreload = () => {
    const component = LoadableTest.preload();
    return Promise.all([component]);
};

export default route(LoadableTest, {
    preLoad
});
