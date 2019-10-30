const getOgDescription = (description?: string): string => {
    const length = 140;

    if (typeof description === "undefined") {
        return "Find & book London's best group outdoor fitness classes with Bua Fit.";
    }

    return `${description.substring(0, length)}${
        description.length > length ? "..." : ""
    }`;
};

export default getOgDescription;
