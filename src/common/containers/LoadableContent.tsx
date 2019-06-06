import React from "react";
import usePageY from "_common/hooks/usePageY";

const LoadableContent: React.FunctionComponent<{}> = () => {
    const y = usePageY();

    return (
        <>
            <p>Loadable component!</p>
            <p>Page scroll y... {y}</p>
        </>
    );
};

export default LoadableContent;
