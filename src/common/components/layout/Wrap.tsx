import styled, { css, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";
import flexProps from "_util/styles/flexProps";
import getBreakpointValue from "_components/util/css/getBreakpointValue";
import generateMediaQuery from "_components/util/css/generateMediaQuery";

interface Props extends ThemeProps<Theme>, FlexProps {
    readonly withGutter?: BreakpointProp<boolean>;
    readonly page?: boolean;
    readonly auto?: boolean;
}

const generateGutter = (value: boolean | undefined, props: Props) => {
    return css`
        ${value === true
            ? `
            padding-left: ${props.theme.globalSpacingUnit}px;
            padding-right: ${props.theme.globalSpacingUnit}px;
        `
            : `
            padding-left: 0;
            padding-right: 0;
        `}
    `;
};

const Wrap = styled.div<Props>`
    display: flex;
    flex-direction: ${props => (props.row ? "row" : "column")};
    ${props =>
        !props.auto &&
        css`
            width: 100%;
        `}

    ${props => flexProps(props)}
    ${props =>
        getBreakpointValue(false, props.withGutter) &&
        css`
            padding-left: ${props.theme.globalSpacingUnit}px;
            padding-right: ${props.theme.globalSpacingUnit}px;
        `}
    ${props => generateMediaQuery(generateGutter, props, props.withGutter)};

    ${props =>
        props.page &&
        css`
            padding-top: 24px;
        `}
    `;

export default Wrap;
