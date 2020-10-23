import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";
import { RecoilRoot } from "recoil";
import { theme } from "./theme";
import {
  WrapperStyleProps,
  WrapperStyleNamesProps,
  wrapperStyles,
} from "./styles";
import DynamicForm from "components/dyanmicForm";
import metaData from "meta/metaData";

const themeObj = createMuiTheme(theme);
const useStyles = makeStyles<Theme, WrapperStyleProps>(wrapperStyles);
const App = () => {
  const classes: WrapperStyleNamesProps = useStyles({} as WrapperStyleProps);
  return (
    <ThemeProvider theme={themeObj}>
      <RecoilRoot>
        <Box width={1} display="flex" className={classes.wrapper}>
          <DynamicForm metaData={metaData} />
        </Box>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
