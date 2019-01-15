import AppRoute from "_model/routes/AppRoute";
import routes from "_common/config/routing/routes";

const get404Route = (): AppRoute =>
    routes.filter(route => route.key === "404").reduce((_, b) => b);

export default get404Route;
