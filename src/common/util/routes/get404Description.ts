import * as H from "history";

const get404Description = (history: H.History): string => {
    return `Error 404 - ${history.location.pathname} not found`;
};

export default get404Description;
