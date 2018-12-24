import { Reducer } from "redux";
import Action from "@model/redux/actions/Action";
import isAction from "@util/actions/isAction";
import { SET_LOADING_STATE } from "@actions/loading/setLoadingState";

export interface LoadingState {
    readonly isLoading: boolean;
}

const INITIAL_STATE: LoadingState = {
    isLoading: false
};

const loading: Reducer<LoadingState> = (
    state: LoadingState = INITIAL_STATE,
    action: Action<any>
): LoadingState => {
    if (isAction(action, SET_LOADING_STATE)) {
        return { ...state, ...action.payload };
    }

    return state;
};

export default loading;
