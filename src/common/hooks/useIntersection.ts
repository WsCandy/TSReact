import { useEffect } from "react";

const useIntersection = (
    target: HTMLElement | null,
    onIntersect: IntersectionObserverCallback
): void => {
    useEffect(() => {
        if (typeof IntersectionObserver === "undefined" || !target) {
            return;
        }

        const observer = new IntersectionObserver(onIntersect);
        observer.observe(target);
        return () => observer.unobserve(target);
    });
};

export default useIntersection;
