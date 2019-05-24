import styled, { css } from "styled-components";

type Props = {
    readonly lazyLoad?: boolean;
    readonly blur?: boolean;
};

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
`;

export default Placeholder;
