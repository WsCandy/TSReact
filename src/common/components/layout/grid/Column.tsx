import * as React from "react";
import styled, {
    css,
    FlattenSimpleInterpolation,
    ThemeProps,
    withTheme
} from "styled-components";
import Theme from "_model/theming/Theme";
import GridContext from "_common/components/layout/grid/context/GridContext";
import generateMediaQuery from "_common/components/util/css/generateMediaQuery";
import getBreakpointValue from "_common/components/util/css/getBreakpointValue";

interface Props extends ThemeProps<Theme> {
    readonly starts: BreakpointProp<number>;
    readonly spans?: BreakpointProp<number>;
    readonly startsRow?: BreakpointProp<number>;
    readonly spansRows?: BreakpointProp<number>;
    readonly flex?: boolean;
}

interface StyledProps extends Props {
    readonly gridColumns: number;
}

const calculateIEVal = (value: number): number => value * 2 - 1;

const getColSpan = (value: number): FlattenSimpleInterpolation => css`
    -ms-grid-column-span: ${calculateIEVal(value)};
    grid-column-end: span ${value};
`;

const getColStart = (value: number): FlattenSimpleInterpolation => css`
    -ms-grid-column: ${calculateIEVal(value)};
    grid-column-start: ${value};
`;

const getRowStart = (value: number): FlattenSimpleInterpolation => css`
    -ms-grid-row: ${calculateIEVal(value)};
    grid-row-start: ${value};
`;

const getRowSpan = (value: number): FlattenSimpleInterpolation => css`
    -ms-grid-row-span: ${calculateIEVal(value)};
    grid-row-end: span ${value};
`;

const StyledColumn = styled.div<StyledProps>`
    ${props =>
        props.flex &&
        css`
            display: flex;
        `};

    ${props => [
        getColSpan(getBreakpointValue(props.gridColumns, props.spans)),
        getColStart(getBreakpointValue(1, props.starts))
    ]}
    
    ${props =>
        props.startsRow && getRowStart(getBreakpointValue(1, props.startsRow))}
    
    ${props =>
        props.spansRows && getRowSpan(getBreakpointValue(1, props.spansRows))};
    
    ${props => [
        generateMediaQuery(getColSpan, props, props.spans),
        generateMediaQuery(getColStart, props, props.starts),
        generateMediaQuery(getRowSpan, props, props.spansRows),
        generateMediaQuery(getRowStart, props, props.startsRow)
    ]}
`;

const getColumnCount = (columns: number | string[]): number =>
    (typeof columns === "number" ? columns : columns.length);

const Column: React.FunctionComponent<Props> = props => (
    <GridContext.Consumer>
        {context => (
            <StyledColumn
                {...props}
                gridColumns={getColumnCount(context.columns)}
            />
        )}
    </GridContext.Consumer>
);

export default withTheme(Column);
