import { LoadingState } from "_reducers/loading";
import actionCreator from "_util/actions/actionCreator";
import ActionType from "_model/redux/actions/ActionType";

export const SET_STATE: ActionType<Partial<LoadingState>> = "SET_STATE";

export default actionCreator(SET_STATE);
