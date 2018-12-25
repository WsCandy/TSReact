import AppState from "_model/redux/AppState";

type MapStateToProps<P> = (state: AppState) => P;

export default MapStateToProps;
