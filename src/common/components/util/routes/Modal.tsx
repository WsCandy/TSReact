import * as React from "react";
import styled from "styled-components";
import Scrollable from "_components/util/misc/Scrollable";
import Wrap from "_components/layout/Wrap";
import ModalClose from "_components/util/routes/ModalClose";
import M from "_model/routes/Modal";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { RouteComponentProps, withRouter } from "react-router";

interface Props extends RouteComponentProps {
    readonly modal?: M;
}

const ModalContent = styled.div`
    background: ${props => props.theme.colours.tertiary};
    padding: ${props => props.theme.globalSpacingUnit * 2}px;
    width: 100%;
`;

const ModalWrap = styled(Wrap)`
    max-width: 720px;
    width: 100%;

    &.slide-appear {
        transform: translateY(-100px);
        opacity: 0;
    }
    &.slide-appear-active {
        transform: translateY(0%);
        opacity: 1;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        transition-delay: 0.5s;
    }
`;

const Modal: React.FunctionComponent<Props> = props => {
    const { children, modal, history } = props;

    return (
        <Scrollable>
            <TransitionGroup component={null}>
                <CSSTransition
                    classNames="slide"
                    timeout={800}
                    appear={history.action !== "POP"}
                >
                    <ModalWrap flex alignItems="flex-end">
                        <ModalClose modal={modal} />
                        <ModalContent>{children}</ModalContent>
                    </ModalWrap>
                </CSSTransition>
            </TransitionGroup>
        </Scrollable>
    );
};

export default withRouter(Modal);
