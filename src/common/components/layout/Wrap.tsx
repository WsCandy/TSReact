import styled, { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

interface Props extends ThemeProps<Theme> {
    readonly justifyContent?: string;
    readonly alignItems?: string;
    readonly withGutter?: boolean;
    readonly row?: boolean;
}

const Wrap = styled.div<Props>`
    display: flex;
    flex-direction: ${props => (props.row ? "row" : "column")};
    width: 100%;

    ${props =>
        props.alignItems &&
        css`
            align-items: ${props.alignItems};
        `}

    ${props =>
        props.withGutter &&
        css`
            padding: 0 ${props.theme.globalSpacingUnit / 2}px;
        `}
    
    ${props =>
        props.justifyContent &&
        css`
            justify-content: ${props.justifyContent};
        `}
`;

export default Wrap;
