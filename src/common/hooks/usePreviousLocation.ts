import { Location } from "history";
import { useEffect, useRef } from "react";

const usePreviousLocation = function(
    value: Location,
    def?: Location
): Location | null {
    const ref = useRef<Location | null>(def || null);

    useEffect(() => {
        if (value.state?.modal) {
            return;
        }

        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePreviousLocation;
