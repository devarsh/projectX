import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { LeadInformation } from "../leadInformation";
import { LeadForm } from "../leadForm";
import { useStyles } from "./style";

export const LeadInformationTab = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12} sm={6} md={7}>
        <Paper elevation={0} className={classes.paper} square>
          <LeadForm />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} md={5}>
        <Paper elevation={1} square>
          <LeadInformation />
        </Paper>
      </Grid>
    </Grid>
  );
};
