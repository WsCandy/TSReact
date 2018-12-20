import AppRoute from "@common/model/routing/AppRoute";
import Home from "@containers/Home";
import NotFound from "@containers/NotFound";

const routes: AppRoute[] = [
    {
        key: "home",
        path: "/",
        exact: true,
        title: "Hello World!",
        component: Home
    },
    {
        key: "404",
        title: "Page not found! D:",
        component: NotFound
    }
];

export default routes;
