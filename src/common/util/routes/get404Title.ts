import * as H from "history";

const get404Title = (history: H.History): string => {
    return `Error 404 - ${history.location.pathname} Not Found`;
};

export default get404Title;
