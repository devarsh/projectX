import TextField from "@material-ui/core/TextField";

import { withStyles } from "@material-ui/core/styles";

const StyledTextField = withStyles({
  root: {
    "& .MuiInputLabel-formControl": {
      color: "#736f6f",
      fontWeight: 600,
      textTransform: "capitalize",
      fontSize: "1rem",
      "@media (max-width: 1200px)": {
        fontSize: "0.75rem",
      },
      "@media (max-width: 1440px)": {
        fontSize: "0.875rem",
      },
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px) scale(1)",
    },
    "& label.Mui-focused": {
      color: "#26A456",
    },

    "& .MuiInputBase-root": {
      border: "1px solid #BABABA",
      marginTop: "26px",
      borderRadius: 5,
      backgroundColor: "#fff",
      "@media (max-width: 1200px)": {
        fontSize: "0.875rem",
      },

      "& input": {
        padding: "6px 7px ",
        height: "22px",
        "&::placeholder": {
          color: "#000",
          fontSize: "0.875rem",
        },
        "@media (max-width: 1200px)": {
          height: "18px",
        },
      },

      "& inputMultiline": {
        padding: "6px 7px",
      },

      "& .MuiInputBase-input": {
        padding: "6px 7px",
      },
    },

    "& .MuiInput-underline:before": {
      borderBottom: "0",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "2px solid #3f51b5",
      transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    },
    "&:hover .MuiInput-underline:before": {
      borderBottom: "0 !important",
    },

    "& .MuiInputAdornment-positionStart": {
      borderRight: "1px solid #BABABA !important",
      height: "36px",
      maxHeight: "36px",
      padding: "0 1rem",
    },

    "& .MuiSelect-selectMenu": {
      minHeight: "22px",
      lineHeight: "22px",
      "@media (max-width: 1200px)": {
        minHeight: "18px",
        lineHeight: "18px",
      },
    },
  },
})(TextField);

export default StyledTextField;
