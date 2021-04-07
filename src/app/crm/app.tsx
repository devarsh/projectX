import {
  unstable_createMuiStrictModeTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import "./index.css";
import { theme } from "./theme";
import "registry/fns/registerFnsCRM";
import IndexPage from "pages_crm";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { queryClient } from "cache";

const themeObj = unstable_createMuiStrictModeTheme(theme);

export const App = () => {
  return (
    <ThemeProvider theme={themeObj}>
      <QueryClientProvider client={queryClient}>
        <IndexPage />
        {process.env.NODE_ENV !== "production" ? <ReactQueryDevtools /> : null}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
