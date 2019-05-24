import styled from "styled-components";
import Wrap from "_components/layout/Wrap";

const Overlay = styled(Wrap)`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.25);

    &.fade-enter {
        opacity: 0;
    }
    &.fade-enter-active {
        opacity: 1;
        transition: opacity 0.3s linear;
    }
    &.fade-exit {
        opacity: 1;
    }
    &.fade-exit-active {
        opacity: 0;
        transition: opacity 0.3s linear;
    }
    &.fade-exit-done {
        opacity: 0;
    }
`;

export default Overlay;
