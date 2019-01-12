import styled, { css } from "styled-components";
import TypographyProps from "_model/theming/props/TypographyProps";
import typographyProps from "_util/styles/typographyProps";

interface Props extends TypographyProps {
    readonly flush?: boolean;
}

const Paragraph = styled.p<Props>`
    ${props =>
        !props.flush &&
        css`
            margin-bottom: ${props => props.theme.globalSpacingUnit}px;
        `};
    ${props => typographyProps(props)}
`;

export default Paragraph;
