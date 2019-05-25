// stylelint-disable
import styled, { css } from "styled-components";

interface Props {
    readonly cover?: boolean;
}

const LoadedImage = styled.img<Props>`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0;
    width: 100%;
    height: 100%;
    display: block;

    ${props =>
        props.cover &&
        css`
            object-fit: cover;
        `}

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
