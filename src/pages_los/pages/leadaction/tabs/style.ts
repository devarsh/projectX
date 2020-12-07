import { Theme } from "@material-ui/core/styles";
import { BaseCSSProperties } from "@material-ui/core/styles/withStyles";

export interface TabsStyleProps {
  tabPanel: BaseCSSProperties;
  labelText: BaseCSSProperties;
  valueText: BaseCSSProperties;
  submitBtn: BaseCSSProperties;
  backBtn: BaseCSSProperties;
  paper: BaseCSSProperties;
  formLabel: BaseCSSProperties;
  formValue: BaseCSSProperties;
  toggleContainer: BaseCSSProperties;
}

export type TabsNameProps = Record<keyof TabsStyleProps, string>;

export const tabsStyle = (theme: Theme): any => ({
  tabPanel: {
    border: "1px solid #e9f2f9",
    borderTop: "0",
    backgroundColor: "#e9f2f9",
  },
  labelText: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#393939",
  },
  valueText: {
    fontSize: "0.875rem",
    fontWeight: "600",
    letterSpacing: "1px",
    color: theme.palette.secondary.main,
  },
  submitBtn: {
    fontSize: "1.2rem",
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    border: 0,
    color: "#fff !important",
    padding: "4px .75rem",
    fontWeight: "700",
    minWidth: "120px",
    letterSpacing: "0.02857em",
    boxShadow: "none",
    textTransform: "capitalize",
    alignSelf: "flex-end",
    "&:hover": {
      background:
        "linear-gradient(90deg, rgba(94,231,131,1) 0%, rgba(74,204,160,1) 35%, rgba(33,150,218,1) 100%)",
      boxShadow: "none",
    },
  },
  backBtn: {
    background: "#e0e0e0",
    border: 0,
    color: "#0b6fb8 !important",
    fontSize: "1.2rem",
    fontWeight: "700",
    minWidth: "120px",
    letterSpacing: "0.02857em",
    padding: "4px .75rem",
    textTransform: "capitalize",
    marginRight: theme.spacing(2),
    "&:hover": {
      color: "#0b6fb8 !important",
      background: "#e0e0e0",
    },
  },
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  formLabel: {
    fontWeight: "600",
  },
  formValue: {
    fontWeight: "500",
    color: "#0063A3",
  },
  toggleContainer: {
    margin: theme.spacing(2, 0),
  },
});
