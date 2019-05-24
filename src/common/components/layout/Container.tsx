import styled, { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";
import flexProps from "_util/styles/flexProps";

interface Props extends ThemeProps<Theme>, FlexProps {
    readonly section?: boolean | number;
    readonly static?: boolean;
}

const Container = styled.div<Props>`
    width: 100%;
    max-width: ${props => props.theme.siteWidth};
    position: relative;

    ${props => flexProps(props)}

    ${props =>
        props.static &&
        css`
            position: static;
        `}

    ${props =>
        props.section &&
        css`
            margin-bottom: ${typeof props.section === "number"
        ? props.section
        : props.theme.globalSpacingUnit * 4}px;
        `}
`;

Container.defaultProps = {
    role: "group"
};

export default Container;
