import { Reducer } from "redux";
import isAction from "_util/actions/isAction";
import { SET_STATE } from "_actions/loading/setState";
import { SET_LOADING } from "_actions/loading/setLoading";
import { END_LOADING } from "_actions/loading/endLoading";

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

    if (isAction(action, SET_LOADING)) {
        return { ...state, isLoading: true };
    }
    if (isAction(action, END_LOADING)) {
        return { ...state, isLoading: false };
    }

    return state;
};

export default loading;
