import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface Props extends RouteComponentProps {
    readonly scroll?: boolean;
}

class ScrollToTop extends React.Component<Props> {
    public componentDidUpdate(prevProps: RouteComponentProps) {
        const { location, history, scroll } = this.props;

        if (typeof scroll !== "undefined" || history.action === "POP") {
            return;
        }

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
