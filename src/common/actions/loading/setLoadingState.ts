import { LoadingState } from "_reducers/loading";
import actionCreator from "_util/actions/actionCreator";
import ActionType from "_model/redux/actions/ActionType";

export const SET_LOADING_STATE: ActionType<Partial<LoadingState>> =
    "SET_LOADING_STATE";

export default actionCreator(SET_LOADING_STATE);
