import { createGlobalStyle, ThemeProps } from "styled-components";
import Theme from "_model/theming/Theme";

interface Props extends ThemeProps<Theme> {}

const BaseStyles = createGlobalStyle<Props>`
    html {
        color: #000;
        font-family: "Helvetica", sans-serif;
        font-size: 62.5%;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.5;
        overflow: initial;
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
        position: relative;
    }
    
    a {
        color: ${props => props.theme.colours.primary};
        text-decoration: none;
        
        &:hover {
            text-decoration: underline;
        }
    }
    
    img {
        max-width: 100%;
    }
`;

export default BaseStyles;
