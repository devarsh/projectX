import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  fontTitle: {
    fontWeight: 600,
  },
  paper: {
    margin: theme.spacing(3, 3, 0, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    padding: "1rem 0rem",
    borderRadius: 8,
    width: "100%",
    minHeight: "30vh",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(3, 2, 0, 2),
    },
  },
  readMoreReadLess: {
    color: "blue",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: "1.2rem",
    borderRadius: "24px",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "solid 1px",
  },
  gridWithRightBorder: {
    alignItems: "center",
    padding: "10px",
    borderRight: "solid 1px",
  },
  heading: {
    padding: "7px",
    paddingLeft: "0px",
  },
  loader: {
    justifyContent: "center",
    margin: "auto",
  },
}));
