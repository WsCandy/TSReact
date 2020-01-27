import actionCreator from "_util/actions/actionCreator";
import ActionType from "_model/redux/actions/ActionType";

interface LoadingRejection {
    readonly key: string;
    readonly reject: (reason?: any) => void;
}

export const SET_LOADING: ActionType<LoadingRejection> = "SET_LOADING";

export default actionCreator(SET_LOADING);

export { LoadingRejection };
