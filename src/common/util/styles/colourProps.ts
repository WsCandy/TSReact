import { css, FlattenSimpleInterpolation, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

const colourProps = (
    props: ColourProps & ThemeProps<Theme>,
    property: string
): (FlattenSimpleInterpolation | null)[] => {
    const keys = Object.keys(props.theme.colours) as (keyof Colors)[];

    return keys.map(key => {
        if (props[key]) {
            return css`
                ${property}: ${props.theme.colours[key]};
            `;
        }

        return null;
    });
};

export default colourProps;
