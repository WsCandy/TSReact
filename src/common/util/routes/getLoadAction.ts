import PreloadLinkProps from "_model/routes/PreloadLinkProps";
import { CallHistoryMethodAction, push, replace } from "connected-react-router";
import { LocationState } from "history";

const getLoadAction = (
    props: PreloadLinkProps
): ((path: string, state?: LocationState) => CallHistoryMethodAction) => {
    const isReplace = props.replace;
    return isReplace ? replace : push;
};

export default getLoadAction;
