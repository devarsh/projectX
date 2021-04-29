import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3, 3, 0, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 0rem",
    backgroundColor: "#fff",
    //boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    borderRadius: 8,
    width: "100%",
    minHeight: "30vh",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(3, 2, 0, 2),
    },
  },
  paper2: {
    padding: "24px",
    borderRadius: 8,
    //backgroundColor: "#fff",
    //boxShadow: "0 0 20px rgba(0,0,0,0.06)",
  },
}));
