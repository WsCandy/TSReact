import { createGlobalStyle, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

interface Props extends ThemeProps<Theme> {}

const BaseStyles = createGlobalStyle<Props>`
    html {
        color: #000;
        font-family: Source Sans Pro, Regular, sans-serif;
        font-size: 62.5%;
        -webkit-font-smoothing: antialiased;
        line-height: 1.35;
    }
    body {
        display: flex;
        flex-direction: column;
        font-size: 1.6rem;
    }
    #main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }  
`;

export default BaseStyles;
