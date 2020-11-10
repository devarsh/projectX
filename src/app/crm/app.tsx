import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import IndexPage from "pages_crm";
import "registry/fns";
import "registry/yup";
import { APISDK } from "registry/fns/sdk";
APISDK.createSession(process.env.REACT_APP_API_URL ?? "");

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeObj}>
        <RecoilRoot>
          <IndexPage />
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
};
