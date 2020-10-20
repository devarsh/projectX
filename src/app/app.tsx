import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { theme } from "./theme";
import {
  WrapperStyleProps,
  WrapperStyleNamesProps,
  wrapperStyles,
} from "./styles";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles";

//import App from "components/app";
import DynamicForm from "components/dyanmicForm";
//import App from "packages/form/examples/01-basic";

const themeObj = createMuiTheme(theme);
const useStyles = makeStyles<Theme, WrapperStyleProps>(wrapperStyles);
const App = () => {
  const classes: WrapperStyleNamesProps = useStyles({} as WrapperStyleProps);
  return (
    <ThemeProvider theme={themeObj}>
      <Box width={1} display="flex" className={classes.wrapper}>
        <DynamicForm />
      </Box>
    </ThemeProvider>
  );
};

export default App;
