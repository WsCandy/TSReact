import React from "react";

interface Props {
    readonly set404?: (is404: boolean) => void;
}

const NotFoundContext = React.createContext<Props>({});

export default NotFoundContext;
