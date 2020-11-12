import { Fragment } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import IndexPage from "pages_los";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./theme";
import "./index.css";

const themeObj = createMuiTheme(theme);

export const AppLos = () => {
  return (
    <Fragment>
      <CssBaseline />
      <BrowserRouter>
        <ThemeProvider theme={themeObj}>
          <IndexPage />
        </ThemeProvider>
      </BrowserRouter>
    </Fragment>
  );
};
