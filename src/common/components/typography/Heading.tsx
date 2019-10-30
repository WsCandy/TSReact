import styled from "styled-components";
import TypographyProps from "_model/theming/props/TypographyProps";
import typographyProps from "_util/styles/typographyProps";
import sizeProps from "_util/styles/sizeProps";
import globalMargin from "_util/styles/globalMargin";

interface Props extends TypographyProps, SizeProps {
    readonly flush?: boolean;
}

const Heading = styled.p<Props>`
    ${props => !props.flush && globalMargin(props)("bottom")};
    font-size: ${props => props.theme.sizes.alpha};
    font-weight: normal;
    line-height: 1.35;
    ${props => sizeProps(props, props.theme)};
    ${props => typographyProps(props)};
`;

Heading.defaultProps = {
    role: "heading"
};

export default Heading;
