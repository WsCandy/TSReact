import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

class ScrollToTop extends React.Component<RouteComponentProps> {
    componentDidUpdate(prevProps: RouteComponentProps) {
        const { location } = this.props;

        if (typeof window !== "undefined" && location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        const { children } = this.props;
        return children || null;
    }
}

export default withRouter(ScrollToTop);
