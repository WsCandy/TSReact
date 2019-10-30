import styled from "styled-components";
import TypographyProps from "_model/theming/props/TypographyProps";
import typographyProps from "_util/styles/typographyProps";
import globalMargin from "_util/styles/globalMargin";

interface Props extends TypographyProps {
    readonly flush?: boolean;
}

const Paragraph = styled.p<Props>`
    ${props => !props.flush && globalMargin(props)("bottom")};
    ${props => typographyProps(props)};
`;

export default Paragraph;
