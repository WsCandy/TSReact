import { css, FlattenSimpleInterpolation } from "styled-components";
import Theme from "_model/theming/Theme";

const sizeProps = (
    props: SizeProps,
    theme: Theme
): (FlattenSimpleInterpolation | null)[] => {
    const keys = Object.keys(theme.sizes) as (keyof Sizes)[];

    return keys.map(key => {
        if (key !== "alpha" && props[key]) {
            return css`
                font-size: ${theme.sizes[key]};
            `;
        }

        return null;
    });
};

export default sizeProps;
