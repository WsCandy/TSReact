const isProduction = process.env.NODE_ENV === "production";

const getOgPageUrl = (pathname: string): string => {
    return isProduction
        ? `https://bua.fit${pathname}`
        : `http://localhost:8080${pathname}`;
};

export default getOgPageUrl;
