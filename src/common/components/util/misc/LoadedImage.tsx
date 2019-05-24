// stylelint-disable
import styled from "styled-components";

const LoadedImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    width: 100%;
    height: auto;

    &.fade-enter {
        will-change: opacity;
        opacity: 0;
    }
    &.fade-enter-active {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }
    &.fade-enter-done {
        opacity: 1;
    }
`;

export default LoadedImage;
