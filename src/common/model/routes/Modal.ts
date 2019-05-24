/* eslint-disable */
import { ComponentType } from "react";
import RouteProps from "_model/routes/RouteProps";

interface M<P extends RouteProps> {
    readonly container?: ComponentType<P>;
    readonly path?: string;
}

type Modal<P extends RouteProps> = M<P> | boolean;

export default Modal;
