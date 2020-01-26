import { Location } from "history";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router";

const usePreviousLocation = function(
    value: Location,
    def?: Location
): Location | null {
    const ref = useRef<Location | null>(def || null);
    const history = useHistory();

    useEffect(() => {
        if (!ref.current) {
            ref.current = value;
        }

        return () => {
            if (history.action === "POP" || value.state?.modal) {
                return;
            }

            ref.current = value;
        };
    }, [value]);

    return ref.current;
};

export default usePreviousLocation;
