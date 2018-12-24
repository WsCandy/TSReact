import { ExampleState } from "@reducers/example/example";
import { RouterState } from "connected-react-router";
import { LoadingState } from "@reducers/loading/loading";

interface AppState {
    readonly example: ExampleState;
    readonly router: RouterState;
    readonly loading: LoadingState;
}

export default AppState;
