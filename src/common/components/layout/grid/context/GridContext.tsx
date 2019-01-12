import * as React from "react";
import theme from "_common/config/theming/theme";

interface Props {
    readonly columns: number | string[];
}

const GridContext = React.createContext<Props>({
    columns: theme.standardGridColumns
});

export default GridContext;
