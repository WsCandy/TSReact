import OpenGraph from "_server/model/OpenGraph";
import Context from "_model/routes/Context";

const setOGData = (
    data: Partial<OpenGraph>,
    staticContext?: Context
): Partial<OpenGraph> => {
    if (typeof staticContext !== "undefined") {
        staticContext.og = {
            ...staticContext.og,
            ...data
        };
    }

    return data;
};

export default setOGData;
