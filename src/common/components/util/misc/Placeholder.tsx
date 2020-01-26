import styled, { css } from "styled-components";

interface Props {
    readonly lazyLoad?: boolean;
    readonly blur?: boolean;
    readonly cover?: boolean;
    readonly complete?: boolean;
}

const Placeholder = styled.img<Props>`
    z-index: 0;
    width: 100%;
    height: auto;
    display: block;

    ${({ lazyLoad, blur }) =>
        lazyLoad &&
        blur &&
        css`
            filter: blur(15px);
        `}

    ${({ cover }) =>
        cover &&
        css`
            height: 100%;
            object-fit: cover;
        `}

    ${({ complete }) =>
        complete &&
        css`
            visibility: hidden;
        `}
`;

export default Placeholder;
