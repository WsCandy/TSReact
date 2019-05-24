import { useEffect, useState } from "react";

const useHydrateClientRender = (): boolean => {
    const [client, setClient] = useState(false);

    useEffect(() => {
        setClient(typeof window !== "undefined");
    }, [client]);

    return client;
};

export default useHydrateClientRender;
