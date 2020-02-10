import AppState from "_model/redux/AppState";

declare global {
    interface Window {
        INITIAL_STATUS?: number;
        INITIAL_STATE: AppState;
    }
}

export {};
