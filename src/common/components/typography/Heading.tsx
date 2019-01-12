import styled, { css } from "styled-components";
import TypographyProps from "_model/theming/props/TypographyProps";
import typographyProps from "_util/styles/typographyProps";
import sizeProps from "_util/styles/sizeProps";

interface Props extends TypographyProps, SizeProps {
    readonly flush?: boolean;
}

const Heading = styled.p<Props>`
    ${props =>
        !props.flush &&
        css`
            margin-bottom: ${props => props.theme.globalSpacingUnit}px;
        `};
    font-size: ${props => props.theme.sizes.alpha};
    font-weight: normal;
    line-height: 1.35;
    ${props => sizeProps(props, props.theme)}
    ${props => typographyProps(props)}
`;

Heading.defaultProps = {
    role: "heading"
};

export default Heading;
