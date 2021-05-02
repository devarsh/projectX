import {
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./index.css";
import { theme } from "./theme";
import "registry/fns/registerFnsCRM";
import IndexPage from "pages_crm";
import { RecoilRoot } from "recoil";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { queryClient } from "cache";

const themeObj = unstable_createMuiStrictModeTheme(theme);

export const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={themeObj}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <IndexPage />
          {process.env.NODE_ENV !== "production" ? (
            <ReactQueryDevtools />
          ) : null}
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};
