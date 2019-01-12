import TypographyProps from "_model/theming/props/TypographyProps";
import { css, FlattenSimpleInterpolation } from "styled-components";

const typographyProps = (props: TypographyProps): FlattenSimpleInterpolation =>
    css`
        ${props.light &&
            css`
                font-weight: 300;
            `}
        ${props.semiBold &&
            css`
                font-weight: 600;
            `}
        ${props.bold &&
            css`
                font-weight: 700;
            `}
        ${props.underline &&
            css`
                text-decoration: underline;
            `}
        ${props.uppercase &&
            css`
                text-transform: uppercase;
            `}
        ${props.lowercase &&
            css`
                text-transform: lowercase;
            `}
        ${props.center &&
            css`
                text-align: center;
            `}
        ${props.right &&
            css`
                text-align: right;
            `}
    `;

export default typographyProps;
