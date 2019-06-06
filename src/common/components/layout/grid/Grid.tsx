import * as React from "react";
import Theme from "_model/theming/Theme";
import GridContext from "_common/components/layout/grid/context/GridContext";
import styled, {
    css,
    FlattenSimpleInterpolation,
    ThemeProps,
    withTheme
} from "styled-components";
import getBreakpointValue from "_common/components/util/css/getBreakpointValue";
import generateMediaQuery from "_common/components/util/css/generateMediaQuery";

interface GridProps {
    readonly columns: BreakpointProp<number | string[]>;
    readonly withRows?: BreakpointProp<number | string[]>;
    readonly colGap?: number;
    readonly rowGap?: number;
}

interface Props extends ThemeProps<Theme>, GridProps {}

const ieGridTemplate = (gap: number, number: number, size: string): string =>
    `${size} (${gap}px ${size})[${number - 1}]`;

const ieCustomGridTemplate = (gap: number, template: string[]): string => {
    const values = template
        .map((value, index) =>
            index < template.length - 1 ? [value, `${gap}px`] : [value]
        )
        .reduce((a, b) => a.concat(b), []);

    return values.join(" ");
};

const generateColumns = (
    columns: number | string[],
    props: Props
): FlattenSimpleInterpolation => {
    const { theme, colGap } = props;
    const colSpacing =
        typeof colGap !== "undefined" ? colGap : theme.globalSpacingUnit;

    if (Array.isArray(columns)) {
        return css`
            -ms-grid-columns: ${ieCustomGridTemplate(colSpacing, columns)};
            grid-template-columns: ${columns.join(" ")};
            grid-column-gap: ${colSpacing}px;
        `;
    }

    return css`
        -ms-grid-columns: ${ieGridTemplate(colSpacing, columns, "1fr")};
        grid-template-columns: repeat(${columns}, 1fr);
        grid-column-gap: ${colSpacing}px;
    `;
};

const generateRows = (
    rows: number | string[],
    props: Props
): FlattenSimpleInterpolation => {
    const { rowGap, theme } = props;
    const rowSpacing =
        typeof rowGap !== "undefined" ? rowGap : theme.globalSpacingUnit;

    if (Array.isArray(rows)) {
        return css`
            -ms-grid-rows: ${ieCustomGridTemplate(rowSpacing, rows)};
            grid-template-rows: ${rows.join(" ")};
            grid-row-gap: ${rowSpacing}px;
        `;
    }

    // prettier-ignore
    return css`
        -ms-grid-rows: ${ieGridTemplate(rowSpacing, rows, "minmax(min-content, max-content)")};
        grid-template-rows: repeat(${rows}, minmax(min-content, max-content));
        grid-row-gap: ${rowSpacing}px;
    `;
};

const StyledGrid = styled.div<Props>`
    display: -ms-grid;
    display: grid;
    width: 100%;
    max-width: ${props => props.theme.siteWidth};

    ${props =>
        generateColumns(
            getBreakpointValue(props.theme.standardGridColumns, props.columns),
            props
        )}
    ${props =>
        props.withRows
            ? generateRows(getBreakpointValue(1, props.withRows), props)
            : generateRows(getBreakpointValue(1, 1), props)}
    
    ${props => [
        generateMediaQuery(generateColumns, props, props.columns),
        generateMediaQuery(generateRows, props, props.withRows)
    ]}
`;

const Grid: React.FunctionComponent<Props> = props => {
    const { columns, theme } = props;
    const cols = getBreakpointValue(theme.standardGridColumns, columns);

    return (
        <GridContext.Provider value={{ columns: cols }}>
            <StyledGrid {...props} role="group" />
        </GridContext.Provider>
    );
};

export default withTheme(Grid);
