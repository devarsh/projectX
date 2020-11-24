import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 160,
  },
}));

export default function EmployeeDashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <h3 className="theme-color2">Welcome Employee,</h3>
          <h5 className="theme-color2">This is your Ratnaafin account.</h5>
        </Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>

      <Grid item xs={12} md={3} lg={3}>
        <Paper className={fixedHeightPaper}></Paper>
      </Grid>
    </Grid>
  );
}
