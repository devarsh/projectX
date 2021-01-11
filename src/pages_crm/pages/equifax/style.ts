import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: "20px",
    minHeight: "calc(100vh - 165px)",
    boxShadow: "0 3px 6px rgba(0,0,0,0.03)",
  },
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
}));
