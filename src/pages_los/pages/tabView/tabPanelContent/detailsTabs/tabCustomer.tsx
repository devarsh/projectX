import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { CustomerInformation } from "../customerInformation";
import { CustomerForm } from "../customerForm";
import { useStyles } from "./style";

export const LeadCustomerTab = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item xs={12} sm={6} md={7}>
        <Paper elevation={0} className={classes.paper} square>
          <CustomerForm />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} md={5}>
        <Paper elevation={1} square>
          <CustomerInformation />
        </Paper>
      </Grid>
    </Grid>
  );
};
