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
  wrapper: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: "100%",
  },
  innerWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  spacing: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
