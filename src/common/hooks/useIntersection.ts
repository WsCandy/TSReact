import { useEffect } from "react";

const useIntersection = (
    target: HTMLElement | undefined,
    onIntersect: IntersectionObserverCallback
): void => {
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined" || !target) {
            return;
        }

        const observer = new IntersectionObserver(onIntersect);
        observer.observe(target);
        return () => observer.unobserve(target);
    }, [target]);
};

export default useIntersection;
