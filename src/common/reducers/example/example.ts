import { Reducer } from "redux";
import isAction from "@util/actions/isAction";
import Action from "@model/redux/actions/Action";
import { SET_EXAMPLE_MESSAGE } from "@actions/example/setExampleMessage";

export interface ExampleState {
    readonly message: string;
}

const INITIAL_STATE: ExampleState = {
    message: "Hello World!"
};

const example: Reducer<ExampleState> = (
    state: ExampleState = INITIAL_STATE,
    action: Action<any>
): ExampleState => {
    if (isAction(action, SET_EXAMPLE_MESSAGE)) {
        return { ...state, message: action.payload };
    }

    return state;
};

export default example;
