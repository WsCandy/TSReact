import { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

const globalMargin = (props: ThemeProps<Theme>, multiplier: number = 1) => (
    ...side: Side[]
) => {
    return css`
        ${side.map(
            v =>
                `margin-${v}: ${Math.round(
                    props.theme.globalSpacingUnit * multiplier
                )}px;`
        )}
    `;
};

export default globalMargin;
