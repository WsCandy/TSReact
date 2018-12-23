import { ExampleState } from "@reducers/example/example";
import { RouterState } from "connected-react-router";

interface AppState {
    readonly example: ExampleState;
    readonly router: RouterState;
}

export default AppState;
