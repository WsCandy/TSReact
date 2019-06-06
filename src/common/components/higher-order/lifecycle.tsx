import React, { ComponentType } from "react";
import * as ReactDOM from "react-dom";
import deBounce from "_util/misc/deBounce";

export interface Lifecycle<T> {
    readonly componentWillMount?: (props: T) => void;
    readonly componentUnmount?: (props: T) => void;
    readonly componentDidMount?: (props: T) => void;
    readonly componentDidScroll?: (props: T, node?: HTMLElement) => void;
}

const lifecycle = function<T>(
    Component: ComponentType,
    lifecycle: Lifecycle<T>
): ComponentType<T> {
    return class LC extends React.Component<T> {
        private componentDidScroll?: (props: T, node: HTMLElement) => void;

        private componentUnmount?: (props: T) => void;

        public constructor(props: T) {
            super(props);

            // We don't want the lifecycle events on the server, we handle server pre-loading with the preload method on the route.
            if (typeof window !== "undefined") {
                Object.keys(lifecycle).forEach((method: keyof Lifecycle<T>) => {
                    this[method] = (...args: any[]) =>
                        args.length === 0
                            ? lifecycle[method]!(props)
                            : lifecycle[method]!.call(this, ...args);
                });
            }

            if (typeof this.componentDidScroll !== "undefined") {
                window.addEventListener("scroll", this.scrollListener);
            }
        }

        public componentWillUnmount() {
            if (
                typeof window !== "undefined" &&
                typeof this.componentDidScroll !== "undefined"
            ) {
                window.removeEventListener("scroll", this.scrollListener);
            }

            if (this.componentUnmount) {
                this.componentUnmount(this.props);
            }
        }

        private scrollListener = () =>
            deBounce(() =>
                this.componentDidScroll!(this.props, ReactDOM.findDOMNode(
                    this
                ) as HTMLElement)
            );

        public render() {
            return <Component {...this.props} />;
        }
    };
};

export default lifecycle;
