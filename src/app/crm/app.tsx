import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import IndexPage from "pages";

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeObj}>
        <RecoilRoot>
          <IndexPage />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
};
