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
    MuiButton: {
      text: {
        background:
          "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
        border: 0,
        color: "#fff !important",
        height: 40,
        padding: ".5rem .75rem",
        //@ts-ignore
        fontWeight: "700",
        minWidth: "120px",
        letterSpacing: "0.02857em",
        boxShadow: "none",
        textTransform: "capitalize",
        //@ts-ignore
        borderRadius: "24px",
        alignSelf: "flex-end",
        "&:hover": {
          background:
            "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
          boxShadow: "none",
        },
      },
    },

    MuiInputBase: {
      root: {
        border: "1px solid #BABABA",
        marginTop: "26px",
        borderRadius: 5,
        backgroundColor: "#fff",
        paddingRight: "0px !important",
      },
      input: {
        padding: "6px  7px",
        height: "22px",
      },
      inputMultiline: {
        padding: "6px  7px",
      },
    },

    MuiInput: {
      formControl: {
        marginTop: "26px !important",
      },
      underline: {
        "&:before": {
          borderBottom: "0",
        },
        "&:after": {
          borderBottom: "2px solid #3f51b5",
          transition: "transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        },
        "&:hover": {
          "&:before": {
            borderBottom: "0 !important",
          },
        },
      },
      //@ts-ignore
      "&:hover": {
        underline: {
          "&:before": {
            borderBottom: "0",
          },
        },
      },
    },

    MuiSelect: {
      selectMenu: {
        height: "22px",
      },
    },

    MuiInputLabel: {
      formControl: {
        color: "#736f6f",
        //@ts-ignore
        fontWeight: "600",
        textTransform: "capitalize",
        fontSize: "1rem",
        fontFamily: "'Montserrat',Helvetica,Arial,Lucida,sans-serif'",
      },
      shrink: {
        transform: "translate(0, 1.5px) scale(1)",
      },
    },

    MuiInputAdornment: {
      positionStart: {
        borderRight: "1px solid #BABABA !important",
        height: "32px",
        padding: "0 1rem",
      },
    },

    MuiPickersToolbarButton: {
      toolbarBtn: {
        background: "none",
        "&:hover": {
          background: "none",
        },
      },
    },

    MuiDialogActions: {
      //@ts-ignore
      MuiButton: {
        text: {
          backgroundColor: "red !important",
          background: "red !important",
        },
      },
    },

    PickerWithState: {
      root: {
        MuiInputBase: {
          root: {
            paddingRight: "0px !important",
          },
        },
      },
    },

    MuiCssBaseline: {
      "@global": {
        //@ts-ignore
        fontFamily: "'Montserrat',Helvetica,Arial,Lucida,sans-serif'",
      },
    },
    MuiStepper: {
      root: {
        padding: "0",
      },
    },
    MuiStepIcon: {
      active: {
        color: "#26A456 !important",
      },
    },
  },
};
