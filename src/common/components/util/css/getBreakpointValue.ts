const getBreakpointValue = function<T>(base: T, value?: BreakpointProp<T>): T {
    if (typeof value === "undefined") {
        return base;
    }

    if (Array.isArray(value)) {
        return value[0];
    }

    return value as T;
};

export default getBreakpointValue;
