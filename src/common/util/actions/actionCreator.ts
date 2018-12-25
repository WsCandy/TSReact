import ActionType from "_model/redux/actions/ActionType";
import ActionCreator from "_model/redux/actions/ActionCreator";

const actionCreator = <TPayload>(
    type: ActionType<TPayload>
): ActionCreator<TPayload> => payload => ({ type, payload });

export default actionCreator;
