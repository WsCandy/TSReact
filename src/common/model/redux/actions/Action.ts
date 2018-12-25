import ActionType from "_common/model/redux/actions/ActionType";

interface Action<P> {
    type: ActionType<P>;
    payload: P;
}

export default Action;
