import ActionType from "@model/redux/actions/ActionType";
import ActionCreator from "@model/redux/actions/ActionCreator";

const actionCreator = <TPayload>(
    type: ActionType<TPayload>
): ActionCreator<TPayload> => payload => ({ type, payload });

export default actionCreator;
