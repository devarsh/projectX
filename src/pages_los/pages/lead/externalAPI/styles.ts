import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
  filterType: {
    color: theme.palette.secondary.main,
    fontSize: "11px",
    paddingRight: "4px",
    fontWeight: 500,
    display: "inline-flex",
  },
  paper: {
    display: "inline-flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));
