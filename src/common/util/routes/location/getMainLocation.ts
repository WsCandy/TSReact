import AppRoute from "_model/routes/AppRoute";
import { Location } from "history";
import { useRouteMatch } from "react-router";
import usePreviousLocation from "_hooks/usePreviousLocation";

const DEFAULT_MODAL_LOCATION = (pathname: string = "/") => ({
    pathname,
    search: "",
    hash: "",
    state: {}
});

const getMainLocation = (route: AppRoute, location: Location) => {
    const modalMatch = useRouteMatch(route.modal?.path || location.pathname);
    const previous = usePreviousLocation(
        location,
        DEFAULT_MODAL_LOCATION(modalMatch?.url || location.pathname)
    );

    if (route.modal) {
        if (previous && typeof window !== "undefined") {
            return previous;
        }

        if (modalMatch?.url) {
            return DEFAULT_MODAL_LOCATION(modalMatch.url);
        }

        return DEFAULT_MODAL_LOCATION();
    }

    return location;
};

export default getMainLocation;
