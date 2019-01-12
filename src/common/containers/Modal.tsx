import * as React from "react";
import styled from "styled-components";

interface Props {}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
`;

const Modal: React.FunctionComponent<Props> = props => {
    const { children } = props;

    return <Overlay>{children}</Overlay>;
};

export default Modal;
