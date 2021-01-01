import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import { theme } from "./theme";
import "registry/fns";
import "registry/yup";
import { APISDK } from "registry/fns/sdk";
import IndexPage from "pages_crm";
APISDK.createSession(process.env.REACT_APP_API_URL ?? "");

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <ThemeProvider theme={themeObj}>
      <IndexPage />
    </ThemeProvider>
  );
};
