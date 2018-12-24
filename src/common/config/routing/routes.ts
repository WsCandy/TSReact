import AppRoute from "@common/model/routing/AppRoute";
import Home from "@containers/Home";
import NotFound from "@containers/NotFound";
import LoadTest from "@containers/LoadTest";

const routes: AppRoute[] = [
    {
        key: "home",
        path: "/",
        exact: true,
        title: "Hello World!",
        description: "This is the home page...!",
        component: Home
    },
    {
        key: "load-test",
        path: "/load-test/:test",
        title: "Load Test",
        exact: true,
        component: LoadTest
    },
    {
        key: "404",
        title: "Error 404 - $s not found",
        description: "Error 404 - $s not found",
        component: NotFound
    }
];

export default routes;
