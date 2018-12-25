import Dispatch from "_model/redux/Dispatch";

type MapDispatchToProps<P> = (dispatch: Dispatch) => P;

export default MapDispatchToProps;
