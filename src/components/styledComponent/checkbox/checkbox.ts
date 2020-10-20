import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

const StyledCheckbox = withStyles({
  root: {
    color: "#0063A3",
    "&$checked": {
      color: "#26A456",
    },
  },
  checked: {},
})(Checkbox);

export default StyledCheckbox;
