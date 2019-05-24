import Theme from "_model/theming/Theme";
import { FlattenSimpleInterpolation, css } from "styled-components";

const getMinMax = (max?: boolean): string => (max ? "max" : "min");

const mq = (
    theme: Theme,
    breakpoint: BreakpointKeys,
    max?: boolean
): ((
    test: TemplateStringsArray,
    ...values: any[]
) => FlattenSimpleInterpolation) => (test: TemplateStringsArray, ...args) => {
    const values = test.map((v, i) =>
        (typeof args[i] !== "undefined" ? v + args[i] : v)
    );

    const width = theme.breakpoints[breakpoint];

    return css`
            @media screen and (${getMinMax(max)}-width: ${width}) {
                ${values.join("")}
            }
        `;
};

export default mq;
