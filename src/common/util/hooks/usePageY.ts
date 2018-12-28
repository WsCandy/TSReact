import { useEffect, useState } from "react";
import deBounce from "_util/misc/deBounce";

const usePageY = (): number => {
    const initial = typeof window !== "undefined" ? window.pageYOffset : 0;

    const [pageY, setPageY] = useState(initial);

    const onScroll = () => deBounce(() => setPageY(window.pageYOffset));

    useEffect(
        () => {
            window.addEventListener("scroll", onScroll);
            return () => window.removeEventListener("scroll", onScroll);
        },
        [pageY]
    );

    return pageY;
};

export default usePageY;
