import Theme from "_common/model/theming/Theme";

const theme: Theme = {
    globalSpacingUnit: 25,
    standardGridColumns: 12,
    siteWidth: "1734px",
    breakpoints: {
        mobileLarge: "400px",
        phablet: "480px",
        phabletLarge: "600px",
        tabletPort: "740px",
        tabletLand: "980px",
        lap: "1120px",
        desk: "1440px",
        deskWide: "1800px"
    },
    colours: {
        primary: "#77878B",
        secondary: "#119DA4",
        tertiary: "#F3F4F4",
        quandary: "#373E40"
    },
    sizes: {
        alpha: "8.8rem",
        beta: "6.7rem",
        gamma: "5rem",
        delta: "3.7rem",
        epsilon: "2.8rem",
        zeta: "2.1rem"
    }
};

export default theme;
