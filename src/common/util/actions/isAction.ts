import Action from "_model/redux/actions/Action";
import ActionType from "_model/redux/actions/ActionType";
import { AnyAction } from "redux";

const isAction = <P>(
    action: AnyAction,
    type: ActionType<P>
): action is Action<P> => action.type === type;

export default isAction;
