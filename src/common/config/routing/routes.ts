import AppRoute from "_common/model/routes/AppRoute";
import Home from "_containers/Home";
import LoadTest from "_containers/LoadTest";
import LoadableTest from "_containers/LoadableTest";
import get404Route from "_util/routes/get404Route";
import i18next from "i18next";
import SubRouteTest from "_containers/SubRouteTest";
import NestedRoute from "_containers/NestedRoute";

const routes: (i18n: i18next.i18n) => AppRoute[] = i18n => [
    {
        key: "home",
        path: "/",
        exact: true,
        title: i18n.t("hello_world"),
        description: "This is the home page...!",
        component: Home,
        priority: 1.0
    },
    {
        key: "load-test",
        path: "/load-test/:test",
        title: "Load Test - $s",
        description:
            "A simple test page to test the preLoad method on a route component",
        exact: true,
        component: LoadTest,
        priority: 0.7
    },
    {
        key: "react-loadable",
        path: "/react-loadable",
        title: "React Loadable",
        description:
            "A simple React Loadable component, to test if the route is preloading correctly",
        exact: true,
        component: LoadableTest,
        modal: {
            path: "/"
        },
        priority: 0.5
    },
    {
        key: "sub-route-test",
        path: "/test",
        title: "Sub Route Test",
        description: "Test nested routes and preloading!",
        component: SubRouteTest,
        priority: 0.5,
        routes: [
            {
                key: "nested",
                path: "/test/:name",
                title: "Nested route test",
                component: NestedRoute,
                exact: true
            }
        ]
    },
    get404Route()
];

export default routes;
