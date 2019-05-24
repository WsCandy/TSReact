import { css, FlattenSimpleInterpolation, ThemeProps } from "styled-components";
import generateMediaQuery from "_components/util/css/generateMediaQuery";
import Theme from "_model/theming/Theme";
import getBreakpointValue from "_components/util/css/getBreakpointValue";

const flexProps = (
    props: FlexProps & ThemeProps<Theme>
): FlattenSimpleInterpolation => css`
        ${props.flex &&
            css`
                display: flex;
            `}

        ${css`
            flex-direction: ${getBreakpointValue(false, props.row) === true
        ? "row"
        : "column"};
        `}

        ${props.alignItems &&
            css`
                align-items: ${getBreakpointValue(
        "flex-start",
        props.alignItems
    )};
            `}
        
        ${props.justifyContent &&
            css`
                justify-content: ${getBreakpointValue(
        "flex-start",
        props.justifyContent
    )};
            `}
        
        ${[
        generateMediaQuery(
            value =>
                css`
                        align-items: ${value};
                    `,
            props,
            props.alignItems
        ),
        generateMediaQuery(
            value =>
                css`
                        justify-content: ${value};
                    `,
            props,
            props.justifyContent
        ),
        generateMediaQuery(
            value =>
                css`
                        flex-direction: ${value === true ? "row" : "column"};
                    `,
            props,
            props.row
        )
    ]}
    `;

export default flexProps;
