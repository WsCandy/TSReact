import { LoadingState } from "@reducers/loading/loading";
import actionCreator from "@util/actions/actionCreator";
import ActionType from "@model/redux/actions/ActionType";

export const SET_LOADING_STATE: ActionType<Partial<LoadingState>> =
    "SET_LOADING_STATE";

export default actionCreator(SET_LOADING_STATE);
