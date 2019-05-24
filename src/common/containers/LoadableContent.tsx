import React from "react";
import usePageY from "_common/hooks/usePageY";

interface Props {}

const LoadableContent: React.FunctionComponent<Props> = () => {
    const y = usePageY();

    return (
        <React.Fragment>
            <p>Loadable component!</p>
            <p>Page scroll y... {y}</p>
        </React.Fragment>
    );
};

export default LoadableContent;
