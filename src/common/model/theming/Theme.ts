interface Theme {
    readonly globalSpacingUnit: number;
    readonly standardGridColumns: number;
    readonly siteWidth: string;
    readonly breakpoints: Breakpoints;
    readonly sizes: Sizes;
    readonly colours: Colors;
}

export default Theme;
