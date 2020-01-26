import AppRoute from "_model/routes/AppRoute";

interface PreloadLinkActions {
    readonly preload: (
        path: string,
        routes: AppRoute[] | null,
        replace?: boolean
    ) => void;
}

export default PreloadLinkActions;
