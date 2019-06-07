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
    transform: scale(1.05);

    ${({ cover }) =>
        cover &&
        css`
            object-fit: cover;
        `}

    &.fade-enter {
        will-change: opacity;
        opacity: 0;
        transform: scale(1.05);
    }
    &.fade-enter-active {
        opacity: 1;
        transition: opacity 600ms ease-out, transform 600ms ease-out;
        transform: scale(1);
    }
    &.fade-enter-done {
        opacity: 1;
        transform: scale(1);
    }
`;

export default LoadedImage;
