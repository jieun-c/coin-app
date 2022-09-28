import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Router from "./router";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";

/* @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap'); */
const GlobalStyle = createGlobalStyle`
  ${reset}
	*{
		box-sizing: border-box;
	}
	body{
		font-family: 'Source Sans Pro', sans-serif;
		background-color: ${(props) => props.theme.bgColor};
		color: ${(props) => props.theme.textColor};
	}
	a{
		text-decoration: none;
		color: inherit;
	}
`;

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <HelmetProvider>
          <Router />
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen />
      </ThemeProvider>
    </>
  );
};

export default App;
