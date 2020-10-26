import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme";
import {
  WrapperStyleProps,
  WrapperStyleNamesProps,
  wrapperStyles,
} from "./styles";
import IndexPage from "components/pages";

const themeObj = createMuiTheme(theme);
const useStyles = makeStyles<Theme, WrapperStyleProps>(wrapperStyles);
const App = () => {
  const classes: WrapperStyleNamesProps = useStyles({} as WrapperStyleProps);

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeObj}>
        <RecoilRoot>
          <Box width={1} display="flex" className={classes.wrapper}>
            <IndexPage />
          </Box>
        </RecoilRoot>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
