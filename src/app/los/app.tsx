import { Fragment } from "react";
import {
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SnackbarProvider } from "notistack";
import { queryClient } from "cache";
import "registry/fns/registerFnsLOS";
import "components/tableCellComponents";
import IndexPage from "pages_los";
import { theme } from "./theme";
import "./index.css";

const themeObj = unstable_createMuiStrictModeTheme(theme);

export const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={themeObj}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3} autoHideDuration={5000}>
            <IndexPage />
            <ReactQueryDevtools />
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
};
