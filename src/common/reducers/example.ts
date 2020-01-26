import { Reducer } from "redux";
import isAction from "_util/actions/isAction";
import { SET_EXAMPLE_MESSAGE } from "_actions/example/setExampleMessage";

export interface ExampleState {
    readonly message: string;
}

const INITIAL_STATE: ExampleState = {
    message: "Hello World!"
};

const example: Reducer<ExampleState> = (state = INITIAL_STATE, action) => {
    if (isAction(action, SET_EXAMPLE_MESSAGE)) {
        return { ...state, message: action.payload };
    }

    return state;
};

export default example;
