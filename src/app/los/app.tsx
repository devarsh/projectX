import { Fragment } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import IndexPage from "pages_los";
import { theme } from "./theme";
import "./index.css";

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={themeObj}>
        <IndexPage />
      </ThemeProvider>
    </Fragment>
  );
};
