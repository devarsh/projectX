import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  continueBtn: {
    background: "#fff !important",
    height: "48px",
    fontSize: "1.2rem !important",
    minWidth: "160px !important",
    color: "var(--theme-color2) !important",
    border: "1px solid  var(--theme-color2) !important",
    borderRadius: "24px",
    "&:hover": {
      color: "var(--theme-color1) !important",
      border: "1px solid var(--theme-color1) !important",
    },
  },
  center: {
    textAlign: "center",
  },
  tableContainer: {
    border: "1px solid #e8e8e8",
  },
  table: {
    minWidth: 100,
  },
  td: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
    borderBottom: "2px solid #fafafa",
    backgroundColor: "#fff",
  },
  th: {
    fontWeight: 500,
    borderBottom: "2px solid #fff",
    backgroundColor: "#fafafa",
  },
  historyHeading: {
    paddingRight: "10px",
    color: theme.palette.secondary.main,
  },
  accDetailsLabel: {
    color: "#808080",
    fontSize: "10px",
    fontWeight: 400,
    lineHeight: 1,
    padding: "0px 25px",
    paddingBottom: "5px",
    paddingTop: "5px",
  },
  accDetailsValue: {
    color: "#000",
    fontSize: "10px",
    fontWeight: 600,
    lineHeight: 1,
    paddingTop: "6px",
  },
}));
