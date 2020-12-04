import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { tabsStyle, TabsStyleProps, TabsNameProps } from "./style";

const useStyles = makeStyles<Theme, TabsStyleProps>(tabsStyle);

export const LeadCustomerTab = () => {
  const classes: TabsNameProps = useStyles({} as TabsStyleProps);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Name:
            </Box>
            <Box className={classes.formValue}>
              Mr. Firstname Middlename Lastname
            </Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Gender:
            </Box>
            <Box className={classes.formValue}>Male</Box>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Date of Birth:
            </Box>
            <Box className={classes.formValue}>12-12-1980</Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Email:
            </Box>
            <Box className={classes.formValue}>email@gmail.com</Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Mobile No:
            </Box>
            <Box className={classes.formValue}>+91 9898989898</Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Address:
            </Box>
            <Box className={classes.formValue}>K-701, Abcd, Address</Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Desired Loan Amount:
            </Box>
            <Box className={classes.formValue}>&#x20B9; 1,00,00,000</Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Health Check Score:
            </Box>
            <Box className={classes.formValue}>
              76% <small>Good</small>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Paper className={classes.paper}>
          <Box display="flex" flexDirection="row">
            <Box pr={2} className={classes.formLabel}>
              Currently Employed:
            </Box>
            <Box className={classes.formValue}>Self Employed Professional</Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
