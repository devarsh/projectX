import { makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import { useStyles } from "./style";

export const LeadInformationTab = () => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" width={1}>
      <Box display="flex" flexDirection="row" width={1} mb={2}>
        <Box pr={3}>
          <div className={classes.labelText}>Lead No.</div>
          <div className={classes.valueText}>123890</div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Product</div>
          <div className={classes.valueText}>
            Retail LAP : Commercial Property Purchase
          </div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Genertaed On</div>
          <div className={classes.valueText}>21-11-2020</div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Health Check Score</div>
          <div className={classes.valueText}>
            76% <small>Good</small>
          </div>
        </Box>
        <Box px={3}>
          <div className={classes.labelText}>Current Status</div>
          <div className={classes.valueText}>Pending</div>
        </Box>
        <Box pl={3}>
          <div className={classes.labelText}>Priority</div>
          <div className={classes.valueText}>Warm</div>
        </Box>
      </Box>
      <Divider />
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Box mt={2}>
            <TextField
              select
              label="Change Status"
              fullWidth
              required
              name="leadtatus"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              value="1"
            >
              <MenuItem value={0}>Select New Status</MenuItem>
              <MenuItem value={1}>Pending</MenuItem>
              <MenuItem value={2}>Rejected</MenuItem>
              <MenuItem value={3}>Confirmed</MenuItem>
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box mt={2}>
            <TextField
              select
              label="Change Priority"
              fullWidth
              required
              name="leadtatus"
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              value="1"
            >
              <MenuItem value={0}>Select Priority</MenuItem>
              <MenuItem value={1}>Hot</MenuItem>
              <MenuItem value={2}>Warm</MenuItem>
              <MenuItem value={3}>Cold</MenuItem>
            </TextField>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <Box mt={2}>
            <TextField
              select
              label="Assign to Employee"
              placeholder="Select Employee"
              fullWidth
              required
              name=""
              autoComplete="off"
              InputLabelProps={{
                shrink: true,
              }}
              value="1"
            >
              <MenuItem value={0}>Select Employee</MenuItem>
              <MenuItem value={1}>Employee 1</MenuItem>
              <MenuItem value={2}>Employee 2</MenuItem>
              <MenuItem value={3}>Employee 3</MenuItem>
            </TextField>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box mt={2}>
            <TextField
              label="Remarks"
              placeholder="Remarks"
              fullWidth
              name="remarks"
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="off"
            />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" flexDirection="row" width={1 / 2} mt={2}>
        <Button autoFocus color="primary" className={classes.backBtn}>
          Cancel
        </Button>
        <Button color="primary" autoFocus className={classes.submitBtn}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
