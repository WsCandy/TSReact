import React from "react";

interface Props {
    readonly setStatus?: (status: number) => void;
    readonly status?: number;
}

const StatusContext = React.createContext<Props>({});

export default StatusContext;
