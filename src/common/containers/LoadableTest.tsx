import RoutePreload from "_model/routes/RoutePreload";
import route from "_components/higher-order/route";
import loadable from "@loadable/component";

const LoadableTest = loadable(() => import("_containers/LoadableContent"));

const preLoad: RoutePreload = () => LoadableTest.load();

export default route(LoadableTest, {
    preLoad
});
