import styled from "styled-components";
import TypographyProps from "_model/theming/props/TypographyProps";
import typographyProps from "_util/styles/typographyProps";
import colourProps from "_util/styles/colourProps";

interface Props extends TypographyProps, ColourProps {}

const Highlight = styled.span<Props>`
    font-weight: 600;
    ${props => typographyProps(props)};
    ${props => colourProps(props, "colour")};
`;

export default Highlight;
