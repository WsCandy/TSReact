import { CallHistoryMethodAction, push, replace } from "connected-react-router";
import { LocationState } from "history";

const getLoadAction = (
    replaceRoute: boolean
): ((path: string, state?: LocationState) => CallHistoryMethodAction) => {
    return replaceRoute ? replace : push;
};

export default getLoadAction;
