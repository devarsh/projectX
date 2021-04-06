import { Fragment } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "cache";
import { CAMMiddlewareWrapper } from "./cam";
import { MiddlewareSDK } from "registry/fns/middleware";

MiddlewareSDK.inititateAPI(
  `${new URL("./middleware/", process.env.REACT_APP_API_URL).href}` ?? ""
);
MiddlewareSDK.setToken("r6ENdp/FRIDHaJ1rE7doilf/SJ1sCQE0VcVa+nuN+QI=");

const themeObj = createMuiTheme();

export const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={themeObj}>
        <QueryClientProvider client={queryClient}>
          <CAMMiddlewareWrapper />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </Fragment>
  );
};
