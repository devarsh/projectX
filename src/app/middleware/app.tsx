import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { QueryClientProvider } from "react-query";
import { queryClient } from "cache";
import { CAMMiddlewareWrapper } from "./camWrapper";
import { MiddlewareSDK } from "registry/fns/middleware";

MiddlewareSDK.inititateAPI(
  `${new URL("./middleware/", process.env.REACT_APP_API_URL).href}` ?? ""
);
MiddlewareSDK.setToken("r6ENdp/FRIDHaJ1rE7doilf/SJ1sCQE0VcVa+nuN+QI=");

const themeObj = createMuiTheme();

export const App = () => {
  return (
    <ThemeProvider theme={themeObj}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <CAMMiddlewareWrapper />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
