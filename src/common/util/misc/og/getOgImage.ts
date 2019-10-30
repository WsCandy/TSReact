const getOgImage = (url?: string): string => {
    if (typeof url === "undefined") {
        return "https://buafit.co.uk/img/social-image.jpg";
    }

    return url;
};

export default getOgImage;
