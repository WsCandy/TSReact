import { css, FlattenSimpleInterpolation, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

const getMqValues = function<T>(
    value?: BreakpointProp<T>
): BreakpointValues<T> | void {
    if (typeof value === "object") {
        return Array.isArray(value) ? value[1] : value;
    }
};

const generateMediaQuery = function<T, P extends ThemeProps<Theme>>(
    generator: (value: T, props?: P) => FlattenSimpleInterpolation,
    props: P,
    prop?: BreakpointProp<T>
): FlattenSimpleInterpolation[] | null {
    const { theme } = props;
    const mqs = getMqValues<T>(prop);

    if (typeof mqs === "undefined") {
        return null;
    }

    const keys = Object.keys(mqs) as BreakpointKeys[];

    return keys.map(v => {
        const value = mqs[v] as T;
        const breakpoint = theme.breakpoints[v] || `${v}px`;

        return css`
            @media screen and (min-width: ${breakpoint}) {
                ${generator(value, props)}
            }
        `;
    });
};

export default generateMediaQuery;
