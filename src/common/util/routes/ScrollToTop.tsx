import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

class ScrollToTop extends React.Component<RouteComponentProps> {
    public componentDidUpdate(prevProps: RouteComponentProps) {
        const { location } = this.props;

        if (typeof window !== "undefined" && location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    public render() {
        const { children } = this.props;
        return children || null;
    }
}

export default withRouter(ScrollToTop);
