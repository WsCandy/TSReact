import { Reducer } from "redux";
import isAction from "_util/actions/isAction";
import { SET_STATE } from "_actions/loading/setState";

export interface LoadingState {
    readonly isLoading: boolean;
}

const INITIAL_STATE: LoadingState = {
    isLoading: false
};

const loading: Reducer<LoadingState> = (state = INITIAL_STATE, action) => {
    if (isAction(action, SET_STATE)) {
        return { ...state, ...action.payload };
    }

    return state;
};

export default loading;
