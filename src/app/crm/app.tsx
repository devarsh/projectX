import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import { theme } from "./theme";
import "registry/fns/registerFnsCRM";
import IndexPage from "pages_crm";

const themeObj = createMuiTheme(theme);

export const App = () => {
  return (
    <ThemeProvider theme={themeObj}>
      <IndexPage />
    </ThemeProvider>
  );
};
