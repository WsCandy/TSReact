import { History } from "history";
import AppRoute from "_model/routes/AppRoute";

interface PreloadLinkActions {
    readonly preload: (
        path: string,
        history: History,
        routes: AppRoute[] | null,
        replace?: boolean
    ) => void;
}

export default PreloadLinkActions;
