import { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

const globalPadding = (props: ThemeProps<Theme>, modifier: number = 1) => (
    ...side: Side[]
) => {
    return css`
        ${side.map(
            v => `padding-${v}: ${props.theme.globalSpacingUnit * modifier}px;`
        )}
    `;
};

export default globalPadding;
