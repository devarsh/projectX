import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "cache";
import { CAMMiddlewareWrapper } from "./cam";
import { MiddlewareSDK } from "registry/fns/middleware";
import { RecoilRoot } from "recoil";

MiddlewareSDK.inititateAPI(
  `${new URL("./middleware/", process.env.REACT_APP_API_URL).href}` ?? ""
);
MiddlewareSDK.setToken("r6ENdp/FRIDHaJ1rE7doilf/SJ1sCQE0VcVa+nuN+QI=");

const themeObj = createMuiTheme();

export const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={themeObj}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <CAMMiddlewareWrapper />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};
