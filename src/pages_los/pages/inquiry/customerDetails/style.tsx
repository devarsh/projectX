import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
