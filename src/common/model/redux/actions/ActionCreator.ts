import Action from "_common/model/redux/actions/Action";

interface ActionCreator<P> {
    (payload: P): Action<P>;
}

export default ActionCreator;
