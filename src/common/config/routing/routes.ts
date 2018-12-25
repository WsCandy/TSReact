import AppRoute from "@common/model/routes/AppRoute";
import Home from "@containers/Home";
import NotFound from "@containers/NotFound";
import LoadTest from "@containers/LoadTest";
import LoadableTest from "@containers/LoadableTest";

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
        title: "Load Test - $s",
        description:
            "A simple test page to test the preLoad method on a route component",
        exact: true,
        component: LoadTest
    },
    {
        key: "react-loadable",
        path: "/react-loadable",
        title: "React Loadable",
        description:
            "A simple React Loadable component, to test if the route is preloading correctly",
        exact: true,
        component: LoadableTest
    },
    {
        key: "404",
        title: "Error 404 - $s not found",
        description: "Error 404 - $s not found",
        component: NotFound
    }
];

export default routes;
