import styled, { css } from "styled-components";

interface Props {
    readonly lazyLoad?: boolean;
    readonly blur?: boolean;
    readonly cover?: boolean;
}

const Placeholder = styled.img<Props>`
    z-index: 0;
    width: 100%;
    height: auto;
    display: block;
    ${props =>
        props.lazyLoad &&
        props.blur &&
        css`
            filter: blur(15px);
        `}

    ${props =>
        props.cover &&
        css`
            height: 100%;
            object-fit: cover;
        `}
`;

export default Placeholder;
