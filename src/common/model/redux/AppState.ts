import { ExampleState } from "_reducers/example";
import { RouterState } from "connected-react-router";
import { LoadingState } from "_reducers/loading";

interface AppState {
    readonly example: ExampleState;
    readonly router: RouterState;
    readonly loading: LoadingState;
}

export default AppState;
