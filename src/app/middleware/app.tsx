import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Routes, Route } from "react-router";
import { QueryClientProvider } from "react-query";
import { queryClient } from "cache";
import { MiddlewareSDK } from "registry/fns/middleware";
import { CAMMiddlewareWrapper } from "./camWrapper";
import { Mandate } from "./mandate/";

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
        <Routes>
          <Route path="/lead/:refID" element={<CAMMiddlewareWrapper />} />
          <Route path="/mandate" element={<Mandate />} />
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
