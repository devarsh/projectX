import { Fragment } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import cache from "cache";
import IndexPage from "pages_los";
import { theme } from "./theme";
import "./index.css";

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={themeObj}>
        <QueryClientProvider client={cache}>
          <IndexPage />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
};
