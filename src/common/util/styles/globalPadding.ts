import { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

const globalPadding = (props: ThemeProps<Theme>, multiplier = 1) => (
    ...side: Side[]
) => {
    return css`
        ${side.map(
            v =>
                `padding-${v}: ${Math.round(
                    props.theme.globalSpacingUnit * multiplier
                )}px;`
        )}
    `;
};

export default globalPadding;
