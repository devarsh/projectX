import { Theme } from "@material-ui/core/styles";

export const theme: Theme = {
  palette: {
    //@ts-ignore
    primary: {
      main: "#26A456",
    },
    //@ts-ignore
    secondary: {
      main: "#736f6f",
    },
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      text: {
        background:
          "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
        //borderRadius: 4,
        border: 0,
        color: "white",
        height: 40,
        padding: ".5rem .75rem",
        //@ts-ignore
        fontWeight: "700",
        minWidth: "120px",
        letterSpacing: "0.02857em",
        boxShadow: "none",
        textTransform: "capitalize",
        borderRadius: "24px",
        alignSelf: "flex-end",
        "&:hover": {
          background:
            "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
          boxShadow: "none",
        },
      },
    },
    root: {
      text: {
        "&.MuiToggleButtonGroup-groupedHorizontal": {
          borderColor: "#8C8C8C",
          transition: "border 0.3s ease-in",
          borderRadius: "8px",
          color: "red",
          backgroundColor: "red",
        },
      },
    },
  },
};
