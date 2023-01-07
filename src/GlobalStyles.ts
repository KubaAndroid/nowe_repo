import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;800;900&display=swap');

    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #545041;
    }

    html {
    width: 100%;
    height: 100%;
    }

    body {
    font-family: 'Poppins';
    background-color: #C5B7A2;
    }

`

export default GlobalStyle;