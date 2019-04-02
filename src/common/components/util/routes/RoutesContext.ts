import * as React from "react";
import AppRoute from "_model/routes/AppRoute";

interface Props {
    readonly routes: AppRoute[] | null;
}

const RoutesContext = React.createContext<Props>({ routes: null });

export default RoutesContext;
