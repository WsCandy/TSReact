import actionCreator from "_util/actions/actionCreator";
import ActionType from "_model/redux/actions/ActionType";

export const END_LOADING: ActionType<string> = "END_LOADING";

export default actionCreator(END_LOADING);
