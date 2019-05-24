import { Middleware, Dispatch } from "redux";

const analyticsMiddleware: Middleware = () => (next: Dispatch) => action => {
    if (action.type === "@@router/LOCATION_CHANGE") {
        const { ga } = window as any;

        if (typeof ga !== "undefined") {
            ga("send", {
                hitType: "pageview",
                location: window.location.href
            });
        }
    }

    return next(action);
};

export default analyticsMiddleware;
