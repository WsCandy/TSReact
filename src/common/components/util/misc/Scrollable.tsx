import React from "react";
import ReactDOM from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import styled from "styled-components";
import Wrap from "_components/layout/Wrap";
import Container from "_components/layout/Container";
import mq from "_util/styles/mq";

const ScrollableWrap = styled(Wrap)`
    overflow-y: scroll;
    height: 100%;
    padding-top: ${props => props.theme.globalSpacingUnit * 2}px;
    padding-bottom: ${props => props.theme.globalSpacingUnit * 2}px;
    -webkit-overflow-scrolling: touch;

    ${props => mq(props.theme, "tabletPort")`
        padding-top: ${props.theme.globalSpacingUnit * 6}px;
        padding-bottom: ${props.theme.globalSpacingUnit * 6}px;
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
