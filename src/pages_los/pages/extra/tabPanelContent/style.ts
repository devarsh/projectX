import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
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
  toggleContainer: {
    marginBottom: theme.spacing(2),
  },
  backBtn: {
    background: "#e0e0e0",
    border: 0,
    color: "#0b6fb8 !important",
    fontSize: "1.2rem",
    fontWeight: 700,
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
  submitBtn: {
    fontSize: "1.2rem",
    background:
      "linear-gradient(-90deg, rgba(94,231,131,1) 0%, rgba(74,205,159,1) 35%, rgba(33,150,218,1) 100%)",
    border: 0,
    color: "#fff !important",
    padding: "4px .75rem",
    fontWeight: 700,
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
}));
