import AppRoute from "@common/model/routing/AppRoute";
import Home from "@containers/Home";
import NotFound from "@containers/NotFound";

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
        key: "nested",
        path: "/nested",
        title: "Nested",
        component: Home,
        routes: [
            {
                key: "nested-example",
                path: "/nested/example",
                title: "Nesting Example",
                exact: true,
                component: Home
            }
        ]
    },
    {
        key: "404",
        title: "Error 404 - $s not found",
        description: "Error 404 - $s not found",
        component: NotFound
    }
];

export default routes;
