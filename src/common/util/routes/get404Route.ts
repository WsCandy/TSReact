import AppRoute from "_model/routes/AppRoute";
import NotFound from "_containers/NotFound";

const get404Route = (): AppRoute => ({
    key: "404",
    title: "Error 404 - $s Not Found",
    description: "Error 404 - $s not found",
    component: NotFound
});

export default get404Route;
