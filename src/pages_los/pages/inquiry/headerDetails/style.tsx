import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  labelText: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#393939",
  },
  valueText: {
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "1px",
    color: theme.palette.secondary.main,
  },
}));
