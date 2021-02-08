import { Fragment } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "cache";
import "registry/fns/registerFnsLOS";
import IndexPage from "pages_los";
import { theme } from "./theme";
import "./index.css";

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={themeObj}>
        <QueryClientProvider client={queryClient}>
          <IndexPage />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
};
