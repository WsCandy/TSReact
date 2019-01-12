/* eslint-disable */
import { ComponentType } from "react";
import RouteProps from "_model/routes/RouteProps";

interface Modal<P extends RouteProps> {
    readonly container?: ComponentType<P>;
}

export default Modal;
