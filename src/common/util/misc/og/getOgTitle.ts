const getOgTitle = (title?: string): string => {
    if (typeof title === "undefined") {
        return "Bua Fit - Discover outdoor fitness classes in London";
    }

    return title;
};

export default getOgTitle;
