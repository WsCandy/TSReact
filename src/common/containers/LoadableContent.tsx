import React, { useEffect, useState } from "react";

interface Props {}

const LoadableContent: React.FunctionComponent<Props> = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = count.toString(10);
    });

    return (
        <React.Fragment>
            <p>Loadable component!</p>
            <button type="button" onClick={() => setCount(count + 1)}>
                Increase count... {count}
            </button>
        </React.Fragment>
    );
};

export default LoadableContent;
