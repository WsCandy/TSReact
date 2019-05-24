import styled, { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";
import flexProps from "_util/styles/flexProps";

interface Props extends ThemeProps<Theme>, FlexProps {
    readonly withGutter?: boolean;
    readonly page?: boolean;
}

const Wrap = styled.div<Props>`
    display: flex;
    flex-direction: ${props => (props.row ? "row" : "column")};
    width: 100%;

    ${props => flexProps(props)}

    ${props =>
        props.withGutter &&
        css`
            padding: 0 ${props.theme.globalSpacingUnit}px;
        `}
    
    ${props =>
        props.page &&
        css`
            padding-top: 96px;
        `}
`;

export default Wrap;
