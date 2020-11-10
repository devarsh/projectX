import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

const themeObj = createMuiTheme();

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeObj}>
        <div>App LOS</div>
      </ThemeProvider>
    </BrowserRouter>
  );
};
