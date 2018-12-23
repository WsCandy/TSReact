import Action from "@model/redux/actions/Action";
import ActionType from "@model/redux/actions/ActionType";

const isAction = <P>(
    action: Action<any>,
    type: ActionType<P>
): action is Action<P> => action.type === type;

export default isAction;
