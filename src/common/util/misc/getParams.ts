interface Params {
    [key: string]: string;
}

const getParams = (string?: string): Params => {
    if (typeof string === "undefined") {
        return {};
    }

    const search = string.split("&");

    if (!string[0]) {
        return {};
    }

    const map = search.map(v => {
        const split = v.split("=");
        const name = split[0].replace("?", "");

        return {
            [name]: split[1]
        };
    });

    return map.reduce((p, c) => {
        return { ...p, ...c };
    }, {});
};

export default getParams;
