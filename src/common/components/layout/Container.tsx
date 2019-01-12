import styled, { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

interface Props extends ThemeProps<Theme> {
    readonly flex?: boolean;
    readonly row?: boolean;
}

const Container = styled.div<Props>`
    width: 100%;
    max-width: ${props => props.theme.siteWidth}
        ${props =>
        props.flex &&
            css`
                display: flex;
            `}
        ${props =>
        !props.row &&
            css`
                flex-direction: column;
            `};
`;

Container.defaultProps = {
    role: "group"
};

export default Container;
