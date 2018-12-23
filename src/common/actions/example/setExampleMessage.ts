import ActionType from "@model/redux/actions/ActionType";
import actionCreator from "@util/actions/actionCreator";

export const SET_EXAMPLE_MESSAGE: ActionType<string> = "SET_EXAMPLE_MESSAGE";

export default actionCreator(SET_EXAMPLE_MESSAGE);
