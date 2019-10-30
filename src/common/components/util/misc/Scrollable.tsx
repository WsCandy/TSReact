import React from "react";
import ReactDOM from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import styled from "styled-components";
import Wrap from "_components/layout/Wrap";
import Container from "_components/layout/Container";
import mq from "_util/styles/mq";
import globalPadding from "_util/styles/globalPadding";

const ScrollableWrap = styled(Wrap)`
    overflow-y: scroll;
    height: 100%;
    ${props => globalPadding(props, 2)("top", "bottom")};
    -webkit-overflow-scrolling: touch;

    ${props => mq(props)("tabletPort")`
        ${globalPadding(props, 6)("top", "bottom")}
    `}
`;

class Scrollable extends React.Component<{}, {}> {
    public componentDidMount() {
        const node = ReactDOM.findDOMNode(this) as HTMLElement | null;

        if (node) {
            disableBodyScroll(node);
        }
    }

    public componentWillUnmount() {
        const node = ReactDOM.findDOMNode(this) as HTMLElement | null;

        if (node) {
            enableBodyScroll(node);
        }
    }

    public render() {
        const { children } = this.props;

        return (
            <ScrollableWrap flex alignItems="center" withGutter>
                <Container flex alignItems="center">
                    {children}
                </Container>
            </ScrollableWrap>
        );
    }
}

export default Scrollable;
