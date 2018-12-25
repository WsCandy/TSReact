import ActionType from "_model/redux/actions/ActionType";
import actionCreator from "_util/actions/actionCreator";

export const SET_EXAMPLE_MESSAGE: ActionType<string> = "SET_EXAMPLE_MESSAGE";

export default actionCreator(SET_EXAMPLE_MESSAGE);
