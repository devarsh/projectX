import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "& .MuiCheckbox-root": {
      padding: "2px 6px",
    },
  },
}))(MenuItem);

export const StyledTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      border: "1px solid #BABABA",
      marginTop: "0 !important",
      borderRadius: 5,
      backgroundColor: "#fff",
      padding: "0 0",
      "& input": {
        padding: "4px 38px 4px 6px",
        marginTop: "0 !important",
        fontSize: "12px",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #26A456",
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px) scale(1)",
    },
    "& .MuiSelect-selectMenu": {
      minHeight: "18px",
      lineHeight: "18px",
      fontSize: 12,
    },
  },
})(TextField);

export const StyledSlider = withStyles({
  root: {
    color: "#26A456",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);
